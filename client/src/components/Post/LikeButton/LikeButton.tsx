import styles from "./LikeButton.module.css";
import { formatLikes } from "../../../utils/utils.ts";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/authStore.ts";
import LikeIcon from "../../../assets/icons/like.svg?react";
import type { IPost } from "../../../utils/types.ts";
import { toggleLike } from "../../../api/posts.ts";
import { withAlert } from "../../../utils/utils.ts";
import { alertConfig } from "../../../config/alertConfig.ts";

type LikeButtonProps = Pick<IPost, "id" | "likes">;

function LikeButton({ id, likes }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    setLiked(!!user && likes.includes(user.id));
  }, [user, likes]);

  const like = async () => {
    if (!user) {
      alertConfig.auth.onAuthRequired('поставить лайк');
      return;
    }

    await withAlert(
      async () => {
        await toggleLike(id);
        setLiked((prev) => !prev);
      }, {
        onSuccess: undefined,
        onError: (e: unknown) => {
          setLiked(prev => !prev);
          alertConfig.common.onNetworkError();
        }
      }
    )
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${liked ? styles.active : ""}`}
      onClick={like}
      aria-label="Нравится"
    >
      <LikeIcon className={styles.icon}></LikeIcon>
      <span className={styles.likesCounter}>{formatLikes(likes)}</span>
    </button>
  );
}

export default LikeButton;
