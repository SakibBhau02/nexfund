"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BookMarked, Info } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { GLOSSARY, GLOSSARY_LABELS, GLOSSARY_HUB } from "@/lib/content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/* ── R7: Glossary hub — full plain-language index of every term on the site.
   GLOSSARY definitions embed their own term name ("Equity — part-ownership…"),
   so the row title comes from GLOSSARY_LABELS and the leading "Term — " prefix
   is stripped from the body. Triggers: FAQ search helper row + footer link. */

export function GlossaryDialog() {
  const isOpen = useDialogStore((s) => s.dialog === "glossary");
  const close = useDialogStore((s) => s.close);
  const { t, lang } = useLanguage();
  const reduce = useReducedMotion();

  const entries = Object.entries(GLOSSARY)
    .map(([key, def]) => {
      const labels = GLOSSARY_LABELS[key];
      const title = labels ? labels[lang] : key;
      const other = labels ? labels[lang === "bn" ? "en" : "bn"] : key;
      // strip the leading "Term — " / "শব্দ (Term) — " prefix when present
      const raw = def[lang];
      const idx = raw.indexOf("—");
      const body = idx > 0 ? raw.slice(idx + 1).trim() : raw;
      return { key, title, other, body };
    })
    .sort((a, b) =>
      a.title.localeCompare(b.title, lang === "bn" ? "bn" : "en")
    );

  return (
    <Dialog open={isOpen} onOpenChange={(v) => !v && close()}>
      <DialogContent className="nx-scroll max-h-[86vh] gap-0 overflow-y-auto rounded-3xl p-0 sm:max-w-[620px]">
        <DialogHeader className="border-b border-nx-navy-100 px-6 pb-4 pt-6">
          <DialogTitle className="flex items-center gap-2.5 pr-8 text-xl font-extrabold text-nx-navy-900">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-nx-navy-900 text-nx-cyan-400">
              <BookMarked className="h-4.5 w-4.5" aria-hidden="true" />
            </span>
            {t(GLOSSARY_HUB.title)}
          </DialogTitle>
          <DialogDescription className="text-left leading-relaxed">
            {t(GLOSSARY_HUB.sub)}
          </DialogDescription>
          <p>
            <span className="inline-flex items-center rounded-full border border-nx-cyan-200 bg-nx-cyan-50 px-3 py-1 text-[11px] font-bold text-nx-cyan-700">
              {t(GLOSSARY_HUB.count(entries.length))}
            </span>
          </p>
        </DialogHeader>

        <div className="space-y-3 px-5 py-5 sm:px-6">
          {entries.map((e, i) => (
            <motion.section
              key={e.key}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.26, delay: Math.min(i * 0.035, 0.35) }}
              className="rounded-2xl border border-nx-navy-100 bg-white p-4 transition-colors hover:border-nx-cyan-200"
              aria-labelledby={`glossary-${e.key}`}
            >
              <h3
                id={`glossary-${e.key}`}
                className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[15px] font-extrabold text-nx-navy-900"
              >
                {e.title}
                {/* cross-reference: the same term in the other language */}
                <span
                  className="rounded-full bg-nx-mist px-2 py-0.5 text-[11px] font-bold text-nx-navy-600"
                  lang={lang === "bn" ? "en" : "bn"}
                >
                  {e.other}
                </span>
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{e.body}</p>
            </motion.section>
          ))}
        </div>

        <div className="border-t border-nx-navy-100 px-6 py-4">
          <p className="flex items-start gap-2 text-[11px] leading-relaxed text-slate-500">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {t(GLOSSARY_HUB.footnote)}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
