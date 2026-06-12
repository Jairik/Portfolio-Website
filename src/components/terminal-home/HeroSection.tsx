/* Hero section: typed "whoami", glyph-scrambled name, looping role
   typewriter, output blurb, and the stats row (with the live commit count).
   All copy comes from src/assets/terminalContent.ts. */
import { useTypedCommand, useNameScramble, useRoleTypewriter } from "../../hooks/useHeroText";
import { useCommitCount } from "../../hooks/useCommitCount";
import { experienceItems } from "../../assets/experience";
import { PROJECTS } from "../../lib/terminalHomeData";
import * as C from "../../assets/terminalContent";

/* Renders the hero; all of its animation state lives in the text hooks */
export default function HeroSection() {
  // Animated hero text (each hook owns its own timers and state)
  const typed = useTypedCommand();
  const nameRows = useNameScramble();
  const roleText = useRoleTypewriter();
  // Live commit total (null until the fetch resolves, then swapped in)
  const commits = useCommitCount();

  // Hero stat chips, with the static fallback until the live count arrives
  const stats = C.buildHeroStats({
    projects: PROJECTS.length,
    commits: commits ?? C.COMMIT_COUNT_FALLBACK,
    roles: experienceItems.length
  });

  return (
    <section className="hero" style={{ paddingBottom: 40 }}>
      <div className="grid-bg" />
      <div className="inner">
        {/* typed prompt line */}
        <p className="pline"><span className="pr">{C.topbar.host}</span> <span className="cmd">{typed}</span></p>
        {/* scrambled name rows: hollow outline on top, accent fill below */}
        <h1 className="name">
          <span className="row hollow">{nameRows[0]}</span>
          <span className="row zap">{nameRows[1]}</span>
        </h1>
        {/* looping role typewriter with its block cursor */}
        <p className="pline role-line"><span className="pr">&gt;</span> <span className="cmd">{roleText}</span><span className="tcur" /></p>
        <p className="out">{C.hero.outBlurb}<b>{C.hero.outBold}</b>{C.hero.outLocation}<span className="ok">{C.hero.outStatus}</span></p>
        {/* stat chips */}
        <div className="stat-row">
          {stats.map(s => <span key={s.label}><b>{s.value}</b> {s.label}</span>)}
        </div>
      </div>
      <div className="scrollcue">{C.hero.scrollCue}</div>
    </section>
  );
}
