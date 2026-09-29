import type { L } from "./i18n";

/* ────────────────────────────────────────────────────────────────
   NexFund bilingual content — transcribed & adapted from the
   Website Deep Dive blueprint (BN + EN parity, §10)
   ──────────────────────────────────────────────────────────────── */

export const NAV: { id: string; label: L }[] = [
  { id: "paths", label: { en: "Who We Serve", bn: "আমাদের দর্শক" } },
  { id: "how", label: { en: "How It Works", bn: "কীভাবে কাজ করে" } },
  { id: "vetting", label: { en: "Vetting", bn: "যাচাই প্রক্রিয়া" } },
  { id: "opportunities", label: { en: "Opportunities", bn: "সুযোগসমূহ" } },
  { id: "services", label: { en: "Services", bn: "সেবাসমূহ" } },
  { id: "insights", label: { en: "Insights", bn: "ইনসাইটস" } },
  { id: "faq", label: { en: "FAQ", bn: "প্রশ্নোত্তর" } },
];

export const BRAND = {
  name: { en: "NexFund", bn: "নেক্সফান্ড" },
  tagline: { en: "Fund what's next.", bn: "আগামীর উদ্যোগে বিনিয়োগ।" } as L,
  trustLine: { en: "Proof before promise.", bn: "প্রতিশ্রুতির আগে প্রমাণ।" } as L,
};

export const HERO = {
  eyebrow: { en: "PROOF BEFORE PROMISE", bn: "প্রতিশ্রুতির আগে প্রমাণ" } as L,
  h1: {
    en: "Fund what's next in Bangladesh.",
    bn: "আগামীর উদ্যোগে বিনিয়োগ করুন।",
  } as L,
  sub: {
    en: "NexFund connects serious investors with verified, growth-ready businesses — with the due diligence, documentation, and advisory to make every decision an informed one.",
    bn: "নেক্সফান্ড যাচাইকৃত ও প্রবৃদ্ধিমুখী ব্যবসার সাথে অভিজ্ঞ বিনিয়োগকারীদের সংযোগ ঘটায় — পূর্ণাঙ্গ যাচাই, ডকুমেন্টেশন ও পরামর্শসহ, যাতে প্রতিটি সিদ্ধান্ত হয় তথ্যনির্ভর।",
  } as L,
  ctaInvestor: { en: "I'm an Investor", bn: "আমি বিনিয়োগকারী" } as L,
  ctaFounder: {
    en: "I'm Raising Capital",
    bn: "আমি মূলধন খুঁজছি",
  } as L,
  microTrust: [
    { en: "5-stage vetting", bn: "৫-ধাপ যাচাই" },
    { en: "Fees disclosed upfront", bn: "ফি আগেই জানানো" },
    { en: "Bangla & English support", bn: "বাংলা ও ইংরেজিতে সহায়তা" },
  ] as L[],
};

export const DEAL_CARD = {
  verified: { en: "Verified", bn: "যাচাইকৃত" } as L,
  stage: { en: "Stage", bn: "ধাপ" } as L,
  of: { en: "of 5", bn: "৫-এর" } as L,
  equity: { en: "Equity", bn: "ইক্যুইটি" } as L,
};

export const RIBBON = {
  text: {
    en: "Proof before promise — see how we vet →",
    bn: "প্রতিশ্রুতির আগে প্রমাণ — আমরা কীভাবে যাচাই করি দেখুন →",
  } as L,
  dismiss: { en: "Dismiss", bn: "বন্ধ করুন" } as L,
};

export const TWO_PATHS = {
  eyebrow: { en: "TWO PATHS, ONE CROSSING", bn: "দুই পথ, এক মিলনবিন্দু" } as L,
  title: { en: "Which path are you on?", bn: "আপনি কোন পথে?" } as L,
  sub: {
    en: "Capital and conviction meet at the crossing. Choose your side — we'll walk it with you.",
    bn: "পুঁজি ও প্রত্যয় মিলে যায় সংযোগবিন্দুতে। আপনার পথ বেছে নিন — আমরা পাশে থাকব।",
  } as L,
  investor: {
    title: { en: "For Investors", bn: "বিনিয়োগকারীদের জন্য" } as L,
    copy: {
      en: "See real businesses, real documents, real risks — before you commit a single taka.",
      bn: "প্রতিটি টাকা দেওয়ার আগে দেখুন আসল ব্যবসা, আসল নথি, আসল ঝুঁকি।",
    } as L,
    cta: { en: "Explore Opportunities", bn: "সুযোগগুলো দেখুন" } as L,
    points: [
      { en: "Curated deal flow, not a crowded board", bn: "বাছাই করা ডিল, ভিড় নয়" },
      { en: "Verified data rooms & risk summaries", bn: "যাচাইকৃত ডেটা রুম ও ঝুঁকি-সারসংক্ষেপ" },
      { en: "Bilingual documents and advisor support", bn: "দ্বিভাষিক নথি ও অ্যাডভাইজার সহায়তা" },
    ] as L[],
  },
  founder: {
    title: { en: "For Entrepreneurs", bn: "উদ্যোক্তাদের জন্য" } as L,
    copy: {
      en: "Get investor-ready. Get in front of the right capital.",
      bn: "বিনিয়োগের জন্য প্রস্তুত হোন। সঠিক পুঁজির সামনে দাঁড়ান।",
    } as L,
    cta: { en: "Check Your Readiness", bn: "প্রস্তুতি যাচাই করুন" } as L,
    points: [
      { en: "2-minute readiness check with instant score", bn: "২ মিনিটে প্রস্তুতি-যাচাই, সাথে সাথে স্কোর" },
      { en: "Investor-ready program: valuation, deck, data room", bn: "ইনভেস্টর-রেডি প্রোগ্রাম: ভ্যালুয়েশন, ডেক, ডেটা রুম" },
      { en: "Honest feedback — even when it's a 'not yet'", bn: "সৎ মতামত — এমনকি উত্তর 'এখনো নয়' হলেও" },
    ] as L[],
  },
};

