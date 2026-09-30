"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Ban,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  FileText,
  Fingerprint,
  Info,
  LineChart,
  ListChecks,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useLanguage, type L } from "@/lib/i18n";
import { navigateTo } from "@/lib/page-router";
import { VETTING } from "@/lib/content";
import { bnNum } from "@/lib/format";
import {
  PageHero,
  PageBody,
  CtaBand,
  CyanButton,
  OutlineLightButton,
  DetailHero,
  MetaChip,
  PageNotFound,
  SectionHead,
} from "./shell";

/**
 * R10 Vetting Standard — landing + per-pillar detail pages.
 *   #p/vetting            → the five pillars, red-flag list, CTA
 *   #p/vetting/<slug>     → one pillar: what we check, documents,
 *                           red flags, why it matters, prev/next nav
 * Pillar slugs match VETTING.stages keys in content.ts.
 */

const T = {
  heroCopy: {
    en: "Every business on NexFund passes a five-pillar review before any investor sees it. No pillar can be skipped, and any one of them can end the review. If a fact can't be verified, it doesn't get published.",
    bn: "নেক্সফান্ডের প্রতিটি ব্যবসা বিনিয়োগকারীর সামনে আসার আগে পাঁচ-স্তম্ভের যাচাই পাস করে। কোনো স্তম্ভ বাদ দেওয়ার সুযোগ নেই, আবার যেকোনো একটিই পুরো রিভিউ শেষ করে দিতে পারে। যে তথ্য যাচাই করা যায় না, সেটা প্রকাশই হয় না।",
  },
  badge: { en: "5 pillars · 1 standard", bn: "৫টি স্তম্ভ · একটি মানদণ্ড" } as const,
  heroCta: { en: "Explore the five pillars", bn: "পাঁচটি স্তম্ভ দেখুন" } as const,
  heroCta2: { en: "See who passed", bn: "যারা পাস করেছে" } as const,
  pillarsEyebrow: { en: "THE FIVE PILLARS", bn: "পাঁচটি স্তম্ভ" } as const,
  pillarsTitle: {
    en: "What every business must pass",
    bn: "প্রতিটি ব্যবসাকে যা পাস করতেই হয়",
  } as const,
  pillarsCopy: {
    en: "Identity, legal standing, financial health, operations and an independent advisor review — five separate gates, walked in order, with no exceptions and no shortcuts.",
    bn: "পরিচয়, আইনি অবস্থান, আর্থিক সুস্থতা, কার্যক্রম আর স্বাধীন অ্যাডভাইজার রিভিউ — পাঁচটি আলাদা দরজা, ক্রম মেনে, কোনো ব্যতিক্রম বা শর্টকাট ছাড়াই।",
  } as const,
  readPillar: { en: "Read the pillar in detail", bn: "স্তম্ভটি বিস্তারিত পড়ুন" } as const,
  flagsEyebrow: { en: "WHAT GETS REJECTED", bn: "যা বাতিল হয়" } as const,
  flagsTitle: {
    en: "Some things end the review on the spot",
    bn: "কিছু বিষয় দেখলেই রিভিউ শেষ",
  } as const,
  flagsCopy: {
    en: "These are disqualifiers, not negotiation points. When we find one, the listing stops — whatever the sector, whatever the size of the raise.",
    bn: "এগুলো দর-কষাকষির বিষয় নয়, অযোগ্যতার কারণ। একটি পেলেই তালিকা থেমে যায় — খাত যাই হোক, সংগ্রহের অঙ্ক যত বড়ই হোক।",
  } as const,
  honestEyebrow: { en: "THE HONEST PART", bn: "সৎ কথাটা" } as const,
  ctaTitle: { en: "Curious who made it through?", bn: "কারা পেরোলো, দেখতে চান?" } as const,
  ctaCopy: {
    en: "Every listing on the platform carries the verification badges and a plain-language risk summary — check them against this standard yourself.",
    bn: "প্ল্যাটফর্মের প্রতিটি তালিকায় থাকে যাচাই-ব্যাজ আর সহজ-ভাষার ঝুঁকি-সারসংক্ষেপ — নিজেই এই মানদণ্ডে মিলিয়ে দেখুন।",
  } as const,
  ctaBtn: { en: "Browse verified listings", bn: "যাচাইকৃত তালিকা দেখুন" } as const,
  ctaBtn2: { en: "Read our Charter", bn: "আমাদের চার্টার পড়ুন" } as const,
  /* detail page */
  detailCtaTitle: { en: "Every pillar, every listing, every time.", bn: "প্রতিটি স্তম্ভ, প্রতিটি তালিকা, প্রতিবার।" } as const,
  detailCtaCopy: {
    en: "The standard doesn't bend for sector, size or story. See the businesses that cleared all five gates — and the risk summaries we published with them.",
    bn: "খাত, আকার বা গল্প দিয়ে মানদণ্ড বাঁকানো যায় না। পাঁচটি দরজাই পার হওয়া ব্যবসাগুলো দেখুন — সাথে আমাদের প্রকাশিত ঝুঁকি-সারসংক্ষেপ।",
  } as const,
  askPillar: { en: "Ask about this pillar", bn: "এই স্তম্ভ নিয়ে জিজ্ঞাসা করুন" } as const,
  docsTitle: { en: "Documents we require", bn: "যেসব নথি আমরা চাই" } as const,
  docsEyebrow: { en: "THE PAPER TRAIL", bn: "নথির সারি" } as const,
  docsIntro: {
    en: "The review doesn't start until these are in the data room. Missing any of them is itself a finding.",
    bn: "এগুলো ডেটা রুমে না পৌঁছানো পর্যন্ত রিভিউ শুরুই হয় না। কোনোটা না থাকাটাই আবার একটি তথ্য।",
  } as const,
  flagsPanelTitle: { en: "Red flags that stop a listing", bn: "লাল সংকেত — যা দেখলে তালিকা বন্ধ" } as const,
  whyEyebrow: { en: "WHY IT MATTERS TO INVESTORS", bn: "বিনিয়োগকারীর কাছে কেন গুরুত্বপূর্ণ" } as const,
  seeNote: {
    en: "This badge appears on a listing only after the pillar is cleared — the verification note behind it lives in the data room.",
    bn: "স্তম্ভ পাস হওয়ার পরেই কেবল ব্যাজটি তালিকায় দেখা যায় — পেছনের যাচাই-নোট থাকে ডেটা রুমে।",
  } as const,
  prevPillar: { en: "Previous pillar", bn: "পূর্ববর্তী স্তম্ভ" } as const,
  nextPillar: { en: "Next pillar", bn: "পরবর্তী স্তম্ভ" } as const,
  allPillars: { en: "All five pillars", bn: "পাঁচটি স্তম্ভই দেখুন" } as const,
  pillarRail: { en: "Jump between pillars", bn: "স্তম্ভের মধ্যে যান" } as const,
  docsChip: (n: number, bn: (x: number) => string) =>
    ({
      en: `${n} document${n === 1 ? "" : "s"} required`,
      bn: `${bn(n)}টি নথি লাগবে`,
    }) as L,
  pillarOf: (n: number, bn: (x: number) => string) =>
    ({
      en: `Pillar ${n} of 5`,
      bn: `স্তম্ভ ৫টির মধ্যে ${bn(n)}`,
    }) as L,
  pillarEyebrow: (n: number, bn: (x: number) => string) =>
    ({
      en: `PILLAR ${n} OF 5`,
      bn: `স্তম্ভ ৫টির মধ্যে ${bn(n)}`,
    }) as L,
  num: (n: number, bn: (x: number) => string) => ({ en: String(n), bn: bn(n) }) as L,
};

