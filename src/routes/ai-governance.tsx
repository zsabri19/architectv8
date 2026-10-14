import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { AI_GOV_PILLAR } from "@/lib/pillar-content";
import { SITE, canonicalUrl, defaultOgImageMeta } from "@/lib/site-data";

const TITLE = "AI Governance for GCC Enterprises — ClarityOS";
const DESC =
  "AI governance for GCC enterprises: stabilize the human layer before controls. Pre-governance for boards and risk leaders in regulated industries.";
const URL = "/ai-governance";

export const Route = createFileRoute("/ai-governance")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: canonicalUrl(URL) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      ...defaultOgImageMeta,
    ],
    links: [{ rel: "canonical", href: canonicalUrl(URL) }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "AI Governance Advisory — ClarityOS",
          serviceType: [
            "AI Governance Advisory",
            "AI Agent Governance",
            "Executive AI Advisory",
          ],
          areaServed: "GCC and international",
          provider: { "@type": "Person", name: SITE.name, jobTitle: SITE.role },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: AI_GOV_PILLAR.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }),
      },
    ],
  }),
  component: AiGovernancePage,
});

function AiGovernancePage() {
  return (
    <SiteLayout>
      <section className="section" aria-labelledby="ag-title">
        <div className="site-shell" style={{ maxWidth: "68rem" }}>
          <p className="eyebrow">{AI_GOV_PILLAR.eyebrow}</p>
          <h1 id="ag-title" className="font-serif text-4xl leading-[1.1] md:text-6xl">
            {AI_GOV_PILLAR.title}
          </h1>
          <p className="hero-summary mt-6 max-w-3xl">{AI_GOV_PILLAR.lede}</p>
          <div className="hero-actions mt-8">
            <Link className="button button-copper" to="/connect">
              Start a Conversation <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="text-link" to="/services">
              Compare engagement paths
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-method">
        <div className="site-shell space-y-14" style={{ maxWidth: "56rem" }}>
          {AI_GOV_PILLAR.sections.map((s) => (
            <article key={s.heading}>
              <h2 className="font-serif text-3xl leading-tight">{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="mt-4 leading-relaxed">
                  {p}
                </p>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="ag-faq">
        <div className="site-shell" style={{ maxWidth: "56rem" }}>
          <p className="eyebrow">Questions people ask</p>
          <h2 id="ag-faq" className="font-serif text-3xl">
            AI governance, answered
          </h2>
          <div className="mt-8 space-y-8">
            {AI_GOV_PILLAR.faqs.map((f) => (
              <div key={f.question} className="border-t pt-5">
                <h3 className="font-serif text-xl">{f.question}</h3>
                <p className="mt-2 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-method" aria-labelledby="ag-next">
        <div className="site-shell" style={{ maxWidth: "56rem" }}>
          <p className="eyebrow">Go deeper</p>
          <h2 id="ag-next" className="font-serif text-3xl">
            Related work
          </h2>
          <ul className="mt-6 space-y-3">
            <li>
              <Link className="text-link" to="/frameworks/$slug" params={{ slug: "ai-governance-integration" }}>
                The AI Governance Integration framework
              </Link>
            </li>
            <li>
              <Link className="text-link" to="/insights/$slug" params={{ slug: "ai-readiness-oman-finance" }}>
                AI in finance: human readiness before AI readiness
              </Link>
            </li>
            <li>
              <Link className="text-link" to="/insights/$slug" params={{ slug: "ai-adoption-vs-human-readiness" }}>
                AI adoption vs. human readiness: the pre-governance gap
              </Link>
            </li>
            <li>
              <Link className="text-link" to="/organizational-development">
                Organizational development: the human layer
              </Link>
            </li>
            <li>
              <Link className="text-link" to="/book-a-session">
                What happens in a Clarity Session
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="closing-section" aria-labelledby="ag-closing">
        <div className="site-shell closing-grid">
          <p className="section-index on-dark">Start with a diagnosis</p>
          <div>
            <h2 id="ag-closing">Name the decisions AI is touching. Then govern them.</h2>
            <div className="closing-actions">
              <Link className="button button-copper" to="/connect">
                Start a Conversation <ArrowRight aria-hidden="true" />
              </Link>
              <Link className="text-link on-dark" to="/connect">
                Request a board briefing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
