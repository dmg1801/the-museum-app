import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/',
    plugins: [react()],
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      port: 5173,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    define: {
      // 🚫 NO expongas todo process.env
      'process.env': {
        VITE_API_URL: JSON.stringify(env.VITE_API_URL),
        // Agrega explícitamente aquí las que uses
      },
    },
    css: {
      devSourcemap: false, // ✅ Soluciona el error de build con Bootstrap/PostCSS
    },
    build: {
      sourcemap: false, // evita map en prod
    }
  };
});
