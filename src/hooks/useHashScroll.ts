/* Scrolls the page to location.hash when present (e.g. navigating to /#projects
   from a project detail page). React Router preserves the hash but does not
   scroll to the matching element on its own. */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* On mount / when the hash changes, scroll the matching id into view */
export function useHashScroll(): void {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    if (!id) return;

    // Try immediately, then briefly retry in case the section isn't painted yet
    const scrollToHash = () => {
      const el = document.getElementById(id);
      if (!el) return false;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    };

    if (scrollToHash()) return;

    const t1 = window.setTimeout(scrollToHash, 50);
    const t2 = window.setTimeout(scrollToHash, 250);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [hash, pathname]);
}
