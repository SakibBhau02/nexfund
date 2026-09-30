"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Banknote,
  Check,
  ClipboardCheck,
  FileSearch,
  FileText,
  FolderCheck,
  Handshake,
  Languages,
  ListChecks,
  Lock,
  MessageCircle,
  ShieldCheck,
  Timer,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, type L } from "@/lib/i18n";
import { TWO_PATHS } from "@/lib/content";
import { navigateTo } from "@/lib/page-router";
import { useDialogStore } from "@/lib/dialog-store";
import {
  CtaBand,
  CyanButton,
  DetailHero,
  MetaChip,
  OutlineLightButton,
  PageBody,
  PageHero,
  PageNotFound,
} from "./shell";

/**
 * R10 "Who We Serve" landing page + the two audience detail pages.
 *   #p/who-we-serve            → landing: the two paths as rich cards + comparison
 *   #p/who-we-serve/investors  → full investor page (deal-flow, minimums, matching)
 *   #p/who-we-serve/founders   → full founder page (coaching, doc prep, intro)
 * Data: TWO_PATHS (audiences) from content.ts — same facts as the home section.
 */

const T = {
  /* ── landing ── */
  heroBadge: { en: "Two paths · one crossing", bn: "দুই পথ · এক মিলনবিন্দু" } as const,
  heroTitle: { en: "Two audiences. One standard of proof.", bn: "দুই দর্শক। প্রমাণের এক মানদণ্ড।" } as const,
  heroCopy: {
    en: "NexFund serves two audiences with the same discipline: investors who want verified facts before they commit, and entrepreneurs who want their business understood before it is judged.",
    bn: "নেক্সফান্ড একই নিষ্ঠায় দুই দর্শকের সেবা করে: যেসব বিনিয়োগকারী সিদ্ধান্তের আগে যাচাইকৃত তথ্য চান, আর যেসব উদ্যোক্তা চান নিজের ব্যবসা বিচারের আগে ঠিকভাবে বোঝানো হোক।",
  } as const,
  pathsEyebrow: { en: "CHOOSE YOUR SIDE", bn: "আপনার পথ বেছে নিন" } as const,
  invChip: { en: "For new & experienced investors", bn: "নতুন ও অভিজ্ঞ — সব বিনিয়োগকারীর জন্য" } as const,
  fdrChip: { en: "For owners raising capital", bn: "মূলধন তুলছেন এমন মালিকদের জন্য" } as const,
  invCardCta: { en: "Explore the investor path", bn: "বিনিয়োগকারীর পথ দেখুন" } as const,
  fdrCardCta: { en: "Explore the founder path", bn: "উদ্যোক্তার পথ দেখুন" } as const,
  compareEyebrow: { en: "THE SAME CROSSING", bn: "একই মিলনবিন্দু" } as const,
  compareTitle: { en: "Different questions, same discipline", bn: "প্রশ্ন ভিন্ন, নিষ্ঠা এক" } as const,
  compareCopy: {
    en: "Whichever side of the table you sit on, the rules of engagement don't change — here is exactly what does.",
    bn: "টেবিলের যে পাশেই বসুন না কেন, খেলার নিয়ম বদলায় না — বদলায় শুধু আপনার প্রশ্নগুলো।",
  } as const,
  compareRows: [
    {
      label: { en: "First step", bn: "প্রথম ধাপ" } as const,
      inv: { en: "3-minute investor registration", bn: "৩ মিনিটের বিনিয়োগকারী রেজিস্ট্রেশন" } as const,
      fdr: { en: "2-minute readiness check", bn: "২ মিনিটের প্রস্তুতি-যাচাই" } as const,
    },
    {
      label: { en: "What you see first", bn: "প্রথমে যা দেখবেন" } as const,
      inv: { en: "Verified fact-packs & risk summaries", bn: "যাচাইকৃত ফ্যাক্ট-প্যাক ও ঝুঁকি-সারসংক্ষেপ" } as const,
      fdr: { en: "Readiness score & gap report", bn: "প্রস্তুতি স্কোর ও ঘাটতি রিপোর্ট" } as const,
    },
    {
      label: { en: "Who you meet", bn: "যার সাথে পরিচয়" } as const,
      inv: { en: "Growth-ready, verified businesses", bn: "প্রবৃদ্ধিমুখী, যাচাইকৃত ব্যবসা" } as const,
      fdr: { en: "Matched, serious investors", bn: "মানানসই, গুরুত্বপূর্ণ বিনিয়োগকারী" } as const,
    },
  ] as const,
  compareShared: { en: "Always the same on both paths", bn: "দুই পথেই সবসময় একই" } as const,
  compareSharedLine: {
    en: "Fees in writing · bilingual documents · evidence before introductions",
    bn: "লিখিত ফি · দ্বিভাষিক নথি · পরিচয়ের আগে প্রমাণ",
  } as const,
  statement: { en: "Both paths meet at the same place: evidence.", bn: "দুই পথের মিলনস্থল একটাই: প্রমাণ।" } as const,
  ctaTitle: { en: "Ready when you are", bn: "আপনি প্রস্তুত হলেই আমরা আছি" } as const,
  ctaCopy: {
    en: "Take the first step today — a three-minute registration or a conversation with an advisor.",
    bn: "আজই প্রথম ধাপ নিন — তিন মিনিটের নিবন্ধন, বা অ্যাডভাইজরের সাথে কথা।",
  } as const,
  /* ── investors detail ── */
  invHeroTitle: { en: "For Investors", bn: "বিনিয়োগকারীদের জন্য" } as const,
  invHeroEyebrow: { en: "FOR INVESTORS", bn: "বিনিয়োগকারীদের জন্য" } as const,
  invHeroCopy: {
    en: "See real businesses, real documents, real risks — before you commit a single taka. Verified deal-flow, plain-language risk summaries, and a three-step onboarding that respects your time.",
    bn: "প্রতিটি টাকা দেওয়ার আগে দেখুন আসল ব্যবসা, আসল নথি, আসল ঝুঁকি। যাচাইকৃত ডিল-ফ্লো, সহজ ভাষায় ঝুঁকি-সারসংক্ষেপ, আর সময় সম্মান করে চলা তিন ধাপের অনবোর্ডিং।",
  } as const,
  invRegCta: { en: "Start investor registration", bn: "বিনিয়োগকারী রেজিস্ট্রেশন শুরু করুন" } as const,
  invBrowseCta: { en: "Browse live opportunities", bn: "লাইভ সুযোগ দেখুন" } as const,
  invGetEyebrow: { en: "WHAT INVESTORS GET", bn: "বিনিয়োগকারীরা যা পান" } as const,
  invGetTitle: { en: "Facts first, in three parts", bn: "আগে তথ্য — তিন ভাগে" } as const,
  invGetCopy: {
    en: "Not a firehose of listings — a quiet, verified shortlist with the paperwork to back every claim.",
    bn: "প্রচুর তালিকার বন্যা নয় — শান্ত, যাচাইকৃত একটি শর্টলিস্ট, প্রতিটি দাবির পেছনে নথিসহ।",
  } as const,
  invCards: [
    {
      icon: "shield",
      title: { en: "Verified deal-flow", bn: "যাচাইকৃত ডিল-ফ্লো" } as const,
      copy: {
        en: "Curated, not crowded — only a small number of businesses pass the five-stage vetting each cycle. Names stay anonymized until your NDA is signed.",
        bn: "বাছাই করা, ভিড় নয় — প্রতি চক্রে মাত্র অল্প কিছু ব্যবসা পাঁচ-ধাপের যাচাই পাস করে। আপনার NDA সই না হওয়া পর্যন্ত নাম গোপন থাকে।",
      } as const,
    },
    {
      icon: "search",
      title: { en: "Risk summaries in plain language", bn: "সহজ ভাষায় ঝুঁকি-সারসংক্ষেপ" } as const,
      copy: {
        en: "Every listing carries an advisor's risk summary — the material risks in Bangla and English, with the downside scenario always shown, never hidden.",
        bn: "প্রতিটি তালিকার সাথে থাকে অ্যাডভাইজরের ঝুঁকি-সারসংক্ষেপ — বাংলা ও ইংরেজিতে আসল ঝুঁকিগুলো, ডাউনসাইড পরিসর সবসময় দৃশ্যমান, কখনো লুকানো নয়।",
      } as const,
    },
    {
      icon: "list",
      title: { en: "Three-step onboarding", bn: "তিন ধাপের অনবোর্ডিং" } as const,
      copy: {
        en: "Account in thirty seconds, a matching profile, secure verification — then a short advisor call and curated opportunities start arriving.",
        bn: "ত্রিশ সেকেন্ডে অ্যাকাউন্ট, ম্যাচিং প্রোফাইল, সুরক্ষিত যাচাই — তারপর ছোট একটি অ্যাডভাইজার কল, আর বাছাই করা সুযোগ আসতে শুরু করে।",
      } as const,
    },
  ] as const,
  invMinEyebrow: { en: "MINIMUMS & FEES", bn: "সর্বনিম্ন ও ফি" } as const,
  invMinTitle: { en: "The numbers, in writing", bn: "সংখ্যাগুলো, লিখিতভাবে" } as const,
  invMinRows: [
    {
      label: { en: "To register & browse", bn: "রেজিস্ট্রেশন ও দেখা" } as const,
      value: { en: "Free — no fee, no commitment", bn: "ফ্রি — কোনো ফি নেই, বাধ্যবাধকতা নেই" } as const,
    },
    {
      label: { en: "Current ticket range", bn: "বর্তমান টিকেট পরিসর" } as const,
      value: { en: "৳50 lakh – ৳4 crore, varies by opportunity", bn: "৳৫০ লক্ষ – ৳৪ কোটি, সুযোগভেদে ভিন্ন" } as const,
    },
    {
      label: { en: "What we charge", bn: "আমাদের ফি" } as const,
      value: {
        en: "A disclosed introduction fee when a deal completes — never a percentage of your returns",
        bn: "ডিল সম্পন্ন হলে একটি প্রকাশিত ইন্ট্রোডাকশন ফি — আপনার মুনাফার শতাংশ কখনো নয়",
      } as const,
    },
    {
      label: { en: "When you know", bn: "কখন জানবেন" } as const,
      value: { en: "Every fee agreed in writing before anything begins", bn: "প্রতিটি ফি শুরুর আগেই লিখিতভাবে জানানো" } as const,
    },
  ] as const,
  invMatchEyebrow: { en: "HOW MATCHING WORKS", bn: "ম্যাচিং কীভাবে কাজ করে" } as const,
  invMatchTitle: { en: "You set the criteria — you approve every introduction", bn: "মানদণ্ড আপনার, অনুমোদনও প্রতিটি পরিচয়ে আপনারই" } as const,
  invMatchSteps: [
    {
      title: { en: "You register & set criteria", bn: "আপনি রেজিস্টার করেন, মানদণ্ড দেন" } as const,
      copy: {
        en: "Sectors of interest, ticket range, time horizon and risk comfort — five quick questions, no wrong answers.",
        bn: "আগ্রহের খাত, টিকেট রেঞ্জ, সময়সীমা ও ঝুঁকি-স্বাচ্ছন্দ্য — পাঁচটি ছোট প্রশ্ন, কোনো উত্তরই ভুল নয়।",
      } as const,
    },
    {
      title: { en: "A short advisor call", bn: "ছোট একটি অ্যাডভাইজার কল" } as const,
      copy: {
        en: "A human listens to your goals — not a script. This is where the profile becomes a strategy.",
        bn: "একজন মানুষ আপনার লক্ষ্য শোনেন — স্ক্রিপ্ট নয়। এখানেই প্রোফাইল পরিণত হয় কৌশলে।",
      } as const,
    },
    {
      title: { en: "Curated matches arrive", bn: "বাছাই করা ম্যাচ আসে" } as const,
      copy: {
        en: "Anonymized opportunities that fit your criteria reach your inbox — new verified listings reach matching investors first.",
        bn: "আপনার মানদণ্ডে মানানসই বেনামি সুযোগ ইনবক্সে আসে — নতুন যাচাইকৃত তালিকা ম্যাচিং বিনিয়োগকারীর কাছেই আগে পৌঁছায়।",
      } as const,
    },
    {
      title: { en: "You approve, NDA opens the room", bn: "অনুমোদন আপনার, NDA-তে খোলে ডেটা রুম" } as const,
      copy: {
        en: "Interested? You approve the introduction, sign the NDA — and the full data room with the advisor's verification notes unlocks.",
        bn: "আগ্রহ হলে? আপনি পরিচয় অনুমোদন করেন, NDA সই করেন — আর অ্যাডভাইজরের যাচাই-নোটসহ সম্পূর্ণ ডেটা রুম খুলে যায়।",
      } as const,
    },
  ] as const,
  invAsideFacts: { en: "Investor quick facts", bn: "বিনিয়োগকারীর সংক্ষিপ্ত তথ্য" } as const,
  invAsideTalk: { en: "Prefer to talk it through?", bn: "আগে কথা বলে বুঝতে চান?" } as const,
  invAsideTalkCopy: {
    en: "Book a free 20-minute conversation — no pressure, no obligation.",
    bn: "বিনামূল্যে ২০ মিনিটের আলাপ বুক করুন — কোনো চাপ নেই, বাধ্যবাধকতা নেই।",
  } as const,
  invAsideTalkCta: { en: "Book a call", bn: "কল বুক করুন" } as const,
  invBack: { en: "Who we serve", bn: "আমাদের দর্শক" } as const,
  invCtaTitle: { en: "See what's live right now", bn: "এখন কী লাইভ আছে দেখুন" } as const,
  invCtaCopy: {
    en: "Browse the current verified listings — then register to unlock documents and the advisor's verification notes.",
    bn: "বর্তমান যাচাইকৃত তালিকাগুলো দেখুন — তারপর নথি ও অ্যাডভাইজরের যাচাই-নোট আনলক করতে রেজিস্টার করুন।",
  } as const,
  invVettingCta: { en: "How every listing is verified", bn: "প্রতিটি তালিকা কীভাবে যাচাই হয়" } as const,
  /* ── founders detail ── */
  fdrHeroEyebrow: { en: "FOR ENTREPRENEURS", bn: "উদ্যোক্তাদের জন্য" } as const,
  fdrHeroTitle: { en: "For Entrepreneurs", bn: "উদ্যোক্তাদের জন্য" } as const,
  fdrHeroCopy: {
    en: "Get investor-ready. Get in front of the right capital. Readiness coaching, document preparation and a curated introduction — so your business is judged on evidence, not on storytelling.",
    bn: "বিনিয়োগের জন্য প্রস্তুত হোন। সঠিক পুঁজির সামনে দাঁড়ান। প্রস্তুতি কোচিং, ডকুমেন্ট প্রস্তুতি আর সাজানো পরিচয় — যাতে আপনার ব্যবসা বিচার হয় প্রমাণে, গল্পে নয়।",
  } as const,
  fdrRegisterCta: { en: "Start founder registration", bn: "উদ্যোক্তা রেজিস্ট্রেশন শুরু করুন" } as const,
  fdrQuizCta: { en: "Take the 2-minute readiness check", bn: "২ মিনিটের প্রস্তুতি-যাচাই দিন" } as const,
  fdrReadyEyebrow: { en: "READINESS COACHING", bn: "প্রস্তুতি কোচিং" } as const,
  fdrReadyTitle: { en: "Know where you stand, in two minutes", bn: "দুই মিনিটেই জানুন আপনি কোথায় দাঁড়িয়ে" } as const,
  fdrReadyCopy: {
    en: "Ten honest questions, an instant score, and a clear list of what to strengthen — before you spend a single hour chasing investors.",
    bn: "দশটি সৎ প্রশ্ন, সাথে সাথে স্কোর, আর কী শক্ত করতে হবে তার স্পষ্ট তালিকা — বিনিয়োগকারীর পেছনে ঘণ্টা নষ্ট করার আগেই।",
  } as const,
  fdrReadyCards: [
    {
      title: { en: "A score, not a guess", bn: "অনুমান নয়, স্কোর" } as const,
      copy: {
        en: "The 2-minute check scores your readiness across registration, books, ownership, use of funds and team — with what's already working, separately listed.",
        bn: "২ মিনিটের যাচাই নিবন্ধন, হিসাব, মালিকানা, তহবিল পরিকল্পনা ও টিম জুড়ে প্রস্তুতি স্কোর দেয় — যা ইতোমধ্যে ভালো, তা আলাদা করে দেখায়।",
      } as const,
    },
    {
      title: { en: "Honest feedback", bn: "সৎ মতামত" } as const,
      copy: {
        en: "Even when the answer is 'not yet' — especially then. You'll hear it from an advisor, with reasons, not silence.",
        bn: "উত্তর 'এখনো নয়' হলেও — বিশেষ করে তখনই। নীরবতা নয়, কারণসহ অ্যাডভাইজরের কাছ থেকেই শুনবেন।",
      } as const,
    },
    {
      title: { en: "A 12-month roadmap", bn: "১২ মাসের রোডম্যাপ" } as const,
      copy: {
        en: "Gap analysis turned into a sequenced plan with a document checklist — what to fix first, and what can wait.",
        bn: "ঘাটতি বিশ্লেষণ থেকে ধারাবাহিক পরিকল্পনা ও ডকুমেন্ট চেকলিস্ট — আগে কী সারবেন, কী পরে হলে চলবে।",
      } as const,
    },
  ] as const,
  fdrDocsEyebrow: { en: "DOCUMENT PREPARATION", bn: "ডকুমেন্ট প্রস্তুতি" } as const,
  fdrDocsTitle: { en: "The investor-ready program", bn: "ইনভেস্টর-রেডি প্রোগ্রাম" } as const,
  fdrDocsCopy: {
    en: "Valuation, deck, data room — the package that makes serious investors lean in, built with you by our advisors.",
    bn: "ভ্যালুয়েশন, ডেক, ডেটা রুম — গুরুত্বপূর্ণ বিনিয়োগকারীরা যে প্যাকেজে সোজা হয়ে বসেন, আমাদের অ্যাডভাইজারদের সাথে বসে তৈরি।",
  } as const,
  fdrDocsCards: [
    {
      title: { en: "Business valuation", bn: "বিজনেস ভ্যালুয়েশন" } as const,
      copy: {
        en: "A defensible range with methods and assumptions explained — your reference points in every negotiation.",
        bn: "পদ্ধতি ও অনুমানসহ সমর্থনযোগ্য রেঞ্জ — প্রতিটি আলোচনায় আপনার রেফারেন্স পয়েন্ট।",
      } as const,
    },
    {
      title: { en: "Financial model & projections", bn: "ফাইন্যান্সিয়াল মডেল ও প্রজেকশন" } as const,
      copy: {
        en: "3–5 year model with base, upside — and the downside always shown, because investors will look there first.",
        bn: "৩–৫ বছরের মডেল — বেস, আপসাইড আর ডাউনসাইড সবসময় দৃশ্যমান, কারণ বিনিয়োগকারী ওখানেই আগে তাকান।",
      } as const,
    },
    {
      title: { en: "Pitch deck & Q&A prep", bn: "পিচ ডেক ও প্রশ্নোত্তর প্রস্তুতি" } as const,
      copy: {
        en: "An investor-grade deck plus a rehearsal session — the hard questions, asked by a friendly face first.",
        bn: "ইনভেস্টর-গ্রেড ডেক আর একটি রিহার্সাল — কঠিন প্রশ্নগুলো আগে আপন মানুষের মুখেই শুনুন।",
      } as const,
    },
    {
      title: { en: "Structured data room", bn: "সুসংগঠিত ডেটা রুম" } as const,
      copy: {
        en: "Every document an investor needs, indexed and verifiable — trust is built before the meeting starts.",
        bn: "বিনিয়োগকারীর দরকারি প্রতিটি নথি, সূচিকৃত ও যাচাইযোগ্য — বৈঠক শুরুর আগেই আস্থা তৈরি।",
      } as const,
    },
  ] as const,
  fdrServicesCta: { en: "See all advisory services", bn: "সব অ্যাডভাইজরি সেবা দেখুন" } as const,
  fdrIntroEyebrow: { en: "CURATED INTRODUCTION", bn: "সাজানো পরিচয়" } as const,
  fdrIntroTitle: { en: "Introduced with your paperwork in order", bn: "নথিপত্র গুছিয়ে, তবেই পরিচয়" } as const,
  fdrIntroSteps: [
    {
      title: { en: "You apply — about 10 minutes", bn: "আবেদন আপনার — প্রায় ১০ মিনিট" } as const,
      copy: {
        en: "Registration, ownership, recent financials and a first use-of-funds plan. That's the whole ask.",
        bn: "নিবন্ধন, মালিকানা, সাম্প্রতিক আর্থিক বিবরণী আর তহবিল ব্যবহারের প্রাথমিক পরিকল্পনা। এটুকুই প্রয়োজন।",
      } as const,
    },
    {
      title: { en: "Verification makes your case", bn: "যাচাই আপনার পক্ষে জোর দেয়" } as const,
      copy: {
        en: "Five stages of checks turn into badges on your listing — investors meet your business already believing its numbers.",
        bn: "পাঁচ ধাপের যাচাই হয়ে যায় আপনার তালিকার ব্যাজ — বিনিয়োগকারী সংখ্যাগুলো বিশ্বে করেই আপনার ব্যবসার সাথে পরিচিত হন।",
      } as const,
    },
    {
      title: { en: "Matched, serious investors", bn: "মানানসই, গুরুত্বপূর্ণ বিনিয়োগকারী" } as const,
      copy: {
        en: "Introduced by sector, ticket and horizon — with an advisor at the table for term discussions, so clarity replaces pressure.",
        bn: "খাত, টিকেট ও সময়সীমা মিলিয়ে পরিচয় — শর্তের আলোচনায় অ্যাডভাইজার টেবিলে থাকেন, চাপের জায়গায় স্পষ্টতা আনতে।",
      } as const,
    },
  ] as const,
  fdrFundsNote: {
    en: "Money moves directly between parties — we never hold your funds.",
    bn: "অর্থ সরাসরি দুই পক্ষের মধ্যেই লেনদেন হয় — আমরা কখনো গচ্ছিত রাখি না।",
  } as const,
  fdrAsideFacts: { en: "Founder quick facts", bn: "উদ্যোক্তার সংক্ষিপ্ত তথ্য" } as const,
  fdrAsideFactsRows: [
    { label: { en: "Application time", bn: "আবেদনে সময়" } as const, value: { en: "About 10 minutes", bn: "প্রায় ১০ মিনিট" } as const },
    { label: { en: "Readiness check", bn: "প্রস্তুতি-যাচাই" } as const, value: { en: "2 minutes · 10 questions", bn: "২ মিনিট · ১০টি প্রশ্ন" } as const },
    { label: { en: "Verification", bn: "যাচাই" } as const, value: { en: "Typically 2–3 weeks", bn: "সাধারণত ২–৩ সপ্তাহ" } as const },
    { label: { en: "Advisory fees", bn: "অ্যাডভাইজরি ফি" } as const, value: { en: "Agreed in writing, before work begins", bn: "কাজ শুরুর আগেই লিখিতভাবে নির্ধারিত" } as const },
  ] as const,
  fdrCtaTitle: { en: "Start with the two-minute check", bn: "দুই মিনিটের যাচাই দিয়েই শুরু" } as const,
  fdrCtaCopy: {
    en: "Or register straight away — either way, your first conversation with an advisor is free and pressure-free.",
    bn: "বা সরাসরি রেজিস্টার করুন — দুই পথেই অ্যাডভাইজরের সাথে প্রথম কথা বিনামূল্যে, চাপমুক্ত।",
  } as const,
};

