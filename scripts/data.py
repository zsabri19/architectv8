"""
Seed data for the content engine database.
This is the canonical JSON asset that the developer's ingestion protocol consumes.
"""

SEED_DATA = {
  "project": "global-mkts.com Backend Content Engine",
  "operation": "Relationship_Audit",
  "auditor": "DeepSeek Expert",
  "timestamp": "2026-08-02",
  "results": {
    "validated_quotes": [
      {
        "quote_id": "Q1",
        "quote_text": "You are not buyers. You are capability architects.",
        "source_archive": "Archive 2 (NCMS Workshop)",
        "validation_tag": "This quote was validated by a 4.61/5.0 post-training score and 100% of participants shifting from 'operational' to 'strategic' self-assessment in the NCMS report.",
        "proof_archives": ["Archive 1", "Archive 3"],
        "proof_specifics": [
          "Archive 1: Post-assessment showed 100% 'Agree' or 'Strongly Agree' on strategic procurement competencies.",
          "Archive 3: Fazila's shift from 'Helper' to 'Architect' was triggered by reframing her HR Manager role to 'Huawei Anchor within Innovera.'"
        ]
      },
      {
        "quote_id": "Q2",
        "quote_text": "Governance is the discipline that ensures the crisis never returns.",
        "source_archive": "Archive 2 (NCMS Workshop)",
        "validation_tag": "This quote drove the behavioral shift in Fazila's Huawei meeting, where she moved from defensive justification to 'alignment and governance' framing, locking in her strategic position.",
        "proof_archives": ["Archive 1", "Archive 3"],
        "proof_specifics": [
          "Archive 1: The 4-Tier Governance Pyramid and RACI matrix were identified as the #1 fix for procurement chaos in regulated environments.",
          "Archive 3: Post-Huawei meeting, Fazila's personal operating statement was rebuilt around 'structure, calm, and follow-through.'"
        ]
      },
      {
        "quote_id": "Q3",
        "quote_text": "Crisis forces clarity that comfort never could.",
        "source_archive": "Archive 2 (Signature Branding / NCMS)",
        "validation_tag": "This quote is the foundational DNA of the NCMS 4-Phase Model (Exile → Order → Governance) which achieved a 'Hat Trick' of three repeat contracts from one client.",
        "proof_archives": ["Archive 1", "Archive 3"],
        "proof_specifics": [
          "Archive 1: Slide 7 maps 'Exile' directly to the crisis-to-clarity journey of NCMS.",
          "Archive 3: Fazila's crisis moment (war anxiety, reactive mode) was the prerequisite for her accelerated transformation to MC and Ambassador."
        ]
      },
      {
        "quote_id": "Q4",
        "quote_text": "Procurement without CBS is blind procurement.",
        "source_archive": "Archive 2 (NCMS Workshop)",
        "validation_tag": "This quote was validated by NCMS participants who specifically named 'Cost Breakdown Structures' as the key tool enabling their shift from 'Sometimes' to 'Strongly Agree' in financial analysis capability.",
        "proof_archives": ["Archive 1"],
        "proof_specifics": [
          "Archive 1: The Cost Breakdown Structure (CBS) was deconstructed into 9 layers, directly enabling participants to identify that testing & qualification consumes 30-40% of total cost."
        ]
      },
      {
        "quote_id": "Q5",
        "quote_text": "The KPI of a procurement leader and the KPI of a CEO is exactly the same: Profitability, customer satisfaction, and operational efficiency.",
        "source_archive": "Archive 2 (Doha Workshop)",
        "validation_tag": "This quote was proven by the NCMS curriculum which repositioned procurement from a back-office task to a 'National Capability' function impacting Saudi industrial growth and LCGPA scores.",
        "proof_archives": ["Archive 1"],
        "proof_specifics": [
          "Archive 1: The Strategic Pressure Triangle directly links procurement decisions to Budget Constraints, Compliance Pressure, and Localization Requirements—the exact KPIs of the CEO."
        ]
      },
      {
        "quote_id": "Q6",
        "quote_text": "Techniques fail when foundations are weak. Tools disappoint when discipline is missing.",
        "source_archive": "Archive 2 (Beyond Techniques Series)",
        "validation_tag": "This quote was validated by the Fazila case study where coaching on 'posture and framing' (Human OS) succeeded before any technical tool (ClarityOS) was recommended for her Huawei prep.",
        "proof_archives": ["Archive 3"],
        "proof_specifics": [
          "Archive 3: Zeeshan corrected Fazila's defensive wording to a 'controlled authority + humility' posture before introducing any AI tools, resulting in a successful meeting."
        ]
      },
      {
        "quote_id": "Q7",
        "quote_text": "Price is not cost. Cost is not total cost.",
        "source_archive": "Archive 2 (NCMS Workshop)",
        "validation_tag": "This quote is the entire premise of the NCMS Total Cost of Ownership (TCO) tool, which revealed that the initial price is only 30% of lifecycle spend, validated by 23 post-training evaluations.",
        "proof_archives": ["Archive 1"],
        "proof_specifics": [
          "Archive 1: The TCO slide explicitly breaks down Lifecycle Cost Accumulation, proving that hidden costs from testing, compliance, and localization account for 70% of spend."
        ]
      },
      {
        "quote_id": "Q8",
        "quote_text": "Money is a byproduct. Once the value is felt, the byproduct follows.",
        "source_archive": "Archive 2 (Fireside Chat / Signature Branding)",
        "validation_tag": "This quote was validated by Fazila's voluntary monetization moment when she offered to pay $50 BD/month for ClarityOS, stating it's a 'life changer' comparable to a Netflix subscription.",
        "proof_archives": ["Archive 3"],
        "proof_specifics": [
          "Archive 3: Fazila moved from a free user to a 'Pro User/Ambassador,' advising Zeeshan on the '3-day taste' monetization strategy, proving that felt value converts organically to revenue."
        ]
      },
      {
        "quote_id": "Q9",
        "quote_text": "A players can hire B players, but B players can never hire A players. They will always hire C players.",
        "source_archive": "Archive 2 (Fireside Chat / Doha)",
        "validation_tag": "This quote underpins the NCMS 'Supplier Evaluation Template,' which uses an 8-point scoring system to filter out 'B and C' level suppliers, setting a minimum acceptable score of 28/40.",
        "proof_archives": ["Archive 1"],
        "proof_specifics": [
          "Archive 1: The template scores suppliers on Technical Capability, Quality Maturity, and Ethics, ensuring only 'A players' (Strategic Partners like Safran) get the highest governance intensity."
        ]
      },
      {
        "quote_id": "Q10",
        "quote_text": "My first validation is the rejection.",
        "source_archive": "Archive 2 (Fireside Chat / Signature Branding)",
        "validation_tag": "This quote was validated by the NCMS report's 'Hat Trick' — the initial 3-day workshop was so effective that it directly overcame organizational inertia, resulting in two additional, longer contracts.",
        "proof_archives": ["Archive 1"],
        "proof_specifics": [
          "Archive 1: The Executive Summary states that the foundational workshop's 'immediate, measurable impact' led to the direct retention of BOOST for two more sessions, proving that initial skepticism was the first validation."
        ]
      }
    ],
    "recommended_association_categories": [
      {
        "category_id": "CAT1",
        "category_name": "Framework_Anchor",
        "description": "Links a quote to the specific methodological tool it proves (e.g., CBS, TCO, 4-Tier Pyramid).",
        "use_case": "When a quote is rendered on a blog post, this tag pulls the relevant NCMS slide diagram as a visual proof element.",
        "linked_quotes": ["Q1", "Q3", "Q4", "Q7", "Q9"]
      },
      {
        "category_id": "CAT2",
        "category_name": "Persona_Trigger",
        "description": "Classifies which user persona most urgently needs to hear this quote (Reactive_Manager, Technical_Lead, C_Suite).",
        "use_case": "The engine shows Fazila's quote 'Crisis forces clarity...' to users tagged as 'Reactive_Manager' and the 'A players' quote to users tagged as 'C_Suite'.",
        "linked_quotes": ["Q3", "Q5", "Q6", "Q9"]
      },
      {
        "category_id": "CAT3",
        "category_name": "Transformation_Phase",
        "description": "Maps the quote to the specific phase in the Crisis-to-Clarity 4-Phase Model or the Fazila Arc.",
        "use_case": "The engine sequences content: a 'Recognition' phase user sees 'Crisis forces clarity,' while an 'Architect' user sees 'Governance is the discipline.'",
        "linked_quotes": ["Q1", "Q2", "Q3", "Q6", "Q10"]
      },
      {
        "category_id": "CAT4",
        "category_name": "Validation_Type",
        "description": "Tags how the quote is proven: Quantitative_Score, Behavioral_Shift, or Commercial_Result.",
        "use_case": "Generates a 'Proof Badge' on the UI next to the quote.",
        "linked_quotes": ["Q1", "Q2", "Q8", "Q10"]
      },
      {
        "category_id": "CAT5",
        "category_name": "Content_Asset_Type",
        "description": "Tags the source of the validation to prevent the AI from mixing contexts.",
        "use_case": "The backend uses this to enforce source-authenticity rules: an NCMS quote can only be validated by NCMS data unless a cross-reference is explicitly built.",
        "linked_quotes": ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10"]
      }
    ]
  },
  "dev_ingest_notes": {
    "archive_1_schema_hint": "Tag as 'Course_Curriculum'. Extract CBS, TCO, and 4-Phase Model as Framework_Assets.",
    "archive_2_schema_hint": "Tag as 'Philosophy_Vault'. Use Source_Tag for AI to generate authentic reflections.",
    "archive_3_schema_hint": "Tag as 'HumanOS_CaseStudy'. Do not publish raw chats. Use solely for backend generation of anonymized Transformation Stories."
  }
}
