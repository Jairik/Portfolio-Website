/* Prev / next row at the top of a project README body. Order matches the
   home-page project list (featured → current → past) and wraps at the ends. */
import { Link } from "react-router-dom";
import { projectPage } from "../../assets/projects";
import type { ProjectNeighbor } from "../../lib/projectPage";

/* Builds the accessible label, swapping in the neighbor project's title */
function ariaLabel(template: string, title: string): string {
  return template.replace("{title}", title);
}

/* Renders the prev / next links as a top-of-body navigation row */
export default function ProjectNavArrows({
  prev,
  next
}: {
  prev: ProjectNeighbor;
  next: ProjectNeighbor;
}) {
  const P = projectPage;

  return (
    <nav className="pp-navrow" aria-label="Project navigation">
      <Link
        className="pp-nav prev"
        to={prev.to}
        aria-label={ariaLabel(P.prevAria, prev.title)}
        title={prev.title}
      >
        <span className="pp-nav-arrow" aria-hidden="true">‹</span>
        <span className="pp-nav-copy">
          <span className="pp-nav-lbl">{P.prevLabel}</span>
          <span className="pp-nav-title">{prev.title}</span>
        </span>
      </Link>
      <Link
        className="pp-nav next"
        to={next.to}
        aria-label={ariaLabel(P.nextAria, next.title)}
        title={next.title}
      >
        <span className="pp-nav-copy">
          <span className="pp-nav-lbl">{P.nextLabel}</span>
          <span className="pp-nav-title">{next.title}</span>
        </span>
        <span className="pp-nav-arrow" aria-hidden="true">›</span>
      </Link>
    </nav>
  );
}
