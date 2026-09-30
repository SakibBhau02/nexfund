"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Banknote,
  BookOpen,
  Briefcase,
  Building2,
  Calculator,
  CalendarCheck,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  Database,
  FileText,
  FlaskConical,
  Handshake,
  HelpCircle,
  KeyRound,
  Lightbulb,
  Link2,
  ListChecks,
  Mail,
  MapPin,
  MessageCircle,
  Percent,
  PiggyBank,
  RefreshCw,
  ScrollText,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, type L, type Lang } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { navigateTo } from "@/lib/page-router";
import { bnNum, formatTk, formatTkRange } from "@/lib/format";
import { IMPACT, VETTING } from "@/lib/content";
import { AnimatedNumber } from "../animated-number";
import { Skeleton } from "@/components/ui/skeleton";
import {
  PageHero,
  PageBody,
  CtaBand,
  CyanButton,
  NavyButton,
  OutlineLightButton,
  DetailHero,
  MetaChip,
  PageNotFound,
} from "./shell";

/**
 * R11 Impact page — live platform stats + curated milestones + methodology.
 *   #p/impact               → landing (live band, market pipeline, milestones,
 *                              knowledge output, methodology preview, CTA)
 *   #p/impact/methodology   → how-we-count detail page (6 rules + Q&A)
 * Data: /api/impact (read-only aggregates — counts computed at request time,
 * curated milestones verified quarterly; no PII ever).
 */

/* ── Local DTO (mirrors the API contract; server code never imported) ─── */

type LakhRange = { min: number; max: number };

type ImpactDTO = {
  live: {
    listings: {
      count: number;
      seekingLakh: LakhRange;
      sectors: { key: string; bn: string; count: number; seekingLakh: LakhRange }[];
      stages: { stage: number; count: number }[];
      locations: { en: string; bn: string; count: number }[];
    };
    investors: {
      total: number;
      byStatus: { new: number; verified: number; active: number };
      appetiteLakh: LakhRange;
      appetiteInvestors: number;
    };
    readinessChecks: number;
    conversations: number;
    interests: number;
    newsletter: number;
  };
  milestones: { key: string; value: number; note?: string; updatedAt: string }[];
  content: {
    insights: number;
    glossaryTerms: number;
    faqItems: number;
    services: number;
    charterPromises: number;
    vettingPillars: number;
  };
  generatedAt: string;
};

/* ── Bilingual strings ───────────────────────────────────────────────── */

