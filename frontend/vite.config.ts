import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: '/',
    plugins: [react()],
    build: {
    sourcemap: false, // ⛔ No generar sourcemaps en producción
    },
    css: {
    postcss: {
      map: false // 🔥 esto es clave
    }
    },
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
      'process.env': env,
    },
  };
});
