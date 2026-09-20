revoke all on table
  public.mia_clients,
  public.mia_orders,
  public.mia_intakes,
  public.mia_order_files
from anon, authenticated;

grant select, update on table
  public.mia_clients,
  public.mia_orders
to authenticated;

grant select on table
  public.mia_intakes,
  public.mia_order_files
to authenticated;

revoke all on sequence
  public.mia_client_number_seq,
  public.mia_order_number_seq
from anon, authenticated;

revoke execute on function public.mia_set_updated_at() from public, anon, authenticated;
revoke execute on function public.mia_is_admin() from public, anon;
grant execute on function public.mia_is_admin() to authenticated;
