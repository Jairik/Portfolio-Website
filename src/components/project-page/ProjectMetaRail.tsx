/* Left meta rail of a project detail page: action links, the meta table,
   and the tech stack. Everything renders conditionally on the project data. */
import { getTechnologyIcon } from "../../assets/experience";
import { projectPage } from "../../assets/projects";
import type { ProjectPageView } from "../../lib/projectPage";

/* Renders the links / meta / stack blocks for one project */
export default function ProjectMetaRail({ view }: { view: ProjectPageView }) {
  const { project, statusLabel } = view;
  const L = projectPage.links;

  return (
    <aside className="pp-rail">
      {/* links: only the ones the project actually has, + back to the archive */}
      <div>
        <div className="rail-lbl"><span className="s">// </span>links</div>
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
          <a className="rail-btn back" href={L.backTarget}>{L.back}</a>
        </div>
      </div>

      {/* meta table: date / status / award (award row only when present) */}
      <div>
        <div className="rail-lbl"><span className="s">// </span>meta</div>
        <div className="rail-meta">
          {project.date && (
            <div className="row"><span className="k">date</span><span className="v">{project.date}</span></div>
          )}
          <div className="row"><span className="k">status</span><span className="v ac">● {statusLabel}</span></div>
          {project.award && (
            <div className="row"><span className="k">award</span><span className="v">★ {project.award}</span></div>
          )}
        </div>
      </div>

      {/* stack: one pill per technology, icon pulled from the shared icon map */}
      {project.tech.length > 0 && (
        <div>
          <div className="rail-lbl"><span className="s">// </span>stack</div>
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
        </div>
      )}
    </aside>
  );
}
