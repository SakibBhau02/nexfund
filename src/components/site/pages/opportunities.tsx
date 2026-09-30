"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Banknote,
  Briefcase,
  Check,
  CheckCircle2,
  Eye,
  FileSignature,
  FileText,
  GitCompareArrows,
  KeyRound,
  Landmark,
  LayoutGrid,
  LineChart,
  Lock,
  MapPin,
  SearchX,
  ShieldCheck,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, type L } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { navigateTo } from "@/lib/page-router";
import { formatTk, formatTkRange, bnNum } from "@/lib/format";
import { SectorGlyph } from "../sector-icon";
import { BADGES, BADGE_TIPS, CMP, OPP, type BadgeKey } from "@/lib/content";
import type { OpportunityDTO } from "../opportunities";
import { AnimatedNumber } from "../animated-number";
import { CompareDialog } from "../dialogs/compare-dialog";
import {
  PageHero,
  PageBody,
  CtaBand,
  CyanButton,
  OutlineLightButton,
  DetailHero,
  MetaChip,
  PageNotFound,
} from "./shell";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * R11-C Opportunities page — the money page of the platform.
 *   #p/opportunities            → verified listings with a live market
 *                                 snapshot band, sector filters w/ counts,
 *                                 fact-sheet cards and a trust strip
 *   #p/opportunities/<slug>     → full banker-grade fact-pack page: verification
 *                                 badge row, icon-headed note sections,
 *                                 use-of-funds with taka estimates, published
 *                                 risks, post-registration steps, compare
 * Data: same /api/opportunities feed as the home section (verified facts only).
 */

const BADGE_KEYS: BadgeKey[] = ["identity", "legal", "financial", "site", "advisor"];

