import styles from "./Post.module.css";
import CancelIcon from "../../assets/icons/cancel.svg?react";
import SaveIcon from "../../assets/icons/save.svg?react";
import LikeIcon from "../../assets/icons/like.svg?react";
import EditIcon from "../../assets/icons/edit.svg?react";
import DeleteIcon from "../../assets/icons/delete.svg?react";
import RepostIcon from "../../assets/icons/repost.svg?react";
import ViewsIcon from "../../assets/icons/views.svg?react";
import type { IPost } from "../../utils/types.ts";
import { formatPostDate } from "../../vendor/dayjs.ts";
import ImageModal from "../Modal/ImageModal/ImageModal.tsx";
import { modal } from "../../store/modal.ts";

export interface PostData {
  data: IPost;
}

export interface PostActions {
  onDelete: (id: string) => void;
}

type PostProps = PostData & PostActions;

function Post({ data, onDelete }: PostProps) {
  const { id, textContent, imageUrls, createdAt } = data;

  const openImageViewer = (startIndex: number) => {
    modal.open(<ImageModal urls={imageUrls} start={startIndex} />);
  };

  return (
    <article key={id} className={styles.post}>
      <header className={styles.header}>
        <a className={styles.author} href="#">
          <img
            className={styles.avatar}
            src="https://avatars.mds.yandex.net/i?id=f78644096fc4284c375b1bba35ec71d7_l-5878100-images-thumbs&n=13"
            alt={`Аватар пользователя`}
          ></img>
          <span className={styles.name}>Автор</span>
        </a>
        <time className={styles.time} dateTime={createdAt}>
          {formatPostDate(createdAt)}
        </time>
      </header>
      <>
        {textContent && <p className={styles.content}>{textContent}</p>}
        {(imageUrls && imageUrls.length > 0) && (
          <div className={styles.attachments}>
            {imageUrls.map((url, index) => (
                <img
                  key={url}
                  src={url}
                  alt="Прикрепленное изображение"
                  loading="lazy"
                  className={styles.attachedImage}
                  onClick={() => openImageViewer(index)}
                />
              ))}
          </div>
        )}
      </>
      <footer className={styles.footer}>
        <div className={`${styles.footerLeft} ${styles.footerSection}`}>
          <button
            className={`${styles.button} ${styles.likeButton}`}
            aria-label="Нравится"
          >
            <LikeIcon className={styles.icon}></LikeIcon>
            <span className={styles.likesCounter}>0</span>
          </button>
          <button className={styles.button} aria-label="Поделиться">
            <RepostIcon className={styles.icon}></RepostIcon>
          </button>
        </div>
        <div className={`${styles.footerRight} ${styles.footerSection}`}>
          <button
            type="button"
            className={styles.button}
            aria-label="Редактировать"
          >
            <EditIcon className={styles.icon}></EditIcon>
          </button>
          <button
            className={styles.button}
            onClick={() => onDelete(id)}
            aria-label="Удалить"
          >
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

export default Post;
