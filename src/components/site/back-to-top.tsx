"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

/**
 * Back-to-top button — appears after the visitor scrolls past ~600px.
 * Floats above the mobile CTA bar on small screens (bottom-24) and
 * sits bottom-6 on desktop. Respects reduced motion via framer.
 */
export function BackToTop() {
  const { lang } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 14, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.9 }}
          transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={lang === "bn" ? "উপরে ফিরে যান" : "Back to top"}
          className="fixed bottom-24 right-4 z-[70] flex h-11 w-11 items-center justify-center rounded-full border border-nx-navy-100 bg-white/90 text-nx-navy-800 shadow-[0_12px_30px_-12px_rgba(10,58,143,0.5)] backdrop-blur transition-colors hover:border-nx-cyan-400 hover:text-nx-cyan-600 md:bottom-6 md:right-6"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
