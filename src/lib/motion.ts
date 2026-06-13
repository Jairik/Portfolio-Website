/* Shared animation primitives for the terminal home page: the glyph pools
   that effects draw characters from, and the reduced-motion check that gates
   every JS-driven animation on the site. */

// Characters cycled through while the hero name "decrypts" into place
export const SCRAMBLE_GLYPHS = "▓▒░<>/\\[]{}=+*#@%&JAIRKMCULEY";

// Characters used by the cursor trail and click-burst particles
export const TRAIL_GLYPHS = "01<>/{}$#%&*+=;";

/* Honors the visitor's reduced-motion preference (gates every JS animation) */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
