import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site-data";

const footerLinks = [
  { label: "ClarityOS", href: "/clarityos" },
  { label: "Services", href: "/services" },
  { label: "Book a $79 Session", href: "/book-a-session" },
  { label: "Media", href: "/media" },
  { label: "Connect", href: "/connect" },
  { label: "The Architect", href: "/the-architect" },
  { label: "Frameworks", href: "/frameworks" },
  { label: "The Book", href: "/book" },
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
          {footerLinks.map((item) => (
            <Link key={item.href} to={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="footer-contact">
          <p className="footer-label">Direct</p>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <p className="footer-label footer-label-spaced">Verified channels</p>
          <a href={SITE.socials.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>

      <div className="site-shell footer-base">
        <p>© {new Date().getFullYear()} Zeeshan Sabri. All rights reserved.</p>
        <p>
          ClarityOS is proprietary positioning and methodology. <Link to="/privacy">Privacy</Link>
        </p>
      </div>

    </footer>
  );
}
