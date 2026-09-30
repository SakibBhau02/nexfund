"use client";

import { motion } from "framer-motion";
import {
  BellOff,
  Calendar,
  FileLock2,
  Inbox,
  Lock,
  MailCheck,
  PhoneCall,
  ShieldCheck,
  SlidersHorizontal,
  Timer,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, type L } from "@/lib/i18n";
import { INVESTOR_DLG } from "@/lib/content";
import { navigateTo } from "@/lib/page-router";
import { useDialogStore } from "@/lib/dialog-store";
import {
  CtaBand,
  CyanButton,
  OutlineLightButton,
  PageBody,
  PageHero,
} from "./shell";

/**
 * R10 "Get Started" landing page — the registration deep-dive.
 *   #p/get-started → the 3-step wizard explained as rich cards, the
 *   after-you-register timeline, trust promises, founder alternative.
 * Data: INVESTOR_DLG (steps, fields, success steps) from content.ts —
 * the page mirrors the real wizard that openInvestor() launches.
 */

const T = {
  heroEyebrow: { en: "GET STARTED", bn: "শুরু করুন" } as const,
  heroTitle: { en: "Three minutes. Three steps. Zero pressure.", bn: "তিন মিনিট। তিনটি ধাপ। কোনো চাপ নেই।" } as const,
  heroCopy: {
    en: "Your first step takes three minutes. Register in three short steps, tell us what you're looking for, and we'll do the matching — you stay in control of every introduction.",
    bn: "প্রথম ধাপে লাগে তিন মিনিট। তিনটি ছোট ধাপে নিবন্ধন করুন, কী খুঁজছেন জানান — বাকিটা আমরা ম্যাচ করি, প্রতিটি পরিচয়ের নিয়ন্ত্রণ আপনার হাতে।",
  } as const,
  heroBadge: { en: "3 steps · ~3 minutes", bn: "৩টি ধাপ · ~৩ মিনিট" } as const,
  startCta: { en: "Start registration", bn: "রেজিস্ট্রেশন শুরু করুন" } as const,
  callCta: { en: "Book a call instead", bn: "বদলে কল বুক করুন" } as const,
  /* section 1 — the three steps */
  stepsEyebrow: { en: "THE REGISTRATION", bn: "রেজিস্ট্রেশন" } as const,
  stepsTitle: { en: "Three short steps, at your pace", bn: "তিনটি ছোট ধাপ, আপনার গতিতেই" } as const,
  stepsCopy: {
    en: "This is the same form our advisors see — every answer shapes your matches. Nothing is required beyond the three steps below.",
    bn: "অ্যাডভাইজাররা একই ফর্ম দেখেন — প্রতিটি উত্তর আপনার ম্যাচ গড়ে দেয়। নিচের তিন ধাপের বাইরে আর কিছুই লাগে না।",
  } as const,
  stepNum: (n: number) =>
    ({
      en: `Step ${n}`,
      bn: `ধাপ ${n === 1 ? "১" : n === 2 ? "২" : "৩"}`,
    }) as const,
  step1Desc: {
    en: "Name, email and mobile — the basics, nothing more. Your preferred language decides how we write to you.",
    bn: "নাম, ইমেইল ও মোবাইল — মৌলিক তথ্য, বাড়তি কিছু নয়। পছন্দের ভাষাই ঠিক করে দেয় আমরা কীভাবে আপনাকে লিখব।",
  } as const,
  step2Desc: {
    en: "Five quick questions — experience, sectors, ticket range, horizon and risk comfort. No answer is wrong; this just helps us match you.",
    bn: "পাঁচটি ছোট প্রশ্ন — অভিজ্ঞতা, খাত, বিনিয়োগের পরিসর, সময়সীমা ও ঝুঁকি-স্বাচ্ছন্দ্য। কোনো উত্তরই ভুল নয়; শুধু আপনার সাথে মিলাতে।",
  } as const,
  step3Desc: {
    en: "We verify identity through a secure process — we never ask for sensitive documents over email.",
    bn: "পরিচয় যাচাই হয় সুরক্ষিত প্রক্রিয়ায় — ইমেইলে আমরা কখনো সংবেদনশীল নথি চাই না।",
  } as const,
  step3Points: [INVESTOR_DLG.consent, INVESTOR_DLG.dataPromise] as const,
  openForm: { en: "Open the registration form", bn: "রেজিস্ট্রেশন ফর্ম খুলুন" } as const,
  /* section 2 — after you register */
  afterEyebrow: { en: "AFTER YOU REGISTER", bn: "রেজিস্ট্রেশনের পরে" } as const,
  afterTitle: { en: "What happens after you register", bn: "রেজিস্টার করার পর যা হয়" } as const,
  afterCopy: {
    en: "No silence, no black box — three things happen, in this order, every time.",
    bn: "কোনো নীরবতা নেই, কোনো আঁধার ঘর নেই — প্রতিবারই এই ক্রমে তিনটি জিনিস ঘটে।",
  } as const,
  afterSteps: [
    {
      when: { en: "Day 1", bn: "১ম দিন" } as const,
      sub: {
        en: "One email, clearly worded, with what happens next.",
        bn: "একটি ইমেইল — পরিষ্কার ভাষায়, পরবর্তী ধাপসহ।",
      } as const,
    },
    {
      when: { en: "Week 1", bn: "১ম সপ্তাহ" } as const,
      sub: {
        en: "Twenty minutes with a human — your goals, your questions, no script.",
        bn: "একজন মানুষের সাথে বিশ মিনিট — আপনার লক্ষ্য, আপনার প্রশ্ন, কোনো স্ক্রিপ্ট নেই।",
      } as const,
    },
    {
      when: { en: "Ongoing", bn: "চলমান" } as const,
      sub: {
        en: "Only verified listings that fit your profile — you approve every introduction.",
        bn: "শুধু আপনার প্রোফাইলের সাথে মানানসই যাচাইকৃত তালিকা — প্রতিটি পরিচয় আপনার অনুমোদনে।",
      } as const,
    },
  ] as const,
  /* section 3 — trust */
  trustEyebrow: { en: "OUR PROMISES", bn: "আমাদের প্রতিশ্রুতি" } as const,
  trustTitle: { en: "Register without risking your privacy", bn: "গোপনীয়তার ঝুঁকি ছাড়াই রেজিস্টার করুন" } as const,
  trustCopy: {
    en: "The same three promises hold at every step — registration, matching, and every introduction after that.",
    bn: "প্রতিটি ধাপেই একই তিনটি প্রতিশ্রুতি — রেজিস্ট্রেশন, ম্যাচিং, আর তার পরের প্রতিটি পরিচয়ে।",
  } as const,
  trustCards: [
    {
      icon: "nda",
      title: { en: "NDA before names", bn: "নামের আগে NDA" } as const,
      copy: {
        en: "Listings stay anonymized until you sign the NDA — your identity receives the same courtesy.",
        bn: "NDA সই না হওয়া পর্যন্ত তালিকা বেনামি থাকে — আপনার পরিচয়ও একই সম্মান পায়।",
      } as const,
    },
    {
      icon: "nospam",
      title: { en: "No spam, ever", bn: "কোনো স্প্যাম নেই, কখনো" } as const,
      copy: {
        en: "Your inbox receives verified opportunities and your advisor's replies — nothing else, and one click stops everything.",
        bn: "আপনার ইনবক্সে আসে যাচাইকৃত সুযোগ আর অ্যাডভাইজারের উত্তর — এছাড়া আর কিছু নয়; এক ক্লিকেই সব বন্ধ।",
      } as const,
    },
    {
      icon: "data",
      title: { en: "You control your data", bn: "ডেটার নিয়ন্ত্রণ আপনার হাতে" } as const,
      copy: {
        en: "Your information is encrypted and shared only with your consent — we ask before anyone sees it.",
        bn: "আপনার তথ্য এনক্রিপ্টেড, শেয়ার হয় কেবল আপনার সম্মতিতে — কেউ দেখার আগে আমরা জিজ্ঞেস করি।",
      } as const,
    },
  ] as const,
  /* founder band */
  founderTitle: { en: "Raising capital instead?", bn: "আপনি কি মূলধন তুলছেন?" } as const,
  founderCopy: {
    en: "Founders register through the same three steps — or begin with the two-minute readiness check and see where you stand.",
    bn: "উদ্যোক্তারা একই তিন ধাপে রেজিস্টার করেন — বা শুরু করুন দুই মিনিটের প্রস্তুতি-যাচাই দিয়ে, দেখুন কোথায় দাঁড়িয়ে আছেন।",
  } as const,
  founderCta: { en: "Register as founder", bn: "উদ্যোক্তা হিসেবে রেজিস্টার" } as const,
  founderQuiz: { en: "Take the readiness check", bn: "প্রস্তুতি-যাচাই দিন" } as const,
  /* CtaBand */
  ctaTitle: { en: "Three minutes now, better decisions after", bn: "এখন তিন মিনিট, পরে ভালো সিদ্ধান্ত" } as const,
  ctaCopy: {
    en: "Register once — verified, matched opportunities find you. Prefer a human first? Book a call and skip the form.",
    bn: "একবার রেজিস্টার করুন — যাচাইকৃত, মানানসই সুযোগ নিজেই খুঁজে পাবেন। আগে মানুষের সাথে কথা বলতে চান? কল বুক করুন, ফর্ম বাদ দিন।",
  } as const,
};

