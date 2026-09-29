/**
 * Seed NexFund demo opportunities (anonymized, blueprint §5.5).
 * NOTE: Demo/illustrative listings for the prototype — marked clearly in the UI.
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const opportunities = [
  {
    slug: "rmg-201-denim-knitwear",
    codeName: "RMG-201",
    sector: "garments",
    sectorBn: "গার্মেন্টস ও অ্যাপারেল",
    location: "Gazipur, Dhaka Division",
    locationBn: "গাজীপুর, ঢাকা",
    headline: "Denim & knitwear manufacturer exporting to EU buyers",
    headlineBn: "ইইউ বাজারে রপ্তানিকারক ডেনিম ও নিটওয়্যার প্রস্তুতকারক",
    description:
      "12-year-old export-oriented factory with 380 workers, long-term buyer relationships, seeking expansion capital for a second production line.",
    descriptionBn:
      "১২ বছরের রপ্তানিমুখী ফ্যাক্টরি, ৩৮০ জন কর্মী, দীর্ঘমেয়াদি বায়ার সম্পর্ক — দ্বিতীয় উৎপাদন লাইনের সম্প্রসারণ মূলধন খুঁজছে।",
    seekingMin: 150,
    seekingMax: 250,
    stage: 4,
    instrument: "Equity (minority)",
    instrumentBn: "ইক্যুইটি (সংখ্যালঘু)",
    risks: JSON.stringify([
      {
        en: "Two EU buyers generate ~60% of revenue",
        bn: "দুই ইইউ বায়ার থেকে প্রায় ৬০% রাজস্ব",
      },
      { en: "Energy cost volatility affects margins", bn: "জ্বালানি মূল্যের ওঠানামায় মার্জিনে চাপ" },
      { en: "Expansion requires new machinery capex", bn: "সম্প্রসারণে নতুন মেশিনারি ক্যাপেক্স লাগবে" },
    ]),
    badges: JSON.stringify(["identity", "legal", "financial", "site"]),
    image: "/images/opp-garments.png",
    revenue: "৳18–22 crore/yr",
    revenueBn: "৳১৮–২২ কোটি/বছর",
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "agf-105-poultry-eggs",
    codeName: "AGF-105",
    sector: "agri",
    sectorBn: "কৃষি ও খাদ্য",
    location: "Rajshahi Division",
    locationBn: "রাজশাহী বিভাগ",
    headline: "Poultry & egg producer with retail distribution network",
    headlineBn: "পোল্ট্রি ও ডিম উৎপাদক, রিটেইল বিতরণ নেটওয়ার্কসহ",
    description:
      "Family-run operation scaled to 42,000 layer birds with contracts across 130+ grocery retail points; seeking working capital for feed automation.",
    descriptionBn:
      "পারিবারিক ব্যবসা থেকে বেড়ে ৪২,০০০ লেয়ার পাখি, ১৩০+ মুদি দোকানে সরবরাহ চুক্তি — ফিড অটোমেশনের কার্যবিহীন মূলধন খুঁজছে।",
    seekingMin: 60,
    seekingMax: 90,
    stage: 3,
    instrument: "Revenue share",
    instrumentBn: "রেভিনিউ শেয়ার",
    risks: JSON.stringify([
      { en: "Feed prices fluctuate with global markets", bn: "বিশ্ববাজারের সাথে ফিডের দাম ওঠানামা করে" },
      { en: "Disease outbreak is an industry-wide risk", bn: "রোগের প্রাদুর্ভাব খাতজুড়ে ঝুঁকি" },
      { en: "Power dependency for climate control", bn: "পরিবেশ নিয়ন্ত্রণে বিদ্যুৎনির্ভরতা" },
    ]),
    badges: JSON.stringify(["identity", "legal", "financial"]),
    image: "/images/opp-agri.png",
    revenue: "৳6.5–7.5 crore/yr",
    revenueBn: "৳৬.৫–৭.৫ কোটি/বছর",
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "ccl-308-cold-chain",
    codeName: "CCL-308",
    sector: "logistics",
    sectorBn: "লজিস্টিকস",
    location: "Dhaka & Northern corridor",
    locationBn: "ঢাকা ও উত্তর করিডোর",
    headline: "Cold-chain logistics serving pharma & fresh produce",
    headlineBn: "ফার্মা ও তাজা পণ্যের কোল্ড-চেইন লজিস্টিকস",
    description:
      "Reefer fleet of 14 vehicles with temperature-tracked warehousing; seeking fleet expansion to serve a signed national retailer contract.",
    descriptionBn:
      "১৪টি রিফার যান ও তাপমাত্রা-নিরীক্ষিত ওয়্যারহাউস — স্বাক্ষরিত জাতীয় রিটেইলার চুক্তির জন্য ফ্লিট সম্প্রসারণ মূলধন খুঁজছে।",
    seekingMin: 200,
    seekingMax: 400,
    stage: 5,
    instrument: "Equity + debt mix",
    instrumentBn: "ইক্যুইটি + ঋণ মিশ্র",
    risks: JSON.stringify([
      { en: "Fuel price sensitivity in unit economics", bn: "ফুয়েল দামে ইউনিট ইকোনমিক্স সংবেদনশীল" },
      { en: "Fleet maintenance demands steady cash", bn: "ফ্লিট রক্ষণাবেক্ষণে ধারাবাহিক নগদ লাগে" },
      { en: "Contract renewal cycles with anchor client", bn: "প্রধান ক্লায়েন্টের চুক্তি নবায়ন চক্র" },
    ]),
    badges: JSON.stringify(["identity", "legal", "financial", "site", "advisor"]),
    image: "/images/opp-logistics.png",
    revenue: "৳9–11 crore/yr",
    revenueBn: "৳৯–১১ কোটি/বছর",
    featured: true,
    sortOrder: 3,
  },
];

async function main() {
  const count = await db.opportunity.count();
  if (count > 0) {
    console.log(`Seed skipped — ${count} opportunities already exist.`);
    return;
  }
  for (const o of opportunities) {
    await db.opportunity.create({ data: o });
  }
  console.log(`Seeded ${opportunities.length} opportunities.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
