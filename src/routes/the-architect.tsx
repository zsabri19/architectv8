import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Eyebrow, SectionTitle } from "@/components/site/SiteLayout";
import { PhotoGallery } from "@/components/site/PhotoGallery";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { SITE, METRICS, LOGOS_INSTITUTIONS, LOGOS_VENTURES, RECOGNITION, FIELD_PHOTOS, CERT_AICERTS_PDF, CERTIFICATIONS, ARCHIVE_CRICKET, canonicalUrl } from "@/lib/site-data";
import originAsset from "@/assets/origin.jpg.asset.json";

const OG = `https://${SITE.domain}${originAsset.url}`;

export const Route = createFileRoute("/the-architect")({
  head: () => ({
    meta: [
      { title: "The Architect — Zeeshan Sabri · Origin & Recognition" },
      {
        name: "description",
        content:
          "22 years across Fortune 500, government, and ventures. Chartered MCIPS. AI CERTs certified trainer. Winner, Founders 2.0 Entrepreneurial Excellence Award, Dubai 2025.",
      },
      { property: "og:title", content: "The Architect — Zeeshan Sabri" },
      { property: "og:description", content: "The origin story behind ClarityOS." },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: canonicalUrl("/the-architect") },
      { property: "og:image", content: OG },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/the-architect") }],
  }),
  component: ArchitectPage,
});

function ArchitectPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-16 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pt-24">
        <div className="lg:col-span-7">
          <Eyebrow>The Architect</Eyebrow>
          <h1 className="font-serif text-4xl leading-[1.1] text-navy md:text-6xl">
            Born from displacement. Forged in Fortune 500 transformation. Built because nothing else
            worked.
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-navy/70">
            My family evacuated Kuwait during the Gulf War. I spent 20 years inside Huawei, Motorola
            Solutions, and major procurement and transformation portfolios across the GCC. The
            pattern was always the same: organisations invest in systems and ignore the humans
            running them. ClarityOS is what I built when I got tired of watching the same failure
            repeat.
          </p>
        </div>
        <div className="mt-12 lg:col-span-5 lg:mt-0">
          <div className="overflow-hidden bg-navy shadow-2xl">
            <img
              src={originAsset.url}
              alt="Zeeshan Sabri — editorial portrait"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-paper">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-paper/10 lg:grid-cols-4">
          {METRICS.map((m) => (
            <div key={m.label} className="bg-navy p-10 text-center">
              <div className="font-serif text-4xl text-gold">{m.value}</div>
              <div className="mt-3 text-[10px] font-medium uppercase tracking-[0.25em] text-paper/60">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
        <Eyebrow>Recognition</Eyebrow>
        <h2 className="font-serif text-3xl text-navy md:text-4xl">Founders 2.0 Award, Dubai 2025</h2>
        <p className="mt-6 text-navy/70">
          The Entrepreneurial Excellence Award recognised ClarityOS as the world's first
          Pre-Governance Operating System, currently deployed across national-scale digital
          banking, telecom, and defence procurement transformations serving 5 million+ users.
        </p>
        <blockquote className="mt-10 border-l-2 border-gold pl-6 font-serif text-2xl italic text-navy">
          "We are seeing a maturity shift in the GCC. Leaders are realising that you cannot install
          a First World governance system on a broken human operating system."
          <footer className="mt-4 text-sm not-italic uppercase tracking-widest text-navy/50">
            — Zeeshan Sabri, Founders 2.0 Conference, Dubai
          </footer>
        </blockquote>
        <a
          href={SITE.award.pressUrl}
          className="mt-8 inline-block border-b border-navy/20 pb-1 text-xs font-medium uppercase tracking-widest hover:border-gold hover:text-gold"
        >
          Read the press release →
        </a>
      </section>

      <section className="border-t border-navy/10 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Eyebrow>Institutional Credibility</Eyebrow>
          <div className="mt-6">
            <LogoMarquee logos={LOGOS_INSTITUTIONS} label="Institutions engaged" speed={38} />
          </div>

          <div className="mt-4">
            <a
              href={CERT_AICERTS_PDF}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-medium uppercase tracking-widest text-navy/60 hover:text-gold"
            >
              AI CERTs — Certified Trainer credential (PDF) →
            </a>
          </div>
          <div className="mt-12">
            <Eyebrow>Ventures, platforms, ecosystem</Eyebrow>
          </div>
          <div className="mt-6">
            <LogoMarquee logos={LOGOS_VENTURES} label="Ventures and programmes" speed={52} />
          </div>

        </div>
      </section>

      <section className="border-t border-navy/10 bg-paper-soft py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Eyebrow>Certifications</Eyebrow>
          <SectionTitle className="mb-4">Verified credentials on file</SectionTitle>
          <p className="mb-12 max-w-2xl text-navy/60">
            Every credential below links to the issuer's own verification record — no screenshots,
            no claims without a registry behind them.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {CERTIFICATIONS.map((c) => (
              <a
                key={c.title}
                href={c.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col border border-navy/10 bg-white transition-colors hover:border-gold"
              >
                <div className="flex h-44 items-center justify-center bg-navy/5 p-6">
                  <img
                    src={c.image}
                    alt={`${c.title} — ${c.issuer}`}
                    loading="lazy"
                    className="max-h-full w-auto object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
                    {c.issuer} · {c.year}
                  </div>
                  <div className="mt-2 font-serif text-lg text-navy group-hover:text-gold">
                    {c.title}
                  </div>
                  <p className="mt-2 text-sm text-navy/60">{c.note}</p>
                  <span className="mt-4 text-[10px] font-medium uppercase tracking-widest text-navy/50 group-hover:text-gold">
                    Verify →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-navy/10 bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Eyebrow>Recognition & Field Testimony</Eyebrow>
          <SectionTitle className="mb-12">Awards, mentorship, and the record on file</SectionTitle>
          <div className="grid gap-8 md:grid-cols-3">
            {RECOGNITION.map((r) => (
              <figure key={r.title} className="flex flex-col border border-navy/10 bg-white">
                <div className="aspect-[4/3] overflow-hidden bg-navy/5">
                  <img src={r.src} alt={r.title} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <figcaption className="p-6">
                  <div className="font-serif text-lg text-navy">{r.title}</div>
                  <p className="mt-2 text-sm text-navy/60">{r.note}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-navy/10 bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Eyebrow>In the Field</Eyebrow>
          <SectionTitle className="mb-12">Where the work happens</SectionTitle>
          <p className="mb-8 max-w-2xl text-navy/60">
            Click any frame to open it full size — uncropped, with context.
          </p>
          <PhotoGallery photos={FIELD_PHOTOS.slice(0, 6)} />
          <p className="mt-8 text-sm text-navy/60">
            The full field archive lives on the{" "}
            <Link to="/media" className="underline underline-offset-4">
              Media page
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-navy/10 bg-white py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <details className="early-years">
            <summary>
              <span className="early-years-label">Early Years</span>
              <span className="early-years-title">Kuwait Cricket — 1999–2000, on the record</span>
            </summary>
            <p className="mt-6 max-w-3xl text-navy/70">
              Before the Fortune 500 years and the GCC transformation portfolios, there was an
              opening batsman on the Kuwait national U-17 and U-19 squads. The habit of holding the
              first over — reading conditions, absorbing pressure, protecting the innings — is the
              same habit ClarityOS installs in leadership teams two decades later.
            </p>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {ARCHIVE_CRICKET.map((a) => (
                <figure key={a.src} className="flex flex-col border border-navy/10 bg-paper-soft">
                  <div className="flex items-center justify-center bg-navy/5 p-4">
                    <img
                      src={a.src}
                      alt={a.caption}
                      loading="lazy"
                      className="max-h-[520px] w-auto object-contain"
                    />
                  </div>
                  <figcaption className="border-t border-navy/10 p-5">
                    <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
                      Archive · {a.year}
                    </div>
                    <p className="mt-2 text-sm text-navy/70">{a.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </details>
        </div>
      </section>

      <section className="bg-paper-soft py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="font-serif text-3xl text-navy md:text-4xl">
            Ready to install the human layer?
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={SITE.bookSessionUrl}
              className="bg-navy px-8 py-4 text-xs font-bold uppercase tracking-widest text-paper hover:bg-gold hover:text-navy"
            >
              Start a Conversation
            </a>
            <Link
              to="/book"
              className="border border-navy/20 px-8 py-4 text-xs font-bold uppercase tracking-widest hover:border-navy"
            >
              Explore the Memoir
            </Link>
          </div>
          <p className="mt-10 text-sm text-navy/60">
            Deeper reading:{" "}
            <Link to="/organizational-development" className="underline underline-offset-4">
              Organizational Development
            </Link>{" "}
            ·{" "}
            <Link to="/executive-coaching" className="underline underline-offset-4">
              Executive Coaching &amp; Advisory
            </Link>{" "}
            ·{" "}
            <Link to="/clarityos" className="underline underline-offset-4">
              ClarityOS
            </Link>{" "}
            ·{" "}
            <Link to="/press" className="underline underline-offset-4">
              Press kit
            </Link>
          </p>


        </div>
      </section>
    </SiteLayout>
  );
}
