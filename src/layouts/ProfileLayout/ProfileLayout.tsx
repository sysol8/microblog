import styles from "./ProfileLayout.module.css";
import type { IUser } from "../../utils/types.ts";

interface ProfileLayoutProps {
  data: IUser;
}

function ProfileLayout({ data }: ProfileLayoutProps) {
  return (
    <main className={styles.content}>
      <div className={styles.wrapper}>
        <section className={styles.user}>
          <img
            className={styles.avatar}
            src={data.avatarUrl ? data.avatarUrl : "/avatar-placeholder.png"}
            alt={`Аватар пользователя ${data.username}`}
          />
          <h2 className={styles.username}>{data.username}</h2>
        </section>
        <section className={styles.data}>
          <article className={styles.article}></article>
        </section>
      </div>
    </main>
  );
}

export default ProfileLayout;
