/* Row of tech-stack pills with their icons (used by featured, archive, and xp). */
import { getTechnologyIcon } from "../../assets/experience";

/* Renders one pill per technology, with its icon when one is registered */
export default function TechChips({ tech }: { tech: string[] }) {
  return (
    <div className="ptech">
      {tech.map(t => {
        const icon = getTechnologyIcon(t);
        return (
          <span key={t}>
            {icon && <img src={icon} alt="" />}
            {t}
          </span>
        );
      })}
    </div>
  );
}
