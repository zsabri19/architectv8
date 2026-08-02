import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Eyebrow, SectionTitle } from "@/components/site/SiteLayout";
import { QuoteCard } from "@/components/site/QuoteCard";
import { ARTICLES, QUOTE_CARDS, EXTERNAL_PUBLICATIONS, canonicalUrl } from "@/lib/site-data";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Insights — The Clarity Dispatch · Zeeshan Sabri" },
      {
        name: "description",
        content:
          "Field notes, case studies, and framework deep-dives on installing the human operating layer before transformation. From GCC leadership practice.",
      },
      { property: "og:title", content: "Insights — The Clarity Dispatch" },
      { property: "og:description", content: "Field notes on the human layer of transformation." },
      { property: "og:url", content: canonicalUrl("/insights") },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/insights") }],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-16 lg:px-8">
        <Eyebrow>Insights</Eyebrow>
        <h1 className="font-serif text-4xl leading-[1.1] text-navy md:text-6xl">
          Field notes from the human layer of transformation.
        </h1>
        <p className="mt-6 text-lg text-navy/70">
          Case studies, framework deep-dives, and GCC market intelligence — from live engagements
          inside boards, national platforms, and Fortune 500 portfolios.
        </p>
      </section>

      <section className="border-t border-navy/10 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Eyebrow>In His Own Words</Eyebrow>
          <SectionTitle className="mb-10">Quote cards from the practice</SectionTitle>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {QUOTE_CARDS.map((c) => (
              <QuoteCard key={c.slug} card={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-navy/10 bg-paper-soft py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionTitle>Latest</SectionTitle>
          <div className="mt-12 divide-y divide-navy/10">
            {ARTICLES.map((a) => (
              <Link
                key={a.slug}
                to="/insights/$slug"
                params={{ slug: a.slug }}
                className="group grid gap-4 py-8 md:grid-cols-12"
              >
                <div className="md:col-span-3">
                  <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
                    {a.category}
                  </div>
                  <time className="mt-1 block text-xs text-navy/50">
                    {new Date(a.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-serif text-2xl text-navy transition-colors group-hover:text-gold md:text-3xl">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-navy/60">{a.summary}</p>
                  <div className="mt-3 text-[10px] font-medium uppercase tracking-widest text-navy group-hover:text-gold">
                    Read the piece →
                  </div>
                </div>
              </Link>
            ))}

            {EXTERNAL_PUBLICATIONS.map((p, i) => {
              const Wrapper: React.ElementType = p.url ? "a" : "div";
              const wrapperProps = p.url
                ? { href: p.url, target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
                <Wrapper
                  key={`ext-${i}`}
                  {...wrapperProps}
                  className="group grid gap-4 py-8 md:grid-cols-12"
                >
                  <div className="md:col-span-3">
                    <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
                      {p.publisher}
                    </div>
                    {p.date && (
                      <time className="mt-1 block text-xs text-navy/50">
                        {new Date(p.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    )}
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="font-serif text-2xl text-navy transition-colors group-hover:text-gold md:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-navy/60">{p.summary}</p>
                    {p.url && (
                      <div className="mt-3 text-[10px] font-medium uppercase tracking-widest text-navy group-hover:text-gold">
                        Read on {p.publisher} ↗
                      </div>
                    )}
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
