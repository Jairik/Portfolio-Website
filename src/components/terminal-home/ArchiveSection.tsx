/* Archive section: every non-featured project as an expandable tree row. */
import SectionHeading from "./SectionHeading";
import ArchiveRow from "./ArchiveRow";
import { ARCHIVE } from "../../lib/terminalHomeData";
import * as C from "../../assets/terminalContent";

/* Renders the ~/history window listing the current + past project rows */
export default function ArchiveSection() {
  return (
    <section id="projects">
      <SectionHeading cmt={C.sections.archive.cmt} title={C.sections.archive.title} />
      <div className="inner">
        <div className="arch-list">
          {/* window chrome header with the entry count */}
          <div className="arch-head">
            <span className="d r" /><span className="d y" /><span className="d g" />
            <span className="ttl">~/projects — {ARCHIVE.length} entries</span>
          </div>
          <div>
            {ARCHIVE.map(p => <ArchiveRow key={p.title} p={p} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
