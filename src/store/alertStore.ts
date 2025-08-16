import { create } from "zustand";
import type { AlertType, IAlert } from "../utils/types.ts";

type TimeToFade = number | undefined;

interface IAlertStore {
  alerts: IAlert[];
  add(type: AlertType, message: string, ttf?: TimeToFade): string;
  remove(id: string): void;
  opacify(id: string): void;
  success(message: string, ttf?: TimeToFade): string;
  error(message: string, ttf?: TimeToFade): string;
  warning(message: string, ttf?: TimeToFade): string;
  info(message: string, ttf?: TimeToFade): string;
}

const generateId = () =>
  crypto?.randomUUID?.() ?? `${Date.now()}_${Math.random()}`;

export const useAlertStore = create<IAlertStore>((set, get) => ({
  alerts: [],

  add(type, message, ttf = 4000) {
    const id = generateId();
    set((state) => ({ alerts: [...state.alerts, { id, type, message, faded: false }] }));

    if (ttf > 0) {
      setTimeout(() => get().opacify(id), ttf);
    }
    return id;
  },

  remove(id) {
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    }));
  },

  opacify(id) {
    set((state) => ({
      alerts: state.alerts.map((alert) =>
        alert.id === id ? { ...alert, faded: true } : alert,
      ),
    }));
  },

  success(msg, ttf?) {
    return get().add("success", msg, ttf);
  },
  warning(msg, ttf?) {
    return get().add("warning", msg, ttf);
  },
  error(msg, ttf?) {
    return get().add("error", msg, ttf);
  },
  info(msg, ttf?) {
    return get().add("info", msg, ttf);
  },
}));
