"use client";

import * as React from "react";

/**
 * Per-project preview visual.
 * Each variant is a hand-crafted SVG scene that evokes what the project is,
 * using CSS variables so it re-tints itself under Sea/Earth themes.
 */
export default function ProjectPreview({
  variant,
  className = "",
}: {
  variant: ProjectVariant;
  className?: string;
}) {
  const Scene = SCENES[variant] ?? SCENES.generic;
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background:
          "linear-gradient(155deg, rgb(var(--accent) / 0.12), rgb(var(--accent-deep) / 0.2))",
      }}
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-60 blur-3xl"
        style={{ background: "rgb(var(--accent) / 0.35)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full opacity-50 blur-3xl"
        style={{ background: "rgb(var(--accent-soft) / 0.25)" }}
      />
      {/* grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--fg) / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--fg) / 0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse at center, black 50%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 50%, transparent 100%)",
        }}
      />
      <Scene />
    </div>
  );
}

export type ProjectVariant =
  | "freelancing"
  | "gamefi"
  | "chatbot"
  | "desktop"
  | "social"
  | "workshop"
  | "mobile"
  | "generic";

const SCENES: Record<ProjectVariant, React.FC> = {
  freelancing: FreelancingScene,
  gamefi: GameFiScene,
  chatbot: ChatbotScene,
  desktop: DesktopScene,
  social: SocialScene,
  workshop: WorkshopScene,
  mobile: MobileScene,
  generic: GenericScene,
};

/* =====================================================================
   1. On-Chain Freelancing — connected contract nodes
   ===================================================================== */
function FreelancingScene() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* contract document outlines */}
      <g opacity="0.85">
        <rect
          x="60"
          y="80"
          width="120"
          height="150"
          rx="10"
          fill="rgb(var(--fg) / 0.05)"
          stroke="rgb(var(--accent) / 0.6)"
          strokeWidth="1.5"
        />
        <rect x="78" y="106" width="80" height="4" rx="2" fill="rgb(var(--fg) / 0.35)" />
        <rect x="78" y="120" width="60" height="4" rx="2" fill="rgb(var(--fg) / 0.25)" />
        <rect x="78" y="134" width="70" height="4" rx="2" fill="rgb(var(--fg) / 0.25)" />
        <rect x="78" y="150" width="50" height="4" rx="2" fill="rgb(var(--fg) / 0.18)" />
        <text
          x="80"
          y="215"
          fill="rgb(var(--accent))"
          fontSize="20"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
        >
          Rp
        </text>
      </g>

      {/* second doc */}
      <g opacity="0.55">
        <rect
          x="220"
          y="60"
          width="120"
          height="150"
          rx="10"
          fill="rgb(var(--fg) / 0.04)"
          stroke="rgb(var(--accent-soft) / 0.6)"
          strokeWidth="1.5"
        />
        <rect x="238" y="86" width="80" height="4" rx="2" fill="rgb(var(--fg) / 0.28)" />
        <rect x="238" y="100" width="60" height="4" rx="2" fill="rgb(var(--fg) / 0.2)" />
      </g>

      {/* connection — static dashed path, no animation */}
      <path
        d="M180,155 Q200,130 220,135"
        fill="none"
        stroke="rgb(var(--accent))"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        opacity="0.9"
      />

      {/* nodes */}
      <circle cx="180" cy="155" r="5" fill="rgb(var(--accent))" />
      <circle cx="220" cy="135" r="5" fill="rgb(var(--accent-soft))" />
    </svg>
  );
}

/* =====================================================================
   2. On-Chain GameFi — pixel character + on-chain shine
   ===================================================================== */
