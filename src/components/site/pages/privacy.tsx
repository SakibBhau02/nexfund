"use client";

/**
 * R10 Privacy Promise page — text-forward legal page (no hero oval).
 * Expands the canonical footer privacy text ("We collect only what we
 * need…") into full bilingual sections, ending in a CtaBand → Contact.
 */

import {
  CircleCheck,
  Eye,
  FileLock2,
  Lock,
  Mail,
  ShieldCheck,
  UserRound,
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
    en: "Plain language, not fine print: what we collect, why we collect it, how it stays protected, and the control you keep at every step.",
    bn: "জটিল আইনি ভাষা নয়, সহজ বাংলায়: আমরা কী নিই, কেন নিই, কীভাবে তা সুরক্ষিত থাকে, আর প্রতিটি ধাপে আপনার হাতে কতটা নিয়ন্ত্রণ।",
  } as L,
  badge: {
    en: "Your data is never for sale — promised",
    bn: "আপনার তথ্য কখনো বিক্রি হয় না — প্রতিশ্রুতি",
  } as L,
  shortTitle: { en: "The short version", bn: "সংক্ষেপে" } as L,
  shortBody: {
    en: "We collect only what we need to match investors with businesses. Your information is encrypted, shared only with your consent, and never sold. You may request deletion of your data at any time by writing to privacy@nexfund.example.",
    bn: "আমরা কেবল যতটুকু তথ্য ম্যাচিংয়ের জন্য দরকার তা-ই নিই। আপনার তথ্য এনক্রিপ্টেড থাকে, কেবল আপনার সম্মতিতে শেয়ার হয়, কখনো বিক্রি হয় না। যেকোনো সময় privacy@nexfund.example-এ লিখে আপনার তথ্য মুছে ফেলার অনুরোধ করতে পারেন।",
  } as L,
  updated: { en: "Last updated", bn: "সর্বশেষ হালনাগাদ" } as L,

  /* Section 1 — what we collect */
  s1: {
    eyebrow: { en: "DATA WE TAKE", bn: "যা আমরা নিই" } as L,
    title: { en: "What we collect — and why", bn: "যা সংগ্রহ করি — এবং কেন" } as L,
    copy: {
      en: "Every field we ask for has one of two jobs: match you better, or keep the platform honest. If a piece of data can't do either, we don't ask for it.",
      bn: "আমরা যা জিজ্ঞেস করি, তার প্রতিটি ঘরের দুটি কাজের একটি আছে: আপনার সাথে আরও ভালো ম্যাচ, নয়তো প্ল্যাটফর্মকে সৎ রাখা। দুটোর কোনোটাই না করলে আমরা সেই তথ্য চাই না।",
    } as L,
    rows: [
      {
        title: { en: "Contact details", bn: "যোগাযোগের তথ্য" } as L,
        desc: {
          en: "Name, email and mobile — used to reply to you and route you to the right advisor.",
          bn: "নাম, ইমেইল ও মোবাইল — উত্তর দিতে এবং সঠিক অ্যাডভাইজরের কাছে পৌঁছে দিতে।",
        } as L,
      },
      {
        title: { en: "Investor profile answers", bn: "বিনিয়োগকারীর প্রোফাইল উত্তর" } as L,
        desc: {
          en: "Sectors, ticket range, time horizon and risk comfort — used only for matching, never for advertising.",
          bn: "আগ্রহের খাত, টিকেট সাইজ, সময়সীমা ও ঝুঁকির স্বাচ্ছন্দ্য — কেবল ম্যাচিংয়ে ব্যবহৃত, বিজ্ঞাপনে কখনোই না।",
        } as L,
      },
      {
        title: { en: "Business verification documents", bn: "ব্যবসা যাচাইয়ের নথি" } as L,
        desc: {
          en: "Entrepreneurs share records with us for vetting — kept in a restricted data room, never inside public listings.",
          bn: "উদ্যোক্তারা যাচাইয়ের জন্য নথি দেন — সেগুলো থাকে সীমিত-প্রবেশাধিকারের ডেটা রুমে, প্রকাশ্য তালিকায় কখনো নয়।",
        } as L,
      },
      {
        title: { en: "Basic usage signals", bn: "সাধারণ ব্যবহারের তথ্য" } as L,
        desc: {
          en: "Which pages you open and your language preference — so we can make the useful parts easier to find.",
          bn: "কোন পাতাগুলো দেখেন ও ভাষার পছন্দ — যাতে দরকারি জায়গাগুলো সহজে খুঁজে পাওয়া যায়।",
        } as L,
      },
    ],
    neverAsk: {
      en: "What we never ask for: bank passwords, PINs or one-time codes (OTP). Anyone asking for those in our name is not us.",
      bn: "যা আমরা কখনো চাই না: ব্যাংকের পাসওয়ার্ড, পিন বা ওয়ান-টাইম কোড (ওটিপি)। আমাদের নাম করে এসব চাইলে বুঝবেন — ওটা আমরা নই।",
    } as L,
  },

  /* Section 2 — protection */
  s2: {
    eyebrow: { en: "PROTECTION", bn: "সুরক্ষা" } as L,
    title: { en: "How your information is protected", bn: "আপনার তথ্য কীভাবে সুরক্ষিত থাকে" } as L,
    copy: {
      en: "Security here is a habit, not a feature we bolted on at the end.",
      bn: "সুরক্ষা আমাদের কাছে অভ্যাস — শেষে জোড়া দেওয়া কোনো বাড়তি ফিচার নয়।",
    } as L,
    rows: [
      {
        title: { en: "Encrypted in transit and at rest", bn: "চলাচলে ও সংরক্ষণে এনক্রিপ্টেড" } as L,
        desc: {
          en: "Every connection travels over HTTPS/TLS, and stored records are encrypted on our systems.",
          bn: "প্রতিটি সংযোগ চলে HTTPS/TLS-এ, আর সংরক্ষিত তথ্য আমাদের সিস্টেমে এনক্রিপ্টেড থাকে।",
        } as L,
      },
      {
        title: { en: "Need-to-know access, always logged", bn: "প্রবেশাধিকার কেবল প্রয়োজনমতো, প্রতিটি দেখা লগযুক্ত" } as L,
        desc: {
          en: "Only the advisor working your case can open your file — and every view of a data room is recorded.",
          bn: "কেবল যে অ্যাডভাইজর আপনার কেস দেখেন তিনিই আপনার ফাইল খুলতে পারেন — আর ডেটা রুমের প্রতিটি দেখা রেকর্ড হয়।",
        } as L,
      },
      {
        title: { en: "Anonymized until you say yes", bn: "আপনার সম্মতির আগ পর্যন্ত বেনামী" } as L,
        desc: {
          en: "Sensitive financial documents never appear in public listings — businesses stay code-named until both sides consent to an introduction.",
          bn: "সংবেদনশীল আর্থিক নথি কখনো প্রকাশ্য তালিকায় আসে না — দুই পক্ষের সম্মতির আগ পর্যন্ত ব্যবসাগুলো কোডনেমেই থাকে।",
        } as L,
      },
      {
        title: { en: "Access reviewed on a schedule", bn: "নির্দিষ্ট সময়ে পর্যালোচনা" } as L,
        desc: {
          en: "We re-check who holds access at regular intervals and revoke it the moment a role changes.",
          bn: "নির্দিষ্ট বিরতিতে কারা প্রবেশাধিকার রাখেন তা আবার যাচাই করি; দায়িত্ব বদলালেই তা বাতিল করে দিই।",
        } as L,
      },
    ],
  },

  /* Section 3 — never do */
  s3: {
    eyebrow: { en: "HARD NOES", bn: "যা কখনোই নয়" } as L,
    title: { en: "What we never do", bn: "যা আমরা কখনো করি না" } as L,
    copy: {
      en: "Some lines we simply don't cross — whatever the commercial temptation.",
      bn: "কিছু সীমারেখা আমরা কখনো পার করি না — বাণিজ্যিক লোভ যত বড়ই হোক।",
    } as L,
    rows: [
      {
        title: { en: "Never sell your data", bn: "তথ্য কখনো বিক্রি নয়" } as L,
        desc: {
          en: "Not to advertisers, not to brokers, not to anyone — for any price.",
          bn: "বিজ্ঞাপনদাতার কাছে নয়, ব্রোকারের কাছে নয়, কারও কাছেই নয় — যত বড় দামই হোক।",
        } as L,
      },
      {
        title: { en: "Never share without consent", bn: "সম্মতি ছাড়া শেয়ার নয়" } as L,
        desc: {
          en: "Identifiable details move only when you say yes; listings stay anonymized until both sides agree.",
          bn: "আপনার 'হ্যাঁ' ছাড়া শনাক্তযোগ্য তথ্য কোথাও যায় না; দুই পক্ষ রাজি না হওয়া পর্যন্ত তালিকা বেনামী থাকে।",
        } as L,
      },
      {
        title: { en: "No hidden trackers, no ad profiles", bn: "লুকানো ট্র্যাকার বা বিজ্ঞাপনী প্রোফাইল নয়" } as L,
        desc: {
          en: "We don't follow you around the internet or build a profile to sell against.",
          bn: "ইন্টারনেটে আপনাকে পিছু নিয়ে ঘোরি না, বা বিজ্ঞাপনের জন্য প্রোফাইল বানাই না।",
        } as L,
      },
      {
        title: { en: "Only aggregates ever leave the room", bn: "বাইরে যায় কেবল সমষ্টিগত সংখ্যা" } as L,
        desc: {
          en: `When we report numbers publicly, they are anonymized totals — like “${bnNum(62)} investors registered this quarter” — never individuals.`,
          bn: `প্রকাশ্যে সংখ্যা বলতে বেনামী মোট — যেমন “এই ত্রৈমাসিকে ${bnNum(62)} জন বিনিয়োগকারী নিবন্ধিত হয়েছেন” — কখনো ব্যক্তি নয়।`,
        } as L,
      },
    ],
  },

  /* Section 4 — rights & deletion */
  s4: {
    eyebrow: { en: "YOUR CONTROLS", bn: "আপনার নিয়ন্ত্রণ" } as L,
    title: { en: "Your rights — and how to use them", bn: "আপনার অধিকার — এবং ব্যবহারের নিয়ম" } as L,
    copy: {
      en: "Your data, your call. Every one of these takes a single email.",
      bn: "আপনার তথ্য, আপনার সিদ্ধান্ত। নিচের প্রতিটির জন্য লাগে মাত্র একটি ইমেইল।",
    } as L,
    rights: [
      {
        title: { en: "See it", bn: "দেখুন" } as L,
        desc: {
          en: "Ask what we hold about you — we send back a plain-language summary, not a data dump.",
          bn: "জিজ্ঞেস করুন আমাদের কাছে আপনার কী তথ্য আছে — অগোছালো ডেটা নয়, সহজ ভাষায় সারাংশ পাঠাই।",
        } as L,
      },
      {
        title: { en: "Correct it", bn: "সংশোধন করুন" } as L,
        desc: {
          en: "Spot something wrong or outdated? We fix it and confirm what changed.",
          bn: "কিছু ভুল বা পুরোনো দেখলে জানান — ঠিক করে কী বদলাল তা জানিয়ে দিই।",
        } as L,
      },
      {
        title: { en: "Export it", bn: "এক্সপোর্ট করুন" } as L,
        desc: {
          en: "Take your profile with you in a readable format, whenever you want.",
          bn: "আপনার প্রোফাইল যখন-তখন পড়ার উপযোগী ফরম্যাটে নিয়ে নিতে পারেন।",
        } as L,
      },
      {
        title: { en: "Delete it", bn: "মুছে ফেলুন" } as L,
        desc: {
          en: "Request deletion and we erase your records — actually erase, not just hide from view.",
          bn: "মুছে ফেলার অনুরোধ করুন — লুকিয়ে রাখি না, সত্যিই মুছে দিই।",
        } as L,
      },
      {
        title: { en: "Withdraw consent", bn: "সম্মতি প্রত্যাহার" } as L,
        desc: {
          en: "Stop future sharing at any time; matches already made stay confidential either way.",
          bn: "যেকোনো সময় ভবিষ্যৎ শেয়ারিং বন্ধ করুন; হয়ে যাওয়া ম্যাচ দুই ক্ষেত্রেই গোপন থাকে।",
        } as L,
      },
    ],
    emailTitle: { en: "How to make a request", bn: "অনুরোধ করবেন যেভাবে" } as L,
    emailBody: {
      en: `Write to privacy@nexfund.example — a real person replies, usually within one business day, and every request is completed within ${bnNum(30)} days.`,
      bn: `privacy@nexfund.example-এ লিখুন — একজন সত্যিকারের মানুষ উত্তর দেন, সাধারণত এক কর্মদিবসে; প্রতিটি অনুরোধ ${bnNum(30)} দিনের মধ্যে সম্পন্ন হয়।`,
    } as L,
    emailBtn: { en: "Email privacy@nexfund.example", bn: "privacy@nexfund.example-এ ইমেইল করুন" } as L,
  },

  /* Section 5 — retention */
  s5: {
    eyebrow: { en: "HOW LONG WE KEEP IT", bn: "কত দিন রাখি" } as L,
    title: { en: "Data retention, in plain numbers", bn: "তথ্য কত দিন থাকে — স্পষ্ট অঙ্কে" } as L,
    copy: {
      en: "Nothing is kept forever. Here is exactly how long each kind of record lives with us.",
      bn: "কিছুই চিরকাল থাকে না। কোন ধরনের রেকর্ড আমাদের কাছে কত দিন থাকে, তা হুবহু নিচে।",
    } as L,
    rows: [
      {
        title: { en: "Active conversations", bn: "চলমান যোগাযোগ" } as L,
        desc: {
          en: `Kept while we work together, then ${bnNum(12)} more months in case you return with a follow-up — then deleted.`,
          bn: `যত দিন একসাথে কাজ, তত দিন থাকে; এরপর ফলো-আপের জন্য আরও ${bnNum(12)} মাস — তারপর মুছে ফেলা হয়।`,
        } as L,
      },
      {
        title: { en: "Interest registrations", bn: "আগ্রহ নিবন্ধন" } as L,
        desc: {
          en: `Kept ${bnNum(24)} months from your last activity, then either deleted or fully anonymized.`,
          bn: `আপনার শেষ কার্যকলাপ থেকে ${bnNum(24)} মাস থাকে, তারপর মুছে ফেলা হয় বা পুরোপুরি বেনামী করা হয়।`,
        } as L,
      },
      {
        title: { en: "Verification documents", bn: "যাচাইয়ের নথি" } as L,
        desc: {
          en: "Held only while a listing is live, plus one audit cycle — then returned or securely destroyed.",
          bn: "কেবল তালিকা সচল থাকা পর্যন্ত + একটি অডিট সাইকেল — এরপর ফেরত দেওয়া হয় বা নিরাপদে ধ্বংস করা হয়।",
        } as L,
      },
      {
        title: { en: "Deletion requests", bn: "মুছে ফেলার অনুরোধ" } as L,
        desc: {
          en: "Jump the queue — handled ahead of every schedule above, no exceptions.",
          bn: "লাইনের আগে থাকে — উপরের সব সময়সীমাকে ছাড়িয়ে সবার আগে সম্পন্ন হয়, কোনো ব্যতিক্রম নেই।",
        } as L,
      },
    ],
  },

  ctaTitle: { en: "A question about your data?", bn: "তথ্য নিয়ে কোনো প্রশ্ন?" } as L,
  ctaCopy: {
    en: "Write to privacy@nexfund.example, or talk to an advisor directly — plain answers, no legal fog, within one business day.",
    bn: "privacy@nexfund.example-এ লিখুন, বা সরাসরি অ্যাডভাইজরের সাথে কথা বলুন — আইনি জটিলতা ছাড়াই পরিষ্কার উত্তর, এক কর্মদিবসে।",
  } as L,
  ctaTalk: { en: "Talk to an advisor", bn: "অ্যাডভাইজরের সাথে কথা বলুন" } as L,
  ctaTerms: { en: "Read the terms of use", bn: "ব্যবহারের শর্তাবলি পড়ুন" } as L,
};

