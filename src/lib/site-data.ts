// Central content seed extracted from global-mkts.com + user brief.
// Replace with Notion CMS reads once the Notion connector is wired (Phase 4).

export const SITE = {
  name: "Zeeshan Sabri",
  role: "Crisis-to-Clarity Architect",
  tagline: "The Human OS before the System OS.",
  heroH1: "Transformation fails when the human layer underneath it cannot hold.",
  heroSub:
    "ClarityOS helps founders, executives, and leadership teams diagnose the real blocker, align decisions and ownership, and install the operating rhythm that makes change stick.",
  email: "zeeshan@global-mkts.com",
  // SEO target domain. All canonicals, og:url tags, and the sitemap derive
  // from this constant — keep it as the single source of truth.
  domain: "global-mkts.com",
  bookSessionUrl: "https://buy.stripe.com/00w28q41PdjveV2bfWcV201",
  socials: {
    linkedin: "https://www.linkedin.com/in/zeeshansabri/",
  },
  award: {
    title: "Entrepreneurial Excellence Award — Founders 2.0 Conference",
    location: "Dubai",
    date: "December 2025",
    pressUrl:
      "https://news.marketersmedia.com/paradigm-shift-in-gcc-transformation-zeeshan-sabri-wins-entrepreneurial-excellence-award-for-pioneering-clarityos-methodology/89181228",
  },
};

export const canonicalUrl = (path: string) => `https://${SITE.domain}${path}`;

import logoHuawei from "@/assets/logo-huawei.png.asset.json";
import logoMotorola from "@/assets/logo-motorola.png.asset.json";
import logoCbo from "@/assets/logo-cbo.jpg.asset.json";
import logoNcms from "@/assets/logo-ncms.png.asset.json";
import logoCips from "@/assets/logo-cips.png.asset.json";
import logoAicerts from "@/assets/logo-aicerts.png.asset.json";
import logoGmt from "@/assets/logo-gmt.png.asset.json";
import logoSuperjet from "@/assets/logo-superjet.png.asset.json";
import logoNastp from "@/assets/logo-nastp.png.asset.json";
import logoDa1ilmverse from "@/assets/logo-da1ilmverse.png.asset.json";
import logoJabr from "@/assets/logo-jabr.png.asset.json";
import logoSanad from "@/assets/logo-sanad.png.asset.json";
import logoScmdojo from "@/assets/logo-scmdojo.png.asset.json";
import logoRosp from "@/assets/logo-rosp.png.asset.json";
import logoKuwaitCricket from "@/assets/logo-kuwait-cricket.png.asset.json";
import logoBoost from "@/assets/logo-boost.png.asset.json";

import fieldMsiEvent from "@/assets/field-msi-event.jpg.asset.json";
import fieldMsiMe from "@/assets/field-msi-me.jpg.asset.json";
import fieldDubaiPanel from "@/assets/field-dubai-panel.jpg.asset.json";
import fieldKsaDefence1 from "@/assets/field-ksa-defence-1.jpg.asset.json";
import fieldKsaDefence2 from "@/assets/field-ksa-defence-2.jpg.asset.json";
import fieldKsaPartner from "@/assets/field-ksa-partner.jpg.asset.json";
import fieldOshFounders from "@/assets/field-osh-founders.jpg.asset.json";
import fieldDohaAi from "@/assets/field-doha-ai.jpg.asset.json";
import fieldDohaAi2 from "@/assets/field-doha-ai-2.jpg.asset.json";
import fieldSuperjetSanad from "@/assets/field-superjet-sanad.jpg.asset.json";
import talkLumsDecode from "@/assets/talk-lums-decode.jpg.asset.json";
import talkOsh04 from "@/assets/talk-osh-04.jpg.asset.json";
import talkOsh18 from "@/assets/talk-osh-18.jpg.asset.json";
import talkOsh21 from "@/assets/talk-osh-21.jpg.asset.json";
import talkIgnite from "@/assets/talk-ignite.jpg.asset.json";
import talkStage from "@/assets/talk-stage.jpg.asset.json";
import teamIlmversity1 from "@/assets/team-ilmversity-1.jpg.asset.json";
import teamIlmversity2 from "@/assets/team-ilmversity-2.jpg.asset.json";

import recHuaweiMentor from "@/assets/rec-huawei-mentor.jpg.asset.json";
import recHuaweiFarewell from "@/assets/rec-huawei-farewell.jpg.asset.json";
import recKuwaitSummit from "@/assets/rec-kuwait-summit.jpg.asset.json";
import certAicerts from "@/assets/cert-aicerts.pdf.asset.json";

import archiveCricketMag from "@/assets/archive-kuwait-cricket-mag.jpg.asset.json";
import archiveCricketNews from "@/assets/archive-kuwait-cricket-news.jpg.asset.json";

import quoteAct from "@/assets/quote-act.png.asset.json";
import quoteBrain from "@/assets/quote-brain.jpg.asset.json";
import quoteCrisis from "@/assets/quote-crisis.jpg.asset.json";
import quoteLeadership from "@/assets/quote-leadership.jpg.asset.json";
import quoteWinning from "@/assets/quote-winning.jpg.asset.json";

export const LOGOS_INSTITUTIONS = [
  { name: "Huawei", alt: "Huawei Technologies logo", src: logoHuawei.url },
  { name: "Motorola Solutions", alt: "Motorola Solutions logo", src: logoMotorola.url },
  { name: "Central Bank of Oman", alt: "Central Bank of Oman logo", src: logoCbo.url },
  {
    name: "NCMS — National Company for Mechanical Systems",
    alt: "NCMS National Company for Mechanical Systems logo",
    src: logoNcms.url,
  },
  {
    name: "CIPS",
    alt: "CIPS Chartered Institute of Procurement and Supply logo",
    src: logoCips.url,
  },
  { name: "AI CERTs", alt: "AI CERTs certification body logo", src: logoAicerts.url },
];

export const LOGOS_VENTURES = [
  { name: "Global Markets Technologies", alt: "Global Markets Technologies logo", src: logoGmt.url },
  { name: "SuperJet", alt: "SuperJet aviation services logo", src: logoSuperjet.url },
  { name: "NASTP", alt: "NASTP National Aerospace Science and Technology Park logo", src: logoNastp.url },
  { name: "Da1ilmverse", alt: "Da1ilmverse learning platform logo", src: logoDa1ilmverse.url },
  { name: "Jabr", alt: "Jabr consulting logo", src: logoJabr.url },
  { name: "Sanad Services Center", alt: "Sanad Services Center logo", src: logoSanad.url },
  { name: "SCMDojo", alt: "SCMDojo supply chain academy logo", src: logoScmdojo.url },
  { name: "ROSP", alt: "ROSP professional development logo", src: logoRosp.url },
  { name: "Kuwait Cricket", alt: "Kuwait Cricket association logo", src: logoKuwaitCricket.url },
  { name: "Boost Training & Consulting", alt: "Boost Training and Consulting logo", src: logoBoost.url },
];

