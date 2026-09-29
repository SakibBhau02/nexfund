/**
 * Seed NexFund demo opportunities (anonymized, blueprint §5.5).
 * NOTE: Demo/illustrative listings for the prototype — marked clearly in the UI.
 * R2: enriched with overview/team/financials/use-of-funds/advisor notes for the detail dialog.
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
    overview:
      "A 12-year-old export-oriented garment manufacturer based in Gazipur, producing denim bottoms and knitwear for mid-market European brands. The factory runs on a single production line across two shifts, holds long-standing relationships with two EU buying houses, and has never missed a shipment deadline in the last three years. The founders are two brothers who started as jobbers in 2014 and built the operation debt-light through retained earnings.",
    overviewBn:
      "গাজীপুরভিত্তিক ১২ বছরের রপ্তানিমুখী পোশাক প্রস্তুতকারক — মিড-মার্কেট ইউরোপীয় ব্র্যান্ডের জন্য ডেনিম বটমস ও নিটওয়্যার উৎপাদন করে। একটি উৎপাদন লাইনে দুই শিফটে চলে; দুই ইইউ বাইং হাউসের সাথে দীর্ঘদিনের সম্পর্ক, শেষ তিন বছরে একবারও শিপমেন্ট ডেডলাইন মিস হয়নি। ২০১৪ সালে দুই ভাই জবার হিসেবে শুরু করে ধার কমিয়ে ব্যবসাটি দাঁড় করিয়েছেন।",
    teamNote:
      "380 workers (68% women), 14 mid-level supervisors, a full-time compliance officer, and an in-house QC team of 9. Founder-led management: one brother runs production, the other handles merchandising and finance.",
    teamNoteBn:
      "৩৮০ জন কর্মী (৬৮% নারী), ১৪ জন মিড-লেভেল সুপারভাইজার, একজন ফুল-টাইম কমপ্লায়েন্স অফিসার এবং ৯ জনের ইন-হাউস QC টিম। প্রতিষ্ঠাতা-নেতৃত্বাধীন: এক ভাই উৎপাদন, অন্যজন মার্চেন্ডাইজিং ও ফাইন্যান্স দেখেন।",
    financialNote:
      "Revenue ৳18–22 crore/yr with 14–17% EBITDA margin the last three years. Receivables run 45–60 days (typical for EU buyers). Total debt is modest (a single machinery lease). Cash flow covers operations comfortably; the expansion is about capacity, not survival.",
    financialNoteBn:
      "বার্ষিক রাজস্ব ৳১৮–২২ কোটি, গত তিন বছরে EBITDA মার্জিন ১৪–১৭%। রিসিভেবল ৪৫–৬০ দিন (ইইউ বাইয়ারদের জন্য স্বাভাবিক)। ঋণ কম (একটি মেশিনারি লিজ)। নগদ প্রবাহে অপারেশন স্বাচ্ছন্দ্যে চলে; সম্প্রসারণটা সে সিভাইভালের জন্য নয়, ক্যাপাসিটির জন্য।",
    useOfFunds: JSON.stringify([
      { item: { en: "Second production line machinery", bn: "দ্বিতীয় উৎপাদন লাইনের মেশিনারি" }, pct: 62 },
      { item: { en: "Working capital for fabric inventory", bn: "ফেব্রিক ইনভেন্টরির কার্যবিহীন মূলধন" }, pct: 24 },
      { item: { en: "Compliance & worker safety upgrades", bn: "কমপ্লায়েন্স ও কর্মী-নিরাপত্তা উন্নয়ন" }, pct: 9 },
      { item: { en: "Contingency buffer", bn: "অপ্রত্যাশিত ব্যয়ের বাফার" }, pct: 5 },
    ]),
    advisorNote:
      "Strengths: verifiable buyer contracts, disciplined delivery history, and honest bookkeeping through a professional accountant. Watch-outs: buyer concentration is real — the second line should target at least one new market; energy costs are hedged only partially by a solar rooftop plan.",
    advisorNoteBn:
      "শক্তি: যাচাইযোগ্য বাইয়ার চুক্তি, নিয়মানুবর্তিত ডেলিভারি ইতিহাস, পেশাদার অ্যাকাউন্ট্যান্টের মাধ্যমে সৎ হিসাব। সতর্কতা: বাইয়ার-কেন্দ্রীকতা বাস্তব — নতুন লাইনটি অন্তত একটি নতুন বাজারে তাক করা উচিত; জ্বালানি খরচ শুধু আংশিকভাবে সোলার রুফটপ পরিকল্পনায় কভারড।",
    modelNote:
      "Cut-make-trim (CMT) contracts with two EU buying houses, 9–11 month order cycles, letter-of-credit backed payments. The second line would add sweater/knit capacity to enter winter orders.",
    modelNoteBn:
      "দুই ইইউ বাইং হাউসের সাথে CMT চুক্তি, ৯–১১ মাসের অর্ডার সাইকেল, LC-ভিত্তিক পেমেন্ট। দ্বিতীয় লাইন যোগ হলে সুয়েটার/নিট ক্যাপাসিটি বাড়বে — শীতের অর্ডারে ঢোকা সম্ভব হবে।",
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
    overview:
      "A second-generation family agri-business in Rajshahi that has grown from a backyard flock in 2011 to a 42,000-layer operation with its own feed mixing unit and contracts supplying 130+ grocery retailers across three districts. Daily output of ~38,000 eggs moves through a mix of contracted retailers and wholesale. The founder's son, an agri graduate, now runs operations.",
    overviewBn:
      "রাজশাহীর দ্বিতীয় প্রজন্মের পারিবারিক কৃষি-ব্যবসা — ২০১১ সালে উঠানে শুরু, আজ ৪২,০০০ লেয়ারের খামার, নিজস্ব ফিড মিক্সিং ইউনিট এবং তিন জেলার ১৩০+ মুদি খুচরা বিক্রেতার সরবরাহ চুক্তি। দৈনিক ~৩৮,০০০ ডিম চুক্তিভিত্তিক রিটেইল ও হোলসেলে যায়। প্রতিষ্ঠাতার ছেলে — কৃষি গ্র্যাজুয়েট — এখন অপারেশন চালান।",
    teamNote:
      "12 full-time staff including two veterinary assistants on call, a feed-mill operator, and a distribution coordinator managing 3 delivery vans. Family members handle procurement and accounts.",
    teamNoteBn:
      "১২ জন ফুল-টাইম কর্মী — দুই ভেটেরিনারি সহকারী (কল-অন), একজন ফিড-মিল অপারেটর, আর ৩টি ডেলিভারি ভ্যান সামলানো একজন বিতরণ সমন্বয়ক। পরিবারের সদস্যরা ক্রয় ও হিসাব দেখেন।",
    financialNote:
      "Revenue ৳6.5–7.5 crore/yr, steady 11–13% net margin. Receivables are low (retail is largely cash). Feed is 65% of costs — the biggest sensitivity. No bank debt beyond a small agri-equipment loan.",
    financialNoteBn:
      "বার্ষিক রাজস্ব ৳৬.৫–৭.৫ কোটি, স্থিতিশীল ১১–১৩% নেট মার্জিন। রিসিভেবল কম (রিটেইল বেশিরভাগ নগদ)। ফিড খরচের ৬৫% — সবচেয়ে বড় সংবেদনশীলতা। ছোট একটি কৃষি-সরঞ্জাম ঋণ ছাড়া ব্যাংক ঋণ নেই।",
    useOfFunds: JSON.stringify([
      { item: { en: "Automated feed & watering lines", bn: "স্বয়ংক্রিয় ফিড ও পানির লাইন" }, pct: 48 },
      { item: { en: "Climate-controlled shed upgrade", bn: "জলবায়ু-নিয়ন্ত্রিত শেড উন্নয়ন" }, pct: 27 },
      { item: { en: "Egg grading & packing machine", bn: "ডিম গ্রেডিং ও প্যাকিং মেশিন" }, pct: 15 },
      { item: { en: "Delivery fleet maintenance", bn: "ডেলিভারি ফ্লিট রক্ষণাবেক্ষণ" }, pct: 10 },
    ]),
    advisorNote:
      "Strengths: diversified retail distribution keeps pricing power honest; the second-generation leadership is professionally trained. Watch-outs: biosecurity protocols are adequate but not best-in-class; the revenue-share instrument suits the cash-heavy model better than equity.",
    advisorNoteBn:
      "শক্তি: বিস্তৃত রিটেইল বিতরণ থাকায় দামে সুবিচার হয়; দ্বিতীয় প্রজন্মের নেতৃত্ব পেশাদারভাবে প্রশিক্ষিত। সতর্কতা: বায়োসিকিউরিটি ঠিক আছে কিন্তু সেরা নয়; নগদ-নির্ভর মডেলে ইক্যুইটির চেয়ে রেভিনিউ শেয়ার বেশি মানানসই।",
    modelNote:
      "B2B2C via contracted grocery retail + wholesale. Feed self-mixing cuts ~12% of feed cost versus market rates. Revenue-share payments proposed against daily collection reports.",
    modelNoteBn:
      "চুক্তিভিত্তিক মুদি রিটেইল + হোলসেলে B2B2C। নিজেদের ফিড মিক্সিংয়ে বাজারদরের চেয়ে ~১২% সাশ্রয়। প্রস্তাবিত রেভিনিউ-শেয়ার পেমেন্ট দৈনিক সংগ্রহ রিপোর্টের ভিত্তিতে।",
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
    overview:
      "A cold-chain logistics operator running 14 reefer trucks between Dhaka and the northern corridor, with a 22,000 sq ft temperature-monitored warehouse near Tongi. Clients include one national pharma distributor (cold-chain medicines) and fresh-produce aggregators. The founder previously managed fleet operations for a multinational FMCG distributor for 11 years.",
    overviewBn:
      "ঢাকা ও উত্তর করিডোরের মাঝে ১৪টি রিফার ট্রাকের একটি কোল্ড-চেইন লজিস্টিকস অপারেটর — টঙ্গীর কাছে ২২,০০০ বর্গফুট তাপমাত্রা-নিরীক্ষিত ওয়্যারহাউস। ক্লায়েন্ট: একটি জাতীয় ফার্মা ডিস্ট্রিবিউটর (কোল্ড-চেইন ওষুধ) এবং তাজা পণ্য অ্যাগ্রিগেটর। প্রতিষ্ঠাতা এর আগে একটি বহুজাতিক FMCG ডিস্ট্রিবিউটরে ১১ বছর ফ্লিট অপারেশন ম্যানেজ করেছেন।",
    teamNote:
      "26 full-time staff: 16 trained drivers with cold-chain certification, 3 dispatch controllers on a 24/7 rota, warehouse staff of 5, and a maintenance crew of 2. The founder personally manages the pharma account.",
    teamNoteBn:
      "২৬ জন ফুল-টাইম কর্মী: কোল্ড-চেইন সার্টিফাইড ১৬ জন প্রশিক্ষিত ড্রাইভার, ২৪/৭ রোটায় ৩ জন ডিসপ্যাচ কন্ট্রোলার, ওয়্যারহাউসে ৫ জন, রক্ষণাবেক্ষণে ২ জন। ফার্মা অ্যাকাউন্ট প্রতিষ্ঠাতা নিজে সামলান।",
    financialNote:
      "Revenue ৳9–11 crore/yr growing 28% YoY; the newly signed national retailer contract would add ~৳3 crore/yr. Margins are 16–19% after fuel. Existing debt: vehicle financing at 11% — being retired on schedule.",
    financialNoteBn:
      "বার্ষিক রাজস্ব ৳৯–১১ কোটি, বছরে ২৮% বৃদ্ধি; নতুন স্বাক্ষরিত জাতীয় রিটেইলার চুক্তি ~৳৩ কোটি/বছর যোগ করবে। জ্বালানি বাদে মার্জিন ১৬–১৯%। বিদ্যমান ঋণ: ১১% হারে যান-অর্থায়ন — নিয়ম মতো পরিশোধ হচ্ছে।",
    useOfFunds: JSON.stringify([
      { item: { en: "8 additional reefer trucks", bn: "আরও ৮টি রিফার ট্রাক" }, pct: 58 },
      { item: { en: "Warehouse cold-room expansion", bn: "ওয়্যারহাউস কোল্ড-রুম সম্প্রসারণ" }, pct: 22 },
      { item: { en: "Fleet telematics & tracking upgrade", bn: "ফ্লিট টেলিমেটিক্স ও ট্র্যাকিং উন্নয়ন" }, pct: 12 },
      { item: { en: "Driver training & safety reserve", bn: "ড্রাইভার প্রশিক্ষণ ও নিরাপত্তা রিজার্ভ" }, pct: 8 },
    ]),
    advisorNote:
      "Strengths: this is the only listing to complete all five vetting stages — site visit confirmed the warehouse and telematics logs are genuine; the anchor pharma contract is verifiable. Watch-outs: unit economics hinge on fuel prices and route density; the retailer contract has renewal risk at year three, which the equity+debt mix accounts for.",
    advisorNoteBn:
      "শক্তি: একমাত্র তালিকা যা পাঁচ ধাপের সব যাচাই শেষ করেছে — সাইট ভিজিটে ওয়্যারহাউস ও টেলিমেটিক্স লগ যাচাই হয়েছে; ফার্মা চুক্তিটি প্রমাণযোগ্য। সতর্কতা: ইউনিট ইকোনমিক্স জ্বালানি দাম ও রুট-ঘনত্বের উপর নির্ভরশীল; তৃতীয় বছরে রিটেইলার চুক্তির নবায়ন-ঝুঁকি আছে — ইক্যুইটি+ঋণ মিশ্রণ সেটা ধরেই সাজানো।",
    modelNote:
      "Contracted B2B logistics with monthly retainers plus per-trip pricing. Pharma requires validated temperature logs end-to-end — a moat smaller competitors can't easily replicate.",
    modelNoteBn:
      "চুক্তিভিত্তিক B2B লজিস্টিকস — মাসিক রিটেইনার + প্রতি ট্রিপ মূল্য। ফার্মার জন্য শেষ-থেকে-শেষ যাচাইকৃত তাপমাত্রা লগ লাগে — ছোট প্রতিযোগীদের পক্ষে সহজে নকল করা যায় না।",
    featured: true,
    sortOrder: 3,
  },
];

async function main() {
  // R2: destructive re-seed (demo data only) so enriched fields land
  await db.opportunity.deleteMany({});
  for (const o of opportunities) {
    await db.opportunity.create({ data: o });
  }
  console.log(`Re-seeded ${opportunities.length} enriched opportunities.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
