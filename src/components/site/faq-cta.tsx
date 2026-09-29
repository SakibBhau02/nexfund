"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BookMarked,
  Languages,
  Search,
  SearchX,
  X,
} from "lucide-react";
import { useLanguage, type Lang } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { FAQ, FAQS, FINAL_CTA, GLOSSARY_LABELS } from "@/lib/content";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./brand";
import { Reveal } from "./reveal";
import { G } from "./glossary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ── R6: FAQ live search helpers ─────────────────────────────────────────── */

/** Local bilingual microcopy (not in FAQS — content.ts is off-limits this round).
 *  Same words as the section's existing "Talk to us →" footer link. */
const TALK_CTA = { en: "Talk to us →", bn: "আমাদের সাথে কথা বলুন →" } as const;

/** Lowercase + collapse whitespace for matching. Bangla has no letter case,
 *  so the lowercase step is a harmless no-op there (blueprint §10: search both). */
const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

/** Module-scope query state — survives the BN⇄EN cross-fade remount
 *  (page.tsx keys every section by lang; same wart R5-CMP fixed for the
 *  compare shortlist by lifting it into the store — this one stays local). */
let savedQuery = "";

/** Escape regex metacharacters so queries like "(", "[" or "a+" split safely. */
function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Wrap every case-insensitive occurrence of `query` in `text` with a subtle
 * cyan <mark>. Called with the currently-displayed language's copy only —
 * the glossary G-chips are rendered separately and stay untouched. Returns
 * the plain text when the query is empty (zero cost on the default view).
 * The `lang` param makes the displayed-language contract explicit at call
 * sites; the match itself is always case-insensitive ("gi") — Bangla script
 * has no letter case, so the flag is a no-op there.
 */
function highlight(text: string, query: string, lang: Lang): ReactNode {
  void lang;
  const needle = query.trim();
  if (!needle) return text;
  try {
    // split-with-capture alternates: odd indices are the captured matches
    const parts = text.split(new RegExp(`(${escapeRegExp(needle)})`, "gi"));
    if (parts.length === 1) return text;
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <mark key={i} className="rounded bg-nx-cyan-100/70 px-0.5 text-nx-navy-900">
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  } catch {
    return text; // escaped queries can't throw — belt & braces, never crash the UI
  }
}

export function Faq() {
  const { t, lang } = useLanguage();
  const open = useDialogStore((s) => s.open);
  const reduce = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(savedQuery);

  const queryActive = query.trim() !== "";

  /* Bilingual live filter: the query matches q/a of BOTH languages plus the
     glossary term keys — plain substring, no fuzzy transliteration (the
     empty state covers the rest). */
  const filtered = useMemo(() => {
    const q = norm(query);
    if (!q) return FAQ.items;
    return FAQ.items.filter((item) =>
      [
        item.q.en,
        item.q.bn,
        item.a.en,
        item.a.bn,
        item.terms?.join(" ") ?? "",
      ].some((hay) => norm(hay).includes(q)),
    );
  }, [query]);

  const updateQuery = (q: string) => {
    setQuery(q);
    savedQuery = q;
  };

  const clearQuery = () => {
    updateQuery("");
    inputRef.current?.focus();
  };

  return (
    <section id="faq" className="bg-white py-20 md:py-24" aria-labelledby="faq-title">
      <div className="mx-auto max-w-[820px] px-5 md:px-6">
        <Reveal>
          <SectionHeading eyebrow={t(FAQ.eyebrow)} title={t(FAQ.title)} />
        </Reveal>

        {/* R6: bilingual live search */}
        <Reveal delay={0.03}>
          <div className="mx-auto mt-8 max-w-xl md:mt-10">
            <form
              role="search"
              aria-label={t(FAQS.label)}
              onSubmit={(e) => e.preventDefault()}
              className="relative"
            >
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => updateQuery(e.target.value)}
                placeholder={t(FAQS.placeholder)}
                aria-label={t(FAQS.label)}
                autoComplete="off"
                enterKeyHint="search"
                spellCheck={false}
                className="h-12 w-full rounded-full border border-nx-navy-200 bg-white pl-11 pr-12 text-sm font-medium text-nx-navy-900 shadow-sm outline-none transition-all duration-200 placeholder:font-normal placeholder:text-slate-400 hover:border-nx-navy-300 focus-visible:border-nx-cyan-400 focus-visible:ring-2 focus-visible:ring-nx-cyan-200"
              />
              <AnimatePresence>
                {query !== "" && (
                  <motion.button
                    type="button"
                    onClick={clearQuery}
                    aria-label={t(FAQS.clear)}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.16 }}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-nx-navy-50 hover:text-nx-navy-700"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </motion.button>
                )}
              </AnimatePresence>
            </form>
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 px-2">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                <Languages className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                {t(FAQS.searchBoth)}
              </p>
              {/* persistent live region → reliable SR announcements on every keystroke */}
              <span role="status" aria-live="polite">
                {queryActive && (
                  <span className="inline-flex items-center rounded-full border border-nx-cyan-200 bg-nx-cyan-50 px-3 py-1 text-[11px] font-bold text-nx-cyan-700">
                    {t(FAQS.count(filtered.length))}
                  </span>
                )}
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          {queryActive && filtered.length === 0 ? (
            /* R6: no-match empty state — same dashed-card pattern as the
               opportunities list (honest about what's missing + a way out) */
            <div className="mx-auto mt-6 max-w-md rounded-3xl border border-dashed border-nx-navy-200 bg-white p-8 text-center md:p-10">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-nx-cyan-50">
                <SearchX className="h-7 w-7 text-nx-cyan-600" aria-hidden="true" />
              </span>
              <p className="mt-4 text-lg font-extrabold text-nx-navy-900">{t(FAQS.emptyTitle)}</p>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
                {t(FAQS.emptySub)}
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={clearQuery}
                  className="rounded-full border border-nx-navy-200 bg-white px-6 py-3 text-sm font-bold text-nx-navy-700 transition-colors hover:border-nx-cyan-400 hover:text-nx-cyan-700"
                >
                  {t(FAQS.clear)}
                </button>
                <button
                  type="button"
                  onClick={() => open("contact")}
                  className="rounded-full bg-nx-navy-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-nx-navy-600"
                >
                  {t(TALK_CTA)}
                </button>
              </div>
            </div>
          ) : (
            <Accordion type="single" collapsible className="mt-6 space-y-3 md:mt-8">
              {filtered.map((item) => (
                <AccordionItem
                  key={item.q.en}
                  value={item.q.en}
                  className={cn(
                    "rounded-2xl border border-nx-navy-100 bg-nx-mist/40 px-5 transition-all duration-200",
                    "hover:-translate-y-0.5 hover:border-nx-cyan-400 hover:shadow-[0_14px_34px_-20px_rgba(10,58,143,0.35)]",
                    "data-[state=open]:border-nx-cyan-200 data-[state=open]:bg-white data-[state=open]:shadow-[0_18px_40px_-22px_rgba(10,58,143,0.3)]",
                    // filtered mode: subtle cyan spine marks "this list is narrowed"
                    queryActive &&
                      "border-l-4 border-l-nx-cyan-400 data-[state=open]:border-l-nx-cyan-400",
                  )}
                >
                  <AccordionTrigger className="rounded-2xl py-4 text-left text-[15px] font-bold text-nx-navy-900 transition-colors hover:no-underline hover:text-nx-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-400 md:text-base">
                    {highlight(t(item.q), query, lang)}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 leading-relaxed text-slate-600">
                    {highlight(t(item.a), query, lang)}
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
          )}
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
