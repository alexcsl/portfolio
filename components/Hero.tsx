"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { SITE } from "@/lib/data";
import MagneticButton from "./MagneticButton";

/**
 * Each word ties back to a project:
 *   - on-chain dApps       → Freelancing Platform / fish-it
 *   - Web3 games           → On-Chain GameFi (Lisk)
 *   - AI for UMKMs         → Hyperlocal AI Market Chatbot
 *   - native desktop apps  → RUSA Desktop (Rust/Tauri)
 *   - Go backends          → hoshibmatchi (Go/Postgres/Redis)
 */
const ROTATING_WORDS = [
  "on-chain dApps",
  "Web3 games",
  "AI chatbots",
  "desktop apps",
  "Go backends",
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="snap-section relative flex min-h-screen flex-col justify-center px-5 sm:px-8 pt-28 pb-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 sm:gap-7"
        >
          {/* Huge display heading — two lines so long rotating words can't overflow */}
          <div className="flex flex-col gap-0 sm:gap-1">
            <motion.span
              variants={item}
              className="h-display block text-outline select-none leading-[0.88]"
            >
              I build
            </motion.span>

            {/* Rotating word on its own line — size is slightly smaller than "I build"
                so even the longest phrase ("on-chain dApps") fits on one line. */}
            <div className="h-rotator relative flex items-center gap-1 w-full">
              <div
                className="relative inline-block overflow-hidden"
                style={{ paddingBlock: "0.1em" }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={ROTATING_WORDS[index]}
                    initial={{ y: "55%", opacity: 0, filter: "blur(12px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: "-50%", opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="gradient-text inline-block whitespace-nowrap"
                  >
                    {ROTATING_WORDS[index]}.
                  </motion.span>
                </AnimatePresence>
              </div>
              <motion.span
                aria-hidden
                variants={item}
                className="inline-block bg-[rgb(var(--accent))] shrink-0"
                style={{
                  width: "0.07em",
                  height: "0.72em",
                  animation: "cursorBlink 1s steps(1) infinite",
                  marginLeft: "0.04em",
                  transform: "translateY(-0.03em)",
                }}
              />
            </div>
          </div>

          {/* Signature block */}
          <motion.div
            variants={item}
            className="mt-2 sm:mt-4 flex flex-col gap-2 max-w-xl"
          >
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-10 bg-[rgb(var(--fg)/0.3)]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[rgb(var(--fg-muted))]">
                authored by
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-[rgb(var(--fg))]">
              {SITE.name}
              <span className="text-[rgb(var(--accent))]">.</span>
            </p>
            <p className="text-sm sm:text-base text-[rgb(var(--fg-muted))]">
              {SITE.tagline} · Computer Science @ BINUS University, Jakarta.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-3 mt-1">
            <MagneticButton href="#projects" className="btn-primary" strength={0.2}>
              View selected work <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#contact" className="btn-ghost" strength={0.2}>
              Get in touch
            </MagneticButton>
          </motion.div>

          {/* Socials only — no scroll cue */}
          <motion.div
            variants={item}
            className="flex items-center gap-5 pt-2"
          >
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="text-[rgb(var(--fg-muted))] hover:text-[rgb(var(--accent))] transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="text-[rgb(var(--fg-muted))] hover:text-[rgb(var(--accent))] transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              aria-label="Email"
              className="text-[rgb(var(--fg-muted))] hover:text-[rgb(var(--accent))] transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
