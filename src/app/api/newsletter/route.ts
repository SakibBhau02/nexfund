import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  email: z.string().trim().email().max(190),
  source: z.string().trim().max(60).default("home"),
  language: z.enum(["bn", "en"]).default("bn"),
});

/** POST /api/newsletter — priority-list signup */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    const d = parsed.data;
    await db.newsletterSubscriber.upsert({
      where: { email: d.email },
      update: { source: d.source, language: d.language },
      create: { email: d.email, source: d.source, language: d.language },
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error("[api/newsletter] failed:", e);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
