// Pillar page content. Search-intent led, grounded in ClarityOS frameworks.
// Routes stay presentational; all copy lives here.

export type FaqItem = { question: string; answer: string };
export type PillarSection = { heading: string; paragraphs: string[] };

// ---------- Organizational Development ----------

export const OD_PILLAR = {
  eyebrow: "Pillar / Organizational Development",
  title: "Organizational Development: The Human Layer Beneath Every Transformation",
  lede: "Organizational development is the discipline of improving how an organisation thinks, decides, and behaves — not just how it is structured. Most OD programmes fail because they redesign the chart and leave the human operating system untouched.",
  sections: [
    {
      heading: "What organizational development actually is",
      paragraphs: [
        "Organizational development (OD) is the planned, evidence-led effort to increase an organisation's effectiveness by changing its behaviour, capability, and culture — not only its structure or technology. It sits upstream of HR process and downstream of strategy: it is the work of making an organisation capable of executing what it has already decided.",
        "In practice, OD covers diagnosis, intervention design, capability building, change adoption, and measurement. It borrows from behavioural science, systems thinking, and organisational psychology, and it is judged on one thing: whether people behave differently six months after the programme ends.",
      ],
    },
    {
      heading: "Why most organizational development fails",
      paragraphs: [
        "Three failure modes recur across Fortune 500 and GCC institutions alike. First, the diagnosis is skipped — the intervention is chosen before the problem is understood. Second, the work targets the visible layer (structure, process, tooling) while the invisible layer (trust flows, power topology, silent constraints) stays exactly as it was. Third, there is no correction mechanism, so the first setback is read as failure rather than data.",
        "The common thread: governance is installed before the human conditions that make governance work exist. Decision clarity, readiness, capability, accountability, and correction have to be present first. That is the pre-governance layer — and it is where ClarityOS operates.",
      ],
    },
    {
      heading: "The ClarityOS view of organizational development",
      paragraphs: [
        "ClarityOS treats OD as an installation problem, not a training problem. The 8C Crisis-to-Clarity Framework sequences the eight conditions — clarity, conditions, control, capability, calibration, correction, continuity, coaching — that must hold for change to survive contact with reality.",
        "Cultural Ecosystem Mapping surfaces the invisible operating system beneath a GCC organisation before any intervention is designed. The Pyramid Framework sequences transformation maturity so that foundation work precedes scale. The Character Compass keeps the leadership layer durable while the system is being rebuilt.",
      ],
    },
    {
      heading: "What an organizational development consultant does",
      paragraphs: [
        "An OD consultant diagnoses the gap between what an organisation intends and what it actually does, then designs and sequences the interventions that close it. The work is part forensic — interviews, observation, data, relationship mapping — and part architectural: designing the operating rhythm, decision rights, and capability build that make the new behaviour the default.",
        "The honest version of the role is unglamorous. Most of the value is created in the diagnosis, and most of the risk sits in the adoption. A consultant who arrives with a solution before a diagnosis is selling a product, not doing OD.",
      ],
    },
    {
      heading: "Organizational development in GCC and enterprise contexts",
      paragraphs: [
        "In the GCC, OD carries an additional layer: national transformation agendas, multi-generational family governance, and rapid institutional scaling all compress the timeline for behaviour change. Frameworks imported wholesale from Western practice tend to fail on cultural translation rather than technical merit.",
        "Engagements across Motorola, Huawei, the Central Bank of Oman, NCM, Sanad, and national platforms informed the frameworks on this site. They are built for regulated, multicultural, high-consequence environments — not for workshops.",
      ],
    },
  ] as PillarSection[],
  faqs: [
    {
      question: "What is organizational development?",
      answer:
        "Organizational development is the planned effort to improve an organisation's effectiveness by changing behaviour, capability, and culture — not just structure or technology. It combines diagnosis, intervention design, capability building, and measurement.",
    },
    {
      question: "What is organizational development in HR?",
      answer:
        "Within HR, organizational development is the function responsible for capability building, change adoption, culture, leadership development, and organisational design. It differs from core HR operations, which run hiring, payroll, and compliance; OD is concerned with how the organisation performs, not how it administers people.",
    },
    {
      question: "What does an organizational development consultant do?",
      answer:
        "An OD consultant diagnoses the gap between what an organisation intends and what it actually does, designs the interventions that close it, and sequences them so the new behaviour survives after the engagement ends. Diagnosis comes first; the intervention is chosen from it, never before it.",
    },
    {
      question: "What is the difference between organizational development and change management?",
      answer:
        "Change management delivers a specific change on a defined timeline. Organizational development builds the organisation's ongoing capacity to change. Change management is a project; OD is a capability. A good OD engagement usually leaves a change-management capability behind it.",
    },
    {
      question: "How long does an organizational development programme take?",
      answer:
        "A meaningful diagnosis takes two to four weeks. A first intervention cycle typically runs 90 days. Durable behaviour change is usually visible at six to twelve months, which is why correction and measurement are built into the framework rather than bolted on at the end.",
    },
  ] as FaqItem[],
};

// ---------- Executive Coaching & Advisory ----------

