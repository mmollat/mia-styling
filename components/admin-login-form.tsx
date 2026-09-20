"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setLoading(true);
    try {
      const form = new FormData(event.currentTarget);
      const { error: authError } = await createSupabaseBrowserClient().auth.signInWithPassword({ email: String(form.get("email")), password: String(form.get("password")) });
      if (authError) { setError("The email or password was not recognized."); setLoading(false); return; }
      router.replace("/admin"); router.refresh();
    } catch { setError("Admin access is not configured yet."); setLoading(false); }
  }
  return <form className="admin-login-form" onSubmit={submit}><label>Email<input name="email" type="email" autoComplete="username" required /></label><label>Password<input name="password" type="password" autoComplete="current-password" required /></label>{error && <p role="alert">{error}</p>}<button className="button button-dark" disabled={loading}>{loading ? "SIGNING IN…" : "SIGN IN"}</button></form>;
}
