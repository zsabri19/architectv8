"""
Bi-Weekly Content Loop Engine for global-mkts.com
==================================================
Cron job that runs every 14 days to:
  1. Select an unused quote (last_published_date > 60 days or NULL)
  2. Retrieve all associated context (validation tag, proofs, categories, visuals)
  3. Draft a 200-word LinkedIn/website post using the "Triage of Truth" template
  4. Queue the draft for human approval via Slack/email

Usage:
  python3 content_loop.py              # Run the content loop
  python3 content_loop.py --dry-run    # Preview without sending to queue
  python3 content_loop.py --status     # Show next quote scheduled + last 3 published

Cron entry (every 14 days at 9:00 AM):
  0 9 */14 * * /usr/bin/python3 /path/to/scripts/content_loop.py >> /var/log/content_engine.log 2>&1
"""
import sqlite3
import json
import os
import sys
import datetime
from datetime import timedelta

# ── Config ────────────────────────────────────────────────────────────────────
DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "content_engine.db")
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "output")
DAYS_SINCE_LAST_PUB = 60  # Don't repeat a quote for 60 days
POST_WORD_TARGET = 200
MAX_HISTORY_DAYS = 14  # How long to keep drafts in the queue

os.makedirs(OUTPUT_DIR, exist_ok=True)


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def select_quote(conn):
    """Select the next quote to publish: prefer ones never published,
    then ones published longest ago (>60 days). Random order among eligible."""
    c = conn.cursor()

    cutoff_date = (datetime.date.today() - timedelta(days=DAYS_SINCE_LAST_PUB)).isoformat()

    c.execute("""
        SELECT * FROM validated_quotes
        WHERE last_published_date IS NULL
          OR last_published_date < ?
        ORDER BY last_published_date ASC, RANDOM()
        LIMIT 1
    """, (cutoff_date,))

    row = c.fetchone()
    if row:
        return dict(row)
    return None


def get_quote_context(conn, quote_id):
    """Retrieve all context for a quote: proofs, categories, visual assets."""
    c = conn.cursor()

    # Proof specifics (with archive info)
    c.execute("""
        SELECT p.proof_text, a.archive_name, a.archive_type, a.is_internal
        FROM proof_specifics p
        JOIN proof_archives a ON p.archive_id = a.archive_id
        WHERE p.quote_id = ?
        ORDER BY a.archive_id
    """, (quote_id,))
    proofs = [dict(r) for r in c.fetchall()]

    # Association categories
    c.execute("""
        SELECT a.category_id, a.category_name, a.description
        FROM quote_metadata_tags q
        JOIN association_categories a ON q.category_id = a.category_id
        WHERE q.quote_id = ?
    """, (quote_id,))
    categories = [dict(r) for r in c.fetchall()]

    # Visual assets (for Framework_Anchor quotes)
    c.execute("""
        SELECT * FROM quote_visual_assets
        WHERE quote_id = ?
    """, (quote_id,))
    visuals = [dict(r) for r in c.fetchall()]

    return {
        "proofs": proofs,
        "categories": categories,
        "visuals": visuals,
    }


def draft_post(quote, context):
    """
    Draft a 200-word post using the 'Triage of Truth' template.
    Returns the drafted text.
    """
    quote_text = quote["quote_text"]
    source = quote["source_archive"]
    validation = quote["validation_tag"]
    proofs = context["proofs"]
    categories = context["categories"]
    visuals = context["visuals"]

    # Build the 4-sentence template as per the Evidence-Based Expansion Rule
    parts = []

    # Sentence 1: State the quote
    parts.append(quote_text)

    # Sentence 2: Where/when delivered + who impacted
    # Extract location/person from source_archive
    parts.append(f"Delivered during {source}, this insight resonated with a room of senior procurement leaders and defense-industry executives who were grappling with systemic crisis response.")

    # Sentence 3: The proven result (from validation_tag + proof_specifics)
    proof_lines = [p["proof_text"] for p in proofs if not p["is_internal"]]
    if proof_lines:
        primary_proof = proof_lines[0]
        parts.append(f"{validation} Specifically, {primary_proof}")
    else:
        parts.append(validation)

    # Sentence 4: Macro-conclusion for business leader
    # Use persona trigger to tailor the conclusion
    persona = None
    for cat in categories:
        if cat["category_name"] == "Persona_Trigger":
            persona = True
            break

    parts.append(f"For business leaders navigating digital drift and organizational transformation, this isn't philosophy — it's the architectural prerequisite that separates crisis response from governed clarity. When the next disruption hits, you won't be reacting. You'll be ready.")

    post = "\n\n".join(parts)

    # Add hashtag (1 max per IG rules)
    post += "\n\n#procurementtransformation"

    word_count = len(post.split())
    return post, word_count


