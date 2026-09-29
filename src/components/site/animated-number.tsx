"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * AnimatedNumber — counts up/down between value changes (R4 polish).
 * Renders via an optional `format` fn; skips animation entirely when the
 * user prefers reduced motion.
 */
export function AnimatedNumber({
  value,
  format,
}: {
  value: number;
  format?: (v: number) => string;
}) {
  const [display, setDisplay] = useState(value);
  const reduced = useReducedMotion();
  const fromRef = useRef(value);

  useEffect(() => {
    const from = fromRef.current;
    fromRef.current = value;
    if (reduced || from === value) return;
    let raf = 0;
    const start = performance.now();
    const dur = 420;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (value - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, reduced]);

  // with reduced motion, bypass the tween state entirely
  const shown = reduced ? value : display;
  return <>{(format ?? ((v: number) => String(Math.round(v))))(shown)}</>;
}
