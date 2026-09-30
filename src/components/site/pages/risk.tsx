"use client";

/**
 * R10 Risk Disclosure page — text-forward legal page with a highlighted
 * amber warning box directly under the hero (the canonical footer risk
 * text, verbatim), then five bilingual sections. CtaBand → Charter.
 */

import {
  AlertTriangle,
  CircleCheck,
  Clock3,
  Megaphone,
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
    en: "What investing actually involves — and what NexFund can and cannot promise. No sugar-coating.",
    bn: "বিনিয়োগে আসলে কী জড়িয়ে থাকে — আর নেক্সফান্ড কী দিতে পারে, কী পারে না। কোনো ছলনা নেই।",
  } as L,
  badge: {
    en: "Read this before investing a single taka",
    bn: "এক টাকাও বিনিয়োগের আগে পড়ুন",
  } as L,

  /* Amber warning box — canonical risk text, verbatim */
  warnTitle: { en: "The short version", bn: "সংক্ষেপে" } as L,
  warnBody: {
    en: "Investing involves risk, including possible loss of capital. NexFund does not guarantee returns. Past performance is not indicative of future results. Verification reduces risk; it does not remove it. Please read our full risk disclosure before making any decision.",
    bn: "বিনিয়োগে ঝুঁকি আছে, মূলধন হারানোর সম্ভাবনাসহ। নেক্সফান্ড কোনো মুনাফার নিশ্চয়তা দেয় না। অতীতের ফলাফল ভবিষ্যতের নিশ্চয়তা নয়। যাচাই ঝুঁকি কমায়, দূর করে না। সিদ্ধান্তের আগে আমাদের সম্পূর্ণ ঝুঁকি বিবরণী পড়ুন।",
  } as L,
  updated: { en: "Last updated", bn: "সর্বশেষ হালনাগাদ" } as L,

  /* Section 1 — general investment risk */
  s1: {
    eyebrow: { en: "THE BASICS", bn: "মূল কথা" } as L,
    title: { en: "General investment risk", bn: "বিনিয়োগের সাধারণ ঝুঁকি" } as L,
    copy: {
      en: "True for every listing on this platform — and, frankly, for every investment anywhere.",
      bn: "এই প্ল্যাটফর্মের প্রতিটি তালিকার জন্য সত্য — এবং সরাসরি বললে, দুনিয়ার যেকোনো বিনিয়োগের জন্যও।",
    } as L,
    rows: [
      {
        title: { en: "You can lose it all", bn: "পুরোটাই হারানো সম্ভব" } as L,
        desc: {
          en: "Capital loss is a real outcome, including total loss. Nothing on this site changes that.",
          bn: "মূলধন হারানো একটি বাস্তব পরিণতি — পুরোটা হারানোও সম্ভব। এই সাইটের কিছুই সেটা বদলে দেয় না।",
        } as L,
      },
      {
        title: { en: "Returns are never guaranteed", bn: "রিটার্নের কোনো নিশ্চয়তা নেই" } as L,
        desc: {
          en: "Not by us, not by the businesses, not by anyone. Anyone promising otherwise is selling something else.",
          bn: "আমরা দিই না, ব্যবসাগুলো দেয় না, কেউ দেয় না। অন্যরকম প্রতিশ্রুতি দিলে বুঝুন অন্য কিছু বিক্রি হচ্ছে।",
        } as L,
      },
      {
        title: { en: "Past ≠ future", bn: "অতীত ≠ ভবিষ্যৎ" } as L,
        desc: {
          en: "A business's history — even a verified one — is not a promise about its next five years.",
          bn: "ব্যবসার অতীত — এমনকি যাচাইকৃত অতীতও — পরের পাঁচ বছরের নিশ্চয়তা নয়।",
        } as L,
      },
      {
        title: { en: "Businesses fail for ordinary reasons", bn: "ব্যবসা ব্যর্থ হয় সাধারণ কারণেই" } as L,
        desc: {
          en: "Competition, management changes, market shifts, a bad season — honesty about this beats hype.",
          bn: "প্রতিযোগিতা, ব্যবস্থাপনা বদল, বাজার পরিবর্তন, একটি খারাপ মৌসুম — এসব নিয়ে সৎ থাকাই জলঞ্জলির চেয়ে ভালো।",
        } as L,
      },
      {
        title: { en: "One business is not a portfolio", bn: "একটি ব্যবসা পোর্টফোলিও নয়" } as L,
        desc: {
          en: "Concentration multiplies both directions. Spread risk rather than betting it all once.",
          bn: "এক জায়গায় সব রাখলে লাভ-ক্ষতি দুটোই বাড়ে। সব একবারে না রেখে ঝুঁকি ছড়িয়ে দিন।",
        } as L,
      },
      {
        title: { en: "Only what you can afford to lose", bn: "যতটুকু হারানো সম্ভব, কেবল ততটুকুই" } as L,
        desc: {
          en: "If losing the amount would change how you live, it is too much to place here.",
          bn: "ওই অঙ্ক হারালে যদি জীবনযাপন বদলে যায়, তাহলে সেটুকু এখানে রাখাই বেশি।",
        } as L,
      },
    ],
  },

  /* Section 2 — what verification does and doesn't */
  s2: {
    eyebrow: { en: "VERIFICATION, HONESTLY", bn: "যাচাই নিয়ে সততা" } as L,
    title: { en: "What verification does — and doesn't", bn: "যাচাই যা করে — এবং যা করে না" } as L,
    copy: {
      en: "Our five-pillar standard is the strongest filter we know how to build. It is still a filter, not a shield.",
      bn: "আমাদের পাঁচ-স্তম্ভের মানদণ্ড আমাদের জানা সবচেয়ে শক্তিশালী ছাঁকনি। তবু এটি ছাঁকনি — ঢাল নয়।",
    } as L,
    doesTitle: { en: "Verification does", bn: "যাচাই যা করে" } as L,
    does: [
      {
        en: "Confirms documents, financials, sites and founders as of a stated date",
        bn: "নির্দিষ্ট তারিখ পর্যন্ত নথি, আর্থিক হিসাব, সাইট ও প্রতিষ্ঠাতাদের সত্যতা নিশ্চিত করে",
      } as L,
      { en: "Puts every listing on one honest, comparable fact-pack", bn: "প্রতিটি তালিকাকে একই সৎ, তুলনীয় ফ্যাক্ট-প্যাকে আনে" } as L,
      { en: "Surfaces the material risks in writing, before you ask", bn: "আপনার জিজ্ঞেস করার আগেই প্রধান ঝুঁকিগুলো লিখে দেখায়" } as L,
      { en: "Keeps unverified claims out of listings entirely", bn: "অযাচাইকৃত দাবি তালিকায় ঢুকতেই দেয় না" } as L,
    ],
    doesntTitle: { en: "Verification doesn't", bn: "যাচাই যা করে না" } as L,
    doesnt: [
      { en: "Guarantee future performance or profits", bn: "ভবিষ্যতের পরিণতি বা মুনাফার নিশ্চয়তা দেয় না" } as L,
      { en: "Remove fraud or business risk — it reduces them", bn: "প্রতারণা বা ব্যবসার ঝুঁকি দূর করে না — কমায়" } as L,
      { en: "Replace your own due diligence", bn: "আপনার নিজের যাচাইয়ের বিকল্প নয়" } as L,
      { en: "Insure your capital — no protection scheme exists here", bn: "মূলধনের বিমা নয় — এখানে কোনো সুরক্ষা প্রকল্প নেই" } as L,
    ],
  },

  /* Section 3 — liquidity & horizon */
  s3: {
    eyebrow: { en: "TIME & ACCESS", bn: "সময় ও প্রবেশাধিকার" } as L,
    title: { en: "Liquidity & horizon", bn: "তরলতা ও সময়সীমা" } as L,
    copy: {
      en: "This is not the stock market. There is no ticker, no daily price, no exit button.",
      bn: "এটা শেয়ারবাজার নয়। এখানে কোনো টিকার নেই, প্রতিদিনের দাম নেই, বেরিয়ে যাওয়ার বাটন নেই।",
    } as L,
    rows: [
      {
        title: { en: "No instant exit", bn: "তাৎক্ষণিক বেরিয়ে আসা নেই" } as L,
        desc: {
          en: "You cannot click and convert a private holding back to cash. Plan as if there is no early exit at all.",
          bn: "এক ক্লিকে বেসরকারি বিনিয়োগ নগদে ফেরানো যায় না। ধরে নিন, আগে বেরোনোর পথই নেই।",
        } as L,
      },
      {
        title: { en: "Exits arrive the slow way", bn: "এক্সিট আসে ধীর পথে" } as L,
        desc: {
          en: "Money typically comes back through dividends, buybacks or an acquisition — events you don't control.",
          bn: "অর্থ ফেরে লভ্যাংশ, বাইব্যাক বা অধিগ্রহণের মাধ্যমে — যে ঘটনা আপনার নিয়ন্ত্রণে নয়।",
        } as L,
      },
      {
        title: { en: "Think in years, not months", bn: "ভাবুন বছরে, মাসে নয়" } as L,
        desc: {
          en: `Typical horizons run ${bnNum(3)}–${bnNum(7)} years or longer; value grows while businesses grow.`,
          bn: `সাধারণ সময়সীমা ${bnNum(3)}–${bnNum(7)} বছর বা তারও বেশি; মূল্য বাড়ে ব্যবসা বাড়ার সাথে সাথে।`,
        } as L,
      },
      {
        title: { en: "Match money to horizon", bn: "অর্থের সাথে সময়সীমা মেলান" } as L,
        desc: {
          en: "Money you may need next year for school fees or rent is not horizon money.",
          bn: "আগামী বছরে স্কুলের ফি বা ভাড়ায় লাগবে — এমন অর্থ এই সময়সীমার জন্য নয়।",
        } as L,
      },
    ],
  },

  /* Section 4 — currency & macro */
  s4: {
    eyebrow: { en: "THE WIDER WORLD", bn: "বাইরের জগৎ" } as L,
    title: { en: "Currency & macro", bn: "মুদ্রা ও ম্যাক্রো" } as L,
    copy: {
      en: "No business operates in a bubble — and neither does your return.",
      bn: "কোনো ব্যবসা বুদবুদে চলে না — আপনার রিটার্নও নয়।",
    } as L,
    rows: [
      {
        title: { en: "Taka moves", bn: "টাকার দর চড়া-নামা করে" } as L,
        desc: {
          en: "Currency fluctuation can add to returns on imports and exports — or quietly eat into them.",
          bn: "মুদ্রার অবমূল্যায়ন আমদানি-রপ্তানিনির্ভর আয়ে যোগ করতে পারে — বা নীরবে কমিয়ে দিতে পারে।",
        } as L,
      },
      {
        title: { en: "Inflation erodes", bn: "মূল্যস্ফীতি গুনায়" } as L,
        desc: {
          en: "A profit that doesn't beat inflation is a slow loss. Compare real, not nominal.",
          bn: "মূল্যস্ফীতি ছাড়িয়ে না লাভ মানে ধীর ক্ষতি। তুলনা করুন বাস্তবে, নামমাত্র অঙ্কে নয়।",
        } as L,
      },
      {
        title: { en: "Energy, regulation, politics", bn: "জ্বালানি, নিয়মকানুন, রাজনীতি" } as L,
        desc: {
          en: "Fuel prices, licence changes and political shifts hit small and mid-sized businesses first.",
          bn: "জ্বালানির দাম, লাইসেন্স বদল ও রাজনৈতিক প্রেক্ষাপট ছোট-মাঝারি ব্যবসায় আগে আঘাত করে।",
        } as L,
      },
      {
        title: { en: "Climate is macro now", bn: "জলবায়ু এখন ম্যাক্রোই" } as L,
        desc: {
          en: "Floods, heat and supply-chain shocks are real operating risks for Bangladeshi businesses.",
          bn: "বন্যা, গরম ও সরবরাহ-ব্যবস্থার ধাক্কা বাংলাদেশি ব্যবসার জন্য বাস্তব ঝুঁকি।",
        } as L,
      },
      {
        title: { en: "Scenarios are illustrations", bn: "সিনারিও কেবল উদাহরণ" } as L,
        desc: {
          en: "The downside/base/upside figures on this site model possibilities — they are not forecasts.",
          bn: "এই সাইটের নিচু-মাঝারি-উঁচু পরিস্থিতির অঙ্ক সম্ভাবনার নমুনা — ভবিষ্যদ্বাণী নয়।",
        } as L,
      },
    ],
  },

  /* Section 5 — our disclosure duty */
  s5: {
    eyebrow: { en: "OUR DUTY", bn: "আমাদের দায়িত্ব" } as L,
    title: { en: "Our disclosure duty", bn: "আমাদের প্রকাশের দায়" } as L,
    copy: {
      en: "What we owe you in writing — and hold ourselves to even when it's inconvenient.",
      bn: "লিখিতভাবে আমরা আপনার প্রাপ্য কী — অসুবিধাজনক হলেও যা মেনে চলি।",
    } as L,
    rows: [
      {
        title: { en: "Risks on every listing", bn: "প্রতিটি তালিকায় ঝুঁকি" } as L,
        desc: {
          en: "Every opportunity carries its written risks — you never have to dig for them.",
          bn: "প্রতিটি সুযোগের সাথে লিখিত ঝুঁকি থাকে — খুঁজে বের করতে হয় না।",
        } as L,
      },
      {
        title: { en: "The one line we live by", bn: "যে লাইনে আমরা চলি" } as L,
        desc: {
          en: "“Verification reduces risk; it does not remove it” — repeated so often it can't be forgotten.",
          bn: "“যাচাই ঝুঁকি কমায়, দূর করে না” — এত বার বলা যে ভোলার উপায় নেই।",
        } as L,
      },
      {
        title: { en: "Unknowns marked unknown", bn: "অজানা থাকলে অজানাই লেখা" } as L,
        desc: {
          en: "What we can't verify gets labeled as such — never dressed up as certainty.",
          bn: "যা যাচাই করতে পারি না, তা-ই লেখা থাকে — নিশ্চয়তা সাজিয়ে কখনো নয়।",
        } as L,
      },
      {
        title: { en: "Anonymization never hides risk", bn: "বেনামীকরণে ঝুঁকি লুকায় না" } as L,
        desc: {
          en: "Code names protect identities, not weaknesses — the risk section stays full-length.",
          bn: "কোডনেম রক্ষা করে পরিচয়, দুর্বলতা নয় — ঝুঁকির অংশটুকু পুরোটাই থাকে।",
        } as L,
      },
      {
        title: { en: "Failures never list", bn: "ব্যর্থ হলে তালিকায় ওঠেই না" } as L,
        desc: {
          en: "A business that fails any pillar of vetting simply never appears on this platform.",
          bn: "যে ব্যবসা যাচাইয়ের কোনো স্তম্ভেই ব্যর্থ, সে এই প্ল্যাটফর্মে কখনোই তালিকায় ওঠে না।",
        } as L,
      },
      {
        title: { en: "Conflicts in the open", bn: "স্বার্থের সংঘাত প্রকাশ্যে" } as L,
        desc: {
          en: "If we hold any interest in a listed business, it is disclosed on the listing itself.",
          bn: "তালিকাভুক্ত কোনো ব্যবসায় আমাদের স্বার্থ থাকলে সেটি সেই তালিকাতেই প্রকাশ করা হয়।",
        } as L,
      },
    ],
  },

  ctaTitle: { en: "How we hold ourselves to this", bn: "এতে নিজেদের কীভাবে আবদ্ধ রাখি" } as L,
  ctaCopy: {
    en: "The NexFund Charter puts our duties in writing — seven promises, from verified facts to honest no's.",
    bn: "নেক্সফান্ড চার্টার আমাদের দায়িত্ব লিখিতভাবে ধরে রাখে — যাচাইকৃত তথ্য থেকে সৎ 'না' পর্যন্ত সাতটি প্রতিশ্রুতি।",
  } as L,
  ctaCharter: { en: "Read the Charter", bn: "চার্টার পড়ুন" } as L,
  ctaAsk: { en: "Ask an advisor", bn: "অ্যাডভাইজরকে জিজ্ঞাসা করুন" } as L,
};

