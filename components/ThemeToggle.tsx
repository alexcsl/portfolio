"use client";

import * as React from "react";
import { Mountain, Waves } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const current = resolvedTheme ?? theme;
  const isDark = current === "dark";

  function handleThemeToggle(e: React.MouseEvent<HTMLButtonElement>) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    document.documentElement.style.setProperty("--theme-toggle-x", `${x}px`);
    document.documentElement.style.setProperty("--theme-toggle-y", `${y}px`);

    // eslint-disable-next-line
    const doc = document as any;
    if (doc.startViewTransition) {
      doc.startViewTransition(() => {
        setTheme(isDark ? "light" : "dark");
      });
    } else {
      setTheme(isDark ? "light" : "dark");
    }
  }

  const label = mounted
    ? isDark
      ? "Switch to Sea mode"
      : "Switch to Earth mode"
    : "Toggle theme";

  return (
    <button
      type="button"
      onClick={handleThemeToggle}
      aria-label={label}
      title={label}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full glass transition-transform duration-500 hover:scale-105"
    >
      <Waves
        className={`absolute h-4 w-4 transition-all duration-700 ${
          mounted && isDark
            ? "opacity-0 rotate-90 scale-75"
            : "opacity-100 rotate-0 scale-100"
        }`}
      />
      <Mountain
        className={`absolute h-4 w-4 transition-all duration-700 ${
          mounted && isDark
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 -rotate-90 scale-75"
        }`}
      />
    </button>
  );
}
