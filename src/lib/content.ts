import type { L } from "./i18n";

/* ────────────────────────────────────────────────────────────────
   NexFund bilingual content — transcribed & adapted from the
   Website Deep Dive blueprint (BN + EN parity, §10)
   ──────────────────────────────────────────────────────────────── */

export const NAV: { id: string; label: L }[] = [
  { id: "about", label: { en: "About Us", bn: "আমাদের কথা" } },
  { id: "paths", label: { en: "Who We Serve", bn: "আমাদের দর্শক" } },
  { id: "how", label: { en: "How It Works", bn: "কীভাবে কাজ করে" } },
  { id: "vetting", label: { en: "Vetting", bn: "যাচাই প্রক্রিয়া" } },
  { id: "opportunities", label: { en: "Opportunities", bn: "সুযোগসমূহ" } },
  { id: "services", label: { en: "Services", bn: "সেবাসমূহ" } },
  { id: "insights", label: { en: "Insights", bn: "ইনসাইটস" } },
  { id: "impact", label: { en: "Impact", bn: "ইমপ্যাক্ট" } },
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
  /** R12: informative stats strip under the hero copy (quarterly-verified
   *  milestones, same figures the Impact page shows from PlatformStat). */
  stats: [
    {
      icon: "banknote",
      value: { en: "৳12.5 crore", bn: "৳১২.৫ কোটি" } as L,
      label: { en: "capital introduced", bn: "সংযোজিত মূলধন" } as L,
    },
    {
      icon: "building",
      value: { en: "14", bn: "১৪" } as L,
      label: { en: "businesses onboarded", bn: "অনবোর্ডেড ব্যবসা" } as L,
    },
    {
      icon: "users",
      value: { en: "24", bn: "২৪" } as L,
      label: { en: "registered investors", bn: "নিবন্ধিত বিনিয়োগকারী" } as L,
    },
    {
      icon: "clock",
      value: { en: "47 hrs", bn: "৪৭ ঘণ্টা" } as L,
      label: { en: "avg. vetting per deal", bn: "প্রতি ডিলে গড় যাচাই" } as L,
    },
  ] as { icon: string; value: L; label: L }[],
  statsNote: {
    en: "Quarterly-verified milestones — see how we count on the Impact page",
    bn: "ত্রৈমাসিক যাচাইকৃত মাইলফলক — হিসাবের পদ্ধতি দেখুন ইমপ্যাক্ট পেজে",
  } as L,
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
      terms: ["due diligence"],
    },
    {
      q: { en: "Is investing through NexFund safe?", bn: "নেক্সফান্ডের মাধ্যমে বিনিয়োগ কি নিরাপদ?" } as L,
      a: {
        en: "Every investment carries risk, including loss of capital. We vet businesses and show key risks up front, but we never guarantee returns.",
        bn: "প্রতিটি বিনিয়োগেই ঝুঁকি আছে, মূলধন হারানোর সম্ভাবনাসহ। আমরা ব্যবসা যাচাই করি এবং প্রধান ঝুঁকি আগেই দেখাই, কিন্তু মুনাফার নিশ্চয়তা দিই না।",
      } as L,
      terms: ["capital loss"],
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
      terms: ["ticket"],
    },
    {
      q: { en: "What do entrepreneurs need to apply?", bn: "আবেদনে কী লাগে?" } as L,
      a: {
        en: "Business registration, ownership details, recent financial statements, and a use-of-funds plan. Our checklist helps you prepare.",
        bn: "ব্যবসার নিবন্ধন, মালিকানার তথ্য, সাম্প্রতিক আর্থিক বিবরণী ও তহবিল ব্যবহারের পরিকল্পনা। আমাদের চেকলিস্ট প্রস্তুতিতে সাহায্য করবে।",
      } as L,
      terms: ["data room"],
    },
    {
      q: { en: "Can non-resident Bangladeshis (NRBs) invest?", bn: "প্রবাসীরা কি বিনিয়োগ করতে পারবেন?" } as L,
      a: {
        en: "We're building NRB-friendly access: English documentation, remote meetings across time zones, and digital verification. Write to us and we'll walk you through what's currently possible.",
        bn: "আমরা প্রবাসী-বান্ধব ব্যবস্থা তৈরি করছি: ইংরেজি নথি, টাইমজোন-সচেতন রিমোট মিটিং ও ডিজিটাল যাচাই। আমাদের লিখুন — বর্তমানে যা সম্ভব তা বুঝিয়ে বলব।",
      } as L,
    },
  ],
  termsLabel: { en: "Terms explained:", bn: "শব্দের ব্যাখ্যা:" } as L,
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

/* ── Opportunity detail dialog (blueprint §5.5 detail page, R2) ── */
export const OPP_DLG = {
  illustrative: { en: "Illustrative listing", bn: "নমুনা তালিকা" } as L,
  illustrativeTip: {
    en: "Demo data for the preview build — real listings appear after launch vetting.",
    bn: "প্রিভিউ বিল্ডের নমুনা তথ্য — লঞ্চ-যাচাইয়ের পরে আসল তালিকা আসবে।",
  } as L,
  tabs: [
    { en: "Overview", bn: "সংক্ষিপ্ত বিবরণ" },
    { en: "Business Model", bn: "ব্যবসার মডেল" },
    { en: "Financials", bn: "আর্থিক অবস্থা" },
    { en: "Scenarios", bn: "সিনারিও" },
    { en: "Team", bn: "টিম" },
    { en: "Use of Funds", bn: "তহবিলের ব্যবহার" },
    { en: "Key Risks", bn: "প্রধান ঝুঁকি" },
  ] as L[],
  advisorTitle: { en: "What our advisors noticed", bn: "আমাদের অ্যাডভাইজারদের পর্যবেক্ষণ" } as L,
  expressInterest: { en: "Express Interest", bn: "আগ্রহ জানান" } as L,
  bookAdvisorCall: { en: "Book Advisor Call", bn: "অ্যাডভাইজার কল বুক করুন" } as L,
  expressNote: {
    en: "An advisor reviews every expression of interest before any introduction.",
    bn: "পরিচয় করানোর আগে প্রতিটি আগ্রহের অভিব্যক্তি একজন অ্যাডভাইজার পর্যালোচনা করেন।",
  } as L,
  revenueLabel: { en: "Revenue", bn: "রাজস্ব" } as L,
  seekingLabel: { en: "Seeking", bn: "সংগ্রহের লক্ষ্য" } as L,
  minTicketLabel: { en: "Min. ticket", bn: "সর্বনিম্ন টিকেট" } as L,
  instrumentLabel: { en: "Instrument", bn: "ইনস্ট্রুমেন্ট" } as L,
  ndaNote: {
    en: "Full documents & identity unlock after registration + NDA.",
    bn: "রেজিস্ট্রেশন + NDA-এর পরে সম্পূর্ণ নথি ও পরিচয় খোলে।",
  } as L,
};

/* ── Glossary tooltips (blueprint §7 #14, R2) ── */
export const GLOSSARY: Record<string, L> = {
  equity: {
    en: "Equity — part-ownership of the business. You share profits and risks, and your return depends on the company growing.",
    bn: "ইক্যুইটি (Equity) — ব্যবসার আংশিক মালিকানা। লাভ-ক্ষতি ভাগ করে নেন; আপনার রিটার্ন নির্ভর করে কোম্পানি বাড়লে কতটা।",
  },
  valuation: {
    en: "Valuation — how much the whole business is worth today. It decides what share your money buys.",
    bn: "ভ্যালুয়েশন (Valuation) — ব্যবসাটি আজ সব মিলিয়ে কতটার। এটাই ঠিক করে আপনার টাকা কত অংশ কেনে।",
  },
  "due diligence": {
    en: "Due Diligence — checking a business's documents, finances and operations before committing money.",
    bn: "ডিউ ডিলিজেন্স (Due Diligence) — টাকা দেওয়ার আগে ব্যবসার নথি, আর্থিক তথ্য ও কার্যক্রম যাচাই করা।",
  },
  "revenue share": {
    en: "Revenue share — you receive an agreed share of the business's sales, not ownership.",
    bn: "রেভিনিউ শেয়ার (Revenue Share) — মালিকানা নয়, ব্যবসার বিক্রয়ের একটি সম্মত অংশ আপনি পান।",
  },
  ticket: {
    en: "Ticket — the amount a single investor puts into one opportunity.",
    bn: "টিকেট (Ticket) — একজন বিনিয়োগকারীর একটি সুযোগে দেওয়া পরিমাণ।",
  },
  exit: {
    en: "Exit — the event where you sell your stake (buyback, sale of the company) and realize your return.",
    bn: "এক্সিট (Exit) — আপনার অংশ বিক্রি করার ঘটনা (বাইব্যাক, কোম্পানি বিক্রি) — তখনই রিটার্ন বাস্তব হয়।",
  },
  multiple: {
    en: "Multiple — how many times your invested money an exit returns. 2x means you get back double.",
    bn: "মাল্টিপল (Multiple) — এক্সিটে আপনার বিনিয়োগ কত গুণ ফেরত আসে। ২x মানে দ্বিগুণ।",
  },
  "data room": {
    en: "Data room — a secure collection of a business's documents that investors use to verify claims.",
    bn: "ডেটা রুম (Data Room) — ব্যবসার নথির নিরাপদ সংগ্রহ, যা দেখে বিনিয়োগকারীরা দাবি যাচাই করেন।",
  },
  nda: {
    en: "NDA — a confidentiality agreement signed before sensitive business details are shared.",
    bn: "NDA — সংবেদনশীল ব্যবসার তথ্য শেয়ারের আগে স্বাক্ষরিত গোপনীয়তা চুক্তি।",
  },
  "capital loss": {
    en: "Capital loss — losing part or all of the money you invested. In private investments, total loss is possible.",
    bn: "ক্যাপিটাল লস (Capital loss) — বিনিয়োগ করা টাকার কিছু বা সব হারানো। প্রাইভেট বিনিয়োগে সম্পূর্ণ হারানোও সম্ভব।",
  },
  "exit multiple": {
    en: "Exit multiple — the price the business sells for, as a multiple of its earnings or revenue. Higher entry price, higher bar to clear.",
    bn: "এক্সিট মাল্টিপল (Exit multiple) — ব্যবসা বিক্রির দাম, আয় বা রাজস্বের গুণিতক হিসেবে। প্রবেশমূল্য যত বেশি, বাধাও তত উঁচু।",
  },
};

/** Short localized display labels for glossary chips (keys into GLOSSARY) */
export const GLOSSARY_LABELS: Record<string, L> = {
  equity: { en: "Equity", bn: "ইক্যুইটি" } as L,
  valuation: { en: "Valuation", bn: "ভ্যালুয়েশন" } as L,
  "due diligence": { en: "Due Diligence", bn: "ডিউ ডিলিজেন্স" } as L,
  "revenue share": { en: "Revenue Share", bn: "রেভিনিউ শেয়ার" } as L,
  ticket: { en: "Ticket", bn: "টিকেট" } as L,
  exit: { en: "Exit", bn: "এক্সিট" } as L,
  multiple: { en: "Multiple", bn: "মাল্টিপল" } as L,
  "data room": { en: "Data Room", bn: "ডেটা রুম" } as L,
  nda: { en: "NDA", bn: "NDA" } as L,
  "capital loss": { en: "Capital Loss", bn: "ক্যাপিটাল লস" } as L,
  "exit multiple": { en: "Exit Multiple", bn: "এক্সিট মাল্টিপল" } as L,
};

/* ── Match Me mini-quiz (blueprint §7 #5, R2) ── */
export const MATCH = {
  eyebrow: { en: "MATCH ME", bn: "আমার ম্যাচ" } as L,
  title: { en: "What should you look at first?", bn: "আগে কোনদিকে তাকাবেন?" } as L,
  sub: {
    en: "Four quick questions — we'll point you to the sectors and tickets that typically fit.",
    bn: "চারটি দ্রুত প্রশ্ন — সাধারণত যেসব খাত ও টিকেট আপনার সাথে মেলে, সেদিকেই ইঙ্গিত করব।",
  } as L,
  restart: { en: "Start over", bn: "আবার শুরু করুন" } as L,
  questions: [
    {
      q: { en: "Which sector draws your eye?", bn: "কোন খাত আপনার নজর টানে?" } as L,
      opts: [
        { key: "garments", en: "Garments & manufacturing", bn: "গার্মেন্টস ও ম্যানুফ্যাকচারিং" },
        { key: "agri", en: "Agri & food", bn: "কৃষি ও খাদ্য" },
        { key: "logistics", en: "Logistics & trade", bn: "লজিস্টিকস ও বাণিজ্য" },
        { key: "any", en: "Show me everything", bn: "সব দেখান" },
      ],
    },
    {
      q: { en: "What's a comfortable ticket?", bn: "কত টিকেট আরামদায়ক?" } as L,
      opts: [
        { key: "small", en: "৳5–25 lakh", bn: "৳৫–২৫ লক্ষ" },
        { key: "mid", en: "৳25 lakh–1 crore", bn: "৳২৫ লক্ষ–১ কোটি" },
        { key: "large", en: "৳1 crore+", bn: "৳১ কোটি+" },
      ],
    },
    {
      q: { en: "How long can the money work?", bn: "টাকা কতদিন কাজে রাখতে পারবেন?" } as L,
      opts: [
        { key: "short", en: "2–3 years", bn: "২–৩ বছর" },
        { key: "medium", en: "3–5 years", bn: "৩–৫ বছর" },
        { key: "long", en: "5+ years", bn: "৫+ বছর" },
      ],
    },
    {
      q: { en: "How do you feel about risk?", bn: "ঝুঁকি নিয়ে আপনার অনুভূতি?" } as L,
      opts: [
        { key: "cautious", en: "Cautious — capital first", bn: "সতর্ক — মূলধন আগে" },
        { key: "balanced", en: "Balanced", bn: "ভারসাম্যপূর্ণ" },
        { key: "comfortable", en: "Comfortable with real risk", bn: "প্রকৃত ঝুঁকিতে স্বাচ্ছন্দ্য" },
      ],
    },
  ],
  resultTitle: { en: "Your starting point", bn: "আপনার শুরুর জায়গা" } as L,
  matches: (n: number): L => ({
    en: `${n} verified opportunit${n === 1 ? "y" : "ies"} fit this profile right now`,
    bn: `এই মুহূর্তে ${n}টি যাচাইকৃত সুযোগ এই প্রোফাইলের সাথে মেলে`,
  }),
  registerCta: { en: "Register to see them", bn: "দেখতে রেজিস্টার করুন" } as L,
  disclaimer: {
    en: "A simple pointer, not advice — every decision deserves full diligence.",
    bn: "সহজ ইঙ্গিত, পরামর্শ নয় — প্রতিটি সিদ্ধান্তে পূর্ণ যাচাই প্রাপ্য।",
  } as L,
};

