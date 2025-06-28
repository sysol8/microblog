import styles from './PostForm.module.css';
import { type FormEvent, useState } from "react";

export default function PostForm() {
  const [text, setText] = useState<string>("");

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit} noValidate={true}>
      <label className={styles.label} htmlFor="text">
          Новый пост
        <textarea
          className={styles.input}
          placeholder="Текст"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={500}
        ></textarea>
      </label>
      <button className={styles.submit} type="submit">Сабмит</button>
    </form>
  );
}
