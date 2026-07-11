import { ProjectItem } from "./project-item";
import type { ProjectPageExtra } from "./page-content";

export const content: ProjectPageExtra = {
  tags: "game / education",
  about: [
    "CapyMorph teaches English morphology through a maze game. You play as Morphy, a capybara trying to reach her baby, and every Cheetos or Mountain Dew pickup opens a question about roots, affixes, inflection, derivation, or allomorphy. Correct answers add points before the maze continues.",
    "The joke-heavy capybara theme was intentional. Morphology can get abstract fast, so the game turns it into movement, short decisions, and visible progress instead of another worksheet."
  ],
  sections: [
    {
      label: "architecture",
      body: [
        "React owns the controls, question modal, level-complete flow, and leaderboard. Phaser owns the game canvas and physics. A Zustand store connects them so opening a React modal pauses movement inside the Phaser scene without either layer needing to control the other directly.",
        "Each maze is generated in the browser with Eller's algorithm. A* finds the solution route and helps place collectibles along it, far enough apart that questions do not arrive back to back. Maze height and collectible count grow with each level."
      ]
    },
    {
      label: "content and deployment",
      body: [
        "An offline Go tool generated more than 512 questions across eight morphology families using a 145-word capybara-themed word bank. The Go and Gin API samples those questions from MongoDB and also stores leaderboard scores.",
        "A three-stage Docker build compiles the React client and Go server into a small Alpine image. Pushes to main deploy automatically to Fly.io, and CodeQL checks both the TypeScript and Go code."
      ]
    }
  ]
};

export default function createCapyMorph(): ProjectItem {
  return new ProjectItem(
    "CapyMorph",
    "Educational 2D game that facilitates interactive morpheme exercises.",
    "https://github.com/Jairik/Capymorph",
    ["React", "TypeScript", "Vite", "Phaser.js", "Go", "MongoDB", "Docker", "Fly.io", "Zustand"],
    "December 2025",
    [
      "/projects/CapyMorph-1.png",
      "/projects/CapyMorph-2.png",
      "/projects/CapyMorph-3.png"
    ],
    "https://capymorph.fly.dev/",
    "",
    false
  );
}
