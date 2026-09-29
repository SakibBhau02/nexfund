"use client";

import { useEffect, useState } from "react";
import { X, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { RIBBON } from "@/lib/content";

/** Dismissible trust ribbon (blueprint §4.4) */
export function TrustRibbon() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.sessionStorage.getItem("nx-ribbon-dismissed")) {
        const t2 = window.setTimeout(() => setVisible(true), 1200);
        return () => window.clearTimeout(t2);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      window.sessionStorage.setItem("nx-ribbon-dismissed", "1");
    } catch {
      /* ignore */
    }
  };

  const goVetting = () => {
    dismiss();
    document.getElementById("vetting")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed inset-x-0 top-[68px] z-40 flex justify-center px-4"
        >
          <div className="flex items-center gap-3 rounded-full border border-nx-navy-100 bg-white/95 py-1.5 pl-2 pr-1.5 shadow-[0_16px_40px_-16px_rgba(6,31,74,0.3)] backdrop-blur">
            <button
              onClick={goVetting}
              className="flex items-center gap-2 rounded-full bg-nx-navy-50 px-3 py-1.5 text-[13px] font-semibold text-nx-navy-800 transition-colors hover:bg-nx-cyan-100"
            >
              <ShieldCheck className="h-4 w-4 text-nx-cyan-600" aria-hidden="true" />
              {t(RIBBON.text)}
            </button>
            <button
              onClick={dismiss}
              aria-label={t(RIBBON.dismiss)}
              className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-nx-navy-50 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
