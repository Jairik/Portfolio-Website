/* Left meta rail of a project detail page: action links, the meta table,
   and the tech stack. Everything renders conditionally on the project data. */
import { Link } from "react-router-dom";
import { getTechnologyIcon } from "../../assets/experience";
import { projectPage } from "../../assets/projects";
import type { ProjectPageView } from "../../lib/projectPage";

/* Renders the links / meta / stack blocks for one project */
export default function ProjectMetaRail({ view }: { view: ProjectPageView }) {
  const { project, statusLabel, topics } = view;
  const L = projectPage.links;

  return (
    <aside className="pp-rail">
      {/* links: only the ones the project actually has, + back to home #projects */}
      <section>
        <h2 className="rail-lbl"><span className="s" aria-hidden="true">// </span>links</h2>
        <div className="rail-links">
          {project.code && (
            <a className="rail-btn primary" href={project.code} target="_blank" rel="noopener noreferrer">{L.source}</a>
          )}
          {project.video && (
            <a className="rail-btn ghost" href={project.video} target="_blank" rel="noopener noreferrer">{L.demo}</a>
          )}
          {project.demo && (
            <a className="rail-btn ghost" href={project.demo} target="_blank" rel="noopener noreferrer">{L.live}</a>
          )}
          <Link className="rail-btn back" to={L.backTarget}>{L.back}</Link>
        </div>
      </section>

      {/* meta table: date / status / award (award row only when present) */}
      <section>
        <h2 className="rail-lbl"><span className="s" aria-hidden="true">// </span>meta</h2>
        <div className="rail-meta">
          {project.date && (
            <div className="row"><span className="k">date</span><span className="v">{project.date}</span></div>
          )}
          <div className="row"><span className="k">status</span><span className="v ac">● {statusLabel}</span></div>
          {project.award && (
            <div className="row"><span className="k">award</span><span className="v">★ {project.award}</span></div>
          )}
        </div>
      </section>

      {/* stack: one pill per technology, icon pulled from the shared icon map */}
      {project.tech.length > 0 && (
        <section>
          <h2 className="rail-lbl"><span className="s" aria-hidden="true">// </span>stack</h2>
          <div className="rail-stack">
            {project.tech.map(t => {
              const icon = getTechnologyIcon(t);
              return (
                <span key={t} className="stack-item">
                  {icon && <img src={icon} alt="" />}
                  {t}
                </span>
              );
            })}
          </div>
        </section>
      )}

      {/* Every matching hub gets a descriptive canonical internal link. */}
      {topics.length > 0 && (
        <section>
          <h2 className="rail-lbl"><span className="s" aria-hidden="true">// </span>topics</h2>
          <div className="rail-stack">
            {topics.map(topic => (
              <Link key={topic.key} className="stack-item topic-link" to={topic.to}>
                {topic.label}
              </Link>
            ))}
          </div>
        </section>
      )}
    </aside>
  );
}
