import { type StateCreator } from "zustand";
import { type ReactNode } from "react";
import type { Store } from "../store.ts";

type ModalState = {
  isOpen: boolean;
  content: ReactNode | null;
};

type ModalActions = {
  open: (node: ReactNode) => void;
  close: () => void;
};

export type ModalSlice = {
  modal: ModalState & ModalActions;
};

export const createModalSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  ModalSlice
> = (set) => ({
  modal: {
    isOpen: false,
    content: null,
    open(node) {
      set((state) => {
        state.modal.isOpen = true;
        state.modal.content = node;
      });
    },
    close() {
      set((state) => {
        state.modal.isOpen = false;
        state.modal.content = null;
      });
    },
  },
});
