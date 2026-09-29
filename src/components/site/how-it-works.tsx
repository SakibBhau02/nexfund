"use client";

import { motion, useReducedMotion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { HOW } from "@/lib/content";
import { SectionHeading } from "./brand";
import { Reveal } from "./reveal";

export function HowItWorks() {
  const { t, lang } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section id="how" className="relative overflow-hidden bg-white py-20 md:py-24" aria-labelledby="how-title">
      <div className="mx-auto max-w-[1200px] px-5 md:px-6">
        <Reveal>
          <SectionHeading eyebrow={t(HOW.eyebrow)} title={t(HOW.title)} sub={t(HOW.sub)} />
        </Reveal>

        {/* Crossing paths visual (blueprint §7.2) */}
        <div className="relative mx-auto mt-12 max-w-3xl" aria-hidden="true">
          <svg viewBox="0 0 720 170" fill="none" className="h-[130px] w-full md:h-[170px]">
            {/* left path (entrepreneur) */}
            <motion.path
              d="M8 150 C 190 150, 300 60, 470 40 S 640 24, 712 8"
              stroke="#0A3A8F"
              strokeWidth="2"
              strokeLinecap="round"
              initial={reduce ? { opacity: 1 } : { pathLength: 0 }}
              whileInView={reduce ? undefined : { pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            />
            {/* right path (investor) */}
            <motion.path
              d="M712 150 C 530 150, 420 60, 250 40 S 80 24, 8 8"
              stroke="#26B7D8"
              strokeWidth="2"
              strokeLinecap="round"
              initial={reduce ? { opacity: 1 } : { pathLength: 0 }}
              whileInView={reduce ? undefined : { pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
            />
            {/* X meeting point */}
            <motion.circle
              cx="360"
              cy="55"
              r="7"
              fill="#26B7D8"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.15, duration: 0.35, type: "spring", bounce: 0.5 }}
            />
            <motion.path
              d="M360 55 L360 10 M360 10 l-8 10 M360 10 l8 10"
              stroke="#26B7D8"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.45, duration: 0.4 }}
            />
            <text
              x="24"
              y="168"
              className="fill-nx-navy-700 text-[11px] font-bold tracking-wide"
            >
              {lang === "bn" ? "উদ্যোক্তা ↗" : "ENTREPRENEUR ↗"}
            </text>
            <text
              x="696"
              y="168"
              textAnchor="end"
              className="fill-nx-cyan-700 text-[11px] font-bold tracking-wide"
            >
              {lang === "bn" ? "বিনিয়োগকারী ↗" : "INVESTOR ↗"}
            </text>
          </svg>
        </div>

        {/* 4 steps */}
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HOW.steps.map((step, i) => (
            <Reveal key={step.n} delay={0.08 * i}>
              <li className="group relative h-full rounded-2xl border border-nx-navy-100 bg-nx-mist/60 p-6 transition-all duration-300 hover:border-nx-cyan-300 hover:bg-white hover:shadow-[0_20px_44px_-20px_rgba(10,58,143,0.25)]">
                <span className="nx-num inline-flex h-11 w-11 items-center justify-center rounded-full bg-nx-navy-900 text-sm font-extrabold text-nx-cyan-400 transition-colors group-hover:bg-nx-navy-700">
                  {lang === "bn" ? ["০১", "০২", "০৩", "০৪"][i] : step.n}
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-nx-navy-900">{t(step.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(step.desc)}</p>
                {i < HOW.steps.length - 1 && (
                  <svg
                    viewBox="0 0 24 24"
                    className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-nx-cyan-500 lg:block"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M4 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </li>
            </Reveal>
          ))}
        </ol>

        {/* What we don't do */}
        <Reveal delay={0.15}>
          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-dashed border-nx-warn/50 bg-nx-warn-bg/60 p-6 md:p-7">
            <h3 className="flex items-center gap-2 text-base font-extrabold text-nx-navy-900">
              <XCircle className="h-5 w-5 text-nx-warn" aria-hidden="true" />
              {t(HOW.notDoTitle)}
            </h3>
            <ul className="mt-3 grid gap-2 md:grid-cols-3">
              {HOW.notDo.map((d) => (
                <li key={d.en} className="flex items-start gap-2 text-sm leading-relaxed text-nx-ink/80">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nx-warn" aria-hidden="true" />
                  {t(d)}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
