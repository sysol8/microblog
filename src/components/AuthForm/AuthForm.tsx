import styles from "./AuthForm.module.css";
import type { AuthPayload, AuthAction } from "../../utils/types.ts";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore.ts";
import useAuthForm from "../../hooks/useAuthForm.ts";

interface AuthFormActions {
  onSubmit: (payload: AuthPayload) => Promise<void>;
}

function AuthForm() {
  const [mode, setMode] = useState<AuthAction>("login");
  const { register, login } = useAuthStore();

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.switcher} ${mode === "login" ? styles.active : ""}`}
          onClick={() => setMode("login")}
        >
          Вход
        </button>
        <button
          className={`${styles.switcher} ${mode === "register" ? styles.active : ""}`}
          onClick={() => setMode("register")}
        >
          Регистрация
        </button>
      </div>
      {mode === "login" ? (
        <LoginForm onSubmit={login} />
      ) : (
        <RegisterForm onSubmit={register} />
      )}
    </div>
  );
}

function LoginForm({ onSubmit }: AuthFormActions) {
  const { form, submitting, error, handleInputChange, handleFormSubmit } =
    useAuthForm({ onSubmit });

  return (
    <form
      onSubmit={handleFormSubmit}
      className={styles.form}
      autoComplete="off"
    >
      <label className={styles.label} htmlFor="username">
        Имя пользователя
        <input
          className={styles.input}
          id="username"
          name="username"
          type="text"
          value={form.username}
          placeholder="ivanov.ivan123"
          onChange={handleInputChange}
          disabled={submitting}
        />
      </label>
      <label className={styles.label} htmlFor="password">
        Пароль
        <input
          className={styles.input}
          placeholder="••••••••"
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleInputChange}
          disabled={submitting}
        />
      </label>
      {error instanceof Error && <span className={styles.error}>{error.message}</span>}
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.action}`} type="submit" disabled={submitting}>
          Войти
        </button>
      </div>
    </form>
  );
}

function RegisterForm({ onSubmit }: AuthFormActions) {
  const { form, submitting, error, handleInputChange, handleFormSubmit } =
    useAuthForm({ onSubmit });

  return (
    <form
      onSubmit={handleFormSubmit}
      className={styles.form}
      autoComplete="off"
    >
      <label className={styles.label} htmlFor="username">
        Имя пользователя
        <input
          className={styles.input}
          id="username"
          type="text"
          name="username"
          placeholder="ivanov.ivan123"
          value={form.username}
          onChange={handleInputChange}
          disabled={submitting}
        />
      </label>
      <label className={styles.label} htmlFor="password">
        Пароль
        <input
          className={styles.input}
          id="password"
          type="password"
          name="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleInputChange}
          disabled={submitting}
        />
      </label>
      {/* TODO: Добавить проверку на доступность юзернейма в реальном времени */}
      {error instanceof Error && <span className={styles.error}>{error.message}</span>}
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.action}`} type="submit" disabled={submitting}>
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
}

export default AuthForm;
