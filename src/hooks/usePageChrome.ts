/* Page-level chrome owned by the terminal home page while it is mounted. */
import { useEffect } from "react";

/* Sets the body background on mount, restoring the previous value on unmount */
export function usePageChrome(background: string): void {
  useEffect(() => {
    // Match the page bg so overscroll areas don't flash the default color
    const prevBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = background;
    return () => {
      document.body.style.backgroundColor = prevBg;
    };
  }, [background]);
}
