import {type ICreatePost, type IPost, type IPostContent} from "../utils/types.ts";
import { BASE_URL, parseJson, ensureOk } from "./base.ts";

export async function getPosts(): Promise<IPost[]> {
  const response = await fetch(`${BASE_URL}/api/posts`, {
    mode: "cors",
  });

  return parseJson<IPost[]>(response);
}

export async function getPost(postId: number): Promise<IPost> {
  const response = await fetch(`${BASE_URL}/api/posts/${postId}`, {
    mode: "cors",
  });

  return parseJson<IPost>(response);
}

export async function createPost(content: ICreatePost): Promise<IPost> {
  const formData = new FormData();
  formData.append("text_content", content.textContent ?? "");
  for (const file of content.attachments ?? []) {
    formData.append("attachments", file);
  }
  const response = await fetch(`${BASE_URL}/api/posts`, {
    method: "POST",
    mode: "cors",
    body: formData,
    credentials: 'include',
    headers: {
      'x-amz-content-sha256': ''
    }
  });
  return parseJson<IPost>(response);
}

export async function editPost(
  postId: string,
  content: IPostContent,
): Promise<IPost> {
  const formData = new FormData();
  if (content.textContent !== undefined) {
    formData.append("text_content", content.textContent);
  }
  for (const file of content.imageUrls ?? []) {
    formData.append("attachments", file);
  }
  const response = await fetch(`${BASE_URL}/api/posts/${postId}`, {
    method: "PATCH",
    mode: "cors",
    body: formData,
    credentials: 'include',
  });
  return parseJson<IPost>(response);
}

export async function deletePost(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/posts/${id}`, {
    method: "DELETE",
    mode: "cors",
    credentials: 'include',
  });

  await ensureOk(response);
}
