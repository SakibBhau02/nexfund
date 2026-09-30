"use client";

import type { ReactNode } from "react";
import { ArrowUpRight, ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, type L } from "@/lib/i18n";
import { goHome, navigateTo } from "@/lib/page-router";
import { HeroSlideshow, type Slide } from "../hero-slideshow";

/** Shared photo pool that keeps sliding behind every page hero. The page's
 *  own image (when provided) leads the show so pages stay distinctive. */
const SHARED_SLIDES: Slide[] = [
  { src: "/images/hero-tech.png", alt: "Bangladeshi tech team at work" },
  { src: "/images/investor-meeting.png", alt: "Investor meeting in Dhaka" },
  { src: "/images/hero-garments.png", alt: "Garments factory floor" },
  { src: "/images/hero-agri.png", alt: "Agribusiness in Bangladesh" },
];

function heroSlides(image: string | undefined, alt: string | undefined): Slide[] {
  if (!image) return SHARED_SLIDES;
  const rest = SHARED_SLIDES.filter((s) => s.src !== image);
  return [{ src: image, alt }, ...rest];
}

/** R12: centered hero backdrop — always-sliding photos under the brand veil. */
function HeroBackdrop({ image, imageAlt, label }: { image?: string; imageAlt?: string; label: string }) {
  return (
    <>
      <HeroSlideshow slides={heroSlides(image, imageAlt)} interval={5600} label={label} />
      <div className="nx-hero-overlay absolute inset-0" aria-hidden="true" />
      <div className="nx-hero-tint absolute inset-0" aria-hidden="true" />
      <div className="nx-navy-grid absolute inset-0 opacity-70" aria-hidden="true" />
    </>
  );
}

/**
 * R10 shared shell for every landing-style page — one design system so all
 * pages feel like the same professional product (NexFund Oval Lens language).
 * Every new page composes: <Breadcrumbs/> + <PageHero/> + sections + <CtaBand/>.
 */

/* ── Breadcrumbs ─────────────────────────────────────────────────────── */

export type Crumb = { label: L | string; page?: string; detail?: string | null };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { t, lang } = useLanguage();
  return (
    <nav aria-label={lang === "bn" ? "ব্রেডক্রাম্ব" : "Breadcrumb"} className="flex flex-wrap items-center justify-center gap-1 text-[13px]">
      <button
        onClick={goHome}
        className="inline-flex items-center gap-1 rounded-full px-2 py-1 font-semibold text-white/75 transition-colors hover:text-white"
      >
        <Home className="h-3.5 w-3.5" aria-hidden="true" />
        {lang === "bn" ? "হোম" : "Home"}
      </button>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        const content = (
          <>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white/45" aria-hidden="true" />
            <span
              className={cn(
                "rounded-full px-2 py-1",
                last
                  ? "font-bold text-nx-cyan-300"
                  : item.page
                    ? "font-semibold text-white/75 transition-colors hover:text-white"
                    : "text-white/75"
              )}
            >
              {t(item.label)}
            </span>
          </>
        );
        if (last || !item.page) return <span key={i} className="flex items-center" aria-current={last ? "page" : undefined}>{content}</span>;
        return (
          <button key={i} onClick={() => navigateTo(item.page!, item.detail)} className="flex items-center">
            {content}
          </button>
        );
      })}
    </nav>
  );
}

/* ── Buttons ─────────────────────────────────────────────────────────── */

export function CyanButton({
  children,
  onClick,
  className,
  ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "nx-arrow-btn inline-flex items-center gap-2 rounded-full bg-nx-cyan-500 px-6 py-3 text-sm font-bold text-nx-navy-900 shadow-[0_12px_28px_-10px_rgba(38,183,216,0.55)] transition-all hover:bg-nx-cyan-400",
        className
      )}
    >
      {children}
      <span className="nx-arrow">
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </button>
  );
}

export function OutlineLightButton({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-white/50 hover:bg-white/5",
        className
      )}
    >
      {children}
    </button>
  );
}

export function NavyButton({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "nx-arrow-btn inline-flex items-center gap-2 rounded-full bg-nx-navy-700 px-6 py-3 text-sm font-bold text-white shadow-[0_10px_24px_-10px_rgba(10,58,143,0.55)] transition-all hover:bg-nx-navy-600",
        className
      )}
    >
      {children}
      <span className="nx-arrow">
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </button>
  );
}

/* ── Page hero (R12: centered copy over sliding photo backdrop) ────── */

export function PageHero({
  eyebrow,
  title,
  copy,
  image,
  imageAlt,
  actions,
  crumbs,
  badge,
}: {
  eyebrow: L | string;
  title: L | string;
  copy: L | string;
  image?: string;
  imageAlt?: string;
  actions?: ReactNode;
  crumbs: Crumb[];
  badge?: ReactNode;
}) {
  const { t, lang } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-nx-navy-950">
      <HeroBackdrop image={image} imageAlt={imageAlt} label={lang === "bn" ? "ব্যাকগ্রাউন্ড স্লাইডশো" : "Background slideshow"} />
      <div className="relative mx-auto max-w-[1200px] px-5 pb-20 pt-28 text-center md:px-6 md:pb-24 md:pt-36">
        <Breadcrumbs items={crumbs} />
        <div className="mx-auto mt-7 max-w-3xl">
          {badge && <div className="flex justify-center">{badge}</div>}
          <p className="nx-eyebrow mt-4 text-[11px] font-extrabold tracking-[0.22em] text-nx-cyan-300 uppercase">
            {t(eyebrow)}
          </p>
          <h1 className="mt-3 text-3xl leading-[1.15] font-extrabold text-white drop-shadow-[0_3px_18px_rgba(3,12,32,0.65)] md:text-[2.6rem] md:leading-[1.12]">
            {t(title)}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/85 md:text-base">
            {t(copy)}
          </p>
          {actions && <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{actions}</div>}
        </div>
      </div>
      {/* hairline bottom edge */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-nx-cyan-500/40 to-transparent" />
    </section>
  );
}

