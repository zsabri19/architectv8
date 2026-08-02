import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Testimonials } from "@/components/site/Testimonials";
import { SITE, TESTIMONIALS, canonicalUrl } from "@/lib/site-data";

const TITLE = "Book a $79 Clarity Session — Zeeshan Sabri";
const DESC =
  "A focused 90-minute diagnostic session: name the real blocker, test the decision, and leave with one sequenced next step.";

export const Route = createFileRoute("/book-a-session")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl("/book-a-session") },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/book-a-session") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Clarity Session",
          serviceType: "Executive advisory diagnostic",
          provider: { "@type": "Person", name: SITE.name, jobTitle: SITE.role },
          offers: {
            "@type": "Offer",
            price: "79",
            priceCurrency: "USD",
            url: SITE.bookSessionUrl,
            availability: "https://schema.org/InStock",
          },
        }),
      },
    ],
  }),
  component: BookSessionPage,
});

const INCLUDED = [
  "90 minutes, one live decision or blocker — not a discovery call.",
  "A pre-session intake so the time starts at diagnosis, not context-setting.",
  "The 8C read: which condition is actually failing underneath the symptom.",
  "One written next step you can act on without further engagement.",
];

const FOR_YOU_IF = [
  "A transformation, restructure, or system rollout is stalling and nobody agrees why.",
  "Decision rights are unclear and escalation has replaced ownership.",
  "You are about to fund a change the organisation may not be able to hold.",
];

function BookSessionPage() {
  return (
    <SiteLayout>
      <section className="section" aria-labelledby="bas-title">
        <div className="site-shell" style={{ maxWidth: "68rem" }}>
          <p className="eyebrow">ClarityOS Personal Session · $79</p>
          <h1 id="bas-title" className="font-serif text-4xl leading-[1.1] md:text-6xl">
            90 minutes. One blocker. One sequenced next step.
          </h1>
          <p className="hero-summary mt-6 max-w-2xl">{DESC}</p>
          <div className="hero-actions mt-8">
            <a className="button button-copper" href={SITE.bookSessionUrl}>
              Book the session <ArrowRight aria-hidden="true" />
            </a>
            <Link className="text-link" to="/services">
              Compare all engagement paths
            </Link>
          </div>
          <div className="mt-10 max-w-2xl">
            <Testimonials items={[TESTIMONIALS[4]]} variant="single" />
          </div>
        </div>
      </section>

      <section className="section section-method" aria-labelledby="bas-included">
        <div className="site-shell grid gap-12 md:grid-cols-2" style={{ maxWidth: "68rem" }}>
          <div>
            <p className="eyebrow">What is included</p>
            <h2 id="bas-included" className="font-serif text-3xl">
              A diagnostic, not a sales conversation.
            </h2>
            <ul className="mt-6 space-y-4">
              {INCLUDED.map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed">
                  <Check className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Book this if</p>
            <h2 className="font-serif text-3xl">The cost of guessing is now higher than $79.</h2>
            <ul className="mt-6 space-y-4">
              {FOR_YOU_IF.map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed">
                  <Check className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="closing-section" aria-labelledby="bas-closing">
        <div className="site-shell closing-grid">
          <p className="section-index on-dark">Begin with clarity</p>
          <div>
            <h2 id="bas-closing">
              Diagnose what the human layer can hold before you change the system.
            </h2>
            <div className="closing-actions">
              <a className="button button-copper" href={SITE.bookSessionUrl}>
                Book a $79 Clarity Session <ArrowRight aria-hidden="true" />
              </a>
              <Link className="text-link on-dark" to="/connect">
                Discuss an enterprise need
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
