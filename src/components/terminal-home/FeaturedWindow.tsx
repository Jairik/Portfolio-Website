/* Featured project poster: window chrome, main shot + filmstrip, info column. */
import { useState } from "react";
import { Link } from "react-router-dom";
import TechChips from "./TechChips";
import ProjectLinks from "./ProjectLinks";
import ResponsiveImage from "../ResponsiveImage";
import { slug, type HomeProject } from "../../lib/terminalHomeData";
import { projectImageAlt } from "../../assets/projects";

/* Renders one featured project window with a clickable screenshot filmstrip */
export default function FeaturedWindow({ p }: { p: HomeProject }) {
  // Index of the screenshot currently shown as the main image
  const [mainIdx, setMainIdx] = useState(0);

  return (
    <article className="pwin rv">
      {/* window chrome: traffic lights, fake path, optional award badge */}
      <div className="bar">
        <span className="d r" /><span className="d y" /><span className="d g" />
        <span className="ttl">~/projects/{slug(p.title)} — {p.date}</span>
        {p.award && <span className="award">★ {p.award}</span>}
      </div>
      <div className="body">
        {/* screenshot pane: clicking the main image opens the lightbox */}
        <div className="pshot">
          <ResponsiveImage
            className="main"
            src={p.images[mainIdx]}
            slot="project-hero"
            lightbox
            alt={projectImageAlt(p.title, p.desc, mainIdx, p.images.length)}
            data-cap={p.title}
            role="button"
            tabIndex={0}
            aria-label={`Open ${p.title} screenshot ${mainIdx + 1} in lightbox`}
            style={{ cursor: "zoom-in" }}
          />
          <span className="count">IMG {mainIdx + 1}/{p.images.length}</span>
          {p.images.length > 1 && (
            <div className="strip">
              {p.images.map((im, j) => (
                <button
                  key={im}
                  className={j === mainIdx ? "on" : ""}
                  aria-label={`screenshot ${j + 1}`}
                  onClick={() => setMainIdx(j)}
                >
                  <ResponsiveImage src={im} slot="thumbnail" alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        {/* info column: date, title, description, tech pills, links */}
        <div className="pinfo">
          <span className="pdate">{p.date}</span>
          <h3>
            <Link to={`/projects/${slug(p.title)}/`}>{p.title}</Link>
          </h3>
          <p className="pdesc">{p.desc}</p>
          <TechChips tech={p.tech} />
          <ProjectLinks p={p} />
        </div>
      </div>
    </article>
  );
}
