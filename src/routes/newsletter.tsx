import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, Eyebrow, SectionTitle } from "@/components/site/SiteLayout";
import { NEWSLETTER_ISSUES, canonicalUrl } from "@/lib/site-data";
import portraitAsset from "@/assets/portrait-6.jpg.asset.json";

export const Route = createFileRoute("/newsletter")({
  head: () => ({
    meta: [
      { title: "The Clarity Dispatch — Weekly Newsletter · Zeeshan Sabri" },
      {
        name: "description",
        content:
          "Weekly executive brief on installing the human operating layer before transformation. Delivered to leaders in the GCC and beyond.",
      },
      { property: "og:title", content: "The Clarity Dispatch" },
      { property: "og:description", content: "Weekly executive brief on the human layer." },
      { property: "og:url", content: canonicalUrl("/newsletter") },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/newsletter") }],
  }),
  component: NewsletterPage,
});

function NewsletterPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="lg:col-span-8">
          <Eyebrow>The Newsletter</Eyebrow>
          <h1 className="font-serif text-4xl leading-[1.1] text-navy md:text-6xl">
            The Clarity Dispatch
          </h1>
          <p className="mt-6 text-lg text-navy/70">
            A weekly executive brief on the human layer of transformation — field notes, framework
            unpacks, and GCC leadership intelligence. Each issue connects one real pattern to one
            actionable framework.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-navy/60">
            <li>One pattern from the field, every week</li>
            <li>One framework unpack with practical application</li>
            <li>No fluff — only what transfers to your next decision</li>
          </ul>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const formData = new FormData(form);
              const data = Object.fromEntries(formData);

              try {
                const response = await fetch("https://formspree.io/f/xnjeypwv", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                  },
                  body: JSON.stringify(data),
                });

                if (response.ok) {
                  alert("Thank you for subscribing!");
                  form.reset();
                } else {
                  console.error("Newsletter subscription failed");
                  alert("Subscription failed. Please try again.");
                }
              } catch (error) {
                console.error("Error subscribing:", error);
                alert("Error subscribing. Please try again.");
              }
            }}
            className="mt-8 flex max-w-lg gap-2"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="Email address"
              className="flex-1 border border-navy/20 bg-white px-4 py-4 outline-none focus:border-gold"
            />
            <button className="bg-navy px-6 py-4 text-xs font-bold uppercase tracking-widest text-paper hover:bg-gold hover:text-navy">
              Subscribe
            </button>
          </form>
        </div>
        <div className="mt-12 lg:col-span-4 lg:mt-0">
          <div className="overflow-hidden bg-navy shadow-2xl">
            <img
              src={portraitAsset.url}
              alt="Zeeshan Sabri, editor of The Clarity Dispatch"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-navy/10 bg-paper-soft py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <SectionTitle>Recent issues</SectionTitle>
          <ul className="mt-10 divide-y divide-navy/10">
            {NEWSLETTER_ISSUES.map((i) => (
              <li key={i.slug} className="py-6">
                <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
                  Issue {String(i.number).padStart(2, "0")} ·{" "}
                  {new Date(i.date).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="mt-2 font-serif text-2xl text-navy">{i.title}</div>
                <p className="mt-2 text-navy/60">{i.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
