import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as api from "../api/users";
import type { IUser } from "../utils/types";
import type { AuthPayload } from '../utils/types.ts';

type AuthState = {
  user: IUser | null | undefined;
  loading: boolean;
  error: string | null;
};

type AuthActions = {
  checkAuth(): Promise<void>;
  login(payload: AuthPayload): Promise<void>;
  register(payload: AuthPayload): Promise<void>;
  logout(): Promise<void>;
};

type TUseAuth = AuthState & AuthActions;

export const useAuthStore = create<TUseAuth>()(
  persist(
    (set) => ({
      user: undefined,
      loading: false,
      error: null,

      async checkAuth() {
        set({ loading: true, error: null });
        try {
          const me = await api.getMe();
          set({ user: me ?? null });
        } catch {
          set({ user: null });
        } finally {
          set({ loading: false });
        }
      },

      async login(payload) {
        set({ loading: true, error: null });
        try {
          await api.login(payload);
          const me = await api.getMe();
          if (!me) throw new Error("Unauthorized");
          set({ user: me, loading: false });
        } catch (e) {
          const msg = e instanceof Error ? e.message : "Login Failed";
          set({ user: null, loading: false, error: msg });
          throw e;
        }
      },

      async register(payload) {
        set({ loading: true, error: null });
        try {
          await api.register(payload);
          const me = await api.getMe();
          set({ user: me ?? null, loading: false });
        } catch (e) {
          const msg = e instanceof Error ? e.message : "Registration Failed";
          set({ user: null, loading: false, error: msg });
          throw e;
        }
      },

      async logout() {
        set({ loading: true, error: null });
        try {
          await api.logout();
        } finally {
          set({ user: null, loading: false });
        }
      },
    }),
    {
      name: "auth",
      partialize: () => ({}),
    }
  )
);

export function isAuthenticated(): boolean {
  const user = useAuthStore.getState().user;
  return !!user;
}

export function isAuthKnown(): boolean {
  return useAuthStore.getState().user !== undefined;
}