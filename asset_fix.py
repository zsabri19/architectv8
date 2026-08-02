#!/usr/bin/env python3
"""Phase-1 asset fix: download all Lovable CDN binaries into public/assets/
and rewrite each .asset.json manifest's url to a local /assets/<filename> path.

Usage: python3 asset_fix.py
Run from /Users/zsabri/Architect-final/Clarity Architectv8
"""
import json, os, sys, urllib.request
from pathlib import Path

ROOT = Path.cwd()
SRC_ASSETS = ROOT / "src" / "assets"
PUBLIC_ASSETS = ROOT / "public" / "assets"
CDN_HOST = "https://zsabri.lovable.app"

PUBLIC_ASSETS.mkdir(parents=True, exist_ok=True)

manifests = sorted(SRC_ASSETS.glob("*.asset.json"))
print(f"Found {len(manifests)} asset manifests")

downloaded, skipped, failed, collided = [], [], [], []
seen = {}

for mf in manifests:
    try:
        data = json.loads(mf.read_text())
    except Exception as e:
        failed.append((mf.name, f"json: {e}"))
        continue
    url = data.get("url", "")
    fname = data.get("original_filename", "")
    asset_id = data.get("asset_id", "")
    if not url or not fname:
        skipped.append((mf.name, "no url/filename"))
        continue

    # collision check
    if fname in seen:
        collided.append((mf.name, f"duplicate filename with {seen[fname]}"))
        continue
    seen[fname] = mf.name

    dest = PUBLIC_ASSETS / fname
    remote = CDN_HOST + url
    try:
        req = urllib.request.Request(remote, headers={"User-Agent": "curl/8"})
        with urllib.request.urlopen(req, timeout=60) as r:
            body = r.read()
            if r.status != 200 or len(body) == 0:
                failed.append((mf.name, f"HTTP {r.status} size {len(body)}"))
                continue
        dest.write_bytes(body)
        downloaded.append((fname, len(body), asset_id))
    except Exception as e:
        failed.append((mf.name, f"download: {e}"))
        continue

    # rewrite manifest url to local path
    data["url"] = f"/assets/{fname}"
    mf.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
    print(f"  ok  {fname} ({len(body):,} bytes) <- {asset_id}")

print("\n=== SUMMARY ===")
print(f"downloaded: {len(downloaded)}")
print(f"skipped:    {len(skipped)}")
print(f"collided:   {len(collided)}")
print(f"failed:     {len(failed)}")
for f in failed:
    print("  FAIL:", f)
total = sum(s for _, s, _ in downloaded)
print(f"total bytes: {total:,} ({total/1e6:.1f} MB)")
sys.exit(1 if failed else 0)
