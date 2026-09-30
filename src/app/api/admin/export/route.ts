import { createHash, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { checkRate, gateKey, recordFailure, reset } from "@/lib/admin-gate";

const schema = z.object({
  passphrase: z.string().min(1).max(200),
});

/** header row of the exported sheet (stable column order for advisors' tooling) */
const CSV_HEADER = "id,received,status,listing,email,name,note,lang";

/** RFC-4180 escaping — quote fields with commas/quotes/newlines, doubling embedded quotes */
function csvCell(value: string): string {
  return /[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

/**
 * R9: admin review workspace — POST /api/admin/export
 * Streams the full OpportunityInterest table as CSV for offline review.
 * Same passphrase gate + shared rate limiter as the other admin routes (the
 * gate-check happens BEFORE the passphrase check so locked-out clients get
 * 429 even here): 503 when ADMIN_PASSPHRASE is unset, 401 with attemptsLeft
 * on a wrong passphrase, 429 + Retry-After while locked out. POST only — no
 * GET, and the passphrase travels solely in the request BODY.
 *
 * The body starts with a UTF-8 BOM (\uFEFF) so Bangla note text opens
 * correctly in Excel; dates are ISO strings; rows are ordered createdAt desc;
 * the filename carries the export date (nexfund-interests-YYYYMMDD.csv).
 */
export async function POST(req: Request) {
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

    const interests = await db.opportunityInterest.findMany({
      orderBy: { createdAt: "desc" },
    });

    const rows = interests.map((r) =>
      [
        r.id,
        r.createdAt.toISOString(), // received
        r.status,
        r.codeName, // listing — the denormalized reporting code (e.g. "RMG-201")
        r.email,
        r.name ?? "",
        r.note ?? "",
        r.language,
      ]
        .map(csvCell)
        .join(",")
    );

    // UTF-8 BOM first so Excel decodes Bangla text correctly; CRLF per RFC 4180
    const csv = `\uFEFF${[CSV_HEADER, ...rows].join("\r\n")}\r\n`;

    const d = new Date();
    const stamp = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(
      d.getUTCDate()
    ).padStart(2, "0")}`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="nexfund-interests-${stamp}.csv"`,
      },
    });
  } catch (e) {
    console.error("[api/admin/export] failed:", e);
    return NextResponse.json({ error: "Failed to export records" }, { status: 500 });
  }
}
