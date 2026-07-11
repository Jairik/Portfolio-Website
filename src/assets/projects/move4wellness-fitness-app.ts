import { ProjectItem } from "./project-item";
import type { ProjectPageExtra } from "./page-content";

export const content: ProjectPageExtra = {
  tags: "mobile",
  about: [
    "Move4Wellness is a native Android fitness tracker with separate experiences for regular users and managers. Users can log workouts, review history, switch between weekly and monthly charts, read notifications, and manage their profile. Managers can inspect aggregate activity and send announcements to everyone using the app.",
    "The role split made it more than a collection of workout forms. Login has to route each account to the right dashboard, and both views need to stay consistent with the same Firestore data."
  ],
  sections: [
    {
      label: "architecture",
      body: [
        "The app uses Java Activities and XML layouts, with Firebase Authentication for accounts and Firestore for users, activities, and notifications. Logging a workout writes to a user subcollection and uses atomic increments for total minutes and exercise count. MPAndroidChart turns those records into weekly, monthly, and overall views.",
        "It follows a straightforward Activity-centered design, so validation, database calls, and UI behavior often live in the same classes. That kept the prototype understandable, but it also left the code tightly coupled and most testing manual."
      ]
    }
  ]
};

export default function createMove4WellnessFitnessApp(): ProjectItem {
  return new ProjectItem(
    "Move4Wellness Fitness App",
    "Prototype mobile app promoting physical activity through personalized workout plans and progress tracking.",
    "https://github.com/Jairik/MOVE4WELLNESS-Android-App",
    ["Java", "Android Studio", "Firebase", "Figma"],
    "April 2024 - May 2024",
    [
      "/projects/MOVE4WELLNESS-1.png",
      "/projects/MOVE4WELLNESS-2.png",
      "/projects/MOVE4WELLNESS-3.png",
      "/projects/MOVE4WELLNESS-4.png"
    ],
    "",
    "",
    false
  );
}
