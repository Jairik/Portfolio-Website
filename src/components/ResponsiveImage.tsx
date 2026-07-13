/* Shared responsive raster image with AVIF, WebP, and original fallbacks. */
import type { CSSProperties, ImgHTMLAttributes } from "react";

import { resolveResponsiveImage, type ImageSlot } from "../lib/responsiveImage";

interface ResponsiveImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> {
  src: string;
  slot: ImageSlot;
  lightbox?: boolean;
}

// picture stays in the box tree (never display:contents) so CSS grids get one
// item per image. className/style land on picture; lightbox attrs stay on img.
export default function ResponsiveImage({
  src,
  slot,
  lightbox = false,
  loading = "lazy",
  decoding = "async",
  className,
  style,
  ...imgProps
}: ResponsiveImageProps) {
  const image = resolveResponsiveImage(src, slot);

  // Block-level picture so grids/flex parents size one wrapper, not source+img.
  const pictureStyle: CSSProperties = {
    display: "block",
    lineHeight: 0,
    maxWidth: "100%",
    ...style,
  };

  return (
    <picture className={className} style={pictureStyle}>
      {image.avifSrcSet && (
        <source type="image/avif" srcSet={image.avifSrcSet} sizes={image.sizes} />
      )}
      {image.webpSrcSet && (
        <source type="image/webp" srcSet={image.webpSrcSet} sizes={image.sizes} />
      )}
      <img
        {...imgProps}
        src={image.fallback}
        width={image.width}
        height={image.height}
        loading={loading}
        decoding={decoding}
        data-lb={lightbox ? image.lightboxSrc : undefined}
        // Width fills the picture; height/object-fit come from context CSS.
        style={{ display: "block", width: "100%" }}
      />
    </picture>
  );
}