/* ── Pillar detail copy (slugs mirror VETTING.stages keys) ────────────── */

type Pillar = {
  slug: string;
  icon: LucideIcon;
  heroCopy: L;
  check: L[];
  docs: L[];
  flags: L[];
  why: L;
};

const PILLARS: Pillar[] = [
  {
    slug: "identity",
    icon: Fingerprint,
    heroCopy: {
      en: "The first gate of every review: who really owns and runs the business — and whether the paperwork agrees.",
      bn: "যাচাইয়ের প্রথম দরজা: ব্যবসাটি আসলে কার, কারা চালায় — আর কাগজে-কাগজে সব মিলে কি না।",
    },
    check: [
      {
        en: "Founder national ID (NID) and recent photos, matched in person or on a live video call.",
        bn: "প্রতিষ্ঠাতার জাতীয় পরিচয়পত্র (NID) ও সাম্প্রতিক ছবি — সরাসরি দেখা বা লাইভ ভিডিও কলে মিলিয়ে নেওয়া হয়।",
      },
      {
        en: "Trade license and incorporation papers, checked against RJSC and city-corporation records.",
        bn: "ট্রেড লাইসেন্স ও নিবন্ধনপত্র — RJSC ও সিটি করপোরেশনের রেকর্ডের সাথে মিলিয়ে।",
      },
      {
        en: "The full ownership table: every shareholder above 5%, with percentages in writing.",
        bn: "সম্পূর্ণ মালিকানা টেবিল: ৫%-এর বেশি অংশের প্রতিটি শেয়ারহোল্ডার, লিখিত শতকরা হারসহ।",
      },
      {
        en: "Whether any shares are pledged, disputed, or already promised to someone else.",
        bn: "শেয়ার কোনোভাবে বন্ধক, বিবাদে বা আগেই অন্য কাউকে প্রতিশ্রুত — কি না।",
      },
      {
        en: "Related companies and family shareholdings that could quietly move money around.",
        bn: "সম্পর্কিত কোম্পানি বা পারিবারিক অংশীদারিত্ব — যেখান দিয়ে নীরবে টাকা সরতে পারে।",
      },
      {
        en: "Directors' history: past shutdowns, blacklistings or failed ventures, disclosed up front.",
        bn: "পরিচালকদের অতীত: আগের বন্ধ হওয়া ব্যবসা, ব্ল্যাকলিস্ট বা ব্যর্থ উদ্যোগ — শুরুতেই জানা থাকে।",
      },
    ],
    docs: [
      { en: "Trade license (current, renewed)", bn: "ট্রেড লাইসেন্স (বর্তমান, নবায়নকৃত)" },
      { en: "TIN certificate & incorporation documents", bn: "TIN সনদ ও কোম্পানি নিবন্ধনের কাগজ" },
      { en: "Shareholding table / partnership deed", bn: "শেয়ারহোল্ডিং টেবিল / পার্টনারশিপ ডিড" },
      { en: "NID copies of founding directors", bn: "প্রতিষ্ঠাতা পরিচালকদের NID কপি" },
      { en: "Bank account documents in the company's name", bn: "কোম্পানির নামে ব্যাংক অ্যাকাউন্টের কাগজ" },
    ],
    flags: [
      {
        en: "The person on the license is not the person running the business.",
        bn: "লাইসেন্সে যিনি, ব্যবসা তিনি চালাচ্ছেন না।",
      },
      {
        en: "Ownership percentages that change every time we ask.",
        bn: "প্রতিবার জিজ্ঞাসায় মালিকানার হার বদলে যায়।",
      },
      {
        en: "A hidden partner who appears only after money arrives.",
        bn: "লুকানো অংশীদার — টাকা ঢোকার পরেই আবির্ভাব।",
      },
      {
        en: "Shares already pledged as collateral elsewhere.",
        bn: "শেয়ার আগেই অন্যত্র জামানত হিসেবে বন্ধক।",
      },
    ],
    why: {
      en: "If ownership is unclear, your legal claim is unclear. This pillar is what makes an investment a right you can enforce — not a handshake you can only hope for.",
      bn: "মালিকানা অস্পষ্ট হলে আপনার আইনি দাবিও অস্পষ্ট। এই স্তম্ভই বিনিয়োগকে ভরসার হাতে নয়, অধিকারের খাতায় নিয়ে যায়।",
    },
  },
  {
    slug: "legal",
    icon: Scale,
    heroCopy: {
      en: "Licences, taxes and court records — the paperwork that decides whether a business can legally take your money and keep operating.",
      bn: "লাইসেন্স, কর ও আদালতের রেকর্ড — এই কাগজগুলোই ঠিক করে ব্যবসাটি আইনত আপনার টাকা নিতে পারে কি না, আর চলতে পারবে কি না।",
    },
    check: [
      {
        en: "Trade license validity, renewal dates, and the exact scope of activities it permits.",
        bn: "ট্রেড লাইসেন্সের বৈধতা, নবায়নের তারিখ ও অনুমোদিত কার্যক্রমের সীমা।",
      },
      {
        en: "Income-tax returns and VAT filings for the last three years, cross-checked against receipts.",
        bn: "গত তিন বছরের আয়কর রিটার্ন ও ভ্যাট জমা — রসিদের সাথে মিলিয়ে।",
      },
      {
        en: "Sector licences: BGMEA membership, fire and building safety certificates, environmental clearance — whatever the sector demands.",
        bn: "খাতভিত্তিক লাইসেন্স: BGMEA সদস্যপদ, অগ্নি ও ভবন-নিরাপত্তা সনদ, পরিবেশ ছাড়পত্র — খাত যা চায়।",
      },
      {
        en: "Litigation search: civil, criminal and labour cases naming the company or its directors.",
        bn: "মামলার অনুসন্ধান: কোম্পানি বা পরিচালকদের নামে দেওয়ানি, ফৌজদারি ও শ্রম মামলা।",
      },
      {
        en: "Loan and collateral registers — every bank claim against the business, in writing.",
        bn: "ঋণ ও জামানতের হিসাব — ব্যবসার বিরুদ্ধে ব্যাংকের প্রতিটি দাবি, লিখিতভাবে।",
      },
      {
        en: "Standing with Bangladesh Bank or the relevant sector regulator, where applicable.",
        bn: "প্রযোজ্য ক্ষেত্রে বাংলাদেশ ব্যাংক বা সংশ্লিষ্ট খাত-নিয়ন্ত্রকের কাছে অবস্থান।",
      },
    ],
    docs: [
      { en: "Trade license + last 3 years of renewals", bn: "ট্রেড লাইসেন্স + গত ৩ বছরের নবায়ন" },
      { en: "Income-tax returns & VAT clearance", bn: "আয়কর রিটার্ন ও ভ্যাট ক্লিয়ারেন্স" },
      { en: "Sector certificates (fire, environmental, BGMEA…)", bn: "খাতভিত্তিক সনদ (অগ্নি, পরিবেশ, BGMEA…)" },
      { en: "Bank solvency / liability letters", bn: "ব্যাংক সলভেন্সি / দায়ের চিঠি" },
      { en: "Litigation disclosure statement, signed", bn: "স্বাক্ষরিত মামলা-প্রকাশ বিবৃতি" },
    ],
    flags: [
      {
        en: "An expired license that is 'about to be renewed' — for the second time.",
        bn: "মেয়াদোত্তীর্ণ লাইসেন্স — 'এখনই নবায়ন হবে', এই কথা দ্বিতীয়বারও।",
      },
      {
        en: "Tax returns that don't match the revenue the founder claims.",
        bn: "প্রতিষ্ঠাতার বলা রাজস্বের সাথে কর-রিটার্ন মেলে না।",
      },
      {
        en: "An undisclosed court case that surfaces in our search.",
        bn: "আমাদের অনুসন্ধানে হঠাৎ উঠে আসা অপ্রকাশিত মামলা।",
      },
      {
        en: "Certificates photographed from an angle that hides the expiry date.",
        bn: "সনদের ছবি এমন কোণ থেকে তোলা, যাতে মেয়াদ-তারিখ না দেখা যায়।",
      },
    ],
    why: {
      en: "A business that can't keep its own paperwork current will struggle to protect your money when it matters. Clean compliance is the cheapest insurance an investment has.",
      bn: "নিজের কাগজপত্রই যে ব্যবসা হালনাগাদ রাখতে পারে না, দরকারের মুহূর্তে আপনার টাকা রক্ষা করা তার পক্ষে কঠিন। পরিষ্কার কমপ্লায়েন্সই বিনিয়োগের সবচেয়ে সস্তা বিমা।",
    },
  },
  {
    slug: "financial",
    icon: LineChart,
    heroCopy: {
      en: "Numbers we can trace: statements, bank flows, debts and a use-of-funds plan that adds up — before a single taka is committed.",
      bn: "যেসব সংখ্যা মিলিয়ে দেখা যায়: বিবরণী, ব্যাংক-প্রবাহ, দায় আর হিসাব-মিলানো তহবিল-পরিকল্পনা — এক টাকাও ওঠার আগে।",
    },
    check: [
      {
        en: "Audited or reviewed financial statements for the last two to three years.",
        bn: "গত দুই-তিন বছরের অডিটেড বা পর্যালোচিত আর্থিক বিবরণী।",
      },
      {
        en: "Bank statements matched against reported revenue — deposits in, payments out.",
        bn: "রিপোর্ট করা রাজস্বের সাথে ব্যাংক স্টেটমেন্ট মিলানো — জমা ও উত্তোলন দুটোই।",
      },
      {
        en: "Accounts receivable and payable ageing: who owes them, whom they owe.",
        bn: "পাওনা-দেনার বয়স-বিশ্লেষণ: কে তাদের পাওনা, তারা কার পাওনা।",
      },
      {
        en: "All debt: bank loans, informal loans, supplier credit and personal borrowings sitting in the business.",
        bn: "সব দায়: ব্যাংকঋণ, অনানুষ্ঠানিক ঋণ, সরবরাহকারীর ধার ও ব্যবসায় জড়িয়ে থাকা ব্যক্তিগত ধার।",
      },
      {
        en: "A use-of-funds plan that reconciles with the raise amount — line by line.",
        bn: "সংগ্রহের অঙ্কের সাথে তহবিল-ব্যবহারের পরিকল্পনা মেলে — লাইন ধরে ধরে।",
      },
      {
        en: "Margin reality: the gross margin claimed versus the margin their own invoices show.",
        bn: "মার্জিনের বাস্তবতা: দাবি করা মার্জিন বনাম তাদের নিজেদের ইনভয়েসে দেখা মার্জিন।",
      },
    ],
    docs: [
      { en: "Audited financial statements (2–3 years)", bn: "অডিটেড আর্থিক বিবরণী (২–৩ বছর)" },
      { en: "Bank statements (12 months, all accounts)", bn: "ব্যাংক স্টেটমেন্ট (১২ মাস, সব অ্যাকাউন্ট)" },
      { en: "Debt & collateral schedule", bn: "ঋণ ও জামানতের তালিকা" },
      { en: "Use-of-funds budget", bn: "তহবিল ব্যবহারের বাজেট" },
      { en: "Key customer contracts / invoices", bn: "প্রধান গ্রাহক-চুক্তি / ইনভয়েস" },
    ],
    flags: [
      {
        en: "Revenue that grows in the pitch deck but not in the bank account.",
        bn: "পিচ-ডেকে রাজস্ব বাড়ে, ব্যাংক হিসাবে নয়।",
      },
      {
        en: "'Informal loans' invoked to explain away missing cash.",
        bn: "হাওয়া হয়ে যাওয়া টাকার ব্যাখ্যায় 'অনানুষ্ঠানিক ঋণ'।",
      },
      {
        en: "A use-of-funds plan that is one line long: 'expansion'.",
        bn: "এক লাইনের তহবিল-পরিকল্পনা: 'সম্প্রসারণ'।",
      },
      {
        en: "Receivables that look impressive but never turn into cash.",
        bn: "পাওনার তালিকা বিশাল, কিন্তু তা কখনো নগদ হয় না।",
      },
    ],
    why: {
      en: "Financial health is where promises meet arithmetic. This pillar doesn't predict success — it makes sure the starting numbers are true.",
      bn: "আর্থিক অবস্থাতেই প্রতিশ্রুতির মুখোমুখি হয় পাটিগণিত। এই স্তম্ভ সাফল্যের ভবিষ্যদ্বাণী করে না — শুধু নিশ্চিত করে শুরুর সংখ্যাগুলো সত্য।",
    },
  },
  {
    slug: "operations",
    icon: Users,
    heroCopy: {
      en: "We leave the desk and go see: the factory floor, the customers, the market — the difference between a business that sounds real and one that is.",
      bn: "ডেস্ক ছেড়ে আমরা সরাসরি দেখতে যাই: কারখানার মেঝে, গ্রাহক, বাজার — শোনাতে বাস্তব আর সত্যিই বাস্তব, এই পার্থক্যটা ধরতে।",
    },
    check: [
      {
        en: "An in-person site visit by our own team — production, inventory, headcount.",
        bn: "আমাদের নিজস্ব টিমের সরাসরি সাইট ভিজিট — উৎপাদন, মজুদ, কর্মীসংখ্যা।",
      },
      {
        en: "Customer references called and cross-questioned — at least three, chosen by us.",
        bn: "গ্রাহক রেফারেন্সে ফোন ও পরপর প্রশ্ন — অন্তত তিনজন, বেছে নেই আমরা।",
      },
      {
        en: "Market position: competitors, pricing power, and what actually differentiates them.",
        bn: "বাজারে অবস্থান: প্রতিযোগী, দাম ধরে রাখার ক্ষমতা, আর আসল পার্থক্যটা কোথায়।",
      },
      {
        en: "Key-person risk: what breaks if one founder steps away for six months.",
        bn: "মূল-ব্যক্তির ঝুঁকি: এক প্রতিষ্ঠাতা ছয় মাস সরে গেলে কী থেমে যায়।",
      },
      {
        en: "Team depth: who besides the founders actually runs daily operations.",
        bn: "টিমের গভীরতা: প্রতিষ্ঠাতাদের ছাড়া দৈনন্দিন কার্যক্রম কারা চালান।",
      },
      {
        en: "Order book and pipeline: signed work versus hoped-for work.",
        bn: "অর্ডার বই ও পাইপলাইন: সই-করা কাজ বনাম আশা-করা কাজ।",
      },
    ],
    docs: [
      { en: "Site-visit report (written, with photos)", bn: "সাইট-ভিজিট রিপোর্ট (লিখিত, ছবিসহ)" },
      { en: "Customer reference list with contacts", bn: "গ্রাহক রেফারেন্স তালিকা, যোগাযোগসহ" },
      { en: "Org chart & payroll summary", bn: "সংগঠন-চার্ট ও বেতন-সারসংক্ষেপ" },
      { en: "Order book / letters of intent", bn: "অর্ডার বই / অভিপ্রায়-পত্র (LOI)" },
      { en: "Utility bills & rent agreements for the premises", bn: "প্রাঙ্গণের ইউটিলিটি বিল ও ভাড়া-চুক্তি" },
    ],
    flags: [
      {
        en: "A factory tour that somehow avoids the production floor.",
        bn: "কারখানা ঘোরানো হয় — কিন্তু উৎপাদন মেঝেটা এড়িয়েই।",
      },
      {
        en: "Reference customers who can't be reached on any number given.",
        bn: "দেওয়া কোনো নম্বরেই পৌঁছানো যায় না এমন রেফারেন্স গ্রাহক।",
      },
      {
        en: "A market where 'everyone is a customer' and no one is under contract.",
        bn: "বাজার যেখানে 'সবাই গ্রাহক' — চুক্তিতে আবদ্ধ কেউ নয়।",
      },
      {
        en: "One person whose departure would stop the entire operation.",
        bn: "একজন মানুষ — চলে গেলেই পুরো কার্যক্রম থেমে যায়।",
      },
    ],
    why: {
      en: "Statements can be written by anyone. A working floor, paying customers and a team that functions — those can only be witnessed. That's why we go.",
      bn: "বিবরণী যে কেউ লিখতে পারে। চলমান কারখানা, টাকা দেওয়া গ্রাহক আর কাজ করা টিম — এগুলো কেবল চোখেই দেখা যায়। তাই আমরা যাই।",
    },
  },
  {
    slug: "advisor",
    icon: ClipboardCheck,
    heroCopy: {
      en: "The final gate: a second pair of eyes across everything above — and a plain-language risk summary you read before any decision.",
      bn: "শেষ দরজা: উপরের সবকিছুতে আরেকজোড়া চোখ — আর সিদ্ধান্তের আগে আপনি যে সহজ-ভাষার ঝুঁকি-সারসংক্ষেপটা পড়েন।",
    },
    check: [
      {
        en: "An advisor independent of the deal re-reads all four prior pillars together.",
        bn: "ডিলের সাথে জড়িত নন এমন অ্যাডভাইজর আগের চার স্তম্ভ একসাথে পুনর্যাচাই করেন।",
      },
      {
        en: "Every material risk is written down — in plain Bangla and English, not fine print.",
        bn: "প্রতিটি গুরুত্বপূর্ণ ঝুঁকি লেখা হয় — সহজ বাংলা ও ইংরেজিতে, ছোট অক্ষরে লুকিয়ে নয়।",
      },
      {
        en: "The risk summary is published next to the opportunity — not buried in a data room.",
        bn: "ঝুঁকি-সারসংক্ষেপ সুযোগের পাশেই প্রকাশ হয় — ডেটা রুমে চাপা পড়ে না।",
      },
      {
        en: "Unresolved questions from any pillar are listed, not smoothed over.",
        bn: "কোনো স্তম্ভের অমীমাংস প্রশ্ন তালিকাভুক্ত হয় — ঘোলা করে দেওয়া হয় না।",
      },
      {
        en: "A fit judgment: whether the instrument and horizon suit ordinary investors at all.",
        bn: "উপযুক্ততার বিচার: ইনস্ট্রুমেন্ট আর মেয়াদ আদৌ সাধারণ বিনিয়োগকারীর পক্ষে মানানসই কি না।",
      },
      {
        en: "A dated signature: a named advisor stands behind the review.",
        bn: "তারিখসহ স্বাক্ষর — নাম-ভুক্ত অ্যাডভাইজার রিভিউয়ের পেছনে দাঁড়ান।",
      },
    ],
    docs: [
      { en: "Signed advisor review memo", bn: "স্বাক্ষরিত অ্যাডভাইজার রিভিউ মেমো" },
      { en: "Plain-language risk summary (bilingual)", bn: "সহজ-ভাষার ঝুঁকি-সারসংক্ষেপ (দ্বিভাষিক)" },
      { en: "Open-questions register", bn: "অমীমাংস প্রশ্নের খাতা" },
      { en: "Verification checklist — all five pillars", bn: "যাচাই-চেকলিস্ট — পাঁচ স্তম্ভই" },
      { en: "Data-room index for registered investors", bn: "নিবন্ধিত বিনিয়োগকারীদের ডেটা-রুম সূচি" },
    ],
    flags: [
      {
        en: "A summary that lists strengths but somehow no risks.",
        bn: "সারসংক্ষেপে সব সুবিধা — ঝুঁকি কোথাও নেই।",
      },
      {
        en: "Risks described so vaguely they could apply to any business.",
        bn: "ঝুঁকি এতটাই অস্পষ্ট যে যেকোনো ব্যবসায় খাটিয়ে দেওয়া যায়।",
      },
      {
        en: "A review that copies the founder's own words back to us.",
        bn: "রিভিউ যেখানে প্রতিষ্ঠাতার কথাই হুবহু ফেরত এসেছে।",
      },
      {
        en: "No named human willing to sign the summary.",
        bn: "সারসংক্ষেপে সই করতে রাজি নাম-ভুক্ত কেউ নেই।",
      },
    ],
    why: {
      en: "This is the pillar that keeps the first four honest. It's also your reading material: the risk summary we publish is written for you — not for lawyers.",
      bn: "এই স্তম্ভই আগের চারটিকে সৎ রাখে। আর এটাই আপনার পড়ার উপকরণ: আমরা যে ঝুঁকি-সারসংক্ষেপ প্রকাশ করি, তা আইনজীবীদের জন্য নয় — আপনার জন্য লেখা।",
    },
  },
];

