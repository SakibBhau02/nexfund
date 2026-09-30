import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { FAQ } from "@/lib/content";

const schema = z.object({
  questionId: z.string().trim().min(1).max(300),
  helpful: z.boolean(),
  language: z.enum(["bn", "en"]).default("bn"),
});

/**
 * POST /api/feedback — FAQ "was this answer helpful?" micro-poll (R7).
 * questionId is the stable FAQ q.en key (also the accordion value), so votes
 * stay attached to the same question in both display languages. POST only —
 * aggregate counts stay private (no data leakage via a GET endpoint).
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

    // Guard: only real FAQ questions are votable
    if (!FAQ.items.some((item) => item.q.en === d.questionId)) {
      return NextResponse.json(
        { error: "Invalid submission", issues: { questionId: ["Unknown question"] } },
        { status: 400 }
      );
    }

    await db.fAQFeedback.create({
      data: {
        questionId: d.questionId,
        helpful: d.helpful,
        language: d.language,
      },
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error("[api/feedback] failed:", e);
    return NextResponse.json({ error: "Failed to record feedback" }, { status: 500 });
  }
}