export const FIELD_PHOTOS = [
  { src: talkLumsDecode.url, caption: "LUMS Lahore — Decode Conference keynote, ClarityOS unveil", tag: "Keynote" },
  { src: talkStage.url, caption: "The Architecture of Change — mainstage keynote", tag: "Keynote" },
  { src: talkIgnite.url, caption: "Ignite Fireside Chat — founder conversation", tag: "Keynote" },
  { src: fieldMsiMe.url, caption: "Motorola Solutions — Middle East partner enablement", tag: "Enterprise" },
  { src: fieldMsiEvent.url, caption: "Motorola Solutions — Dubai partner event", tag: "Enterprise" },
  { src: fieldDubaiPanel.url, caption: "Procurement Leaders Panel — Dubai", tag: "Panel" },
  { src: fieldKsaDefence1.url, caption: "KSA defence procurement workshop — cohort", tag: "Workshop" },
  { src: fieldKsaDefence2.url, caption: "KSA defence — cohort certification", tag: "Workshop" },
  { src: fieldKsaPartner.url, caption: "KSA — partner enablement session", tag: "Enterprise" },
  { src: fieldDohaAi.url, caption: "Doha — AI leadership workshop", tag: "Workshop" },
  { src: fieldDohaAi2.url, caption: "Doha — AI working session", tag: "Workshop" },
  { src: fieldOshFounders.url, caption: "Oman — What You Can't Predict, founders session", tag: "Workshop" },
  { src: talkOsh04.url, caption: "OSH — Hard Questions workshop", tag: "Workshop" },
  { src: talkOsh18.url, caption: "OSH — the Inside session", tag: "Workshop" },
  { src: talkOsh21.url, caption: "OSH — What You Can't Predict", tag: "Workshop" },
  { src: fieldSuperjetSanad.url, caption: "SuperJet × Sanad — signing ceremony", tag: "Venture" },
];

export const TEAM_PHOTOS = [
  { src: teamIlmversity1.url, caption: "Ilmversity core team — Abu Dhabi boardroom" },
  { src: teamIlmversity2.url, caption: "Ilmversity — working session, Abu Dhabi" },
];

export const RECOGNITION = [
  { src: recHuaweiMentor.url, title: "Huawei — Best Mentor Award", note: "Recognised for mentorship across Huawei ME." },
  { src: recHuaweiFarewell.url, title: "Huawei Bahrain — farewell tribute", note: "Team recognition from Huawei Bahrain." },
  { src: recKuwaitSummit.url, title: "Kuwait Procurement Summit", note: "Featured speaker and industry recognition." },
];

export const CERT_AICERTS_PDF = certAicerts.url;

/**
 * Verified credentials on file. `verifyUrl` opens the issuer's verification
 * page; `image` is the issuer-hosted badge (or a local asset) shown on the card.
 * Add new rows as certificates are issued.
 */
export const CERTIFICATIONS = [
  {
    title: "Verified digital credential",
    issuer: "Sertifier — verified credential",
    year: "2026",
    image: "https://storage.googleapis.com/verified-storage/cert/15111621867128.png",
    verifyUrl: "https://verified.sertifier.com/en/verify/15111621867128/",
    note: "Independently verifiable through the issuer's registry.",
  },
  {
    title: "AI CERTs — Certified Trainer",
    issuer: "AI CERTs",
    year: "2025",
    image: logoAicerts.url,
    verifyUrl: certAicerts.url,
    note: "Authorised to deliver AI CERTs executive training tracks.",
  },
  {
    title: "Chartered MCIPS",
    issuer: "CIPS — Chartered Institute of Procurement & Supply",
    year: "Chartered",
    image: logoCips.url,
    verifyUrl: "https://www.cips.org/",
    note: "Chartered status in procurement and supply management.",
  },
];


export const ARCHIVE_CRICKET = [
  {
    src: archiveCricketMag.url,
    caption:
      "ICC U-17 Asia tournament programme — Kuwait squad. Zeeshan Sabri listed as right-handed opening batsman.",
    year: "1999",
  },
  {
    src: archiveCricketNews.url,
    caption:
      "Arab Times — Kuwait U-19 team departs for Kathmandu, Youth Asia Cup. Squad photograph, October tour.",
    year: "2000",
  },
];

export type QuoteCard = {
  slug: string;
  src: string;
  quote: string;
  attribution: string;
  relatedFramework?: string;
};

export const QUOTE_CARDS: QuoteCard[] = [
  {
    slug: "crisis",
    src: quoteCrisis.url,
    quote: "Crisis does not introduce disorder. Crisis compresses time and exposes what was already ungoverned.",
    attribution: "Zeeshan Sabri",
    relatedFramework: "crisis-as-audit",
  },
  {
    slug: "leadership",
    src: quoteLeadership.url,
    quote: "Leadership isn't measured by numbers alone. True leaders are architects of change, evolving their approach while others chase metrics.",
    attribution: "Zeeshan Sabri",
    relatedFramework: "character-compass",
  },
  {
    slug: "brain",
    src: quoteBrain.url,
    quote: "Under uncertainty, the brain activates threat response. Silos are not political — silos feel safe when clarity is missing.",
    attribution: "Zeeshan Sabri",
    relatedFramework: "8c-crisis-to-clarity",
  },
  {
    slug: "act",
    src: quoteAct.url,
    quote: "Theory becomes reality only when we dare to act on it. Every breakthrough starts with someone who believed the impossible was just waiting to be proven.",
    attribution: "Zeeshan Sabri",
  },
  {
    slug: "winning",
    src: quoteWinning.url,
    quote: "In the context of loyalty, losing is winning.",
    attribution: "Zeeshan Sabri",
  },
];

export const METRICS = [
  { value: "$95M+", label: "Strategic initiatives delivered, GCC-wide" },
  { value: "22", label: "Years across Fortune 500, government, ventures" },
  { value: "5M+", label: "Citizens served via national platforms" },
  { value: "90–95%", label: "Pyramid Framework adoption vs. 25% industry" },
];

export type Testimonial = {
  quote: string;
  name: string;
  title?: string;
  org?: string;
  date: string;
  source: "LinkedIn Recommendation" | "Participant Feedback" | "Partner Note";
};