/* Things that end a review before it starts (landing page) */
const REJECTS: L[] = [
  {
    en: "Guaranteed returns — nobody honest can promise them.",
    bn: "'নিশ্চিত মুনাফা' — সৎ কেউ এই প্রতিশ্রুতি দিতে পারে না।",
  },
  {
    en: "Documents that can't be verified at their source.",
    bn: "মূল উৎস থেকে যাচাই করা যায় না এমন নথি।",
  },
  {
    en: "Revenue that exists in presentations but not in bank records.",
    bn: "প্রেজেন্টেশনে থাকা রাজস্ব, ব্যাংক-রেকর্ডে অনুপস্থিত।",
  },
  {
    en: "Pressure to move fast — 'the round closes Friday'.",
    bn: "তাড়াহুড়োর চাপ — 'শুক্রবারই রাউন্ড বন্ধ হয়ে যাবে'।",
  },
  {
    en: "A founder who won't meet us at their own premises.",
    bn: "প্রতিষ্ঠাতা, যিনি নিজের প্রাঙ্গণেই আমাদের সাথে দেখা করবেন না।",
  },
  {
    en: "Numbers that change between meetings.",
    bn: "বৈঠক থেকে বৈঠক বদলে যাওয়া সংখ্যা।",
  },
];

export default function VettingPage({ detail }: { detail: string | null }) {
  if (detail) return <PillarDetail slug={detail} />;
  return <VettingLanding />;
}

