"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Calendar, ArrowUpRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { navigateTo, goHome, usePageRoute } from "@/lib/page-router";
import { NAV, UI, FOOTER } from "@/lib/content";
import { Logo, LangToggle } from "./brand";

const WHATSAPP_URL = "https://wa.me/8801700000000";

/**
 * R10: NAV section ids → page-route ids (paths is the only id that differs —
 * the "Who We Serve" landing page covers the two audiences of that section).
 */
const PAGE_FOR_NAV: Record<string, string> = {
  paths: "who-we-serve",
  how: "how",
  vetting: "vetting",
  opportunities: "opportunities",
  services: "services",
  insights: "insights",
  faq: "faq",
};

/** R11: About + Impact join the nav. Desktop shows all items except "paths"
 *  (audiences stay reachable via the home Two-Paths section, the footer and
 *  the About page cross-links) — keeps the xl nav on one comfortable line. */
const DESKTOP_NAV = NAV.filter((item) => item.id !== "paths");

export function Header() {
  const { lang, setLang, t } = useLanguage();
  const open = useDialogStore((s) => s.open);
  const route = usePageRoute();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // scroll-spy — only meaningful on the home experience
      let current = "";
      for (const item of NAV) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < 160) current = item.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    navigateTo(PAGE_FOR_NAV[id] ?? id);
  };

  // active page highlight — wins over scroll-spy while a page is open
  const activePage = route ? route.page : null;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-nx-navy-100/80 bg-white/85 shadow-[0_8px_30px_-12px_rgba(6,31,74,0.15)] backdrop-blur-xl"
            : "border-b border-transparent bg-white/0"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 transition-all duration-300 md:px-6",
            scrolled ? "py-2.5" : "py-4"
          )}
        >
          <button
            onClick={() => (route ? goHome() : window.scrollTo({ top: 0, behavior: "smooth" }))}
            aria-label="NexFund — home"
            className="shrink-0"
          >
            <Logo className="h-8 md:h-9" />
          </button>

          {/* Desktop nav (R11: about + impact added; shown from xl to keep one line) */}
          <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
            {DESKTOP_NAV.map((item) => {
              const pageId = PAGE_FOR_NAV[item.id] ?? item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  aria-current={activePage === pageId ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    activePage === pageId || (!route && active === item.id)
                      ? "bg-nx-navy-50 text-nx-navy-700"
                      : "text-slate-600 hover:bg-nx-navy-50 hover:text-nx-navy-700"
                  )}
                >
                  {t(item.label)}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LangToggle lang={lang} setLang={setLang} className="hidden sm:inline-flex" />
            <button
              onClick={() => navigateTo("contact")}
              className="hidden rounded-full border border-nx-navy-200 bg-white px-4 py-2 text-sm font-semibold text-nx-navy-800 transition-colors hover:border-nx-navy-500 hover:text-nx-navy-700 md:block"
            >
              {t(UI.bookCall)}
            </button>
            <button
              onClick={() => navigateTo("get-started")}
              className="nx-arrow-btn hidden items-center gap-1.5 rounded-full bg-nx-navy-700 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(10,58,143,0.55)] transition-all hover:bg-nx-navy-600 md:block"
            >
              {t(UI.getStarted)}
              <span className="nx-arrow">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </button>
            {/* Mobile: lang toggle compact + hamburger */}
            <LangToggle lang={lang} setLang={setLang} className="sm:hidden" />
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-nx-navy-200 bg-white text-nx-navy-800 xl:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label={lang === "bn" ? "মেনু খুলুন" : "Open menu"}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen navy menu (blueprint §4.1) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col bg-nx-navy-900 nx-navy-grid"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <Logo variant="light" className="h-9" />
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
                onClick={() => setMenuOpen(false)}
                aria-label={lang === "bn" ? "মেনু বন্ধ করুন" : "Close menu"}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav
              aria-label="Mobile"
              className="nx-scroll flex-1 overflow-y-auto px-6 pb-6 pt-4"
            >
              {NAV.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                  onClick={() => go(item.id)}
                  className="flex w-full items-center justify-between border-b border-white/10 py-4 text-left text-xl font-semibold text-white"
                >
                  {t(item.label)}
                  <ArrowUpRight className="h-5 w-5 text-nx-cyan-400" aria-hidden="true" />
                </motion.button>
              ))}
            </nav>
            <div className="space-y-3 px-6 pb-8">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigateTo("get-started");
                }}
                className="nx-arrow-btn flex w-full items-center justify-center gap-2 rounded-full bg-nx-cyan-500 px-5 py-3.5 font-bold text-nx-navy-900"
              >
                {t(UI.getStarted)}
                <span className="nx-arrow">
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigateTo("contact");
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3.5 font-semibold text-white"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {t(UI.bookCall)}
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-medium text-white/85"
              >
                <MessageCircle className="h-4 w-4 text-nx-cyan-400" aria-hidden="true" />
                {t(FOOTER.tagline).slice(0, 0)}
                {t(UI.whatsapp)} — +৮৮০ ১৭০০-০০০০০০
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
