#!/usr/bin/env python3
"""Download the 4 remaining assets from Lovable CDN (v6old asset IDs) under the
v8 manifest original_filenames, then rewrite those manifests' url to local paths."""
import json, urllib.request
from pathlib import Path

ROOT = Path.cwd()
PUBLIC_ASSETS = ROOT / "public" / "assets"
CDN = "https://zsabri.lovable.app"

# (v8 manifest name, v6old asset_id, v6old cdn filename)
FIXES = [
    ("logo-huawei.png.asset.json", "4597c497-3d39-435b-ba83-b0e86d97cfa5", "huawei.png"),
    ("logo-cips.png.asset.json",   "fe0b3cd9-0e2b-4367-a8a1-72a868a50dc4", "cips.png"),
    ("portrait-3.jpg.asset.json",  "cef01e59-2070-4653-9e63-0421d6a5564f", "portrait-3.jpg"),
    ("cert-aicerts.pdf.asset.json","c3d723c3-e8dd-4fda-a9b5-ce69c363fd03", "aicerts-certified-trainer.pdf"),
]

for manifest_name, asset_id, cdn_filename in FIXES:
    mf_path = ROOT / "src" / "assets" / manifest_name
    data = json.loads(mf_path.read_text())
    local_name = data.get("original_filename") or cdn_filename
    dest = PUBLIC_ASSETS / local_name
    remote = f"{CDN}/__l5e/assets-v1/{asset_id}/{cdn_filename}"
    req = urllib.request.Request(remote, headers={"User-Agent": "curl/8"})
    with urllib.request.urlopen(req, timeout=60) as r:
        body = r.read()
    dest.write_bytes(body)
    data["url"] = f"/assets/{local_name}"
    mf_path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
    print(f"ok {manifest_name} -> /assets/{local_name} ({len(body):,} bytes)")
print("done")
