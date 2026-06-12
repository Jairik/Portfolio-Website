/* About section: readme prose from constantVars.ts with the highlight phrases
   configured in terminalContent.ts wrapped in accent <em> tags. */
import type { ReactNode } from "react";
import SectionHeading from "./SectionHeading";
import { aboutParagraphs } from "../../assets/constantVars";
import * as C from "../../assets/terminalContent";

/* Wraps configured highlight phrases (first occurrence each) in accent <em> tags */
function renderAboutParagraph(text: string): ReactNode[] {
  // Start with the raw paragraph and progressively split out each highlight
  let nodes: ReactNode[] = [text];
  C.aboutHighlights.forEach(phrase => {
    nodes = nodes.flatMap((node): ReactNode[] => {
      if (typeof node !== "string") return [node];
      const at = node.indexOf(phrase);
      if (at === -1) return [node];
      return [node.slice(0, at), <em key={phrase}>{phrase}</em>, node.slice(at + phrase.length)];
    });
  });
  return nodes;
}

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
