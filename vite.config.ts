// import { defineConfig } from 'vite';

// export default defineConfig({
//   build: {
//     outDir: 'dist',
//     target: 'esnext',
//     rollupOptions: {
//       input: './index.html',
//     },
//   },
// });

import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/sass/main.scss";`
      }
    }
  }
});

