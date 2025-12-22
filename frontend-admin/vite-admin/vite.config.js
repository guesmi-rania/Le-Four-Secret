import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),  // client
        admin: path.resolve(__dirname, 'admin.html'), // admin
      }
    }
  },
  server: {
    port: 5174,
  },
});
