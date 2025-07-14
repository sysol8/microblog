import SendIcon from "../../assets/icons/send.svg?react";
import ClearIcon from "../../assets/icons/cancel.svg?react";
import AttachIcon from "../../assets/icons/attach.svg?react";
import styles from "./PostForm.module.css";
import { type FormEvent, type ChangeEvent, useState, useRef } from "react";

interface PostFormProps {
  onPostAdd: (content: string, attachments?: File[]) => void;
}

export const maxLen: number = 500;

export default function PostForm({ onPostAdd }: PostFormProps) {
  const [content, setContent] = useState<string>("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setAttachedFile(file);
  }

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
          className={`${styles.input} custom-scrollbar`}
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
      <div className={styles.buttons}>
        <label className={styles.fileLabel} htmlFor="attachment">
          {attachedFile && (
            <span className={styles.fileName}>{attachedFile.name}</span>
          )}
          <AttachIcon className={`${styles.attachIcon} ${styles.icon}`}></AttachIcon>
          <input className="visually-hidden" id="attachment" type="file" accept="image/png, image/jpeg, image/webp, image/gif" ref={fileInputRef} onChange={handleFileChange} />
        </label>
        <button className={`${styles.submit} ${content ? styles.submitEnabled : ''}`} type="submit" disabled={!content}>
          <SendIcon className={`${styles.submitIcon} ${styles.icon}`}></SendIcon>
        </button>
      </div>
    </form>
  );
}
