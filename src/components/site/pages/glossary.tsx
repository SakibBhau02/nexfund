"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookMarked, Info, Search, SearchX } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { navigateTo } from "@/lib/page-router";
import { GLOSSARY, GLOSSARY_LABELS, GLOSSARY_HUB } from "@/lib/content";
import { bnNum } from "@/lib/format";
import {
  PageHero,
  PageBody,
  CtaBand,
  CyanButton,
  OutlineLightButton,
} from "./shell";

/**
 * R10 Glossary landing page — the full plain-language term index,
 * searchable in both languages. Same data + tone as the glossary hub
 * dialog (GLOSSARY / GLOSSARY_LABELS), presented as a full page.
 */

const T = {
  heroCopy: {
    en: "Plain-language definitions of every term used across this site — searchable in Bangla and English, because informed decisions start with a shared vocabulary.",
    bn: "এই সাইটে ব্যবহৃত প্রতিটি শব্দের সহজ-ভাষার সংজ্ঞা — বাংলা ও ইংরেজি দুই ভাষাতেই খোঁজা যায়; কারণ তথ্যসমৃদ্ধ সিদ্ধান্ত শুরু হয় অর্থবোঝা শব্দভাণ্ডার থেকে।",
  },
  searchLabel: { en: "Search the glossary", bn: "শব্দকোষ খুঁজুন" } as const,
  searchPlaceholder: {
    en: "Type a term — equity, ticket, exit…",
    bn: "শব্দ লিখুন — ইক্যুইটি, টিকেট, এক্সিট…",
  } as const,
  countLabel: (n: number, bn: (x: number) => string) =>
    ({
      en: n === 1 ? "1 term" : `${n} terms`,
      bn: `${bn(n)}টি শব্দ`,
    }) as const,
  clear: { en: "Clear", bn: "খুঁজা মুছুন" } as const,
  emptyTitle: { en: "No term matches that search", bn: "এই খোঁজায় কোনো শব্দ মেলেনি" } as const,
  emptySub: {
    en: "Try a different word — or ask us and we'll add the definition in both languages.",
    bn: "অন্য শব্দ চেষ্টা করুন — বা সরাসরি জিজ্ঞাসা করুন, দুই ভাষায় সংজ্ঞাটি যোগ করে দেব।",
  } as const,
  emptyReset: { en: "Show all terms", bn: "সব শব্দ দেখান" } as const,
  ctaTitle: { en: "A term we haven't defined?", bn: "কোনো শব্দ বাদ পড়েছে?" } as const,
  ctaCopy: {
    en: "Tell us what confused you — we'll add the definition in both languages and keep this glossary honest.",
    bn: "কোন শব্দটা দোটানায় ফেলল জানান — দুই ভাষায় সংজ্ঞা যোগ করে এই শব্দকোষ সৎ রাখব।",
  } as const,
  ctaBtn: { en: "Ask for a definition", bn: "সংজ্ঞা চান" } as const,
  ctaBtn2: { en: "Read the FAQ instead", bn: "প্রশ্নোত্তর পড়ুন" } as const,
};

type Entry = {
  key: string;
  title: string;
  other: string;
  body: string;
  otherBody: string;
};

