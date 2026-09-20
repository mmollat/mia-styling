import { Brand } from "./brand";

export function Header() {
  return (
    <header className="site-header">
      <div className="container nav-row">
        <Brand />
        <nav aria-label="Primary navigation" className="main-nav">
          <a href="#how-it-works">How It Works</a>
          <a href="#services">Services</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </nav>
        <a href="#services" className="button button-small button-dark">Get Styled</a>
      </div>
    </header>
  );
}
