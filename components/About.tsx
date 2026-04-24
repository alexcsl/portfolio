"use client";

import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";

const STATS = [
  { value: "3+", label: "Hackathons shipped" },
  { value: "200+", label: "Students mentored" },
  { value: "6+", label: "Live projects" },
];

/**
 * About — a single central focal point.
 * One big declarative line sets the tone; stats below anchor the eye;
 * a short supporting sentence closes it out. No dense prose blocks.
 */
export default function About() {
  return (
    <section
      id="about"
      className="snap-section relative flex min-h-screen flex-col justify-center px-5 sm:px-8 py-24 sm:py-32"
    >
      {/* Diving-below-surface divider between Hero and About */}
      <SectionDivider variant="surface" />

      <div className="mx-auto w-full max-w-5xl flex flex-col items-center text-center gap-10 sm:gap-14">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3"
        >
          <span className="h-[1px] w-10 bg-[rgb(var(--accent))]" />
          <span className="section-label-text">About</span>
          <span className="h-[1px] w-10 bg-[rgb(var(--accent))]" />
        </motion.div>

        {/* Focal headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="h-section max-w-4xl"
        >
          I build on-chain products, AI tools, and the quiet
          infrastructure <span className="gradient-text">that makes them ship.</span>
        </motion.h2>

        {/* Central stat row — the anchor */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 gap-0 w-full max-w-3xl divide-x divide-[rgb(var(--glass-stroke))]"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: 0.15 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center gap-2 px-3 sm:px-6"
            >
              <span
                className="font-semibold tracking-tight leading-none text-[rgb(var(--accent))]"
                style={{ fontSize: "clamp(2.75rem, 7vw, 5rem)" }}
              >
                {s.value}
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[rgb(var(--fg-muted))]">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Supporting sentence */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-base sm:text-lg leading-relaxed text-[rgb(var(--fg-muted))]"
        >
          Computer Science @ BINUS · Solidity, Next.js, Rust, Go.
          Currently shipping on Base and Lisk, and teaching 200+ peers
          the same tools on the side.
        </motion.p>
      </div>
    </section>
  );
}