const T = {
  heroCopy: {
    en: "A live, curated shortlist of verified Bangladeshi businesses seeking capital. Every listing passed the five-pillar vetting standard before it earned this page — click any card for the full fact-pack.",
    bn: "পুঁজি খুঁজছে এমন যাচাইকৃত বাংলাদেশি ব্যবসার সাজানো তালিকা। প্রতিটি তালিকা এই পাতায় আসার আগে পাঁচ-স্তম্ভের যাচাই পাস করেছে — সম্পূর্ণ ফ্যাক্ট-প্যাকের জন্য যেকোনো কার্ডে ক্লিক করুন।",
  },
  allSectors: { en: "All sectors", bn: "সব খাত" } as const,
  countLabel: (n: number) =>
    ({
      en: n === 1 ? "1 verified listing" : `${n} verified listings`,
      bn: n === 1 ? "১টি যাচাইকৃত তালিকা" : `${bnNum(n)}টি যাচাইকৃত তালিকা`,
    }) as const,
  loading: { en: "Loading verified listings…", bn: "যাচাইকৃত তালিকা লোড হচ্ছে…" } as const,
  errorTitle: { en: "Couldn't load listings", bn: "তালিকা লোড করা যায়নি" } as const,
  errorSub: {
    en: "Please refresh the page — our fact-pack service hiccuped.",
    bn: "পাতাটি রিফ্রেশ করুন — ফ্যাক্ট-প্যাক সার্ভিসে সাময়িক সমস্যা হয়েছে।",
  } as const,
  retry: { en: "Retry", bn: "আবার চেষ্টা করুন" } as const,
  viewDetails: { en: "View fact-pack", bn: "ফ্যাক্ট-প্যাক দেখুন" } as const,
  seeking: { en: "Seeking", bn: "সংগ্রহের লক্ষ্য" } as const,
  registerCta: { en: "Register interest", bn: "আগ্রহ নিবন্ধন করুন" } as const,

  /* ── stats band ── */
  statsAria: { en: "Live market snapshot", bn: "লাইভ মার্কেট সারসংক্ষেপ" } as const,
  statListings: { en: "Live listings", bn: "লাইভ তালিকা" } as const,
  statCapital: { en: "Capital seeking", bn: "সংগ্রহের লক্ষ্য (মোট)" } as const,
  statSectors: { en: "Sectors", bn: "খাত" } as const,
  statLocations: { en: "Locations", bn: "অবস্থান" } as const,
  statsCaption: {
    en: "Aggregate of the published seeking ranges · updates as new listings pass verification",
    bn: "প্রকাশিত সংগ্রহের পরিসরের যোগফল · নতুন তালিকা যাচাই পেলে হালনাগাদ হয়",
  } as const,

  /* ── how to read this page ── */
  readTitle: { en: "How to read this page", bn: "এই পাতাটি কীভাবে পড়বেন" } as const,
  readNdaTitle: { en: "Anonymized until you register", bn: "নিবন্ধনের আগে বেনামি" } as const,
  readNdaCopy: {
    en: "Code names and verified numbers are public. Real names and documents unlock only after registration and NDA.",
    bn: "কোড-নেম ও যাচাইকৃত সংখ্যা সবার জন্য খোলা; আসল নাম ও নথি খোলে কেবল নিবন্ধন ও NDA-র পরে।",
  } as const,
  readNdaCta: { en: "How anonymity works", bn: "বেনামি কীভাবে কাজ করে" } as const,
  readRiskTitle: { en: "Risks are always visible", bn: "ঝুঁকি সবসময় দৃশ্যমান" } as const,
  readRiskCopy: {
    en: "Every listing publishes its material risks up front. Verification reduces risk — it never hides it.",
    bn: "প্রতিটি তালিকায় আসল ঝুঁকি আগেই প্রকাশিত থাকে। যাচাই ঝুঁকি কমায় — লুকায় না।",
  } as const,
  readRiskCta: { en: "See the vetting standard", bn: "যাচাই মানদণ্ড দেখুন" } as const,
  readFeeTitle: { en: "Fees in writing — never % of returns", bn: "ফি লিখিতভাবে — মুনাফার % কখনো নয়" } as const,
  readFeeCopy: {
    en: "A disclosed introduction fee when a deal completes — never a share of your upside.",
    bn: "ডিল সম্পন্ন হলে একটি প্রকাশিত ইন্ট্রোডাকশন ফি — আপনার মুনাফার অংশ কখনো নয়।",
  } as const,
  readFeeCta: { en: "Read the charter", bn: "চার্টার পড়ুন" } as const,

  /* ── filters ── */
  filterLabel: { en: "Filter by sector", bn: "খাত অনুযায়ী ছাঁকনি" } as const,
  emptyTitle: { en: "No listings in this sector right now", bn: "এই খাতে এখন কোনো তালিকা নেই" } as const,
  emptySub: {
    en: "New verified listings reach matching investors first — reset the filter or tell us what you're looking for.",
    bn: "নতুন যাচাইকৃত তালিকা ম্যাচিং বিনিয়োগকারীর কাছে আগে পৌঁছায় — ছাঁকনি রিসেট করুন বা আপনি কী খুঁজছেন জানান।",
  } as const,
  reset: { en: "Show all sectors", bn: "সব খাত দেখুন" } as const,

  /* ── listing cards ── */
  verifiedOf: (n: number) =>
    ({ en: `${n}/5 verified`, bn: `${bnNum(n)}/৫ যাচাইকৃত` }) as const,
  stageShort: (s: number) => ({ en: `Stage ${s}/5`, bn: `ধাপ ${bnNum(s)}/৫` }) as const,
  riskChip: (n: number) =>
    ({ en: `${n} key risks published`, bn: `${bnNum(n)}টি প্রকাশিত ঝুঁকি` }) as const,

  /* ── details page ── */
  overview: { en: "Business overview", bn: "ব্যবসার সারসংক্ষেপ" } as const,
  team: { en: "The people behind it", bn: "পরিচালনায় যারা" } as const,
  financials: { en: "Financial position", bn: "আর্থিক অবস্থান" } as const,
  useOfFunds: { en: "Use of funds", bn: "তহবিলের ব্যবহার" } as const,
  advisor: { en: "Advisor's note", bn: "অ্যাডভাইজরের মন্তব্য" } as const,
  risks: { en: "Key risks — read before deciding", bn: "মূল ঝুঁকি — সিদ্ধান্তের আগে পড়ুন" } as const,
  risksNote: {
    en: "These are the material risks our review surfaced. Verification reduces risk; it does not remove it.",
    bn: "আমাদের পর্যালোচনায় উঠে আসা প্রধান ঝুঁকিগুলো। যাচাই ঝুঁকি কমায়, দূর করে না।",
  } as const,
  risksCount: (n: number) => ({ en: `${n} published`, bn: `${bnNum(n)}টি প্রকাশিত` }) as const,
  backToList: { en: "All opportunities", bn: "সব সুযোগ" } as const,
  prevOpp: { en: "Previous listing", bn: "পূর্ববর্তী তালিকা" } as const,
  nextOpp: { en: "Next listing", bn: "পরবর্তী তালিকা" } as const,
  stageLabel: (s: number, lang: "bn" | "en") =>
    ({
      en: `Stage ${s} of 5`,
      bn: `ধাপ ৫টির মধ্যে ${bnNum(s)}`,
    }) as const,
  /* verification badge row */
  verifiedSoFar: { en: "Verified so far", bn: "এ পর্যন্ত যাচাই" } as const,
  badgePending: { en: "Not verified yet", bn: "এখনো যাচাই হয়নি" } as const,
  /* use-of-funds estimates */
  uofNote: (mid: string) =>
    ({
      en: `Taka estimates use the midpoint of the seeking range (${mid}); the final allocation is negotiated with the investor.`,
      bn: `টাকার অঙ্ক সংগ্রহের লক্ষ্যের মধ্যবিন্দু (${mid}) ধরে আনুমানিক — চূড়ান্ত বণ্টন বিনিয়োগকারীর সাথে আলোচনায় ঠিক হয়।`,
    }) as const,
  /* post-registration steps */
  nextTitle: { en: "What happens after you register interest", bn: "আগ্রহ নিবন্ধনের পরে যা হয়" } as const,
  nextSteps: [
    {
      title: { en: "You register interest", bn: "আগ্রহ নিবন্ধন করেন" } as const,
      copy: {
        en: "A three-minute form — sector focus, ticket size, time horizon. Free, with no commitment.",
        bn: "তিন মিনিটের ফর্ম — খাত, টিকেট সাইজ ও সময়সীমা। বিনামূল্যে, কোনো বাধ্যবাধকতা ছাড়াই।",
      } as const,
    },
    {
      title: { en: "NDA & identity check", bn: "NDA ও পরিচয় যাচাই" } as const,
      copy: {
        en: "We verify who you are, you sign the NDA — only then does the business behind the code name unlock.",
        bn: "আপনার পরিচয় যাচাই করি আমরা, আপনি সই করেন NDA-তে — তখনই কোড-নেমের আড়ালের ব্যবসাটি খোলে।",
      } as const,
    },
    {
      title: { en: "Data-room key + advisor call", bn: "ডেটা-রুম চাবি ও অ্যাডভাইজর কল" } as const,
      copy: {
        en: "Full financials, contracts and the advisor's verification notes — then a call to answer your questions.",
        bn: "সম্পূর্ণ আর্থিক বিবরণী, চুক্তি ও অ্যাডভাইজরের যাচাই-নোট — তারপর আপনার প্রশ্নের উত্তরে একটি কল।",
      } as const,
    },
  ] as const,
  nextFeeNote: {
    en: "Free to register — the NDA comes before any document access.",
    bn: "নিবন্ধন বিনামূল্যে — যেকোনো নথি দেখার আগেই NDA।",
  } as const,
  /* aside */
  asideRegTitle: { en: "Interested in this listing?", bn: "এই তালিকায় আগ্রহী?" } as const,
  asideRegCopy: {
    en: "Register to unlock the data room — or ask an advisor your questions first.",
    bn: "ডেটা রুম খুলতে নিবন্ধন করুন — বা প্রশ্নগুলো আগে অ্যাডভাইজরকে করুন।",
  } as const,
  cmpTitle: { en: "Compare", bn: "তুলনায় রাখুন" } as const,
  cmpHint: {
    en: "Line this listing up against one or two others — the same honest facts, side by side.",
    bn: "এই তালিকাটি আরও এক-দুইটির সাথে পাশাপাশি মিলিয়ে দেখুন — একই সৎ তথ্য, পাশাপাশি।",
  } as const,
  modelTitle: { en: "Business model", bn: "বিজনেস মডেল" } as const,
  revenueTitle: { en: "Revenue (verified)", bn: "রাজস্ব (যাচাইকৃত)" } as const,
  revenueNote: {
    en: "Figures published after financial verification — sensitive detail stays in the data room.",
    bn: "আর্থিক বিবরণী যাচাই করে প্রকাশিত — সংবেদনশীল অঙ্ক ডেটা রুমে সংরক্ষিত।",
  } as const,
  talkAdvisor: { en: "Talk to an advisor", bn: "অ্যাডভাইজরের সাথে কথা বলুন" } as const,
  howVerified: { en: "How it was verified", bn: "যাচাই প্রক্রিয়া দেখুন" } as const,

  /* CTA bands */
  ctaTitle: { en: "None of them a fit? Let us match you.", bn: "কোনোটাই মানানসই নয়? আমরা ম্যাচ করি।" } as const,
  ctaCopy: {
    en: "Tell us your sector, ticket size and risk appetite in a three-minute registration — new verified listings reach matching investors first.",
    bn: "তিন মিনিটের নিবন্ধনে খাত, টিকেট সাইজ ও ঝুঁকির পছন্দ জানান — নতুন যাচাইকৃত তালিকা আগে পৌঁছায় ম্যাচিং বিনিয়োগকারীর কাছে।",
  } as const,
  detailCtaTitle: { en: "Ready to look closer?", bn: "কাছ থেকে দেখতে চান?" } as const,
  detailCtaCopy: {
    en: "Registered investors receive the full data-room key for this listing — financials, contracts and the advisor's verification notes.",
    bn: "নিবন্ধিত বিনিয়োগকারীরা এই তালিকার সম্পূর্ণ ডেটা-রুমের চাবি পান — আর্থিক বিবরণী, চুক্তি ও অ্যাডভাইজরের যাচাই-নোটসহ।",
  } as const,
};

