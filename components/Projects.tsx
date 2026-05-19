"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github, X } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/data";

type ViewMode = "slider" | "list";
type Origin = { x: number; y: number };

export default function Projects() {
  const [view, setView] = React.useState<ViewMode>("slider");
  const [active, setActive] = React.useState<number | null>(null);
  const [origin, setOrigin] = React.useState<Origin | null>(null);

  const open = (i: number, fromEl?: HTMLElement | null) => {
    if (fromEl) {
      const r = fromEl.getBoundingClientRect();
      setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    } else {
      setOrigin(null);
    }
    setActive(i);
  };
  const close = () => setActive(null);
  const next = () =>
    setActive((i) => (i === null ? 0 : (i + 1) % PROJECTS.length));
  const prev = () =>
    setActive((i) =>
      i === null ? 0 : (i - 1 + PROJECTS.length) % PROJECTS.length,
    );

  React.useEffect(() => {
    if (active !== null) document.body.classList.add("viewer-open");
    else document.body.classList.remove("viewer-open");
    return () => document.body.classList.remove("viewer-open");
  }, [active]);

  return (
    <section
      id="projects"
      className="relative w-full px-6 md:px-16 py-32 border-t border-[rgb(var(--fg)/0.06)]"
    >
      <header className="flex items-end justify-between flex-wrap gap-6 mb-12">
        <div>
          <div className="mono-label mb-3 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[rgb(var(--accent))]" />
            Selected Work
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
      {/* `open` accepts (index, fromEl) so the viewer scales from the clicked tile/row */}

      <AnimatePresence>
        {active !== null && (
          <Viewer
            project={PROJECTS[active]}
            index={active}
            total={PROJECTS.length}
            origin={origin}
            onClose={close}
            onNext={next}
            onPrev={prev}
          />
        )}
      </AnimatePresence>
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
          onClick={() => setView(m)}
          className={`px-4 py-2 transition-colors ${
            view === m
              ? "bg-[rgb(var(--accent))] text-black"
              : "text-[rgb(var(--fg)/0.6)] hover:text-[rgb(var(--accent))]"
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
    if (st.down && st.moved < 8 && st.downIndex >= 0) {
      onOpen(st.downIndex, st.downEl);
    }
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
          <Tile key={p.evidence} project={p} index={i} />
        ))}
      </div>
    </div>
  );
}

function Tile({ project, index }: { project: Project; index: number }) {
  return (
    <div data-tile-index={index} data-cursor="hover" className="tile">
      <span className="tile-corner c-tl" />
      <span className="tile-corner c-tr" />
      <span className="tile-corner c-bl" />
      <span className="tile-corner c-br" />

      <TileVisual project={project} />

      <div className="tile-content">
        <div className="flex items-start justify-between">
          <span className="tile-num">#{project.evidence}</span>
          <span className="tile-meta">{project.year}</span>
        </div>

        <div>
          <div className="tile-meta mb-2 opacity-80">{project.type}</div>
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
    </div>
  );
}

function TileVisual({
  project,
  showNumeral = true,
}: {
  project: Project;
  showNumeral?: boolean;
}) {
  const hue = hueFor(project.preview);

  if (project.image) {
    return (
      <div
        className="tile-visual"
        aria-hidden
        style={{
          backgroundImage: `url("${project.image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    );
  }

  return (
    <div
      className="tile-visual"
      aria-hidden
      style={{
        background: `
          radial-gradient(120% 70% at 80% 20%, hsl(${hue} 70% 28% / 0.95), transparent 60%),
          radial-gradient(120% 70% at 10% 90%, hsl(${(hue + 50) % 360} 55% 18% / 0.95), transparent 65%),
          linear-gradient(160deg, hsl(${hue} 45% 12%) 0%, hsl(${hue} 30% 6%) 60%, #060606 100%)
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
          <pattern id={`g-${project.evidence}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#g-${project.evidence})`} />
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
          {project.evidence}
        </div>
      )}
    </div>
  );
}

function hueFor(p: string): number {
  switch (p) {
    case "freelancing": return 210;
    case "gamefi": return 145;
    case "chatbot": return 280;
    case "desktop": return 25;
    case "social": return 330;
    case "workshop": return 195;
    case "mobile": return 90;
    default: return 0;
  }
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
        <li key={p.evidence}>
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
                  #{p.evidence}
                </span>
              </div>
            </div>

            <div className="flex-1 min-w-0 pl-6">
              <h3 className="font-serif text-2xl md:text-3xl uppercase leading-tight group-hover:text-[rgb(var(--accent))] transition-colors">
                {p.title}
              </h3>
              <div className="mt-1 mono-dim">
                {p.subtitle} · {p.tech.slice(0, 4).join(" · ")}
              </div>
            </div>

            <div className="hidden md:flex flex-col items-end mono-dim min-w-[110px] pr-6">
              <span>{p.year}</span>
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
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
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
      className="viewer-bg fixed inset-0 z-[1000]"
      initial={{
        opacity: 1,
        clipPath: `circle(0px at ${ox}px ${oy}px)`,
      }}
      animate={{
        opacity: 1,
        clipPath: `circle(${maxR}px at ${ox}px ${oy}px)`,
      }}
      exit={{
        opacity: 1,
        clipPath: `circle(0px at ${ox}px ${oy}px)`,
      }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5 border-b border-[rgb(var(--fg)/0.1)] viewer-glass">
        <div className="mono-label flex items-center gap-3">
          <span className="text-[rgb(var(--accent))]">PROJECT</span>
          <span className="text-[rgb(var(--fg)/0.5)]">#{project.evidence}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            aria-label="Previous project"
            className="grid place-items-center w-9 h-9 border border-[rgb(var(--fg)/0.12)] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))] transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="mono-dim px-2">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button
            onClick={onNext}
            aria-label="Next project"
            className="grid place-items-center w-9 h-9 border border-[rgb(var(--fg)/0.12)] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))] transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-2 grid place-items-center w-9 h-9 border border-[rgb(var(--fg)/0.12)] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <motion.div
        key={project.evidence}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
        className="relative z-10 grid grid-cols-1 lg:grid-cols-[320px_1fr_340px] gap-0 h-[calc(100vh-72px)] overflow-y-auto"
      >
        {/* Sidebar */}
        <aside className="border-r border-[rgb(var(--fg)/0.08)] p-6 md:p-8 viewer-glass">
          <div className="bracket-frame border border-[rgb(var(--fg)/0.08)] p-5 bg-black/40">
            <span className="br-tl" />
            <span className="br-tr" />
            <span className="br-bl" />
            <span className="br-br" />

            <h3 className="mono-label mb-5">Metadata</h3>

            <SidebarRow label="Year" value={project.year} />
            <SidebarRow label="Context" value={project.context ?? "Personal"} />
            {project.client && <SidebarRow label="Client" value={project.client} />}
            {project.time && <SidebarRow label="Time" value={project.time} />}
            <SidebarRow
              label="Team"
              value={project.team ? "Collaborative" : "Solo"}
            />

            <div className="mt-6">
              <div className="mono-dim mb-2">Tags</div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
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

            {project.links && project.links.length > 0 && (
              <div className="mt-6">
                <div className="mono-dim mb-2">Useful Links</div>
                <ul className="space-y-2">
                  {project.links.map((l) => (
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
        <article className="relative p-6 md:p-14 overflow-y-auto">
          <div className="max-w-2xl">
            <div className="mono-label mb-3">{project.type}</div>
            <h2 className="font-serif text-4xl md:text-6xl uppercase leading-[0.95] tracking-tight">
              {project.title}
            </h2>
            <div className="mono-dim mt-3">{project.subtitle}</div>

            <div className="mt-12">
              <div className="mono-label mb-3 flex items-center gap-3">
                <span className="inline-block w-6 h-px bg-[rgb(var(--accent))]" />
                Brief
              </div>
              <p className="text-base md:text-lg leading-relaxed text-[rgb(var(--fg)/0.92)]">
                {project.mission}
              </p>
            </div>

            {project.intervention && (
              <div className="mt-10">
                <div className="mono-label mb-3 flex items-center gap-3">
                  <span className="inline-block w-6 h-px bg-[rgb(var(--accent))]" />
                  My Role
                </div>
                <p className="text-base md:text-lg leading-relaxed text-[rgb(var(--fg)/0.92)]">
                  {project.intervention}
                </p>
              </div>
            )}

            <div className="mt-14 pt-6 border-t border-[rgb(var(--fg)/0.08)] mono-dim">
              Press ESC to close. Use arrow keys to navigate.
            </div>
          </div>
        </article>

        {/* Gallery */}
        <aside className="hidden lg:block border-l border-[rgb(var(--fg)/0.08)] p-6 md:p-8 viewer-glass">
          <div className="mono-label mb-5 flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-[rgb(var(--accent))]" />
            Gallery
          </div>

          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="gallery-slot bracket-frame aspect-[4/5] border border-[rgb(var(--fg)/0.08)] grid place-items-center"
              >
                <span className="br-tl" />
                <span className="br-tr" />
                <span className="br-bl" />
                <span className="br-br" />
                <div className="text-center pointer-events-none">
                  <div className="font-mono text-[9px] tracking-[0.2em] text-[rgb(var(--fg)/0.5)]">
                    IMG_{String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="font-mono text-[8px] tracking-[0.2em] text-[rgb(var(--fg)/0.3)] mt-1">
                    UNCLASSIFIED
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 mono-dim text-[10px] leading-relaxed">
            Awaiting upload. Project captures will populate this gallery as
            cases are documented.
          </div>
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
