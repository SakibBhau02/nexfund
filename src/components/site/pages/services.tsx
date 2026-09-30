"use client";

/**
 * R10 Services landing page + per-service details pages.
 *   #p/services            → the five advisory services + how engagements work
 *   #p/services/<slug>     → full details page for one service
 * Slugs are derived (kebab-case) from the SERVICES item titles in content.ts,
 * so the page router and the cards can never drift apart.
 */

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Briefcase,
  CalendarRange,
  CircleCheck,
  Clock,
  FileText,
  LineChart,
  PackageCheck,
  PhoneCall,
  Presentation,
  Scale,
  SearchCheck,
  Target,
  Users,
} from "lucide-react";
import { useLanguage, type L } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { navigateTo } from "@/lib/page-router";
import { SERVICES } from "@/lib/content";
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

/* ── service identity ───────────────────────────────────────────────── */

const SVC_ICONS = {
  target: Target,
  scale: Scale,
  chart: LineChart,
  presentation: Presentation,
  search: SearchCheck,
} as const;

/** kebab-case slug derived from the English service title */
function slugFor(titleEn: string): string {
  return titleEn
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Long-form bilingual enrichment for each service details page. */
const EXTRA: Record<
  string,
  { image: string; what: L; who: L; timeline: L; timelineNote: L }
> = {
  "investor-readiness": {
    image: "/images/page-getstarted.png",
    what: {
      en: "We put your business through the same five-pillar review an investor will apply — paperwork, financial quality, operations, governance and the story you tell — then hand you a prioritized gap report. You see your readiness score, what breaks the deal today, and the order to fix things in.",
      bn: "বিনিয়োগকারী যে পাঁচ-স্তম্ভের পর্যালোচনা চালান, আমরা সেই পর্যালোচনা আগেই আপনার ব্যবসায় চালাই — কাগজপত্র, আর্থিক মান, পরিচালনা, গভর্নেন্স এবং আপনার গল্প — তারপর হাতে তুলে দিই অগ্রাধিকার-সাজানো ঘাটতি রিপোর্ট। আপনি দেখেন প্রস্তুতি স্কোর, আজ কোন ঘাটতি ডিল ভাঙছে, আর কোন ক্রমে সেগুলো সারাতে হবে।",
    },
    who: {
      en: "Founders and owner-operators planning to raise capital within the next 6–12 months — especially first-time raisers who want to hear the hard questions in private, not across an investor's table.",
      bn: "আগামী ৬–১২ মাসে পুঁজি তুলতে চান এমন ফাউন্ডার ও মালিক-পরিচালক — বিশেষ করে যাঁরা কঠিন প্রশ্নগুলো বিনিয়োগকারীর টেবিলে নয়, একটু আড়ালে শুনতে চান।",
    },
    timeline: { en: "3–4 weeks", bn: "৩–৪ সপ্তাহ" },
    timelineNote: {
      en: "One discovery session, a document-review week, then a working session where we walk you through the report line by line.",
      bn: "একটি ডিসকভারি সেশন, এক সপ্তাহের নথি-পর্যালোচনা, তারপর একটি ওয়ার্কিং সেশন — রিপোর্টটি লাইন ধরে বুঝিয়ে দিই।",
    },
  },
  "business-valuation": {
    image: "/images/insight-valuation.png",
    what: {
      en: "A valuation built to survive negotiation. We triangulate from comparable deals, earnings quality and the downside case, then show you the range, the method and the assumptions behind every number — so you can defend the figure instead of just quoting it.",
      bn: "আলোচনা সইতে পারে এমন ভ্যালুয়েশন। তুলনাযোগ্য ডিল, আয়ের মান ও ডাউনসাইড কেস মিলিয়ে আমরা রেঞ্জ বের করি, তারপর প্রতিটি সংখ্যার পেছনের পদ্ধতি ও অনুমান দেখাই — যাতে অঙ্কটা শুধু বলতে না পারেন, রক্ষাও করতে পারেন।",
    },
    who: {
      en: "Founders preparing a round who need a defensible number — and owners resolving partner buyouts, family successions or strategic offers on facts rather than feelings.",
      bn: "যে ফাউন্ডাররা রাউন্ডের প্রস্তুতি নিচ্ছেন আর যুক্তিসম্মত সংখ্যা চান — আর যে মালিকরা অংশীদার হস্তান্তর, পারিবারিক উত্তরাধিকার বা কৌশলগত অফার মোকাবিলা করছেন অনুভূতি নয়, তথ্যের ভিত্তিতে।",
    },
    timeline: { en: "2–3 weeks", bn: "২–৩ সপ্তাহ" },
    timelineNote: {
      en: "Two working sessions and one review call — the draft range lands in week two, the defended report in week three.",
      bn: "দুটি ওয়ার্কিং সেশন আর একটি রিভিউ কল — দ্বিতীয় সপ্তাহে খসড়া রেঞ্জ, তৃতীয় সপ্তাহে চূড়ান্ত রিপোর্ট।",
    },
  },
  "financial-modeling-projections": {
    image: "/images/investor-meeting.png",
    what: {
      en: "A working model, not a slideshow of numbers. Three to five years, base and upside — and always the downside — built so you can change an assumption and watch the answer move. No hidden tabs, no black boxes: you keep the model and can interrogate it yourself.",
      bn: "স্লাইডশো নয়, চলমান মডেল। তিন থেকে পাঁচ বছর — বেস ও আপসাইড, আর সবসময় ডাউনসাইডসহ — এমনভাবে বানানো যে একটি অনুমান বদলালেই উত্তর নড়ে। লুকানো ট্যাব নেই, ব্ল্যাক-বক্স নেই: মডেলটি আপনার থেকে যায়, নিজেই প্রশ্ন করতে পারেন।",
    },
    who: {
      en: "Businesses that need credible projections — for a raise, a bank application or a board decision — and are tired of models nobody can explain.",
      bn: "যে ব্যবসার বিশ্বাসযোগ্য প্রজেকশন দরকার — পুঁজি তোলা, ব্যাংক আবেদন বা বোর্ড সিদ্ধান্তের জন্য — আর যারা কারও ব্যাখ্যা করতে না পারা মডেলে ক্লান্ত।",
    },
    timeline: { en: "3–5 weeks", bn: "৩–৫ সপ্তাহ" },
    timelineNote: {
      en: "Runs in weekly cycles — assumptions first, model second, then a sensitivity session where we break it together.",
      bn: "সাপ্তাহিক চক্রে চলে — আগে অনুমান, তারপর মডেল, শেষে একটি সেনসিটিভিটি সেশন, যেখানে আমরা একসাথে মডেলটি ভেঙে দেখি।",
    },
  },
  "pitch-deck-data-room": {
    image: "/images/insight-pitch.png",
    what: {
      en: "We pressure-test your story the way an investor will, then rebuild the deck slide by slide — honest numbers, a clear ask, claims that survive diligence. Then we organize the data room so the review that follows finds confirmation, not surprises.",
      bn: "বিনিয়োগকারী যেভাবে পরীক্ষা করবেন, আমরা সেভাবেই আপনার গল্প যাচাই করি, তারপর স্লাইডে স্লাইডে ডেক সাজাই — সৎ সংখ্যা, স্পষ্ট অনুরোধ, এমন দাবি যা ডিলিজেন্স সইতে পারে। এরপর ডেটা রুম সাজাই, যাতে পরবর্তী পর্যালোচনায় বিস্ময় নয়, নিশ্চয়তাই মেলে।",
    },
    who: {
      en: "Founders about to sit across from investors — first-timers who have never been questioned hard, and veterans whose last deck raised questions it shouldn't have.",
      bn: "যে ফাউন্ডাররা এখন বিনিয়োগকারীর মুখোমুখি বসতে যাচ্ছেন — প্রথমবার যাঁরা কঠিন প্রশ্নের মুখে পড়বেন, আর অভিজ্ঞ যাঁদের আগের ডেক এমন প্রশ্ন তুলেছিল যা তোলার কথা নয়।",
    },
    timeline: { en: "3–4 weeks", bn: "৩–৪ সপ্তাহ" },
    timelineNote: {
      en: "A Q&A preparation session is built in — you rehearse the hard questions with us before you meet them for real.",
      bn: "প্রশ্নোত্তর প্রস্তুতির সেশন অন্তর্ভুক্ত — আসল টেবিলে মিলানোর আগেই আমাদের সাথে কঠিন প্রশ্নের রিহার্সাল।",
    },
  },
  "deal-assessment-support": {
    image: "/images/insight-dd.png",
    what: {
      en: "A second pair of eyes on a deal you're evaluating. We review the documents, prepare the question list an experienced investor would ask, and flag the risks in plain language — then hand the file back. You make the decision; we make sure it's an informed one.",
      bn: "আপনার মূল্যায়নরত ডিলে অভিজ্ঞ দ্বিতীয় একজোড়া চোখ। আমরা নথি পর্যালোচনা করি, অভিজ্ঞ বিনিয়োগকারী যে প্রশ্নগুলো করতেন সেগুলোর তালিকা তৈরি করি, আর ঝুঁকিগুলো সহজ ভাষায় চিহ্নিত করে ফাইল ফেরত দিই। সিদ্ধান্ত আপনার; আমরা শুধু নিশ্চিত করি সেটা তথ্যসমৃদ্ধ।",
    },
    who: {
      en: "Investors — experienced hands short on hours, and careful first-timers who want the documents read before the money moves.",
      bn: "বিনিয়োগকারী — সময়ের অভাবে হিসাব না-মেলানো অভিজ্ঞ হাত, আর সাবধানী নতুন যাঁরা টাকা চলার আগে নথি পড়ে নিতে চান।",
    },
    timeline: { en: "1–2 weeks per deal", bn: "প্রতি ডিলে ১–২ সপ্তাহ" },
    timelineNote: {
      en: "Scales with the document set — we quote the review window after seeing the file list.",
      bn: "নথির পরিমাণ অনুযায়ী সময় — ফাইলের তালিকা দেখে রিভিউ-সময়টা আমরাই জানিয়ে দিই।",
    },
  },
};

/* ── bilingual page copy ─────────────────────────────────────────────── */

const T = {
  heroCopy: {
    en: "Five focused engagements for the two sides of our table — investor readiness, valuation, modeling, decks and deal support. Every one ends in a deliverable you keep: a polished deck, a defensible range, a model you can interrogate, a data room investors trust.",
    bn: "আমাদের টেবিলের দুই পাশের জন্য পাঁচটি কেন্দ্রিভূত এনগেজমেন্ট — ইনভেস্টর রেডিনেস, ভ্যালুয়েশন, মডেলিং, ডেক ও ডিল সাপোর্ট। প্রতিটি শেষ হয় এমন কিছুতে যা আপনার থেকে যায়: ঝকঝকে ডেক, যুক্তিসম্মত ভ্যালুয়েশন রেঞ্জ, প্রশ্ন করা যায় এমন মডেল, বিনিয়োগকারীর আস্থার ডেটা রুম।",
  } as const,
  countBadge: (n: number) =>
    ({
      en: `${n} focused services`,
      bn: `${bnNum(n)}টি কেন্দ্রিভূত সেবা`,
    }) as L,
  viewDetails: { en: "Explore this service", bn: "সেবাটি দেখুন" } as const,
  heroSecondary: { en: "How engagements work", bn: "এনগেজমেন্ট কীভাবে চলে" } as const,

  /* engagement steps */
  engEyebrow: { en: "ENGAGEMENTS", bn: "এনগেজমেন্ট" } as const,
  engTitle: { en: "How an engagement works", bn: "এনগেজমেন্ট কীভাবে চলে" } as const,
  engCopy: {
    en: "No mystery pricing, no open-ended retainers. Every engagement follows the same four steps — and ends in a document you keep.",
    bn: "রহস্যময় দাম নেই, অন্তহীন রিটেইনার নেই। প্রতিটি এনগেজমেন্ট একই চার ধাপে চলে — আর শেষ হয় এমন একটি নথিতে যা আপনার থেকে যায়।",
  } as const,
  engSteps: [
    {
      title: { en: "Intro call", bn: "পরিচিতি কল" } as L,
      copy: {
        en: "Thirty focused minutes — where you are, where you want to be, and whether we are the right help at all. Free, with no obligation.",
        bn: "ত্রিশটি কেন্দ্রিভূত মিনিট — আপনি কোথায় আছেন, কোথায় যেতে চান, আর আমরা আদৌ ঠিক সাহায্য কি না। বিনামূল্যে, কোনো বাধ্যবাধকতা ছাড়াই।",
      } as L,
    },
    {
      title: { en: "Written proposal", bn: "লিখিত প্রস্তাব" } as L,
      copy: {
        en: "Within three business days: scope, timeline and a fixed fee — what's included and what isn't, in writing.",
        bn: "তিন কর্মদিবসের মধ্যে: স্কোপ, সময়সীমা ও স্থির ফি — কী অন্তর্ভুক্ত, কী নয়, সবটাই লিখিতভাবে।",
      } as L,
    },
    {
      title: { en: "The engagement", bn: "কাজের ধারা" } as L,
      copy: {
        en: "Work runs on a weekly rhythm — you always know what's happening this week and what's due next. No black-box consulting.",
        bn: "কাজ চলে সাপ্তাহিক ছন্দে — এই সপ্তাহে কী হচ্ছে, পরের সপ্তাহে কী বাকি, সবসময় জানা থাকে। কোনো ব্ল্যাক-বক্স পরামর্শ নেই।",
      } as L,
    },
    {
      title: { en: "The deliverable", bn: "ডেলিভারেবল" } as L,
      copy: {
        en: "A report, a model, a deck, a data room — signed off, explained line by line, and yours to keep. No follow-on dependency created.",
        bn: "রিপোর্ট, মডেল, ডেক বা ডেটা রুম — সম্পন্ন, লাইন ধরে ব্যাখ্যা করা, আর আপনার থেকে যাওয়া। কোনো পরবর্তী নির্ভরতা তৈরি হয় না।",
      } as L,
    },
  ],
  engHonesty: {
    en: "And if we're not the right fit for your stage, we say so on the intro call — and point you to help that is.",
    bn: "আর আপনার ধাপের জন্য আমরা মানানসই না হলে পরিচিতি কলেই বলে দিই — আর দেখিয়ে দিই কোথায় সঠিক সাহায্য পাবেন।",
  } as const,

  /* details page */
  whatTitle: { en: "What it is", bn: "এটি কী" } as const,
  whoTitle: { en: "Who it's for", bn: "যার জন্য" } as const,
  getsTitle: { en: "What you get", bn: "আপনি যা পাবেন" } as const,
  timelineTitle: { en: "Typical timeline", bn: "সাধারণ সময়সীমা" } as const,
  howTitle: { en: "How to start", bn: "কীভাবে শুরু করবেন" } as const,
  howSteps: [
    { en: "Book the intro call", bn: "পরিচিতি কল বুক করুন" } as L,
    { en: "Review the written proposal", bn: "লিখিত প্রস্তাবটি দেখুন" } as L,
    { en: "First working session begins", bn: "প্রথম কাজের সেশন শুরু" } as L,
  ],
  howNote: {
    en: "One message is enough — we reply within one business day, in Bangla or English.",
    bn: "একটি বার্তাই যথেষ্ট — এক কর্মদিবসের মধ্যে উত্তর, বাংলা বা ইংরেজিতে।",
  } as const,
  prevSvc: { en: "Previous service", bn: "পূর্ববর্তী সেবা" } as const,
  nextSvc: { en: "Next service", bn: "পরবর্তী সেবা" } as const,
  backToServices: { en: "All services", bn: "সব সেবা" } as const,
  feeChip: { en: "Fixed fee, quoted in writing", bn: "স্থির ফি, লিখিতভাবে" } as const,

  /* aside */
  glanceTitle: { en: "At a glance", bn: "এক নজরে" } as const,
  glanceAudience: { en: "Built for", bn: "তৈরি যাদের জন্য" } as const,
  glanceTimeline: { en: "Typical timeline", bn: "সাধারণ সময়সীমা" } as const,
  glanceFee: { en: "Fee basis", bn: "ফি-এর ভিত্তি" } as const,
  glanceFeeValue: { en: "Fixed, in the proposal", bn: "স্থির, প্রস্তাবনায় লেখা" } as const,
  deliverableTitle: {
    en: "Every engagement ends in a deliverable you keep.",
    bn: "প্রতিটি এনগেজমেন্ট শেষ হয় এমন কিছুতে যা আপনার থেকে যায়।",
  } as const,
  deliverableCopy: {
    en: "No dependency is created — you leave with the report, the model or the data room, explained line by line, ready for your next conversation.",
    bn: "কোনো নির্ভরতা তৈরি হয় না — রিপোর্ট, মডেল বা ডেটা রুম হাতে নিয়েই আপনি বেরিয়ে আসেন, লাইন ধরে ব্যাখ্যাসহ, পরের কথোপকথনের জন্য প্রস্তুত।",
  } as const,

  /* CTA bands */
  ctaTitle: { en: "Not sure which service fits?", bn: "কোন সেবাটি মানানসই বুঝতে পারছেন না?" } as const,
  ctaCopy: {
    en: "Book a consultation — tell us where you are, and we'll say honestly whether you need us at all.",
    bn: "পরামর্শ বুক করুন — আপনি কোথায় আছেন বলুন, আর আপনার আদৌ আমাদের দরকার আছে কি না সেটাও সৎভাবে বলে দেব।",
  } as const,
  detailCtaCopy: {
    en: "The first conversation is free — thirty minutes with an advisor, and a written proposal if we're a fit.",
    bn: "প্রথম কথোপকথন বিনামূল্যে — অ্যাডভাইজরের সাথে ত্রিশ মিনিট, আর মানানসই হলে লিখিত প্রস্তাব।",
  } as const,
  readGuides: { en: "Read the guides", bn: "গাইডগুলো পড়ুন" } as const,
};

const STEP_ICONS = [PhoneCall, FileText, CalendarRange, PackageCheck];

/* ── page ────────────────────────────────────────────────────────────── */

export default function ServicesPage({ detail }: { detail: string | null }) {
  const { t, lang } = useLanguage();
  const open = useDialogStore((s) => s.open);

  /* ── details page for one service ── */
  if (detail) {
    const idx = SERVICES.items.findIndex((s) => slugFor(s.title.en) === detail);
    if (idx < 0) return <PageNotFound page={detail} />;
    return <ServiceDetail idx={idx} />;
  }

  /* ── landing ── */
  const scrollToEngagements = () =>
    document.getElementById("svc-engagements")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <PageHero
        crumbs={[{ label: { en: "Services", bn: "সেবাসমূহ" } }]}
        eyebrow={SERVICES.eyebrow}
        title={SERVICES.title}
        copy={T.heroCopy}
        image="/images/about-office.png"
        imageAlt={lang === "bn" ? "নেক্সফান্ড অ্যাডভাইজরি — ঢাকার অফিস" : "NexFund advisory — Dhaka office"}
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-nx-cyan-300/40 bg-nx-cyan-500/10 px-3.5 py-1.5 text-[12px] font-bold text-nx-cyan-300">
            <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
            {t(T.countBadge(SERVICES.items.length))}
          </span>
        }
        actions={
          <>
            <CyanButton onClick={() => open("contact")}>{t(SERVICES.cta)}</CyanButton>
            <OutlineLightButton onClick={scrollToEngagements}>
              {t(T.heroSecondary)}
            </OutlineLightButton>
          </>
        }
      />

      {/* ── service cards ── */}
      <PageBody>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.items.map((svc, i) => {
            const Icon = SVC_ICONS[svc.icon as keyof typeof SVC_ICONS];
            const isInvestor = svc.forWhom === "investor";
            const slug = slugFor(svc.title.en);
            return (
              <motion.article
                key={svc.title.en}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className={
                  "group flex h-full flex-col rounded-3xl border border-nx-navy-100 bg-gradient-to-b from-nx-mist/70 to-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-nx-cyan-200 hover:shadow-[0_24px_48px_-20px_rgba(10,58,143,0.3)] " +
                  (i === 0 ? "md:col-span-2 lg:col-span-1" : "")
                }
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-nx-navy-900 text-nx-cyan-400">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="rounded-full bg-nx-cyan-100 px-3 py-1 text-[11px] font-bold text-nx-cyan-700">
                    {t(SERVICES.forLabel)}{" "}
                    {t(isInvestor ? SERVICES.investor : SERVICES.entrepreneur)}
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-extrabold text-nx-navy-900">
                  {svc.icon === "scale" ? (
                    <G term="valuation">{t(svc.title)}</G>
                  ) : svc.icon === "search" ? (
                    <G term="due diligence">{t(svc.title)}</G>
                  ) : (
                    t(svc.title)
                  )}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(svc.desc)}</p>
                <p className="nx-eyebrow mt-5 text-[10px] font-extrabold tracking-[0.14em] text-slate-400 uppercase">
                  {t(SERVICES.getLabel)}
                </p>
                <ul className="mt-2 flex-1 space-y-1.5">
                  {svc.gets.map((g) => (
                    <li key={g.en} className="flex items-start gap-2 text-[13px] text-nx-ink/80">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-nx-cyan-500" aria-hidden="true" />
                      {t(g)}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigateTo("services", slug)}
                  className="nx-arrow-btn mt-6 inline-flex items-center gap-1.5 self-start text-sm font-bold text-nx-navy-700 transition-colors hover:text-nx-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
                >
                  {t(T.viewDetails)}
                  <span className="nx-arrow">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>
              </motion.article>
            );
          })}
        </div>
      </PageBody>

      {/* ── how engagements work ── */}
      <section id="svc-engagements" aria-labelledby="svc-engagements-title" className="bg-nx-mist py-14 md:py-20">
        <div className="mx-auto max-w-[1200px] px-5 md:px-6">
          <SectionHead eyebrow={T.engEyebrow} title={T.engTitle} copy={T.engCopy} />
          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {T.engSteps.map((step, i) => {
              const Icon = STEP_ICONS[i];
              const num = String(i + 1).padStart(2, "0");
              return (
                <motion.li
                  key={step.title.en}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-18px_rgba(6,31,74,0.15)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-nx-navy-900 text-nx-cyan-400">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="nx-num text-2xl font-extrabold text-nx-navy-200" aria-hidden="true">
                      {lang === "bn" ? bnNum(num) : num}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-extrabold text-nx-navy-900">{t(step.title)}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{t(step.copy)}</p>
                </motion.li>
              );
            })}
          </ol>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-slate-600">
            {t(T.engHonesty)}
          </p>
        </div>
      </section>

      <CtaBand
        title={T.ctaTitle}
        copy={T.ctaCopy}
        actions={
          <>
            <CyanButton onClick={() => open("contact")}>{t(SERVICES.cta)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("insights")}>
              {t(T.readGuides)}
            </OutlineLightButton>
          </>
        }
      />
    </>
  );
}