export const HOW = {
  eyebrow: { en: "HOW IT WORKS", bn: "কীভাবে কাজ করে" } as L,
  title: {
    en: "From first conversation to first introduction.",
    bn: "প্রথম আলাপ থেকে প্রথম পরিচয় পর্যন্ত।",
  } as L,
  sub: {
    en: "Two paths rise, cross, and move up together — that crossing is where NexFund works.",
    bn: "দুটি পথ উঠে এসে মিলে একসাথে ওপরে ওঠে — সেই মিলনবিন্দুতেই নেক্সফান্ড কাজ করে।",
  } as L,
  steps: [
    {
      n: "01",
      title: { en: "Apply", bn: "আবেদন" } as L,
      desc: {
        en: "Tell us about yourself or your business in about 10 minutes.",
        bn: "প্রায় ১০ মিনিটে আপনার বা আপনার ব্যবসার তথ্য দিন।",
      } as L,
    },
    {
      n: "02",
      title: { en: "Verify", bn: "যাচাই" } as L,
      desc: {
        en: "Our team reviews identity, legal documents, financials, and operations.",
        bn: "আমাদের টিম পরিচয়, আইনি নথি, আর্থিক তথ্য ও কার্যক্রম যাচাই করে।",
      } as L,
    },
    {
      n: "03",
      title: { en: "Match", bn: "ম্যাচ" } as L,
      desc: {
        en: "We introduce you only to strong fits — by sector, ticket size, and time horizon.",
        bn: "খাত, বিনিয়োগের পরিমাণ ও সময়সীমা মিলিয়ে শুধু উপযুক্তদের সাথে পরিচয় করিয়ে দিই।",
      } as L,
    },
    {
      n: "04",
      title: { en: "Grow", bn: "প্রবৃদ্ধি" } as L,
      desc: {
        en: "We support term discussions and documentation, so both sides move with clarity.",
        bn: "শর্ত আলোচনা ও ডকুমেন্টেশনে পাশে থাকি, যাতে দুই পক্ষই স্পষ্টতার সাথে এগোয়।",
      } as L,
    },
  ],
  notDoTitle: { en: "What we don't do", bn: "আমরা যা করি না" } as L,
  notDo: [
    { en: "We don't guarantee returns.", bn: "আমরা মুনাফার নিশ্চয়তা দিই না।" },
    {
      en: "We don't hold your funds — money moves directly between parties.",
      bn: "আমরা আপনার অর্থ গচ্ছিত রাখি না — লেনদেন হয় সরাসরি দুই পক্ষের মধ্যে।",
    },
    { en: "We don't pressure decisions.", bn: "আমরা চাপ প্রয়োগ করি না।" },
  ] as L[],
};

export const VETTING = {
  eyebrow: { en: "THE VETTING STANDARD", bn: "যাচাই মানদণ্ড" } as L,
  title: { en: "We show our work.", bn: "আমরা আমাদের কাজ দেখাই।" } as L,
  sub: {
    en: "Most platforms ask you to trust them. We'd rather you check us.",
    bn: "বেশিরভাগ প্ল্যাটফর্ম আপনাকে বিশ্বাস করতে বলে। আমরা চাই আপনি নিজেই যাচাই করুন।",
  } as L,
  checkLabel: { en: "What we check", bn: "কী যাচাই করি" } as L,
  seeLabel: { en: "What you'll see", bn: "আপনি কী দেখবেন" } as L,
  stages: [
    {
      key: "identity",
      title: { en: "Identity & Ownership", bn: "পরিচয় ও মালিকানা" } as L,
      what: {
        en: "Founder identity, ownership structure, business registration.",
        bn: "প্রতিষ্ঠাতার পরিচয়, মালিকানা কাঠামো, ব্যবসার নিবন্ধন।",
      } as L,
      see: { en: "Identity badge", bn: "পরিচয় ব্যাজ" } as L,
    },
    {
      key: "legal",
      title: { en: "Legal & Compliance", bn: "আইনি ও কমপ্লায়েন্স" } as L,
      what: {
        en: "Trade license, tax and regulatory documents, litigation check.",
        bn: "ট্রেড লাইসেন্স, কর ও নিয়ন্ত্রক নথি, মামলা-সংক্রান্ত অনুসন্ধান।",
      } as L,
      see: { en: "Legal docs badge", bn: "আইনি নথি ব্যাজ" } as L,
    },
    {
      key: "financial",
      title: { en: "Financial Health", bn: "আর্থিক অবস্থা" } as L,
      what: {
        en: "Financial statements, cash flow, debts, use-of-funds plan.",
        bn: "আর্থিক বিবরণী, নগদ প্রবাহ, দায়, তহবিল ব্যবহারের পরিকল্পনা।",
      } as L,
      see: { en: "Financials summary", bn: "আর্থিক সারসংক্ষেপ" } as L,
    },
    {
      key: "operations",
      title: { en: "Operations & Market", bn: "কার্যক্রম ও বাজার" } as L,
      what: {
        en: "Site visit, customers, market position, team.",
        bn: "সাইট ভিজিট, গ্রাহক, বাজারে অবস্থান, টিম।",
      } as L,
      see: { en: "Site-visit note", bn: "সাইট-ভিজিট নোট" } as L,
    },
    {
      key: "advisor",
      title: {
        en: "Advisor Review & Risk Summary",
        bn: "অ্যাডভাইজার রিভিউ ও ঝুঁকির সারসংক্ষেপ",
      } as L,
      what: {
        en: "Independent review; key risk factors written in plain language.",
        bn: "স্বাধীন পর্যালোচনা; প্রধান ঝুঁকিগুলো সহজ ভাষায় লেখা।",
      } as L,
      see: { en: "Risk summary", bn: "ঝুঁকি-সারসংক্ষেপ" } as L,
    },
  ],
  disclaimer: {
    en: "Verification reduces risk. It does not remove it.",
    bn: "যাচাই ঝুঁকি কমায়, কিন্তু ঝুঁকি সম্পূর্ণ দূর করে না।",
  } as L,
};