/* ── Newsletter / priority list (footer, R2) ── */
export const NEWSLETTER = {
  title: { en: "The Deal Room, monthly", bn: "ডিল রুম, মাসিক" } as L,
  sub: {
    en: "New vetted opportunities and honest market notes — no noise.",
    bn: "নতুন যাচাইকৃত সুযোগ ও সৎ বাজার-নোট — কোনো কোলাহল নেই।",
  } as L,
  placeholder: { en: "you@example.com", bn: "you@example.com" } as L,
  join: { en: "Join", bn: "যোগ দিন" } as L,
  joined: { en: "You're on the list ✓", bn: "আপনি লিস্টে আছেন ✓" } as L,
  privacy: {
    en: "One email a month. Unsubscribe anytime.",
    bn: "মাসে একটি ইমেইল। যেকোনো সময় বন্ধ করুন।",
  } as L,
};

/* ── Scenario Simulator (blueprint §7 #7, R3) — downside first, illustrative only ── */
export const SIM = {
  eyebrow: { en: "SCENARIO SIMULATOR", bn: "সিনারিও সিমুলেটর" } as L,
  title: {
    en: "See the downside before you dream of the upside.",
    bn: "আপসাইডের স্বপ্নের আগে ডাউনসাইড দেখুন।",
  } as L,
  sub: {
    en: "Move the sliders to model an illustrative minority equity investment. The downside case leads — that's the honest starting point.",
    bn: "সংখ্যালঘু ইক্যুইটি বিনিয়োগের একটি নমুনা হিসাব করতে স্লাইডার সরান। ডাউনসাইড কেস আগে — সৎ শুরু সেটাই।",
  } as L,
  illustrative: {
    en: "Illustrative only — not a forecast, not advice",
    bn: "শুধুই নমুনা — পূর্বাভাস নয়, পরামর্শ নয়",
  } as L,
  controls: {
    ticket: { en: "Your ticket", bn: "আপনার টিকেট" } as L,
    stake: { en: "Stake acquired", bn: "অর্জিত অংশীদারিত্ব" } as L,
    growth: { en: "Business growth / year", bn: "বার্ষিক বৃদ্ধি (ভিত্তি কেস)" } as L,
    years: { en: "Holding period", bn: "ধারণকাল" } as L,
  },
  impliedValuation: {
    en: "Implied entry valuation", bn: "নিহিত প্রবেশ ভ্যালুয়েশন",
  } as L,
  yearsUnit: (n: number): L => ({
    en: `${n} year${n > 1 ? "s" : ""}`,
    bn: `${n === 1 ? "১" : n === 2 ? "২" : n === 3 ? "৩" : n === 4 ? "৪" : n === 5 ? "৫" : n === 6 ? "৬" : n === 7 ? "৭" : "৮"} বছর`,
  }),
  scenarios: {
    down: { name: { en: "Downside", bn: "ডাউনসাইড" } as L,
      desc: { en: "Growth misses the plan; exit multiple compresses.", bn: "পরিকল্পনা অনুযায়ী হয় না; এক্সিট মাল্টিপল কমে।" } as L },
    base: { name: { en: "Base", bn: "বেস" } as L,
      desc: { en: "The plan mostly works; multiple holds.", bn: "পরিকল্পনা মোটামুটি কাজ করে; মাল্টিপল ধরে থাকে।" } as L },
    up: { name: { en: "Upside", bn: "আপসাইড" } as L,
      desc: { en: "Plan beats expectations; multiple expands.", bn: "প্রত্যাশা ছাড়িয়ে যায়; মাল্টিপল বাড়ে।" } as L },
  },
  exitValue: { en: "Est. value at exit", bn: "এক্সিটে আনুমানিক মূল্য" } as L,
  multipleLabel: { en: "Multiple", bn: "মাল্টিপল" } as L,
  changeLabel: { en: "vs. ticket", bn: "টিকেটের তুলনায়" } as L,
  loss: { en: "loss", bn: "ক্ষতি" } as L,
  gain: { en: "gain", bn: "লাভ" } as L,
  reset: { en: "Reset", bn: "রিসেট" } as L,
  footnote: {
    en: "Private investments can lose all capital. This simple model ignores dilution, fees and taxes — real outcomes vary.",
    bn: "প্রাইভেট বিনিয়োগে সম্পূর্ণ মূলধন হারানো সম্ভব। এই সরল মডেল ডিলিউশন, ফি ও কর ধরে না — বাস্তব ফল ভিন্ন হতে পারে।",
  } as L,
  saveTitle: { en: "Save this scenario", bn: "সিনারিওটি সেভ করুন" } as L,
  saveSub: {
    en: "We'll email you the numbers and walk through them on a call — no obligation.",
    bn: "সংখ্যাগুলো ইমেইলে পাঠাব ও একটি কলে বুঝিয়ে দেব — কোনো বাধ্যবাধকতা নেই।",
  } as L,
  saveCta: { en: "Send me the numbers", bn: "সংখ্যাগুলো পাঠান" } as L,
  saved: { en: "On its way ✓", bn: "পথে আছে ✓" } as L,
  saveErr: {
    en: "Couldn't save — check the email and try again.",
    bn: "সেভ হয়নি — ইমেইল দেখে আবার চেষ্টা করুন।",
  } as L,
  /* R4-2: quick-start presets */
  presetsLabel: { en: "Quick starts", bn: "কুইক স্টার্ট" } as L,
  presets: [
    {
      key: "conservative",
      name: { en: "Conservative", bn: "সংরক্ষণশীল" } as L,
      desc: { en: "Smaller ticket, slower growth, longer hold.", bn: "ছোট টিকেট, ধীর বৃদ্ধি, দীর্ঘ ধারণ।" } as L,
      values: { ticket: 75, stake: 8, growth: 6, years: 7 },
    },
    {
      key: "balanced",
      name: { en: "Balanced", bn: "ভারসাম্যপূর্ণ" } as L,
      desc: { en: "The default starting point most investors model.", bn: "বেশিরভাগ বিনিয়োগকারী যেখান থেকে শুরু করেন।" } as L,
      values: { ticket: 100, stake: 10, growth: 12, years: 5 },
    },
    {
      key: "ambitious",
      name: { en: "Ambitious", bn: "উচ্চাকাঙ্ক্ষী" } as L,
      desc: { en: "Larger ticket, faster growth, shorter hold.", bn: "বড় টিকেট, দ্রুত বৃদ্ধি, ছোট ধারণ।" } as L,
      values: { ticket: 200, stake: 20, growth: 20, years: 4 },
    },
  ] as {
    key: string;
    name: L;
    desc: L;
    values: { ticket: number; stake: number; growth: number; years: number };
  }[],
  /* R4-2: share-permalink of slider state */
  shareLabel: { en: "Share this scenario", bn: "সিনারিও শেয়ার করুন" } as L,
  shareHint: {
    en: "Copies a link with your current inputs — send it to a friend or advisor.",
    bn: "বর্তমান ইনপুটসহ একটি লিংক কপি হয় — বন্ধু বা অ্যাডভাইজারকে পাঠান।",
  } as L,
  copied: { en: "Link copied ✓", bn: "লিংক কপি হয়েছে ✓" } as L,
  sharedApplied: { en: "Loaded a shared scenario ✓", bn: "শেয়ার করা সিনারিও লোড হয়েছে ✓" } as L,
};

/* ── Per-listing illustrative scenarios in opportunity dialog (blueprint §5.5, R4) ── */
export type ScenMode = "equity" | "revshare";
export type ScenAssumption = {
  /** annual growth in % (equity mode) — unused in revshare */
  growth?: number;
  /** exit multiple (equity) or return multiple (revshare) */
  multiple: number;
  note: L;
};
export const SCEN = {
  eyebrow: { en: "Illustrative scenarios", bn: "নমুনা সিনারিও" } as L,
  ticketModeled: { en: "modeled on the midpoint ticket", bn: "মধ্যম টিকেট ধরে হিসাব" } as L,
  modeEquity: { en: "Equity — exit model", bn: "ইক্যুইটি — এক্সিট মডেল" } as L,
  modeRevshare: { en: "Revenue share — payback model", bn: "রেভিনিউ শেয়ার — পেব্যাক মডেল" } as L,
  horizon: (y: number): L => ({
    en: `${y}-year view`,
    bn: `${bnDigit(y)} বছরের দৃশ্য`,
  }),
  revshareNote: {
    en: "Revenue-share deals return a fixed multiple of your ticket, not an exit multiple — proceeds depend on the business keeping up its payments.",
    bn: "রেভিনিউ-শেয়ার ডিলে টিকেটের একটি নির্দিষ্ট গুণিতক ফেরত আসে, এক্সিট মাল্টিপল নয় — ফেরত নির্ভর করে ব্যবসা পেমেন্ট ধরে রাখতে পারে কি নায়।",
  } as L,
  breakEven: { en: "dashed line = break-even (your ticket back)", bn: "ড্যাশড রেখা = ব্রেক-ইভেন (টিকেট ফেরত)" } as L,
  footnote: {
    en: "Assumptions are ours for illustration only — not the company's forecast and not advice. Private investments can lose all capital; this simple model ignores dilution, fees and taxes.",
    bn: "অনুমানগুলো শুধুই নমুনা হিসেবে আমাদের — কোম্পানির পূর্বাভাস বা পরামর্শ নয়। প্রাইভেট বিনিয়োগে সম্পূর্ণ মূলধন হারানো সম্ভব; এই সরল মডেল ডিলিউশন, ফি ও কর ধরে না।",
  } as L,
  tryYourOwn: { en: "Try your own numbers", bn: "নিজের সংখ্যা দিয়ে দেখুন" } as L,
  equityFallback: { years: 5, down: 0.6, base: 1.0, up: 1.25, baseGrowth: 10 } as const,
  listings: {
    "rmg-201-denim-knitwear": {
      mode: "equity" as ScenMode,
      years: 5,
      ticket: 200,
      down: {
        growth: -5,
        multiple: 0.6,
        note: { en: "Western demand softens and buyer concentration bites; margins compress.", bn: "পশ্চিমা চাহিদা কমে ও অল্প কিছু বায়ারের ওপর নির্ভরতা চেপে ধরে; মার্জিন সংকুচিত হয়।" } as L,
      } as ScenAssumption,
      base: {
        growth: 10,
        multiple: 1.0,
        note: { en: "Order book holds; the new line runs close to plan; the multiple holds.", bn: "অর্ডার বই ধরে থাকে; নতুন লাইন পরিকল্পনার কাছাকাছি চলে; মাল্টিপল অটুট থাকে।" } as L,
      } as ScenAssumption,
      up: {
        growth: 18,
        multiple: 1.25,
        note: { en: "Certified capacity wins new buyers; premium pricing lifts margins.", bn: "সার্টিফায়েড ক্যাপাসিটি নতুন বায়ার আনে; প্রিমিয়াম দামে মার্জিন বাড়ে।" } as L,
      } as ScenAssumption,
    },
    "agf-105-poultry-eggs": {
      mode: "revshare" as ScenMode,
      years: 4,
      ticket: 75,
      down: {
        multiple: 0.75,
        note: { en: "Feed costs spike or a disease outbreak disrupts supply; payments slow.", bn: "খাদ্যব্যয় বাড়ে বা রোগের প্রাদুর্ভাবে সরবরাহ ব্যাহত হয়; পেমেন্ট ধীর হয়ে যায়।" } as L,
      } as ScenAssumption,
      base: {
        multiple: 1.5,
        note: { en: "The farm hits contracted volumes; the fixed share pays on schedule.", bn: "ফার্ম চুক্তিভিত্তিক ভলিউমে পৌঁছায়; নির্দিষ্ট শেয়ার সময়মতো পরিশোধ হয়।" } as L,
      } as ScenAssumption,
      up: {
        multiple: 2.1,
        note: { en: "Retail and bakery contracts expand; the share pays out early.", bn: "রিটেইল ও বেকারি চুক্তি বাড়ে; শেয়ার নির্ধারিত সময়ের আগেই পরিশোধ হয়।" } as L,
      } as ScenAssumption,
    },
    "ccl-308-cold-chain": {
      mode: "equity" as ScenMode,
      years: 5,
      ticket: 300,
      down: {
        growth: 2,
        multiple: 0.55,
        note: { en: "Power costs and utilization disappoint; expansion stalls.", bn: "বিদ্যুৎ ব্যয় ও ব্যবহারের হার হতাশ করে; সম্প্রসারণ আটকে যায়।" } as L,
      } as ScenAssumption,
      base: {
        growth: 20,
        multiple: 1.0,
        note: { en: "Pharma and grocery contracts fill the new capacity on schedule.", bn: "ফার্মা ও গ্রোসারি চুক্তি নতুন ক্যাপাসিটি সময়মতো পূরণ করে।" } as L,
      } as ScenAssumption,
      up: {
        growth: 28,
        multiple: 1.15,
        note: { en: "Cold-chain demand compounds; the network commands a premium multiple.", bn: "কোল্ড-চেইন চাহিদা যৌগিক হারে বাড়ে; নেটওয়ার্ক প্রিমিয়াম মাল্টিপল পায়।" } as L,
      } as ScenAssumption,
    },
  } as Record<
    string,
    { mode: ScenMode; years: number; ticket: number; down: ScenAssumption; base: ScenAssumption; up: ScenAssumption }
  >,
};

/** Bangla digit helper for content-level interpolation */
function bnDigit(n: number): string {
  const map = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(n).replace(/[0-9]/g, (d) => map[Number(d)]);
}

/* ── Express-interest form in opportunity dialog (blueprint §7 #19, R3) ── */
export const EXPRESS = {
  title: { en: "Express interest", bn: "আগ্রহ জানান" } as L,
  sub: {
    en: "Record your interest in this listing — an advisor reviews every one before introductions.",
    bn: "এই লিস্টিংয়ে আপনার আগ্রহ রেকর্ড করুন — পরিচয় করানোর আগে একজন অ্যাডভাইজার প্রতিটি আগ্রহ পর্যালোচনা করেন।",
  } as L,
  email: { en: "Email", bn: "ইমেইল" } as L,
  name: { en: "Name (optional)", bn: "নাম (ঐচ্ছিক)" } as L,
  note: { en: "Anything we should know? (optional)", bn: "আমাদের জানা দরকার এমন কিছু? (ঐচ্ছিক)" } as L,
  notePlaceholder: {
    en: "e.g. I've invested in this sector before…",
    bn: "যেমন: এই খাতে আগে বিনিয়োগ করেছি…",
  } as L,
  submit: { en: "Submit interest", bn: "আগ্রহ পাঠান" } as L,
  submitting: { en: "Sending…", bn: "পাঠানো হচ্ছে…" } as L,
  successTitle: { en: "Interest recorded ✓", bn: "আগ্রহ রেকর্ড হয়েছে ✓" } as L,
  successBody: {
    en: "An advisor will review your interest and reach out within 2 business days.",
    bn: "একজন অ্যাডভাইজার আপনার আগ্রহ পর্যালোচনা করে ২ কার্যদিবসের মধ্যে যোগাযোগ করবেন।",
  } as L,
  successAnother: { en: "Done — back to listing", bn: "সম্পন্ন — লিস্টিংয়ে ফিরুন" } as L,
  errEmail: { en: "Enter a valid email address.", bn: "সঠিক ইমেইল ঠিকানা দিন।" } as L,
  errGeneric: {
    en: "Something went wrong — please try again.",
    bn: "কিছু একটা সমস্যা হয়েছে — আবার চেষ্টা করুন।",
  } as L,
};

