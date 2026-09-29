import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/** GET /api/opportunities — anonymized featured listings (blueprint §5.5) */
export async function GET() {
  try {
    const rows = await db.opportunity.findMany({
      where: { featured: true },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(
      rows.map((o) => ({
        id: o.id,
        slug: o.slug,
        codeName: o.codeName,
        sector: o.sector,
        sectorBn: o.sectorBn,
        location: o.location,
        locationBn: o.locationBn,
        headline: o.headline,
        headlineBn: o.headlineBn,
        description: o.description,
        descriptionBn: o.descriptionBn,
        seekingMin: o.seekingMin,
        seekingMax: o.seekingMax,
        stage: o.stage,
        instrument: o.instrument,
        instrumentBn: o.instrumentBn,
        risks: JSON.parse(o.risks),
        badges: JSON.parse(o.badges),
        image: o.image,
        revenue: o.revenue ?? undefined,
        revenueBn: o.revenueBn ?? undefined,
      }))
    );
  } catch (e) {
    console.error("[api/opportunities] failed:", e);
    return NextResponse.json({ error: "Failed to load opportunities" }, { status: 500 });
  }
}