/* ── Landing ──────────────────────────────────────────────────────────── */

function VettingLanding() {
  const { t, lang } = useLanguage();
  const scrollToPillars = () =>
    document.getElementById("vetting-pillars")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <PageHero
        crumbs={[{ label: { en: "Vetting Standard", bn: "যাচাই মানদণ্ড" } }]}
        eyebrow={VETTING.eyebrow}
        title={VETTING.title}
        copy={T.heroCopy}
        image="/images/page-vetting.png"
        imageAlt={lang === "bn" ? "যাচাইয়ের কাগজ ও লেন্স" : "Financial documents under a magnifying lens"}
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-nx-cyan-300/40 bg-nx-cyan-500/10 px-3.5 py-1.5 text-[12px] font-bold text-nx-cyan-300">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            {t(T.badge)}
          </span>
        }
        actions={
          <>
            <CyanButton onClick={scrollToPillars}>{t(T.heroCta)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("opportunities")}>
              {t(T.heroCta2)}
            </OutlineLightButton>
          </>
        }
      />

      <PageBody>
        {/* the five pillars */}
        <section id="vetting-pillars" aria-label={t(T.pillarsTitle)}>
          <SectionHead eyebrow={T.pillarsEyebrow} title={T.pillarsTitle} copy={T.pillarsCopy} />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => {
              const stage = VETTING.stages[i];
              const Icon = p.icon;
              return (
                <motion.article
                  key={p.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  className="group flex h-full flex-col rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)] transition-all hover:-translate-y-1 hover:border-nx-navy-300 hover:shadow-[0_22px_44px_-18px_rgba(6,31,74,0.28)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-nx-navy-950 text-nx-cyan-400">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="nx-num text-sm font-extrabold text-nx-navy-200">
                      {t(T.num(i + 1, bnNum))} / {lang === "bn" ? bnNum(5) : "5"}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-nx-navy-900">
                    {t(stage.title)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(stage.what)}</p>
                  <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-nx-mist px-3 py-1 text-[11px] font-bold text-nx-navy-600">
                    <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                    {t(VETTING.seeLabel)}: {t(stage.see)}
                  </span>
                  <button
                    onClick={() => navigateTo("vetting", p.slug)}
                    className="mt-auto w-fit pt-5 text-sm font-bold text-nx-cyan-600 transition-colors hover:text-nx-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {t(T.readPillar)}
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* what gets rejected */}
        <section aria-label={t(T.flagsTitle)} className="mt-16 md:mt-24">
          <SectionHead eyebrow={T.flagsEyebrow} title={T.flagsTitle} copy={T.flagsCopy} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {REJECTS.map((f, i) => (
              <motion.li
                key={f.en}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="flex items-start gap-3 rounded-3xl border border-nx-navy-100 bg-white p-5 shadow-[0_10px_30px_-18px_rgba(6,31,74,0.14)]"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                  <Ban className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="text-sm leading-relaxed font-semibold text-nx-navy-800">{t(f)}</p>
              </motion.li>
            ))}
          </ul>

          {/* the honest part */}
          <div className="mt-8 flex items-start gap-3 rounded-3xl border border-nx-cyan-200 bg-nx-cyan-50 p-5 md:p-6">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-nx-cyan-700 shadow-[0_8px_18px_-10px_rgba(6,31,74,0.25)]">
              <Info className="h-4.5 w-4.5" aria-hidden="true" />
            </span>
            <div>
              <p className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-cyan-700 uppercase">
                {t(T.honestEyebrow)}
              </p>
              <p className="mt-1.5 text-[15px] leading-relaxed font-bold text-nx-navy-900">
                {t(VETTING.disclaimer)}
              </p>
            </div>
          </div>
        </section>
      </PageBody>

      <CtaBand
        title={T.ctaTitle}
        copy={T.ctaCopy}
        actions={
          <>
            <CyanButton onClick={() => navigateTo("opportunities")}>{t(T.ctaBtn)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("charter")}>
              {t(T.ctaBtn2)}
            </OutlineLightButton>
          </>
        }
      />
    </>
  );
}