const T = {
  getStarted: { en: "Get started", bn: "শুরু করুন" } as L,
  browseOpps: { en: "Browse opportunities", bn: "সুযোগসমূহ দেখুন" } as L,
  loading: { en: "Loading live figures…", bn: "লাইভ সংখ্যা লোড হচ্ছে…" } as L,
  errorTitle: { en: "Couldn't load the numbers", bn: "সংখ্যাগুলো লোড করা যায়নি" } as L,
  errorSub: {
    en: "Please retry — our live-stat service hiccuped.",
    bn: "আবার চেষ্টা করুন — লাইভ-স্ট্যাট সার্ভিসে সাময়িক সমস্যা হয়েছে।",
  } as L,
  retry: { en: "Retry", bn: "আবার চেষ্টা করুন" } as L,

  /* live band */
  asOf: { en: "Computed", bn: "সর্বশেষ গণনা" } as L,
  statListings: { en: "Verified live listings", bn: "যাচাইকৃত লাইভ তালিকা" } as L,
  statListingsSub: { en: "passed the five-pillar standard", bn: "পাঁচ-স্তম্ভের মানদণ্ড পাস করেছে" } as L,
  statSeeking: { en: "Capital seeking", bn: "সংগ্রহের লক্ষ্য মূলধন" } as L,
  statSeekingSub: { en: "sum of live listing ranges", bn: "লাইভ তালিকার পরিসরের যোগফল" } as L,
  statInvestors: { en: "Registered investors", bn: "নিবন্ধিত বিনিয়োগকারী" } as L,
  statAppetite: { en: "Stated appetite", bn: "ঘোষিত বিনিয়োগ-মন" } as L,
  intentChip: { en: "intent, not deposits", bn: "ইচ্ছার প্রকাশ, আমানত নয়" } as L,
  statReadiness: { en: "Readiness checks", bn: "প্রস্তুতি-যাচাই" } as L,
  statReadinessSub: { en: "the 3-minute founder quiz", bn: "৩ মিনিটের প্রতিষ্ঠাতা-কুইজ" } as L,
  statConversations: { en: "Conversations started", bn: "শুরু হওয়া আলাপ" } as L,
  statConversationsSub: { en: "inquiries via the contact form", bn: "যোগাযোগ ফর্মে আসা অনুরোধ" } as L,
  interestsChip: (n: number, lang: Lang) =>
    lang === "bn"
      ? `${bnNum(n)}টি নিবন্ধিত আগ্রহ`
      : n === 1
        ? "1 interest on listings"
        : `${n} interests on listings`,
  newsletterChip: (n: number, lang: Lang) =>
    lang === "bn" ? `${bnNum(n)} জন নিউজলেটার সদস্য` : `${n} newsletter subscribers`,
  statedBy: (n: number, lang: Lang) =>
    lang === "bn" ? `${bnNum(n)} জনের ঘোষিত পরিসর` : `stated by ${n} investors`,

  /* market pipeline */
  pipeEyebrow: { en: "MARKET PIPELINE", bn: "মার্কেট পাইপলাইন" } as L,
  pipeTitle: { en: "Where the capital is heading.", bn: "পুঁজি কোথায় যাচ্ছে।" } as L,
  pipeSub: {
    en: "Sector mix, verification depth and geography of the live listings — same database, same moment, no rounding up.",
    bn: "লাইভ তালিকার খাত-মিশ্রণ, যাচাইয়ের গভীরতা ও ভৌগোলিক অবস্থান — একই ডেটাবেজ, একই মুহূর্ত, কোনো বাড়তি নয়।",
  } as L,
  bySector: { en: "By sector", bn: "খাত অনুযায়ী" } as L,
  barNote: {
    en: "Bar width shows each sector's share of the listed seeking range.",
    bn: "বারের প্রস্থ = তালিকাভুক্ত সংগ্রহ-পরিসরে খাতটির অংশ।",
  } as L,
  byStage: { en: "Verification depth", bn: "যাচাইয়ের গভীরতা" } as L,
  stageNote: {
    en: "Each step is one of the five vetting pillars; counts are live listings currently at that depth.",
    bn: "প্রতিটি ধাপ পাঁচ-স্তম্ভ যাচাইয়ের একটি; সংখ্যায় ওই গভীরতায় থাকা লাইভ তালিকা।",
  } as L,
  stageStep: (n: number, lang: Lang) => (lang === "bn" ? `ধাপ ${bnNum(n)}` : `Stage ${n}`),
  listingCount: (n: number, lang: Lang) =>
    lang === "bn" ? `${bnNum(n)}টি তালিকা` : n === 1 ? "1 listing" : `${n} listings`,
  locationsHead: { en: "Locations", bn: "অবস্থান" } as L,
  emptyNote: {
    en: "Nothing live in this view right now — the number stays zero, we don't invent one.",
    bn: "এই ভিউতে এখন কিছু লাইভ নেই — সংখ্যাটি শূন্যই থাকে, বানানো হয় না।",
  } as L,

  /* milestones */
  verifiedQuarterly: { en: "Verified quarterly", bn: "প্রতি ত্রৈমাসিকে যাচাইকৃত" } as L,
  lastVerified: { en: "last", bn: "সর্বশেষ" } as L,
  hoursUnit: { en: "hrs", bn: "ঘণ্টা" } as L,
  unknownMilestone: { en: "Platform milestone", bn: "প্ল্যাটফর্ম মাইলফলক" } as L,

  /* knowledge output */
  openLabel: { en: "Open", bn: "দেখুন" } as L,

  /* methodology preview + detail */
  methodPreviewCopy: {
    en: "The first three rules in brief — the full methodology, all six rules with worked examples and the questions we're asked most live one click deeper.",
    bn: "প্রথম তিনটি নিয়ম সংক্ষেপে — ব্যাখ্যাসহ পুরো ছয়টি নিয়ম আর সবচেয়ে বেশি যেসব প্রশ্ন পাই, তার উত্তর এক ক্লিকের গভীরে।",
  } as L,
  fullMethodBtn: { en: "How we count — full methodology", bn: "কীভাবে গোনা হয় — পুরো পদ্ধতি" } as L,
  mDetailCopy: {
    en: "The six rules below explain where every figure on the impact page comes from — each with a worked example from today's numbers, plus straight answers to the questions we're asked most.",
    bn: "নিচের ছয়টি নিয়ম ব্যাখ্যা করে ইমপ্যাক্ট পাতার প্রতিটি সংখ্যা কোথা থেকে এসেছে — প্রতিটির সাথে আজকের সংখ্যা থেকে একটি করে হাতে-গোনা উদাহরণ, আর সবচেয়ে বেশি যেসব প্রশ্ন পাই তার সরাসরি উত্তর।",
  } as L,
  sixRules: { en: "The six rules", bn: "ছয়টি নিয়ম" } as L,
  rulesSub: {
    en: "What each rule means — and what it looks like with the live numbers.",
    bn: "প্রতিটি নিয়মের মানে — আর লাইভ সংখ্যায় সেটি দেখতে কেমন।",
  } as L,
  ruleLabel: (n: number, lang: Lang) => (lang === "bn" ? `নিয়ম ${bnNum(n)}` : `Rule ${n}`),
  inPractice: { en: "IN PRACTICE", bn: "বাস্তবে" } as L,
  qaEyebrow: { en: "STRAIGHT ANSWERS", bn: "সরাসরি উত্তর" } as L,
  qaTitle: { en: "Questions about our numbers", bn: "আমাদের সংখ্যা নিয়ে প্রশ্ন" } as L,
  guaranteesTitle: { en: "The guarantees", bn: "নিশ্চয়তাসমূহ" } as L,
  backToImpact: { en: "Back to Impact", bn: "ইমপ্যাক্টে ফিরুন" } as L,
  metaLive: { en: "live counts computed on request", bn: "লাইভ সংখ্যা অনুরোধের মুহূর্তে গণনা" } as L,
  metaQuarterly: { en: "milestones verified quarterly", bn: "মাইলফলক ত্রৈমাসিকভাবে যাচাইকৃত" } as L,
  metaNoReturns: { en: "no returns published", bn: "কোনো মুনাফার হার প্রকাশিত নয়" } as L,

  /* CTA */
  ctaInvestor: { en: "Register as an investor", bn: "বিনিয়োগকারী হিসেবে নিবন্ধন" } as L,
  ctaTalk: { en: "Talk to us", bn: "কথা বলুন" } as L,
};

/* ── Milestone metadata (handwritten BN notes; API notes are EN-only) ── */

const MILESTONE_ORDER = [
  "introduced_lakh",
  "rooms_opened",
  "matches_made",
  "businesses_onboarded",
  "vetting_hours",
] as const;

const MILESTONE_META: Record<string, { icon: LucideIcon; title: L; noteBn?: string }> = {
  introduced_lakh: {
    icon: Handshake,
    title: { en: "Capital introduced", bn: "পরিচিত মূলধন" },
    noteBn:
      "২০২৫-এর প্রথম ত্রৈমাসিক থেকে চলমান আলাপগুলোতে পরিচিত মোট টিকেট-সাইজ (যেসব পরিচয়ে উভয় পক্ষ নিশ্চিত হয়েছে)",
  },
  rooms_opened: {
    icon: KeyRound,
    title: { en: "Data rooms opened", bn: "খোলা ডেটা রুম" },
    noteBn: "নিবন্ধিত বিনিয়োগকারীদের জন্য খোলা এনডিএ-সুরক্ষিত ডেটা রুম",
  },
  matches_made: {
    icon: Link2,
    title: { en: "Matches made", bn: "সম্পন্ন ম্যাচ" },
    noteBn: "এমন বিনিয়োগকারী–ব্যবসা পরিচয়, যেখানে কল প্রকৃতভাবে হয়েছে",
  },
  businesses_onboarded: {
    icon: Building2,
    title: { en: "Businesses onboarded", bn: "অনবোর্ডেড ব্যবসা" },
    noteBn: "যাচাইতে প্রবেশ করা ব্যবসা — এখনো তালিকাভুক্ত নয় এমনও আছে; ৩টি লাইভ তালিকা পাঁচ-স্তম্ভের সবগুলো পাস করেছে",
  },
  vetting_hours: {
    icon: Clock3,
    title: { en: "Analyst-hours per review", bn: "গড় পর্যালোচনা-ঘণ্টা" },
    noteBn: "সম্পূর্ণ পাঁচ-স্তম্ভ পর্যালোচনায় ব্যয়িত গড় অ্যানালিস্ট-ঘণ্টা",
  },
};

