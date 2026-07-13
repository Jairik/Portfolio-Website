import { ProjectItem } from "./project-item";
import type { ProjectPageExtra } from "./page-content";

export const content: ProjectPageExtra = {
  tags: "ai / nlp",
  about: [
    "This capstone asked whether a small language model could hold onto a recognizable Shakespearean character instead of slipping back into a generic assistant voice. We focused on Hamlet and Macbeth, building the data, training, inference, evaluation, and web-demo layers as one system.",
    "The data pipeline parses speeches and nearby dialogue from the plays, normalizes Elizabethan phrasing, and converts the result into speaker-aware chat examples. LoRA adapters then fine-tune several TinyLlama and LiquidAI base models without retraining every parameter."
  ],
  sections: [
    {
      label: "inference system",
      body: [
        "The FastAPI backend can run a single-character chat or a round-robin conversation between two to four model and character pairs. A resident model manager keeps a base model in memory and swaps compatible adapters in place. Optional RAG retrieves the three closest profile or dialogue passages before generation, and ElevenLabs can give each character a separate voice.",
        "The response pipeline checks for prompt-injection patterns, trims chat history, catches repetition loops, removes leaked role tokens and stage directions, and retries without the adapter when a generation breaks down. User feedback can be attached to an entire answer or a highlighted span, then converted into token weights for later training."
      ]
    },
    {
      label: "evaluation",
      body: [
        "We used a PerSEval-style benchmark that scores character similarity, contradictions against known facts, and consistency across answers. Six tasks probe identity, grief, moral conflict, factual recall, relationships, and adversarial attempts to break character. The repository also includes more than 90 tests around the API, retrieval, generation, and feedback paths.",
        "The project does not reduce personality to one flattering demo response. It keeps the raw and normalized benchmark outputs so we can see where a model sounds right, where it contradicts the play, and where every answer starts to sound the same."
      ]
    }
  ]
};

export default function createShakespeareanPersonalityLlmAugmentation(): ProjectItem {
  return new ProjectItem(
    "Shakespearean Personality LLM Augmentation",
    "Develops and evaluates persona-consistent LLMs grounded in Hamlet and Macbeth via LoRA fine-tuning, RAG, and a FastAPI + React demo for single-character and multi-model dialogues.",
    "https://github.com/bmccorison/DSCI490-Shakespearean-Personality-LLM-Augmentation-",
    [
      "Python",
      "PyTorch",
      "Tensorflow",
      "HuggingFace",
      "RAG",
      "FastAPI",
      "React",
      "TypeScript",
      "Vite",
      "TailwindCSS",
      "Docker",
      "GitHub Actions"
    ],
    "January 2026 - May 2026",
    ["/projects/Shakespearean-LLM-1.png"],
    "",
    "",
    false,
    false
  );
}
