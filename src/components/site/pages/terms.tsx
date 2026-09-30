"use client";

/**
 * R10 Terms of Use page — text-forward legal page (no hero oval).
 * Expands the canonical footer terms text ("NexFund is a financial
 * consultancy…") into full bilingual sections, ending in a CtaBand → Risk.
 */

import {
  Ban,
  CircleCheck,
  FileSearch,
  Landmark,
  Scale,
  ScrollText,
  ShieldCheck,
  X,
} from "lucide-react";
import { useLanguage, type L } from "@/lib/i18n";
import { bnNum } from "@/lib/format";
import { navigateTo } from "@/lib/page-router";
import { Reveal } from "../reveal";
import {
  PageHero,
  PageBody,
  CtaBand,
  CyanButton,
  OutlineLightButton,
  SectionHead,
} from "./shell";

const UPDATED: L = { bn: `সেপ্টেম্বর ${bnNum(2026)}`, en: "September 2026" };

const T = {
  heroCopy: {
    en: "The ground rules for using NexFund — written to be read, not skimmed past.",
    bn: "নেক্সফান্ড ব্যবহারের মূল নিয়ম — এড়িয়ে নয়, পড়ে ফেলার জন্যই লেখা।",
  } as L,
  badge: {
    en: "Consultancy & matchmaking — we never hold your money",
    bn: "পরামর্শ ও ম্যাচমেকিং — আপনার অর্থ আমাদের হাতে থাকে না",
  } as L,
  shortTitle: { en: "The short version", bn: "সংক্ষেপে" } as L,
  shortBody: {
    en: "NexFund is a financial consultancy and matchmaking platform — not a bank, fund manager, or investment advisor. We do not hold client money. All investment decisions are yours; please read every opportunity's risk summary before acting.",
    bn: "নেক্সফান্ড একটি ফাইন্যান্সিয়াল কনসাল্টেন্সি ও ম্যাচমেকিং প্ল্যাটফর্ম — ব্যাংক, ফান্ড ম্যানেজার বা ইনভেস্টমেন্ট অ্যাডভাইজার নয়। আমরা গ্রাহকের অর্থ গচ্ছিত রাখি না। সব বিনিয়োগ সিদ্ধান্ত আপনার; এগোনোর আগে প্রতিটি সুযোগের ঝুঁকি-সারসংক্ষেপ পড়ুন।",
  } as L,
  updated: { en: "Last updated", bn: "সর্বশেষ হালনাগাদ" } as L,

  /* Section 1 — who we are */
  s1: {
    eyebrow: { en: "THE PLAIN TRUTH", bn: "সোজা কথা" } as L,
    title: { en: "Who we are (and are not)", bn: "আমরা কারা (এবং কারা নই)" } as L,
    copy: {
      en: "What NexFund is — and, just as importantly, what it is not — decides what you can expect from us.",
      bn: "নেক্সফান্ড কী — এবং সমান গুরুত্বে, কী নয় — সেটাই ঠিক করে আপনি আমাদের কাছ থেকে কী আশা করতে পারেন।",
    } as L,
    weAreTitle: { en: "We are", bn: "আমরা যা" } as L,
    weAre: [
      {
        en: "A verification-led financial consultancy",
        bn: "যাচাই-নির্ভর ফাইন্যান্সিয়াল কনসাল্টেন্সি",
      } as L,
      { en: "Matchmakers between investors and verified businesses", bn: "বিনিয়োগকারী ও যাচাইকৃত ব্যবসার মধ্যে ম্যাচমেকার" } as L,
      {
        en: "Advisors on structure, readiness and honest numbers",
        bn: "গঠন, প্রস্তুতি ও সৎ হিসাবের পরামর্শদাতা",
      } as L,
    ],
    weAreNotTitle: { en: "We are not", bn: "আমরা যা নই" } as L,
    weAreNot: [
      { en: "A bank or deposit-taker", bn: "ব্যাংক বা আমানত গ্রহীতা" } as L,
      { en: "A fund or portfolio manager", bn: "ফান্ড বা পোর্টফোলিও ম্যানেজার" } as L,
      { en: "A licensed investment advisor making personal buy/sell calls", bn: "ব্যক্তিগত কেনা/বেচার নির্দেশ দেওয়া লাইসেন্সধারী ইনভেস্টমেন্ট অ্যাডভাইজার" } as L,
      { en: "A custodian of your money — we never hold it", bn: "আপনার অর্থের কাস্টোডিয়ান — কখনো রাখি না" } as L,
    ],
  },

  /* Section 2 — what the platform does */
  s2: {
    eyebrow: { en: "WHAT WE DO", bn: "যা করি" } as L,
    title: { en: "What our platform does", bn: "আমাদের প্ল্যাটফর্ম যা করে" } as L,
    copy: {
      en: "The whole service in one line: verify first, match second, introduce only with consent.",
      bn: "পুরো সেবা এক লাইনে: আগে যাচাই, পরে ম্যাচ, আর পরিচয় করাই কেবল সম্মতি নিয়ে।",
    } as L,
    rows: [
      {
        title: { en: "Verifies before listing", bn: "তালিকার আগে যাচাই" } as L,
        desc: {
          en: "Every business passes the five-pillar vetting standard — documents, financials, site, founders, fit — before its listing goes live.",
          bn: "প্রতিটি ব্যবসা পাঁচ-স্তম্ভের যাচাই পাস করে — নথি, আর্থিক হিসাব, সাইট, প্রতিষ্ঠাতা, উপযুক্ততা — তবেই তালিকায় ওঠে।",
        } as L,
      },
      {
        title: { en: "Publishes fact-packs", bn: "ফ্যাক্ট-প্যাক প্রকাশ" } as L,
        desc: {
          en: "Verified numbers, written risks and use-of-funds — the same data for every reader, no selective disclosure.",
          bn: "যাচাইকৃত সংখ্যা, লিখিত ঝুঁকি ও তহবিলের ব্যবহার — সবার জন্য একই তথ্য, বাছাই করে লুকানো নয়।",
        } as L,
      },
      {
        title: { en: "Matches registered investors", bn: "নিবন্ধিত বিনিয়োগকারীদের ম্যাচ" } as L,
        desc: {
          en: "Opportunities reach the investors whose stated sectors, ticket size and horizon fit — nothing more, nothing forced.",
          bn: "সুযোগ পৌঁছায় সেই বিনিয়োগকারীদের কাছে, যাঁদের খাত, টিকেট সাইজ ও সময়সীমা মানানসই — কমও নয়, জোরও নয়।",
        } as L,
      },
      {
        title: { en: "Advises and introduces", bn: "পরামর্শ ও পরিচয়" } as L,
        desc: {
          en: "Advisor consultations on request, and — only with both sides' consent — anonymized introductions that grow into direct conversations.",
          bn: "অনুরোধে অ্যাডভাইজর পরামর্শ, আর — দুই পক্ষের সম্মতিতে — বেনামী পরিচয়, যা ধীরে ধীরে সরাসরি আলাপে পরিণত হয়।",
        } as L,
      },
      {
        title: { en: "Keeps the data room", bn: "ডেটা রুম রাখি" } as L,
        desc: {
          en: "Once both sides move forward, verified documents live in a controlled data room — logged, and never public.",
          bn: "দুই পক্ষ এগোলে যাচাইকৃত নথি থাকে নিয়ন্ত্রিত ডেটা রুমে — লগসহ, আর কখনো প্রকাশ্য নয়।",
        } as L,
      },
    ],
  },

  /* Section 3 — what it does not */
  s3: {
    eyebrow: { en: "WHAT WE DON'T DO", bn: "যা করি না" } as L,
    title: { en: "What it does not do", bn: "প্ল্যাটফর্ম যা করে না" } as L,
    copy: {
      en: "Knowing the edges of a service is how you trust the middle. Here are ours.",
      bn: "সেবার সীমা জানলে বুঝ বাড়ে, তবেই ভরসা হয়। নিচে আমাদের সীমাগুলো।",
    } as L,
    rows: [
      {
        title: { en: "No personal investment recommendations", bn: "ব্যক্তিগত বিনিয়োগ পরামর্শ নয়" } as L,
        desc: {
          en: "“Matched” means it fits your stated profile — never “buy this”. The decision, and the signature, stay yours.",
          bn: "“ম্যাচড” মানে আপনার বলা প্রোফাইলের সাথে মানানসই — কখনোই “এটা কিনুন” নয়। সিদ্ধান্ত আর সই দুটোই আপনার।",
        } as L,
      },
      {
        title: { en: "No guarantees", bn: "কোনো নিশ্চয়তা নেই" } as L,
        desc: {
          en: "Not of returns, not of fundraising success, not of any listing's future. Honest probability, not promises.",
          bn: "রিটার্নের নয়, ফান্ডরেইজিং সাফল্যের নয়, কোনো তালিকার ভবিষ্যতেরও নয়। সৎ সম্ভাবনা, প্রতিশ্রুতি নয়।",
        } as L,
      },
      {
        title: { en: "No custody of funds", bn: "অর্থ গচ্ছিত রাখি না" } as L,
        desc: {
          en: "Money moves directly between you and the business — through your own bank, with your own legal counsel watching.",
          bn: "অর্থ চলাচল হয় আপনি ও ব্যবসার মধ্যে সরাসরি — আপনার ব্যাংক দিয়ে, আপনার আইনজীবীর নজরে।",
        } as L,
      },
      {
        title: { en: "No deal execution by default", bn: "ডিফল্টভাবে ডিল এক্সিকিউট নয়" } as L,
        desc: {
          en: "We don't sign, negotiate or close on your behalf unless you separately engage us in writing.",
          bn: "লিখিতভাবে আলাদাভাবে নিয়োগ না দিলে আপনার হয়ে সই, সমঝোতা বা ডিল সমাপ্তি করি না।",
        } as L,
      },
    ],
  },

  /* Section 4 — your responsibilities */
  s4: {
    eyebrow: { en: "YOUR SIDE", bn: "আপনার দিক" } as L,
    title: { en: "Your responsibilities", bn: "আপনার দায়িত্ব" } as L,
    copy: {
      en: "A fair platform asks fair things. Using NexFund well means doing these five.",
      bn: "ন্যায্য প্ল্যাটফর্ম ন্যায্য কাজ চায়। নেক্সফান্ড ঠিকভাবে ব্যবহার করতে হলে নিচের পাঁচটি করতেই হবে।",
    } as L,
    rows: [
      {
        title: { en: "Read before you act", bn: "এগোনোর আগে পড়ুন" } as L,
        desc: {
          en: "Every listing's fact-pack and risk summary exists to be read — start there, every time.",
          bn: "প্রতিটি তালিকার ফ্যাক্ট-প্যাক ও ঝুঁকি-সারসংক্ষেপ পড়ার জন্যই আছে — প্রতিবার শুরু সেখান থেকেই।",
        } as L,
      },
      {
        title: { en: "Do your own due diligence", bn: "নিজের যাচাই করুন" } as L,
        desc: {
          en: "Our verification reduces your homework; it doesn't replace it. Visit, ask, and check what matters to you.",
          bn: "আমাদের যাচাই আপনার কাজ কমায়; বদলে দেয় না। ঘুরে দেখুন, প্রশ্ন করুন, যা আপনার কাছে গুরুত্বপূর্ণ তা মিলিয়ে নিন।",
        } as L,
      },
      {
        title: { en: "Risk only what you can lose", bn: "যতটুকু হারানো সম্ভব, ততটুকুই" } as L,
        desc: {
          en: "Invest only money whose loss would not change your life today.",
          bn: "যে অর্থ হারালে আজকের জীবন বদলে যাবে না, কেবল সেটুকুই বিনিয়োগ করুন।",
        } as L,
      },
      {
        title: { en: "Be honest with us", bn: "আমাদের সাথে সৎ থাকুন" } as L,
        desc: {
          en: "Accurate KYC information is what keeps matching safe for everyone on the platform.",
          bn: "সঠিক কেওয়াইসি তথ্যই প্ল্যাটফর্মের সবার জন্য ম্যাচিং নিরাপদ রাখে।",
        } as L,
      },
      {
        title: { en: "Bring your own advisors", bn: "নিজের পরামর্শক আনুন" } as L,
        desc: {
          en: "Before signing anything, get your own legal and tax advice — ours covers matching, not your contracts.",
          bn: "সই করার আগে নিজের আইনি ও কর পরামর্শ নিন — আমাদের পরামর্শ ম্যাচিং পর্যন্ত, আপনার চুক্তি পর্যন্ত নয়।",
        } as L,
      },
    ],
  },

  /* Section 5 — IP & content */
  s5: {
    eyebrow: { en: "CONTENT & OWNERSHIP", bn: "কনটেন্ট ও মালিকানা" } as L,
    title: { en: "Intellectual property & content", bn: "মেধাসম্পত্তি ও কনটেন্ট" } as L,
    copy: {
      en: "Who owns what — so nobody guesses.",
      bn: "কার কী — যাতে কারও অনুমান করতে না হয়।",
    } as L,
    rows: [
      {
        title: { en: "The NexFund brand and site", bn: "নেক্সফান্ড ব্র্যান্ড ও সাইট" } as L,
        desc: {
          en: "Our name, logo and site content belong to NexFund — use them to evaluate us, not to rebrand yours.",
          bn: "আমাদের নাম, লোগো ও সাইটের কনটেন্ট নেক্সফান্ডের — আমাদের যাচাইয়ে ব্যবহার করুন, নিজের সাইট সাজাতে নয়।",
        } as L,
      },
      {
        title: { en: "Fact-packs: licensed, not owned", bn: "ফ্যাক্ট-প্যাক: লাইসেন্স, মালিকানা নয়" } as L,
        desc: {
          en: "Fact-pack data is licensed to you for personal evaluation only — no scraping, resale or republication.",
          bn: "ফ্যাক্ট-প্যাকের তথ্য কেবল ব্যক্তিগত মূল্যায়নের লাইসেন্স — স্ক্র্যাপিং, পুনঃবিক্রয় বা পুনঃপ্রকাশ নয়।",
        } as L,
      },
      {
        title: { en: "Your documents stay yours", bn: "আপনার নথি আপনারই" } as L,
        desc: {
          en: "Entrepreneurs grant us only the license needed to verify — ownership never moves.",
          bn: "উদ্যোক্তারা কেবল যাচাইয়ের যতটুকু লাইসেন্স দেন — মালিকানা কখনো বদলায় না।",
        } as L,
      },
      {
        title: { en: "Others' marks stay theirs", bn: "অন্যের মার্ক তাদেরই" } as L,
        desc: {
          en: "Third-party names and trademarks belong to their owners; we claim none of them.",
          bn: "তৃতীয় পক্ষের নাম ও ট্রেডমার্ক তাদের মালিকানাধীন; আমরা কোনোটির দাবি রাখি না।",
        } as L,
      },
      {
        title: { en: "Demo listings are marked", bn: "নমুনা তালিকা চিহ্নিত" } as L,
        desc: {
          en: "Illustrative listings are labeled as such — never dressed up as live deals.",
          bn: "উদাহরণ তালিকাগুলো সেভাবেই চিহ্নিত — কখনো সচল ডিল সাজিয়ে দেখানো হয় না।",
        } as L,
      },
    ],
  },

  /* Section 6 — governing approach */
  s6: {
    eyebrow: { en: "HOW THIS PAGE WORKS", bn: "এই পাতা যেভাবে কাজ করে" } as L,
    title: { en: "Governing approach", bn: "প্রযোজ্য নীতি" } as L,
    copy: {
      en: "The unglamorous but important part: which words rule, whose laws apply, and what happens when terms change.",
      bn: "অনুল্লেখ্য কিন্তু জরুরি অংশ: কোন ভাষা প্রধান, কোন আইন প্রযোজ্য, আর শর্ত বদলালে কী হয়।",
    } as L,
    rows: [
      {
        title: { en: "Two languages, one intent", bn: "দুই ভাষা, এক অর্থ" } as L,
        desc: {
          en: "The Bangla and English versions of this page carry the same intent; where wording differs, the Bangla version is authoritative.",
          bn: "এই পাতার বাংলা ও ইংরেজি সংস্করণ একই অর্থ বহন করে; শব্দে পার্থক্য দেখা দিলে বাংলা সংস্করণ প্রাধান্য পাবে।",
        } as L,
      },
      {
        title: { en: "Law and venue", bn: "আইন ও এখ্তিয়ার" } as L,
        desc: {
          en: "These terms are governed by the laws of Bangladesh; disputes belong with the courts of Dhaka.",
          bn: "এই শর্তাবলি বাংলাদেশের আইনে পরিচালিত; বিরোধ ঢাকার আদালতের এখ্তিয়ারে।",
        } as L,
      },
      {
        title: { en: "Changes are announced here", bn: "পরিবর্তনের খবর এখানেই" } as L,
        desc: {
          en: "If we change the terms, the “last updated” date moves and the change is summarized — continued use means you accept them.",
          bn: "শর্ত বদলালে “সর্বশেষ হালনাগাদ” তারিখ বদলায় ও পরিবর্তনের সারাংশ এখানে থাকে — ব্যবহার চালিয়ে যাওয়া মানেই তা গ্রহণ।",
        } as L,
      },
      {
        title: { en: "One bad clause saves the rest", bn: "একটি শর্ত গেলে বাকি সব বাঁচে" } as L,
        desc: {
          en: "If a term turns out unenforceable, only that term falls — the rest of the page stands.",
          bn: "কোনো শর্ত অপ্রযোজ্য হলে কেবল সেটিই বাতিল হয় — বাকি পাতা বহাল থাকে।",
        } as L,
      },
    ],
  },

  ctaTitle: { en: "One more page before you invest", bn: "বিনিয়োগের আগে আরেকটি পাতা" } as L,
  ctaCopy: {
    en: "Risk is real — ours is the honest kind. Read the full risk disclosure before any decision.",
    bn: "ঝুঁকি বাস্তব — আমাদেরটা সৎ ধরনের। যেকোনো সিদ্ধান্তের আগে সম্পূর্ণ ঝুঁকি বিবরণীটি পড়ুন।",
  } as L,
  ctaRisk: { en: "Read the risk disclosure", bn: "ঝুঁকি বিবরণী পড়ুন" } as L,
  ctaPrivacy: { en: "Privacy promise", bn: "গোপনীয়তার প্রতিশ্রুতি" } as L,
};

