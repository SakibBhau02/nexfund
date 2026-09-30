import type { Metadata } from "next";
import { Manrope, Inter, Anek_Bangla, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/lib/i18n";
import { FAQ, GLOSSARY, GLOSSARY_LABELS } from "@/lib/content";

const manrope = Manrope({
  variable: "--font-display-en",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const anekBangla = Anek_Bangla({
  variable: "--font-display-bn",
  subsets: ["bengali"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-body-bn",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NexFund — Fund What's Next in Bangladesh | নেক্সফান্ড",
  description:
    "Financial consultancy connecting informed investors with verified, growth-ready Bangladeshi businesses. Vetted, documented, transparent. যাচাইকৃত বাংলাদেশি ব্যবসার সাথে অভিজ্ঞ বিনিয়োগকারীদের সংযোগ।",
  keywords: [
    "NexFund",
    "নেক্সফান্ড",
    "invest in Bangladesh",
    "SME funding Bangladesh",
    "business valuation",
    "due diligence",
    "বিনিয়োগ",
    "মূলধন সংগ্রহ",
  ],
  authors: [{ name: "NexFund" }],
  openGraph: {
    title: "NexFund — Fund What's Next in Bangladesh",
    description:
      "Proof before promise. Verified, growth-ready Bangladeshi businesses — with the due diligence, documentation, and advisory to decide with confidence.",
    siteName: "NexFund",
    type: "website",
    /* R8: social card — WhatsApp/link previews now render the brand card */
    images: [
      {
        url: "/images/og-card.png",
        width: 1344,
        height: 768,
        alt: "NexFund — Proof before promise. Verified Bangladeshi businesses.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexFund — Fund What's Next in Bangladesh",
    description:
      "Verified, growth-ready Bangladeshi businesses — proof before promise.",
    images: ["/images/og-card.png"],
  },
};

/** Structured data for SEO/AEO (blueprint §11.3): FAQPage + Organization */
function StructuredData() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.items.map((item) => ({
      "@type": "Question",
      name: item.q.en,
      acceptedAnswer: {
        "@type": "Answer",
        // include both languages so answer engines can cite either
        text: `${item.a.en}\n\n${item.a.bn}`,
      },
    })),
  };
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "NexFund",
    alternateName: "নেক্সফান্ড",
    slogan: "Proof before promise — প্রতিশ্রুতির আগে প্রমাণ।",
    description:
      "Bangladesh-based financial consultancy and matchmaking platform connecting informed investors with verified, growth-ready businesses.",
    areaServed: "BD",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    email: "hello@nexfund.example",
    telephone: "+8801700000000",
    sameAs: [
      "https://www.linkedin.com/company/nexfund",
      "https://www.facebook.com/nexfundbd",
    ],
  };
  /* R7: glossary hub as a DefinedTermSet — mirrors the in-page dialog (AEO) */
  const glossarySchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "NexFund Investment Glossary",
    description:
      "Plain-language English and Bangla definitions of investment terms used across NexFund.",
    hasDefinedTerm: Object.entries(GLOSSARY).map(([key, def]) => ({
      "@type": "DefinedTerm",
      name: GLOSSARY_LABELS[key]?.en ?? key,
      alternateName: GLOSSARY_LABELS[key]?.bn,
      description: def.en,
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossarySchema) }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${inter.variable} ${anekBangla.variable} ${hindSiliguri.variable} antialiased bg-background text-foreground`}
      >
        <StructuredData />
        <LanguageProvider>{children}</LanguageProvider>
        <Toaster />
      </body>
    </html>
  );
}
