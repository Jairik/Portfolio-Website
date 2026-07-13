import { getProjectItems, projectImageAlt } from "../assets/projects";
import { aboutIdentity } from "../assets/aboutContent";
import { articleItems } from "../assets/stories";
import { topics, topicOrder } from "../assets/topics";
import { slug } from "./terminalHomeData";

export type SitemapChangeFrequency = "weekly" | "monthly" | "yearly";

// JSON-LD source for a project detail page (CreativeWork / SoftwareSourceCode)
export interface SeoProject {
  name: string;
  description: string;
  keywords: string[];
  image: string;
  code: string;
  demo: string;
  video: string;
  date: string;
}

export interface SeoRoute {
  path: string;
  title: string;
  description: string;
  breadcrumbName: string;
  includeInSitemap: boolean;
  prerender: boolean;
  outputPath?: string;
  aliases?: string[];
  changeFrequency?: SitemapChangeFrequency;
  priority?: number;
  robots?: "index,follow" | "noindex" | "noindex,follow";
  socialImage?: string; // og/twitter image (defaults to the site screenshot)
  imageAlt?: string; // alt text for the social image
  project?: SeoProject; // present on /projects/<slug> routes
  pageType?: string; // schema.org WebPage subtype (e.g. CollectionPage, AboutPage)
  sourceFiles?: string[]; // content files used to derive an accurate sitemap lastmod
}

const SITE_URL = "https://jjmccauley.com";
const SITE_NAME = "JJ McCauley";
const DEFAULT_SOCIAL_IMAGE = "/projects/Portfolio-Website.png";
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const absoluteUrl = (path: string) => new URL(path, `${SITE_URL}/`).toString();

const staticRoutes: SeoRoute[] = [
  {
    path: "/",
    outputPath: "index.html",
    title: "JJ McCauley | Full Stack Developer",
    description:
      "Portfolio of JJ McCauley, a full-stack developer and Computer Science/Data Science student building React, AI, data, and software engineering projects.",
    breadcrumbName: "Home",
    includeInSitemap: true,
    prerender: true,
    changeFrequency: "monthly",
    priority: 1,
    sourceFiles: [
      "src/assets/terminalContent.ts",
      "src/assets/constantVars.ts",
      "src/assets/experience.ts",
      "src/assets/projects"
    ]
  },
  {
    path: "/terminal/",
    outputPath: "terminal/index.html",
    aliases: ["terminal.html"],
    title: "Interactive Terminal Portfolio | JJ McCauley",
    description:
      "Explore JJ McCauley's projects, skills, experience, and contact links through an interactive terminal interface.",
    breadcrumbName: "Terminal",
    includeInSitemap: false,
    prerender: true,
    robots: "noindex,follow",
    changeFrequency: "monthly",
    priority: 0.8,
    sourceFiles: ["src/components/Terminal.tsx", "src/assets/projects", "src/assets/experience.ts"]
  },
  {
    path: "/simple/",
    outputPath: "simple/index.html",
    aliases: ["simple.html"],
    title: "Simple Portfolio | JJ McCauley",
    description:
      "A lightweight portfolio view for JJ McCauley with software projects, technical skills, experience, and contact information.",
    breadcrumbName: "Simple Portfolio",
    includeInSitemap: false,
    prerender: true,
    robots: "noindex,follow",
    changeFrequency: "monthly",
    priority: 0.7,
    sourceFiles: ["src/components/SimplePortfolio.tsx", "src/assets/projects", "src/assets/experience.ts"]
  },
  {
    path: "/resume/",
    outputPath: "resume/index.html",
    aliases: ["resume.html"],
    title: "Resume | JJ McCauley",
    description: "View or download JJ McCauley's software engineering and data science resume.",
    breadcrumbName: "Resume",
    includeInSitemap: true,
    prerender: true,
    changeFrequency: "monthly",
    priority: 0.7,
    sourceFiles: ["src/components/Resume.tsx", "public/Jairik_McCauley_Resume.pdf"]
  },
  {
    path: "/links/",
    outputPath: "links/index.html",
    title: "Links | JJ McCauley",
    description: "Links to JJ McCauley's LinkedIn, email, website, X, and GitHub.",
    breadcrumbName: "Links",
    includeInSitemap: true,
    prerender: false,
    changeFrequency: "monthly",
    priority: 0.6,
    sourceFiles: ["public/links/index.html"]
  },
  {
    path: "/about/",
    outputPath: "about/index.html",
    title: "About | JJ McCauley",
    description:
      "About Jairik \"JJ\" McCauley — a full-stack software engineer and Computer Science/Data Science grad: background, education, awards, leadership, and life beyond the terminal.",
    breadcrumbName: "About",
    includeInSitemap: true,
    prerender: true,
    changeFrequency: "monthly",
    priority: 0.7,
    pageType: "AboutPage",
    sourceFiles: ["src/assets/aboutContent.ts", "src/assets/constantVars.ts"]
  },
  {
    path: "/press/",
    outputPath: "press/index.html",
    title: "Press | JJ McCauley",
    description:
      "Press and coverage of JJ McCauley's work — hackathon wins, awards, and features from Salisbury University and beyond.",
    breadcrumbName: "Press",
    includeInSitemap: true,
    prerender: true,
    changeFrequency: "monthly",
    priority: 0.6,
    pageType: "CollectionPage",
    sourceFiles: ["src/assets/stories.ts"]
  },
  {
    // /projects index — a crawlable listing that links to every project detail
    // page. Distinct from the auto-generated /projects/<slug>/ routes below.
    path: "/projects/",
    outputPath: "projects/index.html",
    title: "Projects | JJ McCauley",
    description:
      "Every project by JJ McCauley — full-stack apps, AI tooling, data science, and systems work, each with a full write-up.",
    breadcrumbName: "Projects",
    includeInSitemap: true,
    prerender: true,
    changeFrequency: "monthly",
    priority: 0.7,
    pageType: "CollectionPage",
    sourceFiles: ["src/assets/projects", "src/components/projects-page/ProjectsPage.tsx"]
  },
  {
    path: "/404",
    outputPath: "404.html",
    title: "404 | JJ McCauley",
    description: "The requested page could not be found on JJ McCauley's portfolio.",
    breadcrumbName: "404",
    includeInSitemap: false,
    prerender: true,
    robots: "noindex"
  }
];

