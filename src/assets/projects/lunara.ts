import { ProjectItem } from "./project-item";
import type { ProjectPageExtra } from "./page-content";

export const content: ProjectPageExtra = {
  tags: "ai / full-stack",
  about: [
    "Lunara started at Rutgers HealthHack 2025 as a way to help women's health call-center agents make referral decisions without digging through a patient's history while the caller waits. My team built the first working version in under 48 hours, then kept developing it through a Rutgers-affiliated completion program.",
    "An agent enters basic patient information and an initial symptom. Lunara ranks likely conditions, specialties, and providers, then asks a focused yes-or-no question when the model needs more signal. Each answer updates the confidence scores, and the final screen gives the agent a compact referral summary in under 30 seconds."
  ],
  sections: [
    {
      label: "implementation",
      body: [
        "The prototype uses a React interface, a FastAPI backend, and a TF-IDF logistic-regression model trained on anonymized hospital call transcripts. Aurora Serverless PostgreSQL stores the supporting data, while AWS hosts the application and its audit records.",
        "Our evaluation covered more than 140 conditions and reported 93% specialty-routing accuracy. We favored recall for higher-risk cases and logged the algorithm version, questions, answers, timestamps, and confidence changes so a person can review how a recommendation was reached. Lunara supports call agents; it does not make autonomous clinical decisions."
      ]
    },
    {
      label: "result",
      body: [
        "Lunara won first place in the Women's Health category at Rutgers HealthHack 2025. The win gave us a reason to keep going after the weekend, with the next phase focused on hospital workflow integration, authentication, and production deployment."
      ]
    }
  ]
};

export default function createLunara(): ProjectItem {
  return new ProjectItem(
    "Lunara",
    "AI-powered triage system for healthcare, winning 1st place at Rutgers HealthHack 2025. Currently working with Rutgers on a completer program to bring to production.",
    "https://github.com/Jairik/RUHealthHack-25",
    ["AWS", "React", "JavaScript", "Vite", "Node.js", "FastAPI", "Python", "Scikit-Learn", "Terraform"],
    "October 2025 - Present",
    [
      "/projects/Lunara-1.png",
      "/projects/Lunara-2.png",
      "/projects/Lunara-3.png",
      "/projects/Lunara-4.png",
      "/projects/Lunara-5.png",
      "/projects/Lunara-6.png",
      "/projects/Lunara-7.png",
      "/projects/Lunara-8.png"
    ],
    "",
    "https://www.youtube.com/watch?v=ntU7dSQPw1w",
    true,
    true,
    "1st · Rutgers HealthHack 2025"
  );
}
