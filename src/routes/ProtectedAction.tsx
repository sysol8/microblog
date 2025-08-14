import { Navigate } from "react-router";
import { useAuthStore } from "../store/authStore.ts";

function ProtectedAction() {
  const { user } = useAuthStore();

  return (
    <Navigate to="login" />
  )
}