/* Methodology point icons (shared by preview + detail) */
const METHOD_ICONS: LucideIcon[] = [Database, Calculator, PiggyBank, CalendarCheck, Percent, FlaskConical];

/* Knowledge-output link tiles */
const KNOWLEDGE: { key: keyof ImpactDTO["content"]; icon: LucideIcon; label: L; page: string }[] = [
  { key: "insights", icon: Lightbulb, label: { en: "Insight guides", bn: "ইনসাইট গাইড" }, page: "insights" },
  { key: "glossaryTerms", icon: BookOpen, label: { en: "Glossary terms", bn: "শব্দকোষের পরিভাষা" }, page: "glossary" },
  { key: "faqItems", icon: HelpCircle, label: { en: "FAQ answers", bn: "প্রশ্নোত্তর" }, page: "faq" },
  { key: "services", icon: FileText, label: { en: "Advisory services", bn: "অ্যাডভাইজরি সেবা" }, page: "services" },
  { key: "charterPromises", icon: ScrollText, label: { en: "Charter promises", bn: "চার্টারের প্রতিশ্রুতি" }, page: "charter" },
  { key: "vettingPillars", icon: ListChecks, label: { en: "Vetting pillars", bn: "যাচাইয়ের স্তম্ভ" }, page: "vetting" },
];

/* Detail-page aside — the guarantees */
const GUARANTEES: { icon: LucideIcon; text: L }[] = [
  {
    icon: Database,
    text: {
      en: "Numbers can't be typed — every count is computed from the database at request time.",
      bn: "সংখ্যা হাতে টাইপ করা যায় না — প্রতিটি গণনা অনুরোধের মুহূর্তে ডেটাবেজ থেকে হয়।",
    },
  },
  {
    icon: ShieldCheck,
    text: {
      en: "No personal information is ever published — only aggregate counts, sums and ranges.",
      bn: "কোনো ব্যক্তিগত তথ্য কখনো প্রকাশ হয় না — শুধু সমষ্টিগত সংখ্যা, যোগফল ও পরিসর।",
    },
  },
  {
    icon: CalendarCheck,
    text: {
      en: "If a figure is ever wrong, the correction is published here — not buried.",
      bn: "কোনো সংখ্যা ভুল হলে সংশোধনটি এখানেই প্রকাশ হয় — চাপা দেওয়া হয় না।",
    },
  },
];

/* ── Format helpers ───────────────────────────────────────────────────── */

/** Bilingual timestamp for "as of" chips (bn digits via bn-BD locale + bnNum net). */
function fmtStamp(iso: string, lang: Lang): string {
  try {
    const s = new Intl.DateTimeFormat(lang === "bn" ? "bn-BD" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(iso));
    return lang === "bn"
      ? bnNum(s).replace(/\bAM\b/, "পূর্বাহ্ণ").replace(/\bPM\b/, "অপরাহ্ণ")
      : s;
  } catch {
    return lang === "bn" ? bnNum(new Date(iso).toISOString().slice(0, 10)) : new Date(iso).toISOString().slice(0, 10);
  }
}

/** Integer count-up format (Bangla digits in BN view). */
function intFmt(lang: Lang): (v: number) => string {
  return (v: number) => (lang === "bn" ? bnNum(Math.round(v)) : String(Math.round(v)));
}

/** Range count-up format — animates the low end; the spread rides along. */
function rangeFmt(min: number, max: number, lang: Lang): (v: number) => string {
  const spread = Math.max(0, Math.round(max) - Math.round(min));
  return (v: number) => formatTkRange(Math.round(v), Math.round(v) + spread, lang);
}

