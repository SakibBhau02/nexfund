"use client";

import { useState } from "react";
import { Linkedin, Facebook, Youtube, Mail, Phone, MapPin, AlertTriangle, ShieldCheck, Scale, Lock, Send } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { FOOTER, NAV, NEWSLETTER, UI } from "@/lib/content";
import { Logo } from "./brand";

const WHATSAPP_URL = "https://wa.me/8801700000000";

function LegalDialog({
  open,
  onOpenChange,
}: {
  open: "privacy" | "terms" | "risk" | null;
  onOpenChange: (v: "privacy" | "terms" | "risk" | null) => void;
}) {
  const { t, lang } = useLanguage();
  const blocks = {
    privacy: {
      icon: Lock,
      title: { en: "Privacy Promise", bn: "গোপনীয়তার প্রতিশ্রুতি" },
      body: {
        en: "We collect only what we need to match investors with businesses. Your information is encrypted, shared only with your consent, and never sold. You may request deletion of your data at any time by writing to privacy@nexfund.example.",
        bn: "আমরা কেবল যতটুকু তথ্য ম্যাচিংয়ের জন্য দরকার তা-ই নিই। আপনার তথ্য এনক্রিপ্টেড থাকে, কেবল আপনার সম্মতিতে শেয়ার হয়, কখনো বিক্রি হয় না। যেকোনো সময় privacy@nexfund.example-এ লিখে আপনার তথ্য মুছে ফেলার অনুরোধ করতে পারেন।",
      },
    },
    terms: {
      icon: Scale,
      title: { en: "Terms of Use", bn: "ব্যবহারের শর্তাবলি" },
      body: {
        en: "NexFund is a financial consultancy and matchmaking platform — not a bank, fund manager, or investment advisor. We do not hold client money. All investment decisions are yours; please read every opportunity's risk summary before acting.",
        bn: "নেক্সফান্ড একটি ফাইন্যান্সিয়াল কনসাল্টেন্সি ও ম্যাচমেকিং প্ল্যাটফর্ম — ব্যাংক, ফান্ড ম্যানেজার বা ইনভেস্টমেন্ট অ্যাডভাইজার নয়। আমরা গ্রাহকের অর্থ গচ্ছিত রাখি না। সব বিনিয়োগ সিদ্ধান্ত আপনার; এগোনোর আগে প্রতিটি সুযোগের ঝুঁকি-সারসংক্ষেপ পড়ুন।",
      },
    },
    risk: {
      icon: AlertTriangle,
      title: { en: "Risk Disclosure", bn: "ঝুঁকি বিবরণী" },
      body: {
        en: "Investing involves risk, including possible loss of capital. NexFund does not guarantee returns. Past performance is not indicative of future results. Verification reduces risk; it does not remove it. Please read our full risk disclosure before making any decision.",
        bn: "বিনিয়োগে ঝুঁকি আছে, মূলধন হারানোর সম্ভাবনাসহ। নেক্সফান্ড কোনো মুনাফার নিশ্চয়তা দেয় না। অতীতের ফলাফল ভবিষ্যতের নিশ্চয়তা নয়। যাচাই ঝুঁকি কমায়, দূর করে না। সিদ্ধান্তের আগে সম্পূর্ণ ঝুঁকি বিবরণী পড়ুন।",
      },
    },
  };
  if (!open) return null;
  const block = blocks[open];
  const Icon = block.icon;
  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-nx-navy-950/60 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      onClick={() => onOpenChange(null)}
    >
      <div
        className="w-full max-w-lg rounded-3xl border border-nx-navy-100 bg-white p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-nx-navy-900 text-nx-cyan-400">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="text-lg font-extrabold text-nx-navy-900">{lang === "bn" ? block.title.bn : block.title.en}</h3>
        </div>
        <p className="mt-4 leading-relaxed text-slate-600">{lang === "bn" ? block.body.bn : block.body.en}</p>
        <button
          onClick={() => onOpenChange(null)}
          className="mt-6 w-full rounded-full bg-nx-navy-700 py-3 text-sm font-bold text-white hover:bg-nx-navy-600"
        >
          {lang === "bn" ? "বুঝেছি" : "Understood"}
        </button>
      </div>
    </div>
  );
}

