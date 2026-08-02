type Logo = { name: string; alt: string; src: string };

/**
 * Continuous, hover-pausable logo ribbon. Logos render grayscale and resolve to
 * full colour on hover. The track is duplicated so the loop is seamless.
 */
export function LogoMarquee({
  logos,
  speed = 46,
  label = "Institutions and ventures",
}: {
  logos: Logo[];
  speed?: number;
  label?: string;
}) {
  const track = [...logos, ...logos];
  return (
    <div className="logo-marquee" aria-label={label} role="group">
      <div className="logo-marquee-track" style={{ animationDuration: `${speed}s` }}>
        {track.map((l, i) => (
          <span className="logo-marquee-item" key={`${l.name}-${i}`}>
            <img src={l.src} alt={i < logos.length ? l.alt : ""} aria-hidden={i >= logos.length} loading="lazy" />
          </span>
        ))}
      </div>
    </div>
  );
}
