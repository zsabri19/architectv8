import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { EXEC_PILLAR } from "@/lib/pillar-content";
import { SITE, canonicalUrl } from "@/lib/site-data";

const TITLE = "Executive Coaching & Advisory — Zeeshan Sabri";
const DESC =
  "Executive coaching, advisory, and board-level counsel for leaders carrying the decision. How the engagement runs, who it is for, and what it costs.";
const URL = "/executive-coaching";

export const Route = createFileRoute("/executive-coaching")({
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
          "@type": "ProfessionalService",
          name: "Executive Coaching & Advisory — ClarityOS",
          serviceType: ["Executive Coaching", "Executive Advisory", "Board Advisory"],
          areaServed: "GCC and international",
          provider: { "@type": "Person", name: SITE.name, jobTitle: SITE.role },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: EXEC_PILLAR.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }),
      },
    ],
  }),
  component: ExecutiveCoachingPage,
});

function ExecutiveCoachingPage() {
  return (
    <SiteLayout>
      <section className="section" aria-labelledby="ec-title">
        <div className="site-shell" style={{ maxWidth: "68rem" }}>
          <p className="eyebrow">{EXEC_PILLAR.eyebrow}</p>
          <h1 id="ec-title" className="font-serif text-4xl leading-[1.1] md:text-6xl">
            {EXEC_PILLAR.title}
          </h1>
          <p className="hero-summary mt-6 max-w-3xl">{EXEC_PILLAR.lede}</p>
          <div className="hero-actions mt-8">
            <a className="button button-copper" href={SITE.bookSessionUrl}>
              Book a $79 Clarity Session <ArrowRight aria-hidden="true" />
            </a>
            <Link className="text-link" to="/services">
              Compare engagement paths
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-method">
        <div className="site-shell space-y-14" style={{ maxWidth: "56rem" }}>
          {EXEC_PILLAR.sections.map((s) => (
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

      <section className="section" aria-labelledby="ec-faq">
        <div className="site-shell" style={{ maxWidth: "56rem" }}>
          <p className="eyebrow">Questions people ask</p>
          <h2 id="ec-faq" className="font-serif text-3xl">
            Executive coaching and advisory, answered
          </h2>
          <div className="mt-8 space-y-8">
            {EXEC_PILLAR.faqs.map((f) => (
              <div key={f.question} className="border-t pt-5">
                <h3 className="font-serif text-xl">{f.question}</h3>
                <p className="mt-2 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-method" aria-labelledby="ec-next">
        <div className="site-shell" style={{ maxWidth: "56rem" }}>
          <p className="eyebrow">Go deeper</p>
          <h2 id="ec-next" className="font-serif text-3xl">
            Related work
          </h2>
          <ul className="mt-6 space-y-3">
            <li>
              <Link className="text-link" to="/organizational-development">
                Organizational development: the human layer
              </Link>
            </li>
            <li>
              <Link className="text-link" to="/frameworks/$slug" params={{ slug: "character-compass" }}>
                The Character Compass
              </Link>
            </li>
            <li>
              <Link className="text-link" to="/frameworks/$slug" params={{ slug: "governance-as-accelerator" }}>
                Governance as Accelerator
              </Link>
            </li>
            <li>
              <Link className="text-link" to="/book-a-session">
                What happens in a $79 Clarity Session
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="closing-section" aria-labelledby="ec-closing">
        <div className="site-shell closing-grid">
          <p className="section-index on-dark">Start with a diagnosis</p>
          <div>
            <h2 id="ec-closing">Bring the decision. Leave with the sequence.</h2>
            <div className="closing-actions">
              <a className="button button-copper" href={SITE.bookSessionUrl}>
                Book a $79 Clarity Session <ArrowRight aria-hidden="true" />
              </a>
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
