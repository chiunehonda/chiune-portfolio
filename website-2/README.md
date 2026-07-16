# Website 2

This directory contains the immersive photo-led redesign used by the active portfolio.

## Safety boundary

- The `website-1` Git tag points to the preserved Website 1 release.
- Website 1's files are archived in `../website-1/public`.
- The verified build from this directory is copied into root `../public` for deployment.

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

Vercel serves the root `../public` directory directly. After this source is built, the verified `dist` contents are copied there for a zero-build static deployment. Reverting to Website 1 remains possible by restoring the `website-1` tag or copying `../website-1/public` back into root `../public`.
