"use client";

/**
 * R10 Contact page — the flagship of the legal+contact batch.
 * Two-column layout: booking/message form (POST /api/contact with the exact
 * zod payload: role/name/phone/email/slot/message/language) + a direct
 * channels sidebar. Success / sending / error states are announced live.
 */

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  CircleCheck,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
  TrendingUp,
} from "lucide-react";
import { useLanguage, type L } from "@/lib/i18n";
import { bnNum } from "@/lib/format";
import { navigateTo } from "@/lib/page-router";
import { CONTACT_DLG, FOOTER, INVESTOR_DLG } from "@/lib/content";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "../reveal";
import {
  PageHero,
  PageBody,
  CtaBand,
  CyanButton,
  OutlineLightButton,
} from "./shell";

/* API contract (src/app/api/contact/route.ts) */
const SLOT_KEYS = ["morning", "afternoon", "evening"] as const;
type SlotKey = (typeof SLOT_KEYS)[number];
type RoleKey = "investor" | "entrepreneur";

const AUDIENCES: { key: RoleKey; label: L; icon: typeof TrendingUp }[] = [
  { key: "investor", label: CONTACT_DLG.roles[0], icon: TrendingUp },
  { key: "entrepreneur", label: CONTACT_DLG.roles[1], icon: Briefcase },
];

const WHATSAPP_URL = "https://wa.me/8801700000000";
const EMAIL = "hello@nexfund.example";
const PHONE_DISPLAY = "+৮৮০ ১৭০০-০০০০০০";
const PHONE_TEL = "tel:+8801700000000";

