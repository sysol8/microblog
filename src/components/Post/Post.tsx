import styles from "./Post.module.css";

export default function Post({ content }: { content: string }) {
  return (
    <article className={styles.post}>
      <header className={styles.header}>
        <a className={styles.author}>
          <img
            className={styles.avatar}
            src="https://avatars.mds.yandex.net/i?id=f78644096fc4284c375b1bba35ec71d7_l-5878100-images-thumbs&n=13"
            alt="avatar"
          ></img>
          <span className={styles.name}>Автор</span>
        </a>
        <time className={styles.time}>24 декабря 17:00</time>
      </header>
      <p className={styles.content}>{content}</p>
      <footer className={styles.buttons}>
        <button className={styles.like}></button>
        <button className={styles.edit}></button>
        <button className={styles.delete}></button>
      </footer>
    </article>
  );
}
