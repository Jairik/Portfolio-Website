/* Sticky top bar shared by every sub-page (project / topic / about / press).
   Identity + nav come from src/assets/siteChrome.ts; each page passes its own
   `host` prompt and the `current` nav id to highlight. Requires a .thome root
   for the palette tokens; styles live in site-chrome.css. */
import { Link } from "react-router-dom";
import { subIdentity, subNav } from "../../assets/siteChrome";
import "./site-chrome.css";

export default function SubTopbar({ host, current }: { host: string; current: string }) {
  return (
    <header className="sub-top">
      <span className="sub-host">{host}</span>
      <span className="sub-who"><b>{subIdentity.whoBold}</b>{subIdentity.whoRest}</span>
      <nav>
        {subNav.map(item => {
          const cls = item.id === current ? "on" : undefined;
          // route/hash -> SPA <Link> (hash scroll handled by useHashScroll on home);
          // mail -> plain <a>
          return item.kind === "mail"
            ? <a key={item.id} href={item.to} className={cls}>{item.label}</a>
            : <Link key={item.id} to={item.to} className={cls}>{item.label}</Link>;
        })}
      </nav>
    </header>
  );
}
