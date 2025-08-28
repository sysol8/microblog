import { useEffect, useState } from "react";
import {
  createPost as apiCreatePost,
  deletePost as apiDeletePost,
  getPosts as apiGetPosts,
  toggleLike as apiToggleLike,
} from "../api/posts.ts";
import type { IPost, ICreatePost } from "../utils/types.ts";

interface UsePostsData {
  posts: IPost[];
  loading: boolean;
  error: unknown;
}

interface UsePostsActions {
  addPost: (content: ICreatePost) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  toggleLike: (id: string) => Promise<void>;
}

type TUsePosts = UsePostsData & UsePostsActions;

function usePosts(): TUsePosts {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);

  const addPost = async (content: ICreatePost) => {
    try {
      const newPost = await apiCreatePost(content);
      setPosts((prev) => [newPost, ...prev]);
    } catch (error: unknown) {
      console.error(error);
      setError(error);
    }
  };

  const deletePost = async (id: string) => {
    try {
      await apiDeletePost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleLike = async (id: string) => {
    try {
      await apiToggleLike(id);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    let isMounted: boolean = true;
    setError(null);

    (async () => {
      try {
        const data: IPost[] = await apiGetPosts();
        if (!isMounted) return;
        setPosts(data);
      } catch (error) {
        if (isMounted) setError(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);
  return { posts, loading, error, addPost, deletePost, toggleLike };
}

export default usePosts;