/* ── compare bridge: same shortlist, same store actions, same storage as the
   home Opportunities section — picks made here survive navigation home. ──── */

const MAX_COMPARE = 3;
const LS_KEY = "nx-compare";

type CompareApi = {
  slugs: string[];
  items: OpportunityDTO[];
  setSlugs: (slugs: string[]) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: (slug: string) => void;
  capToast: boolean;
};

function useCompareBridge(data: OpportunityDTO[]): CompareApi {
  const slugs = useDialogStore((s) => s.compareSlugs);
  const setSlugs = useDialogStore((s) => s.setCompareSlugs);
  const open = useDialogStore((s) => s.compareOpen);
  const setOpen = useDialogStore((s) => s.setCompareOpen);
  const [capToast, setCapToast] = useState(false);
  const timer = useRef<number | null>(null);
  const hydratedRef = useRef(false);
  const skipFirstSaveRef = useRef(true);

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  /* restore a saved shortlist once per mount (shared with the home section) */
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    try {
      const raw = window.localStorage.getItem(LS_KEY);
      if (!raw) return;
      const saved: unknown = JSON.parse(raw);
      if (Array.isArray(saved)) {
        const picked = saved
          .filter((s): s is string => typeof s === "string")
          .slice(0, MAX_COMPARE);
        if (picked.length > 0) setSlugs(picked);
      }
    } catch {
      /* corrupt/unavailable storage — ignore */
    }
  }, [setSlugs]);

  /* persist every change (first post-mount run skipped so hydration wins) */
  useEffect(() => {
    if (skipFirstSaveRef.current) {
      skipFirstSaveRef.current = false;
      return;
    }
    try {
      if (slugs.length > 0) window.localStorage.setItem(LS_KEY, JSON.stringify(slugs));
      else window.localStorage.removeItem(LS_KEY);
    } catch {
      /* storage unavailable — non-fatal */
    }
  }, [slugs]);

  const items = useMemo(
    () =>
      slugs
        .map((slug) => data.find((o) => o.slug === slug))
        .filter((o): o is OpportunityDTO => Boolean(o)),
    [slugs, data]
  );

  const toggle = (slug: string) => {
    if (slugs.includes(slug)) {
      setSlugs(slugs.filter((s) => s !== slug));
    } else if (slugs.length >= MAX_COMPARE) {
      setCapToast(true);
      if (timer.current !== null) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCapToast(false), 2800);
    } else {
      setSlugs([...slugs, slug]);
    }
  };

  return { slugs, items, setSlugs, open, setOpen, toggle, capToast };
}

/* ── page ────────────────────────────────────────────────────────────── */

export default function OpportunitiesPage({ detail }: { detail: string | null }) {
  const { lang } = useLanguage();
  const openInvestor = useDialogStore((s) => s.openInvestor);
  const { data, isLoading, error, refetch } = useQuery<OpportunityDTO[]>({
    queryKey: ["opportunities"],
    queryFn: async () => {
      const res = await fetch("/api/opportunities");
      if (!res.ok) throw new Error("Failed to load");
      return res.json();
    },
    staleTime: 60_000,
  });

  const cmp = useCompareBridge(data ?? []);

  if (detail) {
    return (
      <>
        <OpportunityDetail
          detail={detail}
          data={data ?? null}
          isLoading={isLoading}
          error={error ? true : false}
          onRetry={() => refetch()}
          cmp={cmp}
        />
        <CompareSurf cmp={cmp} />
      </>
    );
  }

  return (
    <>
      <PageHero
        crumbs={[{ label: { en: "Opportunities", bn: "সুযোগসমূহ" } }]}
        eyebrow={{ en: "LIVE OPPORTUNITIES", bn: "বর্তমান সুযোগ" }}
        title={{
          en: "Verified businesses, ready for capital",
          bn: "যাচাইকৃত ব্যবসা, পুঁজির জন্য প্রস্তুত",
        }}
        copy={T.heroCopy}
        image="/images/hero-agri.png"
        imageAlt={
          lang === "bn"
            ? "যাচাইকৃত বাংলাদেশি ব্যবসার তালিকা — নেক্সফান্ড সুযোগসমূহ"
            : "Verified Bangladeshi businesses — NexFund opportunities"
        }
        badge={
          data ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-[12px] font-bold text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              {T.countLabel(data.length)[lang]}
            </span>
          ) : undefined
        }
        actions={
          <>
            <CyanButton onClick={() => openInvestor("investor")}>
              {lang === "bn" ? "আগ্রহ নিবন্ধন করুন" : "Register interest"}
            </CyanButton>
            <OutlineLightButton onClick={() => navigateTo("vetting")}>
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              {lang === "bn" ? "যাচাই মানদণ্ড দেখুন" : "See the vetting standard"}
            </OutlineLightButton>
          </>
        }
      />

      {/* ── stats band — white card overlapping the hero's bottom edge ── */}
      {(isLoading || data) && (
        <div className="relative z-10 mx-auto -mt-11 max-w-[1200px] px-5 md:-mt-14 md:px-6">
          {isLoading ? <StatsSkeleton /> : <StatsBand data={data!} />}
        </div>
      )}

      <PageBody className="pt-10 md:pt-12">
        <HowToRead />
        {isLoading ? (
          <ListingSkeleton />
        ) : error || !data ? (
          <div className="mx-auto max-w-lg rounded-3xl border border-nx-navy-100 bg-white p-10 text-center shadow-[0_14px_36px_-22px_rgba(6,31,74,0.2)]">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
              <AlertTriangle className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-lg font-extrabold text-nx-navy-900">{T.errorTitle[lang]}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{T.errorSub[lang]}</p>
            <button
              onClick={() => refetch()}
              className="mt-5 rounded-full bg-nx-navy-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-nx-navy-600"
            >
              {T.retry[lang]}
            </button>
          </div>
        ) : (
          <ListingGrid data={data} />
        )}
      </PageBody>

      <CtaBand title={T.ctaTitle} copy={T.ctaCopy} actions={<GetStartedAndContact />} />
      <CompareSurf cmp={cmp} />
    </>
  );
}

/* ── stats band ──────────────────────────────────────────────────────── */

