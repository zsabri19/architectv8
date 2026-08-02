import type { QuoteCard as QuoteCardType } from "@/lib/site-data";

export function QuoteCard({ card, priority = false }: { card: QuoteCardType; priority?: boolean }) {
  return (
    <figure className="group relative aspect-square overflow-hidden border border-navy/10 bg-navy shadow-lg">
      <img
        src={card.src}
        alt={`Quote — ${card.quote}`}
        loading={priority ? "eager" : "lazy"}
        className="h-full w-full object-cover opacity-95 transition-opacity duration-300 group-hover:opacity-100"
      />
      <figcaption className="sr-only">
        {card.quote} — {card.attribution}
      </figcaption>
    </figure>
  );
}
