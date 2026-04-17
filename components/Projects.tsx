"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Users } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { PROJECTS, type Project } from "@/lib/data";

type Filter = "All" | Project["tags"][number];

const FILTERS: Filter[] = ["All", "Blockchain", "AI", "Web", "Game"];

export default function Projects() {
  const [filter, setFilter] = React.useState<Filter>("All");

  const filtered = React.useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter))),
    [filter]
  );

  return (
    <section id="projects" className="relative px-5 sm:px-8 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Selected work"
          title={
            <>
              Projects &amp; <span className="text-[rgb(var(--fg-muted))]">experiments.</span>
            </>
          }
          description="Hackathon deliverables, on-chain demos, and side projects. Most built under competitive deadlines."
        />

        <div className="mb-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-medium transition-all ${
                filter === f
                  ? "bg-accent-500 text-white shadow-[0_4px_20px_rgba(59,130,246,0.35)]"
                  : "glass hover:border-accent-500/40"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {filtered.map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="glass-card group relative flex h-full flex-col p-7 sm:p-8 overflow-hidden will-change-transform"
      whileHover={{
        y: -8,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Gradient glow under cursor */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [mx, my],
            ([x, y]) =>
              `radial-gradient(500px circle at ${(x as number) * 100 + 50}% ${(y as number) * 100 + 50}%, rgb(var(--accent) / 0.15), transparent 45%)`
          ),
        }}
      />

      <div className="relative flex flex-col h-full gap-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgb(var(--accent))]">
                {project.subtitle}
              </span>
              <span className="font-mono text-[10px] text-[rgb(var(--fg-muted))]">
                · {project.year}
              </span>
              {project.team && (
                <span className="inline-flex items-center gap-1 text-[10px] text-[rgb(var(--fg-muted))]">
                  <Users className="h-3 w-3" /> team
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight leading-tight">
              {project.title}
            </h3>
          </div>
          {project.links?.[0] && (
            <a
              href={project.links[0].href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Open ${project.title}`}
              className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full glass hover:border-accent-500/50 hover:text-[rgb(var(--accent))] transition-colors"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>

        <p className="text-sm sm:text-[15px] leading-relaxed text-[rgb(var(--fg-muted))]">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-[rgb(var(--glass-stroke))] bg-[rgb(var(--fg)/0.02)] px-2 py-1 text-[11px] font-mono text-[rgb(var(--fg-muted))]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
