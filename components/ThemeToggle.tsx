"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

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

    // Set CSS custom properties for view transition origin
    document.documentElement.style.setProperty("--theme-toggle-x", `${x}px`);
    document.documentElement.style.setProperty("--theme-toggle-y", `${y}px`);

    // Use View Transitions API if available
    // eslint-disable-next-line
    const doc = document as any;
    if (doc.startViewTransition) {
      doc.startViewTransition(() => {
        setTheme(isDark ? "light" : "dark");
      });
    } else {
      // Fallback for browsers without View Transitions API
      setTheme(isDark ? "light" : "dark");
    }
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleThemeToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full glass hover:scale-105 transition-transform duration-300"
    >
      {/* Avoid hydration flash by rendering both with opacity swap only after mount */}
      <Sun
        className={`h-4 w-4 absolute transition-all duration-500 ${
          mounted && isDark ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
        }`}
      />
      <Moon
        className={`h-4 w-4 absolute transition-all duration-500 ${
          mounted && isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
        }`}
      />
    </button>
  );
}
