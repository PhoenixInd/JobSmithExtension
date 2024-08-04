import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  build: {
    rollupOptions:{
    input:{
      main: 'index.html',
      background: "src/background/background.ts", // Entry Point
      contentScript: 'src/content/contentScript.ts',
      popup: 'src/App.tsx'
    },
    output:{
        entryFileNames: "assets/[name].js"
    }
    },
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
})
