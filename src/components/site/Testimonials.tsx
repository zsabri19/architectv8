import type { Testimonial } from "@/lib/site-data";

/**
 * Third-party testimonials. Grid variant for the homepage; single variant for
 * conversion pages (connect / book-a-session). Attribution is always name +
 * title + org + date — no anonymous quotes.
 */
export function Testimonials({
  items,
  eyebrow = "In their words",
  heading = "Proof, from the rooms and the relationships.",
  variant = "grid",
}: {
  items: Testimonial[];
  eyebrow?: string;
  heading?: string;
  variant?: "grid" | "single";
}) {
  if (variant === "single") {
    const t = items[0];
    if (!t) return null;
    return (
      <figure className="testimonial-single">
        <blockquote>“{t.quote}”</blockquote>
        <figcaption>
          <strong>{t.name}</strong>
          <span>
            {[t.title, t.org].filter(Boolean).join(" · ")}
            {t.date ? ` · ${t.date}` : ""}
          </span>
        </figcaption>
      </figure>
    );
  }

  return (
    <section className="section testimonial-section" aria-labelledby="testimonials-title">
      <div className="site-shell">
        <div className="section-heading">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="testimonials-title">{heading}</h2>
          <p>
            Recommendations from LinkedIn, signed participant feedback from GCC programmes, and
            partners who have seen the work delivered in the room.
          </p>
        </div>
        <div className="testimonial-grid">
          {items.map((t) => (
            <article key={t.name} className="testimonial-card">
              <blockquote>“{t.quote}”</blockquote>
              <footer>
                <strong>{t.name}</strong>
                <span className="testimonial-role">
                  {[t.title, t.org].filter(Boolean).join(" · ")}
                </span>
                <span className="testimonial-date">
                  {t.date} · {t.source}
                </span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