/* ── Insight article reader (R4-3) ── */
export const READER = {
  updatedLabel: { en: "Updated", bn: "হালনাগাদ" } as L,
  keyTakeawaysTitle: { en: "Key takeaways", bn: "মূল কথা" } as L,
  termsLabel: { en: "Terms explained", bn: "শব্দের ব্যাখ্যা" } as L,
  nextStepsTitle: { en: "Next steps", bn: "পরবর্তী পদক্ষেপ" } as L,
  nextStepsSub: {
    en: "This guide is free to read — no registration needed. When you're ready for live, vetted opportunities, the Deal Room is one step away.",
    bn: "এই গাইড পড়তে কোনো রেজিস্ট্রেশন লাগে না। যাচাই-করা সরাসরি সুযোগ দেখতে যখন প্রস্তুত হবেন, ডিল রুম তখন এক ধাপ দূরে।",
  } as L,
  registerCta: { en: "Register for the Deal Room", bn: "ডিল রুমে রেজিস্টার করুন" } as L,
  bookCallCta: { en: "Book a Call", bn: "কল বুক করুন" } as L,
  scrollProgressAria: { en: "Reading progress", bn: "পড়ার অগ্রগতি" } as L,
  notFound: {
    en: "This guide could not be found. Close it and open it again from the Insights section.",
    bn: "গাইডটি খুঁজে পাওয়া যায়নি। বন্ধ করে ইনসাইটস থেকে আবার খুলুন।",
  } as L,
};

/** One numbered section inside an article (list = optional bullet items). */
export type ArticleSection = { h: L; body: L; list?: L[] };

/**
 * Full bilingual article bodies behind the three Insights cards (R4-3).
 * Keys are the INSIGHTS.articles slugs. `updated` is an ISO date.
 */
export const ARTICLES: Record<
  string,
  { updated: string; sections: ArticleSection[]; takeaways: L[]; terms: string[] }
