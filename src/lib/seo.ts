import { getProjectItems, projectImageAlt } from "../assets/projects";
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
  robots?: "index,follow" | "noindex";
  socialImage?: string; // og/twitter image (defaults to the site screenshot)
  imageAlt?: string; // alt text for the social image
  project?: SeoProject; // present on /projects/<slug> routes
  pageType?: string; // schema.org WebPage subtype (e.g. CollectionPage, AboutPage)
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
    priority: 1
  },
  {
    path: "/terminal",
    outputPath: "terminal/index.html",
    aliases: ["terminal.html"],
    title: "Interactive Terminal Portfolio | JJ McCauley",
    description:
      "Explore JJ McCauley's projects, skills, experience, and contact links through an interactive terminal interface.",
    breadcrumbName: "Terminal",
    includeInSitemap: true,
    prerender: true,
    changeFrequency: "monthly",
    priority: 0.8
  },
  {
    path: "/simple",
    outputPath: "simple/index.html",
    aliases: ["simple.html"],
    title: "Simple Portfolio | JJ McCauley",
    description:
      "A lightweight portfolio view for JJ McCauley with software projects, technical skills, experience, and contact information.",
    breadcrumbName: "Simple Portfolio",
    includeInSitemap: true,
    prerender: true,
    changeFrequency: "monthly",
    priority: 0.7
  },
  {
    path: "/resume",
    outputPath: "resume/index.html",
    aliases: ["resume.html"],
    title: "Resume | JJ McCauley",
    description: "View or download JJ McCauley's software engineering and data science resume.",
    breadcrumbName: "Resume",
    includeInSitemap: true,
    prerender: true,
    changeFrequency: "monthly",
    priority: 0.7
  },
  {
    path: "/links/",
    title: "Links | JJ McCauley",
    description: "Links to JJ McCauley's LinkedIn, email, website, X, and GitHub.",
    breadcrumbName: "Links",
    includeInSitemap: true,
    prerender: false,
    changeFrequency: "monthly",
    priority: 0.6
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
    pageType: "AboutPage"
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
    pageType: "CollectionPage"
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

const projectRoutes: SeoRoute[] = getProjectItems().map(project => {
  const projectSlug = slug(project.title);
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
    }
  };
});

// One prerendered, sitemap-listed route per topic, plus a bare /topics/ that
// prerenders the default topic (kept out of the sitemap to avoid a duplicate).
const DEFAULT_TOPIC = topicOrder[0];

const topicRoutes: SeoRoute[] = [
  {
    path: "/topics/",
    outputPath: "topics/index.html",
    title: `${topics[DEFAULT_TOPIC].title} — JJ McCauley`,
    description: truncate(topics[DEFAULT_TOPIC].intro),
    breadcrumbName: topics[DEFAULT_TOPIC].title,
    includeInSitemap: false,
    prerender: true,
    pageType: "CollectionPage"
  },
  ...topicOrder.map(key => ({
    path: `/topics/${key}/`,
    outputPath: `topics/${key}/index.html`,
    title: `${topics[key].title} — JJ McCauley`,
    description: truncate(topics[key].intro),
    breadcrumbName: topics[key].title,
    includeInSitemap: true,
    prerender: true,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    pageType: "CollectionPage"
  }))
];

export const seoRoutes: SeoRoute[] = [...staticRoutes, ...projectRoutes, ...topicRoutes];

export const prerenderRoutes = seoRoutes.filter(
  (route): route is SeoRoute & { outputPath: string } => route.prerender && Boolean(route.outputPath)
);

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const escapeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

const personNode = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "JJ McCauley",
  alternateName: "Jairik McCauley",
  url: absoluteUrl("/"),
  image: absoluteUrl("/me-pictures/BAH-Professional.png"),
  jobTitle: "Full Stack Developer",
  email: "mailto:mjairik@gmail.com",
  sameAs: ["https://github.com/Jairik", "https://www.linkedin.com/in/jairik-mccauley/"],
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
  about: { "@id": PERSON_ID }
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
    ...(project.keywords.length ? { keywords: project.keywords.join(", ") } : {}),
    ...(hasCode ? { codeRepository: project.code, programmingLanguage: project.keywords } : {})
  };
};

const buildJsonLd = (route: SeoRoute) => ({
  "@context": "https://schema.org",
  "@graph": [
    personNode,
    websiteNode,
    webPageNode(route),
    breadcrumbNode(route),
    ...(route.project ? [projectNode(route)] : [])
  ]
});

export const renderSeoHead = (route: SeoRoute) => {
  const canonical = absoluteUrl(route.path);
  const image = absoluteUrl(route.socialImage ?? DEFAULT_SOCIAL_IMAGE);
  const imageAlt = route.imageAlt ?? "Screenshot of JJ McCauley's portfolio website.";
  const ogType = route.project ? "article" : "website";
  const robots = route.robots ?? "index,follow";
  const jsonLd = buildJsonLd(route);

  return [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />`,
    `<script type="application/ld+json">${escapeJsonLd(jsonLd)}</script>`
  ].join("\n    ");
};

export const renderSitemap = () => {
  const urls = seoRoutes
    .filter(route => route.includeInSitemap)
    .map(route => {
      const changefreq = route.changeFrequency
        ? `\n    <changefreq>${route.changeFrequency}</changefreq>`
        : "";
      const priority = typeof route.priority === "number" ? `\n    <priority>${route.priority}</priority>` : "";

      return `  <url>\n    <loc>${absoluteUrl(route.path)}</loc>${changefreq}${priority}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

export const renderRobotsTxt = () => `User-agent: *
Allow: /

Sitemap: ${absoluteUrl("/sitemap.xml")}
`;
