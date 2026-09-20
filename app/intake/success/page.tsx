import { Brand } from "@/components/brand";
import Link from "next/link";
import { services, type ServiceType } from "@/lib/intake";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Intake Received" };

export default async function IntakeSuccess({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  const service = services[params.service as ServiceType];
  const due = params.due ? new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeStyle: "short" }).format(new Date(params.due)) : null;
  return <main className="portal-page success-page"><header className="portal-header"><div className="container nav-row"><Brand /><Link className="button button-outline button-small" href="/">Back to site</Link></div></header><section className="success-card"><p className="section-index">INTAKE RECEIVED</p><h1>You’re<br /><em>all set.</em></h1><p>Mia has everything she needs to start building your look.</p><dl><div><dt>Client ID</dt><dd>{params.client ?? "—"}</dd></div><div><dt>Fit / Order ID</dt><dd>{params.order ?? "—"}</dd></div><div><dt>Service purchased</dt><dd>{service?.name ?? "MIA styling"}</dd></div>{due && <div><dt>Expected delivery</dt><dd>{due}</dd></div>}</dl><p>Keep your Fit ID handy. Mia may use it when communicating with you about your styling request.</p><a className="button button-dark" href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">MESSAGE MIA ON INSTAGRAM <span>↗</span></a></section></main>;
}
