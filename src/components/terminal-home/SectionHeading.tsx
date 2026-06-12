/* Section heading: the dim "// comment" line plus the big section title.
   Every section pulls its strings from src/assets/terminalContent.ts. */
export default function SectionHeading({ cmt, title }: { cmt: string; title: string }) {
  return (
    <div className="shead">
      <span className="cmt">{cmt}</span>
      <h2>{title}</h2>
    </div>
  );
}
