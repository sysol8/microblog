import Post from '../Post/Post.tsx';
import styles from './PostsList.module.css';

export default function PostsList() {
  return (
    <div className={styles.container}>
      <Post content="Попка-шоколадка"></Post>
      <Post content="Попка-шоколадка"></Post>
      <Post content="Попка-шоколадка"></Post>
    </div>
  )
}