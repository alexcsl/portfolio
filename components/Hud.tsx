"use client";

import * as React from "react";

function useClock() {
  const [time, setTime] = React.useState<string>("00:00:00");
  React.useEffect(() => {
    const tick = () => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      const ff = pad(Math.floor((d.getMilliseconds() / 1000) * 30));
      setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}:${ff}`);
    };
    tick();
    const id = window.setInterval(tick, 1000 / 12);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export default function Hud() {
  const time = useClock();

  return (
    <div className="hud-root">
      {/* Top-Left: signal */}
      <div className="hud-corner top-3 left-3 sm:top-5 sm:left-5">
        <div className="flex items-center gap-2">
          <span className="red">CAM_04 [REC]</span>
          <span className="pulse-dot" />
        </div>
        <div className="mt-1 red">SIGNAL_STRONG</div>
        <div className="mt-1 text-[10px]">X: 4.32 °S  Y: 106.85 °E</div>
      </div>

      {/* Top-Right: clock */}
      <div className="hud-corner top-3 right-3 sm:top-5 sm:right-5 text-right">
        <div>{time}</div>
        <div className="mt-1 text-[10px]">ISO 800 · 24fps</div>
      </div>

      {/* Bottom-Left: live feed */}
      <div className="hud-corner bottom-3 left-3 sm:bottom-5 sm:left-5">
        <div className="flex items-center gap-2">
          <span className="pulse-dot" />
          <span>LIVE FEED</span>
        </div>
      </div>

      {/* Bottom-Right: system status */}
      <div className="hud-corner bottom-3 right-3 sm:bottom-5 sm:right-5 text-right">
        <div>SYS. DIAGNOSTIC</div>
        <div className="mt-1 red">STABLE</div>
      </div>

      {/* Vertical sidebar marker on the left edge */}
      <div
        aria-hidden
        className="hud-side fixed left-0 top-1/2 -translate-y-1/2 z-[900] hidden md:flex flex-col gap-2 px-2 py-3 border-r border-[rgb(var(--fg)/0.08)] bg-black/40 backdrop-blur-sm"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-[rgb(var(--accent))] [writing-mode:vertical-rl] rotate-180">
          CASE&nbsp;FILE&nbsp;//&nbsp;XL-01
        </span>
      </div>
    </div>
  );
}
