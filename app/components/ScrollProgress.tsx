import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const maximum = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maximum > 0 ? Math.min(window.scrollY / maximum, 1) : 0;
        lineRef.current?.style.setProperty("--scroll-progress", String(progress));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <div ref={lineRef} className="scroll-progress" aria-hidden="true" />;
}

