import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/College_Student_Dashboard/' : '/',
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    open: false,
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          icons: ['lucide-react'],
          motion: ['framer-motion'],
        },
      },
    },
  },
}));
