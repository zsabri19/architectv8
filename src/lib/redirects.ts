/**
 * Canonical host and legacy path redirects.
 * One hop: alias hosts and old paths land on https://global-mkts.com/...
 * The apex is global-mkts.com. www and architect are aliases, not canonical.
 */

export const CANONICAL_HOST = "global-mkts.com";
export const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;

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

/**
 * Placeholder photo filenames → final filenames.
 * Old public URLs 301 to these names (see public/_redirects).
 */
export const PHOTO_RENAMES: Record<string, string> = {
  "ch02-replace with niagra falls - kuw-1986.jpg": "ch02-kuwait-1986.jpg",
  "ch05-add-Dubai 2024 SCM & Procurment Muscles.jpg": "ch05-dubai-2024-scm-procurement.jpg",
  "ch06-add-HUW Bah Subcon.jpg": "ch06-huawei-bahrain-subcon.jpg",
  "ch06-add-huawei-reception-desk.jpg": "ch06-huawei-reception-desk.jpg",
  "ch07-replace with kuwait cricket image.jpg": "ch07-kuwait-cricket.jpg",
  "ch08-add-Huw best mentor award.jpg": "ch08-huawei-best-mentor-award.jpg",
  "ch08-replace with huawei bah day image .jpg": "ch08-huawei-bahrain-2018.jpg",
  "ch11-add-Super labor - site visit-.jpg": "ch11-super-labor-site-visit.jpg",
  "ch14-add-HUW Bah Virtual Farwell (Covid Days).jpg": "ch14-huawei-bahrain-virtual-farewell.jpg",
  "ch14-add-umrah-frnds-2024.jpg": "ch14-umrah-friends-2024.jpg",
  "ch15-add-Children in UK 2023.jpg": "ch15-children-uk-2023.jpg",
};

export function normalizePath(pathname: string): string {
  let path = pathname;
  try {
    path = decodeURIComponent(pathname);
  } catch {
    path = pathname;
  }
  path = path.replace(/\/+$/, "") || "/";
  if (!path.startsWith("/") || path.includes("\\") || path.split("/").includes("..")) {
    return "/";
  }
  return path;
}

function memoirRedirect(path: string): string | null {
  if (path === "/book" || path === "/memoir") return MEMOIR_COVER;
  const alias = BOOK_ALIASES[path];
  if (alias) return alias;
  const chapter = path.match(/^\/book\/chapter-(\d{2}-[a-z0-9-]+)$/);
  if (chapter && MEMOIR_CHAPTERS.has(chapter[1])) return `/memoir/ch-${chapter[1]}.html`;
  if (path.startsWith("/book/")) return MEMOIR_COVER;
  return null;
}

/** /read and /read/<rest> → the /memoir equivalent. public/read is retired. */
export function rewriteRead(path: string): string | null {
  if (path === "/read") return MEMOIR_COVER;
  if (path.startsWith("/read/")) return `/memoir/${path.slice("/read/".length)}`;
  return null;
}

export function rewritePhoto(path: string): string | null {
  const slash = path.lastIndexOf("/");
  if (slash < 0) return null;
  const base = path.slice(slash + 1);
  const renamed = PHOTO_RENAMES[base];
  if (!renamed) return null;
  if (!path.includes("/assets/photos/")) return null;
  return `${path.slice(0, slash + 1)}${renamed}`;
}

/**
 * Absolute URL to 301 to, or null when the request is already canonical.
 * Preserves query string and hash.
 */
export function canonicalRedirectTarget(input: URL | string): string | null {
  const url = typeof input === "string" ? new URL(input) : new URL(input.toString());
  const host = url.hostname.toLowerCase();
  const path = normalizePath(url.pathname);

  let next = path;
  const read = rewriteRead(next);
  if (read) next = read;
  const photo = rewritePhoto(next);
  if (photo) next = photo;
  const legacy = memoirRedirect(next) ?? LEGACY_PATHS[next];
  if (legacy) next = legacy;

  const hostNeedsCanonical = ALIAS_HOSTS.has(host);
  const pathChanged = next !== path;
  if (!hostNeedsCanonical && !pathChanged) return null;

  const out = new URL(url.toString());
  out.hostname = CANONICAL_HOST;
  out.protocol = "https:";
  out.port = "";
  out.pathname = next;
  return out.toString();
}
