import type { IPost } from '../../utils/types.ts';
import Post from "../Post/Post.tsx";
import styles from "./PostsList.module.css";

interface PostsListProps {
  posts: IPost[];
}

export default function PostsList({ posts }: PostsListProps) {
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <Post key={post.id} content={post.content} />
      ))}
    </div>
  );
}
