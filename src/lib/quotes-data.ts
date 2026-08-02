// Quote Vault — verified public quotes by Zeeshan Sabri.
// Source: "Complete Quote Archive" (compiled 26 Jan 2026) — YouTube fireside chat,
// Doha AI-in-Procurement workshop, NCMS Riyadh workshop series, LinkedIn posts and
// published articles, the memoir, the Beyond Techniques series, and testimonials.

export type QuoteTheme =
  | "crisis-clarity"
  | "human-os"
  | "governance"
  | "ai-transformation"
  | "leadership"
  | "procurement"
  | "trust"
  | "growth";

export type Quote = {
  id: string;
  text: string;
  theme: QuoteTheme;
  source: string;
  signature?: boolean;
};

export const QUOTE_THEMES: { key: QuoteTheme; label: string; blurb: string }[] = [
  {
    key: "crisis-clarity",
    label: "Crisis & Clarity",
    blurb: "Why disruption is the cheapest diagnostic an organisation will ever get.",
  },
  {
    key: "human-os",
    label: "Human OS",
    blurb: "Identity, psychological safety, and the layer every system installs on top of.",
  },
  {
    key: "governance",
    label: "Governance as Accelerator",
    blurb: "Structure read as speed, not as a brake on it.",
  },
  {
    key: "ai-transformation",
    label: "AI & Transformation",
    blurb: "Prediction is not thinking — and adoption is not transformation.",
  },
  {
    key: "leadership",
    label: "Leadership & Legacy",
    blurb: "Presence under pressure, and the space you create for others.",
  },
  {
    key: "procurement",
    label: "Procurement & Capability",
    blurb: "From buyers to capability architects.",
  },
  {
    key: "trust",
    label: "Trust & Empowerment",
    blurb: "Trust deficits are systems gaps, not people failures.",
  },
  {
    key: "growth",
    label: "Growth & Reinvention",
    blurb: "Validation, value, speed, and the discipline of starting.",
  },
];

