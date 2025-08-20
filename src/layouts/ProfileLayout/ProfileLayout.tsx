import styles from "./ProfileLayout.module.css";
import type { IUser } from "../../utils/types.ts";
import LogoutButton from "../../components/auth/Logout/LogoutButton.tsx";
import LikeIcon from "../../assets/icons/like.svg?react";
import PostCompact from "../../components/Post/PostCompact/PostCompact.tsx";

interface ProfileLayoutProps {
  data: IUser;
  isMe: boolean;
}

function ProfileLayout({ data, isMe }: ProfileLayoutProps) {
  return (
    <main className={styles.content}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
        <div className={styles.user}>
          <img
            className={styles.avatar}
            src={data.avatarUrl ? data.avatarUrl : "/avatar-placeholder.png"}
            alt={`Аватар пользователя ${data.username}`}
          />
          <h2 className={styles.username}>{data.username}</h2>
        </div>
        {isMe ? <LogoutButton /> : null}
      </div>
        <section className={styles.data}>
          <article className={styles.article}>
            <h3 className={styles.articleHeading}>
              {isMe ? "Мои посты" : "Посты"}
            </h3>
            {data.posts.length > 0 ? (
              <ul className={styles.posts}>
                {data.posts.map((post, index) => (
                  <li key={post.id} className={styles.post}>
                    <span className={styles.counter}>{index + 1}</span>
                    <PostCompact data={post}></PostCompact>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Здесь пока пусто...</p>
            )}
          </article>
          <article className={styles.article}>
            <h3 className={styles.articleHeading}>Понравившиеся</h3>
            {data.likedPosts.length > 0 ? (
              <ul className={styles.posts}>
                {data.likedPosts.map((liked, index) => (
                  <li key={liked.id} className={styles.post}>
                    <span className={styles.counter}>{index + 1}</span>
                    <PostCompact data={liked}></PostCompact>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Здесь пока пусто...</p>
            )}
          </article>
          <article className={`${styles.article}`}>
            <h3 className={styles.articleHeading}>
              {isMe ? "Мои лайки" : "Лайки"}
            </h3>
            <div className={styles.likesArticle}>
              <LikeIcon className={styles.likeIcon} />
              <span className={styles.likes}>{data.likes}</span>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

export default ProfileLayout;
