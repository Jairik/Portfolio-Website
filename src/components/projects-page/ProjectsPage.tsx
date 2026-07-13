/* ProjectsPage — the /projects index. A single, crawlable listing of every
   project plus a row of links into the topic hubs. It intentionally reuses the
   same terminal chrome as the topic and project pages (SubTopbar, CRT overlays,
   accent handling) so it feels like part of the same "OS". Rows link straight
   to each project's README page at /projects/:slug. */
import { useRef } from "react";
import { Link } from "react-router-dom";
import "../terminal-home/TerminalHome.css"; // shared .thome tokens + CRT fx
import "../topic-page/TopicPage.css"; // reuse the tp-* header/switcher styles
import "./ProjectsPage.css"; // page-specific column list styles
import SubTopbar from "../site-chrome/SubTopbar";
import SiteFooter from "../terminal-home/SiteFooter";
import { usePageChrome } from "../../hooks/usePageChrome";
import { useVisitorPrefs } from "../../hooks/useVisitorPrefs";
import { PROJECTS, slug } from "../../lib/terminalHomeData";
import { topics, topicOrder } from "../../assets/topics";

/* Renders the projects index: chrome, topic row, and the project column list */
export default function ProjectsPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  usePageChrome("#070906"); // match the terminal background on overscroll
  useVisitorPrefs(rootRef); // carry the visitor's chosen accent across pages

  return (
    <div ref={rootRef} className="thome tpage" data-scan="on">
      {/* background layers (grid + CRT scanlines + vignette) — same as topic page */}
      <div className="tp-grid" />
      <div className="fx-scan" />
      <div className="fx-vig" />

      <SubTopbar host="jj@portfolio:~/projects$" current="projects" />

      {/* header: command comment, hollow title, intro, count badges */}
      <header className="tp-head">
        <div className="tp-head-in">
          <span className="tp-cmt"><span className="s"># </span>ls ~/projects</span>
          <h1 className="tp-title"><span className="gt">&gt; </span>Projects</h1>
          <p className="tp-intro">
            <span className="s"># </span>
            Everything I've built — full-stack apps, AI tooling, data science, and systems work. Pick a project for the full write-up, or jump into a topic.
          </p>
          <div className="tp-badges">
            <span className="tp-stat"><b>{PROJECTS.length}</b> projects</span>
            <span className="tp-stat"><b>{topicOrder.length}</b> topics</span>
          </div>
        </div>
      </header>

      {/* topic row: each entry links to its canonical /<key> hub page */}
      <div className="tp-switch-wrap">
        <div className="tp-switch-in">
          <p className="tp-prompt"><span className="pr">$</span> ls ~/topics</p>
          <div className="tp-tabs">
            {topicOrder.map(key => (
              <Link key={key} to={`/${key}/`} className="tp-tab">
                {topics[key].label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* project list: one clickable row per project, in featured -> past order */}
      <section className="pix-sec">
        <div className="pix-in">
          <span className="tp-cmt"><span className="s"># </span>every entry — click through for the full README</span>
          <div className="arch-list">
            {/* window chrome header with the entry count */}
            <div className="arch-head">
              <span className="d r" /><span className="d y" /><span className="d g" />
              <span className="ttl">~/projects — {PROJECTS.length} entries</span>
            </div>
            <div>
              {PROJECTS.map(p => (
                <Link key={p.title} className="pix-row" to={`/projects/${slug(p.title)}/`}>
                  <div className="pix-main">
                    <h2 className="pix-title">{p.title}</h2>
                    {/* short meta line: date and the first few technologies */}
                    <span className="pix-meta">
                      {p.date}{p.date && p.tech.length ? " · " : ""}
                      {p.tech.slice(0, 4).join(" / ")}
                      {p.tech.length > 4 ? ` +${p.tech.length - 4}` : ""}
                    </span>
                    <p className="pix-desc">{p.desc}</p>
                  </div>
                  {/* status badges + a shell-style "open" hint on the right */}
                  <span className="pix-side">
                    {p.group === "current" && <span className="pix-badge">running</span>}
                    {p.award && <span className="pix-badge">★ award</span>}
                    <span className="pix-cta"><span className="op">$ cd </span>readme ›</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
