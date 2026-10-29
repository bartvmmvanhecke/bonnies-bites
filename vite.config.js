import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5174,
    strictPort: true,
  },
  preview: {
    port: 5174,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      input: {
        idea: resolve(import.meta.dirname, 'idee.html'),
        camping: resolve(import.meta.dirname, 'camping.html'),
        main: resolve(import.meta.dirname, 'index.html'),
        recipe: resolve(import.meta.dirname, 'recipe.html'),
      },
    },
  },
});
