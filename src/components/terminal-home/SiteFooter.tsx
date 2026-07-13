/* Footer: the giant mailto, the social "$ open" buttons from constantVars.ts,
   and the fine-print line from terminalContent.ts. */
import { Link } from "react-router-dom";

import { socialItems } from "../../assets/constantVars";
import { topics, topicOrder } from "../../assets/topics";
import * as C from "../../assets/terminalContent";

/* Renders the footer; external social links open in a new tab */
export default function SiteFooter() {
  return (
    <footer>
      <div className="yell">{C.footer.yell}</div>
      <a className="mail" href={`mailto:${C.footer.email}`}>{C.footer.email}</a>
      {/* Canonical topic hubs provide a crawlable path into each expertise area. */}
      <nav className="topics" aria-label="Project topics">
        {topicOrder.map(key => (
          <Link key={key} to={`/${key}/`}>{topics[key].title}</Link>
        ))}
      </nav>
      <div className="soc">
        {socialItems.map(s => (
          <a
            key={s.label}
            href={s.link}
            {...(s.link.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {s.label}
          </a>
        ))}
      </div>
      <div className="fine">{C.footer.fine}</div>
    </footer>
  );
}
