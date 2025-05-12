import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { quasar } from "@quasar/vite-plugin";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue(), quasar()],

  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },

  build: {
    outDir: "../html",
    assetsDir: "./",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
});
