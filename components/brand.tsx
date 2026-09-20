import Link from "next/link";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`brand ${light ? "brand-light" : ""}`} aria-label="MIA Men's Style home">
      <span className="brand-main">MIA</span>
      <span className="brand-divider" aria-hidden="true" />
      <span className="brand-sub">Men&apos;s Style</span>
    </Link>
  );
}
