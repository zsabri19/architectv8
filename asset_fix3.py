#!/usr/bin/env python3
"""Download the 5 remaining portraits from Lovable CDN (v6old asset IDs)
under the v8 filenames. Their manifests already point at /assets/<name>."""
import urllib.request
from pathlib import Path

PUBLIC_ASSETS = Path.cwd() / "public" / "assets"
CDN = "https://zsabri.lovable.app"

FIXES = [
    ("portrait-1.jpg", "73e4f40b-33fe-4299-b38b-027adcdd432e"),
    ("portrait-2.jpg", "2a09450a-405e-42bd-a6a2-7a06956167df"),
    ("portrait-4.jpg", "b0810119-8d2a-4de9-b940-32396016e7d0"),
    ("portrait-5.jpg", "653dace3-36c6-4bdc-83e3-9a07a68d8074"),
    ("portrait-6.jpg", "699addcd-d6ec-4086-9e22-58c26a6a8947"),
]

for fname, asset_id in FIXES:
    dest = PUBLIC_ASSETS / fname
    remote = f"{CDN}/__l5e/assets-v1/{asset_id}/{fname}"
    req = urllib.request.Request(remote, headers={"User-Agent": "curl/8"})
    with urllib.request.urlopen(req, timeout=60) as r:
        body = r.read()
    dest.write_bytes(body)
    print(f"ok {fname} ({len(body):,} bytes)")
print("done")
