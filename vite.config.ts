import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://team-b-api-bun-drizzle-production.up.railway.app',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/be/, '')
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
