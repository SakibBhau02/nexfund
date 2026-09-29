"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  Lock,
  MapPin,
  ArrowUpRight,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, type L } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { OPP, BADGES, BADGE_TIPS, type BadgeKey } from "@/lib/content";
import { formatTkRange } from "@/lib/format";
import { SectionHeading } from "./brand";
import { Reveal } from "./reveal";
import { G } from "./glossary";
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

export function Opportunities() {
  const { t, lang } = useLanguage();
  const openInvestor = useDialogStore((s) => s.openInvestor);
  const openOpportunity = useDialogStore((s) => s.openOpportunity);
  const [sector, setSector] = useState<string>("all");

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
                    <Skeleton className="h-24 w-20 rounded-full" />
                    <div className="flex-1 space-y-2.5">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </div>
                  <Skeleton className="mt-5 h-16 w-full rounded-xl" />
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
                {filtered.map((o, idx) => (
                  <motion.article
                    layout
                    key={o.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-nx-navy-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-nx-cyan-200 hover:shadow-[0_28px_60px_-24px_rgba(10,58,143,0.3)]"
                  >
                    <div className="flex gap-4 p-5 pb-0">
                      <div className="oval oval-ring w-[86px] shrink-0 bg-nx-navy-100">
                        <Image
                          src={o.image}
                          alt={`${o.codeName} — ${lang === "bn" ? o.sectorBn : o.sector}`}
                          fill
                          sizes="86px"
                          className="object-cover"
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
                ))}
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
    </section>
  );
}
