import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'

import AppLayout from './layouts/AppLayout.tsx'
import PostsLayout from "./layouts/PostsLayout.tsx";


createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<PostsLayout />} />
        </Route>
        <Route path="profile"></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