/* step-1/2/3 field labels, straight from the wizard copy */
const STEP_FIELDS: Record<number, L[]> = {
  1: [INVESTOR_DLG.name, INVESTOR_DLG.email, INVESTOR_DLG.phone, INVESTOR_DLG.langPref],
  2: [
    INVESTOR_DLG.experience,
    INVESTOR_DLG.sectors,
    INVESTOR_DLG.ticket,
    INVESTOR_DLG.horizon,
    INVESTOR_DLG.riskComfort,
  ],
};

const STEP_ICONS = [UserRound, SlidersHorizontal, ShieldCheck] as const;
const TRUST_ICONS = { nda: FileLock2, nospam: BellOff, data: Lock } as const;
const AFTER_ICONS = [MailCheck, PhoneCall, Inbox] as const;

export default function GetStartedPage() {
  const { t } = useLanguage();
  const openInvestor = useDialogStore((s) => s.openInvestor);
  const open = useDialogStore((s) => s.open);

  return (
    <>
      <PageHero
        crumbs={[{ label: { en: "Get Started", bn: "শুরু করুন" } }]}
        eyebrow={T.heroEyebrow}
        title={T.heroTitle}
        copy={T.heroCopy}
        image="/images/page-getstarted.png"
        imageAlt={t({ en: "Hands on a laptop showing an investment dashboard", bn: "ইনভেস্টমেন্ট ড্যাশবোর্ডসহ ল্যাপটপে হাত" })}
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-nx-cyan-300/40 bg-nx-cyan-500/10 px-3.5 py-1.5 text-[12px] font-bold text-nx-cyan-300">
            <Timer className="h-3.5 w-3.5" aria-hidden="true" />
            {t(T.heroBadge)}
          </span>
        }
        actions={
          <>
            <CyanButton onClick={() => openInvestor()}>{t(T.startCta)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("contact")}>
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {t(T.callCta)}
            </OutlineLightButton>
          </>
        }
      />

      <PageBody>
        {/* the three registration steps */}
        <section aria-labelledby="gs-steps">
          <Head id="gs-steps" eyebrow={T.stepsEyebrow} title={T.stepsTitle} copy={T.stepsCopy} center />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {INVESTOR_DLG.steps.map((stepTitle, i) => {
              const Icon = STEP_ICONS[i];
              const n = i + 1;
              return (
                <motion.li
                  key={stepTitle.en}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative flex h-full flex-col rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-nx-cyan-300 hover:shadow-[0_22px_44px_-18px_rgba(6,31,74,0.28)] md:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-nx-navy-900 text-nx-cyan-400">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="nx-num rounded-full bg-nx-navy-50 px-3.5 py-1.5 text-[15px] font-extrabold tracking-[0.14em] text-nx-navy-600">
                      {n === 1 ? "01" : n === 2 ? "02" : "03"}
                    </span>
                  </div>
                  <p className="mt-5 text-[11px] font-extrabold tracking-[0.22em] text-nx-navy-400 uppercase">
                    {t(T.stepNum(n))}
                  </p>
                  <h3 className="mt-1.5 text-xl font-extrabold text-nx-navy-900">{t(stepTitle)}</h3>
                  {n === 1 && (
                    <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-nx-cyan-50 px-3 py-1 text-[12px] font-bold text-nx-cyan-700">
                      <Timer className="h-3.5 w-3.5" aria-hidden="true" />
                      {t(INVESTOR_DLG.step1Time)}
                    </span>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {t(n === 1 ? T.step1Desc : n === 2 ? T.step2Desc : T.step3Desc)}
                  </p>
                  {/* fields / options */}
                  {STEP_FIELDS[n] ? (
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label={t({ en: "Fields in this step", bn: "এই ধাপের ঘরগুলো" })}>
                      {STEP_FIELDS[n].map((f) => (
                        <li
                          key={f.en}
                          className="rounded-full border border-nx-navy-100 bg-nx-navy-50/70 px-3 py-1 text-[12px] font-semibold text-nx-navy-700"
                        >
                          {t(f)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="mt-5 space-y-2.5">
                      {T.step3Points.map((p) => (
                        <li key={p.en} className="flex items-start gap-2 text-[13px] leading-relaxed text-slate-600">
                          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-nx-verified" aria-hidden="true" />
                          {t(p)}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              );
            })}
          </ol>
          <div className="mt-10 text-center">
            <CyanButton onClick={() => openInvestor()}>{t(T.openForm)}</CyanButton>
          </div>
        </section>
      </PageBody>

      {/* after you register — timeline */}
      <section aria-labelledby="gs-after" className="bg-nx-mist py-14 md:py-20">
        <div className="mx-auto max-w-[1200px] px-5 md:px-6">
          <Head id="gs-after" eyebrow={T.afterEyebrow} title={T.afterTitle} copy={T.afterCopy} center />
          <ol className="relative mx-auto mt-12 max-w-3xl">
            <span
              aria-hidden="true"
              className="absolute bottom-8 left-[23px] top-8 w-px bg-gradient-to-b from-nx-navy-200 via-nx-cyan-300 to-nx-navy-200"
            />
            {INVESTOR_DLG.successSteps.map((s, i) => {
              const Icon = AFTER_ICONS[i];
              return (
                <motion.li
                  key={s.en}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative flex gap-5 pb-6 last:pb-0"
                >
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-nx-navy-900 text-nx-cyan-400 ring-8 ring-nx-mist">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="flex-1 rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)]">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-[17px] font-extrabold text-nx-navy-900">{t(s)}</h3>
                      <span className="rounded-full bg-nx-cyan-50 px-3 py-1 text-[11px] font-extrabold tracking-wide text-nx-cyan-700 uppercase">
                        {t(T.afterSteps[i].when)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(T.afterSteps[i].sub)}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>

          {/* trust promises */}
          <div className="mx-auto mt-16 max-w-[1200px]">
            <Head id="gs-trust" eyebrow={T.trustEyebrow} title={T.trustTitle} copy={T.trustCopy} center />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {T.trustCards.map((card, i) => {
                const Icon = TRUST_ICONS[card.icon];
                return (
                  <motion.article
                    key={card.title.en}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                    className="h-full rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)] md:p-7"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-nx-cyan-50 text-nx-cyan-700">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-[17px] font-extrabold text-nx-navy-900">{t(card.title)}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{t(card.copy)}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>

          {/* founder alternative band */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative mx-auto mt-14 overflow-hidden rounded-3xl bg-nx-navy-950 nx-navy-grid p-8 text-center md:p-10"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-nx-cyan-500/[0.14] blur-3xl"
            />
            <h3 className="relative text-xl font-extrabold text-white md:text-2xl">{t(T.founderTitle)}</h3>
            <p className="relative mx-auto mt-3 max-w-xl leading-relaxed text-white/70">{t(T.founderCopy)}</p>
            <div className="relative mt-7 flex flex-wrap items-center justify-center gap-3">
              <OutlineLightButton onClick={() => openInvestor("founder")}>
                {t(T.founderCta)}
              </OutlineLightButton>
              <OutlineLightButton onClick={() => open("quiz")}>
                {t(T.founderQuiz)}
              </OutlineLightButton>
            </div>
          </motion.div>
        </div>
      </section>

      <CtaBand
        title={T.ctaTitle}
        copy={T.ctaCopy}
        actions={
          <>
            <CyanButton onClick={() => openInvestor()}>{t(T.startCta)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("contact")}>{t(T.callCta)}</OutlineLightButton>
          </>
        }
      />
    </>
  );
}

/** SectionHead look-alike that attaches the id to the h2, so each
 *  <section aria-labelledby> on this page resolves to a real heading. */
function Head({
  id,
  eyebrow,
  title,
  copy,
  center,
}: {
  id: string;
  eyebrow?: L | string;
  title: L | string;
  copy?: L | string;
  center?: boolean;
}) {
  const { t } = useLanguage();
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <p className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-navy-600 uppercase">
          {t(eyebrow)}
        </p>
      )}
      <h2 id={id} className="mt-3 text-2xl leading-tight font-extrabold text-nx-navy-900 md:text-[2rem]">
        {t(title)}
      </h2>
      {copy && <p className="mt-4 leading-relaxed text-slate-600">{t(copy)}</p>}
    </div>
  );
}
