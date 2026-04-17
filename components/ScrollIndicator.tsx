"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function ScrollIndicator() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Fade out after scrolling 100px
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  const y = useTransform(scrollY, [0, 100], [0, 20]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setHasScrolled(true);
    }
    setIsVisible(latest < 150);
  });

  // Pulse animation for the line
  const lineVariants = {
    initial: { scaleY: 0, originY: 0 },
    animate: {
      scaleY: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      style={{ opacity, y }}
    >
      {/* Vertical line with draw animation */}
      <div className="relative h-16 w-[1px] bg-[rgb(var(--fg-muted)/0.2)] overflow-hidden rounded-full">
        <motion.div
          className="absolute inset-0 w-full bg-[rgb(var(--accent))]"
          variants={lineVariants}
          initial="initial"
          animate="animate"
        />
      </div>

      {/* Subtle text label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="font-mono text-[9px] uppercase tracking-[0.3em] text-[rgb(var(--fg-muted))]"
      >
        Scroll
      </motion.span>
    </motion.div>
  );
}