// One prerendered, sitemap-listed route per project. Titles/descriptions/images
// derive from src/assets/projects/, so adding a project adds its detail page.
const truncate = (value: string, max = 160) =>
  value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value;

// Two display-title slugs differ from their source filenames. Keeping the
// exceptions here lets sitemap dates follow the exact project content file.
const PROJECT_SOURCE_FILE_OVERRIDES: Record<string, string> = {
  claritycash: "clarity-cash",
  knowyouruni: "know-your-uni"
};

const projectRoutes: SeoRoute[] = getProjectItems().map(project => {
  const projectSlug = slug(project.title);
  const sourceFileSlug = PROJECT_SOURCE_FILE_OVERRIDES[projectSlug] ?? projectSlug;
  const images = project.imageSrc ?? [];
  const socialImage = images[0] || DEFAULT_SOCIAL_IMAGE;
  const imageAlt = images.length
    ? projectImageAlt(project.title, project.description, 0, images.length)
    : `${project.title} — project by JJ McCauley`;

  return {
    path: `/projects/${projectSlug}/`,
    outputPath: `projects/${projectSlug}/index.html`,
    title: `${project.title} — JJ McCauley`,
    description: truncate(project.description),
    breadcrumbName: project.title,
    includeInSitemap: true,
    prerender: true,
    changeFrequency: "monthly",
    priority: 0.6,
    socialImage,
    imageAlt,
    project: {
      name: project.title,
      description: project.description,
      keywords: project.techStack,
      image: socialImage,
      code: project.link || "",
      demo: project.demoLink || "",
      video: project.demoVideoLink || "",
      date: project.date || ""
    },
    sourceFiles: [`src/assets/projects/${sourceFileSlug}.ts`]
  };
});

// Canonical topic hubs live at /<key>/ (e.g. /ai-engineering/). /topics/<key>/
// and bare /topics/ stay as prerendered aliases so old links keep working.
const DEFAULT_TOPIC = topicOrder[0];

const topicRoutes: SeoRoute[] = [
  {
    // Default hub also prerenders /topics/ and /topics/<key>/ as aliases
    path: `/${DEFAULT_TOPIC}/`,
    outputPath: `${DEFAULT_TOPIC}/index.html`,
    aliases: ["topics/index.html", `topics/${DEFAULT_TOPIC}/index.html`],
    title: `${topics[DEFAULT_TOPIC].title} — JJ McCauley`,
    description: truncate(topics[DEFAULT_TOPIC].intro),
    breadcrumbName: topics[DEFAULT_TOPIC].title,
    includeInSitemap: true,
    prerender: true,
    changeFrequency: "monthly",
    priority: 0.6,
    pageType: "CollectionPage",
    sourceFiles: ["src/assets/topics.ts"]
  },
  ...topicOrder.slice(1).map(key => ({
    path: `/${key}/`,
    outputPath: `${key}/index.html`,
    aliases: [`topics/${key}/index.html`],
    title: `${topics[key].title} — JJ McCauley`,
    description: truncate(topics[key].intro),
    breadcrumbName: topics[key].title,
    includeInSitemap: true,
    prerender: true,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    pageType: "CollectionPage",
    sourceFiles: ["src/assets/topics.ts"]
  }))
];

