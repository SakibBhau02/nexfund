"use client";

import { create } from "zustand";

export type DialogKind = "investor" | "quiz" | "contact" | "opportunity" | null;

interface DialogState {
  dialog: DialogKind;
  investorPrefill?: "investor" | "founder";
  /** slug of the opportunity opened in the detail dialog */
  opportunitySlug?: string;
  open: (kind: Exclude<DialogKind, null>) => void;
  openInvestor: (prefill?: "investor" | "founder") => void;
  openOpportunity: (slug: string) => void;
  close: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  dialog: null,
  investorPrefill: undefined,
  opportunitySlug: undefined,
  open: (kind) => set({ dialog: kind, opportunitySlug: undefined }),
  openInvestor: (prefill) => set({ dialog: "investor", investorPrefill: prefill }),
  openOpportunity: (slug) => set({ dialog: "opportunity", opportunitySlug: slug }),
  close: () => set({ dialog: null, opportunitySlug: undefined }),
}));