function StatsBand({ data }: { data: OpportunityDTO[] }) {
  const { t, lang } = useLanguage();
  /* arm after the first paint so the figures count up (AnimatedNumber
     tweens between value changes — 0 → final reads as the count-up) */
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setArmed(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const minL = data.reduce((a, o) => a + o.seekingMin, 0);
  const maxL = data.reduce((a, o) => a + o.seekingMax, 0);
  const sectors = new Set(data.map((o) => o.sector)).size;
  const locations = new Set(data.map((o) => o.location)).size;
  const inCr = minL >= 100 && maxL >= 100;

  const fmtCount = (v: number) => (lang === "bn" ? bnNum(Math.round(v)) : String(Math.round(v)));
  const fmtCr = (v: number) => (lang === "bn" ? bnNum(v.toFixed(1)) : v.toFixed(1));

  const stats: { icon: LucideIcon; label: L; node: ReactNode }[] = [
    {
      icon: LayoutGrid,
      label: T.statListings,
      node: <AnimatedNumber value={armed ? data.length : 0} format={fmtCount} />,
    },
    {
      icon: Banknote,
      label: T.statCapital,
      node: inCr ? (
        <>
          ৳<AnimatedNumber value={armed ? minL / 100 : 0} format={fmtCr} />–
          <AnimatedNumber value={armed ? maxL / 100 : 0} format={fmtCr} />{" "}
          {lang === "bn" ? "কোটি" : "crore"}
        </>
      ) : (
        <>
          ৳<AnimatedNumber value={armed ? minL : 0} format={fmtCount} />–
          <AnimatedNumber value={armed ? maxL : 0} format={fmtCount} />{" "}
          {lang === "bn" ? "লক্ষ" : "lakh"}
        </>
      ),
    },
    {
      icon: Briefcase,
      label: T.statSectors,
      node: <AnimatedNumber value={armed ? sectors : 0} format={fmtCount} />,
    },
    {
      icon: MapPin,
      label: T.statLocations,
      node: <AnimatedNumber value={armed ? locations : 0} format={fmtCount} />,
    },
  ];

  return (
    <section
      aria-label={t(T.statsAria)}
      className="rounded-3xl border border-nx-navy-100 bg-white px-6 py-7 shadow-[0_24px_50px_-24px_rgba(6,31,74,0.28)] md:px-10"
    >
      <dl className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-4 md:divide-x md:divide-nx-navy-100">
        {stats.map((s) => (
          <div key={s.label.en} className="min-w-0 md:px-7 md:first:pl-0">
            <dt className="flex items-center gap-1.5 text-[11px] font-extrabold tracking-[0.14em] text-nx-navy-500 uppercase">
              <s.icon className="h-3.5 w-3.5 shrink-0 text-nx-cyan-600" aria-hidden="true" />
              <span className="truncate">{t(s.label)}</span>
            </dt>
            <dd className="nx-num mt-2.5 truncate text-[1.55rem] leading-tight font-extrabold text-nx-navy-900 md:text-[1.7rem]">
              {s.node}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 flex items-start justify-center gap-1.5 border-t border-nx-navy-100 pt-4 text-center text-[11px] leading-relaxed text-slate-500">
        <Eye className="mt-0.5 h-3.5 w-3.5 shrink-0 text-nx-navy-400" aria-hidden="true" />
        {t(T.statsCaption)}
      </p>
    </section>
  );
}

function StatsSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="rounded-3xl border border-nx-navy-100 bg-white px-6 py-7 shadow-[0_24px_50px_-24px_rgba(6,31,74,0.28)] md:px-10"
    >
      <div className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="md:px-7 md:first:pl-0">
            <Skeleton className="nx-shimmer h-3 w-24" />
            <Skeleton className="nx-shimmer mt-3 h-8 w-28" />
          </div>
        ))}
      </div>
      <Skeleton className="nx-shimmer mx-auto mt-6 block h-3 w-72" />
    </div>
  );
}

/* ── how to read this page (trust strip) ─────────────────────────────── */

