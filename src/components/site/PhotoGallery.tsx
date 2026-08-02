import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type GalleryPhoto = { src: string; caption: string; tag?: string };

/**
 * Clickable photo gallery with a full-size, uncropped lightbox.
 * Thumbnails are cropped for rhythm; the lightbox shows the whole frame.
 */
export function PhotoGallery({
  photos,
  columns = "md:grid-cols-3 lg:grid-cols-4",
}: {
  photos: GalleryPhoto[];
  columns?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpen((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const active = open === null ? null : photos[open];

  return (
    <>
      <div className={`grid grid-cols-2 gap-3 ${columns}`}>
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setOpen(i)}
            className="photo-tile group relative aspect-[4/5] overflow-hidden bg-navy/5 text-left"
            aria-label={`Open photo: ${p.caption}`}
          >
            <img
              src={p.src}
              alt={p.caption}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <span className="pointer-events-none absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/15" />

            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent p-4">
              {p.tag && (
                <span className="block text-[9px] font-medium uppercase tracking-widest text-gold">
                  {p.tag}
                </span>
              )}
              <span className="mt-1 block text-xs leading-snug text-paper">{p.caption}</span>
            </span>
            <span className="photo-tile-cue absolute right-3 top-3 text-[9px] font-medium uppercase tracking-widest text-paper">
              View
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={close}
        >
          <button type="button" className="lightbox-close" onClick={close} aria-label="Close">
            <X aria-hidden="true" />
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <img src={active.src} alt={active.caption} />
            <figcaption>
              {active.tag && <span className="lightbox-tag">{active.tag}</span>}
              <span>{active.caption}</span>
            </figcaption>
          </figure>
          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
