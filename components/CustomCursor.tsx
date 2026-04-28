"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Theme-reactive custom cursor — performance-tuned.
 *
 * Architecture:
 *   - Core dot: tracks pointer exactly via motion values (no React state per frame)
 *   - Ring: lags through a stiff spring for fluid follow
 *   - One soft trail blob: provides "fluidity" without piling on layers
 *
 * No mix-blend-mode, no filter:blur on heavy layers — those punish GPU
 * compositing when the cursor crosses backdrop-filter (glass cards, marquee
 * pills, etc.). Trail blob uses a transparent radial gradient + opacity only.
 *
 * Cursor color = --accent so theme switching is automatic.
 *
 * Disabled on touch / coarse pointer / reduced-motion.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Ring lags very slightly — fluid, not laggy.
  const ringX = useSpring(x, { stiffness: 480, damping: 32, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 480, damping: 32, mass: 0.4 });

  // Single soft trail blob.
  const trailX = useSpring(x, { stiffness: 240, damping: 26, mass: 0.7 });
  const trailY = useSpring(y, { stiffness: 240, damping: 26, mass: 0.7 });

  React.useEffect(() => {
    const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const check = () => setEnabled(hoverCapable.matches && !reduced.matches);
    check();
    hoverCapable.addEventListener("change", check);
    reduced.addEventListener("change", check);
    return () => {
      hoverCapable.removeEventListener("change", check);
      reduced.removeEventListener("change", check);
    };
  }, []);

  React.useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("cursor-hidden");

    let firstMove = true;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (firstMove) {
        firstMove = false;
        setVisible(true);
      }
    };
    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const interactiveSelector =
      "a, button, input, textarea, select, label, [role='button'], [data-cursor='hover']";

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest?.(interactiveSelector)) setActive(true);
    };
    const onOut = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest?.(interactiveSelector)) setActive(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.body.classList.remove("cursor-hidden");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden
      style={{ opacity: visible ? 1 : 0, transition: "opacity 180ms ease" }}
    >
      {/* Soft trail blob */}
      <motion.div
        className="cursor-blob"
        style={{ x: trailX, y: trailY }}
        animate={{ scale: active ? 1.5 : pressed ? 0.7 : 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      />
      {/* Outer ring */}
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: active ? 2.0 : pressed ? 0.7 : 1 }}
        transition={{ type: "spring", stiffness: 460, damping: 28 }}
      />
      {/* Core dot — tracks exactly */}
      <motion.div
        className="cursor-dot"
        style={{ x, y }}
        animate={{ scale: active ? 0.25 : pressed ? 1.5 : 1 }}
        transition={{ type: "spring", stiffness: 540, damping: 28 }}
      />
    </div>
  );
}
