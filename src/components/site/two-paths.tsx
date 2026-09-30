"use client";

import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { TWO_PATHS } from "@/lib/content";
import { SectionHeading } from "./brand";
import { Reveal } from "./reveal";

export function TwoPaths() {
  const { t } = useLanguage();
  const openInvestor = useDialogStore((s) => s.openInvestor);
  const open = useDialogStore((s) => s.open);

  return (
    <section id="paths" className="bg-nx-mist py-20 md:py-24" aria-labelledby="paths-title">
      <div className="mx-auto max-w-[1200px] px-5 md:px-6">
        <Reveal>
          <SectionHeading
            titleId="paths-title"
            eyebrow={t(TWO_PATHS.eyebrow)}
            title={t(TWO_PATHS.title)}
            sub={t(TWO_PATHS.sub)}
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* Investors card */}
          <Reveal delay={0.05}>
            <article className="group relative h-full overflow-hidden rounded-3xl border border-nx-navy-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-nx-cyan-200 hover:shadow-[0_28px_60px_-24px_rgba(10,58,143,0.28)] md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-extrabold text-nx-navy-900">{t(TWO_PATHS.investor.title)}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{t(TWO_PATHS.investor.copy)}</p>
                </div>
                <div className="oval oval-ring hidden w-[104px] shrink-0 bg-nx-navy-100 sm:block">
                  <Image
                    src="/images/investor-meeting.png"
                    alt={t({ en: "Investors reviewing documents", bn: "নথি পর্যালোচনারত বিনিয়োগকারী" })}
                    fill
                    sizes="104px"
                    className="object-cover"
                  />
                </div>
              </div>
              <ul className="mt-6 space-y-2.5">
                {TWO_PATHS.investor.points.map((p) => (
                  <li key={p.en} className="flex items-start gap-2.5 text-[15px] text-nx-ink">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-nx-verified" aria-hidden="true" />
                    {t(p)}
                  </li>
                ))}
              </ul>
              <button
                onClick={() =>
                  document.getElementById("opportunities")?.scrollIntoView({ behavior: "smooth" })
                }
                className="nx-arrow-btn mt-8 inline-flex items-center gap-2 rounded-full bg-nx-navy-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-nx-navy-600"
              >
                {t(TWO_PATHS.investor.cta)}
                <span className="nx-arrow">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </article>
          </Reveal>

          {/* Entrepreneurs card */}
          <Reveal delay={0.12}>
            <article className="group relative h-full overflow-hidden rounded-3xl border border-nx-navy-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-nx-cyan-200 hover:shadow-[0_28px_60px_-24px_rgba(10,58,143,0.28)] md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-extrabold text-nx-navy-900">{t(TWO_PATHS.founder.title)}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{t(TWO_PATHS.founder.copy)}</p>
                </div>
                <div className="oval oval-ring hidden w-[104px] shrink-0 bg-nx-navy-100 sm:block">
                  <Image
                    src="/images/hero-retail.png"
                    alt={t({ en: "Bangladeshi entrepreneur in his shop", bn: "নিজের দোকানে বাংলাদেশি উদ্যোক্তা" })}
                    fill
                    sizes="104px"
                    className="object-cover"
                  />
                </div>
              </div>
              <ul className="mt-6 space-y-2.5">
                {TWO_PATHS.founder.points.map((p) => (
                  <li key={p.en} className="flex items-start gap-2.5 text-[15px] text-nx-ink">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-nx-verified" aria-hidden="true" />
                    {t(p)}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => open("quiz")}
                className="nx-arrow-btn mt-8 inline-flex items-center gap-2 rounded-full border-[1.5px] border-nx-navy-200 bg-white px-6 py-3 text-sm font-bold text-nx-navy-800 transition-all hover:border-nx-cyan-500 hover:text-nx-navy-700"
              >
                {t(TWO_PATHS.founder.cta)}
                <span className="nx-arrow">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
