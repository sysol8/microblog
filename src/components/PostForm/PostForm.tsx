import SendIcon from "../../assets/icons/send.svg?react";
import ClearIcon from "../../assets/icons/cancel.svg?react";
import AttachIcon from "../../assets/icons/attach.svg?react";
import styles from "./PostForm.module.css";
import { type FormEvent, type ChangeEvent, useState, useRef } from "react";
import type { ICreatePost } from "../../utils/types.ts";
import ImagePreview from "../ImagePreview/ImagePreview.tsx";

interface PostFormProps {
  onPostAdd: (content: ICreatePost) => Promise<void>;
}

export const maxLen = 500;
export const MAX_ATTACHMENTS = 5;

export default function PostForm({ onPostAdd }: PostFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [content, setContent] = useState<ICreatePost>({
    textContent: "",
    attachments: [],
  });

  const fileKey = (f: File) => `${f.name}_${f.size}_${f.lastModified}`;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files ?? []);
    if (!newFiles.length) return;

    setContent((prev) => {
      const all = [...prev.attachments, ...newFiles];
      const map = new Map<string, File>();
      for (const f of all) map.set(fileKey(f), f);
      return { ...prev, attachments: Array.from(map.values()) };
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileRemove = (idx: number) => {
    setContent((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== idx),
    }));
  };

  const handleTextContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent((prev) => ({ ...prev, textContent: e.target.value }));
  };

  const handleTextContentClear = () => {
    setContent((prev) => ({ ...prev, textContent: "" }));
  };

  const isFormValid = () =>
    !!(content.textContent.trim() || content.attachments.length > 0);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    await onPostAdd(content);
    setContent({ textContent: "", attachments: [] });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
      <label className={styles.label} htmlFor="text">
        Новый пост
        <textarea
          id="text"
          className={`${styles.input} custom-scrollbar`}
          placeholder="Расскажите, о чем вы думаете..."
          value={content.textContent}
          onChange={handleTextContentChange}
          maxLength={maxLen}
        />
        <span className={styles.counter}>
          {content.textContent.length}/{maxLen}
        </span>
        {content.textContent && (
          <button
            type="button"
            className={styles.clear}
            onClick={handleTextContentClear}
            aria-label="Очистить текст"
          >
            <ClearIcon className={`${styles.clearIcon} ${styles.icon}`} />
          </button>
        )}
      </label>
      <div className={styles.files}>
        {content.attachments.map((file, i) => (
          <ImagePreview
            key={`${file.name}_${file.size}_${file.lastModified}`}
            file={file}
            containerClassName={styles.attachedImageContainer}
            imageClassName={styles.attachedImage}
            fallbackClassName={styles.fileName}
            alt="Превью изображения"
          >
            <button
              type="button"
              className={styles.remove}
              onClick={(ev) => {
                ev.preventDefault();
                handleFileRemove(i);
              }}
              aria-label={`Удалить файл ${file.name}`}
            >
              <ClearIcon className={`${styles.clearIcon} ${styles.icon}`} />
            </button>
          </ImagePreview>
        ))}
      </div>

      <div className={styles.buttons}>
        <div className={styles.file}>
          <label className={styles.fileLabel} htmlFor="attachments">
            <AttachIcon className={`${styles.attachIcon} ${styles.icon}`} />
            <input
              id="attachments"
              className="visually-hidden"
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/png, image/jpeg, image/webp, image/gif"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <button
          className={`${styles.submit} ${isFormValid() ? styles.submitEnabled : ""}`}
          type="submit"
          disabled={!isFormValid()}
        >
          <SendIcon className={`${styles.submitIcon} ${styles.icon}`} />
        </button>
      </div>
    </form>
  );
}
