"use client";

import { cn } from "@/lib/utils";
import { useLanguage, type Lang } from "@/lib/i18n";

/** NexFund wordmark — wide geometric feel; X carries the rising cyan arrow (logo story §2.1) */
export function Logo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const wordColor = variant === "dark" ? "text-nx-navy-900" : "text-white";
  const subColor = variant === "dark" ? "text-nx-navy-700/70" : "text-white/60";
  return (
    <span className={cn("inline-flex items-baseline gap-[0.18em] select-none", wordColor, className)}>
      <span className="font-extrabold tracking-[0.08em]">NEX</span>
      <span className="relative inline-block font-extrabold tracking-[0.08em]">
        {/* the X-arrow mark */}
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="absolute -top-[0.28em] left-1/2 h-[1.15em] w-[1.15em] -translate-x-1/2"
          fill="none"
        >
          {/* crossing path going up-right */}
          <path
            d="M4 20 L15 9 M11 9 h4 v4"
            stroke="#26B7D8"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        X
      </span>
      <span className="font-extrabold tracking-[0.08em]">FUND</span>
      <span className={cn("ml-2 hidden text-[0.5em] font-semibold sm:inline", subColor)}>
        নেক্সফান্ড
      </span>
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

/** Bangla/English segmented language toggle (blueprint §4.2) */
export function LangToggle({
  lang,
  setLang,
  className,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label="Language / ভাষা"
      className={cn(
        "inline-flex items-center rounded-full border border-nx-navy-200 bg-white p-0.5 text-xs font-semibold",
        className
      )}
    >
      <button
        type="button"
        aria-pressed={lang === "bn"}
        onClick={() => setLang("bn")}
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          lang === "bn"
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
          lang === "en"
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
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      <p
        className={cn(
          "nx-eyebrow text-xs font-bold tracking-[0.22em] uppercase",
          dark ? "text-nx-cyan-400" : "text-nx-cyan-600"
        )}
      >
        {eyebrow}
      </p>
      <h2
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
