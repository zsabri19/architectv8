import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

const CANONICAL_HOST = "global-mkts.com";
const ALIAS_HOSTS = new Set(["www.global-mkts.com", "architect.global-mkts.com"]);
const MEMOIR_COVER = "/memoir/index.html";

const LEGACY_PATHS: Record<string, string> = {
  "/advisory": "/connect",
  "/architect": "/the-architect",
  "/dispatch": "/newsletter",
  "/executive-profile": "/the-architect",
  // GSC: /index.html 404s — land on apex home on every host.
  "/index.html": "/",
  // Old 1.4MB cover hotlinks → compressed jpg (~154KB).
  "/assets/cover.png": "/assets/cover.jpg",
};

// Same destinations already used by the old aliases, now the static chapters.
const BOOK_ALIASES: Record<string, string> = {
  "/book/chapter-02-the-gulf-war-and-what-it-took": "/memoir/ch-02-the-gulf-war.html",
  "/book/chapter-03-learning-to-rebuild": "/memoir/ch-03-return-and-reinvention.html",
  "/book/chapter-04-entering-the-fortune-500": "/memoir/ch-04-breaking-into-the-room.html",
  "/book/chapter-05-procurement-as-power": "/memoir/ch-05-governance-as-runway.html",
  "/book/chapter-06-governance-lessons-in-glass-towers":
    "/memoir/ch-06-the-constraint-advantage.html",
  "/book/chapter-07-arriving-in-the-gulf": "/memoir/ch-09-reading-cultures.html",
  "/book/chapter-08-the-oman-years": "/memoir/ch-12-digital-nation-building.html",
  "/book/chapter-09-the-pyramid-a-framework-for-everything": "/memoir/ch-07-the-pyramid.html",
  "/book/chapter-11-constraint-as-catalyst": "/memoir/ch-06-the-constraint-advantage.html",
  "/book/chapter-13-ai-and-the-governance-gap": "/memoir/ch-13-ai-as-interpreter.html",
  "/book/chapter-15-from-exile-to-transformation": "/memoir/ch-16-the-mirror.html",
};

const MEMOIR_CHAPTERS = new Set([
  "01-born-between-worlds",
  "02-the-gulf-war",
  "03-return-and-reinvention",
  "04-breaking-into-the-room",
  "05-governance-as-runway",
  "06-the-constraint-advantage",
  "07-the-pyramid",
  "08-reframing-the-people",
  "09-reading-cultures",
  "10-building-authority",
  "11-super-labor",
  "12-digital-nation-building",
  "13-ai-as-interpreter",
  "14-the-character-compass",
  "15-letters-to-my-daughters",
  "16-the-mirror",
]);

function memoirRedirect(path: string): string | null {
  if (path === "/book" || path === "/memoir") return MEMOIR_COVER;
  // /read/ was a duplicate copy of the memoir pages (no canonical). Pages only, not /read/assets/*.
  if (path === "/read" || path === "/read/index.html") return MEMOIR_COVER;
  const readPage = path.match(/^\/read\/([a-z0-9-]+\.html)$/);
  if (readPage) return `/memoir/${readPage[1]}`;
  const alias = BOOK_ALIASES[path];
  if (alias) return alias;
  const chapter = path.match(/^\/book\/chapter-(\d{2}-[a-z0-9-]+)$/);
  if (chapter && MEMOIR_CHAPTERS.has(chapter[1])) return `/memoir/ch-${chapter[1]}.html`;
  if (path.startsWith("/book/")) return MEMOIR_COVER;
  return null;
}

// Static trees keep their own URL shape (/memoir/ serves the cover; files are .html).
const SLASH_EXEMPT_PREFIXES = ["/memoir/", "/read/", "/assets/", "/.well-known/", "/.mcp/"];

function redirectAliasHost(request: Request): Response | null {
  const url = new URL(request.url);
  const host = url.hostname.toLowerCase();
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const legacy = memoirRedirect(path) ?? LEGACY_PATHS[path];
  const hostNeedsCanonical = ALIAS_HOSTS.has(host);

  // React routes are canonical without a trailing slash. Without this, TanStack answers
  // "/insights/" with a 307. Fold it into the same single 301 as host/legacy fixes.
  const trailingSlash =
    url.pathname !== path &&
    path !== "/" &&
    !SLASH_EXEMPT_PREFIXES.some((prefix) => url.pathname.startsWith(prefix));

  // robots.txt and sitemap.xml are served by this worker (not static assets), so www 301s them too.
  if (!hostNeedsCanonical && !legacy && !trailingSlash) return null;

  // Only rewrite the host for our own alias hosts. Preview/pages.dev hosts keep their host
  // so a preview never bounces to production for a path fix.
  if (hostNeedsCanonical) {
    url.hostname = CANONICAL_HOST;
    url.protocol = "https:";
    url.port = "";
  }
  url.pathname = legacy ?? (trailingSlash ? path : url.pathname);
  return Response.redirect(url.toString(), 301);
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const aliasRedirect = redirectAliasHost(request);
      if (aliasRedirect) return aliasRedirect;

      const pathname = new URL(request.url).pathname.replace(/\/+$/, "") || "/";
      if (pathname === "/robots.txt") {
        return new Response(
          // /cdn-cgi/ is Cloudflare's own path (email-obfuscation links 404 for crawlers).
          "User-agent: *\nAllow: /\nDisallow: /cdn-cgi/\n\nSitemap: https://global-mkts.com/sitemap.xml\n",
          {
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
              "Cache-Control": "public, max-age=3600",
            },
          },
        );
      }
      if (pathname === "/sitemap.xml") {
        const { buildSitemapXml } = await import("./lib/sitemap");
        return new Response(buildSitemapXml(), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
