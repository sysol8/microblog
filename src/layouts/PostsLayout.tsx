import styles from "./PostsLayout.module.css";
import { useState, useEffect } from "react";
import PostsList from "../components/PostsList/PostsList.tsx";
import PostForm from "../components/PostForm/PostForm.tsx";
import type { IPost } from "../utils/types.ts";
import { getPosts, createPost } from "../api/posts.ts";

export default function PostsLayout() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPosts()
      .then((result) => setPosts(result))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const handlePostAdd = async (content: string) => {
    try {
      const newPost = await createPost(content);
      setPosts((prev) => [newPost, ...prev]);
    } catch (error: unknown) {
      setError(error.message);
    }
  };

  return (
    <main className={styles.content}>
      <PostsList posts={posts}></PostsList>
      <PostForm onPostAdd={handlePostAdd}></PostForm>
    </main>
  );
}
