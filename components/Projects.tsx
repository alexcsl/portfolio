"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, Github, X } from "lucide-react";
import { projects as PROJECTS, type Project } from "@/lib/projects";
import ProjectGallery from "@/components/ProjectGallery";

type ViewMode = "slider" | "list";
type Origin = { x: number; y: number };

export default function Projects() {
  const [view, setView] = React.useState<ViewMode>("slider");
  const [active, setActive] = React.useState<number | null>(null);
  const [origin, setOrigin] = React.useState<Origin | null>(null);
  const trigger = React.useRef<HTMLElement | null>(null);

  const open = (i: number, fromEl?: HTMLElement | null) => {
    trigger.current = fromEl ?? null;
    if (fromEl) {
      const r = fromEl.getBoundingClientRect();
      setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    } else {
      setOrigin(null);
    }
    setActive(i);
  };
  const close = () => {
    setActive(null);
    requestAnimationFrame(() => trigger.current?.focus());
  };
  const next = () =>
    setActive((i) => (i === null ? 0 : (i + 1) % PROJECTS.length));
  const prev = () =>
    setActive((i) =>
      i === null ? 0 : (i - 1 + PROJECTS.length) % PROJECTS.length,
    );

  React.useEffect(() => {
    const main = document.querySelector("main");
    if (main) main.inert = active !== null;
    if (active !== null) document.body.classList.add("viewer-open");
    else document.body.classList.remove("viewer-open");
    return () => {
      document.body.classList.remove("viewer-open");
      if (main) main.inert = false;
    };
  }, [active]);

  return (
    <section
      id="projects"
      className="relative w-full px-6 md:px-16 py-32 border-t border-[rgb(var(--fg)/0.06)]"
    >
      <header className="flex items-end justify-between flex-wrap gap-6 mb-12">
        <div>
          <div className="mono-label mb-3 flex items-center gap-3">
            <span className="rule-rg" />
            <span className="gold-word">Deployments</span>
          </div>
          <h2 className="h-section uppercase">Projects</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="mono-dim mr-2">
            {String(PROJECTS.length).padStart(2, "0")} files
          </div>
          <ViewToggle view={view} setView={setView} />
        </div>
      </header>

      {view === "slider" ? (
        <TileRail onOpen={open} />
      ) : (
        <ListView onOpen={open} />
      )}

      {typeof document !== "undefined" && createPortal(<AnimatePresence>
        {active !== null && (
          <Viewer
            key="project-viewer"
            project={PROJECTS[active]}
            index={active}
            total={PROJECTS.length}
            origin={origin}
            onClose={close}
            onNext={next}
            onPrev={prev}
          />
        )}
      </AnimatePresence>, document.body)}
    </section>
  );
}

