/**
 * Upload git-removed media to R2 bucket global-mkts-media.
 *
 * Default is a dry run. Pass --execute to put objects.
 * Requires Wrangler auth in the environment. Does not read or write secrets in the repo.
 * Does not deploy Pages.
 *
 *   node --experimental-strip-types scripts/upload-r2-media.ts
 *   node --experimental-strip-types scripts/upload-r2-media.ts --execute
 */
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { R2_MEDIA_OBJECTS, R2_MEDIA_SOURCE_COMMIT } from "../src/lib/r2-media-manifest.ts";

const BUCKET = "global-mkts-media";
const execute = process.argv.includes("--execute");

function gitShow(source: string): Buffer {
  const spec = `${R2_MEDIA_SOURCE_COMMIT}:${source}`;
  const result = spawnSync("git", ["show", spec], { maxBuffer: 1024 * 1024 * 80 });
  if (result.status !== 0) {
    const err = result.stderr.toString("utf8");
    throw new Error(`git show ${spec} failed: ${err}`);
  }
  return result.stdout;
}

let bytes = 0;
const dir = mkdtempSync(join(tmpdir(), "r2-media-"));
try {
  for (const object of R2_MEDIA_OBJECTS) {
    bytes += object.bytes;
    const file = join(dir, "object.bin");
    if (!execute) {
      console.log(`dry-run ${BUCKET}/${object.key} (${object.bytes} bytes, ${object.contentType})`);
      continue;
    }
    writeFileSync(file, gitShow(object.source));
    const put = spawnSync(
      "npx",
      [
        "--yes",
        "wrangler",
        "r2",
        "object",
        "put",
        `${BUCKET}/${object.key}`,
        `--file=${file}`,
        `--content-type=${object.contentType}`,
      ],
      { stdio: "inherit" },
    );
    if (put.status !== 0) {
      throw new Error(`wrangler put failed for ${object.key}`);
    }
  }
} finally {
  rmSync(dir, { recursive: true, force: true });
}

console.log(
  `${execute ? "uploaded" : "would upload"} ${R2_MEDIA_OBJECTS.length} objects, ${bytes} bytes, bucket ${BUCKET}, source ${R2_MEDIA_SOURCE_COMMIT}`,
);
