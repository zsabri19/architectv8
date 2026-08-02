// Absorbed content from architect v4 (draft). Additive: enriches existing
// FRAMEWORKS/BOOK data in src/lib/site-data.ts without replacing it.
// Keys use the CURRENT project's framework slugs (mapped from v4 where needed).

export type FrameworkEnrichment = {
  category: string;
  definition: string;
  useCases: string[];
  process: string[];
  serviceTitle: string;
  faqs: { question: string; answer: string }[];
};

// Map: current framework slug -> v4 enrichment
export const FRAMEWORK_ENRICHMENTS: Record<string, FrameworkEnrichment> = {
  "exile-resilience": {
    category: "Resilience & identity",
    definition:
      "A lens for examining how identity, memory, belonging, and agency can be preserved and reorganized when familiar structures disappear.",
    useCases: [
      "Leadership after forced or sudden transition",
      "Teams operating through loss of certainty",
      "Institutions rebuilding trust after disruption",
    ],
    process: [
      "Name what was lost",
      "Separate identity from circumstance",
      "Identify retained capabilities",
      "Choose the next constructive contribution",
    ],
    serviceTitle: "ClarityOS Personal Session",
    faqs: [
      {
        question: "Is this a therapeutic model?",
        answer:
          "No. It is a leadership and reflection framework, not clinical care or a substitute for qualified mental-health support.",
      },
    ],
  },
  "cultural-ecosystem-mapping": {
    category: "Cross-cultural leadership",
    definition:
      "A structured way to read the formal and informal cultural ecosystem surrounding a decision, transformation, or market entry.",
    useCases: [
      "GCC leadership transitions",
      "Cross-border programs",
      "Multi-stakeholder institutional change",
    ],
    process: [
      "Identify actors",
      "Map authority and influence",
      "Trace trust and information flows",
      "Adapt the engagement sequence",
    ],
    serviceTitle: "Board Advisory",
    faqs: [
      {
        question: "Does the map reduce culture to stereotypes?",
        answer:
          "It should do the opposite: replace broad assumptions with observed relationships, context, and decision behavior.",
      },
    ],
  },
  "identity-preservation": {
    category: "Resilience & identity",
    definition:
      "A framework for distinguishing essential identity from legacy habits so transformation can move without erasing what gives a person or institution coherence.",
    useCases: [
      "Organizational redesign",
      "Founder-to-institution transition",
      "Leadership role change",
    ],
    process: [
      "Name the enduring core",
      "Audit inherited behavior",
      "Retire what no longer serves",
      "Translate identity into new operating choices",
    ],
    serviceTitle: "ClarityOS Personal Session",
    faqs: [
      {
        question: "Is preservation the same as resisting change?",
        answer:
          "No. It identifies what deserves continuity so that other elements can change more deliberately.",
      },
    ],
  },
  "constraint-based-innovation": {
    category: "Innovation & execution",
    definition:
      "A decision framework for converting limits in time, capability, governance, market access, or resources into a clearer innovation brief.",
    useCases: [
      "Crisis response",
      "Resource-constrained programs",
      "New-market execution",
    ],
    process: [
      "Inventory constraints",
      "Separate fixed from assumed limits",
      "Reframe the design question",
      "Test the smallest responsible move",
    ],
    serviceTitle: "ClarityOS Enterprise",
    faqs: [
      {
        question: "Does this celebrate under-resourcing?",
        answer:
          "No. It makes constraints explicit so leaders can challenge false limits and design responsibly around real ones.",
      },
    ],
  },
  "governance-as-accelerator": {
    category: "Governance & control",
    definition:
      "A governance lens that treats clear authority and bounded autonomy as enablers of execution, not administrative friction.",
    useCases: [
      "Transformation governance",
      "Executive decision forums",
      "High-consequence delivery",
    ],
    process: [
      "Map recurring decisions",
      "Assign authority",
      "Define thresholds",
      "Create rapid correction loops",
    ],
    serviceTitle: "ClarityOS Enterprise",
    faqs: [
      {
        question: "Is more governance always better?",
        answer:
          "No. The aim is proportionate governance: enough control to protect consequence, with enough clarity to enable action.",
      },
    ],
  },
  "market-volatility-navigation": {
    category: "Crisis & markets",
    definition:
      "A framework for separating signal, exposure, decision horizon, and controllable action under volatile conditions.",
    useCases: [
      "Market disruption",
      "Strategic reprioritization",
      "Executive crisis rooms",
    ],
    process: [
      "Stabilize the decision frame",
      "Separate signal from noise",
      "Rank exposures",
      "Choose reversible and irreversible moves deliberately",
    ],
    serviceTitle: "Board Advisory",
    faqs: [
      {
        question: "Does the framework predict markets?",
        answer:
          "No. It structures leadership decisions under volatility; it is not financial advice or a forecasting model.",
      },
    ],
  },
  "crisis-as-audit": {
    category: "Crisis & markets",
    definition:
      "A diagnostic approach that examines what pressure reveals about the system before rushing to restore its previous appearance.",
    useCases: [
      "Post-incident review",
      "Leadership transitions",
      "Operational disruption",
    ],
    process: [
      "Capture what pressure exposed",
      "Trace the underlying condition",
      "Distinguish symptom from system",
      "Correct before normalizing",
    ],
    serviceTitle: "ClarityOS Enterprise",
    faqs: [
      {
        question: "Does this imply crisis is desirable?",
        answer: "No. It means that when crisis occurs, its evidence should not be wasted.",
      },
    ],
  },
  "pyramid-framework": {
    category: "Transformation architecture",
    definition:
      "A five-level maturity model that prevents leaders from scaling ambition before the underlying human and operating layers can hold it.",
    useCases: [
      "Enterprise transformation sequencing",
      "Capability-roadmap design",
      "Program recovery",
    ],
    process: [
      "Test the foundation",
      "Make structure explicit",
      "Align authority and behavior",
      "Optimize only what can hold",
      "Transform from a stable base",
    ],
    serviceTitle: "ClarityOS Enterprise",
    faqs: [
      {
        question: "Is this the ClarityOS Engagement Roadmap?",
        answer:
          "No. The Pyramid is a five-level transformation model; the four-stage roadmap describes how a ClarityOS engagement progresses.",
      },
    ],
  },
  "function-reframing": {
    category: "Leadership & execution",
    definition:
      "A framework for redefining a team or function by its institutional contribution, decision role, and value under changing conditions.",
    useCases: [
      "Operating-model redesign",
      "Procurement or support-function elevation",
      "Role clarity",
    ],
    process: [
      "Describe the inherited frame",
      "Name the required contribution",
      "Redesign decision interfaces",
      "Align capability and measures",
    ],
    serviceTitle: "ClarityOS Enterprise",
    faqs: [
      {
        question: "Is reframing only a communications exercise?",
        answer:
          "No. The new frame must change decision rights, interfaces, capability, and evidence—not only language.",
      },
    ],
  },
  "cross-cultural-authority": {
    category: "Cross-cultural leadership",
    definition:
      "A leadership framework for aligning competence, protocol, trust, and local legitimacy when formal title alone cannot carry authority.",
    useCases: [
      "GCC executive leadership",
      "International partnerships",
      "Cross-cultural facilitation",
    ],
    process: [
      "Read the ecosystem",
      "Separate title from influence",
      "Build trust through contribution",
      "Exercise authority proportionately",
    ],
    serviceTitle: "Board Advisory",
    faqs: [
      {
        question: "Does local adaptation require abandoning standards?",
        answer:
          "No. It requires translating standards into a context where people understand, trust, and can enact them.",
      },
    ],
  },
  "super-labor": {
    category: "Capability & future of work",
    definition:
      "A framework for designing augmented capability around accountable human judgment rather than treating automation as a simple labor substitute.",
    useCases: [
      "AI-enabled workforce design",
      "Role and capability redesign",
      "Productivity transformation",
    ],
    process: [
      "Map the unit of work",
      "Identify judgment points",
      "Assign machine and human roles",
      "Protect accountability and learning",
    ],
    serviceTitle: "ClarityOS Enterprise",
    faqs: [
      {
        question: "Is this a job-reduction model?",
        answer:
          "No. It is a capability-design lens. Workforce consequences require separate, evidence-led and ethically governed decisions.",
      },
    ],
  },
  "digital-nation-building": {
    category: "Governance & institutions",
    definition:
      "A systems lens for examining the human and institutional foundations beneath national-scale digital programs.",
    useCases: [
      "Public-sector transformation",
      "National digital programs",
      "Institutional capacity building",
    ],
    process: [
      "Define the public outcome",
      "Map institutional dependencies",
      "Test trust and inclusion",
      "Sequence capability before scale",
    ],
    serviceTitle: "Board Advisory",
    faqs: [
      {
        question: "Is this a technology architecture?",
        answer:
          "No. It complements technical architecture by focusing on public value, institutional readiness, and governance.",
      },
    ],
  },
  "ai-governance-integration": {
    category: "AI & governance",
    definition:
      "A pre-governance framework for testing whether people, authority, capability, and correction mechanisms can carry an AI initiative responsibly.",
    useCases: [
      "Enterprise AI adoption",
      "AI governance design",
      "Executive readiness reviews",
    ],
    process: [
      "Define the decision affected",
      "Map human and institutional readiness",
      "Assign governance and escalation",
      "Test correction before scale",
    ],
    serviceTitle: "ClarityOS Enterprise",
    faqs: [
      {
        question: "Is this a complete technical AI-risk standard?",
        answer:
          "No. It is a human-readiness and operating-governance layer designed to work alongside qualified legal, security, data, and technical controls.",
      },
    ],
  },
  "character-compass": {
    category: "Leadership & self-governance",
    definition:
      "A reflective leadership framework for examining values, conduct, consequence, and consistency when authority is tested.",
    useCases: [
      "Executive reflection",
      "Leadership transitions",
      "Decision coaching",
    ],
    process: [
      "Name the pressure",
      "Identify the value at stake",
      "Examine likely conduct and consequence",
      "Choose the action that can be owned",
    ],
    serviceTitle: "ClarityOS Personal Session",
    faqs: [
      {
        question: "Is the assessment clinically validated?",
        answer:
          "No assessment is published yet. Any future instrument requires approved scoring, instructions, consent, and legal wording before release.",
      },
    ],
  },
};

