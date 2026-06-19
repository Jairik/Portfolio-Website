import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// package.json sets "type": "module", so __dirname is unavailable here
const configDir = dirname(fileURLToPath(import.meta.url))

// Emit a 404.html that mirrors index.html so GitHub Pages serves the SPA for
// client-side routes (e.g. /terminal) on direct navigation or refresh.
function spaFallback(): Plugin {
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    closeBundle() {
      const dist = resolve(configDir, 'dist')
      const index = resolve(dist, 'index.html')
      if (existsSync(index)) {
        copyFileSync(index, resolve(dist, '404.html'))
      }
    }
  }
}

// Dev-only: resolve /links to public/links/index.html, mirroring GitHub Pages'
// directory-index behavior so the static page works under `npm run dev` too.
function publicDirIndex(): Plugin {
  return {
    name: 'public-dir-index',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url === '/links' || req.url === '/links/') {
          req.url = '/links/index.html'
        }
        next()
      })
    }
  }
}

// Preview-only: serve prerendered extensionless routes from their generated
// .html aliases so hydration tests exercise the same route HTML users request.
function previewStaticRoutes(): Plugin {
  const aliases: Record<string, string> = {
    '/terminal': '/terminal.html',
    '/simple': '/simple.html',
    '/resume': '/resume.html',
    '/links': '/links/index.html'
  };
  const knownPaths = new Set(['/', '/terminal/', '/simple/', '/resume/', '/links/']);

  return {
    name: 'preview-static-routes',
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const originalUrl = req.url || '/';
        const url = new URL(originalUrl, 'http://localhost');
        const alias = aliases[url.pathname];

        if (alias) {
          req.url = `${alias}${url.search}`;
        } else if (!url.pathname.includes('.') && !knownPaths.has(url.pathname)) {
          req.url = `/404.html${url.search}`;
        }

        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spaFallback(), publicDirIndex(), previewStaticRoutes()],
  base: '/',  // Set base path for GitHub Pages deployment
})