/** SectionHead look-alike that attaches the id to the h2 (aria-labelledby must resolve). */
function Head({
  id,
  eyebrow,
  title,
  copy,
  onNavy,
  center,
}: {
  id: string;
  eyebrow?: L | string;
  title: L | string;
  copy?: L | string;
  onNavy?: boolean;
  center?: boolean;
}) {
  const { t } = useLanguage();
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <p
          className={cn(
            "nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] uppercase",
            onNavy ? "text-nx-cyan-300" : "text-nx-navy-600",
          )}
        >
          {t(eyebrow)}
        </p>
      )}
      <h2
        id={id}
        className={cn("mt-3 text-2xl leading-tight font-extrabold md:text-[2rem]", onNavy ? "text-white" : "text-nx-navy-900")}
      >
        {t(title)}
      </h2>
      {copy && <p className={cn("mt-4 leading-relaxed", onNavy ? "text-white/70" : "text-slate-600")}>{t(copy)}</p>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
/* Page entry                                                            */
/* ══════════════════════════════════════════════════════════════════════ */

export default function ImpactPage({ detail }: { detail: string | null }) {
  const { data, isLoading, error, refetch } = useQuery<ImpactDTO>({
    queryKey: ["impact"],
    queryFn: async () => {
      const res = await fetch("/api/impact");
      if (!res.ok) throw new Error("Failed to load");
      return res.json();
    },
    staleTime: 30_000,
  });

  if (detail === "methodology") {
    return (
      <MethodologyView
        data={data ?? null}
        isLoading={isLoading}
        error={!!error}
        onRetry={() => refetch()}
      />
    );
  }
  if (detail) return <PageNotFound page={detail} />;

  return (
    <Landing
      data={data ?? null}
      isLoading={isLoading}
      error={!!error}
      onRetry={() => refetch()}
    />
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
/* Landing (#p/impact)                                                   */
/* ══════════════════════════════════════════════════════════════════════ */

function Landing({
  data,
  isLoading,
  error,
  onRetry,
}: {
  data: ImpactDTO | null;
  isLoading: boolean;
  error: boolean;
  onRetry: () => void;
}) {
  const { lang, t } = useLanguage();
  const openInvestor = useDialogStore((s) => s.openInvestor);

  return (
    <>
      <PageHero
        crumbs={[{ label: { en: "Impact", bn: "ইমপ্যাক্ট" } }]}
        eyebrow={IMPACT.hero.eyebrow}
        title={IMPACT.hero.title}
        copy={IMPACT.hero.copy}
        image="/images/page-impact.png"
        imageAlt={
          lang === "bn"
            ? "সন্ধ্যার ঢাকার ব্যবসায়িক এলাকা — এরিয়াল দৃশ্য"
            : "Dhaka business district at dusk — aerial view"
        }
        badge={
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-[12px] font-bold text-emerald-300">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t(IMPACT.hero.badge)}
          </span>
        }
        actions={
          <>
            <NavyButton onClick={() => navigateTo("get-started")}>{t(T.getStarted)}</NavyButton>
            <OutlineLightButton onClick={() => navigateTo("opportunities")}>
              {t(T.browseOpps)}
            </OutlineLightButton>
          </>
        }
      />

      {error ? (
        <PageBody>
          <ErrorPanel onRetry={onRetry} />
        </PageBody>
      ) : (
        <>
          <LiveBand data={data} loading={isLoading} />
          {isLoading ? (
            <PageBody>
              <BodySkeleton />
              <p className="sr-only" aria-live="polite">
                {t(T.loading)}
              </p>
            </PageBody>
          ) : data ? (
            <>
              <PageBody>
                <Pipeline data={data} />
              </PageBody>
              <MilestoneBand data={data} />
              <PageBody>
                <div className="space-y-16 md:space-y-20">
                  <Knowledge content={data.content} />
                  <MethodologyPreview />
                </div>
              </PageBody>
            </>
          ) : null}
        </>
      )}

      <CtaBand
        title={IMPACT.cta.title}
        copy={IMPACT.cta.copy}
        actions={
          <>
            <CyanButton onClick={() => openInvestor("investor")}>{t(T.ctaInvestor)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("contact")}>{t(T.ctaTalk)}</OutlineLightButton>
          </>
        }
      />
    </>
  );
}

/* ── Shared states (exemplar patterns) ────────────────────────────────── */

function ErrorPanel({ onRetry }: { onRetry: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="mx-auto max-w-lg rounded-3xl border border-nx-navy-100 bg-white p-10 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
        <AlertTriangle className="h-6 w-6" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-lg font-extrabold text-nx-navy-900">{t(T.errorTitle)}</h2>
      <p className="mt-2 text-sm text-slate-600">{t(T.errorSub)}</p>
      <button
        onClick={onRetry}
        className="mt-5 rounded-full bg-nx-navy-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-nx-navy-600"
      >
        {t(T.retry)}
      </button>
    </div>
  );
}

function BodySkeleton() {
  return (
    <div aria-hidden="true">
      <Skeleton className="nx-shimmer h-7 w-64" />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div className="space-y-6">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <div className="flex items-center justify-between">
                <Skeleton className="nx-shimmer h-4 w-28" />
                <Skeleton className="nx-shimmer h-4 w-32" />
              </div>
              <Skeleton className="nx-shimmer mt-2.5 h-2.5 w-full rounded-full" />
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="nx-shimmer h-9 w-9 rounded-full" />
              <Skeleton className="nx-shimmer h-4 flex-1" />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {[0, 1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="nx-shimmer h-48 w-full rounded-3xl" />
        ))}
      </div>
    </div>
  );
}

/* ── Live stats band (navy dashboard, right under the hero) ───────────── */

function NavyChip({ icon, children }: { icon?: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[12px] font-semibold text-white/75">
      {icon}
      {children}
    </span>
  );
}

function StatCard({
  icon,
  label,
  sub,
  value,
  format,
  loading,
  index,
}: {
  icon: ReactNode;
  label: string;
  sub?: ReactNode;
  value: number;
  format: (v: number) => string;
  loading: boolean;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-nx-cyan-400/40 hover:bg-white/[0.07] md:p-6"
    >
      <span
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-nx-cyan-500/15 text-nx-cyan-300"
        aria-hidden="true"
      >
        {icon}
      </span>
      <div className="relative mt-5">
        <p
          className={cn(
            "nx-num text-[1.7rem] leading-none font-extrabold text-white md:text-[1.9rem]",
            loading && "opacity-0",
          )}
        >
          <AnimatedNumber value={value} format={format} />
        </p>
        {loading && <Skeleton className="nx-shimmer absolute inset-y-0 left-0 h-9 w-2/3" />}
      </div>
      <p className="mt-2.5 text-sm font-semibold text-white/70">{label}</p>
      {loading ? (
        <Skeleton className="nx-shimmer mt-3 h-3 w-1/2" />
      ) : (
        sub
      )}
    </motion.article>
  );
}

function LiveBand({ data, loading }: { data: ImpactDTO | null; loading: boolean }) {
  const { lang, t } = useLanguage();
  const listings = data?.live.listings;
  const investors = data?.live.investors;
  const byStatus = investors?.byStatus;

  return (
    <section
      aria-labelledby="imp-live-head"
      className="relative overflow-hidden border-t border-white/[0.06] bg-nx-navy-950 nx-navy-grid"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-nx-cyan-500/[0.10] blur-3xl"
      />
      <div className="relative mx-auto max-w-[1200px] px-5 py-14 md:px-6 md:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Head
            id="imp-live-head"
            onNavy
            eyebrow={IMPACT.liveSection.eyebrow}
            title={IMPACT.liveSection.title}
            copy={IMPACT.liveSection.sub}
          />
          <div className="flex flex-wrap items-center gap-2" aria-busy={loading}>
            {loading || !data ? (
              <>
                <Skeleton className="nx-shimmer h-8 w-48" />
                <Skeleton className="nx-shimmer h-8 w-40" />
              </>
            ) : (
              <>
                <NavyChip icon={<RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />}>
                  {t(T.asOf)}: {fmtStamp(data.generatedAt, lang)}
                </NavyChip>
                <NavyChip icon={<Star className="h-3.5 w-3.5" aria-hidden="true" />}>
                  {T.interestsChip(data.live.interests, lang)}
                </NavyChip>
                <NavyChip icon={<Mail className="h-3.5 w-3.5" aria-hidden="true" />}>
                  {T.newsletterChip(data.live.newsletter, lang)}
                </NavyChip>
              </>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            index={0}
            loading={loading}
            icon={<Briefcase className="h-5 w-5" aria-hidden="true" />}
            label={t(T.statListings)}
            value={listings?.count ?? 0}
            format={intFmt(lang)}
            sub={<p className="mt-2.5 text-[12px] leading-relaxed text-white/65">{t(T.statListingsSub)}</p>}
          />
          <StatCard
            index={1}
            loading={loading}
            icon={<Banknote className="h-5 w-5" aria-hidden="true" />}
            label={t(T.statSeeking)}
            value={listings?.seekingLakh.min ?? 0}
            format={rangeFmt(listings?.seekingLakh.min ?? 0, listings?.seekingLakh.max ?? 0, lang)}
            sub={<p className="mt-2.5 text-[12px] leading-relaxed text-white/65">{t(T.statSeekingSub)}</p>}
          />
          <StatCard
            index={2}
            loading={loading}
            icon={<Users className="h-5 w-5" aria-hidden="true" />}
            label={t(T.statInvestors)}
            value={investors?.total ?? 0}
            format={intFmt(lang)}
            sub={
              <p className="mt-2.5 text-[12px] leading-relaxed text-white/65">
                {lang === "bn"
                  ? `${bnNum(byStatus?.new ?? 0)} নতুন · ${bnNum(byStatus?.verified ?? 0)} যাচাইকৃত · ${bnNum(byStatus?.active ?? 0)} সক্রিয়`
                  : `${byStatus?.new ?? 0} new · ${byStatus?.verified ?? 0} verified · ${byStatus?.active ?? 0} active`}
              </p>
            }
          />
          <StatCard
            index={3}
            loading={loading}
            icon={<TrendingUp className="h-5 w-5" aria-hidden="true" />}
            label={t(T.statAppetite)}
            value={investors?.appetiteLakh.min ?? 0}
            format={rangeFmt(
              investors?.appetiteLakh.min ?? 0,
              investors?.appetiteLakh.max ?? 0,
              lang,
            )}
            sub={
              <>
                <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-300/10 px-2.5 py-1 text-[11px] font-bold text-amber-200">
                  {t(T.intentChip)}
                </span>
                <p className="mt-2 text-[12px] leading-relaxed text-white/65">
                  {T.statedBy(investors?.appetiteInvestors ?? 0, lang)}
                </p>
              </>
            }
          />
          <StatCard
            index={4}
            loading={loading}
            icon={<ClipboardCheck className="h-5 w-5" aria-hidden="true" />}
            label={t(T.statReadiness)}
            value={data?.live.readinessChecks ?? 0}
            format={intFmt(lang)}
            sub={<p className="mt-2.5 text-[12px] leading-relaxed text-white/65">{t(T.statReadinessSub)}</p>}
          />
          <StatCard
            index={5}
            loading={loading}
            icon={<MessageCircle className="h-5 w-5" aria-hidden="true" />}
            label={t(T.statConversations)}
            value={data?.live.conversations ?? 0}
            format={intFmt(lang)}
            sub={<p className="mt-2.5 text-[12px] leading-relaxed text-white/65">{t(T.statConversationsSub)}</p>}
          />
        </div>
      </div>
    </section>
  );
}

/* ── Market pipeline (sector bars · stage depth · locations) ──────────── */

function Pipeline({ data }: { data: ImpactDTO }) {
  const { lang, t } = useLanguage();
  const sectors = data.live.listings.sectors;
  const maxSec = Math.max(1, ...sectors.map((s) => s.seekingLakh.max));
  const stageMap = new Map(data.live.listings.stages.map((s) => [s.stage, s.count]));
  const subHead = "text-[12px] font-extrabold tracking-[0.16em] text-nx-navy-500 uppercase";

  return (
    <section aria-labelledby="imp-pipeline-head">
      <Head id="imp-pipeline-head" eyebrow={T.pipeEyebrow} title={T.pipeTitle} copy={T.pipeSub} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        {/* sector bars */}
        <div>
          <h3 className={subHead}>{t(T.bySector)}</h3>
          {sectors.length === 0 ? (
            <p className="mt-5 text-sm leading-relaxed text-slate-500">{t(T.emptyNote)}</p>
          ) : (
            <div className="mt-6 space-y-6">
              {sectors.map((s, i) => (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-sm font-bold text-nx-navy-900">{lang === "bn" ? s.bn : s.key}</p>
                    <p className="nx-num text-sm font-bold text-nx-navy-700">
                      {formatTkRange(s.seekingLakh.min, s.seekingLakh.max, lang)}
                    </p>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-nx-navy-100">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-nx-navy-700 to-nx-cyan-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.round((s.seekingLakh.max / maxSec) * 100)}%` }}
                      transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs font-semibold text-nx-navy-500">
                    {T.listingCount(s.count, lang)}
                  </p>
                </motion.div>
              ))}
              <p className="pt-1 text-xs text-slate-500">{t(T.barNote)}</p>
            </div>
          )}
        </div>

        {/* verification depth */}
        <div>
          <h3 className={subHead}>{t(T.byStage)}</h3>
          <ol className="mt-6">
            {VETTING.stages.map((pillar, i) => {
              const st = i + 1;
              const count = stageMap.get(st) ?? 0;
              const active = count > 0;
              return (
                <motion.li
                  key={pillar.key}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  className="relative flex gap-4 pb-6 last:pb-0"
                >
                  {i < VETTING.stages.length - 1 && (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute top-10 left-[17px] h-[calc(100%-2.5rem)] w-px",
                        active ? "bg-nx-cyan-300" : "bg-nx-navy-100",
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-extrabold",
                      active
                        ? "border-nx-cyan-500 bg-nx-navy-700 text-white"
                        : "border-nx-navy-200 bg-white text-nx-navy-400",
                    )}
                  >
                    {lang === "bn" ? bnNum(st) : st}
                  </span>
                  <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-x-3 gap-y-1 pt-0.5">
                    <div className="min-w-0">
                      <p className="text-[10px] font-extrabold tracking-[0.14em] text-nx-navy-400 uppercase">
                        {T.stageStep(st, lang)}
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-nx-navy-900">{t(pillar.title)}</p>
                    </div>
                    <span
                      className={cn(
                        "nx-num inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[11px] font-bold",
                        active ? "bg-nx-navy-700 text-white" : "bg-nx-navy-100 text-nx-navy-500",
                      )}
                    >
                      {T.listingCount(count, lang)}
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </ol>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">{t(T.stageNote)}</p>
        </div>
      </div>

      {/* locations */}
      <div className="mt-12">
        <h3 className={subHead}>{t(T.locationsHead)}</h3>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {data.live.listings.locations.length === 0 ? (
            <p className="text-sm leading-relaxed text-slate-500">{t(T.emptyNote)}</p>
          ) : (
            data.live.listings.locations.map((loc) => (
              <span
                key={loc.en}
                className="inline-flex items-center gap-2 rounded-full border border-nx-navy-100 bg-white px-4 py-2 text-[13px] font-semibold text-nx-navy-800 shadow-[0_6px_16px_-10px_rgba(6,31,74,0.18)]"
              >
                <MapPin className="h-3.5 w-3.5 text-nx-cyan-600" aria-hidden="true" />
                {lang === "bn" ? loc.bn : loc.en}
                <span className="nx-num rounded-full bg-nx-navy-50 px-2 py-0.5 text-[11px] font-bold text-nx-navy-600">
                  {lang === "bn" ? `${bnNum(loc.count)}টি` : T.listingCount(loc.count, "en")}
                </span>
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Curated milestones band ──────────────────────────────────────────── */

function MilestoneBand({ data }: { data: ImpactDTO }) {
  const { lang, t } = useLanguage();
  const milestones = data.milestones;
  const known = MILESTONE_ORDER.map((k) => milestones.find((m) => m.key === k)).filter(
    (m): m is ImpactDTO["milestones"][number] => !!m,
  );
  const items = [
    ...known,
    ...milestones.filter((m) => !(MILESTONE_ORDER as readonly string[]).includes(m.key)),
  ];
  const lastVerified = milestones.reduce(
    (acc, m) => (m.updatedAt > acc ? m.updatedAt : acc),
    milestones[0]?.updatedAt ?? "",
  );

  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="imp-milestones-head"
      className="border-y border-nx-navy-100 bg-nx-navy-50"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-6 md:py-16">
        <Head
          id="imp-milestones-head"
          eyebrow={IMPACT.milestones.eyebrow}
          title={IMPACT.milestones.title}
          copy={IMPACT.milestones.sub}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {items.map((m, i) => {
            const meta = MILESTONE_META[m.key];
            const Icon = meta?.icon ?? Activity;
            const valueStr =
              m.key === "introduced_lakh"
                ? formatTk(m.value, lang)
                : m.key === "vetting_hours"
                  ? `${lang === "bn" ? bnNum(m.value) : m.value} ${t(T.hoursUnit)}`
                  : lang === "bn"
                    ? bnNum(m.value)
                    : String(m.value);
            const note =
              m.note === undefined
                ? undefined
                : lang === "bn"
                  ? (meta?.noteBn ?? m.note)
                  : m.note;
            return (
              <motion.article
                key={m.key}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                className="flex h-full flex-col rounded-3xl border border-nx-navy-100 bg-white p-5 shadow-[0_10px_30px_-18px_rgba(6,31,74,0.15)] transition-all hover:-translate-y-1 hover:shadow-[0_22px_44px_-18px_rgba(6,31,74,0.28)]"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-nx-navy-50 text-nx-navy-700"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <p className="nx-num mt-4 text-[1.65rem] leading-none font-extrabold text-nx-navy-900">
                  {valueStr}
                </p>
                <p className="mt-1.5 text-sm font-bold text-nx-navy-800">
                  {t(meta?.title ?? T.unknownMilestone)}
                </p>
                {note && (
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{note}</p>
                )}
              </motion.article>
            );
          })}
        </div>

        {/* footer: verified-quarterly chip + amber demo note (methodology point 6) */}
        <div className="mt-8 space-y-4">
          <div className="flex justify-center">
            <span className="inline-flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-nx-navy-200 bg-white px-4 py-2 text-[12px] font-bold text-nx-navy-700">
              <ShieldCheck className="h-3.5 w-3.5 text-nx-cyan-600" aria-hidden="true" />
              {t(T.verifiedQuarterly)}
              {lastVerified && (
                <span className="font-semibold text-nx-navy-500">
                  · {t(T.lastVerified)}: {fmtStamp(lastVerified, lang)}
                </span>
              )}
            </span>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-amber-300/70 bg-amber-50 p-4 md:p-5">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
            <div>
              <p className="text-sm font-extrabold text-amber-900">
                {t(IMPACT.methodology.points[5].title)}
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-amber-800">
                {t(IMPACT.methodology.points[5].copy)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Knowledge output (content.* link-cards) ──────────────────────────── */

function Knowledge({ content }: { content: ImpactDTO["content"] }) {
  const { lang, t } = useLanguage();
  return (
    <section aria-labelledby="imp-knowledge-head">
      <Head
        id="imp-knowledge-head"
        eyebrow={IMPACT.insightStats.eyebrow}
        title={IMPACT.insightStats.title}
        copy={IMPACT.insightStats.sub}
      />
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {KNOWLEDGE.map((k, i) => (
          <motion.button
            key={k.key}
            onClick={() => navigateTo(k.page)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
            className="group flex h-full flex-col rounded-3xl border border-nx-navy-100 bg-white p-4 text-left shadow-[0_10px_30px_-18px_rgba(6,31,74,0.15)] transition-all hover:-translate-y-1 hover:border-nx-navy-300 hover:shadow-[0_20px_40px_-18px_rgba(6,31,74,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-nx-cyan-50 text-nx-cyan-600"
              aria-hidden="true"
            >
              <k.icon className="h-4.5 w-4.5" />
            </span>
            <span className="nx-num mt-3 text-2xl font-extrabold text-nx-navy-900">
              {lang === "bn" ? bnNum(content[k.key]) : content[k.key]}
            </span>
            <span className="mt-0.5 text-[13px] font-bold text-nx-navy-700">{t(k.label)}</span>
            <span className="mt-2 inline-flex items-center gap-1 text-[12px] font-bold text-nx-cyan-600 transition-colors group-hover:text-nx-cyan-500">
              {t(T.openLabel)}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

/* ── Methodology preview (first 3 rules + link to detail) ────────────── */

function MethodologyPreview() {
  const { t } = useLanguage();
  const points = IMPACT.methodology.points.slice(0, 3);
  return (
    <section aria-labelledby="imp-method-head">
      <Head
        id="imp-method-head"
        eyebrow={IMPACT.methodology.eyebrow}
        title={IMPACT.methodology.title}
        copy={T.methodPreviewCopy}
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((p, i) => {
          const Icon = METHOD_ICONS[i];
          return (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              className="rounded-3xl border border-nx-navy-100 bg-white p-5 shadow-[0_10px_30px_-18px_rgba(6,31,74,0.15)]"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-nx-navy-50 text-nx-navy-700"
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-[15px] font-extrabold text-nx-navy-900">{t(p.title)}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{t(p.copy)}</p>
            </motion.article>
          );
        })}
        <motion.button
          onClick={() => navigateTo("impact", "methodology")}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.35 }}
          className="group flex h-full min-h-[180px] flex-col rounded-3xl border border-nx-navy-900 bg-nx-navy-950 nx-navy-grid p-5 text-left shadow-[0_16px_36px_-18px_rgba(4,22,51,0.6)] transition-all hover:-translate-y-1 hover:border-nx-cyan-400/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
        >
          <span className="flex items-center justify-between">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-nx-cyan-500/15 text-nx-cyan-300"
              aria-hidden="true"
            >
              <ListChecks className="h-5 w-5" />
            </span>
            <ArrowRight
              className="h-5 w-5 text-nx-cyan-300 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
          <span className="mt-4 text-[15px] font-extrabold text-white">{t(T.fullMethodBtn)}</span>
          <span className="mt-2 text-[13px] leading-relaxed text-white/75">
            {t(T.mDetailCopy)}
          </span>
        </motion.button>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
/* Methodology detail (#p/impact/methodology)                           */
/* ══════════════════════════════════════════════════════════════════════ */

function MethodologyView({
  data,
  isLoading,
  error,
  onRetry,
}: {
  data: ImpactDTO | null;
  isLoading: boolean;
  error: boolean;
  onRetry: () => void;
}) {
  const { lang, t } = useLanguage();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1200px] px-5 py-24 md:px-6">
        <Skeleton className="nx-shimmer h-8 w-1/2" />
        <Skeleton className="nx-shimmer mt-6 h-40 w-full rounded-3xl" />
        <Skeleton className="nx-shimmer mt-6 h-40 w-full rounded-3xl" />
        <p className="sr-only" aria-live="polite">
          {t(T.loading)}
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center md:px-6">
        <h1 className="text-2xl font-extrabold text-nx-navy-900">{t(T.errorTitle)}</h1>
        <p className="mt-3 text-slate-600">{t(T.errorSub)}</p>
        <button
          onClick={onRetry}
          className="mt-6 rounded-full bg-nx-navy-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-nx-navy-600"
        >
          {t(T.retry)}
        </button>
      </div>
    );
  }

  /* worked examples, computed from today's numbers */
  const listings = data.live.listings;
  const investors = data.live.investors;
  const spanMin = listings.sectors.length
    ? Math.min(...listings.sectors.map((s) => s.seekingLakh.min))
    : 0;
  const spanMax = listings.sectors.length
    ? Math.max(...listings.sectors.map((s) => s.seekingLakh.max))
    : 0;
  const ms = (key: string) => milestonesOf(data, key);
  const matches = ms("matches_made");
  const rooms = ms("rooms_opened");

  const examples: L[] = [
    {
      en: `The “${investors.total} registered investors” card is a live COUNT over the investor table — it recomputed the moment you opened the page.`,
      bn: `“${bnNum(investors.total)} জন নিবন্ধিত বিনিয়োগকারী” কার্ডটি investor টেবিলের ওপর চলা লাইভ COUNT — আপনি এই পাতাটি খোলার মুহূর্তেই সেটি আবার গণনা হয়েছে।`,
    },
    {
      en: `${listings.count} live listings, each seeking between ${formatTk(spanMin, "en")} and ${formatTk(spanMax, "en")}, sum to the ${formatTkRange(listings.seekingLakh.min, listings.seekingLakh.max, "en")} shown on the impact page.`,
      bn: `${bnNum(listings.count)}টি লাইভ তালিকার যাচাইকৃত পরিসর ${formatTk(spanMin, "bn")} থেকে ${formatTk(spanMax, "bn")} — যোগ করলেই ইমপ্যাক্ট পাতায় দেখানো ${formatTkRange(listings.seekingLakh.min, listings.seekingLakh.max, "bn")}।`,
    },
    {
      en: `Summing ${investors.appetiteInvestors} stated ticket preferences gives ${formatTkRange(investors.appetiteLakh.min, investors.appetiteLakh.max, "en")} — a signal of intent, never money on deposit.`,
      bn: `${bnNum(investors.appetiteInvestors)} জনের ঘোষিত টিকেট-পছন্দ যোগ করলে ${formatTkRange(investors.appetiteLakh.min, investors.appetiteLakh.max, "bn")} — ইচ্ছার সংকেত, জমা অর্থ কখনোই নয়।`,
    },
    {
      en: `${matches} matches and ${rooms} data rooms are logged the day they happen, then reconciled against source records every quarter.`,
      bn: `${bnNum(matches)}টি ম্যাচ ও ${bnNum(rooms)}টি ডেটা রুম ঘটার দিনই নথিভুক্ত হয়, তারপর প্রতি ত্রৈমাসিকে মূল রেকর্ডের সাথে মিলিয়ে দেখা হয়।`,
    },
    {
      en: `You can read how many introductions happened (${matches}) — never the returns those private contracts produced.`,
      bn: `কতটি পরিচয় হয়েছে (${bnNum(matches)}) তা পড়তে পারবেন — কিন্তু সেই ব্যক্তিগত চুক্তির মুনাফা কখনোই নয়।`,
    },
    {
      en: `In this deployment the listings and milestones are marked demo data — /api/impact counts them from the database all the same.`,
      bn: `এই ডিপ্লয়মেন্টে তালিকা ও মাইলফলকগুলো ডেমো হিসেবে চিহ্নিত — তবুও /api/impact সেগুলো ডেটাবেজ থেকেই গোনে।`,
    },
  ];

  const qa: { q: L; a: L }[] = [
    {
      q: { en: "Why don't you publish returns?", bn: "মুনাফার হার প্রকাশ করেন না কেন?" },
      a: {
        en: "Because we would have nothing honest to publish. Investments on NexFund are private contracts between an investor and a business — we run no fund and hold no money, so there is no 'portfolio performance' figure to report. And past results never promise future ones. We publish what can be verified: introductions made, data rooms opened, reviews completed.",
        bn: "কারণ প্রকাশ করার মতো সৎ কিছু আমাদের হাতে নেই। নেক্সফান্ডের বিনিয়োগ বিনিয়োগকারী ও ব্যবসার মধ্যে ব্যক্তিগত চুক্তি — আমরা কোনো ফান্ড চালাই না, অর্থ গচ্ছিত রাখি না, তাই 'পোর্টফোলিও পারফরম্যান্স' বলে কোনো সংখ্যাই নেই। আর অতীতের ফলাফল কখনোই ভবিষ্যতের প্রতিশ্রুতি নয়। আমরা যা যাচাই করা যায় সেটাই প্রকাশ করি: কতটি পরিচয় হয়েছে, কতগুলো ডেটা রুম খোলা হয়েছে, কতগুলো রিভিউ সম্পন্ন হয়েছে।",
      },
    },
    {
      q: { en: "Is the ৳12.5 crore 'invested'?", bn: "৳১২.৫ কোটি কি 'বিনিয়োগকৃত'?" },
      a: {
        en: "No — and the wording matters. It is capital introduced: the sum of ticket sizes for introductions where both sides actually engaged. Whether money moves, and on what terms, is settled privately between investor and business. NexFund never sits in that flow.",
        bn: "না — এবং শব্দটা জরুরি। এটি পরিচিত মূলধন: যেসব পরিচয়ে উভয় পক্ষ প্রকৃতভাবে এগিয়ে গেছে, সেগুলোর টিকেট-সাইজের যোগফল। অর্থ আদায় হবে কি না, কী শর্তে — সেটা বিনিয়োগকারী ও ব্যবসা নিজেরাই ঠিক করেন। সেই প্রবাহে নেক্সফান্ড কখনোই বসে না।",
      },
    },
    {
      q: { en: "What counts as a match?", bn: "'ম্যাচ' বলতে কী বোঝায়?" },
      a: {
        en: `An investor–business introduction where a call actually happened — not a registered interest. Interests are counted separately, and right now ${data.live.interests} ${data.live.interests === 1 ? "is" : "are"} registered on live listings.`,
        bn: `এমন বিনিয়োগকারী–ব্যবসা পরিচয়, যেখানে কল প্রকৃতভাবে হয়েছে — শুধু নিবন্ধিত আগ্রহ নয়। আগ্রহ আলাদাভাবে গোনা হয়; এই মুহূর্তে লাইভ তালিকায় ${bnNum(data.live.interests)}টি আগ্রহ নিবন্ধিত।`,
      },
    },
    {
      q: { en: "How current are the live counts?", bn: "লাইভ সংখ্যাগুলো কতটা হালনাগাদ?" },
      a: {
        en: `As current as a page-load: every live figure on the impact page is computed from the database the moment you open it (this page was built at ${fmtStamp(data.generatedAt, "en")}). Curated milestones are re-verified quarterly.`,
        bn: `পাতা খোলার সময়ই হালনাগাদ: ইমপ্যাক্ট পাতার প্রতিটি লাইভ সংখ্যা আপনি খোলার মুহূর্তে ডেটাবেজ থেকে গণনা হয় (এই পাতাটি তৈরি হয়েছে ${fmtStamp(data.generatedAt, "bn")} সময়ে)। কিউরেটেড মাইলফলক প্রতি ত্রৈমাসিকে পুনঃযাচাই হয়।`,
      },
    },
  ];

  return (
    <>
      <DetailHero
        crumbs={[
          { label: { en: "Impact", bn: "ইমপ্যাক্ট" }, page: "impact" },
          { label: { en: "Methodology", bn: "পদ্ধতি" } },
        ]}
        eyebrow={IMPACT.methodology.eyebrow}
        title={IMPACT.methodology.title}
        copy={T.mDetailCopy}
        meta={
          <>
            <MetaChip icon={<Database className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t(T.metaLive)}
            </MetaChip>
            <MetaChip icon={<CalendarCheck className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t(T.metaQuarterly)}
            </MetaChip>
            <MetaChip icon={<Percent className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {t(T.metaNoReturns)}
            </MetaChip>
          </>
        }
      />

      <PageBody className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* main column */}
          <div className="min-w-0 space-y-12">
            <section aria-labelledby="imp-rules-head">
              <Head
                id="imp-rules-head"
                eyebrow={{ en: "THE RULES", bn: "নিয়মগুলো" }}
                title={T.sixRules}
                copy={T.rulesSub}
              />
              <div className="mt-8 space-y-5">
                {IMPACT.methodology.points.map((p, i) => {
                  const Icon = METHOD_ICONS[i] ?? Activity;
                  return (
                    <motion.article
                      key={i}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.35 }}
                      className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_12px_30px_-18px_rgba(6,31,74,0.2)] md:p-7"
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-nx-navy-50 text-nx-navy-700"
                          aria-hidden="true"
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[11px] font-extrabold tracking-[0.18em] text-nx-navy-400 uppercase">
                            {T.ruleLabel(i + 1, lang)}
                          </p>
                          <h3 className="mt-1 text-lg font-extrabold text-nx-navy-900">{t(p.title)}</h3>
                        </div>
                      </div>
                      <p className="mt-4 leading-relaxed text-slate-600">{t(p.copy)}</p>
                      <div className="mt-5 rounded-2xl border border-nx-cyan-200/70 bg-nx-cyan-50/70 p-4">
                        <p className="nx-eyebrow text-[10px] font-extrabold tracking-[0.2em] text-nx-cyan-700 uppercase">
                          {t(T.inPractice)}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-nx-navy-800">{t(examples[i])}</p>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </section>

            <section aria-labelledby="imp-qa-head">
              <Head id="imp-qa-head" eyebrow={T.qaEyebrow} title={T.qaTitle} />
              <div className="mt-8 space-y-3">
                {qa.map((item, i) => (
                  <details
                    key={i}
                    className="group rounded-2xl border border-nx-navy-100 bg-white shadow-[0_8px_24px_-16px_rgba(6,31,74,0.2)] transition-colors open:border-nx-navy-300"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left text-[15px] font-bold text-nx-navy-900 [&::-webkit-details-marker]:hidden">
                      <span>{t(item.q)}</span>
                      <ChevronDown
                        className="h-4 w-4 shrink-0 text-nx-navy-400 transition-transform group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{t(item.a)}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* sticky aside */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-nx-navy-100 bg-nx-navy-950 nx-navy-grid p-6 text-white">
              <p className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-cyan-300 uppercase">
                {t(T.guaranteesTitle)}
              </p>
              <ul className="mt-4 space-y-4">
                {GUARANTEES.map((g, i) => (
                  <li key={i} className="flex gap-3 text-[13px] leading-relaxed text-white/75">
                    <g.icon className="mt-0.5 h-4 w-4 shrink-0 text-nx-cyan-300" aria-hidden="true" />
                    <span>{t(g.text)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => navigateTo("impact")}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-nx-navy-200 bg-white px-5 py-3 text-sm font-bold text-nx-navy-800 transition-colors hover:border-nx-navy-400"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t(T.backToImpact)}
            </button>
          </aside>
        </div>
      </PageBody>
    </>
  );
}

/* milestone lookup helper (value by key, 0 when absent) */
function milestonesOf(data: ImpactDTO, key: string): number {
  return data.milestones.find((m) => m.key === key)?.value ?? 0;
}
