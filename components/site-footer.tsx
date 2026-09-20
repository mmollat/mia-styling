import Link from "next/link";
import { Brand } from "./brand";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Brand light full />
        </div>
        <nav aria-label="Footer navigation" className="footer-links">
          <a href="/#services">Services</a>
          <a href="/#how-it-works">How It Works</a>
          <a href="/#contact">Contact</a>
          <a className="instagram-link" href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
            <svg aria-hidden="true" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            Instagram
          </a>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/refunds">Refund Policy</Link>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} MIA | Men&apos;s Style</span>
        <span>Style thoughtfully. Wear confidently.</span>
      </div>
    </footer>
  );
}
