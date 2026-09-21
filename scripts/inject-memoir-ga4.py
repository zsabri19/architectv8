#!/usr/bin/env python3
"""Inject GA4 (G-Z9BFJP96Q4) into every public/memoir/*.html head.

Idempotent: replaces an existing <!-- gmt-ga4 --> block if present.
Matches the React shell bootstrap in src/routes/__root.tsx.
"""
from pathlib import Path

GA_SNIPPET = """<!-- gmt-ga4:start -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-Z9BFJP96Q4"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-Z9BFJP96Q4');
  </script>
<!-- gmt-ga4:end -->
"""

MARKER_START = "<!-- gmt-ga4:start -->"
MARKER_END = "<!-- gmt-ga4:end -->"

def main() -> None:
    memoir_dir = Path(__file__).resolve().parents[1] / "public" / "memoir"
    files = sorted(memoir_dir.glob("*.html"))
    updated = 0
    for path in files:
        text = path.read_text(encoding="utf-8")
        if MARKER_START in text and MARKER_END in text:
            start = text.index(MARKER_START)
            end = text.index(MARKER_END) + len(MARKER_END)
            if end < len(text) and text[end] == "\n":
                end += 1
            text = text[:start] + GA_SNIPPET + text[end:]
            path.write_text(text, encoding="utf-8")
            updated += 1
            continue
        if "G-Z9BFJP96Q4" in text:
            continue
        idx = text.lower().rfind("</head>")
        if idx == -1:
            raise SystemExit(f"no </head> in {path}")
        path.write_text(text[:idx] + GA_SNIPPET + text[idx:], encoding="utf-8")
        updated += 1
    print(f"updated {updated}/{len(files)} memoir HTML files")

if __name__ == "__main__":
    main()
