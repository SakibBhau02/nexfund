"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, ShieldCheck, Lock, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { INVESTOR_DLG, UI } from "@/lib/content";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type Step = 0 | 1 | 2 | 3; // 3 = success

export function InvestorDialog() {
  const { lang, setLang, t } = useLanguage();
  const dialog = useDialogStore((s) => s.dialog);
  const close = useDialogStore((s) => s.close);
  const isOpen = dialog === "investor";

  const [step, setStep] = useState<Step>(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    langPref: lang,
    experience: "",
    sectors: [] as string[],
    ticketRange: "",
    horizon: "",
    riskComfort: "",
    consent: false,
  });

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setError("");
      setForm((f) => ({ ...f, langPref: lang }));
    }
  }, [isOpen, lang]);

  const validStep = useMemo(() => {
    if (step === 0)
      return (
        form.name.trim().length >= 2 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
        /^(\+?880|0)1[3-9]\d{8}$/.test(form.phone.replace(/[\s-]/g, ""))
      );
    if (step === 1)
      return form.experience && form.sectors.length > 0 && form.ticketRange && form.horizon && form.riskComfort;
    if (step === 2) return form.consent;
    return true;
  }, [step, form]);

  const submit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/investors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "failed");
      }
      setStep(3);
    } catch {
      setError(t(UI.somethingWrong));
    } finally {
      setSubmitting(false);
    }
  };

  const toggleSector = (i: number) => {
    setForm((f) => {
      const has = f.sectors.includes(String(i));
      return {
        ...f,
        sectors: has ? f.sectors.filter((s) => s !== String(i)) : [...f.sectors, String(i)],
      };
    });
  };

  const bnDigits = ["১", "২", "৩"];

  return (
    <Dialog open={isOpen} onOpenChange={(v) => !v && close()}>
      <DialogContent className="max-h-[88vh] gap-0 overflow-y-auto rounded-3xl p-0 sm:max-w-[520px]">
        <DialogHeader className="px-6 pb-4 pt-6">
          <DialogTitle className="text-xl font-extrabold text-nx-navy-900">
            {t(INVESTOR_DLG.title)}
          </DialogTitle>
          <DialogDescription>
            {step === 0 ? t(INVESTOR_DLG.step1Time) : step === 1 ? t(INVESTOR_DLG.step2Note) : step === 2 ? t(INVESTOR_DLG.step3Note) : ""}
          </DialogDescription>
        </DialogHeader>

        {/* progress */}
        {step < 3 && (
          <div className="px-6">
            <div className="flex items-center gap-2">
              {INVESTOR_DLG.steps.map((s, i) => (
                <div key={s.en} className="flex flex-1 flex-col gap-1.5">
                  <div
                    className={cn(
                      "h-1.5 rounded-full transition-colors duration-300",
                      i <= step ? "bg-nx-cyan-500" : "bg-nx-navy-100"
                    )}
                  />
                  <span
                    className={cn(
                      "text-[11px] font-bold",
                      i <= step ? "text-nx-navy-700" : "text-slate-400"
                    )}
                  >
                    {t(s)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="nx-scroll max-h-[55vh] overflow-y-auto px-6 pb-2 pt-5">
          <AnimatePresence mode="wait">
            {/* STEP 1 — Account */}
            {step === 0 && (
              <motion.div
                key="s0"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="inv-name">{t(INVESTOR_DLG.name)} *</Label>
                  <Input
                    id="inv-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t(INVESTOR_DLG.namePh)}
                    autoComplete="name"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="inv-email">{t(INVESTOR_DLG.email)} *</Label>
                  <Input
                    id="inv-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="inv-phone">{t(INVESTOR_DLG.phone)} *</Label>
                  <Input
                    id="inv-phone"
                    type="tel"
                    dir="ltr"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="01XXXXXXXXX"
                    autoComplete="tel"
                    className="nx-num mt-1.5"
                  />
                </div>
                <div>
                  <Label>{t(INVESTOR_DLG.langPref)}</Label>
                  <div className="mt-1.5 flex gap-2">
                    {(["bn", "en"] as const).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setForm({ ...form, langPref: l })}
                        className={cn(
                          "flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all",
                          form.langPref === l
                            ? "border-nx-navy-700 bg-nx-navy-700 text-white"
                            : "border-nx-navy-200 text-nx-navy-800 hover:border-nx-navy-500"
                        )}
                      >
                        {l === "bn" ? "বাংলা" : "English"}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2 — Profile */}
            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div>
                  <Label>{t(INVESTOR_DLG.experience)}</Label>
                  <div className="mt-1.5 space-y-1.5">
                    {INVESTOR_DLG.experienceOpts.map((o, i) => (
                      <button
                        key={o.en}
                        type="button"
                        onClick={() => setForm({ ...form, experience: ["exploring", "some", "active"][i] })}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-left text-sm transition-all",
                          form.experience === ["exploring", "some", "active"][i]
                            ? "border-nx-cyan-400 bg-nx-cyan-50 font-bold text-nx-navy-900"
                            : "border-nx-navy-100 text-slate-600 hover:border-nx-navy-300"
                        )}
                      >
                        {t(o)}
                        {form.experience === ["exploring", "some", "active"][i] && (
                          <Check className="h-4 w-4 text-nx-cyan-600" aria-hidden="true" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>{t(INVESTOR_DLG.sectors)} *</Label>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {INVESTOR_DLG.sectorOpts.map((o, i) => {
                      const active = form.sectors.includes(String(i));
                      return (
                        <button
                          key={o.en}
                          type="button"
                          onClick={() => toggleSector(i)}
                          aria-pressed={active}
                          className={cn(
                            "rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-all",
                            active
                              ? "border-nx-cyan-400 bg-nx-cyan-50 text-nx-cyan-700"
                              : "border-nx-navy-200 text-slate-600 hover:border-nx-navy-400"
                          )}
                        >
                          {t(o)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>{t(INVESTOR_DLG.ticket)}</Label>
                    <div className="mt-1.5 space-y-1.5">
                      {INVESTOR_DLG.ticketOpts.map((o, i) => (
                        <button
                          key={o.en}
                          type="button"
                          onClick={() => setForm({ ...form, ticketRange: ["5-25", "25-100", "100-400", "400+"][i] })}
                          className={cn(
                            "nx-num w-full rounded-xl border px-3.5 py-2 text-left text-sm transition-all",
                            form.ticketRange === ["5-25", "25-100", "100-400", "400+"][i]
                              ? "border-nx-cyan-400 bg-nx-cyan-50 font-bold text-nx-navy-900"
                              : "border-nx-navy-100 text-slate-600 hover:border-nx-navy-300"
                          )}
                        >
                          {t(o)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label>{t(INVESTOR_DLG.horizon)}</Label>
                      <div className="mt-1.5 space-y-1.5">
                        {INVESTOR_DLG.horizonOpts.map((o, i) => (
                          <button
                            key={o.en}
                            type="button"
                            onClick={() => setForm({ ...form, horizon: ["short", "medium", "long"][i] })}
                            className={cn(
                              "w-full rounded-xl border px-3.5 py-2 text-left text-sm transition-all",
                              form.horizon === ["short", "medium", "long"][i]
                                ? "border-nx-cyan-400 bg-nx-cyan-50 font-bold text-nx-navy-900"
                                : "border-nx-navy-100 text-slate-600 hover:border-nx-navy-300"
                            )}
                          >
                            {t(o)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label>{t(INVESTOR_DLG.riskComfort)}</Label>
                      <div className="mt-1.5 space-y-1.5">
                        {INVESTOR_DLG.riskOpts.map((o, i) => (
                          <button
                            key={o.en}
                            type="button"
                            onClick={() => setForm({ ...form, riskComfort: ["cautious", "balanced", "comfortable"][i] })}
                            className={cn(
                              "w-full rounded-xl border px-3.5 py-2 text-left text-[13px] transition-all",
                              form.riskComfort === ["cautious", "balanced", "comfortable"][i]
                                ? "border-nx-cyan-400 bg-nx-cyan-50 font-bold text-nx-navy-900"
                                : "border-nx-navy-100 text-slate-600 hover:border-nx-navy-300"
                            )}
                          >
                            {t(o)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — Verification & consent */}
            {step === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="flex items-start gap-3 rounded-2xl border border-nx-navy-100 bg-nx-mist p-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-nx-navy-700" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-slate-600">{t(INVESTOR_DLG.step3Note)}</p>
                </div>
                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-nx-warn/40 bg-nx-warn-bg/60 p-4">
                  <Checkbox
                    checked={form.consent}
                    onCheckedChange={(v) => setForm({ ...form, consent: v === true })}
                    aria-label={t(INVESTOR_DLG.consent)}
                  />
                  <span className="text-sm font-semibold leading-relaxed text-nx-ink">
                    {t(INVESTOR_DLG.consent)}
                  </span>
                </label>
                <p className="flex items-center gap-2 text-xs text-slate-500">
                  <Lock className="h-3.5 w-3.5 text-nx-verified" aria-hidden="true" />
                  {t(INVESTOR_DLG.dataPromise)}
                </p>
                {error && <p className="text-sm font-semibold text-nx-danger">{error}</p>}
              </motion.div>
            )}

            {/* SUCCESS */}
            {step === 3 && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="pb-2 text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", bounce: 0.5 }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-nx-verified-bg"
                >
                  <CircleCheck className="h-9 w-9 text-nx-verified" aria-hidden="true" />
                </motion.span>
                <h3 className="mt-5 text-xl font-extrabold text-nx-navy-900">
                  {t(INVESTOR_DLG.successTitle)}
                </h3>
                <ol className="mx-auto mt-6 max-w-sm space-y-3 text-left">
                  {INVESTOR_DLG.successSteps.map((s, i) => (
                    <li key={s.en} className="flex items-start gap-3 rounded-2xl border border-nx-navy-100 bg-nx-mist/60 p-4">
                      <span className="nx-num flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-nx-navy-900 text-xs font-extrabold text-nx-cyan-400">
                        {lang === "bn" ? bnDigits[i] : i + 1}
                      </span>
                      <span className="text-sm font-semibold leading-snug text-nx-ink">{t(s)}</span>
                    </li>
                  ))}
                </ol>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* footer actions */}
        <div className="flex items-center gap-2 border-t border-nx-navy-100 px-6 py-4">
          {step < 3 && (
            <>
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s - 1) as Step)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-nx-navy-200 px-5 py-2.5 text-sm font-bold text-nx-navy-800 transition-colors hover:border-nx-navy-500"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  {t(INVESTOR_DLG.back)}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setLang(form.langPref === "bn" ? "bn" : "en")}
                  className="hidden"
                  aria-hidden="true"
                  tabIndex={-1}
                />
              )}
              <button
                type="button"
                disabled={!validStep || submitting}
                onClick={() => (step === 2 ? submit() : setStep((s) => (s + 1) as Step))}
                className={cn(
                  "nx-arrow-btn ml-auto inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all",
                  validStep && !submitting
                    ? "bg-nx-navy-700 text-white hover:bg-nx-navy-600"
                    : "cursor-not-allowed bg-nx-navy-100 text-slate-400"
                )}
              >
                {submitting ? t(UI.saving) : step === 2 ? t(INVESTOR_DLG.submit) : t(INVESTOR_DLG.continue)}
                {!submitting && (
                  <span className="nx-arrow">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                )}
              </button>
            </>
          )}
          {step === 3 && (
            <button
              type="button"
              onClick={close}
              className="ml-auto rounded-full bg-nx-navy-700 px-6 py-2.5 text-sm font-bold text-white hover:bg-nx-navy-600"
            >
              {lang === "bn" ? "সম্পন্ন" : "Done"}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
