/*
  Shared top-bar identity + nav for the sub-pages (project / topic / about /
  press detail pages). One place to edit the nav that appears on every page
  other than the home page.

  Each page passes its own `host` prompt (e.g. "jj@portfolio:~/about$") and the
  id of the nav item that should stay highlighted as "current".
*/

// Name shown next to the host prompt in the sub-page top bar
export const subIdentity = {
  whoBold: 'jairik "jj" mccauley',
  whoRest: " — software engineer"
} as const;

export type SubNavKind = "route" | "hash" | "mail";

export interface SubNavItem {
  id: string; // matched against a page's `current` to highlight the active tab
  label: string; // "./<label>" is rendered (the "./" prefix is added by CSS)
  to: string;
  kind: SubNavKind; // route = SPA <Link>; hash = home-page anchor; mail = mailto
}

export const subNav: SubNavItem[] = [
  { id: "home", label: "home", to: "/", kind: "route" },
  { id: "projects", label: "projects", to: "/#projects", kind: "hash" },
  { id: "press", label: "press", to: "/press", kind: "route" },
  { id: "about", label: "about", to: "/about", kind: "route" },
  { id: "contact", label: "contact", to: "mailto:mjairik@gmail.com", kind: "mail" }
];
