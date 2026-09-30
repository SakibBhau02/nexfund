import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { CHARTER, FAQ, GLOSSARY, INSIGHTS, SERVICES, VETTING } from "@/lib/content";

export const dynamic = "force-dynamic";

/**
 * R11 — Public, read-only aggregate feed for the Impact page (#p/impact).
 *
 * Two honest halves (mirrors IMPACT content block):
 *  - live:  counts computed from the platform database at request time
 *  - milestones: curated, quarterly-verified business figures (PlatformStat)
 *
 * No PII is ever returned — only counts, sums and sector/stage groupings.
 */

/** ticketRange key ("5-25" | "25-100" | "100-400" | "400" | "400+") → [min,max] lakh */
function ticketLakh(range: string): [number, number] | null {
  if (range === "400" || range === "400+") return [400, 800];
  const m = range.match(/^(\d+)-(\d+)$/);
  if (!m) return null;
  return [Number(m[1]), Number(m[2])];
}

export async function GET() {
  try {
    const [
      opportunities,
      investors,
      readinessChecks,
      conversations,
      interests,
      newsletter,
      milestoneRows,
    ] = await Promise.all([
      db.opportunity.findMany({
        where: { featured: true },
        select: {
          sector: true,
          sectorBn: true,
          location: true,
          locationBn: true,
          seekingMin: true,
          seekingMax: true,
          stage: true,
        },
      }),
      db.investor.findMany({ select: { status: true, ticketRange: true } }),
      db.quizResult.count(),
      db.contactInquiry.count(),
      db.opportunityInterest.count(),
      db.newsletterSubscriber.count(),
      db.platformStat.findMany(),
    ]);

    // ── listing aggregates ──
    let seekingMin = 0;
    let seekingMax = 0;
    const sectors = new Map<string, { bn: string; count: number; minLakh: number; maxLakh: number }>();
    const stages = new Map<number, number>();
    const locations = new Map<string, { bn: string; count: number }>();
    for (const o of opportunities) {
      seekingMin += o.seekingMin;
      seekingMax += o.seekingMax;
      const s = sectors.get(o.sector) ?? { bn: o.sectorBn, count: 0, minLakh: 0, maxLakh: 0 };
      s.count += 1;
      s.minLakh += o.seekingMin;
      s.maxLakh += o.seekingMax;
      sectors.set(o.sector, s);
      stages.set(o.stage, (stages.get(o.stage) ?? 0) + 1);
      const loc = locations.get(o.location) ?? { bn: o.locationBn, count: 0 };
      loc.count += 1;
      locations.set(o.location, loc);
    }

    // ── investor aggregates (no PII) ──
    const byStatus = { new: 0, verified: 0, active: 0 };
    let appetiteMin = 0;
    let appetiteMax = 0;
    let appetiteInvestors = 0;
    for (const inv of investors) {
      if (inv.status === "new" || inv.status === "verified" || inv.status === "active") {
        byStatus[inv.status as keyof typeof byStatus] += 1;
      }
      const t = inv.ticketRange ? ticketLakh(inv.ticketRange) : null;
      if (t) {
        appetiteMin += t[0];
        appetiteMax += t[1];
        appetiteInvestors += 1;
      }
    }

    return NextResponse.json({
      live: {
        listings: {
          count: opportunities.length,
          seekingLakh: { min: seekingMin, max: seekingMax },
          sectors: Array.from(sectors.entries()).map(([key, v]) => ({
            key,
            bn: v.bn,
            count: v.count,
            seekingLakh: { min: v.minLakh, max: v.maxLakh },
          })),
          stages: Array.from(stages.entries())
            .map(([stage, count]) => ({ stage, count }))
            .sort((a, b) => a.stage - b.stage),
          locations: Array.from(locations.entries()).map(([en, v]) => ({
            en,
            bn: v.bn,
            count: v.count,
          })),
        },
        investors: {
          total: investors.length,
          byStatus,
          appetiteLakh: { min: appetiteMin, max: appetiteMax },
          appetiteInvestors,
        },
        readinessChecks,
        conversations,
        interests,
        newsletter,
      },
      milestones: milestoneRows
        .map((m) => ({ key: m.key, value: m.value, note: m.note ?? undefined, updatedAt: m.updatedAt }))
        .sort((a, b) => a.key.localeCompare(b.key)),
      content: {
        insights: INSIGHTS.articles.length,
        glossaryTerms: Object.keys(GLOSSARY).length,
        faqItems: FAQ.items.length,
        services: SERVICES.items.length,
        charterPromises: CHARTER.items.length,
        vettingPillars: VETTING.stages.length,
      },
      generatedAt: new Date().toISOString(),
    });
  } catch (e) {
    console.error("[api/impact] failed:", e);
    return NextResponse.json({ error: "Failed to compute impact stats" }, { status: 500 });
  }
}
