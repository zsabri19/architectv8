import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Eyebrow, SectionTitle } from "@/components/site/SiteLayout";
import {
  SITE,
  SPEAKING,
  FIELD_PHOTOS,
  MEDIA_FILM,
  PRESS_ITEMS,
  EXTERNAL_PUBLICATIONS,
  RECOGNITION,
  RECOGNITION_LUMS,
  WORKSHOP_LEDGER,
  WORKSHOP_STATS,
  canonicalUrl,
} from "@/lib/site-data";
import { VideoPanel } from "@/components/site/VideoPanel";
import { WorkshopMarquee } from "@/components/site/WorkshopMarquee";
import { PhotoGallery } from "@/components/site/PhotoGallery";
import { EnquiryForm } from "@/components/site/EnquiryForm";

import decodeBanner from "@/assets/banner-decode.jpg.asset.json";

const OG = `https://${SITE.domain}${decodeBanner.url}`;

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { title: "Media & Press — Zeeshan Sabri · Keynotes, Interviews, Coverage" },
      {
        name: "description",
        content:
          "Press coverage, keynotes, and public speaking. Winner of the Entrepreneurial Excellence Award, Founders 2.0 Conference, Dubai 2025. Upcoming: Decode Conference, LUMS Lahore, Jan 2026.",
      },
      { property: "og:title", content: "Media & Press — Zeeshan Sabri" },
      { property: "og:description", content: "Press, keynotes, and interviews." },
      { property: "og:url", content: canonicalUrl("/media") },
      { property: "og:image", content: OG },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/media") }],
  }),
  component: MediaPage,
});

const BANDS: { key: "upcoming" | "keynote" | "workshop" | "featured"; title: string; eyebrow: string }[] = [
  { key: "upcoming", eyebrow: "Upcoming", title: "Upcoming Keynotes" },
  { key: "keynote", eyebrow: "Keynotes", title: "Signature Keynotes" },
  { key: "workshop", eyebrow: "Workshops", title: "Executive Workshops" },
  { key: "featured", eyebrow: "Featured", title: "Featured Appearances" },
];

function MediaPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-12 lg:px-8">
        <Eyebrow>Media & Press</Eyebrow>
        <h1 className="font-serif text-4xl leading-[1.1] text-navy md:text-6xl">
          Keynotes, coverage, and the record on file.
        </h1>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="overflow-hidden border border-navy/10 bg-navy shadow-2xl">
          <img
            src={decodeBanner.url}
            alt="Decode Entrepreneur's Conference — Zeeshan Sabri, Conference Speaker, LUMS Lahore, 15 January 2026"
            className="h-auto w-full"
            loading="eager"
          />
        </div>
        <p className="mt-4 text-sm text-navy/60">
          Decode Entrepreneur's Conference · CxO Global Forum · LUMS Lahore · 15 January 2026 —{" "}
          <em>The Secret of Successful Transformation</em>.
        </p>
      </section>


      <section className="film-band">
        <div className="site-shell">
          <Eyebrow>Film</Eyebrow>
          <h2 className="mt-2 font-serif text-3xl text-paper md:text-4xl">
            On camera, in the field
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {MEDIA_FILM.map((v) => (
              <VideoPanel key={v.src} item={v} />
            ))}
          </div>
        </div>
      </section>

      <section className="workshop-band" aria-labelledby="ws-title">
        <div className="site-shell">
          <Eyebrow>Workshops & talks</Eyebrow>
          <h2 id="ws-title" className="mt-2 font-serif text-3xl leading-tight text-navy md:text-4xl">
            The delivered ledger
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-navy/70">
            Every flyer below is a room that ran. Muscat, Doha, Riyadh, Lahore — founder cohorts,
            executive programmes, and conference stages.
          </p>
          <dl className="workshop-stats">
            {WORKSHOP_STATS.map((s) => (
              <div key={s.label}>
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <WorkshopMarquee items={WORKSHOP_LEDGER} />
        <div className="site-shell mt-8">
          <EnquiryForm
            enquiryType="Workshop"
            triggerLabel="Bring a workshop to your team"
            heading="Bring a workshop to your team"
            messagePlaceholder="Which team, how many people, and what needs to shift?"
          />
        </div>

      </section>


      {BANDS.map((band, idx) => {
        const rows = SPEAKING.filter((s) => s.band === band.key);
        if (rows.length === 0) return null;
        return (
          <section
            key={band.key}
            className={`border-t border-navy/10 py-16 ${idx % 2 === 0 ? "bg-paper-soft" : "bg-white"}`}
          >
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
              <Eyebrow>{band.eyebrow}</Eyebrow>
              <SectionTitle>{band.title}</SectionTitle>
              <ul className="mt-10 divide-y divide-navy/10">
                {rows.map((s) => (
                  <li key={s.title + s.date} className="py-6">
                    <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
                      {s.role} · {s.date}
                    </div>
                    <div className="mt-2 font-serif text-2xl text-navy">{s.title}</div>
                    <div className="mt-2 text-sm text-navy/60">
                      {s.org} · {s.venue}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section className="border-t border-navy/10 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Eyebrow>The Field</Eyebrow>
          <SectionTitle className="mb-12">Recent stages, workshops, and rooms</SectionTitle>
          <p className="mb-8 max-w-2xl text-navy/60">
            Click any frame to open it full size — uncropped, with context.
          </p>
          <PhotoGallery photos={FIELD_PHOTOS} />
          <div className="mt-12">
            <EnquiryForm
              enquiryType="Speaking"
              triggerLabel="Request speaking engagement"
              heading="Request a speaking engagement"
              messagePlaceholder="Event, audience, date, and the theme you want covered."
            />
          </div>
          <p className="mt-12 text-sm text-navy/60">
            More written analysis in{" "}
            <Link to="/insights" className="underline underline-offset-4">
              Insights
            </Link>{" "}
            · journalists and organisers, see the{" "}
            <Link to="/press" className="underline underline-offset-4">
              press kit
            </Link>
            .
          </p>

        </div>
      </section>


      <section className="border-t border-navy/10 bg-paper-soft py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Eyebrow>Recognition</Eyebrow>
          <SectionTitle className="mb-12">Awards and honours on record</SectionTitle>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[RECOGNITION_LUMS, ...RECOGNITION].map((r) => (
              <figure key={r.title} className="border border-navy/10 bg-white">
                <img src={r.src} alt={r.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <figcaption className="p-5">
                  <div className="font-serif text-lg text-navy">{r.title}</div>
                  <p className="mt-2 text-sm text-navy/60">{r.note}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-navy/10 bg-paper-soft py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <SectionTitle>Press & Publications</SectionTitle>
          <ul className="mt-10 divide-y divide-navy/10">
            {PRESS_ITEMS.map((p) => (
              <li key={p.title} className="py-6">
                <a href={p.url} className="group flex gap-6">
                  {p.cover && (
                    <img
                      src={p.cover}
                      alt={`${p.outlet} cover — ${p.date}`}
                      loading="lazy"
                      className="hidden w-28 shrink-0 border border-navy/10 object-cover sm:block"
                    />
                  )}
                  <span className="block min-w-0">
                    <span className="block text-[10px] font-medium uppercase tracking-widest text-gold">
                      {p.outlet} · {p.date}
                    </span>
                    <span className="mt-2 block font-serif text-2xl text-navy group-hover:text-gold">
                      {p.title}
                    </span>
                    <span className="mt-2 block text-[10px] font-medium uppercase tracking-widest text-navy/50 group-hover:text-gold">
                      Read →
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          {EXTERNAL_PUBLICATIONS.length > 0 && (
            <>
              <h3 className="mt-12 font-serif text-2xl text-navy">External Publications</h3>
              <ul className="mt-6 divide-y divide-navy/10">
                {EXTERNAL_PUBLICATIONS.map((p) => (
                  <li key={p.title} className="py-4">
                    {p.url ? (
                      <a href={p.url} className="group block" target="_blank" rel="noreferrer">
                        <span className="block text-[10px] font-medium uppercase tracking-widest text-gold">
                          {p.publisher} {p.date ? `· ${p.date}` : ""}
                        </span>
                        <span className="mt-1 block font-serif text-lg text-navy group-hover:text-gold">
                          {p.title}
                        </span>
                        <span className="mt-1 block text-sm text-navy/60">{p.summary}</span>
                      </a>
                    ) : (
                      <div>
                        <span className="block text-[10px] font-medium uppercase tracking-widest text-gold">
                          {p.publisher}
                        </span>
                        <span className="mt-1 block font-serif text-lg text-navy">{p.title}</span>
                        <span className="mt-1 block text-sm text-navy/60">{p.summary}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <section className="border-t border-navy/10 bg-white py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <SectionTitle>Press kit &amp; interviews</SectionTitle>
          <p className="mt-4 max-w-2xl text-navy/70">
            Journalists and organisers: headshots, bios, and booking information are on the{" "}
            <Link to="/press" className="underline underline-offset-4">
              press kit
            </Link>
            . The Clarity &amp; Reflection show launches with field readings and framework unpacks —
            announced here and on LinkedIn when the first episode drops.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