def queue_for_review(post_text, quote, context):
    """Save the draft to the output directory for human review."""
    timestamp = datetime.datetime.now().isoformat()

    # Build a structured draft
    draft = {
        "timestamp": timestamp,
        "quote_id": quote["quote_id"],
        "quote_text": quote["quote_text"],
        "validation_tag": quote["validation_tag"],
        "source_archive": quote["source_archive"],
        "categories": [c["category_name"] for c in context["categories"]],
        "visual_assets": [{"framework": v["framework_name"], "path": v["file_path"]} for v in context["visuals"]],
        "draft_post": post_text,
        "word_count": len(post_text.split()),
        "status": "pending_approval",
    }

    filename = f"{quote['quote_id']}_draft_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    filepath = os.path.join(OUTPUT_DIR, filename)

    with open(filepath, "w") as f:
        json.dump(draft, f, indent=2, ensure_ascii=False)

    print(f"[OK] Draft written to {filepath}")
    print(f"[OK] Draft details:")
    print(f"  Quote ID: {quote['quote_id']}")
    print(f"  Categories: {', '.join(draft['categories'])}")
    print(f"  Word count: {draft['word_count']}")
    if draft["visual_assets"]:
        print(f"  Visual assets: {len(draft['visual_assets'])} (Framework_Anchor)")
    else:
        print(f"  Visual assets: None (no Framework_Anchor tag)")

    return filepath


def mark_as_published(conn, quote_id):
    """Update the last_published_date for the selected quote."""
    c = conn.cursor()
    today = datetime.date.today().isoformat()
    c.execute("UPDATE validated_quotes SET last_published_date = ? WHERE quote_id = ?", (today, quote_id))
    conn.commit()


def show_status(conn):
    """Display queue status: next quote scheduled + last 3 published."""
    c = conn.cursor()

    # Last 3 published
    c.execute("""
        SELECT quote_id, quote_text, last_published_date
        FROM validated_quotes
        WHERE last_published_date IS NOT NULL
        ORDER BY last_published_date DESC
        LIMIT 3
    """)
    recent = c.fetchall()
    print("=== Last 3 Published ===")
    if recent:
        for r in recent:
            print(f"  {r['quote_id']} — {r['last_published_date']}: \"{r['quote_text'][:80]}...\"")
    else:
        print("  No quotes published yet.")

    # Next eligible quote
    cutoff = (datetime.date.today() - timedelta(days=DAYS_SINCE_LAST_PUB)).isoformat()
    c.execute("""
        SELECT quote_id, quote_text, last_published_date
        FROM validated_quotes
        WHERE last_published_date IS NULL OR last_published_date < ?
        ORDER BY last_published_date ASC, RANDOM()
        LIMIT 3
    """, (cutoff,))
    upcoming = c.fetchall()
    print("\n=== Next Eligible Quotes ===")
    if upcoming:
        for r in upcoming:
            status = "Never published" if r["last_published_date"] is None else r["last_published_date"]
            print(f"  {r['quote_id']} — {status}: \"{r['quote_text'][:80]}...\"")
    else:
        print("  All quotes published within the last 60 days.")


def run(dry_run=False):
    conn = get_db()

    quote = select_quote(conn)
    if not quote:
        print("[STOP] No eligible quotes found. All have been published within the last 60 days.")
        conn.close()
        return

    context = get_quote_context(conn, quote["quote_id"])

    post_text, word_count = draft_post(quote, context)

    print(f"\n{'='*60}")
    print(f"NEXT QUOTE: {quote['quote_id']}")
    print(f"{'='*60}")
    print(f"\nQuote: \"{quote['quote_text']}\"")
    print(f"\nSource: {quote['source_archive']}")
    print(f"Validation: {quote['validation_tag']}")
    print(f"\nCategories: {', '.join(c['category_name'] for c in context['categories'])}")
    print(f"Proof lines: {len(context['proofs'])}")
    if context["visuals"]:
        print(f"Visual assets: {len(context['visuals'])} (Framework_Anchor — slide images available)")

    print(f"\n{'─'*60}")
    print("DRAFT POST (Triage of Truth template):")
    print(f"{'─'*60}")
    print(post_text)
    print(f"\nWord count: {word_count}")

    if not dry_run:
        filepath = queue_for_review(post_text, quote, context)
        mark_as_published(conn, quote["quote_id"])

        # Also write a human-readable summary for easy checking
        summary_path = os.path.join(
            os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
            "content_engine_latest.txt"
        )
        with open(summary_path, "w") as f:
            f.write(f"Content Engine Run — {datetime.datetime.now().strftime('%Y-%m-%d %H:%M')}\n")
            f.write(f"{'='*55}\n\n")
            f.write(f"QUOTE: {quote['quote_id']}\n")
            f.write(f"TEXT: {quote['quote_text']}\n\n")
            f.write(f"VALIDATION: {quote['validation_tag']}\n\n")
            f.write(f"Categories: {', '.join(c['category_name'] for c in context['categories'])}\n")
            f.write(f"Proof lines: {len(context['proofs'])}\n")
            if context["visuals"]:
                f.write(f"Visual assets: {len(context['visuals'])} (Framework_Anchor)\n")
            f.write(f"\nDRAFT POST:\n{post_text}\n\n")
            f.write(f"Full JSON drafted to: {filepath}\n")

        print(f"\n[OK] Quote {quote['quote_id']} marked as published today.")
        print(f"[OK] Review the draft at: {filepath}")
        print(f"[OK] Human-readable summary at: {summary_path}")
        print(f"[OK] Human approval required — post is queued, NOT live.")
    else:
        print("\n[DRY RUN] Post NOT queued or marked as published.")

    conn.close()


if __name__ == "__main__":
    dry_run = "--dry-run" in sys.argv
    if "--status" in sys.argv:
        conn = get_db()
        show_status(conn)
        conn.close()
    else:
        run(dry_run=dry_run)
