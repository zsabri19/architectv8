"""Extract chapter prose from Final Draft 1 HTML into src/lib/memoir/bodies.ts"""
from __future__ import annotations

import json
import re
from pathlib import Path

SRC = Path(r"C:\Users\zsabr\OneDrive\Documents\From-Exile-to-Transformation-FINAL")
OUT = Path(r"C:\Users\zsabr\architectv8-clone\src\lib\memoir\bodies.ts")

FILES = [
    ("prologue", "prologue.html"),
    *[(str(i), f"ch-{i:02d}-" ) for i in range(1, 17)],
    ("epilogue", "epilogue.html"),
]


def find_chapter_file(prefix: str) -> Path:
    if prefix.endswith(".html"):
        return SRC / prefix
    matches = sorted(SRC.glob(f"{prefix}*.html"))
    if not matches:
        raise FileNotFoundError(prefix)
    return matches[0]


def strip_tags(html: str) -> str:
    text = re.sub(r"<br\s*/?>", "\n", html, flags=re.I)
    text = re.sub(r"</p>", "\n", text, flags=re.I)
    text = re.sub(r"<[^>]+>", "", text)
    text = (
        text.replace("&amp;", "&")
        .replace("&nbsp;", " ")
        .replace("&ldquo;", "“")
        .replace("&rdquo;", "”")
        .replace("&lsquo;", "‘")
        .replace("&rsquo;", "’")
        .replace("&mdash;", "—")
        .replace("&ndash;", "–")
        .replace("&hellip;", "…")
        .replace("&quot;", '"')
    )
    return re.sub(r"\n{3,}", "\n\n", text).strip()


def extract_blocks(html: str) -> list[dict[str, str]]:
    main = re.search(r"<main class=\"chapter\">([\s\S]*?)</main>", html)
    body = main.group(1) if main else html
    start = body.find('<div class="prose">')
    end_candidates = [
        body.find('<aside class="spotlight">'),
        body.find('<nav class="foot-nav">'),
        len(body),
    ]
    end = min(i for i in end_candidates if i != -1)
    inner = body[start:end] if start != -1 else body
    epigraph = re.search(
        r"<blockquote class=\"epigraph\">([\s\S]*?)</blockquote>", body
    )
    blocks: list[dict[str, str]] = []
    if epigraph:
        quote = re.sub(r"<cite>[\s\S]*?</cite>", "", epigraph.group(1))
        cite = re.search(r"<cite>([\s\S]*?)</cite>", epigraph.group(1))
        q = strip_tags(quote)
        if q:
            item = {"type": "epigraph", "text": q}
            if cite:
                item["cite"] = strip_tags(cite.group(1))
            blocks.append(item)
    for m in re.finditer(
        r"<h2>([\s\S]*?)</h2>|<div class=\"pullquote\">([\s\S]*?)</div>|<p>([\s\S]*?)</p>",
        inner,
    ):
        if m.group(1) is not None:
            blocks.append({"type": "h2", "text": strip_tags(m.group(1))})
        elif m.group(2) is not None:
            text = strip_tags(m.group(2))
            if text:
                blocks.append({"type": "epigraph", "text": text})
        else:
            text = strip_tags(m.group(3))
            if text:
                blocks.append({"type": "p", "text": text})
    return blocks


def ts_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def main() -> None:
    chapters: dict[str, list[dict[str, str]]] = {}
    for key, prefix in FILES:
        path = find_chapter_file(prefix)
        blocks = extract_blocks(path.read_text(encoding="utf-8"))
        words = sum(len(b["text"].split()) for b in blocks)
        print(f"{key:10} {path.name:42} blocks={len(blocks):2} words={words:4}")
        chapters[key] = blocks

    lines = [
        "/** Auto-generated from Final Draft 1 HTML. Do not edit by hand. */",
        "export type MemoirBlock = { type: \"p\" | \"h2\" | \"epigraph\"; text: string; cite?: string };",
        "export const MEMOIR_BODIES: Record<string, MemoirBlock[]> = {",
    ]
    for key, blocks in chapters.items():
        lines.append(f"  {json.dumps(key)}: [")
        for b in blocks:
            cite = f", cite: {ts_string(b['cite'])}" if "cite" in b else ""
            lines.append(
                f"    {{ type: {ts_string(b['type'])}, text: {ts_string(b['text'])}{cite} }},"
            )
        lines.append("  ],")
    lines.append("};")
    lines.append("")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
