/* PressPage — "In the Press", served at /press. A React port of the "Press page"
   design: a single terminal window listing the coverage from the live
   src/assets/stories.ts data (articleItems). The stat badges (stories / sources /
   latest) are derived from that same list, so adding an article updates them. */
import { useRef } from "react";
import "../terminal-home/TerminalHome.css"; // shared .thome tokens + CRT fx
import "./PressPage.css";
import SubTopbar from "../site-chrome/SubTopbar";
import { usePageChrome } from "../../hooks/usePageChrome";
import { useVisitorPrefs } from "../../hooks/useVisitorPrefs";
import { articleItems, type ArticleItem } from "../../assets/stories";

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/* Parses a "MM/DD/YYYY" string into a Date (defensive against blanks) */
function parseDate(mdY: string): Date {
  const [m, d, y] = mdY.split("/").map(Number);
  return new Date(y || 1970, (m || 1) - 1, d || 1);
}

/* Most-recent article date, formatted lowercase "jun 2026" */
function latestLabel(items: ArticleItem[]): string {
  if (!items.length) return "—";
  const latest = items.reduce((a, b) => (parseDate(b.date) > parseDate(a.date) ? b : a));
  const dt = parseDate(latest.date);
  return `${MONTHS[dt.getMonth()]} ${dt.getFullYear()}`;
}

/* Hostname shown under each story ("hub.salisbury.edu") */
function hostOf(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export default function PressPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  usePageChrome("#070906");
  useVisitorPrefs(rootRef); // carry the visitor's chosen accent across pages

  const stories = articleItems.length;
  const sources = new Set(articleItems.map(a => a.source)).size;
  const latest = latestLabel(articleItems);

  return (
    <div ref={rootRef} className="thome prpage" data-scan="on">
      {/* background layers (grid + CRT scanlines + vignette) */}
      <div className="pr-grid" />
      <div className="fx-scan" />
      <div className="fx-vig" />

      <SubTopbar host="jj@portfolio:~/press$" current="press" />

      <main className="pr-main">
        <div className="pr-win">
          <div className="pr-bar">
            <span className="d r" /><span className="d y" /><span className="d g" />
            <span className="pr-wttl">jj@portfolio: ~/press — zsh — live session</span>
          </div>

          <div className="pr-body">
            <p className="pr-prompt">
              <span className="pr">jj@portfolio:~$</span> <span className="cmd">whoami --press</span>
            </p>

            <h1 className="pr-title"><span className="hollow">IN THE</span> <span className="acid">PRESS</span></h1>

            <p className="pr-lead">
              <span className="s"># </span>Stories, awards, and features covering my work — from hackathon
              wins to department honors. <b>Updated as they land.</b>
            </p>

            <div className="pr-stats">
              <span className="pr-stat">stories <b>{stories}</b></span>
              <span className="pr-stat">sources <b>{sources}</b></span>
              <span className="pr-stat">latest <b>{latest}</b></span>
            </div>

            <p className="pr-prompt pr-cat">
              <span className="pr">jj@portfolio:~$</span> <span className="cmd">cat ~/press/index.json</span>
            </p>

            <nav className="pr-list" aria-label="Press stories">
              {articleItems.map(a => (
                <a
                  key={a.linkToArticle}
                  href={a.linkToArticle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pr-item"
                >
                  <img
                    className={a.sourceImgPath.endsWith(".svg") ? "pr-ico svg" : "pr-ico"}
                    src={a.sourceImgPath}
                    alt={`${a.source} logo`}
                    loading="lazy"
                  />
                  <span className="pr-info">
                    <span className="pr-head">{a.heading}</span>
                    <span className="pr-src"><span className="op">$ open </span>{hostOf(a.linkToArticle)}</span>
                  </span>
                  <span className="pr-read">read →</span>
                </a>
              ))}
            </nav>

            <div className="pr-foot">
              <a className="pr-cd" href="https://jjmccauley.com"><span className="op">$ cd </span>jjmccauley.com</a>
              <span>exit code <b>0</b></span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
