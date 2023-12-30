import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import {  resolve as resolvePath } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
