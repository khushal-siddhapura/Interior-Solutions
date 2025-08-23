import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "localhost", // force localhost instead of 0.0.0.0
    port: 5173,
    strictPort: true, // don’t auto-switch ports
    hmr: {
      protocol: "ws", // ensure WebSocket is used
      host: "localhost", // match your dev server host
      port: 5173, // same port as server
    },
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
    colors: {
      primary: "#2563EB", // blue-600
      secondary: "#9333EA", // purple-600
      accent: "#F59E0B", // amber-500
      background: "#F9FAFB", // gray-50
      dark: "#111827", // gray-900
    },
  },
});
