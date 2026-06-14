import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Apex House | A Private Automotive Club",
  description:
    "A private automotive club offering a members lounge, collector car storage, workshop access, and concierge vehicle care.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
