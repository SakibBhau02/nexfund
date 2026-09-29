"use client";

import { ArrowUpRight, BookMarked } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { FAQ, FINAL_CTA, GLOSSARY_LABELS } from "@/lib/content";
import { SectionHeading } from "./brand";
import { Reveal } from "./reveal";
import { G } from "./glossary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  const { t } = useLanguage();
  const open = useDialogStore((s) => s.open);
  return (
    <section id="faq" className="bg-white py-20 md:py-24" aria-labelledby="faq-title">
      <div className="mx-auto max-w-[820px] px-5 md:px-6">
        <Reveal>
          <SectionHeading eyebrow={t(FAQ.eyebrow)} title={t(FAQ.title)} />
        </Reveal>
        <Reveal delay={0.06}>
          <Accordion type="single" collapsible className="mt-10 space-y-3">
            {FAQ.items.map((item, i) => (
              <AccordionItem
                key={item.q.en}
                value={`faq-${i}`}
                className="rounded-2xl border border-nx-navy-100 bg-nx-mist/40 px-5 transition-colors data-[state=open]:border-nx-cyan-200 data-[state=open]:bg-white data-[state=open]:shadow-[0_18px_40px_-22px_rgba(10,58,143,0.3)]"
              >
                <AccordionTrigger className="py-4 text-left text-[15px] font-bold text-nx-navy-900 hover:no-underline md:text-base">
                  {t(item.q)}
                </AccordionTrigger>
                <AccordionContent className="pb-5 leading-relaxed text-slate-600">
                  {t(item.a)}
                  {/* R3: glossary term chips (§7 #14) — bilingual tooltip on tap/hover */}
                  {item.terms && item.terms.length > 0 && (
                    <p className="mt-3 flex flex-wrap items-center gap-2 border-t border-nx-navy-100 pt-3">
                      <span className="flex items-center gap-1 text-[11px] font-bold tracking-wide text-slate-400 uppercase">
                        <BookMarked className="h-3 w-3" aria-hidden="true" />
                        {t(FAQ.termsLabel)}
                      </span>
                      {item.terms.map((term) => (
                        <span
                          key={term}
                          className="rounded-full border border-nx-cyan-200 bg-nx-cyan-50 px-2.5 py-1 text-xs font-bold text-nx-cyan-700"
                        >
                          <G term={term}>{t(GLOSSARY_LABELS[term] ?? { en: term, bn: term })}</G>
                        </span>
                      ))}
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-sm text-slate-500">
            {t({ en: "Still curious?", bn: "এখনো প্রশ্ন আছে?" })}{" "}
            <button
              onClick={() => open("contact")}
              className="font-bold text-nx-navy-700 underline decoration-nx-cyan-400 decoration-2 underline-offset-4 hover:text-nx-cyan-600"
            >
              {t({ en: "Talk to us →", bn: "আমাদের সাথে কথা বলুন →" })}
            </button>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCta() {
  const { t } = useLanguage();
  const open = useDialogStore((s) => s.open);
  const openInvestor = useDialogStore((s) => s.openInvestor);

  return (
    <section className="relative overflow-hidden bg-nx-navy-900 py-20 md:py-28" aria-labelledby="cta-title">
      <div className="nx-navy-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-nx-cyan-500/10 blur-3xl"
        aria-hidden="true"
      />
      {/* rising cyan path */}
      <svg
        viewBox="0 0 1200 300"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-60"
      >
        <path
          d="M-20 280 C 300 260, 500 200, 780 130 S 1120 40, 1230 6"
          stroke="#26B7D8"
          strokeWidth="1.6"
          strokeDasharray="4 9"
        />
        <path d="M1216 22 L1230 4 L1210 0" stroke="#26B7D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="relative mx-auto max-w-[900px] px-5 text-center md:px-6">
        <Reveal>
          <h2 id="cta-title" className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
            {t(FINAL_CTA.title)}
          </h2>
          <p className="mt-4 text-lg text-white/70">{t(FINAL_CTA.sub)}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => open("contact")}
              className="nx-arrow-btn inline-flex items-center gap-2 rounded-full bg-nx-cyan-500 px-8 py-4 text-base font-extrabold text-nx-navy-900 shadow-[0_18px_40px_-12px_rgba(38,183,216,0.5)] transition-all hover:bg-nx-cyan-400"
            >
              {t(FINAL_CTA.bookCall)}
              <span className="nx-arrow">
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </span>
            </button>
            <button
              onClick={() => openInvestor("investor")}
              className="rounded-full border border-white/25 px-8 py-4 text-base font-bold text-white transition-colors hover:border-nx-cyan-400 hover:text-nx-cyan-300"
            >
              {t(FINAL_CTA.registerInvestor)}
            </button>
            <button
              onClick={() => open("quiz")}
              className="rounded-full border border-white/25 px-8 py-4 text-base font-bold text-white transition-colors hover:border-nx-cyan-400 hover:text-nx-cyan-300"
            >
              {t(FINAL_CTA.raiseCapital)}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
