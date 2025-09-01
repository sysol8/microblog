import { useAlertStore } from '../store/alertStore.ts';
import { alertMessages } from "./alertMessages.ts";

export const alertConfig = {
  post: {
    onAddSuccess: () => useAlertStore.getState().success(alertMessages.post.addSuccess),
    onAddError: () => useAlertStore.getState().error(alertMessages.post.addError),
  },
  auth: {
    onAuthRequired: (action: string) => useAlertStore.getState().warning(alertMessages.auth.authRequired(action)),
  },
  common: {
    onNetworkError: () => useAlertStore.getState().error(alertMessages.common.network),
    onNotFound: () => useAlertStore.getState().error(alertMessages.common.notFound)
  }
} as const;