export const OPP = {
  eyebrow: { en: "FEATURED OPPORTUNITIES", bn: "বাছাই করা সুযোগ" } as L,
  title: { en: "Curated, not crowded.", bn: "বাছাই করা, ভিড় নয়।" } as L,
  sub: {
    en: "A small number of businesses that passed our vetting. Register to see documents.",
    bn: "যাচাই পাস করা অল্প কিছু ব্যবসা। নথি দেখতে রেজিস্টার করুন।",
  } as L,
  seeking: { en: "Seeking", bn: "সংগ্রহের লক্ষ্য" } as L,
  stage: { en: "Stage", bn: "ধাপ" } as L,
  instrument: { en: "Instrument", bn: "ইনস্ট্রুমেন্ট" } as L,
  keyRisks: { en: "Key risks", bn: "প্রধান ঝুঁকি" } as L,
  viewSummary: { en: "View Summary", bn: "সারসংক্ষেপ দেখুন" } as L,
  registerDocs: { en: "Register for documents", bn: "নথি দেখতে রেজিস্টার করুন" } as L,
  allSectors: { en: "All sectors", bn: "সব খাত" } as L,
  anonymizedNote: {
    en: "Names are anonymized until you register & sign the NDA.",
    bn: "রেজিস্টার ও NDA স্বাক্ষরের আগে নাম গোপন রাখা হয়।",
  } as L,
  verificationProgress: { en: "Verification progress", bn: "যাচাইয়ের অগ্রগতি" } as L,
  resultCount: (n: number): L => ({
    en: `${n} opportunit${n === 1 ? "y" : "ies"}`,
    bn: `${n}টি সুযোগ`,
  }),
  emptyTitle: {
    en: "Nothing matches yet. Tell us what you're looking for.",
    bn: "এখনো কিছু মেলেনি। আপনি কী খুঁজছেন জানান।",
  } as L,
  emptyCta: { en: "Join the priority list", bn: "প্রায়োরিটি লিস্টে যোগ দিন" } as L,
};

export type BadgeKey = "identity" | "legal" | "financial" | "site" | "advisor";

export const BADGES: Record<BadgeKey, L> = {
  identity: { en: "ID", bn: "পরিচয়" },
  legal: { en: "Legal", bn: "আইনি" },
  financial: { en: "Financials", bn: "আর্থিক" },
  site: { en: "Site visit", bn: "সাইট ভিজিট" },
  advisor: { en: "Advisor review", bn: "রিভিউ" },
};

export const BADGE_TIPS: Record<BadgeKey, L> = {
  identity: {
    en: "Founder identity, ownership structure & registration verified.",
    bn: "প্রতিষ্ঠাতার পরিচয়, মালিকানা কাঠামো ও নিবন্ধন যাচাইকৃত।",
  },
  legal: {
    en: "Trade license, tax & regulatory documents, litigation check done.",
    bn: "ট্রেড লাইসেন্স, কর ও নিয়ন্ত্রক নথি, মামলা-অনুসন্ধান সম্পন্ন।",
  },
  financial: {
    en: "Financial statements, cash flow, debts & use-of-funds reviewed.",
    bn: "আর্থিক বিবরণী, নগদ প্রবাহ, দায় ও তহবিল-পরিকল্পনা পর্যালোচিত।",
  },
  site: {
    en: "Our team visited the business in person.",
    bn: "আমাদের টিম সরাসরি ব্যবসাটি পরিদর্শন করেছে।",
  },
  advisor: {
    en: "Independent advisor review with plain-language risk summary.",
    bn: "স্বাধীন অ্যাডভাইজার পর্যালোচনা ও সহজ ভাষায় ঝুঁকি-সারসংক্ষেপ।",
  },
};

export const CHARTER = {
  eyebrow: { en: "THE NEXFUND CHARTER", bn: "নেক্সফান্ড চার্টার" } as L,
  title: {
    en: "Seven commitments we publish so you can hold us to them.",
    bn: "সাতটি প্রতিশ্রুতি — যাতে আপনি আমাদের জবাবদিহি করাতে পারেন।",
  } as L,
  items: [
    {
      en: "We publish exactly how we vet.",
      bn: "আমরা প্রকাশ করি কীভাবে যাচাই করি।",
    },
    {
      en: "We disclose every fee before you commit.",
      bn: "প্রতিশ্রুতির আগেই প্রতিটি ফি জানাই।",
    },
    {
      en: "We never guarantee returns.",
      bn: "আমরা কখনো মুনাফার নিশ্চয়তা দিই না।",
    },
    {
      en: "We show risks next to opportunities.",
      bn: "সুযোগের পাশেই ঝুঁকি দেখাই।",
    },
    {
      en: "We protect your data and share it only with your consent.",
      bn: "আপনার তথ্য সুরক্ষিত রাখি এবং সম্মতি ছাড়া শেয়ার করি না।",
    },
    {
      en: "We tell you when a deal isn't right for you.",
      bn: "কোনো ডিল আপনার জন্য উপযুক্ত না হলে সেটা বলে দিই।",
    },
    {
      en: "We answer in your language — Bangla or English.",
      bn: "আপনার ভাষায় উত্তর দিই — বাংলা বা ইংরেজি।",
    },
  ] as L[],
  version: { en: "Charter v1.0 — published openly", bn: "চার্টার v1.0 — প্রকাশ্যে প্রকাশিত" } as L,
};

export const WHY = {
  eyebrow: { en: "WHY NEXFUND", bn: "কেন নেক্সফান্ড" } as L,
  title: { en: "Built different, on purpose.", bn: "সচেতনভাবে আলাদা।" } as L,
  items: [
    {
      icon: "shield",
      title: { en: "Vetted, not just listed.", bn: "শুধু তালিকা নয়, যাচাইকৃত।" } as L,
      desc: {
        en: "Every business goes through our review before you see it.",
        bn: "আপনার সামনে আসার আগে প্রতিটি ব্যবসা আমাদের পর্যালোচনার মধ্য দিয়ে যায়।",
      } as L,
    },
    {
      icon: "receipt",
      title: { en: "Transparent fees.", bn: "স্বচ্ছ ফি।" } as L,
      desc: {
        en: "You know what we charge, and when, before you begin.",
        bn: "শুরুর আগেই জানবেন আমরা কত, কখন নিই।",
      } as L,
    },
    {
      icon: "compass",
      title: { en: "Advisory-led.", bn: "পরামর্শ-কেন্দ্রিক।" } as L,
      desc: {
        en: "We're a financial consultancy first — not just a listing board.",
        bn: "আমরা আগে ফাইন্যান্সিয়াল কনসাল্টেন্সি — শুধু লিস্টিং বোর্ড নই।",
      } as L,
    },
    {
      icon: "languages",
      title: { en: "Bilingual, always.", bn: "সবসময় দ্বিভাষিক।" } as L,
      desc: {
        en: "Documents, support, and meetings in Bangla or English.",
        bn: "নথি, সহায়তা ও মিটিং — বাংলা বা ইংরেজিতে।",
      } as L,
    },
  ],
};

