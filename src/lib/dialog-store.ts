"use client";

import { create } from "zustand";

export type DialogKind = "investor" | "quiz" | "contact" | null;

interface DialogState {
  dialog: DialogKind;
  investorPrefill?: "investor" | "founder";
  open: (kind: Exclude<DialogKind, null>) => void;
  openInvestor: (prefill?: "investor" | "founder") => void;
  close: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  dialog: null,
  investorPrefill: undefined,
  open: (kind) => set({ dialog: kind }),
  openInvestor: (prefill) => set({ dialog: "investor", investorPrefill: prefill }),
  close: () => set({ dialog: null }),
}));
