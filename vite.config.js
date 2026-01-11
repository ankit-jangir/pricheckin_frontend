import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
//   server: {
//   proxy: {
//     '/api': {
//       target: 'https://thestaymaster.com',
//       changeOrigin: true,
//       secure: false,
//       rewrite: (path) => path.replace(/^\/api/, '/api'),
//     },
//   },
// },
});
