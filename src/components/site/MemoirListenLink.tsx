import { useState } from "react";
import { MemoirContinue } from "@/components/site/MemoirContinue";
import { chapterIsOpen } from "@/lib/memoir/access";
import { listenChapterUrl, type BookChapter } from "@/lib/site-data";

export function MemoirListenLink({
  chapter,
  className,
  children,
}: {
  chapter: BookChapter;
  className?: string;
  children: React.ReactNode;
}) {
  const [prompt, setPrompt] = useState(false);

  return (
    <>
      <a
        href={listenChapterUrl(chapter)}
        className={className}
        rel="nofollow noopener noreferrer"
        target="_blank"
        onClick={(event) => {
          if (chapterIsOpen(chapter.number)) return;
          event.preventDefault();
          setPrompt(true);
        }}
      >
        {children}
      </a>
      <MemoirContinue open={prompt} onClose={() => setPrompt(false)} />
    </>
  );
}
