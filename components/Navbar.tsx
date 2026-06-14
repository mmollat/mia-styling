"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""} ${menuOpen ? "menuOpen" : ""}`}>
      <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
        <i aria-hidden="true" /> APEX HOUSE
      </a>
      <nav aria-label="Primary navigation">
        <a href="#house" onClick={() => setMenuOpen(false)}>The house</a>
        <a href="#storage" onClick={() => setMenuOpen(false)}>Vehicle care</a>
        <a href="#memberships" onClick={() => setMenuOpen(false)}>Memberships</a>
      </nav>
      <a className="navCta" href="#memberships">Explore membership</a>
      <button
        className="menuToggle"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span /><span />
      </button>
    </header>
  );
}
