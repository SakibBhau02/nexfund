"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Eye,
  FileText,
  Lock,
  MessageCircle,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import { useLanguage, type L } from "@/lib/i18n";
import { navigateTo } from "@/lib/page-router";
import { useDialogStore } from "@/lib/dialog-store";
import { CHARTER } from "@/lib/content";
import { bnNum } from "@/lib/format";
import {
  PageHero,
  PageBody,
  CtaBand,
  CyanButton,
  OutlineLightButton,
  SectionHead,
} from "./shell";

/**
 * R10 Charter landing page — the seven published promises as numbered
 * "on the record" articles, each paired with where you can verify it,
 * plus a how-to-hold-us-accountable section. Single page, no detail route.
 */

const T = {
  heroCopy: {
    en: "Not a marketing page — a list of promises you can hold against us. Each commitment below is published, dated and written so you can check us on it.",
    bn: "এটা মার্কেটিং পাতা নয় — লিখিত প্রতিশ্রুতির তালিকা, যার পেছনে জবাবদিহির দরজা খোলা। নিচের প্রতিটি অঙ্গীকার প্রকাশিত ও তারিখভুক্ত — আপনি মিলিয়ে ধরতে পারবেন।",
  },
  heroCta: { en: "Read the seven commitments", bn: "সাতটি প্রতিশ্রুতি পড়ুন" } as const,
  heroCta2: { en: "See the vetting standard", bn: "যাচাই মানদণ্ড দেখুন" } as const,
  articlesEyebrow: { en: "ON THE RECORD", bn: "নথিভুক্ত" } as const,
  articlesTitle: { en: "The seven commitments", bn: "সাতটি প্রতিশ্রুতি" } as const,
  articlesCopy: {
    en: "Each article pairs the promise with where you can verify it. If we ever fall short, quote the article number — we answer for it.",
    bn: "প্রতিটি অঙ্গীকারের সাথে দেওয়া আছে কোথায় মিলিয়ে দেখবেন। কোনোদিন পিছিয়ে গেলে অঙ্গীকার-নম্বর ধরে জিজ্ঞাসা করুন — উত্তর আমাদের দিতেই হবে।",
  } as const,
  article: { en: "Article", bn: "অঙ্গীকার" } as const,
  verifyLabel: { en: "Where to check it", bn: "কোথায় মিলাবেন" } as const,
  holdEyebrow: { en: "ACCOUNTABILITY", bn: "জবাবদিহি" } as const,
  holdTitle: { en: "How to hold us to it", bn: "কীভাবে আমাদের জবাবদিহি করবেন" } as const,
  holdCopy: {
    en: "A charter is only as strong as its enforcement. Here are the three levers you actually have — please use them.",
    bn: "চার্টারের মূল্য তার প্রয়োগে। আপনার হাতে থাকা তিনটি লিভার — ব্যবহার করুন।",
  } as const,
  ctaTitle: { en: "Sign nothing you haven't checked.", bn: "না মিলিয়ে কোনো সই নয়।" } as const,
  ctaCopy: {
    en: "Read the vetting standard, the risk disclosure and the FAQ — then decide whether we've earned your trust the slow way.",
    bn: "যাচাই মানদণ্ড, ঝুঁকি বিবরণী আর প্রশ্নোত্তর পড়ুন — তারপর ঠিক করুন, আস্তে অর্জিত আস্থায় আমরা পৌঁছেছি কি না।",
  } as const,
  ctaBtn: { en: "Read the standard", bn: "মানদণ্ড পড়ুন" } as const,
  ctaBtn2: { en: "Read the risk disclosure", bn: "ঝুঁকি বিবরণী পড়ুন" } as const,
  num: (n: number, bn: (x: number) => string) => ({ en: String(n), bn: bn(n) }) as L,
};

type HoldCard = {
  icon: LucideIcon;
  title: L;
  copy: L;
  cta: L;
  onClick: () => void;
};

