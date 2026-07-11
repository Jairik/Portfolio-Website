import { ProjectItem } from "./project-item";
import type { ProjectPageExtra } from "./page-content";

export const content: ProjectPageExtra = {
  tags: "algorithms / ai",
  about: [
    "This desktop 15-puzzle can be played normally or handed over to an A* solver. The 4 by 4 board is a search state, every legal slide is a transition, and the ordered board is the goal. The interface makes the solver visible instead of leaving it as a function that prints a path to the terminal.",
    "One mode solves and applies the full move sequence. A second computes only the next optimal move, which leaves room for a player-versus-bot format and makes it easier to inspect one decision at a time."
  ],
  sections: [
    {
      label: "search design",
      body: [
        "A* combines the cost of moves already taken with a heuristic estimate of the work remaining. The solver expands the most promising board first, tracks how each state was reached, and reconstructs the final move sequence once it finds the goal.",
        "The scope is deliberately limited to the standard 15-puzzle. Larger boards grow the state space quickly, so this is an educational pathfinding implementation rather than a general planning engine."
      ]
    }
  ]
};

export default function createAiPuzzleGame(): ProjectItem {
  return new ProjectItem(
    "AI Puzzle Game",
    "Utilizes A* Search to automate the 15-puzzle-game, a popular game that includes shifting tiles to a sequential configuration.",
    "https://github.com/Jairik/AI-Puzzle-Game",
    ["Python", "A* Search Algorithm", "Tkinter"],
    "November 2024",
    ["/projects/AI-Puzzle-Game-1.png", "/projects/AI-Puzzle-Game-2.png"],
    "",
    "",
    false
  );
}
