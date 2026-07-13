/* Keeps client-side navigation metadata aligned with the prerendered head. */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { buildSeoHead, findSeoRoute } from "../lib/seo";

// Returns an existing named meta tag or creates it when a static template did
// not include one. The shared attribute keeps the generated markup inspectable.
function namedMeta(name: string): HTMLMetaElement {
  const existing = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (existing) return existing;

  const element = document.createElement("meta");
  element.name = name;
  element.dataset.seoManaged = "true";
  document.head.appendChild(element);
  return element;
}

// Returns an existing Open Graph meta tag or creates a managed replacement.
function propertyMeta(property: string): HTMLMetaElement {
  const existing = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (existing) return existing;

  const element = document.createElement("meta");
  element.setAttribute("property", property);
  element.dataset.seoManaged = "true";
  document.head.appendChild(element);
  return element;
}

// Returns the canonical link shared by crawlers and browser navigation.
function canonicalLink(): HTMLLinkElement {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (existing) return existing;

  const element = document.createElement("link");
  element.rel = "canonical";
  element.dataset.seoManaged = "true";
  document.head.appendChild(element);
  return element;
}

// Returns the single JSON-LD graph owned by this site.
function jsonLdScript(): HTMLScriptElement {
  const existing = document.head.querySelector<HTMLScriptElement>("#site-json-ld");
  if (existing) return existing;

  const element = document.createElement("script");
  element.id = "site-json-ld";
  element.type = "application/ld+json";
  element.dataset.seoManaged = "true";
  document.head.appendChild(element);
  return element;
}

// Applies the route descriptor after every SPA pathname change. Direct visits
// already contain the same values because prerender uses buildSeoHead too.
export function useSeoHead(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    const head = buildSeoHead(findSeoRoute(pathname));

    document.title = head.title;
    namedMeta("description").content = head.description;
    namedMeta("robots").content = head.robots;
    canonicalLink().href = head.canonical;

    propertyMeta("og:type").content = head.ogType;
    propertyMeta("og:site_name").content = head.siteName;
    propertyMeta("og:title").content = head.title;
    propertyMeta("og:description").content = head.description;
    propertyMeta("og:url").content = head.canonical;
    propertyMeta("og:image").content = head.image;
    propertyMeta("og:image:alt").content = head.imageAlt;

    namedMeta("twitter:card").content = "summary_large_image";
    namedMeta("twitter:title").content = head.title;
    namedMeta("twitter:description").content = head.description;
    namedMeta("twitter:image").content = head.image;
    namedMeta("twitter:image:alt").content = head.imageAlt;

    // Escaping "<" matches the static renderer and prevents accidental script
    // termination if future authored content contains markup-like text.
    jsonLdScript().textContent = JSON.stringify(head.jsonLd).replace(/</g, "\\u003c");
  }, [pathname]);
}
