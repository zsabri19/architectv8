import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout, Eyebrow } from "@/components/site/SiteLayout";
import { BOOK_CHAPTERS, BOOK_PARTS, FRAMEWORKS, SITE } from "@/lib/site-data";

function findChapter(slug: string) {
  const match = slug.match(/^chapter-(\d+)-(.+)$/);
  if (!match) return null;
  const num = parseInt(match[1], 10);
  const rest = match[2];
  return BOOK_CHAPTERS.find((c) => c.number === num && c.slug === rest) ?? null;
}

export const Route = createFileRoute("/book/$slug")({
  loader: ({ params }) => {
    const ch = findChapter(params.slug);
    if (!ch) throw notFound();
    return { chapter: ch };
  },
  head: ({ params, loaderData }) => {
    const title = loaderData
      ? `${loaderData.chapter.title} — From Exile to Transformation`
      : "Chapter — From Exile to Transformation";
    const desc = loaderData?.chapter.lesson ?? "A chapter from the memoir behind ClarityOS.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/book/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/book/${params.slug}` }],
    };
  },
  component: ChapterPage,
});

function ChapterPage() {
  const { chapter } = Route.useLoaderData();
  const part = BOOK_PARTS.find((p) => p.number === chapter.part);
  const framework = chapter.relatedFramework
    ? FRAMEWORKS.find((f) => f.slug === chapter.relatedFramework)
    : null;

  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-6 pt-20 pb-24 lg:px-8">
        <nav className="text-[11px] font-medium uppercase tracking-widest text-navy/50">
          <Link to="/book" className="hover:text-gold">The Memoir</Link>
          <span className="mx-2">/</span>
          <span>Part {chapter.part} · {part?.title}</span>
        </nav>
        <Eyebrow>Chapter {String(chapter.number).padStart(2, "0")}</Eyebrow>
        <h1 className="font-serif text-4xl leading-tight text-navy md:text-6xl">
          {chapter.title}
        </h1>
        <p className="mt-8 font-serif text-2xl italic leading-relaxed text-navy/80">
          {chapter.lesson}
        </p>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-navy/70">
          <p>
            <span className="float-left mr-3 mt-1 font-serif text-6xl leading-none text-gold">
              {chapter.title.charAt(0)}
            </span>
            This chapter is part of <em>From Exile to Transformation</em>, the forthcoming memoir
            behind the ClarityOS methodology. Full text arrives with the book's 2026 release. Join
            the waitlist to receive advance readings and framework companions.
          </p>
          <p>
            Every chapter maps back to a working framework. In field practice, the frameworks are
            what carry the lesson — the story is what makes them credible.
          </p>
        </div>

        {framework && (
          <div className="mt-16 border-l-2 border-gold bg-paper-soft p-8">
            <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
              Related Framework
            </div>
            <h3 className="mt-2 font-serif text-2xl text-navy">{framework.title}</h3>
            <p className="mt-3 text-navy/70">{framework.summary}</p>
            <Link
              to="/frameworks/$slug"
              params={{ slug: framework.slug }}
              className="mt-4 inline-block text-xs font-medium uppercase tracking-widest text-navy hover:text-gold"
            >
              Read the framework →
            </Link>
          </div>
        )}

        <div className="mt-16 grid gap-4 border-t border-navy/10 pt-8 md:grid-cols-2">
          <a
            href={SITE.bookSessionUrl}
            className="bg-navy px-8 py-4 text-center text-xs font-bold uppercase tracking-widest text-paper hover:bg-gold hover:text-navy"
          >
            Book $79 Clarity Session
          </a>
          <Link
            to="/book"
            className="border border-navy/20 px-8 py-4 text-center text-xs font-bold uppercase tracking-widest hover:border-navy"
          >
            All Chapters
          </Link>
        </div>
      </article>
    </SiteLayout>
  );
}
