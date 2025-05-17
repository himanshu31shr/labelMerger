import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Material UI Vite TS",
        short_name: "MUI App",
        theme_color: "#2196f3", // Material UI primary blue color
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
        ],
      },
      workbox: {
        // Don't register the service worker for firebase-messaging-sw.js
        // as we'll handle it manually
        navigateFallbackDenylist: [/^\/firebase-messaging-sw\.js$/],
        // Skip waiting on install and activate immediately
        skipWaiting: true,
        // Take control of clients immediately
        clientsClaim: true,
        // Disable service worker registration in development
        disableDevLogs: true,
      },
      // Include firebase-messaging-sw.js in the build
      includeAssets: ["favicon.ico", "firebase-messaging-sw.js"],
      // Use manual registration for better control
      injectRegister: null,
      // Use minimal strategy for development
      strategies: "generateSW",
      devOptions: {
        // Disable service worker in development to avoid conflicts
        enabled: false,
        type: "module",
      },
    }),
  ],
  base: "/",
  server: {
    port: 5173, // Use Vite's default port
    strictPort: false, // Allow fallback to another port if needed
    allowedHosts: [
      '8690-2405-201-3034-5047-acbc-3d30-cd62-9d80.ngrok-free.app'
    ]
  },
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
