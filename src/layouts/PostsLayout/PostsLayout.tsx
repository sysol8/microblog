import styles from "./PostsLayout.module.css";
import PostsList from "../../components/PostsList/PostsList.tsx";
import PostForm from "../../components/PostForm/PostForm.tsx";
import usePosts from "../../hooks/usePosts.ts";

export default function PostsLayout() {
  const { posts, deletePost, addPost } = usePosts();

  return (
    <main className={styles.content} id="toaster-root">
      <PostsList posts={posts} onDelete={deletePost}></PostsList>
      <PostForm onPostAdd={addPost}></PostForm>
    </main>
  );
}
