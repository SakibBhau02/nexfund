"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Banknote,
  Building2,
  Calculator,
  CalendarDays,
  CheckCircle2,
  Compass,
  Eye,
  FileText,
  HandCoins,
  Handshake,
  Landmark,
  Languages,
  Lock,
  MapPin,
  MessageCircle,
  Milestone,
  Quote,
  Scale,
  SearchCheck,
  ShieldCheck,
  Target,
  Telescope,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, type L } from "@/lib/i18n";
import { ABOUT } from "@/lib/content";
import { bnNum } from "@/lib/format";
import { navigateTo } from "@/lib/page-router";
import { useDialogStore } from "@/lib/dialog-store";
import {
  CtaBand,
  CyanButton,
  DetailHero,
  MetaChip,
  NavyButton,
  OutlineLightButton,
  PageBody,
  PageHero,
  PageNotFound,
} from "./shell";

/**
 * R11-A About Us — landing + 4 detail pages.
 *   #p/about           → mission & vision twin cards, values, story, timeline,
 *                        team, are/are-not, CTA
 *   #p/about/mission   → the mission statement unpacked, clause by clause
 *   #p/about/vision    → the vision decomposed into three future states
 *   #p/about/story     → the narrative, in three chapters + the full timeline
 *   #p/about/team      → the five functions, what they own, honest notes
 * Data: ABOUT block from content.ts (hero/mission/vision/values/story/
 * timeline/team/whatWeAre). All other copy lives in the local T object.
 */

/* ══════════════════════════════════════════════════════════════════════
   Local copy (landing + details) — bn/en parity, Bangla digits via bnNum
   ══════════════════════════════════════════════════════════════════════ */

