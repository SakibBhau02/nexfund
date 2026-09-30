"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  AArrowDown,
  AArrowUp,
  ArrowUpRight,
  BookMarked,
  Calendar,
  CircleCheck,
  Clock,
  FileQuestion,
  Printer,
  Share2,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { INSIGHTS, READER, ARTICLES, GLOSSARY_LABELS, SHARE, READERTOC, READER_FONT, READER_PRINT, BRAND } from "@/lib/content";
import { bnNum } from "@/lib/format";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { G } from "@/components/site/glossary";

type ReaderCard = (typeof INSIGHTS.articles)[number];
type ReaderArticle = (typeof ARTICLES)[string];

/**
 * Insight article reader dialog (R4-3) — the "Read the guide" cards open the
 * full bilingual article here instead of teasing the investor registration.
 *
 * Architecture note (R6): all per-article state (share, reading progress,
 * mini-TOC position, minutes-left) lives in <ReaderContent>, which is keyed
 * by slug and mounted inside DialogContent — Radix unmounts the content when
 * the dialog closes, so every open starts from a clean slate without any
 * reset effects.
 */
export function InsightDialog() {
  const { t } = useLanguage();
  const dialog = useDialogStore((s) => s.dialog);
  const slug = useDialogStore((s) => s.insightSlug);
  const close = useDialogStore((s) => s.close);
  const openInsight = useDialogStore((s) => s.openInsight);
  const isOpen = dialog === "insight";

  /* the scroll host is DialogContent itself — shared with ReaderContent */
  const scrollElRef = useRef<HTMLDivElement | null>(null);

  /* R5: deep-link — #insight=<slug> opens the article directly (permalink) */
  useEffect(() => {
    const m = /^#insight=([a-z0-9-]+)$/i.exec(window.location.hash);
    if (!m || !ARTICLES[m[1]]) return;
    // apply post-hydration via rAF so hydration markup stays consistent (simulator pattern)
    const raf = requestAnimationFrame(() => openInsight(m[1]));
    return () => cancelAnimationFrame(raf);
  }, [openInsight]);

  const card = INSIGHTS.articles.find((a) => a.slug === slug);
  const article = slug ? ARTICLES[slug] : undefined;

  /* Unknown slug → simple not-found state */
  if (isOpen && !article) {
    return (
      <Dialog open={isOpen} onOpenChange={(v) => !v && close()}>
        <DialogContent
          className="rounded-3xl p-0 sm:max-w-[440px]"
          aria-describedby={undefined}
        >
          <div className="p-8 text-center">
            <FileQuestion className="mx-auto h-10 w-10 text-nx-cyan-500" aria-hidden="true" />
            <DialogTitle className="mt-3 text-base font-bold leading-relaxed text-nx-navy-900">
              {t(READER.notFound)}
            </DialogTitle>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!card || !article || !slug) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(v) => !v && close()}>
      <DialogContent
        ref={scrollElRef}
        aria-describedby={undefined}
        className="nx-scroll max-h-[90vh] gap-0 overflow-y-auto rounded-3xl p-0 sm:max-w-[720px] [&_[data-slot=dialog-close]]:rounded-full [&_[data-slot=dialog-close]]:bg-white/15 [&_[data-slot=dialog-close]]:p-1.5 [&_[data-slot=dialog-close]]:text-white [&_[data-slot=dialog-close]]:backdrop-blur [&_[data-slot=dialog-close]]:transition-colors [&_[data-slot=dialog-close]]:hover:bg-white/30"
      >
        {isOpen ? (
          <ReaderContent key={slug} slug={slug} card={card} article={article} scrollElRef={scrollElRef} />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

/** Per-article reader body — keyed by slug, so state resets on remount. */
function ReaderContent({
  slug,
  card,
  article,
  scrollElRef,
}: {
  slug: string;
  card: ReaderCard;
  article: ReaderArticle;
  scrollElRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { lang, t } = useLanguage();
  const open = useDialogStore((s) => s.open);
  const openInvestor = useDialogStore((s) => s.openInvestor);
  const reduce = useReducedMotion();

  /* ── R5: share — native share sheet where available, clipboard fallback ── */
  const [shareState, setShareState] = useState<"idle" | "copied" | "failed">("idle");
  const shareTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── R8: font-size control (A−/A+) — 3 steps, persisted so the choice
     survives reopen. State lives in the keyed ReaderContent, which keeps it
     across BN⇄EN (dialogs sit outside the language cross-fade). */
  const [fontStep, setFontStep] = useState<"-1" | "0" | "1">(() => {
    try {
      const v = window.localStorage.getItem("nx-reader-font");
      return v === "-1" || v === "1" ? v : "0";
    } catch {
      return "0";
    }
  });
  const changeFont = (dir: -1 | 1) => {
    const next = Math.max(-1, Math.min(1, Number(fontStep) + dir));
    const v = (next === 0 ? "0" : next === -1 ? "-1" : "1") as "-1" | "0" | "1";
    setFontStep(v);
    try {
      window.localStorage.setItem("nx-reader-font", v);
    } catch {
      /* storage unavailable — the step still applies for this session */
    }
  };

  useEffect(
    () => () => {
      if (shareTimer.current) clearTimeout(shareTimer.current);
    },
    []
  );

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}#insight=${slug}`;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: document.title, url });
        return; // share sheet handled it — no local state change needed
      } catch {
        // user dismissed the sheet, or share failed → fall through to clipboard
      }
    }
    let ok = false;
    try {
      await navigator.clipboard.writeText(url);
      ok = true;
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    setShareState(ok ? "copied" : "failed");
    if (shareTimer.current) clearTimeout(shareTimer.current);
    shareTimer.current = setTimeout(() => setShareState("idle"), 2600);
  };

  /* ── Reading progress + R6 mini-TOC tracking + minutes-left ── */
  const progressWrapRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const secRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSec, setActiveSec] = useState(0);
  const [minLeft, setMinLeft] = useState<number | null>(null);
  const lastLeftRef = useRef(-1); // last displayed minutes-left

  // native scroll listener on the dialog's scroll host (DialogContent) —
  // setState only fires from the event callback, never from the effect body
  useEffect(() => {
    const host = scrollElRef.current;
    if (!host) return;
    const onScroll = () => {
      const denom = host.scrollHeight - host.clientHeight;
      const p = denom > 0 ? Math.min(1, Math.max(0, host.scrollTop / denom)) : 0;
      if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${p})`;
      if (progressWrapRef.current) {
        progressWrapRef.current.setAttribute("aria-valuenow", String(Math.round(p * 100)));
      }

      /* track the section currently at the top of the viewport */
      const secs = secRefs.current;
      if (secs.length > 0) {
        const hostTop = host.getBoundingClientRect().top;
        let idx = 0;
        for (let i = 0; i < secs.length; i++) {
          const s = secs[i];
          if (s && s.getBoundingClientRect().top - hostTop <= 160) idx = i;
        }
        const found = idx;
        setActiveSec((prev) => (prev === found ? prev : found));
      }

      /* remaining reading time — re-renders only when the minute changes */
      const left = Math.max(0, Math.ceil(card.minutes * (1 - p)));
      if (left !== lastLeftRef.current) {
        lastLeftRef.current = left;
        setMinLeft(left);
      }
    };
    host.addEventListener("scroll", onScroll, { passive: true });
    return () => host.removeEventListener("scroll", onScroll);
  }, [scrollElRef, card.minutes]);

  /* R6: TOC jump — rect math (robust vs offsetParent), no page-side scroll */
  const jumpTo = (i: number) => {
    const el = scrollElRef.current;
    const s = secRefs.current[i];
    if (!el || !s) return;
    const delta = s.getBoundingClientRect().top - el.getBoundingClientRect().top;
    el.scrollTo({ top: el.scrollTop + delta - 14, behavior: reduce ? "auto" : "smooth" });
    setActiveSec(i);
  };

  const updated = lang === "bn" ? bnNum(article.updated) : article.updated;

  /* R9: print sheet date — native locale, mirroring the compare print sheet */
  const preparedDate = new Date().toLocaleDateString(lang === "bn" ? "bn-BD" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* ── Reading progress (thin, sticky at very top) + remaining-time pill ── */}
      <div
        ref={progressWrapRef}
        role="progressbar"
        aria-label={t(READER.scrollProgressAria)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        className="sticky top-0 z-20 h-[3px] w-full"
      >
        <div
          ref={progressBarRef}
          aria-hidden="true"
          className="nx-progress-gradient h-full w-full"
          style={{ transform: "scaleX(0)" }}
        />
        {/* R6: floating minutes-left pill — rides with the sticky bar */}
        <span
          aria-hidden="true"
          className="nx-num pointer-events-none absolute right-4 top-[9px] inline-flex items-center gap-1 rounded-full border border-nx-navy-100 bg-white/92 px-2.5 py-1 text-[10px] font-extrabold text-nx-navy-700 shadow-[0_6px_16px_-8px_rgba(6,31,74,0.35)] backdrop-blur"
        >
          <Clock className="h-3 w-3 text-nx-cyan-500" />
          {t(READERTOC.remaining(minLeft ?? card.minutes))}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
      >
        {/* ── Hero image strip ── */}
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={card.image}
            alt={t(card.title)}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-nx-navy-900/85 via-nx-navy-900/35 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-2 p-5">
            <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-nx-navy-800 backdrop-blur">
              {t(card.category)}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {t(INSIGHTS.readTime(card.minutes))}
            </span>
            <span className="nx-num inline-flex items-center rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
              {t(READER.updatedLabel)} {updated}
            </span>
            {/* R5: share permalink — native sheet on mobile, clipboard elsewhere */}
            <button
              type="button"
              onClick={share}
              aria-live="polite"
              className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-bold text-white backdrop-blur transition-colors hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {shareState === "copied" ? (
                <Check className="h-3 w-3" aria-hidden="true" />
              ) : (
                <Share2 className="h-3 w-3" aria-hidden="true" />
              )}
              {shareState === "copied"
                ? t(SHARE.linkCopied)
                : shareState === "failed"
                  ? t(SHARE.copyFailed)
                  : t(SHARE.shareArticle)}
            </button>
            {/* R9: print / save-PDF of the full article (sheet at the end of
                the dialog; the :has()-guarded print CSS takes over) */}
            <button
              type="button"
              onClick={() => window.print()}
              title={t(READER_PRINT.button)}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-bold text-white backdrop-blur transition-colors hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Printer className="h-3 w-3" aria-hidden="true" />
              {t(READER_PRINT.button)}
            </button>
          </div>
        </div>

        {/* ── Title + short answer ── */}
        <DialogHeader className="px-6 pb-2 pt-5 sm:px-8">
          <DialogTitle className="text-xl font-extrabold leading-snug text-nx-navy-900 sm:text-2xl">
            {t(card.title)}
          </DialogTitle>
          <div className="mt-3 rounded-xl bg-nx-cyan-50 p-4 text-left">
            <p className="text-[10px] font-extrabold tracking-[0.14em] text-nx-cyan-700 uppercase">
              {t(INSIGHTS.shortAnswer)}
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-nx-ink/80">{t(card.short)}</p>
          </div>
        </DialogHeader>

        {/* ── R6: sticky mini-TOC — numbered jump chips per section ──
            R8: row restructured — scrollable chips (flex-1) + pinned A−/A+
            font-size control on the right, always reachable on mobile. */}
        <nav
          aria-label={t(READERTOC.tocLabel)}
          className="sticky top-[3px] z-10 border-b border-nx-navy-100 bg-white/92 px-6 py-2.5 backdrop-blur sm:px-8"
        >
          <div className="flex items-center gap-2">
            <div className="nx-scroll flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto pb-0.5">
              <span className="shrink-0 pr-1 text-[10px] font-extrabold tracking-[0.14em] text-slate-400 uppercase">
                {t(READERTOC.tocLabel)}
              </span>
              {article.sections.map((sec, i) => {
                const num = String(i + 1).padStart(2, "0");
                const active = activeSec === i;
                return (
                  <button
                    key={sec.h.en}
                    type="button"
                    aria-current={active ? "true" : undefined}
                    title={t(sec.h)}
                    onClick={() => jumpTo(i)}
                    className={cn(
                      "nx-num shrink-0 rounded-full border px-3 py-1 text-[11px] font-extrabold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-400",
                      active
                        ? "border-nx-navy-700 bg-nx-navy-700 text-white shadow-[0_8px_18px_-8px_rgba(10,58,143,0.7)]"
                        : "border-nx-navy-200 bg-white text-nx-navy-600 hover:border-nx-cyan-400 hover:text-nx-cyan-700"
                    )}
                  >
                    <span className="sr-only">{t(sec.h)}</span>
                    {lang === "bn" ? bnNum(num) : num}
                  </button>
                );
              })}
            </div>
            {/* R8: reading-comfort font-size control */}
            <div
              role="group"
              aria-label={t(READER_FONT.label)}
              title={t(READER_FONT.reset)}
              className="flex shrink-0 items-center gap-1"
            >
              <button
                type="button"
                onClick={() => changeFont(-1)}
                disabled={fontStep === "-1"}
                aria-label={t(READER_FONT.smaller)}
                title={t(READER_FONT.smaller)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-nx-navy-200 bg-white text-nx-navy-600 transition-colors hover:border-nx-cyan-400 hover:text-nx-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-nx-navy-200 disabled:hover:text-nx-navy-600"
              >
                <AArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => changeFont(1)}
                disabled={fontStep === "1"}
                aria-label={t(READER_FONT.larger)}
                title={t(READER_FONT.larger)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-nx-navy-200 bg-white text-nx-navy-600 transition-colors hover:border-nx-cyan-400 hover:text-nx-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-nx-navy-200 disabled:hover:text-nx-navy-600"
              >
                <AArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>

        {/* ── Article body (R8: scales with the A−/A+ control) ── */}
        <div
          className={cn(
            "px-6 pb-6 pt-4 sm:px-8",
            fontStep === "-1" && "nx-reader-sm",
            fontStep === "1" && "nx-reader-lg"
          )}
        >
          {article.sections.map((sec, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <section
                key={sec.h.en}
                ref={(el) => {
                  secRefs.current[i] = el;
                }}
                className={i > 0 ? "mt-7" : undefined}
              >
                <div className="flex items-baseline gap-3">
                  <span className="nx-num text-sm font-extrabold text-nx-cyan-500" aria-hidden="true">
                    {lang === "bn" ? bnNum(num) : num}
                  </span>
                  <h3 className="text-base font-extrabold leading-snug text-nx-navy-900 sm:text-lg">
                    {t(sec.h)}
                  </h3>
                </div>
                {t(sec.body)
                  .split("\n\n")
                  .map((p, j) => (
                    <p key={j} className="mt-2.5 text-sm leading-relaxed text-slate-600">
                      {p}
                    </p>
                  ))}
                {sec.list && (
                  <ul className="mt-3 space-y-2.5">
                    {sec.list.map((li) => (
                      <li
                        key={li.en}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600"
                      >
                        <span
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-nx-cyan-500"
                          aria-hidden="true"
                        />
                        {t(li)}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}

          {/* ── Glossary chips ── */}
          <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-nx-navy-100 pt-5">
            <span className="flex items-center gap-1 text-[11px] font-bold tracking-wide text-slate-400 uppercase">
              <BookMarked className="h-3 w-3" aria-hidden="true" />
              {t(READER.termsLabel)}
            </span>
            {article.terms.map((term) => (
              <span
                key={term}
                className="rounded-full border border-nx-cyan-200 bg-nx-cyan-50 px-2.5 py-1 text-xs font-bold text-nx-cyan-700"
              >
                <G term={term}>{t(GLOSSARY_LABELS[term] ?? { en: term, bn: term })}</G>
              </span>
            ))}
          </div>

          {/* ── Key takeaways ── */}
          <div className="mt-4 rounded-2xl border border-nx-navy-100 bg-nx-mist p-5">
            <p className="text-xs font-extrabold tracking-[0.12em] text-nx-navy-800 uppercase">
              {t(READER.keyTakeawaysTitle)}
            </p>
            <ul className="mt-3 space-y-2.5">
              {article.takeaways.map((tk) => (
                <li
                  key={tk.en}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-nx-ink/90"
                >
                  <CircleCheck
                    className="mt-0.5 h-4 w-4 shrink-0 text-nx-verified"
                    aria-hidden="true"
                  />
                  {t(tk)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* ── Next steps (non-sticky) ── */}
      <div className="mx-6 mb-6 rounded-2xl border border-nx-cyan-200 bg-gradient-to-br from-nx-cyan-50 to-white p-5 sm:mx-8">
        <p className="text-xs font-extrabold tracking-wide text-nx-navy-900 uppercase">
          {t(READER.nextStepsTitle)}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{t(READER.nextStepsSub)}</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => openInvestor("investor")}
            className="nx-arrow-btn inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-nx-navy-700 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-nx-navy-600"
          >
            {t(READER.registerCta)}
            <span className="nx-arrow">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>
          <button
            type="button"
            onClick={() => open("contact")}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-[1.5px] border-nx-navy-200 px-5 py-3 text-sm font-bold text-nx-navy-800 transition-all hover:border-nx-cyan-500"
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            {t(READER.bookCallCta)}
          </button>
        </div>
      </div>

      {/* ── R9: print-only article sheet (#insight-print) — mirrors the
          #opp-print / #cmp-print technique: display:none on screen, and the
          :has()-guarded print block in globals.css hijacks printing ONLY
          while this reader dialog is open. Ink-friendly, no images. ── */}
      <section id="insight-print" aria-hidden="true" className="hidden print:block text-nx-ink">
        {/* brand header */}
        <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 break-inside-avoid border-b-2 border-nx-navy-900 pb-2">
          <div>
            <p className="text-[17px] font-extrabold text-nx-navy-900">{t(READER_PRINT.header)}</p>
            <p className="mt-0.5 text-[11px] font-bold text-nx-cyan-700">{t(BRAND.trustLine)}</p>
          </div>
          <p className="text-[11px] text-slate-600">
            {t(READER_PRINT.prepared)}:{" "}
            <span className="nx-num font-semibold text-nx-ink">{preparedDate}</span>
          </p>
        </header>

        {/* article identity */}
        <div className="mt-3 break-inside-avoid">
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
            {t(card.category)}
          </p>
          <h2 className="mt-1 text-[16px] font-extrabold leading-snug text-nx-navy-900">
            {t(card.title)}
          </h2>
          <p className="nx-num mt-1 text-[11px] font-semibold text-slate-600">
            {t(READER_PRINT.readTime(card.minutes))} · {t(READER.updatedLabel)} {updated}
          </p>
        </div>

        {/* short answer */}
        <div className="mt-3 break-inside-avoid border border-nx-navy-200 px-3 py-2.5">
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
            {t(INSIGHTS.shortAnswer)}
          </p>
          <p className="mt-1 text-[12px] leading-relaxed">{t(card.short)}</p>
        </div>

        {/* body sections */}
        {article.sections.map((sec, i) => {
          const num = String(i + 1).padStart(2, "0");
          return (
            <section key={sec.h.en} className="mt-3 break-inside-avoid">
              <h3 className="border-b border-nx-navy-200 pb-0.5 text-[13px] font-extrabold text-nx-navy-900">
                <span className="nx-num">{lang === "bn" ? bnNum(num) : num}.</span> {t(sec.h)}
              </h3>
              {t(sec.body)
                .split("\n\n")
                .map((p, j) => (
                  <p key={j} className="mt-1.5 text-[11.5px] leading-relaxed">
                    {p}
                  </p>
                ))}
              {sec.list && (
                <ul className="mt-1.5 space-y-1">
                  {sec.list.map((li) => (
                    <li key={li.en} className="flex items-start gap-2 text-[11.5px] leading-relaxed">
                      <span
                        className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-nx-navy-700"
                        aria-hidden="true"
                      />
                      {t(li)}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}

        {/* glossary terms (plain text — chips don't belong on paper) */}
        <section className="mt-4 break-inside-avoid">
          <h3 className="border-b border-nx-navy-200 pb-0.5 text-[13px] font-extrabold text-nx-navy-900">
            {t(READER.termsLabel)}
          </h3>
          <p className="mt-1.5 text-[11.5px] leading-relaxed text-slate-600">
            {article.terms
              .map((term) => t(GLOSSARY_LABELS[term] ?? { en: term, bn: term }))
              .join(" · ")}
          </p>
        </section>

        {/* key takeaways */}
        <section className="mt-4 break-inside-avoid border border-nx-navy-200 px-3 py-2.5">
          <h3 className="text-[13px] font-extrabold text-nx-navy-900">
            {t(READER.keyTakeawaysTitle)}
          </h3>
          <ul className="mt-1.5 space-y-1.5">
            {article.takeaways.map((tk) => (
              <li key={tk.en} className="flex items-start gap-2 text-[11.5px] leading-relaxed">
                <span
                  className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-nx-navy-700"
                  aria-hidden="true"
                />
                {t(tk)}
              </li>
            ))}
          </ul>
        </section>

        {/* footer */}
        <footer className="mt-4 break-inside-avoid border-t border-nx-navy-200 pt-2">
          <p className="text-[10.5px] leading-relaxed text-slate-600">
            {t(READER_PRINT.disclaimer)}
          </p>
        </footer>
      </section>
    </>
  );
}
