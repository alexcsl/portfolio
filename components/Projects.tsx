"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Users } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { PROJECTS, SKILLS, type Project } from "@/lib/data";

type Filter = "All" | Project["tags"][number];

const FILTERS: Filter[] = ["All", "Blockchain", "AI", "Web", "Game"];

/** Flatten SKILLS into one stack list for the marquee strip. */
const STACK = SKILLS.flatMap((g) => g.items);

export default function Projects() {
  const [filter, setFilter] = React.useState<Filter>("All");

  const filtered = React.useMemo(
    () =>
      filter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.tags.includes(filter)),
    [filter]
  );

  return (
    <section id="projects" className="relative px-5 sm:px-8 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Work · Stack"
          title={
            <>
              Things I&apos;ve{" "}
              <span className="text-[rgb(var(--fg-muted))]">built recently.</span>
            </>
          }
          description="Hackathon deliverables, on-chain demos, and side projects — each one a chance to learn a new stack under real deadlines. The tools and languages I reach for are in the strip below."
        />

        {/* Stack marquee */}
        <StackStrip items={STACK} />

        {/* Filter chips */}
        <div className="mb-8 mt-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all ${
                filter === f
                  ? "bg-[rgb(var(--accent))] text-[rgb(var(--bg))] shadow-[0_4px_22px_rgb(var(--accent-glow))]"
                  : "glass hover:border-[rgb(var(--accent)/0.4)] text-[rgb(var(--fg))]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((project, idx) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={idx}
              absoluteIndex={PROJECTS.indexOf(project)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================================
   Stack strip — horizontal infinite marquee of all techs
   ========================================================================= */
function StackStrip({ items }: { items: string[] }) {
  // Duplicate the list for seamless translate(-50%) loop.
  const duped = [...items, ...items];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-6 overflow-hidden strip-mask"
      aria-label="Tech stack I work with"
    >
      <div className="flex w-[200%] animate-marquee gap-3">
        {duped.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[rgb(var(--glass-stroke))] bg-[rgb(var(--fg)/0.03)] px-4 py-2 font-mono text-[11px] tracking-wide text-[rgb(var(--fg))] backdrop-blur-md"
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent))] shadow-[0_0_8px_rgb(var(--accent)/0.6)]"
            />
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* =========================================================================
   Interactive project card — tilt, shimmer, cursor spotlight
   ========================================================================= */
function ProjectCard({
  project,
  index,
  absoluteIndex,
}: {
  project: Project;
  index: number;
  absoluteIndex: number;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 180,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), {
    stiffness: 180,
    damping: 20,
  });
  const spotlightX = useTransform(mx, (v) => `${v * 100 + 50}%`);
  const spotlightY = useTransform(my, (v) => `${v * 100 + 50}%`);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  const cardIndexLabel = String(absoluteIndex + 1).padStart(2, "0");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.75,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="shimmer-border glass-card group relative flex h-full flex-col overflow-hidden p-7 sm:p-8 will-change-transform"
      whileHover={{
        y: -8,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Cursor spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) =>
              `radial-gradient(520px circle at ${x} ${y}, rgb(var(--accent) / 0.18), transparent 48%)`
          ),
        }}
      />

      <div className="relative flex h-full flex-col gap-5">
        {/* Header row: index + subtitle */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[rgb(var(--accent))]">
                {cardIndexLabel} · {project.subtitle}
              </span>
              <span className="font-mono text-[10px] text-[rgb(var(--fg-muted))]">
                {project.year}
              </span>
              {project.team && (
                <span className="inline-flex items-center gap-1 text-[10px] text-[rgb(var(--fg-muted))]">
                  <Users className="h-3 w-3" /> team
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold leading-tight tracking-tight">
              {project.title}
            </h3>
          </div>
          {project.links?.[0] && (
            <a
              href={project.links[0].href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Open ${project.title}`}
              className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full glass transition-all hover:-translate-y-0.5 hover:border-[rgb(var(--accent)/0.5)] hover:text-[rgb(var(--accent))]"
            >
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
            </a>
          )}
        </div>

        {/* Description */}
        <p className="text-sm sm:text-[15px] leading-relaxed text-[rgb(var(--fg-muted))]">
          {project.description}
        </p>

        {/* Tags row */}
        <div className="mb-2 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[rgb(var(--accent)/0.3)] bg-[rgb(var(--accent)/0.08)] px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-[0.14em] text-[rgb(var(--accent))]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Tech pills */}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-[rgb(var(--glass-stroke))] bg-[rgb(var(--fg)/0.02)] px-2 py-1 font-mono text-[11px] text-[rgb(var(--fg-muted))] transition-colors group-hover:text-[rgb(var(--fg))]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
