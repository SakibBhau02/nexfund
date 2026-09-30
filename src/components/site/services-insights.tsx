"use client";

import Image from "next/image";
import { ArrowUpRight, BookOpen, Clock, Target, Scale, LineChart, Presentation, SearchCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { SERVICES, INSIGHTS } from "@/lib/content";
import { SectionHeading } from "./brand";
import { Reveal } from "./reveal";
import { G } from "./glossary";

const SVC_ICONS = { target: Target, scale: Scale, chart: LineChart, presentation: Presentation, search: SearchCheck };

export function Services() {
  const { t } = useLanguage();
  const open = useDialogStore((s) => s.open);

  return (
    <section id="services" className="bg-white py-20 md:py-24" aria-labelledby="services-title">
      <div className="mx-auto max-w-[1200px] px-5 md:px-6">
        <Reveal>
          <SectionHeading titleId="services-title" eyebrow={t(SERVICES.eyebrow)} title={t(SERVICES.title)} />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.items.map((svc, i) => {
            const Icon = SVC_ICONS[svc.icon as keyof typeof SVC_ICONS];
            const isInvestor = svc.forWhom === "investor";
            return (
              <Reveal key={svc.title.en} delay={0.05 * i} className={i === 0 ? "md:col-span-2 lg:col-span-1" : ""}>
                <article className="flex h-full flex-col rounded-3xl border border-nx-navy-100 bg-gradient-to-b from-nx-mist/70 to-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-nx-cyan-200 hover:shadow-[0_24px_48px_-20px_rgba(10,58,143,0.3)]">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-nx-navy-900 text-nx-cyan-400">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-nx-cyan-100 px-3 py-1 text-[11px] font-bold text-nx-cyan-700">
                      {t(isInvestor ? SERVICES.investor : SERVICES.entrepreneur)}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold text-nx-navy-900">
                    {svc.icon === "scale" ? (
                      <G term="valuation">{t(svc.title)}</G>
                    ) : svc.icon === "search" ? (
                      <G term="due diligence">{t(svc.title)}</G>
                    ) : (
                      t(svc.title)
                    )}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(svc.desc)}</p>
                  <ul className="mt-4 flex-1 space-y-1.5">
                    {svc.gets.map((g) => (
                      <li key={g.en} className="flex items-start gap-2 text-[13px] text-nx-ink/80">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-nx-cyan-500" aria-hidden="true" />
                        {t(g)}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => open("contact")}
                    className="nx-arrow-btn mt-6 inline-flex items-center gap-1.5 self-start text-sm font-bold text-nx-navy-700 transition-colors hover:text-nx-cyan-600"
                  >
                    {t(SERVICES.cta)}
                    <span className="nx-arrow">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Insights() {
  const { t, lang } = useLanguage();
  const openInsight = useDialogStore((s) => s.openInsight);

  // R3: glossary term per article category (§7 #14)
  const catGlossary: Record<string, string> = {
    "sme-due-diligence-checklist": "due diligence",
    "valuation-basics-for-founders": "valuation",
  };

  return (
    <section id="insights" className="bg-nx-mist py-20 md:py-24" aria-labelledby="insights-title">
      <div className="mx-auto max-w-[1200px] px-5 md:px-6">
        <Reveal>
          <SectionHeading titleId="insights-title" eyebrow={t(INSIGHTS.eyebrow)} title={t(INSIGHTS.title)} sub={t(INSIGHTS.sub)} />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {INSIGHTS.articles.map((a, i) => (
            <Reveal key={a.slug} delay={0.06 * i}>
              <article
                onClick={() => openInsight(a.slug)}
                className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-nx-navy-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-nx-cyan-200 hover:shadow-[0_28px_56px_-24px_rgba(10,58,143,0.32)]"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={a.image}
                    alt={t(a.title)}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-nx-navy-900/45 to-transparent" aria-hidden="true" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-white/95 px-3 py-1 text-[12px] font-bold text-nx-navy-800 shadow-[0_4px_12px_-4px_rgba(6,31,74,0.35)] backdrop-blur">
                    {catGlossary[a.slug] ? (
                      <G term={catGlossary[a.slug]}>{t(a.category)}</G>
                    ) : (
                      t(a.category)
                    )}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-base font-extrabold leading-snug text-nx-navy-900 transition-colors group-hover:text-nx-navy-700">
                    {t(a.title)}
                  </h3>
                  {/* AEO short-answer box (blueprint §5.9) */}
                  <div className="mt-3 rounded-xl bg-nx-cyan-50 p-3.5">
                    <p className="text-[10px] font-extrabold tracking-[0.14em] text-nx-cyan-700 uppercase">
                      {t(INSIGHTS.shortAnswer)}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-nx-ink/80">{t(a.short)}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-5">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {t(INSIGHTS.readTime(a.minutes))}
                    </span>
                    <button
                      onClick={() => openInsight(a.slug)}
                      aria-haspopup="dialog"
                      className="inline-flex items-center gap-1 text-sm font-bold text-nx-navy-700 transition-colors hover:text-nx-cyan-600"
                    >
                      <BookOpen className="h-4 w-4" aria-hidden="true" />
                      {t(INSIGHTS.readMore)}
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs font-semibold text-slate-600">
          {lang === "bn"
            ? "প্রতিটি গাইড দুই ভাষাতেই বিনামূল্যে পড়ুন।"
            : "Every guide is free to read — in both languages."}
        </p>
      </div>
    </section>
  );
}
