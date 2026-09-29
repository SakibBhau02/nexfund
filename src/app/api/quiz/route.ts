import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  email: z.string().trim().email().max(190).optional(),
  score: z.number().int().min(0).max(100),
  answers: z.array(z.number().int().min(0).max(2)).length(10),
  gaps: z.array(z.number().int().min(0).max(9)),
  language: z.enum(["bn", "en"]).default("bn"),
});

/** POST /api/quiz — entrepreneur readiness result (blueprint §5.4) */
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
    const result = await db.quizResult.create({
      data: {
        email: d.email ?? null,
        score: d.score,
        answers: JSON.stringify(d.answers),
        gaps: JSON.stringify(d.gaps),
        language: d.language,
      },
    });
    return NextResponse.json({ ok: true, id: result.id }, { status: 201 });
  } catch (e) {
    console.error("[api/quiz] failed:", e);
    return NextResponse.json({ error: "Failed to save quiz result" }, { status: 500 });
  }
}
