"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Reading progress bar — thin navy→cyan gradient line pinned to the very top
 * of the viewport. Sits above the sticky header (z-[80] vs header z-40).
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="nx-progress-gradient pointer-events-none fixed inset-x-0 top-0 z-[80] h-[3px]"
    />
  );
}