/* icons for the data-driven cards */
const INV_ICONS = { shield: ShieldCheck, search: FileSearch, list: ListChecks } as const;

export default function WhoWeServePage({ detail }: { detail: string | null }) {
  if (detail === "investors") return <InvestorsDetail />;
  if (detail === "founders") return <FoundersDetail />;
  if (detail) return <PageNotFound page={detail} />;
  return <Landing />;
}

/* ── Landing ─────────────────────────────────────────────────────────── */

function Landing() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        crumbs={[{ label: { en: "Who We Serve", bn: "আমাদের দর্শক" } }]}
        eyebrow={{ en: "WHO WE SERVE", bn: "আমাদের দর্শক" }}
        title={T.heroTitle}
        copy={T.heroCopy}
        image="/images/investor-meeting.png"
        imageAlt={t({ en: "An investor reviewing verified documents", bn: "যাচাইকৃত নথি পর্যালোচনারত বিনিয়োগকারী" })}
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-nx-cyan-300/40 bg-nx-cyan-500/10 px-3.5 py-1.5 text-[12px] font-bold text-nx-cyan-300">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
            {t(T.heroBadge)}
          </span>
        }
      />

      <PageBody>
        <Head
          id="wvs-paths"
          eyebrow={T.pathsEyebrow}
          title={TWO_PATHS.title}
          copy={TWO_PATHS.sub}
          center
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <AudienceCard which="investor" />
          <AudienceCard which="founder" />
        </div>
      </PageBody>

      {/* comparison + statement (full-bleed mist band) */}
      <section aria-labelledby="wvs-compare" className="bg-nx-mist py-14 md:py-20">
        <div className="mx-auto max-w-[1200px] px-5 md:px-6">
          <Head
            id="wvs-compare"
            eyebrow={T.compareEyebrow}
            title={T.compareTitle}
            copy={T.compareCopy}
            center
          />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-nx-navy-100 bg-white shadow-[0_14px_40px_-18px_rgba(6,31,74,0.18)]"
          >
            {/* header row */}
            <div className="hidden grid-cols-[150px_1fr_1fr] border-b border-nx-navy-100 bg-nx-navy-50/70 sm:grid">
              <span className="px-6 py-4" aria-hidden="true" />
              <span className="px-6 py-4 text-[12px] font-extrabold tracking-wider text-nx-navy-800 uppercase">
                {t(TWO_PATHS.investor.title)}
              </span>
              <span className="px-6 py-4 text-[12px] font-extrabold tracking-wider text-nx-navy-800 uppercase">
                {t(TWO_PATHS.founder.title)}
              </span>
            </div>
            {T.compareRows.map((row) => (
              <div
                key={row.label.en}
                className="grid gap-3 border-b border-nx-navy-100 px-6 py-5 last:border-b-0 sm:grid-cols-[150px_1fr_1fr] sm:gap-6"
              >
                <span className="text-sm font-extrabold text-nx-navy-900">{t(row.label)}</span>
                <span className="text-sm leading-relaxed text-slate-600">
                  <span className="mb-1 block text-[11px] font-bold text-nx-cyan-700 sm:hidden">
                    {t(TWO_PATHS.investor.title)}
                  </span>
                  {t(row.inv)}
                </span>
                <span className="text-sm leading-relaxed text-slate-600">
                  <span className="mb-1 block text-[11px] font-bold text-nx-navy-600 sm:hidden">
                    {t(TWO_PATHS.founder.title)}
                  </span>
                  {t(row.fdr)}
                </span>
              </div>
            ))}
            <div className="border-t border-nx-navy-100 bg-nx-navy-50/70 px-6 py-4">
              <p className="text-[13px] leading-relaxed text-nx-navy-700">
                <span className="font-extrabold">{t(T.compareShared)}: </span>
                {t(T.compareSharedLine)}
              </p>
            </div>
          </motion.div>

          {/* statement */}
          <motion.blockquote
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mx-auto mt-8 max-w-4xl rounded-3xl border-l-4 border-nx-cyan-500 bg-white p-6 shadow-[0_14px_40px_-18px_rgba(6,31,74,0.18)] md:p-8"
          >
            <p className="text-lg leading-relaxed font-bold text-nx-navy-900 md:text-xl">
              “{t(T.statement)}”
            </p>
            <footer className="mt-3 text-[13px] font-semibold text-nx-navy-500">
              {t({ en: "— the NexFund charter, in one line", bn: "— নেক্সফান্ড চার্টার, এক লাইনে" })}
            </footer>
          </motion.blockquote>
        </div>
      </section>

      <CtaBand
        title={T.ctaTitle}
        copy={T.ctaCopy}
        actions={<GetStartedAndContact />}
      />
    </>
  );
}

