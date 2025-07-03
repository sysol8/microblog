// @ts-expect-error / подключение шрифта fontsource
import "@fontsource-variable/open-sans";
import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";

import AppLayout from './layouts/AppLayout/AppLayout.tsx'
import PostsLayout from "./layouts/PostsLayout/PostsLayout.tsx";
import AuthLayout from "./layouts/AuthLayout/AuthLayout.tsx";


createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<PostsLayout />} />
          <Route path="users/me" element={<AuthLayout />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
