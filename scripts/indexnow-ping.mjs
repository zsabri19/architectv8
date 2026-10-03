#!/usr/bin/env node
// IndexNow ping (Bing, Yandex, Seznam, Naver share the api.indexnow.org endpoint).
//
// Run by hand AFTER a production deploy of Pages project version-7 is live. It is not part of
// `bun run build` and must never run against a preview: IndexNow only accepts URLs on the host
// that serves the key file, and the key file is checked on https://global-mkts.com.
//
//   node scripts/indexnow-ping.mjs                 # every URL in the live sitemap
//   node scripts/indexnow-ping.mjs /insights /press # only these paths (changed pages)
//   node scripts/indexnow-ping.mjs --dry-run       # print the payload, send nothing
//
// The key is public by design (it is served at /<key>.txt). It is not a credential.
const HOST = "global-mkts.com";
const ORIGIN = `https://${HOST}`;
const KEY = "90dbd79fc7c41db448bdfc6d00d7c8bf";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const paths = args.filter((a) => !a.startsWith("--"));

async function sitemapUrls() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`, { redirect: "manual" });
  if (res.status !== 200) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const keyRes = await fetch(KEY_LOCATION, { redirect: "manual" });
const keyBody = keyRes.status === 200 ? (await keyRes.text()).trim() : "";
if (keyBody !== KEY) {
  console.error(
    `Key file check failed: ${KEY_LOCATION} -> ${keyRes.status}. Deploy to production first.`,
  );
  process.exit(1);
}

// Private family chapter. Never submit it, even if a caller passes the path.
const PRIVATE_PATHS = new Set(["/memoir/ch-15-letters-to-my-daughters.html"]);
const urlList = (paths.length
  ? paths.map((p) => new URL(p, ORIGIN).toString())
  : await sitemapUrls()
).filter((u) => !PRIVATE_PATHS.has(new URL(u).pathname));
const offHost = urlList.filter((u) => new URL(u).host !== HOST);
if (offHost.length) {
  console.error("Refusing to ping URLs that are not on the production host:", offHost);
  process.exit(1);
}

const payload = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };
console.log(`IndexNow: ${urlList.length} URL(s)`);
if (dryRun) {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}
const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});
console.log(`IndexNow response: ${res.status} ${res.statusText}`);
// 200 = accepted, 202 = accepted (key validation pending). Anything else is a failure.
process.exit(res.status === 200 || res.status === 202 ? 0 : 1);
