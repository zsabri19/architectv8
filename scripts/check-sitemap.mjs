#!/usr/bin/env node
// Sitemap gate: every <loc> must be a canonical, indexable, 200 HTML page on https://global-mkts.com.
//
//   node scripts/check-sitemap.mjs                                  # production
//   node scripts/check-sitemap.mjs https://<alias>.version-7-9yj.pages.dev   # a Pages preview
//
// For a preview, each <loc> path is fetched on the preview host, but the canonical must still be
// the https://global-mkts.com URL listed in the sitemap. Exits 1 on any failure.
const CANONICAL_ORIGIN = "https://global-mkts.com";
const base = (process.argv[2] || CANONICAL_ORIGIN).replace(/\/+$/, "");

const sm = await fetch(`${base}/sitemap.xml`, { redirect: "manual" });
if (sm.status !== 200) {
  console.error(`FAIL sitemap.xml -> ${sm.status}`);
  process.exit(1);
}
const xml = await sm.text();
const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
  loc: (m[1].match(/<loc>([^<]+)<\/loc>/) || [])[1]?.trim(),
  lastmod: (m[1].match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1]?.trim(),
}));

const failures = [];
const seen = new Set();
for (const { loc, lastmod } of entries) {
  const problems = [];
  if (!loc) problems.push("missing <loc>");
  else {
    if (seen.has(loc)) problems.push("duplicate");
    seen.add(loc);
    if (!loc.startsWith(`${CANONICAL_ORIGIN}/`)) problems.push("not https apex");
    if (!lastmod || !/^\d{4}(-\d{2}(-\d{2})?)?$/.test(lastmod)) problems.push(`bad lastmod ${lastmod}`);
    const url = new URL(loc);
    const res = await fetch(base + url.pathname + url.search, { redirect: "manual" });
    if (res.status !== 200) problems.push(`status ${res.status} ${res.headers.get("location") ?? ""}`.trim());
    else {
      const xRobots = res.headers.get("x-robots-tag") || "";
      if (/noindex/i.test(xRobots)) problems.push(`X-Robots-Tag ${xRobots}`);
      const html = await res.text();
      const robots = [...html.matchAll(/<meta[^>]+name=["']robots["'][^>]*>/gi)].map((m) => m[0]);
      if (robots.some((tag) => /noindex/i.test(tag))) problems.push("meta noindex");
      const canon = [...html.matchAll(/<link[^>]+rel=["']canonical["'][^>]*>/gi)].map(
        (m) => (m[0].match(/href=["']([^"']+)["']/) || [])[1],
      );
      if (canon.length !== 1 || canon[0] !== loc) problems.push(`canonical ${JSON.stringify(canon)}`);
    }
  }
  if (problems.length) failures.push({ loc, problems });
  console.log(`${problems.length ? "FAIL" : "ok  "} ${loc}${problems.length ? "  " + problems.join("; ") : ""}`);
}
console.log(`\n${entries.length} URLs, ${failures.length} failing`);
process.exit(failures.length ? 1 : 0);
