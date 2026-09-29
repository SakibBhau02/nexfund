"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, RotateCcw, Sparkles, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { MATCH } from "@/lib/content";
import { Reveal } from "./reveal";
import type { OpportunityDTO } from "./opportunities";

/**
 * "Match Me" mini-quiz (blueprint §7 #5): 4 quick questions →
 * sector/ticket pointers + count of live matching opportunities + register CTA.
 * Pure client state — no backend, honest disclaimer.
 */
export function MatchMe() {
  const { t, lang } = useLanguage();
  const openInvestor = useDialogStore((s) => s.openInvestor);
  const [step, setStep] = useState(-1); // -1 = intro, 0..3 = questions, 4 = result
  const [answers, setAnswers] = useState<string[]>([]);

  const { data } = useQuery<OpportunityDTO[]>({
    queryKey: ["opportunities"],
    queryFn: async () => {
      const res = await fetch("/api/opportunities");
      if (!res.ok) throw new Error("failed");
      return res.json();
    },
    staleTime: 60_000,
  });

  const restart = () => {
    setStep(-1);
    setAnswers([]);
  };

  const pick = (key: string) => {
    const next = [...answers.slice(0, step), key];
    setAnswers(next);
    setStep((s) => s + 1);
  };

  // simple, explainable scoring against live anonymized listings
  const matches = useMemo(() => {
    if (!data || step < 4 || answers.length < 4) return [];
    const [sector, ticket, , risk] = answers;
    return data.filter((o) => {
      const sectorFit =
        sector === "any" ||
        o.sector === sector ||
        (sector === "garments" && o.sector === "garments");
      // ticket fit: listing's min ticket should sit inside comfort range
      const min = o.seekingMin; // lakh
      let ticketFit = true;
      if (ticket === "small") ticketFit = min <= 25;
      else if (ticket === "mid") ticketFit = min <= 100;
      else ticketFit = true; // large accepts all
      // cautious investors only see fully-verified listings
      const riskFit = risk === "cautious" ? o.stage >= 5 : true;
      return sectorFit && ticketFit && riskFit;
    });
  }, [data, step, answers]);

  const suggestedSectors = useMemo(() => {
    if (!data) return [] as string[];
    const sector = answers[0];
    if (sector && sector !== "any") {
      return [sector];
    }
    return Array.from(new Set(data.map((o) => o.sector)));
  }, [data, answers]);

  const bnQ = ["১", "২", "৩", "৪"];

  return (
    <Reveal>
      <section
        aria-labelledby="match-title"
        className="mx-auto mt-14 max-w-[860px] rounded-[2rem] border border-nx-cyan-200 bg-gradient-to-br from-white via-nx-cyan-50/60 to-white p-6 shadow-[0_24px_60px_-32px_rgba(38,183,216,0.55)] md:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-nx-cyan-700 uppercase">
              <Compass className="h-4 w-4" aria-hidden="true" />
              {t(MATCH.eyebrow)}
            </p>
            <h3 id="match-title" className="mt-2 text-2xl font-extrabold text-nx-navy-900">
              {t(MATCH.title)}
            </h3>
            <p className="mt-1.5 max-w-md text-sm leading-relaxed text-slate-600">
              {t(MATCH.sub)}
            </p>
          </div>
          {step !== -1 && (
            <button
              onClick={restart}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-nx-navy-200 bg-white px-3.5 py-1.5 text-xs font-bold text-nx-navy-800 transition-colors hover:border-nx-cyan-500"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              {t(MATCH.restart)}
            </button>
          )}
        </div>

        <div className="mt-6 min-h-[132px]">
          <AnimatePresence mode="wait">
            {/* intro */}
            {step === -1 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-4 py-4"
              >
                <div className="flex gap-1.5" aria-hidden="true">
                  {MATCH.questions.map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.08 * i, type: "spring", bounce: 0.4 }}
                      className={cn(
                        "h-2.5 w-2.5 rounded-full",
                        i === 0 ? "bg-nx-cyan-500" : "bg-nx-navy-200"
                      )}
                    />
                  ))}
                </div>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setStep(0)}
                  className="nx-arrow-btn inline-flex items-center gap-2 rounded-full bg-nx-navy-700 px-7 py-3 text-sm font-bold text-white shadow-[0_12px_28px_-12px_rgba(10,58,143,0.6)] transition-colors hover:bg-nx-navy-600"
                >
                  <Sparkles className="h-4 w-4 text-nx-cyan-400" aria-hidden="true" />
                  {lang === "bn" ? "শুরু করুন — ৪টি প্রশ্ন" : "Start — 4 questions"}
                  <span className="nx-arrow">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </motion.button>
              </motion.div>
            )}

            {/* questions */}
            {step >= 0 && step < MATCH.questions.length && (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 22 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -22 }}
                transition={{ duration: 0.22 }}
              >
                <div className="flex items-center gap-2" aria-hidden="true">
                  {MATCH.questions.map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-1.5 flex-1 rounded-full transition-colors duration-300",
                        i < step ? "bg-nx-verified" : i === step ? "bg-nx-cyan-500" : "bg-nx-navy-100"
                      )}
                    />
                  ))}
                </div>
                <p className="nx-num mt-3 text-[11px] font-bold tracking-[0.16em] text-nx-cyan-700 uppercase">
                  {lang === "bn" ? `প্রশ্ন ${bnQ[step]}/৪` : `Question ${step + 1}/4`}
                </p>
                <h4 className="mt-1.5 text-lg font-extrabold text-nx-navy-900">
                  {t(MATCH.questions[step].q)}
                </h4>
                <div className="mt-4 flex flex-wrap gap-2">
                  {MATCH.questions[step].opts.map((opt, i) => (
                    <motion.button
                      key={opt.key}
                      whileTap={{ scale: 0.94 }}
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      onClick={() => pick(opt.key)}
                      className="rounded-full border border-nx-navy-200 bg-white px-4 py-2 text-sm font-semibold text-nx-navy-800 shadow-[0_4px_14px_-8px_rgba(10,58,143,0.35)] transition-colors hover:border-nx-cyan-400 hover:bg-nx-cyan-50"
                      style={{ transitionDelay: `${i * 30}ms` }}
                    >
                      {t(opt)}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* result */}
            {step === 4 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-nx-navy-100 bg-white/80 p-5 backdrop-blur"
              >
                <p className="text-xs font-bold tracking-[0.16em] text-nx-cyan-700 uppercase">
                  {t(MATCH.resultTitle)}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <p className="nx-num text-lg font-extrabold text-nx-navy-900">
                    {t(MATCH.matches(matches.length))}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestedSectors.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-nx-navy-50 px-2.5 py-1 text-[11px] font-bold text-nx-navy-700"
                      >
                        {s === "garments"
                          ? lang === "bn" ? "গার্মেন্টস" : "Garments"
                          : s === "agri"
                            ? lang === "bn" ? "কৃষি ও খাদ্য" : "Agri & food"
                            : lang === "bn" ? "লজিস্টিকস" : "Logistics"}
                      </span>
                    ))}
                  </div>
                </div>
                {matches.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {matches.map((m) => (
                      <li key={m.id} className="flex items-center gap-2 text-[13px] font-semibold text-nx-ink/85">
                        <span className="h-1.5 w-1.5 rounded-full bg-nx-cyan-500" aria-hidden="true" />
                        <span className="nx-num">{m.codeName}</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-500">{lang === "bn" ? m.sectorBn : m.sector}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <button
                    onClick={() => openInvestor("investor")}
                    className="nx-arrow-btn inline-flex items-center gap-2 rounded-full bg-nx-navy-700 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-nx-navy-600"
                  >
                    {t(MATCH.registerCta)}
                    <span className="nx-arrow">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </button>
                  <p className="text-[11px] leading-snug text-slate-500">{t(MATCH.disclaimer)}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Reveal>
  );
}
