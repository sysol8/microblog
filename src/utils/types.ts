export interface IPost {
  id: number;
  author?: IUser;
  content: string;
  createdAt?: string;
  isLiked?: boolean;
  likes?: number;
}

export interface IUser {
  id?: string;
  name: string;
  avatarUrl: string;
  email?: string;
  password?: string;
  createdAt?: string;
}