import { create } from 'zustand';
import type { IAlert } from '../utils/types.ts';

interface IAlertStore {
  alerts: IAlert[];
  addAlert(alert: IAlert): void;
  removeAlert(alert: IAlert): void;
}

export const useAlertStore = create<IAlertStore>((set) => ({
  alerts: [],

  addAlert(alert: IAlert) {
    set((state) => ({ alerts: [...state.alerts, alert] }))
  },

  removeAlert(alert: IAlert) {
    set((state) => ({ alerts: [...state.alerts, alert] }))
  }
}))