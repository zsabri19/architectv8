type GtagFn = (command: "event", name: string, params?: Record<string, string>) => void;

/** Sends a GA4 event through the gtag stream already loaded in the root document. */
export function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}

/** Sends an event at most once per browser session, so a refresh does not double count it. */
export function trackEventOnce(name: string, params?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const key = `ga4-once:${name}`;
  try {
    if (window.sessionStorage.getItem(key)) return;
    window.sessionStorage.setItem(key, "1");
  } catch {
    // Storage blocked: still send the event.
  }
  trackEvent(name, params);
}
