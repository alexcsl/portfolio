"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { ABOUT } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="relative px-5 sm:px-8 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader label="About" title={ABOUT.intro} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7"
          >
            <p className="text-lg sm:text-xl leading-relaxed text-[rgb(var(--fg))]">
              {ABOUT.body}
            </p>
            <p className="mt-6 text-base leading-relaxed text-[rgb(var(--fg-muted))]">
              When I&apos;m not shipping smart contracts, I&apos;m mentoring 200+ students at
              BINUS as a lab assistant across Scientific Computing, Big Data, and Cloud
              Infrastructure courses, because teaching is still the sharpest way to learn.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 grid grid-cols-3 gap-3"
          >
            {ABOUT.highlights.map((h) => (
              <div
                key={h.label}
                className="glass-card flex flex-col justify-between p-5 min-h-[140px]"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgb(var(--fg-muted))]">
                  {h.label}
                </span>
                <span className="text-3xl sm:text-4xl font-semibold tracking-tight">
                  {h.value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
