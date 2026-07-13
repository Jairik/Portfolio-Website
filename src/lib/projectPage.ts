/* View-model + helpers for the per-project detail pages (/projects/<slug>).
   Merges a project's home-page data with the long-form content exported by
   its module in src/assets/projects/. */
import { PROJECTS, PROJECT_BY_SLUG, slug as toSlug, type HomeProject } from "./terminalHomeData";
import { projectContent, type ProjectPageExtra } from "../assets/projects";
import { topicsForProject } from "./topicPage";

// One segment of the meta line under the title (date · status · N shots · tags).
// `to` turns the segment into a link (used to point the tag at its topic page).
export interface MetaSegment { label: string; accent?: boolean; to?: string }

// Prev / next project in the home-page list (featured → current → past)
export interface ProjectNeighbor {
  slug: string;
  title: string;
  to: string; // /projects/<slug>/
}

// Canonical topic hub linked from the project metadata rail.
export interface ProjectTopicLink {
  key: string;
  label: string;
  to: string;
}

// Everything a project detail page needs, resolved from a slug
export interface ProjectPageView {
  project: HomeProject;
  slug: string;
  extra: ProjectPageExtra;
  statusLabel: string; // "running" (current work) | "shipped" | override
  embedUrl: string | null; // normalized YouTube embed URL, or null
  meta: MetaSegment[];
  topics: ProjectTopicLink[];
  prev: ProjectNeighbor; // wraps to the last project from the first
  next: ProjectNeighbor; // wraps to the first project from the last
}

/* Builds a neighbor link for the project at `index` in the ordered PROJECTS list */
function neighborAt(index: number): ProjectNeighbor {
  const project = PROJECTS[index];
  const slug = toSlug(project.title);
  return { slug, title: project.title, to: `/projects/${slug}/` };
}

/* Resolves prev/next around `slug` in the home-page project order (wraps) */
export function getProjectNeighbors(slug: string): { prev: ProjectNeighbor; next: ProjectNeighbor } | null {
  const index = PROJECTS.findIndex(p => toSlug(p.title) === slug);
  if (index < 0 || PROJECTS.length === 0) return null;
  const last = PROJECTS.length - 1;
  return {
    prev: neighborAt(index === 0 ? last : index - 1),
    next: neighborAt(index === last ? 0 : index + 1)
  };
}

/* Normalizes any YouTube URL (watch?v=, youtu.be/, /embed/) to an embed URL */
export function youtubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    let id = "";
    if (u.hostname.includes("youtu.be")) id = u.pathname.replace(/^\//, "");
    else if (u.pathname.startsWith("/embed/")) id = u.pathname.slice("/embed/".length);
    else id = u.searchParams.get("v") ?? "";
    id = id.split("/")[0]; // drop any trailing path segments
    return id ? `https://www.youtube.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

/* Resolves a URL slug to its full page view, or null when no project matches
   (the caller renders the site 404 in that case) */
export function getProjectPageView(slugParam: string): ProjectPageView | null {
  const slug = slugParam.toLowerCase();
  const project = PROJECT_BY_SLUG[slug];
  if (!project) return null;

  const neighbors = getProjectNeighbors(slug);
  if (!neighbors) return null;

  const extra = projectContent[slug] ?? {};
  const statusLabel = extra.status ?? (project.current ? "running" : "shipped");
  const embedUrl = youtubeEmbedUrl(project.video);
  const projectTopics = topicsForProject(slug);
  const projectTopicLinks = projectTopics.map(topic => ({
    ...topic,
    to: `/${topic.key}/`
  }));

  // Build the meta line, dropping segments the project has no data for
  const meta: MetaSegment[] = [];
  if (project.date) meta.push({ label: project.date, accent: true });
  meta.push({ label: `● ${statusLabel}`, accent: true });
  const n = project.images.length;
  if (n) meta.push({ label: `${n} screenshot${n > 1 ? "s" : ""}` });
  if (extra.tags) meta.push({ label: extra.tags });

  return {
    project,
    slug,
    extra,
    statusLabel,
    embedUrl,
    meta,
    topics: projectTopicLinks,
    ...neighbors
  };
}