export const SERVICES = {
  eyebrow: { en: "ADVISORY SERVICES", bn: "অ্যাডভাইজরি সেবা" } as L,
  title: {
    en: 'Advisory that gets you from "interested" to "informed."',
    bn: '"আগ্রহী" থেকে "তথ্যসমৃদ্ধ" হওয়ার পরামর্শ।',
  } as L,
  forLabel: { en: "For", bn: "যার জন্য" } as L,
  getLabel: { en: "You get", bn: "আপনি পাবেন" } as L,
  cta: { en: "Book a Consultation", bn: "পরামর্শ বুক করুন" } as L,
  entrepreneur: { en: "Entrepreneurs", bn: "উদ্যোক্তা" } as L,
  investor: { en: "Investors", bn: "বিনিয়োগকারী" } as L,
  items: [
    {
      icon: "target",
      title: { en: "Investor Readiness", bn: "ইনভেস্টর রেডিনেস" } as L,
      forWhom: "entrepreneur",
      desc: {
        en: "Gap analysis, roadmap, and a document checklist for your business.",
        bn: "ব্যবসার গ্যাপ বিশ্লেষণ, রোডম্যাপ ও ডকুমেন্ট চেকলিস্ট।",
      } as L,
      gets: [
        { en: "Readiness score & gap report", bn: "প্রস্তুতি স্কোর ও ঘাটতি রিপোর্ট" },
        { en: "12-month readiness roadmap", bn: "১২ মাসের রোডম্যাপ" },
        { en: "Document checklist", bn: "ডকুমেন্ট চেকলিস্ট" },
      ] as L[],
    },
    {
      icon: "scale",
      title: { en: "Business Valuation", bn: "বিজনেস ভ্যালুয়েশন" } as L,
      forWhom: "entrepreneur",
      desc: {
        en: "A defensible valuation range with methods and assumptions explained.",
        bn: "ভ্যালুয়েশন রেঞ্জ, পদ্ধতি ব্যাখ্যা ও assumptions-সহ।",
      } as L,
      gets: [
        { en: "Valuation range + methodology", bn: "ভ্যালুয়েশন রেঞ্জ + পদ্ধতি" },
        { en: "Assumptions you can defend", bn: "যুক্তিসহ সমর্থনযোগ্য অনুমান" },
        { en: "Negotiation reference points", bn: "আলোচনার রেফারেন্স পয়েন্ট" },
      ] as L[],
    },
    {
      icon: "chart",
      title: { en: "Financial Modeling & Projections", bn: "ফাইন্যান্সিয়াল মডেলিং ও প্রজেকশন" } as L,
      forWhom: "entrepreneur",
      desc: {
        en: "3–5 year models with base, upside — and downside — scenarios.",
        bn: "৩–৫ বছরের মডেল — বেস, আপসাইড ও ডাউনসাইড পরিসরসহ।",
      } as L,
      gets: [
        { en: "3–5 year financial model", bn: "৩–৫ বছরের ফাইন্যান্সিয়াল মডেল" },
        { en: "Sensitivity analysis", bn: "সেনসিটিভিটি বিশ্লেষণ" },
        { en: "Downside scenario, always shown", bn: "ডাউনসাইড পরিসর, সবসময় দৃশ্যমান" },
      ] as L[],
    },
    {
      icon: "presentation",
      title: { en: "Pitch Deck & Data Room", bn: "পিচ ডেক ও ডেটা রুম" } as L,
      forWhom: "entrepreneur",
      desc: {
        en: "A disciplined pitch and an organized data room investors can trust.",
        bn: "সুশৃঙ্খল পিচ ডেক ও সুসংগঠিত ডেটা রুম — বিনিয়োগকারীর আস্থার জায়গা।",
      } as L,
      gets: [
        { en: "Investor-grade pitch deck", bn: "ইনভেস্টর-গ্রেড পিচ ডেক" },
        { en: "Q&A preparation session", bn: "প্রশ্নোত্তর প্রস্তুতি সেশন" },
        { en: "Structured data room", bn: "সুশৃঙ্খল ডেটা রুম" },
      ] as L[],
    },
    {
      icon: "search",
      title: { en: "Deal Assessment Support", bn: "ডিল অ্যাসেসমেন্ট সাপোর্ট" } as L,
      forWhom: "investor",
      desc: {
        en: "Document review support, question lists, and risk flagging for deals you're evaluating.",
        bn: "আপনার মূল্যায়নরত ডিলের নথি রিভিউ সহায়তা, প্রশ্নের তালিকা ও ঝুঁকি চিহ্নিতকরণ।",
      } as L,
      gets: [
        { en: "Document review support", bn: "নথি রিভিউ সহায়তা" },
        { en: "The right questions to ask", bn: "যে প্রশ্নগুলো করা উচিত" },
        { en: "Plain-language risk flags", bn: "সহজ ভাষায় ঝুঁকি চিহ্ন" },
      ] as L[],
    },
  ],
};

