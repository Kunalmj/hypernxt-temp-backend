import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // Load .env variables so we can use them in the config (server-side)
  const env = loadEnv(mode, process.cwd(), '')

  const apiBaseUrl = env.VITE_API_BASE_URL
  const devProxyPath = env.VITE_DEV_PROXY_PATH

  if (!apiBaseUrl) {
    throw new Error("Missing VITE_API_BASE_URL in environment configuration.")
  }
  if (!devProxyPath) {
    throw new Error("Missing VITE_DEV_PROXY_PATH in environment configuration.")
  }

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        [devProxyPath]: {
          target: apiBaseUrl,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(new RegExp(`^${devProxyPath}`), ''),
        },
      },
    },
  }
})