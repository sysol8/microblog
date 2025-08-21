import styles from "./ProfileLayout.module.css";
import LikeIcon from "../../assets/icons/like.svg?react";
import type { IUser } from "../../utils/types.ts";
import { useEffect, useState, useMemo } from 'react';
import LogoutButton from "../../components/auth/Logout/LogoutButton.tsx";
import PostCompact from "../../components/Post/PostCompact/PostCompact.tsx";
import { getUser } from "../../api/users.ts";
import { useParams } from "react-router";

interface ProfileLayoutProps {
  data: IUser;
  isMe: boolean;
}

function ProfileLayout({ data, isMe }: ProfileLayoutProps) {
  const { username } = useParams();

  // TEMP: временное решение (и временно не работающее). По текущей задумке
  //  компонент фетчит данные пользователя, если флаг isMe установлен на false.
  //  В противном случае берутся данные авторизованного пользователя из глобального стейта.
  /*
  const [remote, setRemote] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(!isMe);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (isMe) return;

    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(null);
        if (!username) {
          setError("Пользователь не указан");
          return;
        }
        const res = await getUser(username);
        setRemote(res);
      } catch (e) {
        if ((e instanceof Error).name !== "AbortError") {
          setError(e instanceof Error ? e.message : "Ошибка загрузки профиля");
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [isMe, username]);

  const profile = useMemo<IUser | null>(() => {
    return isMe ? (data ?? null) : remote;
  }, [isMe, data, remote]);

  if (!isMe && loading) return <p>Загрузка…</p>;
  if (!profile) return <p>{error ?? "Пользователь не найден"}</p>;
  */

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
