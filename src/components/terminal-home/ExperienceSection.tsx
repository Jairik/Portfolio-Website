/* Experience section: one log row per role from src/assets/experience.ts. */
import SectionHeading from "./SectionHeading";
import TechChips from "./TechChips";
import { experienceItems } from "../../assets/experience";
import * as C from "../../assets/terminalContent";

/* Renders the deployments log with duration, role, company, and tech rows */
export default function ExperienceSection() {
  return (
    <section id="xp">
      <SectionHeading cmt={C.sections.xp.cmt} title={C.sections.xp.title} />
      <div className="inner xp">
        {experienceItems.map(x => (
          <div className="xrow rv" key={x.id}>
            <div className="xmeta">
              <span className="xwhen">{x.duration}</span>
              <img className="xlogo" src={x.logoSrc} alt={`${x.company} logo`} loading="lazy" />
            </div>
            <div>
              <h3>{x.role}</h3>
              <span className="xco">{x.company}</span>
              <p>{x.description}</p>
              <TechChips tech={x.technologies} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