export function Footer() {
  const { t, lang } = useLanguage();
  const openDialog = useDialogStore((s) => s.open);
  const [legal, setLegal] = useState<"privacy" | "terms" | "risk" | null>(null);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative bg-nx-navy-950 text-white">
      <div className="mx-auto max-w-[1200px] px-5 pb-28 pt-16 md:px-6 md:pb-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + newsletter */}
          <div>
            <Logo variant="light" className="text-2xl" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">{t(FOOTER.tagline)}</p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href="https://www.linkedin.com/company/nexfund"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-nx-cyan-400 hover:text-nx-cyan-300"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://www.facebook.com/nexfundbd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-nx-cyan-400 hover:text-nx-cyan-300"
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://www.youtube.com/@nexfundbd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-nx-cyan-400 hover:text-nx-cyan-300"
              >
                <Youtube className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <address className="mt-6 space-y-2 text-sm not-italic text-white/55">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-nx-cyan-400" aria-hidden="true" />
                {t(FOOTER.address)}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-nx-cyan-400" aria-hidden="true" />
                hello@nexfund.example
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-nx-cyan-400" aria-hidden="true" />
                <span className="nx-num">+৮৮০ ১৭০০-০০০০০০</span>
              </p>
            </address>
            <NewsletterForm />
          </div>

          {/* Platform */}
          <nav aria-label={t(FOOTER.platform)}>
            <h3 className="text-xs font-extrabold tracking-[0.18em] text-nx-cyan-400 uppercase">
              {t(FOOTER.platform)}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button onClick={() => go("paths")} className="text-white/70 transition-colors hover:text-white">
                  {lang === "bn" ? "বিনিয়োগকারীদের জন্য" : "For Investors"}
                </button>
              </li>
              <li>
                <button onClick={() => openDialog("quiz")} className="text-white/70 transition-colors hover:text-white">
                  {lang === "bn" ? "মূলধন সংগ্রহ" : "Raise Capital"}
                </button>
              </li>
              <li>
                <button onClick={() => go("opportunities")} className="text-white/70 transition-colors hover:text-white">
                  {lang === "bn" ? "সুযোগসমূহ" : "Opportunities"}
                </button>
              </li>
              <li>
                <button onClick={() => go("how")} className="text-white/70 transition-colors hover:text-white">
                  {lang === "bn" ? "কীভাবে কাজ করে" : "How It Works"}
                </button>
              </li>
            </ul>
          </nav>

          {/* Trust */}
          <nav aria-label={t(FOOTER.trustCol)}>
            <h3 className="text-xs font-extrabold tracking-[0.18em] text-nx-cyan-400 uppercase">
              {t(FOOTER.trustCol)}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button onClick={() => go("vetting")} className="flex items-center gap-1.5 text-white/70 transition-colors hover:text-white">
                  <ShieldCheck className="h-3.5 w-3.5 text-nx-cyan-400" aria-hidden="true" />
                  {lang === "bn" ? "যাচাই মানদণ্ড" : "Vetting Standard"}
                </button>
              </li>
              <li>
                <button onClick={() => go("charter")} className="flex items-center gap-1.5 text-white/70 transition-colors hover:text-white">
                  <Scale className="h-3.5 w-3.5 text-nx-cyan-400" aria-hidden="true" />
                  {lang === "bn" ? "চার্টার" : "The Charter"}
                </button>
              </li>
              <li>
                <button onClick={() => setLegal("risk")} className="flex items-center gap-1.5 text-white/70 transition-colors hover:text-white">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                  {lang === "bn" ? "ঝুঁকি বিবরণী" : "Risk Disclosure"}
                </button>
              </li>
              <li>
                <button onClick={() => setLegal("privacy")} className="flex items-center gap-1.5 text-white/70 transition-colors hover:text-white">
                  <Lock className="h-3.5 w-3.5 text-nx-cyan-400" aria-hidden="true" />
                  {lang === "bn" ? "গোপনীয়তা নীতি" : "Privacy Promise"}
                </button>
              </li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label={t(FOOTER.company)}>
            <h3 className="text-xs font-extrabold tracking-[0.18em] text-nx-cyan-400 uppercase">
              {t(FOOTER.company)}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button onClick={() => go("services")} className="text-white/70 transition-colors hover:text-white">
                  {lang === "bn" ? "সেবাসমূহ" : "Services"}
                </button>
              </li>
              <li>
                <button onClick={() => go("insights")} className="text-white/70 transition-colors hover:text-white">
                  {lang === "bn" ? "ইনসাইটস" : "Insights"}
                </button>
              </li>
              <li>
                <button onClick={() => go("faq")} className="text-white/70 transition-colors hover:text-white">
                  {lang === "bn" ? "প্রশ্নোত্তর" : "FAQ"}
                </button>
              </li>
              <li>
                <button onClick={() => openDialog("contact")} className="text-white/70 transition-colors hover:text-white">
                  {t({ en: "Contact", bn: "যোগাযোগ" })}
                </button>
              </li>
              <li>
                <button onClick={() => setLegal("terms")} className="text-white/70 transition-colors hover:text-white">
                  {t({ en: "Terms of Use", bn: "ব্যবহারের শর্তাবলি" })}
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Risk disclosure strip — always visible (blueprint §4.3) */}
        <div className="mt-12 rounded-2xl border border-amber-400/25 bg-amber-400/[0.07] p-5">
          <p className="flex items-start gap-3 text-[13px] leading-relaxed text-amber-100/90">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
            <span>
              <strong className="font-extrabold text-amber-200">{t(FOOTER.riskTitle)}: </strong>
              {t(FOOTER.risk)}
            </span>
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
          <p>© {lang === "bn" ? "২০২৬" : "2026"} NexFund · {t(FOOTER.copyright)}</p>
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-nx-cyan-400" aria-hidden="true" />
            {lang === "bn" ? "প্রতিশ্রুতির আগে প্রমাণ" : "Proof before promise."}
          </p>
        </div>
      </div>

      {/* Mobile sticky CTA spacer handled by fixed bar */}
      <LegalDialog open={legal} onOpenChange={setLegal} />
    </footer>
  );
}

