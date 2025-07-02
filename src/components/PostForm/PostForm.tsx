import SendIcon from "../../assets/icons/send.svg?react";
import ClearIcon from "../../assets/icons/cancel.svg?react";
import styles from "./PostForm.module.css";
import { type FormEvent, type ChangeEvent, useState } from "react";

interface PostFormProps {
  onPostAdd: (content: string) => void;
}

export default function PostForm({ onPostAdd }: PostFormProps) {
  const [content, setContent] = useState<string>("");
  const maxLen = 500;

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onPostAdd(content);
    setContent("");
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit} noValidate={true}>
      <label className={styles.label} htmlFor="text">
        Новый пост
        <textarea
          id="text"
          className={styles.input}
          placeholder="Расскажите, о чем вы думаете..."
          value={content}
          onChange={handleInputChange}
          maxLength={maxLen}
        ></textarea>
        <span className={styles.counter}>
          {content.length}/{maxLen}
        </span>
        {content && (
          <button className={styles.clear} onClick={() => setContent("")}>
            <ClearIcon
              className={`${styles.clearIcon} ${styles.icon}`}
            ></ClearIcon>
          </button>
        )}
      </label>
      <button className={`${styles.submit} ${!content ? styles.submitDisabled : ''}`} type="submit" disabled={!content}>
        <SendIcon className={`${styles.submitIcon} ${styles.icon}`}></SendIcon>
      </button>
    </form>
  );
}
