import Link from "next/link";
import { Brand } from "@/components/brand";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { services, type ServiceType } from "@/lib/intake";
import { signOutAdmin } from "./actions";

type QueueOrder = { id: string; order_number: string; service_type: ServiceType; amount: number; status: string; due_at: string | null; created_at: string; clients: { client_number: string; full_name: string; instagram_handle: string | null } | null };

const statusFilters = ["ALL", "READY_FOR_STYLING", "STYLING", "REVIEW", "DELIVERED"];

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requireAdmin();
  const requestedStatus = (await searchParams).status ?? "ALL";
  let query = createSupabaseAdminClient().from("mia_orders").select("id,order_number,service_type,amount,status,due_at,created_at,mia_clients(client_number,full_name,instagram_handle)").order("due_at", { ascending: true, nullsFirst: false });
  if (statusFilters.includes(requestedStatus) && requestedStatus !== "ALL") query = query.eq("status", requestedStatus);
  const { data, error } = await query;
  if (error) throw new Error("Could not load the styling queue.");
  const orders = (data ?? []).map((order) => ({ ...order, clients: order.mia_clients })) as unknown as QueueOrder[];
  return <main className="admin-page"><header className="admin-header"><Brand light /><div><span>{orders.length} orders</span><form action={signOutAdmin}><button type="submit">Sign out</button></form></div></header><section className="admin-shell"><div className="admin-title"><p className="section-index">MIA — STYLING WORKSPACE</p><h1>Order queue.</h1><p>Complete intakes are ordered by target delivery date.</p></div><nav className="queue-filters" aria-label="Filter orders by status">{statusFilters.map((status) => <Link className={requestedStatus === status ? "active" : ""} href={status === "ALL" ? "/admin" : `/admin?status=${status}`} key={status}>{status.replaceAll("_", " ")}</Link>)}</nav><div className="queue-list"><div className="queue-head"><span>Order / Client</span><span>Service / Submitted</span><span>Status</span><span>Due</span></div>{orders.length === 0 && <p className="empty-state">No completed intakes in this view.</p>}{orders.map((order) => <Link href={`/admin/orders/${order.id}`} className="queue-row" key={order.id}><span><strong>{order.order_number}</strong><small>{order.clients?.client_number} · {order.clients?.full_name} · @{order.clients?.instagram_handle}</small></span><span><strong>{services[order.service_type].name}</strong><small>${order.amount} · {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(order.created_at))}</small></span><span><i className={`status status-${order.status.toLowerCase()}`}>{order.status.replaceAll("_", " ")}</i></span><span><strong>{order.due_at ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(order.due_at)) : "Pending"}</strong><small>{order.due_at ? new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(new Date(order.due_at)) : ""}</small></span></Link>)}</div></section></main>;
}
