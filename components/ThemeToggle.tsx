"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const current = resolvedTheme ?? theme;
  const isDark = current === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
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
