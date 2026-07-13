/* Resolves authored raster paths to generated responsive image metadata. */
import { generatedImageManifest } from "../assets/generatedImageManifest";

export type ImageSlot =
  | "project-grid"
  | "project-hero"
  | "topic-card"
  | "mosaic"
  | "avatar"
  | "thumbnail";

export interface ResolvedImage {
  fallback: string;
  width?: number;
  height?: number;
  avifSrcSet?: string;
  webpSrcSet?: string;
  sizes: string;
  lightboxSrc: string;
}

const SLOT_SIZES: Record<ImageSlot, string> = {
  "project-grid": "(max-width: 480px) 100vw, 50vw",
  "project-hero": "(max-width: 820px) 100vw, 50vw",
  "topic-card": "(max-width: 640px) 100vw, 320px",
  mosaic: "(max-width: 640px) 50vw, 25vw",
  avatar: "120px",
  thumbnail: "96px"
};

// Converts generated variants into the browser's "url width" srcset syntax.
function sourceSet(variants: Array<{ src: string; width: number }>): string | undefined {
  if (variants.length === 0) return undefined;
  return variants.map(variant => `${variant.src} ${variant.width}w`).join(", ");
}

// Returns generated sources when available and a safe original-file fallback
// for assets that are intentionally outside the generation pipeline.
export function resolveResponsiveImage(src: string, slot: ImageSlot): ResolvedImage {
  const entry = generatedImageManifest[src];
  if (!entry) {
    return {
      fallback: src,
      sizes: SLOT_SIZES[slot],
      lightboxSrc: src
    };
  }

  const largestWebp = entry.variants.webp.at(-1)?.src;
  return {
    fallback: src,
    width: entry.width,
    height: entry.height,
    avifSrcSet: sourceSet(entry.variants.avif),
    webpSrcSet: sourceSet(entry.variants.webp),
    sizes: SLOT_SIZES[slot],
    lightboxSrc: largestWebp ?? src
  };
}
