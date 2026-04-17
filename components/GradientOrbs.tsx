"use client";

export default function GradientOrbs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Orb 1 - top-right, accent */}
      <div
        className="absolute -top-32 right-[-8rem] h-[38rem] w-[38rem] rounded-full animate-orb-drift-1 will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgb(var(--accent) / 0.55), transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      {/* Orb 2 - bottom-left, purple-ish */}
      <div
        className="absolute -bottom-40 left-[-10rem] h-[42rem] w-[42rem] rounded-full animate-orb-drift-2 will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 70% 70%, rgb(139 92 246 / 0.45), transparent 60%)",
          filter: "blur(90px)",
        }}
      />

      {/* Orb 3 - center, cyan-ish */}
      <div
        className="absolute top-1/2 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full animate-orb-drift-3 will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgb(34 211 238 / 0.25), transparent 60%)",
          filter: "blur(100px)",
        }}
      />

      {/* Noise overlay */}
      <div className="noise" />
    </div>
  );
}
