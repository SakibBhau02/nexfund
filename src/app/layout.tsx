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
  metadataBase: new URL("https://nexfund.example"),
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
    "Bangladesh investment platform",
    "verified business listings",
    "investor matchmaking",
    "SME investment Dhaka",
  ],
  authors: [{ name: "NexFund" }],
  alternates: { canonical: "/" },
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

/** Structured data for SEO/AEO/GEO (blueprint §11.3 + R11): FAQPage,
 *  Organization (+logo), AboutPage, WebSite and the glossary DefinedTermSet —
 *  answer engines get citable, self-contained facts on first render. */
function StructuredData() {
  const SITE = "https://nexfund.example";
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
    "@id": `${SITE}/#organization`,
    name: "NexFund",
    alternateName: "নেক্সফান্ড",
    url: SITE,
    logo: {
      "@type": "ImageObject",
      url: `${SITE}/images/logo.png`,
      width: 553,
      height: 274,
    },
    image: `${SITE}/images/og-card.png`,
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
  /* R11 AEO: AboutPage with the canonical mission/vision statements, so
   *  answer engines can answer "what is NexFund / its mission" directly. */
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE}/#about`,
    name: "About NexFund — mission, vision, values",
    description:
      "NexFund is a Dhaka-based financial consultancy and matchmaking platform.",
    mainEntity: {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "NexFund",
      mission:
        "To make informed private investment possible for Bangladeshi investors — and patient capital reachable for growth-ready Bangladeshi businesses — through verification-first matchmaking, plain-language documents, and fees disclosed in writing.",
      slogan: "Proof before promise — প্রতিশ্রুতির আগে প্রমাণ।",
    },
    significantLink: `${SITE}/#p/about`,
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    url: SITE,
    name: "NexFund",
    alternateName: "নেক্সফান্ড",
    inLanguage: ["bn", "en"],
    publisher: { "@id": `${SITE}/#organization` },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
