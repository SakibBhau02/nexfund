"use client";

import { ArrowUpRight, Check, Users, Briefcase } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { navigateTo } from "@/lib/page-router";
import { TWO_PATHS } from "@/lib/content";
import { SectionHeading } from "./brand";
import { Reveal } from "./reveal";

/**
 * R13 (user feedback): the oval side-images are gone — both cards are now
 * focused, content-first professional boxes (icon badge → title → copy →
 * checks → CTA), with a gradient top accent for brand rhythm.
 */
export function TwoPaths() {
  const { t } = useLanguage();
  const open = useDialogStore((s) => s.open);

  const cards = [
    {
      data: TWO_PATHS.investor,
      icon: Users,
      href: "opportunities" as const,
      onClick: () => navigateTo("opportunities"),
      accent: "from-nx-navy-700 to-nx-navy-500",
    },
    {
      data: TWO_PATHS.founder,
      icon: Briefcase,
      href: undefined,
      onClick: () => open("quiz"),
      accent: "from-nx-cyan-600 to-nx-cyan-400",
    },
  ];

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
          {cards.map(({ data, icon: Icon, onClick, accent }, i) => (
            <Reveal key={data.title.en} delay={0.05 + i * 0.07}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-nx-navy-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-nx-cyan-200 hover:shadow-[0_28px_60px_-24px_rgba(10,58,143,0.28)] md:p-8">
                {/* brand accent edge */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`}
                />

                {/* identity */}
                <div className="flex items-center gap-4">
                  <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-nx-navy-100 bg-nx-navy-50 text-nx-navy-700 transition-colors group-hover:border-nx-cyan-200 group-hover:bg-nx-cyan-50 group-hover:text-nx-cyan-700">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="text-2xl font-extrabold text-nx-navy-900">{t(data.title)}</h3>
                </div>

                <p className="mt-4 leading-relaxed text-slate-600">{t(data.copy)}</p>

                <ul className="mt-6 space-y-2.5">
                  {data.points.map((p) => (
                    <li key={p.en} className="flex items-start gap-2.5 text-[15px] text-nx-ink">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-nx-verified" aria-hidden="true" />
                      {t(p)}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <button
                    onClick={onClick}
                    className="nx-arrow-btn inline-flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-nx-navy-200 bg-white px-6 py-3 text-sm font-bold text-nx-navy-800 transition-all hover:border-nx-cyan-500 hover:bg-nx-navy-50 hover:text-nx-navy-700 sm:w-auto"
                  >
                    {t(data.cta)}
                    <span className="nx-arrow">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
