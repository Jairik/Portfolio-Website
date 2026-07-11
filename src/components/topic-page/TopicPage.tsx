/* TopicPage — a curated lens over the projects, served at /topics/:topic
   (and /topics → the default topic). A React port of the "Topic page" design,
   built as a reusable template: the topic key in the URL selects the topic, and
   all content is resolved from src/assets/topics.ts against the live project and
   tool data. Reuses the terminal palette, CRT overlays, and shared top bar/footer.

   TopicPage resolves the key and falls back to the site 404; the page (and its
   hooks) live in TopicPageShell, which only renders once a topic is resolved. */
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import "../terminal-home/TerminalHome.css"; // shared .thome tokens + CRT fx
import "./TopicPage.css";
import NotFound from "../NotFound";
import SubTopbar from "../site-chrome/SubTopbar";
import SiteFooter from "../terminal-home/SiteFooter";
import TopicProjectCard from "./TopicProjectCard";
import { usePageChrome } from "../../hooks/usePageChrome";
import { useVisitorPrefs } from "../../hooks/useVisitorPrefs";
import { getTopicPageView, type TopicPageView } from "../../lib/topicPage";

/* Resolves the URL topic key to a topic, or renders the 404 for unknown keys */
export default function TopicPage() {
  const { topic } = useParams();
  const view = getTopicPageView(topic);
  if (!view) return <NotFound />;
  return <TopicPageShell view={view} />;
}

/* The resolved page: root data-attributes, page-level hooks, topic sections */
function TopicPageShell({ view }: { view: TopicPageView }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { def, projects, tools, projectCount, toolCount, tabs } = view;

  usePageChrome("#070906", `${def.title} — JJ McCauley`);
  useVisitorPrefs(rootRef); // carry the visitor's chosen accent across pages

  return (
    <div ref={rootRef} className="thome tpage" data-scan="on">
      {/* background layers (grid + CRT scanlines + vignette) */}
      <div className="tp-grid" />
      <div className="fx-scan" />
      <div className="fx-vig" />

      <SubTopbar host="jj@portfolio:~/topics$" current="projects" />

      {/* header: command comment, hollow title, intro, count badges */}
      <header className="tp-head">
        <div className="tp-head-in">
          <span className="tp-cmt"><span className="s"># </span>{def.command}</span>
          <h1 className="tp-title"><span className="gt">&gt; </span>{def.title}</h1>
          <p className="tp-intro"><span className="s"># </span>{def.intro}</p>
          <div className="tp-badges">
            <span className="tp-stat"><b>{projectCount}</b> projects</span>
            <span className="tp-stat"><b>{toolCount}</b> tools</span>
          </div>
        </div>
      </header>

      {/* topic switcher: each tab links to its own /topics/<key> URL */}
      <div className="tp-switch-wrap">
        <div className="tp-switch-in">
          <p className="tp-prompt"><span className="pr">$</span> ls ~/topics</p>
          <div className="tp-tabs">
            {tabs.map(t => (
              <Link key={t.key} to={`/topics/${t.key}`} className={t.active ? "tp-tab on" : "tp-tab"}>
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* matching projects */}
      <section className="tp-sec">
        <div className="tp-sec-in">
          <span className="tp-cmt"><span className="s"># </span>matching projects — click through for the full write-up</span>
          <h2 className="tp-sec-title"><span className="gt">&gt; </span>Matches</h2>
          <div className="tp-cards">
            {projects.map(p => <TopicProjectCard key={p.title} p={p} />)}
          </div>
        </div>
      </section>

      {/* tools this topic leans on */}
      <section className="tp-sec tp-sec-tools">
        <div className="tp-sec-in">
          <span className="tp-cmt"><span className="s"># </span>which --all $TOOLS — the parts of the arsenal this topic leans on</span>
          <h2 className="tp-sec-title"><span className="gt">&gt; </span>Tools Used</h2>
          <div className="tp-tools">
            {tools.map(s => (
              <span key={s.name} className="tp-tool">
                {s.icon && <img src={s.icon} alt="" />}
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
