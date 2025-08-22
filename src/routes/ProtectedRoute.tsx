import { Navigate, useLocation, Outlet } from "react-router";
import { useAuthStore } from "../store/authStore.ts";

function ProtectedRoute() {
  const { user } = useAuthStore();
  const location = useLocation();

  if (user === undefined) return null;

  if (user === null) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