export const INSIGHTS = {
  eyebrow: { en: "INSIGHTS", bn: "ইনসাইটস" } as L,
  title: { en: "Learn before you leap.", bn: "ঝাঁপ দেওয়ার আগে জানুন।" } as L,
  sub: {
    en: "Guides and notes from our advisors — written to be read, not to impress.",
    bn: "আমাদের অ্যাডভাইজারদের গাইড ও নোট — পড়ার জন্য লেখা, দেখানোর জন্য নয়।",
  } as L,
  readTime: (n: number): L => ({
    en: `${n} min read`,
    bn: `${n} মিনিট পাঠ`,
  }),
  readMore: { en: "Read the guide", bn: "গাইডটি পড়ুন" } as L,
  shortAnswer: { en: "Short answer", bn: "সংক্ষিপ্ত উত্তর" } as L,
  articles: [
    {
      slug: "sme-due-diligence-checklist",
      image: "/images/insight-dd.png",
      category: { en: "Due Diligence", bn: "ডিউ ডিলিজেন্স" } as L,
      title: {
        en: "How to evaluate an SME before investing: a 12-point checklist",
        bn: "বিনিয়োগের আগে একটি এসএমই যাচাইয়ের ১২ পয়েন্ট",
      } as L,
      short: {
        en: "Check registration, ownership, financials, cash flow, debts, customers, team, and use of funds — in writing — before you commit a single taka.",
        bn: "এক টাকাও দেওয়ার আগে লিখিতভাবে যাচাই করুন — নিবন্ধন, মালিকানা, আর্থিক বিবরণী, নগদ প্রবাহ, দায়, গ্রাহক, টিম ও তহবিলের ব্যবহার।",
      } as L,
      minutes: 9,
    },
    {
      slug: "valuation-basics-for-founders",
      image: "/images/insight-valuation.png",
      category: { en: "Valuation & Finance", bn: "ভ্যালুয়েশন ও ফাইন্যান্স" } as L,
      title: {
        en: "Valuation basics for founders: what investors actually look at",
        bn: "ফাউন্ডারদের জন্য ভ্যালুয়েশনের গোড়ার কথা",
      } as L,
      short: {
        en: "Investors price risk and evidence, not dreams. Understand comparable deals, earnings quality, and why your valuation must survive negotiation.",
        bn: "বিনিয়োগকারীরা ঝুঁকি ও প্রমাণ দেখে দাম দেয়, স্বপ্ন নয়। জানুন তুলনামূলক ডিল, আয়ের মান ও কেন আপনার ভ্যালুয়েশন আলোচনা সইতে হবে।",
      } as L,
      minutes: 7,
    },
    {
      slug: "red-flags-in-investment-offers",
      image: "/images/insight-pitch.png",
      category: { en: "For Investors", bn: "বিনিয়োগকারীদের জন্য" } as L,
      title: {
        en: "Red flags in investment offers (and how to spot them)",
        bn: "বিনিয়োগ অফারের রেড ফ্ল্যাগ — চেনার উপায়",
      } as L,
      short: {
        en: "Guaranteed returns, urgency pressure, missing documents, unclear fees, no downside case — learn the patterns that should make you walk away.",
        bn: "নিশ্চিত মুনাফা, তাড়াহুড়া, নথির অভাব, অস্পষ্ট ফি, ডাউনসাইড বিশ্লেষণ নেই — যে প্যাটার্ন দেখলে সরে দাঁড়াবেন।",
      } as L,
      minutes: 6,
    },
  ],
};

export const FAQ = {
  eyebrow: { en: "QUESTIONS, ANSWERED", bn: "প্রশ্ন, উত্তরসহ" } as L,
  title: { en: "Frequently asked questions", bn: "সাধারণ জিজ্ঞাসা" } as L,
  items: [
    {
      q: { en: "What is NexFund?", bn: "নেক্সফান্ড কী?" } as L,
      a: {
        en: "NexFund is a Bangladesh-based financial consultancy and matchmaking platform. We vet growth-ready businesses and introduce them to informed investors, with documentation and advisory support.",
        bn: "নেক্সফান্ড বাংলাদেশভিত্তিক একটি ফাইন্যান্সিয়াল কনসাল্টেন্সি ও ম্যাচমেকিং প্ল্যাটফর্ম। আমরা প্রবৃদ্ধিমুখী ব্যবসা যাচাই করি এবং ডকুমেন্টেশন ও পরামর্শসহ অভিজ্ঞ বিনিয়োগকারীদের সাথে পরিচয় করিয়ে দিই।",
      } as L,
    },
    {
      q: { en: "Is investing through NexFund safe?", bn: "নেক্সফান্ডের মাধ্যমে বিনিয়োগ কি নিরাপদ?" } as L,
      a: {
        en: "Every investment carries risk, including loss of capital. We vet businesses and show key risks up front, but we never guarantee returns.",
        bn: "প্রতিটি বিনিয়োগেই ঝুঁকি আছে, মূলধন হারানোর সম্ভাবনাসহ। আমরা ব্যবসা যাচাই করি এবং প্রধান ঝুঁকি আগেই দেখাই, কিন্তু মুনাফার নিশ্চয়তা দিই না।",
      } as L,
    },
    {
      q: { en: "How does NexFund earn?", bn: "নেক্সফান্ড কীভাবে আয় করে?" } as L,
      a: {
        en: "We charge advisory service fees to entrepreneurs and a disclosed introduction fee when a deal completes — never a percentage of your returns. Every fee is agreed in writing before any engagement begins.",
        bn: "উদ্যোক্তাদের কাছ থেকে আমরা অ্যাডভাইজরি সার্ভিস ফি নিই, আর ডিল সম্পন্ন হলে একটি প্রকাশিত ইন্ট্রোডাকশন ফি — আপনার মুনাফার শতাংশ কখনো নই। প্রতিটি ফি কাজ শুরুর আগেই লিখিতভাবে জানানো হয়।",
      } as L,
    },
    {
      q: { en: "What is the minimum investment?", bn: "সর্বনিম্ন বিনিয়োগ কত?" } as L,
      a: {
        en: "It varies by opportunity — current tickets range from ৳50 lakh to ৳4 crore. Each listing shows its range before you register, and fees are disclosed before you commit.",
        bn: "সুযোগভেদে ভিন্ন — বর্তমান টিকেট পরিসর ৳৫০ লক্ষ থেকে ৳৪ কোটি। প্রতিটি লিস্টিংয়ে রেঞ্জ আগেই দেখানো হয়, আর ফি জানানো হয় প্রতিশ্রুতির আগেই।",
      } as L,
    },
    {
      q: { en: "What do entrepreneurs need to apply?", bn: "আবেদনে কী লাগে?" } as L,
      a: {
        en: "Business registration, ownership details, recent financial statements, and a use-of-funds plan. Our checklist helps you prepare.",
        bn: "ব্যবসার নিবন্ধন, মালিকানার তথ্য, সাম্প্রতিক আর্থিক বিবরণী ও তহবিল ব্যবহারের পরিকল্পনা। আমাদের চেকলিস্ট প্রস্তুতিতে সাহায্য করবে।",
      } as L,
    },
    {
      q: { en: "Can non-resident Bangladeshis (NRBs) invest?", bn: "প্রবাসীরা কি বিনিয়োগ করতে পারবেন?" } as L,
      a: {
        en: "We're building NRB-friendly access: English documentation, remote meetings across time zones, and digital verification. Write to us and we'll walk you through what's currently possible.",
        bn: "আমরা প্রবাসী-বান্ধব ব্যবস্থা তৈরি করছি: ইংরেজি নথি, টাইমজোন-সচেতন রিমোট মিটিং ও ডিজিটাল যাচাই। আমাদের লিখুন — বর্তমানে যা সম্ভব তা বুঝিয়ে বলব।",
      } as L,
    },
  ],
};

