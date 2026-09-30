"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  Hourglass,
  ListChecks,
  PackageCheck,
  Timer,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, type L } from "@/lib/i18n";
import { HOW } from "@/lib/content";
import { navigateTo } from "@/lib/page-router";
import { useDialogStore } from "@/lib/dialog-store";
import { bnNum } from "@/lib/format";
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
 * R10 "How It Works" landing page + one details page per step.
 *   #p/how            → vertical timeline of the process steps
 *   #p/how/<slug>     → step details: what happens / you receive / timing / prep
 * Data: HOW.steps (Apply → Verify → Match → Grow) from content.ts — the same
 * four steps the home section renders; slugs are kebab-case per step title.
 */

const SLUGS = ["apply", "verify", "match", "grow"] as const;

/* Expanded per-step copy — new R10-b content, same voice as content.ts */
const STEP_DETAIL: Record<
  string,
  {
    image: string;
    heroCopy: L;
    whoChip: L;
    timeChip: L;
    outcomeChip: L;
    whatHappens: L[];
    receive: L[];
    duration: L;
    prepare: L[];
  }
> = {
  apply: {
    image: "/images/insight-pitch.png",
    heroCopy: {
      en: "Every relationship on NexFund starts the same honest way — a short application, a signed NDA, and no need for connections or warm intros.",
      bn: "নেক্সফান্ডে প্রতিটি সম্পর্কের শুরু একই সৎ পথে — একটি ছোট আবেদন, সই করা NDA, আর কোনো চেনা-জানা বা সুপারিশের প্রয়োজন নেই।",
    },
    whoChip: { en: "Investors & entrepreneurs", bn: "বিনিয়োগকারী ও উদ্যোক্তা" },
    timeChip: { en: "About 10 minutes", bn: "প্রায় ১০ মিনিট" },
    outcomeChip: { en: "Confirmed application + checklist", bn: "নিশ্চিত আবেদন + চেকলিস্ট" },
    whatHappens: [
      {
        en: "Investors complete a three-part registration — account, matching profile, secure verification. Entrepreneurs tell us about the business instead: registration, ownership, recent financials and a use-of-funds plan. Ten minutes is the honest average, either way.",
        bn: "বিনিয়োগকারীরা তিন ভাগের একটি রেজিস্ট্রেশন সম্পন্ন করেন — অ্যাকাউন্ট, ম্যাচিং প্রোফাইল, সুরক্ষিত যাচাই। উদ্যোক্তারা বদলে ব্যবসার কথা বলেন: নিবন্ধন, মালিকানা, সাম্প্রতিক আর্থিক বিবরণী আর তহবিল ব্যবহারের পরিকল্পনা। দুই ক্ষেত্রেই সৎ গড় হলো দশ মিনিট।",
      },
      {
        en: "Nothing here is a commitment. Applying opens a conversation and nothing more — you can stop, pause, or ask for a call at any point.",
        bn: "এখানে কিছুই বাধ্যবাধকতা নয়। আবেদন মানে কথা শুরুর দরজা খোলা — চাইলে থামুন, বিরতি নিন, বা যেকোনো সময় কল চেয়ে নিন।",
      },
    ],
    receive: [
      { en: "Confirmation within 1 business day", bn: "১ কর্মদিবসের মধ্যে নিশ্চিতকরণ" },
      { en: "A document checklist matched to your side", bn: "আপনার পক্ষ অনুযায়ী ডকুমেন্ট চেকলিস্ট" },
      { en: "An invitation to a short advisor call", bn: "ছোট একটি অ্যাডভাইজার কলের আমন্ত্রণ" },
      { en: "A signed NDA before anything sensitive is shared", bn: "সংবেদনশীল কিছু শেয়ারের আগেই সই করা NDA" },
    ],
    duration: {
      en: "The form itself takes about ten minutes. Confirmation lands within one business day, and the advisor call is usually booked inside the same week.",
      bn: "ফর্মটিতে লাগে প্রায় দশ মিনিট। ১ কর্মদিবসের মধ্যে নিশ্চিতকরণ আসে, আর অ্যাডভাইজার কল সাধারণত একই সপ্তাহেই নির্ধারণ হয়।",
    },
    prepare: [
      { en: "Founders: business registration & ownership details", bn: "উদ্যোক্তারা: ব্যবসার নিবন্ধন ও মালিকানার তথ্য" },
      { en: "Founders: recent financial statements", bn: "উদ্যোক্তারা: সাম্প্রতিক আর্থিক বিবরণী" },
      { en: "Founders: a first use-of-funds plan", bn: "উদ্যোক্তারা: তহবিল ব্যবহারের প্রাথমিক পরিকল্পনা" },
      { en: "Investors: your sector, ticket & horizon preferences", bn: "বিনিয়োগকারীরা: খাত, টিকেট ও সময়সীমার পছন্দ" },
    ],
  },
  verify: {
    image: "/images/page-vetting.png",
    heroCopy: {
      en: "This is where NexFund earns its place at the table — five pillars of checks, in writing, before a business ever reaches an investor's screen.",
      bn: "এই ধাপেই নেক্সফান্ড নিজের জায়গাটা করে নেয় — একটি ব্যবসা বিনিয়োগকারীর সামনে আসার আগেই লিখিতভাবে পাঁচ স্তম্ভের যাচাই।",
    },
    whoChip: { en: "Every business, no exceptions", bn: "প্রতিটি ব্যবসা, কোনো ব্যতিক্রম নেই" },
    timeChip: { en: "Typically 2–3 weeks", bn: "সাধারণত ২–৩ সপ্তাহ" },
    outcomeChip: { en: "Verified fact-pack + risk summary", bn: "যাচাইকৃত ফ্যাক্ট-প্যাক + ঝুঁকি-সারসংক্ষেপ" },
    whatHappens: [
      {
        en: "Our team reviews identity and ownership, legal and compliance papers, financial health, and operations — including a site visit and customer conversations for most businesses.",
        bn: "আমাদের টিম যাচাই করে পরিচয় ও মালিকানা, আইনি ও কমপ্লায়েন্স নথি, আর্থিক সুস্থতা আর কার্যক্রম — বেশিরভাগ ব্যবসার ক্ষেত্রে সাইট ভিজিট ও গ্রাহকের সাথে কথাও হয়।",
      },
      {
        en: "An independent advisor then writes the risk summary in plain Bangla and English — the material risks, not the marketing ones. If a pillar fails, the listing stops here.",
        bn: "এরপর একজন স্বাধীন অ্যাডভাইজার সহজ বাংলা ও ইংরেজিতে ঝুঁকি-সারসংক্ষেপ লেখেন — আসল ঝুঁকি, বিজ্ঞাপনের ঝুঁকি নয়। কোনো স্তম্ভ অনুত্তীর্ণ হলে তালিকা এখানেই থেমে যায়।",
      },
    ],
    receive: [
      { en: "Verification badges for every passed stage", bn: "প্রতিটি উত্তীর্ণ ধাপের জন্য যাচাই ব্যাজ" },
      { en: "A plain-language risk summary", bn: "সহজ ভাষায় লেখা ঝুঁকি-সারসংক্ষেপ" },
      { en: "The advisor's site-visit notes", bn: "অ্যাডভাইজারের সাইট-ভিজিট নোট" },
      { en: "Financial figures verified before publishing", bn: "প্রকাশের আগেই যাচাইকৃত আর্থিক সংখ্যা" },
    ],
    duration: {
      en: "Most businesses complete verification in two to three weeks. The single biggest factor is document readiness — founders with organized papers move fastest.",
      bn: "বেশিরভাগ ব্যবসা দুই থেকে তিন সপ্তাহে যাচাই শেষ করে। সবচেয়ে বড় নিয়ামক নথির প্রস্তুতি — গোছানো কাগজপত্র নিয়ে আসা ফাউন্ডাররাই সবচেয়ে দ্রুত এগোন।",
    },
    prepare: [
      { en: "Trade license & tax documents", bn: "ট্রেড লাইসেন্স ও কর-সংক্রান্ত নথি" },
      { en: "Recent financial statements & bank records", bn: "সাম্প্রতিক আর্থিক বিবরণী ও ব্যাংক রেকর্ড" },
      { en: "Ownership records, signed & current", bn: "মালিকানার নথি — স্বাক্ষরিত ও হালনাগাদ" },
      { en: "A convenient date for the site visit", bn: "সাইট ভিজিটের সুবিধাজনক তারিখ" },
    ],
  },
  match: {
    image: "/images/investor-meeting.png",
    heroCopy: {
      en: "We introduce only strong fits — sector, ticket size and time horizon aligned on both sides, anonymized until the NDA, and never without your approval.",
      bn: "আমরা কেবল মানানসই জোড়া পরিচয় করিয়ে দিই — খাত, টিকেট সাইজ ও সময়সীমা দুই পক্ষেই মিলিয়ে, NDA-র আগে বেনামি, আর আপনার অনুমোদন ছাড়া কখনো নয়।",
    },
    whoChip: { en: "Investors & verified businesses", bn: "বিনিয়োগকারী ও যাচাইকৃত ব্যবসা" },
    timeChip: { en: "First matches in ~2 weeks", bn: "প্রথম ম্যাচ প্রায় ২ সপ্তাহে" },
    outcomeChip: { en: "Curated, NDA-protected introductions", bn: "বাছাইকৃত, NDA-সুরক্ষিত পরিচয়" },
    whatHappens: [
      {
        en: "Your registration profile — sectors, ticket range, time horizon and risk comfort — is screened against every verified listing, and every listing against you. Both sides see the same facts.",
        bn: "আপনার রেজিস্ট্রেশন প্রোফাইল — খাত, টিকেট রেঞ্জ, সময়সীমা ও ঝুঁকি-স্বাচ্ছন্দ্য — প্রতিটি যাচাইকৃত তালিকার সাথে মেলানো হয়, আর প্রতিটি তালিকাও আপনার সাথে। দুই পক্ষই একই তথ্য দেখেন।",
      },
      {
        en: "Introductions start anonymized. Names and sensitive documents unlock only after the NDA is signed — and you approve every single introduction before it happens.",
        bn: "পরিচয় শুরু হয় বেনামে। NDA সই হওয়ার পরেই কেবল নাম ও সংবেদনশীল নথি খোলে — আর প্রতিটি পরিচয়ের আগে আপনার অনুমোদন ছাড়া এক পা-ও এগোয় না।",
      },
    ],
    receive: [
      { en: "Curated opportunities in your inbox", bn: "ইনবক্সে বাছাই করা সুযোগ" },
      { en: "The full fact-pack for each match", bn: "প্রতিটি ম্যাচের সম্পূর্ণ ফ্যাক্ট-প্যাক" },
      { en: "A meeting scheduled at your convenience", bn: "আপনার সুবিধা মতো সময়ে নির্ধারিত বৈঠক" },
      { en: "The same verified facts both sides see", bn: "দুই পক্ষের দেখা একই যাচাইকৃত তথ্য" },
    ],
    duration: {
      en: "After your advisor call, the first curated matches typically arrive within two weeks — new verified listings reach matching investors first.",
      bn: "অ্যাডভাইজার কলের পর প্রথম বাছাইকৃত ম্যাচ সাধারণত দুই সপ্তাহের মধ্যেই আসে — নতুন যাচাইকৃত তালিকা ম্যাচিং বিনিয়োগকারীর কাছে সবার আগে পৌঁছায়।",
    },
    prepare: [
      { en: "Your criteria — set once during registration", bn: "আপনার মানদণ্ড — রেজিস্ট্রেশনে একবারই সেট করা" },
      { en: "An open calendar for first meetings", bn: "প্রথম বৈঠকের জন্য খোলা ক্যালেন্ডার" },
      { en: "Questions from the fact-pack, written down", bn: "ফ্যাক্ট-প্যাক থেকে প্রশ্নগুলো, লিখে রাখা" },
    ],
  },
  grow: {
    image: "/images/hero-garments.png",
    heroCopy: {
      en: "Terms, documentation, structure — our advisors stay at the table so both sides move with clarity instead of pressure. Money always moves directly between the parties.",
      bn: "শর্ত, ডকুমেন্টেশন, কাঠামো — দুই পক্ষ যেন চাপ নয়, স্পষ্টতা নিয়ে এগোয়, সেজন্য আমাদের অ্যাডভাইজাররা টেবিলেই থাকেন। অর্থ সবসময় সরাসরি দুই পক্ষের মধ্যেই লেনদেন হয়।",
    },
    whoChip: { en: "Matched pairs, advisor-supported", bn: "ম্যাচ হওয়া জোড়া, অ্যাডভাইজর-সহায়তায়" },
    timeChip: { en: "Moves at the deal's pace", bn: "ডিলের গতিতেই এগোয়" },
    outcomeChip: { en: "Documents both sides can trust", bn: "দুই পক্ষেরই আস্থার নথি" },
    whatHappens: [
      {
        en: "When a match wants to talk terms, our advisors support the discussion — reference points for valuation, the right questions to ask, and plain-language flags on anything that smells off.",
        bn: "কোনো জোড়া শর্ত নিয়ে আলাপে বসলে আমাদের অ্যাডভাইজাররা সেই আলোচনায় পাশে থাকেন — ভ্যালুয়েশনের রেফারেন্স পয়েন্ট, যে প্রশ্নগুলো করা উচিত, আর কিছু একটা খটকা লাগলে সহজ ভাষায় সেই সংকেত।",
      },
      {
        en: "We never hold funds and never pressure a decision — if the fit isn't there, we say so, and so can you. A respectful 'not yet' beats a bad deal.",
        bn: "আমরা কখনো অর্থ গচ্ছিত রাখি না, কোনো সিদ্ধান্তে চাপ দিই না — মানানসই না হলে আমরা বলি, আপনিও বলতে পারেন। খারাপ ডিলের চেয়ে ভদ্র 'এখনো নয়'-ই ভালো।",
      },
    ],
    receive: [
      { en: "Term discussions with advisor support", bn: "অ্যাডভাইজর-সহায়তায় শর্তের আলোচনা" },
      { en: "A structured data room that survives scrutiny", bn: "যাচাই সইবে এমন সুসংগঠিত ডেটা রুম" },
      { en: "Documentation reviewed before signing", bn: "সইয়ের আগে পর্যালোচিত ডকুমেন্টেশন" },
      { en: "Honest counsel — even if it's 'walk away'", bn: "সৎ পরামর্শ — এমনকি 'সরে দাঁড়ান' হলেও" },
    ],
    duration: {
      en: "Every deal sets its own pace — typically a few weeks to a couple of months of discussion. Nothing in our process exists to rush you.",
      bn: "প্রতিটি ডিল নিজের গতিতে চলে — সাধারণত কয়েক সপ্তাহ থেকে এক-দেড় মাস আলোচনা। আমাদের প্রক্রিয়ার কোথাও তাড়াহুড়ার জায়গা নেই।",
    },
    prepare: [
      { en: "Your questions, written and prioritized", bn: "আপনার প্রশ্ন — লিখিত ও অগ্রাধিকারক্রমে" },
      { en: "Your lawyer or accountant, when terms get serious", bn: "শর্ত জটিল হলে আপনার আইনজীবী বা অ্যাকাউন্ট্যান্ট" },
      { en: "Patience for diligence on both sides", bn: "দুই পক্ষের যাচাই-বাছাইয়ের জন্য ধৈর্য" },
    ],
  },
};

