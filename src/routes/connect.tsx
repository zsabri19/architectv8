import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import { SiteLayout, Eyebrow } from "@/components/site/SiteLayout";
import { Testimonials } from "@/components/site/Testimonials";
import { SITE, TESTIMONIALS, canonicalUrl } from "@/lib/site-data";
import portraitAsset from "@/assets/portrait-3.jpg.asset.json";

export const Route = createFileRoute("/connect")({
  head: () => ({
    meta: [
      { title: "Connect — Book $79 or start an enterprise enquiry · Zeeshan Sabri" },
      {
        name: "description",
        content:
          "Two lanes: book a $79 Clarity Session now, or send an enterprise, advisory, or speaking enquiry. Response within 48 hours.",
      },
      { property: "og:title", content: "Connect — ClarityOS" },
      { property: "og:description", content: "Book the $79 session or start an enterprise enquiry." },
      { property: "og:url", content: canonicalUrl("/connect") },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/connect") }],
  }),
  component: ConnectPage,
});

function ConnectPage() {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-10 lg:px-8">
        <Eyebrow>Connect</Eyebrow>
        <h1 className="font-serif text-4xl leading-[1.1] text-navy md:text-6xl">
          Two lanes. Pick the one that fits.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-navy/70">
          The paid session and the enterprise path stay separate by design. Choose yours and move.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative flex flex-col border-2 border-gold bg-white p-8 lg:p-10">
            <span className="absolute -top-3 left-8 bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy">
              Fastest path
            </span>
            <p className="text-[10px] font-medium uppercase tracking-widest text-gold">Lane 1 · Personal</p>
            <h2 className="mt-3 font-serif text-3xl text-navy">The $79 Clarity Session</h2>
            <p className="mt-4 flex-1 text-navy/70">
              90 minutes. One real blocker diagnosed. One sequenced next step. Book directly — no
              proposal cycle.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-navy/80">
              {[
                "90 minutes, one live decision or blocker",
                "Direct read on decisions, ownership, and alignment",
                "Clear next step before you leave the call",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {line}
                </li>
              ))}
            </ul>
            <Link
              to="/book-a-session"
              className="mt-8 inline-flex w-full items-center justify-center bg-navy py-4 text-xs font-bold uppercase tracking-widest text-paper hover:bg-gold hover:text-navy"
            >
              Book the $79 session
            </Link>
          </div>

          <div className="flex flex-col border border-navy/15 bg-white p-8 lg:p-10">
            <p className="text-[10px] font-medium uppercase tracking-widest text-navy/50">
              Lane 2 · Enterprise and Advisory
            </p>
            <h2 className="mt-3 font-serif text-3xl text-navy">Enterprise discovery enquiry</h2>
            <p className="mt-4 text-navy/70">
              For ClarityOS 90-day work, board advisory, speaking, or partnership. Outline the
              context. Initial response within 48 hours; a scoped proposal within 5 business days.
            </p>
            <div className="mt-8 overflow-hidden bg-navy">
              <img
                src={portraitAsset.url}
                alt="Zeeshan Sabri"
                className="h-48 w-full object-cover object-top"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-navy/10 bg-paper-soft py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <p className="text-[10px] font-medium uppercase tracking-widest text-gold">Lane 2 form</p>
          <h2 className="mt-3 font-serif text-3xl text-navy">Send the enterprise enquiry</h2>
          <p className="mt-3 text-sm text-navy/60">
            Prefer email?{" "}
            <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
              {SITE.email}
            </a>
            . Not sure yet? Review{" "}
            <Link to="/services" className="underline underline-offset-4">
              engagement tiers
            </Link>{" "}
            or{" "}
            <Link to="/clarityos" className="underline underline-offset-4">
              ClarityOS
            </Link>
            .
          </p>
          <div className="mt-8">
            <Testimonials items={[TESTIMONIALS[0]]} variant="single" />
          </div>
          {submitted ? (
            <div className="mt-10 border border-green-500 bg-white p-10 text-center">
              <h2 className="font-serif text-3xl text-navy">Enquiry received.</h2>
              <p className="mt-4 text-navy/70">
                I reply personally, usually within 48 hours. For time-sensitive matters, email{" "}
                <a href={`mailto:${SITE.email}`} className="text-gold">
                  {SITE.email}
                </a>
                .
              </p>
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = Object.fromEntries(formData);
                setStatus("submitting");

                try {
                  const response = await fetch("https://formspree.io/f/mbdnegwo", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                    },
                    body: JSON.stringify(data),
                  });

                  if (response.ok) {
                    setStatus("idle");
                    setSubmitted(true);
                  } else {
                    setStatus("error");
                  }
                } catch {
                  setStatus("error");
                }
              }}
              className="mt-10 space-y-6 border border-navy/10 bg-white p-8 lg:p-10"
            >
              <input type="hidden" name="enquiry_type" value="enterprise" />
              <Field label="Name" name="name" required />
              <Field label="Organisation" name="org" required />
              <Field label="Email" name="email" type="email" required />
              <div>
                <label
                  htmlFor="field-engagement"
                  className="block text-[10px] font-medium uppercase tracking-widest text-navy/70"
                >
                  Engagement type
                </label>
                <select
                  id="field-engagement"
                  name="engagement"
                  className="mt-2 w-full border border-navy/20 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
                >
                  <option>ClarityOS Enterprise 90-Day</option>
                  <option>Board Advisory</option>
                  <option>Keynote / Speaking</option>
                  <option>AI Training / Certification</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="field-message"
                  className="block text-[10px] font-medium uppercase tracking-widest text-navy/70"
                >
                  What is the real blocker? <span className="text-gold">*</span>
                </label>
                <textarea
                  id="field-message"
                  name="message"
                  required
                  rows={4}
                  className="mt-2 w-full border border-navy/20 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
                  placeholder="What decision or situation brought you here?"
                />
              </div>
              {status === "error" && (
                <p className="text-sm text-destructive">
                  That didn&apos;t send. Please try again, or email {SITE.email} directly.
                </p>
              )}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex w-full items-center justify-center gap-2 bg-navy py-4 text-xs font-bold uppercase tracking-widest text-paper transition-colors duration-200 hover:bg-gold hover:text-navy disabled:cursor-not-allowed disabled:bg-gold disabled:text-navy"
              >
                {status === "submitting" && (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                )}
                {status === "submitting" ? "Sending" : "Send enquiry"}
              </button>

              <p className="text-center text-xs text-navy/50">
                By sending this, you agree that we may reply by email.
              </p>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const id = `field-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] font-medium uppercase tracking-widest text-navy/70"
      >
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        className="mt-2 w-full border border-navy/20 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
      />
    </div>
  );
}
