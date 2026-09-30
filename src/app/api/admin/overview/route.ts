import { createHash, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { FAQ } from "@/lib/content";

const schema = z.object({
  passphrase: z.string().min(1).max(200),
});

/**
 * R8: admin review workspace — POST /api/admin/overview
 * Passphrase-gated (ADMIN_PASSPHRASE env, dev-only value) aggregate read of
 * OpportunityInterest records + FAQFeedback votes for NexFund advisors.
 * POST only — the passphrase travels in the request BODY, never in a query
 * string, and there is no GET so nothing leaks without the passphrase.
 * 503 when the env var is unset (workspace locked), 401 on a wrong passphrase
 * with a generic message that never hints whether the env var exists.
 */
export async function POST(req: Request) {
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

    const [interests, feedback, grouped] = await Promise.all([
      db.opportunityInterest.findMany({ orderBy: { createdAt: "desc" } }),
      db.fAQFeedback.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
      db.fAQFeedback.groupBy({ by: ["questionId", "helpful"], _count: { _all: true } }),
    ]);

    // groupBy(questionId, helpful) → per-question yes/no tallies
    const tally = new Map<string, { questionId: string; yes: number; no: number }>();
    for (const g of grouped) {
      const entry = tally.get(g.questionId) ?? { questionId: g.questionId, yes: 0, no: 0 };
      if (g.helpful) entry.yes += g._count._all;
      else entry.no += g._count._all;
      tally.set(g.questionId, entry);
    }

    // attach the FAQ question text (en/bn) for display; null = stale questionId
    const questionText = new Map(FAQ.items.map((item) => [item.q.en, item.q]));
    const feedbackAgg = Array.from(tally.values())
      .map((entry) => ({ ...entry, q: questionText.get(entry.questionId) ?? null }))
      .sort((x, y) => y.yes + y.no - (x.yes + x.no));

    return NextResponse.json({ interests, feedback, feedbackAgg });
  } catch (e) {
    console.error("[api/admin/overview] failed:", e);
    return NextResponse.json({ error: "Failed to load records" }, { status: 500 });
  }
}
