import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Testimonials } from "@/components/site/Testimonials";
import { SITE, TESTIMONIALS, canonicalUrl, defaultOgImageMeta } from "@/lib/site-data";

const TITLE = "Book a $79 Clarity Session — Zeeshan Sabri";
const DESC =
  "A focused 90-minute diagnostic session: name the real blocker, test the decision, and leave with one sequenced next step.";

export const Route = createFileRoute("/book-a-session")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl("/book-a-session") },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      ...defaultOgImageMeta,
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/book-a-session") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Clarity Session",
          serviceType: "Executive advisory diagnostic",
          provider: { "@type": "Person", name: SITE.name, jobTitle: SITE.role },
          offers: {
            "@type": "Offer",
            price: "79",
            priceCurrency: "USD",
            url: SITE.bookSessionUrl,
            availability: "https://schema.org/InStock",
          },
        }),
      },
    ],
  }),
  component: BookSessionPage,
});

const INCLUDED = [
  "90 minutes, one live decision or blocker — not a discovery call.",
  "A pre-session intake so the time starts at diagnosis, not context-setting.",
  "The 8C read: which condition is actually failing underneath the symptom.",
  "One written next step you can act on without further engagement.",
];

const FOR_YOU_IF = [
  "A transformation, restructure, or system rollout is stalling and nobody agrees why.",
  "Decision rights are unclear and escalation has replaced ownership.",
  "You are about to fund a change the organisation may not be able to hold.",
];

