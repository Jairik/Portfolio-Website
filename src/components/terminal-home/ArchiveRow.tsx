/* Archive row: collapsed header with badges, expanding to a README-style detail. */
import { useState } from "react";
import TechChips from "./TechChips";
import ProjectLinks from "./ProjectLinks";
import { slug, type HomeProject } from "../../lib/terminalHomeData";
import * as C from "../../assets/terminalContent";

/* Renders one expandable project row in the ~/history archive tree */
export default function ArchiveRow({ p }: { p: HomeProject }) {
  // Whether this row's detail panel is expanded
  const [open, setOpen] = useState(false);

  return (
    <div className={`arow rv${open ? " open" : ""}`}>
      {/* collapsed header: twisty, title, meta line, status badges */}
      <button className="head" aria-expanded={open} onClick={() => setOpen(o => !o)}>
        <span className="tw">▶</span>
        <span className="at">
          <h3>{p.title}</h3>
          <span className="am">
            {p.date} · {p.tech.slice(0, 4).join(" / ")}{p.tech.length > 4 ? ` +${p.tech.length - 4}` : ""}
          </span>
        </span>
        <span className="tags">
          {p.group === "current" && <span className="badge">running</span>}
          {p.award && <span className="badge">★ award</span>}
          {p.closed && <span className="badge dim">closed src</span>}
          {p.images.length > 0 && <span className="badge dim">{p.images.length} img</span>}
        </span>
      </button>
      {/* expanded detail: fake README cat, description, gallery, tech, links */}
      <div className="detail">
        <p className="dline"><span className="pr">$</span> cat ~/projects/{slug(p.title)}/README.md</p>
        <p className="ddesc">{p.desc}</p>
        {p.images.length > 0 ? (
          <div className="gal">
            {p.images.map((im, j) => (
              <img
                key={im}
                src={im}
                alt={`${p.title} screenshot`}
                loading="lazy"
                data-lb={im}
                data-cap={p.title}
                role="button"
                tabIndex={0}
                aria-label={`Open ${p.title} screenshot ${j + 1} in lightbox`}
              />
            ))}
          </div>
        ) : (
          <p className="noimg">
            {C.archiveNoImagery.prefix}{p.closed ? C.archiveNoImagery.closedSource : C.archiveNoImagery.openSource}
          </p>
        )}
        <TechChips tech={p.tech} />
        <ProjectLinks p={p} style={{ marginTop: 16 }} />
      </div>
    </div>
  );
}