function ViewToggle({
  view,
  setView,
}: {
  view: ViewMode;
  setView: (v: ViewMode) => void;
}) {
  return (
    <div className="inline-flex border border-[rgb(var(--fg)/0.12)] font-mono text-[10px] tracking-[0.18em] uppercase">
      {(["slider", "list"] as const).map((m) => (
        <button
          key={m}
          type="button"
          aria-pressed={view === m}
          onClick={() => setView(m)}
          className={`px-4 py-2 transition-colors ${
            view === m
              ? "bg-[rgb(var(--gold))] text-black"
              : "text-[rgb(var(--fg)/0.6)] hover:text-[rgb(var(--gold))]"
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  );
}

/* ---------- Tile rail (slider) ---------- */
function TileRail({
  onOpen,
}: {
  onOpen: (i: number, fromEl?: HTMLElement | null) => void;
}) {
  const railRef = React.useRef<HTMLDivElement | null>(null);
  const state = React.useRef({
    down: false,
    startX: 0,
    startScroll: 0,
    moved: 0,
    downIndex: -1,
    downEl: null as HTMLElement | null,
  });
  const [dragging, setDragging] = React.useState(false);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const el = railRef.current;
    if (!el) return;
    const target = (e.target as HTMLElement).closest(
      "[data-tile-index]",
    ) as HTMLElement | null;
    const idx = target
      ? Number(target.getAttribute("data-tile-index"))
      : -1;
    state.current = {
      down: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: 0,
      downIndex: idx,
      downEl: target,
    };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const st = state.current;
    const el = railRef.current;
    if (!st.down || !el) return;
    const dx = e.clientX - st.startX;
    st.moved = Math.abs(dx);
    if (st.moved > 6 && !dragging) setDragging(true);
    el.scrollLeft = st.startScroll - dx;
  };
  const onPointerUp = () => {
    const st = state.current;
    st.down = false;
    setTimeout(() => setDragging(false), 0);
  };

  const scrollByAmount = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(320, el.clientWidth * 0.6), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Previous"
        onClick={() => scrollByAmount(-1)}
        className="hidden sm:grid place-items-center absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-11 h-11 border border-[rgb(var(--fg)/0.15)] bg-black/70 backdrop-blur hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))] transition"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => scrollByAmount(1)}
        className="hidden sm:grid place-items-center absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-11 h-11 border border-[rgb(var(--fg)/0.15)] bg-black/70 backdrop-blur hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))] transition"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <div
        ref={railRef}
        className={`tile-rail overflow-x-auto pb-6 -mx-1 px-1 ${dragging ? "dragging" : ""}`}
        style={{ scrollbarWidth: "none" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {PROJECTS.map((p, i) => (
          <Tile key={p.slug} project={p} index={i} onOpen={(element, keyboard) => {
            if (keyboard || state.current.moved < 8) onOpen(i, element);
          }} />
        ))}
      </div>
    </div>
  );
}

function Tile({ project, index, onOpen }: { project: Project; index: number; onOpen: (element: HTMLElement, keyboard: boolean) => void }) {
  return (
    <button type="button" data-tile-index={index} data-cursor="hover" className="tile text-left" aria-label={`View ${project.title} details`} onClick={(event) => onOpen(event.currentTarget, event.detail === 0)}>
      <span className="tile-corner c-tl" />
      <span className="tile-corner c-tr" />
      <span className="tile-corner c-bl" />
      <span className="tile-corner c-br" />

      <TileVisual project={project} />

      <div className="tile-content">
        <div className="flex items-start justify-between">
          <span className="tile-num">#{project.number}</span>
          <span className="tile-meta">{project.category}</span>
        </div>

        <div>
          <div className="tile-meta mb-2 opacity-80">{project.eyebrow}</div>
          <h3 className="tile-title">{project.title}</h3>
          <div className="mt-3 flex flex-wrap gap-1.5 max-w-full">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="font-mono text-[9px] uppercase tracking-[0.14em] px-1.5 py-0.5 border border-[rgb(var(--fg)/0.25)] text-[rgb(var(--fg)/0.85)] bg-black/30"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

function TileVisual({
  project,
  showNumeral = true,
}: {
  project: Project;
  showNumeral?: boolean;
}) {
  const cover = project.media[0];
  if (cover) {
    return (
      <div
        className="tile-visual"
        aria-hidden
      >
        <Image src={cover.src} alt="" fill sizes="(max-width: 640px) 280px, 340px" className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className="tile-visual"
      aria-hidden
      style={{
        background: `
          linear-gradient(160deg, #222 0%, #111 60%, #060606 100%)
        `,
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.18]"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <pattern id={`g-${project.slug}-${showNumeral ? "tile" : "list"}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#g-${project.slug}-${showNumeral ? "tile" : "list"})`} />
      </svg>

      {showNumeral && (
        <div
          aria-hidden
          className="absolute inset-0 grid place-items-center"
          style={{
            fontFamily: "Playfair Display, serif",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "clamp(8rem, 18vw, 14rem)",
            color: "rgb(255 255 255 / 0.08)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          {project.number}
        </div>
      )}
    </div>
  );
}

/* ---------- List ---------- */
function ListView({
  onOpen,
}: {
  onOpen: (i: number, fromEl?: HTMLElement | null) => void;
}) {
  return (
    <ul className="border-t border-[rgb(var(--fg)/0.08)]">
      {PROJECTS.map((p, i) => (
        <li key={p.slug}>
          <button
            onClick={(e) => onOpen(i, e.currentTarget)}
            data-cursor="hover"
            className="list-row group"
          >
            {/* Thumbnail (same grayscale-to-color behaviour as tiles) */}
            <div className="list-thumb">
              <TileVisual project={p} showNumeral={false} />
              <div className="list-thumb-overlay">
                <span className="font-mono text-[10px] tracking-[0.18em] text-[rgb(var(--accent))]">
                  #{p.number}
                </span>
              </div>
            </div>

            <div className="flex-1 min-w-0 pl-6">
              <h3 className="font-serif text-2xl md:text-3xl uppercase leading-tight group-hover:text-[rgb(var(--accent))] transition-colors">
                {p.title}
              </h3>
              <div className="mt-1 mono-dim">
                {p.eyebrow} · {p.tech.slice(0, 4).join(" · ")}
              </div>
            </div>

            <div className="hidden md:flex flex-col items-end mono-dim min-w-[110px] pr-6">
              <span>{p.category}</span>
              <span>{p.context}</span>
            </div>

            <span className="mono-dim group-hover:text-[rgb(var(--accent))] transition-colors hidden sm:inline pr-2">
              OPEN →
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Viewer overlay (red ambiance + glass) ---------- */
function Viewer({
  project,
  index,
  total,
  origin,
  onClose,
  onNext,
  onPrev,
}: {
  project: Project;
  index: number;
  total: number;
  origin: Origin | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const dialog = React.useRef<HTMLDivElement>(null);
  const closeButton = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => { closeButton.current?.focus(); }, []);
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (document.getElementById("project-lightbox") || e.defaultPrevented) return;
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
      if (e.key === "ArrowRight") { e.preventDefault(); onNext(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); onPrev(); }
      if (e.key === "Tab") {
        const controls = Array.from(dialog.current?.querySelectorAll<HTMLElement>('button, a[href]') ?? []);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, onNext, onPrev]);

  React.useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Clip-path circle reveal from origin. Falls back to center if no origin.
  const ox = origin?.x ?? (typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const oy = origin?.y ?? (typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const maxR =
    typeof window !== "undefined"
      ? Math.hypot(
          Math.max(ox, window.innerWidth - ox),
          Math.max(oy, window.innerHeight - oy),
        )
      : 1500;

  return (
    <motion.div
      ref={dialog}
      id="project-viewer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
      className="viewer-bg fixed inset-0 z-[1000]"
      initial={reducedMotion ? false : {
        opacity: 1,
        clipPath: `circle(0px at ${ox}px ${oy}px)`,
      }}
      animate={{
        opacity: 1,
        clipPath: `circle(${maxR}px at ${ox}px ${oy}px)`,
      }}
      exit={reducedMotion ? { opacity: 0 } : {
        opacity: 1,
        clipPath: `circle(0px at ${ox}px ${oy}px)`,
      }}
      transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative z-10 flex items-center justify-between px-6 md:px-10 py-4 border-b border-[rgb(var(--fg)/0.1)] viewer-glass">
        <div className="mono-label flex items-center gap-3">
          <span className="hidden sm:inline text-[rgb(var(--accent))]">PROJECT</span>
          <span className="text-[rgb(var(--fg)/0.5)]">#{project.number}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            aria-label="Previous project"
            className="grid place-items-center w-11 h-11 border border-[rgb(var(--fg)/0.12)] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))] transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="mono-dim px-2 whitespace-nowrap">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button
            onClick={onNext}
            aria-label="Next project"
            className="grid place-items-center w-11 h-11 border border-[rgb(var(--fg)/0.12)] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))] transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            ref={closeButton}
            onClick={onClose}
            aria-label="Close"
            className="ml-2 grid place-items-center w-11 h-11 border border-[rgb(var(--fg)/0.12)] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <motion.div
        key={project.slug}
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1], delay: reducedMotion ? 0 : 0.18 }}
        className="viewer-columns relative z-10 grid grid-cols-1 gap-0 h-[calc(100dvh-77px)] overflow-y-auto"
      >
        {/* Sidebar */}
        <aside className="border-r border-[rgb(var(--fg)/0.08)] p-6 md:p-8 viewer-glass">
          <div className="bracket-frame border border-[rgb(var(--fg)/0.08)] p-5 bg-black/40">
            <span className="br-tl" />
            <span className="br-tr" />
            <span className="br-bl" />
            <span className="br-br" />

            <h3 className="mono-label mb-5">Metadata</h3>

            <SidebarRow label="Context" value={project.context} />

            <div className="mt-6">
              <div className="mono-dim mb-2">Tags</div>
              <div className="flex flex-wrap gap-2">
                {[project.category].map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] uppercase tracking-[0.16em] px-2 py-1 border border-[rgb(var(--fg)/0.15)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="mono-dim mb-2">Stacks</div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] uppercase tracking-[0.16em] px-2 py-1 border border-[rgb(var(--accent)/0.3)] text-[rgb(var(--accent))]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {(project.source.href || project.links.length > 0) && (
              <div className="mt-6">
                <div className="mono-dim mb-2">Useful Links</div>
                <ul className="space-y-2">
                  {[...(project.source.href ? [{ label: project.source.label, href: project.source.href }] : []), ...project.links].map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-[11px] text-[rgb(var(--fg)/0.8)] hover:text-[rgb(var(--accent))] transition"
                      >
                        {l.label.toLowerCase().includes("github") ? (
                          <Github className="w-3.5 h-3.5" />
                        ) : (
                          <ExternalLink className="w-3.5 h-3.5" />
                        )}
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>

        {/* Brief */}
        <article className="relative min-w-0 p-6 md:p-14">
          <div className="max-w-2xl">
            <div className="mono-label mb-3">{project.eyebrow}</div>
            <h2 id="project-title" className="font-serif text-4xl md:text-6xl uppercase leading-[0.95] tracking-tight [overflow-wrap:anywhere]">
              {project.title}
            </h2>

            <div className="mt-12">
              <div className="mono-label mb-3 flex items-center gap-3">
                <span className="rule-rg" />
                Brief
              </div>
              <p className="text-base md:text-lg leading-relaxed text-[rgb(var(--fg)/0.92)]">
                {project.summary}
              </p>
            </div>

            {project.contribution && (
              <div className="mt-10">
                <div className="mono-label mb-3 flex items-center gap-3">
                  <span className="rule-rg" />
                  My Role
                </div>
                <p className="text-base md:text-lg leading-relaxed text-[rgb(var(--fg)/0.92)]">
                  {project.contribution}
                </p>
              </div>
            )}

            {project.sections.map((section) => (
              <section key={section.heading} className="mt-10">
                <h3 className="mono-label mb-3 flex items-center gap-3"><span className="rule-rg" />{section.heading}</h3>
                <p className="text-base md:text-lg leading-relaxed text-[rgb(var(--fg)/0.92)]">{section.body}</p>
              </section>
            ))}
          </div>
        </article>

        {/* Gallery */}
        <aside className="min-w-0 border-l border-[rgb(var(--fg)/0.08)] p-6 md:p-8 viewer-glass">
          <div className="mono-label mb-5 flex items-center gap-3">
            <span className="rule-rg" />
            Gallery
          </div>

          <ProjectGallery key={project.slug} title={project.title} media={project.media} />
          {!project.media.length && (
            <div className="mt-6 mono-dim text-[10px] leading-relaxed">
              Project screenshots are being prepared.
            </div>
          )}
        </aside>
      </motion.div>
    </motion.div>
  );
}

function SidebarRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2 border-b border-[rgb(var(--fg)/0.06)] last:border-0">
      <span className="mono-dim">{label}</span>
      <span className="font-mono text-[12px] text-[rgb(var(--fg)/0.9)] text-right">
        {value}
      </span>
    </div>
  );
}
