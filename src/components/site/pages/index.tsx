"use client";

import { useEffect, type ComponentType } from "react";
import { motion } from "framer-motion";
import type { L } from "@/lib/i18n";
import { useLanguage } from "@/lib/i18n";
import { usePageRoute } from "@/lib/page-router";
import { PageNotFound } from "./shell";

import WhoWeServe from "./who-we-serve";
import How from "./how";
import Vetting from "./vetting";
import Opportunities from "./opportunities";
import Services from "./services";
import Insights from "./insights";
import Charter from "./charter";
import Glossary from "./glossary";
import Faq from "./faq";
import Contact from "./contact";
import GetStarted from "./get-started";
import Privacy from "./privacy";
import Terms from "./terms";
import Risk from "./risk";

/**
 * R10 page registry — every landing-style page reachable from the header /
 * footer buttons lives here. Hash contract: #p/<page>[/<detail>].
 * Each page component owns its own detail routing via the `detail` prop.
 */

export type PageDef = {
  Comp: ComponentType<{ detail: string | null }>;
  title: L;
};

const HOME_TITLE = "NexFund — Fund What's Next in Bangladesh | নেক্সফান্ড";

export const PAGES: Record<string, PageDef> = {
  "who-we-serve": { Comp: WhoWeServe, title: { en: "Who We Serve", bn: "আমাদের দর্শক" } },
  how: { Comp: How, title: { en: "How It Works", bn: "কীভাবে কাজ করে" } },
  vetting: { Comp: Vetting, title: { en: "Vetting Standard", bn: "যাচাই মানদণ্ড" } },
  opportunities: { Comp: Opportunities, title: { en: "Opportunities", bn: "সুযোগসমূহ" } },
  services: { Comp: Services, title: { en: "Services", bn: "সেবাসমূহ" } },
  insights: { Comp: Insights, title: { en: "Insights", bn: "ইনসাইটস" } },
  charter: { Comp: Charter, title: { en: "The Charter", bn: "চার্টার" } },
  glossary: { Comp: Glossary, title: { en: "Glossary", bn: "শব্দকোষ" } },
  faq: { Comp: Faq, title: { en: "FAQ", bn: "সাধারণ জিজ্ঞাসা" } },
  contact: { Comp: Contact, title: { en: "Contact", bn: "যোগাযোগ" } },
  "get-started": { Comp: GetStarted, title: { en: "Get Started", bn: "শুরু করুন" } },
  privacy: { Comp: Privacy, title: { en: "Privacy Promise", bn: "গোপনীয়তার প্রতিশ্রুতি" } },
  terms: { Comp: Terms, title: { en: "Terms of Use", bn: "ব্যবহারের শর্তাবলি" } },
  risk: { Comp: Risk, title: { en: "Risk Disclosure", bn: "ঝুঁকি বিবরণী" } },
};

/** Module-scope last page key — survives the BN⇄EN cross-fade remount so a
 *  language toggle mid-page does NOT reset scroll to the top (blueprint §4.2). */
let lastPageKey = "";

/**
 * PageOutlet — renders the current landing page (or nothing, when the visitor
 * is on the home experience). page.tsx keeps it inside <main>.
 */
export function PageOutlet() {
  const route = usePageRoute();
  const { lang } = useLanguage();
  const def = route ? PAGES[route.page] : undefined;
  const pageKey = route ? `${route.page}/${route.detail ?? ""}` : "";

  useEffect(() => {
    // document title always tracks the current language…
    if (route && def) {
      if (route.detail) {
        // details views take the item's own h1 as the title (it is committed
        // before this parent effect runs); fall back to the page title
        const h1 = document.querySelector("main h1")?.textContent?.trim();
        document.title = `${h1 || def.title[lang]} · NexFund`;
      } else {
        document.title = `${def.title[lang]} · NexFund`;
      }
    } else {
      document.title = HOME_TITLE;
    }
    // …but scroll/focus only when the page itself changed (not on lang toggle)
    if (route && pageKey !== lastPageKey) {
      window.scrollTo(0, 0);
      document.getElementById("main")?.focus({ preventScroll: true });
    }
    lastPageKey = pageKey;
  }, [pageKey, route, def, lang]);

  if (!route) return null;
  if (!def) return <PageNotFound page={route.page} />;

  const Comp = def.Comp;
  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <Comp detail={route.detail} />
    </motion.div>
  );
}
