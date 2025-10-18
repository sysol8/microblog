import { type StateCreator } from "zustand";
import type { AlertType, IAlert } from "../../utils/types.ts";
import { generateId } from "../../utils/utils.ts";
import type { Store } from "../store.ts";

type TimeToFade = number;

type AlertState = {
  items: IAlert[];
};

type AlertActions = {
  add(type: AlertType, message: string, ttf?: TimeToFade): string;
  remove(id: string): void;
  opacify(id: string): void;
  success(message: string, ttf?: TimeToFade): string;
  error(message: string, ttf?: TimeToFade): string;
  warning(message: string, ttf?: TimeToFade): string;
  info(message: string, ttf?: TimeToFade): string;
};

export type AlertSlice = {
  alerts: AlertState & AlertActions;
};

export const createAlertSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  AlertSlice
> = (set, get) => ({
  alerts: {
    items: [],

    add(type, message, ttf = 4000) {
      const id = generateId();
      set((state) => {
        state.alerts.items.push({ id: id, type, message, faded: false });
      });

      if (ttf > 0) {
        setTimeout(() => get().alerts.opacify(id), ttf);
      }
      return id;
    },

    remove(id) {
      set((state) => {
        state.alerts.items = state.alerts.items.filter((item) => item.id !== id);
      });
    },

    opacify(id) {
      set((state) => {
        const alert = state.alerts.items.find((item) => item.id === id);
        if (alert) alert.faded = true;
      })
    },

    success(msg, ttf?) {
      return get().alerts.add("success", msg, ttf);
    },
    warning(msg, ttf?) {
      return get().alerts.add("warning", msg, ttf);
    },
    error(msg, ttf?) {
      return get().alerts.add("error", msg, ttf);
    },
    info(msg, ttf?) {
      return get().alerts.add("info", msg, ttf);
    },
  },
});
