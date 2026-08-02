import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout, Eyebrow } from "@/components/site/SiteLayout";
import { ARTICLES, FRAMEWORKS, SITE, canonicalUrl } from "@/lib/site-data";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const article = ARTICLES.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ params, loaderData }) => {
    const raw = loaderData?.article.title ?? "";
    const SUFFIX = " — Insights";
    const MAX = 60;
    const base = raw.split(":")[0].trim() || raw;
    const pick = (base + SUFFIX).length <= MAX ? base : base.slice(0, MAX - SUFFIX.length - 1).trim();
    const title = loaderData ? `${pick}${SUFFIX}` : "Insight";
    const desc = loaderData?.article.summary ?? "An insight from Zeeshan Sabri.";

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonicalUrl(`/insights/${params.slug}`) },
      ],
      links: [{ rel: "canonical", href: canonicalUrl(`/insights/${params.slug}`) }],
      scripts: loaderData
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: loaderData.article.title,
                description: loaderData.article.summary,
                datePublished: loaderData.article.date,
                articleSection: loaderData.article.category,
                author: { "@type": "Person", name: "Zeeshan Sabri" },
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `https://${SITE.domain}/insights/${params.slug}`,
                },
              }),
            },
          ]
        : [],
    };
  },

  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const framework = article.relatedFramework
    ? FRAMEWORKS.find((f) => f.slug === article.relatedFramework)
    : null;

  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-6 pt-20 pb-24 lg:px-8">
        <nav className="mb-4 text-[11px] font-medium uppercase tracking-widest text-navy/50">
          <Link to="/insights" className="hover:text-gold">Insights</Link>
          <span className="mx-2">/</span>
          <span>{article.category}</span>
        </nav>
        <Eyebrow>
          {article.category} ·{" "}
          {new Date(article.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Eyebrow>
        <h1 className="font-serif text-4xl leading-tight text-navy md:text-5xl">
          {article.title}
        </h1>
        <p className="mt-8 text-xl leading-relaxed text-navy/70">{article.summary}</p>

        <div className="mt-12 space-y-10 text-lg leading-relaxed text-navy/80">
          {article.sections.map((section: { heading: string; paragraphs: string[] }, idx: number) => (
            <section key={section.heading}>
              <h2 className="font-serif text-2xl text-navy md:text-3xl">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((p: string, pIdx: number) => (
                  <p key={pIdx} className={idx === 0 && pIdx === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-none first-letter:text-gold" : undefined}>
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {framework && (
          <div className="mt-16 border-l-2 border-gold bg-paper-soft p-8">
            <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
              Related Framework
            </div>
            <h3 className="mt-2 font-serif text-2xl text-navy">{framework.title}</h3>
            <p className="mt-3 text-navy/70">{framework.summary}</p>
            <Link
              to="/frameworks/$slug"
              params={{ slug: framework.slug }}
              className="mt-4 inline-block text-xs font-medium uppercase tracking-widest text-navy hover:text-gold"
            >
              Read the framework →
            </Link>
          </div>
        )}

        <div className="mt-16 grid gap-4 border-t border-navy/10 pt-8 md:grid-cols-2">
          <a
            href={SITE.bookSessionUrl}
            className="bg-navy px-8 py-4 text-center text-xs font-bold uppercase tracking-widest text-paper hover:bg-gold hover:text-navy"
          >
            Book $79 Clarity Session
          </a>
          <Link
            to="/insights"
            className="border border-navy/20 px-8 py-4 text-center text-xs font-bold uppercase tracking-widest hover:border-navy"
          >
            More Insights
          </Link>
        </div>
      </article>
    </SiteLayout>
  );
}
