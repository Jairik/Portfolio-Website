/* Hero text animation hooks: the typed "whoami" command, the glyph scramble
   that resolves into the name, and the looping role typewriter. All copy
   comes from src/assets/terminalContent.ts.

   Initial state is always the final text so SSR/prerender HTML ships readable
   copy (and matches the first client render). Animations start after mount
   unless the visitor prefers reduced motion. */
import { useEffect, useState } from "react";
import { SCRAMBLE_GLYPHS, prefersReducedMotion } from "../lib/motion";
import * as C from "../assets/terminalContent";

const scrambledNameRows = () => C.hero.nameRows.map((row, rowIndex) =>
  row.replace(/\S/g, (_char, charIndex: number) =>
    SCRAMBLE_GLYPHS[(rowIndex * 17 + charIndex * 7) % SCRAMBLE_GLYPHS.length]
  )
);

/* Types out the hero's command one character at a time with human jitter */
export function useTypedCommand(): string {
  // Start with the full command so prerendered HTML is not an empty span
  const [typed, setTyped] = useState(C.hero.typedCommand);

  useEffect(() => {
    const text = C.hero.typedCommand;
    if (prefersReducedMotion()) { setTyped(text); return; }
    // Reset and type from scratch after mount
    setTyped("");
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
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
  // Start with the real name so crawlers/prerender see "JAIRIK" / "MCCAULEY"
  const [nameRows, setNameRows] = useState<string[]>(C.hero.nameRows);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const finals = C.hero.nameRows;
    // Jump to scrambled glyphs, then decrypt over 24 frames
    setNameRows(scrambledNameRows());
    let frame = 0;
    const total = 24;
    let timer: ReturnType<typeof setTimeout>;
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
  // Start with the first role so prerendered HTML has a real subtitle
  const [roleText, setRoleText] = useState(C.heroRoles[0]);

  useEffect(() => {
    if (prefersReducedMotion()) { setRoleText(C.heroRoles[0]); return; }
    setRoleText("");
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
