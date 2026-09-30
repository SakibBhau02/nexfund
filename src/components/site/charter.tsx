"use client";

import { Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { CHARTER, WHY } from "@/lib/content";
import { Compass, Receipt, ShieldCheck, Languages } from "lucide-react";
import { SectionHeading } from "./brand";
import { Reveal } from "./reveal";

const WHY_ICONS = { shield: ShieldCheck, receipt: Receipt, compass: Compass, languages: Languages };

export function Charter() {
  const { t, lang } = useLanguage();
  return (
    <section id="charter" className="bg-white py-20 md:py-24" aria-labelledby="charter-title">
      <div className="mx-auto max-w-[1200px] px-5 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                align="left"
                titleId="charter-title"
                eyebrow={t(CHARTER.eyebrow)}
                title={t(CHARTER.title)}
              />
              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-nx-navy-50 px-4 py-1.5 text-xs font-bold text-nx-navy-700">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-nx-cyan-500" aria-hidden="true" />
                {t(CHARTER.version)}
              </p>
            </div>
          </Reveal>

          <ol className="space-y-3">
            {CHARTER.items.map((item, i) => (
              /* R8 a11y: Reveal renders the <li> itself so ol→li stays semantic */
              <Reveal
                key={item.en}
                as="li"
                delay={0.05 * i}
                className="group flex items-start gap-4 rounded-2xl border border-nx-navy-100 bg-nx-mist/50 p-5 transition-all duration-300 hover:border-nx-cyan-300 hover:bg-white hover:shadow-[0_18px_40px_-20px_rgba(10,58,143,0.28)]"
              >
                  <span className="nx-num flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-nx-navy-900 text-sm font-extrabold text-nx-cyan-400">
                    {lang === "bn" ? ["১", "২", "৩", "৪", "৫", "৬", "৭"][i] : i + 1}
                  </span>
                  <div className="flex items-start gap-3">
                    <Check
                      className="mt-1 h-5 w-5 shrink-0 text-nx-verified transition-transform duration-300 group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <p className="text-[15px] font-semibold leading-relaxed text-nx-ink md:text-base">
                      {t(item)}
                    </p>
                  </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function WhyNexFund() {
  const { t } = useLanguage();
  return (
    <section id="why" className="bg-nx-mist py-20 md:py-24" aria-labelledby="why-title">
      <div className="mx-auto max-w-[1200px] px-5 md:px-6">
        <Reveal>
          <SectionHeading titleId="why-title" eyebrow={t(WHY.eyebrow)} title={t(WHY.title)} />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.items.map((item, i) => {
            const Icon = WHY_ICONS[item.icon as keyof typeof WHY_ICONS];
            return (
              <Reveal key={item.title.en} delay={0.06 * i}>
                <article className="group relative h-full overflow-hidden rounded-3xl border border-nx-navy-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-nx-cyan-200 hover:shadow-[0_24px_48px_-20px_rgba(10,58,143,0.3)]">
                  <div
                    className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-nx-cyan-100/50 transition-transform duration-500 group-hover:scale-150"
                    aria-hidden="true"
                  />
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-nx-navy-900 text-nx-cyan-400">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="relative mt-5 text-lg font-extrabold text-nx-navy-900">
                    {t(item.title)}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-600">
                    {t(item.desc)}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