> = {
  "sme-due-diligence-checklist": {
    updated: "2026-09-08",
    sections: [
      {
        h: { en: "Why a checklist, not a feeling", bn: "অনুভূতি নয়, চেকলিস্ট কেন" } as L,
        body: {
          en: "Most SME investments in Bangladesh don't go wrong because the idea was bad. They go wrong because nobody checked the basics — the company wasn't properly registered, the owner wasn't who they claimed to be, or the bank statements told a different story than the pitch deck. A founder's confidence is not evidence. This is the checklist we run before any business enters our Deal Room: twelve checks, grouped into four themes, in the order we actually do them.\n\nWork through it in order. The first theme is cheap to verify and filters out impostors fast. The later themes take longer, but they tell you whether the business can actually absorb your money — and what it plans to do with it.",
          bn: "বাংলাদেশে বেশিরভাগ এসএমই বিনিয়োগ ব্যর্থ হয় আইডিয়া খারাপ থাকার কারণে নয়। ব্যর্থ হয় কারণ কেউ মৌলিক বিষয়গুলোই যাচাই করেনি — কোম্পানির নিবন্ধন ঠিক ছিল না, মালিক যে দাবি করছিলেন তিনি-ই ছিলেন না, বা ব্যাংক স্টেটমেন্ট পিচ ডেকের গল্পের সাথে মিলছিল না। ফাউন্ডারের আত্মবিশ্বাস প্রমাণ নয়। ডিল রুমে ঢোকানোর আগে আমরা যে চেকলিস্ট চালাই এটাই: বারোটি যাচাই, চারটি থিমে সাজানো, যে ক্রমে আমরা কাজ করি।\n\nক্রম মেনেই এগোন। প্রথম থিমটি যাচাই করা সস্তা, আর ভুয়া দাবি সেখানেই দ্রুত বাদ পড়ে। পরের থিমগুলোতে সময় লাগে, কিন্তু সেখানেই বোঝা যায় ব্যবসাটি সত্যিই আপনার টাকা হজম করতে পারবে কি না — আর সেই টাকায় কী করতে চায়।",
        } as L,
      },
      {
        h: { en: "Identity & ownership — points 1 to 4", bn: "পরিচয় ও মালিকানা — পয়েন্ট ১–৪" } as L,
        body: {
          en: "Before you look at any numbers, confirm the business legally exists and find out who actually owns it. In Bangladesh that means three documents and one register. Each is a five-minute check.",
          bn: "কোনো সংখ্যায় তাকানোর আগে নিশ্চিত করুন ব্যবসাটি আইনগতভাবে আছে, আর আসলে কে মালিক। বাংলাদেশে তার জন্য লাগে তিনটি নথি আর একটি রেজিস্টার — প্রতিটিই পাঁচ মিনিটের যাচাই।",
        } as L,
        list: [
          {
            en: "RJSC incorporation papers — registered with the Register of Joint Stock Companies and Firms. The company name on the papers must match the name on the bank account they want you to send money to.",
            bn: "আরজেএসসি নিবন্ধনপত্র — রেজিস্টার অব জয়েন্ট স্টক কোম্পানিজ অ্যান্ড ফার্মসে নিবন্ধিত। নথির কোম্পানির নাম আর যে ব্যাংক হিসাবে টাকা চাওয়া হবে তার নাম এক হতে হবে।",
          } as L,
          {
            en: "Trade license — issued by the City Corporation or local authority, renewed for the current year. An expired license is a small thing that signals bigger neglect.",
            bn: "ট্রেড লাইসেন্স — সিটি কর্পোরেশন বা স্থানীয় কর্তৃপক্ষ প্রদত্ত, চলতি বছরে নবায়নকৃত। মেয়াদোত্তীর্ণ লাইসেন্স ছোট বিষয়, কিন্তু বড় অবহেলার ইঙ্গিত।",
          } as L,
          {
            en: "TIN and BIN — the entity's Tax Identification Number and its Business Identification Number for VAT. Ask whether VAT returns are actually being filed; a BIN nobody files under is a quiet warning.",
            bn: "টিআইএন ও বিআইএন — প্রতিষ্ঠানের কর শনাক্তকরণ নম্বর এবং ভ্যাটের বিজনেস আইডেন্টিফিকেশন নম্বর। জিজ্ঞেস করুন ভ্যাট রিটার্ন আদৌ জমা হচ্ছে কি না; যে বিআইএন-এর অধীনে কেউ কিছু জমা দেয় না, সেটি নীরব সতর্কবার্তা।",
          } as L,
          {
            en: "Shareholder register — the current owners with percentages. Who really controls the company? Side arrangements (“my uncle actually holds 30%”) must surface now, not after your money is in.",
            bn: "শেয়ারহোল্ডার রেজিস্টার — বর্তমান মালিকদের তালিকা, শতকরা অংশসহ। কোম্পানি আসলে কে নিয়ন্ত্রণ করেন? পার্শ্বচুক্তি (“আসলে আমার চাচা ৩০% রাখেন”) এখনই বেরিয়ে আসা চাই, টাকা ঢোকানোর পরে নয়।",
          } as L,
        ],
      },
      {
        h: { en: "Financials — points 5 to 7", bn: "আর্থিক বিবরণী — পয়েন্ট ৫–৭" } as L,
        body: {
          en: "SME financials in Bangladesh are often informal, so the standard is not a Big Four audit. The standard is simpler and much harder to fake: consistency with the bank statements.",
          bn: "বাংলাদেশে এসএমই-এর হিসাব প্রায়ই অনানুষ্ঠানিক, তাই মানদণ্ড বড় ফার্মের অডিট নয়। মানদণ্ড সহজ কিন্তু ভাঁড়ানো অনেক কঠিন: ব্যাংক স্টেটমেন্টের সাথে মিল আছে কি না।",
        } as L,
        list: [
          {
            en: "Audited or reviewed statements — at least the last two years, prepared by a named practitioner you can actually contact.",
            bn: "অডিটেড বা রিভিউড বিবরণী — অন্তত গত দুই বছরের, যে হিসাবরক্ষকের নাম দেওয়া আছে তাঁর সাথে সত্যিই যোগাযোগ করা যায়।",
          } as L,
          {
            en: "Bank statements against claimed revenue — the single most useful check in this whole list. Deposits that don't match the claimed sales, heavy unexplained cash withdrawals, or round-number transfers between personal accounts tell a different story than the deck does.",
            bn: "দাবি করা আয়ের বিপরীতে ব্যাংক স্টেটমেন্ট — পুরো তালিকার সবচেয়ে কার্যকর যাচাই। বিক্রয়ের দাবির সাথে জমা না মিললে, ব্যাখ্যাহীন নগদ উত্তোলন বেশি হলে, বা ব্যক্তিগত হিসাবের মধ্যে গোল অঙ্কের লেনদেন চললে — স্টেটমেন্ট ডেকের চেয়ে ভিন্ন গল্প বলে।",
          } as L,
          {
            en: "Debt schedule — every loan: from whom, at what rate, secured against what, and whether repayments are current. Quiet term loans from NGOs, microfinance institutions or family members surface here — and they stand ahead of you in the queue if things go wrong.",
            bn: "দায়ের তালিকা — প্রতিটি ঋণ: কার কাছ থেকে, কী হারে, কী জামানতে, কিস্তি চলছে কি না। এনজিও, মাইক্রোফাইন্যান্স প্রতিষ্ঠান বা পরিবারের কাছ থেকে নেওয়া চুপচাপ ঋণ এখানেই বেরিয়ে আসে — আর বিপদে পড়লে এই ঋণগুলো লাইনে আপনার আগেই দাঁড়িয়ে থাকে।",
          } as L,
        ],
      },
      {
        h: { en: "Operations — points 8 to 10", bn: "পরিচালনা — পয়েন্ট ৮–১০" } as L,
        body: {
          en: "These checks ask whether the business works day to day — and whether it depends on one fragile relationship to survive.",
          bn: "এই যাচাইগুলো দেখে ব্যবসাটি দিন প্রতিদিন চলে কি না — আর টিকে থাকতে একটি ভঙ্গুর সম্পর্কের ওপর নির্ভর করে কি না।",
        } as L,
        list: [
          {
            en: "Customer concentration — if one buyer is more than half of revenue, you're not investing in a business; you're investing in that relationship. What happens to it if the founder steps back?",
            bn: "গ্রাহক ঘনত্ব — একজন ক্রেতা যদি আয়ের অর্ধেকের বেশি হয়, তবে আপনি ব্যবসায় বিনিয়োগ করছেন না; সেই সম্পর্কে করছেন। ফাউন্ডার পিছনে সরলে সেই সম্পর্কের কী হবে?",
          } as L,
          {
            en: "Supplier terms — advance payment or credit? Single-source imported inputs? What happens if the main supplier raises prices or stops supplying? Fragile inputs cap how much money the business can usefully absorb.",
            bn: "সরবরাহকারীর শর্ত — আগে টাকা, নাকি বাকিতে মাল? ইনপুট কি একটাই উৎস থেকে আমদানি হয়? প্রধান সরবরাহকারী দাম বাড়ালে বা মাল বন্ধ করলে কী হবে? ভঙ্গুর ইনপুট ঠিক করে দেয় ব্যবসাটি কাজে লাগাতে পারবে কত টাকা — তার সর্বোচ্চ সীমা।",
          } as L,
          {
            en: "Inventory and physical checks — count what can be counted. Visit the factory, the godown, the shop floor, unannounced if you can. Photos in a deck age quickly; a physical visit does not.",
            bn: "মজুত ও সরাসরি পরিদর্শন — যা গোনা যায়, গুনে দেখুন। কারখানা, গুদাম, দোকানের ফ্লোর — সম্ভব হলে আগে জানিয়ে না গিয়েই। ডেকের ছবি তাড়াতাড়ি পুরনো হয়ে যায়; নিজে ঘুরে দেখা হয় না।",
          } as L,
        ],
      },
      {
        h: { en: "The deal itself — points 11 and 12", bn: "ডিল নিজেই — পয়েন্ট ১১–১২" } as L,
        body: {
          en: "The last two checks are about the future rather than the past: what the money is for, and whether the words around it will hold.",
          bn: "শেষ দুটি যাচাই অতীত নয়, ভবিষ্যতের বিষয়ে: টাকাটা কী কাজে লাগবে, আর কথার চারপাশের বাঁধন টিকবে কি না।",
        } as L,
        list: [
          {
            en: "Use of funds — where exactly the money goes, in what order, tied to which milestones. “Working capital” is not an answer; a month-by-month plan is.",
            bn: "তহবিলের ব্যবহার — টাকা ঠিক কোথায় যাবে, কোন ক্রমে, কোন মাইলফলকগুলোর সাথে বাঁধা। “ওয়ার্কিং ক্যাপিটাল” উত্তর নয়; মাস ধরে সাজানো পরিকল্পনা উত্তর।",
          } as L,
          {
            en: "Written agreements and references — every term in writing and signed, and conversations with at least two people who have dealt with the founder before: a supplier, a former employee, a previous investor. Phone calls, not letters of introduction.",
            bn: "লিখিত চুক্তি ও রেফারেন্স — প্রতিটি শর্ত লিখিত ও স্বাক্ষরিত, আর ফাউন্ডারের সাথে আগে কাজ করা অন্তত দুজনের সাথে সরাসরি কথা: একজন সরবরাহকারী, একজন সাবেক কর্মী, বা আগের কোনো বিনিয়োগকারী। পরিচিতির চিঠি নয়, ফোনকল।",
          } as L,
        ],
      },
      {
        h: { en: "What documents to ask for first", bn: "প্রথমে কোন নথিগুলো চাইবেন" } as L,
        body: {
          en: "Don't request everything on day one — a founder running a real business can't produce fifty files overnight, and shouldn't have to. Ask for a small first batch and watch how the request is handled:\n\nA serious founder will organize these into a data room and won't balk at signing an NDA first — that's standard professional practice, not an insult. Endless delays, phone photos of documents, or “we'll show you everything after you commit” are answers in themselves.",
          bn: "প্রথম দিনেই সব কিছু চাইবেন না — সত্যিকারের ব্যবসা চালানো ফাউন্ডার রাতারাতি পঞ্চাশটা ফাইল হাজির করতে পারেন না, পারার কথাও নয়। ছোট একটা প্রথম ব্যাচ চান, আর খেয়াল করুন অনুরোধটা কীভাবে সামলানো হয়:\n\nগুরুত্বশীল ফাউন্ডার এগুলো গুছিয়ে ডেটা রুম বানাবেন এবং আগে এনডিএ সই করতে দ্বিধা করবেন না — এটা পেশাদারি প্রথা, অপমান নয়। অহরহ দেরি, নথির ফোনে-তোলা ছবি, বা “কমিট করার পরে সব দেখাব” — এগুলো নিজেই এক একটা উত্তর।",
        } as L,
        list: [
          { en: "RJSC incorporation papers, trade license, TIN and BIN certificates", bn: "আরজেএসসি নিবন্ধনপত্র, ট্রেড লাইসেন্স, টিআইএন ও বিআইএন সনদ" } as L,
          { en: "Bank statements for the last 12 months — all accounts, all pages, collected from the bank directly", bn: "গত ১২ মাসের ব্যাংক স্টেটমেন্ট — সব হিসাব, সব পাতা, সরাসরি ব্যাংক থেকে সংগ্রহ করা" } as L,
          { en: "The shareholder register and copies of any loan agreements", bn: "শেয়ারহোল্ডার রেজিস্টার এবং ঋণসংক্রান্ত চুক্তিপত্রের কপি" } as L,
          { en: "The use-of-funds plan, month by month", bn: "মাস ধরে সাজানো তহবিল ব্যবহারের পরিকল্পনা" } as L,
        ],
      },
      {
        h: { en: "A final word", bn: "শেষ কথা" } as L,
        body: {
          en: "No checklist makes an investment safe. Businesses fail with perfect paperwork. The honest purpose of due diligence is narrower: to replace the founder's story with evidence, so that the risk you take is the one you chose — not the one you never saw. If a check can't be completed, that isn't automatically a reason to walk away. It's a reason to price the risk, ask for protections, or slow down before any money moves.",
          bn: "কোনো চেকলিস্টই বিনিয়োগকে নিরাপদ করে না। নিখুঁত কাগজপত্র নিয়েও ব্যবসা ডুবে যায়। ডিউ ডিলিজেন্সের সৎ উদ্দেশ্য আরও সরু: ফাউন্ডারের গল্পের জায়গায় প্রমাণ বসানো, যাতে যে ঝুঁকি আপনি নিচ্ছেন সেটা আপনার বেছে নেওয়া ঝুঁকি হয় — চোখের আড়ালে থাকা নয়। কোনো যাচাই সম্পন্ন হতে না পারলে সেটা এমনিই বাদ দেওয়ার কারণ নয়। সেটা ঝুঁকির দাম ধরার, সুরক্ষা চাওয়ার, বা টাকা চলার আগে ধীর হওয়ার কারণ।",
        } as L,
      },
    ],
    takeaways: [
      {
        en: "Identity checks are cheap and fast — RJSC, trade license, TIN/BIN and the shareholder register filter out impostors before any money is discussed.",
        bn: "পরিচয়ের যাচাই সস্তা ও দ্রুত — আরজেএসসি, ট্রেড লাইসেন্স, টিআইএন/বিআইএন ও শেয়ারহোল্ডার রেজিস্টার টাকার প্রসঙ্গ আসার আগেই ভুয়া দাবি ছেঁকে ফেলে।",
      } as L,
      {
        en: "Bank statements beat pitch decks — match deposits to claimed revenue before you believe any number.",
        bn: "পিচ ডেকের চেয়ে ব্যাংক স্টেটমেন্ট বিশ্বাসযোগ্য — কোনো সংখ্যায় বিশ্বাস করার আগে জমাকে আয়ের দাবির সাথে মেলান।",
      } as L,
      {
        en: "Ask for the debt schedule — hidden loans stand ahead of you in the queue when things go wrong.",
        bn: "দায়ের তালিকা চান — বিপদে পড়লে লুকানো ঋণ লাইনে আপনার আগেই দাঁড়িয়ে থাকে।",
      } as L,
      {
        en: "Concentration is the quiet killer — one dominant customer or supplier deserves its own risk price.",
        bn: "ঘনত্বই নীরব ঘাতক — একটাই প্রধান গ্রাহক বা সরবরাহকারীর জন্য আলাদা ঝুঁকির দাম রাখুন।",
      } as L,
      {
        en: "A tidy data room and a signed NDA are the marks of a founder who has done this before.",
        bn: "গোছানো ডেটা রুম আর সই করা এনডিএ — আগে এমন কাজ করেছেন, সেই ফাউন্ডারের চিহ্ন।",
      } as L,
    ],
    terms: ["due diligence", "data room", "nda", "capital loss"],
  },

  "valuation-basics-for-founders": {
    updated: "2026-09-15",
    sections: [
      {
        h: { en: "What valuation actually is", bn: "ভ্যালুয়েশন আসলে কী" } as L,
        body: {
          en: "Valuation is not the value of your dream. It is the price of a slice of your business today, agreed between two people who want opposite things — you want the slice to be expensive, the investor wants it cheap. That tension is normal and healthy. What matters is what stands behind the number once the negotiation is over.",
          bn: "ভ্যালুয়েশন আপনার স্বপ্নের দাম নয়। এটা আপনার ব্যবসার একটা টুকরোর আজকের দাম — দুজন মানুষের মধ্যে সম্মত, যাঁরা চান উল্টো জিনিস: আপনি চান টুকরোটা দামি হোক, বিনিয়োগকারী চান সস্তা হোক। এই টানাপোড়েন স্বাভাবিক এবং স্বাস্থ্যকর। আসল প্রশ্ন একটাই — আলোচনা শেষে সংখ্যাটার পেছনে কী দাঁড়িয়ে আছে।",
        } as L,
      },
      {
        h: { en: "Investors price risk, not stories", bn: "বিনিয়োগকারীরা ঝুঁকির দাম বাঁধেন, গল্পের নয়" } as L,
        body: {
          en: "When an investor reads your numbers, one question runs underneath everything: what can go wrong here, and what happens to my money when it does? Every risk they see — an unproven team, one dominant customer, imported inputs, thin margins, no clear exit — either lowers the price or demands a protection in the agreement. You can't argue a discount away with passion. You remove it with evidence.",
          bn: "বিনিয়োগকারী আপনার সংখ্যাগুলো পড়লে ভেতরে ভেতরে একটাই প্রশ্ন চলে: এখানে কী ভুল হতে পারে, আর হলে আমার টাকার কী হবে? তাঁর চোখে পড়া প্রতিটি ঝুঁকি — অপরীক্ষিত টিম, একটাই বড় গ্রাহক, আমদানি-নির্ভর ইনপুট, পাতলা মার্জিন, অস্পষ্ট এক্সিট — হয় দাম কমায়, নয়তো চুক্তিতে সুরক্ষা চায়। আবেগ দিয়ে কোনো ছাড় ঘুচিয়ে ফেলা যায় না। প্রমাণ দিয়ে সরাতে হয়।",
        } as L,
      },
      {
        h: { en: "Comparable deals set the frame", bn: "তুলনাযোগ্য ডিলই দাঁড় করায় কাঠামো" } as L,
        body: {
          en: "Nobody values a business in a vacuum. The honest anchor is what similar businesses — same sector, similar size, similar earnings — recently raised money at or sold for. In Bangladesh, public comparables are scarce, so investors triangulate from listed-company figures, private deals they have personally seen, and plain benchmarks of experience. When a number lands on the table, ask which deals it is being compared to. If the answer is vague, the number is arbitrary — and arbitrary cuts both ways.",
          bn: "কেউ শূন্য থেকে ব্যবসার দাম ধরে না। সৎ নোঙর হলো: একই খাতের, কাছাকাছি আকার ও আয়ের ব্যবসা সম্প্রতি কোন দামে টাকা তুলেছে বা বিক্রি হয়েছে। বাংলাদেশে প্রকাশ্য তুলনা পাওয়া কঠিন, তাই বিনিয়োগকারীরা লিস্টেড কোম্পানির সংখ্যা, নিজে দেখা প্রাইভেট ডিল আর অভিজ্ঞতার ভাঙানোকে মিলিয়ে আন্দাজ করেন। টেবিলে দাম এলে জিজ্ঞেস করুন, কোন কোন ডিলের সাথে তুলনা করা হচ্ছে। উত্তর অস্পষ্ট হলে দামটা ইচ্ছেমতো — আর ইচ্ছেমতো দাম দুই দিকেই কাটে।",
        } as L,
      },
      {
        h: { en: "Earnings quality beats revenue vanity", bn: "আয়ের গুণ জেতে, রাজস্বের অহংকার হারে" } as L,
        body: {
          en: "“We did two crore in sales” is a vanity number until you show what stayed behind. Investors look at gross margin after real costs; at net profit that survives honest accounting — your own salary counted, family members on the payroll counted; and at cash actually collected, because in Bangladeshi SMEs a lot of revenue sold on credit is revenue only on paper. A business with 80 lakh in revenue and 12 lakh of clean profit is usually worth more than one with 3 crore in revenue and nothing left. And if you're growing losses, have a story about exactly when they stop.",
          bn: "“আমরা দুই কোটি বিক্রি করেছি” — কী থেকে গেল সেটা না দেখালে এটা অলংকারের সংখ্যা। বিনিয়োগকারী দেখেন প্রকৃত খরচ বাদ দিয়ে গ্রস মার্জিন; সৎ হিসাবে টেকে এমন নিট মুনাফা — আপনার বেতন ধরা, পে-রোলে থাকা পরিবারের সদস্যদের ধরা; আর সত্যিই যে টাকা নগদে এসেছে — কারণ বাংলাদেশের এসএমই-তে বাকিতে বিক্রির বড় অংশ কাগজে-কাগজেই থেকে যায়। ৮০ লক্ষ আয়ে ১২ লক্ষ পরিষ্কার মুনাফা সাধারণত ৩ কোটি আয়ে শূন্য অবশিষ্টের চেয়ে বেশি মূল্যের। আর লোকসান নিয়ে বাড়ছেন? ঠিক কখন থামবে — সেই গল্পটা আগেই তৈরি রাখুন।",
        } as L,
      },
      {
        h: { en: "Simple anchors for SMEs", bn: "এসএমই-এর জন্য সহজ নোঙর" } as L,
        body: {
          en: "For small private businesses, investors rarely pay for potential. The common anchors: a multiple of sustainable earnings — modest single digits for most traditional SMEs, higher only for genuinely scalable models; a multiple of revenue, but only where margins and growth justify it; and the blunt question, “if this business stopped growing today, what would its cash flow be worth?” If your asking valuation implies an earnings multiple several times what the stock market pays for similar listed businesses, expect a very short conversation.",
          bn: "ছোট প্রাইভেট ব্যবসায় বিনিয়োগকারীরা সম্ভাবনার দাম কদাচিৎ দেন। সাধারণ নোঙর: টেকসই আয়ের গুণিতক — প্রচলিত এসএমই-এর জন্য বিনয়ী এক-অঙ্কের সংখ্যা, বাড়তি শুধু সত্যিকারের স্কেলযোগ্য মডেলে; রাজস্বের গুণিতক — কিন্তু কেবল যেখানে মার্জিন ও প্রবৃদ্ধি তা বহন করতে পারে; আর খোঁচা-দেওয়া প্রশ্নটি — “আজ যদি বৃদ্ধি থেমে যায়, এই ব্যবসার ক্যাশ প্রবাহের দাম কত?” আপনার চাওয়া ভ্যালুয়েশন যদি ইঙ্গিত করে এমন একটা আয়-গুণিতকের, যা শেয়ারবাজার অনুরূপ লিস্টেড ব্যবসার জন্য দেয় — তার কয়েক গুণ — তবে সেই আলাপ খুব ছোট হবে।",
        } as L,
      },
      {
        h: { en: "Dilution — the round after this one", bn: "ডাইলিউশন — এই রাউন্ডের পরের রাউন্ড" } as L,
        body: {
          en: "If an investor takes 20% today and you raise again next year, the new round dilutes both of you — but you're the one who ends up with less control. Founders who negotiate only today's percentage often hand over the company by round three without ever deciding to. Before you sign anything, model two rounds ahead: who holds what, who controls the board, which veto rights have stacked up. Then negotiate this round with that picture in front of you.",
          bn: "আজ বিনিয়োগকারী ২০% নিলেন, আর আপনি আগামী বছর আবার টাকা তুললে নতুন রাউন্ড দুজনকেই ডাইলিউট করে — কিন্তু নিয়ন্ত্রণ কমে পড়ে আপনার হাতেই। যাঁরা শুধু আজকের শতকরা নিয়ে আলোচনা করেন, তাঁরা প্রায়ই তৃতীয় রাউন্ডে কোম্পানির চাবি বুঝতে-না-বুঝতেই হস্তান্তর করে ফেলেন। সই করার আগে দুই রাউন্ড পরের হিসাব করুন: কে কত অংশ ধরে আছে, বোর্ড কে নিয়ন্ত্রণ করে, কতগুলো ভেটো রাইট জমেছে। তারপর ওই ছবিটা সামনে রেখে এই রাউন্ডের আলোচনা করুন।",
        } as L,
      },
      {
        h: { en: "What makes a valuation defensible", bn: "কোন ভ্যালুয়েশন রক্ষা করা যায়" } as L,
        body: {
          en: "A defensible valuation survives the comparables question. It is consistent with the quality of your earnings. It leaves the investor a credible return after a realistic downside case — not just the case where everything works. And it doesn't depend on one irreplaceable person, because investors price that person's departure whether you do or not. If your number only works when everything goes right, it isn't a valuation. It's a hope with a price tag on it.\n\nAnd remember what you're actually selling. An equity investor isn't buying your past; they're buying a share of future profits and a believable exit. No believable exit — no price, however beautiful the story.",
          bn: "রক্ষাযোগ্য ভ্যালুয়েশন তুলনার প্রশ্ন সইতে পারে। আপনার আয়ের গুণের সাথে সামঞ্জস্য রাখে। বাস্তবসম্মত ডাউনসাইড হিসাবের পরেও — কেবল সব-ঠিক-থাকলে দশার পরে নয় — বিনিয়োগকারীর জন্য বিশ্বাসযোগ্য রিটার্ন রেখে দেয়। আর একজন অপরিহার্য মানুষের ওপর ভর করে না, কারণ আপনি ধরেন আর না ধরেন, বিনিয়োগকারী সেই মানুষটির চলে যাওয়ার দাম হিসাবেই রাখেন। যে সংখ্যা শুধু সব ঠিক গেলে খায়, সেটা ভ্যালুয়েশন নয়। সেটা দাম-লেখা একটা আশা।\n\nআর মনে রাখুন আপনি আসলে কী বিক্রি করছেন। ইক্যুইটি বিনিয়োগকারী আপনার অতীত কেনেন না; কেনেন ভবিষ্যতের মুনাফার একটা অংশ আর একটা বিশ্বাসযোগ্য এক্সিট। বিশ্বাসযোগ্য এক্সিট নেই — দাম নেই, গল্প যত সুন্দরই হোক।",
        } as L,
      },
    ],
    takeaways: [
      {
        en: "Investors price risk — every risk you remove with evidence moves the price up more than any pitch can.",
        bn: "বিনিয়োগকারীরা ঝুঁকির দাম বাঁধেন — প্রমাণ দিয়ে সরানো প্রতিটি ঝুঁকি যেকোনো পিচের চেয়ে বেশি দাম বাড়ায়।",
      } as L,
      {
        en: "Ask which comparable deals frame your number — vague comparables mean an arbitrary price.",
        bn: "জিজ্ঞেস করুন কোন ডিলগুলোর তুলনায় আপনার দাম ধরা — অস্পষ্ট তুলনা মানে যেকোনো-মতো দাম।",
      } as L,
      {
        en: "Profit that survives honest accounting beats a big revenue figure — show what stays, not what flows.",
        bn: "সৎ হিসাবে টেকা মুনাফা বড় রাজস্বের সংখ্যাকে হারায় — কী বয়ে গেল তা নয়, কী থেকে গেল সেটা দেখান।",
      } as L,
      {
        en: "Model two rounds of dilution before you sign one.",
        bn: "একটি রাউন্ডে সই করার আগে দুই রাউন্ডের ডাইলিউশন হিসাব করুন।",
      } as L,
    ],
    terms: ["valuation", "equity", "exit multiple", "multiple", "revenue share"],
  },

  "red-flags-in-investment-offers": {
    updated: "2026-09-21",
    sections: [
      {
        h: { en: "Good offers survive scrutiny", bn: "ভালো অফার যাচাই সইতে পারে" } as L,
        body: {
          en: "A legitimate investment offer is improved by questions, not damaged by them. Anyone selling an investment should welcome verification — references, documents, a lawyer reading the agreement — because a clean deal makes the sale easier. The flags below aren't proof of fraud. Each one is a reason to slow down and check. One flag is a question. Several together are an answer.",
          bn: "বৈধ বিনিয়োগ অফার প্রশ্নে আরও পরিণত হয়, ভেঙে পড়ে না। যিনিই বিনিয়োগ বিক্রি করছেন, তিনি যাচাইকে স্বাগত জানাবেন — রেফারেন্স, নথি, চুক্তি পড়ছেন এমন একজন আইনজীবী — কারণ পরিষ্কার ডিল বিক্রিই সহজ করে। নিচের ফ্ল্যাগগুলো প্রতারণার প্রমাণ নয়। প্রতিটি একটা করে থামার ও যাচাইয়ের কারণ। একটা ফ্ল্যাগ একটা প্রশ্ন; একসাথে কয়েকটা — মিলেই একটা উত্তর।",
        } as L,
      },
      {
        h: { en: "Guaranteed returns", bn: "নিশ্চিত মুনাফার প্রতিশ্রুতি" } as L,
        body: {
          en: "“Guaranteed 24% per year, completely safe” — no. Private investment is risk capital. Returns depend on the business performing and an exit actually happening, and both can fail. In Bangladesh, guaranteed-return language is the signature of savings schemes and pyramid structures, not of equity investment. The stronger the guarantee, the faster you should reach for the door. Even instruments that feel safer, like revenue share, carry the quiet risk that the revenue simply stops.",
          bn: "“বছরে নিশ্চিত ২৪%, সম্পূর্ণ নিরাপদ” — না। প্রাইভেট বিনিয়োগ ঝুঁকিপূর্ণ পুঁজি। রিটার্ন নির্ভর করে ব্যবসা চলবে কি না আর এক্সিট সত্যি হবে কি না — দুটোই ব্যর্থ হতে পারে। বাংলাদেশে নিশ্চিত-মুনাফার ভাষা সঞ্চয় কৌশল আর পিরামিড কাঠামোর স্বাক্ষর, ইক্যুইটি বিনিয়োগের নয়। গ্যারান্টি যত জোরালো, দরজার দিকে তত দ্রুত পা বাড়ান। রেভিনিউ শেয়ারের মতো নিরাপদ-মনে-হওয়া ব্যবস্থাতেও নীরব ঝুঁকি আছে — রাজস্ব এমনিই থেমে যেতে পারে।",
        } as L,
      },
      {
        h: { en: "Urgency and pressure", bn: "তাড়াহুড়া ও চাপ" } as L,
        body: {
          en: "“Only two days left.” “Three others are signing tonight.” Genuine deals survive a week of diligence; hollow ones die inside it. Urgency exists to stop you from doing exactly the things that would expose the problem — calling the references, reading the documents, consulting a lawyer. If a deadline is real, ask for it in writing with the reason attached. Then watch what happens to it under questions.",
          bn: "“মাত্র দুই দিন বাকি।” “আজ রাতে আরও তিনজন সই করছেন।” সত্যিকারের ডিল এক সপ্তাহের যাচাই সইতে পারে; ফাঁপা ডিল তার ভেতরেই মরে। তাড়াহুড়ার কাজই হলো আপনাকে ঠিক সেই কাজগুলো থেকে আটকানো, যেগুলো সমস্যা বের করে আনত — রেফারেন্সে ফোন, নথি পড়া, আইনজীবীর পরামর্শ। সময়সীমা সত্যি হলে লিখিতভাবে, কারণসহ চান। তারপর দেখুন প্রশ্নের মুখে সেটা টেকে কি না।",
        } as L,
      },
      {
        h: { en: "Paper-trail problems", bn: "কাগজের পথে গোলমেলে চিহ্ন" } as L,
        body: {
          en: "Documents are the body language of a deal. Watch how they behave:",
          bn: "নথি একটা ডিলের শারীরিক ভাষা। খেয়াল করুন এরা কেমন আচরণ করে:",
        } as L,
        list: [
          {
            en: "Missing or endlessly delayed documents — registration papers, audited statements, bank statements. “We'll share everything after you commit” is backwards. Documents come before money, every time.",
            bn: "নথি নেই বা অন্তহীন দেরি হয় — নিবন্ধনপত্র, অডিটেড বিবরণী, ব্যাংক স্টেটমেন্ট। “কমিট করলে সব দেখাব” — কথাটা উল্টো। টাকার আগে নথি, প্রতিবারই।",
          } as L,
          {
            en: "Unverifiable claims — a big foreign buyer “about to sign” whom nobody can name, references who can't be reached, awards that don't exist anywhere online. If a claim matters to the deal, it must be checkable.",
            bn: "যাচাই-অযোগ্য দাবি — “সই করতে বসে আছে” এমন বড় বিদেশি ক্রেতা, যার নাম কেউ বলতে পারে না; যোগাযোগ করা যায় না এমন রেফারেন্স; অনলাইনে কোথাও নেই এমন পুরস্কার। দাবিটা ডিলের জন্য গুরুত্বপূর্ণ হলে সেটা যাচাইযোগ্যই হতে হবে।",
          } as L,
          {
            en: "NDA misuse — a real NDA protects specific sensitive details. It is not a blanket excuse to hide the entire business from verification.",
            bn: "এনডিএ-এর অপব্যবহার — আসল এনডিএ নির্দিষ্ট সংবেদনশীল তথ্য রক্ষা করে; পুরো ব্যবসাকে যাচাইয়ের বাইরে রাখার কম্বল নয়।",
          } as L,
        ],
      },
      {
        h: { en: "Money questions", bn: "টাকার প্রশ্নগুলো" } as L,
        body: {
          en: "Two questions expose more hollow deals than any others: where do the fees go, and where is the downside case? Walking through the downside isn't pessimism — it's the whole job of investing.",
          bn: "দুটো প্রশ্ন বাকি সবকিছুর চেয়ে বেশি ফাঁপা ডিল ধরে: ফি কোথায় যায়, আর ডাউনসাইডের হিসাবটা কোথায়? ডাউনসাইড ভেবে দেখা হতাশাবাদ নয় — বিনিয়োগের পুরো কাজটাই তা-ই।",
        } as L,
        list: [
          {
            en: "Unclear fees — success fees, “processing charges”, commissions quietly carved out of your capital. Ask for every fee in writing, in one list, before the money moves. A seller who resists that list is telling you something.",
            bn: "অস্পষ্ট ফি — সাকসেস ফি, “প্রসেসিং চার্জ”, আপনার মূলধন থেকে চুপিসাড়ে কাটা কমিশন। টাকা চলার আগে সব ফি লিখিতভাবে, একটাই তালিকায় চান। যে বিক্রেতা তালিকাটা এড়াতে চান, তিনি নিজেই কিছু একটা বলে দিচ্ছেন।",
          } as L,
          {
            en: "No downside case — if the seller can only describe what happens when things go well, they're describing half the investment. Ask for the failure case in numbers: what comes back to you, in what order, after creditors. “It won't fail” is not a downside case — it's a refusal.",
            bn: "ডাউনসাইডের হিসাব নেই — বিক্রেতা যদি শুধু সব-ভালো-হলে-কী-হবে বর্ণনা করতে পারেন, তিনি বিনিয়োগের অর্ধেকটা বর্ণনা করছেন। সংখ্যায় ব্যর্থতার হিসাব চান: পাওনাদারদের পরে আপনার কী ফেরত আসে, কোন ক্রমে। “ব্যর্থ হবে না” কোনো ডাউনসাইড হিসাব নয় — সেটা অস্বীকৃতি।",
          } as L,
        ],
      },
      {
        h: { en: "Unregistered sellers and skipped review", bn: "অনিবন্ধিত বিক্রেতা ও বাদ-পড়া আইনি যাচাই" } as L,
        body: {
          en: "Check who is doing the selling. Someone soliciting funds from the public in Bangladesh may need BSEC registration or an exemption, depending on the structure — and “the rules don't apply to private deals” is exactly what unregistered sellers say. Ask for the registration, or the legal basis of the exemption, in writing. And when you hear “you don't need a lawyer for this, it's a simple deal” — the deals that most need legal review are precisely the ones described as simple. A one-page agreement drafted by the seller's relative isn't documentation; it's a trap with signature lines. A few thousand taka of legal review is the cheapest insurance in finance.",
          bn: "দেখে নিন বিক্রি করছেন কে। বাংলাদেশে জনগণের কাছ থেকে তহবিল সংগ্রহকারীর কাঠামো অনুযায়ী বিএসইসি নিবন্ধন বা ছাড় লাগতে পারে — আর “প্রাইভেট ডিলে নিয়ম খাটে না” — এই কথাটা অনিবন্ধিত বিক্রেতারাই বলেন। নিবন্ধন, বা ছাড়ের আইনি ভিত্তি, লিখিতভাবে চান। আর যদি শুনেন “এতো সিম্পল ডিল, ল-ইয়ার লাগবে না” — আইনি যাচাই সবচেয়ে বেশি যে ডিলগুলোর দরকার, ঠিক সেগুলোকেই সিম্পল বলা হয়। বিক্রেতার আত্মীয়ের লেখা এক-পাতার চুক্তি কোনো ডকুমেন্টেশন নয়; সই-করার ঘরওয়ালা একটা ফাঁদ। আইনজীবীর কয়েক হাজার টাকার রিভিউ ফাইন্যান্সের সবচেয়ে সস্তা বিমা।",
        } as L,
      },
      {
        h: { en: "The walk-away test", bn: "সরে দাঁড়ানোর পরীক্ষা" } as L,
        body: {
          en: "Before committing, ask yourself one question: if everything this person says turns out to be false, what would I have left? If the answer is nothing — no collateral, no enforceable contract, no verifiable asset — then you're not making an investment. You're making a gift and hoping for interest. Walking away costs you a missed opportunity at worst. Proceeding on an unverified promise can cost the entire ticket. Proof before promise — it protects both sides of the table.",
          bn: "চূড়ান্ত করার আগে নিজেকে একটাই প্রশ্ন করুন: এই মানুষটি যা বলছেন তার সবই যদি মিথ্যা প্রমাণ হয়, আমার হাতে কী থাকবে? উত্তর যদি হয় “কিছুই না” — কোনো জামানত নেই, প্রয়োগযোগ্য চুক্তি নেই, যাচাই-করা সম্পদ নেই — তবে আপনি বিনিয়োগ করছেন না; উপহার দিচ্ছেন, আর সুদের আশা করছেন। সরে দাঁড়ানোর সর্বোচ্চ ক্ষতি একটা ছুটে-যাওয়া সুযোগ। যাচাই-না-হওয়া প্রতিশ্রুতিতে এগোনোর ক্ষতি হতে পারে পুরো টিকেটটাই। প্রতিশ্রুতির আগে প্রমাণ — টেবিলের দুই পাশের মানুষকেই রক্ষা করে।",
        } as L,
      },
    ],
    takeaways: [
      {
        en: "A guaranteed return on a private investment is a contradiction — treat it as a hard stop, not a feature.",
        bn: "প্রাইভেট বিনিয়োগে নিশ্চিত রিটার্ন একটা স্ববিরোধী কথা — সুবিধা নয়, পুরোপুরি থামার সংকেত হিসেবে নিন।",
      } as L,
      {
        en: "Urgency exists to prevent verification; a real deadline survives questions — ask for it in writing.",
        bn: "তাড়াহুড়ার কাজই যাচাই ঠেকানো; সত্যিকারের সময়সীমা প্রশ্ন সইতে পারে — লিখিতভাবে চান।",
      } as L,
      {
        en: "Documents before money, and every fee in one written list.",
        bn: "টাকার আগে নথি, আর সব ফি একটাই লিখিত তালিকায়।",
      } as L,
      {
        en: "Demand the downside case in numbers — a seller who can't show it is showing you half the deal.",
        bn: "সংখ্যায় ডাউনসাইডের হিসাব চান — যিনি দেখাতে পারেন না, তিনি ডিলের অর্ধেকটাই দেখাচ্ছেন।",
      } as L,
      {
        en: "If it can't survive a lawyer reading it, it can't survive your money in it.",
        bn: "আইনজীবীর পড়া যদি সইতে না পারে, আপনার টাকাও তা সইতে পারবে না।",
      } as L,
    ],
    terms: ["capital loss", "due diligence", "ticket", "exit"],
  },
};

