import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV } from "@/lib/site-data";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const links = NAV;

  return (
    <>
      <header className="site-header">
        <div className="site-shell header-inner">
          <Link className="wordmark" to="/" aria-label="Zeeshan Sabri home">
            <span className="wordmark-name">Zeeshan Sabri</span>
            <span className="wordmark-role">Crisis-to-Clarity Architect</span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {links.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="nav-link"
                activeProps={{ className: "nav-link is-active" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link className="header-cta" to="/book-a-session">
            Book $79 Session
          </Link>

          <button
            className="menu-trigger"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      <div
        id="mobile-navigation"
        className={`mobile-nav-panel${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <nav className="site-shell mobile-nav" aria-label="Mobile navigation">
          {NAV.map((item, index) => (
            <Link
              key={item.href}
              to={item.href}
              tabIndex={open ? 0 : -1}
              className="mobile-nav-link"
              activeProps={{ className: "mobile-nav-link is-active" }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
          <div className="mobile-nav-footer">
            <Link to="/book-a-session" tabIndex={open ? 0 : -1}>
              Book $79 Session
            </Link>
            <Link to="/connect" tabIndex={open ? 0 : -1}>
              Enterprise enquiry
            </Link>
            <Link to="/the-architect" tabIndex={open ? 0 : -1}>
              The Architect
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