export const FINAL_CTA = {
  title: { en: "Ready to see what's next?", bn: "আগামীটা দেখতে প্রস্তুত?" } as L,
  sub: {
    en: "Book a free 20-minute conversation. No pressure, no obligation.",
    bn: "বিনামূল্যে ২০ মিনিটের আলোচনা বুক করুন। কোনো চাপ নেই, বাধ্যবাধকতা নেই।",
  } as L,
  bookCall: { en: "Book a Call", bn: "কল বুক করুন" } as L,
  registerInvestor: { en: "Register as Investor", bn: "বিনিয়োগকারী হিসেবে রেজিস্টার" } as L,
  raiseCapital: { en: "Raise Capital", bn: "মূলধন খুঁজুন" } as L,
  priority: { en: "Or join the priority list", bn: "অথবা প্রায়োরিটি লিস্টে যোগ দিন" } as L,
};

export const FOOTER = {
  tagline: {
    en: "NexFund connects informed investors with verified, growth-ready businesses across Bangladesh.",
    bn: "নেক্সফান্ড বাংলাদেশের তথ্যবান বিনিয়োগকারী ও যাচাইকৃত, প্রবৃদ্ধিমুখী ব্যবসার সংযোগ ঘটায়।",
  } as L,
  platform: { en: "Platform", bn: "প্ল্যাটফর্ম" } as L,
  trustCol: { en: "Trust", bn: "ট্রাস্ট" } as L,
  company: { en: "Company", bn: "কোম্পানি" } as L,
  contact: { en: "Contact", bn: "যোগাযোগ" } as L,
  riskTitle: { en: "Risk Disclosure", bn: "ঝুঁকি বিবরণী" } as L,
  risk: {
    en: "Investing involves risk, including possible loss of capital. NexFund does not guarantee returns. Past performance is not indicative of future results.",
    bn: "বিনিয়োগে ঝুঁকি আছে, মূলধন হারানোর সম্ভাবনাসহ। নেক্সফান্ড কোনো মুনাফার নিশ্চয়তা দেয় না। অতীতের ফলাফল ভবিষ্যতের নিশ্চয়তা নয়।",
  } as L,
  copyright: { en: "NexFund — Fund what's next.", bn: "নেক্সফান্ড — আগামীর উদ্যোগে বিনিয়োগ।" } as L,
  address: {
    en: "Gulshan Avenue, Dhaka 1212, Bangladesh",
    bn: "গুলশান এভিনিউ, ঢাকা ১২১২, বাংলাদেশ",
  } as L,
};

/* ── Investor registration dialog (blueprint §5.3) ── */
export const INVESTOR_DLG = {
  title: { en: "Register as Investor", bn: "বিনিয়োগকারী হিসেবে রেজিস্টার" } as L,
  steps: [
    { en: "Account", bn: "অ্যাকাউন্ট" },
    { en: "Profile", bn: "প্রোফাইল" },
    { en: "Verification", bn: "যাচাই" },
  ] as L[],
  step1Time: { en: "Takes 30 seconds", bn: "৩০ সেকেন্ড লাগবে" } as L,
  name: { en: "Full name", bn: "পূর্ণ নাম" } as L,
  namePh: { en: "e.g. Ayesha Rahman", bn: "যেমন: আয়েশা রহমান" } as L,
  email: { en: "Email", bn: "ইমেইল" } as L,
  phone: { en: "Mobile (+880)", bn: "মোবাইল (+৮৮০)" } as L,
  langPref: { en: "Preferred language", bn: "পছন্দের ভাষা" } as L,
  step2Note: {
    en: "No answer is wrong — this just helps us match you.",
    bn: "কোনো উত্তর ভুল নয় — শুধু আপনার সাথে মিলাতে।",
  } as L,
  experience: { en: "Investment experience", bn: "বিনিয়োগের অভিজ্ঞতা" } as L,
  experienceOpts: [
    { en: "Exploring first investments", bn: "প্রথম বিনিয়োগ ঘুরে দেখছি" },
    { en: "Some past investments", bn: "কিছু বিনিয়োগ করেছি" },
    { en: "Active, experienced investor", bn: "সক্রিয় ও অভিজ্ঞ বিনিয়োগকারী" },
  ] as L[],
  sectors: { en: "Sectors of interest", bn: "আগ্রহের খাত" } as L,
  sectorOpts: [
    { en: "Garments & Manufacturing", bn: "গার্মেন্টস ও ম্যানুফ্যাকচারিং" },
    { en: "Agri & Food Processing", bn: "কৃষি ও খাদ্য প্রক্রিয়াকরণ" },
    { en: "Technology", bn: "প্রযুক্তি" },
    { en: "Logistics", bn: "লজিস্টিকস" },
    { en: "Healthcare", bn: "স্বাস্থ্যসেবা" },
    { en: "Retail & Consumer", bn: "রিটেইল ও কনজিউমার" },
  ] as L[],
  ticket: { en: "Potential investment range", bn: "সম্ভাব্য বিনিয়োগ পরিসর" } as L,
  ticketOpts: [
    { en: "৳5–25 lakh", bn: "৳৫–২৫ লক্ষ" },
    { en: "৳25 lakh–1 crore", bn: "৳২৫ লক্ষ–১ কোটি" },
    { en: "৳1–4 crore", bn: "৳১–৪ কোটি" },
    { en: "৳4 crore+", bn: "৳৪ কোটি+" },
  ] as L[],
  horizon: { en: "Time horizon", bn: "সময়সীমা" } as L,
  horizonOpts: [
    { en: "2–3 years", bn: "২–৩ বছর" },
    { en: "3–5 years", bn: "৩–৫ বছর" },
    { en: "5+ years", bn: "৫+ বছর" },
  ] as L[],
  riskComfort: { en: "Risk comfort", bn: "ঝুঁকি-স্বাচ্ছন্দ্য" } as L,
  riskOpts: [
    { en: "Cautious — protect capital first", bn: "সতর্ক — মূলধন আগে" },
    { en: "Balanced", bn: "ভারসাম্যপূর্ণ" },
    { en: "Comfortable with real risk", bn: "প্রকৃত ঝুঁকিতে স্বাচ্ছন্দ্য" },
  ] as L[],
  step3Note: {
    en: "We verify identity through a secure process — we never ask for sensitive documents over email.",
    bn: "পরিচয় যাচাই হয় সুরক্ষিত প্রক্রিয়ায় — ইমেইলে আমরা কখনো সংবেদনশীল নথি চাই না।",
  } as L,
  consent: {
    en: "I understand that investing carries risk, including loss of capital.",
    bn: "আমি বুঝি যে বিনিয়োগে ঝুঁকি আছে, মূলধন হারানোর সম্ভাবনাসহ।",
  } as L,
  dataPromise: {
    en: "Your information is encrypted and shared only with your consent.",
    bn: "আপনার তথ্য এনক্রিপ্টেড এবং কেবল আপনার সম্মতিতে শেয়ার হয়।",
  } as L,
  back: { en: "Back", bn: "পেছনে" } as L,
  continue: { en: "Continue", bn: "এগিয়ে যান" } as L,
  submit: { en: "Complete Registration", bn: "রেজিস্ট্রেশন সম্পন্ন করুন" } as L,
  successTitle: { en: "Thank you — here's what happens next", bn: "ধন্যবাদ — এরপর যা হবে" } as L,
  successSteps: [
    { en: "We confirm your email within 1 business day", bn: "১ কর্মদিবসের মধ্যে ইমেইল নিশ্চিত করব" },
    { en: "A short advisor call to understand your goals", bn: "লক্ষ্য বুঝতে ছোট একটি অ্যাডভাইজার কল" },
    { en: "Curated, anonymized opportunities in your inbox", bn: "আপনার ইনবক্সে বাছাই করা সুযোগ" },
  ] as L[],
};

