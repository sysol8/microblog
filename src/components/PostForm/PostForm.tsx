import SendIcon from "../../assets/icons/send.svg?react";
import ClearIcon from "../../assets/icons/clear.svg?react";
import styles from "./PostForm.module.css";
import { type FormEvent, type ChangeEvent } from "react";
import { useState } from "react";

export default function PostForm() {
  const [text, setText] = useState<string>("");
  const maxLen = 500;

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setText("");
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit} noValidate={true}>
      <label className={styles.label} htmlFor="text">
        Новый пост
        <textarea
          id="text"
          className={styles.input}
          placeholder="Расскажите, о чем вы думаете..."
          value={text}
          onChange={handleInputChange}
          maxLength={maxLen}
        ></textarea>
        <span className={styles.counter}>
          {text.length}/{maxLen}
        </span>
        {text && (
          <button className={styles.clear} onClick={() => setText("")}>
            <ClearIcon
              className={`${styles.clearIcon} ${styles.icon}`}
            ></ClearIcon>
          </button>
        )}
      </label>
      <button className={styles.submit} type="submit">
        <SendIcon className={`${styles.submitIcon} ${styles.icon}`}></SendIcon>
      </button>
    </form>
  );
}
