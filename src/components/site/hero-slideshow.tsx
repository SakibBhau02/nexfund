"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Slide = { src: string; alt?: string };

/**
 * R12: full-bleed hero background slideshow — a few photos cross-fading
 * forever behind the hero copy, each with a slow ken-burns drift.
 * A heavy brand-navy veil is layered on top by the parent (.nx-hero-overlay)
 * so the photos stay low-visibility texture and the text keeps the focus.
 *
 * Accessibility: the first slide carries a meaningful alt (SEO/AEO), the
 * rest are decorative. Dots are real buttons with labels. With
 * prefers-reduced-motion the show freezes on the first slide.
 */
export function HeroSlideshow({
  slides,
  interval = 5000,
  dots = true,
  label,
  className,
}: {
  slides: Slide[];
  /** ms per slide (cross-fade is ~1.5s on top) */
  interval?: number;
  dots?: boolean;
  /** accessible name for the slideshow group */
  label?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const count = slides.length;

  // timeout keyed on `active` → auto-advance AND manual dot clicks both
  // restart the full dwell time
  useEffect(() => {
    if (reduce || count < 2) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % count), interval);
    return () => window.clearTimeout(id);
  }, [reduce, count, interval, active]);

  if (count === 0) return null;

  return (
    <div
      role="group"
      aria-roledescription="slideshow"
      aria-label={label}
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      {slides.map((s, i) => (
        <div
          key={s.src + i}
          aria-hidden={i !== 0 || undefined}
          className={cn(
            "absolute inset-0 transition-opacity ease-in-out",
            i === active ? "opacity-100 duration-[1500ms]" : "pointer-events-none opacity-0 duration-[1800ms]"
          )}
        >
          <Image
            src={s.src}
            alt={i === 0 ? (s.alt ?? "") : ""}
            fill
            priority={i === 0}
            loading={i === 0 ? undefined : "lazy"}
            sizes="100vw"
            quality={80}
            className={cn(
              "object-cover",
              i === active && !reduce && "nx-kenburns"
            )}
          />
        </div>
      ))}

      {dots && count > 1 && (
        <div className="absolute bottom-5 left-1/2 z-[5] flex -translate-x-1/2 items-center gap-2.5">
          {slides.map((s, i) => (
            <button
              key={s.src + "-dot" + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1} / ${count}`}
              aria-current={i === active}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active
                  ? "w-7 bg-nx-cyan-400 shadow-[0_0_10px_rgba(38,183,216,0.8)]"
                  : "w-1.5 bg-white/35 hover:w-2.5 hover:bg-white/60"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
