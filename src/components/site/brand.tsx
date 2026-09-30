"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage, type Lang } from "@/lib/i18n";

/* Intrinsic tight-crop size of /images/logo.png (user-supplied brand mark) */
const LOGO_W = 553;
const LOGO_H = 274;

/**
 * R11: the real user-supplied logo — "NE ⌁ FUND" (navy wordmark, cyan arrow).
 * R12: `variant="light"` now renders a true white wordmark
 * (/images/logo-light.png — cyan arrow preserved) for navy surfaces
 * (header, footer, mobile menu) instead of the old white tile.
 * `variant="dark"` renders the white-background asset directly.
 * Size via a height class, e.g. <Logo className="h-10" />.
 */
export function Logo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={variant === "light" ? "/images/logo-light.png" : "/images/logo.png"}
        alt="NexFund"
        width={LOGO_W}
        height={LOGO_H}
        priority
        draggable={false}
        className="h-full w-auto"
      />
    </span>
  );
}

/** Icon-only X-arrow mark (favicon / avatar style) */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M4 20 L15 9 M11 9 h4 v4"
        stroke="#26B7D8"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Bangla/English segmented language toggle (blueprint §4.2).
 * R12: `onDark` renders the white/cyan version for the navy header. */
export function LangToggle({
  lang,
  setLang,
  className,
  onDark = false,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <div
      role="group"
      aria-label="Language / ভাষা"
      className={cn(
        "inline-flex items-center rounded-full border p-0.5 text-xs font-semibold",
        onDark ? "border-white/25 bg-white/10" : "border-nx-navy-200 bg-white",
        className
      )}
    >
      <button
        type="button"
        aria-pressed={lang === "bn"}
        onClick={() => setLang("bn")}
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          onDark
            ? lang === "bn"
              ? "bg-nx-cyan-500 text-nx-navy-900"
              : "text-white/85 hover:bg-white/10"
            : lang === "bn"
              ? "bg-nx-navy-700 text-white"
              : "text-nx-navy-700 hover:bg-nx-navy-50"
        )}
      >
        বাং
      </button>
      <button
        type="button"
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          onDark
            ? lang === "en"
              ? "bg-nx-cyan-500 text-nx-navy-900"
              : "text-white/85 hover:bg-white/10"
            : lang === "en"
              ? "bg-nx-navy-700 text-white"
              : "text-nx-navy-700 hover:bg-nx-navy-50"
        )}
      >
        EN
      </button>
    </div>
  );
}

/** Section heading with eyebrow + title + optional sub — shared visual rhythm */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  dark = false,
  titleId,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
  dark?: boolean;
  /** R8 a11y: id for the h2 so the parent section's aria-labelledby resolves
   *  (every section passes "<sectionid>-title"). */
  titleId?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      <p
        className={cn(
          "nx-eyebrow text-xs font-bold tracking-[0.22em] uppercase",
          /* R8 a11y: cyan-700 keeps the accent but passes 4.5:1 on white/mist */
          dark ? "text-nx-cyan-400" : "text-nx-cyan-700"
        )}
      >
        {eyebrow}
      </p>
      <h2
        id={titleId}
        className={cn(
          "mt-3 text-3xl font-extrabold leading-tight md:text-[2.5rem] md:leading-[1.15]",
          dark ? "text-white" : "text-nx-navy-900"
        )}
      >
        {title}
      </h2>
      {sub ? (
        <p className={cn("mt-4 text-base leading-relaxed md:text-lg", dark ? "text-white/70" : "text-slate-600")}>
          {sub}
        </p>
      ) : null}
    </div>
  );
}

/** Language helper used by all client components */
export function useLang() {
  return useLanguage();
}
