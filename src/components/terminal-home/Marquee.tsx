/* Scrolling marquee band; phrases come from src/assets/terminalContent.ts. */

/* Renders the marquee with its content duplicated so the CSS loop is seamless */
export default function Marquee({ items, loud = false }: { items: string[]; loud?: boolean }) {
  return (
    <div className={`marquee${loud ? " loud" : ""}`} aria-hidden="true">
      <div className="track">
        {[...items, ...items].map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}
