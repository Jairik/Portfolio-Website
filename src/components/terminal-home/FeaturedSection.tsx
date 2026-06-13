/* Featured projects section: one big poster window per featured project. */
import SectionHeading from "./SectionHeading";
import FeaturedWindow from "./FeaturedWindow";
import { FEATURED } from "../../lib/terminalHomeData";
import * as C from "../../assets/terminalContent";

/* Renders the HEAD section with a poster window for each featured project */
export default function FeaturedSection() {
  return (
    <section id="featured">
      <SectionHeading cmt={C.sections.featured.cmt} title={C.sections.featured.title} />
      <div className="inner posters">
        {FEATURED.map(p => <FeaturedWindow key={p.title} p={p} />)}
      </div>
    </section>
  );
}
