# legacy2 — previous main-page implementation (scroll site with WebGL Dither hero)

Runnable snapshot of the portfolio as it existed before the terminal-styled redesign
replaced the main page. Mirrors the `legacy/` pattern: this directory is a
self-contained Vite app with its own `package.json`.

Static assets are shared with the repo root via `publicDir: '../public'` in
`vite.config.ts` (the images are git-lfs tracked, so they are not duplicated here).

```sh
cd legacy2
npm install
npm run dev
```
