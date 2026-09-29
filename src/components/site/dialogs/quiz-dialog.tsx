"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, RotateCcw, Send, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { QUIZ, UI, INVESTOR_DLG } from "@/lib/content";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type Phase = "intro" | "questions" | "result";

export function QuizDialog() {
  const { lang, t } = useLanguage();
  const dialog = useDialogStore((s) => s.dialog);
  const close = useDialogStore((s) => s.close);
  const isOpen = dialog === "quiz";

  const [phase, setPhase] = useState<Phase>("intro");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const total = QUIZ.questions.length;
  const score = useMemo(() => {
    if (answers.length < total) return 0;
    const pts = answers.reduce((a, b) => a + b, 0); // 0..20
    return Math.round((pts / (total * 2)) * 100);
  }, [answers, total]);

  const gaps = useMemo(
    () => answers.map((a, i) => (a < 2 ? i : -1)).filter((i) => i >= 0),
    [answers]
  );
  const strengths = useMemo(
    () => answers.map((a, i) => (a === 2 ? i : -1)).filter((i) => i >= 0),
    [answers]
  );

  const band = QUIZ.scoreBands.find((b) => score >= b.min) ?? QUIZ.scoreBands[2];

  const start = () => {
    setPhase("questions");
    setQIndex(0);
    setAnswers([]);
    setSent(false);
    setError("");
  };

  const answer = (v: number) => {
    const next = [...answers];
    next[qIndex] = v;
    setAnswers(next);
    if (qIndex < total - 1) {
      setTimeout(() => setQIndex((q) => q + 1), 180);
    }
  };

  const submit = async () => {
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email || undefined, score, answers, gaps, language: lang }),
      });
      if (!res.ok) throw new Error("failed");
      setSent(true);
    } catch {
      setError(t(UI.somethingWrong));
    } finally {
      setSending(false);
    }
  };

  // Gauge arc
  const R = 54;
  const CIRC = Math.PI * R; // half circle
  const dash = (score / 100) * CIRC;

  const bnQ = ["১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "১০"];

  return (
    <Dialog open={isOpen} onOpenChange={(v) => !v && close()}>
      <DialogContent className="max-h-[88vh] gap-0 overflow-y-auto rounded-3xl p-0 sm:max-w-[520px]">
        <DialogHeader className="px-6 pb-3 pt-6">
          <DialogTitle className="text-xl font-extrabold text-nx-navy-900">{t(QUIZ.title)}</DialogTitle>
          <DialogDescription>
            {phase === "intro" ? t(QUIZ.timeNote) : phase === "questions" ? t(QUIZ.privacy) : t(QUIZ.disclaimer)}
          </DialogDescription>
        </DialogHeader>

        <div className="nx-scroll max-h-[62vh] overflow-y-auto px-6 pb-4 pt-2">
          <AnimatePresence mode="wait">
            {/* INTRO */}
            {phase === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="text-center"
              >
                <div className="mx-auto flex h-40 w-full max-w-[300px] items-end justify-center gap-2" aria-hidden="true">
                  {[28, 44, 60, 76].map((h, i) => (
                    <motion.span
                      key={h}
                      initial={{ height: 8 }}
                      animate={{ height: h * 1.6 }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                      className={cn(
                        "w-12 rounded-t-full",
                        i === 3 ? "bg-nx-cyan-500" : "bg-nx-navy-100"
                      )}
                    />
                  ))}
                </div>
                <button
                  onClick={start}
                  className="nx-arrow-btn mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-nx-navy-700 px-8 py-3.5 font-bold text-white transition-colors hover:bg-nx-navy-600"
                >
                  {t(QUIZ.start)}
                  <span className="nx-arrow">
                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  </span>
                </button>
              </motion.div>
            )}

            {/* QUESTIONS */}
            {phase === "questions" && (
              <motion.div
                key={`q-${qIndex}`}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.22 }}
              >
                {/* progress */}
                <div className="mb-5 flex items-center gap-1" aria-hidden="true">
                  {QUIZ.questions.map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-1.5 flex-1 rounded-full transition-colors duration-300",
                        i < qIndex ? "bg-nx-verified" : i === qIndex ? "bg-nx-cyan-500" : "bg-nx-navy-100"
                      )}
                    />
                  ))}
                </div>
                <p className="nx-num text-xs font-bold tracking-[0.16em] text-nx-cyan-700 uppercase">
                  {lang === "bn" ? `প্রশ্ন ${bnQ[qIndex]}/${bnQ[total - 1]}` : `Question ${qIndex + 1}/${total}`}
                </p>
                <h3 className="mt-2 text-lg font-extrabold leading-snug text-nx-navy-900">
                  {t(QUIZ.questions[qIndex].q)}
                </h3>
                <div className="mt-5 space-y-2">
                  {QUIZ.questions[qIndex].opts.map((o, i) => {
                    const selected = answers[qIndex] === i;
                    return (
                      <button
                        key={o.en}
                        type="button"
                        onClick={() => answer(i)}
                        className={cn(
                          "flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all",
                          selected
                            ? "border-nx-cyan-400 bg-nx-cyan-50 text-nx-navy-900 shadow-[0_8px_20px_-10px_rgba(38,183,216,0.5)]"
                            : "border-nx-navy-100 text-slate-600 hover:border-nx-navy-300 hover:bg-nx-navy-50"
                        )}
                      >
                        {t(o)}
                        {selected && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-nx-cyan-500" aria-hidden="true" />}
                      </button>
                    );
                  })}
                </div>
                {qIndex > 0 && (
                  <button
                    type="button"
                    onClick={() => setQIndex((q) => q - 1)}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-nx-navy-700 hover:text-nx-cyan-600"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    {t(QUIZ.back)}
                  </button>
                )}
                {qIndex === total - 1 && answers[total - 1] !== undefined && (
                  <button
                    type="button"
                    onClick={() => setPhase("result")}
                    className="float-right mt-4 inline-flex items-center gap-2 rounded-full bg-nx-navy-700 px-6 py-2.5 text-sm font-bold text-white hover:bg-nx-navy-600"
                  >
                    {t(QUIZ.seeResult)}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </motion.div>
            )}

            {/* RESULT */}
            {phase === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                {/* gauge */}
                <div className="flex flex-col items-center">
                  <svg viewBox="0 0 140 84" className="w-[190px]" role="img" aria-label={`${t(QUIZ.yourScore)}: ${score}`}>
                    <path
                      d="M10 74 A60 60 0 0 1 130 74"
                      fill="none"
                      stroke="#E8EEF7"
                      strokeWidth="11"
                      strokeLinecap="round"
                    />
                    <motion.path
                      d="M10 74 A60 60 0 0 1 130 74"
                      fill="none"
                      stroke={score >= 80 ? "#12805C" : score >= 55 ? "#26B7D8" : "#B7791F"}
                      strokeWidth="11"
                      strokeLinecap="round"
                      strokeDasharray={`${dash} ${CIRC}`}
                      initial={{ strokeDasharray: `0 ${CIRC}` }}
                      animate={{ strokeDasharray: `${dash} ${CIRC}` }}
                      transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
                    />
                    <text x="70" y="66" textAnchor="middle" className="fill-nx-navy-900 text-[26px] font-extrabold">
                      {lang === "bn" ? String(score).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]) : score}
                    </text>
                  </svg>
                  <h3 className="mt-1 text-xl font-extrabold text-nx-navy-900">{t(band.title)}</h3>
                  <p className="mt-1.5 max-w-sm text-center text-sm leading-relaxed text-slate-600">
                    {t(band.desc)}
                  </p>
                </div>

                {/* gaps */}
                {gaps.length > 0 && (
                  <div className="mt-6 rounded-2xl border border-nx-warn/40 bg-nx-warn-bg/60 p-4">
                    <p className="flex items-center gap-1.5 text-xs font-extrabold tracking-wide text-nx-warn uppercase">
                      <TrendingDown className="h-4 w-4" aria-hidden="true" />
                      {t(QUIZ.gapsTitle)}
                    </p>
                    <ul className="mt-2.5 space-y-1.5">
                      {gaps.map((gi) => (
                        <li key={gi} className="flex items-start gap-2 text-[13px] leading-snug text-nx-ink/85">
                          <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-nx-warn" aria-hidden="true" />
                          {t(QUIZ.questions[gi].q)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {strengths.length > 0 && (
                  <div className="mt-3 rounded-2xl border border-nx-verified/30 bg-nx-verified-bg/50 p-4">
                    <p className="flex items-center gap-1.5 text-xs font-extrabold tracking-wide text-nx-verified uppercase">
                      <TrendingUp className="h-4 w-4" aria-hidden="true" />
                      {t(QUIZ.strongTitle)}
                    </p>
                    <p className="mt-2 text-[13px] leading-relaxed text-nx-ink/75">
                      {strengths.length}
                      {lang === "bn" ? "টি ক্ষেত্রে আপনি ইতোমধ্যে শক্ত।" : " areas already working in your favor."}
                    </p>
                  </div>
                )}

                {/* email capture */}
                {!sent ? (
                  <div className="mt-6 rounded-2xl border border-nx-navy-100 bg-nx-mist/70 p-4">
                    <p className="text-sm font-bold text-nx-navy-900">{t(QUIZ.emailNote)}</p>
                    <div className="mt-2.5 flex flex-col gap-2 sm:flex-row">
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        aria-label={t(QUIZ.emailNote)}
                        dir="ltr"
                      />
                      <button
                        type="button"
                        onClick={submit}
                        disabled={sending}
                        className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-nx-navy-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-nx-navy-600 disabled:opacity-60"
                      >
                        <Send className="h-4 w-4" aria-hidden="true" />
                        {sending ? t(UI.saving) : t(QUIZ.sendChecklist)}
                      </button>
                    </div>
                    {error && <p className="mt-2 text-sm font-semibold text-nx-danger">{error}</p>}
                    <p className="mt-2 text-[11px] text-slate-500">{t(INVESTOR_DLG.dataPromise)}</p>
                  </div>
                ) : (
                  <p className="mt-6 rounded-2xl border border-nx-verified/30 bg-nx-verified-bg/60 p-4 text-center text-sm font-bold text-nx-verified">
                    {t(UI.savedToast)}
                  </p>
                )}

                <div className="mt-5 flex items-center justify-between">
                  <p className="text-[11px] text-slate-400">{t(QUIZ.disclaimer)}</p>
                  <button
                    type="button"
                    onClick={start}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-nx-navy-700 hover:text-nx-cyan-600"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    {t(QUIZ.retake)}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
