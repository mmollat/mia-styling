create type public.mia_service_type as enum (
  'dress_me',
  'build_my_look',
  'build_my_fits',
  'closet_reset'
);

create type public.mia_order_status as enum (
  'AWAITING_INTAKE',
  'READY_FOR_STYLING',
  'STYLING',
  'REVIEW',
  'DELIVERED'
);

create sequence public.mia_client_number_seq;
create sequence public.mia_order_number_seq;

create table public.mia_clients (
  id uuid primary key default gen_random_uuid(),
  client_number text not null unique default ('MIA-' || lpad(nextval('public.mia_client_number_seq')::text, 4, '0')),
  full_name text not null,
  email text not null unique,
  instagram_handle text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint mia_clients_email_normalized check (email = lower(trim(email)))
);

create table public.mia_orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique default ('FIT-' || lpad(nextval('public.mia_order_number_seq')::text, 4, '0')),
  submission_key uuid not null unique,
  client_id uuid not null references public.mia_clients(id) on delete restrict,
  service_type public.mia_service_type not null,
  amount integer not null check (amount > 0),
  status public.mia_order_status not null default 'AWAITING_INTAKE',
  stripe_reference text,
  occasion text not null,
  occasion_date date,
  due_at timestamptz,
  revision_count integer not null default 0 check (revision_count >= 0),
  internal_notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index mia_orders_client_id_idx on public.mia_orders(client_id);
create index mia_orders_status_due_at_idx on public.mia_orders(status, due_at);

create table public.mia_intakes (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references public.mia_orders(id) on delete cascade,
  intake_data jsonb not null,
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint mia_intakes_data_is_object check (jsonb_typeof(intake_data) = 'object')
);

create table public.mia_order_files (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.mia_orders(id) on delete cascade,
  storage_path text not null unique,
  original_filename text not null,
  file_type text not null,
  file_size integer not null check (file_size > 0 and file_size <= 8388608),
  created_at timestamptz not null default now(),
  constraint mia_order_files_type check (file_type in ('image/jpeg', 'image/png', 'image/webp'))
);

create index mia_order_files_order_id_idx on public.mia_order_files(order_id);

create or replace function public.mia_set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger mia_clients_set_updated_at before update on public.mia_clients
for each row execute function public.mia_set_updated_at();
create trigger mia_orders_set_updated_at before update on public.mia_orders
for each row execute function public.mia_set_updated_at();
create trigger mia_intakes_set_updated_at before update on public.mia_intakes
for each row execute function public.mia_set_updated_at();

alter table public.mia_clients enable row level security;
alter table public.mia_orders enable row level security;
alter table public.mia_intakes enable row level security;
alter table public.mia_order_files enable row level security;

create or replace function public.mia_is_admin()
returns boolean
language sql
stable
security invoker
set search_path = public
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'mia_admin', false);
$$;

create policy "MIA admins can read MIA clients" on public.mia_clients for select to authenticated using ((select public.mia_is_admin()));
create policy "MIA admins can update MIA clients" on public.mia_clients for update to authenticated using ((select public.mia_is_admin())) with check ((select public.mia_is_admin()));
create policy "MIA admins can read MIA orders" on public.mia_orders for select to authenticated using ((select public.mia_is_admin()));
create policy "MIA admins can update MIA orders" on public.mia_orders for update to authenticated using ((select public.mia_is_admin())) with check ((select public.mia_is_admin()));
create policy "MIA admins can read MIA intakes" on public.mia_intakes for select to authenticated using ((select public.mia_is_admin()));
create policy "MIA admins can read MIA order files" on public.mia_order_files for select to authenticated using ((select public.mia_is_admin()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('mia-wardrobe-images', 'mia-wardrobe-images', false, 8388608, array['image/jpeg', 'image/png', 'image/webp']);

create policy "MIA admins can view MIA wardrobe images"
on storage.objects for select to authenticated
using (bucket_id = 'mia-wardrobe-images' and (select public.mia_is_admin()));

create policy "MIA admins can delete MIA wardrobe images"
on storage.objects for delete to authenticated
using (bucket_id = 'mia-wardrobe-images' and (select public.mia_is_admin()));

create or replace function public.mia_complete_intake(
  p_submission_key uuid,
  p_full_name text,
  p_email text,
  p_instagram_handle text,
  p_service_type public.mia_service_type,
  p_amount integer,
  p_occasion text,
  p_occasion_date date,
  p_intake_data jsonb,
  p_files jsonb
)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_client public.mia_clients;
  v_order public.mia_orders;
  v_file jsonb;
  v_submitted_at timestamptz := now();
begin
  select * into v_order from public.mia_orders where submission_key = p_submission_key;
  if found then
    select * into v_client from public.mia_clients where id = v_order.client_id;
    return jsonb_build_object('client_number', v_client.client_number, 'order_number', v_order.order_number, 'service_type', v_order.service_type, 'due_at', v_order.due_at);
  end if;

  insert into public.mia_clients (full_name, email, instagram_handle)
  values (trim(p_full_name), lower(trim(p_email)), nullif(trim(p_instagram_handle), ''))
  on conflict (email) do update
    set full_name = excluded.full_name,
        instagram_handle = excluded.instagram_handle,
        updated_at = now()
  returning * into v_client;

  insert into public.mia_orders (submission_key, client_id, service_type, amount, status, occasion, occasion_date)
  values (p_submission_key, v_client.id, p_service_type, p_amount, 'AWAITING_INTAKE', trim(p_occasion), p_occasion_date)
  returning * into v_order;

  insert into public.mia_intakes (order_id, intake_data, submitted_at)
  values (v_order.id, p_intake_data, v_submitted_at);

  for v_file in select * from jsonb_array_elements(coalesce(p_files, '[]'::jsonb))
  loop
    insert into public.mia_order_files (order_id, storage_path, original_filename, file_type, file_size)
    values (v_order.id, v_file->>'storage_path', v_file->>'original_filename', v_file->>'file_type', (v_file->>'file_size')::integer);
  end loop;

  update public.mia_orders
  set status = 'READY_FOR_STYLING',
      due_at = case when p_service_type = 'closet_reset' then v_submitted_at + interval '4 days' else v_submitted_at + interval '48 hours' end
  where id = v_order.id
  returning * into v_order;

  return jsonb_build_object('client_number', v_client.client_number, 'order_number', v_order.order_number, 'service_type', v_order.service_type, 'due_at', v_order.due_at);
end;
$$;

revoke execute on function public.mia_complete_intake(uuid, text, text, text, public.mia_service_type, integer, text, date, jsonb, jsonb) from public, anon, authenticated;
grant execute on function public.mia_complete_intake(uuid, text, text, text, public.mia_service_type, integer, text, date, jsonb, jsonb) to service_role;

revoke all on public.mia_clients, public.mia_orders, public.mia_intakes, public.mia_order_files from anon;
grant select, update on public.mia_clients, public.mia_orders to authenticated;
grant select on public.mia_intakes, public.mia_order_files to authenticated;
