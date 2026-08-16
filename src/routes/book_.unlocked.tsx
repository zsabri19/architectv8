import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Eyebrow } from "@/components/site/SiteLayout";
import { persistMemoirUnlock } from "@/lib/memoir/access";
import { BOOK_CHAPTERS, chapterPath, canonicalUrl } from "@/lib/site-data";

export const Route = createFileRoute("/book_/unlocked")({
  head: () => ({
    meta: [
      { title: "The rest of the book is open · Zeeshan Sabri" },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "The rest of the book is open" },
      { property: "og:url", content: canonicalUrl("/book/unlocked") },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/book/unlocked") }],
  }),
  component: UnlockedPage,
});

function UnlockedPage() {
  useEffect(() => {
    persistMemoirUnlock();
  }, []);

  const next = BOOK_CHAPTERS.find((c) => c.number === 2) ?? BOOK_CHAPTERS[0];

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-24 lg:px-8">
        <Eyebrow>From Exile to Transformation</Eyebrow>
        <h1 className="font-serif text-4xl leading-tight text-navy md:text-5xl">
          The rest of the book is open.
        </h1>
        <p className="mt-6 text-lg text-navy/70">
          One payment, once. Pick up where you left off — or start Chapter Two.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/book/$slug"
            params={{ slug: chapterPath(next) }}
            className="inline-flex border border-navy bg-navy px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-paper"
          >
            Continue reading
          </Link>
          <Link
            to="/book"
            className="inline-flex border border-navy/20 px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-navy"
          >
            Table of contents
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