function GameFiScene() {
  // Simple 10x10 pixel "character"
  const px = 14;
  const grid = [
    "..XXXXXX..",
    ".X......X.",
    "X..X..X..X",
    "X........X",
    "X..X..X..X",
    ".X.XXXX.X.",
    "..XX..XX..",
    "..X....X..",
    "..X.XX.X..",
    "...XXXX...",
  ];
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <rect x="0" y="0" width="400" height="200" fill="rgb(var(--accent-soft) / 0.08)" />
      <rect x="0" y="200" width="400" height="100" fill="rgb(var(--accent-deep) / 0.18)" />
      <line
        x1="0"
        y1="200"
        x2="400"
        y2="200"
        stroke="rgb(var(--accent))"
        strokeOpacity="0.4"
        strokeDasharray="4 4"
      />

      <g transform="translate(130, 78)">
        {grid.map((row, y) =>
          row.split("").map((c, x) =>
            c === "X" ? (
              <rect
                key={`${x}-${y}`}
                x={x * px}
                y={y * px}
                width={px}
                height={px}
                fill="rgb(var(--accent))"
              />
            ) : null
          )
        )}
      </g>

      {/* coins — static, no per-frame attribute animation */}
      <g>
        <circle cx="70" cy="85" r="10" fill="rgb(var(--accent-soft))" />
        <text
          x="70"
          y="90"
          textAnchor="middle"
          fill="rgb(var(--accent-deep))"
          fontSize="11"
          fontWeight="700"
          fontFamily="ui-monospace, monospace"
        >
          ₿
        </text>
        <circle cx="340" cy="135" r="8" fill="rgb(var(--accent-soft))" opacity="0.85" />
      </g>
    </svg>
  );
}

/* =====================================================================
   3. AI Market Chatbot — chat bubbles with a spark
   ===================================================================== */
function ChatbotScene() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* bubble 1 (user) */}
      <g>
        <rect
          x="40"
          y="70"
          width="180"
          height="52"
          rx="18"
          fill="rgb(var(--fg) / 0.06)"
          stroke="rgb(var(--glass-stroke))"
          strokeWidth="1"
        />
        <rect x="58" y="86" width="110" height="4" rx="2" fill="rgb(var(--fg) / 0.4)" />
        <rect x="58" y="100" width="75" height="4" rx="2" fill="rgb(var(--fg) / 0.3)" />
      </g>

      {/* bubble 2 (AI) */}
      <g>
        <rect
          x="170"
          y="150"
          width="200"
          height="68"
          rx="18"
          fill="rgb(var(--accent) / 0.18)"
          stroke="rgb(var(--accent) / 0.5)"
          strokeWidth="1"
        />
        <rect x="188" y="168" width="140" height="4" rx="2" fill="rgb(var(--accent))" opacity="0.7" />
        <rect x="188" y="182" width="100" height="4" rx="2" fill="rgb(var(--accent))" opacity="0.55" />
        <rect x="188" y="196" width="80" height="4" rx="2" fill="rgb(var(--accent))" opacity="0.4" />
      </g>

      {/* sparkle — static, no rotation */}
      <g fill="rgb(var(--accent-soft))" opacity="0.85">
        <path d="M335,60 l3,8 l8,3 l-8,3 l-3,8 l-3,-8 l-8,-3 l8,-3 z" />
        <circle cx="358" cy="108" r="2" opacity="0.6" />
        <circle cx="318" cy="138" r="1.5" opacity="0.5" />
      </g>

      {/* typing dots — single CSS-driven animation, GPU-friendly */}
      <g fill="rgb(var(--accent))">
        <circle cx="65" cy="240" r="3" className="dot-pulse dot-1" />
        <circle cx="78" cy="240" r="3" className="dot-pulse dot-2" />
        <circle cx="91" cy="240" r="3" className="dot-pulse dot-3" />
      </g>
    </svg>
  );
}

/* =====================================================================
   4. RUSA Desktop — brutalist window frame
   ===================================================================== */
function DesktopScene() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* window */}
      <rect
        x="60"
        y="60"
        width="280"
        height="180"
        rx="4"
        fill="rgb(var(--fg) / 0.04)"
        stroke="rgb(var(--fg) / 0.5)"
        strokeWidth="2"
      />
      {/* title bar */}
      <rect x="60" y="60" width="280" height="30" fill="rgb(var(--fg) / 0.1)" stroke="rgb(var(--fg) / 0.5)" strokeWidth="2" />
      {/* controls */}
      <circle cx="80" cy="75" r="5" fill="rgb(var(--accent))" />
      <circle cx="98" cy="75" r="5" fill="rgb(var(--accent-soft))" />
      <circle cx="116" cy="75" r="5" fill="rgb(var(--fg) / 0.2)" />

      {/* body content — monospace lines */}
      <g fontFamily="ui-monospace, monospace" fontSize="11" fill="rgb(var(--fg) / 0.7)">
        <text x="78" y="120">$ cargo run --release</text>
        <text x="78" y="140" fill="rgb(var(--accent))">
          compiling rusa v0.1.0
        </text>
        <text x="78" y="160">finished in 2.43s</text>
        <text x="78" y="180" fill="rgb(var(--accent-soft))">
          ▸ tauri://dev · svelte
        </text>
        <text x="78" y="200">
          <tspan fill="rgb(var(--accent))">●</tspan> ready
        </text>
      </g>

      {/* cursor — CSS blink, single composited element */}
      <rect
        x="180"
        y="195"
        width="8"
        height="12"
        fill="rgb(var(--accent))"
        className="terminal-blink"
      />
    </svg>
  );
}

