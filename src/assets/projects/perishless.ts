import { ProjectItem } from "./project-item";
import type { ProjectPageExtra } from "./page-content";

export const content: ProjectPageExtra = {
  tags: "ai / full-stack",
  about: [
    "I built PerishLess after getting tired of finding food in my own kitchen after it had already expired. The pantry can be filled manually, by barcode, or from a scanned receipt, then filtered by category, expiration window, and whether an item could be donated.",
    "The app suggests recipes and priority meals from food that needs to be used soon. It also has a community feed for giveaways, recipes, and other food-related posts, with optional location data for nearby exchanges."
  ],
  sections: [
    {
      label: "architecture",
      body: [
        "The client is a React and TypeScript single-page app backed by asynchronous FastAPI services. Firebase handles sign-in, while Firestore stores pantry items, posts, reactions, and user activity. A Cloud SQL database caches food records from OpenFoodFacts because relying on that API for every request was painfully slow.",
        "Gemini powers pantry questions and recipe suggestions, and ElevenLabs adds speech input and playback. Docker Compose runs the services behind Nginx on a DigitalOcean VPS. Getting that first deployment working ate roughly eight hours by itself, but it forced me to learn the networking and reverse-proxy pieces instead of treating deployment as somebody else's problem."
      ]
    }
  ]
};

export default function createPerishLess(): ProjectItem {
  return new ProjectItem(
    "PerishLess",
    "Food waste reduction platform that uses AI to predict spoilage and optimize inventory management for households.",
    "https://github.com/Jairik/Perishless",
    [
      "React",
      "TypeScript",
      "Vite",
      "FastAPI",
      "Python",
      "Firebase Authentication",
      "FireStore",
      "Google Cloud",
      "Google Gemini",
      "Eleven Labs",
      "Docker",
      "Digital Ocean Droplet (VPS)",
      "Nginx"
    ],
    "March 2026",
    [
      "/projects/Perishless-1.png",
      "/projects/Perishless-2.png",
      "/projects/Perishless-3.png",
      "/projects/Perishless-4.png"
    ],
    "",
    "https://youtu.be/nwS19i9P33c",
    true
  );
}
