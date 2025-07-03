import { type IPost } from "../utils/types.ts";

const config = {
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
};

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
  return data as T;
}

export async function getPosts(): Promise<IPost[]> {
  const response = await fetch(`${config.baseURL}/api/posts`, {
    method: "GET",
    headers: config.headers,
    mode: "cors",
  });

  return parseJson<IPost[]>(response);
}

export async function getPost(postId: number): Promise<IPost> {
  const response = await fetch(`${config.baseURL}/api/posts/${postId}`, {
    method: "GET",
    headers: config.headers,
    mode: "cors",
  });

  return parseJson<IPost>(response);
}

export async function createPost(content: string): Promise<IPost> {
  const response = await fetch(`${config.baseURL}/api/posts`, {
    method: "POST",
    headers: config.headers,
    mode: "cors",
    body: JSON.stringify({ content }),
  });
  return parseJson<IPost>(response);
}

export async function editPost(
  postId: number,
  content: string,
): Promise<IPost> {
  const response = await fetch(`${config.baseURL}/api/posts/${postId}`, {
    method: "PATCH",
    headers: config.headers,
    mode: "cors",
    body: JSON.stringify({ content }),
  });
  return parseJson<IPost>(response);
}

export async function deletePost(postId: number): Promise<void> {
  const response = await fetch(`${config.baseURL}/api/posts/${postId}`, {
    method: "DELETE",
    headers: config.headers,
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}: ${response.statusText}}`);
  }
}
