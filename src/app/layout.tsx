import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ToastProvider";
import { AuthGate } from "@/components/AuthGate";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://podcraft-ai.vercel.app"),
  title: "PodCraft AI — Turn Podcasts into 10+ Content Pieces",
  description:
    "AI-powered podcast content repurposer. Generate summaries, clips, LinkedIn posts, Twitter threads, newsletters, and show notes from any transcript.",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  openGraph: {
    title: "PodCraft AI — Turn Podcasts into 10+ Content Pieces",
    description:
      "AI-powered podcast content repurposer. Generate summaries, clips, LinkedIn posts, Twitter threads, newsletters, and show notes from any transcript.",
    url: "https://podcraft-ai.vercel.app",
    siteName: "PodCraft AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PodCraft AI — Turn Podcasts into 10+ Content Pieces",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PodCraft AI — Turn Podcasts into 10+ Content Pieces",
    description:
      "AI-powered podcast content repurposer. Generate summaries, clips, LinkedIn posts, Twitter threads, newsletters, and show notes from any transcript.",
    images: ["/og-image.png"],
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "PodCraft AI",
              url: "https://podcraft-ai.vercel.app",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description:
                "AI-powered podcast content repurposer. Generate summaries, clips, LinkedIn posts, Twitter threads, newsletters, and show notes from any transcript.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Organization",
                name: "AISurgent.Dev",
                url: "https://aisurgent.dev",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <AuthGate><ToastProvider>{children}</ToastProvider></AuthGate>
      </body>
    </html>
  );
}
