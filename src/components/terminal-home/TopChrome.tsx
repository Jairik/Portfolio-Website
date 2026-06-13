/* Fixed top chrome: the acid ribbon (escape hatch to /terminal) and the
   prompt-styled nav bar. All strings come from src/assets/terminalContent.ts. */
import { Link } from "react-router-dom";
import * as C from "../../assets/terminalContent";

/* Renders the ribbon + topbar; "config" opens the prefs modal via the callback */
export default function TopChrome({ onOpenConfig }: { onOpenConfig: () => void }) {
  return (
    <div className="topwrap">
      {/* acid ribbon with the terminal-view escape hatch */}
      <div className="ribbon">
        <span className="rmsg">{C.ribbon.messageStart}<b>{C.ribbon.messageBold}</b>{C.ribbon.messageEnd}</span>
        <Link className="rbtn" to={C.ribbon.buttonTarget}>{C.ribbon.buttonLabel}</Link>
      </div>
      {/* prompt nav bar: host, name, section anchors, config, contact */}
      <header className="topbar">
        <span className="host">{C.topbar.host}<span className="blink" /></span>
        <span className="who"><b>{C.topbar.whoBold}</b>{C.topbar.whoRest}</span>
        <nav>
          {C.navItems.map(item => <a key={item.label} href={item.target}>{item.label}</a>)}
          <a href="#" onClick={e => { e.preventDefault(); onOpenConfig(); }}>config</a>
          <a href={`mailto:${C.footer.email}`}>contact</a>
        </nav>
      </header>
    </div>
  );
}
