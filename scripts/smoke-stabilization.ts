/**
 * Local stabilization checks. Does not hit production and does not deploy.
 *
 *   node --experimental-strip-types scripts/smoke-stabilization.ts
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { canonicalRedirectTarget, CANONICAL_ORIGIN } from "../src/lib/redirects.ts";
import { R2_MEDIA_KEYS, serveR2Media } from "../src/lib/r2-media.ts";
import { R2_MEDIA_OBJECTS } from "../src/lib/r2-media-manifest.ts";

let failed = 0;

function assert(cond: unknown, message: string) {
  if (!cond) {
    failed += 1;
    console.error(`FAIL ${message}`);
  }
}

function target(url: string): string | null {
  return canonicalRedirectTarget(url);
}

const cases: Array<[string, string]> = [
  ["https://www.global-mkts.com/", `${CANONICAL_ORIGIN}/`],
  ["https://www.global-mkts.com/frameworks", `${CANONICAL_ORIGIN}/frameworks`],
  ["https://architect.global-mkts.com/", `${CANONICAL_ORIGIN}/`],
  ["https://architect.global-mkts.com/the-architect", `${CANONICAL_ORIGIN}/the-architect`],
  ["https://architect.global-mkts.com/robots.txt", `${CANONICAL_ORIGIN}/robots.txt`],
  ["https://global-mkts.com/read", `${CANONICAL_ORIGIN}/memoir/index.html`],
  ["https://global-mkts.com/read/", `${CANONICAL_ORIGIN}/memoir/index.html`],
  [
    "https://global-mkts.com/read/ch-02-the-gulf-war.html",
    `${CANONICAL_ORIGIN}/memoir/ch-02-the-gulf-war.html`,
  ],
  ["https://global-mkts.com/read/epilogue.html", `${CANONICAL_ORIGIN}/memoir/epilogue.html`],
  ["https://www.global-mkts.com/read/prologue.html", `${CANONICAL_ORIGIN}/memoir/prologue.html`],
  ["https://global-mkts.com/book", `${CANONICAL_ORIGIN}/memoir/index.html`],
  ["https://global-mkts.com/memoir", `${CANONICAL_ORIGIN}/memoir/index.html`],
  ["https://global-mkts.com/advisory", `${CANONICAL_ORIGIN}/connect`],
  ["https://global-mkts.com/architect", `${CANONICAL_ORIGIN}/the-architect`],
  ["https://global-mkts.com/dispatch", `${CANONICAL_ORIGIN}/newsletter`],
  [
    "https://global-mkts.com/book/chapter-01-born-between-worlds",
    `${CANONICAL_ORIGIN}/memoir/ch-01-born-between-worlds.html`,
  ],
  [
    "https://global-mkts.com/read/assets/photos/ch02-replace%20with%20niagra%20falls%20-%20kuw-1986.jpg",
    `${CANONICAL_ORIGIN}/memoir/assets/photos/ch02-kuwait-1986.jpg`,
  ],
  [
    "https://global-mkts.com/memoir/assets/photos/ch07-replace%20with%20kuwait%20cricket%20image.jpg",
    `${CANONICAL_ORIGIN}/memoir/assets/photos/ch07-kuwait-cricket.jpg`,
  ],
  ["https://architect.global-mkts.com/assets/cover.png", `${CANONICAL_ORIGIN}/assets/cover.jpg`],
];

for (const [input, expected] of cases) {
  assert(target(input) === expected, `${input} → ${target(input)} (expected ${expected})`);
}

assert(target("https://global-mkts.com/the-architect") === null, "apex path must not redirect");
assert(target("https://global-mkts.com/memoir/index.html") === null, "memoir cover must stay 200");
assert(
  target("https://global-mkts.com/memoir/ch-01-born-between-worlds.html") === null,
  "chapter html must stay 200",
);

const readme = readFileSync("README.md", "utf8");
assert(
  !/architect\.global-mkts\.com is canonical/i.test(readme),
  "README must not call architect canonical",
);
assert(readme.includes("global-mkts.com"), "README names the apex");
assert(readme.includes("bun install"), "README documents bun");
assert(!/pnpm install|pnpm run/.test(readme), "README must not tell clones to use pnpm");

assert(!statExists("public/read"), "public/read must be gone");
assert(!statExists("public/sitemap.xml"), "public/sitemap.xml must be gone");
assert(!statExists("src/routes/sitemap[.]xml.ts"), "route sitemap handler must be gone");
assert(!statExists("pnpm-lock.yaml"), "pnpm-lock.yaml must be gone");
assert(statExists("bun.lock"), "bun.lock stays");

const memoirHtml = readdirSync("public/memoir").filter((name) => name.endsWith(".html"));
assert(memoirHtml.length > 0, "memoir html present");
for (const name of memoirHtml) {
  const html = readFileSync(join("public/memoir", name), "utf8");
  assert(html.includes("G-Z9BFJP96Q4"), `${name} missing GA4`);
  assert(!html.includes("/read/"), `${name} still links to /read/`);
  assert(!html.includes("replace with"), `${name} still has a placeholder photo src`);
}

const photos = readdirSync("public/memoir/assets/photos");
for (const name of photos) {
  assert(!/replace|add-/i.test(name), `placeholder filename still in tree: ${name}`);
  const size = statSync(join("public/memoir/assets/photos", name)).size;
  assert(size < 500_000, `large photo still in tree: ${name} (${size})`);
}

assert(R2_MEDIA_OBJECTS.length === R2_MEDIA_KEYS.size, "duplicate R2 keys");
assert(R2_MEDIA_KEYS.has("memoir/assets/audio/ch-01.mp3"), "chapter audio key");
assert(R2_MEDIA_KEYS.has("assets/cxo-magazine-april-2026.pdf"), "magazine pdf key");
assert(R2_MEDIA_KEYS.has("memoir/assets/photos/ch02-kuwait-1986.jpg"), "renamed photo key");
for (const object of R2_MEDIA_OBJECTS) {
  assert(!object.key.includes("replace"), `R2 key still placeholder: ${object.key}`);
  assert(!object.key.includes("add-"), `R2 key still placeholder: ${object.key}`);
}

const unbound = await serveR2Media(
  new Request("https://global-mkts.com/memoir/assets/audio/ch-01.mp3"),
  {},
);
assert(unbound?.status === 503, `unbound media status ${unbound?.status}`);

const passthrough = await serveR2Media(new Request("https://global-mkts.com/the-architect"), {});
assert(passthrough === null, "non-media must pass through");

const body = new Uint8Array([1, 2, 3, 4, 5]);
const bucket = {
  async head() {
    return {
      body: new Blob([body]).stream(),
      size: body.byteLength,
      httpMetadata: { contentType: "audio/mpeg" },
    };
  },
  async get(_key: string, options?: { range?: { offset: number; length: number } }) {
    const offset = options?.range?.offset ?? 0;
    const length = options?.range?.length ?? body.byteLength - offset;
    const slice = body.slice(offset, offset + length);
    return {
      body: new Blob([slice]).stream(),
      size: body.byteLength,
      range: { offset, length },
      httpMetadata: { contentType: "audio/mpeg" },
    };
  },
};

const ok = await serveR2Media(
  new Request("https://global-mkts.com/memoir/assets/audio/ch-01.mp3"),
  { MEDIA: bucket },
);
assert(ok?.status === 200, `bound GET ${ok?.status}`);
assert(ok?.headers.get("content-type") === "audio/mpeg", "content-type");
assert(ok?.headers.get("accept-ranges") === "bytes", "accept-ranges");

const partial = await serveR2Media(
  new Request("https://global-mkts.com/memoir/assets/audio/ch-01.mp3", {
    headers: { range: "bytes=1-2" },
  }),
  { MEDIA: bucket },
);
assert(partial?.status === 206, `range status ${partial?.status}`);
assert(
  partial?.headers.get("content-range") === "bytes 1-2/5",
  partial?.headers.get("content-range") ?? "no range",
);

if (failed) {
  console.error(`${failed} failed`);
  process.exit(1);
}
console.log(
  `ok redirects=${cases.length} memoirHtml=${memoirHtml.length} r2=${R2_MEDIA_OBJECTS.length}`,
);

function statExists(path: string): boolean {
  try {
    statSync(path);
    return true;
  } catch {
    return false;
  }
}