export const EXEC_PILLAR = {
  eyebrow: "Pillar / Executive Advisory",
  title: "Executive Coaching & Advisory for Leaders Who Carry the Decision",
  lede: "Executive coaching builds the leader. Executive advisory carries the decision alongside them. Most senior leaders need both — and the failure to distinguish them is why so many engagements underdeliver.",
  sections: [
    {
      heading: "Executive coaching, executive advisory, and executive mentorship",
      paragraphs: [
        "Executive coaching is developmental. It works on the leader's judgement, self-regulation, presence, and blind spots, and the coach deliberately holds no position on the business decision itself.",
        "Executive advisory is directive. The advisor holds a view, brings domain experience, and shares the weight of a specific decision — a restructure, a crisis, a governance failure, a transformation that has stalled.",
        "Executive mentorship is relational and long-horizon. It is less about a decision or a competency and more about the arc of a career and the character underneath it. A serious engagement moves between all three depending on what the week actually demands.",
      ],
    },
    {
      heading: "CEO advisory and board-level counsel",
      paragraphs: [
        "At CEO and board level, the presenting problem is rarely the real one. A stalled transformation is usually a decision-rights problem. A culture problem is usually an accountability problem. A technology failure is usually a readiness problem that no one was willing to name before procurement closed.",
        "Board advisory work here covers governance readiness, AI governance for regulated environments, transformation oversight, and succession-grade leadership assessment. The output is not a deck — it is a clearer decision and a named owner for it.",
      ],
    },
    {
      heading: "Who this is for",
      paragraphs: [
        "Chief executives and board members carrying a decision they cannot fully delegate. Transformation and technology leaders whose programme is technically on track and behaviourally stalled. Founders scaling past the point where their own judgement was sufficient. Senior leaders newly landed in a GCC context where the cultural operating system is unfamiliar.",
      ],
    },
    {
      heading: "How a ClarityOS engagement runs",
      paragraphs: [
        "Every engagement begins with a clarity diagnosis — no proposal is written before the problem is named. From there the work runs through the 8C sequence: establish clarity, set conditions, define control and decision rights, build capability, calibrate, and install correction so the system self-repairs.",
        "Cadence is typically fortnightly for personal advisory and a 90-day cycle for enterprise programmes, with board briefings scheduled against the governance calendar rather than the consulting one.",
      ],
    },
    {
      heading: "Track record and business advisory context",
      paragraphs: [
        "The frameworks behind this practice were built inside Motorola and Huawei, deployed across the Central Bank of Oman, NCM, Sanad, and NASTP, and taught to executive audiences at LUMS, Decode, and the Oman Startup Hub. AI CERTs-certified for board-level AI governance programmes.",
        "Indicative rate signal for board briefings and executive workshops: USD 350–500 per hour. The Clarity Session exists so the first conversation is a diagnosis, not a sales call.",
      ],
    },
  ] as PillarSection[],
  faqs: [
    {
      question: "What is executive coaching?",
      answer:
        "Executive coaching is a structured developmental relationship focused on a senior leader's judgement, behaviour, and blind spots. The coach does not decide the business question; they improve the quality of the leader making it.",
    },
    {
      question: "What is the difference between executive coaching and executive advisory?",
      answer:
        "Coaching is non-directive and builds the leader's own capability. Advisory is directive — the advisor holds a view and shares the weight of a specific decision. Most senior engagements need both, moving between them as the situation demands.",
    },
    {
      question: "How much does executive coaching cost?",
      answer:
        "Rates vary widely by market and seniority. For board briefings and executive workshops in the GCC, USD 350–500 per hour is a typical signal. Here, engagements start with a Clarity Session so scope is set against a real diagnosis rather than a guess.",
    },
    {
      question: "What is CEO advisory?",
      answer:
        "CEO advisory is counsel to the chief executive on decisions they cannot fully delegate — restructures, crises, governance failures, and stalled transformations. It combines domain experience with an outside view that has no internal position to protect.",
    },
    {
      question: "How long does an executive coaching engagement last?",
      answer:
        "Personal advisory typically runs fortnightly over three to six months. Enterprise programmes run in 90-day cycles. Board advisory is scheduled against the governance calendar and is often ongoing.",
    },
  ] as FaqItem[],
};

// ---------- Personal / People Development Framework ----------

export type CoreConcept = { number: string; title: string; points: { label: string; text: string }[] };
export type MonthStep = { month: string; title: string; action: string };

