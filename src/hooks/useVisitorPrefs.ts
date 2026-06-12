/* Visitor preferences (accent color + cursor trail on/off), persisted to
   localStorage under the key defined in src/assets/terminalContent.ts. */
import { useCallback, useEffect, useState, type RefObject } from "react";
import * as C from "../assets/terminalContent";

// Shape persisted to localStorage and held in state
export interface Prefs { color: string; trail: boolean }

/* Reads saved visitor prefs from localStorage, falling back to the defaults */
function loadPrefs(): Prefs {
  let stored: Partial<Prefs> | null = null;
  try { stored = JSON.parse(window.localStorage.getItem(C.PREFS_STORAGE_KEY) || "null"); } catch { /* ignore */ }
  return { color: "acid", trail: true, ...(stored || {}) };
}

/* Owns the visitor prefs: applies the accent CSS variables to the page root
   whenever they change, and returns a setter that also persists to storage */
export function useVisitorPrefs(rootRef: RefObject<HTMLDivElement | null>): [Prefs, (next: Prefs) => void] {
  const [prefs, setPrefs] = useState<Prefs>(loadPrefs);

  // Apply the accent whenever prefs change (everything derives from these vars)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // Swap the accent CSS variables on the page root (everything derives from them)
    const accent = C.ACCENTS[prefs.color] || C.ACCENTS.acid;
    root.style.setProperty("--acid", accent.c);
    root.style.setProperty("--acid-deep", accent.deep);
  }, [rootRef, prefs]);

  /* Persists a prefs change to localStorage and state in one step */
  const savePrefs = useCallback((next: Prefs) => {
    setPrefs(next);
    try { window.localStorage.setItem(C.PREFS_STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  }, []);

  return [prefs, savePrefs];
}
