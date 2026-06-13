/* Resume viewer — full-page embed of the PDF served from /public, styled to
   match the terminal-home aesthetic. Reached via the /resume route; on GitHub
   Pages a direct hit loads the SPA through the 404.html fallback and lands here. */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Resume.css";

const RESUME_PATH = "/Jairik_McCauley_Resume.pdf";
const RESUME_FILE = "Jairik_McCauley_Resume.pdf";

export default function Resume() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "résumé · JJ McCauley";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="rez">
      <header className="rez-bar">
        <Link className="rez-home" to="/" aria-label="Back to home">
          <span className="rez-prompt">jj@portfolio</span>
          <span className="rez-sep">:</span>
          <span className="rez-path">~/resume</span>
          <span className="rez-cur" />
        </Link>

        <nav className="rez-actions" aria-label="Résumé actions">
          <a className="rez-btn" href={RESUME_PATH} target="_blank" rel="noreferrer">
            <span className="rez-arrow">&gt;</span> open <span className="rez-arrow">↗</span>
          </a>
          <a className="rez-btn rez-btn--go" href={RESUME_PATH} download={RESUME_FILE}>
            <span className="rez-arrow">&gt;</span> download .pdf
          </a>
        </nav>
      </header>

      <main className="rez-stage" aria-label="Résumé document">
        <object className="rez-doc" data={`${RESUME_PATH}#view=FitH`} type="application/pdf">
          {/* Fallback for browsers (often mobile) that can't inline-render PDFs */}
          <div className="rez-fallback">
            <p className="rez-fallback-head">// inline preview unavailable on this device</p>
            <p className="rez-fallback-sub">
              Your browser can't render the PDF here. Grab it directly instead:
            </p>
            <div className="rez-fallback-actions">
              <a className="rez-btn" href={RESUME_PATH} target="_blank" rel="noreferrer">
                <span className="rez-arrow">&gt;</span> open in new tab <span className="rez-arrow">↗</span>
              </a>
              <a className="rez-btn rez-btn--go" href={RESUME_PATH} download={RESUME_FILE}>
                <span className="rez-arrow">&gt;</span> download .pdf
              </a>
            </div>
          </div>
        </object>
      </main>
    </div>
  );
}
