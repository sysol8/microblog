import type { IUser, AuthPayload } from "../utils/types.ts";
import { ensureOk, BASE_URL, parseJson } from "./base.ts";

async function getUser(username: string): Promise<IUser> {
  const response = await fetch(`${BASE_URL}/api/users/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return parseJson<IUser>(response);
}

async function getMe(): Promise<IUser | null> {
  const response = await fetch(`${BASE_URL}/api/users/me`, {
    method: "GET",
    credentials: "include",
  });
  if (response.status === 401) return null;
  return parseJson<IUser>(response);
}

async function register(payload: AuthPayload): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/register`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  await ensureOk(response);
}

async function login(payload: AuthPayload): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  await ensureOk(response);
}

async function logout(): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/logout`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
  });
  await ensureOk(response);
}

async function editAvatar(avatar: File): Promise<{ id: string; avatarUrl: string }> {
  const formData = new FormData();
  formData.append("avatar", avatar);
  const response = await fetch(`${BASE_URL}/api/users/me/edit`, {
    method: "PATCH",
    body: formData,
    credentials: "include",
  });
  return parseJson(response);
}

export { getUser, register, login, logout, getMe, editAvatar };
