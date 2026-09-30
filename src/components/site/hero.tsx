"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Banknote,
  Building2,
  Check,
  ChevronRight,
  Clock3,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { navigateTo } from "@/lib/page-router";
import { cn } from "@/lib/utils";
import { HERO } from "@/lib/content";
import { HeroSlideshow, type Slide } from "./hero-slideshow";

/** R12: photos now live BEHIND the centered copy as a slow, always-sliding
 *  background — brand-navy veil on top keeps them low-visibility texture
 *  (replaces the old Oval Portal Stack the user asked to remove). */
const SLIDES: Slide[] = [
  {
    src: "/images/hero-garments.png",
    alt: "Garments factory floor in Bangladesh — NexFund connects verified manufacturers with investors",
  },
  { src: "/images/investor-meeting.png", alt: "Investor meeting" },
  { src: "/images/hero-tech.png", alt: "Bangladeshi tech startup team" },
  { src: "/images/hero-agri.png", alt: "Agribusiness in Bangladesh" },
  { src: "/images/hero-retail.png", alt: "Bangladeshi retail business owner" },
];

const STAT_ICONS: Record<string, LucideIcon> = {
  banknote: Banknote,
  building: Building2,
  users: Users,
  clock: Clock3,
};

export function Hero() {
  const { lang, t } = useLanguage();
  const openInvestor = useDialogStore((s) => s.openInvestor);
  const open = useDialogStore((s) => s.open);
  const reduce = useReducedMotion();

  const fade = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 18 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay },
  });

  return (
    <section
      className="relative flex min-h-[92svh] items-center overflow-hidden bg-nx-navy-950"
      aria-labelledby="hero-title"
    >
      {/* always-sliding photo backdrop + brand veil (photos stay subtle) */}
      <HeroSlideshow
        slides={SLIDES}
        interval={5200}
        label={lang === "bn" ? "ব্যাকগ্রাউন্ড স্লাইডশো" : "Background slideshow"}
      />
      <div className="nx-hero-overlay absolute inset-0" aria-hidden="true" />
      <div className="nx-hero-tint absolute inset-0" aria-hidden="true" />
      {/* faint navy grid keeps the brand texture even over photos */}
      <div className="nx-navy-grid absolute inset-0 opacity-70" aria-hidden="true" />

      {/* ── Centered copy ── */}
      <div className="relative mx-auto w-full max-w-[1200px] px-5 py-32 text-center md:px-6 md:py-40">
        <div className="mx-auto max-w-3xl">
          <motion.p
            {...fade(0)}
            className="inline-flex items-center gap-2.5 rounded-full border border-nx-cyan-400/40 bg-nx-cyan-400/10 px-4 py-2 text-[11px] font-bold tracking-[0.2em] text-nx-cyan-300 uppercase backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nx-cyan-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-nx-cyan-400" />
            </span>
            {t(HERO.eyebrow)}
          </motion.p>

          <motion.h1
            id="hero-title"
            {...fade(0.08)}
            className="mt-6 text-[2.5rem] leading-[1.1] font-extrabold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(3,12,32,0.6)] md:text-[4.2rem]"
          >
            {t(HERO.h1)}
          </motion.h1>

          <motion.p
            {...fade(0.16)}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg"
          >
            {t(HERO.sub)}
          </motion.p>

          <motion.div
            {...fade(0.24)}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <button
              onClick={() => openInvestor("investor")}
              className="nx-arrow-btn group inline-flex items-center justify-center gap-2 rounded-full bg-nx-cyan-500 px-8 py-4 text-base font-bold text-nx-navy-900 shadow-[0_18px_44px_-12px_rgba(38,183,216,0.65)] transition-all hover:bg-nx-cyan-400 hover:shadow-[0_22px_52px_-12px_rgba(38,183,216,0.8)]"
            >
              {t(HERO.ctaInvestor)}
              <span className="nx-arrow">
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </span>
            </button>
            <button
              onClick={() => open("quiz")}
              className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-white/45 bg-white/[0.1] px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:border-white/80 hover:bg-white/15"
            >
              {t(HERO.ctaFounder)}
            </button>
          </motion.div>

          {/* micro-trust row */}
          <motion.ul
            {...fade(0.34)}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
            aria-label={lang === "bn" ? "আস্থার সংকেত" : "Trust signals"}
          >
            {HERO.microTrust.map((m) => (
              <li key={m.en} className="flex items-center gap-1.5 text-sm font-medium text-white/85">
                <Check className="h-4 w-4 text-nx-cyan-400" aria-hidden="true" />
                {t(m)}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ── Informative stats band (glass) ── */}
        <motion.dl
          {...fade(0.46)}
          className="mx-auto mt-14 grid max-w-3xl grid-cols-2 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-md md:grid-cols-4"
        >
          {HERO.stats.map((s, i) => {
            const Icon = STAT_ICONS[s.icon] ?? Banknote;
            return (
              <div
                key={s.label.en}
                className={cn(
                  "flex flex-col items-center gap-1.5 border-white/10 px-4 py-5",
                  /* mobile 2×2: right column + bottom row dividers */
                  i % 2 === 1 && "border-l",
                  i >= 2 && "border-t",
                  /* desktop single row: left dividers only */
                  i > 0 && "md:border-l md:border-t-0"
                )}
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-nx-cyan-400/30 bg-nx-cyan-400/15 text-nx-cyan-300">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <dd className="nx-num text-xl font-extrabold text-white md:text-2xl">{t(s.value)}</dd>
                <dt className="text-center text-[12px] leading-snug font-medium text-white/75">{t(s.label)}</dt>
              </div>
            );
          })}
        </motion.dl>

        <motion.p {...fade(0.54)} className="mt-4 text-[12px] font-medium text-white/75">
          <button
            onClick={() => navigateTo("impact")}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 transition-colors hover:text-nx-cyan-300"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-nx-cyan-400" aria-hidden="true" />
            {t(HERO.statsNote)}
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </motion.p>
      </div>

      {/* hairline bottom edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-nx-cyan-500/50 to-transparent"
      />
    </section>
  );
}
