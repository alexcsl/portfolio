"use client";

import * as React from "react";

function useClock() {
  const [time, setTime] = React.useState<string>("00:00:00");
  React.useEffect(() => {
    const tick = () => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export default function Hud() {
  const time = useClock();

  return (
    <div className="hud-root">
      {/* Top-Right: clock only */}
      <div className="hud-corner top-3 right-3 sm:top-4 sm:right-4 text-right text-[9px] tracking-[0.18em]">
        <div>{time}</div>
      </div>

    </div>
  );
}
