import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    let x = -100;
    let y = -100;
    let currentX = x;
    let currentY = y;
    let frame = 0;
    const render = () => {
      currentX += (x - currentX) * 0.18;
      currentY += (y - currentY) * 0.18;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(render);
    };
    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      cursor.dataset.visible = "true";
    };
    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      cursor.dataset.active = String(Boolean(target.closest("a, button, [data-cursor='active']")));
    };
    const onLeave = () => cursor.dataset.visible = "false";
    frame = requestAnimationFrame(render);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion]);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}
