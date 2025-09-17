import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    host: true,    // écoute sur 0.0.0.0
    port: 5173,
    strictPort: true,
    fs: {
      strict: false,
    },
  },
});