// ---------- Book memoir content (from v4) ----------

export const BOOK_ABOUT = {
  headline: "A Story of Clarity Forged in Crisis",
  lead:
    "In 1990, when war forced his family from Kuwait to Pakistan, Zeeshan Sabri experienced exile before he understood the word.",
  body: [
    "Those early years of uncertainty became the compass for a life dedicated to building clarity in chaos, dignity in work, and governance in transformation. This memoir blends personal narrative with professional frameworks forged in Fortune 500 boardrooms and national-scale projects across the Gulf.",
    "From Huawei and Motorola to the Government of Oman, the journey captures what it takes to lead under pressure, reframe procurement into progress, and design frameworks like the Pyramid and Beyond Techniques that anchor transformation in both people and systems.",
  ],
  quote: "True transformation starts where trust has been broken and dignity restored.",
} as const;

export const BOOK_PRESS = {
  eyebrow: "As Seen In MarketersMEDIA — Founders 2.0 Conference, Dubai, December 2025",
  quote:
    "We are seeing a maturity shift in the GCC. Leaders are realizing that you cannot install a First World governance system on a broken human operating system.",
  attribution: "Zeeshan Sabri, Founders 2.0 Conference, Dubai",
  description:
    "The Entrepreneurial Excellence Award recognized ClarityOS as the world's first Pre-Governance Operating System, currently deployed across national-scale digital banking, telecom, and defense procurement transformations serving 5 million+ users. Press coverage published January 29, 2026.",
  cta: "Read the Press Release",
} as const;

