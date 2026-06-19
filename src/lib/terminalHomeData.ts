/* Site data reshaped for the terminal home page. Everything here derives
   from the shared assets files (projects.ts, experience.ts, constantVars.ts,
   terminalContent.ts), so content edits in src/assets/ flow straight through
   to the page without touching any component code. */
import { getProjectItems, personImageAlt, projectImageAlt } from "../assets/projects";
import { technologyItems, type TechnologyCategory } from "../assets/experience";
import { mePictures } from "../assets/constantVars";
import * as C from "../assets/terminalContent";

/* Converts a project title into its fake "~/projects/<slug>" directory name */
export const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Normalized project shape (mirrors the structure the design was built around)
export interface HomeProject {
  title: string; date: string; desc: string; tech: string[]; images: string[];
  code: string; demo: string; video: string; award: string; closed: boolean;
  group: "featured" | "current" | "past";
}

// All projects, grouped featured → current → past (matches the design's ordering)
const GROUP_ORDER = { featured: 0, current: 1, past: 2 } as const;
export const PROJECTS: HomeProject[] = getProjectItems()
  .map(p => ({
    title: p.title,
    date: p.date || "",
    desc: p.description,
    tech: p.techStack,
    images: p.imageSrc || [],
    code: p.link,
    demo: p.demoLink || "",
    video: p.demoVideoLink || "",
    award: p.award || "",
    closed: !p.link,  // empty GitHub link means the source is closed
    group: (p.featured ? "featured" : p.current ? "current" : "past") as HomeProject["group"]
  }))
  .sort((a, b) => GROUP_ORDER[a.group] - GROUP_ORDER[b.group]);

// Featured projects get the big poster windows; the rest become archive rows
export const FEATURED = PROJECTS.filter(p => p.group === "featured");
export const ARCHIVE = PROJECTS.filter(p => p.group !== "featured");

// Skill wall renders these categories in this order
const SKILL_CATEGORIES: TechnologyCategory[] = [
  "Frontend & UI",
  "Backend & Infrastructure",
  "Data, AI & Productivity"
];

// Skills grouped by category for the arsenal wall
export const SKILLS: [string, { name: string; icon: string; note?: string }[]][] =
  SKILL_CATEGORIES.map(cat => [
    cat,
    technologyItems.filter(t => t.category === cat).map(t => ({ name: t.name, icon: t.iconSrc, note: t.note }))
  ]);

// Every image on the site (project screenshots + personal photos) for /dev/media
export interface MediaItem { src: string; cat: "projects" | "me"; title: string; cap: string; alt: string }
export const MEDIA: MediaItem[] = [
  ...PROJECTS.flatMap(p => p.images.map((im, j) => ({
    src: im, cat: "projects" as const, title: p.title,
    cap: `screenshot ${j + 1} of ${p.images.length} · ${p.date}`,
    alt: projectImageAlt(p.title, p.desc, j, p.images.length)
  }))),
  ...mePictures.map(pic => ({
    src: pic.path, cat: "me" as const, title: C.media.mePicturesTitle, cap: pic.label,
    alt: personImageAlt(pic.label)
  }))
];

// Media filter tabs with live counts
export const MEDIA_CATS = [
  { id: "all", label: `all (${MEDIA.length})` },
  { id: "projects", label: `projects (${MEDIA.filter(m => m.cat === "projects").length})` },
  { id: "me", label: `me (${MEDIA.filter(m => m.cat === "me").length})` }
] as const;

// Union of the media filter tab ids ("all" | "projects" | "me")
export type MediaCatId = (typeof MEDIA_CATS)[number]["id"];
