export type SitemapChangeFrequency = "weekly" | "monthly" | "yearly";

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
}

export const SITE_URL = "https://jjmccauley.com";
export const SITE_NAME = "JJ McCauley";
export const DEFAULT_SOCIAL_IMAGE = "/projects/Portfolio-Website.png";
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const absoluteUrl = (path: string) => new URL(path, `${SITE_URL}/`).toString();

export const seoRoutes: SeoRoute[] = [
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
  "@type": "WebPage",
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

export const buildJsonLd = (route: SeoRoute) => ({
  "@context": "https://schema.org",
  "@graph": [personNode, websiteNode, webPageNode(route), breadcrumbNode(route)]
});

export const renderSeoHead = (route: SeoRoute) => {
  const canonical = absoluteUrl(route.path);
  const image = absoluteUrl(DEFAULT_SOCIAL_IMAGE);
  const robots = route.robots ?? "index,follow";
  const jsonLd = buildJsonLd(route);

  return [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="Screenshot of JJ McCauley's portfolio website." />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
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
