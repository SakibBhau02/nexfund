"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  RotateCcw,
  Send,
  Share2,
  Check,
  TrendingDown,
  TrendingUp,
  Minus,
  SlidersHorizontal,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { SIM } from "@/lib/content";
import { formatTk, bnNum } from "@/lib/format";
import { SectionHeading } from "./brand";
import { Reveal } from "./reveal";
import { G } from "./glossary";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { AnimatedNumber } from "./animated-number";

/**
 * Scenario Simulator (blueprint §7 #7): sliders → illustrative minority-equity
 * outcome model. Downside scenario leads and is emphasized (blueprint §0.4 —
 * downside as prominent as upside). Explainable math:
 *   exit proceeds = ticket × (1 + growth)^years × exitMultiple
 * Stake % drives the implied entry valuation taught next to it.
 */
const DEFAULTS = { ticket: 100, stake: 10, growth: 12, years: 5 };
// scenario deltas: growth offset (pp) and exit multiple vs entry
const SCEN = {
  down: { growthOff: -25, multiple: 0.65, growthFloor: -35 },
  base: { growthOff: 0, multiple: 1.0 },
  up: { growthOff: 12, multiple: 1.3, growthCap: 45 },
} as const;

type ScenarioKey = keyof typeof SCEN;

function compute(ticket: number, growth: number, years: number, scen: ScenarioKey) {
  let r = growth + SCEN[scen].growthOff;
  if (scen === "down") r = Math.max(r, SCEN.down.growthFloor);
  if (scen === "up") r = Math.min(r, SCEN.up.growthCap);
  const multiple = Math.pow(1 + r / 100, years) * SCEN[scen].multiple;
  const proceeds = ticket * multiple; // lakh
  return { r, multiple, proceeds };
}

/** "+12%" / "−১৩%" with proper signs & Bangla digits */
function signedPct(v: number, lang: "bn" | "en"): string {
  const sign = v < 0 ? "−" : v > 0 ? "+" : "";
  const n = Math.abs(v);
  return lang === "bn" ? `${sign}${bnNum(n)}%` : `${sign}${n}%`;
}

