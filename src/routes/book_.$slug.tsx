import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { BOOK_CHAPTERS, illustratedChapterHref } from "@/lib/site-data";

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
    throw redirect({ href: illustratedChapterHref(ch) });
  },
  component: () => null,
});
