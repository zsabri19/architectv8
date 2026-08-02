import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout, Eyebrow } from "@/components/site/SiteLayout";
import { FRAMEWORKS, BOOK_CHAPTERS, ARTICLES, SITE, canonicalUrl } from "@/lib/site-data";
import { FRAMEWORK_ENRICHMENTS } from "@/lib/v4-content";
import { CITABLE_ASSETS } from "@/lib/citable-assets";

export const Route = createFileRoute("/frameworks/$slug")({
  loader: ({ params }) => {
    const framework = FRAMEWORKS.find((f) => f.slug === params.slug);
    if (!framework) throw notFound();
    return { framework };
  },
  head: ({ params, loaderData }) => {
    const citable = CITABLE_ASSETS[params.slug];
    const title = loaderData
      ? citable
        ? `The Continuity Gap — ${loaderData.framework.title}`
        : `${loaderData.framework.title} — ClarityOS Framework`
      : "Framework";
    const desc = citable
      ? "Most organisations do not fail a crisis at impact. They fail weeks later, when emergency authority is never formally returned. A diagnostic for the Continuity Gap."
      : (loaderData?.framework.summary ?? "A ClarityOS framework.");
    const url = canonicalUrl(`/frameworks/${params.slug}`);
    const faqs = FRAMEWORK_ENRICHMENTS[params.slug]?.faqs ?? [];

    const scripts: { type: string; children: string }[] = [];

    if (citable && loaderData) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `The Continuity Gap: why organisations fail a crisis weeks after it ends`,
          description: desc,
          datePublished: citable.datePublished,
          dateModified: citable.datePublished,
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          author: {
            "@type": "Person",
            name: SITE.name,
            jobTitle: SITE.role,
            url: canonicalUrl("/the-architect"),
          },
          publisher: { "@type": "Person", name: SITE.name, url: canonicalUrl("/") },
        }),
      });
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to close the Continuity Gap after a crisis",
          description: citable.failureMode.definition,
          step: citable.howTo.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.name,
            text: s.text,
          })),
        }),
      });
    }

    if (faqs.length > 0) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }),
      });
    }

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts,
    };
  },

  component: FrameworkPage,
});


