import styles from "./AuthForm.module.css";
import { useState, type FormEvent, type ChangeEvent, useRef } from "react";
import { useAuthStore } from "../../store/authStore.ts";
import type { AuthPayload } from "../../api/users.ts";

type AuthMode = "login" | "register";

// TODO: сделать инпуты неконтролируемыми

function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("login");
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

type FormActions = {
  onSubmit: (payload: AuthPayload) => Promise<void>;
};

function LoginForm({ onSubmit }: FormActions) {
  const [form, setForm] = useState({ username: "", password: "" });

  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password) return;
    await onSubmit({ username: form.username, password: form.password });
    formRef.current?.reset();
  };

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
        />
      </label>
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.action}`} type="submit">
          Войти
        </button>
        <button className={styles.button} type="button">
          Забыли пароль?
        </button>
      </div>
    </form>
  );
}

function RegisterForm({ onSubmit }: FormActions) {
  const [form, setForm] = useState({ username: "", password: "" });

  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password) return;
    await onSubmit({ username: form.username, password: form.password });
    formRef.current?.reset();
  };

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
        />
      </label>
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.action}`} type="submit">
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
}

export default AuthForm;
