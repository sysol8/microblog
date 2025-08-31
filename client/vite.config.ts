import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [svgr(), react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: { usePolling: true, interval: 200 }
  }
})
