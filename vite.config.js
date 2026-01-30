import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/Vietri-BoardGame/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        editor: resolve(__dirname, 'editor_vietri.html'),
        mobile: resolve(__dirname, 'index_smart.html'),
        rules: resolve(__dirname, 'vietri-repo/rules.html'), // Ensure rules page is included
      },
    },
  },
});
