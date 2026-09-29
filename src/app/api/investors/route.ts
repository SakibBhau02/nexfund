import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const phoneRe = /^(\+?880|0)1[3-9]\d{8}$/;

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(190),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s-]/g, ""))
    .refine((v) => phoneRe.test(v), "Invalid BD phone"),
  langPref: z.enum(["bn", "en"]).default("bn"),
  experience: z.enum(["exploring", "some", "active"]).optional(),
  sectors: z.array(z.string()).optional(),
  ticketRange: z.enum(["5-25", "25-100", "100-400", "400+"]).optional(),
  horizon: z.enum(["short", "medium", "long"]).optional(),
  riskComfort: z.enum(["cautious", "balanced", "comfortable"]).optional(),
});

/** POST /api/investors — 3-step investor registration (blueprint §5.3) */
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
    const investor = await db.investor.upsert({
      where: { email: d.email },
      update: {
        name: d.name,
        phone: d.phone,
        language: d.langPref,
        experience: d.experience,
        sectors: d.sectors ? JSON.stringify(d.sectors) : undefined,
        ticketRange: d.ticketRange,
        horizon: d.horizon,
        riskComfort: d.riskComfort,
      },
      create: {
        name: d.name,
        email: d.email,
        phone: d.phone,
        language: d.langPref,
        experience: d.experience,
        sectors: d.sectors ? JSON.stringify(d.sectors) : null,
        ticketRange: d.ticketRange ?? null,
        horizon: d.horizon ?? null,
        riskComfort: d.riskComfort ?? null,
      },
    });
    return NextResponse.json({ ok: true, id: investor.id }, { status: 201 });
  } catch (e) {
    console.error("[api/investors] failed:", e);
    return NextResponse.json({ error: "Failed to save registration" }, { status: 500 });
  }
}
