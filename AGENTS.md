# AGENTS.md

## Cursor Cloud specific instructions

This is an **Eleventy (11ty) v3 static blog** — no backend, no database, no Docker. The entire stack is Node.js + npm.

### Quick reference

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm start` (serves at `http://localhost:8080/` with live-reload) |
| Production build | `npm run build` (outputs to `_site/`) |
| Debug build | `npm run debug` |

### Non-obvious notes

- `.nvmrc` specifies Node 22. The `engines` field in `package.json` requires `>=18`.
- `npm start` runs `npx @11ty/eleventy --serve --quiet`. The dev server includes live-reload; no separate watch command is needed.
- Draft posts (`draft: true` in front matter) are included when using `--serve`/`--watch` but excluded from production builds.
- Image optimization (AVIF/WebP via Sharp) runs automatically during build/serve. First builds may be slower due to image processing.
- There are no linters, formatters, or test suites configured in this project. The `package.json` has no `test` or `lint` script.
- The project uses ESM (`"type": "module"` in `package.json`).
