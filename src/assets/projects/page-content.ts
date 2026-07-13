export const projectPage = {
  titleSuffix: "JJ McCauley",
  topHost: "jj@portfolio:~/projects$",
  promptHost: "jj@portfolio:~$",
  links: {
    source: "view source",
    demo: "watch demo",
    live: "open live",
    back: "all projects",
    backTarget: "/#projects"
  },
  // Top-of-body prev/next labels; `{title}` is replaced with the neighbor name
  prevLabel: "previous",
  nextLabel: "next",
  prevAria: "Previous project: {title}",
  nextAria: "Next project: {title}",
  footBack: "~/projects",
  footBackTarget: "/#projects",
  noImagesClosed: "no images — source and assets are closed.",
  noImagesOpen: "no images — this one lives in the code."
} as const;

/* Shown only when a project file has no `about` paragraphs yet */
export const aboutPlaceholders = [
  "longer description, part 1: the problem and who it's for.",
  "longer description, part 2: architecture, your role, the hard problems, and the results."
];

export interface ProjectSection {
  label?: string;
  body: string[];
}

export interface ProjectPageExtra {
  tags?: string;
  status?: string;
  about?: string[];
  sections?: ProjectSection[];
}