function HowToRead() {
  const { t } = useLanguage();
  const notes: { icon: LucideIcon; title: L; copy: L; cta: L; page: string }[] = [
    {
      icon: Lock,
      title: T.readNdaTitle,
      copy: T.readNdaCopy,
      cta: T.readNdaCta,
      page: "faq",
    },
    {
      icon: Eye,
      title: T.readRiskTitle,
      copy: T.readRiskCopy,
      cta: T.readRiskCta,
      page: "vetting",
    },
    {
      icon: Banknote,
      title: T.readFeeTitle,
      copy: T.readFeeCopy,
      cta: T.readFeeCta,
      page: "charter",
    },
  ];
  return (
    <section
      aria-label={t(T.readTitle)}
      className="mb-10 grid gap-3 rounded-3xl border border-nx-navy-100 bg-nx-navy-50/70 p-3 sm:grid-cols-3 sm:gap-4 md:p-4"
    >
      {notes.map((n) => (
        <div key={n.page} className="flex gap-3 rounded-2xl bg-white p-4 shadow-[0_8px_22px_-14px_rgba(6,31,74,0.18)]">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-nx-navy-900 text-nx-cyan-400">
            <n.icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[13px] leading-snug font-extrabold text-nx-navy-900">{t(n.title)}</p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{t(n.copy)}</p>
            <button
              onClick={() => navigateTo(n.page)}
              className="nx-arrow-btn mt-2 inline-flex items-center gap-1 text-[12px] font-bold text-nx-cyan-700 transition-colors hover:text-nx-cyan-600"
            >
              {t(n.cta)}
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── listing grid ─────────────────────────────────────────────────────── */

function ListingSkeleton() {
  const { lang } = useLanguage();
  return (
    <div>
      <p className="sr-only" aria-live="polite">{T.loading[lang]}</p>
      <div className="mb-7 flex flex-wrap items-center gap-2">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="nx-shimmer h-10 w-28 rounded-full" />
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="rounded-3xl border border-nx-navy-100 bg-white p-5">
            <div className="flex items-start gap-4">
              <Skeleton className="nx-shimmer h-[105px] w-[84px] rounded-full" />
              <div className="flex-1 space-y-2.5">
                <Skeleton className="nx-shimmer h-5 w-2/5" />
                <Skeleton className="nx-shimmer h-3 w-3/4" />
                <Skeleton className="nx-shimmer h-4 w-20 rounded-full" />
              </div>
            </div>
            <Skeleton className="nx-shimmer mt-4 h-10 w-full" />
            <Skeleton className="nx-shimmer mt-4 h-24 w-full rounded-2xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SectorPill({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  const { lang } = useLanguage();
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] font-bold transition-colors",
        active
          ? "border-nx-navy-700 bg-nx-navy-700 text-white"
          : "border-nx-navy-200 bg-white text-nx-navy-700 hover:border-nx-navy-400"
      )}
    >
      <span className="truncate">{label}</span>
      <span
        className={cn(
          "nx-num rounded-full px-1.5 text-[11px] font-extrabold",
          active ? "bg-white/20 text-white" : "bg-nx-navy-100 text-nx-navy-600"
        )}
      >
        {lang === "bn" ? bnNum(count) : count}
      </span>
    </button>
  );
}

function ListingGrid({ data }: { data: OpportunityDTO[] }) {
  const { t, lang } = useLanguage();
  const sector = useDialogStore((s) => s.sectorFilter);
  const setSector = useDialogStore((s) => s.setSectorFilter);

  const sectors = useMemo(() => {
    const seen = new Map<string, string>(); // EN key → BN label
    for (const o of data) seen.set(o.sector, o.sectorBn);
    return Array.from(seen.entries());
  }, [data]);

  const filtered = useMemo(
    () => (sector === "all" ? data : data.filter((o) => o.sector === sector)),
    [data, sector]
  );

  const countFor = (key: string) =>
    key === "all" ? data.length : data.filter((o) => o.sector === key).length;

  return (
    <div>
      {/* filter row + live result count */}
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div
          role="group"
          aria-label={t(T.filterLabel)}
          className="flex flex-wrap items-center gap-2"
        >
          <SectorPill
            active={sector === "all"}
            onClick={() => setSector("all")}
            label={t(T.allSectors)}
            count={data.length}
          />
          {sectors.map(([key, bn]) => (
            <SectorPill
              key={key}
              active={sector === key}
              onClick={() => setSector(key)}
              label={lang === "bn" ? bn : key}
              count={countFor(key)}
            />
          ))}
        </div>
        <p className="text-sm font-bold text-nx-navy-700 md:shrink-0" aria-live="polite">
          {t(T.countLabel(filtered.length))}
        </p>
      </div>

      {filtered.length === 0 ? (
        <EmptyFilter onReset={() => setSector("all")} hasData={data.length > 0} />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((o, i) => (
            <OpportunityCard key={o.slug} o={o} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyFilter({ onReset, hasData }: { onReset: () => void; hasData: boolean }) {
  const { t } = useLanguage();
  const openInvestor = useDialogStore((s) => s.openInvestor);
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-dashed border-nx-navy-200 bg-white p-10 text-center shadow-[0_14px_36px_-22px_rgba(6,31,74,0.2)]">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-nx-navy-50 text-nx-navy-400">
        <SearchX className="h-6 w-6" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-lg font-extrabold text-nx-navy-900">
        {t(hasData ? T.emptyTitle : OPP.emptyTitle)}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(T.emptySub)}</p>
      {hasData ? (
        <button
          onClick={onReset}
          className="mt-6 rounded-full bg-nx-navy-700 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-nx-navy-600"
        >
          {t(T.reset)}
        </button>
      ) : (
        <button
          onClick={() => openInvestor("investor")}
          className="mt-6 rounded-full bg-nx-navy-700 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-nx-navy-600"
        >
          {t(OPP.emptyCta)}
        </button>
      )}
    </div>
  );
}

/* ── listing card — a mini fact-sheet ─────────────────────────────────── */

function OpportunityCard({ o, index }: { o: OpportunityDTO; index: number }) {
  const { t, lang } = useLanguage();
  const riskCount = o.risks?.length ?? 0;
  const verifiedCount = o.badges?.length ?? 0;
  /* R13: hero-like static photo banner (no oval) — sector shown by icon */
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="h-full min-w-0"
    >
      <button
        onClick={() => navigateTo("opportunities", o.slug)}
        className="nx-card-sheen group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-nx-navy-100 bg-white text-left shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-nx-cyan-200 hover:shadow-[0_26px_52px_-22px_rgba(10,58,143,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
      >
        {/* R13: static photo banner (hero-like — no oval thumb) */}
        <div className="relative h-36 shrink-0 overflow-hidden">
          <Image
            src={o.image}
            alt={`${o.codeName} — ${lang === "bn" ? o.sectorBn : o.sector}`}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-nx-navy-950/95 via-nx-navy-950/50 to-nx-navy-950/20"
          />
          {/* sector (by icon) + location chips */}
          <div className="absolute left-4 top-3.5 flex max-w-[calc(100%-2rem)] flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[12px] font-bold text-white backdrop-blur-sm">
              <SectorGlyph sector={o.sector} className="h-3.5 w-3.5 text-nx-cyan-300" />
              {lang === "bn" ? o.sectorBn : o.sector}
            </span>
            <span className="hidden items-center gap-1 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[12px] font-semibold text-white/90 backdrop-blur-sm sm:inline-flex">
              <MapPin className="h-3 w-3 text-nx-cyan-300" aria-hidden="true" />
              {lang === "bn" ? o.locationBn : o.location}
            </span>
          </div>
          {/* identity over the photo */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
            <h2 className="nx-num text-xl font-extrabold text-white drop-shadow-[0_2px_10px_rgba(3,12,32,0.7)]">
              {o.codeName}
            </h2>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-nx-verified/50 bg-nx-verified/25 px-2 py-0.5 text-[11px] font-bold text-emerald-100 backdrop-blur-sm">
              <ShieldCheck className="h-3 w-3 shrink-0" aria-hidden="true" />
              <span className="nx-num">{t(T.verifiedOf(verifiedCount))}</span>
            </span>
          </div>
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-5">
          {/* headline */}
          <p className="line-clamp-2 min-h-[3.5em] text-sm leading-relaxed text-slate-600">
            {lang === "bn" ? o.headlineBn : o.headline}
          </p>

          {/* fact-sheet metrics */}
          <div className="mt-4 flex flex-1 flex-col rounded-2xl bg-nx-mist p-4">
            <p className="text-[11px] font-extrabold text-slate-500 uppercase">
              {t(T.seeking)}
            </p>
            <p className="nx-num mt-1 text-xl font-extrabold text-nx-navy-900">
              {formatTkRange(o.seekingMin, o.seekingMax, lang)}
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
              <span className="inline-flex items-center gap-1.5">
                <span className="flex gap-1" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className={cn(
                        "h-2 w-5 rounded-full",
                        s <= o.stage ? "bg-nx-cyan-500" : "bg-nx-navy-200"
                      )}
                    />
                  ))}
                </span>
                <span className="nx-num text-[11px] font-bold text-nx-navy-700">
                  {t(T.stageShort(o.stage))}
                </span>
              </span>
              <span className="inline-flex min-w-0 max-w-full items-center gap-1 rounded-full border border-nx-navy-200 bg-white px-2.5 py-1 text-[11px] font-bold text-nx-navy-700">
                <Landmark className="h-3 w-3 shrink-0 text-nx-navy-400" aria-hidden="true" />
                <span className="truncate">{lang === "bn" ? o.instrumentBn : o.instrument}</span>
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {o.revenue && (
                <span className="nx-num inline-flex max-w-full items-center gap-1 rounded-full border border-nx-cyan-200 bg-nx-cyan-50 px-2.5 py-1 text-[11px] font-bold text-nx-cyan-700">
                  <Banknote className="h-3 w-3 shrink-0" aria-hidden="true" />
                  <span className="truncate">{lang === "bn" ? o.revenueBn : o.revenue}</span>
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded-full border border-nx-warn/40 bg-nx-warn-bg px-2.5 py-1 text-[11px] font-bold text-nx-warn-700">
                <AlertTriangle className="h-3 w-3 shrink-0" aria-hidden="true" />
                {t(T.riskChip(riskCount))}
              </span>
            </div>
          </div>

          {/* footer */}
          <span className="mt-4 flex items-center justify-between border-t border-nx-navy-100 pt-4">
            <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-nx-cyan-700 transition-colors group-hover:text-nx-cyan-600">
              {t(T.viewDetails)}
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
            <span className="nx-num text-[11px] font-bold text-nx-navy-300" aria-hidden="true">
              {o.codeName}
            </span>
          </span>
        </div>
      </button>
    </motion.article>
  );
}

/* ── details page ─────────────────────────────────────────────────────── */

function OpportunityDetail({
  detail,
  data,
  isLoading,
  error,
  onRetry,
  cmp,
}: {
  detail: string;
  data: OpportunityDTO[] | null;
  isLoading: boolean;
  error: boolean;
  onRetry: () => void;
  cmp: CompareApi;
}) {
  const { lang, t } = useLanguage();
  const openInvestor = useDialogStore((s) => s.openInvestor);

  if (isLoading) return <DetailSkeleton />;

  const idx = data?.findIndex((o) => o.slug === detail) ?? -1;
  const o = idx >= 0 ? data![idx] : null;

  if (error || !o) {
    if (error) {
      return (
        <div className="mx-auto max-w-lg px-5 py-24 text-center md:px-6">
          <h1 className="text-2xl font-extrabold text-nx-navy-900">{T.errorTitle[lang]}</h1>
          <p className="mt-3 text-slate-600">{T.errorSub[lang]}</p>
          <button
            onClick={onRetry}
            className="mt-6 rounded-full bg-nx-navy-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-nx-navy-600"
          >
            {T.retry[lang]}
          </button>
        </div>
      );
    }
    return <PageNotFound page={detail} />;
  }

  const prev = idx > 0 ? data![idx - 1] : null;
  const next = idx < data!.length - 1 ? data![idx + 1] : null;
  const mid = (o.seekingMin + o.seekingMax) / 2;
  const useOfFunds = o.useOfFunds ?? [];
  const riskCount = o.risks?.length ?? 0;

  return (
    <>
      <DetailHero
        crumbs={[
          { label: { en: "Opportunities", bn: "সুযোগসমূহ" }, page: "opportunities" },
          { label: o.codeName },
        ]}
        eyebrow={{ en: "VERIFIED LISTING", bn: "যাচাইকৃত তালিকা" }}
        title={o.codeName}
        copy={{ en: o.headline, bn: o.headlineBn }}
        image={o.image}
        imageAlt={`${o.codeName} — ${lang === "bn" ? o.sectorBn : o.sector}`}
        meta={
          <>
            <MetaChip icon={<Briefcase className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {lang === "bn" ? o.sectorBn : o.sector}
            </MetaChip>
            <MetaChip icon={<MapPin className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {lang === "bn" ? o.locationBn : o.location}
            </MetaChip>
            <MetaChip icon={<TrendingUp className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {T.stageLabel(o.stage, lang)[lang]}
            </MetaChip>
            <MetaChip icon={<Landmark className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              {lang === "bn" ? o.instrumentBn : o.instrument}
            </MetaChip>
            <MetaChip icon={<Banknote className="h-3.5 w-3.5 text-nx-cyan-300" aria-hidden="true" />}>
              <span className="nx-num">{t(T.seeking)}: {formatTkRange(o.seekingMin, o.seekingMax, lang)}</span>
            </MetaChip>
            {/* verification badges — what has (and hasn't) been verified */}
            <span className="flex w-full flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-extrabold tracking-[0.18em] text-white/65 uppercase">
                {t(T.verifiedSoFar)}:
              </span>
              {BADGE_KEYS.map((k) => {
                const has = o.badges.includes(k);
                return (
                  <span
                    key={k}
                    title={has ? t(BADGE_TIPS[k]) : t(T.badgePending)}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold",
                      has
                        ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                        : "border-white/10 bg-white/[0.03] text-white/35"
                    )}
                  >
                    {has ? (
                      <CheckCircle2 className="h-3 w-3 shrink-0" aria-hidden="true" />
                    ) : (
                      <X className="h-3 w-3 shrink-0" aria-hidden="true" />
                    )}
                    {t(BADGES[k])}
                  </span>
                );
              })}
            </span>
          </>
        }
        actions={
          <>
            <CyanButton onClick={() => openInvestor("investor")}>{t(T.registerCta)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("contact")}>
              {t(T.talkAdvisor)}
            </OutlineLightButton>
          </>
        }
      />

      <PageBody className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* ── main column ── */}
          <div className="min-w-0 space-y-12">
            {o.overview && (
              <NoteSection id="opp-overview" icon={Briefcase} eyebrow={{ en: "THE BUSINESS", bn: "ব্যবসা" }} title={T.overview}>
                <p className="leading-relaxed text-slate-600">
                  {lang === "bn" ? o.overviewBn : o.overview}
                </p>
              </NoteSection>
            )}

            {o.teamNote && (
              <NoteSection id="opp-team" icon={Users} eyebrow={{ en: "PEOPLE", bn: "মানুষ" }} title={T.team}>
                <p className="leading-relaxed text-slate-600">
                  {lang === "bn" ? o.teamNoteBn : o.teamNote}
                </p>
              </NoteSection>
            )}

            {o.financialNote && (
              <NoteSection id="opp-fin" icon={LineChart} eyebrow={{ en: "NUMBERS", bn: "সংখ্যা" }} title={T.financials}>
                <p className="leading-relaxed text-slate-600">
                  {lang === "bn" ? o.financialNoteBn : o.financialNote}
                </p>
              </NoteSection>
            )}

            {useOfFunds.length > 0 && (
              <section aria-labelledby="opp-uof">
                <Head
                  id="opp-uof"
                  eyebrow={{ en: "WHERE THE MONEY GOES", bn: "অর্থ কোথায় যাবে" }}
                  title={T.useOfFunds}
                />
                <ul className="mt-5 space-y-4 rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_12px_30px_-18px_rgba(6,31,74,0.15)] md:p-7">
                  {useOfFunds.map((u, i) => {
                    const est = (mid * u.pct) / 100;
                    return (
                      <li key={u.item.en}>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                          <span className="text-sm font-bold text-nx-navy-800">{t(u.item)}</span>
                          <span className="flex items-baseline gap-2">
                            <span className="nx-num text-sm font-extrabold text-nx-navy-900">
                              {lang === "bn" ? `${bnNum(u.pct)}%` : `${u.pct}%`}
                            </span>
                            <span className="nx-num text-[12px] font-bold text-nx-navy-500">
                              ≈ {formatTk(est, lang)}
                            </span>
                          </span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-nx-navy-100">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${u.pct}%` }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                            className="h-full rounded-full bg-gradient-to-r from-nx-navy-700 to-nx-cyan-500"
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-3 text-[12px] leading-relaxed text-slate-500">
                  {t(T.uofNote(formatTk(mid, lang)))}
                </p>
              </section>
            )}

            {/* key risks — always visible */}
            {o.risks && o.risks.length > 0 && (
              <section
                aria-labelledby="opp-risks"
                className="rounded-3xl border border-amber-300/60 bg-amber-50/70 p-6 md:p-7"
              >
                <h2 id="opp-risks" className="flex flex-wrap items-center gap-2.5 text-lg font-extrabold text-nx-navy-900">
                  <AlertTriangle className="h-5 w-5 text-amber-500" aria-hidden="true" />
                  {t(T.risks)}
                  <span className="nx-num rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-extrabold text-nx-warn-700">
                    {t(T.risksCount(riskCount))}
                  </span>
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {o.risks.map((r, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate-700">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                      {t(r)}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[13px] leading-relaxed text-slate-500">{t(T.risksNote)}</p>
              </section>
            )}

            {/* what happens after registering interest */}
            <section aria-labelledby="opp-next">
              <Head
                id="opp-next"
                eyebrow={{ en: "NEXT STEPS", bn: "পরবর্তী ধাপ" }}
                title={T.nextTitle}
              />
              <ol className="mt-6 grid gap-5 md:grid-cols-3">
                {T.nextSteps.map((s, i) => {
                  const Icon = [Briefcase, FileSignature, KeyRound][i];
                  return (
                    <motion.li
                      key={s.title.en}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                      className="relative rounded-3xl border border-nx-navy-100 bg-white p-5 pt-7 shadow-[0_12px_30px_-18px_rgba(6,31,74,0.15)]"
                    >
                      <span className="nx-num absolute -top-3.5 left-5 flex h-7 w-7 items-center justify-center rounded-full bg-nx-navy-700 text-[12px] font-extrabold text-white shadow-[0_8px_16px_-6px_rgba(10,58,143,0.6)]">
                        {lang === "bn" ? bnNum(i + 1) : i + 1}
                      </span>
                      <Icon className="h-5 w-5 text-nx-cyan-600" aria-hidden="true" />
                      <h3 className="mt-3 text-[15px] leading-snug font-extrabold text-nx-navy-900">
                        {t(s.title)}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{t(s.copy)}</p>
                    </motion.li>
                  );
                })}
              </ol>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <CyanButton onClick={() => openInvestor("investor")}>{t(T.registerCta)}</CyanButton>
                <p className="text-[12px] leading-relaxed text-slate-500">{t(T.nextFeeNote)}</p>
              </div>
            </section>
          </div>

          {/* ── side column ── */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* register CTA */}
            <div className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_12px_30px_-18px_rgba(6,31,74,0.2)]">
              <p className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-navy-600 uppercase">
                {t(T.asideRegTitle)}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{t(T.asideRegCopy)}</p>
              <CyanButton className="mt-4 w-full justify-center" onClick={() => openInvestor("investor")}>
                {t(T.registerCta)}
              </CyanButton>
            </div>

            {o.advisorNote && (
              <div className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_12px_30px_-18px_rgba(6,31,74,0.2)]">
                <p className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-navy-600 uppercase">
                  {t(T.advisor)}
                </p>
                <p className="mt-3 flex gap-2 text-sm leading-relaxed text-slate-600">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-nx-navy-400" aria-hidden="true" />
                  {lang === "bn" ? o.advisorNoteBn : o.advisorNote}
                </p>
              </div>
            )}

            {o.modelNote && (
              <div className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_12px_30px_-18px_rgba(6,31,74,0.2)]">
                <p className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-navy-600 uppercase">
                  {t(T.modelTitle)}
                </p>
                <p className="mt-3 flex gap-2 text-sm leading-relaxed text-slate-600">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-nx-navy-400" aria-hidden="true" />
                  {lang === "bn" ? o.modelNoteBn : o.modelNote}
                </p>
              </div>
            )}

            {o.revenue && (
              <div className="nx-navy-grid rounded-3xl bg-nx-navy-950 p-6 text-white">
                <p className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-cyan-300 uppercase">
                  {t(T.revenueTitle)}
                </p>
                <p className="nx-num mt-2 text-xl font-extrabold">
                  {lang === "bn" ? o.revenueBn : o.revenue}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-white/75">{t(T.revenueNote)}</p>
              </div>
            )}

            {/* compare — same shortlist as the home section */}
            <CompareCard o={o} cmp={cmp} />

            <button
              onClick={() => navigateTo("opportunities")}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-nx-navy-200 bg-white px-5 py-3 text-sm font-bold text-nx-navy-800 transition-colors hover:border-nx-navy-400"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t(T.backToList)}
            </button>
          </aside>
        </div>

        {/* prev / next */}
        <nav
          aria-label={lang === "bn" ? "তালিকা নেভিগেশন" : "Listing navigation"}
          className="mt-14 grid gap-4 border-t border-nx-navy-100 pt-8 sm:grid-cols-2"
        >
          {prev ? (
            <button
              onClick={() => navigateTo("opportunities", prev.slug)}
              className="group rounded-3xl border border-nx-navy-100 bg-white p-5 text-left transition-all hover:border-nx-navy-300 hover:shadow-[0_14px_30px_-16px_rgba(6,31,74,0.2)]"
            >
              <span className="flex items-center gap-1.5 text-xs font-bold text-nx-navy-500">
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                {t(T.prevOpp)}
              </span>
              <span className="nx-num mt-1.5 block font-extrabold text-nx-navy-900 group-hover:text-nx-navy-700">
                {prev.codeName}
              </span>
              <span className="mt-0.5 block text-[12px] font-semibold text-nx-navy-500">
                {lang === "bn" ? prev.sectorBn : prev.sector}
              </span>
            </button>
          ) : (
            <span aria-hidden="true" />
          )}
          {next && (
            <button
              onClick={() => navigateTo("opportunities", next.slug)}
              className="group rounded-3xl border border-nx-navy-100 bg-white p-5 text-right transition-all hover:border-nx-navy-300 hover:shadow-[0_14px_30px_-16px_rgba(6,31,74,0.2)] sm:col-start-2"
            >
              <span className="flex items-center justify-end gap-1.5 text-xs font-bold text-nx-navy-500">
                {t(T.nextOpp)}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="nx-num mt-1.5 block font-extrabold text-nx-navy-900 group-hover:text-nx-navy-700">
                {next.codeName}
              </span>
              <span className="mt-0.5 block text-[12px] font-semibold text-nx-navy-500">
                {lang === "bn" ? next.sectorBn : next.sector}
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
            <CyanButton onClick={() => openInvestor("investor")}>{t(T.registerCta)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("vetting")}>
              {t(T.howVerified)}
            </OutlineLightButton>
          </>
        }
      />
    </>
  );
}

function DetailSkeleton() {
  const { lang } = useLanguage();
  return (
    <div className="bg-nx-navy-950" aria-busy="true">
      <div className="mx-auto max-w-[1200px] px-5 pb-16 pt-24 md:px-6 md:pt-32">
        <Skeleton className="nx-shimmer h-4 w-40" />
        <div className="mt-8 grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-14">
          <div className="space-y-4">
            <Skeleton className="nx-shimmer h-3 w-32" />
            <Skeleton className="nx-shimmer h-10 w-2/3" />
            <Skeleton className="nx-shimmer h-4 w-full" />
            <Skeleton className="nx-shimmer h-4 w-5/6" />
            <div className="flex flex-wrap gap-2 pt-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="nx-shimmer h-8 w-24 rounded-full" />
              ))}
            </div>
          </div>
          <Skeleton className="nx-shimmer mx-auto aspect-[4/5] w-full max-w-[340px] rounded-full" />
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{T.loading[lang]}</p>
    </div>
  );
}

/* ── compare aside card (detail page) ─────────────────────────────────── */

function CompareCard({ o, cmp }: { o: OpportunityDTO; cmp: CompareApi }) {
  const { t } = useLanguage();
  const selected = cmp.slugs.includes(o.slug);
  const others = cmp.items.filter((x) => x.slug !== o.slug);
  return (
    <div className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_12px_30px_-18px_rgba(6,31,74,0.2)]">
      <p className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-navy-600 uppercase">
        {t(T.cmpTitle)}
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{t(T.cmpHint)}</p>
      {others.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {others.map((x) => (
            <span
              key={x.slug}
              className="nx-num rounded-full bg-nx-mist px-2.5 py-1 text-[11px] font-bold text-nx-navy-800"
            >
              {x.codeName}
            </span>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => cmp.toggle(o.slug)}
        aria-pressed={selected}
        className={cn(
          "mt-4 flex w-full items-center justify-center gap-1.5 rounded-full border px-4 py-2.5 text-[13px] font-bold transition-colors",
          selected
            ? "border-nx-navy-700 bg-nx-navy-700 text-white"
            : "border-dashed border-nx-navy-300 bg-white text-nx-navy-600 hover:border-nx-cyan-400 hover:text-nx-cyan-700"
        )}
      >
        {selected ? (
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <GitCompareArrows className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        {selected ? t(CMP.chipAriaOn) : t(CMP.chipAria)}
      </button>
      {cmp.items.length >= 2 && (
        <button
          type="button"
          onClick={() => cmp.setOpen(true)}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-nx-cyan-500 px-4 py-2.5 text-[13px] font-bold text-nx-navy-900 transition-colors hover:bg-nx-cyan-400"
        >
          <span className="nx-num rounded-full bg-nx-navy-900/10 px-1.5 text-[11px] font-extrabold">
            {t(CMP.selected(cmp.items.length))}
          </span>
          {t(CMP.open)}
        </button>
      )}
    </div>
  );
}

/* ── compare surfaces: cap toast + floating tray + comparison dialog ──── */

function CompareSurf({ cmp }: { cmp: CompareApi }) {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  return (
    <>
      {/* cap toast (max 3) */}
      <AnimatePresence>
        {cmp.capToast && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.97 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="pointer-events-none fixed inset-x-0 bottom-[calc(72px+env(safe-area-inset-bottom))] z-[60] flex justify-center px-4 md:bottom-24"
          >
            <p
              role="status"
              className="flex items-center gap-2 rounded-full bg-nx-navy-900 px-4 py-2.5 text-xs font-bold text-white shadow-[0_18px_40px_-16px_rgba(6,31,74,0.65)]"
            >
              <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-nx-cyan-400" aria-hidden="true" />
              {t(CMP.maxToast)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* floating tray — mirrors the home Opportunities section */}
      <AnimatePresence>
        {cmp.slugs.length > 0 && !cmp.open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 48 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
            className="pointer-events-none fixed inset-x-0 bottom-[calc(72px+env(safe-area-inset-bottom))] z-50 flex justify-center px-4 md:bottom-6"
          >
            <div
              role="group"
              aria-label={t(CMP.barAria)}
              className="pointer-events-auto flex max-w-full items-center gap-2 rounded-full border border-nx-navy-200 bg-white py-2 pl-2.5 pr-2 shadow-[0_24px_50px_-20px_rgba(6,31,74,0.5)]"
            >
              <span className="nx-num shrink-0 rounded-full bg-nx-navy-700 px-2.5 py-1.5 text-[11px] font-extrabold text-white">
                {t(CMP.selected(cmp.items.length))}
              </span>
              <span className="hidden shrink-0 items-center gap-1.5 sm:flex">
                {cmp.items.map((x) => (
                  <span
                    key={x.slug}
                    className="nx-num rounded-full bg-nx-mist px-2.5 py-1.5 text-[11px] font-bold text-nx-navy-800"
                  >
                    {x.codeName}
                  </span>
                ))}
              </span>
              <span className="shrink-0">
                <button
                  type="button"
                  onClick={() => cmp.setOpen(true)}
                  disabled={cmp.items.length < 2}
                  className="nx-arrow-btn inline-flex items-center gap-1.5 rounded-full bg-nx-navy-700 px-4 py-2 text-[13px] font-bold text-white transition-colors hover:bg-nx-navy-600 disabled:cursor-not-allowed disabled:bg-nx-navy-200 disabled:hover:bg-nx-navy-200"
                >
                  {t(CMP.open)}
                  <GitCompareArrows className="hidden h-3.5 w-3.5 sm:block" aria-hidden="true" />
                </button>
              </span>
              <button
                type="button"
                onClick={() => cmp.setSlugs([])}
                aria-label={t(CMP.clear)}
                title={t(CMP.clear)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-nx-mist hover:text-nx-navy-800"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* side-by-side comparison dialog */}
      <CompareDialog
        open={cmp.open}
        onOpenChange={cmp.setOpen}
        items={cmp.items}
        onRemove={(slug) => {
          const nextSlugs = cmp.slugs.filter((s) => s !== slug);
          cmp.setSlugs(nextSlugs);
          if (nextSlugs.length === 0) cmp.setOpen(false);
        }}
      />
    </>
  );
}

/* ── shared bits ──────────────────────────────────────────────────────── */

/** SectionHead look-alike that attaches the id to the h2, so each
 *  <section aria-labelledby> on this page resolves to a real heading. */
function Head({
  id,
  eyebrow,
  title,
  copy,
}: {
  id: string;
  eyebrow?: L | string;
  title: L | string;
  copy?: L | string;
}) {
  const { t } = useLanguage();
  return (
    <div className="max-w-2xl">
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

/** Icon-headed note section (overview / team / financials). */
function NoteSection({
  id,
  icon: Icon,
  eyebrow,
  title,
  children,
}: {
  id: string;
  icon: LucideIcon;
  eyebrow: L | string;
  title: L | string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id}>
      <Head id={id} eyebrow={eyebrow} title={title} />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.35 }}
        className="mt-5 flex gap-4 rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_12px_30px_-18px_rgba(6,31,74,0.15)] md:gap-5 md:p-7"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-nx-navy-900 text-nx-cyan-400">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">{children}</div>
      </motion.div>
    </section>
  );
}

function GetStartedAndContact() {
  const { lang } = useLanguage();
  return (
    <>
      <CyanButton onClick={() => navigateTo("get-started")}>
        {lang === "bn" ? "শুরু করুন" : "Get started"}
      </CyanButton>
      <OutlineLightButton onClick={() => navigateTo("contact")}>
        {lang === "bn" ? "কথা বলুন" : "Talk to us"}
      </OutlineLightButton>
    </>
  );
}
