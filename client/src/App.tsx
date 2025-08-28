import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import AppLayout from "./layouts/AppLayout/AppLayout.tsx";
import PostsLayout from "./layouts/PostsLayout/PostsLayout.tsx";
import AuthLayout from "./layouts/AuthLayout/AuthLayout.tsx";
import ProfileLayout from "./layouts/ProfileLayout/ProfileLayout.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore.ts";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<PostsLayout />} />
            <Route path="login" element={<AuthLayout />} />
            <Route element={<ProtectedRoute />}>
              <Route path="users/me" element={<ProfileLayout isMe={true} />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route
                path="users/:username"
                element={<ProfileLayout isMe={false} />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
