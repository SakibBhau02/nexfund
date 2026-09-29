"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, CircleCheck, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { CONTACT_DLG, UI } from "@/lib/content";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ROLE_KEYS = ["investor", "entrepreneur", "partner", "other"];
const SLOT_KEYS = ["morning", "afternoon", "evening"];

export function ContactDialog() {
  const { t, lang } = useLanguage();
  const dialog = useDialogStore((s) => s.dialog);
  const close = useDialogStore((s) => s.close);
  const isOpen = dialog === "contact";

  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    role: "investor",
    name: "",
    phone: "",
    email: "",
    slot: "morning",
    message: "",
  });

  useEffect(() => {
    if (isOpen) {
      setDone(false);
      setError("");
    }
  }, [isOpen]);

  const valid = useMemo(
    () =>
      form.name.trim().length >= 2 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    [form]
  );

  const submit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, language: lang }),
      });
      if (!res.ok) throw new Error("failed");
      setDone(true);
    } catch {
      setError(t(UI.somethingWrong));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(v) => !v && close()}>
      <DialogContent className="max-h-[88vh] gap-0 overflow-y-auto rounded-3xl p-0 sm:max-w-[480px]">
        <DialogHeader className="px-6 pb-4 pt-6">
          <DialogTitle className="flex items-center gap-2 text-xl font-extrabold text-nx-navy-900">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-nx-navy-900 text-nx-cyan-400">
              <Calendar className="h-5 w-5" aria-hidden="true" />
            </span>
            {t(CONTACT_DLG.title)}
          </DialogTitle>
          <DialogDescription>{t(CONTACT_DLG.sub)}</DialogDescription>
        </DialogHeader>

        {!done ? (
          <div className="nx-scroll max-h-[60vh] space-y-4 overflow-y-auto px-6 pb-2">
            {/* role */}
            <div>
              <Label>{t(CONTACT_DLG.iAm)} *</Label>
              <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                {CONTACT_DLG.roles.map((r, i) => (
                  <button
                    key={r.en}
                    type="button"
                    onClick={() => setForm({ ...form, role: ROLE_KEYS[i] })}
                    className={cn(
                      "rounded-xl border px-3.5 py-2.5 text-left text-[13px] font-semibold transition-all",
                      form.role === ROLE_KEYS[i]
                        ? "border-nx-cyan-400 bg-nx-cyan-50 text-nx-navy-900"
                        : "border-nx-navy-100 text-slate-600 hover:border-nx-navy-300"
                    )}
                  >
                    {t(r)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="ct-name">{t(CONTACT_DLG.name)} *</Label>
                <Input
                  id="ct-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  autoComplete="name"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="ct-phone">{t(CONTACT_DLG.phone)}</Label>
                <Input
                  id="ct-phone"
                  type="tel"
                  dir="ltr"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="01XXXXXXXXX"
                  autoComplete="tel"
                  className="nx-num mt-1.5"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="ct-email">{t(CONTACT_DLG.email)} *</Label>
              <Input
                id="ct-email"
                type="email"
                dir="ltr"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                autoComplete="email"
                className="mt-1.5"
              />
            </div>

            {/* slot */}
            <div>
              <Label>{t(CONTACT_DLG.slot)}</Label>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {CONTACT_DLG.slotOpts.map((s, i) => (
                  <button
                    key={s.en}
                    type="button"
                    onClick={() => setForm({ ...form, slot: SLOT_KEYS[i] })}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-[13px] font-semibold transition-all",
                      form.slot === SLOT_KEYS[i]
                        ? "border-nx-cyan-400 bg-nx-cyan-50 text-nx-cyan-700"
                        : "border-nx-navy-200 text-slate-600 hover:border-nx-navy-400"
                    )}
                  >
                    {t(s)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="ct-msg">{t(CONTACT_DLG.message)}</Label>
              <Textarea
                id="ct-msg"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={t(CONTACT_DLG.messagePh)}
                rows={3}
                className="mt-1.5 resize-none"
              />
            </div>

            {error && <p className="text-sm font-semibold text-nx-danger">{error}</p>}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 pb-2 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", bounce: 0.5 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-nx-verified-bg"
            >
              <CircleCheck className="h-9 w-9 text-nx-verified" aria-hidden="true" />
            </motion.span>
            <h3 className="mt-5 text-xl font-extrabold text-nx-navy-900">{t(CONTACT_DLG.successTitle)}</h3>
            <p className="mt-2 leading-relaxed text-slate-600">{t(CONTACT_DLG.successBody)}</p>
          </motion.div>
        )}

        <div className="border-t border-nx-navy-100 px-6 py-4">
          {!done ? (
            <button
              type="button"
              disabled={!valid || submitting}
              onClick={submit}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all",
                valid && !submitting
                  ? "bg-nx-navy-700 text-white hover:bg-nx-navy-600"
                  : "cursor-not-allowed bg-nx-navy-100 text-slate-400"
              )}
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              {submitting ? t(CONTACT_DLG.submitting) : t(CONTACT_DLG.submit)}
            </button>
          ) : (
            <button
              type="button"
              onClick={close}
              className="w-full rounded-full bg-nx-navy-700 py-3 text-sm font-bold text-white hover:bg-nx-navy-600"
            >
              {lang === "bn" ? "সম্পন্ন" : "Done"}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
