import styles from "./ProfileLayout.module.css";
import LikeIcon from "../../assets/icons/like.svg?react";
import type { IUser } from "../../utils/types.ts";
import { useCallback, useEffect, useState } from "react";
import LogoutButton from "../../components/auth/Logout/LogoutButton.tsx";
import PostCompact from "../../components/Post/PostCompact/PostCompact.tsx";
import { getUser } from "../../api/users.ts";
import { useAuthStore } from "../../store/authStore.ts";
import { useParams, useNavigate } from "react-router";
import Loader from "../../components/Loader/Loader.tsx";
import Avatar from "../../components/User/Avatar/Avatar.tsx";

interface ProfileLayoutProps {
  isMe: boolean;
}

function ProfileLayout({ isMe }: ProfileLayoutProps) {
  const [data, setData] = useState<IUser | null>(null);
  const user = useAuthStore((state) => state.user);
  const { username } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const redirectToUser = useCallback(async () => {
    if (isMe && user) {
      setData(user);
    } else if (!isMe && username) {
      if (username === user?.username) {
        navigate("/users/me", { replace: true });
      } else {
        try {
          setLoading(true);
          const response = await getUser(username);
          setData(response);
          setLoading(false);
        } catch {
          console.error();
        }
      }
    }
  }, [user, username, isMe, navigate]);

  useEffect(() => {
    redirectToUser();
  }, [redirectToUser]);

  if (loading && !data) return <Loader />;

  if (data)
    return (
      <main className={styles.content}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.user}>
              <Avatar mode={"profile"} username={data.username} src={data.avatarUrl} isMe={isMe} />
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
