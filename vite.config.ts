import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        theme_color: "#2196f3", // Material UI primary blue color
        background_color: "#ffffff",
        icons: [
          {
            src: "favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
        ],
      },
    }),
  ],
  base: "/flipkart-amazon-tools//",
  worker: {
    format: "es",
    plugins: () => [],
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "mui-vendor": ["@mui/material", "@mui/icons-material"],
          "firebase-vendor": [
            "firebase/app",
            "firebase/auth",
            "firebase/firestore",
          ],
          "pdf-vendor": ["pdf-lib", "html2pdf.js"],
          "utils-vendor": ["papaparse", "xlsx"],
        },
      },
      onwarn(warning, warn) {
        // Suppress eval warnings from pdf.js
        if (warning.code === "EVAL" && warning.id?.includes("pdfjs-dist")) {
          return;
        }
        warn(warning);
      },
    },
  },
  esbuild: {
    supported: {
      "top-level-await": true,
    },
  },
});
