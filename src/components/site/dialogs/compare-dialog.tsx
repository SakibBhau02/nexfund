"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Check,
  Info,
  Minus,
  Printer,
  Share2,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, type L } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { BADGES, CMP, CMP_PRINT, CMP_SHARE, SCEN, SHARE, type ScenAssumption } from "@/lib/content";
import { formatTk, formatTkRange, bnNum } from "@/lib/format";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { G } from "@/components/site/glossary";
import type { OpportunityDTO } from "@/components/site/opportunities";

/* ── R5-CMP: side-by-side listing comparison dialog ──
   Columns = the listings picked in the compare tray (2–3). Rows show the
   same honest facts each listing card shows — nothing ranked, nothing
   hidden. The scenario rows reuse the exact illustrative-exit math from
   the listing detail dialog's ScenariosPanel (R4), so both dialogs always
   agree. Rendered locally from the Opportunities section (not the global
   dialog store) with props only. */

type ScenarioKey = "down" | "base" | "up";

/** R7: share-permalink pill — lives INSIDE DialogContent so it unmounts
 *  (and resets its state) whenever the dialog closes. #cmp=slug1,slug2
 *  carries the whole comparison; clipboard → execCommand fallback. */
function ShareCompareButton({ items }: { items: OpportunityDTO[] }) {
  const { t } = useLanguage();
  const [shareState, setShareState] = useState<"idle" | "copied" | "failed">("idle");
  const shareTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (shareTimer.current) clearTimeout(shareTimer.current);
    },
    []
  );

  const share = async () => {
    if (items.length === 0) return;
    const url = `${window.location.origin}${window.location.pathname}#cmp=${items
      .map((o) => o.slug)
      .join(",")}`;
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

  return (
    <button
      type="button"
      onClick={share}
      aria-live="polite"
      className="inline-flex items-center gap-1.5 rounded-full border border-nx-navy-200 bg-white px-2.5 py-1 text-[11px] font-bold text-nx-navy-700 transition-colors hover:border-nx-cyan-400 hover:text-nx-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-400"
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
          : t(CMP_SHARE.share)}
    </button>
  );
}

/** R8: print button — renders the comparison as a clean one-pager via the
 *  #cmp-print sheet + the guarded print CSS (mirrors #opp-print). */
function PrintCompareButton() {
  const { t } = useLanguage();
  return (
    <button
      type="button"
      onClick={() => window.print()}
      aria-label={t(CMP_PRINT.button)}
      title={t(CMP_PRINT.button)}
      className="inline-flex items-center gap-1.5 rounded-full border border-nx-navy-200 bg-white px-2.5 py-1 text-[11px] font-bold text-nx-navy-700 transition-colors hover:border-nx-cyan-400 hover:text-nx-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-cyan-400"
    >
      <Printer className="h-3 w-3" aria-hidden="true" />
      {t(CMP_PRINT.button)}
    </button>
  );
}

/**
 * Illustrative exit outcome for one scenario — identical computation to
 * ScenariosPanel: equity = ticket × (1+growth/100)^years × multiple,
 * revshare = ticket × multiple. Returns null when the slug has no SCEN entry.
 */
function exitOutcome(
  slug: string,
  key: ScenarioKey
): { proceeds: number; multiple: number } | null {
  const listing = SCEN.listings[slug];
  if (!listing) return null;
  const a = listing[key] as ScenAssumption;
  const multiple =
    listing.mode === "revshare"
      ? a.multiple
      : Math.pow(1 + (a.growth ?? 0) / 100, listing.years) * a.multiple;
  return { proceeds: listing.ticket * multiple, multiple };
}