/**
 * Verified third-party testimonials. LinkedIn entries are transcribed verbatim
 * from public recommendations (see /Users/zsabri/Architect-final/TESTIMONIALS-SELECTION-v1.md).
 * Participant Feedback entries are drawn from signed NCMS workshop forms (Riyadh, Nov 2025);
 * attribution level is role-only pending name confirmation.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Consistently impressed by his strong knowledge of procurement processes and his structured, consultative approach — always dependable when it came to delivering quality work. I'm confident that Zeeshan will add value to any organization looking for a technically sound and process-driven professional.",
    name: "Imran Shareef, PMP, FCIPS",
    title: "Head of Procurement — Middle East, Africa & UN Projects",
    date: "July 2025",
    source: "LinkedIn Recommendation",
  },
  {
    quote:
      "What sets Zeeshan apart is his ability to balance analytical thinking with strong interpersonal skills — he does not only get the numbers right but also builds meaningful relationships with internal stakeholders and external partners alike. He is that one leader who I always want to walk with.",
    name: "Farooq Jamsheed",
    title: "Director of Enterprise Business",
    org: "Ottu",
    date: "August 2025",
    source: "LinkedIn Recommendation",
  },
  {
    quote:
      "Zeeshan is an exceptional trainer, motivational speaker, and mentor. His ability to connect with audiences and drive meaningful transformation is rare.",
    name: "Badr Al-Olama",
    title: "Board Chairman",
    org: "OME Digital Solutions",
    date: "2025",
    source: "LinkedIn Recommendation",
  },
  {
    quote:
      "The feedback we received from ADNOC was excellent, and your contribution was highly appreciated by all participants.",
    name: "Boost Training & Consulting",
    title: "On the ADNOC programme",
    date: "June 2025",
    source: "Partner Note",
  },
  {
    quote:
      "Thanks to the trainer for the speed and ease with which the information was delivered.",
    name: "Mohsen Fazili",
    title: "Procurement Specialist",
    org: "NCMS Programme — Riyadh",
    date: "November 2025",
    source: "Participant Feedback",
  },
  {
    quote:
      "We are not just buyers — we are capability architects. The workshop changed my view in some points.",
    name: "Procurement Professional",
    org: "NCMS Programme — Riyadh",
    date: "November 2025",
    source: "Participant Feedback",
  },
  {
    quote:
      "AI doesn't transform businesses by itself — people, systems, and clarity do. Zeeshan consistently brings the conversation back to something more fundamental: organizations need clarity before complexity, and stability before optimization.",
    name: "Makarand Upat",
    title: "AI Readiness & Automation",
    date: "June 2026",
    source: "LinkedIn Recommendation",
  },
];

export type CaseStudy = {
  client: string;
  sector: string;
  challenge: string;
  outcome: string;
  metric?: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    client: "ADNOC",
    sector: "Energy & Defence",
    challenge: "Procurement professionals needed financial management capability to manage complex supply chains.",
    outcome: "Excellent feedback across all participants; programme extended.",
    metric: "100% participant satisfaction",
  },
  {
    client: "NCMS — National Company for Mechanical Systems",
    sector: "Defence & Manufacturing",
    challenge: "Leadership team required decision clarity and governance redesign across 80+ workshops.",
    outcome: "Pyramid Framework adopted at 90–95% vs. 25% industry standard.",
    metric: "90–95% adoption rate",
  },
  {
    client: "Motorola Solutions",
    sector: "Enterprise Technology",
    challenge: "Middle East partner enablement required cross-cultural authority and structured engagement.",
    outcome: "Partner programme delivered across Dubai and regional offices.",
    metric: "Multi-country delivery",
  },
  {
    client: "Oman Startup Hub",
    sector: "Startup Ecosystem",
    challenge: "Early-stage founders needed pattern-recognition for scaling under uncertainty.",
    outcome: "Founders workshop on 'What You Can't Predict' delivered in Muscat.",
    metric: "500+ founders and executives trained",
  },
];

export const SERVICES = [
  {
    slug: "clarity-session",
    tier: "Personal",
    title: "ClarityOS Personal Session",
    price: "From $79",
    cadence: "90-minute focused intervention",
    description:
      "A focused 90-minute intervention for founders, executives, and operators who need sharper decisions and cleaner thinking.",
    cta: { label: "Book Your Session", href: "/book-a-session" },
  },
  {
    slug: "enterprise-90-day",
    tier: "Enterprise",
    title: "ClarityOS Enterprise, 90-Day Program",
    price: "Scoped",
    cadence: "Structured team engagement",
    description:
      "A structured engagement for leadership teams that need decision clarity, aligned ownership, and governance before transformation spend multiplies confusion.",
    cta: { label: "Discuss Enterprise Needs", href: "/connect" },
  },
  {
    slug: "board-advisory",
    tier: "Advisory",
    title: "Board Advisory & Speaking",
    price: "Proposal",
    cadence: "Board counsel, keynotes, leadership programmes",
    description:
      "Board-level counsel, executive advisory, keynotes, and multi-session leadership programmes for GCC organisations navigating complex transformation.",
    cta: { label: "Request a Proposal", href: "/connect" },
  },
];

export type Framework = {
  slug: string;
  number: number;
  title: string;
  eyebrow: string;
  summary: string;
  parameters: string[];
  impact: string;
  leadMagnet: string;
};

export const FRAMEWORKS: Framework[] = [
  {
    slug: "8c-crisis-to-clarity",
    number: 1,
    title: "The 8C Crisis-to-Clarity Framework",
    eyebrow: "Core Methodology",
    summary:
      "A recursive eight-dimension protocol for moving an organisation from crisis to durable operating clarity.",
    parameters: [
      "Clarity", "Conditions", "Control", "Capability",
      "Calibration", "Correction", "Continuity", "Coaching",
    ],
    impact: "Reduces decision drag; installs a shared operating rhythm.",
    leadMagnet: "8C Crisis-to-Clarity Field Guide (PDF)",
  },
  {
    slug: "exile-resilience",
    number: 2,
    title: "Exile Resilience Framework",
    eyebrow: "Resilience & Crisis Leadership",
    summary: "How leaders forge continuity when the ground itself is being pulled out from under them.",
    parameters: ["Displacement audit", "Identity anchors", "Continuity contracts", "Return architecture"],
    impact: "60% faster crisis response across validated engagements.",
    leadMagnet: "Exile Resilience Framework (PDF)",
  },
  {
    slug: "cultural-ecosystem-mapping",
    number: 3,
    title: "Cultural Ecosystem Mapping",
    eyebrow: "Cross-Cultural Leadership",
    summary:
      "Diagnose the invisible cultural operating system beneath a GCC organisation before designing change.",
    parameters: ["Power topology", "Language codes", "Trust flows", "Silent constraints"],
    impact: "70% improved cross-cultural project success.",
    leadMagnet: "Cultural Ecosystem Mapping Canvas",
  },
  {
    slug: "identity-preservation",
    number: 4,
    title: "Identity Preservation Under Change",
    eyebrow: "Leadership Sustainability",
    summary: "Keep the core intact while everything on the surface is being rebuilt.",
    parameters: ["Non-negotiables", "Ritual continuity", "Narrative custody", "Successor logic"],
    impact: "Prevents organisational identity collapse during transformation.",
    leadMagnet: "Identity Preservation Checklist",
  },
  {
    slug: "constraint-based-innovation",
    number: 5,
    title: "Constraint-Based Innovation",
    eyebrow: "Transformation Methodology",
    summary: "Use scarcity, sanctions, and structural limits as design fuel rather than blockers.",
    parameters: ["Constraint inventory", "Design pivots", "Substitution mapping", "Yield metrics"],
    impact: "80% innovation output enhanced under constraint conditions.",
    leadMagnet: "Constraint-Based Innovation Playbook",
  },
  {
    slug: "governance-as-accelerator",
    number: 6,
    title: "Governance as Accelerator",
    eyebrow: "Governance & Procurement",
    summary:
      "Redesign governance so it compounds velocity instead of taxing it. Built inside CBO, NCM, and CIPS-grade environments.",
    parameters: ["Decision rights", "Escalation ladders", "Audit-as-signal", "Cadence design"],
    impact: "$80M procurement portfolio managed with zero compliance breaches.",
    leadMagnet: "Governance as Accelerator Playbook",
  },
  {
    slug: "market-volatility-navigation",
    number: 7,
    title: "Market Volatility Navigation",
    eyebrow: "GCC Strategy",
    summary: "Navigate GCC market cycles, sanctions regimes, and geopolitical shifts without losing thesis.",
    parameters: ["Signal stack", "Reversibility calculus", "Hedged commitments", "Cadence review"],
    impact: "6 GCC markets navigated; cross-border authority built in 24 months.",
    leadMagnet: "Volatility Navigation Scorecard",
  },
  {
    slug: "crisis-as-audit",
    number: 8,
    title: "Crisis as Audit",
    eyebrow: "Resilience",
    summary: "Treat every crisis as a diagnostic of what the pre-crisis system was hiding.",
    parameters: ["Crisis timeline", "Latent defects", "Ownership map", "Corrective operating rhythm"],
    impact: "60–85% organisational resilience improvement across crisis scenarios.",
    leadMagnet: "Crisis-as-Audit Debrief Template",
  },
  {
    slug: "pyramid-framework",
    number: 9,
    title: "The Pyramid Framework",
    eyebrow: "Signature Methodology",
    summary:
      "Foundation, Structure, Alignment, Optimization, Transformation — the sequence that determines whether change compounds or collapses.",
    parameters: ["Foundation", "Structure", "Alignment", "Optimization", "Transformation"],
    impact: "90–95% adoption in field deployments vs. 25% industry standard.",
    leadMagnet: "The Pyramid Framework Guide",
  },
  {
    slug: "function-reframing",
    number: 10,
    title: "Function Reframing",
    eyebrow: "Operating Redesign",
    summary: "Re-cast the mandate of a function so it stops solving yesterday's problem.",
    parameters: ["Mandate audit", "Value re-anchor", "Interface redesign", "Metric swap"],
    impact: "Removes the invisible ceiling on functional performance.",
    leadMagnet: "Function Reframing Worksheet",
  },
  {
    slug: "cross-cultural-authority",
    number: 11,
    title: "Cross-Cultural Authority",
    eyebrow: "GCC Strategy",
    summary: "Build authority that reads legitimate across four or more cultural registers simultaneously.",
    parameters: ["Register mapping", "Legitimacy debts", "Translation debt", "Public commitments"],
    impact: "24-month cross-border authority build in six GCC markets.",
    leadMagnet: "Cross-Cultural Authority Guide",
  },
  {
    slug: "super-labor",
    number: 12,
    title: "Super-Labor Framework",
    eyebrow: "Operating Redesign",
    summary: "Restructure subcontracted and blended labour without collapsing delivery.",
    parameters: ["Skill bundling", "Compliance envelope", "Retention economics", "Escalation paths"],
    impact: "75% reduction in subcontractor penalties, Oman deployment.",
    leadMagnet: "Super-Labor Design Kit",
  },
  {
    slug: "digital-nation-building",
    number: 13,
    title: "Digital Nation Building",
    eyebrow: "Public Sector",
    summary:
      "Design and stand up national-scale digital platforms with governance that survives political cycles.",
    parameters: ["Citizen surface", "Sovereign stack", "Institutional patronage", "Continuity guarantees"],
    impact: "5M+ citizens served through national platform work.",
    leadMagnet: "Digital Nation Building Brief",
  },
  {
    slug: "ai-governance-integration",
    number: 14,
    title: "AI Governance Integration",
    eyebrow: "AI & Governance",
    summary: "Integrate AI capability into regulated environments without breaking the compliance envelope.",
    parameters: ["Risk taxonomy", "Human-in-the-loop", "Auditable prompts", "Board reporting"],
    impact: "AI CERTs-certified integration path for GCC executives.",
    leadMagnet: "AI Governance Integration Checklist",
  },
  {
    slug: "character-compass",
    number: 15,
    title: "Character Compass",
    eyebrow: "Executive Character",
    summary:
      "Pioneering, assertive, altruistic, intellectually driven — the four vectors that keep leaders durable.",
    parameters: ["Pioneering", "Assertive", "Altruistic", "Intellectually driven"],
    impact: "90% leadership sustainability improvement across engagements.",
    leadMagnet: "Character Compass Assessment",
  },
  {
    slug: "practical-people-skills-development",
    number: 16,
    title: "Practical People Skills Development Framework",
    eyebrow: "Personal Development",
    summary:
      "Six people-skill capabilities and a six-month observe, practise, reflect track that turns a development plan into observable behaviour.",
    parameters: [
      "Observation & awareness",
      "Effective communication",
      "Adapting to personalities",
      "Building relationships",
      "Leadership without authority",
      "Emotional intelligence",
    ],
    impact: "A repeatable personal development cycle, not a one-off plan.",
    leadMagnet: "Practical People Skills Development Guide",
  },
];


export type BookChapter = {
  number: number;
  slug: string;
  part: string;
  title: string;
  lesson: string;
  relatedFramework?: string;
};

export const BOOK_PARTS = [
  { number: "I", title: "Roots & Resilience", pillar: "Resilience & Crisis Leadership" },
  { number: "II", title: "Fortune 500 Foundations", pillar: "Governance & Procurement Excellence" },
  { number: "III", title: "The GCC Odyssey", pillar: "Cross-Cultural Leadership & GCC Strategy" },
  { number: "IV", title: "Frameworks & Playbooks", pillar: "Transformation Methodologies" },
  { number: "V", title: "Building Movements", pillar: "Digital Nation Building & AI Governance" },
  { number: "VI", title: "The Leader & The Self", pillar: "Executive Character & Leadership Sustainability" },
];

export const BOOK_CHAPTERS: BookChapter[] = [
  { number: 1, slug: "born-between-worlds", part: "I", title: "Born Between Worlds",
    lesson: "Identity is forged in the seam between cultures, not inside either one.",
    relatedFramework: "identity-preservation" },
  { number: 2, slug: "the-gulf-war-and-what-it-took", part: "I", title: "The Gulf War and What It Took",
    lesson: "Exile teaches which resources are portable and which are illusions.",
    relatedFramework: "exile-resilience" },
  { number: 3, slug: "learning-to-rebuild", part: "I", title: "Learning to Rebuild",
    lesson: "Reconstruction begins with what you refuse to lose.",
    relatedFramework: "identity-preservation" },
  { number: 4, slug: "entering-the-fortune-500", part: "II", title: "Entering the Fortune 500",
    lesson: "Global systems reward the quiet operators, not the loud ones.",
    relatedFramework: "governance-as-accelerator" },
  { number: 5, slug: "procurement-as-power", part: "II", title: "Procurement as Power",
    lesson: "Whoever controls the contract controls the transformation.",
    relatedFramework: "governance-as-accelerator" },
  { number: 6, slug: "governance-lessons-in-glass-towers", part: "II", title: "Governance Lessons in Glass Towers",
    lesson: "Governance is either the accelerator or the tax. Choose deliberately.",
    relatedFramework: "governance-as-accelerator" },
  { number: 7, slug: "arriving-in-the-gulf", part: "III", title: "Arriving in the Gulf",
    lesson: "Authority in the GCC is earned in registers most outsiders never see.",
    relatedFramework: "cross-cultural-authority" },
  { number: 8, slug: "the-oman-years", part: "III", title: "The Oman Years",
    lesson: "Patience is a strategic asset — measure it in years, not quarters.",
    relatedFramework: "cultural-ecosystem-mapping" },
  { number: 9, slug: "the-pyramid-a-framework-for-everything", part: "IV",
    title: "The Pyramid — A Framework for Everything",
    lesson: "Foundation before scale, always.",
    relatedFramework: "pyramid-framework" },
  { number: 10, slug: "the-8c-protocol", part: "IV", title: "The 8C Protocol",
    lesson: "Clarity is a system, not a state.",
    relatedFramework: "8c-crisis-to-clarity" },
  { number: 11, slug: "constraint-as-catalyst", part: "IV", title: "Constraint as Catalyst",
    lesson: "Limits do the design work if you let them.",
    relatedFramework: "constraint-based-innovation" },
  { number: 12, slug: "digital-nation-building", part: "V", title: "Digital Nation Building",
    lesson: "National-scale systems succeed on the durability of their governance, not their code.",
    relatedFramework: "digital-nation-building" },
  { number: 13, slug: "ai-and-the-governance-gap", part: "V", title: "AI and the Governance Gap",
    lesson: "AI amplifies whatever governance you already have — including the missing kind.",
    relatedFramework: "ai-governance-integration" },
  { number: 14, slug: "the-character-compass", part: "VI", title: "The Character Compass",
    lesson: "Sustainability at the top is a character discipline, not a wellness program.",
    relatedFramework: "character-compass" },
  { number: 15, slug: "from-exile-to-transformation", part: "VI", title: "From Exile to Transformation",
    lesson: "The exit from exile is also the entry to a system worth building.",
    relatedFramework: "8c-crisis-to-clarity" },
];

export type ArticleSection = { heading: string; paragraphs: string[] };
export type Article = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  lede: string;
  category: string;
  date: string;
  relatedFramework?: string;
  sections: ArticleSection[];
};

export const ARTICLES: Article[] = [
  {
    slug: "leadership-styles",
    number: "00",
    title: "Leadership Styles for Crisis Transformation: A Field Guide",
    summary:
      "The six leadership styles that actually change outcomes when an organisation is under pressure — and how to sequence them through the 8C Crisis-to-Clarity Framework.",
    lede: "Crisis doesn't create character. It reveals it. The leadership style that carried an organisation through stability is rarely the one that carries it through disruption — and the switch is a design decision, not a personality trait.",
    category: "Leadership",
    date: "2026-02-02",
    relatedFramework: "8c-crisis-to-clarity",
    sections: [
      {
        heading: "Why style matters more under pressure",
        paragraphs: [
          "In stable conditions, leadership style is largely cosmetic — the system absorbs the difference. Under pressure the system stops absorbing anything, and every decision routes through the leader's default behaviour. That is why crisis is a forced audit: systems reveal what breaks and what holds, and people reveal who acts and who stalls.",
          "The mistake most leadership development makes is treating style as identity. It is not. Style is a setting. The discipline is knowing which setting the current condition requires, and having the range to change it without losing your own compass — shifting tempo while holding the same melody.",
        ],
      },
      {
        heading: "The six styles that matter in transformation",
        paragraphs: [
          "Directive. Used when ambiguity is the primary cost and someone must name the frame. Directive leadership is legitimate only for as long as clarity is genuinely missing; held longer, it manufactures the dependency it was meant to remove.",
          "Diagnostic. The style that resists the urge to act. It asks what is missing rather than what is broken, because the real question in a stalled organisation is rarely what's broken — it's what's missing.",
          "Architectural. This is the style that builds structure instead of managing symptoms. Governance is not a brake; it is the accelerator, and the architectural leader installs it as a roadmap rather than a control layer.",
          "Coaching. The human infrastructure of change. Performance requires psychological safety before execution, and coaching is the only style that produces safety at the speed a transformation needs.",
          "Delegating. Once trust is earned, the failure mode is micro-correction. Teams don't grow when we constantly override their thinking; they grow when we trust them to think, to act, to lead.",
          "Interpretive. The style that translates technology into human terms. Technology becomes transformation only when leaders act as interpreters — embedding innovation into systems, and into the lives of the people who will live with it every day.",
        ],
      },
      {
        heading: "Sequencing style through the 8C framework",
        paragraphs: [
          "Style is not a menu you pick from at random; it maps onto the condition the organisation is currently in. Clarity and Conditions call for directive and diagnostic work. Control and Capability call for architectural leadership. Calibration and Correction depend on interpretive and coaching behaviour. Continuity and Coaching demand delegation, because governance that outlives its champion is the only governance that counts.",
          "Sequencing errors are the most expensive leadership mistake in transformation. Delegating before clarity exists produces silos — silos aren't created by ego, they feel safe when clarity is missing. Architecting before capability exists produces compliance theatre. Coaching before conditions are named produces sympathy without progress.",
        ],
      },
      {
        heading: "The B-player trap",
        paragraphs: [
          "Every style discussion eventually hits a staffing reality. A players can hire B players, but B players can never hire A players — they will always hire C players. A players are risk-takers and challengers who thrive under pressure. B players present as A players while taking credit for C-level work.",
          "In crisis this matters because style range is concentrated in A players. A leadership team stacked with B players will default to a single style regardless of condition, and the organisation will read that rigidity as the crisis itself.",
        ],
      },
      {
        heading: "What to install before the next crisis",
        paragraphs: [
          "Crisis forces a clarity that comfort never could. The only question is whether you wait for the crisis or install the clarity now. Installing it means three things: decision rights that are legible without escalation, correction architecture built before your assumptions fail, and leaders who build systems rather than leaders who fight fires.",
          "Adoption rate is the only metric that matters in the first ninety days. If style range is real, adoption follows; if it is not, the transformation becomes an installation exercise instead of an institutional capability.",
        ],
      },
    ],
  },
  {
    slug: "the-investment-paradox",
    number: "01",
    title: "The Investment Paradox: Why Transformation Spending Fails at the Human Layer",
    summary:
      "Transformation investment can purchase systems, expertise, and momentum. It cannot bypass the human conditions required to hold the change.",
    lede: "Transformation investment can purchase systems, expertise, and momentum. It cannot bypass the human conditions required to hold the change.",
    category: "Human readiness",
    date: "2026-01-14",
    relatedFramework: "8c-crisis-to-clarity",
    sections: [
      {
        heading: "Investment is not installation readiness",
        paragraphs: [
          "A transformation budget can make the intended future visible long before the institution is ready to carry it. New platforms, governance structures, and advisory programs may all be rational. The paradox begins when their presence is treated as proof that the underlying operating conditions have changed.",
          "The human layer is where authority, capability, identity, trust, and correction become behavior. When those conditions remain unclear, investment accelerates activity without creating institutional readiness.",
        ],
      },
      {
        heading: "The hidden cost is interpretive",
        paragraphs: [
          "People do not encounter transformation as a neutral plan. They interpret what it means for status, competence, belonging, and consequence. If leadership does not make those meanings discussable, the organization fills the gap with private narratives and protective behavior.",
          "This is why visible resistance is often a late signal. The earlier signal is ambiguity: unclear ownership, duplicated decisions, quiet workarounds, and capability assumptions that nobody has tested.",
        ],
      },
      {
        heading: "Diagnose before adding momentum",
        paragraphs: [
          "ClarityOS begins before the upgrade. It asks whether the institution can name the real problem, read its conditions, assign control, build capability, calibrate evidence, correct drift, preserve continuity, and coach the new behavior.",
          "The practical decision is not to spend less by default. It is to sequence investment so the human operating system is strengthened at the same time as the technical and governance system it must hold.",
        ],
      },
    ],
  },
  {
    slug: "ai-adoption-vs-human-readiness",
    number: "02",
    title: "AI Adoption vs. Human Readiness: The Pre-Governance Gap",
    summary:
      "AI governance begins too late when institutions write controls before clarifying who can judge, intervene, learn, and remain accountable.",
    lede: "AI governance begins too late when institutions write controls before clarifying who can judge, intervene, learn, and remain accountable.",
    category: "AI governance",
    date: "2026-01-07",
    relatedFramework: "ai-governance-integration",
    sections: [
      {
        heading: "Governance cannot substitute for readiness",
        paragraphs: [
          "Policies and committees are necessary in consequential AI adoption. They are not sufficient. A governance document cannot decide whether a team understands the affected decision, whether leaders can challenge an output, or whether ownership survives when work moves across human and machine boundaries.",
          "The pre-governance gap sits beneath the formal layer. It includes decision clarity, capability, escalation, cultural permission to question, and the continuity required when a model or workflow changes.",
        ],
      },
      {
        heading: "Start with the decision, not the tool",
        paragraphs: [
          "The useful unit of analysis is the decision being changed. Who owns it now? What evidence shapes it? Which consequences can be reversed? Where does judgment remain human, and how will that judgment be trained rather than assumed?",
          "These questions make AI adoption concrete. They also expose where technical ambition is outrunning the institution's ability to govern its own behavior.",
        ],
      },
      {
        heading: "Integrate correction before scale",
        paragraphs: [
          "A responsible operating model defines how uncertainty is surfaced, how exceptions move, how human review works, and how learning changes the system. Correction is not a final safeguard; it is part of the design.",
          "ClarityOS positions this readiness work as the prerequisite to governance at scale. It complements legal, security, data, and technical controls rather than claiming to replace them.",
        ],
      },
    ],
  },
  {
    slug: "foundation-before-scale",
    number: "03",
    title: "Foundation Before Scale: How the Pyramid Framework Sequences Transformation",
    summary:
      "The Pyramid distinguishes five levels of maturity so leaders can stop asking optimization to repair a missing foundation.",
    lede: "The Pyramid distinguishes five levels of maturity so leaders can stop asking optimization to repair a missing foundation.",
    category: "Transformation architecture",
    date: "2025-12-19",
    relatedFramework: "pyramid-framework",
    sections: [
      {
        heading: "A sequence is a strategic constraint",
        paragraphs: [
          "Transformation programs often contain the right ingredients in the wrong order. Optimization begins before roles are stable. Alignment workshops begin before authority is visible. Technology scales a process whose purpose is still disputed.",
          "The Pyramid Framework introduces sequence as a discipline: Foundation, Structure, Alignment, Optimization, and Transformation. Each level asks a different question and creates the conditions for the next.",
        ],
      },
      {
        heading: "Five levels, not five slogans",
        paragraphs: [
          "Foundation tests the human and operating conditions. Structure makes roles, decisions, and interfaces explicit. Alignment connects those structures to a shared direction. Optimization improves what is already coherent. Transformation becomes possible when the preceding levels can carry a different system.",
          "The model does not imply that institutions move in a perfect line. It gives leaders a way to diagnose where pressure is being applied at the wrong level.",
        ],
      },
      {
        heading: "Do not confuse maturity with engagement",
        paragraphs: [
          "The five-level Pyramid remains distinct from the four-stage ClarityOS Engagement Roadmap: Foundation, Operational, Transformation, and Integration. The Pyramid describes transformation maturity. The roadmap describes the progression of an engagement.",
          "Keeping the two models separate protects their usefulness. One diagnoses the system; the other organizes the work.",
        ],
      },
    ],
  },
  {
    slug: "what-crisis-reveals-before-the-dashboard-does",
    number: "04",
    title: "What Crisis Reveals Before the Dashboard Does",
    summary:
      "Pressure exposes ownership, trust, hidden dependencies, and correction capacity before formal reporting can explain what changed.",
    lede: "Pressure exposes ownership, trust, hidden dependencies, and correction capacity before formal reporting can explain what changed.",
    category: "Crisis & continuity",
    date: "2025-12-05",
    relatedFramework: "crisis-as-audit",
    sections: [
      {
        heading: "Crisis compresses the truth",
        paragraphs: [
          "Under pressure, institutions reveal how they actually work. Informal decision paths become visible. Teams discover which dependencies were never owned. Leaders learn whether escalation creates clarity or simply moves anxiety upward.",
          "A dashboard may later describe the event. The behavior in the room shows the operating system in real time.",
        ],
      },
      {
        heading: "Restore function, not appearance",
        paragraphs: [
          "The instinct to return quickly to normal can erase the evidence crisis provides. If the institution restores familiar reporting and routines without examining the conditions that failed, recovery becomes a reset to the same fragility.",
          "Crisis as Audit asks what pressure exposed, which hidden condition produced it, and what must be corrected before normal operations are declared.",
        ],
      },
      {
        heading: "Continuity is a choice",
        paragraphs: [
          "Not everything should survive disruption. Continuity means deciding what must endure—mission, duty, critical knowledge, legitimate authority—and redesigning the surrounding system so those elements can hold.",
          "The next step is not endless diagnosis. It is a proportionate correction that protects the essential while making future failure less likely.",
        ],
      },
    ],
  },
  {
    slug: "cross-cultural-authority-in-the-gcc",
    number: "05",
    title: "Cross-Cultural Authority in the GCC: Map the Ecosystem Before You Lead It",
    summary:
      "Authority travels through context, trust, protocol, and contribution—not title alone. Map the ecosystem before importing a leadership script.",
    lede: "Authority travels through context, trust, protocol, and contribution—not title alone. Map the ecosystem before importing a leadership script.",
    category: "GCC leadership",
    date: "2025-11-20",
    relatedFramework: "cross-cultural-authority",
    sections: [
      {
        heading: "Formal authority is only one layer",
        paragraphs: [
          "A role may provide the right to convene a meeting without providing the trust required to move a consequential decision. In cross-cultural environments, the distance between title and influence becomes especially important.",
          "Leaders need to understand who carries formal authority, who shapes interpretation, where trust sits, and how protocol protects relationships and legitimacy.",
        ],
      },
      {
        heading: "Map before you perform certainty",
        paragraphs: [
          "Cultural Ecosystem Mapping replaces broad stereotypes with observed relationships. It asks how information moves, who can challenge safely, which histories matter, and what contribution earns the right to influence.",
          "This is not a request to abandon standards or avoid directness. It is a requirement to translate leadership into a context where people can trust and enact it.",
        ],
      },
      {
        heading: "Authority is accumulated through consequence",
        paragraphs: [
          "Cross-cultural authority grows when competence, respect, and useful contribution align. The leader becomes legible not because every local code is mastered, but because decisions demonstrate responsibility for people, institutions, and outcomes.",
          "The practical sequence is simple: read the ecosystem, separate title from influence, build trust through contribution, and exercise authority proportionately.",
        ],
      },
    ],
  },
  {
    slug: "governance-as-an-accelerator",
    number: "06",
    title: "Governance as an Accelerator: Designing Control That Enables Action",
    summary:
      "Governance accelerates execution when authority, thresholds, evidence, and correction are designed as one operating system.",
    lede: "Governance accelerates execution when authority, thresholds, evidence, and correction are designed as one operating system.",
    category: "Governance & control",
    date: "2025-11-06",
    relatedFramework: "governance-as-accelerator",
    sections: [
      {
        heading: "Control fails when it is detached from action",
        paragraphs: [
          "Governance becomes friction when it adds approval without clarifying judgment. People wait because decision rights are ambiguous, thresholds are invisible, and escalation is treated as a sign of failure rather than part of the operating design.",
          "The result is not control. It is hesitation, duplication, and hidden workarounds.",
        ],
      },
      {
        heading: "Bounded autonomy is faster",
        paragraphs: [
          "Effective governance makes clear what can be decided locally, what evidence is required, when consequence crosses a threshold, and who must intervene. That clarity gives teams room to act without guessing what will later be challenged.",
          "Control and speed are not opposites when both are designed around the same decision architecture.",
        ],
      },
      {
        heading: "Correction completes the design",
        paragraphs: [
          "No governance system is correct forever. It needs a cadence for testing assumptions, examining exceptions, and changing the control when evidence shows that the system has drifted.",
          "Governance as Accelerator therefore connects decision rights to calibration and correction. The aim is not more governance. It is governance proportionate to consequence and useful to action.",
        ],
      },
    ],
  },
];

export type ExternalPublication = {
  publisher: string;
  title: string;
  date?: string;
  summary: string;
  url?: string;
};

export const EXTERNAL_PUBLICATIONS: ExternalPublication[] = [
  {
    publisher: "Tech Oman",
    title: "Zeeshan Sabri — Author profile",
    summary:
      "Author profile highlighting work as a strategist in AI, governance, operating design, and leadership systems focused on Oman's digital transformation.",
    url: "https://techoman.om/author/zeeshansabri/",
  },
  {
    publisher: "Tech Oman",
    title: "Why Oman's Next Tech Leap Requires Structural Clarity Before Scale",
    date: "2026-04-23",
    summary:
      "Article on Oman's digital transformation turning point and the structural clarity required to translate tech adoption into institutional capability.",
    url: "https://techoman.om/why-omans-next-tech-leap-requires-structural-clarity-before-scale/",
  },
  {
    publisher: "Tech Oman",
    title: "What the 1990 Kuwait Invasion Taught Me About Organizational Transformation",
    date: "2026-03-14",
    summary:
      "Personal essay connecting the 1990 Kuwait invasion to the principle that stabilisation must precede optimisation in organisational transformation.",
    url: "https://techoman.om/what-the-1990-kuwait-invasion-taught-me-about-organizational-transformation/",
  },
  {
    publisher: "Oman Startup Hub",
    title: "Zeeshan Sabri — Contributor profile",
    summary:
      "Profile detailing role as Chief Operating Officer of SuperJet Oman and leadership of the national digital platform integrating e-visa.",
  },
  {
    publisher: "NISCL",
    title: "Zeeshan Sabri — Strategic Sourcing feature",
    summary:
      "National Institute of Supply Chain Leaders profile highlighting the Strategic Sourcing Lead engagement with Motorola Solutions.",
  },
  {
    publisher: "CxO Global Forum",
    title: "Brilliant Minds Need Structured Ecosystems",
    date: "2026-05-20",
    summary:
      "Feature framing the argument that talent without operating structure under-delivers, and how ecosystems must be engineered for judgment to compound.",
    url: "https://news.cxoforum.global/brilliant-minds-need-structured-ecosystems/",
  },
  {
    publisher: "LinkedIn",
    title: "Oman Startup Hub — Founders Workshop",
    date: "2025",
    summary:
      "Field note from the Oman Startup Hub Founders Workshop: 'What You Can't Predict' — pattern-recognition for early-stage operators.",
  },
  {
    publisher: "LinkedIn",
    title: "Kuwait Procurement Summit 2026 — Announcement",
    date: "2026",
    summary:
      "Announcement of participation in the Kuwait Procurement Summit 2026 as Managing Director of Global Markets Technologies LLC.",
  },
  {
    publisher: "Instagram · 12events",
    title: "Welcome — Kuwait Procurement Summit 2026",
    date: "2026",
    summary:
      "Official welcome post for Zeeshan Sabri as a featured speaker at the Kuwait Procurement Summit 2026.",
  },
];

export const NEWSLETTER_ISSUES = [
  { number: 1, slug: "issue-01", title: "The Dispatch — Issue 01", date: "2025-11-01",
    excerpt: "Why the human layer must be installed before the system layer." },
  { number: 2, slug: "issue-02", title: "The Dispatch — Issue 02", date: "2025-12-01",
    excerpt: "Governance as accelerator: the redesign that changes the tax rate on velocity." },
];

export const SPEAKING = [
  {
    title: "The Secret of Successful Transformation",
    org: "Decode Entrepreneur's Conference · CxO Global Forum",
    venue: "LUMS Lahore",
    date: "15 January 2026",
    role: "Conference Speaker",
    band: "keynote" as const,
  },
  {
    title: "Entrepreneurial Excellence Award — Keynote",
    org: "Founders 2.0 Conference",
    venue: "Dubai",
    date: "December 2025",
    role: "Award Recipient · Keynote",
    band: "keynote" as const,
  },
  {
    title: "The Architecture of Change",
    org: "Ignite Fireside Chat",
    venue: "Regional stage",
    date: "2025",
    role: "Fireside Speaker",
    band: "keynote" as const,
  },
  {
    title: "Validating Founder Mindset, Assumptions, and Adaptability Before Scaling",
    org: "Oman Startup Hub",
    venue: "aljabr Office, Muscat",
    date: "30 March 2026",
    role: "Workshop Lead",
    band: "workshop" as const,
  },
  {
    title: "What You Can't Predict — Founders Session",
    org: "Oman Startup Hub",
    venue: "Muscat, Oman",
    date: "2025",
    role: "Workshop Lead",
    band: "workshop" as const,
  },
  {
    title: "AI for Smart Business — A New Era Begins",
    org: "Serendib Training",
    venue: "Hyatt Regency Oryx, Doha",
    date: "3 July 2025",
    role: "Facilitator",
    band: "workshop" as const,
  },
  {
    title: "KSA Defence Procurement Programme",
    org: "Kingdom of Saudi Arabia",
    venue: "Riyadh",
    date: "2024–2025",
    role: "Executive Faculty",
    band: "workshop" as const,
  },
  {
    title: "Procurement Leaders Panel",
    org: "Procurement Leaders",
    venue: "Dubai",
    date: "2024",
    role: "Panelist",
    band: "featured" as const,
  },
  {
    title: "Motorola Solutions — ME Partner Enablement",
    org: "Motorola Solutions",
    venue: "Dubai",
    date: "2024",
    role: "Featured Speaker",
    band: "featured" as const,
  },
  {
    title: "Kuwait Procurement Summit",
    org: "Kuwait Procurement Summit",
    venue: "Kuwait",
    date: "2024",
    role: "Featured Speaker",
    band: "featured" as const,
  },
  {
    title: "NCMS Leadership Programme",
    org: "National Company for Mechanical Systems",
    venue: "Riyadh",
    date: "2024–2025",
    role: "Executive Faculty",
    band: "workshop" as const,
  },
];

export const NAV = [
  { label: "ClarityOS", href: "/clarityos" },
  { label: "Services", href: "/services" },
  { label: "Media", href: "/media" },
  { label: "Connect", href: "/connect" },
];


// ---------- Film, press, and upcoming events ----------
import videoOsh from "\@/assets/video-osh-interview.mp4.asset.json";
import videoSuperjet from "\@/assets/video-superjet-dhofar.mp4.asset.json";
import videoBeyond from "\@/assets/video-beyond-techniques.mp4.asset.json";
import posterOsh from "\@/assets/poster-osh-interview.jpg.asset.json";
import posterSuperjet from "\@/assets/poster-superjet-dhofar.jpg.asset.json";
import posterBeyond from "\@/assets/poster-beyond-techniques.jpg.asset.json";
import eventOshWorkshop from "\@/assets/event-osh-workshop-2026.jpg.asset.json";
import bannerDecode from "\@/assets/banner-decode.jpg.asset.json";
import workshopAiDoha from "\@/assets/workshop-ai-doha-2025.png.asset.json";
import workshopOsh2025 from "\@/assets/workshop-osh-2025.jpg.asset.json";
import recLumsAward from "\@/assets/rec-lums-award.jpg.asset.json";
import pressCxoPdf from "\@/assets/press-cxo-april-2026.pdf.asset.json";
import pressCxoCover from "\@/assets/press-cxo-cover.jpg.asset.json";

export const FILM_HERO = {
  src: videoOsh.url,
  poster: posterOsh.url,
  title: "What You Can\'t Predict: Founders in the Age of Digital Drift",
  meta: "Post-workshop interview · Muscat, Oman",
  ratio: "9 / 16",
};

/** Self-hosted video: SuperJet and Dhofar Insurance signing ceremony */
export const SuperJetDhofarVideo = {
  src: videoSuperjet.url,
  poster: posterSuperjet.url,
  title: "SuperJet and Dhofar Insurance — Signing Ceremony",
  meta: "Executive announcement · Field recording",
  ratio: "9 / 16",
};

