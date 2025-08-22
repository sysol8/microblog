import styles from './Avatar.module.css';
import AvatarForm from "./AvatarForm/AvatarForm.tsx";

type AvatarProps = | {
  mode: "post";
  username: string;
  src: string;
  isMe?: never;
}
| {
  mode: "profile";
  username: string;
  src: string;
  isMe: boolean;
}

function Avatar({ mode, src, username, isMe }: AvatarProps) {
  const avatarMode = mode === "post" ? styles.postAvatar : styles.profileAvatar;
  const avatarUrl = src ? src : "/avatar-placeholder.png";

  return (
    <div className={`${styles.avatar} ${avatarMode}`}>
      <img className={styles.image} src={avatarUrl} alt={`Аватар пользователя ${username}`} loading="lazy" />
      {mode === "profile" && isMe && <AvatarForm />}
    </div>
  )
}

export default Avatar;