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
const LEGACY_PATHS: Record<string, string> = {
  "/advisory": "/connect",
  "/architect": "/the-architect",
  "/memoir": "/book",
  "/dispatch": "/newsletter",
  "/executive-profile": "/the-architect",
  "/book/chapter-02-the-gulf-war-and-what-it-took": "/book/chapter-02-the-gulf-war",
  "/book/chapter-03-learning-to-rebuild": "/book/chapter-03-return-and-reinvention",
  "/book/chapter-04-entering-the-fortune-500": "/book/chapter-04-breaking-into-the-room",
  "/book/chapter-05-procurement-as-power": "/book/chapter-05-governance-as-runway",
  "/book/chapter-06-governance-lessons-in-glass-towers":
    "/book/chapter-06-the-constraint-advantage",
  "/book/chapter-07-arriving-in-the-gulf": "/book/chapter-09-reading-cultures",
  "/book/chapter-08-the-oman-years": "/book/chapter-12-digital-nation-building",
  "/book/chapter-09-the-pyramid-a-framework-for-everything": "/book/chapter-07-the-pyramid",
  "/book/chapter-11-constraint-as-catalyst": "/book/chapter-06-the-constraint-advantage",
  "/book/chapter-13-ai-and-the-governance-gap": "/book/chapter-13-ai-as-interpreter",
  "/book/chapter-15-from-exile-to-transformation": "/book/chapter-16-the-mirror",
};

function redirectAliasHost(request: Request): Response | null {
  const url = new URL(request.url);
  const host = url.hostname.toLowerCase();
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const legacy = LEGACY_PATHS[path];
  const hostNeedsCanonical = ALIAS_HOSTS.has(host);

  if (!hostNeedsCanonical && !legacy) return null;

  url.hostname = CANONICAL_HOST;
  url.protocol = "https:";
  url.port = "";
  if (legacy) url.pathname = legacy;
  return Response.redirect(url.toString(), 301);
}

// The memoir ships as a self-contained static reading experience under /book/.
// Old indexed chapter URLs (/book/chapter-NN-slug) are forwarded to the static
// chapter pages, and a bare /book is sent to the reader index so relative asset
// paths resolve. Static files (/book/index.html, /book/ch-*.html, /book/assets/*)
// pass straight through to the asset handler.
function redirectLegacyBookToMemoir(request: Request): Response | null {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";

  const chapterMatch = path.match(/^\/book\/chapter-(\d+)-(.+)$/);
  if (chapterMatch) {
    const num = chapterMatch[1].padStart(2, "0");
    url.pathname = `/book/ch-${num}-${chapterMatch[2]}.html`;
    return Response.redirect(url.toString(), 301);
  }

  if (path === "/book") {
    url.pathname = "/book/index.html";
    return Response.redirect(url.toString(), 301);
  }

  return null;
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const aliasRedirect = redirectAliasHost(request);
      if (aliasRedirect) return aliasRedirect;
      const bookRedirect = redirectLegacyBookToMemoir(request);
      if (bookRedirect) return bookRedirect;
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
