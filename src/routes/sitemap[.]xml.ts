import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { FRAMEWORKS, BOOK_CHAPTERS, ARTICLES } from "@/lib/site-data";


const BASE_URL = "https://global-mkts.com";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          "/", "/the-architect", "/clarityos", "/book", "/frameworks",
          "/services", "/insights", "/media", "/newsletter", "/connect",
          "/book-a-session", "/organizational-development", "/executive-coaching",
          "/personal-development-framework", "/press", "/privacy",
        ];

        const frameworkPaths = FRAMEWORKS.map((f) => `/frameworks/${f.slug}`);
        const chapterPaths = BOOK_CHAPTERS.map(
          (c) => `/book/chapter-${String(c.number).padStart(2, "0")}-${c.slug}`
        );
        const articlePaths = ARTICLES.map((a) => `/insights/${a.slug}`);

        const urls = [...staticPaths, ...frameworkPaths, ...chapterPaths, ...articlePaths]
          .map(
            (p) => `  <url>\n    <loc>${BASE_URL}${p}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
