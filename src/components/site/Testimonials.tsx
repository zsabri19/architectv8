import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/lib/site-data";

/**
 * Third-party testimonials. Deck variant is the homepage iPhone-style
 * horizontal cards; single/grid stay on conversion pages.
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
  variant?: "grid" | "single" | "pager";
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

  if (variant === "pager") {
    return <TestimonialDeck items={items} eyebrow={eyebrow} heading={heading} />;
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
            <article key={`${t.name}-${t.date}`} className="testimonial-card">
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

function wrapOffset(i: number, index: number, total: number) {
  let delta = i - index;
  const half = Math.floor(total / 2);
  if (delta > half) delta -= total;
  if (delta < -half) delta += total;
  return delta;
}

function TestimonialDeck({
  items,
  eyebrow,
  heading,
}: {
  items: Testimonial[];
  eyebrow: string;
  heading: string;
}) {
  const [index, setIndex] = useState(0);
  const drag = useRef<{ id: number; x: number; moved: boolean } | null>(null);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((current) => (current + dir + items.length) % items.length);
    },
    [items.length],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (items.length === 0) return null;

  const endDrag = (clientX: number) => {
    const start = drag.current;
    drag.current = null;
    if (!start) return;
    const delta = clientX - start.x;
    if (delta <= -48) go(1);
    else if (delta >= 48) go(-1);
  };

  return (
    <section className="section testimonial-section" aria-labelledby="testimonials-title">
      <div className="site-shell">
        <div className="section-heading">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="testimonials-title">{heading}</h2>
          <p>
            Recommendations from LinkedIn, signed participant feedback from GCC programmes, and
            partners who have seen the work delivered in the room. Drag or tap the next card.
          </p>
        </div>
      </div>

      <div
        className="testimonial-deck"
        aria-roledescription="carousel"
        aria-label="Testimonials"
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          drag.current = { id: event.pointerId, x: event.clientX, moved: false };
        }}
        onPointerMove={(event) => {
          if (!drag.current || drag.current.id !== event.pointerId) return;
          if (Math.abs(event.clientX - drag.current.x) > 8) drag.current.moved = true;
        }}
        onPointerUp={(event) => endDrag(event.clientX)}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        {items.map((t, i) => {
          const offset = wrapOffset(i, index, items.length);
          const visible = Math.abs(offset) <= 1;
          return (
            <article
              key={`${t.name}-${t.date}`}
              className={`testimonial-card testimonial-deck-card${offset === 0 ? " is-active" : ""}`}
              data-offset={offset}
              style={{
                zIndex: 8 - Math.abs(offset),
                opacity: visible ? (offset === 0 ? 1 : 0.42) : 0,
                transform: `translateX(calc(-50% + ${offset * 62}%)) scale(${offset === 0 ? 1 : 0.86})`,
                pointerEvents: visible ? "auto" : "none",
              }}
              aria-hidden={offset !== 0}
              aria-live={offset === 0 ? "polite" : undefined}
              onClick={() => {
                if (drag.current?.moved) return;
                if (offset === 1) go(1);
                if (offset === -1) go(-1);
              }}
            >
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
          );
        })}
      </div>

      <p className="testimonial-deck-count" aria-live="polite">
        {index + 1} / {items.length}
      </p>
    </section>
  );
}
