"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowUpRight,
  BadgeCheck,
  Calendar,
  CircleCheck,
  FileQuestion,
  Loader2,
  Lock,
  MapPin,
  Minus,
  Share2,
  Check,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
  Briefcase,
  LineChart,
  Wallet,
  Info,
  Activity,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { OPP_DLG, OPP, BADGES, BADGE_TIPS, EXPRESS, SIM, SCEN, SHARE, OPPS, type BadgeKey, type ScenAssumption } from "@/lib/content";
import { formatTk, formatTkRange, bnNum } from "@/lib/format";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { G } from "@/components/site/glossary";
import type { OpportunityDTO } from "@/components/site/opportunities";

type UseOfFundsItem = { item: { en: string; bn: string }; pct: number };

export function OpportunityDialog() {
  const { lang, t } = useLanguage();
  const dialog = useDialogStore((s) => s.dialog);
  const slug = useDialogStore((s) => s.opportunitySlug);
  const close = useDialogStore((s) => s.close);
  const open = useDialogStore((s) => s.open);
  const openOpportunity = useDialogStore((s) => s.openOpportunity);
  const isOpen = dialog === "opportunity";

  /* ── Express-interest inline flow (actions ⇄ form ⇄ success) ── */
  const [xiView, setXiView] = useState<"actions" | "form" | "success">("actions");
  const [xiEmail, setXiEmail] = useState("");
  const [xiName, setXiName] = useState("");
  const [xiNote, setXiNote] = useState("");
  const [xiSending, setXiSending] = useState(false);
  const [xiError, setXiError] = useState("");

  /* ── R6: listing permalink share ── */
  const [shareState, setShareState] = useState<"idle" | "copied" | "failed">("idle");
  const shareTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (shareTimer.current) clearTimeout(shareTimer.current);
    };
  }, []);

  /* R6: deep-link — #opp=<slug> opens the listing directly (permalink).
     Unknown slugs fall through to the not-found state below (data loaded,
     no match) instead of spinning forever. */
  useEffect(() => {
    const m = /^#opp=([a-z0-9-]+)$/i.exec(window.location.hash);
    if (!m) return;
    const raf = requestAnimationFrame(() => openOpportunity(m[1]));
    return () => cancelAnimationFrame(raf);
  }, [openOpportunity]);

  const share = async () => {
    if (!slug) return;
    const url = `${window.location.origin}${window.location.pathname}#opp=${slug}`;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: document.title, url });
        return;
      } catch {
        // sheet dismissed or failed → fall through to clipboard
      }
    }
    let ok = false;
    try {
      await navigator.clipboard.writeText(url);
      ok = true;
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    setShareState(ok ? "copied" : "failed");
    if (shareTimer.current) clearTimeout(shareTimer.current);
    shareTimer.current = setTimeout(() => setShareState("idle"), 2600);
  };

  // Reset the flow whenever the dialog closes or switches to another listing
  useEffect(() => {
    setXiView("actions");
    setXiEmail("");
    setXiName("");
    setXiNote("");
    setXiError("");
    setXiSending(false);
    setShareState("idle");
    if (shareTimer.current) clearTimeout(shareTimer.current);
  }, [isOpen, slug]);

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

  const TAB_KEYS = ["overview", "model", "financials", "scenarios", "team", "funds", "risks"] as const;
  const tabIcons = [Info, Briefcase, LineChart, Activity, Users, Wallet, AlertTriangle];

  if (!o) {
    // R6: data loaded but no match → friendly not-found (bad/stale permalink);
    // otherwise still fetching → loading state
    const notFound = Array.isArray(data) && data.length > 0;
    return (
      <Dialog open={isOpen} onOpenChange={(v) => !v && close()}>
        <DialogContent
          className={notFound ? "rounded-3xl p-0 sm:max-w-[440px]" : "rounded-3xl p-0 sm:max-w-[640px]"}
          aria-describedby={undefined}
        >
          {notFound ? (
            <div className="p-8 text-center">
              <FileQuestion className="mx-auto h-10 w-10 text-nx-cyan-500" aria-hidden="true" />
              <DialogTitle className="mt-3 text-base font-bold leading-relaxed text-nx-navy-900">
                {t(OPPS.notFoundTitle)}
              </DialogTitle>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(OPPS.notFoundSub)}</p>
              <button
                onClick={close}
                className="mt-5 rounded-full bg-nx-navy-700 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-nx-navy-600"
              >
                {lang === "bn" ? "বর্তমান সুযোগ দেখুন" : "Browse current opportunities"}
              </button>
            </div>
          ) : (
            <div className="space-y-3 p-8 text-center">
              {/* a11y: Radix requires a title even in the loading state */}
              <DialogTitle className="sr-only">
                {lang === "bn" ? "সুযোগটি লোড হচ্ছে…" : "Loading opportunity…"}
              </DialogTitle>
              <div className="mx-auto h-12 w-12 animate-pulse rounded-full bg-nx-navy-100" />
              <p className="text-sm text-slate-500">
                {lang === "bn" ? "সুযোগটি লোড হচ্ছে…" : "Loading opportunity…"}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  const useOfFunds = (o.useOfFunds ?? []) as UseOfFundsItem[];
  const stageDots = [1, 2, 3, 4, 5];

  const backToActions = () => {
    setXiView("actions");
    setXiError("");
  };

  const finishSuccess = () => {
    setXiView("actions");
    setXiEmail("");
    setXiName("");
    setXiNote("");
    setXiError("");
  };

  const submitInterest = async () => {
    const email = xiEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setXiError(t(EXPRESS.errEmail));
      return;
    }
    setXiSending(true);
    setXiError("");
    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opportunitySlug: o.slug,
          email,
          name: xiName.trim(),
          note: xiNote.trim(),
          language: lang,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setXiView("success");
    } catch {
      setXiError(t(EXPRESS.errGeneric));
    } finally {
      setXiSending(false);
    }
  };

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
                {/* R6: share permalink — native sheet on mobile, clipboard elsewhere */}
                <button
                  type="button"
                  onClick={share}
                  aria-live="polite"
                  className="inline-flex items-center gap-1.5 rounded-full border border-nx-navy-200 bg-white px-2.5 py-0.5 text-[11px] font-bold text-nx-navy-700 transition-colors hover:border-nx-cyan-400 hover:text-nx-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-400"
                >
                  {shareState === "copied" ? (
                    <Check className="h-3 w-3" aria-hidden="true" />
                  ) : (
                    <Share2 className="h-3 w-3" aria-hidden="true" />
                  )}
                  {shareState === "copied"
                    ? t(SHARE.linkCopied)
                    : shareState === "failed"
                      ? t(SHARE.copyFailed)
                      : t(OPPS.shareListing)}
                </button>
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
                {tab === "scenarios" && <ScenariosPanel o={o} />}
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

        {/* ── Actions ⇄ Express-interest inline flow ── */}
        <div className="sticky bottom-0 border-t border-nx-navy-100 bg-white/95 px-6 py-4 backdrop-blur">
          <AnimatePresence mode="wait">
            {xiView === "actions" && (
              <motion.div
                key="actions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    onClick={() => setXiView("form")}
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
              </motion.div>
            )}

            {xiView === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
                <p className="text-xs font-extrabold tracking-wide text-nx-navy-900 uppercase">
                  {t(EXPRESS.title)}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{t(EXPRESS.sub)}</p>
                <form
                  className="mt-3 space-y-3"
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    void submitInterest();
                  }}
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="xi-email">{t(EXPRESS.email)} *</Label>
                      <Input
                        id="xi-email"
                        type="email"
                        dir="ltr"
                        autoFocus
                        autoComplete="email"
                        value={xiEmail}
                        onChange={(e) => setXiEmail(e.target.value)}
                        aria-invalid={xiError ? true : undefined}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="xi-name">{t(EXPRESS.name)}</Label>
                      <Input
                        id="xi-name"
                        autoComplete="name"
                        value={xiName}
                        onChange={(e) => setXiName(e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="xi-note">{t(EXPRESS.note)}</Label>
                    <Textarea
                      id="xi-note"
                      rows={2}
                      value={xiNote}
                      onChange={(e) => setXiNote(e.target.value)}
                      placeholder={t(EXPRESS.notePlaceholder)}
                      className="mt-1.5 resize-none"
                    />
                  </div>
                  {xiError && (
                    <p role="alert" className="text-sm font-semibold text-nx-danger">
                      {xiError}
                    </p>
                  )}
                  <div className="flex flex-col-reverse gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={backToActions}
                      disabled={xiSending}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-[1.5px] border-nx-navy-200 px-5 py-3 text-sm font-bold text-nx-navy-800 transition-all hover:border-nx-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {lang === "bn" ? "বাতিল" : "Cancel"}
                    </button>
                    <button
                      type="submit"
                      disabled={xiSending}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-nx-navy-700 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-nx-navy-600 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {xiSending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                      {xiSending ? t(EXPRESS.submitting) : t(EXPRESS.submit)}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {xiView === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", bounce: 0.5 }}
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-nx-verified-bg"
                >
                  <CircleCheck className="h-7 w-7 text-nx-verified" aria-hidden="true" />
                </motion.span>
                <h3 className="mt-3 text-base font-extrabold text-nx-navy-900">
                  {t(EXPRESS.successTitle)}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{t(EXPRESS.successBody)}</p>
                <button
                  type="button"
                  onClick={finishSuccess}
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-nx-navy-700 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-nx-navy-600"
                >
                  {t(EXPRESS.successAnother)}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const VETTING_DISCLAIMER = {
  en: "Verification reduces risk. It does not remove it.",
  bn: "যাচাই ঝুঁকি কমায়, কিন্তু ঝুঁকি সম্পূর্ণ দূর করে না।",
};

/* ── R4-1: per-listing illustrative scenarios (blueprint §5.5 —
     "downside scenario chart alongside the upside") ── */
function ScenariosPanel({ o }: { o: OpportunityDTO }) {
  const { t, lang } = useLanguage();
  const close = useDialogStore((s) => s.close);

  const listing = SCEN.listings[o.slug];
  const mode: "equity" | "revshare" = listing?.mode ?? "equity";
  const years = listing?.years ?? SCEN.equityFallback.years;
  const ticket = listing?.ticket ?? Math.round((o.seekingMin + o.seekingMax) / 2);

  const fallback = (key: "down" | "base" | "up"): ScenAssumption => {
    const g = SCEN.equityFallback.baseGrowth;
    return {
      growth: key === "down" ? g - 15 : key === "up" ? g + 8 : g,
      multiple:
        key === "down" ? SCEN.equityFallback.down : key === "up" ? SCEN.equityFallback.up : SCEN.equityFallback.base,
      note: SIM.scenarios[key].desc,
    };
  };
  const assumptions: Record<"down" | "base" | "up", ScenAssumption> = listing
    ? { down: listing.down, base: listing.base, up: listing.up }
    : { down: fallback("down"), base: fallback("base"), up: fallback("up") };

  const computed = (key: "down" | "base" | "up") => {
    const a = assumptions[key];
    const multiple =
      mode === "revshare" ? a.multiple : Math.pow(1 + (a.growth ?? 0) / 100, years) * a.multiple;
    return { multiple, proceeds: ticket * multiple };
  };
  const res = { down: computed("down"), base: computed("base"), up: computed("up") };
  const maxVal = Math.max(res.up.proceeds, res.base.proceeds, res.down.proceeds, ticket);
  const ticketPct = (ticket / maxVal) * 100;

  const signedPct = (v: number) => {
    const s = v < 0 ? "−" : v > 0 ? "+" : "";
    return lang === "bn" ? `${s}${bnNum(Math.abs(v))}%` : `${s}${Math.abs(v)}%`;
  };
  const fmtMultiple = (m: number) => (lang === "bn" ? `${bnNum(m.toFixed(2))}×` : `${m.toFixed(2)}×`);

  const meta: { key: "down" | "base" | "up"; icon: typeof TrendingDown; barClass: string; chipClass: string; lead: boolean }[] = [
    { key: "down", icon: TrendingDown, barClass: "nx-warm-to-loss", chipClass: "text-nx-warn", lead: true },
    { key: "base", icon: Minus, barClass: "bg-nx-navy-600", chipClass: "text-nx-navy-600", lead: false },
    { key: "up", icon: TrendingUp, barClass: "bg-nx-cyan-500", chipClass: "text-nx-cyan-600", lead: false },
  ];

  const assumptionLine = (a: ScenAssumption) =>
    mode === "revshare"
      ? lang === "bn"
        ? `রিটার্ন ${fmtMultiple(a.multiple)} · ${bnNum(years)} বছর`
        : `return ${fmtMultiple(a.multiple)} · ${years} yrs`
      : lang === "bn"
        ? `বৃদ্ধি ${signedPct(a.growth ?? 0)}/বছর · এক্সিট ${fmtMultiple(a.multiple)} · ${bnNum(years)} বছর`
        : `growth ${signedPct(a.growth ?? 0)}/yr · exit ${fmtMultiple(a.multiple)} · ${years} yrs`;

  const goToSimulator = () => {
    close();
    // wait for the dialog unmount before smooth-scrolling
    setTimeout(() => {
      document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth" });
    }, 90);
  };

  return (
    <div className="space-y-4">
      {/* chips: model · horizon · modeled ticket */}
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "rounded-full border px-3 py-1 text-[11px] font-bold",
            mode === "revshare"
              ? "border-nx-cyan-200 bg-nx-cyan-50 text-nx-cyan-700"
              : "border-nx-navy-200 bg-nx-navy-50 text-nx-navy-800"
          )}
        >
          {t(mode === "revshare" ? SCEN.modeRevshare : SCEN.modeEquity)}
        </span>
        <span className="rounded-full border border-nx-navy-100 bg-nx-mist px-3 py-1 text-[11px] font-bold text-slate-600">
          {t(SCEN.horizon(years))}
        </span>
        <span className="nx-num rounded-full bg-nx-navy-900 px-3 py-1 text-[11px] font-extrabold text-white">
          {formatTk(ticket, lang)}
          <span className="ml-1.5 font-semibold text-white/60">{t(SCEN.ticketModeled)}</span>
        </span>
      </div>

      {mode === "revshare" && (
        <div className="flex items-start gap-2 rounded-xl border border-nx-cyan-200 bg-nx-cyan-50 p-3.5 text-xs leading-relaxed text-nx-ink/80">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-nx-cyan-600" aria-hidden="true" />
          {t(SCEN.revshareNote)}
        </div>
      )}

      <div className="space-y-3.5">
        {meta.map(({ key, icon: Icon, barClass, chipClass, lead }) => {
          const r = res[key];
          const isLoss = r.multiple < 1;
          const pctChange = Math.round((r.multiple - 1) * 100);
          const widthPct = Math.max((r.proceeds / maxVal) * 100, 2);
          return (
            <div
              key={key}
              className={cn(
                "rounded-2xl border p-4",
                lead ? "border-nx-warn/50 bg-nx-warn-bg/50" : "border-nx-navy-100 bg-white"
              )}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className="flex items-center gap-1.5 text-sm font-extrabold text-nx-navy-900">
                  <Icon className={cn("h-4 w-4", chipClass)} aria-hidden="true" />
                  {t(SIM.scenarios[key].name)}
                  {lead && (
                    <span className="ml-1 rounded-full bg-nx-warn/15 px-2 py-0.5 text-[10px] font-bold text-nx-warn">
                      {lang === "bn" ? "আগে দেখুন" : "look here first"}
                    </span>
                  )}
                </p>
                <p className="nx-num text-[11px] font-semibold text-slate-500">{assumptionLine(assumptions[key])}</p>
              </div>
              <p className="mt-0.5 text-xs leading-snug text-slate-500">{t(assumptions[key].note)}</p>

              {/* bar with break-even marker */}
              <div className="relative mt-3">
                <div className="h-8 overflow-hidden rounded-xl bg-nx-navy-50">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${widthPct}%` }}
                    transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
                    className={cn("flex h-full items-center justify-end rounded-xl pr-2.5", barClass)}
                  >
                    {widthPct > 24 && (
                      <span className="nx-num text-[11px] font-extrabold text-white">
                        {formatTk(Math.round(r.proceeds), lang)}
                      </span>
                    )}
                  </motion.div>
                </div>
                {ticketPct > 6 && ticketPct < 97 && (
                  <div
                    className="pointer-events-none absolute inset-y-0"
                    style={{ left: `${ticketPct}%` }}
                    aria-hidden="true"
                  >
                    <div className="h-full w-0 border-l-2 border-dashed border-nx-navy-900/45" />
                  </div>
                )}
              </div>

              <div className="mt-2.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-[11px] font-bold tracking-wide text-slate-400 uppercase">{t(SIM.exitValue)}</p>
                <p className="flex items-baseline gap-2.5">
                  <span className="nx-num text-sm font-extrabold text-nx-navy-900">
                    {formatTk(Math.round(r.proceeds), lang)}
                  </span>
                  <span
                    className={cn(
                      "nx-num rounded-full px-2 py-0.5 text-[11px] font-extrabold",
                      isLoss ? "bg-nx-danger/10 text-nx-danger" : "bg-nx-verified-bg text-nx-verified"
                    )}
                  >
                    {lang === "bn"
                      ? `${fmtMultiple(r.multiple)} · ${t(SIM.changeLabel)} ${signedPct(pctChange)} ${isLoss ? t(SIM.loss) : t(SIM.gain)}`
                      : `${fmtMultiple(r.multiple)} · ${signedPct(pctChange)} ${isLoss ? t(SIM.loss) : t(SIM.gain)} ${t(SIM.changeLabel)}`}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* legend + honesty footnote */}
      <p className="flex items-center gap-2 text-[11px] text-slate-500">
        <span className="inline-block h-3.5 w-0 border-l-2 border-dashed border-nx-navy-900/45" aria-hidden="true" />
        {t(SCEN.breakEven)}
      </p>
      <p className="flex items-start gap-2 rounded-xl border border-nx-warn/40 bg-nx-warn-bg px-3.5 py-3 text-[11px] leading-relaxed text-nx-warn">
        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {t(SCEN.footnote)}
      </p>

      <button
        onClick={goToSimulator}
        className="nx-arrow-btn inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-nx-navy-200 px-4 py-2 text-xs font-bold text-nx-navy-800 transition-all hover:border-nx-cyan-500 hover:text-nx-cyan-700"
      >
        {t(SCEN.tryYourOwn)}
        <span className="nx-arrow">
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </button>
    </div>
  );
}

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
