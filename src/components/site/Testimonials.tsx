import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/lib/site-data";

/**
 * Third-party testimonials. Pager variant for the homepage (step through the
 * full set on one page); single variant for conversion pages.
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
    return <TestimonialPager items={items} eyebrow={eyebrow} heading={heading} />;
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

function TestimonialPager({
  items,
  eyebrow,
  heading,
}: {
  items: Testimonial[];
  eyebrow: string;
  heading: string;
}) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((current) => (current + dir + items.length) % items.length);
    },
    [items.length],
  );

  const goTo = useCallback((next: number) => {
    setIndex(next);
  }, []);

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
  const t = items[index];

  return (
    <section className="section testimonial-section" aria-labelledby="testimonials-title">
      <div className="site-shell">
        <div className="section-heading">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="testimonials-title">{heading}</h2>
          <p>
            Recommendations from LinkedIn, signed participant feedback from GCC programmes, and
            partners who have seen the work delivered in the room. Step through the full set —
            it stays on this page.
          </p>
        </div>

        <div
          className="testimonial-pager"
          onTouchStart={(event) => {
            touchStartX.current = event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const start = touchStartX.current;
            const end = event.changedTouches[0]?.clientX;
            touchStartX.current = null;
            if (start == null || end == null) return;
            const delta = end - start;
            if (Math.abs(delta) < 40) return;
            go(delta < 0 ? 1 : -1);
          }}
        >
          <article
            key={`${t.name}-${index}`}
            className="testimonial-card testimonial-card-pager"
            aria-live="polite"
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

          <div className="testimonial-pager-bar">
            <button
              type="button"
              className="testimonial-pager-btn"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
            >
              <ChevronLeft aria-hidden="true" />
              Previous
            </button>
            <div className="testimonial-pager-dots" role="tablist" aria-label="Choose a testimonial">
              {items.map((item, i) => (
                <button
                  key={`${item.name}-${item.date}`}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show testimonial ${i + 1} of ${items.length}: ${item.name}`}
                  className={i === index ? "is-active" : undefined}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <p className="testimonial-pager-count" aria-live="polite">
              {index + 1} / {items.length}
            </p>
            <button
              type="button"
              className="testimonial-pager-btn"
              onClick={() => go(1)}
              aria-label="Next testimonial"
            >
              Next
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
