"use client";

/**
 * R10 Insights landing page + full article pages.
 *   #p/insights            → the three long-form guides + why we write + newsletter
 *   #p/insights/<slug>     → full article page (TOC, sections, terms, takeaways)
 * Slugs are the ARTICLES keys in content.ts (same as the home section cards).
 */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  BookOpen,
  CalendarDays,
  Check,
  CircleCheck,
  Clock,
  PenLine,
  Share2,
  ShieldCheck,
} from "lucide-react";
import { useLanguage, type L } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { navigateTo } from "@/lib/page-router";
import {
  INSIGHTS,
  ARTICLES,
  NEWSLETTER,
  READER,
  READERTOC,
  SHARE,
  GLOSSARY_LABELS,
} from "@/lib/content";
import { bnNum } from "@/lib/format";
import { G } from "@/components/site/glossary";
import {
  CtaBand,
  CyanButton,
  DetailHero,
  MetaChip,
  OutlineLightButton,
  PageBody,
  PageHero,
  PageNotFound,
  SectionHead,
} from "./shell";

/* ── bilingual page copy ─────────────────────────────────────────────── */

const T = {
  heroCopy: {
    en: "Long-form, plain-language guides on the decisions that matter — pitch decks, valuation and due diligence, written for Bangladesh. Free to read, in both Bangla and English, with no registration wall.",
    bn: "গুরুত্বপূর্ণ সিদ্ধান্ত নিয়ে দীর্ঘ, সহজ ভাষার গাইড — পিচ ডেক, ভ্যালুয়েশন ও ডিউ ডিলিজেন্স, বাংলাদেশের জন্য লেখা। পড়া বিনামূল্যে, বাংলা ও ইংরেজি দুই ভাষাতেই — কোনো রেজিস্ট্রেশনের দেয়াল নেই।",
  } as const,
  badge: (n: number, minutes: number) =>
    ({
      en: `${n} in-depth guides · ${minutes} min`,
      bn: `${bnNum(n)}টি বিস্তারিত গাইড · ${bnNum(minutes)} মিনিট`,
    }) as L,
  readTime: (n: number): L => ({
    en: `${n} min read`,
    bn: `${bnNum(n)} মিনিট পাঠ`,
  }),
  heroSecondary: { en: "Browse the guides", bn: "গাইডগুলো দেখুন" } as const,
  readGuide: { en: "Read the guide", bn: "গাইডটি পড়ুন" } as const,

  /* why we write */
  whyEyebrow: { en: "WHY WE WRITE", bn: "আমরা কেন লিখি" } as const,
  whyTitle: { en: "Written to be read, not to impress", bn: "পড়ার জন্য লেখা, দেখানোর জন্য নয়" } as const,
  whyCopy: {
    en: "The guides are free because the gap they fill is expensive. Three principles shape every word we publish.",
    bn: "গাইডগুলো বিনামূল্যে, কারণ এগুলো যে শূন্যতা পূরণ করে তার দাম অনেক। আমাদের প্রকাশিত প্রতিটি শব্দ গড়ে তিনটি নীতি।",
  } as const,
  whyCards: [
    {
      icon: ShieldCheck,
      title: { en: "The knowledge gap is the risk gap", bn: "জ্ঞানের ফাঁকই ঝুঁকির ফাঁক" } as L,
      copy: {
        en: "Most money lost in Bangladeshi SME deals is lost to avoidable ignorance, not bad luck. An honest checklist is the cheapest risk control we can hand anyone.",
        bn: "দেশের এসএমই ডিলে হারানো বেশিরভাগ টাকা দুর্ভাগ্যে নয়, এড়ানো-যায় এমন অজ্ঞতায় হারায়। একটা সৎ চেকলিস্টই সবচেয়ে সস্তা ঝুঁকি-নিয়ন্ত্রণ, যা আমরা যে কাউকে দিতে পারি।",
      } as L,
    },
    {
      icon: PenLine,
      title: { en: "The way we advise, in writing", bn: "যেভাবে পরামর্শ দিই, লিখিতভাবে" } as L,
      copy: {
        en: "Each guide is the same explanation we give clients across the table — no jargon walls, no recycled foreign advice that ignores how business is actually done here.",
        bn: "প্রতিটি গাইড টেবিলের ওপারে বসা গ্রাহককে যেভাবে বুঝিয়ে বলি, সেই একই ব্যাখ্যা — জার্গনের দেয়াল নেই, দেশের বাস্তবতা উপেক্ষা করা পুরোনো বিদেশি পরামর্শ নয়।",
      } as L,
    },
    {
      icon: BookOpen,
      title: { en: "Free means free", bn: "বিনামূল্যে মানে বিনামূল্যেই" } as L,
      copy: {
        en: "No email gate, no registration wall — read, share or print, in Bangla or English. The Deal Room is for when you're ready for live, vetted opportunities.",
        bn: "ইমেইলের দরজা নেই, রেজিস্ট্রেশনের দেয়াল নেই — বাংলা বা ইংরেজিতে পড়ুন, শেয়ার করুন, প্রিন্ট করুন। যাচাই-করা সরাসরি সুযোগের জন্য প্রস্তুত হলে ডিল রুম অপেক্ষা করছে।",
      } as L,
    },
  ],

  /* newsletter band */
  newsCopy: {
    en: "The same writing, once a month — new vetted opportunities and honest market notes, straight to your inbox. No noise, unsubscribe anytime.",
    bn: "একই ধারার লেখা, মাসে একবার — নতুন যাচাইকৃত সুযোগ আর সৎ বাজার-নোট, সরাসরি আপনার ইনবক্সে। কোনো কোলাহল নেই, যেকোনো সময় বন্ধ করুন।",
  } as const,
  joinList: { en: "Join the list", bn: "লিস্টে যোগ দিন" } as const,
  browseOpps: { en: "Browse opportunities", bn: "সুযোগসমূহ দেখুন" } as const,

  /* article page */
  freeChip: { en: "Free · no registration", bn: "বিনামূল্যে · নিবন্ধন ছাড়াই" } as const,
  backToGuides: { en: "All guides", bn: "সব গাইড" } as const,
  prevArt: { en: "Previous guide", bn: "পূর্ববর্তী গাইড" } as const,
  nextArt: { en: "Next guide", bn: "পরবর্তী গাইড" } as const,
};