export function CompareDialog({
  open,
  onOpenChange,
  items,
  onRemove,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** selected opportunities, in selection order (1–3) */
  items: OpportunityDTO[];
  /** remove one slug from the selection (header chip ✕) */
  onRemove: (slug: string) => void;
}) {
  const { t, lang } = useLanguage();
  const openOpportunity = useDialogStore((s) => s.openOpportunity);

  const openDetail = (slug: string) => {
    onOpenChange(false);
    // let the compare dialog unmount before the listing detail dialog opens
    window.setTimeout(() => openOpportunity(slug), 90);
  };

  const stageLabel = (stage: number) =>
    lang === "bn" ? `${bnNum(stage)}/৫` : `${stage}/5`;
  const fmtMultiple = (m: number) =>
    lang === "bn" ? `${bnNum(m.toFixed(2))}×` : `${m.toFixed(2)}×`;

  /* shared cell styles — first column is sticky so labels stay readable
     while the table scrolls horizontally on small screens */
  const labelTh =
    "sticky left-0 z-10 w-32 border-b border-r border-nx-navy-100 bg-white px-3 py-3 text-left align-top text-[11px] font-bold uppercase tracking-wide text-slate-500";
  const valueTd =
    "border-b border-nx-navy-100 px-3 py-3 align-top text-[13px] leading-snug text-nx-ink/90";

  const scenarioCell = (slug: string, key: ScenarioKey) => {
    const res = exitOutcome(slug, key);
    if (!res) {
      return <span className="nx-num font-semibold text-slate-400">{t(CMP.scenNA)}</span>;
    }
    return (
      <p className="nx-num text-sm font-extrabold text-nx-navy-900">
        {formatTk(Math.round(res.proceeds), lang)}
        <span className="ml-1.5 text-[11px] font-semibold text-slate-500">
          {fmtMultiple(res.multiple)}
        </span>
      </p>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="nx-scroll max-h-[90vh] gap-0 overflow-y-auto rounded-3xl p-0 sm:max-w-[880px]">
        <DialogHeader className="border-b border-nx-navy-100 px-6 pb-4 pt-6">
          <DialogTitle className="nx-num flex items-center gap-2 pr-8 text-2xl font-extrabold text-nx-navy-900">
            {t(CMP.title)}
          </DialogTitle>
          <DialogDescription className="text-left leading-relaxed">
            {t(CMP.sub)}
          </DialogDescription>
          {/* removable chip per selected listing + R7 share permalink */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {items.map((o) => (
              <span
                key={o.slug}
                className="nx-num inline-flex items-center gap-1 rounded-full border border-nx-navy-200 bg-white py-1 pl-3 pr-1 text-xs font-bold text-nx-navy-800"
              >
                {o.codeName}
                <button
                  type="button"
                  onClick={() => onRemove(o.slug)}
                  aria-label={`${t(CMP.removeOne)} ${o.codeName}`}
                  title={t(CMP.removeOne)}
                  className="flex h-5 w-5 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-nx-navy-100 hover:text-nx-navy-800"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </span>
            ))}
            <ShareCompareButton items={items} />
            <PrintCompareButton />
          </div>
        </DialogHeader>

        <div className="min-w-0 px-4 pb-6 pt-4 sm:px-6">
          <div className="nx-scroll overflow-x-auto rounded-2xl border border-nx-navy-100">
            <table className="w-full min-w-[560px] border-separate border-spacing-0">
              <caption className="sr-only">{t(CMP.title)}</caption>
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky left-0 z-20 w-32 border-b-2 border-r border-nx-navy-200 bg-white px-3 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-slate-500"
                  >
                    {t(CMP.colAttribute)}
                  </th>
                  {items.map((o) => (
                    <th
                      key={o.slug}
                      scope="col"
                      className="border-b-2 border-nx-navy-200 bg-white px-3 py-3 text-left align-top"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wide text-nx-cyan-700">
                        {lang === "bn" ? o.sectorBn : o.sector}
                      </p>
                      <p className="nx-num mt-0.5 text-base font-extrabold text-nx-navy-900">
                        {o.codeName}
                      </p>
                      <button
                        type="button"
                        onClick={() => openDetail(o.slug)}
                        className="nx-arrow-btn mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-nx-cyan-700 transition-colors hover:text-nx-cyan-600"
                      >
                        {t(CMP.ctaDetail)}
                        <span className="nx-arrow">
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Sector */}
                <tr>
                  <th scope="row" className={labelTh}>
                    {t(CMP.rowSector)}
                  </th>
                  {items.map((o) => (
                    <td
                      key={o.slug}
                      className={cn(valueTd, "font-semibold text-nx-navy-800")}
                    >
                      {lang === "bn" ? o.sectorBn : o.sector}
                    </td>
                  ))}
                </tr>

                {/* Location */}
                <tr>
                  <th scope="row" className={labelTh}>
                    {t(CMP.rowLocation)}
                  </th>
                  {items.map((o) => (
                    <td
                      key={o.slug}
                      className={cn(valueTd, "font-semibold text-nx-navy-800")}
                    >
                      {lang === "bn" ? o.locationBn : o.location}
                    </td>
                  ))}
                </tr>

                {/* Ticket sought */}
                <tr>
                  <th scope="row" className={labelTh}>
                    {t(CMP.rowSeeking)}
                  </th>
                  {items.map((o) => (
                    <td
                      key={o.slug}
                      className="nx-num border-b border-nx-navy-100 px-3 py-3 align-top text-sm font-extrabold text-nx-navy-900"
                    >
                      {formatTkRange(o.seekingMin, o.seekingMax, lang)}
                    </td>
                  ))}
                </tr>

                {/* Instrument — same glossary tooltip pattern as the cards */}
                <tr>
                  <th scope="row" className={labelTh}>
                    {t(CMP.rowInstrument)}
                  </th>
                  {items.map((o) => (
                    <td
                      key={o.slug}
                      className={cn(valueTd, "font-semibold text-nx-navy-800")}
                    >
                      {o.instrument.toLowerCase().includes("equity") ? (
                        <G term="equity">{lang === "bn" ? o.instrumentBn : o.instrument}</G>
                      ) : o.instrument.toLowerCase().includes("revenue") ? (
                        <G term="revenue share">
                          {lang === "bn" ? o.instrumentBn : o.instrument}
                        </G>
                      ) : (
                        (lang === "bn" ? o.instrumentBn : o.instrument)
                      )}
                    </td>
                  ))}
                </tr>

                {/* Vetting stage — n/5 + the same 5-segment dots as the cards */}
                <tr>
                  <th scope="row" className={labelTh}>
                    {t(CMP.rowStage)}
                  </th>
                  {items.map((o) => (
                    <td key={o.slug} className={valueTd}>
                      <span className="nx-num text-sm font-extrabold text-nx-navy-800">
                        {stageLabel(o.stage)}
                      </span>
                      <span className="mt-1.5 flex gap-1" aria-hidden="true">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span
                            key={s}
                            className={cn(
                              "h-1.5 w-4 rounded-full",
                              s <= o.stage ? "bg-nx-cyan-500" : "bg-nx-navy-100"
                            )}
                          />
                        ))}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Verified so far — compact badge chips */}
                <tr>
                  <th scope="row" className={labelTh}>
                    {t(CMP.rowBadges)}
                  </th>
                  {items.map((o) => (
                    <td key={o.slug} className={valueTd}>
                      <span className="flex flex-wrap gap-1">
                        {o.badges.map((b) => (
                          <span
                            key={b}
                            className="inline-flex items-center gap-1 rounded-full bg-nx-verified-bg px-2 py-0.5 text-[11px] font-bold text-nx-verified-700"
                          >
                            <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                            {t(BADGES[b])}
                          </span>
                        ))}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Top risk — downside-first, always plain language */}
                <tr>
                  <th scope="row" className={labelTh}>
                    <span className="inline-flex items-center gap-1.5">
                      <AlertTriangle
                        className="h-3 w-3 shrink-0 text-nx-warn"
                        aria-hidden="true"
                      />
                      {t(CMP.rowRisk)}
                    </span>
                  </th>
                  {items.map((o) => (
                    <td key={o.slug} className={valueTd}>
                      <p className="line-clamp-3 text-nx-ink/85">
                        {o.risks[0] ? (lang === "bn" ? o.risks[0].bn : o.risks[0].en) : "—"}
                      </p>
                    </td>
                  ))}
                </tr>

                {/* ── Illustrative exit group (same math as the listing dialog) ── */}
                <tr>
                  <th
                    colSpan={items.length + 1}
                    className="border-b border-nx-navy-100 bg-nx-navy-100 px-3 py-2 text-left text-[11px] font-extrabold uppercase tracking-wide text-nx-navy-800"
                  >
                    {t(CMP.rowExit)}
                  </th>
                </tr>

                {/* Downside case — warn tone first, per the downside-first brand rule */}
                <tr>
                  <th
                    scope="row"
                    className={cn(labelTh, "bg-nx-warn-bg text-nx-warn-700")}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <TrendingDown className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      {t(CMP.rowDownside)}
                    </span>
                  </th>
                  {items.map((o) => (
                    <td
                      key={o.slug}
                      className={cn(valueTd, "bg-nx-warn-bg")}
                    >
                      {scenarioCell(o.slug, "down")}
                    </td>
                  ))}
                </tr>

                {/* Base case — neutral */}
                <tr>
                  <th scope="row" className={cn(labelTh, "bg-nx-mist text-slate-600")}>
                    <span className="inline-flex items-center gap-1.5">
                      <Minus className="h-3.5 w-3.5 shrink-0 text-nx-navy-600" aria-hidden="true" />
                      {t(CMP.rowBase)}
                    </span>
                  </th>
                  {items.map((o) => (
                    <td key={o.slug} className={cn(valueTd, "bg-nx-mist")}>
                      {scenarioCell(o.slug, "base")}
                    </td>
                  ))}
                </tr>

                {/* Upside case — neutral, never "colored happy" */}
                <tr>
                  <th scope="row" className={cn(labelTh, "bg-nx-mist text-slate-600")}>
                    <span className="inline-flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5 shrink-0 text-nx-cyan-600" aria-hidden="true" />
                      {t(CMP.rowUpside)}
                    </span>
                  </th>
                  {items.map((o) => (
                    <td key={o.slug} className={cn(valueTd, "bg-nx-mist")}>
                      {scenarioCell(o.slug, "up")}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* honesty footnote */}
          <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-slate-500">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {t(CMP.scenFootnote)}
          </p>
        </div>

        {/* ── R8: print-only comparison sheet (#cmp-print) — mirrors the
            #opp-print technique; rendered only via the guarded print CSS. ── */}
        <section id="cmp-print" aria-hidden="true" className="hidden print:block text-nx-ink">
          {/* header */}
          <div className="border-b-2 border-nx-navy-900 pb-3">
            <p className="text-[15px] font-extrabold text-nx-navy-900">{t(CMP_PRINT.header)}</p>
            <p className="mt-1 text-[11px] text-slate-600">
              {lang === "bn" ? "প্রতিশ্রুতির আগে প্রমাণ।" : "Proof before promise."} ·{" "}
              {t(CMP_PRINT.prepared)}:{" "}
              <span className="nx-num">
                {new Date().toLocaleDateString(lang === "bn" ? "bn-BD" : "en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </p>
          </div>

          {/* comparison table — plain, ink-friendly, no sticky/scroll chrome */}
          <table className="mt-4 w-full border-collapse text-[12px]">
            <caption className="sr-only">{t(CMP_PRINT.header)}</caption>
            <thead>
              <tr>
                <th scope="col" className="w-32 border-b border-nx-navy-200 py-2 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600" />
                {items.map((o) => (
                  <th
                    key={o.slug}
                    scope="col"
                    className="border-b border-nx-navy-200 px-3 py-2 text-left align-top"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-600">
                      {lang === "bn" ? o.sectorBn : o.sector}
                    </p>
                    <p className="nx-num text-sm font-extrabold text-nx-navy-900">{o.codeName}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(
                [
                  [CMP.rowSector, (o: OpportunityDTO) => (lang === "bn" ? o.sectorBn : o.sector)],
                  [CMP.rowLocation, (o: OpportunityDTO) => (lang === "bn" ? o.locationBn : o.location)],
                  [CMP.rowSeeking, (o: OpportunityDTO) => formatTkRange(o.seekingMin, o.seekingMax, lang)],
                  [CMP.rowInstrument, (o: OpportunityDTO) => (lang === "bn" ? o.instrumentBn : o.instrument)],
                  [CMP.rowStage, (o: OpportunityDTO) => stageLabel(o.stage)],
                  [
                    CMP.rowBadges,
                    (o: OpportunityDTO) => o.badges.map((b) => t(BADGES[b])).join(" · ") || "—",
                  ],
                  [
                    CMP.rowRisk,
                    (o: OpportunityDTO) =>
                      o.risks[0] ? (lang === "bn" ? o.risks[0].bn : o.risks[0].en) : "—",
                  ],
                ] as [L, (o: OpportunityDTO) => string][]
              ).map(([label, render]) => (
                <tr key={label.en}>
                  <th scope="row" className="border-b border-nx-navy-100 py-2 pr-2 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                    {t(label)}
                  </th>
                  {items.map((o) => (
                    <td key={o.slug} className="border-b border-nx-navy-100 px-3 py-2 align-top leading-snug">
                      {render(o)}
                    </td>
                  ))}
                </tr>
              ))}

              {/* illustrative exit rows — downside first, warn-tinted */}
              {(["down", "base", "up"] as ScenarioKey[]).map((key) => (
                <tr key={key} className={key === "down" ? "bg-nx-warn-bg/60" : undefined}>
                  <th
                    scope="row"
                    className="border-b border-nx-navy-100 py-2 pr-2 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600"
                  >
                    {key === "down" ? t(CMP.rowDownside) : key === "base" ? t(CMP.rowBase) : t(CMP.rowUpside)}
                  </th>
                  {items.map((o) => {
                    const res = exitOutcome(o.slug, key);
                    return (
                      <td key={o.slug} className="nx-num border-b border-nx-navy-100 px-3 py-2 align-top font-semibold text-nx-navy-900">
                        {res ? (
                          <>
                            {formatTk(Math.round(res.proceeds), lang)}
                            <span className="ml-1.5 text-[10px] font-semibold text-slate-600">
                              {fmtMultiple(res.multiple)}
                            </span>
                          </>
                        ) : (
                          t(CMP.scenNA)
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {/* footer */}
          <div className="mt-4 border-t border-nx-navy-200 pt-3 text-[10px] leading-relaxed text-slate-600">
            <p className="font-bold text-nx-warn-700">{t(CMP_PRINT.disclaimer)}</p>
            <p className="mt-1">{t(CMP_PRINT.contact)}</p>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
