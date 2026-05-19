"use client";

import * as React from "react";

const TICKS = 24;

export default function ScrollProgress() {
  const [pct, setPct] = React.useState(0);
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const dragging = React.useRef(false);

  React.useEffect(() => {
    let raf = 0;
    const tick = () => {
      const h = document.documentElement;
      const top = h.scrollTop || document.body.scrollTop;
      const max = h.scrollHeight - h.clientHeight || 1;
      setPct(Math.min(1, Math.max(0, top / max)));
    };
    const onScroll = () => {
      if (dragging.current) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToPct = React.useCallback((p: number) => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight || 1;
    const clamped = Math.min(1, Math.max(0, p));
    window.scrollTo({ top: max * clamped, behavior: "auto" });
    setPct(clamped);
  }, []);

  const pctFromEvent = (clientY: number) => {
    const el = trackRef.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    return (clientY - r.top) / r.height;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    dragging.current = true;
    trackRef.current?.setPointerCapture(e.pointerId);
    scrollToPct(pctFromEvent(e.clientY));
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    scrollToPct(pctFromEvent(e.clientY));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    trackRef.current?.releasePointerCapture?.(e.pointerId);
  };

  const filled = Math.round(pct * TICKS);

  return (
    <div
      aria-hidden
      className="scroll-progress fixed right-4 top-1/2 -translate-y-1/2 z-[850] hidden md:flex flex-col items-center gap-3 select-none"
    >
      <div className="font-mono text-[10px] tracking-[0.18em] text-[rgb(var(--accent))] pointer-events-none">
        {String(Math.round(pct * 100)).padStart(3, "0")}%
      </div>

      <div
        ref={trackRef}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct * 100)}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") scrollToPct(pct + 0.04);
          if (e.key === "ArrowUp") scrollToPct(pct - 0.04);
        }}
        className="flex flex-col items-center gap-[3px] px-2 py-1 cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
      >
        {Array.from({ length: TICKS }).map((_, i) => (
          <span
            key={i}
            className={`block w-3 h-[2px] transition-colors duration-150 ${
              i < filled
                ? "bg-[rgb(var(--accent))]"
                : "bg-[rgb(var(--fg)/0.12)]"
            }`}
            style={
              i === filled - 1
                ? { boxShadow: "0 0 8px rgb(255 42 42 / 0.9)" }
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
