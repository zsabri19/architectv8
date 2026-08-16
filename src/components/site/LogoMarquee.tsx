type Logo = { name: string; alt: string; src: string };

/**
 * Continuous, hover-pausable logo ribbon. Logos render grayscale and resolve to
 * full colour on hover. The track is duplicated so the loop is seamless.
 */
export function LogoMarquee({
  logos,
  speed = 46,
  label = "Institutions and ventures",
  reverse = false,
}: {
  logos: Logo[];
  speed?: number;
  label?: string;
  reverse?: boolean;
}) {
  const track = [...logos, ...logos];
  return (
    <div className={`logo-marquee${reverse ? " is-reverse" : ""}`} aria-label={label} role="group">
      <div className="logo-marquee-track" style={{ animationDuration: `${speed}s` }}>
        {track.map((l, i) => (
          <span
            className="logo-marquee-item"
            key={`${l.name}-${i}`}
            style={{ animationDelay: `${(i % logos.length) * 0.28}s` }}
          >
            <img src={l.src} alt={i < logos.length ? l.alt : ""} aria-hidden={i >= logos.length} loading="lazy" />
          </span>
        ))}
      </div>
    </div>
  );
}
