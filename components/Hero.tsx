"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { SITE } from "@/lib/data";
import MagneticButton from "./MagneticButton";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const lineVariant = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] items-center px-5 sm:px-8 pt-16 pb-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-8"
        >
          {/* Availability badge */}
          <motion.div variants={item} className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[rgb(var(--fg-muted))]">
              Available for projects · {SITE.location}
            </span>
          </motion.div>

          {/* Main headline with staggered reveal */}
          <div className="h-display flex flex-col">
            <div className="overflow-hidden">
              <motion.span variants={lineVariant} className="block">
                Building
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                variants={lineVariant}
                className="block gradient-text"
              >
                on-chain
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span variants={lineVariant} className="block">
                & intelligent
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span variants={lineVariant} className="block">
                experiences.
              </motion.span>
            </div>
          </div>

          {/* Description */}
          <motion.p
            variants={item}
            className="max-w-2xl text-lg sm:text-xl leading-relaxed text-[rgb(var(--fg-muted))]"
          >
            I&apos;m <span className="text-[rgb(var(--fg))] font-medium">{SITE.name}</span> —
            a fullstack developer and Computer Science student shipping decentralized
            applications on Base and Lisk, and AI tools for Indonesian markets.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-wrap gap-3 pt-2">
            <MagneticButton
              href="#projects"
              className="btn-primary"
              strength={0.2}
            >
              View projects <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="btn-ghost"
              strength={0.2}
            >
              Get in touch
            </MagneticButton>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex items-center gap-5 pt-2">
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
