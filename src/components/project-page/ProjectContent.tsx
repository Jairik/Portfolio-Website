/* Right content column of a project detail page: about (short desc + long-form
   copy), optional extra sections, YouTube demo, and the screenshot grid
   (which reuses the shared lightbox via data-lb). */
import type { ProjectPageView } from "../../lib/projectPage";
import { aboutPlaceholders, projectImageAlt, projectPage } from "../../assets/projects";

/* Renders the about / demo / screenshots stack for one project */
export default function ProjectContent({ view }: { view: ProjectPageView }) {
  const { project, extra, embedUrl } = view;
  const total = project.images.length;
  const aboutBlocks = extra.about ?? [];

  return (
    <div className="pp-content">
      {/* about: short description, then long-form copy when present */}
      <div>
        <div className="sec-lbl"><span className="s">## </span>about</div>
        <p className="rd-lead">{project.desc}</p>
        {aboutBlocks.length > 0 ? (
          aboutBlocks.map((para, i) => <p key={i} className="rd-copy">{para}</p>)
        ) : (
          // Fallback when a project has no long-form about copy yet
          <div className="rd-phs">
            {aboutPlaceholders.map((ph, i) => (
              <div key={i} className="rd-ph"><span className="ex">! empty</span> — {ph}</div>
            ))}
          </div>
        )}
      </div>

      {/* optional extra labeled sections (architecture, results, ...) */}
      {(extra.sections ?? []).map((sec, i) => (
        <div key={i}>
          {sec.label && <div className="sec-lbl"><span className="s">## </span>{sec.label}</div>}
          {sec.body.map((para, j) => <p key={j} className="rd-copy">{para}</p>)}
        </div>
      ))}

      {/* demo: embedded YouTube video, only when the project has one */}
      {embedUrl && (
        <div>
          <div className="sec-lbl"><span className="s">## </span>demo</div>
          <div className="rd-demo">
            <iframe
              src={embedUrl}
              title={`${project.title} demo video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* screenshots: 2-up grid opening the lightbox, or a no-images line */}
      <div>
        <div className="sec-lbl">
          <span className="s">## </span>screenshots{total ? ` — ${total} file${total > 1 ? "s" : ""}` : ""}
        </div>
        {total > 0 ? (
          <div className="rd-shots">
            {project.images.map((im, i) => (
              <img
                key={im}
                src={im}
                alt={projectImageAlt(project.title, project.desc, i, total)}
                loading="lazy"
                data-lb={im}
                data-cap={project.title}
                role="button"
                tabIndex={0}
                aria-label={`Open ${project.title} screenshot ${i + 1} in lightbox`}
              />
            ))}
          </div>
        ) : (
          <p className="rd-noimg">
            {project.closed ? projectPage.noImagesClosed : projectPage.noImagesOpen}
          </p>
        )}
      </div>
    </div>
  );
}