const T = {
  /* ── landing ── */
  heroGetStarted: { en: "Get started", bn: "শুরু করুন" } as const,
  heroImpact: { en: "See our impact", bn: "ইমপ্যাক্ট দেখুন" } as const,
  heroImageAlt: {
    en: "Advisors shaking hands in the NexFund Dhaka office",
    bn: "নেক্সফান্ডের ঢাকা অফিসে হাতমেলানো দুই অ্যাডভাইজার",
  } as const,

  mvEyebrow: { en: "TWO STATEMENTS", bn: "দুটি বিবৃতি" } as const,
  mvTitle: { en: "What we do every day, and what we're building toward.", bn: "আমরা প্রতিদিন যা করি, আর যে গন্তব্যে এগোচ্ছি।" } as const,
  mvCopy: {
    en: "The mission is the work; the vision is the market that work is meant to produce. Read both — they're written to be checked, not framed.",
    bn: "মিশন হলো কাজটি; ভিশন হলো সেই বাজার, যা এই কাজ তৈরি করতে চায়। দুটোই পড়ুন — লেখা হয়েছে যাচাই করানোর জন্য, ফ্রেমে বাঁধার জন্য নয়।",
  } as const,
  readMission: { en: "Read the mission in detail", bn: "মিশনটি বিস্তারিত পড়ুন" } as const,
  readVision: { en: "Read the vision in detail", bn: "ভিশনটি বিস্তারিত পড়ুন" } as const,

  whereEnforced: { en: "Where it's enforced", bn: "কোথায় কার্যকর" } as const,
  charterCardTitle: { en: "Behind all five: the Charter", bn: "পাঁচটির পেছনে: চার্টার" } as const,
  charterCardCopy: {
    en: "Seven published promises — fees in writing, no custody, no pressure — that turn every value above into a commitment you can quote back at us.",
    bn: "সাতটি প্রকাশিত প্রতিশ্রুতি — ফি লিখিতভাবে, অর্থ গচ্ছিত নয়, কোনো চাপ নয় — উপরের প্রতিটি মূল্যবোধকে বদলে দেয় এমন অঙ্গীকারে, যা আপনি আমাদের সামনে তুলে ধরতে পারেন।",
  } as const,
  charterCardCta: { en: "Read the Charter", bn: "চার্টার পড়ুন" } as const,

  pathBusinesses: { en: "Businesses that can't be seen", bn: "ব্যবসা, যা দেখা যায় না" } as const,
  pathCapital: { en: "capital that can't verify", bn: "পুঁজি, যা যাচাই করতে পারে না" } as const,
  crossingCaption: { en: "meet at one crossing: NexFund", bn: "মিলিত হয় এক মিলনবিন্দুতে: নেক্সফান্ড" } as const,
  storyCrossLine: {
    en: "Both paths still walk through this platform — see exactly how each side is served.",
    bn: "দুই পথের চলা আজও এই প্ল্যাটফর্ম দিয়েই — প্রতিটি পক্ষের জন্য ঠিক কী আছে, দেখুন।",
  } as const,
  storyCrossCta: { en: "See who we serve", bn: "আমাদের দর্শক দেখুন" } as const,

  todayChip: { en: "See the live numbers", bn: "লাইভ সংখ্যা দেখুন" } as const,

  teamNote: {
    en: "Sector advisors are engaged per listing — the bench deepens wherever the business is.",
    bn: "খাতভিত্তিক অ্যাডভাইজাররা প্রতিটি তালিকা অনুযায়ী নিযুক্ত হন — ব্যবসা যেখানে, বেঞ্চ সেখানেই গভীর হয়।",
  } as const,
  talkTeam: { en: "Talk to the team", bn: "টিমের সাথে কথা বলুন" } as const,
  replyChip: { en: "One business day to a reply", bn: "উত্তর এক কর্মদিবসে" } as const,

  ledgerEyebrow: { en: "THE HONEST LEDGER", bn: "সৎ হিসাব" } as const,
  ledgerTitle: { en: "Where the responsibility ends.", bn: "দায়িত্বের সীমারেখা।" } as const,
  ledgerCopy: {
    en: "An about page should also say what a company is not. Ours is short and specific — hold us to it.",
    bn: "'আমাদের কথা' পাতায় কোম্পানি কী নয়, সেটাও বলা উচিত। আমাদেরটা ছোট আর সুনির্দিষ্ট — এগুলোই মেনে চলতে আমাদের বাধ্য করুন।",
  } as const,

  ctaTitle: { en: "Meet the standard before the pitch.", bn: "পিচের আগেই মানদণ্ডটি জেনে নিন।" } as const,
  ctaCopy: {
    en: "Read the five-pillar vetting standard every listing must pass — then decide whether to knock on an investor's door or ours.",
    bn: "প্রতিটি তালিকাকে যে পাঁচ-স্তম্ভ মানদণ্ড পাস করতে হয়, আগে সেটি পড়ুন — তারপর ঠিক করুন বিনিয়োগকারীর দরজায় নক করবেন, নাকি আমাদের।",
  } as const,
  ctaRegister: { en: "Register as an investor", bn: "বিনিয়োগকারী হিসেবে নিবন্ধন" } as const,
  ctaVetting: { en: "Read the vetting standard", bn: "যাচাই মানদণ্ড পড়ুন" } as const,

  /* ── shared detail bits ── */
  railHeading: { en: "About NexFund", bn: "নেক্সফান্ড সম্পর্কে" } as const,
  railLabel: { en: "About pages", bn: "আমাদের কথার পাতাগুলো" } as const,
  backAbout: { en: "Back to About Us", bn: "আমাদের কথায় ফিরুন" } as const,

  /* ── mission detail ── */
  missionChips: [
    { en: "Verification first", bn: "যাচাই আগে" },
    { en: "Plain language", bn: "সহজ ভাষা" },
    { en: "Fees in writing", bn: "ফি লিখিতভাবে" },
  ] as const,
  missionHeroCopy: {
    en: "One sentence, three commitments — each one built into how the platform behaves. This page unpacks them, clause by clause.",
    bn: "একটি বাক্য, তিনটি অঙ্গীকার — প্রতিটিই প্ল্যাটফর্মের আচরণে বসানো। এই পাতায় সেগুলো ধারা ধরে ধরে খুলে দেখানো হলো।",
  } as const,
  missionImageAlt: {
    en: "Advisors reviewing documents at the NexFund office",
    bn: "নেক্সফান্ড অফিসে নথি পর্যালোচনারত অ্যাডভাইজাররা",
  } as const,
  unpackEyebrow: { en: "THE STATEMENT, UNPACKED", bn: "বিবৃতি, খুলে দেখা" } as const,
  unpackTitle: { en: "Three clauses, each one load-bearing.", bn: "তিনটি ধারা, প্রতিটিই ভার-বহনকারী।" } as const,
  unpackCopy: {
    en: "Read the mission statement again, slowly. Every clause below is something the product does — not something it aspires to.",
    bn: "মিশন বিবৃতিটি আরেকবার ধীরে পড়ুন। নিচের প্রতিটি ধারা প্রোডাক্টের করা কাজ — কামনা করা কোনো স্বপ্ন নয়।",
  } as const,
  productEyebrow: { en: "WHERE YOU CAN SEE IT", bn: "যেখানে দেখতে পাবেন" } as const,
  productTitle: { en: "The mission, in the product.", bn: "প্রোডাক্টেই মিশন।" } as const,
  productCopy: {
    en: "A mission statement is cheap on paper. Here is where ours is enforced — click through and check.",
    bn: "কাগজে মিশন বিবৃতি সস্তা। আমাদেরটা কোথায় কার্যকর, নিচে দেখুন — ক্লিক করে নিজেই যাচাই করুন।",
  } as const,
  productCards: [
    {
      title: { en: "Proof, published", bn: "প্রমাণ, প্রকাশ্যে" } as const,
      copy: {
        en: "The five-pillar standard, its document checklists and red-flag list — all published openly, before you ever register.",
        bn: "পাঁচ-স্তম্ভ মানদণ্ড, নথি-চেকলিস্ট আর লাল-সংকেত তালিকা — সবই প্রকাশ্যে, নিবন্ধনের আগেই।",
      } as const,
      where: "vetting",
    },
    {
      title: { en: "Words you can read", bn: "যে ভাষা আপনি পড়তে পারেন" } as const,
      copy: {
        en: "Eleven investment terms defined in plain Bangla and English — the same discipline every document follows.",
        bn: "এগারোটি বিনিয়োগ-পরিভাষার সহজ বাংলা-ইংরেজি সংজ্ঞা — প্রতিটি নথি একই নিয়মে চলে।",
      } as const,
      where: "glossary",
    },
    {
      title: { en: "Fees, in writing", bn: "ফি, লিখিতভাবে" } as const,
      copy: {
        en: "The Charter's first promise — and the FAQ answer you can quote. A fixed introduction fee, never a percentage of returns.",
        bn: "চার্টারের প্রথম প্রতিশ্রুতি — আর সাধারণ জিজ্ঞাসার সেই উত্তর, যা আপনি হুবহু উদ্ধৃত করতে পারেন। নির্দিষ্ট ইন্ট্রোডাকশন ফি, মুনাফার শতকরা কখনোই নয়।",
      } as const,
      where: "charter",
    },
  ] as const,
  missionAsideTitle: { en: "The one-line version", bn: "এক লাইনে" } as const,
  missionAsideCopy: {
    en: "Verification first, plain language, fees in writing — everything else follows from these three.",
    bn: "যাচাই আগে, সহজ ভাষা, ফি লিখিতভাবে — বাকি সব এই তিনটিরই ফল।",
  } as const,
  missionCtaTitle: { en: "The mission is the filter, not the slogan.", bn: "মিশন এখানে স্লোগান নয়, ছাঁকনি।" } as const,
  missionCtaCopy: {
    en: "Everything NexFund publishes — listings, insights, even this page — goes through it. Hold us to that.",
    bn: "নেক্সফান্ড যা প্রকাশ করে — তালিকা, ইনসাইট, এই পাতাও — সবই এই ছাঁকনি দিয়ে যায়। সেটাই মেনে চলতে আমাদের বাধ্য করুন।",
  } as const,
  missionCtaPrimary: { en: "Read the standard it runs on", bn: "যে মানদণ্ডে চলে, সেটি পড়ুন" } as const,
  missionCtaNext: { en: "Next: the vision", bn: "এরপর: ভিশন" } as const,

  /* ── vision detail ── */
  visionHeroCopy: {
    en: "Not a forecast — a destination. Three things have to become normal in Bangladesh before this sentence can be retired.",
    bn: "এটি ভবিষ্যদ্বাণী নয় — গন্তব্য। বাংলাদেশে তিনটি জিনিস স্বাভাবিক হয়ে উঠলে তবেই এই বাক্যটি অবসর নিতে পারবে।",
  } as const,
  visionImageAlt: {
    en: "An investor and advisor discussing a verified opportunity",
    bn: "যাচাইকৃত সুযোগ নিয়ে আলোচনারত বিনিয়োগকারী ও অ্যাডভাইজার",
  } as const,
  trueEyebrow: { en: "THREE FUTURES", bn: "তিনটি ভবিষ্যৎ" } as const,
  trueTitle: { en: "The vision, in three futures.", bn: "ভিশন, তিনটি ভবিষ্যতে।" } as const,
  trueCopy: {
    en: "Each card is one of the vision's commitments, turned into the future it describes — and the work that has to happen on the way.",
    bn: "প্রতিটি কার্ড ভিশনের একটি অঙ্গীকার, রূপ নেওয়া সেই ভবিষ্যতে — আর পথের ধারে যে কাজগুলো করতেই হবে।",
  } as const,
  trueCards: [
    {
      copy: {
        en: "Bank credit can't be the only lane. SMEs need a documented route to private money — valuations, data rooms and contracts that hold.",
        bn: "ব্যাংকঋণ একমাত্র পথ হতে পারে না। এসএমই-দের ব্যক্তিগত পুঁজির কাছে পৌঁছানোর নথিভুক্ত রাস্তা দরকার — মূল্যায়ন, ডেটা রুম আর টেকসই চুক্তিসহ।",
      } as const,
      where: "services",
    },
    {
      copy: {
        en: "The first question in every room should be 'show me' — not 'trust me'. Verified fact-packs need to be what a conversation starts from.",
        bn: "প্রতিটি ঘরের প্রথম প্রশ্ন হওয়া উচিত 'দেখান' — 'বিশ্বাস করুন' নয়। যাচাইকৃত ফ্যাক্ট-প্যাক থেকেই আলাপ শুরু হওয়া দরকার।",
      } as const,
      where: "vetting",
    },
    {
      copy: {
        en: "Savings that sit idle in accounts and gold could be building factories at home — if the proof to justify the risk exists.",
        bn: "হিসাবে ও স্বর্ণে পড়ে থাকা সঞ্চয় ঘরের কারখানা গড়তে পারে — যদি ঝুঁকি নেওয়ার মতো প্রমাণটুকু থাকে।",
      } as const,
      where: "impact",
    },
  ] as const,
  workToday: { en: "The work today", bn: "আজকের কাজ" } as const,
  honestEyebrow: { en: "THE HONEST PART", bn: "সৎ কথাটা" } as const,
  honestTitle: { en: "What the vision doesn't promise", bn: "এই ভিশন যা প্রতিশ্রুতি দেয় না" } as const,
  honestCopy: {
    en: "No guaranteed returns, no dates, no end of risk. A better market is not a safe one — verification narrows risk, it never removes it.",
    bn: "নিশ্চিত মুনাফা নয়, তারিখ নয়, ঝুঁকির অবসান নয়। ভালো বাজার মানেই নিরাপদ বাজার নয় — যাচাই ঝুঁকি সংকুচিত করে, কখনোই দূর করে না।",
  } as const,
  riskCta: { en: "Read the risk disclosure", bn: "ঝুঁকি বিবরণী পড়ুন" } as const,
  visionAsideTitle: { en: "From mission to vision", bn: "মিশন থেকে ভিশন" } as const,
  visionAsideCopy: {
    en: "The mission is what we do; the vision is what it adds up to. Start with the daily work.",
    bn: "মিশন হলো আমরা যা করি; ভিশন হলো তার যোগফল। শুরু করুন দৈনন্দিন কাজ দিয়ে।",
  } as const,
  visionCtaTitle: { en: "A vision is judged by the road.", bn: "ভিশনকে বিচার করতে হয় পথ দিয়ে।" } as const,
  visionCtaCopy: {
    en: "See what has actually moved through the crossing — live platform numbers and quarterly-verified milestones.",
    bn: "মিলনবিন্দু দিয়ে আসলে কী অতিক্রম করেছে দেখুন — লাইভ প্ল্যাটফর্ম সংখ্যা আর ত্রৈমাসিকভাবে যাচাইকৃত মাইলফলক।",
  } as const,
  visionImpact: { en: "See the road so far", bn: "অবধির পথচলা দেখুন" } as const,
  visionBackMission: { en: "Back to the mission", bn: "মিশনে ফিরুন" } as const,

  /* ── story detail ── */
  storyDetailTitle: { en: "Why NexFund exists", bn: "নেক্সফান্ড কেন আছে" } as const,
  storyHeroCopy: {
    en: "The full account — the market that asked the question, and the answer we chose to build.",
    bn: "পূর্ণ বিবরণ — যে বাজার প্রশ্নটি তুলেছিল, আর সেই প্রশ্নের উত্তরে আমরা যা বানাতে বেছে নিলাম।",
  } as const,
  storyImageAlt: {
    en: "A Bangladeshi knitwear factory floor — the economy NexFund serves",
    bn: "একটি বাংলাদেশি নিটওয়্যার কারখানার মেঝে — যে অর্থনীতির জন্য নেক্সফান্ড কাজ করে",
  } as const,
  chaptersEyebrow: { en: "THE STORY, IN THREE CHAPTERS", bn: "গল্প, তিন পর্বে" } as const,
  chaptersTitle: { en: "A gap, a silence, and a table.", bn: "একটি ফাঁক, একটি নীরবতা, আর একটি টেবিল।" } as const,
  storyRoadTitle: { en: "The road so far, in five moves.", bn: "অবধির পথচলা, পাঁচ ধাপে।" } as const,
  tocLabel: { en: "On this page", bn: "এই পাতায়" } as const,
  storyCtaTitle: { en: "The story continues on both sides of the table.", bn: "গল্পটি চলছে টেবিলের দুই পাশেই।" } as const,
  storyCtaCopy: {
    en: "See how investors and entrepreneurs each move through the crossing — the same standard, two different journeys.",
    bn: "বিনিয়োগকারী ও উদ্যোক্তা কীভাবে মিলনবিন্দু পার হন, দেখুন — মানদণ্ড এক, যাত্রা দুই।",
  } as const,
  meetTeam: { en: "Meet the team", bn: "টিমের সাথে পরিচিত হোন" } as const,
  storyCtaPrimary: { en: "See who we serve", bn: "আমাদের দর্শক দেখুন" } as const,
  storyCtaSecondary: { en: "See the impact so far", bn: "এ পর্যন্ত ইমপ্যাক্ট দেখুন" } as const,

  /* ── team detail ── */
  teamDetailTitle: { en: "The people behind the standard", bn: "মানদণ্ডের পেছনের মানুষ" } as const,
  teamHeroCopy: {
    en: "Five functions, one standard, no silos. Here is who owns what — and how to reach a human when you need one.",
    bn: "পাঁচটি কাজ, একটি মানদণ্ড, কোনো পৃথক ঘর নেই। কে কী-এর মালিক — আর দরকারের সময় মানুষটাকে কীভাবে পাবেন।",
  } as const,
  teamImageAlt: {
    en: "Advisors in discussion at the NexFund Dhaka office",
    bn: "নেক্সফান্ডের ঢাকা অফিসে আলোচনারত অ্যাডভাইজাররা",
  } as const,
  rolesEyebrow: { en: "THE FIVE FUNCTIONS", bn: "পাঁচটি কাজ" } as const,
  rolesTitle: { en: "Who owns what", bn: "কে কী-এর মালিক" } as const,
  rolesCopy: {
    en: "No silos: every function touches every listing, and every listing answers to all five.",
    bn: "কোনো পৃথক ঘর নেই: প্রতিটি কাজ ছুঁয়ে যায় প্রতিটি তালিকাকে, আর প্রতিটি তালিকা জবাব দেয় পাঁচটির সবার কাছেই।",
  } as const,
  ownsLabel: { en: "What they own", bn: "তাঁদের দায়িত্ব" } as const,
  honestNoteTitle: { en: "An honest note about names", bn: "নাম নিয়ে একটি সৎ কথা" } as const,
  honestNote: {
    en: "NexFund lists businesses by code name — and the same discretion applies to our own people. The names behind a review open up when an introduction is approved and the NDA is signed. Until then, the team stays reachable to everyone through the contact page — one business day to a reply, in Bangla or English.",
    bn: "নেক্সফান্ড ব্যবসা তালিকাভুক্ত করে কোড নামে — আর আমাদের নিজেদের মানুষদের বেলাতেও একই বিবেচনা। পরিচয় অনুমোদিত হয়ে NDA সই হলে রিভিউয়ের পেছনের নামগুলো খুলে যায়। ততদিন টিমটি সবার কাছেই পৌঁছানো যায় যোগাযোগ পাতায় — উত্তর এক কর্মদিবসে, বাংলা বা ইংরেজিতে।",
  } as const,
  teamCtaTitle: { en: "Raising capital? These are the people you'll work with.", bn: "মূলধন তুলছেন? এরাই আপনার কাজের সঙ্গী হবেন।" } as const,
  teamCtaCopy: {
    en: "Start with a free conversation — the same team that runs the standard will tell you, honestly, where you stand.",
    bn: "বিনামূল্যে একটি আলাপ দিয়ে শুরু করুন — মানদণ্ড যাঁরা চালান, তাঁরাই সৎভাবে বলবেন আপনি কোথায় দাঁড়িয়ে।",
  } as const,
  teamCtaPrimary: { en: "Start founder registration", bn: "উদ্যোক্তা রেজিস্ট্রেশন শুরু করুন" } as const,
};

