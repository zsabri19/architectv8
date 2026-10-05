import { ARTICLES, FRAMEWORKS, SITE, canonicalUrl } from "@/lib/site-data";

/**
 * Sitewide structured data. Every value here already appears on the site
 * (footer, press kit, root Person node). Do not add claims that are not on a page.
 */
export const ORGANIZATION_ID = `https://${SITE.domain}/#organization`;
export const PERSON_ID = `https://${SITE.domain}/#zeeshan-sabri`;

export const organizationNode = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "Global Markets Technologies",
  alternateName: "GMT",
  legalName: "Global Markets Technologies LLC",
  url: canonicalUrl("/"),
  email: SITE.email,
  telephone: "+96877074345",
  // The GMT logo already shown in the ventures logo strip. No street address: the site does not
  // state a company address (press kit "Based in Muscat" describes Zeeshan, not GMT).
  logo: { "@type": "ImageObject", url: canonicalUrl("/assets/gmt.png") },
  founder: { "@id": PERSON_ID },
};

/** Shared author/publisher references for Article nodes. */
export const authorRef = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE.name,
  url: canonicalUrl("/the-architect"),
};
export const publisherRef = { "@id": ORGANIZATION_ID };

const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

/** "September 2026" -> "2026-09"; "2025" -> "2025"; ISO input is returned as-is. */
export function isoDate(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const v = value.trim();
  if (/^\d{4}(-\d{2}(-\d{2})?)?$/.test(v)) return v;
  const m = v.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (m) {
    const idx = MONTHS.indexOf(m[1].toLowerCase());
    if (idx >= 0) return `${m[2]}-${String(idx + 1).padStart(2, "0")}`;
  }
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

/** Labels match the existing nav, footer, and page H1/title wording. */
const PAGE_NAMES: Record<string, string> = {
  "/the-architect": "The Architect",
  "/clarityos": "ClarityOS",
  "/frameworks": "Frameworks",
  "/services": "Services",
  "/insights": "Insights",
  "/media": "Media",
  "/newsletter": "The Clarity Dispatch",
  "/connect": "Connect",
  "/book-a-session": "Book a Session",
  "/organizational-development": "Organizational Development",
  "/executive-coaching": "Executive Coaching & Advisory",
  "/personal-development-framework": "Personal Development Framework",
  "/press": "Press Kit",
  "/privacy": "Privacy",
};

/** BreadcrumbList items for a React route path, or null when the path is not a known page. */
export function breadcrumbTrail(pathname: string): { name: string; path: string }[] | null {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return null;
  const home = { name: "Home", path: "/" };
  if (PAGE_NAMES[path]) return [home, { name: PAGE_NAMES[path], path }];
  const insight = path.match(/^\/insights\/([^/]+)$/);
  if (insight) {
    const a = ARTICLES.find((x) => x.slug === insight[1]);
    return a ? [home, { name: "Insights", path: "/insights" }, { name: a.title, path }] : null;
  }
  const fw = path.match(/^\/frameworks\/([^/]+)$/);
  if (fw) {
    const f = FRAMEWORKS.find((x) => x.slug === fw[1]);
    return f ? [home, { name: "Frameworks", path: "/frameworks" }, { name: f.title, path }] : null;
  }
  return null;
}

export function breadcrumbJsonLd(pathname: string): string | null {
  const trail = breadcrumbTrail(pathname);
  if (!trail) return null;
  return safeJson({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  });
}

/** JSON for an inline <script type="application/ld+json">; escapes "<" so text can never close the tag. */
export function safeJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
