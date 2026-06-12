/* Reveal-on-scroll behavior for the terminal home page. */
import { useEffect, type RefObject } from "react";

/* Fades in every .rv element under the root the first time it scrolls into view */
export function useRevealOnScroll(rootRef: RefObject<HTMLDivElement | null>): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // Each element animates once (CSS handles the transition), then is unobserved
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.1 });
    root.querySelectorAll(".rv").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
}
