import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  const allowedEmail = process.env.MIA_ADMIN_EMAIL?.toLowerCase();
  const isAdmin = user && allowedEmail && user.email?.toLowerCase() === allowedEmail;
  if (!isAdmin) redirect("/admin/login");
  return { user, supabase };
}