/* ── Readiness quiz dialog (blueprint §5.4) ── */
export const QUIZ = {
  title: { en: "Investor-Readiness Check", bn: "বিনিয়োগ-প্রস্তুতি যাচাই" } as L,
  timeNote: { en: "2 minutes · 10 questions", bn: "২ মিনিট · ১০টি প্রশ্ন" } as L,
  privacy: { en: "Your answers stay private.", bn: "আপনার উত্তর গোপন থাকে।" } as L,
  start: { en: "Start the check", bn: "যাচাই শুরু করুন" } as L,
  next: { en: "Next", bn: "পরবর্তী" } as L,
  back: { en: "Back", bn: "পেছনে" } as L,
  seeResult: { en: "See my score", bn: "স্কোর দেখুন" } as L,
  yourScore: { en: "Your readiness score", bn: "আপনার প্রস্তুতি স্কোর" } as L,
  gapsTitle: { en: "What to strengthen", bn: "যা শক্ত করতে হবে" } as L,
  strongTitle: { en: "What's already working", bn: "যা ইতোমধ্যে ভালো" } as L,
  emailNote: {
    en: "Get your personalized checklist by email",
    bn: "ব্যক্তিগত চেকলিস্ট ইমেইলে পান",
  } as L,
  sendChecklist: { en: "Send my checklist", bn: "চেকলিস্ট পাঠান" } as L,
  retake: { en: "Retake", bn: "আবার দিন" } as L,
  disclaimer: {
    en: "Illustrative self-assessment — not financial advice.",
    bn: "নিজের মূল্যায়নের নমুনা — এটি আর্থিক পরামর্শ নয়।",
  } as L,
  scoreBands: [
    {
      min: 80,
      title: { en: "Investor-ready", bn: "ইনভেস্টর-রেডি" } as L,
      desc: {
        en: "Strong foundations. You're ready to build your investor package and start conversations.",
        bn: "ভিত মজবুত। ইনভেস্টর প্যাকেজ তৈরি করে আলাপ শুরু করার সময় এখন।",
      } as L,
    },
    {
      min: 55,
      title: { en: "Almost there", bn: "প্রায় প্রস্তুত" } as L,
      desc: {
        en: "Good bones — fix the gaps below and you'll be taken seriously.",
        bn: "ভিত্তি ভালো — নিচের ঘাটতিগুলো সারলে আপনাকে গুরুত্ব দিয়ে নেওয়া হবে।",
      } as L,
    },
    {
      min: 0,
      title: { en: "Foundation stage", bn: "ভিত্তি গড়ার পর্যায়ে" } as L,
      desc: {
        en: "Every business starts here. Strengthen the basics first — investors follow evidence.",
        bn: "প্রতিটি ব্যবসার শুরু এখানেই। আগে ভিত্তি শক্ত করুন — বিনিয়োগকারী প্রমাণ দেখে।",
      } as L,
    },
  ],
  questions: [
    {
      q: { en: "How old is your business?", bn: "আপনার ব্যবসার বয়স কত?" } as L,
      opts: [
        { en: "Under 2 years", bn: "২ বছরের কম" },
        { en: "2–5 years", bn: "২–৫ বছর" },
        { en: "Over 5 years", bn: "৫ বছরের বেশি" },
      ] as L[],
    },
    {
      q: { en: "How did revenue move in the last 12 months?", bn: "গত ১২ মাসে রাজস্বের গতি কেমন?" } as L,
      opts: [
        { en: "Declined or paused", bn: "কমেছে বা থেমেছে" },
        { en: "Roughly flat", bn: "প্রায় অপরিবর্তিত" },
        { en: "Grew", bn: "বেড়েছে" },
      ] as L[],
    },
    {
      q: { en: "Is the business registered with up-to-date licenses?", bn: "ব্যবসা কি নিবন্ধিত ও হালনাগাদ লাইসেন্সসহ?" } as L,
      opts: [
        { en: "Not yet registered", bn: "এখনো নিবন্ধিত নয়" },
        { en: "Partially / renewals pending", bn: "আংশিক / নবায়ন বাকি" },
        { en: "Fully registered & current", bn: "সম্পূর্ণ নিবন্ধিত ও হালনাগাদ" },
      ] as L[],
    },
    {
      q: { en: "Who keeps your books?", bn: "হিসাব কে রাখেন?" } as L,
      opts: [
        { en: "Myself, informally", bn: "নিজে, অনানুষ্ঠানিকভাবে" },
        { en: "A bookkeeper", bn: "একজন বুককিপার" },
        { en: "A professional accountant", bn: "পেশাদার অ্যাকাউন্ট্যান্ট" },
      ] as L[],
    },
    {
      q: { en: "Is your ownership structure written down?", bn: "মালিকানা কাঠামো কি লিখিত?" } as L,
      opts: [
        { en: "No, it's understood verbally", bn: "না, মৌখিক বোঝাপড়া" },
        { en: "Partially documented", bn: "আংশিকভাবে লিখিত" },
        { en: "Yes, documented & signed", bn: "হ্যাঁ, লিখিত ও স্বাক্ষরিত" },
      ] as L[],
    },
    {
      q: { en: "Do you have a use-of-funds plan?", bn: "তহবিল কীভাবে খরচ হবে — পরিকল্পনা আছে?" } as L,
      opts: [
        { en: "Not yet", bn: "এখনো না" },
        { en: "A rough idea", bn: "মোটামুটি ধারণা আছে" },
        { en: "Yes, itemized", bn: "হ্যাঁ, খাতভিত্তিক বিস্তারিত" },
      ] as L[],
    },
    {
      q: { en: "How would you describe current debts?", bn: "বর্তমান দায় কেমন?" } as L,
      opts: [
        { en: "Heavy / straining cash flow", bn: "ভারী / নগদ প্রবাহে চাপ" },
        { en: "Manageable", bn: "সামলানো যায়" },
        { en: "Low or none", bn: "কম বা নেই" },
      ] as L[],
    },
    {
      q: { en: "How concentrated are your customers or suppliers?", bn: "গ্রাহক/সরবরাহকারী নির্ভরতা কেমন?" } as L,
      opts: [
        { en: "One dominant customer/supplier", bn: "একটিই প্রধান গ্রাহক/সরবরাহকারী" },
        { en: "Some concentration", bn: "কিছুটা কেন্দ্রীভূত" },
        { en: "Well diversified", bn: "ভালোভাবে বিস্তৃত" },
      ] as L[],
    },
    {
      q: { en: "Does your team have clear roles?", bn: "টিমে কে কী করে — স্পষ্ট?" } as L,
      opts: [
        { en: "Everyone does everything", bn: "সবাই সব কাজ করে" },
        { en: "Somewhat defined", bn: "আংশিকভাবে নির্ধারিত" },
        { en: "Clear roles & ownership", bn: "স্পষ্ট ভূমিকা ও দায়িত্ব" },
      ] as L[],
    },
    {
      q: { en: "How much will you share with an investor?", bn: "বিনিয়োগকারীর সাথে কতটা তথ্য শেয়ার করতে রাজি?" } as L,
      opts: [
        { en: "Only the good parts", bn: "শুধু ভালো দিকগুলো" },
        { en: "Most things", bn: "বেশিরভাগ" },
        { en: "Full transparency, including weaknesses", bn: "সম্পূর্ণ স্বচ্ছতা, দুর্বলতাসহ" },
      ] as L[],
    },
  ],
};