function FrameworkPage() {
  const { framework: f } = Route.useLoaderData();
  const enrichment = FRAMEWORK_ENRICHMENTS[f.slug];
  const citable = CITABLE_ASSETS[f.slug];
  const chapters = BOOK_CHAPTERS.filter((c) => c.relatedFramework === f.slug);
  const articles = ARTICLES.filter((a) => a.relatedFramework === f.slug);

  return (
    <SiteLayout>
      <article className="mx-auto max-w-4xl px-6 pt-20 pb-16 lg:px-8">
        <nav className="mb-6 text-[11px] font-medium uppercase tracking-widest text-navy/50">
          <Link to="/frameworks" className="hover:text-gold">The Library</Link>
          <span className="mx-2">/</span>
          <span>Framework {String(f.number).padStart(2, "0")} / {FRAMEWORKS.length}</span>
        </nav>
        <Eyebrow>{f.eyebrow}</Eyebrow>

        {citable ? (
          <>
            <h1 className="font-serif text-4xl leading-tight text-navy md:text-6xl">
              The Continuity Gap
            </h1>
            <p className="mt-6 font-serif text-2xl leading-relaxed text-navy/90 md:text-3xl">
              {citable.claim}
            </p>
            <p className="mt-6 text-sm text-navy/50">
              Diagnosed with {f.title}. {citable.basis}
            </p>

            <section className="mt-20">
              <h2 className="font-serif text-3xl text-navy">Why recovery is the dangerous phase</h2>
              <div className="mt-6 space-y-6">
                {citable.diagnosis.map((para) => (
                  <p key={para} className="text-lg leading-relaxed text-navy/75">
                    {para}
                  </p>
                ))}
              </div>
            </section>

            <figure className="mt-20 border-l-2 border-gold py-2 pl-8">
              <blockquote className="font-serif text-2xl leading-relaxed text-navy md:text-3xl">
                “{citable.pullQuote}”
              </blockquote>
              <figcaption className="mt-4 text-[11px] font-medium uppercase tracking-widest text-navy/50">
                {citable.attribution}
              </figcaption>
            </figure>

            <section className="mt-20">
              <h2 className="font-serif text-3xl text-navy">
                The failure mode: {citable.failureMode.name}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy/75">
                {citable.failureMode.definition}
              </p>
              <h3 className="mt-10 text-[10px] font-medium uppercase tracking-widest text-gold">
                Five tells you have it
              </h3>
              <ul className="mt-4 space-y-3">
                {citable.failureMode.tells.map((t, i) => (
                  <li key={t} className="flex items-baseline gap-4 border-t border-navy/10 pt-3">
                    <span className="font-mono text-xs text-navy/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-navy/80">{t}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-20">
              <h2 className="font-serif text-3xl text-navy">How to close it</h2>
              <ol className="mt-8 space-y-8">
                {citable.howTo.map((s, i) => (
                  <li key={s.name}>
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-serif text-xl text-navy">{s.name}</h3>
                    </div>
                    <p className="mt-2 pl-10 leading-relaxed text-navy/75">{s.text}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-20 border-t border-navy/10 pt-10">
              <h2 className="font-serif text-3xl text-navy">{f.title}</h2>
              <p className="mt-6 text-lg leading-relaxed text-navy/75">{f.summary}</p>
            </section>
          </>
        ) : (
          <>
            <h1 className="font-serif text-4xl leading-tight text-navy md:text-6xl">{f.title}</h1>
            <p className="mt-8 text-xl leading-relaxed text-navy/70">{f.summary}</p>
          </>
        )}


        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
              Parameters
            </div>
            <ul className="mt-4 space-y-2">
              {f.parameters.map((p: string) => (
                <li key={p} className="flex items-baseline gap-3 border-b border-navy/10 pb-2">
                  <span className="font-mono text-xs text-navy/40">→</span>
                  <span className="font-serif text-lg text-navy">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
              Impact
            </div>
            <p className="mt-4 font-serif text-2xl italic leading-relaxed text-navy">{f.impact}</p>
          </div>
        </div>

        {enrichment && (
          <>
            <div className="mt-16">
              <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
                Definition
              </div>
              <p className="mt-4 font-serif text-2xl leading-relaxed text-navy/90">
                {enrichment.definition}
              </p>
              <div className="mt-2 text-[11px] font-medium uppercase tracking-widest text-navy/40">
                {enrichment.category}
              </div>
            </div>

            <div className="mt-12 grid gap-10 md:grid-cols-2">
              <div>
                <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
                  Use cases
                </div>
                <ul className="mt-4 space-y-3">
                  {enrichment.useCases.map((u) => (
                    <li key={u} className="border-l-2 border-navy/10 pl-4 text-navy/80">
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
                  Process
                </div>
                <ol className="mt-4 space-y-3">
                  {enrichment.process.map((step, i) => (
                    <li key={step} className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-navy/80">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {enrichment.faqs.length > 0 && (
              <div className="mt-12">
                <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
                  Questions
                </div>
                <div className="mt-4 space-y-6">
                  {enrichment.faqs.map((q) => (
                    <div key={q.question} className="border-t border-navy/10 pt-4">
                      <h4 className="font-serif text-lg text-navy">{q.question}</h4>
                      <p className="mt-2 text-navy/70">{q.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <div className="mt-16 border-l-2 border-gold bg-paper-soft p-8">
          <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
            Field Guide
          </div>
          <h3 className="mt-2 font-serif text-2xl text-navy">{f.leadMagnet}</h3>
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
                  body: JSON.stringify({ ...data, framework: f.slug, frameworkNumber: f.number, }),  // Track which framework was requested
                });

                if (response.ok) {
                  alert(`Thank you! We've logged your interest in the ${f.title}. You'll be notified when the Field Guide becomes available for download.`);
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

        {(chapters.length > 0 || articles.length > 0) && (
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {chapters.length > 0 && (
              <div>
                <div className="text-[10px] font-medium uppercase tracking-widest text-navy/50">
                  Related chapters
                </div>
                <ul className="mt-3 space-y-2">
                  {chapters.map((c) => (
                    <li key={c.slug}>
                      <Link
                        to="/book/$slug"
                        params={{ slug: `chapter-${String(c.number).padStart(2, "0")}-${c.slug}` }}
                        className="font-serif text-lg text-navy hover:text-gold"
                      >
                        Ch. {c.number}: {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {articles.length > 0 && (
              <div>
                <div className="text-[10px] font-medium uppercase tracking-widest text-navy/50">
                  Related articles
                </div>
                <ul className="mt-3 space-y-2">
                  {articles.map((a) => (
                    <li key={a.slug}>
                      <Link
                        to="/insights/$slug"
                        params={{ slug: a.slug }}
                        className="font-serif text-lg text-navy hover:text-gold"
                      >
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="mt-16 grid gap-4 border-t border-navy/10 pt-8 md:grid-cols-2">
          <a
            href={SITE.bookSessionUrl}
            className="bg-navy px-8 py-4 text-center text-xs font-bold uppercase tracking-widest text-paper hover:bg-gold hover:text-navy"
          >
            Start a Conversation
          </a>
          <Link
            to="/services"
            className="border border-navy/20 px-8 py-4 text-center text-xs font-bold uppercase tracking-widest hover:border-navy"
          >
            Enterprise Engagement
          </Link>
        </div>
      </article>
    </SiteLayout>
  );
}
