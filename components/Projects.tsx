"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Github, Users } from "lucide-react";
import SectionHeader from "./SectionHeader";
import SectionDivider from "./SectionDivider";
import ProjectPreview from "./ProjectPreview";
import { PROJECTS, SKILLS, type Project } from "@/lib/data";

/** Flatten SKILLS into one stack list for the marquee strip. */
const STACK = SKILLS.flatMap((g) => g.items);

export default function Projects() {
  return (
    <section
      id="projects"
      className="snap-section relative flex flex-col"
    >
      {/* Section divider riding the boundary with About */}
      <SectionDivider variant="floor" />

      {/* Intro — takes the first viewport of the section */}
      <div className="relative min-h-screen flex flex-col justify-center px-5 sm:px-8 pt-24 sm:pt-32 pb-12">
        <div className="mx-auto w-full max-w-6xl">
          <SectionHeader
            label="Work · Stack"
            title={
              <>
                Things I&apos;ve{" "}
                <span className="text-[rgb(var(--fg-muted))]">built recently.</span>
              </>
            }
            description="Hackathon deliverables, on-chain demos, and side projects. Scroll down to pan through the rail — the tools and languages I reach for drift across the strip below."
          />

          <StackStrip items={STACK} />

          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-[rgb(var(--fg-muted))] hidden md:block">
            ↓ scroll to move horizontally →
          </p>
        </div>
      </div>

      {/* ---------- DESKTOP: horizontal scroll-jack rail ---------- */}
      <HorizontalRail />

      {/* ---------- MOBILE: vertical stack fallback ---------- */}
      <div className="md:hidden flex flex-col gap-5 px-5 pb-16">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   Horizontal scroll-jack rail — vertical scroll = horizontal pan
   ========================================================================= */
function HorizontalRail() {
  const railRef = React.useRef<HTMLDivElement>(null);
  const rowRef = React.useRef<HTMLDivElement>(null);

  const [distance, setDistance] = React.useState(0);

  React.useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const calc = () => {
      // Total distance the row must translate so its end aligns with
      // the right edge of the viewport, with some breathing room.
      const rowWidth = row.scrollWidth;
      const vw = window.innerWidth;
      setDistance(Math.max(0, rowWidth - vw + 40));
    };
    calc();
    // Recalc after images/fonts settle.
    const t = setTimeout(calc, 300);
    window.addEventListener("resize", calc);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", calc);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start start", "end end"],
  });
  // Snappier spring — the rail should feel like it's tracking the wheel,
  // not dragging a heavy object.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    mass: 0.2,
    restDelta: 0.0005,
  });
  const x = useTransform(smooth, [0, 1], [0, -distance]);

  return (
    <div
      ref={railRef}
      className="relative hidden md:block"
      // ~55vh of vertical scroll per card — roughly half the previous weight.
      style={{ height: `${Math.max(1, PROJECTS.length) * 55 + 30}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          ref={rowRef}
          style={{ x }}
          className="flex items-stretch gap-6 pl-[8vw] pr-[8vw] will-change-transform"
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
          {/* Trailing spacer + small outro card */}
          <RailOutro />
        </motion.div>
      </div>
    </div>
  );
}

/* =========================================================================
   Project card — vertical, preview-first
   ========================================================================= */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4.5, -4.5]), {
    stiffness: 200,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4.5, 4.5]), {
    stiffness: 200,
    damping: 22,
  });
  const previewScale = useSpring(1, { stiffness: 260, damping: 24 });

  const [hovered, setHovered] = React.useState(false);
  const idxLabel = String(index + 1).padStart(2, "0");

  const primaryLink = project.links?.[0]?.href;
  const isExternal = !!primaryLink?.startsWith("http");

  const cardInner = (
    <motion.div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseEnter={() => {
        setHovered(true);
        previewScale.set(1.08);
      }}
      onMouseLeave={() => {
        setHovered(false);
        mx.set(0);
        my.set(0);
        previewScale.set(1);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1400 }}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{
        duration: 0.75,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6 }}
      className="shimmer-border glass-card group relative flex h-[560px] w-[85vw] max-w-[360px] shrink-0 flex-col overflow-hidden rounded-2xl md:h-[560px] md:w-[360px]"
    >
      {/* Preview — fixed height so every card's preview is identical */}
      <div className="relative h-[280px] w-full shrink-0 overflow-hidden">
        <motion.div
          style={{ scale: previewScale }}
          className="absolute inset-0 will-change-transform"
        >
          <ProjectPreview variant={project.preview} className="h-full w-full" />
        </motion.div>

        {/* Hover overlay — CTA */}
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute inset-0 flex items-end justify-between p-5"
          style={{
            background:
              "linear-gradient(180deg, transparent 40%, rgb(var(--bg) / 0.85) 100%)",
          }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[rgb(var(--fg))]">
            {primaryLink
              ? isExternal
                ? "Open on GitHub"
                : "Open project"
              : "Private build"}
          </span>
          {primaryLink && (
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgb(var(--accent))] text-[rgb(var(--bg))] shadow-[0_6px_24px_rgb(var(--accent-glow))]">
              {isExternal ? (
                <Github className="h-4 w-4" />
              ) : (
                <ArrowUpRight className="h-4 w-4" />
              )}
            </span>
          )}
        </motion.div>

        {/* Index chip */}
        <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-[rgb(var(--bg)/0.65)] px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase text-[rgb(var(--fg))] backdrop-blur">
          <span className="text-[rgb(var(--accent))]">{idxLabel}</span>
          <span className="h-1 w-1 rounded-full bg-[rgb(var(--fg)/0.4)]" />
          <span>{project.year}</span>
        </div>
      </div>

      {/* Meta — fixed flex region so every card looks identical */}
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[rgb(var(--accent))] line-clamp-1">
              {project.subtitle}
            </span>
            <h3 className="mt-1.5 text-lg font-semibold leading-tight tracking-tight line-clamp-2 min-h-[2.5em] sm:text-xl">
              {project.title}
            </h3>
          </div>
          {project.team && (
            <span
              aria-label="Team project"
              className="inline-flex h-7 shrink-0 items-center gap-1 rounded-full border border-[rgb(var(--glass-stroke))] bg-[rgb(var(--fg)/0.03)] px-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[rgb(var(--fg-muted))]"
            >
              <Users className="h-3 w-3" /> team
            </span>
          )}
        </div>

        <p className="line-clamp-3 min-h-[3.9em] text-[13px] leading-relaxed text-[rgb(var(--fg-muted))]">
          {project.description}
        </p>

        <div className="mt-auto flex h-[52px] flex-wrap content-start gap-1.5 overflow-hidden pt-2">
          {project.tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className="rounded-md border border-[rgb(var(--glass-stroke))] bg-[rgb(var(--fg)/0.02)] px-2 py-0.5 font-mono text-[10px] text-[rgb(var(--fg-muted))] transition-colors group-hover:text-[rgb(var(--fg))]"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span className="rounded-md px-2 py-0.5 font-mono text-[10px] text-[rgb(var(--fg-muted))]">
              +{project.tech.length - 5}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );

  return primaryLink ? (
    <a
      href={primaryLink}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
      className="block will-change-transform"
      aria-label={`Open ${project.title}`}
    >
      {cardInner}
    </a>
  ) : (
    cardInner
  );
}

/* =========================================================================
   End-of-rail outro card — a soft invitation to the contact section
   ========================================================================= */
function RailOutro() {
  return (
    <a
      href="#contact"
      className="group relative flex h-[560px] w-[280px] shrink-0 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[rgb(var(--accent)/0.5)] bg-[rgb(var(--accent)/0.04)] px-8 text-center transition-colors hover:bg-[rgb(var(--accent)/0.08)]"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[rgb(var(--accent))]">
        End of rail
      </span>
      <span className="text-xl font-semibold tracking-tight">
        Want the one that&apos;s not public?
      </span>
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[rgb(var(--accent))] text-[rgb(var(--bg))] shadow-[0_6px_24px_rgb(var(--accent-glow))] transition-transform group-hover:-translate-y-1">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </a>
  );
}

/* =========================================================================
   Stack strip — infinite horizontal marquee of all techs
   ========================================================================= */
function StackStrip({ items }: { items: string[] }) {
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