export const BOOK_PROLOGUE = [
  "Muscat, December 2025. I was sitting in my home office, thousands of kilometers from the Founders 2.0 Conference stage in Dubai. Visa logistics and travel constraints had made the trip impossible — a familiar pattern for someone who has spent a career navigating borders that do not always open on schedule. So I watched the ceremony through a screen, the way I had learned to participate in a world that does not always make space for you at the table.",
  "When they called my name for the Entrepreneurial Excellence Award, the applause was distant, filtered through a video feed. But what I felt was immediate. Not pride, exactly — something closer to recognition. Not the kind the audience was giving me, but the kind you give yourself when the pattern you have been building for decades is finally seen by others.",
  "They don't give awards for playing it safe. Crisis forces clarity that comfort never could.",
  "The award was for ClarityOS — a methodology the citation described as the world's first Pre-Governance Operating System. But ClarityOS did not begin in a strategy session or a product lab. It began on a night in 1990, in a city under siege, in the grip of a mother trying to keep her family together as the world she had built dissolved around her.",
  "Kuwait, August 2, 1990. The sirens started at dusk. Not the test alarms we had grown accustomed to in Kuwait City, but the real ones — the kind that turned ordinary evenings into something you remember for the rest of your life. I was young, barely old enough to understand the geopolitics of what was happening, but old enough to feel the weight of it in my mother's grip as we moved through corridors lit by emergency generators.",
  "Alhamdulillah. The journey continues.",
] as const;

