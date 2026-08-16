import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Eyebrow, SectionTitle } from "@/components/site/SiteLayout";
import { EnquiryForm } from "@/components/site/EnquiryForm";

import {
  BOOK_PARTS,
  BOOK_CHAPTERS,
  SITE,
  canonicalUrl,
  chapterPath,
  listenChapterUrl,
  LISTEN_PROLOGUE,
  LISTEN_EPILOGUE,
} from "@/lib/site-data";
import {
  BOOK_ABOUT,
  BOOK_PROLOGUE,
  BOOK_PART_DETAILS,
  BOOK_METRICS,
  BOOK_ROI_METRICS,
  BOOK_ROADMAP,
  BOOK_WHY_AUDIENCES,
  BOOK_DEDICATION,
  BOOK_CLOSING,
  BOOK_PUBLISHER,
  BOOK_PRESS,
} from "@/lib/v4-content";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "From Exile to Transformation — A Memoir by Zeeshan Sabri" },
      {
        name: "description",
        content:
          "Four parts, sixteen chapters. From Exile to Transformation — the memoir behind ClarityOS. Join the pre-order waitlist for the 2026 release.",
      },
      { property: "og:title", content: "From Exile to Transformation" },
      {
        property: "og:description",
        content: "A memoir beyond techniques. The book behind ClarityOS.",
      },
      { property: "og:type", content: "book" },
      { property: "og:url", content: canonicalUrl("/book") },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/book") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Book",
          name: "From Exile to Transformation: A Memoir Beyond Techniques",
          author: { "@type": "Person", name: "Zeeshan Sabri" },
          numberOfPages: 320,
          bookFormat: "Hardcover",
          datePublished: "2026",
        }),
      },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  return (
    <SiteLayout>
      <section className="overflow-hidden bg-navy py-24 text-paper lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <div className="mx-auto aspect-[3/4] w-full max-w-sm border border-paper/10 bg-gradient-to-br from-navy-soft to-navy p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
            <div className="flex h-full flex-col justify-between text-paper">
              <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
                A Memoir Beyond Techniques
              </div>
              <div>
                <div className="font-serif text-4xl leading-tight">
                  From Exile <br />
                  to <br />
                  <span className="italic text-gold">Transformation</span>
                </div>
                <div className="mt-6 text-[10px] uppercase tracking-widest text-paper/50">
                  Zeeshan Sabri · 2026
                </div>
              </div>
            </div>
          </div>
          <div>
            <Eyebrow>Forthcoming — 2026</Eyebrow>
            <h1 className="font-serif text-4xl leading-tight md:text-6xl">
              From Exile to Transformation
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-paper/70">
              A memoir beyond techniques. Four parts, sixteen chapters, a prologue, an epilogue,
              and the frameworks that later became ClarityOS.
            </p>
            <p className="mt-4 text-paper/60">
              From the Gulf War to Fortune 500 boardrooms, from Muscat to Dubai, this is the record
              of what it took to build a system that holds under real pressure.
            </p>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const formData = new FormData(form);
              const data = Object.fromEntries(formData);

              try {
                const response = await fetch("https://formspree.io/f/mjgndylo", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                  },
                  body: JSON.stringify(data),
                });

                if (response.ok) {
                  const result = await response.json();
                  // Show success message - could update state here
                  alert("Thank you for joining the waitlist!");
                  form.reset();
                } else {
                  console.error("Form submission failed");
                  alert("Submission failed. Please try again.");
                }
              } catch (error) {
                console.error("Error submitting form:", error);
                alert("Error submitting form. Please try again.");
              }
            }} className="mt-8 space-y-3">
              <label htmlFor="book-waitlist-email" className="sr-only">
                Email address for the pre-order waitlist
              </label>
              <input
                id="book-waitlist-email"
                name="email"
                type="email"
                required
                placeholder="Join the pre-order waitlist"
                className="w-full border border-paper/20 bg-paper/5 px-6 py-4 text-paper placeholder-paper/40 outline-none focus:border-gold"
              />
              <button className="w-full bg-gold py-4 text-xs font-bold uppercase tracking-widest text-navy hover:bg-paper">
                Secure Early Access
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* About + Prologue */}
      <section className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
        <Eyebrow>About the book</Eyebrow>
        <h2 className="mt-4 font-serif text-3xl leading-tight text-navy md:text-5xl">
          {BOOK_ABOUT.headline}
        </h2>
        <p className="mt-8 font-serif text-2xl italic leading-relaxed text-navy/80">
          {BOOK_ABOUT.lead}
        </p>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-navy/70">
          {BOOK_ABOUT.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <blockquote className="mt-12 border-l-2 border-gold pl-6 font-serif text-xl italic text-navy">
          "{BOOK_ABOUT.quote}"
        </blockquote>
      </section>

      <section className="border-t border-navy/10 bg-paper-soft py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Eyebrow>Prologue — Muscat, December 2025</Eyebrow>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-navy/80">
            {BOOK_PROLOGUE.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-none first-letter:text-gold"
                    : undefined
                }
              >
                {p}
              </p>
            ))}
          </div>
          <a
            href={LISTEN_PROLOGUE}
            className="mt-8 inline-flex text-[11px] font-medium uppercase tracking-widest text-navy hover:text-gold"
            rel="nofollow noopener noreferrer"
            target="_blank"
          >
            Listen to the prologue →
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <Eyebrow>Table of Contents</Eyebrow>
        <SectionTitle>Four parts. Sixteen chapters.</SectionTitle>

        <div className="mt-16 space-y-16">
          {BOOK_PARTS.map((p) => {
            const detail = BOOK_PART_DETAILS.find((d) => d.partNumber === p.number);
            return (
              <div key={p.number}>
                <div className="mb-6 flex items-baseline gap-6 border-b border-navy/10 pb-4">
                  <span className="font-serif text-3xl text-gold">{p.number}</span>
                  <h3 className="font-serif text-2xl text-navy md:text-3xl">{p.title}</h3>
                  <span className="ml-auto hidden text-[11px] uppercase tracking-widest text-navy/40 md:inline">
                    {p.pillar}
                  </span>
                </div>
                {detail && (
                  <div className="mb-6 grid gap-4 md:grid-cols-3">
                    <div className="text-[11px] font-medium uppercase tracking-widest text-navy/50">
                      {detail.era}
                    </div>
                    <p className="md:col-span-2 text-navy/70">{detail.body}</p>
                    <blockquote className="md:col-span-3 border-l-2 border-gold pl-4 font-serif text-lg italic text-navy/80">
                      "{detail.quote}"
                    </blockquote>
                  </div>
                )}
                <ul className="divide-y divide-navy/10">
                  {BOOK_CHAPTERS.filter((c) => c.part === p.number).map((c) => (
                    <li
                      key={c.slug}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-5"
                    >
                      <Link
                        to="/book/$slug"
                        params={{ slug: chapterPath(c) }}
                        className="group flex min-w-0 items-baseline gap-6"
                      >
                        <span className="font-mono text-xs text-navy/40">
                          Ch. {String(c.number).padStart(2, "0")}
                        </span>
                        <span className="font-serif text-lg text-navy group-hover:text-gold">
                          {c.title}
                        </span>
                      </Link>
                      <span className="flex items-center gap-5 text-[10px] font-medium uppercase tracking-widest">
                        <Link
                          to="/book/$slug"
                          params={{ slug: chapterPath(c) }}
                          className="text-navy/40 hover:text-gold"
                        >
                          Read
                        </Link>
                        <a
                          href={listenChapterUrl(c)}
                          className="text-navy/40 hover:text-gold"
                          rel="nofollow noopener noreferrer"
                          target="_blank"
                        >
                          Listen
                        </a>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <a
          href={LISTEN_EPILOGUE}
          className="mt-10 inline-flex text-[11px] font-medium uppercase tracking-widest text-navy hover:text-gold"
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          Listen to the epilogue →
        </a>
      </section>

      {/* Metrics */}
      <section className="border-t border-navy/10 bg-navy py-20 text-paper">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Eyebrow>Field evidence</Eyebrow>
          <SectionTitle className="text-paper">The record behind the book</SectionTitle>
          <div className="mt-12 grid gap-px bg-paper/10 md:grid-cols-2 lg:grid-cols-4">
            {BOOK_METRICS.map((m) => (
              <div key={m.d} className="bg-navy p-8">
                <div className="font-serif text-4xl text-gold">{m.n}</div>
                <div className="mt-3 text-sm text-paper/70">{m.d}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-px bg-paper/10 md:grid-cols-2 lg:grid-cols-4">
            {BOOK_ROI_METRICS.map((m) => (
              <div key={m.d} className="bg-navy p-8">
                <div className="font-serif text-4xl text-gold">{m.n}</div>
                <div className="mt-3 text-sm text-paper/70">{m.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <Eyebrow>Engagement roadmap</Eyebrow>
        <SectionTitle>Four stages. One installation path.</SectionTitle>
        <div className="mt-12 grid gap-px border border-navy/10 bg-navy/10 md:grid-cols-2 lg:grid-cols-4">
          {BOOK_ROADMAP.map((r, i) => (
            <div key={r.phase} className="bg-white p-8">
              <div className="font-serif text-3xl text-gold">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 font-serif text-2xl text-navy">{r.phase}</h3>
              <p className="mt-3 text-xs font-medium uppercase tracking-widest text-navy/50">
                {r.frameworks}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-navy/70">{r.goal}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why this book */}
      <section className="border-t border-navy/10 bg-paper-soft py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Eyebrow>Who this is for</Eyebrow>
          <div className="mt-8 space-y-6">
            {BOOK_WHY_AUDIENCES.map((line) => (
              <p
                key={line}
                className="border-l-2 border-gold pl-6 font-serif text-xl leading-relaxed text-navy/80"
              >
                {line}
              </p>
            ))}
          </div>
          <div className="mt-12 border-t border-navy/10 pt-8">
            <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
              Dedication
            </div>
            <p className="mt-4 font-serif text-lg italic leading-relaxed text-navy/80">
              {BOOK_DEDICATION}
            </p>
          </div>
          <div className="mt-10">
            <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
              Closing thesis
            </div>
            <p className="mt-4 font-serif text-xl leading-relaxed text-navy">
              {BOOK_CLOSING.thesis}
            </p>
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
            {BOOK_PRESS.eyebrow}
          </div>
          <blockquote className="mt-6 font-serif text-2xl italic leading-relaxed text-navy md:text-3xl">
            "{BOOK_PRESS.quote}"
          </blockquote>
          <p className="mt-4 text-xs font-medium uppercase tracking-widest text-navy/50">
            {BOOK_PRESS.attribution}
          </p>
          <p className="mt-6 text-navy/70">{BOOK_PRESS.description}</p>
          <a
            href={SITE.award.pressUrl}
            className="mt-6 inline-block border-b border-navy/20 pb-1 text-xs font-medium uppercase tracking-widest hover:border-gold hover:text-gold"
          >
            {BOOK_PRESS.cta} →
          </a>
        </div>
      </section>

      {/* Publisher */}
      <section className="border-t border-navy/10 bg-paper-soft py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <Eyebrow>For publishers</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl text-navy md:text-4xl">
            {BOOK_PUBLISHER.headline}
          </h2>
          <p className="mt-6 text-navy/70">{BOOK_PUBLISHER.body}</p>
          <div className="mt-8 flex justify-center">
            <EnquiryForm
              enquiryType="Manuscript"
              triggerLabel={BOOK_PUBLISHER.cta}
              heading="Manuscript enquiry"
              messagePlaceholder="Imprint, territory, and what you'd like to see next."
              className="text-left"
            />
          </div>

        </div>
      </section>


      <section className="border-t border-navy/10 bg-paper-soft py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <Eyebrow>Recognition</Eyebrow>
          <blockquote className="font-serif text-2xl italic leading-relaxed text-navy md:text-3xl">
            "A masterclass in institutional resilience."
          </blockquote>
          <p className="mt-4 text-xs font-medium uppercase tracking-widest text-navy/50">
            {SITE.award.title} · {SITE.award.location} · {SITE.award.date}
          </p>
          <a
            href={SITE.award.pressUrl}
            className="mt-6 inline-block border-b border-navy/20 pb-1 text-xs font-medium uppercase tracking-widest hover:border-gold hover:text-gold"
          >
            Read the press release →
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