export const MEDIA_FILM = [
  FILM_HERO,
  SuperJetDhofarVideo,
];

/**
 * Delivered workshops and talks — the credibility ledger. Every entry is a
 * completed engagement with a flyer or banner on file. Add new rows at the top
 * as they are delivered; move an announced date here once it has run.
 */
export const WORKSHOP_LEDGER = [
  {
    title: "How to validate founder mindset, assumptions, and adaptability before scaling",
    host: "Oman Startup Hub",
    venue: "aljabr Office, Madinat Sultan Qaboos, Muscat",
    date: "30 March 2026",
    format: "Founders workshop",
    image: eventOshWorkshop.url,
    alt: "Workshop flyer — validating founder mindset, assumptions, and adaptability before scaling, Oman Startup Hub, 30 March 2026",
  },
  {
    title: "The Secret of Successful Transformation",
    host: "Decode Entrepreneur's Conference · CxO Global Forum",
    venue: "LUMS Lahore",
    date: "15 January 2026",
    format: "Conference keynote",
    image: bannerDecode.url,
    alt: "Decode Entrepreneur's Conference banner — Zeeshan Sabri, The Secret of Successful Transformation, LUMS Lahore, January 2026",
  },
  {
    title: "AI for Smart Business — A New Era Begins",
    host: "Serendib Training",
    venue: "Hyatt Regency Oryx, Doha",
    date: "3 July 2025",
    format: "Full-day executive workshop",
    image: workshopAiDoha.url,
    alt: "AI for Smart Business workshop flyer — Zeeshan Sabri, Serendib Training, Doha, 3 July 2025",
  },
  {
    title: "What You Can't Predict — Founders Session",
    host: "Oman Startup Hub",
    venue: "Muscat, Oman",
    date: "2025",
    format: "Founders workshop",
    image: workshopOsh2025.url,
    alt: "Oman Startup Hub recap — What You Can't Predict founders workshop with Zeeshan Sabri, Muscat 2025",
  },
];

export const WORKSHOP_STATS = [
  { value: "4", label: "Countries delivered in" },
  { value: "12+", label: "Workshops & keynotes" },
  { value: "500+", label: "Founders and executives in the room" },
];


export const PRESS_ITEMS = [
  {
    title:
      "Paradigm Shift in GCC Transformation: Zeeshan Sabri Wins Entrepreneurial Excellence Award for Pioneering ClarityOS Methodology",
    outlet: "MarketersMedia",
    date: "December 2025",
    url: SITE.award.pressUrl,
    cover: null as string | null,
  },
  {
    title: "CXO Global Forum Magazine — April 2026 Edition",
    outlet: "CXO Global Forum",
    date: "April 2026",
    url: pressCxoPdf.url,
    cover: pressCxoCover.url,
  },
];

export const RECOGNITION_LUMS = {
  src: recLumsAward.url,
  title: "LUMS Centre for Entrepreneurship — Speaker Recognition",
  note: "The Secret of Successful Transformation · Decode Conference, LUMS Lahore, January 2026.",
};