/** glossary term per article category (mirrors the home Insights section) */
const CAT_GLOSSARY: Record<string, string> = {
  "sme-due-diligence-checklist": "due diligence",
  "valuation-basics-for-founders": "valuation",
};

/* ── page ────────────────────────────────────────────────────────────── */

export default function InsightsPage({ detail }: { detail: string | null }) {
  const { t, lang } = useLanguage();

  /* ── full article page ── */
  if (detail) {
    const idx = INSIGHTS.articles.findIndex((a) => a.slug === detail);
    if (idx < 0 || !ARTICLES[detail]) return <PageNotFound page={detail} />;
    return <ArticlePage idx={idx} />;
  }

  /* ── landing ── */
  const totalMinutes = INSIGHTS.articles.reduce((sum, a) => sum + a.minutes, 0);
  const scrollToGuides = () =>
    document.getElementById("insights-guides")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const scrollToNewsletter = () => {
    const input = document.getElementById("footer-newsletter-email");
    (input?.closest("div") ?? input)?.scrollIntoView({ behavior: "smooth", block: "center" });
    input?.focus({ preventScroll: true });
  };

  return (
    <>
      <PageHero
        crumbs={[{ label: { en: "Insights", bn: "ইনসাইটস" } }]}
        eyebrow={INSIGHTS.eyebrow}
        title={INSIGHTS.title}
        copy={T.heroCopy}
        image="/images/insight-dd.png"
        imageAlt={lang === "bn" ? "আর্থিক নথির ওপর ম্যাগনিফাইং গ্লাস" : "Magnifying glass over financial statements"}
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-nx-cyan-300/40 bg-nx-cyan-500/10 px-3.5 py-1.5 text-[12px] font-bold text-nx-cyan-300">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            {t(T.badge(INSIGHTS.articles.length, totalMinutes))}
          </span>
        }
        actions={
          <OutlineLightButton onClick={scrollToGuides}>{t(T.heroSecondary)}</OutlineLightButton>
        }
      />

      {/* ── article cards ── */}
      <PageBody>
        <div id="insights-guides" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {INSIGHTS.articles.map((a, i) => (
            <motion.article
              key={a.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              onClick={(e) => {
                // glossary tooltip triggers are buttons of their own — let them be
                if ((e.target as HTMLElement).closest("button")) return;
                navigateTo("insights", a.slug);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigateTo("insights", a.slug);
                }
              }}
              tabIndex={0}
              role="link"
              aria-label={t(a.title)}
              className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-nx-navy-100 bg-white shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-nx-cyan-200 hover:shadow-[0_28px_56px_-24px_rgba(10,58,143,0.32)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={a.image}
                  alt={t(a.title)}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-nx-navy-900/45 to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-nx-navy-800 backdrop-blur">
                  {CAT_GLOSSARY[a.slug] ? (
                    <G term={CAT_GLOSSARY[a.slug]}>{t(a.category)}</G>
                  ) : (
                    t(a.category)
                  )}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-lg leading-snug font-extrabold text-nx-navy-900 transition-colors group-hover:text-nx-navy-700">
                  {t(a.title)}
                </h2>
                <p className="mt-3 line-clamp-4 pb-5 text-sm leading-relaxed text-slate-600">{t(a.short)}</p>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-nx-navy-100 pt-4">
                  <span className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-600">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {t(T.readTime(a.minutes))}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-nx-navy-700 transition-colors group-hover:text-nx-cyan-600">
                    {t(T.readGuide)}
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </PageBody>

      {/* ── why we write ── */}
      <section aria-label={t(T.whyTitle)} className="bg-nx-mist py-14 md:py-20">
        <div className="mx-auto max-w-[1200px] px-5 md:px-6">
          <SectionHead eyebrow={T.whyEyebrow} title={T.whyTitle} copy={T.whyCopy} />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {T.whyCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title.en}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-18px_rgba(6,31,74,0.15)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-nx-navy-900 text-nx-cyan-400">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-extrabold text-nx-navy-900">{t(card.title)}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{t(card.copy)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── newsletter mention ── */}
      <CtaBand
        title={NEWSLETTER.title}
        copy={T.newsCopy}
        actions={
          <>
            <CyanButton onClick={scrollToNewsletter}>{t(T.joinList)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("opportunities")}>
              {t(T.browseOpps)}
            </OutlineLightButton>
          </>
        }
      />
    </>
  );
}

/* ── full article page ──────────────────────────────────────────────── */

function ArticlePage({ idx }: { idx: number }) {
  const { t, lang } = useLanguage();
  const open = useDialogStore((s) => s.open);
  const openInvestor = useDialogStore((s) => s.openInvestor);
  const reduce = useReducedMotion();
  const card = INSIGHTS.articles[idx];
  const article = ARTICLES[card.slug];
  const prev = idx > 0 ? INSIGHTS.articles[idx - 1] : null;
  const next = idx < INSIGHTS.articles.length - 1 ? INSIGHTS.articles[idx + 1] : null;

  /* ── share (page permalink) — native sheet where available ── */
  const [shareState, setShareState] = useState<"idle" | "copied" | "failed">("idle");
  const shareTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (shareTimer.current) clearTimeout(shareTimer.current);
    },
    []
  );
  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}#p/insights/${card.slug}`;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: document.title, url });
        return;
      } catch {
        // dismissed or failed → fall through to clipboard
      }
    }
    let ok = false;
    try {
      await navigator.clipboard.writeText(url);
      ok = true;
    } catch {
      ok = false;
    }
    setShareState(ok ? "copied" : "failed");
    if (shareTimer.current) clearTimeout(shareTimer.current);
    shareTimer.current = setTimeout(() => setShareState("idle"), 2600);
  };

  /* ── TOC: track the section currently at the top of the viewport ── */
  const secRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSec, setActiveSec] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const secs = secRefs.current;
      let found = 0;
      for (let i = 0; i < secs.length; i++) {
        const s = secs[i];
        if (s && s.getBoundingClientRect().top <= 170) found = i;
      }
      setActiveSec((prev) => (prev === found ? prev : found));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jumpTo = (i: number) => {
    const s = secRefs.current[i];
    if (!s) return;
    const delta = s.getBoundingClientRect().top;
    window.scrollTo({ top: window.scrollY + delta - 90, behavior: reduce ? "auto" : "smooth" });
    setActiveSec(i);
  };

  const updatedDate = new Date(article.updated).toLocaleDateString(
    lang === "bn" ? "bn-BD" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <>
      <DetailHero
        crumbs={[{ label: { en: "Insights", bn: "ইনসাইটস" }, page: "insights" }, { label: card.title }]}
        eyebrow={card.category}
        title={card.title}
        copy={card.short}
        image={card.image}
        imageAlt={t(card.title)}
        meta={
          <>
            <MetaChip icon={<Clock className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t(T.readTime(card.minutes))}
            </MetaChip>
            <MetaChip icon={<CalendarDays className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              <span className="nx-num">
                {t(READER.updatedLabel)} {updatedDate}
              </span>
            </MetaChip>
            <MetaChip icon={<BookOpen className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t(T.freeChip)}
            </MetaChip>
          </>
        }
        actions={
          <OutlineLightButton onClick={share}>
            {shareState === "copied" ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Share2 className="h-4 w-4" aria-hidden="true" />
            )}
            {shareState === "copied"
              ? t(SHARE.linkCopied)
              : shareState === "failed"
                ? t(SHARE.copyFailed)
                : t(SHARE.shareArticle)}
          </OutlineLightButton>
        }
      />

      <PageBody className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_240px]">
          {/* side column first in DOM: TOC rail on top on mobile, right rail on lg */}
          <aside className="lg:col-start-2 lg:row-start-1 lg:sticky lg:top-24 lg:self-start">
            <nav aria-label={t(READERTOC.tocLabel)}>
              <p className="nx-eyebrow mb-2 text-[10px] font-extrabold tracking-[0.14em] text-slate-400 uppercase">
                {t(READERTOC.tocLabel)}
              </p>
              <div className="nx-scroll flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
                {article.sections.map((sec, i) => {
                  const num = String(i + 1).padStart(2, "0");
                  const active = activeSec === i;
                  return (
                    <button
                      key={sec.h.en}
                      type="button"
                      onClick={() => jumpTo(i)}
                      aria-current={active ? "true" : undefined}
                      title={t(sec.h)}
                      className={
                        "nx-num flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-extrabold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-400 lg:w-full lg:rounded-2xl lg:text-left " +
                        (active
                          ? "border-nx-navy-700 bg-nx-navy-700 text-white shadow-[0_8px_18px_-8px_rgba(10,58,143,0.7)]"
                          : "border-nx-navy-200 bg-white text-nx-navy-600 hover:border-nx-cyan-400 hover:text-nx-cyan-700")
                      }
                    >
                      <span className="shrink-0">{lang === "bn" ? bnNum(num) : num}</span>
                      <span className="hidden truncate lg:inline">{t(sec.h)}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </aside>

          {/* main column */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            {/* short answer (AEO box, mirrors the reader dialog) */}
            <div className="rounded-2xl bg-nx-cyan-50 p-5 md:p-6">
              <p className="text-[10px] font-extrabold tracking-[0.14em] text-nx-cyan-700 uppercase">
                {t(INSIGHTS.shortAnswer)}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-nx-ink/80">{t(card.short)}</p>
            </div>

            {/* article body */}
            <div className="mt-10 space-y-10">
              {article.sections.map((sec, i) => {
                const num = String(i + 1).padStart(2, "0");
                return (
                  <section
                    key={sec.h.en}
                    aria-label={t(sec.h)}
                    ref={(el) => {
                      secRefs.current[i] = el;
                    }}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="nx-num text-sm font-extrabold text-nx-cyan-500" aria-hidden="true">
                        {lang === "bn" ? bnNum(num) : num}
                      </span>
                      <h2 className="text-xl leading-snug font-extrabold text-nx-navy-900 md:text-2xl">
                        {t(sec.h)}
                      </h2>
                    </div>
                    {t(sec.body)
                      .split("\n\n")
                      .map((p, j) => (
                        <p key={j} className="mt-3 text-[15px] leading-relaxed text-slate-600">
                          {p}
                        </p>
                      ))}
                    {sec.list && (
                      <ul className="mt-4 space-y-2.5">
                        {sec.list.map((li) => (
                          <li
                            key={li.en}
                            className="flex items-start gap-2.5 text-[15px] leading-relaxed text-slate-600"
                          >
                            <span
                              className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-nx-cyan-500"
                              aria-hidden="true"
                            />
                            {t(li)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                );
              })}
            </div>

            {/* glossary terms */}
            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-nx-navy-100 pt-6">
              <span className="flex items-center gap-1 text-[11px] font-bold tracking-wide text-slate-400 uppercase">
                <BookMarked className="h-3 w-3" aria-hidden="true" />
                {t(READER.termsLabel)}
              </span>
              {article.terms.map((term) => (
                <span
                  key={term}
                  className="rounded-full border border-nx-cyan-200 bg-nx-cyan-50 px-2.5 py-1 text-xs font-bold text-nx-cyan-700"
                >
                  <G term={term}>{t(GLOSSARY_LABELS[term] ?? { en: term, bn: term })}</G>
                </span>
              ))}
            </div>

            {/* key takeaways */}
            <div className="mt-6 rounded-3xl border border-nx-navy-100 bg-nx-mist p-6 md:p-7">
              <p className="text-xs font-extrabold tracking-[0.12em] text-nx-navy-800 uppercase">
                {t(READER.keyTakeawaysTitle)}
              </p>
              <ul className="mt-4 space-y-3">
                {article.takeaways.map((tk) => (
                  <li
                    key={tk.en}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-nx-ink/90"
                  >
                    <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-nx-verified" aria-hidden="true" />
                    {t(tk)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* prev / next */}
        <nav
          aria-label={lang === "bn" ? "গাইড নেভিগেশন" : "Guide navigation"}
          className="mt-14 grid gap-4 border-t border-nx-navy-100 pt-8 sm:grid-cols-2"
        >
          {prev ? (
            <button
              onClick={() => navigateTo("insights", prev.slug)}
              className="group rounded-3xl border border-nx-navy-100 bg-white p-5 text-left transition-all hover:border-nx-navy-300 hover:shadow-[0_14px_30px_-16px_rgba(6,31,74,0.2)]"
            >
              <span className="flex items-center gap-1.5 text-xs font-bold text-nx-navy-500">
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                {t(T.prevArt)}
              </span>
              <span className="mt-1.5 block leading-snug font-extrabold text-nx-navy-900 group-hover:text-nx-navy-700">
                {t(prev.title)}
              </span>
            </button>
          ) : (
            <span aria-hidden="true" />
          )}
          {next && (
            <button
              onClick={() => navigateTo("insights", next.slug)}
              className="group rounded-3xl border border-nx-navy-100 bg-white p-5 text-right transition-all hover:border-nx-navy-300 hover:shadow-[0_14px_30px_-16px_rgba(6,31,74,0.2)] sm:col-start-2"
            >
              <span className="flex items-center justify-end gap-1.5 text-xs font-bold text-nx-navy-500">
                {t(T.nextArt)}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="mt-1.5 block leading-snug font-extrabold text-nx-navy-900 group-hover:text-nx-navy-700">
                {t(next.title)}
              </span>
            </button>
          )}
        </nav>
      </PageBody>

      <CtaBand
        title={READER.nextStepsTitle}
        copy={READER.nextStepsSub}
        actions={
          <>
            <CyanButton onClick={() => openInvestor("investor")}>{t(READER.registerCta)}</CyanButton>
            <OutlineLightButton onClick={() => open("contact")}>
              {t(READER.bookCallCta)}
            </OutlineLightButton>
          </>
        }
      />
    </>
  );
}
