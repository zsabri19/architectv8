import { useState } from "react";
import { Play } from "lucide-react";

export type VideoItem = {
  src: string;
  poster: string;
  title: string;
  meta: string;
  /** Aspect ratio css value, e.g. "9 / 16" or "4 / 5". */
  ratio?: string;
};

/**
 * Poster-first video panel. The <video> element is only mounted after the
 * viewer clicks play, so the page never downloads video bytes up front.
 */
export function VideoPanel({ item, className = "" }: { item: VideoItem; className?: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className={`video-panel ${className}`} style={{ aspectRatio: item.ratio ?? "9 / 16" }}>
      {playing ? (
        <video
          src={item.src}
          poster={item.poster}
          title={item.title}
          controls
          autoPlay
          playsInline
          className="video-player"
        />
      ) : (
        <button
          type="button"
          className="video-poster"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${item.title}`}
        >
          <img src={item.poster} alt={item.title} loading="lazy" />
          <span className="video-scrim" aria-hidden="true" />
          <span className="video-play" aria-hidden="true">
            <Play />
          </span>
          <figcaption className="video-caption">
            <span className="video-meta">{item.meta}</span>
            <span className="video-title">{item.title}</span>
          </figcaption>
        </button>
      )}
    </figure>
  );
}