/* ── R5: share / permalink copy for the insight reader ── */
export const SHARE = {
  shareArticle: { en: "Share this guide", bn: "গাইডটি শেয়ার করুন" } as L,
  linkCopied: { en: "Link copied ✓", bn: "লিংক কপি হয়েছে ✓" } as L,
  copyFailed: {
    en: "Couldn't copy — copy the address from your browser's address bar.",
    bn: "কপি করা যায়নি — ব্রাউজারের অ্যাড্রেস বার থেকে লিংকটি কপি করুন।",
  } as L,
} as const;

/* ── R5: opportunity compare feature ── */
export const CMP = {
  chip: { en: "Compare", bn: "তুলনা" } as L,
  chipAria: { en: "Add to compare", bn: "তুলনায় যোগ করুন" } as L,
  chipAriaOn: { en: "Remove from compare", bn: "তুলনা থেকে সরান" } as L,
  maxToast: {
    en: "Compare up to 3 at a time — remove one first.",
    bn: "একসঙ্গে সর্বোচ্চ ৩টি — আগে একটি সরিয়ে নিন।",
  } as L,
  barAria: { en: "Compare tray", bn: "তুলনার ট্রে" } as L,
  open: { en: "Compare now", bn: "এখনই তুলনা করুন" } as L,
  clear: { en: "Clear all", bn: "সব মুছুন" } as L,
  selected: (n: number): L => ({
    en: `${n} selected`,
    bn: `${bnDigit(n)}টি নির্বাচিত`,
  }),
  title: { en: "Side-by-side", bn: "পাশাপাশি তুলনা" } as L,
  sub: {
    en: "The same honest facts as each listing — lined up so the differences stand out. Nothing is ranked; you decide what matters.",
    bn: "প্রতিটি লিস্টিংয়ের মতোই সৎ তথ্য — পাশাপাশি সাজানো, যাতে পার্থক্যগুলো চোখে পড়ে। কোনো র‍্যাংকিং নেই; কোনটা গুরুত্বপূর্ণ সেটা আপনিই ঠিক করুন।",
  } as L,
  removeOne: { en: "Remove", bn: "সরান" } as L,
  colAttribute: { en: "Attribute", bn: "বৈশিষ্ট্য" } as L,
  rowSector: { en: "Sector", bn: "খাত" } as L,
  rowLocation: { en: "Location", bn: "অবস্থান" } as L,
  rowSeeking: { en: "Ticket sought", bn: "খোঁজা টিকেট" } as L,
  rowInstrument: { en: "Instrument", bn: "ইনস্ট্রুমেন্ট" } as L,
  rowStage: { en: "Vetting stage", bn: "ভেটিং ধাপ" } as L,
  rowBadges: { en: "Verified so far", bn: "এ পর্যন্ত যাচাই" } as L,
  rowRisk: { en: "Top risk", bn: "প্রধান ঝুঁকি" } as L,
  rowDownside: { en: "Downside case", bn: "ডাউনসাইড কেস" } as L,
  rowBase: { en: "Base case", bn: "বেস কেস" } as L,
  rowUpside: { en: "Upside case", bn: "আপসাইড কেস" } as L,
  rowExit: { en: "Illustrative exit", bn: "নমুনা এক্সিট" } as L,
  scenFootnote: {
    en: "Scenario figures reuse each listing's illustrative model — assumptions for honesty, not forecasts and not advice.",
    bn: "সিনারিওর সংখ্যাগুলো প্রতিটি লিস্টিংয়ের নমুনা মডেল থেকে নেওয়া — সততার জন্য অনুমান, পূর্বাভাস বা পরামর্শ নয়।",
  } as L,
  ctaDetail: { en: "Open full summary", bn: "সম্পূর্ণ সারসংক্ষেপ খুলুন" } as L,
  scenNA: { en: "—", bn: "—" } as L,
} as const;

