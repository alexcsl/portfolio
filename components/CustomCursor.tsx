"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Theme-reactive custom cursor.
 *
 * Core dot follows exactly (via motion values, no React state on every frame).
 * Ring + two trail blobs follow through progressively laggier springs —
 * reads as a fluid, viscous trail in Sea mode / ember in Earth mode.
 *
 * Cursor color = --accent, so it swaps themes automatically.
 *
 * Interactive elements (a/button/[data-cursor='hover']) trigger a "touch"
 * state: ring grows, dot shrinks. Pointer-down triggers a squish.
 *
 * Disabled entirely on touch / coarse-pointer devices and when reduced motion
 * is preferred.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Ring lags very slightly — fluid, not laggy.
  const ringX = useSpring(x, { stiffness: 420, damping: 32, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 420, damping: 32, mass: 0.45 });

  // Trail blobs lag more for a rippling tail.
  const trail1X = useSpring(x, { stiffness: 220, damping: 26, mass: 0.7 });
  const trail1Y = useSpring(y, { stiffness: 220, damping: 26, mass: 0.7 });
  const trail2X = useSpring(x, { stiffness: 130, damping: 22, mass: 1 });
  const trail2Y = useSpring(y, { stiffness: 130, damping: 22, mass: 1 });

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

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
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
    // visible intentionally excluded — we gate inside onMove
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden
      style={{ opacity: visible ? 1 : 0, transition: "opacity 180ms ease" }}
    >
      {/* Lagging trail blob — the widest, softest wash */}
      <motion.div
        className="cursor-blob cursor-blob-3"
        style={{ x: trail2X, y: trail2Y }}
        animate={{
          scale: active ? 1.8 : pressed ? 0.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      />
      {/* Mid trail blob */}
      <motion.div
        className="cursor-blob cursor-blob-2"
        style={{ x: trail1X, y: trail1Y }}
        animate={{
          scale: active ? 1.6 : pressed ? 0.7 : 1,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      />
      {/* Outer ring */}
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: active ? 2.2 : pressed ? 0.65 : 1,
          borderWidth: active ? 1 : 1.5,
        }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
      />
      {/* Core dot — tracks exactly */}
      <motion.div
        className="cursor-dot"
        style={{ x, y }}
        animate={{
          scale: active ? 0.2 : pressed ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 520, damping: 28 }}
      />
    </div>
  );
}
