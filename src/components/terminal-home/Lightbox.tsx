/* Lightbox overlay: shows the current image + caption from the lightbox
   state owned by useLightbox (which also handles opening, keyboard nav,
   and the click-anywhere-to-close delegation on the page root). */
import type { LbState } from "../../hooks/useLightbox";

/* Renders the overlay; visibility is driven purely by whether lb is set */
export default function Lightbox({ lb }: { lb: LbState | null }) {
  return (
    <div className={`lb${lb ? " on" : ""}`}>
      {lb && (
        <>
          <img src={lb.list[lb.idx].src} alt="" />
          <div className="cap">{lb.list[lb.idx].cap}</div>
          <div className="keys"><b>←</b><b>→</b> NAVIGATE · <b>ESC</b> CLOSE</div>
        </>
      )}
    </div>
  );
}
