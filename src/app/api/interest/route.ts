import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  opportunitySlug: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(190),
  name: z.string().trim().max(120).optional().or(z.literal("")),
  note: z.string().trim().max(1200).optional().or(z.literal("")),
  language: z.enum(["bn", "en"]).default("bn"),
});

/**
 * POST /api/interest — express-interest capture per opportunity
 * (blueprint §7 #19: Interest → advisor review → introduction).
 * Creates an OpportunityInterest record tied to the anonymized listing.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid submission", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const d = parsed.data;

    // The listing must exist and be featured (public) to accept interest
    const opp = await db.opportunity.findFirst({
      where: { slug: d.opportunitySlug, featured: true },
      select: { slug: true, codeName: true },
    });
    if (!opp) {
      return NextResponse.json({ error: "Opportunity not found" }, { status: 404 });
    }

    const record = await db.opportunityInterest.create({
      data: {
        opportunitySlug: opp.slug,
        codeName: opp.codeName,
        email: d.email,
        name: d.name || null,
        note: d.note || null,
        language: d.language,
      },
    });
    return NextResponse.json({ ok: true, id: record.id }, { status: 201 });
  } catch (e) {
    console.error("[api/interest] failed:", e);
    return NextResponse.json({ error: "Failed to record interest" }, { status: 500 });
  }
}
