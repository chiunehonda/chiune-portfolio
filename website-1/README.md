# Website 1

This directory preserves the complete static portfolio that was live immediately before Website 2.

- `public` is a standalone copy of Website 1.
- The remote `website-1` Git tag is the immutable recovery point for the same release.
- Root `../public` now contains the active Website 2 production build.

To restore Website 1, replace the contents of root `public` with the contents of this directory's `public`, then deploy that change.
