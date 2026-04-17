import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import GradientOrbs from "@/components/GradientOrbs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Alexander Christian · Blockchain & AI Developer",
  description:
    "Computer Science student and fullstack developer building dApps on Base and Lisk, and AI tools for Indonesian markets. Solidity, Next.js, Rust, and more.",
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
    title: "Alexander Christian — Blockchain & AI Developer",
    description:
      "Fullstack developer building on-chain applications across Base, Lisk, and beyond.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexander Christian — Blockchain & AI Developer",
    description:
      "Fullstack developer building on-chain applications across Base, Lisk, and beyond.",
    creator: "@alexcsl10",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafc" },
    { media: "(prefers-color-scheme: dark)", color: "#06060a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative min-h-screen font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <GradientOrbs />
          <ScrollProgress />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
