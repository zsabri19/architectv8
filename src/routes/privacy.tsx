import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Eyebrow } from "@/components/site/SiteLayout";
import { SITE, canonicalUrl } from "@/lib/site-data";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Zeeshan Sabri" },
      {
        name: "description",
        content:
          "How enquiry forms, newsletter sign-ups, analytics, and session payments handle your data on global-mkts.com.",
      },
      { property: "og:title", content: "Privacy Policy — Zeeshan Sabri" },
      {
        property: "og:description",
        content: "How this site handles enquiry data, analytics, and payments.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl("/privacy") },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/privacy") }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 pt-24 pb-32 lg:px-8 lg:pt-32">
        <Eyebrow>Privacy</Eyebrow>
        <h1 className="font-serif text-4xl leading-[1.1] text-navy md:text-5xl">Privacy Policy</h1>
        <p className="mt-6 text-navy/60">
          This page is maintained by Zeeshan Sabri to explain, in plain terms, what
          global-mkts.com collects and why. It describes current practice on this site; it
          is not an independent audit or certification.
        </p>

        <div className="mt-16 space-y-12">
          <Block title="What is collected">
            <p>
              Only what you type into a form. Enquiry, newsletter, and guide-download forms collect
              your name, email address, organisation where given, and the message you write. The
              site does not ask for, and has no way to store, payment card details.
            </p>
          </Block>

          <Block title="How forms are processed">
            <p>
              Form submissions are delivered by Formspree, which forwards them to my email inbox.
              Formspree acts as a processor for that delivery. I use what you send only to reply to
              your enquiry, or — where you asked for it — to send the newsletter or the guide you
              requested.
            </p>
          </Block>

          <Block title="Analytics">
            <p>
              This site uses Google Analytics 4 to count page views and understand which pages are
              useful. It sets cookies in your browser and records aggregate usage. It is not used to
              build advertising profiles, and I do not sell or share analytics data.
            </p>
          </Block>

          <Block title="Payments">
            <p>
              Advisory sessions are paid through Stripe. When you click through to checkout you
              leave this site and complete payment on Stripe&apos;s own hosted page. Stripe handles
              your card details under its own privacy terms; I receive only the confirmation and
              contact details needed to schedule and invoice your session.
            </p>
          </Block>

          <Block title="Retention">
            <p>
              Enquiry emails are kept for as long as the working relationship, or the possibility of
              one, remains live. Newsletter subscriptions are kept until you unsubscribe. You can
              ask me to delete either at any time.
            </p>
          </Block>

          <Block title="Your requests">
            <p>
              To see, correct, or delete anything you have sent me, email{" "}
              <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
                {SITE.email}
              </a>
              . I respond to these directly, normally within a few working days.
            </p>
          </Block>

          <Block title="Third parties named on this page">
            <p>Formspree (form delivery) · Google Analytics 4 (usage measurement) · Stripe (payments).</p>
          </Block>
        </div>

        <div className="mt-20 border-t border-navy/10 pt-8">
          <Link
            to="/connect"
            className="text-xs font-semibold uppercase tracking-widest text-navy transition-colors duration-200 hover:text-gold"
          >
            Questions? Get in touch →
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-2xl text-navy">{title}</h2>
      <div className="mt-4 space-y-4 text-navy/70">{children}</div>
    </section>
  );
}
