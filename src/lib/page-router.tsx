"use client";

import { useSyncExternalStore } from "react";

/**
 * R10 PAGE ROUTER — client-side multi-page navigation on the single `/` route.
 *
 * Hash contract (coexists with the existing dialog permalinks #opp=, #cmp=,
 * #insight=, #quiz, #gloss, #admin= — those only READ the hash and never
 * write, so this router is the sole hash writer):
 *
 *   #p/<page>              → main landing-style page
 *   #p/<page>/<detail>     → details page for one item of that page
 *
 * Because hash navigation pushes real history entries, the browser back
 * button returns the visitor to the previous page / home, exactly like a
 * classic multi-page site.
 */

export type PageRoute = { page: string; detail: string | null };

const listeners = new Set<() => void>();

function computeRoute(): PageRoute | null {
  if (typeof window === "undefined") return null;
  const m = window.location.hash.match(/^#p\/([a-z0-9-]+)(?:\/([a-z0-9-]+))?/i);
  if (!m) return null;
  return { page: m[1].toLowerCase(), detail: m[2] ? m[2].toLowerCase() : null };
}

/** Cached snapshot — stable identity between hash changes (required by
 *  useSyncExternalStore to avoid render loops). */
let currentRoute: PageRoute | null =
  typeof window === "undefined" ? null : computeRoute();

function emit() {
  listeners.forEach((l) => l());
}

if (typeof window !== "undefined") {
  window.addEventListener("hashchange", () => {
    currentRoute = computeRoute();
    emit();
  });
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): PageRoute | null {
  return currentRoute;
}

function getServerSnapshot(): PageRoute | null {
  return null;
}

/** Current page route (null → home landing experience). */
export function usePageRoute(): PageRoute | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Navigate to a page (optionally one of its detail items). Pushes history. */
export function navigateTo(page: string, detail?: string | null) {
  const nextHash = detail ? `#p/${page}/${detail}` : `#p/${page}`;
  if (typeof window === "undefined") return;
  if (window.location.hash === nextHash) {
    // same destination clicked again — just glide back to the top
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.location.hash = nextHash;
}

/** Leave page mode and return to the home landing experience. */
export function goHome() {
  if (typeof window === "undefined") return;
  const wasPage = currentRoute !== null;
  // keep a history entry so the browser back button returns to the page
  window.history.pushState(null, "", window.location.pathname + window.location.search);
  currentRoute = computeRoute(); // hash is now empty → null
  emit();
  if (wasPage) window.scrollTo({ top: 0 });
}
