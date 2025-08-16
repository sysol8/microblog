import { useAlertStore } from '../store/alertStore.ts';
import { alertMessages } from "./alertMessages.ts";

export const alertConfig = {
  post: {
    onAddSuccess: () => useAlertStore.getState().success(alertMessages.post.addSuccess),
    onAddError: () => useAlertStore.getState().error(alertMessages.post.addError),
  },
  auth: {
    onAuthRequired: () => useAlertStore.getState().warning(alertMessages.auth.authRequired),
  },
  common: {
    onNetworkError: () => useAlertStore.getState().error(alertMessages.common.network)
  }
} as const;