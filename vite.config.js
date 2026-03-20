import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  esbuild: {
    loader: 'jsx',
    include: [
      'src/**/*.jsx',
      'src/**/*.js',
    ],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        {
          name: 'treat-js-files-as-jsx',
          async transform(code, id) {
            if (!id.match(/src\/.*\.js$/)) return null;
            
            return transformWithEsbuild(code, id, {
              loader: 'jsx',
              jsx: 'automatic',
            });
          },
        },
      ],
    },
  },
})