export default function RiskPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        crumbs={[{ label: { en: "Risk Disclosure", bn: "ঝুঁকি বিবরণী" } }]}
        eyebrow={{ en: "RISK", bn: "ঝুঁকি" }}
        title={{ en: "Risk Disclosure", bn: "ঝুঁকি বিবরণী" }}
        copy={T.heroCopy}
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/50 bg-amber-400/10 px-3.5 py-1.5 text-[12px] font-bold text-amber-200">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            {t(T.badge)}
          </span>
        }
      />

      <PageBody className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          {/* Amber warning box — the canonical risk text, verbatim */}
          <Reveal y={16}>
            <aside
              aria-label={t(T.warnTitle)}
              className="rounded-3xl border border-amber-300/70 bg-amber-50 p-6 shadow-[0_14px_40px_-20px_rgba(146,64,14,0.3)] md:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 text-lg font-extrabold text-nx-navy-900">
                  <AlertTriangle className="h-5 w-5 text-amber-500" aria-hidden="true" />
                  {t(T.warnTitle)}
                </h2>
                <span className="nx-num inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-100/70 px-3 py-1 text-[12px] font-semibold text-nx-warn-700">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  {t(T.updated)}: {t(UPDATED)}
                </span>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed font-semibold text-amber-900">
                {t(T.warnBody)}
              </p>
            </aside>
          </Reveal>

          {/* S1 — General investment risk */}
          <Reveal y={16} className="mt-12">
            <SectionHead eyebrow={T.s1.eyebrow} title={T.s1.title} copy={T.s1.copy} />
            <ul className="mt-6 space-y-3">
              {T.s1.rows.map((r) => (
                <li
                  key={r.title.en}
                  className="flex gap-3.5 rounded-3xl border border-nx-navy-100 bg-white p-5 shadow-[0_14px_40px_-22px_rgba(6,31,74,0.2)] md:p-6"
                >
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
                  <div>
                    <h3 className="text-[15px] font-extrabold text-nx-navy-900">{t(r.title)}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{t(r.desc)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* S2 — What verification does and doesn't */}
          <Reveal y={16} className="mt-12">
            <SectionHead eyebrow={T.s2.eyebrow} title={T.s2.title} copy={T.s2.copy} />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_14px_40px_-22px_rgba(6,31,74,0.2)]">
                <h3 className="flex items-center gap-2 text-[15px] font-extrabold text-nx-navy-900">
                  <CircleCheck className="h-5 w-5 text-nx-verified" aria-hidden="true" />
                  {t(T.s2.doesTitle)}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {T.s2.does.map((r) => (
                    <li key={r.en} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nx-verified" aria-hidden="true" />
                      {t(r)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_14px_40px_-22px_rgba(6,31,74,0.2)]">
                <h3 className="flex items-center gap-2 text-[15px] font-extrabold text-nx-navy-900">
                  <X className="h-5 w-5 text-nx-danger-700" aria-hidden="true" />
                  {t(T.s2.doesntTitle)}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {T.s2.doesnt.map((r) => (
                    <li key={r.en} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nx-danger-700" aria-hidden="true" />
                      {t(r)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* S3 — Liquidity & horizon */}
          <Reveal y={16} className="mt-12">
            <SectionHead eyebrow={T.s3.eyebrow} title={T.s3.title} copy={T.s3.copy} />
            <ul className="mt-6 space-y-3">
              {T.s3.rows.map((r) => (
                <li
                  key={r.title.en}
                  className="flex gap-4 rounded-3xl border border-nx-navy-100 bg-white p-5 shadow-[0_14px_40px_-22px_rgba(6,31,74,0.2)] md:p-6"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-nx-navy-50 text-nx-navy-600">
                    <Clock3 className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-extrabold text-nx-navy-900">{t(r.title)}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{t(r.desc)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* S4 — Currency & macro */}
          <Reveal y={16} className="mt-12">
            <SectionHead eyebrow={T.s4.eyebrow} title={T.s4.title} copy={T.s4.copy} />
            <ul className="mt-6 space-y-3">
              {T.s4.rows.map((r) => (
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

          {/* S5 — Our disclosure duty */}
          <Reveal y={16} className="mt-12">
            <SectionHead eyebrow={T.s5.eyebrow} title={T.s5.title} copy={T.s5.copy} />
            <ul className="mt-6 space-y-3">
              {T.s5.rows.map((r) => (
                <li
                  key={r.title.en}
                  className="flex gap-3.5 rounded-3xl border border-nx-navy-100 bg-white p-5 shadow-[0_14px_40px_-22px_rgba(6,31,74,0.2)] md:p-6"
                >
                  <Megaphone className="mt-0.5 h-5 w-5 shrink-0 text-nx-navy-400" aria-hidden="true" />
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
            <CyanButton onClick={() => navigateTo("charter")}>
              {t(T.ctaCharter)}
            </CyanButton>
            <OutlineLightButton onClick={() => navigateTo("contact")}>
              {t(T.ctaAsk)}
            </OutlineLightButton>
          </>
        }
      />
    </>
  );
}
