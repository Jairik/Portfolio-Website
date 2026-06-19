/* TerminalHome — the terminal-styled main page served at /.
   React port of the "terminal.html" design prototype. This file is only the
   page shell: it owns the root element (whose data-* attributes drive the
   visual modes), wires the page-level hooks, and composes the section
   components that live alongside it in this directory. All copy lives in
   src/assets/terminalContent.ts; all project/experience/skill data comes
   from the shared assets files via src/lib/terminalHomeData.ts. */
import { useRef, useState } from "react";
import "./TerminalHome.css";
import TopChrome from "./TopChrome";
import HeroSection from "./HeroSection";
import Marquee from "./Marquee";
import FeaturedSection from "./FeaturedSection";
import ArchiveSection from "./ArchiveSection";
import ArsenalSection from "./ArsenalSection";
import ExperienceSection from "./ExperienceSection";
import MediaSection from "./MediaSection";
import AboutSection from "./AboutSection";
import SiteFooter from "./SiteFooter";
import Lightbox from "./Lightbox";
import ConfigModal from "./ConfigModal";
import { usePageChrome } from "../../hooks/usePageChrome";
import { useVisitorPrefs } from "../../hooks/useVisitorPrefs";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";
import { useLightbox } from "../../hooks/useLightbox";
import { useCursorFx } from "../../hooks/useCursorFx";
import * as C from "../../assets/terminalContent";

/* Page shell: root data-attributes, page-level hooks, and section composition */
export default function TerminalHome() {
  // Root element ref: scopes DOM queries and holds the live data-* mode attributes
  const rootRef = useRef<HTMLDivElement>(null);
  // Container that cursor-trail / click-burst nodes get appended into
  const fxRef = useRef<HTMLDivElement>(null);

  // Whether the ./config modal is open
  const [cfgOpen, setCfgOpen] = useState(false);

  // Page-level behaviors (each hook documents and owns its own concern)
  usePageChrome("#070906", "JJ McCauley | Full Stack Developer");
  const [prefs, savePrefs] = useVisitorPrefs(rootRef);
  const { lb, handleRootClick, handleRootKeyDown } = useLightbox(rootRef);
  useRevealOnScroll(rootRef);
  useCursorFx(rootRef, fxRef);

  return (
    <div
      ref={rootRef}
      className="thome"
      data-topcur={C.PAGE_DEFAULTS.topcur}
      data-scan={C.PAGE_DEFAULTS.scan}
      data-trail={prefs.trail ? C.PAGE_DEFAULTS.trail : "off"}
      data-burst={C.PAGE_DEFAULTS.burst}
      onClick={handleRootClick}
      onKeyDown={handleRootKeyDown}
    >
      {/* CRT overlays */}
      <div className="fx-scan" />
      <div className="fx-vig" />
      {/* layer that cursor-trail / click-burst particles get appended into */}
      <div ref={fxRef} />

      {/* shared lightbox (featured shots, archive galleries, media mosaic) */}
      <Lightbox lb={lb} />

      {/* fixed top: acid ribbon (escape hatch to /terminal) + prompt nav bar */}
      <TopChrome onOpenConfig={() => setCfgOpen(true)} />

      {/* page sections, in design order */}
      <HeroSection />
      <Marquee items={C.marqueeLoud} loud />
      <FeaturedSection />
      <Marquee items={C.marqueeQuiet} />
      <ArchiveSection />
      <ArsenalSection />
      <ExperienceSection />
      <MediaSection />
      <AboutSection />
      <SiteFooter />

      {/* ./config modal: visitor accent + cursor trail prefs (localStorage) */}
      <ConfigModal open={cfgOpen} onClose={() => setCfgOpen(false)} prefs={prefs} onSave={savePrefs} />
    </div>
  );
}