/** Per-article elaboration + the page where the promise can be checked. */
const ARTICLES: { elab: L; check: L; onClick: () => void }[] = [
  {
    elab: {
      en: "The five-pillar standard — identity, legal, financial, operations, advisor review — is public, along with the documents we ask for and the red flags we reject for. You don't have to take our word for any listing; you can read the method.",
      bn: "পাঁচ-স্তম্ভের যাচাই-মানদণ্ড — পরিচয়, আইনি, আর্থিক, কার্যক্রম, অ্যাডভাইজার রিভিউ — প্রকাশ্য, সাথে কোন নথিগুলো চাই আর কোন সংকেতে বাতিল করি। কোনো তালিকার জন্য আমাদের কথায় বিশ্বাস করতে হবে না — পদ্ধতিটাই পড়ে নিন।",
    },
    check: { en: "The Vetting Standard page", bn: "যাচাই মানদণ্ডের পাতা" },
    onClick: () => navigateTo("vetting"),
  },
  {
    elab: {
      en: "Registration is free, browsing is free, and every fee that can ever apply — advisory or introduction — is agreed in writing before you sign anything. If a cost wasn't disclosed up front, it doesn't exist.",
      bn: "নিবন্ধন ফ্রি, ঘুরে দেখা ফ্রি — আর যেকোনো ফি (অ্যাডভাইজরি বা ইন্ট্রোডাকশন) কিছুতে সই করানোর আগেই লিখিতভাবে জানানো হয়। শুরুতে না বলা খরচ, সেটা ধরাই হয় না।",
    },
    check: { en: "Fees & costs in the FAQ", bn: "প্রশ্নোত্তরে ফি ও খরচ" },
    onClick: () => navigateTo("faq"),
  },
  {
    elab: {
      en: "Private investments can lose money — all of it. Anyone who promises otherwise is selling you something else. Our job is verified information and honest risk summaries, not predictions.",
      bn: "প্রাইভেট বিনিয়োগে টাকা হারানো যায় — পুরোটাই যায়। যিনি নিশ্চয়তা দেন, তিনি আসলে অন্য কিছু বিক্রি করছেন। আমাদের কাজ যাচাইকৃত তথ্য আর সৎ ঝুঁকি-সারসংক্ষেপ — ভবিষ্যদ্বাণী নয়।",
    },
    check: { en: "The Risk Disclosure page", bn: "ঝুঁকি বিবরণীর পাতা" },
    onClick: () => navigateTo("risk"),
  },
  {
    elab: {
      en: "Every listing carries its key risks in the same view as its numbers — not in a footnote, not after registration. You should meet the downside before the upside.",
      bn: "প্রতিটি তালিকায় সংখ্যার পাশেই থাকে প্রধান ঝুঁকিগুলো — পাদটীকায় নয়, রেজিস্ট্রেশনের পরেও নয়। লাভের আগে ক্ষতির মুখোমুখি হওয়াই ঠিক।",
    },
    check: { en: "Any live listing", bn: "যেকোনো লাইভ তালিকা" },
    onClick: () => navigateTo("opportunities"),
  },
  {
    elab: {
      en: "Your registration details are never sold, never shown to founders without your explicit permission, and the sensitive documents stay behind NDAs in a controlled data room.",
      bn: "আপনার নিবন্ধন-তথ্য কখনো বিক্রি হয় না, আপনার স্পষ্ট অনুমতি ছাড়া প্রতিষ্ঠাতাদের কাছে যায় না, আর সংবেদনশীল নথি থাকে NDA-ঘেরা নিয়ন্ত্রিত ডেটা রুমে।",
    },
    check: { en: "The Privacy Promise page", bn: "গোপনীয়তার প্রতিশ্রুতির পাতা" },
    onClick: () => navigateTo("privacy"),
  },
  {
    elab: {
      en: "If your horizon, ticket or risk appetite doesn't fit an opportunity, we'll say so — even when it costs us the transaction. MatchMe points away from bad fits as often as it points toward good ones.",
      bn: "আপনার মেয়াদ, টিকেট বা ঝুঁকির পছন্দ কোনো সুযোগের সাথে না মিললে আমরা বলি — লেনদেন হারিয়ে হলেও। MatchMe যতটা মানানসই দিকে ইশারা করে, অমানানসই দিক থেকে সরায় ততটাই।",
    },
    check: { en: "MatchMe, in the quiz", bn: "MatchMe — কুইজে" },
    onClick: () => useDialogStore.getState().open("quiz"),
  },
  {
    elab: {
      en: "Contracts, risk summaries, support and meetings — both languages, same meaning, no translation tax on your understanding.",
      bn: "চুক্তি, ঝুঁকি-সারসংক্ষেপ, সাপোর্ট আর বৈঠক — দুই ভাষাতেই, একই অর্থে; বোঝার পথে অনুবাদের কোনো 'কর' নেই।",
    },
    check: { en: "Write to us in either", bn: "যেকোনো ভাষায় লিখুন" },
    onClick: () => navigateTo("contact"),
  },
];

const HOLD_CARDS: HoldCard[] = [
  {
    icon: Eye,
    title: { en: "Check our work", bn: "আমাদের কাজ মিলিয়ে দেখুন" },
    copy: {
      en: "Match every listing against the published standard — the badges, the documents and the risk summaries are all in the open.",
      bn: "প্রতিটি তালিকা মিলিয়ে নিন প্রকাশিত মানদণ্ডের সাথে — ব্যাজ, নথি আর ঝুঁকি-সারসংক্ষেপ সবই খোলা।",
    },
    cta: { en: "Open the standard", bn: "মানদণ্ড খুলুন" },
    onClick: () => navigateTo("vetting"),
  },
  {
    icon: FileText,
    title: { en: "Quote the article number", bn: "অঙ্গীকার-নম্বর ধরে জিজ্ঞাসা" },
    copy: {
      en: "When something feels off, tell us which article we broke. Complaints that quote a number get a written answer — not a form letter.",
      bn: "কিছু খাপ না খেলে জানান কোন অঙ্গীকার ভেঙেছি। নম্বর-ধরা অভিযোগের উত্তর আসে লিখিতভাবে — সাধারণ ফর্ম-চিঠি নয়।",
    },
    cta: { en: "Contact the team", bn: "টিমের সাথে যোগাযোগ" },
    onClick: () => navigateTo("contact"),
  },
  {
    icon: Lock,
    title: { en: "Walk away without a cost", bn: "খরচ ছাড়াই সরে দাঁড়ান" },
    copy: {
      en: "Registration is free, and 'no interest' is a complete answer. If we ever push you, that's a broken promise — report it as one.",
      bn: "নিবন্ধন ফ্রি, আর 'আগ্রহ নেই' একটা পূর্ণ উত্তর। তবু কখনো চাপ দিলে সেটা প্রতিশ্রুতি ভঙ্গ — সেভাবেই জানান।",
    },
    cta: { en: "See what joining costs", bn: "শুরু করতে কী লাগে" },
    onClick: () => navigateTo("get-started"),
  },
];

