import Link from "next/link";
import { Brand } from "./brand";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Brand light />
          <p>Personal styling, made simple.</p>
        </div>
        <nav aria-label="Footer navigation" className="footer-links">
          <a href="/#services">Services</a>
          <a href="/#how-it-works">How It Works</a>
          <a href="/#contact">Contact</a>
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
