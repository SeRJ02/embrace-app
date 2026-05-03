import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Replit-only dev plugins — only loaded inside Replit's environment.
// On Vercel / CI, REPL_ID is undefined so this stays an empty array.
const replitPlugins =
  process.env.REPL_ID !== undefined && process.env.NODE_ENV !== "production"
    ? await Promise.all([
        import("@replit/vite-plugin-runtime-error-modal").then((m) =>
          m.default()
        ),
        import("@replit/vite-plugin-cartographer").then((m) =>
          m.cartographer()
        ),
        import("@replit/vite-plugin-dev-banner").then((m) => m.devBanner()),
      ])
    : [];

export default defineConfig({
  plugins: [react(), ...replitPlugins],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
    },
  },
});