export default function CharterPage() {
  const { t, lang } = useLanguage();
  const scrollToArticles = () =>
    document.getElementById("charter-articles")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <PageHero
        crumbs={[{ label: { en: "The Charter", bn: "চার্টার" } }]}
        eyebrow={CHARTER.eyebrow}
        title={CHARTER.title}
        copy={T.heroCopy}
        image="/images/page-charter.png"
        imageAlt={
          lang === "bn" ? "দাঁড়িপাল্লা ও চুক্তির কাগজ" : "Brass scales and contract papers"
        }
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-nx-cyan-300/40 bg-nx-cyan-500/10 px-3.5 py-1.5 text-[12px] font-bold text-nx-cyan-300">
            <ScrollText className="h-3.5 w-3.5" aria-hidden="true" />
            {t(CHARTER.version)}
          </span>
        }
        actions={
          <>
            <CyanButton onClick={scrollToArticles}>{t(T.heroCta)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("vetting")}>
              {t(T.heroCta2)}
            </OutlineLightButton>
          </>
        }
      />

      <PageBody>
        {/* the seven commitments */}
        <section id="charter-articles" aria-label={t(T.articlesTitle)}>
          <SectionHead eyebrow={T.articlesEyebrow} title={T.articlesTitle} copy={T.articlesCopy} />
          <ol className="mt-10 space-y-5">
            {CHARTER.items.map((promise, i) => {
              const a = ARTICLES[i];
              return (
                <motion.li
                  key={promise.en}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.06, 0.35), duration: 0.35 }}
                  className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_12px_36px_-20px_rgba(6,31,74,0.2)] md:p-7"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:gap-7">
                    {/* the article number — on the record */}
                    <div className="flex shrink-0 items-center gap-3 md:flex-col md:items-start">
                      <span className="nx-num flex h-12 w-12 items-center justify-center rounded-2xl bg-nx-navy-950 text-lg font-extrabold text-nx-cyan-400">
                        {lang === "bn"
                          ? bnNum(String(i + 1).padStart(2, "0"))
                          : String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="nx-eyebrow text-[10px] font-extrabold tracking-[0.22em] text-nx-navy-500 uppercase md:mt-1">
                        {t(T.article)} {t(T.num(i + 1, bnNum))}
                      </span>
                    </div>

                    {/* the promise + elaboration */}
                    <div className="min-w-0">
                      <h3 className="text-lg leading-snug font-extrabold text-nx-navy-900 md:text-xl">
                        “{t(promise)}”
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-slate-600 md:text-[15px]">
                        {t(a.elab)}
                      </p>
                      <button
                        onClick={a.onClick}
                        className="group mt-4 inline-flex items-center gap-1.5 rounded-full border border-nx-navy-200 bg-white px-4 py-2 text-[13px] font-bold text-nx-navy-700 transition-colors hover:border-nx-navy-400 hover:bg-nx-navy-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
                      >
                        <ShieldCheck className="h-3.5 w-3.5 text-nx-cyan-600" aria-hidden="true" />
                        {t(T.verifyLabel)}: {t(a.check)}
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </section>

        {/* how to hold us accountable */}
        <section aria-label={t(T.holdTitle)} className="mt-16 md:mt-24">
          <SectionHead eyebrow={T.holdEyebrow} title={T.holdTitle} copy={T.holdCopy} />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {HOLD_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.article
                  key={card.title.en}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                  className="flex h-full flex-col rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-nx-cyan-50 text-nx-cyan-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold text-nx-navy-900">{t(card.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(card.copy)}</p>
                  <button
                    onClick={card.onClick}
                    className="mt-auto w-fit pt-5 text-sm font-bold text-nx-cyan-600 transition-colors hover:text-nx-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {t(card.cta)}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </button>
                </motion.article>
              );
            })}
          </div>
        </section>
      </PageBody>

      <CtaBand
        title={T.ctaTitle}
        copy={T.ctaCopy}
        actions={
          <>
            <CyanButton onClick={() => navigateTo("vetting")}>
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              {t(T.ctaBtn)}
            </CyanButton>
            <OutlineLightButton onClick={() => navigateTo("risk")}>
              {t(T.ctaBtn2)}
            </OutlineLightButton>
          </>
        }
      />
    </>
  );
}
