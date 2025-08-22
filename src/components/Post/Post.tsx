import styles from "./Post.module.css";
// @ts-expect-error / temporarily unused icon
import CancelIcon from "../../assets/icons/cancel.svg?react";
// @ts-expect-error / temporarily unused icon
import SaveIcon from "../../assets/icons/save.svg?react";
import EditIcon from "../../assets/icons/edit.svg?react";
import DeleteIcon from "../../assets/icons/delete.svg?react";
import type { IPost } from "../../utils/types.ts";
import { formatPostDate } from "../../vendor/dayjs.ts";
import ImageModal from "../Modal/ImageModal/ImageModal.tsx";
import { modalStore } from "../../store/modalStore.ts";
import { Link } from "react-router";
import LikeButton from "./LikeButton/LikeButton.tsx";
import { useProtectedAction } from "../../hooks/useProtectedAction.ts";
import Avatar from "../User/Avatar/Avatar.tsx";

export interface PostData {
  data: IPost;
}

export interface PostActions {
  onDelete?: (id: string) => void;
}

type PostProps = PostData & PostActions;

function Post({ data, onDelete }: PostProps) {
  const { id, textContent, imageUrls, createdAt, author, likes } = data;
  const isAllowed = useProtectedAction();
  const isAllowedToChange = isAllowed.post.edit(author.id) && isAllowed.post.delete(author.id);

  const openImageViewer = (startIndex: number) => {
    modalStore.open(<ImageModal urls={imageUrls} start={startIndex} />);
  };

  return (
    <article key={id} className={styles.post}>
      <header className={styles.header}>
        <Link className={styles.author} to={`/users/${author.username}`}>
          <Avatar src={author.avatarUrl} username={author.username} mode={"post"}/>
          <span className={styles.name}>{author.username}</span>
        </Link>
        <time className={styles.time} dateTime={createdAt}>
          {formatPostDate(createdAt)}
        </time>
      </header>
      <>
        {textContent && <p className={styles.content}>{textContent}</p>}
        {imageUrls && imageUrls.length > 0 && (
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
          <LikeButton id={id} likes={likes}/>
        </div>
        {isAllowedToChange && (
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
              onClick={() => onDelete ? onDelete(id) : null}
              aria-label="Удалить"
            >
              <DeleteIcon className={styles.icon}></DeleteIcon>
            </button>
          </div>
        )}
      </footer>
    </article>
  );
}

export default Post;