const T = {
  heroEyebrow: { en: "THE PROCESS", bn: "প্রক্রিয়া" } as const,
  heroBadge: (n: number) =>
    ({
      en: `${n} steps · both sides of the table`,
      bn: `${bnNum(n)}টি ধাপ · টেবিলের দুই পক্ষের জন্যই`,
    }) as const,
  heroCopy: (n: number) =>
    ({
      en: `${n} transparent steps take a business from our first conversation to a funded introduction — no step skipped, no fact taken on faith.`,
      bn: `${bnNum(n)}টি স্বচ্ছ ধাপে একটি ব্যবসা আমাদের প্রথম কথোপকথন থেকে বিনিয়োগের পরিচয় পর্যন্ত পৌঁছায় — কোনো ধাপ বাদ নেই, কোনো তথ্য অনুমানে নয়।`,
    }) as const,
  stepsEyebrow: { en: "STEP BY STEP", bn: "ধাপে ধাপে" } as const,
  stepsCopy: {
    en: "Every step ends with something you can read: a signed NDA, a verified fact-pack, a face-to-face meeting, and a structured introduction with the paperwork to match.",
    bn: "প্রতিটি ধাপ শেষ হয় পড়ার মতো কিছুতে: সই করা NDA, যাচাইকৃত ফ্যাক্ট-প্যাক, সরাসরি বৈঠক, আর ডকুমেন্টসহ সাজানো পরিচয়।",
  } as const,
  readStep: { en: "Read the step in detail", bn: "ধাপটি বিস্তারিত পড়ুন" } as const,
  stepLabel: (n: string) =>
    ({
      en: `Step ${n}`,
      bn: `ধাপ ${bnNum(n)}`,
    }) as const,
  ctaTitle: { en: "Which step are you on?", bn: "আপনি এখন কোন ধাপে?" } as const,
  ctaCopy: {
    en: "Investors and founders both start at step one — a ten-minute application. Start yours, or talk to an advisor first.",
    bn: "বিনিয়োগকারী আর উদ্যোক্তা দুই পক্ষেরই শুরু এক নম্বর ধাপে — দশ মিনিটের আবেদনে। শুরু করুন, বা আগে অ্যাডভাইজারের সাথে কথা বলুন।",
  } as const,
  ctaPrimary: { en: "Start your application", bn: "আবেদন শুরু করুন" } as const,
  ctaSecondary: { en: "See the vetting standard", bn: "যাচাই মানদণ্ড দেখুন" } as const,
  /* step detail page */
  whatTitle: { en: "What happens in this step", bn: "এই ধাপে যা ঘটে" } as const,
  receiveTitle: { en: "What you receive", bn: "আপনি যা পাবেন" } as const,
  durationTitle: { en: "How long it takes", bn: "কত সময় লাগে" } as const,
  prepareTitle: { en: "What to prepare", bn: "কী প্রস্তুত রাখবেন" } as const,
  prevStep: { en: "Previous step", bn: "পূর্ববর্তী ধাপ" } as const,
  nextStep: { en: "Next step", bn: "পরবর্তী ধাপ" } as const,
  allSteps: { en: "All steps", bn: "সব ধাপ" } as const,
  stepsNav: { en: "Step navigation", bn: "ধাপ নেভিগেশন" } as const,
};

