import { ProjectItem } from "./project-item";
import type { ProjectPageExtra } from "./page-content";

export const content: ProjectPageExtra = {
  tags: "ai / local-first",
  about: [
    "Vault Assistant is a local workspace for asking grounded questions about an Obsidian vault. It also has a job-application mode that uses the same notes to draft first-person answers about projects, background, and leadership without asking the user to paste that history into every prompt.",
    "Each tab keeps its own mode, context, session, and follow-up conversation. Answers stay editable, and the user can regenerate or clean up one without throwing away the rest of the working session."
  ],
  sections: [
    {
      label: "retrieval and architecture",
      body: [
        "A BM25-style retrieval step written in Bun and TypeScript selects relevant files and heading slices before an agent runs. It does not need a hosted embeddings service, exposes which context it used, and falls back to normal vault access when retrieval finds nothing useful.",
        "A React interface and one Bun process handle tabs, settings, the frontend, and the API. Agent backends can be swapped between tools such as Claude Code, Codex, and OpenCode. Configuration, session mappings, logs, and attachments remain in local user-writable files, while optional web research can run through a self-hosted SearXNG instance."
      ]
    },
    {
      label: "tradeoff",
      body: [
        "The project asks more of the user than a hosted chat box. You need local tools, a vault path, and some configuration. In return, the evidence is inspectable, the data stays under the user's control, and the agent engine is not locked to one provider."
      ]
    }
  ]
};

export default function createVaultAssistant(): ProjectItem {
  return new ProjectItem(
    "Vault Assistant",
    "Local AI assistant for Obsidian that answers from your notes with BM25 search. Runs on localhost with multi-tab sessions and swap-in backends like Claude Code or Codex.",
    "https://github.com/Jairik/vault-assistant",
    [
      "TypeScript",
      "Bun",
      "React",
      "RAG",
      "Claude Code",
      "Codex",
      "OpenCode",
      "SearXNG",
      "Tauri",
      "Tailwind CSS"
    ],
    "January 2026 - Present",
    [
      "/projects/Vault-Assistant-1.png",
      "/projects/Vault-Assistant-2.png",
      "/projects/Vault-Assistant-3.png",
      "/projects/Vault-Assistant-4.png"
    ],
    "https://jairik.github.io/vault-assistant/",
    "",
    true,
    true
  );
}
