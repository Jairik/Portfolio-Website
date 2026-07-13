/* One project card in a topic page's "Matches" grid: a mini terminal window
   with the project's first screenshot, meta, status badges, and a link through
   to its full /projects/<slug> detail page. All data is live from the project. */
import { Link } from "react-router-dom";
import { slug, type HomeProject } from "../../lib/terminalHomeData";
import { projectImageAlt } from "../../assets/projects";
import ResponsiveImage from "../ResponsiveImage";

export default function TopicProjectCard({ p }: { p: HomeProject }) {
  const s = slug(p.title);
  const img = p.images[0];

  return (
    <article className="tp-card">
      <div className="tp-card-bar">
        <span className="d r" /><span className="d y" /><span className="d g" />
        <span className="tp-card-path">~/projects/{s}</span>
      </div>

      {img ? (
        <div className="tp-card-shot">
          <ResponsiveImage
            src={img}
            slot="topic-card"
            alt={projectImageAlt(p.title, p.desc, 0, p.images.length)}
          />
        </div>
      ) : (
        <div className="tp-card-noimg">
          <span className="ex">!&nbsp;</span>no images — this one lives in the code
        </div>
      )}

      <div className="tp-card-body">
        {p.date && <span className="tp-card-date">{p.date}</span>}
        <h3 className="tp-card-title">{p.title}</h3>
        <p className="tp-card-desc">{p.desc}</p>
        <div className="tp-card-badges">
          {p.award && <span className="tp-badge acid">★ {p.award}</span>}
          {p.current && <span className="tp-badge acid">running</span>}
          {p.closed && <span className="tp-badge mut">closed src</span>}
        </div>
      </div>

      <Link className="tp-card-cta" to={`/projects/${s}/`}><span className="op">$ </span>cat README →</Link>
    </article>
  );
}
