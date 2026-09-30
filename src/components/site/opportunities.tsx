"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  Check,
  GitCompareArrows,
  Lock,
  MapPin,
  ArrowUpRight,
  Info,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, type L } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { OPP, BADGES, BADGE_TIPS, CMP, CMP_SHARE, type BadgeKey } from "@/lib/content";
import { formatTkRange, bnNum } from "@/lib/format";
import { SectionHeading } from "./brand";
import { Reveal } from "./reveal";
import { G } from "./glossary";
import { CompareDialog } from "./dialogs/compare-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

export type OpportunityDTO = {
  id: string;
  slug: string;
  codeName: string;
  sector: string;
  sectorBn: string;
  location: string;
  locationBn: string;
  headline: string;
  headlineBn: string;
  description: string;
  descriptionBn: string;
  seekingMin: number;
  seekingMax: number;
  stage: number;
  instrument: string;
  instrumentBn: string;
  risks: { en: string; bn: string }[];
  badges: BadgeKey[];
  image: string;
  revenue?: string;
  revenueBn?: string;
  // R2 detail-dialog enrichment
  overview?: string;
  overviewBn?: string;
  teamNote?: string;
  teamNoteBn?: string;
  financialNote?: string;
  financialNoteBn?: string;
  useOfFunds?: { item: { en: string; bn: string }; pct: number }[];
  advisorNote?: string;
  advisorNoteBn?: string;
  modelNote?: string;
  modelNoteBn?: string;
};

/** Compare feature limits & tray hint (R5-CMP local copy — CMP covers the rest) */
const MAX_COMPARE = 3;
const MIN_TWO: L = {
  en: "Pick at least 2 listings to compare",
  bn: "তুলনা করতে অন্তত ২টি তালিকা বাছাই করুন",
};

/* ── R7: compare shortlist persistence + #cmp= permalink hydration ──────
   localStorage key for the saved shortlist (survives reloads). */
const LS_KEY = "nx-compare";
/** Module-scope (not useRef): the BN⇄EN remount must NOT re-apply the hash —
   otherwise every language toggle would re-open the shared comparison. */
let cmpHashApplied = false;

