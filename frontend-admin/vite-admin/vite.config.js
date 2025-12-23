import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: ".", // racine frontend admin
  build: {
    outDir: "dist/admin",
    rollupOptions: {
      input: {
        admin: path.resolve(__dirname, "admin.html"), // point d'entrée admin
      },
    },
  },
  server: {
    port: 5174, // frontend admin local
    proxy: {
      "/api/admin": {
        target: "http://localhost:5000", // backend local admin
        changeOrigin: true,
        secure: false,
      },
      "/api/products": {
        target: "http://localhost:5000", // backend produits
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
