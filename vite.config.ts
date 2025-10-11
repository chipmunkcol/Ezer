import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/admin": {
        target: "https://hyezer-dev.webhop.me", // 실제 API 서버
        changeOrigin: true, // origin 헤더를 target으로 변경
        secure: false, // https 인증서 무시 (개발용)
      },
    },
  },
});
