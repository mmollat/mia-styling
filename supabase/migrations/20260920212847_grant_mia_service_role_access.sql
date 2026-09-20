grant select, insert, update, delete on table
  public.mia_clients,
  public.mia_orders,
  public.mia_intakes,
  public.mia_order_files
to service_role;

grant usage, select on sequence
  public.mia_client_number_seq,
  public.mia_order_number_seq
to service_role;
