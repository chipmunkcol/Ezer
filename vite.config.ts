import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const env = loadEnv("development", process.cwd()); // VITE_ 접두사가 붙은 변수들 포함
const API_URL = env.VITE_API_URL;
console.log("🚀 ~ API_URL:", API_URL);
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // port: 3000,
    proxy: {
      "/admin": {
        // target: API_URL, // 실제 API 서버
        target: "https://hyezer-dev.webhop.me",
        changeOrigin: true, // origin 헤더를 target으로 변경
        secure: false, // https 인증서 무시 (개발용)
      },
    },
  },
});
