import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PodCraft AI — Turn One Episode Into Ten Pieces",
  description:
    "AI-powered podcast content repurposing. Generate social clips, LinkedIn posts, Twitter threads, newsletters, and show notes from a single transcript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
