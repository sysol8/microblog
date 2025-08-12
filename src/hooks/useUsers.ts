import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  getUser as apiGetUser,
  type AuthPayload,
} from "../api/users";
import type { IUser } from "../utils/types";
import { useState } from "react";

interface UseUsersData {
  user: IUser | null;
  loading: boolean;
  error: unknown;
}

interface UseUsersActions {
  register: (payload: AuthPayload) => Promise<void>;
  login: (payload: AuthPayload) => Promise<void>;
  logout: () => Promise<void>;
  getUser: (id: string) => Promise<IUser>;
}

type TUseUsers = UseUsersData & UseUsersActions;

function useUsers(): TUseUsers {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const register = async (payload: AuthPayload) => {
    try {
      setLoading(true);
      setError(null);
      await apiRegister(payload);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload: AuthPayload) => {
    try {
      setLoading(true);
      setError(null);
      await apiLogin(payload);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await apiLogout();
      setUser(null);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUser = async (id: string): Promise<IUser> => {
    try {
      setLoading(true);
      setError(null);
      const fetchedUser = await apiGetUser(id);
      setUser(fetchedUser);
      return fetchedUser;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, register, login, logout, getUser };
}

export default useUsers;
