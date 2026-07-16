# Chiune Honda Engineering Portfolio

This repository keeps both portfolio generations so the active site can be changed without losing the previous version. Vercel serves the static contents of `public` directly.

## Active site: Website 2

- `public` contains the verified Website 2 production build served by Vercel.
- `website-2/src` contains the React interface and interactions.
- `website-2/public` contains the story, project, and brand media.
- `website-2/dist` is generated locally and is not committed.

Run the active site locally:

```powershell
pnpm --dir website-2 install
pnpm --dir website-2 dev
```

Production checks:

```powershell
pnpm --dir website-2 lint
pnpm --dir website-2 build
```

## Preserved site: Website 1

The complete original static site is stored in `website-1/public`. It is also preserved by the `website-1` Git tag, which points to the last Website 1 production release.

Preview Website 1 locally:

```powershell
python -m http.server 5173 --directory website-1/public
```

## Switching back to Website 1

Copy the contents of `website-1/public` back into `public` and deploy that change. The `website-1` tag is the immutable recovery point if the archive ever needs to be restored.

## Publishing Website 2 changes

Build `website-2`, replace the contents of root `public` with the generated `website-2/dist` contents, verify the two directories match, then commit and deploy. Generated dependencies and the nested `dist` directory remain ignored.
