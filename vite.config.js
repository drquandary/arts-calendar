import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build"
  },
  server: {
    host: "0.0.0.0",
    port: 5173,  // Changed to 5173
    strictPort: false,
    hmr: {
      clientPort: 443
    }
  }
});