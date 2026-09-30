"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

/** Scroll-triggered fade-up reveal (blueprint motion: 200–400ms, meaning = upward growth).
 *  R8 a11y: `as="li"` lets list items animate WITHOUT a wrapper div breaking
 *  ul/ol → li semantics (axe `list` + `listitem` rules). */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return as === "li" ? (
      <li className={className}>{children}</li>
    ) : (
      <div className={className}>{children}</div>
    );
  }
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </Tag>
  );
}
