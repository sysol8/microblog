import type { IPost } from '../../utils/types.ts';
import Post from "../Post/Post.tsx";
import styles from "./PostsList.module.css";

interface PostsListProps {
  posts: IPost[];
  onDelete: (id: string) => void;
}

export default function PostsList({ posts, onDelete }: PostsListProps) {
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <Post key={post.id} data={post} onDelete={onDelete} />
      ))}
    </div>
  );
}
