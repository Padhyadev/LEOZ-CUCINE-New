import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    open: true,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
    fs: {
      // Allow serving files from one level up to access parent workspace logo assets
      allow: ['..'],
    },

  },
  preview: {
    host: true,
    port: 3000,
    allowedHosts: true,
  },
});