export const PDF_PILLAR = {
  eyebrow: "Pillar / Personal Development",
  title: "The Practical People Skills Development Framework",
  lede: "A personal development framework is the structure underneath a personal development plan. This one is built from real deployment experience: six core capabilities, and a six-month track that turns them into observable behaviour.",
  intro: [
    "Technical skill gets you hired. People skill determines what you are allowed to lead. This framework exists because most personal development plans list aspirations without a mechanism — no observation loop, no practice ground, no reflection point.",
    "It was written for candidates and early-career professionals, but the six-month track works equally well for a senior leader entering a new organisation, where the first ninety days are entirely a mapping exercise.",
  ],
  concepts: [
    {
      number: "01",
      title: "Observation and Awareness",
      points: [
        {
          label: "Understanding behaviour",
          text: "Observe how people behave under stress, success, challenge, and in interaction. Behaviour under pressure reveals motivation, strength, and where support is needed.",
        },
        {
          label: "Situational awareness",
          text: "The same person behaves differently in a high-pressure setting than a relaxed one. Read the context before you calibrate your approach.",
        },
      ],
    },
    {
      number: "02",
      title: "Effective Communication",
      points: [
        { label: "Active listening", text: "Listen more than you speak. Read body language, tone, and the non-verbal layer, not just the words." },
        { label: "Clarity and precision", text: "Be concise. Avoid jargon unless you know it lands. Confirm the message was received as intended." },
        { label: "Empathy and respect", text: "Consider the other perspective, respect views that differ from yours, and find common ground before pressing your own." },
      ],
    },
    {
      number: "03",
      title: "Adapting to Different Personalities",
      points: [
        { label: "Personality types", text: "Introvert or extrovert, detail-oriented or big-picture — adapt your style to the person in front of you rather than defaulting to your own." },
        { label: "Conflict management", text: "Address the issue, not the person. Work toward a resolution that all parties can carry." },
      ],
    },
    {
      number: "04",
      title: "Building Relationships",
      points: [
        { label: "Networking", text: "Build a network inside and outside the organisation. Relationships are the currency of professional growth." },
        { label: "Mentorship", text: "Seek mentors, and mentor others — teaching is the fastest way to consolidate your own understanding." },
        { label: "Collaboration", text: "Be approachable, share credit, and make other people's success part of your own work." },
      ],
    },
    {
      number: "05",
      title: "Leadership Without Authority",
      points: [
        { label: "Influence and persuasion", text: "Build consensus without formal authority through trust, demonstrated competence, and a compelling articulation of where this is going." },
        { label: "Leading by example", text: "Exhibit the integrity, dedication, and attitude you expect — especially when the situation is difficult." },
        { label: "Decision-making", text: "Be decisive when required and inclusive where it matters. Involvement builds buy-in and reduces resistance." },
      ],
    },
    {
      number: "06",
      title: "Emotional Intelligence",
      points: [
        { label: "Self-awareness", text: "Understand your own emotions, strengths, and weaknesses so you can regulate your responses." },
        { label: "Self-regulation", text: "Hold professionalism and calm under stress — this is the capability others read first." },
        { label: "Motivation", text: "Set goals, keep a constructive attitude, and persevere. Motivation is contagious in both directions." },
      ],
    },
  ] as CoreConcept[],
  track: [
    { month: "Month 1", title: "Observation and Relationship Mapping", action: "Observe the behaviour of colleagues, superiors, and stakeholders. Build a relationship map: key personalities, their roles, and how best to engage each one." },
    { month: "Month 2", title: "Communication and Connection", action: "Practise active listening, ask for feedback on your communication style, and start conversations with colleagues outside your own department." },
    { month: "Month 3", title: "Conflict Resolution and Collaboration", action: "Identify likely areas of conflict and practise resolution techniques. Join a project where collaboration and compromise are required to reach the outcome." },
    { month: "Month 4", title: "Leadership and Influence", action: "Take the lead on a small project. Use it to practise influence, decision-making, and guiding a team to a result you are accountable for." },
    { month: "Month 5", title: "Expanding Your Network", action: "Attend industry events, join professional groups, build connections inside and outside the organisation, and begin mentoring a junior colleague or peer." },
    { month: "Month 6", title: "Reflection and Future Planning", action: "Evaluate six months of progress, name the areas still weak, and write the next plan against them. The loop is the framework." },
  ] as MonthStep[],
  faqs: [
    {
      question: "What is a personal development plan?",
      answer:
        "A personal development plan is a written structure for building specific capabilities over a defined period. It names the capability, the practice ground where it will be developed, and the point at which progress is reviewed. Without those three elements it is a wish list, not a plan.",
    },
    {
      question: "How do you create a personal development plan?",
      answer:
        "Start with observation, not goals. Spend the first month mapping your environment and your own behaviour in it. Then pick one capability per cycle, attach it to real work where it can be practised, and set a fixed reflection point. The six-month track on this page is that structure made concrete.",
    },
    {
      question: "What is a personal development framework?",
      answer:
        "A framework is the reusable structure beneath the plan. A plan is specific to you this year; a framework tells you how to build the next plan, and the one after that. This framework pairs six core people-skill capabilities with a repeating six-month observe, practise, reflect cycle.",
    },
    {
      question: "What should be included in a personal development plan?",
      answer:
        "Named capabilities, a real practice ground for each, a relationship map of the people you work with, a measurable behaviour change, and a fixed review date. People skills should be included alongside technical skills — they determine how far the technical skill travels.",
    },
    {
      question: "How is this different from generic personal development advice?",
      answer:
        "It is sequenced and observable. Each month has an action step tied to real work rather than reading, and the cycle ends in a reflection point that produces the next plan. It also starts with observation of others, not introspection alone.",
    },
  ] as FaqItem[],
};
