/* View-model + helpers for the per-project detail pages (/projects/<slug>).
   Merges a project's home-page data with the long-form content exported by
   its module in src/assets/projects/. */
import { PROJECT_BY_SLUG, type HomeProject } from "./terminalHomeData";
import { projectContent, type ProjectPageExtra } from "../assets/projects";
import { primaryTopicForSlug } from "./topicPage";

// One segment of the meta line under the title (date · status · N shots · tags).
// `to` turns the segment into a link (used to point the tag at its topic page).
export interface MetaSegment { label: string; accent?: boolean; to?: string }

// Everything a project detail page needs, resolved from a slug
export interface ProjectPageView {
  project: HomeProject;
  slug: string;
  extra: ProjectPageExtra;
  statusLabel: string; // "running" (current work) | "shipped" | override
  embedUrl: string | null; // normalized YouTube embed URL, or null
  meta: MetaSegment[];
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

  const extra = projectContent[slug] ?? {};
  const statusLabel = extra.status ?? (project.current ? "running" : "shipped");
  const embedUrl = youtubeEmbedUrl(project.video);

  // Build the meta line, dropping segments the project has no data for
  const meta: MetaSegment[] = [];
  if (project.date) meta.push({ label: project.date, accent: true });
  meta.push({ label: `● ${statusLabel}`, accent: true });
  const n = project.images.length;
  if (n) meta.push({ label: `${n} screenshot${n > 1 ? "s" : ""}` });
  if (extra.tags) {
    // Link the tag to the project's primary topic page, when it belongs to one
    const topic = primaryTopicForSlug(slug);
    meta.push({ label: extra.tags, to: topic ? `/topics/${topic}` : undefined });
  }

  return { project, slug, extra, statusLabel, embedUrl, meta };
}
