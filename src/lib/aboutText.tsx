/* Shared renderer for the "about" prose: wraps the configured highlight phrases
   (terminalContent.aboutHighlights) in accent <em> tags. Used by both the home
   page's Readme section and the dedicated /about page so they stay in sync. */
import type { ReactNode } from "react";
import { aboutHighlights } from "../assets/terminalContent";

/* Wraps each configured highlight phrase (first occurrence) in an accent <em> */
export function renderAboutParagraph(text: string): ReactNode[] {
  // Start with the raw paragraph and progressively split out each highlight
  let nodes: ReactNode[] = [text];
  aboutHighlights.forEach(phrase => {
    nodes = nodes.flatMap((node): ReactNode[] => {
      if (typeof node !== "string") return [node];
      const at = node.indexOf(phrase);
      if (at === -1) return [node];
      return [node.slice(0, at), <em key={phrase}>{phrase}</em>, node.slice(at + phrase.length)];
    });
  });
  return nodes;
}
