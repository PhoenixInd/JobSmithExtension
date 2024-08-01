import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  build: {
    emptyOutDir: false, // So that popup and content build files don't get deleted
        target:"node16",
        rollupOptions:{
        input:{
            background: "src/background/background.ts", // Entry Point
            contentScript: 'src/content/contentScript.ts',
        },
        output:{
            entryFileNames: "assets/[name].js"
        }
        },
  }
})