function AudienceCard({ which }: { which: "investor" | "founder" }) {
  const { t } = useLanguage();
  const data = which === "investor" ? TWO_PATHS.investor : TWO_PATHS.founder;
  const chip = which === "investor" ? T.invChip : T.fdrChip;
  const cta = which === "investor" ? T.invCardCta : T.fdrCardCta;
  const Icon = which === "investor" ? TrendingUp : Handshake;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: which === "investor" ? 0 : 0.08 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-nx-navy-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-nx-cyan-300 hover:shadow-[0_28px_60px_-24px_rgba(10,58,143,0.28)] md:p-8"
    >
      {/* R13: gradient brand accent (side image removed per user feedback) */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
          which === "investor" ? "from-nx-navy-700 to-nx-navy-500" : "from-nx-cyan-600 to-nx-cyan-400"
        )}
      />
      <div className="flex items-center gap-4">
        <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-nx-navy-100 bg-nx-navy-50 text-nx-navy-700 transition-colors group-hover:border-nx-cyan-200 group-hover:bg-nx-cyan-50 group-hover:text-nx-cyan-700">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-nx-navy-50 px-2.5 py-1 text-[12px] font-bold text-nx-navy-600">
            {t(chip)}
          </span>
          <h3 className="mt-1.5 text-2xl font-extrabold text-nx-navy-900">{t(data.title)}</h3>
        </div>
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
      <div className="mt-8 border-t border-nx-navy-100 pt-6">
        <button
          onClick={() => navigateTo("who-we-serve", which === "investor" ? "investors" : "founders")}
          aria-label={t(cta)}
          className="nx-arrow-btn inline-flex items-center gap-2 rounded-full bg-nx-navy-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-nx-navy-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
        >
          {t(cta)}
          <span className="nx-arrow">
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </button>
      </div>
    </motion.article>
  );
}