export default function TermsPage() {
  const { t, lang } = useLanguage();

  return (
    <>
      <PageHero
        crumbs={[{ label: { en: "Terms of Use", bn: "ব্যবহারের শর্তাবলি" } }]}
        eyebrow={{ en: "TERMS", bn: "শর্তাবলি" }}
        title={{ en: "Terms of Use", bn: "ব্যবহারের শর্তাবলি" }}
        copy={T.heroCopy}
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-nx-cyan-300/40 bg-nx-cyan-500/10 px-3.5 py-1.5 text-[12px] font-bold text-nx-cyan-300">
            <Scale className="h-3.5 w-3.5" aria-hidden="true" />
            {t(T.badge)}
          </span>
        }
      />

      <PageBody className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          {/* The short version — canonical terms, verbatim */}
          <Reveal y={16}>
            <div className="rounded-3xl bg-nx-navy-950 nx-navy-grid p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-cyan-300 uppercase">
                  {t(T.shortTitle)}
                </h2>
                <span className="nx-num inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[12px] font-semibold text-white/70">
                  <ScrollText className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />
                  {t(T.updated)}: {t(UPDATED)}
                </span>
              </div>
              <p className="mt-4 leading-relaxed text-white/85">{t(T.shortBody)}</p>
            </div>
          </Reveal>

          {/* S1 — Who we are */}
          <Reveal y={16} className="mt-12">
            <SectionHead eyebrow={T.s1.eyebrow} title={T.s1.title} copy={T.s1.copy} />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_14px_40px_-22px_rgba(6,31,74,0.2)]">
                <h3 className="flex items-center gap-2 text-[15px] font-extrabold text-nx-navy-900">
                  <CircleCheck className="h-5 w-5 text-nx-verified" aria-hidden="true" />
                  {t(T.s1.weAreTitle)}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {T.s1.weAre.map((r) => (
                    <li key={r.en} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nx-verified" aria-hidden="true" />
                      {t(r)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_14px_40px_-22px_rgba(6,31,74,0.2)]">
                <h3 className="flex items-center gap-2 text-[15px] font-extrabold text-nx-navy-900">
                  <Ban className="h-5 w-5 text-nx-danger-700" aria-hidden="true" />
                  {t(T.s1.weAreNotTitle)}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {T.s1.weAreNot.map((r) => (
                    <li key={r.en} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nx-danger-700" aria-hidden="true" />
                      {t(r)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* S2 — What the platform does */}
          <Reveal y={16} className="mt-12">
            <SectionHead eyebrow={T.s2.eyebrow} title={T.s2.title} copy={T.s2.copy} />
            <ul className="mt-6 space-y-3">
              {T.s2.rows.map((r) => (
                <li
                  key={r.title.en}
                  className="flex gap-3.5 rounded-3xl border border-nx-navy-100 bg-white p-5 shadow-[0_14px_40px_-22px_rgba(6,31,74,0.2)] md:p-6"
                >
                  <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-nx-verified" aria-hidden="true" />
                  <div>
                    <h3 className="text-[15px] font-extrabold text-nx-navy-900">{t(r.title)}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{t(r.desc)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* S3 — What it does not do */}
          <Reveal y={16} className="mt-12">
            <SectionHead eyebrow={T.s3.eyebrow} title={T.s3.title} copy={T.s3.copy} />
            <ul className="mt-6 space-y-3">
              {T.s3.rows.map((r) => (
                <li
                  key={r.title.en}
                  className="flex gap-3.5 rounded-3xl border border-nx-navy-100 bg-white p-5 shadow-[0_14px_40px_-22px_rgba(6,31,74,0.2)] md:p-6"
                >
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-nx-danger-700" aria-hidden="true" />
                  <div>
                    <h3 className="text-[15px] font-extrabold text-nx-navy-900">{t(r.title)}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{t(r.desc)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* S4 — Your responsibilities */}
          <Reveal y={16} className="mt-12">
            <SectionHead eyebrow={T.s4.eyebrow} title={T.s4.title} copy={T.s4.copy} />
            <ul className="mt-6 space-y-3">
              {T.s4.rows.map((r, i) => (
                <li
                  key={r.title.en}
                  className="flex gap-4 rounded-3xl border border-nx-navy-100 bg-white p-5 shadow-[0_14px_40px_-22px_rgba(6,31,74,0.2)] md:p-6"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-nx-navy-50 text-nx-navy-600">
                    <FileSearch className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="nx-num text-[15px] font-extrabold text-nx-navy-900">
                      {lang === "bn" ? `${bnNum(i + 1)}.` : `${i + 1}.`} {t(r.title)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{t(r.desc)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* S5 — IP & content */}
          <Reveal y={16} className="mt-12">
            <SectionHead eyebrow={T.s5.eyebrow} title={T.s5.title} copy={T.s5.copy} />
            <ul className="mt-6 space-y-3">
              {T.s5.rows.map((r) => (
                <li
                  key={r.title.en}
                  className="rounded-3xl border border-nx-navy-100 bg-white p-5 shadow-[0_14px_40px_-22px_rgba(6,31,74,0.2)] md:p-6"
                >
                  <h3 className="text-[15px] font-extrabold text-nx-navy-900">{t(r.title)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{t(r.desc)}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* S6 — Governing approach */}
          <Reveal y={16} className="mt-12">
            <SectionHead eyebrow={T.s6.eyebrow} title={T.s6.title} copy={T.s6.copy} />
            <ul className="mt-6 space-y-3">
              {T.s6.rows.map((r) => (
                <li
                  key={r.title.en}
                  className="flex gap-3.5 rounded-3xl border border-nx-navy-100 bg-white p-5 shadow-[0_14px_40px_-22px_rgba(6,31,74,0.2)] md:p-6"
                >
                  <Landmark className="mt-0.5 h-5 w-5 shrink-0 text-nx-navy-400" aria-hidden="true" />
                  <div>
                    <h3 className="text-[15px] font-extrabold text-nx-navy-900">{t(r.title)}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{t(r.desc)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </PageBody>

      <CtaBand
        title={T.ctaTitle}
        copy={T.ctaCopy}
        actions={
          <>
            <CyanButton onClick={() => navigateTo("risk")}>
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              {t(T.ctaRisk)}
            </CyanButton>
            <OutlineLightButton onClick={() => navigateTo("privacy")}>
              {t(T.ctaPrivacy)}
            </OutlineLightButton>
          </>
        }
      />
    </>
  );
}