const T = {
  heroCopy: {
    en: "No chatbots on the critical path. Book a call or send a message — a human advisor replies within one business day.",
    bn: "গুরুত্বপূর্ণ প্রশ্নে কোনো চ্যাটবট নেই। কল বুক করুন বা মেসেজ পাঠান — একজন অ্যাডভাইজর এক কর্মদিবসের মধ্যে উত্তর দেন।",
  } as L,
  badge: { en: "Replies within one business day", bn: "এক কর্মদিবসে উত্তর" } as L,
  imageAlt: {
    en: "A NexFund advisor greeting a client in the Dhaka office",
    bn: "ঢাকার অফিসে নেক্সফান্ড অ্যাডভাইজর গ্রাহককে স্বাগত জানাচ্ছেন",
  } as L,

  /* Form */
  formTitle: { en: "Book a consultation — or just ask", bn: "পরামর্শ বুক করুন — বা শুধু জিজ্ঞেস করুন" } as L,
  audienceLabel: { en: "You are", bn: "আপনি" } as L,
  optional: { en: "optional", bn: "ঐচ্ছিক" } as L,
  name: { en: "Name", bn: "নাম" } as L,
  email: { en: "Email", bn: "ইমেইল" } as L,
  phone: { en: "Mobile / WhatsApp", bn: "মোবাইল / হোয়াটসঅ্যাপ" } as L,
  submit: { en: "Send message", bn: "বার্তা পাঠান" } as L,
  sending: { en: "Sending…", bn: "পাঠানো হচ্ছে…" } as L,
  errorNote: {
    en: "Couldn't send — your message is still in the form. Check your connection and press send again.",
    bn: "পাঠানো যায়নি — আপনার লেখা ফর্মেই আছে। ইন্টারনেট সংযোগ দেখে আবার পাঠান।",
  } as L,
  sendAnother: { en: "Send another message", bn: "আরেকটি বার্তা পাঠান" } as L,
  sendingSr: { en: "Sending your message…", bn: "আপনার বার্তা পাঠানো হচ্ছে…" } as L,

  /* Sidebar */
  directTitle: { en: "Reach us directly", bn: "সরাসরি যোগাযোগ" } as L,
  address: { en: "Office", bn: "অফিস" } as L,
  emailL: { en: "Email", bn: "ইমেইল" } as L,
  phoneL: { en: "Phone", bn: "ফোন" } as L,
  whatsappL: { en: "WhatsApp", bn: "হোয়াটসঅ্যাপ" } as L,
  responseNote: {
    en: `Replies within one business day — Sunday to Thursday, ${bnNum(9)}am–${bnNum(6)}pm (Dhaka time).`,
    bn: `উত্তর আসে এক কর্মদিবসের মধ্যে — রবিবার থেকে বৃহস্পতিবার, সকাল ${bnNum(9)}টা–সন্ধ্যা ${bnNum(6)}টা (ঢাকা সময়)।`,
  } as L,
  nextTitle: { en: "What happens next", bn: "এরপর যা হয়" } as L,
  nextSteps: [
    {
      en: "We reply within one business day — with a name, not a ticket number.",
      bn: "এক কর্মদিবসের মধ্যে উত্তর — টিকিট নম্বর নয়, একজন মানুষের নামসহ।",
    } as L,
    {
      en: `A free ${bnNum(20)}-minute call to understand your goals — investor or entrepreneur.`,
      bn: `লক্ষ্য বুঝতে বিনামূল্যে ${bnNum(20)} মিনিটের কথা — বিনিয়োগকারী বা উদ্যোক্তা, যেই হোন।`,
    } as L,
    {
      en: "Curated next steps — matched listings, or a readiness plan for your raise.",
      bn: "পরের ধাপ বাছাই করা — মানানসই তালিকা, বা আপনার পুঁজি-সংগ্রহের প্রস্তুতি-পরিকল্পনা।",
    } as L,
  ],
  registerTitle: { en: "Prefer to register?", bn: "নিবন্ধনই ভালো লাগে?" } as L,
  registerCopy: {
    en: "Move at your own pace — the three-minute registration gets you curated verified matches, no call required.",
    bn: "নিজের গতিতে এগোন — তিন মিনিটের নিবন্ধনেই বাছাই করা যাচাইকৃত ম্যাচ পৌঁছে যাবে, কল ছাড়াই।",
  } as L,
  registerBtn: { en: "Get started instead", bn: "শুরু করুন" } as L,

  /* CTA band */
  ctaTitle: { en: "Not ready for a call yet?", bn: "এখনই কলের জন্য প্রস্তুত নন?" } as L,
  ctaCopy: {
    en: "Register instead — three minutes, your pace. New verified listings reach matching investors first.",
    bn: "নিবন্ধন করে রাখুন — তিন মিনিট, আপনার গতিতে। নতুন যাচাইকৃত তালিকা আগে পৌঁছায় ম্যাচিং বিনিয়োগকারীর কাছে।",
  } as L,
  ctaRegister: { en: "Register instead", bn: "নিবন্ধন করুন" } as L,
  ctaBrowse: { en: "Browse opportunities", bn: "সুযোগসমূহ দেখুন" } as L,
};

const EMPTY_FORM = {
  role: "investor" as RoleKey,
  name: "",
  phone: "",
  email: "",
  slot: "morning" as SlotKey,
  message: "",
};

