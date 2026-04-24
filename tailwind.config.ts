import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "Menlo", "monospace"],
      },
      animation: {
        "wave-slow": "waveDrift 22s linear infinite",
        "wave-med": "waveDrift 14s linear infinite",
        "wave-fast": "waveDrift 9s linear infinite",
        "wave-bob": "waveBob 6s ease-in-out infinite",
        "marquee": "marquee 45s linear infinite",
        "float-soft": "floatSoft 8s ease-in-out infinite",
        "glow-pulse": "glowPulse 5s ease-in-out infinite",
        "gradient-text": "gradientText 10s ease infinite",
      },
      keyframes: {
        gradientText: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
