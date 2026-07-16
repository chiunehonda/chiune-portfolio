# Website 2

This directory contains the immersive photo-led redesign used by the active portfolio.

## Safety boundary

- Website 1 still lives in `../public`.
- The `website-1` Git tag points to the preserved Website 1 release.
- The root `../vercel.json` builds this directory and serves `dist`.

## Local development

```powershell
cd website-2
pnpm install
pnpm dev
```

Production verification:

```powershell
pnpm lint
pnpm build
```

The Vite build output is written to `website-2/dist`.

## Deployment and rollback

Vercel runs the install and build commands declared in the root `vercel.json`, then serves this directory's `dist` output. Reverting to Website 1 remains possible by restoring the `website-1` tag or pointing Vercel back to the root static `public` directory.
