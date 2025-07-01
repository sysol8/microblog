import type { User } from "../../utils/types.ts";
import styles from "./Post.module.css";
import CancelIcon from "../../assets/icons/cancel.svg?react";
import SaveIcon from "../../assets/icons/save.svg?react";
import LikeIcon from "../../assets/icons/like.svg?react";
import EditIcon from "../../assets/icons/edit.svg?react";
import DeleteIcon from "../../assets/icons/delete.svg?react";
import RepostIcon from "../../assets/icons/repost.svg?react";
import ViewsIcon from "../../assets/icons/views.svg?react";
import { useState, type FormEvent, type ChangeEvent } from "react";

interface PostProps {
  author?: User;
  content: string;
  createdAt?: string;
  isLiked?: boolean;
  likesCount?: number;
}

function EditPostForm({
  content,
  onCancel,
  onSave,
}: {
  content: string;
  onCancel: () => void;
  onSave: (newContent: string) => void;
}) {
  const [value, setValue] = useState(content);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(value.trim());
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="edit" className={styles.label}>
        <textarea
          name="edit"
          id="edit"
          className={styles.input}
          rows={4}
          value={value}
          onChange={handleChange}
        ></textarea>
      </label>
      <div className={styles.buttons}>
        <button className={styles.button} type="button" onClick={onCancel}>
          <CancelIcon className={styles.icon} />
        </button>
        <button className={styles.button} type="submit">
          <SaveIcon className={styles.icon} />
        </button>
      </div>
    </form>
  );
}

export default function Post({ createdAt }: PostProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentContent, setCurrentContent] = useState<string>("");
  const iso = createdAt ?? "";
  const [date, timeWithMs = ""] = iso.split("T");
  const time = timeWithMs.split(".")[0];

  const startEdit = () => {
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const saveEdit = (newContent: string) => {
    setCurrentContent(newContent);
    setIsEditing(false);
  };

  return (
    <article className={styles.post}>
      <header className={styles.header}>
        <a className={styles.author} href="#">
          <img
            className={styles.avatar}
            src="https://avatars.mds.yandex.net/i?id=f78644096fc4284c375b1bba35ec71d7_l-5878100-images-thumbs&n=13"
            alt="avatar"
          ></img>
          <span className={styles.name}>Автор</span>
        </a>
        <time className={styles.time} dateTime={createdAt}>
          <span>{date}</span>
          <span>{time}</span>
        </time>
      </header>
      {isEditing ? (
        <EditPostForm
          content={currentContent}
          onCancel={cancelEdit}
          onSave={saveEdit}
        />
      ) : (
        <p className={styles.content}>{currentContent}</p>
      )}
      <footer className={styles.footer}>
        <div className={`${styles.footerLeft} ${styles.footerSection}`}>
          <button className={styles.button} aria-label="Нравится">
            <LikeIcon className={styles.icon}></LikeIcon>
          </button>
          <button className={styles.button} aria-label="Поделиться">
            <RepostIcon className={styles.icon}></RepostIcon>
          </button>
        </div>
        <div className={`${styles.footerRight} ${styles.footerSection}`}>
          <button
            className={styles.button}
            onClick={startEdit}
            aria-label="Редактировать"
          >
            <EditIcon className={styles.icon}></EditIcon>
          </button>
          <button className={styles.button} aria-label="Удалить">
            <DeleteIcon className={styles.icon}></DeleteIcon>
          </button>
          <div className={styles.views} aria-label="Просмотры">
            <ViewsIcon className={styles.icon} aria-label="Иконка"></ViewsIcon>
            <span className={styles.count} aria-label="Количество">
              123
            </span>
          </div>
        </div>
      </footer>
    </article>
  );
}
