"use client";

/**
 * Subtle section divider — a whisper, not a banner.
 *
 * Just a single thin wavy stroke in the theme accent, low opacity,
 * sitting across the section boundary. Reads as a quiet horizon line
 * rather than a filled band.
 */
export default function SectionDivider({
  flip = false,
  variant = "surface",
}: {
  flip?: boolean;
  variant?: "surface" | "floor";
}) {
  // Smooth sine-ish curve for Sea, a slightly tighter one for Earth.
  const seaPath =
    variant === "surface"
      ? "M0,28 C200,12 420,46 720,30 C940,18 1080,40 1200,28"
      : "M0,32 C180,18 460,52 760,36 C980,22 1100,44 1200,34";

  const earthPath =
    variant === "surface"
      ? "M0,30 C220,18 420,42 700,30 C940,20 1080,38 1200,30"
      : "M0,34 C200,22 460,46 740,34 C960,24 1100,40 1200,34";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 ${
        flip ? "bottom-0 translate-y-1/2" : "top-0 -translate-y-1/2"
      } h-16 overflow-hidden`}
    >
      {/* SEA: single thin caustic line */}
      <div className="scene-sea absolute inset-0">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d={seaPath}
            fill="none"
            stroke="rgb(var(--accent))"
            strokeOpacity="0.22"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* EARTH: single warm strata line */}
      <div className="scene-earth absolute inset-0">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d={earthPath}
            fill="none"
            stroke="rgb(var(--accent))"
            strokeOpacity="0.2"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
