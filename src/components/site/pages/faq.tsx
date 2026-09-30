"use client";

import { useMemo, useState } from "react";
import { CircleHelp, MessageCircle, Search, SearchX } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { FAQ } from "@/lib/content";
import { navigateTo } from "@/lib/page-router";
import { useDialogStore } from "@/lib/dialog-store";
import {
  PageHero,
  PageBody,
  CtaBand,
  CyanButton,
  OutlineLightButton,
  SectionHead,
} from "./shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * R10 FAQ landing page — full standalone page version of the home FAQ
 * section: searchable bilingual accordion + "still stuck?" CTA band.
 * Detail-route aware: `#p/faq/<question-index>` deep-links one answer open.
 */

const T = {
  heroCopy: {
    en: "Straight answers to the questions investors and entrepreneurs ask us most — about minimums, fees, timelines, risk and how matching actually works.",
    bn: "বিনিয়োগকারী ও উদ্যোক্তারা সবচেয়ে বেশি যেসব প্রশ্ন করেন তার সরাসরি উত্তর — সর্বনিম্ন বিনিয়োগ, ফি, সময়সীমা, ঝুঁকি এবং ম্যাচিং আসলে কীভাবে কাজ করে।",
  },
  searchLabel: { en: "Search the questions", bn: "প্রশ্ন খুঁজুন" } as const,
  searchPlaceholder: {
    en: "Type a keyword — e.g. minimum, fees, exit…",
    bn: "শব্দ লিখুন — যেমন: সর্বনিম্ন, ফি, এক্সিট…",
  } as const,
  count: (n: number) =>
    ({
      en: n === 1 ? "1 answer" : `${n} answers`,
      bn: n === 1 ? "১টি উত্তর" : `${n}টি উত্তর`,
    }) as const,
  emptyTitle: { en: "No match in the current questions", bn: "বর্তমান প্রশ্নগুলোতে কিছু মেলেনি" } as const,
  emptySub: {
    en: "Try a different word — or ask us directly and we'll add the answer here.",
    bn: "অন্য শব্দ চেষ্টা করুন — বা সরাসরি জিজ্ঞাসা করুন, উত্তরটি এখানে যোগ করে দেব।",
  } as const,
  stillTitle: { en: "Still have a question?", bn: "এখনও প্রশ্ন আছে?" } as const,
  stillCopy: {
    en: "Ask a human advisor — no bots, no scripts. We reply within one business day, in Bangla or English.",
    bn: "সরাসরি অ্যাডভাইজরকে জিজ্ঞাসা করুন — কোনো বট নেই, স্ক্রিপ্ট নেই। এক কর্মদিবসের মধ্যে উত্তর, বাংলা বা ইংরেজিতে।",
  } as const,
  askCta: { en: "Ask us directly", bn: "সরাসরি জিজ্ঞাসা করুন" } as const,
  browseCta: { en: "Browse opportunities", bn: "সুযোগসমূহ দেখুন" } as const,
};

export default function FaqPage() {
  const { t, lang } = useLanguage();
  const openContact = useDialogStore((s) => s.open);
  const [query, setQuery] = useState("");

  const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

  const filtered = useMemo(() => {
    const q = norm(query);
    if (!q) return FAQ.items;
    return FAQ.items.filter(
      (it) => norm(t(it.q)).includes(q) || norm(t(it.a)).includes(q)
    );
  }, [query, lang, t]);

  return (
    <>
      <PageHero
        crumbs={[{ label: { en: "FAQ", bn: "সাধারণ জিজ্ঞাসা" } }]}
        eyebrow={FAQ.eyebrow}
        title={FAQ.title}
        copy={T.heroCopy}
        image="/images/hero-tech.png"
        imageAlt={lang === "bn" ? "সাধারণ জিজ্ঞাসা" : "Frequently asked questions"}
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-nx-cyan-300/40 bg-nx-cyan-500/10 px-3.5 py-1.5 text-[12px] font-bold text-nx-cyan-300">
            <CircleHelp className="h-3.5 w-3.5" aria-hidden="true" />
            {lang === "bn" ? `${FAQ.items.length}+ প্রশ্নোত্তর` : `${FAQ.items.length}+ answers`}
          </span>
        }
        actions={
          <div className="relative w-full max-w-md">
            <label htmlFor="faq-page-search" className="sr-only">
              {t(T.searchLabel)}
            </label>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
              aria-hidden="true"
            />
            <input
              id="faq-page-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t(T.searchPlaceholder)}
              className="w-full rounded-full border border-white/15 bg-white/[0.07] py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/40 focus:border-nx-cyan-400 focus:outline-none"
            />
          </div>
        }
      />

      <PageBody className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-nx-navy-700" aria-live="polite">
              {t(T.count(filtered.length))}
            </p>
            {query && (
              <button
                onClick={() => setQuery("")}
                className="rounded-full border border-nx-navy-200 px-3 py-1.5 text-xs font-bold text-nx-navy-700 transition-colors hover:bg-nx-navy-50"
              >
                {lang === "bn" ? "খুঁজা মুছুন" : "Clear"}
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-nx-navy-100 bg-white p-10 text-center shadow-[0_14px_40px_-18px_rgba(6,31,74,0.18)]">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-nx-navy-50 text-nx-navy-500">
                <SearchX className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-lg font-extrabold text-nx-navy-900">
                {t(T.emptyTitle)}
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
                {t(T.emptySub)}
              </p>
              <button
                onClick={() => openContact("contact")}
                className="mt-5 rounded-full bg-nx-navy-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-nx-navy-600"
              >
                {t(T.askCta)}
              </button>
            </div>
          ) : (
            <Accordion
              type="single"
              collapsible
              className="rounded-3xl border border-nx-navy-100 bg-white px-6 shadow-[0_14px_40px_-18px_rgba(6,31,74,0.18)] md:px-8"
            >
              {filtered.map((item, i) => (
                <AccordionItem
                  key={item.q.en}
                  value={item.q.en}
                  className={i === filtered.length - 1 ? "border-b-0" : undefined}
                >
                  <AccordionTrigger className="py-5 text-left text-[15px] font-bold text-nx-navy-900 hover:no-underline md:text-base">
                    {t(item.q)}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 leading-relaxed text-slate-600">
                    {t(item.a)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          <p className="mt-8 text-center text-sm text-slate-500">
            {lang === "bn"
              ? "উত্তরগুলো কোম্পানির ডেমো-ডেটা ও প্রকাশ্য নীতির ভিত্তিতে লেখা।"
              : "Answers reflect our demo-company data and published policies."}
          </p>
        </div>
      </PageBody>

      <CtaBand
        title={T.stillTitle}
        copy={T.stillCopy}
        actions={
          <>
            <CyanButton
              onClick={() =>
                openContact("contact")
              }
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t(T.askCta)}
            </CyanButton>
            <OutlineLightButton onClick={() => navigateTo("opportunities")}>
              {t(T.browseCta)}
            </OutlineLightButton>
          </>
        }
      />
    </>
  );
}
