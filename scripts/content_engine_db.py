"""
Content Engine Database Schema for global-mkts.com
===================================================
Builds the SQLite database that powers the bi-weekly evidence-backed content loop.

Tables:
  - validated_quotes: The 10 canonical Zeeshan Sabri quotes with validation tags
  - proof_archives: The 3 source archives (NCMS Curriculum, Philosophy Vault, Human OS)
  - proof_specifics: Individual proof lines linking quotes to archives
  - association_categories: 5 tagging categories (Framework_Anchor, Persona_Trigger, etc.)
  - quote_metadata_tags: Bridge table linking quotes to categories (many-to-many)
  - quote_visual_assets: Pre-loaded slide images for Framework_Anchor quotes

Usage:
  python3 content_engine_db.py          # Create + seed the database
  python3 content_engine_db.py --reset  # Drop + recreate everything
"""
import sqlite3
import json
import os
import sys

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "content_engine.db")


def create_schema(conn):
    """Create all tables with proper constraints and indexes."""
    c = conn.cursor()

    # ── validated_quotes ──────────────────────────────────────────────────────
    c.execute("""
        CREATE TABLE IF NOT EXISTS validated_quotes (
            quote_id      TEXT PRIMARY KEY,      -- e.g., 'Q1', 'Q2', ...
            quote_text    TEXT NOT NULL,         -- The full quote
            source_archive TEXT NOT NULL,        -- e.g., "Archive 2 (NCMS Workshop)"
            validation_tag TEXT NOT NULL,        -- Full validation sentence
            last_published_date TEXT,            -- ISO date, NULL if never published
            created_at    TEXT DEFAULT (datetime('now'))
        )
    """)

    # ── proof_archives ────────────────────────────────────────────────────────
    c.execute("""
        CREATE TABLE IF NOT EXISTS proof_archives (
            archive_id   TEXT PRIMARY KEY,        -- e.g., 'ARCHIVE_1', 'ARCHIVE_2', 'ARCHIVE_3'
            archive_name TEXT NOT NULL,           -- Human-readable name
            archive_type TEXT NOT NULL,           -- 'Course_Curriculum', 'Philosophy_Vault', 'HumanOS_CaseStudy'
            file_path    TEXT,                    -- Path or URL to the raw archive
            description  TEXT,
            is_internal  INTEGER DEFAULT 0,        -- Archive 3 = internal only (1)
            created_at   TEXT DEFAULT (datetime('now'))
        )
    """)

    # ── proof_specifics ───────────────────────────────────────────────────────
    c.execute("""
        CREATE TABLE IF NOT EXISTS proof_specifics (
            proof_id    INTEGER PRIMARY KEY AUTOINCREMENT,
            quote_id    TEXT NOT NULL,
            archive_id  TEXT NOT NULL,
            proof_text  TEXT NOT NULL,            -- The specific proof line
            FOREIGN KEY (quote_id) REFERENCES validated_quotes(quote_id) ON DELETE CASCADE,
            FOREIGN KEY (archive_id) REFERENCES proof_archives(archive_id) ON DELETE CASCADE,
            UNIQUE(quote_id, archive_id, proof_text)
        )
    """)

    # ── association_categories ────────────────────────────────────────────────
    c.execute("""
        CREATE TABLE IF NOT EXISTS association_categories (
            category_id   TEXT PRIMARY KEY,       -- e.g., 'CAT1', 'CAT2', ...
            category_name TEXT NOT NULL,          -- e.g., 'Framework_Anchor'
            description   TEXT,
            use_case      TEXT,
            created_at    TEXT DEFAULT (datetime('now'))
        )
    """)

    # ── quote_metadata_tags (bridge table) ────────────────────────────────────
    c.execute("""
        CREATE TABLE IF NOT EXISTS quote_metadata_tags (
            quote_id     TEXT NOT NULL,
            category_id  TEXT NOT NULL,
            PRIMARY KEY (quote_id, category_id),
            FOREIGN KEY (quote_id) REFERENCES validated_quotes(quote_id) ON DELETE CASCADE,
            FOREIGN KEY (category_id) REFERENCES association_categories(category_id) ON DELETE CASCADE
        )
    """)

    # ── quote_visual_assets ──────────────────────────────────────────────────
    c.execute("""
        CREATE TABLE IF NOT EXISTS quote_visual_assets (
            asset_id       TEXT PRIMARY KEY,       -- e.g., 'VIS_CBS_01'
            quote_id       TEXT NOT NULL,
            framework_name TEXT,                   -- e.g., 'CBS', 'TCO', '4-Phase Model'
            file_path      TEXT NOT NULL,         -- Path to the slide/image file
            alt_text       TEXT,
            FOREIGN KEY (quote_id) REFERENCES validated_quotes(quote_id) ON DELETE CASCADE
        )
    """)

    # ── Indexes for performance ───────────────────────────────────────────────
    c.execute("CREATE INDEX IF NOT EXISTS idx_quotes_last_pub ON validated_quotes(last_published_date)")
    c.execute("CREATE INDEX IF NOT EXISTS idx_proof_quote ON proof_specifics(quote_id)")
    c.execute("CREATE INDEX IF NOT EXISTS idx_tags_category ON quote_metadata_tags(category_id)")
    c.execute("CREATE INDEX IF NOT EXISTS idx_assets_quote ON quote_visual_assets(quote_id)")

    conn.commit()
    print("[OK] Schema created successfully.")


