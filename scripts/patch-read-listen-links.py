from pathlib import Path

root = Path(__file__).resolve().parents[1] / "public" / "read"
repl = {
    "listen-prologue.html": "https://listen.global-mkts.com/prologue/",
    "listen-epilogue.html": "https://listen.global-mkts.com/epilogue/",
}
for i in range(1, 17):
    repl[f"listen-{i:02d}.html"] = f"https://listen.global-mkts.com/{i}/"

for path in root.glob("*.html"):
    text = path.read_text(encoding="utf-8")
    original = text
    for src, dest in repl.items():
        text = text.replace(f'href="{src}"', f'href="{dest}" target="_blank" rel="noopener"')
    if text != original:
        path.write_text(text, encoding="utf-8")
        print("patched", path.name)
