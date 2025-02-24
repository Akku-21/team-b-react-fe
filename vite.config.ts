import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/be': {
        target: 'http://localhost:3200/api/api',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/be/, '')
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
