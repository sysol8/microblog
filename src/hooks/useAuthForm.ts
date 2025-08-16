import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import type { AuthPayload } from "../utils/types";
import { useNavigate } from "react-router";

interface IUseAuthForm {
  onSubmit: (payload: AuthPayload) => Promise<void>;
  redirectTo?: string;
}

function useAuthForm({ onSubmit, redirectTo = "/users/me" }: IUseAuthForm) {
  const [form, setForm] = useState<AuthPayload>({ username: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<unknown | string>(null);
  const navigate = useNavigate();

  const submitRef = useRef(onSubmit);
  useEffect(() => {
    submitRef.current = onSubmit;
  }, [onSubmit]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const username = form.username.trim();
    if (!username || !form.password) return;

    try {
      setSubmitting(true);
      await submitRef.current({ username, password: form.password });
      setForm({ username: "", password: "" });
      navigate(redirectTo);
    } catch (err) {
      setError(err);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    submitting,
    error,
    handleInputChange,
    handleFormSubmit,
    setForm,
  };
}

export default useAuthForm;
