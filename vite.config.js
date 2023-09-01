import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        shop: resolve(__dirname, 'shop.html'),
        product: resolve(__dirname, 'product.html'),
        login: resolve(__dirname, 'login.html'),
        createAccount: resolve(__dirname, 'create-account.html'),
        account: resolve(__dirname, 'account.html'),
        community: resolve(__dirname, 'community.html'),
        post: resolve(__dirname, 'post.html'),
        createPost: resolve(__dirname, 'create-post.html'),
        buyClothes: resolve(__dirname, 'buy-clothes.html'),
      },
    },
  },
});