export const seoRoutes: SeoRoute[] = [...staticRoutes, ...projectRoutes, ...topicRoutes];

export const prerenderRoutes = seoRoutes.filter(
  (route): route is SeoRoute & { outputPath: string } => route.prerender && Boolean(route.outputPath)
);

// Converts every directory-backed path to the canonical trailing-slash form.
// Query strings and hashes do not affect which route owns the document head.
export const normalizeSeoPath = (pathname: string): string => {
  const pathOnly = pathname.split(/[?#]/, 1)[0] || "/";
  const normalized = `/${pathOnly}`.replace(/\/+/g, "/");
  if (normalized === "/" || normalized === "/404") return normalized;
  return `${normalized.replace(/\/+$/, "")}/`;
};

// Resolves canonical paths and the legacy aliases that remain available on
// GitHub Pages. Unknown paths deliberately receive the noindex 404 metadata.
export const findSeoRoute = (pathname: string): SeoRoute => {
  const normalized = normalizeSeoPath(pathname);
  const defaultTopicRoute = topicRoutes[0];
  const notFoundRoute = staticRoutes.find(route => route.path === "/404")!;

  if (normalized === "/topics/") return defaultTopicRoute;

  const topicAlias = normalized.match(/^\/topics\/([^/]+)\/$/);
  if (topicAlias) {
    const canonicalTopic = topicRoutes.find(route => route.path === `/${topicAlias[1]}/`);
    if (canonicalTopic) return canonicalTopic;
  }

  const htmlAlias = normalized.match(/^\/(terminal|simple|resume)\.html\/$/);
  if (htmlAlias) {
    const canonicalAlias = seoRoutes.find(route => route.path === `/${htmlAlias[1]}/`);
    if (canonicalAlias) return canonicalAlias;
  }

  return seoRoutes.find(route => route.path === normalized) ?? notFoundRoute;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const escapeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

const MONTH_NUMBERS: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12"
};

// Converts authored project ranges into valid ISO month values. Unknown formats
// return an empty object so structured data never contains a guessed date.
const projectDateSchema = (
  value: string
): { dateCreated?: string; temporalCoverage?: string } => {
  const monthPattern =
    /(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})/gi;
  const matches = Array.from(value.matchAll(monthPattern));

  if (matches.length === 0) {
    const year = value.match(/\b(19|20)\d{2}\b/)?.[0];
    return year ? { dateCreated: year, temporalCoverage: year } : {};
  }

  const asIsoMonth = (match: RegExpMatchArray) =>
    `${match[2]}-${MONTH_NUMBERS[match[1].toLowerCase()]}`;
  const start = asIsoMonth(matches[0]);
  const end = matches[1] ? asIsoMonth(matches[1]) : /present/i.test(value) ? ".." : start;

  return {
    dateCreated: start,
    temporalCoverage: `${start}/${end}`
  };
};

// Converts the exact MM/DD/YYYY dates in stories.ts to schema.org ISO dates.
const articleDate = (value: string): string | null => {
  const [month, day, year] = value.split("/").map(Number);
  if (!year || !month || !day) return null;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

const datedArticles = articleItems
  .map(article => ({ ...article, isoDate: articleDate(article.date) }))
  .filter((article): article is typeof article & { isoDate: string } => Boolean(article.isoDate));

const latestPressDate = datedArticles
  .map(article => article.isoDate)
  .sort()
  .at(-1);

const personNode = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "JJ McCauley",
  // Visible /about identity uses both forms so crawlers can connect them
  alternateName: ["Jairik McCauley", 'Jairik "JJ" McCauley'],
  url: absoluteUrl("/"),
  image: absoluteUrl("/me-pictures/BAH-Professional.png"),
  jobTitle: "Full Stack Developer",
  email: "mailto:mjairik@gmail.com",
  homeLocation: {
    "@type": "Place",
    name: aboutIdentity.location
  },
  sameAs: [
    "https://github.com/Jairik",
    "https://www.linkedin.com/in/jairik-mccauley/",
    "https://x.com/JairikJJ",
    "https://devpost.com/Jairik"
  ],
  knowsAbout: [
    "React",
    "TypeScript",
    "JavaScript",
    "Python",
    "Data Science",
    "AI",
    "Software Engineering",
    "Web Development"
  ]
};

const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE_NAME,
  url: absoluteUrl("/"),
  publisher: { "@id": PERSON_ID }
};

const webPageNode = (route: SeoRoute) => ({
  "@type": route.pageType ?? "WebPage",
  "@id": `${absoluteUrl(route.path)}#webpage`,
  url: absoluteUrl(route.path),
  name: route.title,
  description: route.description,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": PERSON_ID },
  ...(route.path === "/press/" && latestPressDate ? { dateModified: latestPressDate } : {})
});