export default function HowPage({ detail }: { detail: string | null }) {
  const idx = detail ? SLUGS.indexOf(detail as (typeof SLUGS)[number]) : -1;
  if (detail) {
    if (idx < 0) return <PageNotFound page={detail} />;
    return <StepDetail slugIdx={idx} />;
  }
  return <Landing />;
}

/* ── Landing: vertical timeline ─────────────────────────────────────── */

function Landing() {
  const { t, lang } = useLanguage();
  const n = HOW.steps.length;

  return (
    <>
      <PageHero
        crumbs={[{ label: { en: "How It Works", bn: "কীভাবে কাজ করে" } }]}
        eyebrow={T.heroEyebrow}
        title={HOW.title}
        copy={T.heroCopy(n)}
        image="/images/page-how.png"
        imageAlt={t({ en: "A team mapping a process on a whiteboard", bn: "হোয়াইটবোর্ডে প্রক্রিয়া আঁকছে একটি টিম" })}
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-nx-cyan-300/40 bg-nx-cyan-500/10 px-3.5 py-1.5 text-[12px] font-bold text-nx-cyan-300">
            <ListChecks className="h-3.5 w-3.5" aria-hidden="true" />
            {t(T.heroBadge(n))}
          </span>
        }
      />

      <PageBody>
        <Head id="how-steps" eyebrow={T.stepsEyebrow} title={HOW.title} copy={T.stepsCopy} center />
        <ol className="relative mx-auto mt-12 max-w-3xl">
          {/* vertical rail */}
          <span
            aria-hidden="true"
            className="absolute bottom-8 left-[23px] top-8 w-px bg-gradient-to-b from-nx-navy-200 via-nx-cyan-300 to-nx-navy-200 md:left-[27px]"
          />
          {HOW.steps.map((step, i) => (
            <motion.li
              key={SLUGS[i]}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative flex gap-5 pb-6 last:pb-0 md:gap-7"
            >
              <span className="nx-num relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-nx-navy-900 text-sm font-extrabold text-nx-cyan-400 ring-8 ring-white md:h-14 md:w-14 md:text-base">
                {lang === "bn" ? bnNum(step.n) : step.n}
              </span>
              <div className="flex-1 rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)] transition-all duration-300 hover:border-nx-navy-300 hover:shadow-[0_22px_44px_-18px_rgba(6,31,74,0.28)] md:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-extrabold text-nx-navy-900">{t(step.title)}</h3>
                  <span className="text-[12px] font-bold tracking-wide text-nx-navy-400 uppercase">
                    {t(T.stepLabel(step.n))}
                  </span>
                </div>
                <p className="mt-2.5 leading-relaxed text-slate-600">{t(step.desc)}</p>
                <button
                  onClick={() => navigateTo("how", SLUGS[i])}
                  className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-nx-cyan-200 bg-nx-cyan-50/70 px-4 py-2 text-[13px] font-bold text-nx-cyan-700 transition-colors hover:border-nx-cyan-400 hover:bg-nx-cyan-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
                >
                  {t(T.readStep)}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </motion.li>
          ))}
        </ol>

        {/* what we don't do — same honesty block as the home section */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="mx-auto mt-12 max-w-3xl rounded-3xl border border-dashed border-nx-warn/50 bg-nx-warn-bg/60 p-6 md:p-7"
        >
          <h2 className="flex items-center gap-2 text-base font-extrabold text-nx-navy-900">
            <XCircle className="h-5 w-5 text-nx-warn" aria-hidden="true" />
            {t(HOW.notDoTitle)}
          </h2>
          <ul className="mt-3 grid gap-2 md:grid-cols-3">
            {HOW.notDo.map((d) => (
              <li key={d.en} className="flex items-start gap-2 text-sm leading-relaxed text-nx-ink/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nx-warn" aria-hidden="true" />
                {t(d)}
              </li>
            ))}
          </ul>
        </motion.div>
      </PageBody>

      <CtaBand
        title={T.ctaTitle}
        copy={T.ctaCopy}
        actions={
          <>
            <CyanButton onClick={() => navigateTo("get-started")}>{t(T.ctaPrimary)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("vetting")}>
              {t(T.ctaSecondary)}
            </OutlineLightButton>
          </>
        }
      />
    </>
  );
}

