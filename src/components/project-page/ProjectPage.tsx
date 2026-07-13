/* ProjectPage — the per-project detail page served at /projects/:slug.
   A React port of the "README window" design prototype, built as a reusable
   template: the slug in the URL selects the project, and all content comes
   from that project's module in the shared assets directory. It reuses the
   terminal home page's palette, CRT overlays, and lightbox so every route
   feels like one machine.

   ProjectPage does the slug lookup and falls back to the site 404; the actual
   page (and all its hooks) live in ProjectPageShell, which only renders once a
   project is resolved. */
import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import "../terminal-home/TerminalHome.css"; // shared .thome tokens, CRT fx, lightbox
import "./ProjectPage.css";
import NotFound from "../NotFound";
import SubTopbar from "../site-chrome/SubTopbar";
import ProjectMetaRail from "./ProjectMetaRail";
import ProjectContent from "./ProjectContent";
import ProjectNavArrows from "./ProjectNavArrows";
import Lightbox from "../terminal-home/Lightbox";
import { usePageChrome } from "../../hooks/usePageChrome";
import { useVisitorPrefs } from "../../hooks/useVisitorPrefs";
import { useLightbox } from "../../hooks/useLightbox";
import { getProjectPageView, type ProjectPageView } from "../../lib/projectPage";
import { projectPage } from "../../assets/projects";

/* Resolves the URL slug to a project, or renders the 404 for unknown slugs */
export default function ProjectPage() {
  const { slug } = useParams();
  const view = getProjectPageView(slug ?? "");
  if (!view) return <NotFound />;
  return <ProjectPageShell view={view} />;
}

/* The resolved page: root data-attributes, page-level hooks, README window */
function ProjectPageShell({ view }: { view: ProjectPageView }) {
  // Root ref: scopes lightbox DOM queries + holds the runtime accent variable
  const rootRef = useRef<HTMLDivElement>(null);
  const { project, slug, meta, prev, next } = view;
  const P = projectPage;

  usePageChrome("#070906");
  useVisitorPrefs(rootRef); // carry the visitor's chosen accent across pages
  const { lb, handleRootClick, handleRootKeyDown } = useLightbox(rootRef);

  // Jump to the top when the slug changes via the prev / next arrows
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div
      ref={rootRef}
      className="thome ppage"
      data-scan="on"
      onClick={handleRootClick}
      onKeyDown={handleRootKeyDown}
    >
      {/* background layers (grid + CRT scanlines + vignette) */}
      <div className="pp-grid" />
      <div className="fx-scan" />
      <div className="fx-vig" />

      {/* shared lightbox for the screenshot grid */}
      <Lightbox lb={lb} />

      <SubTopbar host={P.topHost} current="projects" />

      {/* one-card body: no outer prompt — just the README window */}
      <main className="pp-main">
        <article className="rdwin">
          <div className="rd-bar">
            <span className="d r" /><span className="d y" /><span className="d g" />
            <span className="rd-ttl">jj@portfolio: ~/projects/{slug} — README.md — zsh</span>
            {project.award && <span className="rd-award">★ {project.award}</span>}
          </div>

          <div className="rd-body">
            {/* prev / next sit at the top of the card body */}
            <ProjectNavArrows prev={prev} next={next} />

            <p className="pp-prompt sm">
              <span className="pr">jj@portfolio:~/projects/{slug}$</span> <span className="cmd">cat README.md</span>
            </p>
            <h1 className="rd-title">{project.title}</h1>
            <p className="rd-meta">
              {meta.map((seg, i) => (
                <span key={i}>
                  {i > 0 && " · "}
                  {seg.to ? (
                    <Link to={seg.to} className={seg.accent ? "ac" : undefined}>{seg.label}</Link>
                  ) : (
                    <span className={seg.accent ? "ac" : undefined}>{seg.label}</span>
                  )}
                </span>
              ))}
            </p>

            <div className="rd-cols">
              <ProjectMetaRail view={view} />
              <ProjectContent view={view} />
            </div>

            <div className="rd-foot">
              {/* SPA Link so /#projects triggers useHashScroll on the home page */}
              <Link className="rd-back" to={P.footBackTarget}><span className="op">$ cd </span>{P.footBack}</Link>
              <span>exit code <b>0</b></span>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
