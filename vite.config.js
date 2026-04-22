import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const frontendDir = fileURLToPath(new URL('.', import.meta.url))
const summariesDir = fileURLToPath(new URL('../summaries-es', import.meta.url))
const contentTypes = {
  '.json': 'application/json',
  '.md': 'text/markdown'
}

function summariesPlugin() {
  return {
    name: 'summaries-dev-server',
    configureServer(server) {
      server.middlewares.use('/api-content', async (req, res, next) => {
        const url = new URL(req.url ?? '/', 'http://localhost')
        const requestedPath = decodeURIComponent(url.pathname)
        const filePath = path.resolve(summariesDir, `.${requestedPath}`)

        if (!filePath.startsWith(`${summariesDir}${path.sep}`)) {
          res.statusCode = 403
          res.end('Forbidden')
          return
        }

        try {
          const content = await fs.readFile(filePath)
          res.setHeader('Content-Type', contentTypes[path.extname(filePath)] ?? 'application/octet-stream')
          res.end(content)
        } catch (error) {
          if (error.code === 'ENOENT' || error.code === 'EISDIR') {
            next()
            return
          }

          next(error)
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), summariesPlugin()],
  base: '/agora-front/',
  server: {
    fs: {
      allow: [frontendDir, summariesDir],
    },
  },
})
