import { ProjectItem } from "./project-item";
import type { ProjectPageExtra } from "./page-content";

export const content: ProjectPageExtra = {
  tags: "ai / full-stack",
  about: [
    "Rova is a voice-first learning platform built around active recall. A learner can upload a syllabus, PDF, or set of notes, or simply name a topic. Rova turns that material into a roadmap, teaches each concept aloud, pauses for checkpoints, and revisits weak spots before marking a skill as learned.",
    "The interesting part is the loop between teaching, assessment, and remediation. If those pieces feel like separate features, the product becomes another content viewer. Rova keeps them connected through one progress model and an interactive roadmap."
  ],
  sections: [
    {
      label: "architecture",
      body: [
        "The frontend uses React, TypeScript, Vite, and D3.js for the roadmap tree. FastAPI and MongoDB hold the backend state. Gemini generates roadmaps and assessment feedback, Tavily and Firecrawl gather supporting material, and ElevenLabs provides speech with character-level timing. Auth0 handles login, while AWS S3 stores avatar uploads.",
        "Rova is closed source and still in active development. The hardest part so far has been turning a strong demo into something deployment-ready, especially around frontend polish and Vercel configuration. The next phase is less glamorous but more important: cleaner deployment, narrower user segments, and a pricing model that can support real use."
      ]
    }
  ]
};

export default function createRova(): ProjectItem {
  return new ProjectItem(
    "Rova",
    "Voice-first AI learning platform that turns uploaded material or any topic into a personalized roadmap with guided lessons, practice, assessments, and progress tracking.",
    "",
    [
      "React",
      "TypeScript",
      "Vite",
      "D3.js",
      "Tailwind CSS",
      "Auth0",
      "FastAPI",
      "MongoDB",
      "Gemini",
      "LangChain",
      "OpenAI",
      "Tavily",
      "ElevenLabs",
      "AWS",
      "Docker"
    ],
    "March 2026 - Present",
    [
      "/projects/Rova-1.png",
      "/projects/Rova-2.png",
      "/projects/Rova-3.png",
      "/projects/Rova-4.png",
      "/projects/Rova-5.png"
    ],
    "",
    "",
    false,
    true
  );
}
