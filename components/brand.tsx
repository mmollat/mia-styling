import Image from "next/image";
import Link from "next/link";

export function Brand({
  light = false,
  full = false,
}: {
  light?: boolean;
  full?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`brand ${light ? "brand-light" : ""} ${full ? "brand-full" : ""}`}
      aria-label="MIA Men's Style home"
    >
      <Image
        src={full ? "/brand/mia-logo-full.png" : "/brand/mia-logo-wordmark.png"}
        alt="MIA Men's Style"
        width={full ? 1580 : 1123}
        height={full ? 594 : 476}
        priority={!full}
      />
    </Link>
  );
}
