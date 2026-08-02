import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Eyebrow } from "@/components/site/SiteLayout";
import {
  SITE,
  canonicalUrl,
  PRESS_ITEMS,
  RECOGNITION,
  RECOGNITION_LUMS,
  WORKSHOP_LEDGER,
  WORKSHOP_STATS,
  METRICS,
} from "@/lib/site-data";
import { EnquiryForm } from "@/components/site/EnquiryForm";

const TITLE = "Press Kit — Zeeshan Sabri, Crisis-to-Clarity Architect";
const DESC =
  "Media resources for journalists and event organisers: verified biography, credentials, delivered workshop ledger, award coverage, and direct contact.";

const SHORT_BIO =
  "Zeeshan Sabri is a Crisis-to-Clarity Architect working with founders, executives, and leadership teams across the GCC and South Asia. He is the creator of ClarityOS, a methodology for diagnosing the human layer beneath failed transformation, and the author of the 8C Crisis-to-Clarity Framework.";

const LONG_BIO =
  "Zeeshan Sabri has spent his career at the intersection of enterprise procurement, transformation programmes, and leadership development — at Huawei, Motorola, and across public-sector and startup ecosystems in Oman, Qatar, Saudi Arabia, Kuwait, and Pakistan. His work argues that transformation programmes fail not on their technical design but on the human operating system underneath them: unclear decision rights, unowned authority, and governance that formally exists but no longer binds. ClarityOS is his response — a set of sixteen diagnostic frameworks for naming the real blocker before designing the change. He was awarded the Entrepreneurial Excellence Award at the Founders 2.0 Conference in Dubai in December 2025, and is a Chartered MCIPS professional.";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: canonicalUrl("/press") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/press") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: SITE.name,
          jobTitle: SITE.role,
          description: SHORT_BIO,
          email: `mailto:${SITE.email}`,
          url: canonicalUrl("/"),
          sameAs: [SITE.socials.linkedin],
          award: SITE.award.title,
          knowsAbout: [
            "Organizational development",
            "Crisis management",
            "Executive advisory",
            "Business continuity",
            "Procurement and governance",
          ],
        }),
      },
    ],
  }),
  component: PressPage,
});

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-24 border-t border-navy/10 pt-10">
      <h2 className="font-serif text-3xl text-navy">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function PressPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-4xl px-6 pt-24 pb-32 lg:px-8 lg:pt-32">
        <Eyebrow>Press &amp; media</Eyebrow>
        <h1 className="font-serif text-4xl leading-[1.1] text-navy md:text-6xl">Press Kit</h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-navy/70">
          Everything a journalist, editor, or event organiser needs in one place. All
          facts on this page are verified and may be quoted directly without prior
          approval.
        </p>

        <Section title="Biography">
          <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
            Short — 50 words
          </div>
          <p className="mt-3 leading-relaxed text-navy/80">{SHORT_BIO}</p>
          <div className="mt-10 text-[10px] font-medium uppercase tracking-widest text-gold">
            Long — 150 words
          </div>
          <p className="mt-3 leading-relaxed text-navy/80">{LONG_BIO}</p>
          <dl className="mt-10 grid gap-x-8 gap-y-4 border-t border-navy/10 pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-widest text-navy/40">
                Name
              </dt>
              <dd className="mt-1 text-navy">{SITE.name}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-widest text-navy/40">
                Title
              </dt>
              <dd className="mt-1 text-navy">{SITE.role}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-widest text-navy/40">
                Methodology
              </dt>
              <dd className="mt-1 text-navy">ClarityOS</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-widest text-navy/40">
                Based in
              </dt>
              <dd className="mt-1 text-navy">Muscat, Oman · works across the GCC</dd>
            </div>
          </dl>
        </Section>

        <Section title="Facts and figures">
          <div className="grid gap-8 sm:grid-cols-3">
            {[...WORKSHOP_STATS, ...METRICS].slice(0, 6).map((m) => (
              <div key={m.label} className="border-t border-navy/10 pt-4">
                <div className="font-serif text-4xl text-navy">{m.value}</div>
                <div className="mt-2 text-sm text-navy/60">{m.label}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Coverage">
          <ul className="space-y-6">
            {PRESS_ITEMS.map((p) => (
              <li key={p.title} className="flex gap-6 border-t border-navy/10 pt-6">
                {p.cover && (
                  <img
                    src={p.cover}
                    alt={`Cover of ${p.title}`}
                    loading="lazy"
                    className="hidden h-28 w-auto border border-navy/10 object-cover sm:block"
                  />
                )}
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-widest text-navy/40">
                    {p.outlet} · {p.date}
                  </div>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block font-serif text-xl leading-snug text-navy hover:text-gold"
                  >
                    {p.title}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Recognition">
          <div className="border-l-2 border-gold pl-6">
            <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
              {SITE.award.date} · {SITE.award.location}
            </div>
            <h3 className="mt-2 font-serif text-2xl text-navy">{SITE.award.title}</h3>
            <a
              href={SITE.award.pressUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-sm text-navy/60 underline hover:text-gold"
            >
              Read the announcement
            </a>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <figure>
              <img
                src={RECOGNITION_LUMS.src}
                alt={RECOGNITION_LUMS.title}
                loading="lazy"
                className="w-full border border-navy/10 object-cover"
              />
              <figcaption className="mt-3 text-sm text-navy/60">
                {RECOGNITION_LUMS.note}
              </figcaption>
            </figure>
            {RECOGNITION.slice(0, 1).map((r) => (
              <figure key={r.src}>
                <img
                  src={r.src}
                  alt={r.title}
                  loading="lazy"
                  className="w-full border border-navy/10 object-cover"
                />
                <figcaption className="mt-3 text-sm text-navy/60">{r.note}</figcaption>

              </figure>
            ))}
          </div>
        </Section>

        <Section title="Speaking history">
          <p className="max-w-2xl text-navy/70">
            Delivered engagements only. Every entry below has a flyer, banner, or host
            record on file and can be verified with the host organisation.
          </p>
          <ul className="mt-8 space-y-6">
            {WORKSHOP_LEDGER.map((w) => (
              <li key={w.title} className="border-t border-navy/10 pt-6">
                <div className="text-[10px] font-medium uppercase tracking-widest text-navy/40">
                  {w.date} · {w.format}
                </div>
                <h3 className="mt-2 font-serif text-xl leading-snug text-navy">{w.title}</h3>
                <div className="mt-1 text-sm text-navy/60">
                  {w.host} — {w.venue}
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Interview topics">
          <ul className="space-y-4">
            {[
              "The Continuity Gap: why organisations handle their second crisis worse than their first.",
              "Why GCC transformation programmes fail on the human layer, not the technical design.",
              "What founders get wrong about validating their own assumptions before scaling.",
              "Procurement as an accelerator rather than a control function.",
              "Leading when the ground moves: resilience, displacement, and identity at work.",
            ].map((t) => (
              <li key={t} className="flex items-baseline gap-4 border-t border-navy/10 pt-4">
                <span className="font-mono text-xs text-gold">—</span>
                <span className="text-navy/80">{t}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Media enquiries">
          <p className="max-w-2xl text-navy/70">
            For interviews, quotes, panel invitations, or high-resolution photography,
            send the outlet, deadline, and topic. Responses typically within one working
            day.
          </p>
          <div className="mt-8 max-w-xl">
            <EnquiryForm
              enquiryType="Media enquiry"
              triggerLabel="Send a media enquiry"
              heading="Media enquiry"
              messagePlaceholder="Outlet, deadline, and what you need."
            />

          </div>
        </Section>

        <div className="mt-24 flex flex-wrap gap-x-8 gap-y-3 border-t border-navy/10 pt-8 text-sm">
          <Link to="/the-architect" className="text-navy/60 hover:text-gold">
            Full background
          </Link>
          <Link to="/media" className="text-navy/60 hover:text-gold">
            Film and photography
          </Link>
          <Link to="/frameworks" className="text-navy/60 hover:text-gold">
            The framework library
          </Link>
          <Link to="/connect" className="text-navy/60 hover:text-gold">
            Advisory enquiries
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
