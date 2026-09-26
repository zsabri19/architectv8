# RETIRED — content engine

This directory is not the production content pipeline. Do not run these scripts as part of deploy, and do not expect them to update the live site.

## Investigation (stabilization pass)

No script in this repository writes `src/lib/site-data.ts`.

| File | What it writes | Writes `site-data.ts`? |
| --- | --- | --- |
| `content_engine_db.py` | Creates `scripts/content_engine.db` (SQLite) from `data.py` or a JSON seed that is not in the repo | No |
| `content_loop.py` | Draft JSON and a text summary under `scripts/output/` from that SQLite file | No |
| `data.py` | In-memory seed imported by `content_engine_db.py` | No |
| `extract_memoir.py` | One-off extractor. Hardcoded Windows paths. Writes `src/lib/memoir/bodies.ts` on a local machine, not the illustrated HTML under `public/memoir/` | No |

`package.json` has no script that calls any of these. The deploy build is `vite build` only.

## Decision

Retire the engine. `src/lib/site-data.ts` stays the source of truth for the React site until a CMS is chosen. The illustrated memoir that readers open is the static HTML in `public/memoir/`. Orphaned drafts in `scripts/output/` and the committed SQLite file were removed. `scripts/output/` and `*.db` are gitignored.

`src/lib/memoir/bodies.ts` remains in the tree as an unused prose extract (`MemoirProse` only imports its block type). Nothing in the route tree renders `MEMOIR_BODIES`.
