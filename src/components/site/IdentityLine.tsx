import { IDENTITY_LINE } from "@/lib/site-data";

/**
 * Locked identity line from the ClarityOS™ brand guidelines.
 * Renders the text verbatim; never reword it at the call site.
 */
export function IdentityLine({ className = "" }: { className?: string }) {
  return <p className={`identity-line ${className}`.trim()}>{IDENTITY_LINE}</p>;
}
