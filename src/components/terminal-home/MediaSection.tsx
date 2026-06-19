/* Media section: every image on the site in a filterable mosaic. Images open
   the shared lightbox via their [data-lb] attributes (delegation on the root). */
import { useState } from "react";
import SectionHeading from "./SectionHeading";
import { MEDIA, MEDIA_CATS, type MediaCatId } from "../../lib/terminalHomeData";
import * as C from "../../assets/terminalContent";

/* Renders the filter tabs and the mosaic for the active category */
export default function MediaSection() {
  // Active filter tab ("all" | "projects" | "me")
  const [mediaCat, setMediaCat] = useState<MediaCatId>("all");

  // Images shown in the mosaic for the active filter tab
  const mosaicItems = MEDIA.filter(m => mediaCat === "all" || m.cat === mediaCat);

  return (
    <section id="media">
      <SectionHeading cmt={C.sections.media.cmt} title={C.sections.media.title} />
      <div className="inner">
        {/* fake find command with the live asset count */}
        <p className="media-count">
          <span className="pr">$</span> {C.media.countLine.replace("{n}", String(MEDIA.length))}
        </p>
        {/* filter tabs with live counts */}
        <div className="mediabar">
          {MEDIA_CATS.map(cat => (
            <button
              key={cat.id}
              className={mediaCat === cat.id ? "on" : ""}
              onClick={() => setMediaCat(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
        {/* mosaic: every figure is lightboxable via data-lb */}
        <div className="mosaic">
          {mosaicItems.map(m => (
            <figure
              key={m.src}
              data-lb={m.src}
              data-cap={`${m.title} — ${m.cap}`}
              role="button"
              tabIndex={0}
              aria-label={`Open ${m.title}: ${m.cap} in lightbox`}
            >
              <img src={m.src} alt={m.alt} loading="lazy" />
              <figcaption><b>{m.title}</b>{m.cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
