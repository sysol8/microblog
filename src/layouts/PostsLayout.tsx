import styles from "./PostsLayout.module.css";
import { useState, useEffect } from "react";
import PostsList from "../components/PostsList/PostsList.tsx";
import PostForm from "../components/PostForm/PostForm.tsx";
import type { IPost } from "../utils/types.ts";
import { getPosts, createPost, deletePost } from "../api/posts.ts";

export default function PostsLayout() {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    async function loadPosts() {
      try {
        const _posts = await getPosts();
        setPosts(_posts);
      } catch (error) {
        console.error(error);
      }
    }

    loadPosts();
  }, []);

  const handlePostAdd = async (content: string) => {
    try {
      const newPost = await createPost(content);
      setPosts((prev) => [newPost, ...prev]);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const handlePostDelete = async (id: number) => {
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={styles.content}>
      <PostsList posts={posts} onDelete={handlePostDelete}></PostsList>
      <PostForm onPostAdd={handlePostAdd}></PostForm>
    </main>
  );
}
