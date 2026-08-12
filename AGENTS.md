# Portfolio project-data integration

- Career-Ops `data/portfolio.json` is the canonical source for public project and experience records.
- `website-2/src/data/projects.json` is a generated public mirror; do not make lasting edits directly in it.
- Add and verify facts in Career-Ops first, then run `npm.cmd run sync:from-career-ops` and `npm.cmd run validate:projects` here.
- The export includes only records explicitly marked `public: true`.
- Mark planned and in-progress work explicitly so Career-Ops cannot describe it as completed.
