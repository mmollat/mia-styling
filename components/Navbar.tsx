"use client";

import Link from "next/link";

const navItems = [
  ["Fitments", "#fitments"],
  ["Wheel", "#wheel"],
  ["First Run", "#first-run"],
  ["Interest", "#interest"],
];

export default function Navbar() {
  return (
    <header className="nav">
      <Link href="/" className="brand" aria-label="Mollat Performance Wheel home">
        <span className="brandMark">MPW</span>
        <span className="brandText">
          <strong>Mollat</strong>
          <small>Performance Wheel</small>
        </span>
      </Link>

      <nav aria-label="Primary navigation">
        {navItems.map(([label, href]) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </nav>

      <Link href="#interest" className="outlineBtn">
        Join The List
      </Link>
    </header>
  );
}
