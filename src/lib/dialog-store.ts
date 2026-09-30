"use client";

import { create } from "zustand";

export type DialogKind =
  | "investor"
  | "quiz"
  | "contact"
  | "opportunity"
  | "insight"
  | "glossary"
  | "admin"
  | null;

interface DialogState {
  dialog: DialogKind;
  investorPrefill?: "investor" | "founder";
  /** slug of the opportunity opened in the detail dialog */
  opportunitySlug?: string;
  /** slug of the insight article opened in the reader dialog (R4-3) */
  insightSlug?: string;
  /** R7: glossary hub dialog has no payload — just the kind */
  /**
   * R5-CMP: compare shortlist (opportunity slugs, max 3). Lives in the store
   * — not section state — so the language cross-fade (which remounts every
   * section via key={lang}) doesn't discard the user's picks.
   */
  compareSlugs: string[];
  setCompareSlugs: (slugs: string[]) => void;
  /**
   * R7: compare dialog open flag lives in the store too — the BN⇄EN
   * cross-fade remounts the Opportunities section, and a section-local
   * useState closed the dialog mid-comparison (same remount-survival reason
   * as compareSlugs; parity with the global dialogs which never close on
   * language toggle).
   */
  compareOpen: boolean;
  setCompareOpen: (open: boolean) => void;
  /**
   * R6: active opportunities sector filter ("all" or an EN sector key from
   * the DB — stable across languages since BN labels render from the same
   * key). Stored here for the same remount-survival reason as compareSlugs.
   */
  sectorFilter: string;
  setSectorFilter: (sector: string) => void;
  open: (kind: Exclude<DialogKind, null>) => void;
  openInvestor: (prefill?: "investor" | "founder") => void;
  openOpportunity: (slug: string) => void;
  openInsight: (slug: string) => void;
  openGlossary: () => void;
  /** R8: hidden admin review workspace (#admin= hash — advisors only) */
  openAdmin: () => void;
  close: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  dialog: null,
  investorPrefill: undefined,
  opportunitySlug: undefined,
  insightSlug: undefined,
  compareSlugs: [],
  setCompareSlugs: (slugs) => set({ compareSlugs: slugs }),
  compareOpen: false,
  setCompareOpen: (open) => set({ compareOpen: open }),
  sectorFilter: "all",
  setSectorFilter: (sector) => set({ sectorFilter: sector }),
  /* R8 guard: a global dialog and the compare dialog are both modal —
     opening one must close the other (matters for the #opp=/#insight= hash
     flows, which can fire while a shared #cmp= link left compare open). */
  open: (kind) =>
    set({ dialog: kind, opportunitySlug: undefined, insightSlug: undefined, compareOpen: false }),
  openInvestor: (prefill) =>
    set({
      dialog: "investor",
      investorPrefill: prefill,
      opportunitySlug: undefined,
      insightSlug: undefined,
      compareOpen: false,
    }),
  openOpportunity: (slug) =>
    set({ dialog: "opportunity", opportunitySlug: slug, insightSlug: undefined, compareOpen: false }),
  openInsight: (slug) =>
    set({ dialog: "insight", insightSlug: slug, opportunitySlug: undefined, compareOpen: false }),
  openGlossary: () =>
    set({ dialog: "glossary", opportunitySlug: undefined, insightSlug: undefined, compareOpen: false }),
  openAdmin: () =>
    set({ dialog: "admin", opportunitySlug: undefined, insightSlug: undefined, compareOpen: false }),
  close: () => set({ dialog: null, opportunitySlug: undefined, insightSlug: undefined }),
}));