export default function GlossaryPage() {
  const { t, lang } = useLanguage();
  const [query, setQuery] = useState("");

  /** full index — titles come from GLOSSARY_LABELS, the "Term — " prefix
   *  is stripped from the definition body (same treatment as the dialog) */
  const entries = useMemo<Entry[]>(() => {
    const strip = (raw: string) => {
      const idx = raw.indexOf("—");
      return idx > 0 ? raw.slice(idx + 1).trim() : raw;
    };
    return Object.entries(GLOSSARY)
      .map(([key, def]) => ({
        key,
        title: GLOSSARY_LABELS[key] ? GLOSSARY_LABELS[key][lang] : key,
        other: GLOSSARY_LABELS[key] ? GLOSSARY_LABELS[key][lang === "bn" ? "en" : "bn"] : key,
        body: strip(def[lang]),
        otherBody: strip(def[lang === "bn" ? "en" : "bn"]),
      }))
      .sort((a, b) => a.title.localeCompare(b.title, lang === "bn" ? "bn" : "en"));
  }, [lang]);

  const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

  const filtered = useMemo(() => {
    const q = norm(query);
    if (!q) return entries;
    return entries.filter(
      (e) =>
        norm(e.title).includes(q) ||
        norm(e.other).includes(q) ||
        norm(e.body).includes(q) ||
        norm(e.otherBody).includes(q)
    );
  }, [entries, query]);

  return (
    <>
      <PageHero
        crumbs={[{ label: { en: "Glossary", bn: "শব্দকোষ" } }]}
        eyebrow={{ en: "GLOSSARY", bn: "শব্দকোষ" }}
        title={GLOSSARY_HUB.title}
        copy={T.heroCopy}
        image="/images/page-glossary.png"
        imageAlt={lang === "bn" ? "খোলা অভিধান ও চশমা" : "An open bilingual dictionary and reading glasses"}
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-nx-cyan-300/40 bg-nx-cyan-500/10 px-3.5 py-1.5 text-[12px] font-bold text-nx-cyan-300">
            <BookMarked className="h-3.5 w-3.5" aria-hidden="true" />
            {t(GLOSSARY_HUB.count(entries.length))}
          </span>
        }
        actions={
          <div className="relative w-full max-w-md">
            <label htmlFor="glossary-page-search" className="sr-only">
              {t(T.searchLabel)}
            </label>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
              aria-hidden="true"
            />
            <input
              id="glossary-page-search"
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
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-nx-navy-700" aria-live="polite">
            {t(T.countLabel(filtered.length, bnNum))}
          </p>
          {query && (
            <button
              onClick={() => setQuery("")}
              className="rounded-full border border-nx-navy-200 px-3 py-1.5 text-xs font-bold text-nx-navy-700 transition-colors hover:bg-nx-navy-50"
            >
              {t(T.clear)}
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-nx-navy-100 bg-white p-10 text-center shadow-[0_14px_40px_-18px_rgba(6,31,74,0.18)]">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-nx-navy-50 text-nx-navy-500">
              <SearchX className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-lg font-extrabold text-nx-navy-900">{t(T.emptyTitle)}</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
              {t(T.emptySub)}
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-5 rounded-full bg-nx-navy-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-nx-navy-600"
            >
              {t(T.emptyReset)}
            </button>
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2">
            {filtered.map((e, i) => (
              <motion.li
                key={e.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26, delay: Math.min(i * 0.035, 0.35) }}
                className="flex h-full flex-col rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)] transition-colors hover:border-nx-cyan-200"
              >
                <h3 className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-lg font-extrabold text-nx-navy-900">
                  {e.title}
                  {/* cross-reference: the same term in the other language */}
                  <span
                    className="rounded-full bg-nx-mist px-2 py-0.5 text-[11px] font-bold text-nx-navy-600"
                    lang={lang === "bn" ? "en" : "bn"}
                  >
                    {e.other}
                  </span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{e.body}</p>
              </motion.li>
            ))}
          </ul>
        )}

        <p className="mt-8 flex items-start justify-center gap-2 text-center text-sm text-slate-500">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {t(GLOSSARY_HUB.footnote)}
        </p>
      </PageBody>

      <CtaBand
        title={T.ctaTitle}
        copy={T.ctaCopy}
        actions={
          <>
            <CyanButton onClick={() => navigateTo("contact")}>
              {t(T.ctaBtn)}
            </CyanButton>
            <OutlineLightButton onClick={() => navigateTo("faq")}>
              {t(T.ctaBtn2)}
            </OutlineLightButton>
          </>
        }
      />
    </>
  );
}