export function ScenarioSimulator() {
  const { t, lang } = useLanguage();
  const [ticket, setTicket] = useState(DEFAULTS.ticket); // lakh
  const [stake, setStake] = useState(DEFAULTS.stake); // %
  const [growth, setGrowth] = useState(DEFAULTS.growth); // %/yr base case
  const [years, setYears] = useState(DEFAULTS.years);

  const [saveEmail, setSaveEmail] = useState("");
  const [saving, setSaving] = useState<"idle" | "busy" | "done" | "error">("idle");

  /* R4-2: share-permalink — hydrate slider state from #sim=ticket,stake,growth,years */
  const [sharedLoaded, setSharedLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const m = /^#sim=(\d+),(\d+),(-?\d+),(\d+)$/.exec(window.location.hash);
    if (!m) return;
    const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
    // apply post-hydration via rAF so hydration markup (defaults) stays consistent
    const raf = requestAnimationFrame(() => {
      setTicket(clamp(Number(m[1]), 25, 400));
      setStake(clamp(Number(m[2]), 5, 40));
      setGrowth(clamp(Number(m[3]), -10, 35));
      setYears(clamp(Number(m[4]), 2, 8));
      setSharedLoaded(true);
    });
    const t1 = setTimeout(() => setSharedLoaded(false), 6000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    };
  }, []);

  const results = useMemo(
    () => ({
      down: compute(ticket, growth, years, "down"),
      base: compute(ticket, growth, years, "base"),
      up: compute(ticket, growth, years, "up"),
    }),
    [ticket, growth, years]
  );

  // implied entry valuation: ticket buys stake% of the business → V0 = ticket / stake
  const impliedValuation = ticket / (stake / 100); // lakh
  // bar scale: cap at the largest outcome; ticket line shows break-even
  const maxVal = Math.max(results.up.proceeds, results.base.proceeds, ticket);
  const ticketPct = (ticket / maxVal) * 100;

  const reset = () => {
    setTicket(DEFAULTS.ticket);
    setStake(DEFAULTS.stake);
    setGrowth(DEFAULTS.growth);
    setYears(DEFAULTS.years);
  };

  /* R4-2: copy a permalink carrying the current slider state */
  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}#sim=${ticket},${stake},${growth},${years}`;
    let ok = false;
    try {
      await navigator.clipboard.writeText(url);
      ok = true;
    } catch {
      // clipboard-write permission can be blocked — fall back to execCommand
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
    if (ok) {
      setCopied(true);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2600);
    }
  };

  const saveScenario = async () => {
    const email = saveEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSaving("error");
      return;
    }
    setSaving("busy");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "simulator", language: lang }),
      });
      setSaving(res.ok ? "done" : "error");
    } catch {
      setSaving("error");
    }
  };

  const scenarioMeta: {
    key: ScenarioKey;
    icon: typeof TrendingDown;
    barClass: string;
    chipClass: string;
    lead: boolean;
  }[] = [
    { key: "down", icon: TrendingDown, barClass: "nx-warm-to-loss", chipClass: "text-nx-warn", lead: true },
    { key: "base", icon: Minus, barClass: "bg-nx-navy-600", chipClass: "text-nx-navy-600", lead: false },
    { key: "up", icon: TrendingUp, barClass: "bg-nx-cyan-500", chipClass: "text-nx-cyan-600", lead: false },
  ];

  return (
    <section id="simulator" className="bg-nx-mist py-20 md:py-24" aria-labelledby="sim-title">
      <div className="mx-auto max-w-[1200px] px-5 md:px-6">
        <Reveal>
          <SectionHeading eyebrow={t(SIM.eyebrow)} title={t(SIM.title)} sub={t(SIM.sub)} />
          {/* honesty pill — always visible, never dismissed */}
          <p className="mx-auto mt-5 flex w-fit items-center gap-1.5 rounded-full border border-nx-warn/50 bg-nx-warn-bg px-4 py-1.5 text-xs font-bold text-nx-warn">
            <Info className="h-3.5 w-3.5" aria-hidden="true" />
            {t(SIM.illustrative)}
          </p>
        </Reveal>

        <Reveal delay={0.07}>
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-nx-navy-100 bg-white shadow-[0_32px_70px_-36px_rgba(10,58,143,0.35)]">
            <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              {/* ── Controls ── */}
              <div className="border-b border-nx-navy-100 p-6 md:p-8 lg:border-r lg:border-b-0">
                <p className="flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-nx-navy-500 uppercase">
                  <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                  {lang === "bn" ? "ইনপুট" : "Inputs"}
                </p>

                {/* R4-2: quick-start presets */}
                <div className="mt-4">
                  <p className="text-[11px] font-bold tracking-[0.14em] text-slate-400 uppercase">
                    {t(SIM.presetsLabel)}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {SIM.presets.map((p) => {
                      const active =
                        ticket === p.values.ticket &&
                        stake === p.values.stake &&
                        growth === p.values.growth &&
                        years === p.values.years;
                      return (
                        <motion.button
                          key={p.key}
                          type="button"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setTicket(p.values.ticket);
                            setStake(p.values.stake);
                            setGrowth(p.values.growth);
                            setYears(p.values.years);
                          }}
                          title={t(p.desc)}
                          aria-pressed={active}
                          className={cn(
                            "rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all duration-200",
                            active
                              ? "border-nx-cyan-500 bg-nx-cyan-50 text-nx-cyan-700 shadow-[0_4px_14px_-6px_rgba(38,183,216,0.55)]"
                              : "border-nx-navy-200 text-nx-navy-700 hover:-translate-y-0.5 hover:border-nx-cyan-400 hover:text-nx-cyan-700"
                          )}
                        >
                          {t(p.name)}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 space-y-7">
                  <SimSlider
                    label={t(SIM.controls.ticket)}
                    valueText={formatTk(ticket, lang)}
                    aria={t(SIM.controls.ticket)}
                    value={ticket}
                    min={25}
                    max={400}
                    step={25}
                    onChange={(v) => setTicket(v)}
                  />
                  <SimSlider
                    label={t(SIM.controls.stake)}
                    valueText={lang === "bn" ? `${bnNum(stake)}%` : `${stake}%`}
                    aria={t(SIM.controls.stake)}
                    value={stake}
                    min={5}
                    max={40}
                    step={5}
                    onChange={(v) => setStake(v)}
                  />
                  <SimSlider
                    label={t(SIM.controls.growth)}
                    valueText={signedPct(growth, lang)}
                    aria={t(SIM.controls.growth)}
                    value={growth}
                    min={-10}
                    max={35}
                    step={1}
                    onChange={(v) => setGrowth(v)}
                  />
                  <SimSlider
                    label={t(SIM.controls.years)}
                    valueText={t(SIM.yearsUnit(years))}
                    aria={t(SIM.controls.years)}
                    value={years}
                    min={2}
                    max={8}
                    step={1}
                    onChange={(v) => setYears(v)}
                  />
                </div>

                {/* implied valuation — teaches what the ticket buys */}
                <div className="mt-7 rounded-2xl bg-nx-mist p-4">
                  <p className="text-[11px] font-bold tracking-wide text-slate-500 uppercase">
                    {t(SIM.impliedValuation)}
                  </p>
                  <p className="nx-num mt-1 text-lg font-extrabold text-nx-navy-900">
                    <AnimatedNumber
                      value={Math.round(impliedValuation)}
                      format={(v) => formatTk(Math.round(v), lang)}
                    />
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-slate-500">
                    <G term="valuation">{lang === "bn" ? "ভ্যালুয়েশন" : "Valuation"}</G>
                    {" · "}
                    <G term="exit multiple">{lang === "bn" ? "এক্সিট মাল্টিপল" : "Exit multiple"}</G>
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-1.5 rounded-full border border-nx-navy-200 px-4 py-2 text-xs font-bold text-nx-navy-800 transition-colors hover:border-nx-cyan-500 hover:text-nx-cyan-700"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    {t(SIM.reset)}
                  </button>
                  <button
                    onClick={share}
                    title={t(SIM.shareHint)}
                    aria-live="polite"
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold transition-colors",
                      copied
                        ? "border-nx-verified/50 bg-nx-verified-bg text-nx-verified"
                        : "border-nx-navy-200 text-nx-navy-800 hover:border-nx-cyan-500 hover:text-nx-cyan-700"
                    )}
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    {copied ? t(SIM.copied) : t(SIM.shareLabel)}
                  </button>
                </div>
              </div>

              {/* ── Results ── */}
              <div className="p-6 md:p-8">
                <AnimatePresence>
                  {sharedLoaded && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="mb-4 flex w-fit items-center gap-1.5 rounded-full border border-nx-verified/40 bg-nx-verified-bg px-3.5 py-1.5 text-xs font-bold text-nx-verified"
                    >
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      {t(SIM.sharedApplied)}
                    </motion.p>
                  )}
                </AnimatePresence>
                <div className="space-y-5">
                  {scenarioMeta.map(({ key, icon: Icon, barClass, chipClass, lead }) => {
                    const res = results[key];
                    const isLoss = res.multiple < 1;
                    const pctChange = (res.multiple - 1) * 100;
                    const widthPct = Math.max((res.proceeds / maxVal) * 100, 2); // keep visible sliver
                    const scen = SIM.scenarios[key];
                    return (
                      <div
                        key={key}
                        className={cn(
                          "rounded-2xl border p-4 transition-shadow md:p-5",
                          lead
                            ? "border-nx-warn/50 bg-nx-warn-bg/50 shadow-[0_10px_30px_-18px_rgba(183,121,31,0.45)]"
                            : "border-nx-navy-100 bg-white"
                        )}
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                          <p className="flex items-center gap-1.5 text-sm font-extrabold text-nx-navy-900">
                            <Icon className={cn("h-4 w-4", chipClass)} aria-hidden="true" />
                            {t(scen.name)}
                            {lead && (
                              <span className="ml-1 rounded-full bg-nx-warn/15 px-2 py-0.5 text-[10px] font-bold text-nx-warn">
                                {lang === "bn" ? "আগে দেখুন" : "look here first"}
                              </span>
                            )}
                          </p>
                          {/* explainable assumptions */}
                          <p className="nx-num text-[11px] font-semibold text-slate-500">
                            {lang === "bn" ? "বৃদ্ধি" : "growth"} {signedPct(res.r, lang)}
                            {lang === "bn" ? "/বছর · এক্সিট" : "/yr · exit"}
                            {" "}
                            {lang === "bn" ? `${bnNum(SCEN[key].multiple.toFixed(2))}×` : `${SCEN[key].multiple.toFixed(2)}×`}
                          </p>
                        </div>
                        <p className="mt-0.5 text-xs leading-snug text-slate-500">{t(scen.desc)}</p>

                        {/* bar with break-even marker */}
                        <div className="relative mt-3.5">
                          <div className="h-9 overflow-hidden rounded-xl bg-nx-navy-50">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${widthPct}%` }}
                              transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
                              className={cn("flex h-full items-center justify-end rounded-xl pr-2.5", barClass)}
                            >
                              {widthPct > 24 && (
                                <span className="nx-num text-[11px] font-extrabold text-white">
                                  {formatTk(Math.round(res.proceeds), lang)}
                                </span>
                              )}
                            </motion.div>
                          </div>
                          {/* ticket (break-even) marker */}
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

                        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <p className="text-[11px] font-bold tracking-wide text-slate-400 uppercase">
                            {t(SIM.exitValue)}
                          </p>
                          <p className="flex items-baseline gap-2.5">
                            <span className="nx-num text-base font-extrabold text-nx-navy-900">
                              <AnimatedNumber
                                value={res.proceeds}
                                format={(v) => formatTk(Math.round(v), lang)}
                              />
                            </span>
                            <span
                              className={cn(
                                "nx-num rounded-full px-2 py-0.5 text-[11px] font-extrabold",
                                isLoss ? "bg-nx-danger/10 text-nx-danger" : "bg-nx-verified-bg text-nx-verified"
                              )}
                            >
                              {lang === "bn"
                                ? `${bnNum(res.multiple.toFixed(2))}× · ${t(SIM.changeLabel)} ${signedPct(Math.round(pctChange), "bn")} ${isLoss ? t(SIM.loss) : t(SIM.gain)}`
                                : `${res.multiple.toFixed(2)}× · ${signedPct(Math.round(pctChange), "en")} ${isLoss ? t(SIM.loss) : t(SIM.gain)} ${t(SIM.changeLabel)}`}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-5 flex items-start gap-2 rounded-2xl border border-nx-warn/40 bg-nx-warn-bg px-4 py-3 text-[11px] leading-relaxed text-nx-warn">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {t(SIM.footnote)}
                </p>

                {/* ── Save scenario (lead capture, source: simulator) ── */}
                <div className="mt-5 rounded-2xl border border-nx-cyan-200 bg-gradient-to-br from-nx-cyan-50/70 to-white p-5">
                  {saving === "done" ? (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-sm font-bold text-nx-verified"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-nx-verified-bg">
                        <Send className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      {t(SIM.saved)}
                    </motion.p>
                  ) : (
                    <>
                      <p className="text-sm font-extrabold text-nx-navy-900">{t(SIM.saveTitle)}</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">{t(SIM.saveSub)}</p>
                      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                        <Input
                          type="email"
                          dir="ltr"
                          value={saveEmail}
                          onChange={(e) => {
                            setSaveEmail(e.target.value);
                            if (saving === "error") setSaving("idle");
                          }}
                          placeholder="you@example.com"
                          aria-label={t(SIM.saveCta)}
                          aria-invalid={saving === "error"}
                          className="h-11 flex-1 rounded-full border-nx-navy-200 bg-white px-4 text-sm focus-visible:ring-nx-cyan-400"
                        />
                        <button
                          onClick={saveScenario}
                          disabled={saving === "busy"}
                          className="nx-arrow-btn inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-nx-navy-700 px-5 text-sm font-bold text-white transition-colors hover:bg-nx-navy-600 disabled:opacity-60"
                        >
                          {saving === "busy" ? (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                          ) : (
                            <Send className="h-4 w-4" aria-hidden="true" />
                          )}
                          {t(SIM.saveCta)}
                        </button>
                      </div>
                      {saving === "error" && (
                        <p role="alert" className="mt-2 text-xs font-semibold text-nx-danger">
                          {t(SIM.saveErr)}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Slider row: label left, live value chip right, radix slider below */
function SimSlider({
  label,
  valueText,
  aria,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  valueText: string;
  aria: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-sm font-bold text-nx-navy-800">{label}</label>
        <span className="nx-num rounded-full bg-nx-navy-50 px-3 py-1 text-xs font-extrabold text-nx-navy-900">
          {/* R4 polish: chip pulses on every value change */}
          <motion.span
            key={valueText}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            className="inline-block"
          >
            {valueText}
          </motion.span>
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
        aria-label={aria}
        className="mt-3 [&_[data-slot=slider-thumb]]:size-5 [&_[data-slot=slider-thumb]]:border-[3px] [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-range]]:bg-nx-cyan-500"
      />
    </div>
  );
}