/* ── Contact / booking dialog (blueprint §5.10) ── */
export const CONTACT_DLG = {
  title: { en: "Let's talk — no pressure.", bn: "আসুন কথা বলি — কোনো চাপ নেই।" } as L,
  sub: {
    en: "A free 20-minute consultation. We reply within one business day.",
    bn: "বিনামূল্যে ২০ মিনিটের পরামর্শ। এক কর্মদিবসের মধ্যে উত্তর দিই।",
  } as L,
  iAm: { en: "I am", bn: "আমি" } as L,
  roles: [
    { en: "An investor", bn: "বিনিয়োগকারী" },
    { en: "An entrepreneur", bn: "উদ্যোক্তা" },
    { en: "A partner (CA / lawyer / incubator)", bn: "পার্টনার (সিএ / আইনজীবী / ইনকিউবেটর)" },
    { en: "Something else", bn: "অন্য কিছু" },
  ] as L[],
  name: { en: "Name", bn: "নাম" } as L,
  phone: { en: "Mobile / WhatsApp", bn: "মোবাইল / হোয়াটসঅ্যাপ" } as L,
  email: { en: "Email", bn: "ইমেইল" } as L,
  slot: { en: "Preferred time (your timezone)", bn: "পছন্দের সময় (আপনার টাইমজোন)" } as L,
  slotOpts: [
    { en: "Morning (9am–12pm)", bn: "সকাল (৯টা–১২টা)" },
    { en: "Afternoon (12–5pm)", bn: "দুপুর (১২–৫টা)" },
    { en: "Evening (5–9pm)", bn: "সন্ধ্যা (৫–৯টা)" },
  ] as L[],
  message: { en: "Brief message (optional)", bn: "সংক্ষিপ্ত বার্তা (ঐচ্ছিক)" } as L,
  messagePh: {
    en: "Tell us in one or two lines what you're exploring…",
    bn: "এক-দুই লাইনে জানান কী ভাবছেন…",
  } as L,
  submit: { en: "Request the call", bn: "কলের অনুরোধ করুন" } as L,
  submitting: { en: "Sending…", bn: "পাঠানো হচ্ছে…" } as L,
  successTitle: { en: "Request received.", bn: "অনুরোধ পেয়েছি।" } as L,
  successBody: {
    en: "We'll confirm your slot within one business day. Meanwhile, feel free to browse how we vet.",
    bn: "এক কর্মদিবসের মধ্যে আপনার সময় নিশ্চিত করব। ততক্ষণে দেখতে পারেন আমরা কীভাবে যাচাই করি।",
  } as L,
};

/* ── Shared microcopy ── */
export const UI = {
  bookCall: { en: "Book a Call", bn: "কল বুক করুন" } as L,
  getStarted: { en: "Get Started", bn: "শুরু করুন" } as L,
  whatsapp: { en: "WhatsApp", bn: "হোয়াটসঅ্যাপ" } as L,
  saving: { en: "Sending…", bn: "পাঠানো হচ্ছে…" } as L,
  somethingWrong: {
    en: "Something went wrong. Your answers are saved — please try again.",
    bn: "কিছু একটা ভুল হয়েছে। আপনার উত্তর সংরক্ষিত আছে — আবার চেষ্টা করুন।",
  } as L,
  required: { en: "Required", bn: "আবশ্যক" } as L,
  invalidEmail: { en: "Check your email address", bn: "ইমেইল ঠিক করুন" } as L,
  invalidPhone: { en: "Check your mobile number", bn: "মোবাইল নম্বর দেখে নিন" } as L,
  savedToast: { en: "Done — we'll be in touch.", bn: "হয়ে গেছে — আমরা যোগাযোগ করব।" } as L,
};