/** Footer newsletter / priority-list signup (R2) — posts to /api/newsletter */
function NewsletterForm() {
  const { t, lang } = useLanguage();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer", language: lang }),
      });
      if (!res.ok) throw new Error("failed");
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-5">
      <h3 className="text-xs font-extrabold tracking-[0.18em] text-nx-cyan-400 uppercase">
        {t(NEWSLETTER.title)}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-white/60">{t(NEWSLETTER.sub)}</p>
      {state === "done" ? (
        <p className="mt-3.5 inline-flex items-center gap-2 rounded-full bg-nx-verified/20 px-4 py-2 text-sm font-bold text-emerald-200">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          {t(NEWSLETTER.joined)}
        </p>
      ) : (
        <form onSubmit={submit} className="mt-3.5 flex gap-2">
          <label htmlFor="footer-newsletter-email" className="sr-only">
            {t(NEWSLETTER.placeholder)}
          </label>
          <input
            id="footer-newsletter-email"
            type="email"
            required
            dir="ltr"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state === "error") setState("idle");
            }}
            placeholder={t(NEWSLETTER.placeholder)}
            className="nx-num min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-nx-cyan-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={state === "sending"}
            aria-label={t(NEWSLETTER.join)}
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-nx-cyan-500 px-4 py-2.5 text-sm font-bold text-nx-navy-900 transition-colors hover:bg-nx-cyan-400 disabled:opacity-60"
          >
            {state === "sending" ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-nx-navy-900/30 border-t-nx-navy-900" aria-hidden="true" />
            ) : (
              <Send className="h-4 w-4" aria-hidden="true" />
            )}
            <span className="ml-1.5 hidden sm:inline">{t(NEWSLETTER.join)}</span>
          </button>
        </form>
      )}
      {state === "error" && (
        <p className="mt-2 text-xs font-semibold text-rose-300">{t(UI.somethingWrong)}</p>
      )}
      <p className="mt-2.5 text-[11px] text-white/40">{t(NEWSLETTER.privacy)}</p>
    </div>
  );
}

/** Mobile sticky bottom bar: WhatsApp + Book a Call (blueprint §4.4) */
export function MobileCtaBar() {
  const { t } = useLanguage();
  const open = useDialogStore((s) => s.open);
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-nx-navy-100 bg-white/95 px-4 pb-[env(safe-area-inset-bottom)] pt-2.5 backdrop-blur md:hidden"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 10px)" }}
    >
      <div className="mx-auto flex max-w-md items-center gap-2.5">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full border-[1.5px] border-nx-navy-200 bg-white py-3 text-sm font-bold text-nx-navy-800"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-nx-verified" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.83 14.12c-.25.7-1.45 1.38-2 1.44-.55.06-1.06.25-3.57-.86-2.51-1.11-4.1-3.7-4.23-3.88-.13-.18-1.01-1.4-1.01-2.67 0-1.27.66-1.89.9-2.15.24-.26.52-.32.69-.32h.5c.16 0 .38-.06.59.45.21.51.71 1.78.77 1.91.06.13.1.28.01.45-.09.18-.13.28-.26.44l-.39.45c-.13.13-.26.27-.11.53.15.26.66 1.09 1.42 1.77.97.86 1.79 1.13 2.05 1.26.26.13.41.11.56-.07.15-.18.65-.76.82-1.02.17-.26.35-.22.58-.13.23.08 1.5.71 1.76.84.26.13.43.19.5.3.06.11.06.64-.19 1.34z" />
          </svg>
          {t({ en: "WhatsApp", bn: "হোয়াটসঅ্যাপ" })}
        </a>
        <button
          onClick={() => open("contact")}
          className="flex-1 rounded-full bg-nx-navy-700 py-3 text-sm font-bold text-white shadow-[0_10px_24px_-10px_rgba(10,58,143,0.6)]"
        >
          {t({ en: "Book a Call", bn: "কল বুক করুন" })}
        </button>
      </div>
    </div>
  );
}
