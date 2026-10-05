import type { QuoteCard as QuoteCardType } from "@/lib/site-data";
import { IMAGE_DIMS } from "@/lib/image-dims";

function QuoteImage({ card, priority }: { card: QuoteCardType; priority: boolean }) {
  // quote-act.png stays at its URL; the page loads the smaller JPEG/WebP siblings.
  const src = card.src === "/assets/quote-act.png" ? "/assets/quote-act.jpg" : card.src;
  const dim = IMAGE_DIMS[card.src] ?? IMAGE_DIMS[src];
  const img = (
    <img
      src={src}
      alt={`Quote — ${card.quote}`}
      width={dim?.width}
      height={dim?.height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className="h-full w-full object-cover opacity-95 transition-opacity duration-300 group-hover:opacity-100"
    />
  );
  if (!dim) return img;
  return (
    <picture className="contents">
      <source srcSet={src.replace(/\.(png|jpe?g)$/i, ".webp")} type="image/webp" />
      {img}
    </picture>
  );
}

export function QuoteCard({ card, priority = false }: { card: QuoteCardType; priority?: boolean }) {
  return (
    <figure className="group relative aspect-square overflow-hidden border border-navy/10 bg-navy shadow-lg">
      <QuoteImage card={card} priority={priority} />
      <figcaption className="sr-only">
        {card.quote} — {card.attribution}
      </figcaption>
    </figure>
  );
}
