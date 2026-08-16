import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout, Eyebrow } from "@/components/site/SiteLayout";
import { MemoirContinue } from "@/components/site/MemoirContinue";
import { MemoirProse, previewBlocks } from "@/components/site/MemoirProse";
import { chapterIsOpen, isMemoirUnlocked } from "@/lib/memoir/access";
import { MEMOIR_BODIES } from "@/lib/memoir/bodies";
import {
  BOOK_CHAPTERS,
  BOOK_PARTS,
  FRAMEWORKS,
  chapterPath,
  listenChapterUrl,
  canonicalUrl,
} from "@/lib/site-data";

function findChapter(slug: string) {
  const match = slug.match(/^chapter-(\d+)-(.+)$/);
  if (!match) return null;
  const num = parseInt(match[1], 10);
  const rest = match[2];
  return BOOK_CHAPTERS.find((c) => c.number === num && c.slug === rest) ?? null;
}

export const Route = createFileRoute("/book_/$slug")({
  loader: ({ params }) => {
    const ch = findChapter(params.slug);
    if (!ch) throw notFound();
    return { chapter: ch };
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.chapter.title} — From Exile to Transformation`
      : "Chapter — From Exile to Transformation";
    const desc = loaderData?.chapter.lesson ?? "A chapter from the memoir behind ClarityOS.";
    const path = loaderData ? `/book/${chapterPath(loaderData.chapter)}` : "/book";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonicalUrl(path) },
      ],
      links: [{ rel: "canonical", href: canonicalUrl(path) }],
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
  const index = BOOK_CHAPTERS.findIndex((c) => c.number === chapter.number);
  const prev = index > 0 ? BOOK_CHAPTERS[index - 1] : null;
  const next = index < BOOK_CHAPTERS.length - 1 ? BOOK_CHAPTERS[index + 1] : null;
  const full = MEMOIR_BODIES[String(chapter.number)] ?? [];

  const [unlocked, setUnlocked] = useState(false);
  const [prompt, setPrompt] = useState(false);

  useEffect(() => {
    const open = isMemoirUnlocked();
    setUnlocked(open);
    if (chapterIsOpen(chapter.number, open)) {
      setPrompt(false);
      return;
    }
    // Chapter 2: let them start reading, then the continue sheet arrives.
    // Later chapters: the same sheet, a little sooner.
    const delay = chapter.number === 2 ? 7000 : 2800;
    const timer = window.setTimeout(() => setPrompt(true), delay);
    return () => window.clearTimeout(timer);
  }, [chapter.number]);

  const open = chapterIsOpen(chapter.number, unlocked);
  const blocks = useMemo(() => {
    if (open) return full;
    return previewBlocks(full, chapter.number === 2 ? 3 : 1);
  }, [open, full, chapter.number]);

  const onListen = (event: MouseEvent<HTMLAnchorElement>) => {
    if (open) return;
    event.preventDefault();
    setPrompt(true);
  };

  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-6 pt-20 pb-24 lg:px-8">
        <nav className="text-[11px] font-medium uppercase tracking-widest text-navy/50">
          <Link to="/book" className="hover:text-gold">
            The Memoir
          </Link>
          <span className="mx-2">/</span>
          <span>
            Part {chapter.part} · {part?.title}
          </span>
        </nav>
        <Eyebrow>Chapter {String(chapter.number).padStart(2, "0")}</Eyebrow>
        <h1 className="font-serif text-4xl leading-tight text-navy md:text-6xl">{chapter.title}</h1>
        <p className="mt-4 text-sm uppercase tracking-widest text-navy/40">{chapter.lesson}</p>
        <a
          href={listenChapterUrl(chapter)}
          className="mt-6 inline-flex border border-navy px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-navy hover:bg-navy hover:text-paper"
          rel="nofollow noopener noreferrer"
          target="_blank"
          onClick={onListen}
        >
          Listen to this chapter
        </a>

        <MemoirProse blocks={blocks} />

        {framework && open && (
          <div className="mt-16 border-l-2 border-gold bg-paper-soft p-8">
            <div className="text-[10px] font-medium uppercase tracking-widest text-gold">
              Framework this chapter produced
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

        <nav className="mt-16 grid gap-4 border-t border-navy/10 pt-8 md:grid-cols-2">
          {prev ? (
            <Link
              to="/book/$slug"
              params={{ slug: chapterPath(prev) }}
              className="border border-navy/20 px-6 py-4 text-xs font-bold uppercase tracking-widest hover:border-navy"
            >
              ← Ch. {String(prev.number).padStart(2, "0")} {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to="/book/$slug"
              params={{ slug: chapterPath(next) }}
              className="border border-navy/20 px-6 py-4 text-right text-xs font-bold uppercase tracking-widest hover:border-navy"
            >
              Ch. {String(next.number).padStart(2, "0")} {next.title} →
            </Link>
          ) : (
            <Link
              to="/book"
              className="border border-navy/20 px-6 py-4 text-right text-xs font-bold uppercase tracking-widest hover:border-navy"
            >
              Back to the memoir →
            </Link>
          )}
        </nav>

        <div className="mt-8">
          <Link
            to="/book"
            className="text-[11px] font-medium uppercase tracking-widest text-navy/50 hover:text-gold"
          >
            All chapters
          </Link>
        </div>
      </article>
      <MemoirContinue open={prompt} onClose={chapter.number === 2 ? () => setPrompt(false) : undefined} />
    </SiteLayout>
  );
}
