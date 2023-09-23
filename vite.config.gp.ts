import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default ({ mode }) => {
  return defineConfig({
    base: '/quick-pkt',
    plugins: [react()],
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          entryFileNames: 'js/[name].js',
          chunkFileNames: 'js/[name].js',
          assetFileNames: 'assets/[name].[ext]',
        },
      },
    },
    esbuild: {
      // drop: ['debugger'],
      // pure: ['console.log'],
    },
  });
};
