"use client";

import * as React from "react";
import { FileText } from "lucide-react";
import {
  EDUCATION,
  EXPERIENCE,
  SITE,
  SKILLS_FLAT,
  SOFT_SKILLS,
} from "@/lib/data";
import { useCVModal } from "@/components/CVModal";

export default function About() {
  const { open } = useCVModal();

  return (
    <section
      id="about"
      className="relative w-full px-6 md:px-16 py-32 border-t border-[rgb(var(--fg)/0.06)]"
    >
      <header className="flex items-end justify-between flex-wrap gap-4 pb-6 mb-12 border-b border-[rgb(var(--fg)/0.12)]">
        <div>
          <div className="mono-label mb-3 flex items-center gap-3">
            <span className="rule-rg" />
            About / Status: Open to Work
          </div>
          <h2 className="h-section uppercase">Subject Profile</h2>
        </div>
        <div className="mono-dim">[ Read Only ]</div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_360px] gap-10">
        {/* ===== Identity ===== */}
        <aside className="bracket-frame border border-[rgb(var(--fg)/0.08)] p-6 self-start bg-black/30">
          <span className="br-tl" />
          <span className="br-tr" />
          <span className="br-bl" />
          <span className="br-br" />

          <div className="font-serif text-xl uppercase tracking-tight">
            {SITE.name}
          </div>
          <div className="mono-dim mt-1">{SITE.handle}</div>

          <div className="relative mt-5 aspect-square w-full overflow-hidden bracket-frame border border-[rgb(var(--accent)/0.4)] bg-[rgb(var(--bg-alt))]">
            <span className="br-tl" />
            <span className="br-tr" />
            <span className="br-bl" />
            <span className="br-br" />
            {/* Fallback initials behind the photo */}
            <div
              className="absolute inset-0 grid place-items-center font-serif text-7xl uppercase italic text-[rgb(var(--fg)/0.18)]"
              aria-hidden
            >
              AC
            </div>
            {/* Photo (drop file at public/me.jpg) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/me.jpeg"
              alt={SITE.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "grayscale(90%) contrast(1.08) brightness(0.95)" }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            {/* HUD overlay on top of photo */}
            <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-[0.18] [background:linear-gradient(rgb(255,42,42)_50%,transparent_50%)] bg-[length:100%_3px]" />
            <div className="absolute top-2 left-2 mono-label text-[9px] z-10">
              REC · ACTIVE
            </div>
            <div className="absolute bottom-2 left-2 mono-dim text-[9px] z-10">
              ISO_FACE_ID: 99.9%
            </div>
            <div className="absolute bottom-2 right-2 mono-label text-[9px] z-10 text-[rgb(var(--gold))]">
              Indonesia
            </div>
            <div className="scanner-line" aria-hidden />
          </div>

          <dl className="mt-5 space-y-2">
            <Row label="Class" value="Fullstack Dev" />
            <Row label="XP Level" value="JUNIOR · 3 Y" />
            <Row label="Lang 1" value="ID (Native)" />
            <Row label="Lang 2" value="EN (Fluent)" />
          </dl>

          <div className="mt-6 border border-[rgb(var(--accent)/0.4)] p-3">
            <div className="flex items-center gap-2 mono-label">
              <span className="pulse-dot" />
              System Alert
            </div>
            <div className="font-serif text-lg mt-1 leading-tight">
              Open to Work
            </div>
            <div className="mono-dim mt-1">Remote, Hybrid Ready</div>
          </div>

          <button
            type="button"
            onClick={open}
            className="btn-ghost-noir mt-5 w-full justify-center"
          >
            <FileText className="w-3.5 h-3.5" />
            Open Dossier (CV)
          </button>
        </aside>

        {/* ===== Main column. Framed for focus. ===== */}
        <div className="bracket-frame border border-[rgb(var(--fg)/0.12)] p-7 md:p-9 bg-black/20">
          <span className="br-tl" />
          <span className="br-tr" />
          <span className="br-bl" />
          <span className="br-br" />

          <div className="mono-label mb-3 flex items-center gap-3">
            <span className="rule-rg" />
            Competence Analysis Report
          </div>

          <p className="font-serif text-2xl md:text-[2rem] leading-[1.25] text-[rgb(var(--fg)/0.95)] max-w-[52ch]">
            Fullstack and{" "}
            <span className="text-redact">smart contract</span> developer with
            engineering depth and a{" "}
            <span className="text-mint">business mindset</span>.
          </p>

          {/* Education */}
          <div className="mt-12 pt-8 border-t border-[rgb(var(--fg)/0.1)]">
            <div className="mono-label mb-5 flex items-center gap-3">
              <span className="rule-rg" />
              Education
            </div>
            <ul className="space-y-4">
              {EDUCATION.map((e) => (
                <li
                  key={e.school}
                  className="flex flex-wrap items-baseline gap-4"
                >
                  <span className="text-redact font-mono text-[11px]">
                    [{e.school.toUpperCase()}]
                  </span>
                  <span className="mono-dim">{e.period}</span>
                  <span className="font-serif text-lg text-[rgb(var(--fg)/0.95)]">
                    {e.degree}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Experience */}
          <div className="mt-10 pt-8 border-t border-[rgb(var(--fg)/0.1)]">
            <div className="mono-label mb-5 flex items-center gap-3">
              <span className="rule-rg" />
              Experience
            </div>
            <ul className="space-y-5">
              {EXPERIENCE.map((x) => (
                <li
                  key={x.role + x.company}
                  className="flex flex-wrap items-baseline gap-4"
                >
                  <span className="text-redact font-mono text-[11px]">
                    [{x.company.toUpperCase()}]
                  </span>
                  <span className="mono-dim">{x.period}</span>
                  <span className="font-serif text-lg text-[rgb(var(--fg)/0.95)]">
                    {x.role}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== Capabilities (widened) ===== */}
        <aside className="self-start">
          <div className="mono-label">Equipment Inventory</div>

          <div className="mt-5">
            <div className="mono-dim mb-3">Hard Skills</div>
            <div className="flex flex-wrap gap-2">
              {SKILLS_FLAT.map((s, i) => (
                <span
                  key={s}
                  className={`font-mono text-[10px] uppercase tracking-[0.14em] px-2.5 py-1.5 border whitespace-nowrap transition-colors cursor-default ${
                    i % 2 === 0
                      ? "border-[rgb(var(--fg)/0.12)] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"
                      : "border-[rgb(var(--fg)/0.12)] hover:border-[rgb(var(--gold))] hover:text-[rgb(var(--gold))]"
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <div className="mono-dim mb-3">Soft Skills</div>
            <div className="flex flex-wrap gap-2">
              {SOFT_SKILLS.map((s, i) => (
                <span
                  key={s}
                  className={`font-mono text-[10px] uppercase tracking-[0.14em] px-2.5 py-1.5 border whitespace-nowrap ${
                    i % 2 === 0
                      ? "border-[rgb(var(--accent)/0.4)] text-[rgb(var(--accent))]"
                      : "border-[rgb(var(--gold)/0.45)] text-[rgb(var(--gold))]"
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 bracket-frame border border-[rgb(var(--fg)/0.08)] p-4 aspect-square">
            <span className="br-tl" />
            <span className="br-tr" />
            <span className="br-bl" />
            <span className="br-br" />
            <div className="mono-label">Danger: High</div>
            <BlockchainSpin />
          </div>
        </aside>
      </div>
    </section>
  );
}

function BlockchainSpin() {
  const hw = 28;   // half-width of block (viewBox units)
  const th = 13;   // top-face half-height
  const sh = 28;   // side-face screen height

  // All blocks drawn at cy=0; CSS translates each to its slot in time.
  const topPts = `0,${-th} ${hw},0 0,${th} ${-hw},0`;
  const frPts = `0,${th} ${hw},0 ${hw},${sh} 0,${th + sh}`;
  const flPts = `0,${th} ${-hw},0 ${-hw},${sh} 0,${th + sh}`;

  const hashes = ["0xA3F1", "0x4B92", "0xC7D8", "0x91EE", "0x52BC"];

  return (
    <div className="chain-wrap mt-2">
      <span className="chain-link top" aria-hidden />
      <span className="chain-link bottom" aria-hidden />

      <svg
        className="bc-svg"
        viewBox="-80 -120 160 240"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="bc-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(255,200,110)" />
            <stop offset="60%" stopColor="rgb(255,110,50)" />
            <stop offset="100%" stopColor="rgb(190,30,30)" />
          </linearGradient>
          <linearGradient id="bc-left" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(110,18,18)" />
            <stop offset="100%" stopColor="rgb(40,8,8)" />
          </linearGradient>
          <linearGradient id="bc-right" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(190,40,30)" />
            <stop offset="100%" stopColor="rgb(90,18,12)" />
          </linearGradient>
          <linearGradient id="bc-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(255,90,50)" />
            <stop offset="60%" stopColor="rgb(255,160,60)" />
            <stop offset="100%" stopColor="rgb(240,200,90)" />
          </linearGradient>
        </defs>

        {/* Static guide line for the chain axis */}
        <line
          x1="0"
          y1="-110"
          x2="0"
          y2="110"
          stroke="rgb(255 42 42 / 0.18)"
          strokeWidth="0.6"
          strokeDasharray="2 3"
        />

        {/* Five identical block groups + chain links above each block */}
        {hashes.map((hash, i) => (
          <g key={i} className={`bc-block b${i + 1}`}>
            {/* Chain links: 3 alternating ovals filling the gap above this block.
                Travel with the block as it animates downward. */}
            <g className="bc-chain">
              <ellipse
                cx="0"
                cy={-th - 19}
                rx="5"
                ry="2.6"
                fill="none"
                stroke="url(#bc-edge)"
                strokeWidth="1.3"
              />
              <ellipse
                cx="0"
                cy={-th - 12}
                rx="2.6"
                ry="5"
                fill="none"
                stroke="url(#bc-edge)"
                strokeWidth="1.3"
              />
              <ellipse
                cx="0"
                cy={-th - 5}
                rx="5"
                ry="2.6"
                fill="none"
                stroke="url(#bc-edge)"
                strokeWidth="1.3"
              />
            </g>

            <polygon
              points={flPts}
              fill="url(#bc-left)"
              stroke="url(#bc-edge)"
              strokeWidth="1.1"
              strokeLinejoin="miter"
            />
            <polygon
              points={frPts}
              fill="url(#bc-right)"
              stroke="url(#bc-edge)"
              strokeWidth="1.1"
              strokeLinejoin="miter"
            />
            <polygon
              points={topPts}
              fill="url(#bc-top)"
              stroke="url(#bc-edge)"
              strokeWidth="1.1"
              strokeLinejoin="miter"
              opacity="0.9"
            />
            <text x={4} y={th + sh * 0.6} className="bc-hash" textAnchor="start">
              {hash}
            </text>
            <text
              x={-22}
              y={th + sh * 0.6}
              className="bc-hash"
              textAnchor="start"
              fill="rgb(255,210,110)"
            >
              {`#${String(i + 1).padStart(2, "0")}`}
            </text>
            <circle cx={0} cy={0} r="1.6" fill="rgb(255,220,140)" opacity="0.9" />
          </g>
        ))}

        {/* Fixed pulse nodes marking the chain's continuation */}
        <circle cx="0" cy="-110" r="2.6" fill="rgb(255,90,90)" className="bc-pulse" />
        <circle cx="0" cy="110" r="2.6" fill="rgb(255,90,90)" className="bc-pulse" />
      </svg>

      {/* Orbital particles around the stack */}
      <span className="bc-particle p1" aria-hidden />
      <span className="bc-particle p2" aria-hidden />
      <span className="bc-particle p3" aria-hidden />
      <span className="bc-particle p4" aria-hidden />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="mono-dim">{label}</dt>
      <dd className="font-mono text-[11px] text-[rgb(var(--fg)/0.9)]">
        {value}
      </dd>
    </div>
  );
}
