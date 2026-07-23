# Floraseek

Floraseek is now a standalone Vite and React website designed for Vercel deployment.

The previous Wix Git Integration export is preserved in `wix-archive/original-wix-export/`.

## Local Preview

```sh
npm install
npm run lint
npm run build
npm run preview
```

## Vercel

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

`vercel.json` rewrites all routes to `index.html` so direct React Router URLs work after deployment.