/* ── R6: FAQ live search ── */
export const FAQS = {
  label: { en: "Search the questions", bn: "প্রশ্ন খুঁজুন" } as L,
  placeholder: {
    en: "Type a keyword — e.g. minimum, fees, exit…",
    bn: "শব্দ লিখুন — যেমন: সর্বনিম্ন, ফি, এক্সিট…",
  } as L,
  clear: { en: "Clear search", bn: "খুঁজা মুছুন" } as L,
  count: (n: number): L => ({
    en: n === 1 ? "1 question matches" : `${n} questions match`,
    bn: n === 1 ? "১টি প্রশ্ন মিলেছে" : `${bnDigit(n)}টি প্রশ্ন মিলেছে`,
  }),
  emptyTitle: { en: "No match in the current questions", bn: "বর্তমান প্রশ্নগুলোতে কিছু মেলেনি" } as L,
  emptySub: {
    en: "Try a different word, or ask us directly — we answer every message.",
    bn: "অন্য শব্দে চেষ্টা করুন, বা সরাসরি জিজ্ঞেস করুন — আমরা প্রতিটি বার্তার উত্তর দিই।",
  } as L,
  searchBoth: { en: "Searches English & Bangla", bn: "ইংরেজি ও বাংলা — দুই ভাষাতেই খোঁজে" } as L,
} as const;

/* ── R6: opportunity listing share/permalink ── */
export const OPPS = {
  shareListing: { en: "Share listing", bn: "লিস্টিং শেয়ার করুন" } as L,
  notFoundTitle: { en: "Listing not found", bn: "লিস্টিং পাওয়া যায়নি" } as L,
  notFoundSub: {
    en: "This link points to a listing that is no longer available. Browse the current opportunities instead.",
    bn: "এই লিংকটি এমন একটি লিস্টিংয়ের দিকে নির্দেশ করছে যা আর নেই। বর্তমান সুযোগগুলো দেখুন।",
  } as L,
} as const;

/* ── R6: insight reader mini-TOC + remaining reading time ── */
export const READERTOC = {
  tocLabel: { en: "Jump to a section", bn: "অংশে যান" } as L,
  remaining: (m: number): L => ({
    en: m <= 0 ? "done" : `~${m} min left`,
    bn: m <= 0 ? "সম্পন্ন" : `~${bnDigit(m)} মিনিট বাকি`,
  }),
} as const;

/* ── R7: Glossary hub dialog — full plain-language term index ── */
export const GLOSSARY_HUB = {
  /** pill button under the FAQ search input */
  cta: { en: "All definitions", bn: "সব সংজ্ঞা" } as L,
  footerLink: { en: "Glossary", bn: "শব্দকোষ" } as L,
  title: { en: "Investment Glossary", bn: "বিনিয়োগ শব্দকোষ" } as L,
  sub: {
    en: "Plain-language definitions of every term used across this site — in both languages.",
    bn: "এই সাইটে ব্যবহৃত প্রতিটি শব্দের সহজ ভাষায় সংজ্ঞা — দুই ভাষাতেই।",
  } as L,
  count: (n: number): L => ({
    en: `${n} terms`,
    bn: `${bnDigit(n)}টি শব্দ`,
  }) as L,
  /** shown under the other language's term name (cross-reference chip) */
  alsoKnown: { en: "in Bangla", bn: "ইংরেজিতে" } as L,
  footnote: {
    en: "Definitions are educational — they are not investment advice.",
    bn: "সংজ্ঞাগুলো শিক্ষামূলক — এগুলো বিনিয়োগ পরামর্শ নয়।",
  } as L,
} as const;

/* ── R7: compare permalink + share (reuse SHARE.linkCopied / SHARE.copyFailed) ── */
export const CMP_SHARE = {
  share: { en: "Share comparison", bn: "তুলনা শেয়ার করুন" } as L,
  loadedPill: { en: "Loaded a shared comparison ✓", bn: "শেয়ার করা তুলনা লোড হয়েছে ✓" } as L,
} as const;

/* ── R7-PRINT: opportunity print / save-PDF one-pager (opportunity-dialog) ── */
export const PRINT = {
  button: { en: "Print / Save PDF", bn: "প্রিন্ট / PDF সেভ" } as L,
  buttonAria: {
    en: "Print or save this listing summary as PDF",
    bn: "এই লিস্টিং সারসংক্ষেপ প্রিন্ট বা PDF হিসেবে সেভ করুন",
  } as L,
  header: { en: "NexFund — Listing Summary", bn: "নেক্সফান্ড — লিস্টিং সারসংক্ষেপ" } as L,
  prepared: { en: "Prepared", bn: "প্রস্তুতকরণ" } as L,
  illustrative: { en: "Illustrative listing — not a live offer.", bn: "উদাহরণমূলক লিস্টিং — এটি লাইভ অফার নয়।" } as L,
  disclaimer: {
    en: "This summary is for information only. Read the full risk summary before any decision. Investments can lose value.",
    bn: "এই সারসংক্ষেপ কেবল তথ্যের জন্য। সিদ্ধান্তের আগে সম্পূর্ণ ঝুঁকি-সারসংক্ষেপ পড়ুন। বিনিয়োগে মূল্য হারানোর ঝুঁকি আছে।",
  } as L,
  contact: {
    en: "Questions? hello@nexfund.example · nexfund.example",
    bn: "প্রশ্ন আছে? hello@nexfund.example · nexfund.example",
  } as L,
} as const;

/* ── R7-FEEDBK: FAQ "was this answer helpful" (faq-cta + POST /api/feedback) ── */
export const FEEDBK = {
  label: { en: "Was this answer helpful?", bn: "এই উত্তরটি কি সহায়ক ছিল?" } as L,
  yes: { en: "Yes", bn: "হ্যাঁ" } as L,
  no: { en: "Not really", bn: "খুব একটা না" } as L,
  thanks: { en: "Thanks — your feedback is noted.", bn: "ধন্যবাদ — আপনার মতামত রেকর্ড হয়েছে।" } as L,
} as const;

/* ── R7: WhatsApp prefill message (mobile CTA bar deep link) ── */
export const WHATSAPP_MSG: L = {
  en: "Hello NexFund — I'd like to talk about investing in verified Bangladeshi businesses.",
  bn: "হ্যালো নেক্সফান্ড — যাচাইকৃত বাংলাদেশি ব্যবসায় বিনিয়োগ নিয়ে কথা বলতে চাই।",
};

/* ── R8: insight reader font-size control (reading comfort) ── */
export const READER_FONT = {
  label: { en: "Text size", bn: "লেখার আকার" },
  smaller: { en: "Smaller text", bn: "ছোট লেখা" } as L,
  larger: { en: "Larger text", bn: "বড় লেখা" } as L,
  reset: { en: "Reset text size", bn: "লেখার আকার রিসেট" } as L,
} as const;

/* ── R8: compare print (print this comparison) ── */
export const CMP_PRINT = {
  button: { en: "Print comparison", bn: "তুলনা প্রিন্ট করুন" } as L,
  header: { en: "NexFund — Opportunity Comparison", bn: "নেক্সফান্ড — সুযোগের তুলনা" } as L,
  prepared: { en: "Prepared", bn: "প্রস্তুতকরণ" } as L,
  disclaimer: {
    en: "Illustrative listings, compared side by side. Figures are illustrative scenarios, not forecasts. Read each listing's full risk summary before any decision.",
    bn: "উদাহরণমূলক লিস্টিং, পাশাপাশি তুলনা করা। সংখ্যাগুলো উদাহরণমূলক সিনারিও, পূর্বাভাস নয়। সিদ্ধান্তের আগে প্রতিটি লিস্টিংয়ের সম্পূর্ণ ঝুঁকি-সারসংক্ষেপ পড়ুন।",
  } as L,
  contact: {
    en: "Questions? hello@nexfund.example · nexfund.example",
    bn: "প্রশ্ন আছে? hello@nexfund.example · nexfund.example",
  } as L,
} as const;

/* ── R8: admin review workspace (hidden, passphrase-gated) ── */
export const ADMIN = {
  entryHint: { en: "NexFund review workspace", bn: "নেক্সফান্ড রিভিউ ওয়ার্কস্পেস" } as L,
  title: { en: "Review workspace", bn: "রিভিউ ওয়ার্কস্পেস" } as L,
  sub: {
    en: "For NexFund advisors only. Interest records and FAQ feedback, in one place.",
    bn: "শুধু নেক্সফান্ড অ্যাডভাইজরদের জন্য। আগ্রহের রেকর্ড ও FAQ ফিডব্যাক, এক জায়গায়।",
  } as L,
  passLabel: { en: "Workspace passphrase", bn: "ওয়ার্কস্পেস পাসফ্রেজ" } as L,
  passPlaceholder: { en: "Passphrase", bn: "পাসফ্রেজ" } as L,
  unlock: { en: "Unlock workspace", bn: "ওয়ার্কস্পেস খুলুন" } as L,
  wrongPass: { en: "Wrong passphrase — try again.", bn: "ভুল পাসফ্রেজ — আবার চেষ্টা করুন।" } as L,
  locked: {
    en: "Workspace is locked. Set ADMIN_PASSPHRASE on the server to enable.",
    bn: "ওয়ার্কস্পেস লক করা। চালু করতে সার্ভারে ADMIN_PASSPHRASE সেট করুন।",
  } as L,
  interestsTab: { en: "Expressed interest", bn: "প্রকাশিত আগ্রহ" } as L,
  feedbackTab: { en: "FAQ feedback", bn: "FAQ ফিডব্যাক" } as L,
  empty: { en: "No records yet.", bn: "এখনো কোনো রেকর্ড নেই।" } as L,
  refresh: { en: "Refresh", bn: "রিফ্রেশ" } as L,
  logout: { en: "Lock again", bn: "আবার লক করুন" } as L,
  colListing: { en: "Listing", bn: "লিস্টিং" } as L,
  colEmail: { en: "Email", bn: "ইমেইল" } as L,
  colName: { en: "Name", bn: "নাম" } as L,
  colNote: { en: "Note", bn: "নোট" } as L,
  colLang: { en: "Lang", bn: "ভাষা" } as L,
  colDate: { en: "Received", bn: "গৃহীত" } as L,
  colStatus: { en: "Status", bn: "অবস্থা" } as L,
  statusLabels: {
    new: { en: "New", bn: "নতুন" } as L,
    reviewed: { en: "Reviewed", bn: "রিভিউ করা" } as L,
    introduced: { en: "Introduced", bn: "পরিচিত করা" } as L,
    declined: { en: "Declined", bn: "বাতিল" } as L,
  } as Record<string, L>,
  statusChanged: { en: "Status updated ✓", bn: "অবস্থা আপডেট হয়েছে ✓" } as L,
  feedbackSummary: (yes: number, no: number): L => ({
    en: `${yes} helpful · ${no} not helpful`,
    bn: `${bnDigit(yes)} জন সহায়ক · ${bnDigit(no)} জন সহায়ক নয়`,
  }) as L,
  loadErr: { en: "Couldn't load records. Try refresh.", bn: "রেকর্ড লোড করা যায়নি। রিফ্রেশ করুন।" } as L,
} as const;

/* ── R9: admin gate rate limiting / lockout copy ── */
export const ADMIN_GATE = {
  attemptsLeft: (n: number): L => ({
    en: `${n} attempt${n === 1 ? "" : "s"} left`,
    bn: `আরও ${bnDigit(n)} বার চেষ্টা করা যাবে`,
  }) as L,
  rateLimited: (secs: number): L => ({
    en: `Too many wrong attempts — locked for ${secs}s.`,
    bn: `বারবার ভুল চেষ্টা — ${bnDigit(secs)} সেকেন্ডের জন্য লক করা।`,
  }) as L,
  countdown: (secs: number): L => ({
    en: `Locked · try again in ${Math.ceil(secs / 60)} min`,
    bn: `লক করা · ${bnDigit(Math.ceil(secs / 60))} মিনিট পর আবার চেষ্টা করুন`,
  }) as L,
} as const;

/* ── R9: admin CSV export copy ── */
export const ADMIN_CSV = {
  button: { en: "Export CSV", bn: "CSV এক্সপোর্ট" } as L,
  ariaHint: {
    en: "Download all interest records as a CSV file",
    bn: "সব আগ্রহের রেকর্ড একটি CSV ফাইলে ডাউনলোড করুন",
  } as L,
  done: { en: "CSV downloaded ✓", bn: "CSV ডাউনলোড হয়েছে ✓" } as L,
  failed: { en: "Export failed — try again.", bn: "এক্সপোর্ট ব্যর্থ — আবার চেষ্টা করুন।" } as L,
} as const;

