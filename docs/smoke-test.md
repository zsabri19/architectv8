# Redirect and route smoke test

Run the local checks before review. They do not call production and they do not deploy.

```sh
node --experimental-strip-types scripts/smoke-stabilization.ts
```

After R2 is bound and this branch is deployed to Pages project `version-7`, run the curl checklist below against the apex. Do not deploy until `docs/media-r2.md` is done. Media curls return 503 while `MEDIA` is unbound.

## Alias hosts (301 to the apex, path preserved)

```sh
curl -sI https://www.global-mkts.com/ | head -n 15
curl -sI https://architect.global-mkts.com/ | head -n 15
curl -sI https://architect.global-mkts.com/the-architect | head -n 15
curl -sI https://www.global-mkts.com/robots.txt | head -n 15
```

Expect `HTTP/2 301` (or `HTTP/1.1 301`) and `location: https://global-mkts.com/...`. `architect.global-mkts.com` is an alias, not the canonical host.

## Legacy paths

```sh
curl -sI https://global-mkts.com/advisory | head -n 10
curl -sI https://global-mkts.com/architect | head -n 10
curl -sI https://global-mkts.com/dispatch | head -n 10
curl -sI https://global-mkts.com/executive-profile | head -n 10
curl -sI https://global-mkts.com/index.html | head -n 10
curl -sI https://global-mkts.com/assets/cover.png | head -n 10
curl -sI https://global-mkts.com/book | head -n 10
curl -sI https://global-mkts.com/memoir | head -n 10
curl -sI https://global-mkts.com/book/chapter-01-born-between-worlds | head -n 10
```

Expect 301 to `/connect`, `/the-architect`, `/newsletter`, `/the-architect`, `/`, `/assets/cover.jpg`, `/memoir/index.html`, `/memoir/index.html`, and `/memoir/ch-01-born-between-worlds.html`.

## Retired /read

```sh
curl -sI https://global-mkts.com/read | head -n 10
curl -sI https://global-mkts.com/read/ | head -n 10
curl -sI https://global-mkts.com/read/epilogue.html | head -n 10
curl -sI https://global-mkts.com/read/ch-02-the-gulf-war.html | head -n 10
curl -sI "https://global-mkts.com/read/assets/photos/ch02-replace%20with%20niagra%20falls%20-%20kuw-1986.jpg" | head -n 10
```

Expect 301 to `/memoir/index.html`, the same chapter under `/memoir/`, or `/memoir/assets/photos/ch02-kuwait-1986.jpg`.

## Routes that should be 200 on the apex

```sh
for path in \
  / /the-architect /clarityos /frameworks /services /insights /media /newsletter \
  /connect /book-a-session /book-a-session/thanks /organizational-development \
  /executive-coaching /personal-development-framework /press /privacy \
  /memoir/index.html /memoir/prologue.html /memoir/epilogue.html /memoir/appendix.html \
  /memoir/listen.html /robots.txt /sitemap.xml
 do
  code=$(curl -s -o /dev/null -w "%{http_code}" "https://global-mkts.com$path")
  echo "$code $path"
done
```

`/sitemap.xml` is the worker document (`src/lib/sitemap.ts`). Locations use `https://global-mkts.com/...` and include memoir chapter HTML. There is no `public/sitemap.xml` and no `src/routes/sitemap[.]xml.ts`.

Framework and insight URLs are the slugs in `src/lib/site-data.ts` (`/frameworks/<slug>`, `/insights/<slug>`). Spot-check `/frameworks/8c-crisis-to-clarity` if that slug is still in `FRAMEWORKS`.

## Media (200 only after R2)

```sh
curl -sI https://global-mkts.com/memoir/assets/audio/ch-01.mp3 | head -n 15
curl -sI -H "Range: bytes=0-1" https://global-mkts.com/assets/osh-interview.mp4 | head -n 20
curl -sI https://global-mkts.com/assets/cxo-magazine-april-2026.pdf | head -n 15
curl -sI https://global-mkts.com/memoir/assets/photos/ch02-kuwait-1986.jpg | head -n 15
```

## GA4 on the illustrated memoir

```sh
curl -s https://global-mkts.com/memoir/ch-01-born-between-worlds.html | grep -n G-Z9BFJP96Q4
```

The same id is in every `public/memoir/*.html` file and in `src/routes/__root.tsx`. Nothing in the build regenerates those HTML files.
