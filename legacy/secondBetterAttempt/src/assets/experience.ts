/*
  Experience and technology metadata

  Quick edit guide:
  - Add/edit skills in `technologyItems`.
  - Add/edit jobs in `experienceItems`.
  - Control which skills link to which experience cards via `EXPERIENCE_TECH_LINKS`.
    Keys are `experienceItems[].id`, values are skill names.
    This is the easiest place to update cross-link behavior in the UI.
*/

export interface ExperienceItem {
    id: string;
    role: string;
    company: string;
    duration: string;
    logoSrc: string;
    description: string;
    technologies: string[];
}

// Professional Experience
export const experienceItems: ExperienceItem[] = [
    {
        id: "booz-allen-intern",
        role: "Full-Stack Software Engineer Intern",
        company: "Booz Allen Hamilton",
        duration: "June 2025 - August 2025",
        logoSrc: "/experience/boozallen.svg",
        description: "Developed a full-stack web application tracking user logs across various devices in a network. Collaborated with other interns to design a scalable and deployable solution for a client in the defense sector.",
        technologies: ["React", "Vite", "Node.js", "Redis", "Elastic Stack", "Express", "D3.js", "Nginx", "Docker", "Confluence"]
    },
    {
        id: "salisbury-tutor-lab-assistant",
        role: "Computer Science Tutor & Lab Assistant",
        company: "Salisbury University",
        duration: "September 2023 - May 2024",
        logoSrc: "/experience/salisburyuniversity.svg",
        description: "Provided tutoring and lab assistance for all undergraduate computer science courses, specializing in Systems Software. Assisted students in understanding complex concepts, completing assignment, and practicing good programming principles.",
        technologies: ["C", "C++", "BASH", "Java", "Python", "Linux", "Git"]
    },
];

export type TechnologyCategory =
    | "Frontend & UI"
    | "Backend & Infrastructure"
    | "Data, AI & Productivity";

export interface TechnologyItem {
    name: string;
    iconSrc: string;
    category: TechnologyCategory;
    note?: string;
}

