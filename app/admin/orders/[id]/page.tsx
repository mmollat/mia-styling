import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { services, type ServiceType } from "@/lib/intake";
import { updateOrder } from "../../actions";

type Order = { id: string; order_number: string; client_id: string; service_type: ServiceType; amount: number; status: string; occasion: string; occasion_date: string | null; due_at: string | null; revision_count: number; internal_notes: string; created_at: string };
type Client = { client_number: string; full_name: string; email: string; instagram_handle: string | null };
type Intake = { intake_data: Record<string, string>; submitted_at: string };
type OrderFile = { id: string; storage_path: string; original_filename: string };

function label(value: string) { return value.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase()); }

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const supabase = createSupabaseAdminClient();
  const { data: orderData } = await supabase.from("mia_orders").select("*").eq("id", id).maybeSingle();
  if (!orderData) notFound();
  const order = orderData as Order;
  const [{ data: clientData }, { data: intakeData }, { data: filesData }] = await Promise.all([
    supabase.from("mia_clients").select("client_number,full_name,email,instagram_handle").eq("id", order.client_id).single(),
    supabase.from("mia_intakes").select("intake_data,submitted_at").eq("order_id", id).single(),
    supabase.from("mia_order_files").select("id,storage_path,original_filename").eq("order_id", id).order("created_at"),
  ]);
  const client = clientData as Client;
  const intake = intakeData as Intake;
  const files = (filesData ?? []) as OrderFile[];
  const signed = await Promise.all(files.map(async (file) => ({ ...file, url: (await supabase.storage.from("mia-wardrobe-images").createSignedUrl(file.storage_path, 600)).data?.signedUrl ?? "" })));
  return <main className="admin-page"><header className="admin-detail-header"><Link href="/admin">← Order queue</Link><span>{order.order_number}</span></header><section className="admin-detail-shell"><div className="order-summary"><p className="section-index">{client.client_number} — {order.order_number}</p><h1>{client.full_name}</h1><p>{services[order.service_type].name} · ${order.amount}</p><dl><div><dt>Email</dt><dd>{client.email}</dd></div><div><dt>Instagram</dt><dd>@{client.instagram_handle}</dd></div><div><dt>Occasion</dt><dd>{order.occasion}</dd></div><div><dt>Occasion date</dt><dd>{order.occasion_date || "Not provided"}</dd></div><div><dt>Submitted</dt><dd>{new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeStyle: "short" }).format(new Date(order.created_at))}</dd></div><div><dt>Due</dt><dd>{order.due_at ? new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeStyle: "short" }).format(new Date(order.due_at)) : "Pending"}</dd></div></dl></div><div className="order-content"><section className="admin-panel"><h2>Intake details</h2><dl className="intake-details">{Object.entries(intake.intake_data).filter(([, value]) => value).map(([key, value]) => <div key={key}><dt>{label(key)}</dt><dd>{value}</dd></div>)}</dl></section><section className="admin-panel"><h2>Wardrobe photos</h2>{signed.length === 0 ? <p>No photos required for this service.</p> : <div className="admin-gallery">{signed.map((file) => <a href={file.url} target="_blank" rel="noreferrer" key={file.id}>{/* Signed, expiring Storage URLs are intentionally rendered without the Next image proxy. */}<img src={file.url} alt={file.original_filename} /><span>{file.original_filename}</span></a>)}</div>}</section><section className="admin-panel"><h2>Workflow</h2><form action={updateOrder} className="workflow-form"><input type="hidden" name="id" value={order.id} /><label>Status<select name="status" defaultValue={order.status}>{["READY_FOR_STYLING", "STYLING", "REVIEW", "DELIVERED"].map((status) => <option key={status}>{status}</option>)}</select></label><label>Revision count<input type="number" name="revisionCount" min="0" defaultValue={order.revision_count} /></label><label className="wide">Internal notes<textarea name="internalNotes" rows={7} defaultValue={order.internal_notes} /></label><button className="button button-dark">Save changes</button></form></section></div></section></main>;
}
