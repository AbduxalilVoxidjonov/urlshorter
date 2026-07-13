import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cloudflare } from '@cloudflare/vite-plugin'

// The Cloudflare plugin runs the Worker (worker/index.js) inside a real workerd
// runtime during `vite dev`, with KV emulated locally — so shortening, redirects
// and the SPA all work end-to-end on http://localhost:5173 with hot reload.
// `vite build` produces a deployable bundle that `wrangler deploy` ships as-is.
export default defineConfig({
  plugins: [react(), cloudflare()],
})
