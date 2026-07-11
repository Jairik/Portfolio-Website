import { ProjectItem } from "./project-item";
import type { ProjectPageExtra } from "./page-content";

export const content: ProjectPageExtra = {
  tags: "data / ai",
  about: [
    "KnowYourUni was our first attempt at building student analytics on top of a knowledge graph. The dashboard examines a student population and looks for patterns in academic habits, performance, and engagement that faculty or students could investigate further.",
    "None of us had worked with Neo4j before, which was half the reason we chose it. A graph fit the relationships we wanted to explore, but it also forced us to stop thinking about the data as a set of isolated rows."
  ],
  sections: [
    {
      label: "implementation and limits",
      body: [
        "The React and TypeScript client talks to a FastAPI backend backed by Neo4j. Python analysis code supplies the machine-learning layer, while Gemini and LangChain support the natural-language parts of the interface.",
        "The largest limitation was the generated dataset. Some model results looked convincing at first and fell apart when we checked whether the underlying student records made sense. We finished with a working prototype and a much better understanding of knowledge graphs, but real deployment would require reliable institutional data, stable authentication, encryption, and a proper validation plan."
      ]
    }
  ]
};

export default function createKnowYourUni(): ProjectItem {
  return new ProjectItem(
    "KnowYourUni",
    "Student analytics platform providing ML-derived insights into student performance.",
    "https://github.com/ncorcoran771/KnowYourUni_",
    ["React", "TypeScript", "Vite", "Neo4J", "FastAPI", "Gemini", "Langchain", "Python"],
    "September 2025 - November 2025",
    [
      "/projects/KnowYourUni-1.png",
      "/projects/KnowYourUni-2.png",
      "/projects/KnowYourUni-3.png",
      "/projects/KnowYourUni-4.png",
      "/projects/KnowYourUni-5.png",
      "/projects/KnowYourUni-6.png"
    ],
    "",
    "https://www.youtube.com/watch?v=u-mNfCXUxhU&t=1s",
    false
  );
}
