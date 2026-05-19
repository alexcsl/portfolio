"use client";

import * as React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const gpsRef = React.useRef<HTMLDivElement | null>(null);
  const termRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let targetPx = 0;
    let targetPy = 0;
    let curPx = 0;
    let curPy = 0;

    const apply = () => {
      // Gentler ease so motion feels soft.
      curPx += (targetPx - curPx) * 0.08;
      curPy += (targetPy - curPy) * 0.08;

      const mxPct = 50 + curPx * 50;
      const myPct = 50 + curPy * 50;
      el.style.setProperty("--mx", `${mxPct}%`);
      el.style.setProperty("--my", `${myPct}%`);

      // Both cards drift WITH the cursor. GPS = subtle, Terminal = slightly bolder.
      if (gpsRef.current) {
        gpsRef.current.style.transform =
          `perspective(1100px) ` +
          `translate3d(${(curPx * 28).toFixed(2)}px, ${(curPy * 18).toFixed(2)}px, 0) ` +
          `rotateY(${(curPx * 5).toFixed(2)}deg) ` +
          `rotateX(${(curPy * -4).toFixed(2)}deg) ` +
          `rotate(-3deg)`;
      }
      if (termRef.current) {
        termRef.current.style.transform =
          `perspective(1100px) ` +
          `translate3d(${(curPx * 38).toFixed(2)}px, ${(curPy * 24).toFixed(2)}px, 0) ` +
          `rotateY(${(curPx * 6).toFixed(2)}deg) ` +
          `rotateX(${(curPy * -5).toFixed(2)}deg) ` +
          `rotate(3deg)`;
      }

      // Continue easing while not at rest
      if (
        Math.abs(targetPx - curPx) > 0.001 ||
        Math.abs(targetPy - curPy) > 0.001
      ) {
        raf = requestAnimationFrame(apply);
      } else {
        raf = 0;
      }
    };

    const setTarget = (clientX: number, clientY: number) => {
      const r = el.getBoundingClientRect();
      targetPx = ((clientX - r.left) / r.width - 0.5) * 2;
      targetPy = ((clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onMove = (e: MouseEvent) => setTarget(e.clientX, e.clientY);
    const onLeave = () => {
      targetPx = 0;
      targetPy = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    // Listen on the window so the spotlight veil (z:30, pointer-events:none)
    // doesn't matter — the events fire regardless. We just gate on whether
    // the cursor is inside the hero's bounding rect.
    const winMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      ) {
        onLeave();
        return;
      }
      setTarget(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", winMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", winMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center px-6 md:px-16"
    >
      {/* Faint hex/binary stream as ambient noise — blockchain/AI aesthetic */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none select-none font-mono text-[10px] leading-loose p-8 overflow-hidden"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <p
            key={i}
            className="whitespace-nowrap"
            style={{
              color:
                i % 3 === 0
                  ? "rgb(var(--gold) / 0.05)"
                  : "rgb(var(--fg) / 0.04)",
            }}
          >
            0x{(i * 0xa3f1 + 0x4b92).toString(16).toUpperCase().padStart(8, "0")} ·
            01101001 11000010 · TX_HASH 0x9{i}EE2D{(i * 17) % 256} · BLOCK#{18293120 + i * 11} ·
            NODE_OK · 0x{(i * 0xb1c7).toString(16).toUpperCase().padStart(6, "0")} ·
          </p>
        ))}
      </div>

      {/* GPS card */}
      <motion.div
        ref={gpsRef}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="hidden lg:block absolute top-[16%] left-[6%] z-[5] will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="bracket-frame p-3 bg-black/55 backdrop-blur-sm border border-[rgb(var(--fg)/0.1)] floaty">
          <span className="br-tl" />
          <span className="br-tr" />
          <span className="br-bl" />
          <span className="br-br" />
          <div className="mono-label mb-1">GPS_LOCATION</div>
          <div className="font-mono text-[11px] text-[rgb(var(--fg)/0.75)] leading-relaxed">
            LAT: -6.2244° S
            <br />
            LON: 106.6537° E
          </div>
        </div>
      </motion.div>

      {/* Terminal card */}
      <motion.div
        ref={termRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="hidden lg:block absolute bottom-[16%] right-[8%] z-[5] will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="bracket-frame p-3 bg-black/65 backdrop-blur-sm border border-[rgb(var(--fg)/0.1)] w-[260px]">
          <span className="br-tl" />
          <span className="br-tr" />
          <span className="br-bl" />
          <span className="br-br" />
          <div className="mono-label mb-2">TERMINAL_LOG</div>
          <div className="font-mono text-[11px] leading-relaxed text-[rgb(var(--fg)/0.75)]">
            <p>&gt;&gt; deploying to base...</p>
            <p>&gt;&gt; tx confirmed ✓</p>
            <p>&gt;&gt; indexed on ponder</p>
            <p className="text-[rgb(var(--accent))]">&gt;&gt; system online_</p>
          </div>
        </div>
      </motion.div>

      {/* Centered content */}
      <div className="relative z-[10] w-full max-w-[1500px] mx-auto text-center flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="h-display uppercase"
        >
          <span className="block">Alexander</span>
          <span
            className="block italic h-italic -mt-2"
            style={{
              background:
                "linear-gradient(120deg, rgb(var(--gold-soft)) 0%, rgb(var(--gold)) 50%, rgb(var(--gold-deep)) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Christian
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-8 text-sm sm:text-base leading-relaxed text-[rgb(var(--fg)/0.85)] font-mono space-y-1"
        >
          <p>
            <span className="accent-word">Fullstack</span> Developer.
          </p>
          <p>
            <span className="accent-word">Smart Contract</span> Developer with{" "}
            <span className="gold-word">Business</span> Mindset.
          </p>
          <p>Seeking Opportunities.</p>
        </motion.div>
      </div>

      {/* Spotlight veil ABOVE content. Pointer-events: none. */}
      <div className="spotlight" aria-hidden />
      <div className="spotlight-glow" aria-hidden />
      <div className="scanner-line" aria-hidden />
    </section>
  );
}
