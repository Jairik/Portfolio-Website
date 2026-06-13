/* Skill "grep" popover: a fixed-position panel that lists every project and
   experience role matching the clicked skill chip. Owns its own positioning
   (clamped to the viewport, flipped above the chip when clipped) and its
   close-on-outside-click / close-on-scroll behavior. */
import { useEffect, useLayoutEffect, useRef } from "react";
import { technologiesMatch, getLinkedExperiencesForTechnology } from "../../assets/experience";
import { PROJECTS } from "../../lib/terminalHomeData";
import * as C from "../../assets/terminalContent";

// Popover state: which skill was clicked and where its chip sits on screen
export interface PopState { name: string; anchor: DOMRect }

/* Renders the popover near its anchor chip; onClose fires on outside click/scroll */
export default function SkillPopover({ pop, onClose }: { pop: PopState | null; onClose: () => void }) {
  // Element ref, needed to measure + flip the panel after positioning
  const popRef = useRef<HTMLDivElement>(null);

  // Position under the clicked chip, flipping above it if clipped at the bottom
  useLayoutEffect(() => {
    const el = popRef.current;
    if (!el || !pop) return;
    // Clamp horizontally to the viewport, then drop below the chip
    const r = pop.anchor;
    const pw = Math.min(360, window.innerWidth - 24);
    el.style.left = `${Math.min(Math.max(12, r.left), window.innerWidth - pw - 12)}px`;
    el.style.top = `${r.bottom + 10}px`;
    // After paint, flip above the chip if the popover runs off the bottom
    const raf = requestAnimationFrame(() => {
      const pr = el.getBoundingClientRect();
      if (pr.bottom > window.innerHeight - 8) el.style.top = `${r.top - pr.height - 10}px`;
    });
    return () => cancelAnimationFrame(raf);
  }, [pop]);

  // Close on any outside click or on scroll (chips stopPropagation to stay open)
  useEffect(() => {
    if (!pop) return;
    document.addEventListener("click", onClose);
    window.addEventListener("scroll", onClose, { passive: true });
    return () => {
      document.removeEventListener("click", onClose);
      window.removeEventListener("scroll", onClose);
    };
  }, [pop, onClose]);

  // Matches: projects whose stack includes the skill + linked experience roles
  const popProjects = pop ? PROJECTS.filter(p => p.tech.some(t => technologiesMatch(pop.name, t))) : [];
  const popXps = pop ? getLinkedExperiencesForTechnology(pop.name) : [];

  return (
    <div ref={popRef} className={`pop${pop ? " on" : ""}`}>
      {pop && (
        <>
          <h4>{pop.name}</h4>
          {popProjects.length + popXps.length > 0 ? (
            <ul>
              {popProjects.map(p => <li key={p.title}>{p.title}</li>)}
              {popXps.map(x => <li key={x.id}>{x.company} <span style={{ opacity: .6 }}>(role)</span></li>)}
            </ul>
          ) : (
            <p className="none">{C.arsenalNoMatches}</p>
          )}
        </>
      )}
    </div>
  );
}
