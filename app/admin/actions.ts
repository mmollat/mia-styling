"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const statuses = ["READY_FOR_STYLING", "STYLING", "REVIEW", "DELIVERED"] as const;

export async function updateOrder(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const internalNotes = String(formData.get("internalNotes") ?? "").slice(0, 10000);
  const revisionCount = Math.max(0, Math.min(100, Number(formData.get("revisionCount") ?? 0) || 0));
  if (!id || !statuses.includes(status as (typeof statuses)[number])) return;
  const { error } = await createSupabaseAdminClient().from("mia_orders").update({ status, internal_notes: internalNotes, revision_count: revisionCount }).eq("id", id);
  if (error) throw new Error("Could not update the order.");
  revalidatePath("/admin"); revalidatePath(`/admin/orders/${id}`);
}

export async function signOutAdmin() {
  const { supabase } = await requireAdmin();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
