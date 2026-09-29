"use client";

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
  const def = GLOSSARY[term];
  if (!def) return <>{children ?? term}</>;
  return (
    <Tooltip delayDuration={80}>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={t(def)}
          className={cn(
            "decoration-nx-cyan-400 decoration-dotted decoration-[2px] underline underline-offset-[3px] transition-colors hover:bg-nx-cyan-50 focus-visible:bg-nx-cyan-50",
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