/* ── R9: insight reader print / save-PDF copy ── */
export const READER_PRINT = {
  button: { en: "Print / save PDF", bn: "প্রিন্ট / PDF সেভ" } as L,
  header: { en: "NexFund — Investor Insight", bn: "নেক্সফান্ড — ইনভেস্টর ইনসাইট" } as L,
  prepared: { en: "Prepared", bn: "প্রস্তুতকরণ" } as L,
  readTime: (mins: number): L => ({
    en: `${mins} min read`,
    bn: `${bnDigit(mins)} মিনিট পড়া`,
  }) as L,
  disclaimer: {
    en: "Educational insight from NexFund, the investor–entrepreneur matchmaking platform of Bangladesh. Not investment advice. Figures are illustrative. hello@nexfund.example · nexfund.example",
    bn: "বাংলাদেশের ইনভেস্টর–উদ্যোক্তা ম্যাচমেকিং প্ল্যাটফর্ম নেক্সফান্ডের শিক্ষামূলক ইনসাইট। এটি বিনিয়োগ পরামর্শ নয়। সংখ্যাগুলো উদাহরণমূলক। hello@nexfund.example · nexfund.example",
  } as L,
} as const;

/* ══════════════════════════════════════════════════════════════════
   R11 — ABOUT page content (mission, vision, values, story, team)
   ══════════════════════════════════════════════════════════════════ */

export const ABOUT = {
  hero: {
    eyebrow: { en: "ABOUT NEXFUND", bn: "নেক্সফান্ড সম্পর্কে" } as L,
    title: {
      en: "The crossing between capital and conviction.",
      bn: "পুঁজি ও প্রত্যয়ের মিলনবিন্দু।",
    } as L,
    copy: {
      en: "NexFund is a Dhaka-based financial consultancy and matchmaking platform. We exist for one reason: to make private investment in Bangladesh a decision based on proof — not promises. This page is who we are, why we exist, and how we hold ourselves to it.",
      bn: "নেক্সফান্ড ঢাকা-ভিত্তিক একটি আর্থিক পরামর্শদাতা ও ম্যাচমেকিং প্ল্যাটফর্ম। আমরা একটি কারণে কাজ করি: বাংলাদেশে ব্যক্তিগত বিনিয়োগ যেন হয় প্রমাণনির্ভর — প্রতিশ্রুতিনির্ভর নয়। এই পাতায় আছে আমরা কারা, কেন আছি, আর কীভাবে নিজেদের জবাবদিহি রাখি।",
    } as L,
    badge: { en: "Est. 2024 · Dhaka, Bangladesh", bn: "প্রতিষ্ঠান ২০২৪ · ঢাকা, বাংলাদেশ" } as L,
  },
  mission: {
    eyebrow: { en: "OUR MISSION", bn: "আমাদের মিশন" } as L,
    title: {
      en: "Make informed private investment possible — for both sides of the table.",
      bn: "টেবিলের দুই পক্ষের জন্যই তথ্যনির্ভর ব্যক্তিগত বিনিয়োগ সম্ভব করা।",
    } as L,
    statement: {
      en: "To make informed private investment possible for Bangladeshi investors — and patient capital reachable for growth-ready Bangladeshi businesses — through verification-first matchmaking, plain-language documents, and fees disclosed in writing.",
      bn: "যাচাই-প্রথম ম্যাচমেকিং, সহজভাষার নথি ও লিখিতভাবে জানানো ফি-এর মাধ্যমে বাংলাদেশি বিনিয়োগকারীদের জন্য তথ্যনির্ভর ব্যক্তিগত বিনিয়োগ সম্ভব করা — এবং বৃদ্ধিমুখী বাংলাদেশি ব্যবসার জন্য ধৈর্যশীল পুঁজি পৌঁছে দেওয়া।",
    } as L,
    points: [
      {
        en: "Verification comes first: no listing goes live before the five-pillar standard is passed.",
        bn: "যাচাই আগে: পাঁচ-স্তম্ভ মানদণ্ড পাস না হলে কোনো তালিকা প্রকাশই হয় না।",
      },
      {
        en: "Documents in plain Bangla and English — investors read what matters, not jargon.",
        bn: "সহজ বাংলা ও ইংরেজিতে নথি — বিনিয়োগকারী পড়েন যা দরকার, জার্গন নয়।",
      },
      {
        en: "Fees disclosed before any commitment, never as a percentage of your returns.",
        bn: "যেকোনো অঙ্গীকারের আগেই ফি জানানো হয় — আপনার মুনাফার শতাংশ হিসেবে কখনোই নয়।",
      },
    ] as L[],
  },
  vision: {
    eyebrow: { en: "OUR VISION", bn: "আমাদের ভিশন" } as L,
    title: {
      en: "A market where proof travels faster than promises.",
      bn: "এমন বাজার, যেখানে প্রমাণ পৌঁছায় প্রতিশ্রুতির আগে।",
    } as L,
    statement: {
      en: "A Bangladesh where no good business stalls because verified information or the right capital couldn't reach it in time — and no investor has to commit a single taka without seeing the proof first.",
      bn: "এমন এক বাংলাদেশ, যেখানে যাচাইকৃত তথ্য বা সঠিক পুঁজি সময়মতো না পৌঁছানোর কারণে কোনো ভালো ব্যবসা থেমে থাকে না — আর কোনো বিনিয়োগকারীকেই প্রমাণ না দেখে এক টাকাও দিতে হয় না।",
    } as L,
    points: [
      {
        en: "Private capital becomes a normal, documented option for growing SMEs — not a last resort.",
        bn: "বর্ধনশীল এসএমই-দের জন্য ব্যক্তিগত পুঁজি হয় স্বাভাবিক, নথিভুক্ত বিকল্প — শেষ ভরসা নয়।",
      },
      {
        en: "Verification becomes the default language between investors and businesses.",
        bn: "বিনিয়োগকারী ও ব্যবসার মধ্যে যাচাই হয়ে ওঠে আদান-প্রদানের প্রথম ভাষা।",
      },
      {
        en: "Bangladeshi savings find productive homes in Bangladeshi businesses.",
        bn: "বাংলাদেশি সঞ্চয় খুঁজে পায় উৎপাদনশীল ঠিকানা — বাংলাদেশি ব্যবসায়।",
      },
    ] as L[],
  },
  values: {
    eyebrow: { en: "WHAT WE STAND ON", bn: "আমাদের ভিত্তি" } as L,
    title: { en: "Five values, no fine print.", bn: "পাঁচটি মূল্যবোধ, কোনো ছোট অক্ষরে শর্ত নেই।" } as L,
    sub: {
      en: "These aren't posters on a wall — each one is enforced by something you can check on this website.",
      bn: "এগুলো দেয়ালে টাঙানো পোস্টার নয় — প্রতিটির পেছনে আছে এই ওয়েবসাইটেই যাচাই করার মতো কিছু।",
    } as L,
    items: [
      {
        key: "proof",
        title: { en: "Proof before promise", bn: "প্রতিশ্রুতির আগে প্রমাণ" } as L,
        copy: {
          en: "Every claim links to the check behind it — verification badges, risk notes, document lists. Trust is earned in documents, not adjectives.",
          bn: "প্রতিটি দাবির পেছনে আছে যাচাই — ব্যাজ, ঝুঁকি-নোট, নথির তালিকা। বিশ্বাস অর্জিত হয় নথিতে, বিশেষণে নয়।",
        } as L,
        where: "vetting",
      },
      {
        key: "plain",
        title: { en: "Plain language, both languages", bn: "সহজ ভাষা, দুই ভাষাতেই" } as L,
        copy: {
          en: "Bangla first, English alongside — documents, insights, support. A decision you can't understand is a decision you can't own.",
          bn: "বাংলা আগে, ইংরেজি পাশে — নথি, ইনসাইট, সহায়তা সবখানেই। যে সিদ্ধান্ত বুঝে নেওয়া যায় না, সেটা আপনার নিজেরও হয় না।",
        } as L,
        where: "insights",
      },
      {
        key: "confidential",
        title: { en: "Confidential by default", bn: "গোপনীয়তা ডিফল্ট" } as L,
        copy: {
          en: "Businesses are listed by code name. Names open only under NDA. Aggregated insights leave the room; personal data never does.",
          bn: "ব্যবসা তালিকাভুক্ত হয় কোড নামে। NDA-এর পরেই কেবল আসল নাম জানা যায়। ঘর থেকে বেরোয় সমষ্টিগত তথ্য; ব্যক্তিগত তথ্য কখনোই নয়।",
        } as L,
        where: "privacy",
      },
      {
        key: "no-custody",
        title: { en: "We never hold your money", bn: "আপনার অর্থ আমাদের হাতে থাকে না" } as L,
        copy: {
          en: "Money moves directly between investor and business. We introduce, verify, document — we don't custody, guarantee, or pressure.",
          bn: "অর্থ চলে সরাসরি বিনিয়োগকারী ও ব্যবসার মধ্যে। আমরা পরিচয় করিয়ে দিই, যাচাই করি, নথি তৈরি করি — গচ্ছিত রাখি না, নিশ্চয়তা দিই না, চাপ দিই না।",
        } as L,
        where: "terms",
      },
      {
        key: "fees",
        title: { en: "Fees in writing", bn: "ফি লিখিতভাবে" } as L,
        copy: {
          en: "Our introduction fee is disclosed before any engagement — a fixed amount, never a percentage of your returns. If a number isn't in writing, it isn't ours.",
          bn: "পরিচয় করিয়ে দেওয়ার ফি যেকোনো কাজ শুরুর আগেই জানানো হয় — নির্দিষ্ট অঙ্কে, আপনার মুনাফার শতাংশ হিসেবে কখনোই নয়। যে অঙ্ক লিখিত নেই, সেটা আমাদের নয়।",
        } as L,
        where: "faq",
      },
    ],
  },
  story: {
    eyebrow: { en: "WHY WE EXIST", bn: "কেন আমরা আছি" } as L,
    title: { en: "Two missing pieces, one crossing.", bn: "দুটি অনুপস্থিত কণা, একটি সংযোগ।" } as L,
    paragraphs: [
      {
        en: "Bangladesh runs on its small and medium businesses — the factories, farms, and trading houses that employ most of its people. Many of them are genuinely investable: real revenue, real customers, disciplined books. Yet when they need growth capital, the honest options are thin — and private money rarely reaches them, because it can't see them clearly.",
        bn: "বাংলাদেশ চলে তার ছোট ও মাঝারি ব্যবসায় — যে কারখানা, খামার ও ট্রেডিং হাউস দেশের বেশিরভাগ মানুষের কর্মসংস্থান ধরে রাখে। এদের অনেকগুলোই সত্যিই বিনিয়োগযোগ্য: আসল রাজস্ব, আসল গ্রাহক, নিয়মানুবর্তিত হিসাব। তবু বৃদ্ধির মূলধন দরকার হলে সৎ পথগুলো সংকীর্ণ — ব্যক্তিগত পুঁজি পৌঁছায় না, কারণ সে তাদের স্পষ্ট দেখতে পায় না।",
      },
      {
        en: "On the other side sit investors — families, professionals, returning expatriates — holding patient capital and willing to take real risk. What they lack isn't money or courage; it's verification. Bank statements they can check, risks stated before returns, documents in a language they trust.",
        bn: "আর অন্য পাশে আছেন বিনিয়োগকারীরা — পরিবার, পেশাজীবী, দেশে ফেরা প্রবাসীরা — ধৈর্যশীল পুঁজি নিয়ে বসে আছেন, আসল ঝুঁকিও নিতে রাজি। তাঁদের অভাব টাকা বা সাহসের নয়; অভাব যাচাইয়ের। এমন ব্যাংক স্টেটমেন্ট যা মিলিয়ে দেখা যায়, মুনাফার আগে বলা ঝুঁকি, বিশ্বস্ত ভাষার নথি।",
      },
      {
        en: "NexFund is the crossing between those two paths. We built the five-pillar vetting standard, anonymized listings, and bilingual fact-packs so that a serious conversation can start with evidence on the table — and so that a 'no' costs nothing but honesty.",
        bn: "নেক্সফান্ড সেই দুই পথের মিলনবিন্দু। আমরা পাঁচ-স্তম্ভের যাচাই মানদণ্ড, বেনামি তালিকা ও দ্বিভাষিক ফ্যাক্ট-প্যাক তৈরি করেছি — যেন গুরুত্বপূর্ণ আলাপটা টেবিলে প্রমাণ রেখেই শুরু হয়, আর 'না'-ও যেন কিছু না খরচ করে সৎভাবে বলা যায়।",
      },
    ] as L[],
  },
  timeline: {
    eyebrow: { en: "THE ROAD SO FAR", bn: "অবধির পথচলা" } as L,
    title: { en: "How the platform took shape.", bn: "প্ল্যাটফর্মটি যেভাবে গড়ে উঠল।" } as L,
    items: [
      {
        when: { en: "2024 · Q3", bn: "২০২৪ · তৃতীয় ত্রৈমাসিক" } as L,
        title: { en: "The question", bn: "প্রশ্নটি" } as L,
        copy: {
          en: "A series of conversations with investors and founders kept landing on the same wall: good capital and good businesses exist in the same city and never meet with documents between them.",
          bn: "বিনিয়োগকারী ও প্রতিষ্ঠাতাদের সাথে ধারাবাহিক আলাপ সবসময় এক জায়গায় গিয়ে থামত — ভালো পুঁজি আর ভালো ব্যবসা একই শহরে থাকে, অথচ মাঝখানে নথি না থাকায় কখনো দেখা হয় না।",
        } as L,
      },
      {
        when: { en: "2024 · Q4", bn: "২০২৪ · চতুর্থ ত্রৈমাসিক" } as L,
        title: { en: "The Charter, before the first listing", bn: "প্রথম তালিকার আগেই চার্টার" } as L,
        copy: {
          en: "We wrote seven promises — fees in writing, no custody, no pressure — before publishing a single business. Standards first, listings second.",
          bn: "একটি ব্যবসাও প্রকাশের আগে আমরা লিখে রাখি সাতটি প্রতিশ্রুতি — ফি লিখিতভাবে, অর্থ গচ্ছিত নয়, কোনো চাপ নয়। মানদণ্ড আগে, তালিকা পরে।",
        } as L,
      },
      {
        when: { en: "2025 · Q1", bn: "২০২৫ · প্রথম ত্রৈমাসিক" } as L,
        title: { en: "The five-pillar standard", bn: "পাঁচ-স্তম্ভের মানদণ্ড" } as L,
        copy: {
          en: "Identity, legal, financial, operations, advisor review — the vetting pipeline was finalized with document checklists published openly on the site.",
          bn: "পরিচয়, আইনি, আর্থিক, কার্যক্রম, অ্যাডভাইজর পর্যালোচনা — যাচাই পাইপলাইন চূড়ান্ত হয়, আর নথি-চেকলিস্ট প্রকাশ্যে সাইটে তোলা হয়।",
        } as L,
      },
      {
        when: { en: "2025 · Q2", bn: "২০২৫ · দ্বিতীয় ত্রৈমাসিক" } as L,
        title: { en: "First verified listings live", bn: "প্রথম যাচাইকৃত তালিকা প্রকাশ" } as L,
        copy: {
          en: "Anonymized fact-packs with visible key risks went live; investor registration and the readiness quiz opened on the same day.",
          bn: "প্রকাশ্য ঝুঁকিসহ বেনামি ফ্যাক্ট-প্যাক চালু হয়; একই দিনে খোলে বিনিয়োগকারী নিবন্ধন ও প্রস্তুতি-কুইজ।",
        } as L,
      },
      {
        when: { en: "Today", bn: "আজ" } as L,
        title: { en: "A bilingual platform, growing pipeline", bn: "দ্বিভাষিক প্ল্যাটফর্ম, বাড়ছে পাইপলাইন" } as L,
        copy: {
          en: "Verified listings across garments, agri and logistics; an insights library; a glossary that speaks both languages — and every number we can show, on the Impact page.",
          bn: "গার্মেন্টস, কৃষি ও লজিস্টিক্স জুড়ে যাচাইকৃত তালিকা; ইনসাইট লাইব্রেরি; দুই ভাষায় কথা বলা শব্দকোষ — আর যত সংখ্যা দেখানো সম্ভব, সব ইমপ্যাক্ট পাতায়।",
        } as L,
      },
    ],
  },
  team: {
    eyebrow: { en: "WHO DOES THE WORK", bn: "কাজটি কারা করেন" } as L,
    title: { en: "A small senior team, a wider advisory bench.", bn: "ছোট অভিজ্ঞ টিম, বড় অ্যাডভাইজরি বেঞ্চ।" } as L,
    sub: {
      en: "NexFund runs lean on purpose: a core team that owns the standard, and specialist advisors who deepen it sector by sector.",
      bn: "নেক্সফান্ড ইচ্ছাকৃতভাবেই ছোট: একটি কোর টিম মানদণ্ডের মালিকানা রাখে, আর খাতভিত্তিক বিশেষজ্ঞ অ্যাডভাইজররা সেটিকে গভীর করেন।",
    } as L,
    roles: [
      {
        title: { en: "Vetting & Research", bn: "যাচাই ও রিসার্চ" } as L,
        copy: {
          en: "Runs the five pillars for every listing — identity to advisor review — and writes the risk summaries investors read before the returns.",
          bn: "প্রতিটি তালিকার পাঁচ স্তম্ভ পরিচালনা করে — পরিচয় থেকে অ্যাডভাইজর পর্যালোচনা — আর মুনাফার আগে বিনিয়োগকারী যে ঝুঁকি-সারসংক্ষেপ পড়েন, সেটি লেখে।",
        } as L,
      },
      {
        title: { en: "Financial Advisory", bn: "ফিন্যান্সিয়াল অ্যাডভাইজরি" } as L,
        copy: {
          en: "Prepares valuations, three-to-five-year models with downside cases, and the use-of-funds plans you see inside every fact-pack.",
          bn: "মূল্যায়ন, ডাউনসাইড-কেসসহ তিন-পাঁচ বছরের মডেল, আর প্রতিটি ফ্যাক্ট-প্যাকের তহবিল-ব্যবহার পরিকল্পনা তৈরি করে।",
        } as L,
      },
      {
        title: { en: "Legal & Compliance", bn: "লিগ্যাল ও কমপ্লায়েন্স" } as L,
        copy: {
          en: "Reviews trade licenses, tax and regulatory documents, litigation checks — and keeps NDAs and data-room access in order.",
          bn: "ট্রেড লাইসেন্স, কর ও নিয়ন্ত্রক নথি, মামলা-সংক্রান্ত অনুসন্ধান দেখে — আর NDA ও ডেটা-রুম অ্যাক্সেস সুষ্ঠু রাখে।",
        } as L,
      },
      {
        title: { en: "Investor Relations", bn: "ইনভেস্টর রিলেশনস" } as L,
        copy: {
          en: "Matches registered investors by sector, ticket size and horizon — then stays through term discussions and documentation.",
          bn: "খাত, টিকেট সাইজ ও সময়সীমা মিলিয়ে নিবন্ধিত বিনিয়োগকারীদের ম্যাচ করে — তারপর শর্ত-আলোচনা ও ডকুমেন্টেশন জুড়ে পাশে থাকে।",
        } as L,
      },
      {
        title: { en: "Sector Advisors", bn: "খাতভিত্তিক অ্যাডভাইজর" } as L,
        copy: {
          en: "Garments, agri-food and logistics specialists engaged per listing — the people who know what 'normal' looks like in that industry.",
          bn: "প্রতিটি তালিকা অনুযায়ী নিযুক্ত গার্মেন্টস, কৃষি-খাদ্য ও লজিস্টিক্স বিশেষজ্ঞ — যাঁরা জানেন ওই শিল্পে 'স্বাভাবিক' দেখতে কেমন।",
        } as L,
      },
    ],
  },
  whatWeAre: {
    areTitle: { en: "What we are", bn: "আমরা যা" } as L,
    areNotTitle: { en: "What we are not", bn: "আমরা যা নই" } as L,
    are: [
      { en: "A financial consultancy and matchmaking platform, registered in Bangladesh.", bn: "বাংলাদেশে নিবন্ধিত একটি আর্থিক পরামর্শদাতা ও ম্যাচমেকিং প্ল্যাটফর্ম।" },
      { en: "A verification-first gate between investors and businesses.", bn: "বিনিয়োগকারী ও ব্যবসার মাঝে যাচাই-প্রথম একটি প্রবেশদ্বার।" },
      { en: "A documentation house: fact-packs, data rooms, bilingual records.", bn: "নথির ঘর: ফ্যাক্ট-প্যাক, ডেটা রুম, দ্বিভাষিক রেকর্ড।" },
      { en: "Honest brokers of 'not yet' — readiness feedback is a service, not a rejection.", bn: "'এখনো নয়'-এর সৎ বাহক — প্রস্তুতি-মতামত একটি সেবা, প্রত্যাখ্যান নয়।" },
    ] as L[],
    areNot: [
      { en: "Not a bank, NBFI, or depository — we never hold client funds.", bn: "ব্যাংক, এনবিএফআই বা আমানতকারী নই — গ্রাহকের অর্থ কখনো গচ্ছিত রাখি না।" },
      { en: "Not a stock exchange or trading venue for listed securities.", bn: "তালিকাভুক্ত সিকিউরিটির জন্য স্টক এক্সচেঞ্জ বা ট্রেডিং ভেন্যু নই।" },
      { en: "Not a guarantor of returns — no one at NexFund will promise you a profit.", bn: "মুনাফার নিশ্চয়তাদাতা নই — নেক্সফান্ডের কেউই আপনাকে লাভের প্রতিশ্রুতি দেবে না।" },
      { en: "Not a pressure machine — our Charter commits us to decisions without deadlines.", bn: "চাপের যন্ত্র নই — চার্টার অনুযায়ী আমরা ডেডলাইন দিয়ে সিদ্ধান্ত নিতে বাধ্য করি না।" },
    ] as L[],
  },
} as const;

