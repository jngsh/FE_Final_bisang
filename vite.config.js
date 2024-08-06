/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server:{
    proxy:{
      '/bisang':{
        target: 'http://localhost:8090',
        changeOrigin: true,
        secure: false,
        // rewrite: (path)=>path.replace(/^\/bisang/,''),
      },
    },
  },
});
