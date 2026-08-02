import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { OD_PILLAR } from "@/lib/pillar-content";
import { SITE, canonicalUrl } from "@/lib/site-data";

const TITLE = "Organizational Development: The Human Layer";
const DESC =
  "What organizational development is, why most OD programmes fail, and the ClarityOS frameworks that install the human layer beneath transformation.";
const URL = "/organizational-development";

export const Route = createFileRoute("/organizational-development")({
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
    ],
    links: [{ rel: "canonical", href: canonicalUrl(URL) }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: OD_PILLAR.title,
          description: DESC,
          author: { "@type": "Person", name: SITE.name, jobTitle: SITE.role },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: OD_PILLAR.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }),
      },
    ],
  }),
  component: OrganizationalDevelopmentPage,
});

function OrganizationalDevelopmentPage() {
  return (
    <SiteLayout>
      <section className="section" aria-labelledby="od-title">
        <div className="site-shell" style={{ maxWidth: "68rem" }}>
          <p className="eyebrow">{OD_PILLAR.eyebrow}</p>
          <h1 id="od-title" className="font-serif text-4xl leading-[1.1] md:text-6xl">
            {OD_PILLAR.title}
          </h1>
          <p className="hero-summary mt-6 max-w-3xl">{OD_PILLAR.lede}</p>
          <div className="hero-actions mt-8">
            <a className="button button-copper" href={SITE.bookSessionUrl}>
              Book a $79 Clarity Session <ArrowRight aria-hidden="true" />
            </a>
            <Link className="text-link" to="/clarityos">
              See the ClarityOS methodology
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-method">
        <div className="site-shell space-y-14" style={{ maxWidth: "56rem" }}>
          {OD_PILLAR.sections.map((s) => (
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

      <section className="section" aria-labelledby="od-faq">
        <div className="site-shell" style={{ maxWidth: "56rem" }}>
          <p className="eyebrow">Questions people ask</p>
          <h2 id="od-faq" className="font-serif text-3xl">
            Organizational development, answered
          </h2>
          <div className="mt-8 space-y-8">
            {OD_PILLAR.faqs.map((f) => (
              <div key={f.question} className="border-t pt-5">
                <h3 className="font-serif text-xl">{f.question}</h3>
                <p className="mt-2 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-method" aria-labelledby="od-next">
        <div className="site-shell" style={{ maxWidth: "56rem" }}>
          <p className="eyebrow">Go deeper</p>
          <h2 id="od-next" className="font-serif text-3xl">
            The frameworks behind the practice
          </h2>
          <ul className="mt-6 space-y-3">
            <li>
              <Link className="text-link" to="/frameworks/$slug" params={{ slug: "8c-crisis-to-clarity" }}>
                The 8C Crisis-to-Clarity Framework
              </Link>
            </li>
            <li>
              <Link className="text-link" to="/frameworks/$slug" params={{ slug: "cultural-ecosystem-mapping" }}>
                Cultural Ecosystem Mapping
              </Link>
            </li>
            <li>
              <Link className="text-link" to="/executive-coaching">
                Executive coaching &amp; advisory
              </Link>
            </li>
            <li>
              <Link className="text-link" to="/personal-development-framework">
                The Practical People Skills Development Framework
              </Link>
            </li>
            <li>
              <Link className="text-link" to="/services">
                Engagement paths and pricing
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="closing-section" aria-labelledby="od-closing">
        <div className="site-shell closing-grid">
          <p className="section-index on-dark">Diagnose first</p>
          <div>
            <h2 id="od-closing">Change the human layer before you change the system.</h2>
            <div className="closing-actions">
              <a className="button button-copper" href={SITE.bookSessionUrl}>
                Book a $79 Clarity Session <ArrowRight aria-hidden="true" />
              </a>
              <Link className="text-link on-dark" to="/connect">
                Discuss an enterprise programme
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
