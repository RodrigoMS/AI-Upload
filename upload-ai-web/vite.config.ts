import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  /* Toda a importação com @ estará em ./src */
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
