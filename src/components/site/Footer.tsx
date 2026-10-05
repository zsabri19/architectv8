import { Link } from "@tanstack/react-router";
import { ARTICLES, FRAMEWORKS, SITE } from "@/lib/site-data";

const footerLinks = [
  { label: "ClarityOS", href: "/clarityos" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/insights" },
  { label: "Book a $79 Session", href: "/book-a-session" },
  { label: "Media", href: "/media" },
  { label: "Connect", href: "/connect" },
  { label: "The Architect", href: "/the-architect" },
  { label: "Frameworks", href: "/frameworks" },
  { label: "The Book", href: "/book" },
  { label: "Organizational Development", href: "/organizational-development" },
  { label: "Executive Coaching", href: "/executive-coaching" },
  { label: "Personal Development Framework", href: "/personal-development-framework" },
  { label: "Press Kit", href: "/press" },
  { label: "The Clarity Dispatch", href: "/newsletter" },
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-grid">
        <div className="footer-intro">
          <p className="eyebrow on-dark">Clarity before installation</p>
          <h2>The Human OS before the System OS.</h2>
          <p>
            Zeeshan Sabri is the Crisis-to-Clarity Architect and founder of ClarityOS — a
            methodology for strengthening the human layer beneath governance, technology, and
            transformation.
          </p>
        </div>

        <div className="footer-links" aria-label="Footer navigation">
          {footerLinks.map((item) =>
            item.href === "/book" ? (
              <a key={item.href} href="/memoir/index.html">
                {item.label}
              </a>
            ) : (
              <Link key={item.href} to={item.href}>
                {item.label}
              </Link>
            ),
          )}
        </div>

        <div className="footer-contact">
          <p className="footer-label">Direct</p>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href="tel:+96877074345">{SITE.phone}</a>
          <p className="footer-label footer-label-spaced">Verified channels</p>
          <a href={SITE.socials.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>

      <nav className="site-shell footer-insights" aria-label="Frameworks">
        <p className="footer-label">
          <Link to="/frameworks">Frameworks</Link>
        </p>
        <ul>
          {FRAMEWORKS.map((f) => (
            <li key={f.slug}>
              <Link to="/frameworks/$slug" params={{ slug: f.slug }}>
                {f.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="site-shell footer-insights" aria-label="Insights">
        <p className="footer-label">
          <Link to="/insights">Insights</Link>
        </p>
        <ul>
          {ARTICLES.map((a) => (
            <li key={a.slug}>
              <Link to="/insights/$slug" params={{ slug: a.slug }}>
                {a.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="site-shell footer-base">
        <p>© {new Date().getFullYear()} Zeeshan Sabri. All rights reserved.</p>
        <p>
          ClarityOS is proprietary positioning and methodology. <Link to="/privacy">Privacy</Link>
        </p>
      </div>
    </footer>
  );
}
