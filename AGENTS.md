# Portfolio project-data integration

- Career-Ops `data/portfolio.json` is the canonical source for public project and experience records.
- `website-2/src/data/projects.json` is a generated public mirror; do not make lasting edits directly in it.
- Add and verify facts in Career-Ops first, then run `npm.cmd run sync:from-career-ops` and `npm.cmd run validate:projects` here.
- The export includes only records explicitly marked `public: true`.
- Mark planned and in-progress work explicitly so Career-Ops cannot describe it as completed.

# Preview requirement

- After every user-requested portfolio content, media, layout, or interaction change, build or run the current site and inspect the rendered result in the in-app browser.
- Before the final response, show the user a screenshot of the changed section or state. Use the real rendered page rather than only showing a source asset.
- If a preview cannot be produced, state the specific blocker instead of silently omitting it.
