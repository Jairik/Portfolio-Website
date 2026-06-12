/* ./config modal: visitor accent + cursor trail prefs. The prefs themselves
   live in useVisitorPrefs (which persists to localStorage); this component
   just renders the controls and closes on Escape / backdrop / ✕ / save. */
import { useEffect } from "react";
import type { Prefs } from "../../hooks/useVisitorPrefs";
import * as C from "../../assets/terminalContent";

// Props: open flag, close callback, and the current prefs + setter
interface ConfigModalProps {
  open: boolean;
  onClose: () => void;
  prefs: Prefs;
  onSave: (next: Prefs) => void;
}

/* Renders the prefs dialog; every string comes from terminalContent.ts */
export default function ConfigModal({ open, onClose, prefs, onSave }: ConfigModalProps) {
  // Escape closes the modal while it is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div className={`cfg${open ? " on" : ""}`} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="cfg-win" role="dialog" aria-label="visitor preferences">
        {/* window chrome with the close button */}
        <div className="bar">
          <span className="d r" /><span className="d y" /><span className="d g" />
          <span className="ttl">{C.configModal.barTitle}</span>
          <button className="x" aria-label="close config" onClick={onClose}>✕</button>
        </div>
        <div className="cfg-body">
          <p className="cmt">{C.configModal.comment}</p>
          {/* accent color swatches */}
          <div className="cfg-row">
            <span className="key">{C.configModal.colorKey}</span><span className="eq">=</span>
            <div className="swatches">
              {Object.entries(C.ACCENTS).map(([name, a]) => (
                <button
                  key={name}
                  className={`swatch${prefs.color === name ? " on" : ""}`}
                  onClick={() => onSave({ ...prefs, color: name })}
                >
                  <span className="sq" style={{ background: a.c }} />{name}
                </button>
              ))}
            </div>
          </div>
          {/* cursor trail on/off toggle */}
          <div className="cfg-row">
            <span className="key">{C.configModal.trailKey}</span><span className="eq">=</span>
            <button
              className={`boolbtn${prefs.trail ? " on" : ""}`}
              onClick={() => onSave({ ...prefs, trail: !prefs.trail })}
            >
              {prefs.trail ? "on" : "off"}
            </button>
          </div>
          {/* save just closes — changes apply (and persist) immediately */}
          <div className="cfg-foot">
            <button className="cfg-save" onClick={onClose}>{C.configModal.saveLabel}</button>
            <span className="hint">{C.configModal.saveHint}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