/* ── data-driven bits ─────────────────────────────────────────────────── */

/** Page labels for the values "where it's enforced" cross-links. */
const WHERE_LABELS: Record<string, L> = {
  vetting: { en: "Vetting Standard", bn: "যাচাই মানদণ্ড" },
  insights: { en: "Insights", bn: "ইনসাইটস" },
  privacy: { en: "Privacy Promise", bn: "গোপনীয়তার প্রতিশ্রুতি" },
  terms: { en: "Terms of Use", bn: "ব্যবহারের শর্তাবলি" },
  faq: { en: "FAQ", bn: "সাধারণ জিজ্ঞাসা" },
  glossary: { en: "Glossary", bn: "শব্দকোষ" },
  charter: { en: "The Charter", bn: "চার্টার" },
  services: { en: "Services", bn: "সেবাসমূহ" },
  impact: { en: "Impact", bn: "ইমপ্যাক্ট" },
  risk: { en: "Risk Disclosure", bn: "ঝুঁকি বিবরণী" },
  "who-we-serve": { en: "Who We Serve", bn: "আমাদের দর্শক" },
};

const VALUES_ICONS: Record<string, LucideIcon> = {
  proof: ShieldCheck,
  plain: Languages,
  confidential: Lock,
  "no-custody": Landmark,
  fees: FileText,
};

const TEAM_ICONS: LucideIcon[] = [SearchCheck, Calculator, Scale, Handshake, Users];

/** "What they own" bullets for the team detail cards (parallel to ABOUT.team.roles). */
const TEAM_OWNS: L[][] = [
  [
    { en: "The five-pillar checklist — every document, every cross-check.", bn: "পাঁচ-স্তম্ভ চেকলিস্ট — প্রতিটি নথি, প্রতিটি মিলিয়ে-দেখা হিসাব।" },
    { en: "Site visits and customer reference calls, in person.", bn: "সাইট ভিজিট ও গ্রাহক-রেফারেন্স কল — নিজেরা সরাসরি।" },
    { en: "The plain-language risk summary on every listing.", bn: "প্রতিটি তালিকার সহজ-ভাষার ঝুঁকি-সারসংক্ষেপ।" },
  ],
  [
    { en: "Valuations with methods and assumptions shown.", bn: "মূল্যায়ন — পদ্ধতি ও অনুমানসহ, দৃশ্যমান।" },
    { en: "Three-to-five-year models, downside case always included.", bn: "তিন-পাঁচ বছরের মডেল, ডাউনসাইড কেস সবসময় সহ।" },
    { en: "Use-of-funds plans that reconcile line by line.", bn: "তহবিল-ব্যবহারের পরিকল্পনা, লাইন ধরে ধরে মিলানো।" },
  ],
  [
    { en: "Trade licenses, tax filings, litigation searches.", bn: "ট্রেড লাইসেন্স, কর-জমা, মামলা-অনুসন্ধান।" },
    { en: "NDAs and data-room access control.", bn: "NDA ও ডেটা-রুম অ্যাক্সেসের নিয়ন্ত্রণ।" },
    { en: "The anonymization discipline behind every code name.", bn: "প্রতিটি কোড নামের পেছনের বেনামি-নিয়মাবলি।" },
  ],
  [
    { en: "Matching by sector, ticket size and horizon.", bn: "খাত, টিকেট সাইজ ও সময়সীমা মিলিয়ে ম্যাচিং।" },
    { en: "The advisor call every registered investor gets.", bn: "প্রতিটি নিবন্ধিত বিনিয়োগকারীর অ্যাডভাইজার কল।" },
    { en: "Staying at the table through term discussions.", bn: "শর্ত-আলোচনা জুড়ে টেবিলে পাশে থাকা।" },
  ],
  [
    { en: "Garments, agri-food and logistics depth, per listing.", bn: "গার্মেন্টস, কৃষি-খাদ্য ও লজিস্টিক্সে গভীরতা — তালিকাভেদে।" },
    { en: "Knowing what 'normal' looks like in the industry.", bn: "শিল্পে 'স্বাভাবিক' দেখতে কেমন, সেটি জানা।" },
    { en: "A second pair of eyes on sector-specific risks.", bn: "খাতভিত্তিক ঝুঁকিতে আরেকজোড়া চোখ।" },
  ],
];