function BookSessionPage() {
  return (
    <SiteLayout>
      <section className="section" aria-labelledby="bas-title">
        <div className="site-shell" style={{ maxWidth: "68rem" }}>
          <p className="eyebrow">ClarityOS Personal Session · $79</p>
          <h1 id="bas-title" className="font-serif text-4xl leading-[1.1] md:text-6xl">
            Book a $79 Clarity Session
          </h1>
          <p className="mt-4 font-serif text-2xl leading-snug">
            90 minutes. One blocker. One sequenced next step.
          </p>
          <p className="hero-summary mt-6 max-w-2xl">{DESC}</p>
          <div className="hero-actions mt-8">
            <a className="button button-copper" href={SITE.bookSessionUrl}>
              Pay $79 and book <ArrowRight aria-hidden="true" />
            </a>
            <Link className="text-link" to="/services">
              Compare all engagement paths
            </Link>
          </div>
          <nav className="mt-8 flex max-w-2xl flex-col gap-2 text-sm" aria-label="Related">
            <Link className="underline underline-offset-4" to="/clarityos">
              ClarityOS — The Pre-Governance Operating System
            </Link>
            <Link
              className="underline underline-offset-4"
              to="/frameworks/$slug"
              params={{ slug: "8c-crisis-to-clarity" }}
            >
              The 8C Crisis-to-Clarity Framework
            </Link>
            <Link className="underline underline-offset-4" to="/insights">
              Insights — The Clarity Dispatch
            </Link>
            <Link
              className="underline underline-offset-4"
              to="/insights/$slug"
              params={{ slug: "human-operating-system" }}
            >
              Zeeshan Sabri and the Human Operating System: Why Transformation Must Begin with
              Clarity
            </Link>
            <a className="underline underline-offset-4" href="/memoir/index.html">
              From Exile to Transformation
            </a>
          </nav>
          <p className="mt-4 max-w-2xl text-sm text-navy/55">
            After payment, send two times that work. I confirm the session the same day at{" "}
            <a className="underline underline-offset-4" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
            .{" "}
            <Link className="underline underline-offset-4" to="/book-a-session/thanks">
              Already paid? Send your times
            </Link>
            .
          </p>
          <div className="mt-10 max-w-2xl">
            <Testimonials items={[TESTIMONIALS[4]]} variant="single" />
          </div>
        </div>
      </section>

      <section className="section section-method" aria-labelledby="bas-included">
        <div className="site-shell grid gap-12 md:grid-cols-2" style={{ maxWidth: "68rem" }}>
          <div>
            <p className="eyebrow">What is included</p>
            <h2 id="bas-included" className="font-serif text-3xl">
              A diagnostic, not a sales conversation.
            </h2>
            <ul className="mt-6 space-y-4">
              {INCLUDED.map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed">
                  <Check className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Book this if</p>
            <h2 className="font-serif text-3xl">The cost of guessing is now higher than $79.</h2>
            <ul className="mt-6 space-y-4">
              {FOR_YOU_IF.map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed">
                  <Check className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="bas-what">
        <div className="site-shell" style={{ maxWidth: "46rem" }}>
          <p className="eyebrow">What the session is</p>
          <h2 id="bas-what" className="font-serif text-3xl">
            A ClarityOS diagnosis of one live decision.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed">
            <p>
              A Clarity Session is the personal path in ClarityOS: a focused 90-minute diagnostic
              on one live decision or blocker. A pre-session intake is part of what is included, so
              the time starts at diagnosis. The session is a diagnostic. It is the first
              conversation used to read the situation, separate from the enterprise enquiry path.
            </p>
            <p>
              ClarityOS is the Pre-Governance Operating System. It is an operating methodology and
              an engagement architecture. It sits underneath the systems an organisation already
              runs, including ERP, AI, and formal governance frameworks, and installs the shared
              clarity architecture those systems depend on. The pre-governance position is
              specific: decision clarity, readiness, capability, accountability, and correction
              have to exist before formal governance can work as intended. You cannot install a
              First World governance system on a broken human operating system. ClarityOS is the
              prerequisite, not the upgrade.
            </p>
            <p>
              The methodology is built on one principle: Stabilization Before Optimization.
              Organizations should not assume that adding sophisticated systems will improve
              performance when the underlying human operating environment is unstable.
              Stabilization asks whether there is a coherent operating frame before anyone tries
              to maximize performance: whether roles are understood, decision rights are explicit,
              escalation paths function, information is reliable, and priorities are interpreted
              the same way across teams. Only after those conditions exist does optimization become
              sustainable. A fast process with unclear ownership accelerates mistakes. A highly
              automated workflow automates flawed decisions. A dashboard can show a problem that
              nobody has authority to resolve.
            </p>
            <p>
              That is the read the session is for. It asks what the human layer can hold before
              the system is changed. In this methodology the Human OS is the behavioral, cognitive,
              relational, and governance layer through which people execute work: how they
              interpret risk, decide with incomplete information, communicate, exercise authority,
              escalate, and learn. It complements enterprise systems. The session applies that
              layer to the one situation you bring.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-method" aria-labelledby="bas-covers">
        <div className="site-shell" style={{ maxWidth: "46rem" }}>
          <p className="eyebrow">What a session covers</p>
          <h2 id="bas-covers" className="font-serif text-3xl">
            One blocker, read in the 8C sequence.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed">
            <p>
              The ninety minutes cover one live decision or blocker. The read uses the 8C
              Crisis-to-Clarity Framework, which treats transformation as a sequence: Clarity,
              Conditions, Control, Capability, Calibration, Correction, Continuity, and Coaching.
              The value of the framework is the order, not a menu of separate interventions.
            </p>
            <p>
              Clarity is one coherent frame the whole organisation can operate from. Conditions
              are the preconditions that decide whether change can hold. Control is decision
              rights, escalation, and ownership that stop the drift. Capability is the skill stack
              and support required to carry the mandate. Calibration is the feedback that surfaces
              misalignment before it becomes cost. Correction is the right to change course
              without losing operating rhythm. Continuity is governance that outlives the
              champion, the sponsor, or the crisis. Coaching is the human infrastructure that
              keeps leaders whole through change.
            </p>
            <p>
              Many programmes move straight to capability: tools, specialists, and redesigned
              process. The 8C sequence starts earlier. It asks whether the organisation has enough
              clarity and operating conditions for those investments to hold. In the session, the
              8C read names which condition is actually failing underneath the symptom. You leave
              with one written next step you can act on without further engagement. Enterprise
              work, board advisory, and speaking stay on the separate enquiry path.
            </p>
            <p>
              ClarityOS works in three moves, and the session is the first of them. Diagnose the
              real blocker: where decisions, ownership, leadership alignment, or human stability
              are breaking the transformation, before more tools are added. Install the clarity
              layer: the decision architecture, language, and structural clarity people need in
              order to operate from one frame. Align execution and governance: ownership,
              sequencing, and operating rhythm. The session is the diagnosis: one written next
              step you can act on without further engagement.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="bas-who">
        <div className="site-shell" style={{ maxWidth: "46rem" }}>
          <p className="eyebrow">Who it is for</p>
          <h2 id="bas-who" className="font-serif text-3xl">
            Founders, executives, and operators with one unresolved decision.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed">
            <p>
              The personal session is for founders, executives, and operators who need a sharper
              read on one decision. Book it when a transformation, restructure, or system rollout
              is stalling and nobody agrees why. Book it when decision rights are unclear and
              escalation has replaced ownership. Book it when you are about to fund a change the
              organisation may not be able to hold.
            </p>
            <p>
              The same situations show up in three shapes already described for ClarityOS.
              Founders and executives come when decisions keep recurring, priorities keep shifting,
              and scale is outrunning clarity. Leadership teams come when alignment is weak,
              ownership is muddy, and transformation depends on too few people carrying too much.
              Organisations under change come when ERP, AI, governance, or an operating redesign
              is underway and the human layer underneath is unstable. In each case the session
              stays on one blocker.
            </p>
            <p>
              Optimization assumes a stable enough operating structure to absorb the improvement.
              If roles, decision rights, communication channels, or escalation are unclear,
              optimization makes existing problems faster and larger. Stabilization establishes
              clarity, ownership, and alignment first. The session is where that question is asked
              against a real decision, before a larger engagement is scoped. Every engagement path
              on this site starts with a clarity diagnosis. This is that diagnosis, held to ninety
              minutes and one written next step.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-method" aria-labelledby="bas-faq">
        <div className="site-shell" style={{ maxWidth: "46rem" }}>
          <p className="eyebrow">Questions</p>
          <h2 id="bas-faq" className="font-serif text-3xl">
            ClarityOS and the session, in short.
          </h2>
          <div className="mt-8 space-y-8">
            <div>
              <h3 className="font-serif text-xl">What is ClarityOS?</h3>
              <p className="mt-2 leading-relaxed">
                A pre-governance operating methodology created by Zeeshan Sabri, built on
                Stabilization Before Optimization. Its purpose is to establish clarity, operating
                alignment, decision discipline, and governance conditions before an organisation
                deploys complex systems or scales structural change. It focuses on the human
                operating environment around transformation rather than treating technology as the
                complete solution.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl">Why call it pre-governance?</h3>
              <p className="mt-2 leading-relaxed">
                Decision clarity, readiness, capability, accountability, and correction must exist
                before formal governance can work as intended.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl">Is ClarityOS a software product?</h3>
              <p className="mt-2 leading-relaxed">
                No. It is an operating methodology and engagement architecture, not a software
                platform.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl">Why stabilize before optimizing?</h3>
              <p className="mt-2 leading-relaxed">
                Optimization assumes the organisation has a stable enough operating structure to
                absorb the improvement. If roles, decision rights, communication channels, or
                escalation mechanisms are unclear, optimization makes existing problems faster and
                larger. Stabilization establishes clarity, ownership, and behavioral alignment
                first.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl">What does the session include?</h3>
              <p className="mt-2 leading-relaxed">
                Ninety minutes on one live decision or blocker, a pre-session intake, the 8C read
                of which condition is failing underneath the symptom, and one written next step
                you can act on without further engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="closing-section" aria-labelledby="bas-closing">
        <div className="site-shell closing-grid">
          <p className="section-index on-dark">Begin with clarity</p>
          <div>
            <h2 id="bas-closing">
              Diagnose what the human layer can hold before you change the system.
            </h2>
            <div className="closing-actions">
              <a className="button button-copper" href={SITE.bookSessionUrl}>
                Book a $79 Clarity Session <ArrowRight aria-hidden="true" />
              </a>
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
