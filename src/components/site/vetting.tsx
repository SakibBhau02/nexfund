"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, Eye, FileCheck2, Briefcase, ClipboardCheck, AlertTriangle, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { VETTING } from "@/lib/content";
import { SectionHeading } from "./brand";
import { Reveal } from "./reveal";

const STAGE_ICONS = [ShieldCheck, FileCheck2, Briefcase, Eye, ClipboardCheck];

export function Vetting() {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState(0);
  const [userTouched, setUserTouched] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // auto-advance until the user interacts (blueprint interaction #4)
  useEffect(() => {
    if (userTouched) return;
    timer.current = setInterval(() => {
      setActive((a) => (a + 1) % VETTING.stages.length);
    }, 4200);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [userTouched]);

  const select = (i: number) => {
    setUserTouched(true);
    if (timer.current) clearInterval(timer.current);
    setActive(i);
  };

  const stage = VETTING.stages[active];
  const Icon = STAGE_ICONS[active];

  return (
    <section
      id="vetting"
      className="relative overflow-hidden bg-nx-navy-900 py-20 text-white md:py-28"
      aria-labelledby="vetting-title"
    >
      <div className="nx-navy-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-nx-cyan-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full bg-nx-navy-500/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1200px] px-5 md:px-6">
        <Reveal>
          <SectionHeading
            dark
            eyebrow={t(VETTING.eyebrow)}
            title={t(VETTING.title)}
            sub={t(VETTING.sub)}
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Step list */}
          <Reveal className="order-2 lg:order-1">
            <ol className="relative space-y-2.5" role="tablist" aria-label={t(VETTING.eyebrow)}>
              {VETTING.stages.map((s, i) => {
                const StageIcon = STAGE_ICONS[i];
                const done = i < active;
                return (
                  <li key={s.key}>
                    <button
                      role="tab"
                      aria-selected={active === i}
                      aria-controls="vetting-panel"
                      id={`vetting-tab-${i}`}
                      onClick={() => select(i)}
                      className={cn(
                        "flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300",
                        active === i
                          ? "border-nx-cyan-400/60 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                          : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
                      )}
                    >
                      <span
                        className={cn(
                          "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors",
                          done
                            ? "bg-nx-verified/90 text-white"
                            : active === i
                              ? "bg-nx-cyan-500 text-nx-navy-900"
                              : "bg-white/10 text-nx-cyan-300"
                        )}
                      >
                        {done ? (
                          <Check className="h-5 w-5" aria-hidden="true" />
                        ) : (
                          <StageIcon className="h-5 w-5" aria-hidden="true" />
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] font-bold tracking-[0.16em] text-nx-cyan-300 uppercase">
                          {lang === "bn" ? `ধাপ ${["১", "২", "৩", "৪", "৫"][i]}` : `Stage ${i + 1}`}
                        </span>
                        <span className="mt-0.5 block font-bold leading-snug text-white">
                          {t(s.title)}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          {/* Detail panel */}
          <Reveal className="order-1 lg:order-2" delay={0.08}>
            <div
              id="vetting-panel"
              role="tabpanel"
              aria-labelledby={`vetting-tab-${active}`}
              className="relative h-full overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-7 md:p-9"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.key}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  className="flex h-full flex-col"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-nx-cyan-500 text-nx-navy-900">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                    {/* progress dots */}
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      {VETTING.stages.map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            "h-1.5 rounded-full transition-all duration-300",
                            i <= active ? "w-6 bg-nx-cyan-400" : "w-2.5 bg-white/20"
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="mt-6 text-2xl font-extrabold text-white md:text-[1.7rem]">
                    {t(stage.title)}
                  </h3>

                  <div className="mt-7 space-y-5">
                    <div className="rounded-2xl bg-white/[0.05] p-5">
                      <p className="text-xs font-bold tracking-[0.14em] text-nx-cyan-300 uppercase">
                        {t(VETTING.checkLabel)}
                      </p>
                      <p className="mt-2 leading-relaxed text-white/85">{t(stage.what)}</p>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-nx-verified/30 bg-nx-verified/10 p-5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-nx-verified text-white">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-bold tracking-[0.14em] text-nx-cyan-100/90 uppercase">
                          {t(VETTING.seeLabel)}
                        </p>
                        <p className="mt-0.5 font-semibold text-white">{t(stage.see)}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>

        {/* Disclaimer — big & clear (blueprint §5.1 S4) */}
        <Reveal delay={0.1}>
          <p className="mx-auto mt-12 flex max-w-2xl items-center justify-center gap-3 rounded-2xl border border-nx-warn/40 bg-nx-warn/10 px-6 py-4 text-center text-base font-bold text-amber-100 md:text-lg">
            <AlertTriangle className="h-6 w-6 shrink-0 text-amber-300" aria-hidden="true" />
            {t(VETTING.disclaimer)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
