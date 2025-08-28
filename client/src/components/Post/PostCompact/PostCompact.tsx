import styles from './PostCompact.module.css'
import type { IPost } from "../../../utils/types.ts";
import { modalStore } from "../../../store/modalStore.ts";
import { pluralize } from "../../../utils/utils.ts";
import Post from "../Post.tsx";

interface PostCompactProps {
  data: IPost;
}

function PostCompact({ data }: PostCompactProps) {
  const { author, textContent, imageUrls } = data;

  return (
    <div className={styles.wrapper} onClick={() => modalStore.open(<Post data={data} />)}>
      <div className={styles.author}>
        <img className={styles.avatar} src={`${author.avatarUrl ? author.avatarUrl : "/avatar-placeholder.png"}`} alt={`Аватар пользователя ${author.username}`}/>
        <span className={styles.username}>{author.username}</span>
      </div>
      <p className={styles.textContent}>{textContent}</p>
      {(imageUrls && imageUrls.length > 0) && (
        <p className={styles.attachments}>{imageUrls.length} {pluralize(imageUrls.length, ["вложение","вложения", "вложений"])}</p>
      )}
    </div>
  )
}

export default PostCompact;