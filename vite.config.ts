import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// package.json sets "type": "module", so __dirname is unavailable here
const configDir = dirname(fileURLToPath(import.meta.url))

// Seed a SPA 404.html during the *client* build so GitHub Pages can serve the
// app shell for unknown routes. scripts/prerender.mjs then overwrites it with
// the real noindex 404 page. Skip the SSR build — its closeBundle would otherwise
// clobber that prerendered 404 after a full `npm run build`.
function spaFallback(): Plugin {
  let isSsr = false
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    configResolved(config) {
      isSsr = Boolean(config.build.ssr)
    },
    closeBundle() {
      if (isSsr) return
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
  const dist = resolve(configDir, 'dist');

  return {
    name: 'preview-static-routes',
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const originalUrl = req.url || '/';
        const url = new URL(originalUrl, 'http://localhost');
        const alias = aliases[url.pathname];

        if (alias) {
          req.url = `${alias}${url.search}`;
        } else if (!url.pathname.includes('.') && url.pathname !== '/') {
          // Mirror GitHub Pages directory-index serving: if a prerendered
          // <path>/index.html exists (e.g. /projects/<slug>/), serve it;
          // otherwise fall back to the SPA 404 page.
          const withSlash = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
          const indexFile = resolve(dist, `.${withSlash}index.html`);

          if (existsSync(indexFile)) {
            req.url = `${withSlash}index.html${url.search}`;
          } else if (!knownPaths.has(url.pathname)) {
            req.url = `/404.html${url.search}`;
          }
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