// Technologies and mapped icons
export const technologyItems: TechnologyItem[] = [
    // Frontend & UI
    { name: "React", iconSrc: "/tech-icons/react.svg", category: "Frontend & UI" },
    { name: "Zustand", iconSrc: "/tech-icons/zustand.svg", category: "Frontend & UI" },
    { name: "Bootstrap", iconSrc: "/tech-icons/bootstrap.svg", category: "Frontend & UI" },
    { name: "D3.js", iconSrc: "/tech-icons/d3.svg", category: "Frontend & UI" },
    { name: "Three.js", iconSrc: "/tech-icons/threedotjs.svg", category: "Frontend & UI" },
    { name: "Chart.js", iconSrc: "/tech-icons/chartdotjs.svg", category: "Frontend & UI" },
    { name: "Plotly", iconSrc: "/tech-icons/plotly.svg", category: "Frontend & UI" },
    { name: "Figma", iconSrc: "/tech-icons/figma.svg", category: "Frontend & UI" },
    { name: "Vite", iconSrc: "/tech-icons/vite.svg", category: "Frontend & UI" },
    { name: "Wordpress", iconSrc: "/tech-icons/wordpress.svg", category: "Frontend & UI", note: "consulting" },
    { name: "Seaborn", iconSrc: "/tech-icons/seaborn.svg", category: "Frontend & UI" },

    // Backend & Infrastructure
    { name: "Node.js", iconSrc: "/tech-icons/nodedotjs.svg", category: "Backend & Infrastructure" },
    { name: "Express", iconSrc: "/tech-icons/express.svg", category: "Backend & Infrastructure" },
    { name: "FastAPI", iconSrc: "/tech-icons/fastapi.svg", category: "Backend & Infrastructure" },
    { name: "Flask", iconSrc: "/tech-icons/flask.svg", category: "Backend & Infrastructure" },
    { name: "Go", iconSrc: "/tech-icons/go.svg", category: "Backend & Infrastructure" },
    { name: "PHP", iconSrc: "/tech-icons/php.svg", category: "Backend & Infrastructure" },
    { name: "Redis", iconSrc: "/tech-icons/redis.svg", category: "Backend & Infrastructure" },
    { name: "MongoDB", iconSrc: "/tech-icons/mongodb.svg", category: "Backend & Infrastructure" },
    { name: "SQL", iconSrc: "/tech-icons/mysql.svg", category: "Backend & Infrastructure" },
    { name: "Firebase", iconSrc: "/tech-icons/firebase.svg", category: "Backend & Infrastructure" },
    { name: "AWS", iconSrc: "/tech-icons/aws.svg", category: "Backend & Infrastructure" },
    { name: "Docker", iconSrc: "/tech-icons/docker.svg", category: "Backend & Infrastructure" },
    { name: "Nginx", iconSrc: "/tech-icons/nginx.svg", category: "Backend & Infrastructure" },
    { name: "Raspberry Pi", iconSrc: "/tech-icons/raspberrypi.svg", category: "Backend & Infrastructure" },
    { name: "Linux", iconSrc: "/tech-icons/linux.svg", category: "Backend & Infrastructure", note: "daily use" },
    { name: "BASH", iconSrc: "/tech-icons/bash.svg", category: "Backend & Infrastructure", note: "shell" },
    { name: "Arch Linux", iconSrc: "/tech-icons/archlinux.svg", category: "Backend & Infrastructure", note: "daily use" },
    { name: "Git", iconSrc: "/tech-icons/git.svg", category: "Backend & Infrastructure", note: "daily use" },
    { name: "GitHub Actions", iconSrc: "/tech-icons/githubactions.svg", category: "Backend & Infrastructure" },
    { name: "Fly.io", iconSrc: "/tech-icons/flydotio.svg", category: "Backend & Infrastructure" },
    { name: "Plaid", iconSrc: "/tech-icons/plaid.svg", category: "Backend & Infrastructure" },
    { name: "Elastic Stack", iconSrc: "/tech-icons/elasticstack.svg", category: "Backend & Infrastructure" },
    { name: "Google Cloud", iconSrc: "/tech-icons/googlecloud.svg", category: "Backend & Infrastructure" },
    { name: "Eleven Labs", iconSrc: "/tech-icons/elevenlabs.svg", category: "Backend & Infrastructure" },
    { name: "DigitalOcean", iconSrc: "/tech-icons/digitalocean.svg", category: "Backend & Infrastructure" },

    // Data, AI & Productivity
    { name: "Python", iconSrc: "/tech-icons/python.svg", category: "Data, AI & Productivity" },
    { name: "C", iconSrc: "/tech-icons/c.svg", category: "Data, AI & Productivity" },
    { name: "Java", iconSrc: "/tech-icons/java.svg", category: "Data, AI & Productivity" },
    { name: "Langchain", iconSrc: "/tech-icons/langchain.svg", category: "Data, AI & Productivity" },
    { name: "OpenAI", iconSrc: "/tech-icons/openai.svg", category: "Data, AI & Productivity" },
    { name: "Gemini", iconSrc: "/tech-icons/googlegemini.svg", category: "Data, AI & Productivity" },
    { name: "Scikit", iconSrc: "/tech-icons/scikitlearn.svg", category: "Data, AI & Productivity" },
    { name: "TensorFlow", iconSrc: "/tech-icons/tensorflow.svg", category: "Data, AI & Productivity" },
    { name: "Ultralytics", iconSrc: "/tech-icons/ultralytics.svg", category: "Data, AI & Productivity" },
    { name: "Neo4J", iconSrc: "/tech-icons/neo4j.svg", category: "Data, AI & Productivity" },
    { name: "Jupyter", iconSrc: "/tech-icons/jupyter.svg", category: "Data, AI & Productivity" },
    { name: "Confluence", iconSrc: "/tech-icons/confluence.svg", category: "Data, AI & Productivity" },
    { name: "Vim", iconSrc: "/tech-icons/vim.svg", category: "Data, AI & Productivity", note: "daily use" },
];

/*
  Skill -> Experience card linking
  - Key: `experienceItems[].id`
  - Value: skills that should surface that experience as "related"
*/
export const EXPERIENCE_TECH_LINKS: Record<string, string[]> = {
    "booz-allen-intern": ["React", "Express", "Redis", "Docker", "Nginx", "Elastic Stack", "Confluence"]
};

const TECH_MATCH_ALIASES: Record<string, string[]> = {
    openai: ["openaiapi"],
    gemini: ["googlegemini"],
    scikit: ["scikitlearn", "sklearn"],
    sql: ["mysql", "postgres", "postgresql", "sqlite"],
    nodejs: ["node"],
    linux: ["archlinux", "bash"],
    bash: ["linux"],
    bootstrap: ["bootstrapcss"],
    digitalocean: ["digitaloceandroplet", "digitaloceanvps"],
    wordpress: ["wp"]
};

const TECH_KEY_ALIASES: Record<string, string> = {
    openaiapi: "openai",
    googlegemini: "gemini",
    scikitlearn: "scikit",
    sklearn: "scikit",
    digitaloceandroplet: "digitalocean",
    digitaloceandropletvps: "digitalocean",
    digitaloceanvps: "digitalocean",
    firebaseauthentication: "firebase",
    firestore: "firebase",
    plaidapi: "plaid",
    ultralyticsyolo: "ultralytics",
    elasticsuite: "elasticstack",
    mysql: "sql",
    node: "nodejs",
    boostrap: "bootstrap",
    bootstrapcss: "bootstrap",
    nextjs: "nextdotjs",
    jinja2: "jinja",
    bashshell: "bash",
    tailwind: "tailwindcss",
    htmlcssjavascript: "html5",
    htmlcssjs: "html5"
};

