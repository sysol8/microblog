import SendIcon from "../../assets/icons/send.svg?react";
import ClearIcon from "../../assets/icons/cancel.svg?react";
import styles from "./PostForm.module.css";
import { type FormEvent, type ChangeEvent, useState } from "react";

interface PostFormProps {
  onPostAdd: (content: string) => void;
}

export default function PostForm({ onPostAdd }: PostFormProps) {
  const [text, setText] = useState<string>("");
  const maxLen = 500;

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onPostAdd(text);
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
      <button className={`${styles.submit} ${!text ? styles.submitDisabled : ''}`} type="submit" disabled={!text}>
        <SendIcon className={`${styles.submitIcon} ${styles.icon}`}></SendIcon>
      </button>
    </form>
  );
}
