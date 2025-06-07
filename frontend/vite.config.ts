import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // 👈 Esto permite a Docker exponerlo al exterior
    port: 3000
  }
})