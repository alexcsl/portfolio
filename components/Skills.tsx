"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { SKILLS } from "@/lib/data";

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
              className="glass-card p-7 sm:p-8"
            >
              <div className="flex items-baseline justify-between mb-5">
                <h3 className="text-lg font-semibold tracking-tight">{group.category}</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgb(var(--fg-muted))]">
                  {String(groupIdx + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-[rgb(var(--glass-stroke))] bg-[rgb(var(--fg)/0.03)] px-3 py-1.5 text-xs font-medium text-[rgb(var(--fg))] backdrop-blur-md hover:border-accent-500/50 hover:bg-[rgb(var(--accent)/0.08)] transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