const PRIVACY_EMAIL = "privacy@nexfund.example";

/* Section icons keep the card rows scannable without shouting. */
const S1_ICONS = [UserRound, Eye, FileLock2, CircleCheck];

export default function PrivacyPage() {
  const { t, lang } = useLanguage();

  return (
    <>
      <PageHero
        crumbs={[{ label: { en: "Privacy Promise", bn: "গোপনীয়তার প্রতিশ্রুতি" } }]}
        eyebrow={{ en: "PRIVACY", bn: "গোপনীয়তা" }}
        title={{ en: "Privacy Promise", bn: "গোপনীয়তার প্রতিশ্রুতি" }}
        copy={T.heroCopy}
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-nx-cyan-300/40 bg-nx-cyan-500/10 px-3.5 py-1.5 text-[12px] font-bold text-nx-cyan-300">
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            {t(T.badge)}
          </span>
        }
      />

      <PageBody className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          {/* The short version — canonical promise, verbatim */}
          <Reveal y={16}>
            <div className="rounded-3xl bg-nx-navy-950 nx-navy-grid p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-cyan-300 uppercase">
                  {t(T.shortTitle)}
                </h2>
                <span className="nx-num inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[12px] font-semibold text-white/70">
                  <ShieldCheck className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />
                  {t(T.updated)}: {t(UPDATED)}
                </span>
              </div>
              <p className="mt-4 leading-relaxed text-white/85">{t(T.shortBody)}</p>
            </div>
          </Reveal>

          {/* S1 — What we collect */}
          <Reveal y={16} className="mt-12">
            <SectionHead eyebrow={T.s1.eyebrow} title={T.s1.title} copy={T.s1.copy} />
            <ul className="mt-6 space-y-3">
              {T.s1.rows.map((r, i) => {
                const Icon = S1_ICONS[i];
                return (
                  <li
                    key={r.title.en}
                    className="flex gap-4 rounded-3xl border border-nx-navy-100 bg-white p-5 shadow-[0_14px_40px_-22px_rgba(6,31,74,0.2)] md:p-6"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-nx-navy-50 text-nx-navy-600">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-[15px] font-extrabold text-nx-navy-900">{t(r.title)}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{t(r.desc)}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm leading-relaxed font-semibold text-nx-danger-700">
              {t(T.s1.neverAsk)}
            </p>
          </Reveal>

          {/* S2 — How it's protected */}
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

          {/* S3 — What we never do */}
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

          {/* S4 — Your rights & deletion */}
          <Reveal y={16} className="mt-12">
            <SectionHead eyebrow={T.s4.eyebrow} title={T.s4.title} copy={T.s4.copy} />
            <ol className="mt-6 grid gap-3 sm:grid-cols-2">
              {T.s4.rights.map((r, i) => (
                <li
                  key={r.title.en}
                  className="rounded-3xl border border-nx-navy-100 bg-white p-5 shadow-[0_14px_40px_-22px_rgba(6,31,74,0.2)]"
                >
                  <span className="nx-num inline-flex h-8 w-8 items-center justify-center rounded-full bg-nx-navy-700 text-sm font-extrabold text-white">
                    {lang === "bn" ? bnNum(i + 1) : i + 1}
                  </span>
                  <h3 className="mt-3 text-[15px] font-extrabold text-nx-navy-900">{t(r.title)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{t(r.desc)}</p>
                </li>
              ))}
            </ol>
            <div className="mt-4 flex flex-col gap-4 rounded-3xl border border-nx-navy-100 bg-nx-navy-50/60 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
              <div className="max-w-xl">
                <h3 className="text-[15px] font-extrabold text-nx-navy-900">{t(T.s4.emailTitle)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{t(T.s4.emailBody)}</p>
              </div>
              <a
                href={`mailto:${PRIVACY_EMAIL}?subject=${encodeURIComponent(
                  lang === "bn" ? "তথ্য মুছে ফেলার অনুরোধ / Data request" : "Data request — privacy"
                )}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-nx-navy-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-nx-navy-600"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {t(T.s4.emailBtn)}
              </a>
            </div>
          </Reveal>

          {/* S5 — Data retention */}
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
        </div>
      </PageBody>

      <CtaBand
        title={T.ctaTitle}
        copy={T.ctaCopy}
        actions={
          <>
            <CyanButton onClick={() => navigateTo("contact")}>
              {t(T.ctaTalk)}
            </CyanButton>
            <OutlineLightButton onClick={() => navigateTo("terms")}>
              {t(T.ctaTerms)}
            </OutlineLightButton>
          </>
        }
      />
    </>
  );
}
