import { createHash, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { checkRate, gateKey, recordFailure, reset } from "@/lib/admin-gate";

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
 * R9: guarded by the shared in-memory rate limiter (src/lib/admin-gate.ts) —
 * 5 wrong passphrases per client IP within 15 min → 429 + Retry-After for
 * 5 min, checked BEFORE the passphrase so locked clients can't probe.
 */
export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    // R9: rate limit first — locked-out clients get 429 before anything else
    const key = gateKey(req);
    const gate = checkRate(key);
    if (!gate.allowed) {
      return NextResponse.json(
        { error: "Too many attempts", retryAfter: gate.retryAfter },
        { status: 429, headers: { "Retry-After": String(gate.retryAfter) } }
      );
    }

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
      // R9: count the failure — the 5th inside the window starts the lockout
      // (that attempt already answers 429), otherwise 401 + attemptsLeft
      recordFailure(key);
      const after = checkRate(key);
      if (!after.allowed) {
        return NextResponse.json(
          { error: "Too many attempts", retryAfter: after.retryAfter },
          { status: 429, headers: { "Retry-After": String(after.retryAfter) } }
        );
      }
      return NextResponse.json(
        { error: "Unauthorized", attemptsLeft: after.attemptsLeft },
        { status: 401 }
      );
    }
    reset(key);

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
