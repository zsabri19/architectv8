import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { SiteLayout, Eyebrow } from "@/components/site/SiteLayout";
import { persistMemoirUnlock } from "@/lib/memoir/access";
import { SITE, canonicalUrl } from "@/lib/site-data";

export const Route = createFileRoute("/book-a-session_/thanks")({
  head: () => ({
    meta: [
      { title: "Session paid — send two times · Zeeshan Sabri" },
      {
        name: "description",
        content: "Payment received. Send two times that work and I will confirm the $79 Clarity Session.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Session paid — send two times" },
      { property: "og:url", content: canonicalUrl("/book-a-session/thanks") },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/book-a-session/thanks") }],
  }),
  component: ThanksPage,
});

function ThanksPage() {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  useEffect(() => {
    persistMemoirUnlock();
  }, []);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-24 lg:px-8">
        <Eyebrow>Clarity Session · $79</Eyebrow>
        <h1 className="font-serif text-4xl leading-[1.1] text-navy md:text-5xl">
          Payment received. Now pick the hour.
        </h1>
        <p className="mt-6 text-lg text-navy/70">
          Stripe has the payment. I still need two times that work for you (include your timezone).
          I confirm the 90-minute session the same day.
        </p>
        <p className="mt-4 text-navy/70">
          The memoir — chapters to read and to listen — is also open on this browser.{" "}
          <Link to="/book" className="text-gold">
            Continue the book
          </Link>
          .
        </p>

        {submitted ? (
          <div className="mt-10 border border-green-600 bg-white p-8">
            <h2 className="font-serif text-2xl text-navy">Times received.</h2>
            <p className="mt-3 text-navy/70">
              I will confirm by email. If you need me sooner, write{" "}
              <a className="text-gold" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              .
            </p>
          </div>
        ) : (
          <form
            className="mt-10 space-y-5 border border-navy/15 bg-white p-8"
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              setStatus("submitting");
              try {
                const response = await fetch("https://formspree.io/f/mbdnegwo", {
                  method: "POST",
                  headers: { "Content-Type": "application/json", Accept: "application/json" },
                  body: JSON.stringify(Object.fromEntries(formData)),
                });
                setStatus(response.ok ? "idle" : "error");
                if (response.ok) setSubmitted(true);
              } catch {
                setStatus("error");
              }
            }}
          >
            <input type="hidden" name="enquiry_type" value="session-times" />
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <Field
              label="Two times that work (with timezone)"
              name="message"
              as="textarea"
              required
              placeholder="e.g. Tuesday 19 Aug, 10:00 GST · Wednesday 20 Aug, 16:00 GST"
            />
            {status === "error" && (
              <p className="text-sm text-destructive">
                That did not send. Email {SITE.email} with your two times instead.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex w-full items-center justify-center gap-2 bg-navy py-4 text-xs font-bold uppercase tracking-widest text-paper hover:bg-gold hover:text-navy disabled:cursor-not-allowed"
            >
              {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {status === "submitting" ? "Sending" : "Send my times"}
            </button>
          </form>
        )}

        <p className="mt-8 text-sm text-navy/55">
          Or email the same two times to{" "}
          <a className="underline underline-offset-4" href={`mailto:${SITE.email}?subject=Clarity%20Session%20%E2%80%94%20two%20times`}>
            {SITE.email}
          </a>
          .{" "}
          <Link className="underline underline-offset-4" to="/connect">
            Enterprise path instead
          </Link>
          .
        </p>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  as,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  as?: "textarea";
  placeholder?: string;
}) {
  const id = `thanks-${name}`;
  const cls = "mt-2 w-full border border-navy/20 bg-white px-4 py-3 text-sm outline-none focus:border-gold";
  return (
    <div>
      <label htmlFor={id} className="block text-[10px] font-medium uppercase tracking-widest text-navy/70">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      {as === "textarea" ? (
        <textarea id={id} name={name} required={required} rows={4} placeholder={placeholder} className={cls} />
      ) : (
        <input id={id} type={type} name={name} required={required} placeholder={placeholder} className={cls} />
      )}
    </div>
  );
}
