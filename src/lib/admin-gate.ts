/**
 * R9: shared in-memory rate limiter + lockout for the admin passphrase gate.
 *
 * Sliding window: at most 5 FAILED passphrase attempts within 15 minutes per
 * client key; the 5th failure starts a 5-minute lockout during which every
 * admin API route answers 429 (before the passphrase is even inspected).
 *
 * Key = client IP taken from the `x-forwarded-for` header (first hop, which
 * Caddy sets to the real visitor IP), falling back to "local" for direct
 * dev-machine requests that carry no header.
 *
 * DEPLOYMENT NOTE: the counters live in this Node process's memory, so the
 * limit is enforced per server instance. A multi-instance production
 * deployment would need a shared store (e.g. Redis) to enforce the limit
 * cluster-wide. For NexFund's current single-instance deployment this
 * module-level store is sufficient.
 *
 * The Map is pinned on `globalThis` (same trick as src/lib/db.ts) so all
 * admin routes share ONE limiter instance even when the bundler compiles
 * this module into separate per-route server chunks.
 */

const WINDOW_MS = 15 * 60 * 1000; // sliding failure window: 15 minutes
const MAX_FAILURES = 5; // failed attempts allowed inside the window
const LOCKOUT_MS = 5 * 60 * 1000; // lockout length, starting at the 5th failure

/** gate state — when locked `retryAfter` is seconds; when open `attemptsLeft` counts failures remaining before lockout */
export type GateState =
  | { allowed: true; attemptsLeft: number }
  | { allowed: false; retryAfter: number };

interface GateEntry {
  /** timestamps (ms) of failed attempts still inside the sliding window */
  failures: number[];
  /** absolute ms timestamp until which the key is locked out (set at the 5th failure) */
  lockedUntil?: number;
}

const globalForGate = globalThis as unknown as { __nexfundAdminGate?: Map<string, GateEntry> };
const entries: Map<string, GateEntry> = (globalForGate.__nexfundAdminGate ??= new Map());

/** rate-limit key: client IP from `x-forwarded-for` (first hop), "local" fallback */
export function gateKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  const first = fwd?.split(",")[0]?.trim();
  return first ? first : "local";
}

/** prune entries whose sliding window AND lockout have both fully expired (keeps the Map bounded) */
function prune(now: number): void {
  for (const [key, entry] of entries) {
    const lastFailure = entry.failures.length > 0 ? entry.failures[entry.failures.length - 1] : 0;
    const staleAt = Math.max(lastFailure + WINDOW_MS, entry.lockedUntil ?? 0);
    if (now >= staleAt) entries.delete(key);
  }
}

/**
 * Current gate state for a key. Routes call this BEFORE the passphrase check
 * so locked-out clients get a 429 without ever probing the passphrase.
 */
export function checkRate(key: string): GateState {
  const now = Date.now();
  prune(now);
  const entry = entries.get(key);
  if (entry?.lockedUntil !== undefined && entry.lockedUntil > now) {
    return { allowed: false, retryAfter: Math.ceil((entry.lockedUntil - now) / 1000) };
  }
  const inWindow = entry ? entry.failures.filter((ts) => now - ts < WINDOW_MS).length : 0;
  return { allowed: true, attemptsLeft: Math.max(0, MAX_FAILURES - inWindow) };
}

/**
 * Record a failed passphrase attempt. The 5th failure inside the window
 * starts the lockout (so the response for that attempt is already a 429).
 */
export function recordFailure(key: string): void {
  const now = Date.now();
  prune(now);
  const entry = entries.get(key) ?? { failures: [] };
  entry.failures = entry.failures.filter((ts) => now - ts < WINDOW_MS);
  entry.failures.push(now);
  if (entry.failures.length >= MAX_FAILURES) {
    entry.lockedUntil = now + LOCKOUT_MS;
  }
  entries.set(key, entry);
}

/** successful unlock — forget every failure for this key */
export function reset(key: string): void {
  entries.delete(key);
}