/** Extra sentence per timeline item, shown on the story detail page. */
const TIMELINE_MORE: L[] = [
  {
    en: "Those conversations became notebooks: what investors said they needed before writing a cheque, and what founders said they could actually produce.",
    bn: "সেই আলাপগুলোই পরে নোটবুক হয়ে জমা রইল: চেক লেখার আগে বিনিয়োগকারী কী চান, আর প্রতিষ্ঠাতারা আসলে কী দিতে পারেন।",
  },
  {
    en: "It's easier to write standards before you have listings to lose. That was the point.",
    bn: "হারানোর মতো তালিকা থাকার আগেই মানদণ্ড লেখা সহজ — উদ্দেশ্যও তা-ই ছিল।",
  },
  {
    en: "Each pillar got a document checklist and a 'what you'll see' promise — published so founders could prepare before applying.",
    bn: "প্রতিটি স্তম্ভের নথি-চেকলিস্ট আর 'আপনি কী দেখবেন' প্রতিশ্রুতি প্রকাশ করা হয় — যেন আবেদনের আগেই প্রতিষ্ঠাতারা প্রস্তুতি নিতে পারেন।",
  },
  {
    en: "The first anonymized fact-pack went live with its risks on the front page — not buried in an appendix.",
    bn: "প্রথম বেনামি ফ্যাক্ট-প্যাক প্রকাশ পায় ঝুঁকি সামনে রেখেই — পরিশিষ্টে চাপা দিয়ে নয়।",
  },
  {
    en: "The pipeline is reviewed every quarter, and the counts you can check live on the Impact page.",
    bn: "প্রতি ত্রৈমাসিকে পাইপলাইন পর্যালোচনা হয়, আর গণনাগুলো ইমপ্যাক্ট পাতায় লাইভ মিলিয়ে দেখা যায়।",
  },
];

/** The mission statement's three clauses, unpacked. */
const MISSION_CLAUSES: { head: L; copy: L }[] = [
  {
    head: { en: "“Verification-first matchmaking”", bn: "“যাচাই-প্রথম ম্যাচমেকিং”" },
    copy: {
      en: "The order is the whole point. Most marketplaces list first and check later — if they check at all. NexFund inverts that: the five-pillar review finishes before a listing exists, and any pillar — an unverifiable document, a bank statement that doesn't reconcile, a founder who won't meet us on their own factory floor — can end the process. That is what 'informed' costs, and we think it's the only price worth paying.",
      bn: "ক্রমটাই মূল কথা। বেশিরভাগ মার্কেটপ্লেস আগে তালিকায় তোলে, যাচাই করে পরে — যদি করে। নেক্সফান্ড ক্রমটাই উল্টে দেয়: পাঁচ-স্তম্ভের রিভিউ শেষ হয় তালিকা তৈরির আগেই, আর যেকোনো স্তম্ভ — যাচাই-অযোগ্য নথি, না-মেলা ব্যাংক স্টেটমেন্ট, নিজের কারখানার মেঝেতেই যিনি দেখা করবেন না এমন প্রতিষ্ঠাতা — পুরো প্রক্রিয়া থামিয়ে দিতে পারে। 'তথ্যনির্ভর'-এর দাম এটাই, আর আমাদের বিশ্বাস, দেওয়ার মতো দাম এটাই একমাত্র।",
    },
  },
  {
    head: { en: "“Plain-language documents”", bn: "“সহজভাষার নথি”" },
    copy: {
      en: "An investor who can't read the document isn't informed — they're obedient. So every fact-pack, risk summary and contract is written in plain Bangla first, English alongside: the downside scenario shown in the same font size as the upside, the fees named before the flattery. Jargon is where risk likes to hide; we keep the lights on.",
      bn: "নথি যদি পড়াই না যায়, সেই বিনিয়োগকারী 'তথ্যনির্ভর' নন — বরং আজ্ঞাবহ। তাই প্রতিটি ফ্যাক্ট-প্যাক, ঝুঁকি-সারসংক্ষেপ ও চুক্তি লেখা হয় আগে সহজ বাংলায়, পাশে ইংরেজিতে: ডাউনসাইড পরিসর আপসাইডের মতোই একই অক্ষরে দেখানো, তারিফের আগেই ফি-এর নাম। জার্গনের অন্ধকারেই ঝুঁকি লুকোতে পছন্দ করে; আমরা আলোটা জ্বালিয়েই রাখি।",
    },
  },
  {
    head: { en: "“Fees disclosed in writing”", bn: "“লিখিতভাবে জানানো ফি”" },
    copy: {
      en: "Our introduction fee is a fixed amount, agreed before any work begins, and it is never a percentage of your returns. The reason is structural, not modesty: a percentage of returns quietly makes us your investment's partner in optimism. A written fee keeps us what we should be — a gatekeeper paid to be skeptical.",
      bn: "পরিচয় করিয়ে দেওয়ার ফি নির্দিষ্ট অঙ্কে, কাজ শুরুর আগেই নির্ধারিত — আর আপনার মুনাফার শতকরা কখনোই নয়। কারণটা নম্রতার নয়, গঠনগত: মুনাফার শতকরা হলে আমরা নীরবে আপনার বিনিয়োগের আশাবাদী অংশীদার হয়ে বসি। লিখিত ফি আমাদের রাখে যেখানে থাকা উচিত — সন্দেহ করতেই বেতনপ্রাপ্ত এক দরবান হিসেবে।",
    },
  },
];

/** Story chapters (heads + one extra paragraph each, parallel to ABOUT.story.paragraphs). */
const STORY_CHAPTER_HEADS: { head: L; extra: L }[] = [
  {
    head: { en: "A country that runs on its SMEs", bn: "যে দেশ চলে নিজের এসএমই-দের ওপর" },
    extra: {
      en: "Walk through Narayanganj's knitwear clusters or Bogura's agri belts and you'll find the same story: order books full, margins real, and growth plans that stop at the bank's collateral desk. The businesses are ready. The paperwork around them isn't.",
      bn: "নারায়ণগঞ্জের নিটওয়্যার ক্লাস্টার বা বগুড়ার কৃষি-বেষ্টনী ঘুরে দেখুন — গল্প একই: অর্ডার বই ভরা, মার্জিন আসল, আর বৃদ্ধির পরিকল্পনা থেমে থাকে ব্যাংকের জামানতের টেবিলে। ব্যবসাগুলো প্রস্তুত; চারপাশের কাগজপত্র নয়।",
    },
  },
  {
    head: { en: "Capital, waiting for proof", bn: "পুঁজি, প্রমাণের অপেক্ষায়" },
    extra: {
      en: "Ask them what stops them and the answer is rarely 'risk'. It's 'I can't check'. Remittance savings, family offices, retired professionals — they'll take real risk. They won't take blind risk.",
      bn: "তাঁদের জিজ্ঞাসা করুন কী আটকে রাখে — উত্তরে 'ঝুঁকি' শব্দটি কদাচিৎ আসে; আসে 'যাচাই করা যায় না'। রেমিট্যান্সের সঞ্চয়, পারিবারিক অফিস, অবসরপ্রাপ্ত পেশাজীবী — তাঁরা আসল ঝুঁকি নিতে রাজি; অন্ধ ঝুঁকি নয়।",
    },
  },
  {
    head: { en: "The crossing we chose to build", bn: "যে সংযোগ আমরা বানাতে বেছে নিলাম" },
    extra: {
      en: "That's the whole thesis: the problem isn't a shortage of capital or courage. It's the missing table between them — the documents, the checks, the plain language. So we built the table.",
      bn: "এটাই পুরো থিসিস: সমস্যা পুঁজির বা সাহসের ঘাটতি নয়; দুয়ের মাঝের টেবিলটির অনুপস্থিতি — নথি, যাচাই, সহজ ভাষা। তাই আমরা টেবিলটাই বানালাম।",
    },
  },
];

/** The four about detail pages (rail + dispatch order). */
const DETAILS: { slug: string; label: L; icon: LucideIcon }[] = [
  { slug: "mission", label: { en: "Mission", bn: "মিশন" }, icon: Target },
  { slug: "vision", label: { en: "Vision", bn: "ভিশন" }, icon: Telescope },
  { slug: "story", label: { en: "Our story", bn: "আমাদের গল্প" }, icon: Compass },
  { slug: "team", label: { en: "The team", bn: "টিম" }, icon: Users },
];

const ABOUT_CRUMB = { label: { en: "About Us", bn: "আমাদের কথা" }, page: "about" } as const;

/* ══════════════════════════════════════════════════════════════════════
   Dispatch
   ══════════════════════════════════════════════════════════════════════ */

export default function AboutPage({ detail }: { detail: string | null }) {
  if (detail === "mission") return <MissionDetail />;
  if (detail === "vision") return <VisionDetail />;
  if (detail === "story") return <StoryDetail />;
  if (detail === "team") return <TeamDetail />;
  if (detail) return <PageNotFound page={detail} />;
  return <Landing />;
}

/* ══════════════════════════════════════════════════════════════════════
   Landing  (#p/about)
   ══════════════════════════════════════════════════════════════════════ */

