import { create } from 'zustand';
import { type ReactNode } from 'react';

type ModalState = {
  isOpen: boolean;
  content: ReactNode | null;
  open: (node: ReactNode) => void;
  close: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  content: null,
  open: (node) => set({ isOpen: true, content: node }),
  close: () => set({ isOpen: false, content: null }),
}));

export const modal = {
  open: (node: ReactNode) => useModalStore.getState().open(node),
  close: () => useModalStore.getState().close(),
}