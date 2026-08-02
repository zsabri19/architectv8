import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Eyebrow, SectionTitle } from "@/components/site/SiteLayout";
import { SITE, canonicalUrl } from "@/lib/site-data";
import { CLARITY_FAQS } from "@/lib/v4-content";
import coverAsset from "@/assets/cover.png.asset.json";

const OG = `https://${SITE.domain}${coverAsset.url}`;

export const Route = createFileRoute("/clarityos")({
  head: () => ({
    meta: [
      { title: "ClarityOS — The Pre-Governance Operating System" },
      {
        name: "description",
        content:
          "ClarityOS is the world's first Pre-Governance OS — the 8C Framework installs decision clarity, aligned ownership, and operating rhythm.",
      },
      { property: "og:title", content: "ClarityOS — The Pre-Governance Operating System" },
      {
        property: "og:description",
        content: "The 8C Framework and the human layer of transformation.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl("/clarityos") },
      { property: "og:image", content: OG },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/clarityos") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: CLARITY_FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }),
      },
    ],
  }),
  component: ClarityOSPage,
});

const EIGHT_C = [
  { name: "Clarity", body: "One coherent frame the whole organisation can operate from." },
  { name: "Conditions", body: "The environmental preconditions that determine whether change can hold." },
  { name: "Control", body: "Decision rights, escalation ladders, and ownership that stop the drift." },
  { name: "Capability", body: "The skill stack, tooling, and support required to execute the mandate." },
  { name: "Calibration", body: "Feedback loops that surface mis-alignment before it becomes cost." },
  { name: "Correction", body: "The right to change course without losing the operating rhythm." },
  { name: "Continuity", body: "Governance that outlives the champion, the sponsor, or the crisis." },
  { name: "Coaching", body: "The human infrastructure that keeps leaders whole through change." },
];

const STEPS = [
  {
    n: "01",
    title: "Diagnose the real blocker",
    body: "Identify where decisions, ownership, leadership alignment, or human stability are breaking the transformation before more tools are added on top.",
  },
  {
    n: "02",
    title: "Install the clarity layer",
    body: "Create the decision architecture, language, and structural clarity needed so people can operate from one coherent frame.",
  },
  {
    n: "03",
    title: "Align execution and governance",
    body: "Turn clarity into cadence through ownership, sequencing, governance, and operating rhythm that reduces drag and rework.",
  },
];

function ClarityOSPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pt-28">
        <div className="lg:col-span-7">
          <Eyebrow>Methodology</Eyebrow>
          <h1 className="font-serif text-4xl leading-[1.1] text-navy md:text-6xl">
            ClarityOS is the prerequisite, <span className="italic text-gold">not</span> the upgrade.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-navy/70">
            You cannot install a First World governance system on a broken human operating system.
            ClarityOS sits underneath everything you already run — ERP, AI, governance frameworks —
            and installs the shared clarity architecture the rest depends on.
          </p>
        </div>
        <div className="mt-12 lg:col-span-5 lg:mt-0">
          <div className="overflow-hidden border border-navy/10 shadow-2xl">
            <img
              src={coverAsset.url}
              alt="ClarityOS in practice — the human layer of transformation"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-navy/10 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Eyebrow>How ClarityOS works</Eyebrow>
          <SectionTitle className="max-w-2xl">From diagnosis to operating rhythm</SectionTitle>
          <div className="mt-16 grid gap-px border border-navy/10 bg-navy/10 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="bg-white p-10">
                <div className="font-serif text-4xl text-gold">{s.n}</div>
                <h3 className="mt-6 font-serif text-2xl text-navy">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-navy/60">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <Eyebrow>The 8C Crisis-to-Clarity Framework</Eyebrow>
        <SectionTitle>Eight dimensions. One installed operating rhythm.</SectionTitle>
        <div className="mt-16 grid gap-px border border-navy/10 bg-navy/10 md:grid-cols-2 lg:grid-cols-4">
          {EIGHT_C.map((c, i) => (
            <div key={c.name} className="bg-paper p-8 lg:p-10">
              <div className="font-serif text-3xl text-gold">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 text-sm font-bold uppercase tracking-widest text-navy">
                {c.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-navy/60">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-navy/10 bg-paper-soft py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <Eyebrow>Who this is for</Eyebrow>
            <h2 className="font-serif text-3xl text-navy md:text-4xl">
              For leaders carrying complexity that ordinary advice does not solve
            </h2>
          </div>
          <div className="space-y-8">
            {[
              {
                t: "Founders and executives",
                b: "When decisions keep recurring, priorities keep shifting, and scale is outrunning clarity.",
              },
              {
                t: "Leadership teams",
                b: "When alignment is weak, ownership is muddy, and transformation depends on too few people carrying too much.",
              },
              {
                t: "Organisations under change",
                b: "When ERP, AI, governance, or operating redesign is underway, and the human layer underneath is unstable.",
              },
            ].map((x) => (
              <div key={x.t} className="border-l-2 border-gold pl-6">
                <h3 className="font-serif text-2xl text-navy">{x.t}</h3>
                <p className="mt-2 text-navy/70">{x.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-navy/10 bg-white py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Eyebrow>Frequently asked</Eyebrow>
          <SectionTitle>Questions about ClarityOS</SectionTitle>
          <div className="mt-12 divide-y divide-navy/10 border-y border-navy/10">
            {CLARITY_FAQS.map((f) => (
              <div key={f.question} className="py-6">
                <h3 className="font-serif text-xl text-navy">{f.question}</h3>
                <p className="mt-3 text-navy/70">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 text-paper">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <SectionTitle className="text-paper">
            Ready to install ClarityOS in your organisation?
          </SectionTitle>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={SITE.bookSessionUrl}
              className="bg-gold px-8 py-4 text-xs font-bold uppercase tracking-widest text-navy hover:bg-paper"
            >
              Start a Conversation
            </a>
            <Link
              to="/connect"
              className="border border-paper/30 px-8 py-4 text-xs font-bold uppercase tracking-widest text-paper hover:border-gold hover:text-gold"
            >
              Enterprise Enquiry
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
