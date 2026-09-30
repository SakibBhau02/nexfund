"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Banknote,
  Briefcase,
  FileText,
  Landmark,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { navigateTo } from "@/lib/page-router";
import { formatTkRange, bnNum } from "@/lib/format";
import type { OpportunityDTO } from "../opportunities";
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
import { Skeleton } from "@/components/ui/skeleton";

/**
 * R10 Opportunities landing page + per-opportunity details page.
 *   #p/opportunities            → filterable listing grid
 *   #p/opportunities/<slug>     → full details page for one listing
 * Data: same /api/opportunities feed as the home section (verified facts only).
 */

const T = {
  heroCopy: {
    en: "A live, curated shortlist of verified Bangladeshi businesses seeking capital. Every listing passed the five-pillar vetting standard before it earned this page — click any card for the full fact-pack.",
    bn: "পুঁজি খুঁজছে এমন যাচাইকৃত বাংলাদেশি ব্যবসার সাজানো তালিকা। প্রতিটি তালিকা এই পাতায় আসার আগে পাঁচ-স্তম্ভের যাচাই পাস করেছে — সম্পূর্ণ ফ্যাক্ট-প্যাকের জন্য যেকোনো কার্ডে ক্লিক করুন।",
  },
  allSectors: { en: "All sectors", bn: "সব খাত" } as const,
  countLabel: (n: number) =>
    ({
      en: n === 1 ? "1 verified listing" : `${n} verified listings`,
      bn: n === 1 ? "১টি যাচাইকৃত তালিকা" : `${n}টি যাচাইকৃত তালিকা`,
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
  /* details page */
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
  registerCta: { en: "Register interest", bn: "আগ্রহ নিবন্ধন করুন" } as const,
  backToList: { en: "All opportunities", bn: "সব সুযোগ" } as const,
  prevOpp: { en: "Previous listing", bn: "পূর্ববর্তী তালিকা" } as const,
  nextOpp: { en: "Next listing", bn: "পরবর্তী তালিকা" } as const,
  stageLabel: (s: number, lang: "bn" | "en") =>
    ({
      en: `Stage ${s} of 5`,
      bn: `ধাপ ৫টির মধ্যে ${bnNum(s)}`,
    }) as const,
  ctaTitle: { en: "None of them a fit? Let us match you.", bn: "কোনোটাই মানানসই নয়? আমরা ম্যাচ করি।" } as const,
  ctaCopy: {
    en: "Tell us your sector, ticket size and risk appetite in a three-minute registration — new verified listings reach matching investors first.",
    bn: "তিন মিনিটের নিবন্ধনে খাত, টিকেট সাইজ ও ঝুঁকির পছন্দ জানান — নতুন যাচাইকৃত তালিকা আগে পৌঁছায় ম্যাচিং বিনিয়োগকারীর কাছে।",
  } as const,
};

export default function OpportunitiesPage({ detail }: { detail: string | null }) {
  const { lang } = useLanguage();
  const { data, isLoading, error, refetch } = useQuery<OpportunityDTO[]>({
    queryKey: ["opportunities"],
    queryFn: async () => {
      const res = await fetch("/api/opportunities");
      if (!res.ok) throw new Error("Failed to load");
      return res.json();
    },
    staleTime: 60_000,
  });

  if (detail) {
    return (
      <OpportunityDetail
        detail={detail}
        data={data ?? null}
        isLoading={isLoading}
        error={error ? true : false}
        onRetry={() => refetch()}
      />
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
        badge={
          data ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-[12px] font-bold text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              {T.countLabel(data.length)[lang]}
            </span>
          ) : undefined
        }
        actions={
          <OutlineLightButton onClick={() => navigateTo("vetting")}>
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            {lang === "bn" ? "যাচাই মানদণ্ড দেখুন" : "See the vetting standard"}
          </OutlineLightButton>
        }
      />

      <PageBody>
        {isLoading ? (
          <ListingSkeleton />
        ) : error || !data ? (
          <div className="mx-auto max-w-lg rounded-3xl border border-nx-navy-100 bg-white p-10 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
              <AlertTriangle className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-lg font-extrabold text-nx-navy-900">{T.errorTitle[lang]}</h2>
            <p className="mt-2 text-sm text-slate-600">{T.errorSub[lang]}</p>
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
    </>
  );
}

/* ── Listing grid ─────────────────────────────────────────────────────── */

function ListingSkeleton() {
  const { lang } = useLanguage();
  return (
    <div>
      <p className="sr-only" aria-live="polite">{T.loading[lang]}</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="rounded-3xl border border-nx-navy-100 bg-white p-6">
            <div className="flex gap-4">
              <Skeleton className="nx-shimmer h-24 w-20 rounded-full" />
              <div className="flex-1 space-y-2.5">
                <Skeleton className="nx-shimmer h-4 w-3/4" />
                <Skeleton className="nx-shimmer h-3 w-1/2" />
                <Skeleton className="nx-shimmer h-3 w-2/3" />
              </div>
            </div>
            <Skeleton className="nx-shimmer mt-5 h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ListingGrid({ data }: { data: OpportunityDTO[] }) {
  const { lang } = useLanguage();
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

  return (
    <div>
      {/* sector pills */}
      <div className="mb-8 flex flex-wrap items-center gap-2" role="group" aria-label={lang === "bn" ? "খাত অনুযায়ী ছাঁকনি" : "Filter by sector"}>
        <button
          onClick={() => setSector("all")}
          aria-pressed={sector === "all"}
          className={cn(
            "rounded-full border px-4 py-2 text-[13px] font-bold transition-colors",
            sector === "all"
              ? "border-nx-navy-700 bg-nx-navy-700 text-white"
              : "border-nx-navy-200 bg-white text-nx-navy-700 hover:border-nx-navy-400"
          )}
        >
          {T.allSectors[lang]}
        </button>
        {sectors.map(([key, bn]) => (
          <button
            key={key}
            onClick={() => setSector(key)}
            aria-pressed={sector === key}
            className={cn(
              "rounded-full border px-4 py-2 text-[13px] font-bold transition-colors",
              sector === key
                ? "border-nx-navy-700 bg-nx-navy-700 text-white"
                : "border-nx-navy-200 bg-white text-nx-navy-700 hover:border-nx-navy-400"
            )}
          >
            {lang === "bn" ? bn : key}
          </button>
        ))}
      </div>

      <p className="mb-6 text-sm font-semibold text-nx-navy-700" aria-live="polite">
        {T.countLabel(filtered.length)[lang]}
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((o, i) => (
          <motion.article
            key={o.slug}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
          >
            <button
              onClick={() => navigateTo("opportunities", o.slug)}
              className="group flex h-full w-full flex-col rounded-3xl border border-nx-navy-100 bg-white p-6 text-left shadow-[0_10px_30px_-16px_rgba(6,31,74,0.15)] transition-all hover:-translate-y-1 hover:border-nx-navy-300 hover:shadow-[0_22px_44px_-18px_rgba(6,31,74,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-500"
            >
              <div className="flex items-start gap-4">
                <span className="relative h-20 w-16 shrink-0">
                  <Image
                    src={o.image}
                    alt={`${o.codeName} — ${lang === "bn" ? o.sectorBn : o.sector}`}
                    fill
                    sizes="64px"
                    className="rounded-full object-cover"
                  />
                </span>
                <div className="min-w-0">
                  <h2 className="truncate text-lg font-extrabold text-nx-navy-900">{o.codeName}</h2>
                  <p className="mt-1 text-[13px] font-semibold text-nx-navy-600">
                    {lang === "bn" ? o.sectorBn : o.sector} · {lang === "bn" ? o.locationBn : o.location}
                  </p>
                </div>
              </div>
              <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-slate-600">
                {lang === "bn" ? o.headlineBn : o.headline}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-nx-navy-100 pt-4">
                <span className="nx-num text-[13px] font-bold text-nx-navy-800">
                  {formatTkRange(o.seekingMin, o.seekingMax, lang)}
                </span>
                <span className="inline-flex items-center gap-1 text-[13px] font-bold text-nx-cyan-600 transition-colors group-hover:text-nx-cyan-500">
                  {T.viewDetails[lang]}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </button>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

/* ── Details page ─────────────────────────────────────────────────────── */

function OpportunityDetail({
  detail,
  data,
  isLoading,
  error,
  onRetry,
}: {
  detail: string;
  data: OpportunityDTO[] | null;
  isLoading: boolean;
  error: boolean;
  onRetry: () => void;
}) {
  const { lang, t } = useLanguage();
  const openInvestor = useDialogStore((s) => s.openInvestor);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1200px] px-5 py-24 md:px-6">
        <Skeleton className="nx-shimmer h-8 w-1/2" />
        <Skeleton className="nx-shimmer mt-6 h-40 w-full rounded-3xl" />
        <p className="sr-only" aria-live="polite">{T.loading[lang]}</p>
      </div>
    );
  }

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
          </>
        }
        actions={
          <>
            <CyanButton onClick={() => openInvestor("investor")}>{t(T.registerCta)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("contact")}>
              {lang === "bn" ? "অ্যাডভাইজরের সাথে কথা বলুন" : "Talk to an advisor"}
            </OutlineLightButton>
          </>
        }
      />

      <PageBody className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* main column */}
          <div className="min-w-0 space-y-10">
            {o.overview && (
              <section aria-labelledby="opp-overview">
                <SectionHead eyebrow={{ en: "THE BUSINESS", bn: "ব্যবসা" }} title={T.overview} />
                <p className="mt-5 leading-relaxed text-slate-600">
                  {lang === "bn" ? o.overviewBn : o.overview}
                </p>
              </section>
            )}

            {o.teamNote && (
              <section aria-labelledby="opp-team">
                <SectionHead eyebrow={{ en: "PEOPLE", bn: "মানুষ" }} title={T.team} />
                <p className="mt-5 leading-relaxed text-slate-600">
                  {lang === "bn" ? o.teamNoteBn : o.teamNote}
                </p>
              </section>
            )}

            {o.financialNote && (
              <section aria-labelledby="opp-fin">
                <SectionHead eyebrow={{ en: "NUMBERS", bn: "সংখ্যা" }} title={T.financials} />
                <p className="mt-5 leading-relaxed text-slate-600">
                  {lang === "bn" ? o.financialNoteBn : o.financialNote}
                </p>
              </section>
            )}

            {o.useOfFunds && o.useOfFunds.length > 0 && (
              <section aria-labelledby="opp-uof">
                <SectionHead eyebrow={{ en: "WHERE THE MONEY GOES", bn: "অর্থ কোথায় যাবে" }} title={T.useOfFunds} />
                <ul className="mt-5 space-y-4">
                  {o.useOfFunds.map((u) => (
                    <li key={u.item.en}>
                      <div className="flex items-center justify-between text-sm font-bold text-nx-navy-800">
                        <span>{t(u.item)}</span>
                        <span className="nx-num text-nx-navy-600">{o.seekingMin > 0 ? `${u.pct}%` : ""}</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-nx-navy-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-nx-navy-700 to-nx-cyan-500"
                          style={{ width: `${u.pct}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {o.risks && o.risks.length > 0 && (
              <section
                aria-labelledby="opp-risks"
                className="rounded-3xl border border-amber-300/60 bg-amber-50/70 p-6 md:p-7"
              >
                <h2 id="opp-risks" className="flex items-center gap-2 text-lg font-extrabold text-nx-navy-900">
                  <AlertTriangle className="h-5 w-5 text-amber-500" aria-hidden="true" />
                  {t(T.risks)}
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
          </div>

          {/* side column */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
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
                  {lang === "bn" ? "বিজনেস মডেল" : "Business model"}
                </p>
                <p className="mt-3 flex gap-2 text-sm leading-relaxed text-slate-600">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-nx-navy-400" aria-hidden="true" />
                  {lang === "bn" ? o.modelNoteBn : o.modelNote}
                </p>
              </div>
            )}
            {o.revenue && (
              <div className="rounded-3xl bg-nx-navy-950 nx-navy-grid p-6 text-white">
                <p className="nx-eyebrow text-[11px] font-extrabold tracking-[0.22em] text-nx-cyan-300 uppercase">
                  {lang === "bn" ? "রাজস্ব (যাচাইকৃত)" : "Revenue (verified)"}
                </p>
                <p className="mt-2 text-xl font-extrabold">
                  {lang === "bn" ? o.revenueBn : o.revenue}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                  {lang === "bn"
                    ? "আর্থিক বিবরণী যাচাই করে প্রকাশিত — সংবেদনশীল অঙ্ক ডেটা রুমে সংরক্ষিত।"
                    : "Figures published after financial verification — sensitive detail stays in the data room."}
                </p>
              </div>
            )}
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
              <span className="mt-1.5 block font-extrabold text-nx-navy-900 group-hover:text-nx-navy-700">
                {prev.codeName}
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
              <span className="mt-1.5 block font-extrabold text-nx-navy-900 group-hover:text-nx-navy-700">
                {next.codeName}
              </span>
            </button>
          )}
        </nav>
      </PageBody>

      <CtaBand
        title={{ en: "Ready to look closer?", bn: "কাছ থেকে দেখতে চান?" }}
        copy={{
          en: "Registered investors receive the full data-room key for this listing — financials, contracts and the advisor's verification notes.",
          bn: "নিবন্ধিত বিনিয়োগকারীরা এই তালিকার সম্পূর্ণ ডেটা-রুমের চাবি পান — আর্থিক বিবরণী, চুক্তি ও অ্যাডভাইজরের যাচাই-নোটসহ।",
        }}
        actions={
          <>
            <CyanButton onClick={() => openInvestor("investor")}>{t(T.registerCta)}</CyanButton>
            <OutlineLightButton onClick={() => navigateTo("vetting")}>
              {lang === "bn" ? "যাচাই প্রক্রিয়া দেখুন" : "How it was verified"}
            </OutlineLightButton>
          </>
        }
      />
    </>
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
