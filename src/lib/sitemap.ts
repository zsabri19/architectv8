import { ARTICLES, BOOK_CHAPTERS, FRAMEWORKS, illustratedChapterHref } from "@/lib/site-data";
import { isoDate } from "@/lib/seo";

export const SITEMAP_BASE_URL = "https://global-mkts.com";

/** Final HTTP 200 memoir paths (canonical). Keep /book-a-session; omit redirecting /book/*. */
function memoirPaths(): string[] {
  const chapters = BOOK_CHAPTERS.map((c) => illustratedChapterHref(c));
  return [
    "/memoir/index.html",
    "/memoir/prologue.html",
    ...chapters,
    "/memoir/epilogue.html",
    "/memoir/appendix.html",
    // Public listen hub: indexable (self-canonical). The per-chapter listen-NN players stay noindex.
    "/memoir/listen.html",
  ];
}

/** Public, indexable routes declared by robots.txt via /sitemap.xml. */
export function sitemapPaths(): string[] {
  const staticPaths = [
    "/",
    "/the-architect",
    "/clarityos",
    "/frameworks",
    "/services",
    "/insights",
    "/media",
    "/newsletter",
    "/connect",
    "/book-a-session",
    "/organizational-development",
    "/executive-coaching",
    "/personal-development-framework",
    "/press",
    "/privacy",
  ];
  const frameworkPaths = FRAMEWORKS.map((f) => `/frameworks/${f.slug}`);
  const articlePaths = ARTICLES.map((a) => `/insights/${a.slug}`);
  return [...staticPaths, ...frameworkPaths, ...memoirPaths(), ...articlePaths];
}

/**
 * Last content change for pages without their own date (W3C Datetime, YYYY-MM-DD).
 * Bump this when page copy changes. Do not use the request date: a lastmod that is
 * always "today" tells crawlers nothing.
 */
export const SITE_LASTMOD = "2026-10-03";

/** W3C Datetime date (YYYY-MM-DD) for <lastmod>. */
export function sitemapLastmod(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

/** Per-URL lastmod: insights use their own published date (month precision); other pages use SITE_LASTMOD. */
export function lastmodFor(path: string, fallback = SITE_LASTMOD): string {
  const insight = path.match(/^\/insights\/([^/]+)$/);
  if (insight) {
    const article = ARTICLES.find((a) => a.slug === insight[1]);
    const published = isoDate(article?.date);
    if (published) return published;
  }
  return fallback;
}

export function buildSitemapXml(fallback = SITE_LASTMOD): string {
  const urls = sitemapPaths()
    .map(
      (path) =>
        `  <url>\n    <loc>${SITEMAP_BASE_URL}${path}</loc>\n    <lastmod>${lastmodFor(path, fallback)}</lastmod>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
