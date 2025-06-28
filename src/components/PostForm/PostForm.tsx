import styles from "./PostForm.module.css";
import { type FormEvent, type ChangeEvent } from 'react';
import { useState, useRef, useEffect } from "react";

export default function PostForm() {
  const [text, setText] = useState<string>("");
  const maxLen = 500;

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit} noValidate={true}>
      <label className={styles.label} htmlFor="text">
        Новый пост
        <textarea
          id="text"

          className={styles.input}
          placeholder="Текст"
          value={text}
          onChange={handleInputChange}
          maxLength={maxLen}
        ></textarea>
        <span className={styles.counter}>
          {text.length}/{maxLen}
        </span>
      </label>
      <button className={styles.submit} type="submit">
        Сабмит
      </button>
    </form>
  );
}
