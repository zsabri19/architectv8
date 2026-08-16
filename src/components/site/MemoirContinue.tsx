import { SITE } from "@/lib/site-data";

/**
 * Quiet continue sheet — not a lock, not a paywall label.
 * Appears after the reader has already started the next chapter.
 */
export function MemoirContinue({
  open,
  onClose,
}: {
  open: boolean;
  onClose?: () => void;
}) {
  if (!open) return null;

  const href =
    SITE.bookUnlockUrl ||
    `mailto:${SITE.email}?subject=${encodeURIComponent("Continue the memoir")}`;

  return (
    <div className="memoir-continue" role="dialog" aria-modal="true" aria-labelledby="memoir-continue-title">
      <div className="memoir-continue-card">
        <p className="eyebrow">The next pages</p>
        <h2 id="memoir-continue-title">If this is landing, stay with it.</h2>
        <p>
          One payment, once. Then the rest of the book is yours to finish in your
          own time — no subscription, no reminder emails.
        </p>
        <a className="memoir-continue-cta" href={href}>
          Continue · {SITE.bookUnlockPrice}
        </a>
        {onClose ? (
          <button type="button" className="memoir-continue-later" onClick={onClose}>
            Finish this page first
          </button>
        ) : null}
      </div>
    </div>
  );
}
