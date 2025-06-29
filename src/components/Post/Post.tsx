import styles from "./Post.module.css";

export default function Post({ content } : { content: string }) {

  return (
    <article className={styles.post}>
      <header className={styles.header}>
        <address className={styles.author}></address>
        <time className={styles.time}></time>
      </header>
      <p className={styles.text}>{content}</p>
      <footer className={styles.buttons}>
        <button className={styles.like}></button>
        <button className={styles.edit}></button>
        <button className={styles.delete}></button>
      </footer>
    </article>
  );
}
