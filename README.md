# Chiune Honda Engineering Portfolio

This repository keeps both portfolio generations so the active site can be changed without losing the previous version.

## Active site: Website 2

- `website-2/src` contains the React interface and interactions.
- `website-2/public` contains the story, project, and brand media.
- `website-2/dist` is generated locally and is not committed.
- Vercel installs and builds `website-2`, then serves `website-2/dist`.

Run the active site locally:

```powershell
pnpm --dir website-2 install
pnpm dev
```

Production checks:

```powershell
pnpm lint
pnpm build
```

## Preserved site: Website 1

The complete original static site remains in `public`. It is also preserved by the `website-1` Git tag, which points to the last Website 1 production release.

Preview Website 1 locally:

```powershell
pnpm dev:website-1
```

## Switching back to Website 1

Change `vercel.json` back to `"outputDirectory": "public"` and remove its Website 2 install/build commands, then deploy that change. The `website-1` tag is the immutable recovery point if the original files ever need to be restored.