/* ── details page for a single service ─────────────────────────────── */

function ServiceDetail({ idx }: { idx: number }) {
  const { t, lang } = useLanguage();
  const open = useDialogStore((s) => s.open);
  const svc = SERVICES.items[idx];
  const extra = EXTRA[slugFor(svc.title.en)];
  const isInvestor = svc.forWhom === "investor";
  const Icon = SVC_ICONS[svc.icon as keyof typeof SVC_ICONS];
  const prev = idx > 0 ? SERVICES.items[idx - 1] : null;
  const next = idx < SERVICES.items.length - 1 ? SERVICES.items[idx + 1] : null;

  return (
    <>
      <DetailHero
        crumbs={[{ label: { en: "Services", bn: "সেবাসমূহ" }, page: "services" }, { label: svc.title }]}
        eyebrow={SERVICES.eyebrow}
        title={svc.title}
        copy={svc.desc}
        image={extra.image}
        imageAlt={`${t(svc.title)} — ${lang === "bn" ? "নেক্সফান্ড অ্যাডভাইজরি" : "NexFund advisory"}`}
        meta={
          <>
            <MetaChip icon={<Users className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t(SERVICES.forLabel)} {t(isInvestor ? SERVICES.investor : SERVICES.entrepreneur)}
            </MetaChip>
            <MetaChip icon={<Clock className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t(extra.timeline)}
            </MetaChip>
            <MetaChip icon={<BadgeCheck className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t(T.feeChip)}
            </MetaChip>
          </>
        }
        actions={
          <>
            <CyanButton onClick={() => open("contact")}>{t(SERVICES.cta)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("services")}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t(T.backToServices)}
            </OutlineLightButton>
          </>
        }
      />

      <PageBody className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* main column */}
          <div className="min-w-0 space-y-12">
            <section aria-label={t(T.whatTitle)}>
              <SectionHead eyebrow={{ en: "THE SERVICE", bn: "সেবাটি" }} title={T.whatTitle} />
              <div className="mt-5 flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-nx-navy-900 text-nx-cyan-400">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <p className="leading-relaxed text-slate-600">{t(extra.what)}</p>
              </div>
            </section>

            <section aria-label={t(T.whoTitle)}>
              <SectionHead eyebrow={{ en: "AUDIENCE", bn: "দর্শক" }} title={T.whoTitle} />
              <p className="mt-5 leading-relaxed text-slate-600">{t(extra.who)}</p>
            </section>

            <section aria-label={t(T.getsTitle)}>
              <SectionHead eyebrow={{ en: "DELIVERABLES", bn: "ডেলিভারেবল" }} title={T.getsTitle} />
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {svc.gets.map((g) => (
                  <div
                    key={g.en}
                    className="rounded-2xl border border-nx-navy-100 bg-white p-4 shadow-[0_10px_26px_-18px_rgba(6,31,74,0.18)]"
                  >
                    <CircleCheck className="h-5 w-5 text-nx-verified" aria-hidden="true" />
                    <p className="mt-2.5 text-sm leading-relaxed font-semibold text-nx-navy-800">{t(g)}</p>
                  </div>
                ))}
              </div>
            </section>

            <section aria-label={t(T.timelineTitle)}>
              <SectionHead eyebrow={{ en: "TIMELINE", bn: "সময়সীমা" }} title={T.timelineTitle} />
              <div className="mt-5 rounded-2xl border border-nx-navy-100 bg-white p-6">
                <p className="nx-num text-2xl font-extrabold text-nx-navy-900">{t(extra.timeline)}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(extra.timelineNote)}</p>
              </div>
            </section>

            <section aria-label={t(T.howTitle)}>
              <SectionHead eyebrow={{ en: "GETTING STARTED", bn: "শুরু করা" }} title={T.howTitle} />
              <ol className="mt-5 space-y-3">
                {T.howSteps.map((step, i) => (
                  <li key={step.en} className="flex items-center gap-3 rounded-2xl bg-nx-mist px-4 py-3">
                    <span className="nx-num flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-nx-navy-700 text-[13px] font-extrabold text-white">
                      {lang === "bn" ? bnNum(i + 1) : i + 1}
                    </span>
                    <span className="text-sm font-bold text-nx-navy-800">{t(step)}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{t(T.howNote)}</p>
              <button
                onClick={() => open("contact")}
                className="nx-arrow-btn mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-nx-navy-700 transition-colors hover:text-nx-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
              >
                {t(SERVICES.cta)}
                <span className="nx-arrow">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </section>
          </div>

          {/* side column */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_12px_30px_-18px_rgba(6,31,74,0.2)]">
              <h2 className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-navy-600 uppercase">
                {t(T.glanceTitle)}
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-slate-500">{t(T.glanceAudience)}</dt>
                  <dd className="font-bold text-nx-navy-800">
                    {t(isInvestor ? SERVICES.investor : SERVICES.entrepreneur)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-slate-500">{t(T.glanceTimeline)}</dt>
                  <dd className="nx-num font-bold text-nx-navy-800">{t(extra.timeline)}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-slate-500">{t(T.glanceFee)}</dt>
                  <dd className="font-bold text-nx-navy-800">{t(T.glanceFeeValue)}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-3xl bg-nx-navy-950 nx-navy-grid p-6 text-white">
              <PackageCheck className="h-6 w-6 text-nx-cyan-400" aria-hidden="true" />
              <p className="mt-3 text-base leading-snug font-extrabold">{t(T.deliverableTitle)}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-white/70">{t(T.deliverableCopy)}</p>
              <CyanButton className="mt-5 w-full justify-center" onClick={() => open("contact")}>
                {t(SERVICES.cta)}
              </CyanButton>
            </div>

            <button
              onClick={() => navigateTo("services")}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-nx-navy-200 bg-white px-5 py-3 text-sm font-bold text-nx-navy-800 transition-colors hover:border-nx-navy-400"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t(T.backToServices)}
            </button>
          </aside>
        </div>

        {/* prev / next */}
        <nav
          aria-label={lang === "bn" ? "সেবা নেভিগেশন" : "Service navigation"}
          className="mt-14 grid gap-4 border-t border-nx-navy-100 pt-8 sm:grid-cols-2"
        >
          {prev ? (
            <button
              onClick={() => navigateTo("services", slugFor(prev.title.en))}
              className="group rounded-3xl border border-nx-navy-100 bg-white p-5 text-left transition-all hover:border-nx-navy-300 hover:shadow-[0_14px_30px_-16px_rgba(6,31,74,0.2)]"
            >
              <span className="flex items-center gap-1.5 text-xs font-bold text-nx-navy-500">
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                {t(T.prevSvc)}
              </span>
              <span className="mt-1.5 block font-extrabold text-nx-navy-900 group-hover:text-nx-navy-700">
                {t(prev.title)}
              </span>
            </button>
          ) : (
            <span aria-hidden="true" />
          )}
          {next && (
            <button
              onClick={() => navigateTo("services", slugFor(next.title.en))}
              className="group rounded-3xl border border-nx-navy-100 bg-white p-5 text-right transition-all hover:border-nx-navy-300 hover:shadow-[0_14px_30px_-16px_rgba(6,31,74,0.2)] sm:col-start-2"
            >
              <span className="flex items-center justify-end gap-1.5 text-xs font-bold text-nx-navy-500">
                {t(T.nextSvc)}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="mt-1.5 block font-extrabold text-nx-navy-900 group-hover:text-nx-navy-700">
                {t(next.title)}
              </span>
            </button>
          )}
        </nav>
      </PageBody>

      <CtaBand
        title={T.ctaTitle}
        copy={T.detailCtaCopy}
        actions={
          <>
            <CyanButton onClick={() => open("contact")}>{t(SERVICES.cta)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("insights")}>
              {t(T.readGuides)}
            </OutlineLightButton>
          </>
        }
      />
    </>
  );
}
