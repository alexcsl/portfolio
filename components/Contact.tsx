"use client";

import * as React from "react";
import { FileText, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { SITE } from "@/lib/data";
import { useCVModal } from "@/components/CVModal";

export default function Contact() {
  const { open: openCV } = useCVModal();
  return (
    <section
      id="contact"
      className="relative w-full px-6 md:px-16 py-32 border-t border-[rgb(var(--fg)/0.06)] overflow-hidden"
    >
      {/* Marquee behind */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.06] overflow-hidden"
      >
        <div className="marquee font-serif italic text-[10rem] leading-none whitespace-nowrap text-[rgb(var(--fg))]">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i}>
              Initiate Protocol · Start Transmission · Channel Open ·
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="mono-label mb-6 flex items-center justify-center gap-3">
          <span className="pulse-dot" />
          Channel Open · Awaiting Transmission
        </div>

        <h2 className="font-serif text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-tight">
          <span className="italic font-normal text-[rgb(var(--fg)/0.85)]">
            What if we
          </span>
          <br />
          <span className="uppercase">worked together?</span>
        </h2>

        <div className="mt-12 flex justify-center">
          <a href={`mailto:${SITE.email}`} className="btn-noir text-base px-7 py-4">
            <Mail className="w-4 h-4" />
            Initiate Contact
          </a>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
          <button type="button" onClick={openCV} className="btn-ghost-noir">
            <FileText className="w-3.5 h-3.5" />
            View CV
          </button>
          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost-noir"
          >
            <Github className="w-3.5 h-3.5" />
            [ GitHub ]
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost-noir"
          >
            <Linkedin className="w-3.5 h-3.5" />
            [ LinkedIn ]
          </a>
          <a
            href={SITE.twitter}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost-noir"
          >
            <Twitter className="w-3.5 h-3.5" />
            [ X ]
          </a>
        </div>

        <div className="mt-20 mono-dim flex items-center justify-center gap-4 flex-wrap">
          <span>Secure Line Established</span>
          <span className="text-[rgb(var(--fg)/0.2)]">·</span>
          <span>© {new Date().getFullYear()} {SITE.fullName}</span>
          <span className="text-[rgb(var(--fg)/0.2)]">·</span>
          <span>End of Transmission</span>
        </div>
      </div>
    </section>
  );
}