/* =====================================================================
   5. hoshibmatchi (IG-clone in Go) — phone frame with photo grid
   ===================================================================== */
function SocialScene() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* phone frame */}
      <g transform="translate(145, 30)">
        <rect
          x="0"
          y="0"
          width="110"
          height="220"
          rx="18"
          fill="rgb(var(--fg) / 0.06)"
          stroke="rgb(var(--fg) / 0.55)"
          strokeWidth="2"
        />
        {/* notch */}
        <rect x="40" y="6" width="30" height="5" rx="2" fill="rgb(var(--fg) / 0.4)" />
        {/* header */}
        <circle cx="18" cy="30" r="7" fill="rgb(var(--accent))" />
        <rect x="30" y="26" width="40" height="4" rx="2" fill="rgb(var(--fg) / 0.45)" />
        <rect x="30" y="34" width="28" height="3" rx="1.5" fill="rgb(var(--fg) / 0.3)" />

        {/* photo grid 3x3 */}
        <g transform="translate(8, 58)">
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={c * 32}
                y={r * 32}
                width="30"
                height="30"
                rx="3"
                fill={
                  (r + c) % 2 === 0
                    ? "rgb(var(--accent) / 0.45)"
                    : "rgb(var(--accent-soft) / 0.5)"
                }
              />
            ))
          )}
        </g>
      </g>

      {/* star motif (hoshi = star) — CSS rotation, GPU-composited */}
      <g fill="rgb(var(--accent-soft))" opacity="0.9">
        <path
          d="M70,90 l4,11 l11,1 l-9,8 l3,11 l-9,-6 l-9,6 l3,-11 l-9,-8 l11,-1 z"
          className="star-spin"
          style={{ transformOrigin: "70px 100px" }}
        />
        <circle cx="330" cy="150" r="3" />
      </g>
    </svg>
  );
}

/* =====================================================================
   6. fish-it — fish silhouette on caustic water
   ===================================================================== */
function WorkshopScene() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* caustic lines */}
      <g stroke="rgb(var(--accent-soft))" strokeWidth="1" strokeLinecap="round" opacity="0.55">
        <path d="M20,60 Q80,40 140,60 T260,60 T380,60" fill="none" />
        <path d="M20,100 Q80,80 140,100 T260,100 T380,100" fill="none" />
        <path d="M20,250 Q80,230 140,250 T260,250 T380,250" fill="none" />
      </g>

      {/* fish */}
      <g transform="translate(120, 135)">
        <path
          d="M0,20 Q30,-8 80,20 Q100,30 120,20 L100,35 L120,50 Q100,40 80,50 Q30,78 0,50 Q-5,35 0,20 Z"
          fill="rgb(var(--accent))"
          opacity="0.88"
        />
        {/* eye */}
        <circle cx="15" cy="28" r="3.5" fill="rgb(var(--bg))" />
        <circle cx="15" cy="28" r="1.8" fill="rgb(var(--fg))" />
        {/* tail accent */}
        <path
          d="M100,35 L120,20 L120,50 Z"
          fill="rgb(var(--accent-deep))"
          opacity="0.55"
        />
      </g>

      {/* bubbles — single CSS animation per bubble, two only */}
      <g fill="rgb(var(--accent-soft) / 0.8)">
        <circle cx="240" cy="200" r="4" className="bubble-rise bubble-1" />
        <circle cx="280" cy="200" r="3" className="bubble-rise bubble-2" />
      </g>
    </svg>
  );
}

/* =====================================================================
   7. TasKalender — Android task tracker
   ===================================================================== */