const EXTRA_TECH_ICON_MAP: Record<string, string> = {
    cplusplus: "/tech-icons/cplusplus.svg",
    cmake: "/tech-icons/cmake.svg",
    make: "/tech-icons/make.svg",
    elastic: "/tech-icons/elastic.svg",
    github: "/tech-icons/github.svg",
    jinja: "/tech-icons/jinja.svg",
    linux: "/tech-icons/linux.svg",
    bash: "/tech-icons/bash.svg",
    nextdotjs: "/tech-icons/nextdotjs.svg",
    numpy: "/tech-icons/numpy.svg",
    pandas: "/tech-icons/pandas.svg",
    r: "/tech-icons/r.svg",
    overleaf: "/tech-icons/overleaf.svg",
    todoist: "/tech-icons/todoist.svg",
    vercel: "/tech-icons/vercel.svg",
    yolo: "/tech-icons/yolo.svg",
    terraform: "/tech-icons/terraform.svg",
    tailwindcss: "/tech-icons/tailwindcss.svg",
    html5: "/tech-icons/html5.svg",
    phaserjs: "/tech-icons/phaserjs.svg",
    androidstudio: "/tech-icons/androidstudio.svg",
    alpacaapi: "/tech-icons/alpacaapi.svg"
};

export const normalizeTechnologyKey = (value: string) =>
    value
        .toLowerCase()
        .replace(/\+\+/g, "plusplus")
        .replace(/#/g, "sharp")
        .replace(/[^a-z0-9]+/g, "");

export const canonicalizeTechnologyKey = (value: string) => {
    const normalized = normalizeTechnologyKey(value);
    return TECH_KEY_ALIASES[normalized] || normalized;
};

export const technologyIconByKey = (() => {
    const iconMap = new Map<string, string>();

    technologyItems.forEach(tech => {
        iconMap.set(canonicalizeTechnologyKey(tech.name), tech.iconSrc);
    });

    Object.entries(EXTRA_TECH_ICON_MAP).forEach(([techKey, iconSrc]) => {
        iconMap.set(techKey, iconSrc);
    });

    Object.entries(TECH_KEY_ALIASES).forEach(([alias, canonical]) => {
        const iconSrc = iconMap.get(canonical);
        if (iconSrc) {
            iconMap.set(alias, iconSrc);
        }
    });

    return iconMap;
})();

export const getTechnologyIcon = (techName: string): string | null => {
    const normalizedTechName = canonicalizeTechnologyKey(techName);
    if (!normalizedTechName) return null;
    return technologyIconByKey.get(normalizedTechName) || null;
};

export const technologiesMatch = (skillName: string, projectTechName: string): boolean => {
    const normalizedSkill = canonicalizeTechnologyKey(skillName);
    const normalizedProjectTech = canonicalizeTechnologyKey(projectTechName);

    if (!normalizedSkill || !normalizedProjectTech) return false;
    if (normalizedSkill === normalizedProjectTech) return true;

    const aliasesForSkill = TECH_MATCH_ALIASES[normalizedSkill] || [];
    const aliasesForProjectTech = TECH_MATCH_ALIASES[normalizedProjectTech] || [];

    return aliasesForSkill.includes(normalizedProjectTech) || aliasesForProjectTech.includes(normalizedSkill);
};

export const getLinkedExperiencesForTechnology = (techName: string): ExperienceItem[] => {
    return experienceItems.filter(experience => {
        const configuredSkills = EXPERIENCE_TECH_LINKS[experience.id] || [];
        return configuredSkills.some(skill => technologiesMatch(skill, techName));
    });
};

// Completed Coursework
export const completedCourses = [
    "High Performance Computing (A)",
    "Data Science Fundamentals (A)",
    "Software Engineering I & II (A)",
    "Computer Networks (A)",
    "Database Design & Implementation (A)",
    "Operating Systems (B)",
    "Systems Software (A)",
    "Data Visualization & Machine Learning (A)",
    "Artificial Intelligence (A)",
    "Advanced Data Structures & Algorithms (B)",
    "OOP, Design Patterns, & Android Development (B)",
    "Theory of Computation (A)",
    "Microcomputer Organization and Architecture (A)",
    "Linear Algebra (A)",
    "Discrete Mathematics (A)",
    "Introduction to Data Structures & Algorithms (B)",
    "Computer Science I & II (A)",
    "Programming Fundamentals (A)"
];
