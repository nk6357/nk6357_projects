const content = ["FULL-STACK", "AI", "PRODUCT", "DESIGN", "REACT", "TYPESCRIPT", "AUTOMATION", "DIGITAL EXPERIENCES"];

export function Marquee() {
  const row = content.map((item) => <span key={item}>{item}<i aria-hidden="true">✦</i></span>);
  return (
    <div className="marquee" aria-label={content.join(", ")}>
      <div className="marquee__track">
        <div className="marquee__set">{row}</div>
        <div className="marquee__set" aria-hidden="true">{row}</div>
      </div>
    </div>
  );
}