export function Opportunities() {
  const { t, lang } = useLanguage();
  const openInvestor = useDialogStore((s) => s.openInvestor);
  const openOpportunity = useDialogStore((s) => s.openOpportunity);
  /* R6: sector filter lives in the store so the BN⇄EN cross-fade keeps it */
  const sector = useDialogStore((s) => s.sectorFilter);
  const setSector = useDialogStore((s) => s.setSectorFilter);

  /* ── R5-CMP: side-by-side compare state. The shortlist lives in the zustand
     store so the language cross-fade (key={lang} remount) keeps the picks. ── */
  const compare = useDialogStore((s) => s.compareSlugs);
  const setCompare = useDialogStore((s) => s.setCompareSlugs);
  /* R7: open flag lifted into the store — the cross-fade remount used to
     close the dialog mid-comparison (and race the #cmp= permalink flow). */
  const compareOpen = useDialogStore((s) => s.compareOpen);
  const setCompareOpen = useDialogStore((s) => s.setCompareOpen);
  const [capToast, setCapToast] = useState(false);
  const toastTimer = useRef<number | null>(null);
  const reduce = useReducedMotion();

  /* R7: "loaded a shared comparison ✓" pill in the tray (6s, like #sim=) */
  const [sharedLoaded, setSharedLoaded] = useState(false);
  const sharedTimer = useRef<number | null>(null);
  /* R7: hydrate the shortlist from localStorage exactly once per mount;
     first save-effect run is skipped so hydration is never overwritten. */
  const hydratedRef = useRef(false);
  const skipFirstSaveRef = useRef(true);

  const flashCapToast = () => {
    setCapToast(true);
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setCapToast(false), 2800);
  };

  // clear the pending toast/share timers on unmount
  useEffect(() => {
    return () => {
      if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
      if (sharedTimer.current !== null) window.clearTimeout(sharedTimer.current);
    };
  }, []);

  const toggleCompare = (slug: string) => {
    if (compare.includes(slug)) {
      setCompare(compare.filter((s) => s !== slug));
    } else if (compare.length >= MAX_COMPARE) {
      // cap reached — don't add; flash the hint instead
      flashCapToast();
    } else {
      setCompare([...compare, slug]);
    }
  };

  const { data, isLoading } = useQuery<OpportunityDTO[]>({
    queryKey: ["opportunities"],
    queryFn: async () => {
      const res = await fetch("/api/opportunities");
      if (!res.ok) throw new Error("Failed to load");
      return res.json();
    },
    staleTime: 60_000,
  });

  const sectors = useMemo(() => {
    if (!data) return [];
    const set = new Map<string, L>();
    for (const o of data) set.set(o.sector, { en: o.sector, bn: o.sectorBn });
    return Array.from(set.entries());
  }, [data]);

  const filtered = useMemo(() => {
    if (!data) return [];
    return sector === "all" ? data : data.filter((o) => o.sector === sector);
  }, [data, sector]);

  /* selected opportunities in pick order, resolved from the shared cache */
  const compareItems = useMemo(
    () =>
      compare
        .map((slug) => data?.find((o) => o.slug === slug))
        .filter((o): o is OpportunityDTO => Boolean(o)),
    [compare, data]
  );

  /* ── R7: #cmp=slug1,slug2 permalink → hydrate the shortlist + open the
     dialog (≥2 valid slugs). Waits for the query cache, applies once per
     page load via rAF (same post-hydration pattern as #sim=/#insight=). */
  useEffect(() => {
    if (cmpHashApplied || !data) return;
    cmpHashApplied = true;
    const m = /^#cmp=([a-z0-9-]+(?:,[a-z0-9-]+){0,2})$/i.exec(window.location.hash);
    if (!m) return;
    const wanted = m[1].split(",").filter((s) => data.some((o) => o.slug === s));
    if (wanted.length === 0) return; // stale link → degrade to the normal page
    const raf = requestAnimationFrame(() => {
      setCompare(wanted.slice(0, MAX_COMPARE));
      if (wanted.length >= 2) setCompareOpen(true);
      setSharedLoaded(true);
      if (sharedTimer.current !== null) window.clearTimeout(sharedTimer.current);
      sharedTimer.current = window.setTimeout(() => setSharedLoaded(false), 6000);
    });
    return () => cancelAnimationFrame(raf);
  }, [data, setCompare, setCompareOpen]);

  /* ── R7: restore the saved shortlist from localStorage (a shared #cmp=
     link wins). Re-runs per BN⇄EN remount, but the store already matches LS
     because every change is persisted below — so it's a no-op after reload. */
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    if (/^#cmp=/i.test(window.location.hash)) return;
    try {
      const raw = window.localStorage.getItem(LS_KEY);
      if (!raw) return;
      const saved: unknown = JSON.parse(raw);
      if (Array.isArray(saved)) {
        const slugs = saved
          .filter((s): s is string => typeof s === "string")
          .slice(0, MAX_COMPARE);
        if (slugs.length > 0) setCompare(slugs);
      }
    } catch {
      /* corrupt/unavailable storage — ignore */
    }
  }, [setCompare]);

  /* ── R7: persist every shortlist change (the first post-mount run is
     skipped so it can't clear storage before hydration has applied). */
  useEffect(() => {
    if (skipFirstSaveRef.current) {
      skipFirstSaveRef.current = false;
      return;
    }
    try {
      if (compare.length > 0) window.localStorage.setItem(LS_KEY, JSON.stringify(compare));
      else window.localStorage.removeItem(LS_KEY);
    } catch {
      /* storage unavailable — non-fatal */
    }
  }, [compare]);

  return (
    <section id="opportunities" className="bg-nx-mist py-20 md:py-24" aria-labelledby="opp-title">
      <div className="mx-auto max-w-[1200px] px-5 md:px-6">
        <Reveal>
          <SectionHeading eyebrow={t(OPP.eyebrow)} title={t(OPP.title)} sub={t(OPP.sub)} />
        </Reveal>

        {/* Sector filter chips — with press micro-interaction (R2) */}
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2" role="group" aria-label={lang === "bn" ? "খাত ফিল্টার" : "Sector filter"}>
            {["all", ...sectors.map(([k]) => k)].map((key) => {
              const label = key === "all" ? t(OPP.allSectors) : t(sectors.find(([k]) => k === key)![1]);
              const active = sector === key;
              return (
                <motion.button
                  key={key}
                  onClick={() => setSector(key)}
                  aria-pressed={active}
                  whileTap={{ scale: 0.93 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-semibold transition-all duration-200",
                    active
                      ? "border-nx-navy-700 bg-nx-navy-700 text-white shadow-[0_8px_18px_-8px_rgba(10,58,143,0.6)]"
                      : "border-nx-navy-200 bg-white text-nx-navy-800 hover:-translate-y-0.5 hover:border-nx-navy-500 hover:shadow-[0_8px_18px_-10px_rgba(10,58,143,0.4)]"
                  )}
                >
                  {label}
                </motion.button>
              );
            })}
          </div>
        </Reveal>

        {/* Cards */}
        <div className="mt-10">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-3xl border border-nx-navy-100 bg-white p-6">
                  <div className="flex gap-4">
                    <Skeleton className="nx-shimmer h-24 w-20 rounded-full" />
                    <div className="flex-1 space-y-2.5">
                      <Skeleton className="nx-shimmer h-4 w-3/4" />
                      <Skeleton className="nx-shimmer h-3 w-1/2" />
                      <Skeleton className="nx-shimmer h-3 w-2/3" />
                    </div>
                  </div>
                  <Skeleton className="nx-shimmer mt-5 h-16 w-full rounded-xl" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="mx-auto max-w-md rounded-3xl border border-dashed border-nx-navy-200 bg-white p-10 text-center">
              <p className="font-bold text-nx-navy-900">{t(OPP.emptyTitle)}</p>
              <button
                onClick={() => openInvestor("investor")}
                className="mt-5 rounded-full bg-nx-navy-700 px-6 py-2.5 text-sm font-bold text-white hover:bg-nx-navy-600"
              >
                {t(OPP.emptyCta)}
              </button>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((o, idx) => {
                  const selected = compare.includes(o.slug);
                  return (
                  <motion.article
                    layout
                    key={o.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
                    className={cn(
                      "nx-card-sheen group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-24px_rgba(10,58,143,0.3)]",
                      selected
                        ? "border-nx-cyan-400 ring-2 ring-nx-cyan-400/60"
                        : "border-nx-navy-100 hover:border-nx-cyan-200"
                    )}
                  >
                    {/* selected corner indicator — scannable compare state */}
                    <AnimatePresence>
                      {selected && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 28 }}
                          className="absolute right-3.5 top-3.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-nx-cyan-500 text-nx-navy-900 shadow-[0_6px_14px_-6px_rgba(38,183,216,0.9)]"
                          aria-hidden="true"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <div className="flex gap-4 p-5 pb-0">
                      <div className="oval oval-ring w-[86px] shrink-0 bg-nx-navy-100">
                        <Image
                          src={o.image}
                          alt={`${o.codeName} — ${lang === "bn" ? o.sectorBn : o.sector}`}
                          fill
                          sizes="86px"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="flex items-center gap-1.5 truncate text-[11px] font-bold tracking-wide text-nx-cyan-700 uppercase">
                          <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                          <span className="truncate">{lang === "bn" ? o.sectorBn : o.sector} · {lang === "bn" ? o.locationBn : o.location}</span>
                        </p>
                        <h3 className="nx-num mt-1 text-lg font-extrabold leading-snug text-nx-navy-900">
                          {o.codeName}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm leading-snug text-slate-600">
                          {lang === "bn" ? o.headlineBn : o.headline}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                      {/* key facts */}
                      <dl className="grid grid-cols-2 gap-3 rounded-2xl bg-nx-mist p-4 text-sm">
                        <div>
                          <dt className="text-[11px] font-bold tracking-wide text-slate-500 uppercase">
                            {t(OPP.seeking)}
                          </dt>
                          <dd className="nx-num mt-0.5 font-extrabold text-nx-navy-800">
                            {formatTkRange(o.seekingMin, o.seekingMax, lang)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[11px] font-bold tracking-wide text-slate-500 uppercase">
                            {t(OPP.instrument)}
                          </dt>
                          <dd className="mt-0.5 font-semibold text-nx-navy-800">
                            {/* R2: glossary tooltip on instrument (§7 #14) */}
                            {o.instrument.toLowerCase().includes("equity") ? (
                              <G term="equity">{lang === "bn" ? o.instrumentBn : o.instrument}</G>
                            ) : o.instrument.toLowerCase().includes("revenue") ? (
                              <G term="revenue share">{lang === "bn" ? o.instrumentBn : o.instrument}</G>
                            ) : (
                              lang === "bn" ? o.instrumentBn : o.instrument
                            )}
                          </dd>
                        </div>
                      </dl>

                      {/* verification progress */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                          <span className="uppercase tracking-wide">{t(OPP.verificationProgress)}</span>
                          <span className="nx-num text-nx-navy-800">
                            {lang === "bn"
                              ? `${["১", "২", "৩", "৪", "৫"][o.stage - 1]}/৫`
                              : `${o.stage}/5`}
                          </span>
                        </div>
                        <div className="mt-1.5 flex gap-1.5" aria-hidden="true">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <span
                              key={s}
                              className={cn(
                                "h-1.5 flex-1 rounded-full",
                                s <= o.stage ? "bg-nx-cyan-500" : "bg-nx-navy-100"
                              )}
                            />
                          ))}
                        </div>
                        <TooltipProvider delayDuration={120}>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {o.badges.map((b) => (
                              <Tooltip key={b}>
                                <TooltipTrigger asChild>
                                  <span className="inline-flex cursor-help items-center gap-1 rounded-full bg-nx-verified-bg px-2 py-0.5 text-[11px] font-bold text-nx-verified">
                                    <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                                    {t(BADGES[b])}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-[220px] text-xs leading-relaxed">
                                  {t(BADGE_TIPS[b])}
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </div>
                        </TooltipProvider>
                      </div>

                      {/* Key risks — ALWAYS visible (blueprint trust rule) */}
                      <div className="mt-4 flex-1 rounded-2xl border border-nx-warn/60 bg-nx-warn-bg p-4 shadow-[inset_0_1px_0_rgba(183,121,31,0.08)]">
                        <p className="flex items-center gap-1.5 text-[11px] font-extrabold tracking-wide text-nx-warn uppercase">
                          <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                          {t(OPP.keyRisks)}
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {o.risks.slice(0, 3).map((r) => (
                            <li key={r.en} className="flex items-start gap-2 text-[13px] leading-snug text-nx-ink/85">
                              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-nx-warn" aria-hidden="true" />
                              {lang === "bn" ? r.bn : r.en}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* R5-CMP: compare toggle — adds/removes this listing from the tray */}
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleCompare(o.slug)}
                        aria-pressed={selected}
                        title={selected ? t(CMP.chipAriaOn) : t(CMP.chipAria)}
                        data-compare-toggle={o.slug}
                        className={cn(
                          "mt-4 flex h-11 w-full items-center justify-center gap-1.5 rounded-full border text-xs font-bold transition-all duration-200",
                          selected
                            ? "border-nx-navy-700 bg-nx-navy-700 text-white shadow-[0_12px_24px_-14px_rgba(10,58,143,0.8)]"
                            : "border-dashed border-nx-navy-300 bg-white text-nx-navy-600 hover:border-nx-cyan-400 hover:text-nx-cyan-700"
                        )}
                      >
                        {selected ? (
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        ) : (
                          <GitCompareArrows className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        {t(CMP.chip)}
                      </motion.button>

                      {/* actions — open full detail dialog (R2) */}
                      <div className="mt-5 flex items-center gap-2">
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={() => openOpportunity(o.slug)}
                          className="nx-arrow-btn flex flex-1 items-center justify-center gap-1.5 rounded-full border border-nx-navy-200 bg-white px-4 py-2.5 text-sm font-bold text-nx-navy-800 transition-colors hover:border-nx-navy-500"
                        >
                          <Info className="h-4 w-4" aria-hidden="true" />
                          {t(OPP.viewSummary)}
                          <span className="nx-arrow">
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </span>
                        </motion.button>
                        <button
                          onClick={() => openInvestor("investor")}
                          aria-label={t(OPP.registerDocs)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-nx-navy-700 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-nx-navy-600"
                        >
                          <Lock className="h-4 w-4" aria-hidden="true" />
                          {lang === "bn" ? "নথি" : "Docs"}
                        </button>
                      </div>
                    </div>
                  </motion.article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* anonymization note */}
        <Reveal>
          <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-slate-500">
            <Lock className="h-4 w-4 text-nx-navy-500" aria-hidden="true" />
            {t(OPP.anonymizedNote)}
          </p>
        </Reveal>
      </div>

      {/* ── R5-CMP: cap toast (max 3) — status pill, auto-dismisses ── */}
      <AnimatePresence>
        {capToast && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.97 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="pointer-events-none fixed inset-x-0 bottom-[calc(72px+env(safe-area-inset-bottom))] z-[60] flex justify-center px-4 md:bottom-24"
          >
            <p
              role="status"
              className="flex items-center gap-2 rounded-full bg-nx-navy-900 px-4 py-2.5 text-xs font-bold text-white shadow-[0_18px_40px_-16px_rgba(6,31,74,0.65)]"
            >
              <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-nx-cyan-400" aria-hidden="true" />
              {t(CMP.maxToast)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── R5-CMP: floating compare tray — sits above the mobile CTA bar ── */}
      <AnimatePresence>
        {compare.length > 0 && !compareOpen && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 48 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
            className="pointer-events-none fixed inset-x-0 bottom-[calc(72px+env(safe-area-inset-bottom))] z-50 flex justify-center px-4 md:bottom-6"
          >
            <div
              role="group"
              aria-label={t(CMP.barAria)}
              data-compare-tray
              className="pointer-events-auto flex max-w-full items-center gap-2 rounded-full border border-nx-navy-200 bg-white py-2 pl-2.5 pr-2 shadow-[0_24px_50px_-20px_rgba(6,31,74,0.5)]"
            >
              <span className="nx-num shrink-0 rounded-full bg-nx-navy-700 px-2.5 py-1.5 text-[11px] font-extrabold text-white">
                {t(CMP.selected(compare.length))}
              </span>
              {/* R7: shown briefly when a shared #cmp= link hydrated the picks */}
              {sharedLoaded && (
                <span className="shrink-0 rounded-full border border-nx-cyan-200 bg-nx-cyan-50 px-2.5 py-1.5 text-[11px] font-bold text-nx-cyan-700">
                  {t(CMP_SHARE.loadedPill)}
                </span>
              )}
              {/* code names of the picked listings */}
              <span className="hidden shrink-0 items-center gap-1.5 sm:flex">
                {compareItems.map((o) => (
                  <span
                    key={o.slug}
                    className="nx-num rounded-full bg-nx-mist px-2.5 py-1.5 text-[11px] font-bold text-nx-navy-800"
                  >
                    {o.codeName}
                  </span>
                ))}
              </span>
              {compare.length < 2 && (
                <span
                  className="nx-num shrink-0 text-[11px] font-bold text-slate-500"
                  title={t(MIN_TWO)}
                >
                  {lang === "bn" ? `${bnNum(1)}/${bnNum(2)}` : "1/2"}
                </span>
              )}
              <span
                className="shrink-0"
                title={compare.length < 2 ? t(MIN_TWO) : undefined}
              >
                <button
                  type="button"
                  onClick={() => setCompareOpen(true)}
                  disabled={compare.length < 2}
                  className="nx-arrow-btn inline-flex items-center gap-1.5 rounded-full bg-nx-navy-700 px-4 py-2 text-[13px] font-bold text-white transition-colors hover:bg-nx-navy-600 disabled:cursor-not-allowed disabled:bg-nx-navy-200 disabled:hover:bg-nx-navy-200"
                >
                  {t(CMP.open)}
                  <GitCompareArrows
                    className="hidden h-3.5 w-3.5 sm:block"
                    aria-hidden="true"
                  />
                </button>
              </span>
              <button
                type="button"
                onClick={() => setCompare([])}
                aria-label={t(CMP.clear)}
                title={t(CMP.clear)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-nx-mist hover:text-nx-navy-800"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── R5-CMP: side-by-side comparison dialog (local state, not the global store) ── */}
      <CompareDialog
        open={compareOpen}
        onOpenChange={setCompareOpen}
        items={compareItems}
        onRemove={(slug) => {
          const next = compare.filter((s) => s !== slug);
          setCompare(next);
          // dialog closes itself when the last pick is removed
          if (next.length === 0) setCompareOpen(false);
        }}
      />
    </section>
  );
}
