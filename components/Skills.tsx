"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { SKILLS } from "@/lib/data";

// Simple letter-based icons for each skill category
const categoryIcons: Record<string, string> = {
  Blockchain: "◈",
  Languages: "⚯",
  "Web & Desktop": "◉",
  "Data & DevOps": "◆",
};

// Color accents for categories
const categoryColors: Record<string, string> = {
  Blockchain: "rgb(var(--accent))",
  Languages: "rgb(139 92 246)",
  "Web & Desktop": "rgb(34 211 238)",
  "Data & DevOps": "rgb(251 146 60)",
};

export default function Skills() {
  return (
    <section id="skills" className="relative px-5 sm:px-8 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Stack"
          title="Tools I reach for."
          description="A working toolbox across the on-chain stack, modern web, and systems — picked for what ships, not what trends."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SKILLS.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: groupIdx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass-card p-7 sm:p-8 group"
            >
              <div className="flex items-center gap-4 mb-5">
                {/* Category icon */}
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-lg transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${categoryColors[group.category]}15`,
                    color: categoryColors[group.category],
                  }}
                >
                  {categoryIcons[group.category]}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold tracking-tight">{group.category}</h3>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgb(var(--fg-muted))]">
                  {String(groupIdx + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item, idx) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: groupIdx * 0.08 + idx * 0.03,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-flex items-center rounded-full border border-[rgb(var(--glass-stroke))] bg-[rgb(var(--fg)/0.03)] px-3 py-1.5 text-xs font-medium text-[rgb(var(--fg))] backdrop-blur-md hover:border-accent-500/50 hover:bg-[rgb(var(--accent)/0.08)] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
