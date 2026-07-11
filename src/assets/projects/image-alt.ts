// Concise overrides keep screenshot alt text useful when a project's full
// description is too long or promotional for a screen reader.
const ALT_SUMMARIES: Record<string, string> = {
  Lunara: "AI-powered healthcare triage system",
  TestifAI: "LLM quiz and test generator",
  CapyMorph: "educational 2D morpheme learning game",
  PerishLess: "AI food-waste reduction platform",
  KnowYourUni: "ML student analytics platform",
  "Stock Portfolio Management System": "stock portfolio tracking web app",
  "Encrypted P2P Chatroom": "end-to-end encrypted peer-to-peer chat app",
  "AI Puzzle Game": "A* search 15-puzzle solver",
  "Move4Wellness Fitness App": "fitness and workout tracking mobile app",
  "Portfolio Website": "personal developer portfolio website",
  "Shakespearean Personality LLM Augmentation": "persona-consistent Shakespeare LLM demo",
  "Poultry Farm Data Analytics Dashboard": "poultry farm data analytics dashboard",
  Rova: "voice-first AI learning platform",
  "Vault Assistant": "local-first Obsidian vault AI assistant"
};

// Describe both the project and a screenshot's position within its gallery.
export function projectImageAlt(
  title: string,
  description: string,
  index: number,
  total: number
): string {
  // Unlisted projects fall back to the first clause of their description.
  // Split the description at the first period, comma, or em-dash; use the first part as a fallback summary.
  const summary = ALT_SUMMARIES[title] || description.split(/[.,—]/)[0].trim();
  const position = total > 1 ? `, screenshot ${index + 1} of ${total}` : " screenshot";
  return `${title} — ${summary}${position}`;
}

// Personal photos already have human-written labels; add the subject's identity.
export function personImageAlt(label: string): string {
  return `Jairik "JJ" McCauley — ${label}`;
}
