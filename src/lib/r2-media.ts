import { R2_MEDIA_OBJECTS } from "./r2-media-manifest.ts";

/** Pages project version-7 binding name. Bucket: global-mkts-media. See docs/media-r2.md. */
export const R2_MEDIA_BINDING = "MEDIA";

export const R2_MEDIA_KEYS: ReadonlySet<string> = new Set(
  R2_MEDIA_OBJECTS.map((object) => object.key),
);

type R2Range = { offset: number; length: number };

type R2ObjectBody = {
  body: ReadableStream;
  size: number;
  httpMetadata?: { contentType?: string };
  range?: { offset?: number; length?: number };
};

type R2Bucket = {
  head(key: string): Promise<R2ObjectBody | null>;
  get(key: string, options?: { range?: R2Range }): Promise<R2ObjectBody | null>;
};

const CONTENT_TYPES: Record<string, string> = {
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".wav": "audio/wav",
  ".pdf": "application/pdf",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

export function contentTypeForKey(key: string, fromObject?: string): string {
  if (fromObject) return fromObject;
  if (key.endsWith(".spoken.js")) return "text/javascript; charset=utf-8";
  if (key.endsWith(".spoken.json")) return "application/json; charset=utf-8";
  const dot = key.lastIndexOf(".");
  const ext = dot >= 0 ? key.slice(dot).toLowerCase() : "";
  return CONTENT_TYPES[ext] ?? "application/octet-stream";
}

export function cacheControlForKey(key: string): string {
  if (key.startsWith("assets/")) return "public, max-age=31536000, immutable";
  return "public, max-age=86400";
}

function mediaKey(pathname: string): string | null {
  let path = pathname;
  try {
    path = decodeURIComponent(pathname);
  } catch {
    path = pathname;
  }
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  if (!path.startsWith("/") || path.includes("\\") || path.split("/").includes("..")) return null;
  const key = path.slice(1);
  return R2_MEDIA_KEYS.has(key) ? key : null;
}

function parseSingleRange(header: string, size: number): R2Range | "unsatisfiable" | null {
  if (header.includes(",")) return null;
  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match) return null;
  const startText = match[1] ?? "";
  const endText = match[2] ?? "";
  if (startText === "" && endText === "") return null;
  if (size <= 0) return "unsatisfiable";

  if (startText === "") {
    const suffix = Number(endText);
    if (!Number.isFinite(suffix) || suffix <= 0) return "unsatisfiable";
    const length = Math.min(suffix, size);
    return { offset: size - length, length };
  }

  const offset = Number(startText);
  if (!Number.isFinite(offset) || offset < 0 || offset >= size) return "unsatisfiable";
  const end = endText === "" ? size - 1 : Number(endText);
  if (!Number.isFinite(end) || end < offset) return "unsatisfiable";
  const last = Math.min(end, size - 1);
  return { offset, length: last - offset + 1 };
}

function bucketFrom(env: unknown): R2Bucket | null {
  if (!env || typeof env !== "object") return null;
  const candidate = (env as { MEDIA?: R2Bucket }).MEDIA;
  if (!candidate || typeof candidate.head !== "function" || typeof candidate.get !== "function") {
    return null;
  }
  return candidate;
}

/**
 * Serve a git-removed media object from the MEDIA R2 binding.
 * Returns null when the path is not an offloaded object (caller continues).
 * 503 when the binding is missing — do not deploy until docs/media-r2.md is done.
 */
export async function serveR2Media(request: Request, env: unknown): Promise<Response | null> {
  const key = mediaKey(new URL(request.url).pathname);
  if (!key) return null;

  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response(null, { status: 405, headers: { allow: "GET, HEAD" } });
  }

  const bucket = bucketFrom(env);
  if (!bucket) {
    return new Response("Media object is not available yet.\n", {
      status: 503,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  }

  const head = await bucket.head(key);
  if (!head) {
    return new Response("Media object is missing.\n", {
      status: 404,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  }

  const headers = new Headers();
  headers.set("content-type", contentTypeForKey(key, head.httpMetadata?.contentType));
  headers.set("accept-ranges", "bytes");
  headers.set("cache-control", cacheControlForKey(key));
  headers.set("x-content-type-options", "nosniff");

  const rangeHeader = request.headers.get("range");
  const parsed = rangeHeader ? parseSingleRange(rangeHeader, head.size) : null;

  if (parsed === "unsatisfiable") {
    headers.set("content-range", `bytes */${head.size}`);
    headers.set("content-length", "0");
    return new Response(null, { status: 416, headers });
  }

  if (request.method === "HEAD" && !parsed) {
    headers.set("content-length", String(head.size));
    return new Response(null, { status: 200, headers });
  }

  const object = parsed ? await bucket.get(key, { range: parsed }) : await bucket.get(key);
  if (!object) {
    return new Response("Media object is missing.\n", {
      status: 404,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  }

  if (parsed) {
    const offset = object.range?.offset ?? parsed.offset;
    const length = object.range?.length ?? parsed.length;
    headers.set("content-length", String(length));
    headers.set("content-range", `bytes ${offset}-${offset + length - 1}/${head.size}`);
    if (request.method === "HEAD") return new Response(null, { status: 206, headers });
    return new Response(object.body, { status: 206, headers });
  }

  headers.set("content-length", String(object.size || head.size));
  return new Response(object.body, { status: 200, headers });
}
