import { Brand } from "./brand";
import { SiteFooter } from "./site-footer";

export function LegalLayout({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <div className="container nav-row">
          <Brand />
          <a href="/#contact" className="button button-small button-dark">Contact</a>
        </div>
      </header>
      <main className="legal-shell">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="legal-updated">Effective September 20, 2026</p>
        <div className="legal-content">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
