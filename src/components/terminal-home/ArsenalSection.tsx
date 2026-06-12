/* Arsenal section: the skill wall on the acid background. Clicking a chip
   opens the grep popover; this section owns that popover's state. */
import { useCallback, useState, type MouseEvent as ReactMouseEvent } from "react";
import SectionHeading from "./SectionHeading";
import SkillPopover, { type PopState } from "./SkillPopover";
import { SKILLS } from "../../lib/terminalHomeData";
import * as C from "../../assets/terminalContent";

/* Renders the categorized skill chips and the popover they open */
export default function ArsenalSection() {
  // Which skill chip (if any) currently has the popover open
  const [pop, setPop] = useState<PopState | null>(null);

  /* Opens the grep popover for a skill chip (stopPropagation keeps it open) */
  const showPop = useCallback((e: ReactMouseEvent<HTMLButtonElement>, name: string) => {
    e.stopPropagation();
    setPop({ name, anchor: e.currentTarget.getBoundingClientRect() });
  }, []);

  return (
    <section id="arsenal">
      <SectionHeading cmt={C.sections.arsenal.cmt} title={C.sections.arsenal.title} />
      <div className="inner">
        <p className="sk-hint">{C.arsenalHint}</p>
        {/* one chip wall per skill category */}
        <div>
          {SKILLS.map(([group, list]) => (
            <div className="sk-group rv" key={group}>
              <h3>{group}</h3>
              <div className="sk-wall">
                {list.map(s => (
                  <button className="chip" key={s.name} onClick={e => showPop(e, s.name)}>
                    {s.icon && <img src={s.icon} alt="" />}
                    {s.name}
                    {s.note && <span className="nb">{s.note}</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* fixed-position grep popover (placed near the clicked chip) */}
      <SkillPopover pop={pop} onClose={() => setPop(null)} />
    </section>
  );
}
