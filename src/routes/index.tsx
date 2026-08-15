import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { Testimonials } from "@/components/site/Testimonials";
import {
  SITE,
  LOGOS_INSTITUTIONS,
  LOGOS_VENTURES,
  METRICS,
  TESTIMONIALS,
  CASE_STUDIES,
  FRAMEWORKS,
  SERVICES,
  ARTICLES,
  BOOK_PARTS,
  canonicalUrl,
} from "@/lib/site-data";
import { FILM_HERO, WORKSHOP_STATS } from "@/lib/site-data";
import { VideoPanel } from "@/components/site/VideoPanel";
import { EnquiryForm } from "@/components/site/EnquiryForm";

import { BOOK_ROADMAP } from "@/lib/v4-content";
import heroAsset from "@/assets/hero.jpg.asset.json";
import coverAsset from "@/assets/cover.png.asset.json";
import frameworkCompass from "@/assets/framework-8c.jpg.asset.json";
import talkStage from "@/assets/talk-stage.jpg.asset.json";
import fieldOshFounders from "@/assets/field-osh-founders.jpg.asset.json";

const HERO_OG = `https://${SITE.domain}${heroAsset.url}`;

const EIGHT_C = [
  { number: "C1", name: "Clarity", line: "One coherent frame the whole organisation can operate from." },
  { number: "C2", name: "Conditions", line: "The preconditions that decide whether change can hold." },
  { number: "C3", name: "Control", line: "Decision rights, escalation, and ownership that stop the drift." },
  { number: "C4", name: "Capability", line: "The skill stack and support required to carry the mandate." },
  { number: "C5", name: "Calibration", line: "Feedback loops that surface misalignment before it becomes cost." },
  { number: "C6", name: "Correction", line: "The right to change course without losing operating rhythm." },
  { number: "C7", name: "Continuity", line: "Governance that outlives the champion, sponsor, or crisis." },
  { number: "C8", name: "Coaching", line: "The human infrastructure that keeps leaders whole through change." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zeeshan Sabri — Crisis-to-Clarity Architect · ClarityOS" },
      {
        name: "description",
        content:
          "ClarityOS installs the Human OS before the System OS — diagnosing the real blocker and aligning decisions, ownership, and operating rhythm.",
      },
      { property: "og:title", content: "Zeeshan Sabri — ClarityOS" },
      {
        property: "og:description",
        content: "The Human OS before the System OS. ClarityOS by Zeeshan Sabri.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl("/") },
      { property: "og:image", content: HERO_OG },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Zeeshan Sabri — ClarityOS" },
      {
        name: "twitter:description",
        content: "The Human OS before the System OS. ClarityOS by Zeeshan Sabri.",
      },
      { name: "twitter:image", content: HERO_OG },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/") }],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = FRAMEWORKS.slice(0, 4);
  const insights = ARTICLES.slice(0, 5);

  return (
    <SiteLayout>
      {/* @section: homepage-hero */}
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="site-shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">ClarityOS · Pre-Governance Operating System</p>
            <h1 id="hero-title">{SITE.heroH1}</h1>
            <p className="hero-tagline">{SITE.tagline}</p>
            <p className="hero-summary">{SITE.heroSub}</p>
            <div className="hero-actions" aria-label="Primary actions">
              <Link className="button button-primary" to="/book-a-session">
                Book a $79 Clarity Session <ArrowRight aria-hidden="true" />
              </Link>
              <Link className="button button-quiet" to="/clarityos">
                Explore ClarityOS
              </Link>
            </div>
            <div className="hero-social-proof">
              <span>Programmes delivered with</span>
              <span className="hero-proof-clients">Huawei · Motorola · NCMS · NASTP</span>
            </div>
            <a className="hero-scroll" href="#premise">
              <ArrowDown aria-hidden="true" /> Read the premise
            </a>
          </div>

          <figure className="hero-portrait">
            <div className="portrait-frame">
              <img
                src={heroAsset.url}
                alt="Zeeshan Sabri, Crisis-to-Clarity Architect and founder of ClarityOS"
                loading="eager"
              />
              <span className="portrait-index" aria-hidden="true">
                01 / Architect
              </span>
            </div>
            <figcaption>
              <span>Zeeshan Sabri</span>
              <span>Crisis-to-Clarity Architect</span>
            </figcaption>
          </figure>
        </div>

        {/* Single featured quote with source citation — replaces the duplicate QuoteRotator */}
        <section className="quote-strip-section" aria-labelledby="quotes-title">
          <div className="site-shell">
            <blockquote className="featured-quote text-center">
              <span className="quote-rotator-mark" aria-hidden="true">“</span>
              <p className="featured-quote-text">
                Techniques fail when foundations are weak. Tools disappoint when discipline is missing.
              </p>
              <footer className="featured-quote-source">
                Beyond Techniques Series · The Investment Paradox
              </footer>
            </blockquote>
          </div>
        </section>
      </section>

      {/* @section: social-proof — moved up for immediate credibility */}
      <Testimonials
        items={TESTIMONIALS.slice(0, 3)}
        eyebrow="In their words"
        heading="Proof, from the rooms and the relationships."
      />

      {/* @section: film-band */}
      <section className="film-band" aria-labelledby="film-title">
        <div className="site-shell film-grid">
          <VideoPanel item={FILM_HERO} />
          <div className="film-copy">
            <p className="section-index on-dark">00 · In his words</p>
            <p className="eyebrow on-dark">Field interview · Muscat, Oman</p>
            <h2 id="film-title">What you can’t predict is what you have to be able to hold.</h2>
            <p>
              Recorded straight after the founders’ session at Oman Startup Hub: why digital drift
              breaks scaling teams, and what has to be true in the human layer before any system
              upgrade can survive contact with reality.
            </p>
            <div className="hero-actions">
              <Link className="button button-light" to="/media">
                See the full film archive <ArrowRight aria-hidden="true" />
              </Link>
              <Link className="text-link on-dark" to="/book-a-session">
                Book a $79 Clarity Session
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* @section: workshop-ledger */}
      <section className="workshop-band" aria-labelledby="workshop-title">
        <div className="site-shell">
          <p className="eyebrow">Workshops & talks</p>
          <h2 id="workshop-title" className="mt-2 font-serif text-3xl leading-tight md:text-4xl">
            Rooms already run — Muscat, Doha, Riyadh, Lahore.
          </h2>
          <p className="mt-3 max-w-2xl text-sm">
            A rolling record of delivered founder workshops, executive programmes, and conference
            keynotes. Private cohorts and in-house programmes are booked directly.
          </p>
          <dl className="workshop-stats">
            {WORKSHOP_STATS.map((s) => (
              <div key={s.label}>
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
          <Link className="text-link mt-6 inline-flex items-center gap-2" to="/media">
            See the full delivered ledger <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="site-shell mt-8">
          <EnquiryForm
            enquiryType="Workshop"
            triggerLabel="Bring a workshop to your team"
            heading="Bring a workshop to your team"
            messagePlaceholder="Which team, how many people, and what needs to shift?"
            variant="outline"
          />
        </div>

      </section>



      {/* @section: homepage-premise */}
      <section id="premise" className="premise-section">
        <div className="site-shell premise-grid">
          <p className="section-index on-dark">01 · The premise</p>
          <div>
            <p className="eyebrow on-dark">ClarityOS is the prerequisite, not the upgrade.</p>
            <h2>Systems do not fail in isolation.</h2>
            <p className="premise-lead">
              When decision authority is unclear, readiness trails ambition, and governance arrives
              before capacity, transformation becomes an installation exercise instead of an
              institutional capability.
            </p>
            <div className="premise-actions">
              <Link className="text-link on-dark" to="/clarityos">
                Understand the methodology <ArrowRight aria-hidden="true" />
              </Link>
              <Link
                className="text-link on-dark"
                to="/insights/$slug"
                params={{ slug: "the-investment-paradox" }}
              >
                Read the Investment Paradox <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* @section: eight-c-method */}
      <section className="section section-method" aria-labelledby="method-title">
        <div className="site-shell">
          <div className="section-heading split-heading">
            <div>
              <p className="section-index">02 · The operating methodology</p>
              <p className="eyebrow">8C Crisis-to-Clarity Framework</p>
            </div>
            <div>
              <h2 id="method-title">
                Eight conditions for moving from crisis to governed clarity.
              </h2>
              <p>
                ClarityOS organises the human layer into an eight-part diagnostic and operating
                sequence. The components stay connected: no isolated technique can carry the system
                alone.
              </p>
            </div>
          </div>

          <ol className="method-grid">
            {EIGHT_C.map((c) => (
              <li key={c.name} className="method-item">
                <span className="method-number">{c.number}</span>
                <h3>{c.name}</h3>
                <p>{c.line}</p>
              </li>
            ))}
          </ol>

          <div className="method-visual-grid">
            <figure className="method-image">
              <img src={frameworkCompass.url} alt="The 8C Crisis-to-Clarity Framework diagram" loading="lazy" />
              <figcaption>The 8C sequence — ClarityOS internal operating model.</figcaption>
            </figure>
            <div className="method-note">
              <p className="eyebrow">Proprietary positioning</p>
              <blockquote>
                “You cannot install a First World governance system on a broken human operating
                system.”
              </blockquote>
              <p>
                The claim is presented as Zeeshan Sabri’s point of view — not as a universal
                statistical assertion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* @section: proof */}
      <section className="profile-download-section">
        <div className="site-shell">
          <p className="eyebrow">Evidence, not decoration</p>
          <div className="proof-grid">
            {METRICS.map((m) => (
              <article key={m.label}>
                <strong>{m.value}</strong>
                <p>{m.label}</p>
              </article>
            ))}
          </div>
          <div className="credential-note">
            <p>Institutions and programmes engaged:</p>
            <LogoMarquee logos={LOGOS_INSTITUTIONS} label="Institutions engaged" speed={38} />
            <p className="mt-8">Ventures and programmes built or advised:</p>
            <LogoMarquee logos={LOGOS_VENTURES} label="Ventures and programmes" speed={52} />
          </div>
        </div>
      </section>

      {/* @section: case-studies */}
      <section className="section case-study-section" aria-labelledby="case-studies-title">
        <div className="site-shell">
          <div className="section-heading">
            <p className="eyebrow">Case Studies</p>
            <h2 id="case-studies-title">Delivered outcomes, not just promises.</h2>
          </div>
          <div className="case-study-grid">
            {CASE_STUDIES.map((cs) => (
              <article key={cs.client} className="case-study-card">
                <p className="case-study-client">{cs.client}</p>
                <p className="case-study-sector">{cs.sector}</p>
                <p className="case-study-challenge">{cs.challenge}</p>
                <p className="case-study-outcome">{cs.outcome}</p>
                {cs.metric && <p className="case-study-metric">{cs.metric}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* @section: memoir-anchor */}
      <section className="section book-section" aria-labelledby="book-title">
        <div className="site-shell book-grid">
          <div className="book-art-wrap">
            <div className="book-art-field" aria-hidden="true" />
            <img
              className="book-cover"
              src={coverAsset.url}
              alt="Cover of From Exile to Transformation: A Memoir Beyond Techniques"
              loading="lazy"
            />
            <span className="book-status">Forthcoming</span>
          </div>

          <div className="book-copy">
            <p className="section-index">03 · The narrative anchor</p>
            <p className="eyebrow">From Exile to Transformation</p>
            <h2 id="book-title">A memoir beyond techniques.</h2>
            <p className="book-deck">
              The book connects lived resilience, Fortune 500 foundations, GCC institution-building,
              and the creation of ClarityOS. Its six parts become the platform’s editorial and
              search architecture.
            </p>
            <ol className="book-parts">
              {BOOK_PARTS.map((part) => (
                <li key={part.title}>
                  <span>{part.number}</span>
                  <strong>{part.title}</strong>
                </li>
              ))}
            </ol>
            <div className="book-actions">
              <Link className="button button-primary" to="/book">
                Enter the book platform <ArrowRight aria-hidden="true" />
              </Link>
              <Link className="text-link" to="/newsletter">
                Join the early interest list
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* @section: framework-library */}
      <section className="section framework-section" aria-labelledby="framework-title">
        <div className="site-shell">
          <div className="section-heading framework-heading">
            <div>
              <p className="section-index">04 · The framework library</p>
              <p className="eyebrow">Intellectual property made useful</p>
            </div>
            <div>
              <h2 id="framework-title">One methodology. Sixteen supporting pillars.</h2>
              <p>
                Each framework owns a distinct search intent, practical tool, related chapter, and
                next-step path. These four are the homepage entry points.
              </p>
            </div>
            <Link className="text-link framework-all" to="/frameworks">
              View all frameworks <ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="framework-list">
            {featured.map((f) => (
              <Link
                className="framework-row"
                key={f.slug}
                to="/frameworks/$slug"
                params={{ slug: f.slug }}
              >
                <span className="framework-index">
                  {String(f.number).padStart(2, "0")}
                </span>
                <h3>{f.title}</h3>
                <p>{f.summary}</p>
                <span className="framework-bridge">{f.eyebrow}</span>
                <ArrowRight className="framework-arrow" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* @section: engagement-roadmap */}
      <section className="section roadmap-section" aria-labelledby="roadmap-title">
        <div className="site-shell roadmap-grid">
          <div className="roadmap-intro">
            <p className="section-index on-dark">05 · From method to engagement</p>
            <p className="eyebrow on-dark">ClarityOS Engagement Roadmap</p>
            <h2 id="roadmap-title">Four stages, sequenced by what the system can hold.</h2>
            <p>
              Engagements move from stabilising the human layer to embedding governance, AI, and
              legacy into one coherent operating system.
            </p>
          </div>
          <ol className="roadmap-list">
            {BOOK_ROADMAP.map((stage, i) => (
              <li key={stage.phase}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{stage.phase}</h3>
                  <p>{stage.goal}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* @section: founder-origin */}
      <section className="section origin-section" aria-labelledby="origin-title">
        <div className="site-shell origin-grid">
          <figure className="origin-image">
            <img
              src={talkStage.url}
              alt="Zeeshan Sabri delivering a keynote on transformation"
              loading="lazy"
            />
            <figcaption>From keynote stage to boardroom — the method in motion.</figcaption>
          </figure>
          <div className="origin-copy">
            <p className="section-index">06 · The architect</p>
            <p className="eyebrow">Lived experience before language</p>
            <h2 id="origin-title">The method began before it had a name.</h2>
            <p className="origin-lead">
              Kuwait exile shaped the first questions. Fortune 500 environments supplied operating
              discipline. GCC institution-building exposed the gap between installed systems and the
              human conditions required to hold them.
            </p>
            <div className="origin-timeline" aria-label="Founder narrative sequence">
              <span>Kuwait exile</span>
              <span>Fortune 500 foundations</span>
              <span>GCC institution-building</span>
              <span>ClarityOS</span>
            </div>
            <Link className="button button-outline" to="/the-architect">
              Meet the architect <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* @section: service-paths */}
      <section className="section services-section" aria-labelledby="services-title">
        <div className="site-shell">
          <div className="section-heading services-heading">
            <div>
              <p className="section-index">07 · Ways to engage</p>
              <p className="eyebrow">Choose by consequence, not package size</p>
            </div>
            <div>
              <h2 id="services-title">
                From a focused decision to institutional transformation.
              </h2>
              <p>
                Three clear entry points keep the commercial path legible without flattening every
                need into the same offer.
              </p>
            </div>
          </div>

          <div className="service-grid">
            {SERVICES.map((s, index) => (
              <article className={`service-card service-card-${index + 1}`} key={s.slug}>
                <p className="service-label">{s.tier}</p>
                <h3>{s.title}</h3>
                <p className="service-meta">
                  {s.price} · {s.cadence}
                </p>
                <p>{s.description}</p>
                {s.cta.href.startsWith("http") ? (
                  <a className="text-link" href={s.cta.href}>
                    {s.cta.label} <ArrowRight aria-hidden="true" />
                  </a>
                ) : (
                  <Link className="text-link" to={s.cta.href}>
                    {s.cta.label} <ArrowRight aria-hidden="true" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* @section: speaking-proof */}
      <section className="media-band" aria-labelledby="media-title">
        <div className="site-shell media-grid">
          <figure className="media-image">
            <img
              src={fieldOshFounders.url}
              alt="Founders session at Oman Startup Hub — Zeeshan Sabri facilitating"
              loading="lazy"
            />
          </figure>
          <div className="media-copy">
            <p className="section-index on-dark">08 · In the field</p>
            <p className="eyebrow on-dark">Speaking, counsel, facilitation</p>
            <h2 id="media-title">Ideas designed to hold in the room.</h2>
            <p>
              Keynotes, workshops, and board sessions across Kuwait, Oman, Qatar, Saudi Arabia, the
              UAE, and Pakistan — verified appearances only.
            </p>
            <Link className="button button-light" to="/media">
              Explore verified media <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* @section: launch-insights */}
      <section className="section insights-section" aria-labelledby="insights-title">
        <div className="site-shell insights-grid">
          <div className="insights-intro">
            <p className="section-index">09 · Current thinking</p>
            <p className="eyebrow">The Clarity Dispatch</p>
            <h2 id="insights-title">One pattern. One decision. One next step.</h2>
            <p>
              Editorial work connects a live question to one framework, one useful tool, and one
              proportionate way to engage.
            </p>
            <Link className="button button-outline" to="/newsletter">
              Enter The Clarity Dispatch <ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="insight-list">
            {insights.map((a) => (
              <Link
                className="insight-row"
                key={a.slug}
                to="/insights/$slug"
                params={{ slug: a.slug }}
              >
                <span>{a.number}</span>
                <div>
                  <p>{a.category}</p>
                  <h3>{a.title}</h3>
                </div>
                <ArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* @section: closing-conversion */}
      <section className="closing-section" aria-labelledby="closing-title">
        <div className="site-shell closing-grid">
          <p className="section-index on-dark">10 · Begin with clarity</p>
          <div>
            <h2 id="closing-title">
              Before changing the system, diagnose what the human layer can hold.
            </h2>
            <div className="closing-actions">
              <Link className="button button-copper" to="/book-a-session">
                Book a $79 Clarity Session <ArrowRight aria-hidden="true" />
              </Link>
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
