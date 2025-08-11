import {type ICreatePost, type IPost, type IPostContent} from "../utils/types.ts";

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

export async function createPost(content: ICreatePost): Promise<IPost> {
  const formData = new FormData();
  formData.append("text_content", content.textContent ?? "");
  for (const file of content.attachments ?? []) {
    formData.append("attachments", file);
  }
  const response = await fetch(`${config.baseURL}/api/posts`, {
    method: "POST",
    mode: "cors",
    body: formData,
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
  const response = await fetch(`${config.baseURL}/api/posts/${postId}`, {
    method: "PATCH",
    mode: "cors",
    body: formData,
  });
  return parseJson<IPost>(response);
}

export async function deletePost(id: string): Promise<void> {
  const response = await fetch(`${config.baseURL}/api/posts/${id}`, {
    method: "DELETE",
    headers: config.headers,
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}: ${response.statusText}}`);
  }
}
