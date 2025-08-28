import styles from './NotFound.module.css';
import { alertConfig } from "../config/alertConfig.ts";

interface NotFoundProps {
  mode: 'alert' | 'page'
}

function NotFound({ mode }: NotFoundProps) {
  if (mode === 'alert') {
    alertConfig.common.onNotFound()
  }

  if (mode === 'page') return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Запрашиваемый ресурс не существует</h2>
      <p className={styles.description}>Мы правда пытались его найти</p>
    </div>
  )
}

export default NotFound;