function Landing() {
  const { t } = useLanguage();
  const openInvestor = useDialogStore((s) => s.openInvestor);

  return (
    <>
      <PageHero
        crumbs={[{ label: { en: "About Us", bn: "আমাদের কথা" } }]}
        eyebrow={ABOUT.hero.eyebrow}
        title={ABOUT.hero.title}
        copy={ABOUT.hero.copy}
        image="/images/page-about.png"
        imageAlt={t(T.heroImageAlt)}
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-nx-cyan-300/40 bg-nx-cyan-500/10 px-3.5 py-1.5 text-[12px] font-bold text-nx-cyan-300">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {t(ABOUT.hero.badge)}
          </span>
        }
        actions={
          <>
            <NavyButton onClick={() => navigateTo("get-started")}>{t(T.heroGetStarted)}</NavyButton>
            <OutlineLightButton onClick={() => navigateTo("impact")}>{t(T.heroImpact)}</OutlineLightButton>
          </>
        }
      />

      {/* mission & vision twin cards + values */}
      <PageBody>
        <section aria-labelledby="about-direction">
          <Head id="about-direction" eyebrow={T.mvEyebrow} title={T.mvTitle} copy={T.mvCopy} />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* mission — light card */}
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex h-full flex-col rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_14px_40px_-18px_rgba(6,31,74,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-nx-cyan-300 md:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-nx-cyan-50 text-nx-cyan-700">
                  <Target className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-navy-600 uppercase">
                  {t(ABOUT.mission.eyebrow)}
                </p>
              </div>
              <h3 className="mt-5 text-xl leading-snug font-extrabold text-nx-navy-900 md:text-[1.35rem]">
                {t(ABOUT.mission.title)}
              </h3>
              <blockquote className="mt-4 rounded-r-2xl border-l-4 border-nx-cyan-500 bg-nx-cyan-50/70 p-5 text-[15px] leading-relaxed font-semibold text-nx-navy-800">
                “{t(ABOUT.mission.statement)}”
              </blockquote>
              <ul className="mt-5 space-y-2.5">
                {ABOUT.mission.points.map((p) => (
                  <li key={p.en} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-nx-cyan-600" aria-hidden="true" />
                    {t(p)}
                  </li>
                ))}
              </ul>
              <div className="mt-auto border-t border-nx-navy-100 pt-5">
                <PillButton onClick={() => navigateTo("about", "mission")} label={t(T.readMission)} />
              </div>
            </motion.article>

            {/* vision — navy card, deliberately different treatment */}
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-nx-navy-950 nx-navy-grid p-6 text-white md:p-8"
            >
              <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-nx-cyan-500/[0.14] blur-3xl" />
              <div className="relative flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-nx-cyan-300">
                  <Telescope className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-cyan-300 uppercase">
                  {t(ABOUT.vision.eyebrow)}
                </p>
              </div>
              <h3 className="relative mt-5 text-xl leading-snug font-extrabold text-white md:text-[1.35rem]">
                {t(ABOUT.vision.title)}
              </h3>
              <blockquote className="relative mt-4 rounded-r-2xl border-l-4 border-nx-cyan-400 bg-white/[0.06] p-5 text-[15px] leading-relaxed font-semibold text-white/90">
                “{t(ABOUT.vision.statement)}”
              </blockquote>
              <ul className="relative mt-5 space-y-2.5">
                {ABOUT.vision.points.map((p) => (
                  <li key={p.en} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/75">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-nx-cyan-400" aria-hidden="true" />
                    {t(p)}
                  </li>
                ))}
              </ul>
              <div className="relative mt-auto border-t border-white/15 pt-5">
                <button
                  onClick={() => navigateTo("about", "vision")}
                  className="inline-flex items-center gap-2 rounded-full border border-nx-cyan-300/40 bg-nx-cyan-500/10 px-5 py-2.5 text-[13px] font-bold text-nx-cyan-300 transition-colors hover:border-nx-cyan-300/70 hover:bg-nx-cyan-500/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-400"
                >
                  {t(T.readVision)}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          </div>
        </section>

        {/* values */}
        <section aria-labelledby="about-values" className="mt-16 md:mt-24">
          <Head id="about-values" eyebrow={ABOUT.values.eyebrow} title={ABOUT.values.title} copy={ABOUT.values.sub} />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ABOUT.values.items.map((v, i) => {
              const Icon = VALUES_ICONS[v.key];
              return (
                <motion.article
                  key={v.key}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="group flex h-full flex-col rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-nx-navy-300 hover:shadow-[0_22px_44px_-18px_rgba(6,31,74,0.28)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-nx-navy-50 text-nx-navy-600">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="nx-num text-sm font-extrabold text-nx-navy-200">
                      {t(clauseNum(i))}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-nx-navy-900">{t(v.title)}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{t(v.copy)}</p>
                  <div className="mt-auto border-t border-nx-navy-100 pt-4">
                    <button
                      onClick={() => navigateTo(v.where)}
                      className="inline-flex items-center gap-1.5 text-[13px] font-bold text-nx-cyan-700 underline-offset-4 transition-colors hover:text-nx-cyan-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
                    >
                      {t(T.whereEnforced)}: {t(WHERE_LABELS[v.where] ?? v.where)}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </button>
                  </div>
                </motion.article>
              );
            })}

            {/* the Charter cross-link card completes the grid */}
            <motion.article
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.3 }}
              className="flex h-full flex-col rounded-3xl bg-nx-navy-950 nx-navy-grid p-6 text-white"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-nx-cyan-300">
                <Quote className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-extrabold text-white">{t(T.charterCardTitle)}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/75">{t(T.charterCardCopy)}</p>
              <div className="mt-auto border-t border-white/15 pt-4">
                <button
                  onClick={() => navigateTo("charter")}
                  className="inline-flex items-center gap-2 rounded-full border border-nx-cyan-300/40 bg-nx-cyan-500/10 px-5 py-2.5 text-[13px] font-bold text-nx-cyan-300 transition-colors hover:border-nx-cyan-300/70 hover:bg-nx-cyan-500/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-400"
                >
                  {t(T.charterCardCta)}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          </div>
        </section>
      </PageBody>

      {/* story — editorial, on a mist band, with the two-paths metaphor */}
      <section aria-labelledby="about-story" className="bg-nx-mist py-14 md:py-20">
        <div className="mx-auto max-w-[1200px] px-5 md:px-6">
          <Head id="about-story" eyebrow={ABOUT.story.eyebrow} title={ABOUT.story.title} />
          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            {/* the two-paths metaphor */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_14px_40px_-20px_rgba(6,31,74,0.2)] md:p-8"
            >
              <svg aria-hidden="true" viewBox="0 0 360 210" className="w-full">
                <path
                  d="M 36 24 C 96 66, 118 128, 180 172"
                  fill="none"
                  stroke="#9DB6DF"
                  strokeWidth="2.5"
                  strokeDasharray="2 9"
                  strokeLinecap="round"
                />
                <path
                  d="M 324 24 C 264 66, 242 128, 180 172"
                  fill="none"
                  stroke="#9DB6DF"
                  strokeWidth="2.5"
                  strokeDasharray="2 9"
                  strokeLinecap="round"
                />
                <circle cx="36" cy="24" r="5" fill="#0A3A8F" />
                <circle cx="324" cy="24" r="5" fill="#0A3A8F" />
                <circle cx="180" cy="172" r="17" fill="rgba(38,183,216,0.18)" />
                <circle cx="180" cy="172" r="8" fill="#26B7D8" />
              </svg>
              <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[13px] font-semibold text-nx-navy-700">
                <Building2 className="h-4 w-4 shrink-0 text-nx-navy-500" aria-hidden="true" />
                {t(T.pathBusinesses)}
                <span className="text-nx-navy-300" aria-hidden="true">
                  ·
                </span>
                <Banknote className="h-4 w-4 shrink-0 text-nx-navy-500" aria-hidden="true" />
                {t(T.pathCapital)}
              </p>
              <p className="mt-1.5 flex items-center justify-center gap-1.5 text-center text-[13px] font-extrabold text-nx-cyan-700">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                {t(T.crossingCaption)}
              </p>
            </motion.div>

            {/* the three paragraphs */}
            <div className="space-y-5">
              {ABOUT.story.paragraphs.map((p, i) => (
                <motion.p
                  key={p.en.slice(0, 24)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 + i * 0.1 }}
                  className={cn(
                    "leading-[1.85] text-slate-700",
                    i === 0 ? "text-[16px] font-semibold text-nx-navy-900 md:text-[17px]" : "text-[15px] md:text-base"
                  )}
                >
                  {t(p)}
                </motion.p>
              ))}
            </div>
          </div>

          {/* cross-link line + button */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="mt-12 flex flex-col gap-4 border-t border-nx-navy-100 pt-8 md:flex-row md:items-center md:justify-between"
          >
            <p className="max-w-xl text-sm leading-relaxed text-slate-600">{t(T.storyCrossLine)}</p>
            <NavyButton onClick={() => navigateTo("who-we-serve")} className="shrink-0">
              {t(T.storyCrossCta)}
            </NavyButton>
          </motion.div>
        </div>
      </section>

      {/* timeline */}
      <PageBody>
        <section aria-labelledby="about-timeline">
          <Head id="about-timeline" eyebrow={ABOUT.timeline.eyebrow} title={ABOUT.timeline.title} />
          <ol className="relative mx-auto mt-12 max-w-3xl">
            <span
              aria-hidden="true"
              className="absolute bottom-8 left-[23px] top-8 w-px bg-gradient-to-b from-nx-navy-200 via-nx-cyan-300 to-nx-navy-200 md:left-[27px]"
            />
            {ABOUT.timeline.items.map((item, i) => (
              <motion.li
                key={item.title.en}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative flex gap-5 pb-6 last:pb-0 md:gap-7"
              >
                <span className="nx-num relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-nx-navy-900 text-sm font-extrabold text-nx-cyan-400 ring-8 ring-white md:h-14 md:w-14 md:text-base">
                  {t(num(i + 1))}
                </span>
                <div className="flex-1 rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)] transition-all duration-300 hover:border-nx-navy-300 hover:shadow-[0_22px_44px_-18px_rgba(6,31,74,0.28)] md:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xl font-extrabold text-nx-navy-900">{t(item.title)}</h3>
                    <span className="text-[12px] font-bold tracking-wide text-nx-navy-400 uppercase">
                      {t(item.when)}
                    </span>
                  </div>
                  <p className="mt-2.5 leading-relaxed text-slate-600">{t(item.copy)}</p>
                  {i === ABOUT.timeline.items.length - 1 && (
                    <button
                      onClick={() => navigateTo("impact")}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-nx-cyan-200 bg-nx-cyan-50/70 px-4 py-2 text-[13px] font-bold text-nx-cyan-700 transition-colors hover:border-nx-cyan-400 hover:bg-nx-cyan-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
                    >
                      <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                      {t(T.todayChip)}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </motion.li>
            ))}
          </ol>
        </section>
      </PageBody>

      {/* team — on a mist band */}
      <section aria-labelledby="about-team" className="bg-nx-mist py-14 md:py-20">
        <div className="mx-auto max-w-[1200px] px-5 md:px-6">
          <Head id="about-team" eyebrow={ABOUT.team.eyebrow} title={ABOUT.team.title} copy={ABOUT.team.sub} />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ABOUT.team.roles.map((role, i) => {
              const Icon = TEAM_ICONS[i];
              return (
                <motion.article
                  key={role.title.en}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="flex h-full flex-col rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-nx-navy-300 hover:shadow-[0_22px_44px_-18px_rgba(6,31,74,0.28)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-nx-navy-950 text-nx-cyan-400">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="nx-num text-sm font-extrabold text-nx-navy-200">{t(num(i + 1))}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-nx-navy-900">{t(role.title)}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{t(role.copy)}</p>
                </motion.article>
              );
            })}

            {/* talk-to-the-team card completes the grid */}
            <motion.article
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.3 }}
              className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-nx-navy-950 nx-navy-grid p-6 text-white"
            >
              <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-nx-cyan-500/[0.13] blur-3xl" />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-nx-cyan-300">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="relative mt-5 text-lg font-extrabold text-white">{t(T.talkTeam)}</h3>
              <p className="relative mt-2.5 text-sm leading-relaxed text-white/75">{t(T.replyChip)}</p>
              <div className="relative mt-auto border-t border-white/15 pt-4">
                <button
                  onClick={() => navigateTo("contact")}
                  className="inline-flex items-center gap-2 rounded-full border border-nx-cyan-300/40 bg-nx-cyan-500/10 px-5 py-2.5 text-[13px] font-bold text-nx-cyan-300 transition-colors hover:border-nx-cyan-300/70 hover:bg-nx-cyan-500/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-400"
                >
                  {t(T.talkTeam)}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          </div>

          {/* footnote strip */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="mt-8 flex flex-col gap-4 rounded-3xl border border-nx-navy-100 bg-white p-5 shadow-[0_12px_30px_-18px_rgba(6,31,74,0.2)] md:flex-row md:items-center md:justify-between md:p-6"
          >
            <p className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
              <Users className="mt-0.5 h-4 w-4 shrink-0 text-nx-navy-400" aria-hidden="true" />
              {t(T.teamNote)}
            </p>
            <button
              onClick={() => navigateTo("about", "team")}
              className="nx-arrow-btn inline-flex shrink-0 items-center gap-2 rounded-full bg-nx-navy-700 px-5 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-nx-navy-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
            >
              {t(T.talkTeam)}
              <span className="nx-arrow">
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* what we are / are not */}
      <PageBody>
        <section aria-labelledby="about-ledger">
          <Head id="about-ledger" eyebrow={T.ledgerEyebrow} title={T.ledgerTitle} copy={T.ledgerCopy} />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl border border-nx-verified/25 bg-nx-verified-bg/50 p-6 md:p-7"
            >
              <h3 className="flex items-center gap-2 text-base font-extrabold text-nx-navy-900">
                <CheckCircle2 className="h-5 w-5 text-nx-verified" aria-hidden="true" />
                {t(ABOUT.whatWeAre.areTitle)}
              </h3>
              <ul className="mt-4 space-y-3">
                {ABOUT.whatWeAre.are.map((a) => (
                  <li key={a.en} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-nx-verified" aria-hidden="true" />
                    {t(a)}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 }}
              className="rounded-3xl border border-rose-200 bg-rose-50/60 p-6 md:p-7"
            >
              <h3 className="flex items-center gap-2 text-base font-extrabold text-nx-navy-900">
                <X className="h-5 w-5 text-nx-danger-700" aria-hidden="true" />
                {t(ABOUT.whatWeAre.areNotTitle)}
              </h3>
              <ul className="mt-4 space-y-3">
                {ABOUT.whatWeAre.areNot.map((a) => (
                  <li key={a.en} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700">
                    <X className="mt-0.5 h-4.5 w-4.5 shrink-0 text-nx-danger-700" aria-hidden="true" />
                    {t(a)}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      </PageBody>

      <CtaBand
        title={T.ctaTitle}
        copy={T.ctaCopy}
        actions={
          <>
            <CyanButton onClick={() => openInvestor("investor")}>{t(T.ctaRegister)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("vetting")}>{t(T.ctaVetting)}</OutlineLightButton>
          </>
        }
      />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Mission detail  (#p/about/mission)
   ══════════════════════════════════════════════════════════════════════ */

function MissionDetail() {
  const { t } = useLanguage();
  const openInvestor = useDialogStore((s) => s.openInvestor);

  return (
    <>
      <DetailHero
        crumbs={[ABOUT_CRUMB, { label: { en: "Mission", bn: "মিশন" } }]}
        eyebrow={ABOUT.mission.eyebrow}
        title={ABOUT.mission.title}
        copy={T.missionHeroCopy}
        image="/images/about-office.png"
        imageAlt={t(T.missionImageAlt)}
        meta={
          <>
            <MetaChip icon={<ShieldCheck className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t({ en: "Five pillars before any listing", bn: "তালিকার আগেই পাঁচ স্তম্ভ" })}
            </MetaChip>
            <MetaChip icon={<Languages className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t({ en: "Bangla & English documents", bn: "বাংলা ও ইংরেজি নথি" })}
            </MetaChip>
            <MetaChip icon={<FileText className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t({ en: "Fees in writing", bn: "ফি লিখিতভাবে" })}
            </MetaChip>
          </>
        }
        actions={
          <>
            <CyanButton onClick={() => navigateTo("vetting")}>{t(T.missionCtaPrimary)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("about", "vision")}>{t(T.missionCtaNext)}</OutlineLightButton>
          </>
        }
      />

      <PageBody className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-12">
            {/* the full statement, as a large quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-3xl border-l-4 border-nx-cyan-500 bg-nx-navy-950 nx-navy-grid p-6 md:p-10"
            >
              <Quote className="absolute right-6 top-6 h-9 w-9 text-nx-cyan-500/25" aria-hidden="true" />
              <p className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-cyan-300 uppercase">
                {t(ABOUT.mission.eyebrow)}
              </p>
              <p className="mt-4 text-lg leading-[1.7] font-bold text-white md:text-[1.3rem] md:leading-[1.75]">
                “{t(ABOUT.mission.statement)}”
              </p>
              <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] font-bold tracking-wide text-nx-cyan-300/90 uppercase">
                {T.missionChips.map((chip) => (
                  <span key={chip.en} className="inline-flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-nx-cyan-400" aria-hidden="true" />
                    {t(chip)}
                  </span>
                ))}
              </p>
            </motion.blockquote>

            {/* the statement unpacked */}
            <section aria-labelledby="ms-unpack">
              <Head id="ms-unpack" eyebrow={T.unpackEyebrow} title={T.unpackTitle} copy={T.unpackCopy} />
              <div className="mt-8 space-y-5">
                {MISSION_CLAUSES.map((clause, i) => (
                  <motion.article
                    key={clause.head.en}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                    className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)] md:p-7"
                  >
                    <div className="flex items-start gap-4">
                      <span className="nx-num flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-nx-navy-900 text-sm font-extrabold text-nx-cyan-400">
                        {t(clauseNum(i))}
                      </span>
                      <div>
                        <h3 className="text-[17px] font-extrabold text-nx-navy-900">{t(clause.head)}</h3>
                        <p className="mt-2.5 leading-relaxed text-slate-600">{t(clause.copy)}</p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>

            {/* where you can see it in the product */}
            <section aria-labelledby="ms-product">
              <Head id="ms-product" eyebrow={T.productEyebrow} title={T.productTitle} copy={T.productCopy} />
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {T.productCards.map((card, i) => {
                  const icons = [ShieldCheck, Languages, FileText];
                  const Icon = icons[i];
                  return (
                    <motion.article
                      key={card.title.en}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.07 }}
                      className="flex h-full flex-col rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)]"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-nx-cyan-50 text-nx-cyan-700">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 text-[16px] font-extrabold text-nx-navy-900">{t(card.title)}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(card.copy)}</p>
                      <div className="mt-auto pt-4">
                        <button
                          onClick={() => navigateTo(card.where)}
                          className="inline-flex items-center gap-1.5 text-[13px] font-bold text-nx-cyan-700 underline-offset-4 transition-colors hover:text-nx-cyan-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
                        >
                          {t(WHERE_LABELS[card.where] ?? card.where)}
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </section>
          </div>

          {/* side column */}
          <AboutAside active="mission">
            <div className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_12px_30px_-18px_rgba(6,31,74,0.2)]">
              <p className="text-base font-extrabold text-nx-navy-900">{t(T.missionAsideTitle)}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(T.missionAsideCopy)}</p>
              <button
                onClick={() => navigateTo("charter")}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-nx-navy-700 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-nx-navy-600"
              >
                <Quote className="h-4 w-4" aria-hidden="true" />
                {t(T.charterCardCta)}
              </button>
            </div>
          </AboutAside>
        </div>
      </PageBody>

      <CtaBand
        title={T.missionCtaTitle}
        copy={T.missionCtaCopy}
        actions={
          <>
            <CyanButton onClick={() => openInvestor("investor")}>{t(T.ctaRegister)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("charter")}>{t(T.charterCardCta)}</OutlineLightButton>
          </>
        }
      />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Vision detail  (#p/about/vision)
   ══════════════════════════════════════════════════════════════════════ */

function VisionDetail() {
  const { t } = useLanguage();

  return (
    <>
      <DetailHero
        crumbs={[ABOUT_CRUMB, { label: { en: "Vision", bn: "ভিশন" } }]}
        eyebrow={ABOUT.vision.eyebrow}
        title={ABOUT.vision.title}
        copy={T.visionHeroCopy}
        image="/images/investor-meeting.png"
        imageAlt={t(T.visionImageAlt)}
        meta={
          <>
            <MetaChip icon={<Eye className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t({ en: "A destination, not a forecast", bn: "গন্তব্য, ভবিষ্যদ্বাণী নয়" })}
            </MetaChip>
            <MetaChip icon={<Target className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t({ en: "The mission's destination", bn: "মিশনের গন্তব্য" })}
            </MetaChip>
          </>
        }
        actions={
          <>
            <CyanButton onClick={() => navigateTo("impact")}>{t(T.visionImpact)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("about", "mission")}>{t(T.visionBackMission)}</OutlineLightButton>
          </>
        }
      />

      <PageBody className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-12">
            {/* the full statement */}
            <motion.blockquote
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-3xl border-l-4 border-nx-cyan-500 bg-nx-navy-950 nx-navy-grid p-6 md:p-10"
            >
              <Telescope className="absolute right-6 top-6 h-9 w-9 text-nx-cyan-500/25" aria-hidden="true" />
              <p className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-cyan-300 uppercase">
                {t(ABOUT.vision.eyebrow)}
              </p>
              <p className="mt-4 text-lg leading-[1.7] font-bold text-white md:text-[1.3rem] md:leading-[1.75]">
                “{t(ABOUT.vision.statement)}”
              </p>
            </motion.blockquote>

            {/* what has to be true */}
            <section aria-labelledby="vs-true">
              <Head id="vs-true" eyebrow={T.trueEyebrow} title={T.trueTitle} copy={T.trueCopy} />
              <div className="mt-8 space-y-5">
                {ABOUT.vision.points.map((point, i) => {
                  const icons = [HandCoins, ShieldCheck, TrendingUp];
                  const Icon = icons[i];
                  const card = T.trueCards[i];
                  return (
                    <motion.article
                      key={point.en}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.07 }}
                      className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)] md:p-7"
                    >
                      <div className="flex items-start gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-nx-navy-950 text-nx-cyan-400">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-[15px] leading-relaxed font-bold text-nx-navy-900">“{t(point)}”</p>
                          <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{t(card.copy)}</p>
                          <button
                            onClick={() => navigateTo(card.where)}
                            className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold text-nx-cyan-700 underline-offset-4 transition-colors hover:text-nx-cyan-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
                          >
                            {t(T.workToday)}: {t(WHERE_LABELS[card.where] ?? card.where)}
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </section>

            {/* the honest part */}
            <section aria-label={t(T.honestTitle)} className="rounded-3xl border border-dashed border-nx-warn/50 bg-nx-warn-bg/60 p-6 md:p-7">
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-nx-navy-900">
                <AlertTriangle className="h-5 w-5 text-nx-warn" aria-hidden="true" />
                {t(T.honestTitle)}
              </h2>
              <p className="mt-3 leading-relaxed text-nx-ink/80">{t(T.honestCopy)}</p>
              <button
                onClick={() => navigateTo("risk")}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-nx-cyan-700 underline-offset-4 transition-colors hover:text-nx-cyan-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
              >
                {t(T.riskCta)}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </section>
          </div>

          {/* side column */}
          <AboutAside active="vision">
            <div className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_12px_30px_-18px_rgba(6,31,74,0.2)]">
              <p className="text-base font-extrabold text-nx-navy-900">{t(T.visionAsideTitle)}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(T.visionAsideCopy)}</p>
              <button
                onClick={() => navigateTo("about", "mission")}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-nx-navy-700 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-nx-navy-600"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {t(T.visionBackMission)}
              </button>
            </div>
          </AboutAside>
        </div>
      </PageBody>

      <CtaBand
        title={T.visionCtaTitle}
        copy={T.visionCtaCopy}
        actions={
          <>
            <CyanButton onClick={() => navigateTo("impact")}>{t(T.visionImpact)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("vetting")}>{t(T.ctaVetting)}</OutlineLightButton>
          </>
        }
      />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Story detail  (#p/about/story)
   ══════════════════════════════════════════════════════════════════════ */

function StoryDetail() {
  const { t } = useLanguage();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <DetailHero
        crumbs={[ABOUT_CRUMB, { label: { en: "Our Story", bn: "আমাদের গল্প" } }]}
        eyebrow={ABOUT.story.eyebrow}
        title={T.storyDetailTitle}
        copy={T.storyHeroCopy}
        image="/images/hero-garments.png"
        imageAlt={t(T.storyImageAlt)}
        meta={
          <>
            <MetaChip icon={<CalendarDays className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              <span className="nx-num">{t(yearSpan())}</span>
            </MetaChip>
            <MetaChip icon={<Milestone className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t({ en: "5 milestones", bn: "৫টি মাইলফলক" })}
            </MetaChip>
          </>
        }
        actions={
          <>
            <CyanButton onClick={() => navigateTo("who-we-serve")}>{t(T.storyCtaPrimary)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("about", "team")}>{t(T.meetTeam)}</OutlineLightButton>
          </>
        }
      />

      <PageBody className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-12">
            {/* the three chapters */}
            <section aria-labelledby="story-chapters">
              <Head id="story-chapters" eyebrow={T.chaptersEyebrow} title={T.chaptersTitle} />
              <div className="mt-8 space-y-6">
                {ABOUT.story.paragraphs.map((p, i) => (
                  <motion.article
                    key={p.en.slice(0, 24)}
                    id={`story-ch-${i + 1}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                    className="scroll-mt-32 rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)] md:p-8"
                  >
                    <div className="flex items-center gap-3">
                      <span className="nx-num flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-nx-navy-900 text-[13px] font-extrabold text-nx-cyan-400">
                        {t(clauseNum(i))}
                      </span>
                      <h3 className="text-lg font-extrabold text-nx-navy-900">{t(STORY_CHAPTER_HEADS[i].head)}</h3>
                    </div>
                    <div className="mt-4 space-y-4 border-l-2 border-nx-navy-100 pl-5">
                      <p className="leading-[1.85] text-slate-700">{t(p)}</p>
                      <p className="leading-[1.85] text-slate-600">{t(STORY_CHAPTER_HEADS[i].extra)}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>

            {/* the timeline, again and fuller */}
            <section aria-labelledby="story-road" className="scroll-mt-32">
              <Head id="story-road" eyebrow={ABOUT.timeline.eyebrow} title={T.storyRoadTitle} />
              <ol className="relative mt-8">
                <span
                  aria-hidden="true"
                  className="absolute bottom-8 left-[21px] top-8 w-px bg-gradient-to-b from-nx-navy-200 via-nx-cyan-300 to-nx-navy-200 md:left-[25px]"
                />
                {ABOUT.timeline.items.map((item, i) => (
                  <motion.li
                    key={item.title.en}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="relative flex gap-5 pb-6 last:pb-0"
                  >
                    <span className="nx-num relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-nx-navy-900 text-sm font-extrabold text-nx-cyan-400 ring-8 ring-white md:h-[52px] md:w-[52px]">
                      {t(num(i + 1))}
                    </span>
                    <div className="flex-1 rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)]">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-lg font-extrabold text-nx-navy-900">{t(item.title)}</h3>
                        <span className="text-[12px] font-bold tracking-wide text-nx-navy-400 uppercase">
                          {t(item.when)}
                        </span>
                      </div>
                      <p className="mt-2 leading-relaxed text-slate-600">{t(item.copy)}</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">{t(TIMELINE_MORE[i])}</p>
                      {i === ABOUT.timeline.items.length - 1 && (
                        <button
                          onClick={() => navigateTo("impact")}
                          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-nx-cyan-200 bg-nx-cyan-50/70 px-4 py-2 text-[13px] font-bold text-nx-cyan-700 transition-colors hover:border-nx-cyan-400 hover:bg-nx-cyan-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
                        >
                          <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                          {t(T.todayChip)}
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ol>
            </section>
          </div>

          {/* side column */}
          <AboutAside active="story">
            {/* a mini table of contents */}
            <nav
              aria-label={t(T.tocLabel)}
              className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_12px_30px_-18px_rgba(6,31,74,0.2)]"
            >
              <p className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-navy-600 uppercase">
                {t(T.tocLabel)}
              </p>
              <ol className="mt-3 space-y-1.5">
                {[
                  { id: "story-ch-1", label: STORY_CHAPTER_HEADS[0].head },
                  { id: "story-ch-2", label: STORY_CHAPTER_HEADS[1].head },
                  { id: "story-ch-3", label: STORY_CHAPTER_HEADS[2].head },
                  { id: "story-road", label: T.storyRoadTitle },
                ].map((entry) => (
                  <li key={entry.id}>
                    <button
                      onClick={() => scrollTo(entry.id)}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-[13px] font-semibold text-nx-navy-700 transition-colors hover:bg-nx-navy-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
                    >
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-nx-cyan-600" aria-hidden="true" />
                      {t(entry.label)}
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          </AboutAside>
        </div>
      </PageBody>

      <CtaBand
        title={T.storyCtaTitle}
        copy={T.storyCtaCopy}
        actions={
          <>
            <CyanButton onClick={() => navigateTo("who-we-serve")}>{t(T.storyCtaPrimary)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("impact")}>{t(T.storyCtaSecondary)}</OutlineLightButton>
          </>
        }
      />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Team detail  (#p/about/team)
   ══════════════════════════════════════════════════════════════════════ */

function TeamDetail() {
  const { t } = useLanguage();
  const openInvestor = useDialogStore((s) => s.openInvestor);

  return (
    <>
      <DetailHero
        crumbs={[ABOUT_CRUMB, { label: { en: "The Team", bn: "টিম" } }]}
        eyebrow={ABOUT.team.eyebrow}
        title={T.teamDetailTitle}
        copy={T.teamHeroCopy}
        image="/images/page-about.png"
        imageAlt={t(T.teamImageAlt)}
        meta={
          <>
            <MetaChip icon={<Users className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t({ en: "5 functions · 1 standard", bn: "৫টি কাজ · ১টি মানদণ্ড" })}
            </MetaChip>
            <MetaChip icon={<MessageCircle className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t(T.replyChip)}
            </MetaChip>
          </>
        }
        actions={
          <>
            <CyanButton onClick={() => navigateTo("contact")}>{t(T.talkTeam)}</CyanButton>
            <OutlineLightButton onClick={() => openInvestor("founder")}>{t(T.teamCtaPrimary)}</OutlineLightButton>
          </>
        }
      />

      <PageBody className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-12">
            {/* the five functions */}
            <section aria-labelledby="tm-roles">
              <Head id="tm-roles" eyebrow={T.rolesEyebrow} title={T.rolesTitle} copy={T.rolesCopy} />
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {ABOUT.team.roles.map((role, i) => {
                  const Icon = TEAM_ICONS[i];
                  return (
                    <motion.article
                      key={role.title.en}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.06 }}
                      className="flex h-full flex-col rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-nx-navy-950 text-nx-cyan-400">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="nx-num text-sm font-extrabold text-nx-navy-200">{t(num(i + 1))}</span>
                      </div>
                      <h3 className="mt-4 text-[17px] font-extrabold text-nx-navy-900">{t(role.title)}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(role.copy)}</p>
                      <div className="mt-4 rounded-2xl bg-nx-mist p-4">
                        <p className="text-[11px] font-extrabold tracking-[0.14em] text-nx-navy-500 uppercase">
                          {t(T.ownsLabel)}
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {TEAM_OWNS[i].map((own) => (
                            <li key={own.en} className="flex items-start gap-2 text-[13px] leading-relaxed text-nx-ink/85">
                              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-nx-cyan-600" aria-hidden="true" />
                              {t(own)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </section>

            {/* honest note about names */}
            <section
              aria-label={t(T.honestNoteTitle)}
              className="rounded-3xl border border-dashed border-nx-warn/50 bg-nx-warn-bg/60 p-6 md:p-7"
            >
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-nx-navy-900">
                <Lock className="h-5 w-5 text-nx-warn" aria-hidden="true" />
                {t(T.honestNoteTitle)}
              </h2>
              <p className="mt-3 leading-relaxed text-nx-ink/80">{t(T.honestNote)}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => navigateTo("contact")}
                  className="inline-flex items-center gap-2 rounded-full bg-nx-navy-700 px-5 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-nx-navy-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {t(T.talkTeam)}
                </button>
                <button
                  onClick={() => navigateTo("privacy")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-nx-navy-200 bg-white px-5 py-2.5 text-[13px] font-bold text-nx-navy-800 transition-colors hover:border-nx-navy-400"
                >
                  {t(WHERE_LABELS.privacy)}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </section>
          </div>

          {/* side column */}
          <AboutAside active="team">
            <div className="rounded-3xl bg-nx-navy-950 nx-navy-grid p-6 text-white">
              <p className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-cyan-300 uppercase">
                {t(T.talkTeam)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/80">{t(T.replyChip)}</p>
              <button
                onClick={() => navigateTo("contact")}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-nx-cyan-500 px-5 py-3 text-sm font-bold text-nx-navy-900 transition-colors hover:bg-nx-cyan-400"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {t({ en: "Book a conversation", bn: "আলাপ বুক করুন" })}
              </button>
            </div>
          </AboutAside>
        </div>
      </PageBody>

      <CtaBand
        title={T.teamCtaTitle}
        copy={T.teamCtaCopy}
        actions={
          <>
            <CyanButton onClick={() => openInvestor("founder")}>{t(T.teamCtaPrimary)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("contact")}>{t(T.talkTeam)}</OutlineLightButton>
          </>
        }
      />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Shared bits
   ══════════════════════════════════════════════════════════════════════ */

/** Sticky detail aside: page-local context card (children) + the rail of
 *  the four about pages + a back-to-about button. */
function AboutAside({ active, children }: { active: string; children?: ReactNode }) {
  const { t } = useLanguage();
  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      {children}
      <nav
        aria-label={t(T.railLabel)}
        className="rounded-3xl border border-nx-navy-100 bg-white p-5 shadow-[0_12px_30px_-18px_rgba(6,31,74,0.2)]"
      >
        <p className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-navy-600 uppercase">
          {t(T.railHeading)}
        </p>
        <ol className="mt-3 space-y-1.5">
          {DETAILS.map((d) => {
            const isActive = d.slug === active;
            const Icon = d.icon;
            return (
              <li key={d.slug}>
                <button
                  onClick={() => navigateTo("about", d.slug)}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive
                      ? "flex w-full items-center gap-2.5 rounded-xl bg-nx-navy-700 px-3.5 py-2.5 text-left text-[13px] font-bold text-white"
                      : "flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-[13px] font-semibold text-nx-navy-700 transition-colors hover:bg-nx-navy-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
                  }
                >
                  <span
                    className={
                      isActive
                        ? "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-nx-cyan-500 text-nx-navy-900"
                        : "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-nx-mist text-nx-navy-600"
                    }
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {t(d.label)}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
      <button
        onClick={() => navigateTo("about")}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-nx-navy-200 bg-white px-5 py-3 text-sm font-bold text-nx-navy-800 transition-colors hover:border-nx-navy-400"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t(T.backAbout)}
      </button>
    </aside>
  );
}

/** Small cyan outline pill used for the mission/vision card links. */
function PillButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-nx-cyan-200 bg-nx-cyan-50/70 px-5 py-2.5 text-[13px] font-bold text-nx-cyan-700 transition-colors hover:border-nx-cyan-400 hover:bg-nx-cyan-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
    >
      {label}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </button>
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

/* ── tiny numbered-string helpers (Bangla digits in BN) ─────────────────── */

function num(n: number): L {
  return { en: String(n), bn: bnNum(n) };
}

function clauseNum(i: number): L {
  const padded = `0${i + 1}`;
  return { en: padded, bn: bnNum(padded) };
}

function yearSpan(): L {
  return { en: "2024 → today", bn: `${bnNum(2024)} → আজ` };
}