def load_seed_data():
    """Load the JSON asset data with all 10 quotes, archives, categories, and proofs."""

    script_dir = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(script_dir, "references", "content-engine-schema.json")

    if not os.path.exists(json_path):
        # Try the skill's references directory
        json_path = os.path.join(os.path.dirname(script_dir), "references", "content-engine-schema.json")

    # Also check the old location from the skill
    skill_json = os.path.join(os.path.expanduser("~"), ".hermes", "profiles", "sofia", "skills",
                              "content-engine", "content-engine-blueprint", "references", "content-engine-schema.json")

    for path in [json_path, skill_json]:
        if os.path.exists(path):
            with open(path, "r") as f:
                return json.load(f)

    # Fallback: embed the data directly
    from data import SEED_DATA
    return SEED_DATA


def seed_database(conn):
    """Insert all seed data from the JSON schema."""
    c = conn.cursor()
    data = load_seed_data()

    # ── Proof Archives ────────────────────────────────────────────────────────
    archives = [
        ("ARCHIVE_1", "NCMS Course Curriculum", "Course_Curriculum",
         "See: zee_profiles/Workshops-trainings/Boost-KSA/NCM/14 Dec 2025/NCMS_CSCP_Framework_Companion_Deck.pptx",
         "The 17-slide NCMS CSCP Framework Companion Deck covering CBS, TCO, 4-Tier Governance, RACI, and the 4-Phase Model",
         0),
        ("ARCHIVE_2", "Philosophy Vault", "Philosophy_Vault",
         "Documents/zee/Zeeshan Sabri - Complete Quote Archive.pdf (20 pages, compiled 26 Jan 2026)",
         "Archive of 13+ verified public quotes from LinkedIn, YouTube, fireside chats, and workshops",
         0),
        ("ARCHIVE_3", "Fazila HumanOS Case Study", "HumanOS_CaseStudy",
         "Archive 3 — Fazila WhatsApp Case Study (PRIVATE)",
         "4-month WhatsApp chat archive tracking Fazila's transformation: HR Manager → Huawei Anchor → MC → ClarityOS Ambassador",
         1),  # internal only
    ]
    c.executemany(
        "INSERT OR REPLACE INTO proof_archives (archive_id, archive_name, archive_type, file_path, description, is_internal) VALUES (?,?,?,?,?,?)",
        archives
    )

    # ── Association Categories ────────────────────────────────────────────────
    categories = [
        ("CAT1", "Framework_Anchor",
         "Links a quote to the specific methodological tool it proves (e.g., CBS, TCO, 4-Tier Pyramid).",
         "When a quote is rendered on a blog post, this tag pulls the relevant NCMS slide diagram as a visual proof element."),
        ("CAT2", "Persona_Trigger",
         "Classifies which user persona most urgently needs to hear this quote (Reactive_Manager, Technical_Lead, C_Suite).",
         "The engine shows relevant quotes to specific personas. E.g., 'Crisis forces clarity' to Reactive_Manager users."),
        ("CAT3", "Transformation_Phase",
         "Maps the quote to the Crisis-to-Clarity 4-Phase Model or the Fazila Arc.",
         "The engine sequences content by phase: Recognition users see 'Crisis forces clarity', Architect users see 'Governance is the discipline.'"),
        ("CAT4", "Validation_Type",
         "Tags how the quote is proven: Quantitative_Score, Behavioral_Shift, or Commercial_Result.",
         "Generates a 'Proof Badge' on the UI next to the quote."),
        ("CAT5", "Content_Asset_Type",
         "Tags the source of the validation to prevent the AI from mixing contexts.",
         "Enforces source-authenticity rules: an NCMS quote can only be validated by NCMS data."),
    ]
    c.executemany(
        "INSERT OR REPLACE INTO association_categories (category_id, category_name, description, use_case) VALUES (?,?,?,?)",
        categories
    )

    # ── Validated Quotes ──────────────────────────────────────────────────────
    results = data["results"]
    quotes = []
    for q in results["validated_quotes"]:
        quotes.append((
            q["quote_id"],
            q["quote_text"],
            q["source_archive"],
            q["validation_tag"],
            None  # last_published_date = NULL (never published)
        ))
    c.executemany(
        "INSERT OR REPLACE INTO validated_quotes (quote_id, quote_text, source_archive, validation_tag, last_published_date) VALUES (?,?,?,?,?)",
        quotes
    )

    # ── Proof Specifics ───────────────────────────────────────────────────────
    proof_specifics = []
    archive_map = {
        "Archive 1": "ARCHIVE_1",
        "Archive 2": "ARCHIVE_2",
        "Archive 3": "ARCHIVE_3",
    }
    for q in results["validated_quotes"]:
        for proof_line in q.get("proof_specifics", []):
            # Extract archive reference from the proof line
            for arch_key, arch_id in archive_map.items():
                if arch_key in proof_line:
                    proof_specifics.append((q["quote_id"], arch_id, proof_line))
                    break
        # Handle proof_archives references
        for arch_ref in q.get("proof_archives", []):
            arch_id = archive_map.get(arch_ref, arch_ref)
            if arch_id in ["ARCHIVE_1", "ARCHIVE_2", "ARCHIVE_3"]:
                # Add a general proof line for this archive connection
                proof_text = f"Connected to {arch_ref} for validation of {q['quote_id']}"
                proof_specifics.append((q["quote_id"], arch_id, proof_text))

    # Deduplicate
    seen = set()
    unique_proofs = []
    for p in proof_specifics:
        key = (p[0], p[1], p[2])
        if key not in seen:
            seen.add(key)
            unique_proofs.append(p)

    c.executemany(
        "INSERT OR IGNORE INTO proof_specifics (quote_id, archive_id, proof_text) VALUES (?,?,?)",
        unique_proofs
    )

    # ── Quote Metadata Tags (many-to-many bridge) ─────────────────────────────
    tags = []
    cat_map = {
        "Framework_Anchor": "CAT1",
        "Persona_Trigger": "CAT2",
        "Transformation_Phase": "CAT3",
        "Validation_Type": "CAT4",
        "Content_Asset_Type": "CAT5",
    }
    for cat in results["recommended_association_categories"]:
        cat_name = cat["category_name"]
        cat_id = cat_map.get(cat_name, cat["category_id"])
        for qid in cat["linked_quotes"]:
            tags.append((qid, cat_id))

    c.executemany(
        "INSERT OR IGNORE INTO quote_metadata_tags (quote_id, category_id) VALUES (?,?)",
        tags
    )

    # ── Quote Visual Assets ───────────────────────────────────────────────────
    # Maps Framework_Anchor quotes to their NCMS slide visuals
    visual_assets = [
        ("VIS_CBS_01", "Q4", "Cost Breakdown Structure (CBS)", "/assets/framework-cbs.jpg",
         "NCMS 9-layer Cost Breakdown Structure showing testing & qualification as 30-40% of total cost"),
        ("VIS_TCO_01", "Q7", "Total Cost of Ownership (TCO)", "/assets/framework-tco.jpg",
         "NCMS Lifecycle Cost Accumulation showing initial price is only 30% of spend"),
        ("VIS_PYRAMID_01", "Q2", "4-Tier Governance Pyramid", "/assets/framework-pyramid.jpg",
         "NCMS 4-Tier Governance Pyramid with RACI matrix as top priority"),
        ("VIS_PHASES_01", "Q3", "4-Phase Model (Crisis-to-Clarity)", "/assets/framework-phases.jpg",
         "NCMS 4-Phase Transformation: Exile → Order → Governance"),
        ("VIS_PRESSURE_01", "Q5", "Strategic Pressure Triangle", "/assets/framework-pressure-triangle.jpg",
         "NCMS Strategic Pressure Triangle linking procurement to CEO KPIs"),
        ("VIS_SUPPLIER_01", "Q9", "Supplier Evaluation Template", "/assets/framework-supplier-evals.jpg",
         "NCMS 8-point Supplier Evaluation Scoring System with minimum 28/40 threshold"),
    ]
    c.executemany(
        "INSERT OR IGNORE INTO quote_visual_assets (asset_id, quote_id, framework_name, file_path, alt_text) VALUES (?,?,?,?,?)",
        visual_assets
    )

    conn.commit()
    print(f"[OK] Seeded: {len(quotes)} quotes, {len(archives)} archives, {len(categories)} categories")
    print(f"[OK] Seeded: {len(unique_proofs)} proof lines, {len(tags)} metadata tags, {len(visual_assets)} visual assets")


def init_db(reset=False):
    """Create or reset the database."""
    if reset and os.path.exists(DB_PATH):
        os.remove(DB_PATH)
        print(f"[OK] Removed existing database at {DB_PATH}")

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    create_schema(conn)

    # Check if data already exists
    c = conn.cursor()
    c.execute("SELECT COUNT(*) as cnt FROM validated_quotes")
    count = c.fetchone()["cnt"]

    if count == 0 or reset:
        seed_database(conn)

    conn.close()
    print(f"[DONE] Database ready at {DB_PATH}")


if __name__ == "__main__":
    reset = "--reset" in sys.argv
    init_db(reset=reset)
