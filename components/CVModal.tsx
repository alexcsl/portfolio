"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import { SITE } from "@/lib/data";

type CVModalContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const CVModalContext = React.createContext<CVModalContextValue | null>(null);

export function useCVModal() {
  const ctx = React.useContext(CVModalContext);
  if (!ctx) {
    throw new Error("useCVModal must be used within <CVModalProvider>");
  }
  return ctx;
}

export function CVModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);

  // Close on Escape
  React.useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Lock body scroll when open
  React.useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  return (
    <CVModalContext.Provider value={{ open, close, isOpen }}>
      {children}
      <CVModal isOpen={isOpen} onClose={close} />
    </CVModalContext.Provider>
  );
}

function CVModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) setLoaded(false);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cv-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Curriculum Vitae"
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close CV viewer"
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex w-full max-w-5xl h-[92vh] sm:h-[88vh] flex-col overflow-hidden rounded-2xl glass-strong shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-[rgb(var(--glass-stroke))] px-5 py-3.5 sm:px-6">
              <div className="flex items-center gap-3 min-w-0">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--accent)/0.15)] text-[rgb(var(--accent))]">
                  <FileText className="h-4 w-4" />
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold tracking-tight truncate">
                    Curriculum Vitae
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[rgb(var(--fg-muted))] truncate">
                    {SITE.fullName}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <a
                  href={SITE.cv}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Open CV in new tab"
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-[rgb(var(--glass-stroke))] bg-[rgb(var(--fg)/0.03)] px-3 text-xs font-medium hover:border-[rgb(var(--accent))]/50 hover:text-[rgb(var(--accent))] transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">New tab</span>
                </a>
                <a
                  href={SITE.cv}
                  download
                  aria-label="Download CV"
                  className="inline-flex h-9 items-center gap-2 rounded-full bg-[rgb(var(--accent))] px-3 text-xs font-medium text-[rgb(var(--bg))] shadow-[0_4px_20px_rgb(var(--accent-glow))] hover:brightness-110 transition-all"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgb(var(--glass-stroke))] bg-[rgb(var(--fg)/0.03)] hover:border-[rgb(var(--accent))]/50 hover:text-[rgb(var(--accent))] transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Viewer body */}
            <div className="relative flex-1 bg-[rgb(var(--bg-alt))]">
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center gap-3 text-sm text-[rgb(var(--fg-muted))]">
                  <span
                    aria-hidden
                    className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[rgb(var(--glass-stroke))] border-t-[rgb(var(--accent))]"
                  />
                  Loading CV…
                </div>
              )}
              <iframe
                key={isOpen ? "cv-open" : "cv-closed"}
                src={`${SITE.cv}#view=FitH&toolbar=0&navpanes=0`}
                title="Alexander Christian CV"
                className="absolute inset-0 h-full w-full"
                onLoad={() => setLoaded(true)}
              />
              {/* Mobile fallback hint (iOS Safari sometimes won't render inline) */}
              <noscript>
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-[rgb(var(--fg-muted))]">
                  Your browser can&apos;t display the PDF inline.{" "}
                  <a href={SITE.cv} className="text-[rgb(var(--accent))] underline">
                    Open it in a new tab.
                  </a>
                </div>
              </noscript>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
