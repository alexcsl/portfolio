"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    // Account for sticky header height (approx 80px including padding)
    const headerOffset = 100;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

export default function Navigation() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <motion.div
          animate={{
            borderRadius: scrolled ? 999 : 24,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`flex w-full items-center justify-between gap-4 px-4 py-2.5 transition-all duration-500 ${
            scrolled ? "glass-strong shadow-lg" : "bg-transparent"
          }`}
        >
          <Link
            href="#top"
            onClick={(e) => handleNavClick(e, "#top")}
            className="group flex items-center gap-2.5 font-mono text-sm"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 text-white font-semibold text-[13px] shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              A
              <span className="absolute inset-0 rounded-full bg-accent-500 opacity-40 blur-md group-hover:opacity-70 transition-opacity" />
            </span>
            <span className="hidden sm:inline font-medium tracking-tight">alexcsl</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative px-3.5 py-2 text-sm text-[rgb(var(--fg-muted))] hover:text-[rgb(var(--fg))] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-full glass"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden overflow-hidden mx-5 sm:mx-8"
      >
        <div className="glass-strong rounded-2xl p-3 mb-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => {
                handleNavClick(e, item.href);
                setOpen(false);
              }}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-[rgb(var(--fg))] hover:bg-[rgb(var(--fg)/0.05)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
}
