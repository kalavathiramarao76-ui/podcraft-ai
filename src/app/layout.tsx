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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("podcraft-theme")||"dark";var r=t==="system"?window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light":t;document.documentElement.setAttribute("data-theme",r);if(r==="light"){document.documentElement.style.setProperty("--pc-bg","#f8f8fa");document.documentElement.style.setProperty("--pc-text","#09090b");document.documentElement.style.setProperty("--pc-bg-card","#ffffff");document.documentElement.style.setProperty("--pc-border","rgba(0,0,0,0.08)");document.documentElement.style.setProperty("--pc-surface","rgba(0,0,0,0.03)");document.documentElement.style.setProperty("--pc-text-secondary","#52525b");document.documentElement.style.setProperty("--pc-text-muted","#71717a");document.documentElement.style.setProperty("--pc-bg-hover","#f0f0f2")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
