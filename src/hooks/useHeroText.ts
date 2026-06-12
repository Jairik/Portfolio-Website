/* Hero text animation hooks: the typed "whoami" command, the glyph scramble
   that resolves into the name, and the looping role typewriter. All copy
   comes from src/assets/terminalContent.ts; every hook renders its final
   text immediately when the visitor prefers reduced motion. */
import { useEffect, useState } from "react";
import { SCRAMBLE_GLYPHS, prefersReducedMotion } from "../lib/motion";
import * as C from "../assets/terminalContent";

const scrambledNameRows = () => C.hero.nameRows.map(row =>
  row.replace(/\S/g, () => SCRAMBLE_GLYPHS[(Math.random() * SCRAMBLE_GLYPHS.length) | 0])
);

/* Types out the hero's command one character at a time with human jitter */
export function useTypedCommand(): string {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const text = C.hero.typedCommand;
    if (prefersReducedMotion()) { setTyped(text); return; }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    // Type one character at a time with a little human jitter
    const tick = () => {
      setTyped(text.slice(0, ++i));
      if (i < text.length) timer = setTimeout(tick, 55 + Math.random() * 40);
    };
    timer = setTimeout(tick, 250);
    return () => clearTimeout(timer);
  }, []);

  return typed;
}

/* Resolves random glyphs into the hero name rows over 24 animation frames */
export function useNameScramble(): string[] {
  const [nameRows, setNameRows] = useState<string[]>(() =>
    prefersReducedMotion() ? C.hero.nameRows : scrambledNameRows()
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const finals = C.hero.nameRows;
    let frame = 0;
    const total = 24;
    let timer: ReturnType<typeof setTimeout>;
    // Each frame solves a few more leading characters, the rest stay random glyphs
    const tick = () => {
      frame++;
      setNameRows(finals.map(final => {
        const solved = Math.floor((frame / total) * final.length);
        let out = "";
        for (let i = 0; i < final.length; i++) {
          out += i < solved ? final[i] : SCRAMBLE_GLYPHS[(Math.random() * SCRAMBLE_GLYPHS.length) | 0];
        }
        return out;
      }));
      if (frame < total) timer = setTimeout(tick, 38);
      else setNameRows(finals);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, []);

  return nameRows;
}

/* Loops through the role phrases forever: type → pause → delete → next */
export function useRoleTypewriter(): string {
  const [roleText, setRoleText] = useState("");

  useEffect(() => {
    if (prefersReducedMotion()) { setRoleText(C.heroRoles[0]); return; }
    let ri = 0, ci = 0, deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const loop = () => {
      const word = C.heroRoles[ri];
      if (!deleting) {
        // Typing forward; pause on the full word before deleting
        ci++;
        setRoleText(word.slice(0, ci));
        if (ci === word.length) { deleting = true; timer = setTimeout(loop, 1700); return; }
        timer = setTimeout(loop, 55 + Math.random() * 50);
      } else {
        // Deleting backward; brief gap before the next word starts
        ci--;
        setRoleText(word.slice(0, ci));
        if (ci === 0) { deleting = false; ri = (ri + 1) % C.heroRoles.length; timer = setTimeout(loop, 420); return; }
        timer = setTimeout(loop, 26);
      }
    };
    timer = setTimeout(loop, 0);
    return () => clearTimeout(timer);
  }, []);

  return roleText;
}
