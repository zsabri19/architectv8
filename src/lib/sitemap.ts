import { ARTICLES, BOOK_CHAPTERS, FRAMEWORKS, illustratedChapterHref } from "@/lib/site-data";

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

export function buildSitemapXml(): string {
  const urls = sitemapPaths()
    .map(
      (path) =>
        `  <url>\n    <loc>${SITEMAP_BASE_URL}${path}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
