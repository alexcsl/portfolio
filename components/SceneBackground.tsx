"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Theme-reactive animated background.
 * - Sea mode (light): layered SVG waves drifting, bright sky gradient, sun glow.
 * - Earth mode (dark): layered dune silhouettes, warm ember glow, drifting dust particles.
 * Both scenes render simultaneously and cross-fade via `.scene-sea` / `.scene-earth`
 * opacity rules keyed off the `.dark` class.
 */
export default function SceneBackground() {
  const ref = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.001,
  });

  const skyY = useTransform(smooth, [0, 1], [0, 80]);
  const wavesY = useTransform(smooth, [0, 1], [0, 50]);
  const embersY = useTransform(smooth, [0, 1], [0, -120]);
  const glowScale = useTransform(smooth, [0, 0.5, 1], [1, 1.18, 1]);

  // Deterministic particle positions so SSR/CSR don't mismatch.
  // Cut count from 44 → 22 — same visual mood, half the GPU work.
  const particles = React.useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        left: (i * 73) % 100,
        top: (i * 37) % 100,
        size: 1 + (i % 3),
        delay: (i % 10) * 0.6,
        duration: 9 + (i % 7),
        opacity: 0.35 + ((i * 17) % 40) / 100,
      })),
    []
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* ====================================================
         SEA SCENE — shown in light (Sea) mode
         ==================================================== */}
      <div className="scene-sea absolute inset-0">
        {/* Sky gradient */}
        <motion.div style={{ y: skyY }} className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgb(var(--scene-top)) 0%, rgb(var(--scene-mid) / 0.7) 42%, rgb(var(--scene-bottom) / 0.35) 100%)",
            }}
          />
        </motion.div>

        {/* Sun glow top-right */}
        <motion.div
          style={{ scale: glowScale }}
          className="absolute -top-24 -right-24 h-[42rem] w-[42rem] animate-glow-pulse"
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgb(254 243 199 / 0.6), rgb(253 230 138 / 0.25) 35%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </motion.div>

        {/* Subtle grid */}
        <div className="absolute inset-0 grid-bg opacity-40" />

        {/* Wave layers */}
        <motion.div style={{ y: wavesY }} className="absolute inset-x-0 bottom-0 h-[70vh]">
          <WaveLayer
            fill="rgb(var(--wave-3))"
            viewBox="0 0 1200 220"
            path="M0,110 C180,70 420,160 600,110 C780,60 1020,160 1200,110 L1200,220 L0,220 Z"
            outerClass="absolute inset-x-0 bottom-[38%] h-[38vh] opacity-70"
            animationClass="animate-wave-slow"
          />
          <WaveLayer
            fill="rgb(var(--wave-2))"
            viewBox="0 0 1200 220"
            path="M0,130 C250,85 450,175 720,130 C940,90 1080,165 1200,135 L1200,220 L0,220 Z"
            outerClass="absolute inset-x-0 bottom-[18%] h-[44vh] opacity-80"
            animationClass="animate-wave-med"
          />
          <WaveLayer
            fill="rgb(var(--wave-1))"
            viewBox="0 0 1200 220"
            path="M0,160 C160,130 340,190 620,160 C860,130 1060,200 1200,170 L1200,220 L0,220 Z"
            outerClass="absolute inset-x-0 bottom-0 h-[48vh]"
            animationClass="animate-wave-fast"
          />
        </motion.div>

        {/* Caustic light streak */}
        <div
          className="absolute inset-x-0 top-[12%] h-[1px] opacity-40"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgb(254 243 199 / 0.8), transparent)",
          }}
        />
      </div>

      {/* ====================================================
         EARTH SCENE — shown in dark (Earth) mode
         ==================================================== */}
      <div className="scene-earth absolute inset-0">
        {/* Warm sky gradient */}
        <motion.div style={{ y: skyY }} className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgb(var(--scene-top)) 0%, rgb(var(--scene-mid)) 55%, rgb(var(--scene-bottom) / 0.95) 100%)",
            }}
          />
        </motion.div>

        {/* Ember glow bottom-center */}
        <motion.div
          style={{ scale: glowScale }}
          className="absolute -bottom-40 left-1/2 -translate-x-1/2 h-[55rem] w-[55rem] animate-glow-pulse"
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgb(var(--accent) / 0.35), rgb(var(--accent-deep) / 0.25) 40%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </motion.div>

        {/* Second ember glow top-left */}
        <div className="absolute -top-40 -left-40 h-[36rem] w-[36rem] animate-glow-pulse">
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgb(var(--accent-soft) / 0.15), transparent 65%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        {/* Subtle grid */}
        <div className="absolute inset-0 grid-bg opacity-25" />

        {/* Drifting warm particles */}
        <motion.div style={{ y: embersY }} className="absolute inset-0">
          {particles.map((p, i) => (
            <span
              key={i}
              aria-hidden
              className="absolute rounded-full"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: "rgb(var(--accent-soft))",
                opacity: p.opacity,
                animation: `drift ${p.duration}s ${p.delay}s ease-in-out infinite`,
                boxShadow: "0 0 6px rgb(var(--accent-soft) / 0.6)",
              }}
            />
          ))}
        </motion.div>

        {/* Dune silhouettes */}
        <motion.div style={{ y: wavesY }} className="absolute inset-x-0 bottom-0 h-[55vh]">
          <WaveLayer
            fill="rgb(var(--wave-3))"
            viewBox="0 0 1200 220"
            path="M0,120 C240,80 520,160 780,120 C1000,85 1120,150 1200,130 L1200,220 L0,220 Z"
            outerClass="absolute inset-x-0 bottom-[28%] h-[34vh] opacity-70"
            animationClass="animate-wave-slow"
          />
          <WaveLayer
            fill="rgb(var(--wave-2))"
            viewBox="0 0 1200 220"
            path="M0,140 C200,100 460,180 720,140 C940,110 1080,170 1200,150 L1200,220 L0,220 Z"
            outerClass="absolute inset-x-0 bottom-[10%] h-[40vh] opacity-85"
            animationClass="animate-wave-med"
          />
          <WaveLayer
            fill="rgb(var(--wave-1))"
            viewBox="0 0 1200 220"
            path="M0,170 C160,145 340,195 620,170 C860,145 1060,205 1200,180 L1200,220 L0,220 Z"
            outerClass="absolute inset-x-0 bottom-0 h-[42vh]"
            animationClass="animate-wave-fast"
          />
        </motion.div>
      </div>

      {/* Common noise for texture */}
      <div className="noise" />
    </div>
  );
}

/**
 * Seamlessly-looping wave layer: renders the SVG twice side-by-side in a
 * 200%-wide flex row. The inner row is animated by translating -50%,
 * which equals one full tile — creating a perfect seamless loop.
 */
function WaveLayer({
  fill,
  path,
  viewBox,
  outerClass,
  animationClass,
}: {
  fill: string;
  path: string;
  viewBox: string;
  outerClass: string;
  animationClass: string;
}) {
  return (
    <div className={`${outerClass} overflow-hidden`}>
      <div className={`flex h-full w-[200%] gpu ${animationClass}`}>
        <svg
          className="block h-full w-1/2 flex-shrink-0"
          viewBox={viewBox}
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d={path} fill={fill} />
        </svg>
        <svg
          className="block h-full w-1/2 flex-shrink-0"
          viewBox={viewBox}
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d={path} fill={fill} />
        </svg>
      </div>
    </div>
  );
}
