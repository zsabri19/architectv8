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
      { title: "Connect — Enterprise, Advisory, Speaking · Zeeshan Sabri" },
      {
        name: "description",
        content:
          "Enterprise ClarityOS engagements, board advisory, and keynote enquiries. Initial response within 48 hours; tailored proposal within 5 business days.",
      },
      { property: "og:title", content: "Connect — ClarityOS" },
      { property: "og:description", content: "Enterprise, advisory, and speaking enquiries." },
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
      
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="lg:col-span-8">
          <Eyebrow>Connect</Eyebrow>
          <h1 className="font-serif text-4xl leading-[1.1] text-navy md:text-6xl">
            Start with a direct conversation.
          </h1>
          <p className="mt-6 text-lg text-navy/70">
            For enterprise engagements, board advisory, and speaking. Initial response within 48
            hours; tailored proposal within 5 business days.
          </p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-navy/60">
            <a href={`mailto:${SITE.email}`} className="hover:text-navy">{SITE.email}</a>
            <a href={SITE.bookSessionUrl} className="hover:text-navy">Or start a conversation →</a>
          </div>
          <p className="mt-6 text-sm text-navy/60">
            Not sure what you need yet? Review the{" "}
            <Link to="/services" className="underline underline-offset-4">
              engagement tiers
            </Link>{" "}
            or the{" "}
            <Link to="/clarityos" className="underline underline-offset-4">
              ClarityOS methodology
            </Link>
            .
          </p>
          <div className="mt-10">
            <Testimonials items={[TESTIMONIALS[0]]} variant="single" />
          </div>

        </div>
        <div className="mt-12 lg:col-span-4 lg:mt-0">
          <div className="overflow-hidden bg-navy shadow-2xl">
            <img
              src={portraitAsset.url}
              alt="Zeeshan Sabri"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-navy/10 bg-paper-soft py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {submitted ? (
            <div className="border border-green-500 bg-white p-10 text-center">
              <h2 className="font-serif text-3xl text-navy">Submitted!</h2>
              <p className="mt-4 text-navy/70">
                Thank you for your enquiry. We'll be in touch within 48 hours. For time-sensitive matters, email{" "}
                <a href={`mailto:${SITE.email}`} className="text-gold">{SITE.email}</a>.
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

              className="space-y-6 border border-navy/10 bg-white p-8 lg:p-10"
            >
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
