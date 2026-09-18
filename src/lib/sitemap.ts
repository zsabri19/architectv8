import { ARTICLES, BOOK_CHAPTERS, FRAMEWORKS, chapterPath } from "@/lib/site-data";

export const SITEMAP_BASE_URL = "https://global-mkts.com";

/** Public, indexable routes declared by robots.txt via /sitemap.xml. */
export function sitemapPaths(): string[] {
  const staticPaths = [
    "/",
    "/the-architect",
    "/clarityos",
    "/book",
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
  const chapterPaths = BOOK_CHAPTERS.map((c) => `/book/${chapterPath(c)}`);
  const articlePaths = ARTICLES.map((a) => `/insights/${a.slug}`);
  return [...staticPaths, ...frameworkPaths, ...chapterPaths, ...articlePaths];
}

export function buildSitemapXml(): string {
  const urls = sitemapPaths()
    .map(
      (p) =>
        `  <url>\n    <loc>${SITEMAP_BASE_URL}${p}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
