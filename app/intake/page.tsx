import Link from "next/link";
import { Brand } from "@/components/brand";
import { IntakeForm } from "@/components/intake-form";
import { getServiceTypeFromSlug } from "@/lib/intake";

export const metadata = { title: "Style Intake" };

export default async function IntakePage({ searchParams }: { searchParams: Promise<{ service?: string | string[] }> }) {
  const serviceParam = (await searchParams).service;
  const serviceType = getServiceTypeFromSlug(Array.isArray(serviceParam) ? null : serviceParam);

  return <main className="portal-page"><header className="portal-header"><div className="container nav-row"><Brand /><Link className="button button-outline button-small" href="/">Back to site</Link></div></header><div className="portal-hero container"><p className="section-index">MIA — CLIENT INTAKE</p><h1>You’re in.<br /><em>Let’s build your look.</em></h1><p>Tell Mia a little about yourself so she can start styling.</p></div><div className="container portal-body">{serviceType ? <IntakeForm serviceType={serviceType} /> : <section className="invalid-service"><p className="section-index">SERVICE REQUIRED</p><h2>We couldn&apos;t identify your styling service.</h2><p>Please return to MIA | Men&apos;s Style and choose your service before completing your intake.</p><Link className="button button-dark" href="/#services">View Styling Services</Link></section>}</div></main>;
}
