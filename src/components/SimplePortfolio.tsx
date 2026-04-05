import { useMemo } from "react";
import { motion } from "framer-motion";

import { socialItems } from "../assets/constantVars";
import { experienceItems, technologyItems } from "../assets/experience";
import { getProjectItems, type ProjectItem } from "../assets/projects";

const ABOUT_PARAGRAPHS = [
  "I'm a fourth-year Computer Science student (AI & Software Engineering focus) and Data Science major who loves building things. I'm a fast, curiosity-driven programmer who takes ownership of my work and genuinely enjoys the process of creating.",
  "I proudly describe myself as a nerd for this stuff, I spend my free time learning about new technologies and am always looking to learn. In addition to SWE, I am on the SU Track & Field team as a thrower, absolutely love Slay the Spire, and my favorite dog are Corgis (big dog guy).",
  "Feel free to send me an email or connect with me on LinkedIn if you want to chat or collaborate on something cool!"
] as const;

const revealProps = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }
};

const projectGroups = [
  { title: "Featured Projects", key: "featured" as const },
  { title: "Current Projects", key: "current" as const },
  { title: "Past Projects", key: "past" as const }
];

function ProjectLinks({ project }: { project: ProjectItem }) {
  const links = [
    project.link ? { label: "Code", href: project.link } : null,
    project.demoLink ? { label: "Demo", href: project.demoLink } : null,
    project.demoVideoLink ? { label: "Video", href: project.demoVideoLink } : null
  ].filter(Boolean) as Array<{ label: string; href: string }>;

  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {links.map(link => (
        <a
          key={`${project.title}-${link.label}`}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[rgb(51,178,51)]/35 bg-[rgb(51,178,51)]/10 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[rgb(51,178,51)]/18"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <motion.article
      {...revealProps}
      className="rounded-3xl border border-white/10 p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <div>
            <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
            {project.date && <p className="text-sm text-white/[0.55]">{project.date}</p>}
          </div>
        </div>
        <ProjectLinks project={project} />
      </div>

      <p className="mt-4 text-base leading-7 text-white/[0.8]">{project.description}</p>

      {project.techStack.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map(tech => (
            <div
              key={`${project.title}-${tech}`}
              className="inline-flex items-center rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/[0.78]"
            >
              <span>{tech}</span>
            </div>
          ))}
        </div>
      )}
    </motion.article>
  );
}

export default function SimplePortfolio() {
  const projects = useMemo(() => getProjectItems(), []);
  const featuredProjects = useMemo(() => projects.filter(project => project.featured), [projects]);
  const currentProjects = useMemo(
    () => projects.filter(project => project.current && !project.featured),
    [projects]
  );
  const pastProjects = useMemo(
    () => projects.filter(project => !project.featured && !project.current),
    [projects]
  );
  const skillCategories = useMemo(
    () => [
      {
        title: "Frontend & UI",
        items: technologyItems.filter(tech => tech.category === "Frontend & UI")
      },
      {
        title: "Backend & Infrastructure",
        items: technologyItems.filter(tech => tech.category === "Backend & Infrastructure")
      },
      {
        title: "Data, AI & Productivity",
        items: technologyItems.filter(tech => tech.category === "Data, AI & Productivity")
      }
    ],
    []
  );
  const groupedProjects = useMemo(
    () => ({
      featured: featuredProjects,
      current: currentProjects,
      past: pastProjects
    }),
    [currentProjects, featuredProjects, pastProjects]
  );

  return (
    <main className="min-h-screen bg-[#1b1c1f] pt-32 text-white">
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-8 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:p-5"
        >
          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[rgb(134,230,134)]/85 sm:text-[11px]">
              simplified view
            </p>
            <h1 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
              JJ McCauley - Full Stack Developer
            </h1>
          </div>
        </motion.div>
      </section>

      <section id="about" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <motion.div {...revealProps} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">About Me</h2>
          <div className="mt-4 space-y-4 text-base leading-8 text-white/[0.8]">
            {ABOUT_PARAGRAPHS.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="projects" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <motion.div {...revealProps} className="space-y-6">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Projects</h2>

          <div className="space-y-10">
            {projectGroups.map(group => {
              const items = groupedProjects[group.key];
              if (items.length === 0) return null;

              return (
                <div key={group.key} className="space-y-4">
                  <h3 className="text-2xl font-semibold text-white/90">{group.title}</h3>
                  <div className="grid gap-4">
                    {items.map(project => (
                      <ProjectCard key={project.title} project={project} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      <section id="experience" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <motion.div {...revealProps} className="space-y-6">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Experience</h2>

          <div className="grid gap-4 lg:grid-cols-2">
            {experienceItems.map(experience => (
              <motion.article
                key={experience.id}
                {...revealProps}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <div>
                  <h3 className="text-xl font-semibold text-white">{experience.role}</h3>
                  <p className="text-white/[0.72]">{experience.company}</p>
                  <p className="text-sm text-white/[0.52]">{experience.duration}</p>
                </div>
                <p className="mt-4 text-base leading-7 text-white/[0.8]">{experience.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {experience.technologies.map(tech => (
                    <div
                      key={`${experience.id}-${tech}`}
                      className="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white/[0.78]"
                    >
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <motion.div {...revealProps} className="space-y-6">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Skills</h2>

          <div className="grid gap-4 xl:grid-cols-3">
            {skillCategories.map(category => (
              <motion.article
                key={category.title}
                {...revealProps}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {category.items.map(skill => (
                    <div
                      key={skill.name}
                      className="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white/[0.78]"
                    >
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="contact" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-8 pb-16 sm:px-8">
        <motion.div {...revealProps} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Contact</h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {socialItems.map(item => (
              <a
                key={item.label}
                href={item.link}
                target={item.link.startsWith("http") || item.link.endsWith(".pdf") ? "_blank" : undefined}
                rel={item.link.startsWith("http") || item.link.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                className="rounded-full border border-[rgb(51,178,51)]/35 bg-[rgb(51,178,51)]/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[rgb(51,178,51)]/18"
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