/* ══════════════════════════════════════════════════════════════════
   R11 — IMPACT page content (live platform numbers + methodology)
   ══════════════════════════════════════════════════════════════════ */

export const IMPACT = {
  hero: {
    eyebrow: { en: "IMPACT & MARKET", bn: "ইমপ্যাক্ট ও মার্কেট" } as L,
    title: {
      en: "Numbers we can show — and how we count them.",
      bn: "যে সংখ্যাগুলো দেখাতে পারি — আর কীভাবে গোনা হয়।",
    } as L,
    copy: {
      en: "Most platforms publish vanity numbers. This page splits ours in two: live counts straight from the platform database, and curated milestones our team verifies quarterly. If a number isn't here, we don't claim it.",
      bn: "বেশিরভাগ প্ল্যাটফর্ম প্রকাশ করে আত্মতুষ্টির সংখ্যা। আমরা আমাদেরটা রাখি দুই ভাগে: প্ল্যাটফর্ম ডেটাবেজ থেকে সরাসরি লাইভ গণনা, আর আমাদের টিমের ত্রৈমাসিকভাবে যাচাই করা কিউরেটেড মাইলফলক। কোনো সংখ্যা এখানে না থাকলে, আমরা সেটির দাবিই করি না।",
    } as L,
    badge: { en: "Live from the platform database", bn: "প্ল্যাটফর্ম ডেটাবেজ থেকে লাইভ" } as L,
  },
  liveSection: {
    eyebrow: { en: "LIVE FROM THE DATABASE", bn: "ডেটাবেজ থেকে লাইভ" } as L,
    title: { en: "The platform, right now.", bn: "প্ল্যাটফর্ম, এই মুহূর্তে।" } as L,
    sub: {
      en: "Every figure below is computed from the live platform database at the moment you opened this page — registrations, readiness checks, verified listings, expressed interest.",
      bn: "নিচের প্রতিটি সংখ্যা আপনি এই পাতাটি খোলার মুহূর্তে লাইভ প্ল্যাটফর্ম ডেটাবেজ থেকে গণনা করা — নিবন্ধন, প্রস্তুতি-যাচাই, যাচাইকৃত তালিকা, প্রকাশিত আগ্রহ।",
    } as L,
  },
  milestones: {
    eyebrow: { en: "CURATED MILESTONES", bn: "কিউরেটেড মাইলফলক" } as L,
    title: { en: "What has moved through the crossing.", bn: "মিলনবিন্দু দিয়ে যা অতিক্রম করেছে।" } as L,
    sub: {
      en: "Verified quarterly by the NexFund team. These are the business-level numbers behind the introductions — capital introduced, data rooms opened, matches made.",
      bn: "নেক্সফান্ড টিমের ত্রৈমাসিকভাবে যাচাইকৃত। পরিচয়ের পেছনের ব্যবসা-স্তরের সংখ্যাগুলো — পরিচিত মূলধন, খোলা ডেটা রুম, হয়ে যাওয়া ম্যাচ।",
    } as L,
  },
  methodology: {
    eyebrow: { en: "HOW WE COUNT", bn: "কীভাবে গোনা হয়" } as L,
    title: { en: "A number is only honest if its method is public.", bn: "পদ্ধতি প্রকাশ না থাকলে সংখ্যাও সৎ নয়।" } as L,
    points: [
      {
        title: { en: "Live counts are computed, not typed", bn: "লাইভ গণনা টাইপ করা নয়, হিসাব করা" } as L,
        copy: {
          en: "Registrations, listings and interests are aggregated from the platform database on request. We cannot round them up, and we cannot backdate them.",
          bn: "নিবন্ধন, তালিকা ও আগ্রহ অনুরোধের মুহূর্তে প্ল্যাটফর্ম ডেটাবেজ থেকে সমষ্টিভুক্ত হয়। বাড়িয়ে বলা বা পেছনের তারিখে বসানো আমাদের পক্ষে সম্ভব নয়।",
        } as L,
      },
      {
        title: { en: "\"Capital seeking\" is the listed range", bn: "\"সংগ্রহের লক্ষ্য\" মানে তালিকাভুক্ত পরিসর" } as L,
        copy: {
          en: "We sum the verified seeking range of every live listing. It is capital businesses are raising now — not money raised, committed, or guaranteed by NexFund.",
          bn: "প্রতিটি লাইভ তালিকার যাচাইকৃত সংগ্রহ-পরিসর যোগ করা হয়। এটি ব্যবসাগুলো এখন সংগ্রহ করছে — উত্তোলিত, অঙ্গীকৃত বা নেক্সফান্ড-নিশ্চয়িত অর্থ নয়।",
        } as L,
      },
      {
        title: { en: "\"Appetite\" comes from stated preferences", bn: "\"বিনিয়োগ-মন\" আসে ঘোষিত পছন্দ থেকে" } as L,
        copy: {
          en: "Registered investors state a ticket-size preference; we sum the stated ranges. It is intent, not deposits — no money sits with us, ever.",
          bn: "নিবন্ধিত বিনিয়োগকারীরা টিকেট-সাইজের পছন্দ জানান; ঘোষিত পরিসরগুলো যোগ করা হয়। এটি ইচ্ছার প্রকাশ, আমানত নয় — আমাদের কাছে কখনোই অর্থ জমা থাকে না।",
        } as L,
      },
      {
        title: { en: "Milestones are verified quarterly", bn: "মাইলফলক ত্রৈমাসিকভাবে যাচাইকৃত" } as L,
        copy: {
          en: "Introductions made, data rooms opened and capital introduced are recorded when they happen and re-checked each quarter. Any correction is published, not buried.",
          bn: "পরিচয়, ডেটা রুম ও পরিচিত মূলধন ঘটনা ঘটার সময়েই নথিভুক্ত হয়, প্রতি ত্রৈমাসিকে পুনঃযাচাই হয়। কোনো সংশোধন চাপা দেওয়া হয় না, প্রকাশ করা হয়।",
        } as L,
      },
      {
        title: { en: "We don't publish returns", bn: "আমরা মুনাফার হার প্রকাশ করি না" } as L,
        copy: {
          en: "You will not find an IRR, a success rate, or a 'portfolio performance' figure on this page. Investments are private contracts between two parties — and past results never promise future ones.",
          bn: "এই পাতায় আইআরআর, সফলতার হার বা 'পোর্টফোলিও পারফরম্যান্স' খুঁজে পাবেন না। বিনিয়োগ দুই পক্ষের ব্যক্তিগত চুক্তি — আর অতীতের ফলাফল ভবিষ্যতের প্রতিশ্রুতি নয়।",
        } as L,
      },
      {
        title: { en: "Demo-stage honesty", bn: "ডেমো-পর্যায়ের স্বচ্ছতা" } as L,
        copy: {
          en: "This deployment is a staging showcase: listings and milestone figures are marked demo data for presentation purposes. The counting method, however, is production-grade.",
          bn: "এই ডিপ্লয়মেন্ট একটি স্টেজিং শোকেস: তালিকা ও মাইলফলকের সংখ্যাগুলো উপস্থাপনার জন্য ডেমো হিসেবে চিহ্নিত। তবে গণনার পদ্ধতিটি প্রোডাকশন-মানের।",
        } as L,
      },
    ],
  },
  insightStats: {
    eyebrow: { en: "KNOWLEDGE OUTPUT", bn: "জ্ঞান-উৎপাদন" } as L,
    title: { en: "What we've published, free for everyone.", bn: "যা প্রকাশ করেছি, সবার জন্য উন্মুক্ত।" } as L,
    sub: {
      en: "Insights, glossary terms, FAQs and fact-packs — the library that keeps both sides of the crossing speaking the same language.",
      bn: "ইনসাইট, শব্দকোষ, প্রশ্নোত্তর ও ফ্যাক্ট-প্যাক — মিলনবিন্দুর দুই পক্ষ যেন এক ভাষায় কথা বলে, সেই লাইব্রেরি।",
    } as L,
  },
  cta: {
    title: { en: "Numbers start with a conversation.", bn: "সংখ্যা শুরু হয় একটি আলাপ দিয়ে।" } as L,
    copy: {
      en: "Register as an investor or bring us your business — the next figure on this page could be yours.",
      bn: "বিনিয়োগকারী হিসেবে নিবন্ধন করুন বা আপনার ব্যবসা নিয়ে আসুন — এই পাতার পরের সংখ্যাটি হতে পারে আপনার।",
    } as L,
  },
} as const;
