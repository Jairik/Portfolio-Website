/* Page-level chrome owned by the terminal home page while it is mounted. */
import { useEffect } from "react";

/* Sets the body background + document title on mount, restoring both on unmount */
export function usePageChrome(background: string, title: string): void {
  useEffect(() => {
    // Match the page bg so overscroll areas don't flash the default color
    const prevBg = document.body.style.backgroundColor;
    const prevTitle = document.title;
    document.body.style.backgroundColor = background;
    document.title = title;
    return () => {
      document.body.style.backgroundColor = prevBg;
      document.title = prevTitle;
    };
  }, [background, title]);
}
