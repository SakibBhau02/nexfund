# NexFund Project Worklog

Project: NexFund — Bangladesh investor–entrepreneur matchmaking platform website
Blueprint source: /home/z/my-project/upload/NexFund_Website_Deep_Dive.md

## Constraints
- Single route `/` only (src/app/page.tsx) — all "pages" become sections with anchor navigation
- Language toggle BN ⇄ EN is client-side (React context + localStorage), since URL-based routes are not allowed
- Backend via API routes (no server actions), Prisma + SQLite
- Brand: Navy #061F4A / #0A3A8F, Cyan #26B7D8 (accent only), Oval Lens design language, "Proof before promise"

---
Task ID: 0
Agent: main (Z.ai Code)
Task: Project planning and blueprint analysis

Work Log:
- Read full NexFund blueprint (1036 lines): strategy, brand system, colors, typography, sitemap, page sections, interactions, bilingual spec
- Analyzed existing scaffold: Next.js 16, Tailwind 4, shadcn/ui complete, framer-motion, prisma ready
- Decided architecture: single-page app with sections (Hero Oval Lens, Two Paths, How It Works, Vetting Stepper, Opportunities, Charter, Why NexFund, Services, Insights, FAQ, CTA, Footer), interactive dialogs (Investor 3-step register, Readiness Quiz, Contact booking), client-side i18n context
- Planned image set: authentic Bangladeshi business photos (garments, agri, tech, retail, healthcare, investor meeting)

Stage Summary:
- Foundation, image generation, frontend, backend API, QA tasks defined
- Next: Task 1 foundation (tokens/fonts/i18n/prisma) by main agent; Task 2-a images by subagent

---
Task ID: 2-a
Agent: image-generation (general-purpose)
Task: Generate authentic Bangladeshi business images for NexFund website

Work Log:
- hero-garments.png (864x1152, 153,702 B) — DONE, first pass. Garments factory, Dhaka, female workers in hijabs at sewing machines
- hero-agri.png (864x1152, 147,954 B) — DONE, first pass. Agri entrepreneur inspecting golden rice in processing facility
- hero-tech.png (864x1152, 146,320 B) — DONE, first pass. Young Dhaka tech startup team, laptops + code
- hero-retail.png (864x1152, 121,930 B) — DONE, first pass. Proud shop owner in organized Dhaka hardware store
- opp-garments.png (1024x1024, 120,899 B) — DONE, first pass. QC supervisor examining knitwear on rack
- opp-agri.png (1024x1024, 143,263 B) — DONE, first pass. Modern poultry/egg farm, automated feeding lines
- opp-logistics.png (1024x1024, 162,813 B) — DONE, first pass. Cold-chain warehouse, crates + refrigerated trucks
- investor-meeting.png (864x1152, 97,746 B) — DONE, first pass. Two professionals reviewing financial documents on tablet
- insight-dd.png (1152x864, 86,080 B) — DONE, first pass. Magnifying glass over financial statements, navy desk (smaller size expected: dark minimal composition compresses well)
- insight-valuation.png (1152x864, 106,983 B) — DONE, first pass. Calculator, charts, brass scale, navy/cyan tones
- insight-pitch.png (1152x864, 92,769 B) — DONE, first pass. Laptop with pitch deck, coffee, bokeh
- about-office.png (1344x768, 158,052 B) — DONE, first pass. Dhaka consultancy office at golden hour, city view
- Verified all 12 via `ls -la`, `file`, and PIL decode check: correct dimensions, valid image data, healthy pixel variance (std 54-77, i.e. real photographic content, no blank/broken files)
- Note: CLI writes JPEG-encoded data with .png extension (standard z-ai CLI behavior); browsers/Next.js Image handle this fine via content sniffing / re-encoding

Stage Summary:
- Deliverables (all in /home/z/my-project/public/images/): hero-garments.png, hero-agri.png, hero-tech.png, hero-retail.png (864x1152 portrait, for oval hero frames); opp-garments.png, opp-agri.png, opp-logistics.png (1024x1024); investor-meeting.png (864x1152); insight-dd.png, insight-valuation.png, insight-pitch.png (1152x864 landscape); about-office.png (1344x768 wide)
- Failures: none — all 12 generated successfully on first attempt, no retries needed
- Fallback plan (unused): if any image had failed, retry 1-2x with adjusted prompt wording; last resort would be reusing closest sector image

---
Task ID: 1, 3, 3-b, 4, 5 (main agent)
Agent: main (Z.ai Code)
Task: Build the complete NexFund website from the blueprint (foundation, frontend, backend, QA)

