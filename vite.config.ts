import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  plugins: [react()],

  server: {
    port: 3000,
  },
  preview: {
    port: 3010,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
