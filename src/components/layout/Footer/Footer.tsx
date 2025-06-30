import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Больше здесь контента нет...</p>
      <address className={styles.contacts}>
        <a href="https://github.com/sysol8" target="_blank">GitHub автора</a>
      </address>
      <a href="#">Вернуться к началу</a>
    </footer>
  );
}
