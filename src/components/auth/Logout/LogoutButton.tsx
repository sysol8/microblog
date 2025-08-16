import styles from './LogoutButton.module.css';
import { useAuthStore } from "../../../store/authStore.ts";
import { Navigate } from "react-router";


function LogoutButton() {
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    return <Navigate to="/login" />;
  }

  return (
    <button className={styles.button} type="button" onClick={handleLogout}>
      Выйти
    </button>
  )
}

export default LogoutButton;