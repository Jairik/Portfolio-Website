import { ProjectItem } from "./project-item";
import type { ProjectPageExtra } from "./page-content";

export const content: ProjectPageExtra = {
  tags: "ai / education",
  about: [
    "TestifAI came from a familiar problem: writing a useful test takes a lot longer than taking one. Teachers have to pull the important ideas out of their material, balance question styles and difficulty, build an answer key, and still leave time to edit the result.",
    "The app lets a teacher set the course, grade level, difficulty, question mix, and testing philosophy, then upload PDF, PowerPoint, Word, or text files. It produces an editable test and answer key that can be exported as PDFs. Students can use the same workflow to make their own practice tests instead of waiting for one to appear."
  ],
  sections: [
    {
      label: "implementation",
      body: [
        "Our four-person team built the interface with HTML, CSS, JavaScript, and Jinja, backed by FastAPI and LangChain on AWS. The generation pipeline uses retrieval and prompt chaining to ground questions in the uploaded material and shape the output around the user's settings."
      ]
    },
    {
      label: "result",
      body: [
        "We built TestifAI at HackUMBC 2024, where it placed second overall and won Best Educational Hack. The project was an early lesson in making an LLM feature editable: generation gets the first draft on the page, but the teacher still owns the final test."
      ]
    }
  ]
};

export default function createTestifAi(): ProjectItem {
  return new ProjectItem(
    "TestifAI",
    "LLM-driven platform that generates quizes and tests from user-provided material, winning 2nd best overall and best educational hack at HackUMBC 2024.",
    "https://github.com/SpencerPresley/TestifAI",
    ["OpenAI API", "Langchain", "FastAPI", "AWS", "HTML/CSS/JavaScript", "Jinja", "Python"],
    "September 2024",
    [
      "/projects/TestIfAI-1.png",
      "/projects/TestIfAI-2.png",
      "/projects/TestIfAI-3.png",
      "/projects/TestIfAI-4.png"
    ],
    "https://testifai.dustintobrien.com/",
    "https://www.youtube.com/watch?v=DFYo5gKj0tA",
    false,
    false,
    "2nd Overall · HackUMBC 2024"
  );
}