/* ── Section scaffolding for the page body ─────────────────────────────── */

export function PageBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-[1200px] px-5 py-14 md:px-6 md:py-20", className)}>{children}</div>;
}

export function SectionHead({
  eyebrow,
  title,
  copy,
  center,
}: {
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
      <h2 className="mt-3 text-2xl leading-tight font-extrabold text-nx-navy-900 md:text-[2rem]">
        {t(title)}
      </h2>
      {copy && <p className="mt-4 leading-relaxed text-slate-600">{t(copy)}</p>}
    </div>
  );
}

/* ── Bottom CTA band ─────────────────────────────────────────────────── */

export function CtaBand({
  title,
  copy,
  actions,
}: {
  title: L | string;
  copy: L | string;
  actions?: ReactNode;
}) {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-nx-navy-950 nx-navy-grid">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-[360px] w-[360px] rounded-full bg-nx-cyan-500/[0.12] blur-3xl"
      />
      <div className="relative mx-auto max-w-[1200px] px-5 py-14 text-center md:px-6 md:py-16">
        <h2 className="mx-auto max-w-2xl text-2xl leading-tight font-extrabold text-white md:text-3xl">
          {t(title)}
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/80">{t(copy)}</p>
        {actions && <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{actions}</div>}
      </div>
    </section>
  );
}

/* ── Details-page pieces ─────────────────────────────────────────────── */

/** Smaller hero for details pages: breadcrumb + kicker + title + meta row. */
export function DetailHero({
  crumbs,
  eyebrow,
  title,
  copy,
  meta,
  image,
  imageAlt,
  actions,
}: {
  crumbs: Crumb[];
  eyebrow: L | string;
  title: L | string;
  copy?: L | string;
  meta?: ReactNode;
  image?: string;
  imageAlt?: string;
  actions?: ReactNode;
}) {
  const { lang } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-nx-navy-950">
      <HeroBackdrop image={image} imageAlt={imageAlt} label={lang === "bn" ? "ব্যাকগ্রাউন্ড স্লাইডশো" : "Background slideshow"} />
      <div className="relative mx-auto max-w-[1200px] px-5 pb-14 pt-28 text-center md:px-6 md:pb-16 md:pt-36">
        <Breadcrumbs items={crumbs} />
        <div className="mx-auto mt-7 max-w-3xl">
          <DetailHeroText eyebrow={eyebrow} title={title} copy={copy} meta={meta} actions={actions} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-nx-cyan-500/40 to-transparent" />
    </section>
  );
}

function DetailHeroText({
  eyebrow,
  title,
  copy,
  meta,
  actions,
}: {
  eyebrow: L | string;
  title: L | string;
  copy?: L | string;
  meta?: ReactNode;
  actions?: ReactNode;
}) {
  const { t } = useLanguage();
  return (
    <div>
      <p className="nx-eyebrow mt-2 text-[11px] font-extrabold tracking-[0.22em] text-nx-cyan-300 uppercase">
        {t(eyebrow)}
      </p>
      <h1 className="mt-3 text-3xl leading-[1.15] font-extrabold text-white drop-shadow-[0_3px_18px_rgba(3,12,32,0.65)] md:text-4xl md:leading-tight">
        {t(title)}
      </h1>
      {copy && <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/85">{t(copy)}</p>}
      {meta && <div className="mt-6 flex flex-wrap items-center justify-center gap-2">{meta}</div>}
      {actions && <div className="mt-7 flex flex-wrap items-center justify-center gap-3">{actions}</div>}
    </div>
  );
}

/** Friendly not-found state for an unknown details slug. */
export function PageNotFound({ page }: { page: string }) {
  const { lang } = useLanguage();
  return (
    <section className="bg-nx-navy-950 nx-navy-grid">
      <div className="mx-auto max-w-[1200px] px-5 pb-20 pt-24 text-center md:px-6 md:pt-32">
        <p className="text-[11px] font-extrabold tracking-[0.22em] text-nx-cyan-300 uppercase">
          404
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
          {lang === "bn" ? "এই পাতাটি খুঁজে পাওয়া যায়নি" : "We couldn't find that page"}
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-white/70">
          {lang === "bn"
            ? `“${page}” পাতাটি হয় সরানো হয়েছে, নয়তো লিংকটি ভুল। নিচের বাটন থেকে হোমে ফিরে যান বা সুযোগগুলো ঘুরে দেখুন।`
            : `The “${page}” page was moved or the link is wrong. Head back home or browse live opportunities.`}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <CyanButton onClick={goHome}>
            {lang === "bn" ? "হোমে ফিরুন" : "Back to home"}
          </CyanButton>
          <OutlineLightButton onClick={() => navigateTo("opportunities")}>
            {lang === "bn" ? "সুযোগসমূহ দেখুন" : "Browse opportunities"}
          </OutlineLightButton>
        </div>
      </div>
    </section>
  );
}

/** Small navy chip used inside detail hero meta rows. */
export function MetaChip({ icon, children }: { icon?: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[13px] font-semibold text-white/90 backdrop-blur-sm">
      {icon}
      {children}
    </span>
  );
}
