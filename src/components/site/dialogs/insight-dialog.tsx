"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { UIEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookMarked,
  Calendar,
  CircleCheck,
  Clock,
  FileQuestion,
  Share2,
  Check,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { INSIGHTS, READER, ARTICLES, GLOSSARY_LABELS, SHARE } from "@/lib/content";
import { bnNum } from "@/lib/format";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { G } from "@/components/site/glossary";

/**
 * Insight article reader dialog (R4-3) — the "Read the guide" cards open the
 * full bilingual article here instead of teasing the investor registration.
 */
export function InsightDialog() {
  const { lang, t } = useLanguage();
  const dialog = useDialogStore((s) => s.dialog);
  const slug = useDialogStore((s) => s.insightSlug);
  const close = useDialogStore((s) => s.close);
  const open = useDialogStore((s) => s.open);
  const openInvestor = useDialogStore((s) => s.openInvestor);
  const openInsight = useDialogStore((s) => s.openInsight);
  const isOpen = dialog === "insight";

  /* R5: deep-link — #insight=<slug> opens the article directly (permalink) */
  useEffect(() => {
    const m = /^#insight=([a-z0-9-]+)$/i.exec(window.location.hash);
    if (!m || !ARTICLES[m[1]]) return;
    // apply post-hydration via rAF so hydration markup stays consistent (simulator pattern)
    const raf = requestAnimationFrame(() => openInsight(m[1]));
    return () => cancelAnimationFrame(raf);
  }, [openInsight]);

  /* R5: share — native share sheet where available, clipboard fallback */
  const [shareState, setShareState] = useState<"idle" | "copied" | "failed">("idle");
  const shareTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (shareTimer.current) clearTimeout(shareTimer.current);
    },
    []
  );

  const share = async () => {
    if (!slug) return;
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

  /* Reading progress — updated imperatively (no re-renders on scroll) */
  const progressWrapRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const denom = el.scrollHeight - el.clientHeight;
    const p = denom > 0 ? Math.min(1, Math.max(0, el.scrollTop / denom)) : 0;
    if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${p})`;
    if (progressWrapRef.current) {
      progressWrapRef.current.setAttribute("aria-valuenow", String(Math.round(p * 100)));
    }
  };

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

  if (!card || !article) return null;

  const updated = lang === "bn" ? bnNum(article.updated) : article.updated;

  return (
    <Dialog open={isOpen} onOpenChange={(v) => !v && close()}>
      <DialogContent
        onScroll={handleScroll}
        aria-describedby={undefined}
        className="nx-scroll max-h-[90vh] gap-0 overflow-y-auto rounded-3xl p-0 sm:max-w-[720px] [&_[data-slot=dialog-close]]:rounded-full [&_[data-slot=dialog-close]]:bg-white/15 [&_[data-slot=dialog-close]]:p-1.5 [&_[data-slot=dialog-close]]:text-white [&_[data-slot=dialog-close]]:backdrop-blur [&_[data-slot=dialog-close]]:transition-colors [&_[data-slot=dialog-close]]:hover:bg-white/30"
      >
        {/* ── Reading progress (thin, sticky at very top) ── */}
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

          {/* ── Article body ── */}
          <div className="px-6 pb-6 pt-4 sm:px-8">
            {article.sections.map((sec, i) => {
              const num = String(i + 1).padStart(2, "0");
              return (
                <section key={sec.h.en} className={i > 0 ? "mt-7" : undefined}>
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
      </DialogContent>
    </Dialog>
  );
}
