/* ./config modal: visitor accent + cursor trail prefs. The prefs themselves
   live in useVisitorPrefs (which persists to localStorage); this component
   renders the controls and closes on Escape / backdrop / ✕ / :wq. */
import { useCallback, useEffect, useState } from "react";
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
  const [cmdMode, setCmdMode] = useState(false);
  const [cmdText, setCmdText] = useState("");

  // Clear the vim command line whenever the modal closes
  useEffect(() => {
    if (open) return;
    setCmdMode(false);
    setCmdText("");
  }, [open]);

  // Persist current prefs and close (:wq / save button)
  const saveAndQuit = useCallback(() => {
    onSave(prefs);
    onClose();
  }, [onSave, onClose, prefs]);

  // Keyboard: Escape, ':' command mode, and :wq to save & quit
  useEffect(() => {
    if (!open) return;

    const clearCommand = () => {
      setCmdMode(false);
      setCmdText("");
    };
    const runCommand = () => {
      const cmd = cmdText.trim();
      if (cmd === "wq" || cmd === "x") saveAndQuit();
      else if (cmd === "q" || cmd === "q!") onClose();
      clearCommand();
    };
    const handleCommandKey = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === "Enter") runCommand();
      else if (e.key === "Backspace") {
        const next = cmdText.slice(0, -1);
        setCmdText(next);
        if (!next) setCmdMode(false);
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        setCmdText(prev => prev + e.key);
      }
    };
    const shouldStartCommand = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      return e.key === ":" && !e.ctrlKey && !e.metaKey && !e.altKey && tag !== "INPUT" && tag !== "TEXTAREA";
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (cmdMode) { e.preventDefault(); clearCommand(); }
        else onClose();
        return;
      }
      if (cmdMode) { handleCommandKey(e); return; }
      if (shouldStartCommand(e)) {
        e.preventDefault();
        setCmdMode(true);
        setCmdText("");
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, cmdMode, cmdText, saveAndQuit]);

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
          {/* :wq saves prefs and closes; swatch/toggle changes persist immediately */}
          <div className="cfg-foot">
            {cmdMode ? (
              <div className="cfg-cmd" aria-live="polite">
                <span className="cfg-cmd-prompt">:</span>
                <span className="cfg-cmd-text">{cmdText}</span>
                <span className="cfg-cmd-cur blink" aria-hidden="true" />
              </div>
            ) : (
              <>
                <button className="cfg-save" onClick={saveAndQuit}>{C.configModal.saveLabel}</button>
                <span className="hint">{C.configModal.saveHint}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
