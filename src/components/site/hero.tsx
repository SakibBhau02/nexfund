"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { HERO, DEAL_CARD, UI } from "@/lib/content";

/** Oval stack image rotation — 3 images per oval, staggered (blueprint §7.1) */
const OVAL_SETS: string[][] = [
  ["/images/hero-retail.png", "/images/hero-agri.png", "/images/hero-tech.png"],
  ["/images/hero-agri.png", "/images/investor-meeting.png", "/images/hero-garments.png"],
  ["/images/hero-garments.png", "/images/hero-tech.png", "/images/hero-agri.png"],
];

function Oval({
  images,
  className,
  sizes,
  priority = false,
  alt,
}: {
  images: string[];
  className?: string;
  sizes: string;
  priority?: boolean;
  alt: string;
}) {
  return (
    <div className={`oval oval-ring bg-nx-navy-100 ${className ?? ""}`}>
      {images.map((src, i) => (
        <Image
          key={src + i}
          src={src}
          alt={i === 0 ? alt : ""}
          fill
          priority={priority && i === 0}
          loading={priority && i === 0 ? undefined : "lazy"}
          sizes={sizes}
          className="nx-slide"
        />
      ))}
    </div>
  );
}

export function Hero() {
  const { lang, t } = useLanguage();
  const openInvestor = useDialogStore((s) => s.openInvestor);
  const open = useDialogStore((s) => s.open);
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white" aria-labelledby="hero-title">
      {/* backdrop: dot grid + soft cyan glow */}
      <div className="nx-dots absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -right-40 top-10 h-[540px] w-[540px] rounded-full bg-nx-cyan-100/60 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full bg-nx-navy-100/70 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-5 pb-20 pt-32 md:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-28 lg:pt-40">
        {/* ── Copy column ── */}
        <div className="max-w-xl">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-nx-cyan-200 bg-nx-cyan-50 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.18em] text-nx-cyan-700 uppercase"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-nx-cyan-500" aria-hidden="true" />
            {t(HERO.eyebrow)}
          </motion.p>

          <motion.h1
            id="hero-title"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-5 text-[2.35rem] font-extrabold leading-[1.12] tracking-tight text-nx-navy-900 md:text-6xl"
          >
            {t(HERO.h1)}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg"
          >
            {t(HERO.sub)}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <button
              onClick={() => openInvestor("investor")}
              className="nx-arrow-btn group inline-flex items-center justify-center gap-2 rounded-full bg-nx-navy-700 px-7 py-3.5 text-base font-bold text-white shadow-[0_16px_36px_-12px_rgba(10,58,143,0.6)] transition-all hover:bg-nx-navy-600 hover:shadow-[0_20px_44px_-12px_rgba(10,58,143,0.7)]"
            >
              {t(HERO.ctaInvestor)}
              <span className="nx-arrow">
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </span>
            </button>
            <button
              onClick={() => open("quiz")}
              className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-nx-navy-200 bg-white px-7 py-3.5 text-base font-bold text-nx-navy-800 transition-all hover:border-nx-cyan-500 hover:text-nx-navy-700"
            >
              {t(HERO.ctaFounder)}
            </button>
          </motion.div>

          {/* micro-trust row */}
          <motion.ul
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.36 }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2"
            aria-label={lang === "bn" ? "আস্থার সংকেত" : "Trust signals"}
          >
            {HERO.microTrust.map((m) => (
              <li key={m.en} className="flex items-center gap-1.5 text-sm font-medium text-nx-navy-800">
                <Check className="h-4 w-4 text-nx-verified" aria-hidden="true" />
                {t(m)}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ── Oval Portal Stack ── */}
        <div className="relative mx-auto h-[440px] w-full max-w-[460px] sm:h-[500px] lg:h-[560px]">
          {/* cyan crossing path ↗ */}
          <svg
            viewBox="0 0 400 500"
            fill="none"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
          >
            <motion.path
              d="M-10 470 C 120 430, 130 330, 240 250 S 360 120, 392 58"
              stroke="#26B7D8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="6 10"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.85 }}
              transition={{ duration: 1.6, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            />
            <motion.path
              d="M382 74 L392 56 L374 52"
              stroke="#26B7D8"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.4 }}
            />
          </svg>

          {/* small oval — lowest */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="absolute bottom-2 left-0 w-[31%] max-w-[150px]"
          >
            <Oval images={OVAL_SETS[0]} sizes="150px" alt={lang === "bn" ? "বাংলাদেশি দোকান মালিক" : "Bangladeshi shop owner"} />
          </motion.div>

          {/* medium oval — middle */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute bottom-24 left-[21%] w-[38%] max-w-[185px]"
          >
            <Oval images={OVAL_SETS[1]} sizes="185px" alt={lang === "bn" ? "কৃষিভিত্তিক উদ্যোগ" : "Agri-business"} />
          </motion.div>

          {/* large oval — top right */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute right-0 top-0 w-[54%] max-w-[260px]"
          >
            <Oval
              images={OVAL_SETS[2]}
              sizes="(max-width:640px) 54vw, 260px"
              priority
              alt={lang === "bn" ? "গার্মেন্টস কারখানার কর্মীরা" : "Garments factory workers"}
            />
          </motion.div>

          {/* floating deal card (blueprint: verified badge + stage) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="nx-float absolute bottom-3 right-0 z-10 w-[220px] rounded-2xl border border-nx-navy-100 bg-white/95 p-4 shadow-[0_24px_48px_-16px_rgba(6,31,74,0.28)] backdrop-blur sm:w-[240px]"
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-nx-verified-bg px-2 py-0.5 text-[11px] font-bold text-nx-verified-700">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                {t(DEAL_CARD.verified)}
              </span>
              <span className="text-[11px] font-semibold text-slate-500">
                {t(DEAL_CARD.stage)} {lang === "bn" ? "৪/৫" : "4/5"}
              </span>
            </div>
            <p className="mt-2.5 text-[13px] font-bold leading-snug text-nx-navy-900">
              {lang === "bn"
                ? "রপ্তানিমুখী গার্মেন্টস — RMG-201"
                : "Export garments manufacturer — RMG-201"}
            </p>
            <p className="nx-num mt-1 text-sm font-extrabold text-nx-navy-700">
              {lang === "bn" ? "৳১.৫–২.৫ কোটি" : "৳1.5–2.5 crore"}
              <span className="ml-1.5 text-[11px] font-semibold text-slate-500">
                {t(DEAL_CARD.equity)}
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
