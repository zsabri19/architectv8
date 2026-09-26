# Media on Cloudflare R2

Large audio, video, PDFs, photos, and generated `.spoken.js` / `.spoken.json` files are removed from the working tree. The worker serves the same public paths from an R2 bucket. Git history still contains the blobs. Do not run `git filter-repo` in this change.

## Status in this PR

**BLOCKED on upload and binding.** This environment could not create or fill a bucket.

`r2_buckets_list` returned Cloudflare error **10042**: `Please enable R2 through the Cloudflare Dashboard.` No `CLOUDFLARE_*`, `R2_*`, or `WRANGLER_*` credentials were present in the agent environment. No bucket name was invented as if it already existed, and no token was written into the repo.

Until the steps below are done, a deploy of this branch returns **503** for the 87 offloaded URLs (binding missing) and **404** only after the binding exists but an object was not uploaded. HTML routes are unchanged. **Do not merge and do not deploy to the Pages project `version-7` until a sample media URL returns 200.**

## What moved

Rules (structure only, same URLs except renamed placeholder photos, which 301):

- Every `.mp3`, `.mp4`, and `.wav`
- PDFs at least 1 MB (`cxo-magazine-april-2026.pdf`, `osh-what-you-cant-predict-ar.pdf`). Smaller PDFs stay in `public/assets/`
- Raster images at least 500 KB
- Every `*.spoken.js` and `*.spoken.json` (listen pages fetch these by URL; they are not rebuilt by `vite build`)
- `scripts/content_engine.db` was deleted and gitignored. It is not a public URL and is not uploaded to R2

The object list, byte sizes, content types, and the git path to recover each blob are in `src/lib/r2-media-manifest.ts`. Source commit: `f3b6cead70a13cf1ea137123861d23473f3cb87e` (main at the time of removal).

Placeholder photo filenames 301 to the key in that manifest (or to a small file that stayed in git). See `PHOTO_RENAMES` in `src/lib/redirects.ts`.

Lovable `r2_key` values inside `src/assets/*.asset.json` are Lovable asset-store metadata. They are not this bucket. The worker key is the public path without the leading slash (`assets/osh-interview.mp4`, `memoir/assets/audio/ch-01.mp3`).

## Nash follow-up (exact)

1. In the Cloudflare dashboard for the account that owns Pages project **version-7**, open **R2** and enable it. The API will keep returning error 10042 until this is done.
2. Create a bucket named **`global-mkts-media`**.
3. From a checkout that can read git history (the blobs are on `f3b6cead70a13cf1ea137123861d23473f3cb87e`, not on this branch's working tree), authenticate Wrangler with that account (`wrangler login` or `CLOUDFLARE_API_TOKEN` in the shell — never commit the token):

   ```sh
   node --experimental-strip-types scripts/upload-r2-media.ts --execute
   ```

   Dry-run (no uploads) is the default: `node --experimental-strip-types scripts/upload-r2-media.ts`.
4. On Pages project **version-7** (production host `global-mkts.com`, twin `version-7-9yj.pages.dev`), add an R2 binding:
   - Variable name: **`MEDIA`**
   - Bucket: **`global-mkts-media`**
   There is no `wrangler.toml` in this repo on purpose. Lovable deploys via the Nitro `cloudflare-pages` preset and does not attach bindings from a toml today. Set the binding in the Pages dashboard (Settings → Functions → Bindings) for both production and preview if previews should serve media.
5. Deploy this branch only after step 4. Then:

   ```sh
   curl -sI https://global-mkts.com/memoir/assets/audio/ch-01.mp3 | head -n 15
   curl -sI -H 'Range: bytes=0-1' https://global-mkts.com/assets/osh-interview.mp4 | head -n 20
   curl -sI https://global-mkts.com/assets/cxo-magazine-april-2026.pdf | head -n 15
   ```

   Expect `200` (or `206` for the range request), `content-type` audio/mpeg, video/mp4, and application/pdf, and `accept-ranges: bytes`.

The worker reads `env.MEDIA`. `GET` and `HEAD` support a single `Range` so chapter audio and the film files can seek. `/assets/*` keeps `Cache-Control: public, max-age=31536000, immutable` (same as `public/_headers`). Memoir objects use `public, max-age=86400`.

## History rewrite (later, coordinated)

Removing files from HEAD does not shrink existing clones. A later `git filter-repo` (or `git filter-repo --invert-paths` with the extensions and paths in `.gitignore`) has to rewrite published history and force-push.

Do that only after Nash, Victor, Baba, and the Lovable project agree. This repo's `AGENTS.md` says a force-push rewrites history on Lovable's side. Do not filter-repo from this PR.

After the rewrite, new clones drop the media blobs. The R2 bucket remains the copy that serves the site.
