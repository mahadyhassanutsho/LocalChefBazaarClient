import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react-vendor";
            if (id.includes("firebase")) return "firebase-vendor";
            if (id.includes("axios")) return "axios-vendor";
            if (id.includes("sweetalert2")) return "sweetalert-vendor";
            if (id.includes("lottie-react")) return "lottie-vendor";
            return "vendor";
          }
        },
      },
    },
  },
});
