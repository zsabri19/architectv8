export type WorkshopItem = {
  title: string;
  host: string;
  venue: string;
  date: string;
  format: string;
  image: string;
  alt: string;
};

/**
 * Continuous, hover-pausable ribbon of delivered workshops and talks. Each card
 * shows the original flyer plus the engagement record, so the ledger reads as
 * proof without the visitor having to click anything.
 */
export function WorkshopMarquee({
  items,
  speed = 60,
  label = "Delivered workshops and talks",
}: {
  items: WorkshopItem[];
  speed?: number;
  label?: string;
}) {
  const track = [...items, ...items];
  return (
    <div className="workshop-marquee" aria-label={label} role="group">
      <div className="workshop-marquee-track" style={{ animationDuration: `${speed}s` }}>
        {track.map((w, i) => {
          const clone = i >= items.length;
          return (
            <figure className="workshop-card" key={`${w.title}-${i}`} aria-hidden={clone}>
              <img src={w.image} alt={clone ? "" : w.alt} loading="lazy" />
              <figcaption>
                <span className="workshop-card-meta">
                  {w.format} · {w.date}
                </span>
                <span className="workshop-card-title">{w.title}</span>
                <span className="workshop-card-host">
                  {w.host} · {w.venue}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
