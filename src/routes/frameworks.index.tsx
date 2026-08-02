import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Eyebrow, SectionTitle } from "@/components/site/SiteLayout";
import { FRAMEWORKS, canonicalUrl } from "@/lib/site-data";

export const Route = createFileRoute("/frameworks/")({
  head: () => ({
    meta: [
      { title: "The Frameworks Library — 16 Frameworks Behind ClarityOS" },
      {
        name: "description",
        content:
          "Sixteen frameworks that install the human layer: 8C Crisis-to-Clarity, The Pyramid, Cultural Ecosystem Mapping, Character Compass and more. Download the guides.",
      },
      { property: "og:title", content: "The Frameworks Library" },
      {
        property: "og:description",
        content: "The 16 frameworks behind ClarityOS.",
      },
      { property: "og:url", content: canonicalUrl("/frameworks") },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/frameworks") }],
  }),
  component: FrameworksPage,
});

function FrameworksPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-16 lg:px-8">
        <Eyebrow>The Library</Eyebrow>
        <h1 className="font-serif text-4xl leading-[1.1] text-navy md:text-6xl">
          16 frameworks. One installed operating system.
        </h1>
        <p className="mt-6 text-lg text-navy/70">
          Each framework maps to a real deployment inside a Fortune 500, GCC institution, or
          national platform. Download the field guides. Use them.
        </p>
      </section>

      <section className="border-t border-navy/10 bg-paper-soft py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionTitle>The full library</SectionTitle>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FRAMEWORKS.map((f) => (
              <Link
                key={f.slug}
                to="/frameworks/$slug"
                params={{ slug: f.slug }}
                className="group flex flex-col border border-navy/5 bg-white p-8 transition-colors hover:border-gold"
              >
                <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
                  {String(f.number).padStart(2, "0")} / {FRAMEWORKS.length} — {f.eyebrow}
                </div>
                <h3 className="mt-6 font-serif text-2xl leading-tight text-navy">{f.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-navy/60">{f.summary}</p>
                <div className="mt-6 text-[10px] font-medium uppercase tracking-widest text-navy group-hover:text-gold">
                  {f.leadMagnet} →
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-12 text-sm text-navy/60">
            Building a plan for yourself or a team? Start with the{" "}
            <Link to="/personal-development-framework" className="underline underline-offset-4">
              Practical People Skills Development Framework
            </Link>
            , or read the{" "}
            <Link to="/organizational-development" className="underline underline-offset-4">
              Organizational Development
            </Link>{" "}
            pillar.
          </p>
        </div>
      </section>

    </SiteLayout>
  );
}
