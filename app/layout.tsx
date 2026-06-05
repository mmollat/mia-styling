import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Mollat Performance Wheel",
  description:
    "A first-run performance wheel concept focused on Tesla fitments, stance, and real-world drivability.",
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