/* ── Step details page ───────────────────────────────────────────────── */

function StepDetail({ slugIdx }: { slugIdx: number }) {
  const { t, lang } = useLanguage();
  const openInvestor = useDialogStore((s) => s.openInvestor);
  const step = HOW.steps[slugIdx];
  const detail = STEP_DETAIL[SLUGS[slugIdx]];
  const prev = slugIdx > 0 ? slugIdx - 1 : null;
  const next = slugIdx < HOW.steps.length - 1 ? slugIdx + 1 : null;
  const n = slugIdx + 1;

  return (
    <>
      <DetailHero
        crumbs={[
          { label: { en: "How It Works", bn: "কীভাবে কাজ করে" }, page: "how" },
          { label: step.title },
        ]}
        eyebrow={{ en: `STEP ${step.n}`, bn: `ধাপ ${bnNum(step.n)}` }}
        title={step.title}
        copy={detail.heroCopy}
        image={detail.image}
        imageAlt={t({ en: `${t(step.title)} — step ${step.n} of the NexFund process`, bn: `নেক্সফান্ড প্রক্রিয়ার ${bnNum(step.n)} নম্বর ধাপ — ${t(step.title)}` })}
        meta={
          <>
            <MetaChip icon={<ClipboardList className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t(detail.whoChip)}
            </MetaChip>
            <MetaChip icon={<Timer className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t(detail.timeChip)}
            </MetaChip>
            <MetaChip icon={<PackageCheck className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t(detail.outcomeChip)}
            </MetaChip>
          </>
        }
        actions={
          <>
            <CyanButton onClick={() => openInvestor()}>{t(T.ctaPrimary)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("how")}>{t(T.allSteps)}</OutlineLightButton>
          </>
        }
      />

      <PageBody className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          {/* what happens */}
          <section aria-labelledby="step-what">
            <Head id="step-what" eyebrow={{ en: `STEP ${step.n}`, bn: `ধাপ ${bnNum(step.n)}` }} title={T.whatTitle} />
            {detail.whatHappens.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="mt-5 leading-relaxed text-slate-600"
              >
                {t(p)}
              </motion.p>
            ))}
          </section>

          {/* receive / duration / prepare */}
          <section aria-label={t(T.receiveTitle)}>
            <div className="grid gap-5 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)] md:col-span-2 md:p-7"
              >
                <h2 className="flex items-center gap-2 text-lg font-extrabold text-nx-navy-900">
                  <PackageCheck className="h-5 w-5 text-nx-verified" aria-hidden="true" />
                  {t(T.receiveTitle)}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {detail.receive.map((r) => (
                    <li key={r.en} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nx-cyan-500" aria-hidden="true" />
                      {t(r)}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="rounded-3xl bg-nx-navy-950 nx-navy-grid p-6 text-white md:p-7"
              >
                <h2 className="flex items-center gap-2 text-lg font-extrabold text-white">
                  <Hourglass className="h-5 w-5 text-nx-cyan-400" aria-hidden="true" />
                  {t(T.durationTitle)}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/75">{t(detail.duration)}</p>
                <p className="mt-4 flex items-center gap-2 text-[12px] font-bold text-nx-cyan-300">
                  <Timer className="h-3.5 w-3.5" aria-hidden="true" />
                  {t(detail.timeChip)}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
                className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)] md:p-7"
              >
                <h2 className="flex items-center gap-2 text-lg font-extrabold text-nx-navy-900">
                  <ClipboardList className="h-5 w-5 text-nx-navy-600" aria-hidden="true" />
                  {t(T.prepareTitle)}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {detail.prepare.map((p) => (
                    <li key={p.en} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nx-navy-400" aria-hidden="true" />
                      {t(p)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>

          {/* step index pills */}
          <nav aria-label={t(T.allSteps)} className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[12px] font-bold tracking-wide text-nx-navy-400 uppercase">
              {t(T.allSteps)}:
            </span>
            {HOW.steps.map((s, i) => (
              <button
                key={SLUGS[i]}
                onClick={() => navigateTo("how", SLUGS[i])}
                aria-current={i === slugIdx ? "step" : undefined}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-[13px] font-bold transition-colors",
                  i === slugIdx
                    ? "border-nx-navy-700 bg-nx-navy-700 text-white"
                    : "border-nx-navy-200 bg-white text-nx-navy-700 hover:border-nx-navy-400"
                )}
              >
                <span className="nx-num">{lang === "bn" ? bnNum(s.n) : s.n}</span> · {t(s.title)}
              </button>
            ))}
          </nav>

          {/* prev / next */}
          <nav
            aria-label={t(T.stepsNav)}
            className="grid gap-4 border-t border-nx-navy-100 pt-8 sm:grid-cols-2"
          >
            {prev !== null ? (
              <button
                onClick={() => navigateTo("how", SLUGS[prev])}
                className="group rounded-3xl border border-nx-navy-100 bg-white p-5 text-left transition-all hover:border-nx-navy-300 hover:shadow-[0_14px_30px_-16px_rgba(6,31,74,0.2)]"
              >
                <span className="flex items-center gap-1.5 text-xs font-bold text-nx-navy-500">
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  {t(T.prevStep)}
                </span>
                <span className="mt-1.5 block font-extrabold text-nx-navy-900 group-hover:text-nx-navy-700">
                  {lang === "bn" ? bnNum(HOW.steps[prev].n) : HOW.steps[prev].n} · {t(HOW.steps[prev].title)}
                </span>
              </button>
            ) : (
              <span aria-hidden="true" />
            )}
            {next !== null && (
              <button
                onClick={() => navigateTo("how", SLUGS[next])}
                className="group rounded-3xl border border-nx-navy-100 bg-white p-5 text-right transition-all hover:border-nx-navy-300 hover:shadow-[0_14px_30px_-16px_rgba(6,31,74,0.2)] sm:col-start-2"
              >
                <span className="flex items-center justify-end gap-1.5 text-xs font-bold text-nx-navy-500">
                  {t(T.nextStep)}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="mt-1.5 block font-extrabold text-nx-navy-900 group-hover:text-nx-navy-700">
                  {lang === "bn" ? bnNum(HOW.steps[next].n) : HOW.steps[next].n} · {t(HOW.steps[next].title)}
                </span>
              </button>
            )}
          </nav>
        </div>
      </PageBody>

      <CtaBand
        title={T.ctaTitle}
        copy={T.ctaCopy}
        actions={
          <>
            <CyanButton onClick={() => openInvestor()}>{t(T.ctaPrimary)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("contact")}>
              {lang === "bn" ? "কথা বলুন" : "Talk to us"}
            </OutlineLightButton>
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
