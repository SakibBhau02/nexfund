import { createHash, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  passphrase: z.string().min(1).max(200),
  status: z.enum(["new", "reviewed", "introduced", "declined"]),
});

/**
 * R8: admin review workspace — PATCH /api/admin/interests/[id]
 * Updates an OpportunityInterest's review status (new → reviewed → introduced
 * / declined). Same passphrase gate as the overview route: 503 when
 * ADMIN_PASSPHRASE is unset, 401 on a wrong passphrase (generic message),
 * 404 when the interest id is unknown, 200 with the updated row. PATCH only —
 * the passphrase stays in the request body.
 */
export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    if (!process.env.ADMIN_PASSPHRASE) {
      return NextResponse.json({ locked: true, error: "Workspace is locked" }, { status: 503 });
    }

    const body = await req.json().catch(() => null);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // constant-time compare (hash both sides so lengths never leak)
    const a = createHash("sha256").update(parsed.data.passphrase).digest();
    const b = createHash("sha256").update(process.env.ADMIN_PASSPHRASE).digest();
    if (!timingSafeEqual(a, b)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await ctx.params;

    const existing = await db.opportunityInterest.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const updated = await db.opportunityInterest.update({
      where: { id },
      data: { status: parsed.data.status },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (e) {
    console.error("[api/admin/interests] failed:", e);
    return NextResponse.json({ error: "Failed to update interest" }, { status: 500 });
  }
}
