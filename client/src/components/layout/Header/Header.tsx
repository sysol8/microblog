import styles from "./Header.module.css";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.layout}>
        <Link to="/" className={styles.logoLink}>
          Placeholder
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link to="/" className={styles.link}>
                Лента
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/users/me" className={styles.link}>
                Профиль
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