export type BookPartDetail = {
  partNumber: string;
  title: string;
  era: string;
  body: string;
  quote: string;
};

export const BOOK_PART_DETAILS: BookPartDetail[] = [
  {
    partNumber: "I",
    title: "Roots & Resilience",
    era: "Kuwait & Pakistan, 1980s to 1992",
    body:
      "Iraq invades Kuwait on August 2, 1990. A Pakistani family loses everything, rebuilds in Pakistan, and returns to a Kuwait scarred by war. Cricket becomes the training ground for discipline and strategy.",
    quote:
      "Reinvention is not about discarding the past. It is about taking what is broken and giving it new alignment.",
  },
  {
    partNumber: "II",
    title: "Fortune 500 Foundations",
    era: "Huawei and Motorola, 2012 to 2025",
    body:
      "Breaking into Huawei and Motorola as a Pakistani professional in the Gulf, proving credibility twice over, and turning governance from red tape into an $80M, zero-breach runway.",
    quote: "Competence opens the door, but credibility keeps you inside.",
  },
  {
    partNumber: "III",
    title: "The GCC Odyssey",
    era: "Kuwait, Bahrain, Dubai, Qatar, Oman, Saudi Arabia",
    body:
      "Reading six GCC markets as distinct cultural ecosystems rather than one monolith, and building cross-border authority in twenty-four months.",
    quote: "Leaders don't just read contracts. They read cultures.",
  },
  {
    partNumber: "IV",
    title: "Frameworks & Playbooks",
    era: "The signature methodology",
    body:
      "A friend's phone call becomes the Pyramid Framework. Procurement is reframed from a cost center that says no into a strategic growth engine.",
    quote: "If a framework can't guide a friend, it won't guide a Fortune 500.",
  },
  {
    partNumber: "V",
    title: "Building Movements",
    era: "Oman and beyond",
    body:
      "Dignity-first labor reform at Shams for Services; Oman's first Sharia-compliant digital bank; and AI governance built on interpretation, not replacement, through SuperJet.",
    quote: "Sustainable change begins where trust is weakest.",
  },
  {
    partNumber: "VI",
    title: "The Leader & The Self",
    era: "The reckoning",
    body:
      "A TriMetrix assessment becomes the Character Compass. The final chapter turns from Fortune 500 case studies to letters written for Nashwa, Amirah, and Ahlam.",
    quote:
      "Emotional intelligence is not optional. It is the architecture of sustainable leadership.",
  },
];

