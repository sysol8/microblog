import styles from "./ProfileLayout.module.css";
import type { IUser } from "../../utils/types.ts";
import LogoutButton from "../../components/auth/Logout/LogoutButton.tsx";
import LikeIcon from '../../assets/icons/like.svg?react';

interface ProfileLayoutProps {
  data: IUser;
  isMe: boolean;
}

function ProfileLayout({ data, isMe }: ProfileLayoutProps) {
  return (
    <main className={styles.content}>
      <div className={styles.wrapper}>
        <div className={styles.user}>
          <img
            className={styles.avatar}
            src={data.avatarUrl ? data.avatarUrl : "/avatar-placeholder.png"}
            alt={`Аватар пользователя ${data.username}`}
          />
          <h2 className={styles.username}>{data.username}</h2>
        </div>
        {isMe ? <LogoutButton /> : null}
        <section className={styles.data}>
          <article className={styles.article}>
            <h3 className={styles.articleHeading}>{isMe ? 'Мои посты' : 'Посты'}</h3>
            <ul className={styles.posts}></ul>
          </article>
          <article className={styles.article}>
            <h3 className={styles.articleHeading}>Понравившиеся</h3>
            <ul className={styles.posts}></ul>
          </article>
          <article className={styles.article}>
            <h3 className={styles.articleHeading}>{isMe ? 'Мои лайки' : 'Лайки'}</h3>
            <LikeIcon className={styles.likeIcon}/>
            <span className={styles.likes}>{data.likes}</span>
          </article>
        </section>
      </div>
    </main>
  );
}

export default ProfileLayout;