Work Log:
- Foundation (Task 1): globals.css with full NexFund token system (navy #061F4A→#0A3A8F scale, cyan #26B7D8, oval-lens utilities, nx-fade cross-fade keyframes, Bangla typography rules per §2.3, custom scrollbars, reduced-motion support); layout.tsx with Manrope+Inter+Anek Bangla+Hind Siliguri via next/font; metadata BN+EN
- i18n: useSyncExternalStore-based LanguageProvider (localStorage persistence, cross-tab sync, html lang sync, no hydration mismatch — lint-clean). Default bn per blueprint; t() picks from {en,bn} pairs
- Content library src/lib/content.ts: full bilingual copy transcribed from blueprint (hero, two paths, how it works, 5-stage vetting, charter, 4 differentiators, 5 services, 3 insights with AEO short-answer boxes, 6 FAQs, dialogs microcopy, quiz 10 questions, footer + risk disclosure)
- Prisma schema: Investor, QuizResult, ContactInquiry, Opportunity, NewsletterSubscriber (SQLite); seeded 3 anonymized demo opportunities (RMG-201 garments ৳1.5-2.5cr stage 4, AGF-105 poultry ৳60-90lakh stage 3, CCL-308 cold-chain ৳2-4cr stage 5) each with always-visible 3 key risks + verification badges
- Frontend (Task 3): single-page composition in page.tsx (only / route allowed) — Header (sticky shrink-on-scroll, scroll-spy, BN⇄EN toggle, mobile full-screen navy menu w/ WhatsApp), dismissible trust ribbon, Hero (Oval Portal Stack: 3 rising ovals with 21s cross-fade carousels, floating verified deal card, cyan path SVG draw), Two Paths cards, How It Works (Crossing Paths SVG scroll animation + 4 steps + "what we don't do" box), Vetting (interactive 5-stage auto-advancing stepper w/ tab panel + progress dots + disclaimer), Opportunities (TanStack Query fetch, skeleton loading, sector filter chips w/ layout animation, badge tooltips, expandable summary, risks always visible, lakh/crore formatting + Bangla numerals), Charter (7 commitments sticky heading), Why NexFund, Services (5 advisory cards), Insights (3 article cards w/ short-answer boxes), FAQ accordion, navy Final CTA w/ rising path, Footer (4 columns + always-visible risk disclosure strip + legal dialogs: privacy/terms/risk), mobile sticky WhatsApp+Book-a-Call bar
- Dialogs (Task 3-b): InvestorDialog 3-step wizard (account→profile→verification+consent, inline validation, success timeline); QuizDialog (intro bars animation, 10 questions w/ progress, SVG gauge score 0-100, gaps/strengths lists, email checklist capture, retake); ContactDialog (role/name/phone/email/slot/message + success state)
- Backend (Task 4): API routes with zod validation — GET /api/opportunities (JSON-parse risks/badges), POST /api/investors (upsert by email, BD phone regex), POST /api/quiz, POST /api/contact, POST /api/newsletter
- QA (Task 5): agent-browser end-to-end — investor 3-step flow submitted & DB-verified (all fields persisted); quiz full 10-question flow, gauge result + email capture DB-verified (score 100); contact dialog flow DB-verified; language toggle cross-fade works both ways; vetting stepper + FAQ accordion + mobile menu + hamburger verified; mobile 375px no horizontal overflow; cards equal height (548px, aligned buttons)
- Bug fixes during QA: (1) founder CTAs wrongly opened investor dialog → now open quiz (hero + final CTA); (2) INVESTOR_DLG missing import crashed quiz result → fixed; (3) i18n setState-in-effect lint error → rewrote with useSyncExternalStore
- VLM design review round: fixed Bangla deal-card overlap (repositioned), risk panel visual weight (stronger border/bg), metadata truncation; verified Bangla H1 = 1.30 line-height per blueprint §2.3. Final hero check: PASS
- Lint: clean (0 errors). Dev server: / and /api/opportunities both 200 OK

Stage Summary:
- Complete working bilingual (BN⇄EN) NexFund single-page site with 11 sections, 3 interactive dialogs, 5 API routes, 5-table database, 12 generated brand images
- All core flows verified end-to-end in browser with DB persistence
- QA screenshots in /home/z/my-project/qa/
- Unresolved/minor: ribbon/sessionStorage is dev-only nicety; opportunity "View Summary" uses details popover (works, could become full detail modal later); testimonials/numbers intentionally absent pre-launch per blueprint trust rules

Next-phase recommendations (for webDevReview agents):
1. More styling detail: micro-interactions on sector chips, animated number counters when REAL numbers exist (never fake), glossary tooltips for equity/valuation terms (§7 #14)
2. More features: newsletter form in footer (API exists, UI missing), sample opportunity summary page (§5.3 #4 — big conversion lever), "Match Me" mini-quiz for investors (§7 #5), scenario simulator (§7 #7)
3. SEO: FAQPage schema JSON-LD, Organization schema, llms.txt
4. i18n: hreflang is impossible on single route; consider ?lang= param canonicalization later
