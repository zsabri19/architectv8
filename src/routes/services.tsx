import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Eyebrow, SectionTitle } from "@/components/site/SiteLayout";
import { SERVICES, SITE, canonicalUrl } from "@/lib/site-data";
import frameworkAsset from "@/assets/framework-8c.jpg.asset.json";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — ClarityOS Personal, Enterprise, Board Advisory" },
      {
        name: "description",
        content:
          "Three engagement paths: ClarityOS Personal, Enterprise 90-Day Program, and Board Advisory & Speaking for GCC organisations.",
      },
      { property: "og:title", content: "Services — ClarityOS" },
      { property: "og:description", content: "Choose the level of clarity you need." },
      { property: "og:url", content: canonicalUrl("/services") },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/services") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "ClarityOS by Zeeshan Sabri",
          areaServed: "GCC and international",
          serviceType: [
            "Executive Advisory",
            "Board Advisory",
            "Keynote Speaking",
            "AI Training & Certification",
          ],
        }),
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="lg:col-span-8">
          <Eyebrow>Engagement Paths</Eyebrow>
          <h1 className="font-serif text-4xl leading-[1.1] text-navy md:text-6xl">
            Three paths, one methodology: how deep does the problem go?
          </h1>
          <p className="mt-6 text-lg text-navy/70">
            Choose the level of clarity you need across the ClarityOS framework.
          </p>
          <p className="mt-3 text-sm text-navy/50">
            Built on the 8C Crisis-to-Clarity Framework · Initial response within 48 hours · Tailored proposal within 5 business days · Every
            engagement starts with a clarity diagnosis.
          </p>
        </div>
        <div className="mt-12 lg:col-span-4 lg:mt-0">
          <div className="overflow-hidden bg-navy shadow-2xl">
            <img
              src={frameworkAsset.url}
              alt="The 8C Crisis-to-Clarity Framework — ClarityOS methodology"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <div
              key={s.slug}
              className={`flex flex-col p-10 ${
                i === 1
                  ? "bg-navy text-paper shadow-2xl md:-translate-y-4"
                  : "border border-navy/10 bg-white text-navy"
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-widest text-gold">
                {s.tier}
              </div>
              <h2 className={`mt-4 font-serif text-2xl ${i === 1 ? "text-paper" : "text-navy"}`}>
                {s.title}
              </h2>
              <p className={`mt-4 flex-1 text-sm leading-relaxed ${i === 1 ? "text-paper/70" : "text-navy/60"}`}>
                {s.description}
              </p>
              <div className={`mt-6 font-serif text-3xl ${i === 1 ? "italic text-gold" : "text-gold"}`}>
                {s.price}
              </div>
              <div className={`mt-1 text-xs ${i === 1 ? "text-paper/50" : "text-navy/50"}`}>
                {s.cadence}
              </div>
              {s.cta.href.startsWith("http") ? (
                <a
                  href={s.cta.href}
                  className={`mt-6 block py-4 text-center text-xs font-bold uppercase tracking-widest transition-colors ${
                    i === 1
                      ? "bg-gold text-navy hover:bg-paper"
                      : "border border-navy text-navy hover:bg-navy hover:text-paper"
                  }`}
                >
                  {s.cta.label}
                </a>
              ) : (
                <Link
                  to={s.cta.href}
                  className={`mt-6 block py-4 text-center text-xs font-bold uppercase tracking-widest transition-colors ${
                    i === 1
                      ? "bg-gold text-navy hover:bg-paper"
                      : "border border-navy text-navy hover:bg-navy hover:text-paper"
                  }`}
                >
                  {s.cta.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-navy/10 bg-paper-soft py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Eyebrow>Additional Practice</Eyebrow>
          <SectionTitle>AI Training & Certification</SectionTitle>
          <p className="mt-6 text-navy/70">
            AI CERTs-certified trainer. Board-level AI governance programmes for GCC executives and
            regulated environments. Typical daily / hourly rate signal: USD 350–500 per hour for
            board briefings and executive workshops.
          </p>
          <Link
            to="/connect"
            className="mt-8 inline-block bg-navy px-8 py-4 text-xs font-bold uppercase tracking-widest text-paper hover:bg-gold hover:text-navy"
          >
            Request AI Programme Proposal
          </Link>
        </div>
      </section>

      <section className="bg-navy py-20 text-paper">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl">Not sure which path fits?</h2>
          <p className="mx-auto mt-4 max-w-xl text-paper/70">
            Start with a Clarity Session. Diagnose the situation before you commit to the wrong
            kind of solution.
          </p>
          <a
            href={SITE.bookSessionUrl}
            className="mt-8 inline-block bg-gold px-8 py-4 text-xs font-bold uppercase tracking-widest text-navy hover:bg-paper"
          >
            Start a Conversation
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
