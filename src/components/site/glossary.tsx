"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { GLOSSARY } from "@/lib/content";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/**
 * Inline glossary term (blueprint §7 #14): dotted underline + tooltip,
 * bilingual definition. Keyboard-focusable, no-JS still shows the term text.
 *
 * R5: touch devices — Radix Tooltip doesn't open on tap (hover-only), so on
 * `(hover: none)` devices the first tap toggles the definition open and a
 * second tap (or Escape) closes it. The tooltip is fully controlled from the
 * first render (no uncontrolled→controlled switch): hover/focus changes are
 * accepted via onOpenChange on pointer devices and ignored on touch, where
 * tap/Escape own the state instead. Touch capability is detected post-mount
 * via state (SSR and client renders agree, no ref-in-render).
 */
export function G({
  term,
  children,
  className,
}: {
  /** key into GLOSSARY, e.g. "equity" */
  term: keyof typeof GLOSSARY | string;
  children?: React.ReactNode;
  className?: string;
}) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  // lazy initializer: safe for hydration — isTouch never changes first-render
  // markup (open is always false initially), it only gates event handlers
  const [isTouch] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      // real phones/tablets report BOTH no-hover and a coarse pointer;
      // some headless/desktop environments report hover:none with a mouse —
      // requiring pointer:coarse keeps their hover tooltips working
      window.matchMedia("(hover: none)").matches &&
      window.matchMedia("(pointer: coarse)").matches
  );

  const def = GLOSSARY[term];
  if (!def) return <>{children ?? term}</>;

  return (
    <Tooltip
      delayDuration={80}
      open={open}
      onOpenChange={(o) => {
        // on touch, hover/focus events don't own the tooltip — tap does
        if (!isTouch) setOpen(o);
      }}
    >
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={t(def)}
          onClick={() => {
            if (isTouch) setOpen((o) => !o);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape" && open) setOpen(false);
          }}
          className={cn(
            "decoration-nx-cyan-400 decoration-dotted decoration-[2px] underline underline-offset-[3px] transition-colors hover:bg-nx-cyan-50 focus-visible:bg-nx-cyan-50",
            open && isTouch && "bg-nx-cyan-50",
            className
          )}
        >
          {children ?? term}
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[260px] leading-relaxed">
        <p className="text-xs">{t(def)}</p>
      </TooltipContent>
    </Tooltip>
  );
}
