import { Suspense } from "react";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { IntakeForm } from "@/components/intake-form";

export const metadata = { title: "Style Intake" };

export default function IntakePage() {
  return <main className="portal-page"><header className="portal-header"><div className="container nav-row"><Brand /><Link className="button button-outline button-small" href="/">Back to site</Link></div></header><div className="portal-hero container"><p className="section-index">MIA — CLIENT INTAKE</p><h1>You’re in.<br /><em>Let’s build your look.</em></h1><p>Tell Mia a little about yourself so she can start styling.</p></div><div className="container portal-body"><Suspense fallback={<p>Loading intake…</p>}><IntakeForm /></Suspense></div></main>;
}
