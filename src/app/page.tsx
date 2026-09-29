"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { Header } from "@/components/site/header";
import { TrustRibbon } from "@/components/site/trust-ribbon";
import { Hero } from "@/components/site/hero";
import { TwoPaths } from "@/components/site/two-paths";
import { HowItWorks } from "@/components/site/how-it-works";
import { Vetting } from "@/components/site/vetting";
import { Opportunities } from "@/components/site/opportunities";
import { MatchMe } from "@/components/site/match-me";
import { ScenarioSimulator } from "@/components/site/scenario-simulator";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { BackToTop } from "@/components/site/back-to-top";
import { Charter, WhyNexFund } from "@/components/site/charter";
import { Services, Insights } from "@/components/site/services-insights";
import { Faq, FinalCta } from "@/components/site/faq-cta";
import { Footer, MobileCtaBar } from "@/components/site/footer";
import { InvestorDialog } from "@/components/site/dialogs/investor-dialog";
import { QuizDialog } from "@/components/site/dialogs/quiz-dialog";
import { ContactDialog } from "@/components/site/dialogs/contact-dialog";
import { OpportunityDialog } from "@/components/site/dialogs/opportunity-dialog";
import { InsightDialog } from "@/components/site/dialogs/insight-dialog";

function Page() {
  const { lang } = useLanguage();

  // lock body scroll when language cross-fade is in flight? No — keep scroll (blueprint §4.2: same page, keep scroll)
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-nx-navy-900 focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white"
      >
        {lang === "bn" ? "মূল কন্টেন্টে যান" : "Skip to main content"}
      </a>
      <Header />
      <TrustRibbon />
      {/* Language cross-fade (blueprint interaction #11) — key on lang, keep scroll */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={lang}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="contents"
        >
          <main id="main" className="flex-1">
            <Hero />
            <TwoPaths />
            <HowItWorks />
            <Vetting />
            <Opportunities />
            <MatchMe />
            <ScenarioSimulator />
            <Charter />
            <WhyNexFund />
            <Services />
            <Insights />
            <Faq />
            <FinalCta />
          </main>
        </motion.div>
      </AnimatePresence>
      <Footer />
      <MobileCtaBar />
      <ScrollProgress />
      <BackToTop />
      <InvestorDialog />
      <QuizDialog />
      <ContactDialog />
      <OpportunityDialog />
      <InsightDialog />
    </div>
  );
}

export default function Home() {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: 1, refetchOnWindowFocus: false },
        },
      })
  );

  useEffect(() => {
    // warm the opportunities cache
    client.prefetchQuery({
      queryKey: ["opportunities"],
      queryFn: async () => {
        const res = await fetch("/api/opportunities");
        if (!res.ok) throw new Error("failed");
        return res.json();
      },
    });
  }, [client]);

  return (
    <QueryClientProvider client={client}>
      <Page />
    </QueryClientProvider>
  );
}
