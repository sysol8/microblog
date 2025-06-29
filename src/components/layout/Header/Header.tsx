import styles from './Header.module.css';
import { Link } from 'react-router';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/" className={styles.link}>Все посты</Link>
          </li>
          <li className={styles.item}>
            <Link to="/posts/my" className={styles.link}>Мои посты</Link>
          </li>
          <li className={styles.item}>
            <Link to="/users/me" className={styles.link}>Профиль</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}