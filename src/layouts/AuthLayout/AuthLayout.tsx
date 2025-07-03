import styles from './AuthLayout.module.css';
import AuthForm from "../../components/AuthForm/AuthForm.tsx";

export default function AuthLayout() {
  return (
    <main className={styles.content}>
      <AuthForm />
    </main>
  )
}