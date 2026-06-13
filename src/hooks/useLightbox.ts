/* Lightbox behavior: opens from any visible [data-lb] element via DOM
   delegation on the page root, and supports ←/→/Esc keyboard navigation
   across everything that was visible when it opened. */
import { useCallback, useEffect, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent, type RefObject } from "react";

// Lightbox state: the navigable image list plus the current index
export interface LbState { list: { src: string; cap: string }[]; idx: number }

/* Owns the lightbox state; returns it plus the root click handler that opens
   it (delegation keeps every [data-lb] image clickable with zero wiring) */
export function useLightbox(rootRef: RefObject<HTMLDivElement | null>) {
  const [lb, setLb] = useState<LbState | null>(null);

  const openFromElement = useCallback((hit: HTMLElement) => {
    if (!rootRef.current) return;
    // Collect every currently-visible lightboxable element so ←/→ can navigate
    const visible = [...rootRef.current.querySelectorAll<HTMLElement>("[data-lb]")]
      .filter(el => el.offsetParent !== null);
    const list = visible.map(el => ({ src: el.dataset.lb || "", cap: el.dataset.cap || "" }));
    setLb({ list, idx: Math.max(0, visible.indexOf(hit)) });
  }, [rootRef]);

  /* Opens the lightbox from any visible [data-lb] element via click delegation */
  const handleRootClick = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const target = e.target as Element;
    // Clicking inside the open lightbox closes it
    if (target.closest(".lb")) { setLb(null); return; }
    const hit = target.closest<HTMLElement>("[data-lb]");
    if (!hit) return;
    openFromElement(hit);
  }, [openFromElement]);

  /* Mirrors click behavior for keyboard-focused [data-lb] triggers */
  const handleRootKeyDown = useCallback((e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const hit = (e.target as Element).closest<HTMLElement>("[data-lb]");
    if (!hit) return;
    e.preventDefault();
    openFromElement(hit);
  }, [openFromElement]);

  // Keyboard navigation while the lightbox is open
  useEffect(() => {
    if (!lb) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLb(null);
      if (e.key === "ArrowRight") setLb(s => s && { ...s, idx: (s.idx + 1) % s.list.length });
      if (e.key === "ArrowLeft") setLb(s => s && { ...s, idx: (s.idx - 1 + s.list.length) % s.list.length });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lb]);

  return { lb, handleRootClick, handleRootKeyDown };
}
