"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { FileText, Menu, X } from "lucide-react";
import { useCVModal } from "./CVModal";

const NAV = [
  { label: "About", href: "#about", id: "about" },
  { label: "Work", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

function handleNavClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string
) {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    const headerOffset = 100;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
}

export default function Navigation() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>("top");
  const { scrollY } = useScroll();
  const { open: openCV } = useCVModal();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  // Track active section via IntersectionObserver
  React.useEffect(() => {
    const sections = ["top", "about", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <motion.div
          animate={{ borderRadius: scrolled ? 999 : 24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`flex w-full items-center justify-between gap-4 px-4 py-2.5 transition-all duration-500 ${
            scrolled ? "glass-strong shadow-lg" : "bg-transparent"
          }`}
        >
          {/* Monogram logo */}
          <Link
            href="#top"
            onClick={(e) => handleNavClick(e, "#top")}
            className="group flex items-center gap-2.5 font-mono text-sm"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[rgb(var(--accent))] text-[rgb(var(--bg))] font-semibold text-[13px] shadow-[0_0_20px_rgb(var(--accent-glow))]">
              <span className="relative z-10">A</span>
              <span
                aria-hidden
                className="absolute inset-0 rounded-full bg-[rgb(var(--accent))] opacity-40 blur-md transition-opacity group-hover:opacity-75"
              />
            </span>
            <span className="hidden sm:inline font-medium tracking-tight">
              alexcsl
              <span className="text-[rgb(var(--accent))]">.</span>
            </span>
          </Link>

          {/* Desktop nav with fluid active pill */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative px-3.5 py-2 text-sm transition-colors"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-[rgb(var(--fg)/0.06)] border border-[rgb(var(--glass-stroke))]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      isActive
                        ? "text-[rgb(var(--fg))]"
                        : "text-[rgb(var(--fg-muted))] hover:text-[rgb(var(--fg))]"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCV}
              className="hidden md:inline-flex h-10 items-center gap-2 rounded-full border border-[rgb(var(--glass-stroke))] bg-[rgb(var(--fg)/0.03)] px-4 text-xs font-medium tracking-tight text-[rgb(var(--fg))] transition-colors hover:border-[rgb(var(--accent)/0.5)] hover:text-[rgb(var(--accent))]"
            >
              <FileText className="h-3.5 w-3.5" />
              Resume
            </button>
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
          {NAV.map((item) => {
            const isActive = active === item.id;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  handleNavClick(e, item.href);
                  setOpen(false);
                }}
                className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[rgb(var(--fg)/0.06)] text-[rgb(var(--accent))]"
                    : "text-[rgb(var(--fg))] hover:bg-[rgb(var(--fg)/0.05)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openCV();
            }}
            className="mt-1 flex w-full items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-[rgb(var(--accent))] transition-colors hover:bg-[rgb(var(--accent)/0.08)]"
          >
            <FileText className="h-4 w-4" />
            View Resume
          </button>
        </div>
      </motion.div>
    </motion.header>
  );
}
