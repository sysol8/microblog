import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { type AlertSlice, createAlertSlice } from "./slices/alertSlice.ts";
import { type AuthSlice, createAuthSlice } from "./slices/authSlice.ts";
import { type ModalSlice, createModalSlice } from "./slices/modalSlice.ts";

export type Store = AlertSlice & AuthSlice & ModalSlice;

// TODO: подключить immer в слайсах;
//  описать в документации решение с объединением слайсов под одним ключом (auth, modal, alert и т. д.)
export const useBoundStore = create<Store>()(
  persist(
    immer((...a) => ({
      ...createAlertSlice(...a),
      ...createAuthSlice(...a),
      ...createModalSlice(...a),
    })),
    {
      name: "bound-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        auth: { user: state.auth.user },
      }),
    },
  ),
);
