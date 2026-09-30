"use client";

import { useEffect, type ComponentType } from "react";
import { motion } from "framer-motion";
import type { L } from "@/lib/i18n";
import { useLanguage } from "@/lib/i18n";
import { usePageRoute } from "@/lib/page-router";
import { PageNotFound } from "./shell";

import About from "./about";
import WhoWeServe from "./who-we-serve";
import How from "./how";
import Vetting from "./vetting";
import Opportunities from "./opportunities";
import Services from "./services";
import Insights from "./insights";
import Impact from "./impact";
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
 *
 * R11: `desc` feeds a client-side meta-description + og:description update
 * (SEO/AEO — crawlers that execute JS see per-page summaries; the static
 * layout meta remains the global fallback).
 */

export type PageDef = {
  Comp: ComponentType<{ detail: string | null }>;
  title: L;
  desc: L;
};

const HOME_TITLE = "NexFund — Fund What's Next in Bangladesh | নেক্সফান্ড";
const HOME_DESC =
  "Verified, growth-ready Bangladeshi businesses — with the due diligence, documentation, and advisory to decide with confidence. যাচাইকৃত বাংলাদেশি ব্যবসায় বিনিয়োগ।";

export const PAGES: Record<string, PageDef> = {
  about: {
    Comp: About,
    title: { en: "About Us", bn: "আমাদের কথা" },
    desc: {
      en: "NexFund is a Dhaka-based financial consultancy and matchmaking platform. Our mission, vision, values, story, and the team behind the five-pillar vetting standard.",
      bn: "নেক্সফান্ড ঢাকা-ভিত্তিক আর্থিক পরামর্শদাতা ও ম্যাচমেকিং প্ল্যাটফর্ম — আমাদের মিশন, ভিশন, মূল্যবোধ, গল্প এবং পাঁচ-স্তম্ভ যাচাই মানদণ্ডের পেছনের টিম।",
    },
  },
  "who-we-serve": {
    Comp: WhoWeServe,
    title: { en: "Who We Serve", bn: "আমাদের দর্শক" },
    desc: {
      en: "Investors and entrepreneurs — the two paths NexFund serves. Verified deal-flow for investors; investor-readiness for founders.",
      bn: "বিনিয়োগকারী ও উদ্যোক্তা — নেক্সফান্ডের দুই পথ। বিনিয়োগকারীদের যাচাইকৃত ডিল; প্রতিষ্ঠাতাদের ইনভেস্টর-রেডি প্রস্তুতি।",
    },
  },
  how: {
    Comp: How,
    title: { en: "How It Works", bn: "কীভাবে কাজ করে" },
    desc: {
      en: "Apply, verify, match, grow — the four-step path from first conversation to first introduction on NexFund.",
      bn: "আবেদন, যাচাই, ম্যাচ, প্রবৃদ্ধি — প্রথম আলাপ থেকে প্রথম পরিচয় পর্যন্ত নেক্সফান্ডের চার-ধাপের পথ।",
    },
  },
  vetting: {
    Comp: Vetting,
    title: { en: "Vetting Standard", bn: "যাচাই মানদণ্ড" },
    desc: {
      en: "The five-pillar NexFund vetting standard: identity, legal, financial, operations, advisor review — what we check and what you'll see.",
      bn: "নেক্সফান্ডের পাঁচ-স্তম্ভ যাচাই মানদণ্ড: পরিচয়, আইনি, আর্থিক, কার্যক্রম, অ্যাডভাইজর পর্যালোচনা — কী যাচাই হয়, আপনি কী দেখবেন।",
    },
  },
  opportunities: {
    Comp: Opportunities,
    title: { en: "Opportunities", bn: "সুযোগসমূহ" },
    desc: {
      en: "Live, verified Bangladeshi businesses seeking capital — anonymized fact-packs with visible key risks before you commit.",
      bn: "পুঁজি খুঁজছে এমন যাচাইকৃত বাংলাদেশি ব্যবসার লাইভ তালিকা — প্রতিশ্রুতির আগেই দৃশ্যমান ঝুঁকিসহ বেনামি ফ্যাক্ট-প্যাক।",
    },
  },
  services: {
    Comp: Services,
    title: { en: "Services", bn: "সেবাসমূহ" },
    desc: {
      en: "Valuation, financial models, investor decks, data rooms — the advisory services that take you from interested to informed.",
      bn: "ভ্যালুয়েশন, ফিন্যান্সিয়াল মডেল, ইনভেস্টর ডেক, ডেটা রুম — 'আগ্রহী' থেকে 'তথ্যসমৃদ্ধ' হওয়ার অ্যাডভাইজরি সেবা।",
    },
  },
  insights: {
    Comp: Insights,
    title: { en: "Insights", bn: "ইনসাইটস" },
    desc: {
      en: "Plain-language guides from NexFund advisors — due diligence, valuation, pitching — written to be read, not to impress.",
      bn: "নেক্সফান্ড অ্যাডভাইজরদের সহজভাষা গাইড — ডিউ ডিলিজেন্স, ভ্যালুয়েশন, পিচিং — পড়ার জন্য লেখা।",
    },
  },
  impact: {
    Comp: Impact,
    title: { en: "Impact", bn: "ইমপ্যাক্ট" },
    desc: {
      en: "Live platform numbers and quarterly-verified milestones — capital introduced, businesses onboarded, insights published, and exactly how each figure is counted.",
      bn: "লাইভ প্ল্যাটফর্ম সংখ্যা ও ত্রৈমাসিকভাবে যাচাইকৃত মাইলফলক — পরিচিত মূলধন, অনবোর্ডেড ব্যবসা, প্রকাশিত ইনসাইট, আর প্রতিটি সংখ্যা কীভাবে গোনা হয়।",
    },
  },
  charter: {
    Comp: Charter,
    title: { en: "The Charter", bn: "চার্টার" },
    desc: {
      en: "Seven published commitments — fees in writing, no custody, no pressure — so you can hold NexFund to them.",
      bn: "প্রকাশিত সাতটি প্রতিশ্রুতি — ফি লিখিতভাবে, অর্থ গচ্ছিত নয়, কোনো চাপ নয় — যাতে আপনি নেক্সফান্ডকে জবাবদিহি করাতে পারেন।",
    },
  },
  glossary: {
    Comp: Glossary,
    title: { en: "Glossary", bn: "শব্দকোষ" },
    desc: {
      en: "Plain Bangla and English definitions of the investment terms used across NexFund — 11 terms, no jargon.",
      bn: "নেক্সফান্ডে ব্যবহৃত বিনিয়োগ-পরিভাষার সহজ বাংলা-ইংরেজি সংজ্ঞা — ১১টি শব্দ, কোনো জার্গন নেই।",
    },
  },
  faq: {
    Comp: Faq,
    title: { en: "FAQ", bn: "সাধারণ জিজ্ঞাসা" },
    desc: {
      en: "What NexFund is, what it charges, how listings stay anonymous, and other frequently asked questions — answered bilingually.",
      bn: "নেক্সফান্ড কী, ফি কেমন, তালিকা কীভাবে বেনামি থাকে — সাধারণ জিজ্ঞাসাগুলোর দ্বিভাষিক উত্তর।",
    },
  },
  contact: {
    Comp: Contact,
    title: { en: "Contact", bn: "যোগাযোগ" },
    desc: {
      en: "Talk to a NexFund advisor — one-business-day response, in Bangla or English. Book a call or write today.",
      bn: "নেক্সফান্ড অ্যাডভাইজরের সাথে কথা বলুন — এক কর্মদিবসে উত্তর, বাংলা বা ইংরেজিতে। কল বুক করুন বা লিখুন।",
    },
  },
  "get-started": {
    Comp: GetStarted,
    title: { en: "Get Started", bn: "শুরু করুন" },
    desc: {
      en: "Three steps, about three minutes — register as an investor or start your capital raise on NexFund today.",
      bn: "তিনটি ধাপ, প্রায় তিন মিনিট — আজই বিনিয়োগকারী হিসেবে নিবন্ধন করুন বা মূলধন সংগ্রহ শুরু করুন।",
    },
  },
  privacy: {
    Comp: Privacy,
    title: { en: "Privacy Promise", bn: "গোপনীয়তার প্রতিশ্রুতি" },
    desc: {
      en: "What NexFund collects, how it is protected, what we never do — your data is never sold. Full privacy promise in plain language.",
      bn: "নেক্সফান্ড কী সংগ্রহ করে, কীভাবে সুরক্ষিত থাকে, আমরা কখনো কী করি না — আপনার তথ্য কখনোই বিক্রি হয় না।",
    },
  },
  terms: {
    Comp: Terms,
    title: { en: "Terms of Use", bn: "ব্যবহারের শর্তাবলি" },
    desc: {
      en: "What NexFund is, what the platform does and does not do — the terms of use, including that we never hold your money.",
      bn: "নেক্সফান্ড কী, প্ল্যাটফর্মটি কী করে আর কী করে না — ব্যবহারের শর্তাবলি, সহ আমরা কখনোই আপনার অর্থ গচ্ছিত রাখি না।",
    },
  },
  risk: {
    Comp: Risk,
    title: { en: "Risk Disclosure", bn: "ঝুঁকি বিবরণী" },
    desc: {
      en: "Honest risk disclosure: what verification does and doesn't remove, liquidity horizons, and our duty to publish material risks.",
      bn: "সৎ ঝুঁকি বিবরণী: যাচাই কী সরায় আর কী সরায় না, লিকুইডিটি সময়সীমা, আর প্রকৃত ঝুঁকি প্রকাশের আমাদের দায়িত্ব।",
    },
  },
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
    // R11 SEO/AEO: keep meta description + og tags in sync with the page
    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.head.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    const desc = route && def ? def.desc[lang] : HOME_DESC;
    const title = route && def ? `${def.title[lang]} · NexFund` : HOME_TITLE;
    setMeta('meta[name="description"]', "content", desc);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", desc);
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
