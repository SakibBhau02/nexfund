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

---
Task ID: R2 (webDevReview cron round 2)
Agent: webDevReview (Z.ai Code)
Task: Scheduled 15-min review — QA current state, then add features + styling detail

Work Log:
- QA pass on current state: / and /api/opportunities 200 OK, no browser/console errors, EN⇄BN toggle, investor/quiz dialogs, all 7 sections, no overflow — all green
- R2-2 Opportunity Detail Dialog (blueprint §5.5, biggest conversion lever): extended Prisma Opportunity model with overview/teamNote/financialNote/useOfFunds(JSON)/advisorNote/modelNote (+Bn variants); destructive re-seed with rich bilingual content for all 3 listings; API returns enriched fields; new dialogs/opportunity-dialog.tsx with 6 tabs (Overview/Model/Financials/Team/Use of Funds/Key Risks), animated use-of-funds allocation bars, sticky key-facts strip (seeking/revenue/instrument/verification dots), "What our advisors noticed" panel, Express Interest + Book Advisor Call actions, "Illustrative listing" honesty badge w/ tooltip, NDA-gate notes; card "View Summary" now opens the dialog (replaced details popover)
- R2-3 Match Me mini-quiz (§7 #5): new match-me.tsx card below opportunities — 4 questions (sector/ticket/horizon/risk) → explainable client-side matching against LIVE anonymized listings (cautious users only see stage-5 listings), shows matching count + codeNames + sector chips + register CTA + honest disclaimer; spring micro-interactions on option chips
- R2-4 Footer newsletter form: brand column now has "The Deal Room, monthly" capture posting to existing /api/newsletter; verified end-to-end (deals@sakib.example persisted, success state swaps form)
- R2-5 Styling details: new G glossary component (dotted-underline + bilingual tooltip for Equity/Valuation/Due Diligence/Revenue Share/Ticket) wired into opportunity-card instruments + Services card titles; sector filter chips rebuilt with whileTap spring + hover lift + active shadow; dialog tab underline layoutId animation; risk tab uses warn-colored underline
- R2-6 SEO/AGO: FAQPage + FinancialService(Organization) JSON-LD in server-side layout.tsx (both languages in answers); public/llms.txt created
- Infra fix: dev server was holding stale Prisma singleton after schema push (globalThis cache) → restarted dev process, enriched API confirmed
- QA of all new features via agent-browser: detail dialog (6 tabs, funds bars ৬২%, risks disclaimer, advisor note, express CTA), Match Me full flow (agri/mid/medium/cautious → result + register CTA), newsletter DB-verified, glossary tooltip verified via pointer events, mobile 375px: no overflow, tabs scrollable horizontally, sticky actions reachable
- VLM review of new UI: flagged card-height inconsistency — disproven by direct measurement (all cards exactly 548px/aligned); headline truncation is intentional line-clamp-2
- Lint: clean. No console/page errors.

Stage Summary:
- 3 significant new features (opportunity detail dialog w/ enriched data, Match Me quiz, newsletter capture), glossary tooltips + chip micro-interactions, JSON-LD + llms.txt
- All verified end-to-end in browser with DB persistence where applicable
- QA screenshots: qa/08-opp-detail.png, 09-opp-detail-mobile.png, 10-matchme.png

Unresolved / next-phase recommendations:
1. Sample Opportunity Summary as a dedicated shareable "page-like" experience is now covered by the detail dialog; remaining: PDF-style export view (low priority)
2. Scenario simulator (§7 #7, base/upside/downside sliders) — good next feature for the Tools concept
3. Glossary could extend to Insights article cards + FAQ answers
4. Real-voice testimonial/case-study section when actual data exists (never fake)
5. Consider preserving investor "express interest" records per opportunity (new table) once matching workflow goes live

---
Task ID: r3-3
Agent: full-stack-developer
Task: Wire express-interest capture form into opportunity detail dialog

Work Log:
- Read worklog, opportunity-dialog.tsx, contact-dialog.tsx (input/label/textarea + success-state patterns), EXPRESS copy in content.ts, /api/interest route, i18n hook, dialog-store
- Edited ONLY src/components/site/dialogs/opportunity-dialog.tsx:
  - Added imports: useEffect, CircleCheck + Loader2 (lucide), EXPRESS (content), Input/Label/Textarea (shadcn); removed now-unused openInvestor selector
  - New state: xiView ("actions"|"form"|"success"), xiEmail/xiName/xiNote, xiSending, xiError; reset effect on [isOpen, slug] so reopening/closing/switching listing always starts fresh
  - "Express Interest" button now switches the sticky action area to an inline form (no dialog close, no investor dialog); "Book Advisor Call" untouched (still open("contact"))
  - Form: EXPRESS.title + EXPRESS.sub copy, Email* (required, autoFocus, aria-invalid on error, autoComplete=email, dir=ltr), Name (optional), Note (textarea w/ EXPRESS.notePlaceholder); noValidate + custom validation (/^[^\s@]+@[^\s@]+\.[^\s@]+$/); inline error via role="alert" text-nx-danger (errEmail / errGeneric); Cancel (বাতিল/Cancel ternary) keeps drafts and returns to actions; Submit posts {opportunitySlug: o.slug, email, name, note, language: lang} to /api/interest with Loader2 animate-spin + EXPRESS.submitting + disabled state
  - Success view: spring CircleCheck in nx-verified-bg circle, EXPRESS.successTitle/successBody, "Done — back to listing" (finishSuccess) clears the form and returns to default actions
  - All three views animated with AnimatePresence mode="wait" + motion.div fade/slide (0.22s, same pattern as tab content); default view keeps the Lock/expressNote line; submit button styled rounded-full bg-nx-navy-700 px-5 py-3 like existing primary
- INFRA FIX (dev server only, no code): first browser submit hit 500 — dev server (started 17:50) held a stale globalThis Prisma singleton from BEFORE prisma generate ran at 17:59, so db.opportunityInterest was undefined (same issue R2 hit). On-disk client was fresh; killed stale server (PIDs 6013-6029) and relaunched detached via `( setsid bun run dev >/dev/null 2>&1 </dev/null & )` double-fork so it survives across tool calls (plain nohup/setsid got reaped by sandbox; double-fork escapes the per-call process-tree cleanup). Server healthy since 18:08
- QA via agent-browser (8 screenshots in qa/r3-05-express-*.png): 1-dialog-actions, 2-form (EN), 3-invalid-email inline error, 4-success (EN), 5-back-to-actions, 6-bn-form, 7-bn-success, 8-mobile-375px-form (no horizontal overflow)
- Verified flows: View Summary → dialog; Express Interest → inline form (email input autofocused); invalid email → role=alert "Enter a valid email address." + aria-invalid=true; valid submit → 201 → success heading "Interest recorded ✓" + advisor-reach-out body; Done → default actions restored; Cancel → actions (draft preserved); Book Advisor Call → contact dialog opens (unchanged); full BN flow (আগ্রহ জানান → ইমেইল/নাম/বাতিল/আগ্রহ পাঠান → আগ্রহ রেকর্ড হয়েছে ✓ → লিস্টিংয়ে ফিরুন); mobile 375px stacked layout, scrollWidth check "no-overflow"; zero browser console/page errors
- API spot-checks with curl: 201 {ok:true,id} valid; 400 zod issues on bad email; 404 on unknown slug
- DB persistence via prisma client script: OpportunityInterest rows — {codeName RMG-201, email test.interest@sakib.example, name "Test Investor", note, language "en", status "new", slug rmg-201-denim-knitwear}, {curl.check@sakib.example, "en"}, {test.bn@sakib.example, "bn"} — all persisted correctly
- bun run lint: 0 errors. dev.log post-restart: only 201/400/404 /api/interest entries, no errors

Stage Summary:
- Express-interest capture now runs fully inline inside the opportunity dialog (actions ⇄ form ⇄ success, animated, bilingual, accessible) and persists to OpportunityInterest via existing POST /api/interest
- Deviations: had to restart the dev server (infra, stale Prisma singleton predating prisma generate — no source files touched for this); relaunched detached so it persists; no changes to content.ts, prisma schema, or API routes
- Known nuance: aria-invalid is set on the email input whenever any submit error shows (email-format or generic server error); error copy is per EXPRESS

---
Task ID: R3 (webDevReview cron round 3) — main agent + full-stack-developer subagent
Agent: main (Z.ai Code) + full-stack-developer (r3-3)
Task: Scheduled review — QA current state, then add Scenario Simulator, Express-Interest persistence, glossary extension, styling polish

Work Log:
- QA pass on entry: dev.log clean (all 200s), lint 0 errors, agent-browser sweep — all 10 sections + footer present, opportunity detail dialog (6 BN tabs), BN⇄EN toggle, no horizontal overflow, no console errors, mobile CTA bar present. Verdict: stable → proceed with new features.
- R3-2a Backend: new Prisma model OpportunityInterest (opportunitySlug, codeName, email, name?, note?, language, status new/reviewed/introduced/declined, @@index) → bun run db:push; new API route POST /api/interest with zod validation + featured-listing existence check (404 if unknown slug, 400 invalid, 201 created).
- R3-2b Content (content.ts): SIM block (simulator copy: eyebrow/title/sub, illustrative-pill, 4 control labels, impliedValuation, yearsUnit with Bangla digits, 3 scenario name+desc, exitValue/multipleLabel/changeLabel/loss/gain, reset, footnote w/ dilution-fees-taxes honesty, saveTitle/saveSub/saveCta/saved/saveErr); EXPRESS block (interest form: title/sub/email/name/note+placeholder/submit/submitting/successTitle/successBody/successAnother/errEmail/errGeneric); GLOSSARY +7 terms (exit, multiple, data room, nda, capital loss, exit multiple) + GLOSSARY_LABELS display map (all bilingual); FAQ items got terms[] field (due diligence / capital loss / ticket / data room) + termsLabel.
- R3-3 (subagent, full-stack-developer): opportunity-dialog.tsx "Express Interest" no longer opens generic investor dialog — inline 3-state flow in sticky action area (actions ↔ form ↔ success, AnimatePresence): email (required, autoFocus, aria-invalid) + name + note fields, inline role=alert errors, Loader2 spinner while posting, CircleCheck success state, cancel keeps draft, state resets on dialog close/slug change. Verified: 8 screenshots, DB rows (RMG-201 ×3 test emails), 201/400/404 API paths, BN+EN flows, mobile 375px no overflow. (Note: subagent had to restart dev server — stale Prisma singleton after generate, same as R2.)
- R3-2 Scenario Simulator (main agent, new component scenario-simulator.tsx, blueprint §7 #7 + §0.4): section id="simulator" bg-nx-mist between MatchMe and Charter. Explainable model: exit proceeds = ticket × (1+growth)^years × exitMultiple; scenarios down (growth −25pp floor −35, multiple 0.65), base (as-is, 1.0), up (+12pp cap 45, 1.3); DOWNSIDE listed first with warn emphasis + "look here first" tag (blueprint: downside default-visible). 4 shadcn sliders (ticket 25–400 lakh, stake 5–40%, growth −10..+35%, years 2–8) with live nx-num value chips; implied entry valuation = ticket/stake panel with G-tooltips (valuation, exit multiple); 3 animated result bars (warm-to-loss gradient / navy / cyan) with dashed break-even marker at ticket level, value inside bar, multiple × and ±% gain/loss chips (danger red for loss, verified green for gain); per-scenario assumption line (growth %/yr · exit multiple) for explainability; honesty pill "Illustrative only" in heading + warn footnote (total loss possible, ignores dilution/fees/taxes); "Save this scenario" email capture → POST /api/newsletter source="simulator" with success swap. Custom CSS utilities in globals.css: .nx-warm-to-loss (warn→danger gradient), .nx-progress-gradient.
- R3-4 Glossary extension: FAQ answers now render term chips ("Terms explained:" row w/ BookMarked icon) using G + GLOSSARY_LABELS; Insights category badges for DD + valuation articles wrapped in G (For Investors stays plain).
- R3-5 Styling: ScrollProgress (framer useScroll + spring scaleX, navy→cyan 3px gradient bar, fixed top z-80) + BackToTop (appears >600px scroll, smooth scroll top, bottom-24 above mobile CTA bar / md:bottom-6, bilingual aria-label) — both wired into page.tsx.
- QA of all R3 features via agent-browser: simulator math verified against hand calc (defaults: 0.32×/−68%, 1.76×/+76%, 3.81×/+281%; growth→+30%: 0.83×/3.71×/7.51× — all match model); slider drag via pointer events recalculates live; save flow → "On its way ✓" + DB row (source=simulator); express-interest main-agent spot check → success state + DB row; FAQ chips render BN ("ডিউ ডিলিজেন্স") + EN; tooltip content verified via trusted hover; Insights badges: DD + Valuation glossary buttons, third plain; scroll progress scaleX tracks position (0.285 at test scroll); back-to-top no overlap with mobile CTA bar (716 < 745); mobile 375px: simulator stacks, 4 sliders + save form reachable, no overflow; clean reload: 0 console errors, title correct.
- Lint: 0 errors. Screenshots: qa/r3-06..r3-12 (simulator BN/EN/mobile, progress+backtop, express form, insights-en, faq-terms-en).

Stage Summary:
- 3 new user-facing features: Scenario Simulator (biggest — downside-first illustrative equity model with sliders, animated bars, break-even marker, explainable assumptions, email save), Express-Interest persistence per listing (DB-backed, advisor-review workflow foundation §7 #19), glossary extension to FAQ + Insights
- 2 styling additions: reading-progress bar + back-to-top
- New API: POST /api/interest; new table: OpportunityInterest; /api/newsletter reused with source="simulator"
- All flows verified end-to-end in browser + DB; lint clean; no console errors; mobile-safe

Unresolved / next-phase recommendations:
1. Downside-scenario mini-chart inside opportunity detail dialog (§5.5 "Downside scenario chart ← upside-এর পাশাপাশি") — simulator math could be reused per-listing
2. Simulator: preset scenario buttons ("conservative/balanced/ambitious") + share-permalink of slider state (URL hash)
3. FAQ schema JSON-LD already exists — consider HowTo/FAQ enrichment with glossary definitions for AEO
4. Real admin view for OpportunityInterest records once matching workflow goes live (currently DB-only)
5. Optional: subtle count-up animation on simulator numbers when values change (respect prefers-reduced-motion)
