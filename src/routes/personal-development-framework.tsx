import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PDF_PILLAR } from "@/lib/pillar-content";
import { SITE, canonicalUrl } from "@/lib/site-data";

const TITLE = "Personal Development Framework — People Skills";
const DESC =
  "A practical personal development framework: six core people-skill capabilities and a six-month track that turns a development plan into observable behaviour.";
const URL = "/personal-development-framework";

export const Route = createFileRoute("/personal-development-framework")({
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
          "@type": "HowTo",
          name: "How to create a personal development plan",
          description: DESC,
          author: { "@type": "Person", name: SITE.name, jobTitle: SITE.role },
          step: PDF_PILLAR.track.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: `${s.month}: ${s.title}`,
            text: s.action,
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: PDF_PILLAR.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }),
      },
    ],
  }),
  component: PersonalDevelopmentPage,
});

function PersonalDevelopmentPage() {
  return (
    <SiteLayout>
      <section className="section" aria-labelledby="pd-title">
        <div className="site-shell" style={{ maxWidth: "68rem" }}>
          <p className="eyebrow">{PDF_PILLAR.eyebrow}</p>
          <h1 id="pd-title" className="font-serif text-4xl leading-[1.1] md:text-6xl">
            {PDF_PILLAR.title}
          </h1>
          <p className="hero-summary mt-6 max-w-3xl">{PDF_PILLAR.lede}</p>
          <div className="hero-actions mt-8">
            <Link className="button button-copper" to="/frameworks/$slug" params={{ slug: "practical-people-skills-development" }}>
              See the framework detail page <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="text-link" to="/frameworks">
              See all frameworks
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-method">
        <div className="site-shell space-y-5" style={{ maxWidth: "56rem" }}>
          {PDF_PILLAR.intro.map((p) => (
            <p key={p} className="leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="pd-concepts">
        <div className="site-shell" style={{ maxWidth: "68rem" }}>
          <p className="eyebrow">Six core capabilities</p>
          <h2 id="pd-concepts" className="font-serif text-3xl">
            What the framework develops
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {PDF_PILLAR.concepts.map((c) => (
              <article key={c.number}>
                <div className="font-mono text-xs opacity-60">{c.number}</div>
                <h3 className="mt-2 font-serif text-2xl">{c.title}</h3>
                <ul className="mt-4 space-y-3">
                  {c.points.map((p) => (
                    <li key={p.label} className="text-sm leading-relaxed">
                      <span className="font-semibold">{p.label}. </span>
                      {p.text}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-method" aria-labelledby="pd-track">
        <div className="site-shell" style={{ maxWidth: "56rem" }}>
          <p className="eyebrow">The six-month track</p>
          <h2 id="pd-track" className="font-serif text-3xl">
            How to create a personal development plan that holds
          </h2>
          <ol className="mt-8 space-y-6">
            {PDF_PILLAR.track.map((s) => (
              <li key={s.month} className="border-t pt-5">
                <div className="font-mono text-xs opacity-60">{s.month}</div>
                <h3 className="mt-1 font-serif text-xl">{s.title}</h3>
                <p className="mt-2 leading-relaxed">{s.action}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="pd-faq">
        <div className="site-shell" style={{ maxWidth: "56rem" }}>
          <p className="eyebrow">Questions people ask</p>
          <h2 id="pd-faq" className="font-serif text-3xl">
            Personal development plans and frameworks, answered
          </h2>
          <div className="mt-8 space-y-8">
            {PDF_PILLAR.faqs.map((f) => (
              <div key={f.question} className="border-t pt-5">
                <h3 className="font-serif text-xl">{f.question}</h3>
                <p className="mt-2 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
          <ul className="mt-10 space-y-3">
            <li>
              <Link className="text-link" to="/frameworks/$slug" params={{ slug: "character-compass" }}>
                The Character Compass — the leadership layer above this framework
              </Link>
            </li>
            <li>
              <Link className="text-link" to="/executive-coaching">
                Executive coaching &amp; advisory
              </Link>
            </li>
            <li>
              <Link className="text-link" to="/organizational-development">
                Organizational development: the human layer
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-3xl border-t border-navy/10 px-6 py-16 lg:px-8">
        <div className="bg-paper-soft p-8">
          <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
            Field Guide
          </div>
          <h3 className="mt-2 font-serif text-2xl text-navy">Practical People Skills Development Guide (PDF)</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const formData = new FormData(form);
              const data = Object.fromEntries(formData);

              try {
                const response = await fetch("https://formspree.io/f/xaqrzevp", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                  },
                  body: JSON.stringify({ ...data, framework: "practical-people-skills-development", frameworkNumber: 16 }),
                });

                if (response.ok) {
                  alert("Thank you! We've logged your interest in the Practical People Skills Development Guide. You'll be notified when the Field Guide becomes available for download.");
                  form.reset();
                } else {
                  console.error("Form submission failed");
                  alert("Submission failed. Please try again.");
                }
              } catch (error) {
                console.error("Error submitting form:", error);
                alert("Error submitting form. Please try again.");
              }
            }}
            className="mt-4 flex flex-col gap-3 md:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Email for the Field Guide"
              className="flex-1 border border-navy/20 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
            />
            <button className="bg-navy px-6 py-3 text-xs font-bold uppercase tracking-widest text-paper hover:bg-gold hover:text-navy">
              Get notified when available
            </button>
          </form>
        </div>
      </section>

      <section className="closing-section" aria-labelledby="pd-closing">
        <div className="site-shell closing-grid">
          <p className="section-index on-dark">Put it to work</p>
          <div>
            <h2 id="pd-closing">A plan without a practice ground is a wish list.</h2>
            <div className="closing-actions">
              <a className="button button-copper" href={SITE.bookSessionUrl}>
                Start a Conversation <ArrowRight aria-hidden="true" />
              </a>
              <Link className="text-link on-dark" to="/frameworks/$slug" params={{ slug: "practical-people-skills-development" }}>
                View the framework
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
