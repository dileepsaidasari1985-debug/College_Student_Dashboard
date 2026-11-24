import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // If explicitly building for GitHub Pages, use repo subpath; otherwise for Vercel/Netlify/Root use '/'
  const isGitHubPages = process.env.DEPLOY_TARGET === 'gh-pages' || process.env.GITHUB_PAGES === 'true';
  const base = isGitHubPages ? '/College_Student_Dashboard/' : '/';

  return {
    base,
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
  };
});
