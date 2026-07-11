/* About section: readme prose from constantVars.ts with the highlight phrases
   configured in terminalContent.ts wrapped in accent <em> tags. */
import SectionHeading from "./SectionHeading";
import { aboutParagraphs } from "../../assets/constantVars";
import { renderAboutParagraph } from "../../lib/aboutText";
import * as C from "../../assets/terminalContent";

/* Renders the Readme section from the shared about paragraphs */
export default function AboutSection() {
  return (
    <section id="about">
      <SectionHeading cmt={C.sections.about.cmt} title={C.sections.about.title} />
      <div className="about-copy">
        {aboutParagraphs.map((p, i) => <p key={i}>{renderAboutParagraph(p)}</p>)}
      </div>
    </section>
  );
}
