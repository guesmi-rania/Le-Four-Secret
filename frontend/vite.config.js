import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  base: "/",              // reste inchangé
  plugins: [react()],
  build: {
    outDir: "dist",       // dossier de build
    emptyOutDir: true,    // vide le dossier avant build
    rollupOptions: {
      input: {
        client: resolve(__dirname, "src/main.jsx"),       // interface client
        admin: resolve(__dirname, "src/admin/main.jsx"),  // dashboard admin
      },
    },
  },
  server: {
    host: true,       // écoute sur 0.0.0.0
    port: 5173,
    strictPort: true,
    fs: {
      strict: false,
    },
  },
});
