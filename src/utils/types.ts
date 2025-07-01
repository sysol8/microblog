export interface IPost {
  id: string;
  author: string;
  createdAt: string;
  content: string;
  isLiked: boolean;
  likes: number;
}

export interface User {
  id?: string;
  name: string;
  avatarUrl: string;
  email?: string;
  password?: string;
  createdAt?: string;
}