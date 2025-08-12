// утилити-тип, который делает, чтобы из набора ключей обязательно был указан хотя бы один
export type RequireAtLeastOne<T, K extends keyof T = keyof T> = Omit<T, K> & {
  [P in K]-?: Required<Pick<T, P>> & Partial<Omit<Pick<T, K>, P>>
}

export interface ICreatePost {
  textContent: string;
  attachments: File[];
}

export type IEditPost = Partial<ICreatePost>

export type IPostContent = Pick<IPost, "textContent" | "imageUrls">

export interface IPost {
  id: string;
  author?: IPostAuthor;
  textContent: string;
  imageUrls: string[];
  createdAt: string;
  isLiked?: boolean;
  likes?: number;
}

interface IPostAuthor {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface IUser {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  createdAt: string;
  posts: string[];
  liked: string[];
  likes: number
}
