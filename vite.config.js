import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build"
  },
  server: {
    host: "0.0.0.0",
    port: 4173,  // Changed to a different port
    strictPort: false,  // Allow fallback to another port if 4173 is in use
    hmr: {
      clientPort: 443
    }
  }
});