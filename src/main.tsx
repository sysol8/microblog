// @ts-expect-error / подключение шрифта fontsource
import "@fontsource-variable/open-sans";
import './index.css'
import { createRoot } from 'react-dom/client'
import App from "./App.tsx";

createRoot(document.querySelector('#root')!).render(<App />)
