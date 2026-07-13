/* Resume viewer — full-page embed of the PDF served from /public, styled to
   match the terminal-home aesthetic. Reached via the /resume route; on GitHub
   Pages a direct hit loads the SPA through the 404.html fallback and lands here. */
import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import "./Resume.css";
import { ACCENTS, PREFS_STORAGE_KEY } from "../assets/terminalContent";

const RESUME_PATH = "/Jairik_McCauley_Resume.pdf";
const RESUME_FILE = "Jairik_McCauley_Resume.pdf";

/* Reads the visitor's saved accent color (chosen via ./config on the home page
   and persisted under jjrc) so the résumé chrome matches their theme. Falls
   back to the site default (lime) when nothing valid is cached. */
function cachedAccent(): string {
  if (typeof window === "undefined") return ACCENTS.lime.c;

  try {
    const stored = JSON.parse(window.localStorage.getItem(PREFS_STORAGE_KEY) || "null");
    const accent = ACCENTS[stored?.color];
    if (accent) return accent.c;
  } catch { /* unreadable storage — fall through to default */ }
  return ACCENTS.lime.c;
}

export default function Resume() {
  // Seed the --acid var from the visitor's cached favorite color (inline so it
  // overrides the CSS default with no flash); everything in the bar derives from it.
  const [accent, setAccent] = useState(ACCENTS.lime.c);

  useEffect(() => {
    setAccent(cachedAccent());
  }, []);

  return (
    <div className="rez" style={{ "--acid": accent } as CSSProperties}>
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
