import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useReveal() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reducedMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.dataset.visible = "true");
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    const observeNode = (node: Node) => {
      if (!(node instanceof HTMLElement)) return;
      if (node.matches("[data-reveal]:not([data-visible])")) observer.observe(node);
      node.querySelectorAll<HTMLElement>("[data-reveal]:not([data-visible])").forEach((child) => observer.observe(child));
    };
    nodes.forEach((node) => observer.observe(node));
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach(observeNode));
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [reducedMotion]);
}
