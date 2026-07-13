/*
  Copy for the extended "About" page (src/components/about-page/*), served at /about.

  The page's intro prose is NOT configured here — it is pulled live from the
  shared `aboutParagraphs` in constantVars.ts (the same three paragraphs the
  home page's Readme section shows), so editing it in one place updates both.

  THIS file holds the entity identity strip (name, location, headshot, links)
  plus the extra long-form sections (Education, Awards, Leadership, Beyond).
  Each section needs a `body` array of paragraphs; if `body` is missing or
  empty, the page shows a dashed fallback hint from `placeholder`.

  Add or remove whole sections by editing the array below; order here is render order.
*/

/* ---------- page header chrome ---------- */
export const aboutPage = {
  host: "jj@portfolio:~/about$", // topbar prompt
  headerCommand: "cat ~/about.md — the extended cut", // "# <command>" above the title
  title: "Readme", // decorative terminal label retained above the descriptive H1
  pageHeading: 'About Jairik "JJ" McCauley',
  whoami: { host: "jj@portfolio:~$", command: "whoami" } // prompt above the intro prose
} as const;

/* ---------- identity strip (matches Person schema on every page) ---------- */
export const aboutIdentity = {
  // Default/SSR headshot; the about page randomizes from mePictures on the client
  headshot: "/me-pictures/BAH-Professional.png",
  headshotAlt: "Professional headshot of Jairik \"JJ\" McCauley",
  name: 'Jairik "JJ" McCauley',
  role: "Full Stack Developer",
  location: "Salisbury, MD",
  // Opens the full me-pictures lightbox (icon button; aria-label only)
  popoutAria: "View all photos",
  // Links that should stay visible so they match Person.sameAs + resume
  links: [
    { label: "GitHub", href: "https://github.com/Jairik" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jairik-mccauley/" },
    { label: "Resume", href: "/Jairik_McCauley_Resume.pdf" },
    { label: "Press", href: "/press/" }
  ]
} as const;

/* ---------- extended sections ---------- */
export interface AboutMdSection {
  file: string; // shown in the "$ cat <file>" prompt, e.g. "~/about/education.md"
  title: string; // section heading, e.g. "Education"
  placeholder: string; // dashed hint shown only when `body` is empty
  body?: string[]; // real paragraphs; presence hides the placeholder
}

export const aboutSections: AboutMdSection[] = [
  {
    file: "~/about/education.md",
    title: "Education",
    placeholder: "degrees, focus areas, honors, notable coursework.",
    body: [
      "At Salisbury University, I earned B.S. degrees in Computer Science and Data Science, focusing on artificial intelligence and software engineering in Computer Science and computational data science in Data Science. I graduated magna cum laude through the Clarke Honors College with a 3.85 GPA, the highest in the department.",
      "Notable coursework included Software Engineering I & II; Object-Oriented Programming and GUI Design; introductory and advanced data structures and algorithms; database design and implementation; distributed and high-performance computing; computer networking; operating systems and systems software; data visualization and machine learning; artificial intelligence; theory of computation; computer architecture; linear algebra; discrete mathematics; and Calculus I & II."
    ]
  },
  {
    file: "~/about/awards.md",
    title: "Awards & Honors",
    placeholder:
      "hackathon placements, UPE academic achievement award, department awards, honor societies.",
    body: [
      "My academic honors include Salisbury University's 2026 Most Promising Computer Scientist Award and the 2025 Upsilon Pi Epsilon Academic Achievement Award, of which I also served as president for 24-25 and 25-26. I was also inducted into Pi Mu Epsilon and Chi Alpha Sigma and earned CSC Academic All-District recognition as a student-athlete.",
      "At Rutgers HealthHack 2025, my team won first place in the Women's Health category with Lunara, an AI-powered healthcare triage platform. At HackUMBC 2024, our TestifAI project placed second overall and won Best Educational Hack. I am definitely looking forward to more hackathons in the future!"
    ]
  },
  {
    file: "~/about/leadership.md",
    title: "Leadership & Community",
    placeholder: "UPE presidency, tutoring & lab assistance, clubs, volunteering, talks.",
    body: [
      "I served as president of both Salisbury University's Upsilon Pi Epsilon honors society chapter and its Computer Science, Math & Data Science Club, helping represent and strengthen the department's student community.",
      "As a Computer Science Department Tutor & Lab Assistant, I supported students across the undergraduate curriculum, from software engineering and artificial intelligence to cybersecurity and systems programming. I specialized in helping students work through data structures, IPC, signals, and threading in C and Linux. I also spent two years as a Resident Assistant, mentoring more than 300 residents and earning Salisbury University's Best Community Builder award.",
      "I have presented technical work to audiences ranging from Salisbury's campus community to senior client leadership. That includes introducing GullHacks (an initiative to start Salisbury University's first hackathon) at the 2025 Salisbury University Student Research Conference, presenting \"The Practical AI: Designing Solutions for Real-World Problems\" to industry leadership, and demonstrating my Booz Allen team's cyber-physical analytics platform to a senior military general."
    ]
  },
  {
    file: "~/about/beyond.md",
    title: "Beyond the Terminal",
    placeholder: "track & field, music, games, the annual Shining Force run, dog pictures.",
    body: [
      "Outside the terminal, I competed as a thrower on Salisbury University's varsity track & field team. The sport gave me a demanding counterweight to school and software, along with a community I am proud to have been part of and lifelong friendships.",
      "I am also into rock and metal, Slay the Spire, and an annual run through Shining Force on the Sega Genesis. I am also a big dog person—especially when corgis are involved, even if my allergies disagree. Also, my favorite YouTuber is ThePrimeagen (I use Arch btw) (I use vim btw) (Still use QWERTY tho)."
    ]
  }
];
