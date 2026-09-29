import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  role: z.enum(["investor", "entrepreneur", "partner", "other"]),
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  email: z.string().trim().email().max(190),
  slot: z.enum(["morning", "afternoon", "evening"]).optional(),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  language: z.enum(["bn", "en"]).default("bn"),
});

/** POST /api/contact — consultation booking (blueprint §5.10) */
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
    const inquiry = await db.contactInquiry.create({
      data: {
        role: d.role,
        name: d.name,
        phone: d.phone || null,
        email: d.email,
        slot: d.slot ?? null,
        message: d.message || null,
        language: d.language,
      },
    });
    return NextResponse.json({ ok: true, id: inquiry.id }, { status: 201 });
  } catch (e) {
    console.error("[api/contact] failed:", e);
    return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
  }
}
