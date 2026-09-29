"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowUpRight,
  BadgeCheck,
  Calendar,
  Lock,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  Briefcase,
  LineChart,
  Wallet,
  Info,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { OPP_DLG, OPP, BADGES, BADGE_TIPS, type BadgeKey } from "@/lib/content";
import { formatTkRange, bnNum } from "@/lib/format";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { G } from "@/components/site/glossary";
import type { OpportunityDTO } from "@/components/site/opportunities";

type UseOfFundsItem = { item: { en: string; bn: string }; pct: number };

export function OpportunityDialog() {
  const { lang, t } = useLanguage();
  const dialog = useDialogStore((s) => s.dialog);
  const slug = useDialogStore((s) => s.opportunitySlug);
  const close = useDialogStore((s) => s.close);
  const openInvestor = useDialogStore((s) => s.openInvestor);
  const open = useDialogStore((s) => s.open);
  const isOpen = dialog === "opportunity";

  const { data } = useQuery<OpportunityDTO[]>({
    queryKey: ["opportunities"],
    queryFn: async () => {
      const res = await fetch("/api/opportunities");
      if (!res.ok) throw new Error("failed");
      return res.json();
    },
    enabled: isOpen,
    staleTime: 60_000,
  });

  const o = useMemo(() => data?.find((x) => x.slug === slug), [data, slug]);

  const TAB_KEYS = ["overview", "model", "financials", "team", "funds", "risks"] as const;
  const tabIcons = [Info, Briefcase, LineChart, Users, Wallet, AlertTriangle];

  if (!o) {
    return (
      <Dialog open={isOpen} onOpenChange={(v) => !v && close()}>
        <DialogContent className="rounded-3xl p-0 sm:max-w-[640px]">
          <div className="space-y-3 p-8 text-center">
            <div className="mx-auto h-12 w-12 animate-pulse rounded-full bg-nx-navy-100" />
            <p className="text-sm text-slate-500">
              {lang === "bn" ? "সুযোগটি লোড হচ্ছে…" : "Loading opportunity…"}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const useOfFunds = (o.useOfFunds ?? []) as UseOfFundsItem[];
  const stageDots = [1, 2, 3, 4, 5];

  return (
    <Dialog open={isOpen} onOpenChange={(v) => !v && close()}>
      <DialogContent
        className="nx-scroll max-h-[90vh] gap-0 overflow-y-auto rounded-3xl p-0 sm:max-w-[680px]"
        aria-describedby={undefined}
      >
        {/* ── Header: oval + identity + illustrative badge ── */}
        <DialogHeader className="border-b border-nx-navy-100 px-6 pb-4 pt-6">
          <div className="flex items-start gap-4">
            <div className="oval oval-ring hidden w-[92px] shrink-0 bg-nx-navy-100 sm:block">
              <Image
                src={o.image}
                alt={`${o.codeName}`}
                fill
                sizes="92px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <DialogTitle className="nx-num text-2xl font-extrabold text-nx-navy-900">
                  {o.codeName}
                </DialogTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex cursor-help items-center gap-1 rounded-full border border-nx-cyan-300 bg-nx-cyan-50 px-2.5 py-0.5 text-[11px] font-bold text-nx-cyan-700">
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      {t(OPP_DLG.illustrative)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[240px] text-xs leading-relaxed">
                    {t(OPP_DLG.illustrativeTip)}
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="mt-1 flex flex-wrap items-center gap-1.5 text-[12px] font-bold text-nx-cyan-700 uppercase">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {(lang === "bn" ? o.sectorBn : o.sector) + " · " + (lang === "bn" ? o.locationBn : o.location)}
              </p>
              <p className="mt-1.5 text-sm leading-snug text-slate-600">
                {lang === "bn" ? o.headlineBn : o.headline}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <TooltipProvider delayDuration={120}>
                  {o.badges.map((b) => (
                    <Tooltip key={b}>
                      <TooltipTrigger asChild>
                        <span className="inline-flex cursor-help items-center gap-1 rounded-full bg-nx-verified-bg px-2 py-0.5 text-[11px] font-bold text-nx-verified">
                          <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                          {t(BADGES[b as BadgeKey])}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[220px] text-xs leading-relaxed">
                        {t(BADGE_TIPS[b as BadgeKey])}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* ── Sticky key-facts strip ── */}
        <div className="sticky top-0 z-10 border-b border-nx-navy-100 bg-white/95 px-6 py-3 backdrop-blur">
          <dl className="grid grid-cols-2 gap-2 text-[12px] sm:grid-cols-4">
            <div>
              <dt className="font-bold tracking-wide text-slate-400 uppercase">{t(OPP_DLG.seekingLabel)}</dt>
              <dd className="nx-num mt-0.5 font-extrabold text-nx-navy-800">
                {formatTkRange(o.seekingMin, o.seekingMax, lang)}
              </dd>
            </div>
            <div>
              <dt className="font-bold tracking-wide text-slate-400 uppercase">{t(OPP_DLG.revenueLabel)}</dt>
              <dd className="nx-num mt-0.5 font-extrabold text-nx-navy-800">
                {lang === "bn" ? o.revenueBn : o.revenue}
              </dd>
            </div>
            <div>
              <dt className="font-bold tracking-wide text-slate-400 uppercase">{t(OPP_DLG.instrumentLabel)}</dt>
              <dd className="mt-0.5 font-semibold text-nx-navy-800">
                {lang === "bn" ? o.instrumentBn : o.instrument}
              </dd>
            </div>
            <div>
              <dt className="font-bold tracking-wide text-slate-400 uppercase">{t(OPP.verificationProgress)}</dt>
              <dd className="mt-1 flex items-center gap-1" aria-label={`${o.stage}/5`}>
                {stageDots.map((s) => (
                  <span
                    key={s}
                    className={cn(
                      "h-1.5 w-4 rounded-full",
                      s <= o.stage ? "bg-nx-cyan-500" : "bg-nx-navy-100"
                    )}
                  />
                ))}
              </dd>
            </div>
          </dl>
        </div>

        {/* ── Tabbed content ── */}
        <Tabs tabs={OPP_DLG.tabs.map((x) => t(x))} tabKeys={TAB_KEYS} tabIcons={tabIcons}>
          {(tab) => (
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="px-6 py-6"
              >
                {tab === "overview" && (
                  <div className="space-y-4">
                    <p className="leading-relaxed text-slate-600">
                      {lang === "bn" ? o.overviewBn ?? o.descriptionBn : o.overview ?? o.description}
                    </p>
                  </div>
                )}
                {tab === "model" && (
                  <p className="leading-relaxed text-slate-600">
                    {lang === "bn" ? o.modelNoteBn : o.modelNote}
                  </p>
                )}
                {tab === "financials" && (
                  <div className="rounded-2xl border border-nx-navy-100 bg-nx-mist/60 p-5">
                    <p className="leading-relaxed text-slate-600">
                      {lang === "bn" ? o.financialNoteBn : o.financialNote}
                    </p>
                    <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-slate-500">
                      <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-nx-navy-500" aria-hidden="true" />
                      {t(OPP_DLG.ndaNote)}
                    </p>
                  </div>
                )}
                {tab === "team" && (
                  <p className="leading-relaxed text-slate-600">
                    {lang === "bn" ? o.teamNoteBn : o.teamNote}
                  </p>
                )}
                {tab === "funds" && (
                  <ul className="space-y-3">
                    {useOfFunds.map((f, i) => (
                      <li key={f.item.en}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-nx-ink">{t(f.item)}</span>
                          <span className="nx-num font-extrabold text-nx-navy-700">
                            {lang === "bn" ? `${bnNum(f.pct)}%` : `${f.pct}%`}
                          </span>
                        </div>
                        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-nx-navy-100">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${f.pct}%` }}
                            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                            className={cn(
                              "h-full rounded-full",
                              f.pct >= 50 ? "bg-nx-navy-700" : f.pct >= 20 ? "bg-nx-cyan-500" : "bg-nx-cyan-300"
                            )}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {tab === "risks" && (
                  <div className="rounded-2xl border border-nx-warn/60 bg-nx-warn-bg p-5">
                    <p className="flex items-center gap-1.5 text-xs font-extrabold tracking-wide text-nx-warn uppercase">
                      <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                      {t(OPP.keyRisks)}
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {o.risks.map((r) => (
                        <li key={r.en} className="flex items-start gap-2.5 text-sm leading-relaxed text-nx-ink/90">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-nx-warn" aria-hidden="true" />
                          {lang === "bn" ? r.bn : r.en}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 border-t border-nx-warn/30 pt-3 text-xs leading-relaxed text-nx-warn/90">
                      {t(VETTING_DISCLAIMER)}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </Tabs>

        {/* ── Advisor review ── */}
        <div className="mx-6 mb-2 rounded-2xl border border-nx-cyan-200 bg-gradient-to-br from-nx-cyan-50 to-white p-5">
          <p className="flex items-center gap-1.5 text-xs font-extrabold tracking-wide text-nx-cyan-700 uppercase">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            {t(OPP_DLG.advisorTitle)}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-nx-ink/85">
            {lang === "bn" ? o.advisorNoteBn : o.advisorNote}
          </p>
        </div>

        {/* ── Actions ── */}
        <div className="sticky bottom-0 border-t border-nx-navy-100 bg-white/95 px-6 py-4 backdrop-blur">
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              onClick={() => openInvestor("investor")}
              className="nx-arrow-btn inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-nx-navy-700 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-nx-navy-600"
            >
              {t(OPP_DLG.expressInterest)}
              <span className="nx-arrow">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </button>
            <button
              onClick={() => open("contact")}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-[1.5px] border-nx-navy-200 px-5 py-3 text-sm font-bold text-nx-navy-800 transition-all hover:border-nx-cyan-500"
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {t(OPP_DLG.bookAdvisorCall)}
            </button>
          </div>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <Lock className="h-3 w-3" aria-hidden="true" />
            {t(OPP_DLG.expressNote)}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const VETTING_DISCLAIMER = {
  en: "Verification reduces risk. It does not remove it.",
  bn: "যাচাই ঝুঁকি কমায়, কিন্তু ঝুঁকি সম্পূর্ণ দূর করে না।",
};

/** Small internal tabs controller for the detail dialog */
function Tabs({
  tabs,
  tabKeys,
  tabIcons,
  children,
}: {
  tabs: string[];
  tabKeys: readonly string[];
  tabIcons: LucideIcon[];
  children: (tab: string) => ReactNode;
}) {
  const [active, setActive] = useState(tabKeys[0]);
  return (
    <div>
      <div
        role="tablist"
        aria-label="Opportunity sections"
        className="nx-scroll flex gap-1 overflow-x-auto border-b border-nx-navy-100 px-4 pt-4"
      >
        {tabs.map((label, i) => {
          const Icon = tabIcons[i];
          const key = tabKeys[i];
          const isActive = active === key;
          const isRisk = key === "risks";
          return (
            <button
              key={key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(key)}
              className={cn(
                "relative flex shrink-0 items-center gap-1.5 rounded-t-xl px-3.5 py-2.5 text-[13px] font-bold transition-colors",
                isActive
                  ? "text-nx-navy-900"
                  : "text-slate-500 hover:bg-nx-mist hover:text-nx-navy-700",
                isRisk && !isActive && "text-nx-warn hover:text-nx-warn"
              )}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {label}
              {isActive && (
                <motion.span
                  layoutId="opp-tab-underline"
                  className={cn(
                    "absolute inset-x-2 -bottom-px h-[2.5px] rounded-full",
                    isRisk ? "bg-nx-warn" : "bg-nx-cyan-500"
                  )}
                />
              )}
            </button>
          );
        })}
      </div>
      {children(active)}
    </div>
  );
}