export const BOOK_METRICS = [
  { n: "90–95%", d: "Pyramid Framework adoption, against a 25% industry standard" },
  { n: "$80M", d: "Procurement portfolio managed with zero compliance breaches" },
  { n: "6", d: "GCC markets navigated, cross-border authority built in 24 months" },
  { n: "75%", d: "Reduction in subcontractor penalties, Super-Labor, Oman" },
] as const;

export const BOOK_ROI_METRICS = [
  { n: "150–200%", d: "Year One ROI across validated case studies" },
  { n: "60–85%", d: "Organizational resilience improvement across crisis scenarios" },
  { n: "80%", d: "Innovation output enhanced through constraint-based approaches" },
  { n: "90%", d: "Leadership sustainability improvement via Character Compass" },
] as const;

export const BOOK_ROADMAP = [
  {
    phase: "Foundation",
    frameworks: "Resilience, Identity, Crisis Audit, Character Compass",
    goal: "Stabilize the human operating system before installing systems.",
  },
  {
    phase: "Operational",
    frameworks:
      "Cultural Mapping, Constraint Innovation, Governance Acceleration, Volatility Navigation",
    goal: "Build repeatable execution and governance rhythms.",
  },
  {
    phase: "Transformation",
    frameworks: "Pyramid, Function Reframing, Super-Labor, Digital Nation Building",
    goal: "Scale structural change and cross-cultural authority.",
  },
  {
    phase: "Integration",
    frameworks: "Cross-Cultural Authority, AI Governance Integration",
    goal: "Embed AI, compliance, and legacy into one coherent system.",
  },
];

export const BOOK_WHY_AUDIENCES = [
  "For leaders who sense that technical frameworks alone are not enough — who know that sustainable transformation requires character, cultural intelligence, and the courage to start at the foundation.",
  "For anyone who has ever been the outsider in the room, the one who had to prove credibility twice over before being heard.",
  "For my daughters — Nashwa, Amirah, and Ahlam — so they understand that their father's restlessness was never aimless. It was a compass.",
] as const;

export const BOOK_DEDICATION =
  "For Nashwa, Amirah, and Ahlam. Leadership is not about titles or positions. It is about presence under pressure, and the space you create for others to grow.";

export const BOOK_CLOSING = {
  thesis:
    "Techniques are necessary but insufficient. What makes you transformational is what lies beyond techniques: character, cultural intelligence, resilience, and the willingness to start at the foundation when everyone else is building from the top.",
};

export const BOOK_PUBLISHER = {
  headline: "Interested in This Manuscript?",
  body:
    "The manuscript is currently in first draft stage and available for publisher review. For inquiries about publishing rights, representation, or collaboration opportunities, please reach out directly.",
  cta: "Contact the Author",
};

// ---------- ClarityOS FAQ ----------

export const CLARITY_FAQS = [
  {
    question: "What is ClarityOS?",
    answer:
      "ClarityOS is Zeeshan Sabri's proprietary methodology for diagnosing and strengthening the human conditions beneath governance, technology, and transformation.",
  },
  {
    question: "Why call it pre-governance?",
    answer:
      "The positioning emphasizes that decision clarity, readiness, capability, accountability, and correction must exist before formal governance can work as intended.",
  },
  {
    question: "Is ClarityOS a software product?",
    answer: "No. It is an operating methodology and engagement architecture, not a software platform.",
  },
  {
    question: "How does the 8C Framework relate to the fourteen pillars?",
    answer:
      "The 8C sequence is the core operating methodology. The fourteen pillars are focused frameworks that apply its logic to specific leadership and institutional problems.",
  },
  {
    question: "Is the Engagement Roadmap the same as the Pyramid Framework?",
    answer:
      "No. The four-stage roadmap organizes an engagement; the five-level Pyramid sequences transformation maturity.",
  },
];
