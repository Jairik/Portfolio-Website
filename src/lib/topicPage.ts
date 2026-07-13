/* View-model + helpers for the topic pages (/<key> canonical, /topics/<key> alias).
   Merges the editorial topic curation from src/assets/topics.ts with the live
   project data (PROJECT_BY_SLUG) and tool icons (getTechnologyIcon) into one
   shape the page components consume. Also exposes the reverse lookup used to
   link a project's tag back to its topic on the detail pages. */
import { topics, topicOrder, type TopicDef } from "../assets/topics";
import { PROJECT_BY_SLUG, type HomeProject } from "./terminalHomeData";
import { getTechnologyIcon } from "../assets/experience";

// The topic served at bare /topics (and the switcher's first tab)
export const DEFAULT_TOPIC = topicOrder[0];

// A headline tool with its resolved icon (null when no icon is known)
export interface TopicTool {
  name: string;
  icon: string | null;
}

// One switcher tab
export interface TopicTab {
  key: string;
  label: string;
  active: boolean;
}

// Everything a topic page needs, resolved from a topic key
export interface TopicPageView {
  key: string;
  def: TopicDef;
  projects: HomeProject[];
  tools: TopicTool[];
  projectCount: number;
  toolCount: number;
  tabs: TopicTab[];
}

/* Resolves a topic key (or undefined → the default topic) to its full view,
   or null when the key is unknown (the caller renders the site 404). */
export function getTopicPageView(topicParam?: string): TopicPageView | null {
  const key = (topicParam ?? DEFAULT_TOPIC).toLowerCase();
  const def = topics[key];
  if (!def) return null;

  // Live projects, in the curated order; silently drop any unknown slug
  const projects = def.projects
    .map(slug => PROJECT_BY_SLUG[slug])
    .filter((p): p is HomeProject => Boolean(p));

  const tools: TopicTool[] = def.tools.map(name => ({ name, icon: getTechnologyIcon(name) }));

  const tabs: TopicTab[] = topicOrder.map(k => ({
    key: k,
    label: topics[k].label,
    active: k === key
  }));

  return { key, def, projects, tools, projectCount: projects.length, toolCount: tools.length, tabs };
}

/* Every topic that lists this project slug, in topicOrder order. */
export function topicsForProject(slug: string): { key: string; label: string }[] {
  return topicOrder
    .filter(k => topics[k].projects.includes(slug))
    .map(k => ({ key: k, label: topics[k].label }));
}

/* The first topic (in topicOrder) that lists this project slug, or null. */
export function primaryTopicForSlug(slug: string): string | null {
  return topicOrder.find(k => topics[k].projects.includes(slug)) ?? null;
}
