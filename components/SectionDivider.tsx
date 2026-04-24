"use client";

/**
 * Theme-reactive section divider.
 *
 * - Sea mode: an animated water surface with ripples + a subtle "dive"
 *   gradient below, as if the reader is sinking under the surface.
 * - Earth mode: a cracked crust silhouette with a warm ember glow below,
 *   as if sinking into warm earth.
 *
 * Embed at the TOP of a section to break it from the one above. It sits
 * absolute-positioned across the boundary, so it reads as a real frontier
 * between the two worlds.
 */
export default function SectionDivider({
  flip = false,
  variant = "surface",
}: {
  flip?: boolean;
  variant?: "surface" | "floor";
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 ${
        flip ? "bottom-0 translate-y-1/2" : "top-0 -translate-y-1/2"
      } h-40 overflow-hidden`}
    >
      {/* SEA divider */}
      <div className="scene-sea absolute inset-0">
        {/* back ripple */}
        <svg
          viewBox="0 0 1200 160"
          preserveAspectRatio="none"
          className={`absolute inset-x-0 ${
            flip ? "bottom-0" : "top-0"
          } h-full w-full opacity-70`}
        >
          <path
            d={
              variant === "surface"
                ? "M0,60 C200,30 340,95 600,65 C840,38 1040,105 1200,70 L1200,160 L0,160 Z"
                : "M0,90 C180,60 420,125 620,95 C860,68 1080,130 1200,100 L1200,160 L0,160 Z"
            }
            fill="rgb(var(--wave-2))"
          />
        </svg>
        {/* front ripple with accent edge */}
        <svg
          viewBox="0 0 1200 160"
          preserveAspectRatio="none"
          className={`absolute inset-x-0 ${flip ? "bottom-0" : "top-0"} h-full w-full`}
        >
          <defs>
            <linearGradient id="sea-div-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(var(--accent-soft))" stopOpacity="0.55" />
              <stop offset="100%" stopColor="rgb(var(--scene-bottom))" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <path
            d={
              variant === "surface"
                ? "M0,80 C220,50 420,115 720,85 C960,60 1080,120 1200,95 L1200,160 L0,160 Z"
                : "M0,100 C200,78 460,135 760,105 C980,82 1100,138 1200,110 L1200,160 L0,160 Z"
            }
            fill="url(#sea-div-grad)"
          />
          {/* thin caustic highlight line at the surface */}
          <path
            d={
              variant === "surface"
                ? "M0,80 C220,50 420,115 720,85 C960,60 1080,120 1200,95"
                : "M0,100 C200,78 460,135 760,105 C980,82 1100,138 1200,110"
            }
            fill="none"
            stroke="rgb(var(--accent-soft))"
            strokeOpacity="0.6"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* EARTH divider */}
      <div className="scene-earth absolute inset-0">
        <svg
          viewBox="0 0 1200 160"
          preserveAspectRatio="none"
          className={`absolute inset-x-0 ${
            flip ? "bottom-0" : "top-0"
          } h-full w-full opacity-75`}
        >
          <path
            d={
              variant === "surface"
                ? "M0,70 L80,50 L160,80 L260,45 L360,85 L460,55 L560,90 L700,50 L820,95 L940,60 L1060,90 L1200,65 L1200,160 L0,160 Z"
                : "M0,95 L120,75 L240,105 L380,70 L520,110 L660,80 L820,115 L960,85 L1100,110 L1200,95 L1200,160 L0,160 Z"
            }
            fill="rgb(var(--wave-2))"
          />
        </svg>
        <svg
          viewBox="0 0 1200 160"
          preserveAspectRatio="none"
          className={`absolute inset-x-0 ${flip ? "bottom-0" : "top-0"} h-full w-full`}
        >
          <defs>
            <linearGradient id="earth-div-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(var(--accent-soft))" stopOpacity="0.35" />
              <stop offset="100%" stopColor="rgb(var(--accent-deep))" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <path
            d={
              variant === "surface"
                ? "M0,95 L100,70 L200,100 L320,65 L440,105 L560,75 L680,110 L820,80 L960,115 L1100,85 L1200,100 L1200,160 L0,160 Z"
                : "M0,110 L140,90 L280,120 L420,88 L560,122 L700,92 L840,128 L980,96 L1120,125 L1200,108 L1200,160 L0,160 Z"
            }
            fill="url(#earth-div-grad)"
          />
          {/* warm crust line */}
          <path
            d={
              variant === "surface"
                ? "M0,95 L100,70 L200,100 L320,65 L440,105 L560,75 L680,110 L820,80 L960,115 L1100,85 L1200,100"
                : "M0,110 L140,90 L280,120 L420,88 L560,122 L700,92 L840,128 L980,96 L1120,125 L1200,108"
            }
            fill="none"
            stroke="rgb(var(--accent))"
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
