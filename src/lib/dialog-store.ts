"use client";

import { create } from "zustand";

export type DialogKind = "investor" | "quiz" | "contact" | "opportunity" | "insight" | null;

interface DialogState {
  dialog: DialogKind;
  investorPrefill?: "investor" | "founder";
  /** slug of the opportunity opened in the detail dialog */
  opportunitySlug?: string;
  /** slug of the insight article opened in the reader dialog (R4-3) */
  insightSlug?: string;
  /**
   * R5-CMP: compare shortlist (opportunity slugs, max 3). Lives in the store
   * — not section state — so the language cross-fade (which remounts every
   * section via key={lang}) doesn't discard the user's picks.
   */
  compareSlugs: string[];
  setCompareSlugs: (slugs: string[]) => void;
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
  close: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  dialog: null,
  investorPrefill: undefined,
  opportunitySlug: undefined,
  insightSlug: undefined,
  compareSlugs: [],
  setCompareSlugs: (slugs) => set({ compareSlugs: slugs }),
  sectorFilter: "all",
  setSectorFilter: (sector) => set({ sectorFilter: sector }),
  open: (kind) => set({ dialog: kind, opportunitySlug: undefined, insightSlug: undefined }),
  openInvestor: (prefill) =>
    set({ dialog: "investor", investorPrefill: prefill, opportunitySlug: undefined, insightSlug: undefined }),
  openOpportunity: (slug) => set({ dialog: "opportunity", opportunitySlug: slug, insightSlug: undefined }),
  openInsight: (slug) => set({ dialog: "insight", insightSlug: slug, opportunitySlug: undefined }),
  close: () => set({ dialog: null, opportunitySlug: undefined, insightSlug: undefined }),
}));