/* ── Investors detail ─────────────────────────────────────────────────── */

function InvestorsDetail() {
  const { t, lang } = useLanguage();
  const openInvestor = useDialogStore((s) => s.openInvestor);

  return (
    <>
      <DetailHero
        crumbs={[
          { label: { en: "Who We Serve", bn: "আমাদের দর্শক" }, page: "who-we-serve" },
          { label: { en: "For Investors", bn: "বিনিয়োগকারীদের জন্য" } },
        ]}
        eyebrow={T.invHeroEyebrow}
        title={T.invHeroTitle}
        copy={T.invHeroCopy}
        image="/images/hero-tech.png"
        imageAlt={t({ en: "Investor reviewing verified deal-flow on screen", bn: "স্ক্রিনে যাচাইকৃত ডিল-ফ্লো দেখছেন বিনিয়োগকারী" })}
        meta={
          <>
            <MetaChip icon={<ShieldCheck className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t({ en: "Verified fact-packs", bn: "যাচাইকৃত ফ্যাক্ট-প্যাক" })}
            </MetaChip>
            <MetaChip icon={<Banknote className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              <span className="nx-num">{t({ en: "Tickets ৳50 lakh – ৳4 crore", bn: "টিকেট ৳৫০ লক্ষ – ৳৪ কোটি" })}</span>
            </MetaChip>
            <MetaChip icon={<Languages className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t({ en: "Bangla & English documents", bn: "বাংলা ও ইংরেজি নথি" })}
            </MetaChip>
          </>
        }
        actions={
          <>
            <CyanButton onClick={() => openInvestor("investor")}>{t(T.invRegCta)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("opportunities")}>
              {t(T.invBrowseCta)}
            </OutlineLightButton>
          </>
        }
      />

      <PageBody className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-12">
            {/* what investors get */}
            <section aria-labelledby="inv-gets">
              <Head id="inv-gets" eyebrow={T.invGetEyebrow} title={T.invGetTitle} copy={T.invGetCopy} />
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {T.invCards.map((card, i) => {
                  const Icon = INV_ICONS[card.icon];
                  return (
                    <motion.article
                      key={card.title.en}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.07 }}
                      className="h-full rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)]"
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
            </section>

            {/* minimums & fees */}
            <section aria-labelledby="inv-min">
              <Head id="inv-min" eyebrow={T.invMinEyebrow} title={T.invMinTitle} />
              <div className="mt-8 overflow-hidden rounded-3xl border border-nx-navy-100 bg-white shadow-[0_14px_40px_-18px_rgba(6,31,74,0.18)]">
                {T.invMinRows.map((row, i) => (
                  <motion.div
                    key={row.label.en}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="grid gap-1.5 border-b border-nx-navy-100 px-6 py-5 last:border-b-0 sm:grid-cols-[220px_1fr] sm:gap-6 md:px-8"
                  >
                    <span className="text-sm font-extrabold text-nx-navy-900">{t(row.label)}</span>
                    <span className="text-sm leading-relaxed text-slate-600">{t(row.value)}</span>
                  </motion.div>
                ))}
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-slate-500">
                {t({
                  en: "Numbers reflect our demo-company listings and published policies — every real deal restates its own terms in writing.",
                  bn: "সংখ্যাগুলো আমাদের ডেমো-কোম্পানির তালিকা ও প্রকাশ্য নীতির ভিত্তিতে — প্রতিটি প্রকৃত ডিল নিজের শর্ত আলাদাভাবে লিখিতভাবে জানায়।",
                })}
              </p>
            </section>

            {/* how matching works */}
            <section aria-labelledby="inv-match">
              <Head id="inv-match" eyebrow={T.invMatchEyebrow} title={T.invMatchTitle} />
              <ol className="mt-8 space-y-5">
                {T.invMatchSteps.map((step, i) => (
                  <motion.li
                    key={step.title.en}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                    className="flex gap-5"
                  >
                    <span className="nx-num flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-nx-navy-900 text-sm font-extrabold text-nx-cyan-400">
                      {lang === "bn" ? ["১", "২", "৩", "৪"][i] : i + 1}
                    </span>
                    <div className="flex-1 rounded-3xl border border-nx-navy-100 bg-white p-5 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)] md:p-6">
                      <h3 className="text-[16px] font-extrabold text-nx-navy-900">{t(step.title)}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(step.copy)}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </section>
          </div>

          {/* side column */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-nx-navy-950 nx-navy-grid p-6 text-white">
              <p className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-cyan-300 uppercase">
                {t(T.invAsideFacts)}
              </p>
              <ul className="mt-4 space-y-3.5">
                {[
                  { icon: Timer, text: { en: "3-step onboarding · ~3 minutes", bn: "৩ ধাপের অনবোর্ডিং · ~৩ মিনিট" } },
                  { icon: Lock, text: { en: "NDA before any name is revealed", bn: "নাম প্রকাশের আগেই NDA" } },
                  { icon: FileText, text: { en: "Risk summary on every listing", bn: "প্রতিটি তালিকায় ঝুঁকি-সারসংক্ষেপ" } },
                  { icon: Banknote, text: { en: "Never a percentage of your returns", bn: "আপনার মুনাফার শতাংশ কখনো নয়" } },
                ].map((f) => (
                  <li key={f.text.en} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-white/80">
                    <f.icon className="mt-0.5 h-4 w-4 shrink-0 text-nx-cyan-400" aria-hidden="true" />
                    {t(f.text)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_12px_30px_-18px_rgba(6,31,74,0.2)]">
              <p className="text-base font-extrabold text-nx-navy-900">{t(T.invAsideTalk)}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(T.invAsideTalkCopy)}</p>
              <button
                onClick={() => navigateTo("contact")}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-nx-navy-700 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-nx-navy-600"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {t(T.invAsideTalkCta)}
              </button>
            </div>
            <button
              onClick={() => navigateTo("who-we-serve")}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-nx-navy-200 bg-white px-5 py-3 text-sm font-bold text-nx-navy-800 transition-colors hover:border-nx-navy-400"
            >
              <ArrowRight className="h-4 w-4 rotate-180" aria-hidden="true" />
              {t(T.invBack)}
            </button>
          </aside>
        </div>
      </PageBody>

      <CtaBand
        title={T.invCtaTitle}
        copy={T.invCtaCopy}
        actions={
          <>
            <CyanButton onClick={() => openInvestor("investor")}>{t(T.invRegCta)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("vetting")}>
              {t(T.invVettingCta)}
            </OutlineLightButton>
          </>
        }
      />
    </>
  );
}

/* ── Founders detail ─────────────────────────────────────────────────── */

function FoundersDetail() {
  const { t, lang } = useLanguage();
  const openInvestor = useDialogStore((s) => s.openInvestor);
  const open = useDialogStore((s) => s.open);

  return (
    <>
      <DetailHero
        crumbs={[
          { label: { en: "Who We Serve", bn: "আমাদের দর্শক" }, page: "who-we-serve" },
          { label: { en: "For Entrepreneurs", bn: "উদ্যোক্তাদের জন্য" } },
        ]}
        eyebrow={T.fdrHeroEyebrow}
        title={T.fdrHeroTitle}
        copy={T.fdrHeroCopy}
        image="/images/about-office.png"
        imageAlt={t({ en: "Founders preparing their business for investment", bn: "বিনিয়োগের জন্য ব্যবসা গুছিয়ে নিচ্ছেন উদ্যোক্তারা" })}
        meta={
          <>
            <MetaChip icon={<ClipboardCheck className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t({ en: "2-minute readiness check", bn: "২ মিনিটের প্রস্তুতি-যাচাই" })}
            </MetaChip>
            <MetaChip icon={<FolderCheck className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t({ en: "Valuation · deck · data room", bn: "ভ্যালুয়েশন · ডেক · ডেটা রুম" })}
            </MetaChip>
            <MetaChip icon={<Handshake className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t({ en: "Curated introductions", bn: "সাজানো পরিচয়" })}
            </MetaChip>
          </>
        }
        actions={
          <>
            <CyanButton onClick={() => openInvestor("founder")}>{t(T.fdrRegisterCta)}</CyanButton>
            <OutlineLightButton onClick={() => open("quiz")}>{t(T.fdrQuizCta)}</OutlineLightButton>
          </>
        }
      />

      <PageBody className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-12">
            {/* readiness coaching */}
            <section aria-labelledby="fnd-ready">
              <Head id="fnd-ready" eyebrow={T.fdrReadyEyebrow} title={T.fdrReadyTitle} copy={T.fdrReadyCopy} />
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {T.fdrReadyCards.map((card, i) => (
                  <motion.article
                    key={card.title.en}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                    className="h-full rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)]"
                  >
                    <h3 className="text-[17px] font-extrabold text-nx-navy-900">{t(card.title)}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{t(card.copy)}</p>
                  </motion.article>
                ))}
              </div>
              <button
                onClick={() => open("quiz")}
                className="mt-7 inline-flex items-center gap-2 rounded-full border-[1.5px] border-nx-navy-200 bg-white px-6 py-3 text-sm font-bold text-nx-navy-800 transition-all hover:border-nx-cyan-500 hover:text-nx-navy-700"
              >
                {t(TWO_PATHS.founder.cta)}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </section>

            {/* document preparation */}
            <section aria-labelledby="fnd-docs">
              <Head id="fnd-docs" eyebrow={T.fdrDocsEyebrow} title={T.fdrDocsTitle} copy={T.fdrDocsCopy} />
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {T.fdrDocsCards.map((card, i) => (
                  <motion.article
                    key={card.title.en}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    className="flex h-full gap-4 rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-nx-navy-50 text-nx-navy-600">
                      <FileText className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-[16px] font-extrabold text-nx-navy-900">{t(card.title)}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(card.copy)}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
              <button
                onClick={() => navigateTo("services")}
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-nx-cyan-700 underline-offset-4 transition-colors hover:text-nx-cyan-600 hover:underline"
              >
                {t(T.fdrServicesCta)}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </section>

            {/* curated introduction */}
            <section aria-labelledby="fnd-intro">
              <Head id="fnd-intro" eyebrow={T.fdrIntroEyebrow} title={T.fdrIntroTitle} />
              <ol className="mt-8 grid gap-5 md:grid-cols-3">
                {T.fdrIntroSteps.map((step, i) => (
                  <motion.li
                    key={step.title.en}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                    className="h-full rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)]"
                  >
                    <span className="nx-num flex h-11 w-11 items-center justify-center rounded-full bg-nx-navy-900 text-sm font-extrabold text-nx-cyan-400">
                      {lang === "bn" ? ["১", "২", "৩"][i] : i + 1}
                    </span>
                    <h3 className="mt-4 text-[16px] font-extrabold text-nx-navy-900">{t(step.title)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(step.copy)}</p>
                  </motion.li>
                ))}
              </ol>
              <p className="mt-6 flex items-start gap-2.5 rounded-2xl border border-dashed border-nx-warn/50 bg-nx-warn-bg/60 p-4 text-sm leading-relaxed text-nx-ink/80">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-nx-warn" aria-hidden="true" />
                {t(T.fdrFundsNote)}
              </p>
            </section>
          </div>

          {/* side column */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-nx-navy-950 nx-navy-grid p-6 text-white">
              <p className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-cyan-300 uppercase">
                {t(T.fdrAsideFacts)}
              </p>
              <ul className="mt-4 space-y-3.5">
                {T.fdrAsideFactsRows.map((row) => (
                  <li key={row.label.en} className="flex items-start justify-between gap-3 text-[13px] leading-relaxed">
                    <span className="text-white/75">{t(row.label)}</span>
                    <span className="text-right font-bold text-white">{t(row.value)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_12px_30px_-18px_rgba(6,31,74,0.2)]">
              <p className="text-base font-extrabold text-nx-navy-900">{t(T.invAsideTalk)}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(T.invAsideTalkCopy)}</p>
              <button
                onClick={() => navigateTo("contact")}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-nx-navy-700 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-nx-navy-600"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {t(T.invAsideTalkCta)}
              </button>
            </div>
            <button
              onClick={() => navigateTo("who-we-serve")}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-nx-navy-200 bg-white px-5 py-3 text-sm font-bold text-nx-navy-800 transition-colors hover:border-nx-navy-400"
            >
              <ArrowRight className="h-4 w-4 rotate-180" aria-hidden="true" />
              {t(T.invBack)}
            </button>
          </aside>
        </div>
      </PageBody>

      <CtaBand
        title={T.fdrCtaTitle}
        copy={T.fdrCtaCopy}
        actions={
          <>
            <CyanButton onClick={() => openInvestor("founder")}>{t(T.fdrRegisterCta)}</CyanButton>
            <OutlineLightButton onClick={() => open("quiz")}>{t(T.fdrQuizCta)}</OutlineLightButton>
          </>
        }
      />
    </>
  );
}

/* ── shared bits ─────────────────────────────────────────────────────── */

function GetStartedAndContact() {
  const { lang } = useLanguage();
  return (
    <>
      <CyanButton onClick={() => navigateTo("get-started")}>
        {lang === "bn" ? "শুরু করুন" : "Get started"}
      </CyanButton>
      <OutlineLightButton onClick={() => navigateTo("contact")}>
        {lang === "bn" ? "যোগাযোগ" : "Contact us"}
      </OutlineLightButton>
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