/* ── Pillar detail page ──────────────────────────────────────────────── */

function PillarDetail({ slug }: { slug: string }) {
  const { t, lang } = useLanguage();
  const idx = PILLARS.findIndex((p) => p.slug === slug);
  const p = idx >= 0 ? PILLARS[idx] : null;

  if (!p) return <PageNotFound page={slug} />;

  const stage = VETTING.stages[idx];
  const prev = idx > 0 ? PILLARS[idx - 1] : null;
  const next = idx < PILLARS.length - 1 ? PILLARS[idx + 1] : null;
  const n = idx + 1;
  const Icon = p.icon;

  return (
    <>
      <DetailHero
        crumbs={[
          { label: { en: "Vetting Standard", bn: "যাচাই মানদণ্ড" }, page: "vetting" },
          { label: stage.title },
        ]}
        eyebrow={T.pillarEyebrow(n, bnNum)}
        title={stage.title}
        copy={p.heroCopy}
        image="/images/page-vetting.png"
        imageAlt={lang === "bn" ? "যাচাইয়ের কাগজ ও লেন্স" : "Financial documents under a magnifying lens"}
        meta={
          <>
            <MetaChip icon={<ListChecks className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t(T.pillarOf(n, bnNum))}
            </MetaChip>
            <MetaChip icon={<Eye className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t(VETTING.seeLabel)}: {t(stage.see)}
            </MetaChip>
            <MetaChip icon={<FileText className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t(T.docsChip(p.docs.length, bnNum))}
            </MetaChip>
          </>
        }
        actions={
          <>
            <CyanButton onClick={() => navigateTo("opportunities")}>
              {t(T.heroCta2)}
            </CyanButton>
            <OutlineLightButton onClick={() => navigateTo("contact")}>
              {t(T.askPillar)}
            </OutlineLightButton>
          </>
        }
      />

      <PageBody className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* main column */}
          <div className="min-w-0 space-y-10">
            <section aria-label={t(VETTING.checkLabel)}>
              <SectionHead eyebrow={T.pillarEyebrow(n, bnNum)} title={VETTING.checkLabel} />
              <ul className="mt-6 space-y-3.5">
                {p.check.map((c, i) => (
                  <motion.li
                    key={c.en}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: Math.min(i * 0.05, 0.3), duration: 0.3 }}
                    className="flex items-start gap-3 rounded-2xl border border-nx-navy-100 bg-white p-4 text-sm leading-relaxed text-slate-600"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-nx-cyan-600"
                      aria-hidden="true"
                    />
                    {t(c)}
                  </motion.li>
                ))}
              </ul>
            </section>

            <section aria-label={t(T.docsTitle)}>
              <SectionHead eyebrow={T.docsEyebrow} title={T.docsTitle} copy={T.docsIntro} />
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {p.docs.map((d) => (
                  <li
                    key={d.en}
                    className="flex items-start gap-2.5 rounded-2xl bg-nx-mist p-4 text-sm leading-relaxed font-semibold text-nx-navy-800"
                  >
                    <FileText
                      className="mt-0.5 h-4 w-4 shrink-0 text-nx-navy-400"
                      aria-hidden="true"
                    />
                    {t(d)}
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-label={t(T.flagsPanelTitle)}
              className="rounded-3xl border border-amber-300/60 bg-amber-50/70 p-6 md:p-7"
            >
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-nx-navy-900">
                <AlertTriangle className="h-5 w-5 text-amber-500" aria-hidden="true" />
                {t(T.flagsPanelTitle)}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {p.flags.map((f, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate-700">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
                      aria-hidden="true"
                    />
                    {t(f)}
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-label={t(T.whyEyebrow)}
              className="rounded-3xl bg-nx-navy-950 nx-navy-grid p-6 md:p-8"
            >
              <p className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-cyan-300 uppercase">
                {t(T.whyEyebrow)}
              </p>
              <p className="mt-3 max-w-2xl leading-relaxed text-white/85">{t(p.why)}</p>
            </section>
          </div>

          {/* side column */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_12px_30px_-18px_rgba(6,31,74,0.2)]">
              <p className="flex items-center gap-2 nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-navy-600 uppercase">
                <Icon className="h-4 w-4 text-nx-cyan-600" aria-hidden="true" />
                {t(VETTING.seeLabel)}
              </p>
              <p className="mt-3 text-lg font-extrabold text-nx-navy-900">{t(stage.see)}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(T.seeNote)}</p>
            </div>

            {/* pillar rail — jump between the five pillars */}
            <nav
              aria-label={t(T.pillarRail)}
              className="rounded-3xl border border-nx-navy-100 bg-white p-5 shadow-[0_12px_30px_-18px_rgba(6,31,74,0.2)]"
            >
              <p className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-navy-600 uppercase">
                {t(T.pillarRail)}
              </p>
              <ol className="mt-3 space-y-1.5">
                {PILLARS.map((pillar, i) => {
                  const active = i === idx;
                  return (
                    <li key={pillar.slug}>
                      <button
                        onClick={() => navigateTo("vetting", pillar.slug)}
                        aria-current={active ? "page" : undefined}
                        className={
                          active
                            ? "flex w-full items-center gap-2.5 rounded-xl bg-nx-navy-700 px-3.5 py-2.5 text-left text-[13px] font-bold text-white"
                            : "flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-[13px] font-semibold text-nx-navy-700 transition-colors hover:bg-nx-navy-50"
                        }
                      >
                        <span
                          className={
                            active
                              ? "nx-num flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-nx-cyan-500 text-[11px] font-extrabold text-nx-navy-900"
                              : "nx-num flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-nx-mist text-[11px] font-extrabold text-nx-navy-600"
                          }
                        >
                          {t(T.num(i + 1, bnNum))}
                        </span>
                        {t(VETTING.stages[i].title)}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <button
              onClick={() => navigateTo("vetting")}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-nx-navy-200 bg-white px-5 py-3 text-sm font-bold text-nx-navy-800 transition-colors hover:border-nx-navy-400"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t(T.allPillars)}
            </button>
          </aside>
        </div>

        {/* prev / next pillar */}
        <nav
          aria-label={lang === "bn" ? "স্তম্ভ নেভিগেশন" : "Pillar navigation"}
          className="mt-14 grid gap-4 border-t border-nx-navy-100 pt-8 sm:grid-cols-2"
        >
          {prev ? (
            <button
              onClick={() => navigateTo("vetting", prev.slug)}
              className="group rounded-3xl border border-nx-navy-100 bg-white p-5 text-left transition-all hover:border-nx-navy-300 hover:shadow-[0_14px_30px_-16px_rgba(6,31,74,0.2)]"
            >
              <span className="flex items-center gap-1.5 text-xs font-bold text-nx-navy-500">
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                {t(T.prevPillar)}
              </span>
              <span className="mt-1.5 block font-extrabold text-nx-navy-900 group-hover:text-nx-navy-700">
                {t(VETTING.stages[idx - 1].title)}
              </span>
            </button>
          ) : (
            <span aria-hidden="true" />
          )}
          {next && (
            <button
              onClick={() => navigateTo("vetting", next.slug)}
              className="group rounded-3xl border border-nx-navy-100 bg-white p-5 text-right transition-all hover:border-nx-navy-300 hover:shadow-[0_14px_30px_-16px_rgba(6,31,74,0.2)] sm:col-start-2"
            >
              <span className="flex items-center justify-end gap-1.5 text-xs font-bold text-nx-navy-500">
                {t(T.nextPillar)}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="mt-1.5 block font-extrabold text-nx-navy-900 group-hover:text-nx-navy-700">
                {t(VETTING.stages[idx + 1].title)}
              </span>
            </button>
          )}
        </nav>
      </PageBody>

      <CtaBand
        title={T.detailCtaTitle}
        copy={T.detailCtaCopy}
        actions={
          <>
            <CyanButton onClick={() => navigateTo("opportunities")}>{t(T.ctaBtn)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("charter")}>
              {t(T.ctaBtn2)}
            </OutlineLightButton>
          </>
        }
      />
    </>
  );
}
