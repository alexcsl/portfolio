"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function GradientOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth spring for parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Different parallax transforms for each orb
  const orb1Y = useTransform(smoothProgress, [0, 1], [0, -120]);
  const orb1X = useTransform(smoothProgress, [0, 1], [0, 30]);

  const orb2Y = useTransform(smoothProgress, [0, 1], [0, 100]);
  const orb2X = useTransform(smoothProgress, [0, 1], [0, -40]);

  const orb3Y = useTransform(smoothProgress, [0, 1], [0, -60]);
  const orb3Scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.05, 1]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Orb 1 - top-right, accent */}
      <motion.div
        style={{ y: orb1Y, x: orb1X }}
        className="absolute -top-32 right-[-8rem] h-[38rem] w-[38rem] rounded-full animate-orb-drift-1 will-change-transform"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgb(var(--accent) / 0.55), transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      {/* Orb 2 - bottom-left, purple-ish */}
      <motion.div
        style={{ y: orb2Y, x: orb2X }}
        className="absolute -bottom-40 left-[-10rem] h-[42rem] w-[42rem] rounded-full animate-orb-drift-2 will-change-transform"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 70% 70%, rgb(139 92 246 / 0.45), transparent 60%)",
            filter: "blur(90px)",
          }}
        />
      </motion.div>

      {/* Orb 3 - center, cyan-ish */}
      <motion.div
        style={{ y: orb3Y, scale: orb3Scale }}
        className="absolute top-1/2 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full animate-orb-drift-3 will-change-transform"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgb(34 211 238 / 0.25), transparent 60%)",
            filter: "blur(100px)",
          }}
        />
      </motion.div>

      {/* Noise overlay with subtle animation */}
      <div className="noise" />
      <div className="noise-animated" />
    </div>
  );
}
