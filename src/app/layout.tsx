import type { Metadata } from "next";
import { Manrope, Inter, Anek_Bangla, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/lib/i18n";

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
  },
};

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
        <LanguageProvider>{children}</LanguageProvider>
        <Toaster />
      </body>
    </html>
  );
}