function MobileScene() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* phone */}
      <g transform="translate(135, 24)">
        <rect
          x="0"
          y="0"
          width="130"
          height="252"
          rx="20"
          fill="rgb(var(--fg) / 0.06)"
          stroke="rgb(var(--fg) / 0.55)"
          strokeWidth="2"
        />
        {/* notch */}
        <rect x="50" y="6" width="30" height="5" rx="2" fill="rgb(var(--fg) / 0.4)" />

        {/* mini calendar header */}
        <g transform="translate(12, 26)">
          <text
            x="0"
            y="10"
            fill="rgb(var(--accent))"
            fontSize="9"
            fontWeight="700"
            fontFamily="ui-monospace, monospace"
            letterSpacing="1"
          >
            APRIL
          </text>
          {/* week strip */}
          {[0, 1, 2, 3, 4, 5, 6].map((d) => (
            <text
              key={d}
              x={d * 15}
              y="24"
              fill="rgb(var(--fg) / 0.5)"
              fontSize="7"
              fontFamily="ui-monospace, monospace"
            >
              {["M", "T", "W", "T", "F", "S", "S"][d]}
            </text>
          ))}
          {/* day cells */}
          {Array.from({ length: 14 }).map((_, i) => {
            const col = i % 7;
            const row = Math.floor(i / 7);
            const isToday = i === 9;
            return (
              <g key={i}>
                {isToday && (
                  <circle
                    cx={col * 15 + 3}
                    cy={row * 15 + 36}
                    r="6"
                    fill="rgb(var(--accent))"
                  />
                )}
                <text
                  x={col * 15}
                  y={row * 15 + 39}
                  fill={
                    isToday ? "rgb(var(--bg))" : "rgb(var(--fg) / 0.7)"
                  }
                  fontSize="7"
                  fontFamily="ui-monospace, monospace"
                  fontWeight={isToday ? 700 : 400}
                >
                  {12 + i}
                </text>
              </g>
            );
          })}
        </g>

        {/* tasks list */}
        <g transform="translate(12, 142)">
          {[
            { label: "Pay listrik", done: true },
            { label: "Buy groceries", done: true },
            { label: "Finish CS report", done: false },
            { label: "Gym at 6pm", done: false },
          ].map((t, i) => (
            <g key={i} transform={`translate(0, ${i * 18})`}>
              <rect
                x="0"
                y="0"
                width="10"
                height="10"
                rx="2"
                fill={t.done ? "rgb(var(--accent))" : "transparent"}
                stroke={
                  t.done
                    ? "rgb(var(--accent))"
                    : "rgb(var(--fg) / 0.45)"
                }
                strokeWidth="1.2"
              />
              {t.done && (
                <path
                  d="M2.5,5 L4.5,7 L8,3.5"
                  fill="none"
                  stroke="rgb(var(--bg))"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              <text
                x="16"
                y="8"
                fill={
                  t.done ? "rgb(var(--fg) / 0.45)" : "rgb(var(--fg) / 0.85)"
                }
                fontSize="8"
                fontFamily="ui-monospace, monospace"
                textDecoration={t.done ? "line-through" : "none"}
              >
                {t.label}
              </text>
            </g>
          ))}
        </g>

        {/* bottom currency strip */}
        <g transform="translate(12, 222)">
          <rect
            x="0"
            y="0"
            width="106"
            height="20"
            rx="4"
            fill="rgb(var(--accent) / 0.15)"
            stroke="rgb(var(--accent) / 0.5)"
            strokeWidth="1"
          />
          <text
            x="6"
            y="14"
            fill="rgb(var(--accent))"
            fontSize="9"
            fontWeight="700"
            fontFamily="ui-monospace, monospace"
          >
            Rp
          </text>
          <text
            x="22"
            y="14"
            fill="rgb(var(--fg) / 0.85)"
            fontSize="9"
            fontFamily="ui-monospace, monospace"
          >
            +1.250.000
          </text>
        </g>
      </g>

      {/* small Firebase flame to one side */}
      <g transform="translate(60, 100)" opacity="0.9">
        <path
          d="M16,0 C14,8 10,10 8,16 C6,22 8,30 16,32 C24,30 26,22 22,14 C18,8 18,4 16,0 Z"
          fill="rgb(var(--accent))"
        />
        <path
          d="M16,8 C15,12 13,14 12,18 C12,22 14,26 16,26 C18,26 20,22 18,18 C17,14 17,11 16,8 Z"
          fill="rgb(var(--accent-soft))"
        />
      </g>
    </svg>
  );
}

/* =====================================================================
   Fallback
   ===================================================================== */
function GenericScene() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <circle cx="200" cy="150" r="70" fill="rgb(var(--accent) / 0.3)" />
      <circle cx="200" cy="150" r="40" fill="rgb(var(--accent) / 0.5)" />
      <circle cx="200" cy="150" r="15" fill="rgb(var(--accent))" />
    </svg>
  );
}
