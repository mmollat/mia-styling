import { Brand } from "@/components/brand";
import { AdminLoginForm } from "@/components/admin-login-form";

export const metadata = { title: "Admin Sign In" };

export default function AdminLoginPage() {
  return <main className="portal-page admin-login-page"><header className="portal-header"><div className="container nav-row"><Brand /></div></header><section className="admin-login-card"><p className="section-index">MIA — PRIVATE WORKSPACE</p><h1>Admin<br /><em>sign in.</em></h1><AdminLoginForm /></section></main>;
}
