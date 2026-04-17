"use client";

import { SITE } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 px-5 sm:px-8 pb-10 pt-4">
      <div className="mx-auto max-w-6xl">
        <div className="glass rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgb(var(--fg-muted))]">
              © {year} · {SITE.fullName}
            </span>
            <span className="text-xs text-[rgb(var(--fg-muted))] mt-1">
              Built with Next.js, Tailwind, and Framer Motion.
            </span>
          </div>
          <div className="flex items-center gap-5 font-mono text-[11px]">
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[rgb(var(--fg-muted))] hover:text-[rgb(var(--accent))] transition-colors"
            >
              github
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[rgb(var(--fg-muted))] hover:text-[rgb(var(--accent))] transition-colors"
            >
              linkedin
            </a>
            <a
              href={SITE.twitter}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[rgb(var(--fg-muted))] hover:text-[rgb(var(--accent))] transition-colors"
            >
              x
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
