import { type StateCreator } from "zustand";
import * as api from "../../api/users";
import type { IUser, AuthPayload } from "../../utils/types";
import type { Store } from "../store.ts";

type AuthState = {
  user: IUser | null | undefined;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
};

type AuthActions = {
  getUser(): Promise<void>;
  login(payload: AuthPayload): Promise<void>;
  register(payload: AuthPayload): Promise<void>;
  logout(): Promise<void>;
};

export type AuthSlice = {
  auth: AuthState & AuthActions;
};

export const createAuthSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  AuthSlice
> = (set) => ({
  auth: {
    user: undefined,
    loading: false,
    error: null,
    isAuth: false,

    async getUser() {
      set((state) => {
        state.auth.loading = true;
        state.auth.error = null;
      });

      try {
        const me = await api.getMe();
        set((state) => {
          state.auth.user = me ?? null;
          state.auth.isAuth = true;
        });
      } catch (error: unknown) {
        set((state) => {
          state.auth.user = null;
          state.auth.isAuth = false;
          state.auth.error =
            error instanceof Error ? error.message : "Неизвестная ошибка";
        });
      } finally {
        set((state) => {
          state.auth.loading = false;
        });
      }
    },

    // TODO: поправить контракт, чтобы метод логина возвращал что-то сам по себе, и в одном методе не приходилось тянуть еще и getUser.
    async login(payload) {
      set((state) => {
        state.auth.loading = true;
        state.auth.error = null;
      });

      try {
        const { accessToken } = await api.login(payload);
        localStorage.setItem('accessToken', accessToken)
        set((state) => {
          state.auth.loading = false;
        });
      } catch (error: unknown) {
        set((state) => {
          state.auth.error =
            error instanceof Error ? error.message : "Неизвестная ошибка";
        });
      } finally {
        set((state) => {
          state.auth.loading = false;
        });
      }
    },

    // TODO: поправить контракт, чтобы метод регистрации возвращал что-то сам по себе, и в одном методе не приходилось тянуть еще и getUser.
    async register(payload) {
      set((state) => {
        state.auth.loading = true;
        state.auth.error = null;
      });

      try {
        const me = await api.register(payload);
        set((state) => {
          state.auth.user = me ?? null;
          state.auth.loading = false;
        });
      } catch (error: unknown) {
        set((state) => {
          state.auth.user = null;
          state.auth.error =
            error instanceof Error ? error.message : "Неизвестная ошибка";
        });
      } finally {
        set((state) => {
          state.auth.loading = false;
        });
      }
    },

    // TODO: добавить очистку куки/localStorage
    async logout() {
      set((state) => {
        state.auth.loading = true;
        state.auth.error = null;
      });
      try {
        await api.logout();
      } catch (error) {
        // здесь ловим ошибку и не записываем в стейт/не отображаем в UI, т. к. логаут произойдет в любом случае.
        if (error instanceof Error) {
          console.warn(error.message);
        } else {
          console.warn("Неизвестная ошибка");
        }
      } finally {
        set((state) => {
          state.auth.user = null;
          state.auth.loading = false;
        });
      }
    },
  },
});