const breadcrumbNode = (route: SeoRoute) => {
  const items =
    route.path === "/"
      ? [{ name: "Home", item: absoluteUrl("/") }]
      : [
          { name: "Home", item: absoluteUrl("/") },
          { name: route.breadcrumbName, item: absoluteUrl(route.path) }
        ];

  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item
    }))
  };
};

const projectNode = (route: SeoRoute) => {
  const project = route.project!;
  const hasCode = Boolean(project.code);

  return {
    // Open-source projects are SoftwareSourceCode; closed ones are CreativeWork
    "@type": hasCode ? "SoftwareSourceCode" : "CreativeWork",
    "@id": `${absoluteUrl(route.path)}#project`,
    name: project.name,
    headline: project.name,
    description: project.description,
    url: absoluteUrl(route.path),
    image: absoluteUrl(project.image),
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    ...projectDateSchema(project.date),
    ...(project.keywords.length ? { keywords: project.keywords.join(", ") } : {}),
    ...(hasCode ? { codeRepository: project.code, programmingLanguage: project.keywords } : {})
  };
};

// Describes the dated external coverage collected on the Press page.
const pressItemListNode = {
  "@type": "ItemList",
  "@id": `${absoluteUrl("/press/")}#press-items`,
  itemListElement: datedArticles.map((article, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Article",
      headline: article.heading,
      url: article.linkToArticle,
      datePublished: article.isoDate,
      publisher: {
        "@type": "Organization",
        name: article.source
      }
    }
  }))
};

const buildJsonLd = (route: SeoRoute) => ({
  "@context": "https://schema.org",
  "@graph": [
    personNode,
    websiteNode,
    webPageNode(route),
    breadcrumbNode(route),
    ...(route.project ? [projectNode(route)] : []),
    ...(route.path === "/press/" ? [pressItemListNode] : [])
  ]
});

// A shared, serializable description of every SEO-owned head field. Both the
// build-time renderer and the SPA navigation hook consume this same object.
export interface SeoHeadDescriptor {
  title: string;
  description: string;
  robots: string;
  canonical: string;
  ogType: string;
  siteName: string;
  image: string;
  imageAlt: string;
  jsonLd: ReturnType<typeof buildJsonLd>;
}

// Builds route metadata without touching the DOM so it is safe in SSR and Node.
export const buildSeoHead = (route: SeoRoute): SeoHeadDescriptor => ({
  title: route.title,
  description: route.description,
  robots: route.robots ?? "index,follow",
  canonical: absoluteUrl(route.path),
  ogType: route.project ? "article" : "website",
  siteName: SITE_NAME,
  image: absoluteUrl(route.socialImage ?? DEFAULT_SOCIAL_IMAGE),
  imageAlt: route.imageAlt ?? "Screenshot of JJ McCauley's portfolio website.",
  jsonLd: buildJsonLd(route)
});

// Renders the shared head description into the static HTML inserted at build.
export const renderSeoHead = (route: SeoRoute) => {
  const head = buildSeoHead(route);

  return [
    `<title>${escapeHtml(head.title)}</title>`,
    `<meta name="description" content="${escapeHtml(head.description)}" />`,
    `<meta name="robots" content="${head.robots}" />`,
    `<link rel="canonical" href="${head.canonical}" />`,
    `<meta property="og:type" content="${head.ogType}" />`,
    `<meta property="og:site_name" content="${escapeHtml(head.siteName)}" />`,
    `<meta property="og:title" content="${escapeHtml(head.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(head.description)}" />`,
    `<meta property="og:url" content="${head.canonical}" />`,
    `<meta property="og:image" content="${head.image}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(head.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(head.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(head.description)}" />`,
    `<meta name="twitter:image" content="${head.image}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(head.imageAlt)}" />`,
    `<script id="site-json-ld" type="application/ld+json">${escapeJsonLd(head.jsonLd)}</script>`
  ].join("\n    ");
};

export type SitemapLastModified = Record<string, string>;

// Emits only canonical, indexable routes. Last-modified values are supplied by
// the Node prerender step because browser-safe SEO data cannot read Git history.
export const renderSitemap = (lastModified: SitemapLastModified = {}) => {
  const urls = seoRoutes
    .filter(route => route.includeInSitemap)
    .map(route => {
      const lastmod = lastModified[route.path]
        ? `\n    <lastmod>${lastModified[route.path]}</lastmod>`
        : "";
      const changefreq = route.changeFrequency
        ? `\n    <changefreq>${route.changeFrequency}</changefreq>`
        : "";
      const priority = typeof route.priority === "number" ? `\n    <priority>${route.priority}</priority>` : "";

      return `  <url>\n    <loc>${absoluteUrl(route.path)}</loc>${lastmod}${changefreq}${priority}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

export const renderRobotsTxt = () => `User-agent: *
Allow: /

Sitemap: ${absoluteUrl("/sitemap.xml")}
`;