export default function ContactPage() {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const valid = useMemo(
    () =>
      form.name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()),
    [form]
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending" || !valid) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: form.role,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          slot: form.slot,
          message: form.message.trim(),
          language: lang,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setForm(EMPTY_FORM);
    setStatus("idle");
  };

  return (
    <>
      <PageHero
        crumbs={[{ label: { en: "Contact", bn: "যোগাযোগ" } }]}
        eyebrow={{ en: "CONTACT", bn: "যোগাযোগ" }}
        title={{ en: "Talk to a human advisor", bn: "সরাসরি অ্যাডভাইজরের সাথে কথা বলুন" }}
        copy={T.heroCopy}
        image="/images/page-contact.png"
        imageAlt={t(T.imageAlt)}
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-nx-cyan-300/40 bg-nx-cyan-500/10 px-3.5 py-1.5 text-[12px] font-bold text-nx-cyan-300">
            <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
            {t(T.badge)}
          </span>
        }
      />

      <PageBody className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* ── LEFT: the booking / message form ── */}
          <Reveal y={16}>
            <div className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_14px_40px_-18px_rgba(6,31,74,0.18)] md:p-8">
              <h2 className="text-xl font-extrabold text-nx-navy-900">{t(T.formTitle)}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(CONTACT_DLG.sub)}</p>

              {/* live region wraps the form ↔ success swap so every state change is announced */}
              <div aria-live="polite">
                {status === "done" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", bounce: 0.5 }}
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-nx-verified-bg"
                    >
                      <CircleCheck className="h-9 w-9 text-nx-verified" aria-hidden="true" />
                    </motion.span>
                    <h3 className="mt-5 text-xl font-extrabold text-nx-navy-900">
                      {t(CONTACT_DLG.successTitle)}
                    </h3>
                    <p className="mx-auto mt-2 max-w-md leading-relaxed text-slate-600">
                      {t(CONTACT_DLG.successBody)}
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-nx-navy-200 px-5 py-2.5 text-sm font-bold text-nx-navy-800 transition-colors hover:border-nx-navy-400"
                    >
                      {t(T.sendAnother)}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={submit} noValidate className="mt-6 space-y-5">
                    {status === "sending" && (
                      <p className="sr-only">{t(T.sendingSr)}</p>
                    )}

                    {/* audience pills (radio semantics) */}
                    <div role="radiogroup" aria-labelledby="ct-audience-lbl">
                      <p id="ct-audience-lbl" className="text-sm font-semibold text-nx-navy-900">
                        {t(T.audienceLabel)} <span aria-hidden="true">*</span>
                      </p>
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        {AUDIENCES.map((a) => (
                          <div key={a.key}>
                            <input
                              type="radio"
                              name="audience"
                              value={a.key}
                              id={`ct-aud-${a.key}`}
                              checked={form.role === a.key}
                              onChange={() => setForm({ ...form, role: a.key })}
                              className="peer sr-only"
                            />
                            <label
                              htmlFor={`ct-aud-${a.key}`}
                              className="flex cursor-pointer items-center gap-2.5 rounded-2xl border border-nx-navy-200 px-4 py-3 text-sm font-bold text-slate-600 transition-all hover:border-nx-navy-400 peer-checked:border-nx-cyan-500 peer-checked:bg-nx-cyan-50 peer-checked:text-nx-navy-900 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-nx-cyan-500"
                            >
                              <a.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                              {t(a.label)}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="ct-name">
                          {t(T.name)} <span aria-hidden="true">*</span>
                        </Label>
                        <Input
                          id="ct-name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          autoComplete="name"
                          maxLength={120}
                          required
                          aria-required="true"
                          className="mt-2 h-11 rounded-xl border-nx-navy-200 px-3.5 text-[15px] focus-visible:border-nx-cyan-500 focus-visible:ring-nx-cyan-500/25"
                        />
                      </div>
                      <div>
                        <Label htmlFor="ct-email">
                          {t(T.email)} <span aria-hidden="true">*</span>
                        </Label>
                        <Input
                          id="ct-email"
                          type="email"
                          dir="ltr"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@example.com"
                          autoComplete="email"
                          maxLength={190}
                          required
                          aria-required="true"
                          className="mt-2 h-11 rounded-xl border-nx-navy-200 px-3.5 text-[15px] focus-visible:border-nx-cyan-500 focus-visible:ring-nx-cyan-500/25"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="ct-phone">
                          {t(T.phone)}{" "}
                          <span className="font-normal text-slate-500">({t(T.optional)})</span>
                        </Label>
                        <Input
                          id="ct-phone"
                          type="tel"
                          dir="ltr"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="01XXXXXXXXX"
                          autoComplete="tel"
                          maxLength={30}
                          className="nx-num mt-2 h-11 rounded-xl border-nx-navy-200 px-3.5 text-[15px] focus-visible:border-nx-cyan-500 focus-visible:ring-nx-cyan-500/25"
                        />
                      </div>
                      <div>
                        <Label htmlFor="ct-slot">{t(CONTACT_DLG.slot)}</Label>
                        <select
                          id="ct-slot"
                          value={form.slot}
                          onChange={(e) => setForm({ ...form, slot: e.target.value as SlotKey })}
                          className="mt-2 h-11 w-full appearance-none rounded-xl border border-nx-navy-200 bg-white px-3.5 pr-9 text-[15px] text-nx-navy-900 focus:border-nx-cyan-500 focus:outline-none focus:ring-2 focus:ring-nx-cyan-500/25"
                          style={{
                            backgroundImage:
                              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 0.9rem center",
                          }}
                        >
                          {CONTACT_DLG.slotOpts.map((s, i) => (
                            <option key={s.en} value={SLOT_KEYS[i]}>
                              {t(s)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="ct-msg">{t(CONTACT_DLG.message)}</Label>
                      <Textarea
                        id="ct-msg"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder={t(CONTACT_DLG.messagePh)}
                        rows={4}
                        maxLength={2000}
                        className="mt-2 resize-none rounded-xl border-nx-navy-200 px-3.5 py-3 text-[15px] focus-visible:border-nx-cyan-500 focus-visible:ring-nx-cyan-500/25"
                      />
                    </div>

                    {status === "error" && (
                      <p
                        role="alert"
                        className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-relaxed font-semibold text-nx-danger-700"
                      >
                        {t(T.errorNote)}
                      </p>
                    )}

                    <div className="flex flex-col gap-3">
                      <button
                        type="submit"
                        disabled={!valid || status === "sending"}
                        aria-label={t(T.submit)}
                        className={
                          valid && status !== "sending"
                            ? "inline-flex items-center justify-center gap-2 rounded-full bg-nx-navy-700 px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_28px_-10px_rgba(10,58,143,0.55)] transition-colors hover:bg-nx-navy-600"
                            : "inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-nx-navy-100 px-6 py-3.5 text-sm font-bold text-slate-400"
                        }
                      >
                        {status === "sending" ? (
                          <>
                            <span
                              className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                              aria-hidden="true"
                            />
                            {t(T.sending)}
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" aria-hidden="true" />
                            {t(T.submit)}
                          </>
                        )}
                      </button>
                      <p className="text-center text-[13px] leading-relaxed text-slate-500">
                        {t(INVESTOR_DLG.dataPromise)}
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </Reveal>

          {/* ── RIGHT: direct channels + what happens next ── */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start" aria-label={lang === "bn" ? "যোগাযোগের তথ্য" : "Contact information"}>
            <Reveal y={16} delay={0.08}>
              <div className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_14px_40px_-18px_rgba(6,31,74,0.18)]">
                <h3 className="text-[15px] font-extrabold text-nx-navy-900">{t(T.directTitle)}</h3>
                <address className="mt-4 space-y-4 text-sm not-italic">
                  <p className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-nx-cyan-600" aria-hidden="true" />
                    <span>
                      <span className="block text-xs font-bold tracking-wide text-slate-500 uppercase">
                        {t(T.address)}
                      </span>
                      <span className="mt-0.5 block font-semibold text-nx-navy-800">
                        {t(FOOTER.address)}
                      </span>
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-nx-cyan-600" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block text-xs font-bold tracking-wide text-slate-500 uppercase">
                        {t(T.emailL)}
                      </span>
                      <a
                        href={`mailto:${EMAIL}`}
                        dir="ltr"
                        className="mt-0.5 block truncate font-semibold text-nx-navy-800 transition-colors hover:text-nx-cyan-700"
                      >
                        {EMAIL}
                      </a>
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-nx-cyan-600" aria-hidden="true" />
                    <span>
                      <span className="block text-xs font-bold tracking-wide text-slate-500 uppercase">
                        {t(T.phoneL)}
                      </span>
                      <a
                        href={PHONE_TEL}
                        className="nx-num mt-0.5 block font-semibold text-nx-navy-800 transition-colors hover:text-nx-cyan-700"
                      >
                        {PHONE_DISPLAY}
                      </a>
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <svg
                      viewBox="0 0 24 24"
                      className="mt-0.5 h-4 w-4 shrink-0 text-nx-verified"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.83 14.12c-.25.7-1.45 1.38-2 1.44-.55.06-1.06.25-3.57-.86-2.51-1.11-4.1-3.7-4.23-3.88-.13-.18-1.01-1.4-1.01-2.67 0-1.27.66-1.89.9-2.15.24-.26.52-.32.69-.32h.5c.16 0 .38-.06.59.45.21.51.71 1.78.77 1.91.06.13.1.28.01.45-.09.18-.13.28-.26.44l-.39.45c-.13.13-.26.27-.11.53.15.26.66 1.09 1.42 1.77.97.86 1.79 1.13 2.05 1.26.26.13.41.11.56-.07.15-.18.65-.76.82-1.02.17-.26.35-.22.58-.13.23.08 1.5.71 1.76.84.26.13.43.19.5.3.06.11.06.64-.19 1.34z" />
                    </svg>
                    <span>
                      <span className="block text-xs font-bold tracking-wide text-slate-500 uppercase">
                        {t(T.whatsappL)}
                      </span>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        dir="ltr"
                        className="mt-0.5 inline-flex items-center gap-1.5 font-semibold text-nx-navy-800 transition-colors hover:text-nx-verified"
                      >
                        +880 1700-000000
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </span>
                  </p>
                </address>
                <p className="mt-5 flex items-start gap-2.5 rounded-2xl bg-nx-navy-50 px-4 py-3 text-[13px] leading-relaxed font-semibold text-nx-navy-700">
                  <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-nx-cyan-600" aria-hidden="true" />
                  {t(T.responseNote)}
                </p>
              </div>
            </Reveal>

            <Reveal y={16} delay={0.16}>
              <div className="rounded-3xl border border-nx-navy-100 bg-white p-6 shadow-[0_14px_40px_-18px_rgba(6,31,74,0.18)]">
                <h3 className="text-[15px] font-extrabold text-nx-navy-900">{t(T.nextTitle)}</h3>
                <ol className="mt-4 space-y-3.5">
                  {T.nextSteps.map((s, i) => (
                    <li key={s.en} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                      <span className="nx-num flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-nx-navy-700 text-xs font-extrabold text-white">
                        {lang === "bn" ? bnNum(i + 1) : i + 1}
                      </span>
                      {t(s)}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal y={16} delay={0.24}>
              <div className="rounded-3xl bg-nx-navy-950 nx-navy-grid p-6 text-white">
                <h3 className="text-[15px] font-extrabold text-white">{t(T.registerTitle)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{t(T.registerCopy)}</p>
                <button
                  type="button"
                  onClick={() => navigateTo("get-started")}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-nx-cyan-500 px-5 py-2.5 text-sm font-bold text-nx-navy-900 transition-colors hover:bg-nx-cyan-400"
                >
                  {t(T.registerBtn)}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </Reveal>
          </aside>
        </div>
      </PageBody>

      <CtaBand
        title={T.ctaTitle}
        copy={T.ctaCopy}
        actions={
          <>
            <CyanButton onClick={() => navigateTo("get-started")}>
              {t(T.ctaRegister)}
            </CyanButton>
            <OutlineLightButton onClick={() => navigateTo("opportunities")}>
              {t(T.ctaBrowse)}
            </OutlineLightButton>
          </>
        }
      />
    </>
  );
}
