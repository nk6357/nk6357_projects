import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  // GitHub Pages публикует сайт в подпапке, Vercel — в корне домена.
  base: command === "serve" || process.env.VERCEL ? "/" : "/nk6357_projects/",
  plugins: [react()],
}));
