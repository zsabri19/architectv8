import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { ARTICLES } from "@/lib/site-data";

const dismissKey = (slug: string) => `gmt:just-published-dismissed:${slug}`;

/** Latest Insights entry that carries a listing badge (e.g. "New"). */
export function latestBadgeArticle() {
  return ARTICLES.find((article) => Boolean(article.badge));
}

/**
 * Slim “Just published” bar under the site header on `/` only.
 * Dismiss persists in localStorage keyed by article slug so a new badge
 * article surfaces again after the previous one was dismissed.
 */
export function JustPublishedBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const article = latestBadgeArticle();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!article) return;
    try {
      if (localStorage.getItem(dismissKey(article.slug)) === "1") {
        setDismissed(true);
      }
    } catch {
      // private mode / blocked storage — keep bar visible
    }
  }, [article]);

  if (pathname !== "/" || !article || dismissed) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(dismissKey(article.slug), "1");
    } catch {
      // ignore
    }
    setDismissed(true);
  };

  return (
    <aside className="just-published-bar" aria-label="Just published">
      <div className="site-shell just-published-inner">
        <p className="just-published-copy">
          <span className="just-published-label">Just published</span>
          <span className="just-published-sep" aria-hidden="true">
            ·
          </span>
          <span className="just-published-title">{article.title}</span>
        </p>
        <Link
          className="just-published-cta"
          to="/insights/$slug"
          params={{ slug: article.slug }}
        >
          Read
          <ArrowRight aria-hidden="true" />
        </Link>
        <button
          type="button"
          className="just-published-dismiss"
          aria-label="Dismiss announcement"
          onClick={dismiss}
        >
          <X aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
