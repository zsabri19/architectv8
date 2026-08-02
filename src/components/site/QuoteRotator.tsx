import { useEffect, useState } from "react";
import { SIGNATURE_QUOTES } from "@/lib/quotes-data";

/**
 * Rotates the signature quote set with a cross-fade. Pauses on hover/focus and
 * respects prefers-reduced-motion (no auto-advance, first quote shown).
 */
export function QuoteRotator({ interval = 5200 }: { interval?: number }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || paused) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % SIGNATURE_QUOTES.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [interval, paused]);

  const quote = SIGNATURE_QUOTES[index];

  return (
    <div
      className="quote-rotator"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-live="polite"
    >
      <span className="quote-rotator-mark" aria-hidden="true">
        “
      </span>
      <blockquote key={quote.id} className="quote-rotator-text">
        {quote.text}
      </blockquote>
      <div className="quote-rotator-dots" role="tablist" aria-label="Signature quotes">
        {SIGNATURE_QUOTES.map((q, i) => (
          <button
            key={q.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Quote ${i + 1}`}
            className={`quote-rotator-dot${i === index ? " is-active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
