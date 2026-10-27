import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PulseMetrics Dashboard — SaaS & E-commerce Analytics",
  description:
    "Real-time revenue metrics, user activity feed, and transaction monitoring dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen antialiased selection:bg-indigo-500/20 selection:text-indigo-200">
        {children}
      </body>
    </html>
  );
}
