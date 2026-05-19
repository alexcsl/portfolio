import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CVModalProvider } from "@/components/CVModal";
import CustomCursor from "@/components/CustomCursor";
import Hud from "@/components/Hud";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Alexander Christian · Case File KH-03",
  description:
    "Fullstack and blockchain developer. Shipped work across Solidity, Next.js, Rust, AI/ML for Indonesian markets and L2 ecosystems.",
  keywords: [
    "Alexander Christian",
    "alexcsl",
    "blockchain developer",
    "Solidity",
    "Next.js",
    "Base L2",
    "Lisk",
    "portfolio",
  ],
  authors: [{ name: "Alexander Christian Suryanto Linggodigdo" }],
  creator: "Alexander Christian",
  openGraph: {
    title: "Alexander Christian, Blockchain and AI Developer",
    description:
      "Fullstack developer building on-chain applications across Base, Lisk, and beyond.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexander Christian, Blockchain and AI Developer",
    description:
      "Fullstack developer building on-chain applications across Base, Lisk, and beyond.",
    creator: "@alexcsl10",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))] antialiased">
        <CVModalProvider>
          {/* Background layers */}
          <div className="grid-bg" aria-hidden />
          <div className="vignette" aria-hidden />

          {/* Persistent HUD overlay */}
          <Hud />

          {/* Techno scroll progress */}
          <ScrollProgress />

          {/* Custom cursor */}
          <CustomCursor />

          {/* Page content */}
          <main className="relative z-10">{children}</main>

          {/* Noise grain on top */}
          <div className="noise-overlay" aria-hidden />
        </CVModalProvider>
      </body>
    </html>
  );
}
