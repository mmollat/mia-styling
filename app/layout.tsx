import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "MIA | Men's Style — Personal Styling, Made Simple",
    template: "%s | MIA Men's Style",
  },
  description:
    "Personalized men's styling built around your wardrobe, preferences, and occasion. Choose a service and receive a clear, wearable MIA Fit Card.",
  openGraph: {
    title: "MIA | Men's Style",
    description: "Your personal stylist. Your closet. Your style—put together.",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
