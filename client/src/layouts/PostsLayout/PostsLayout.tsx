import styles from "./PostsLayout.module.css";
import PostsList from "../../components/PostsList/PostsList.tsx";
import PostForm from "../../components/PostForm/PostForm.tsx";
import usePosts from "../../hooks/usePosts.ts";
import clsx from 'clsx'

export default function PostsLayout() {
  const { posts, deletePost, addPost } = usePosts();

  return (
    <div className={styles.wrapper}>
      <main className={styles.content}>
        <PostsList posts={posts} onDelete={deletePost}></PostsList>
        <PostForm onPostAdd={addPost}></PostForm>
      </main>
      <aside className={clsx(styles.aside, styles.toasterRoot)} id="toaster-root"></aside>
    </div>
  );
}
