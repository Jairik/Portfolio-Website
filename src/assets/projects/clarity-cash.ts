import { ProjectItem } from "./project-item";
import type { ProjectPageExtra } from "./page-content";

export const content: ProjectPageExtra = {
  tags: "fintech / ai",
  about: [
    "ClarityCash began at Technica 2025 as a budgeting prototype built around one question: which parts of your spending are genuinely hard to change, and which parts are choices? It connects to a bank account through Plaid, imports transactions, and groups spending into structural, flexible, and harmful categories.",
    "The backend calculates effective income, the share spent on unavoidable costs, flexible spending, fees, and cash advances, then rolls those signals into a period-level clarity score. The goal is to explain a budget in plain terms instead of dropping another transaction list in front of the user."
  ],
  sections: [
    {
      label: "implementation",
      body: [
        "A React and TypeScript client talks to a FastAPI service that creates Plaid Link tokens, exchanges public tokens, retrieves transactions, and runs the scoring logic. Firebase and Firestore handle account data and persistence.",
        "This is still a hackathon prototype, not a financial product or a source of investment advice. The scoring categories are useful for exploring the idea, but they would need more validation, clearer user controls, and production-grade handling of financial data before real deployment."
      ]
    }
  ]
};

export default function createClarityCash(): ProjectItem {
  return new ProjectItem(
    "ClarityCash",
    "Data driven budgeting app that turns your financial data into clear insights and actionable plans.",
    "https://github.com/aforti1/clarity-cash",
    ["React", "TypeScript", "Vite", "Firebase", "Plaid API", "FastAPI", "Gemini", "TailwindCSS", "Python"],
    "November 2025",
    [],
    "",
    "",
    false
  );
}
