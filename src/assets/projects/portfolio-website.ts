import { ProjectItem } from "./project-item";
import type { ProjectPageExtra } from "./page-content";

export const content: ProjectPageExtra = {
  tags: "react / typescript",
  about: [
    "This is the site you're reading right now — a terminal-themed portfolio built with React 19, TypeScript, and Vite, styled entirely with hand-written CSS instead of a component library.",
    "Every route is server-prerendered to static HTML at build time for SEO (unique titles, meta tags, canonical URLs, and JSON-LD) and then hydrated on the client. It ships to GitHub Pages through a GitHub Actions workflow, with Cloudflare handling DNS and caching out front."
  ]
};

export default function createPortfolioWebsite(): ProjectItem {
  return new ProjectItem(
    "Portfolio Website",
    "Personal portfolio website (no way who would've known!).",
    "https://github.com/Jairik/Portfolio-Website",
    ["React", "TypeScript", "Vite", "TailwindCSS", "Three.js", "Cloudflare", "GitHub Actions", "Valtown"],
    "January 2026 - Present",
    ["/projects/Portfolio-Website.png"],
    "https://jjmccauley.com",
    "",
    false
  );
}
