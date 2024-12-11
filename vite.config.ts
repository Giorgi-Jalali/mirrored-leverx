import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  root: "src",
  build: {
    outDir: '../dist',
    target: 'esnext',
    rollupOptions: {
      input: './index.html',
    }
  }
});