export const QUOTES: Quote[] = [
  // ── Signature set ───────────────────────────────────────────────────────────
  { id: "sig-1", text: "Crisis forces clarity that comfort never could.", theme: "crisis-clarity", source: "Signature philosophy", signature: true },
  { id: "sig-2", text: "Governance is not control — it's your roadmap.", theme: "governance", source: "Signature philosophy", signature: true },
  { id: "sig-3", text: "Fix the Human OS before the System OS.", theme: "human-os", source: "Signature philosophy", signature: true },
  { id: "sig-4", text: "Money is a byproduct. Once the value is felt, the byproduct follows.", theme: "growth", source: "Signature philosophy", signature: true },
  { id: "sig-5", text: "My first validation is the rejection.", theme: "growth", source: "Signature philosophy", signature: true },
  { id: "sig-6", text: "AI comes in when you are busy.", theme: "ai-transformation", source: "Signature philosophy", signature: true },
  { id: "sig-7", text: "We do not change. We evolve.", theme: "human-os", source: "Signature philosophy", signature: true },
  { id: "sig-8", text: "Leadership begins where words end.", theme: "leadership", source: "Signature philosophy", signature: true },
  { id: "sig-9", text: "Be the leader you want to be led by.", theme: "leadership", source: "Signature philosophy", signature: true },
  { id: "sig-10", text: "Techniques can be learned. Character sustains transformation.", theme: "leadership", source: "Signature philosophy", signature: true },

  // ── Fireside chat: Enterprise Reinvention in the AI Era (Nov 2025) ──────────
  { id: "fc-1", text: "Enterprise Reinvention is too close to the heart because I am too close to people.", theme: "human-os", source: "Fireside Chat · CxO Global Forum, Nov 2025" },
  { id: "fc-2", text: "One day is lying to yourself. Baby steps start from the moment you decide.", theme: "growth", source: "Fireside Chat · CxO Global Forum, Nov 2025" },
  { id: "fc-3", text: "AI comes in when you are busy. AI doesn't come in when you are not busy.", theme: "ai-transformation", source: "Fireside Chat · CxO Global Forum, Nov 2025" },
  { id: "fc-4", text: "Start with yourself. Once you start with yourself, that's where the change culture and adaptability happens.", theme: "human-os", source: "Fireside Chat · CxO Global Forum, Nov 2025" },
  { id: "fc-5", text: "My first validation is the rejection. If they accepted it, they would have been doing it already.", theme: "growth", source: "Fireside Chat · CxO Global Forum, Nov 2025" },
  { id: "fc-6", text: "Add the value. Don't focus on how quickly you're going to make millions out of it.", theme: "growth", source: "Fireside Chat · CxO Global Forum, Nov 2025" },
  { id: "fc-7", text: "A players can hire B players, but B players can never hire A players. They will always hire C players.", theme: "leadership", source: "Fireside Chat · The B-Player Trap" },
  { id: "fc-8", text: "A players are risk-takers, challengers. They like to be challenged and put under pressure. That's how they thrive.", theme: "leadership", source: "Fireside Chat · The B-Player Trap" },
  { id: "fc-9", text: "B players are showing that they are A but they are not, and taking the credit of the C.", theme: "leadership", source: "Fireside Chat · The B-Player Trap" },
  { id: "fc-10", text: "75 to 80% of transformation projects fail because of a tech-first philosophy.", theme: "ai-transformation", source: "Fireside Chat · CxO Global Forum, Nov 2025" },
  { id: "fc-11", text: "The leaders are not sitting at the table. Simple. That was the crux of it.", theme: "leadership", source: "Fireside Chat · CxO Global Forum, Nov 2025" },
  { id: "fc-12", text: "A single weak link in this whole journey will waste business millions and nobody will be able to figure out where the leak was.", theme: "governance", source: "Fireside Chat · CxO Global Forum, Nov 2025" },
  { id: "fc-13", text: "If you run away from AI, then you will stay behind unfortunately.", theme: "ai-transformation", source: "Fireside Chat · CxO Global Forum, Nov 2025" },
  { id: "fc-14", text: "Governance and due diligence — that's the biggest driver of scalability at national level.", theme: "governance", source: "Fireside Chat · CxO Global Forum, Nov 2025" },
  { id: "fc-15", text: "Regulators are welcoming. You are the doctors, not the regulators.", theme: "governance", source: "Fireside Chat · CxO Global Forum, Nov 2025" },
  { id: "fc-16", text: "Stay governed, stay focused, follow the regulatory compliances. Everything is ready. You don't need to reinvent anything.", theme: "governance", source: "Fireside Chat · CxO Global Forum, Nov 2025" },
  { id: "fc-17", text: "Keep an eye on Saudi. They are the trendsetters right now. Saudi is the place for your test bed.", theme: "growth", source: "Fireside Chat · GCC regional insight" },
  { id: "fc-18", text: "UAE is more structured when it comes to internal governance. They're steady now.", theme: "governance", source: "Fireside Chat · GCC regional insight" },
  { id: "fc-19", text: "When I landed in Oman, everybody said 'it's so dull.' That was music to me. Try one time — don't follow trends and see the change.", theme: "growth", source: "Fireside Chat · GCC regional insight" },
  { id: "fc-20", text: "They weren't greedy. They took a stop and strengthened their platforms first — that's how you monetise with confidence.", theme: "growth", source: "Fireside Chat · WhatsApp case study" },

  // ── Doha workshop: AI in Procurement (Jul 2025) ─────────────────────────────
  { id: "dw-1", text: "AI doesn't think. It predicts. But the more it predicts, the more dangerous it becomes because it makes you feel it's thinking.", theme: "ai-transformation", source: "Doha Workshop · AI in Procurement, Jul 2025" },
  { id: "dw-2", text: "AI will replace those who don't use AI. If you don't use AI, then you are at risk.", theme: "ai-transformation", source: "Doha Workshop · AI in Procurement, Jul 2025" },
  { id: "dw-3", text: "The moment you think AI is on top of you, close it and start fresh. Always make sure you're on top of it, not the other way around.", theme: "ai-transformation", source: "Doha Workshop · AI in Procurement, Jul 2025" },
  { id: "dw-4", text: "AI works when you compound the experiences of multi-consumers. Every person makes it work the way they work.", theme: "ai-transformation", source: "Doha Workshop · AI in Procurement, Jul 2025" },
  { id: "dw-5", text: "If you don't put governance on it, AI will be chaotic. But if you put the right structure, AI becomes your accelerator.", theme: "governance", source: "Doha Workshop · AI in Procurement, Jul 2025" },
  { id: "dw-6", text: "Leaders try to allocate people. But if the leader himself is not part of the whole change execution, it's a start to fail.", theme: "leadership", source: "Doha Workshop · AI in Procurement, Jul 2025" },
  { id: "dw-7", text: "AI is the most data-driven opportunity for procurement. If any function needs AI, it's procurement — because we write a lot, we read a lot, we assess a lot.", theme: "procurement", source: "Doha Workshop · AI in Procurement, Jul 2025" },
  { id: "dw-8", text: "7% of your total workforce minimum must be on board with the change approach. One weak link will waste business millions.", theme: "governance", source: "Doha Workshop · AI in Procurement, Jul 2025" },
  { id: "dw-9", text: "Don't treat AI as a tool. Treat AI as your resource — multiple resources. I have invisible arms.", theme: "ai-transformation", source: "Doha Workshop · AI in Procurement, Jul 2025" },
  { id: "dw-10", text: "Your first rejection is your validation. Had they accepted, they would have been doing it already.", theme: "growth", source: "Doha Workshop · AI in Procurement, Jul 2025" },
  { id: "dw-11", text: "If you want AI to succeed, you cannot leave it without humanity.", theme: "human-os", source: "Doha Workshop · AI in Procurement, Jul 2025" },
  { id: "dw-12", text: "The same person doing an 8-hour job outputting X amount of value — you can multiply that five to ten times. That's the value of AI.", theme: "ai-transformation", source: "Doha Workshop · AI in Procurement, Jul 2025" },
  { id: "dw-13", text: "The KPI of a procurement leader and the KPI of a CEO is exactly the same: profitability, customer satisfaction, and operational efficiency.", theme: "procurement", source: "Doha Workshop · AI in Procurement, Jul 2025" },
  { id: "dw-14", text: "If you want to learn and understand business, procurement is the right place. The best CEOs are past procurement leads.", theme: "procurement", source: "Doha Workshop · AI in Procurement, Jul 2025" },
  { id: "dw-15", text: "Business doesn't work in silo. If I don't know what the other function is doing, am I good at my job?", theme: "procurement", source: "Doha Workshop · AI in Procurement, Jul 2025" },
  { id: "dw-16", text: "Any ERP is no good if there is no AI featuring in the roadmap.", theme: "ai-transformation", source: "Doha Workshop · AI in Procurement, Jul 2025" },
  { id: "dw-17", text: "Your IT department is not your AI department. AI is a separate department. AI is not IT.", theme: "ai-transformation", source: "Doha Workshop · AI in Procurement, Jul 2025" },
  { id: "dw-18", text: "I'm not a fan of customization. I'd rather build from scratch — I keep more control and I'll be different.", theme: "growth", source: "Doha Workshop · Make vs Buy" },
  { id: "dw-19", text: "Majority of ERP and solution companies have zero understanding of your business. You expect 70% readiness — you get 30%.", theme: "procurement", source: "Doha Workshop · Make vs Buy" },
  { id: "dw-20", text: "What is important in initiating a business — speed or perfection? Speed. If you wait for that perfect moment, somebody else will launch it.", theme: "growth", source: "Doha Workshop · Speed vs Perfection" },
  { id: "dw-21", text: "I'm not going to tell you which tool to use. I'm going to tell you what you need to think, and then find the tool to do it.", theme: "ai-transformation", source: "Doha Workshop · Teaching philosophy" },
  { id: "dw-22", text: "My goal is to make sure when you go back home, you explain AI rightly to your kids. That will be my ROI.", theme: "ai-transformation", source: "Doha Workshop · Teaching philosophy" },
  { id: "dw-23", text: "I have zero value if I don't give you quick wins.", theme: "growth", source: "Doha Workshop · Teaching philosophy" },
  { id: "dw-24", text: "Every thought has to start with AI and end with AI. It's a mindset. It's a lifestyle.", theme: "ai-transformation", source: "Doha Workshop · Mindset & culture" },
  { id: "dw-25", text: "We don't change. We evolve. The human brain adapts by integrating, not by invalidating lived experience.", theme: "human-os", source: "Doha Workshop · Mindset & culture" },

  // ── NCMS Riyadh workshop series (Nov–Dec 2025) ──────────────────────────────
  { id: "nc-1", text: "Crisis forces clarity that comfort never could.", theme: "crisis-clarity", source: "NCMS Riyadh · Financial Management for Procurement" },
  { id: "nc-2", text: "Today is not about numbers. It's about capability.", theme: "procurement", source: "NCMS Riyadh · Financial Management for Procurement" },
  { id: "nc-3", text: "In that moment of profound crisis there was no strategy, no five-year plan. There was only the forced pursuit of clarity.", theme: "crisis-clarity", source: "NCMS Riyadh · Financial Management for Procurement" },
  { id: "nc-4", text: "You are not buyers. You are capability architects.", theme: "procurement", source: "NCMS Riyadh · Financial Management for Procurement" },
  { id: "nc-5", text: "This isn't a commodity procurement office. This is national capability procurement.", theme: "procurement", source: "NCMS Riyadh · Financial Management for Procurement" },
  { id: "nc-6", text: "Financial intelligence is the foundation of procurement clarity.", theme: "procurement", source: "NCMS Riyadh · Financial Management for Procurement" },
  { id: "nc-7", text: "Clarity is the beginning of capability.", theme: "crisis-clarity", source: "NCMS Riyadh · Financial Management for Procurement" },
  { id: "nc-8", text: "Price is not cost. Cost is not total cost.", theme: "procurement", source: "NCMS Riyadh · Financial Management for Procurement" },
  { id: "nc-9", text: "Blind procurement is expensive procurement.", theme: "procurement", source: "NCMS Riyadh · Financial Management for Procurement" },
  { id: "nc-10", text: "Risk is a cost we pay before the crisis.", theme: "governance", source: "NCMS Riyadh · Financial Management for Procurement" },
  { id: "nc-11", text: "Testing is capability — not overhead.", theme: "procurement", source: "NCMS Riyadh · Financial Management for Procurement" },
  { id: "nc-12", text: "Are you choosing a supplier… or choosing a future problem?", theme: "procurement", source: "NCMS Riyadh · Financial Management for Procurement" },
  { id: "nc-13", text: "Clarity without structure collapses.", theme: "governance", source: "NCMS Riyadh · Financial Management for Procurement" },

  // ── LinkedIn posts ──────────────────────────────────────────────────────────
  { id: "li-1", text: "Transformation isn't just an initiative — it's the operating system.", theme: "governance", source: "LinkedIn" },
  { id: "li-2", text: "Stop managing symptoms. Start architecting structure.", theme: "governance", source: "LinkedIn" },
  { id: "li-3", text: "Evolution builds forward without erasing backward.", theme: "human-os", source: "LinkedIn" },
  { id: "li-4", text: "You can't buy transformation. You have to build it from the base up.", theme: "growth", source: "LinkedIn" },
  { id: "li-5", text: "Real growth happens when what we have lived is validated, contextualized, and connected to what comes next.", theme: "human-os", source: "LinkedIn" },
  { id: "li-6", text: "Governance isn't a brake. It's the accelerator.", theme: "governance", source: "LinkedIn" },
  { id: "li-7", text: "In procurement, governance isn't a compliance checkbox — it's the engine of performance.", theme: "procurement", source: "LinkedIn" },
  { id: "li-8", text: "You cannot put governance on top of emotional instability. Fix the Human OS before the System OS.", theme: "human-os", source: "LinkedIn" },
  { id: "li-9", text: "Clarity earns the right to innovate.", theme: "crisis-clarity", source: "LinkedIn" },
  { id: "li-10", text: "Constraint-based design outperforms unconstrained approaches.", theme: "governance", source: "LinkedIn" },
  { id: "li-11", text: "Humans are biological systems, not machines.", theme: "human-os", source: "LinkedIn" },
  { id: "li-12", text: "Performance requires psychological safety before execution.", theme: "human-os", source: "LinkedIn" },
  { id: "li-13", text: "We must start with 'why' and professional identity.", theme: "human-os", source: "LinkedIn" },
  { id: "li-14", text: "It's rarely the technology that breaks. It's the cultural debt — the friction between strategy and execution.", theme: "ai-transformation", source: "LinkedIn" },
  { id: "li-15", text: "The world is shifting from building tools to building thinkers.", theme: "ai-transformation", source: "LinkedIn" },
  { id: "li-16", text: "Procurement without purpose is just a process. And process without progress? That's stagnation.", theme: "procurement", source: "LinkedIn" },
  { id: "li-17", text: "The real question isn't what's broken in procurement. It's what's missing.", theme: "procurement", source: "LinkedIn" },
  { id: "li-18", text: "There's no perfect place to start. Start where the silence breaks.", theme: "growth", source: "LinkedIn" },
  { id: "li-19", text: "Own the seat. Don't wait for the invite.", theme: "growth", source: "LinkedIn" },
  { id: "li-20", text: "If you ever trust someone — don't doubt their approach.", theme: "trust", source: "LinkedIn" },
  { id: "li-21", text: "Saying 'I trust you' is easy. Leading like you trust them, that's leadership.", theme: "trust", source: "LinkedIn" },
  { id: "li-22", text: "Teams don't grow when we constantly override their thinking. They grow when we trust them to think, to act, to lead.", theme: "trust", source: "LinkedIn" },
  { id: "li-23", text: "Once trust is earned, don't micro-correct. Amplify their strengths. Guide without suffocating.", theme: "trust", source: "LinkedIn" },
  { id: "li-24", text: "Quiet leadership is trusting enough to let others shine.", theme: "trust", source: "LinkedIn" },
  { id: "li-25", text: "Adoption rate is the only metric that matters in the first 90 days.", theme: "ai-transformation", source: "LinkedIn" },
  { id: "li-26", text: "Inquiry → Questions → Curiosity → Clarity → Innovation → Adoption → Sustainability.", theme: "governance", source: "LinkedIn" },

  // ── LinkedIn published articles — Beyond Techniques series ──────────────────
  { id: "bt-1", text: "Trust deficits aren't elusive. They're predictable.", theme: "trust", source: "Article · When Trust Breaks, Clarity Begins" },
  { id: "bt-2", text: "Change is inside out, not outside in.", theme: "human-os", source: "Article · When Trust Breaks, Clarity Begins" },
  { id: "bt-3", text: "You can't build trust from the outside. You can only remove the barriers to it from the inside.", theme: "trust", source: "Article · When Trust Breaks, Clarity Begins" },
  { id: "bt-4", text: "Trust deficits reveal systems gaps, not people failures.", theme: "trust", source: "Article · When Trust Breaks, Clarity Begins" },
  { id: "bt-5", text: "The trust deficit isn't the mystery. The lack of systematic response is.", theme: "trust", source: "Article · When Trust Breaks, Clarity Begins" },
  { id: "bt-6", text: "Systems do not create discipline. Discipline creates the safety for systems to work.", theme: "human-os", source: "Article · The Investment Paradox" },
  { id: "bt-7", text: "You cannot install a stable System OS on a broken Human OS.", theme: "human-os", source: "Article · The Investment Paradox" },
  { id: "bt-8", text: "Clarity is what allows the human brain to think, not just react.", theme: "crisis-clarity", source: "Article · The Investment Paradox" },
  { id: "bt-9", text: "Silos aren't created by ego. Silos feel safe when clarity is missing.", theme: "human-os", source: "Article · The Investment Paradox" },
  { id: "bt-10", text: "Identity before process. Discipline before automation. Clarity before governance.", theme: "governance", source: "Article · The Investment Paradox" },
  { id: "bt-11", text: "When uncertainty increases, people don't become irrational. They become protective.", theme: "human-os", source: "Article · The Investment Paradox" },
  { id: "bt-12", text: "The playbooks that built competitive advantage in 2015 are creating organizational paralysis in 2025.", theme: "ai-transformation", source: "Article · Old Models Failed" },
  { id: "bt-13", text: "Most transformation efforts accelerate only when the organisation is willing to surface the hidden anchors that slow alignment.", theme: "governance", source: "Article · Old Models Failed" },
  { id: "bt-14", text: "Clarity without systems to sustain it collapses under pressure.", theme: "governance", source: "Article · Old Models Failed" },
  { id: "bt-15", text: "Build models that fit the actual conditions you're navigating, not textbook ideals.", theme: "governance", source: "Article · Old Models Failed" },
  { id: "bt-16", text: "Human behavior changes when capability changes. Build the capability first.", theme: "human-os", source: "Article · Old Models Failed" },
  { id: "bt-17", text: "Build correction architecture before your assumptions fail.", theme: "governance", source: "Article · Old Models Failed" },
  { id: "bt-18", text: "Build systems that pivot automatically, independent of who's in charge.", theme: "governance", source: "Article · Old Models Failed" },
  { id: "bt-19", text: "Build leaders who build systems, not leaders who fight fires.", theme: "leadership", source: "Article · Old Models Failed" },
  { id: "bt-20", text: "Real change doesn't spread through mandates. It spreads through belief and behavior.", theme: "human-os", source: "Article · Old Models Failed" },
  { id: "bt-21", text: "Techniques fail when foundations are weak. Tools disappoint when discipline is missing. Systems collapse when identity is unclear.", theme: "human-os", source: "Article · Old Models Failed" },
  { id: "bt-22", text: "The same energy that creates the crisis contains the solution.", theme: "crisis-clarity", source: "Article · Old Models Failed" },
  { id: "bt-23", text: "Crisis forces a clarity that comfort never could. The only question is whether you wait for the crisis or install the clarity now.", theme: "crisis-clarity", source: "Article · Old Models Failed" },

  // ── Memoir: From Exile to Transformation ────────────────────────────────────
  { id: "mm-1", text: "Clarity is born in exile, not in comfort.", theme: "crisis-clarity", source: "Memoir · From Exile to Transformation" },
  { id: "mm-2", text: "Don't fear crisis. Use it as clarity. It's the moment when truth steps forward and pretenders fade.", theme: "crisis-clarity", source: "Memoir · From Exile to Transformation" },
  { id: "mm-3", text: "Techniques can be learned. But it is what lies beyond techniques — character, dignity, and resilience — that truly sustains transformation.", theme: "leadership", source: "Memoir · From Exile to Transformation" },
  { id: "mm-4", text: "Success is rarely about technical expertise alone. It is about understanding the cultural ecosystem you are moving in — and adapting without losing your own core.", theme: "growth", source: "Memoir · From Exile to Transformation" },
  { id: "mm-5", text: "Competence opens the door, but credibility keeps you inside.", theme: "growth", source: "Memoir · From Exile to Transformation" },
  { id: "mm-6", text: "Reinvention is not about discarding the past. It is about taking what is broken and giving it new alignment.", theme: "growth", source: "Memoir · From Exile to Transformation" },
  { id: "mm-7", text: "No profession is too tactical to become transformational. It takes reframing — first in your own mind, then in the minds of those you serve.", theme: "procurement", source: "Memoir · From Exile to Transformation" },
  { id: "mm-8", text: "Don't treat governance as red tape; treat it as an accelerator.", theme: "governance", source: "Memoir · From Exile to Transformation" },
  { id: "mm-9", text: "Sustainable change doesn't begin at the boardroom table. It begins where the work is hardest, where trust has been broken.", theme: "trust", source: "Memoir · From Exile to Transformation" },
  { id: "mm-10", text: "The art lies in adjusting without losing your own compass — shifting tempo while holding the same melody.", theme: "growth", source: "Memoir · From Exile to Transformation" },
  { id: "mm-11", text: "Leadership legacies aren't built in headlines. They are carried in the quiet moments — in how we listen, and in whose example we choose to embody.", theme: "leadership", source: "Memoir · From Exile to Transformation" },
  { id: "mm-12", text: "Leadership is most powerful when it is personal.", theme: "leadership", source: "Memoir · From Exile to Transformation" },
  { id: "mm-13", text: "The mark of a leader isn't in what frameworks you create. It's in whether those frameworks empower the people closest to you to rise and thrive.", theme: "leadership", source: "Memoir · From Exile to Transformation" },
  { id: "mm-14", text: "Leadership is not about titles or positions. It is about presence under pressure, and the space you create for others to grow.", theme: "leadership", source: "Memoir · From Exile to Transformation" },
  { id: "mm-15", text: "Frameworks should work at every level — if they can't guide a friend through career growth, they won't carry a corporation through transformation.", theme: "governance", source: "Memoir · From Exile to Transformation" },
  { id: "mm-16", text: "Technology becomes transformation only when leaders act as interpreters — embedding innovation into systems, but also into the lives of people who will live with it.", theme: "ai-transformation", source: "Memoir · From Exile to Transformation" },
  { id: "mm-17", text: "Nation-building isn't abstract. It begins when leaders use lived frustrations as catalysts for systemic solutions.", theme: "governance", source: "Memoir · From Exile to Transformation" },
  { id: "mm-18", text: "Never confuse power with dignity. Never accept broken systems as final.", theme: "leadership", source: "Memoir · From Exile to Transformation" },
  { id: "mm-19", text: "Emotional intelligence is not optional. It is the architecture of sustainable leadership.", theme: "human-os", source: "Memoir · From Exile to Transformation" },

  // ── Beyond Techniques editions ──────────────────────────────────────────────
  { id: "be-1", text: "Strategic listening isn't about waiting for your turn to speak. It's about noticing the tone that shifts before a decision.", theme: "leadership", source: "Beyond Techniques · Listening as a Strategic Act" },
  { id: "be-2", text: "When a leader listens with intent, it changes the energy of the room. It calms noise. It creates safety. It invites truth.", theme: "leadership", source: "Beyond Techniques · Listening as a Strategic Act" },
  { id: "be-3", text: "People move when they feel seen. They engage when they feel heard. They align when their context is understood.", theme: "human-os", source: "Beyond Techniques · Listening as a Strategic Act" },
  { id: "be-4", text: "Don't just tell people what to do. Listen for what they're afraid to say. In that space, real change begins.", theme: "trust", source: "Beyond Techniques · Listening as a Strategic Act" },
  { id: "be-5", text: "You carry a leader within you — not the one on your business card, but the one formed through mentors, managers, and lasting stories.", theme: "leadership", source: "Beyond Techniques · The Leader in Your Mind" },
  { id: "be-6", text: "Leadership is taught in frameworks but lived through memory.", theme: "leadership", source: "Beyond Techniques · The Leader in Your Mind" },
  { id: "be-7", text: "Are you leading from that model, or reacting to it?", theme: "leadership", source: "Beyond Techniques · The Leader in Your Mind" },
  { id: "be-8", text: "True legacy begins when we lead intentionally, embodying the leadership we need, not what we inherited.", theme: "leadership", source: "Beyond Techniques · The Leader in Your Mind" },
  { id: "be-9", text: "We shape people, not just solve problems.", theme: "human-os", source: "Beyond Techniques · The Leader in Your Mind" },
  { id: "be-10", text: "It's not about performing but modeling; not controlling but creating space; not adding to the noise but quietly recalibrating.", theme: "leadership", source: "Beyond Techniques · The Leader in Your Mind" },
  { id: "be-11", text: "Crisis sharpens perception. That's when comfort drops and reality stops hiding.", theme: "crisis-clarity", source: "Beyond Techniques · Clarity in Crisis" },
  { id: "be-12", text: "Crisis doesn't create character. It reveals it.", theme: "crisis-clarity", source: "Beyond Techniques · Clarity in Crisis" },
  { id: "be-13", text: "Crisis is a forced audit: systems — what breaks, what holds. People — who acts, who stalls.", theme: "crisis-clarity", source: "Beyond Techniques · Clarity in Crisis" },
  { id: "be-14", text: "Lead with purpose. Record what showed up. Reset your priorities. Reinvest where resilience was proven.", theme: "crisis-clarity", source: "Beyond Techniques · Clarity in Crisis" },
  { id: "be-15", text: "Not everyone who leads is a leader.", theme: "leadership", source: "Beyond Techniques · Clarity in Crisis" },
];

export const SIGNATURE_QUOTES = QUOTES.filter((q) => q.signature);

export function quotesByTheme(theme: QuoteTheme) {
  return QUOTES.filter((q) => q.theme === theme);
}

export const QUOTE_COUNT = QUOTES.length;
