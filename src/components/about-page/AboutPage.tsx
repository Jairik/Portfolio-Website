/* AboutPage — the "extended cut" readme, served at /about. The intro prose is
   live from constantVars.aboutParagraphs (shared with the home page's Readme
   section); the extra sections come from src/assets/aboutContent.ts. Reuses the
   terminal palette, shared top bar, and site footer. */
import { useRef } from "react";
import "../terminal-home/TerminalHome.css"; // shared .thome tokens + CRT fx
import "./AboutPage.css";
import SubTopbar from "../site-chrome/SubTopbar";
import SiteFooter from "../terminal-home/SiteFooter";
import { usePageChrome } from "../../hooks/usePageChrome";
import { useVisitorPrefs } from "../../hooks/useVisitorPrefs";
import { aboutParagraphs } from "../../assets/constantVars";
import { renderAboutParagraph } from "../../lib/aboutText";
import { aboutPage, aboutSections } from "../../assets/aboutContent";

export default function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  usePageChrome("#070906", "About — JJ McCauley");
  useVisitorPrefs(rootRef); // carry the visitor's chosen accent across pages

  return (
    <div ref={rootRef} className="thome apage" data-scan="on">
      {/* background layers (grid + CRT scanlines + vignette) */}
      <div className="ap-grid" />
      <div className="fx-scan" />
      <div className="fx-vig" />

      <SubTopbar host={aboutPage.host} current="about" />

      {/* header */}
      <header className="ap-head">
        <div className="ap-head-in">
          <span className="ap-cmt"><span className="s"># </span>{aboutPage.headerCommand}</span>
          <h1 className="ap-title"><span className="gt">&gt; </span>{aboutPage.title}</h1>
        </div>
      </header>

      {/* intro prose (live, shared with the home page's Readme) */}
      <section className="ap-intro">
        <p className="ap-prompt">
          <span className="pr">{aboutPage.whoami.host}</span> <span className="cmd">{aboutPage.whoami.command}</span>
        </p>
        {aboutParagraphs.map((p, i) => <p key={i} className="ap-prose">{renderAboutParagraph(p)}</p>)}
      </section>

      {/* extended sections from aboutContent.ts */}
      <section className="ap-sections">
        {aboutSections.map(sec => (
          <div key={sec.file} className="ap-sec">
            <p className="ap-sec-cmd"><span className="pr">$</span> cat {sec.file}</p>
            <h2 className="ap-sec-title"><span className="gt">&gt; </span>{sec.title}</h2>
            {sec.body && sec.body.length > 0 ? (
              sec.body.map((para, i) => <p key={i} className="ap-prose">{para}</p>)
            ) : (
              // Fallback when a section has no body yet — keeps the page layout stable
              <div className="ap-ph"><span className="ex">! empty</span> — {sec.placeholder}</div>
            )}
          </div>
        ))}
      </section>

      <SiteFooter />
    </div>
  );
}
