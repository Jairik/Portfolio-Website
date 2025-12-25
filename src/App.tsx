// React and Framer Motion imports
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// React Bits components
import Dither from "./components/Dither";
import DecryptedText from "./components/DecryptedText";
import AnimatedContent from "./components/AnimatedContent";
import MagicBento from "./components/MagicBento";
import GlowCard from "./components/GlowCard";

// Constants for contacts and projects
import { menuItems, socialItems } from "./assets/constantVars";
import { getProjectItems } from "./assets/projects";
import { experienceItems, technologyItems } from "./assets/experience";

function App() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const [openProject, setOpenProject] = useState<string | null>(null);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const [imageIndexMap, setImageIndexMap] = useState<Record<string, number>>({});
  const projects = getProjectItems();
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  const changeImage = useCallback((title: string, delta: number, total: number) => {
    if (total <= 1) return;
    setImageIndexMap(prev => {
      const current = prev[title] ?? 0;
      const next = (current + delta + total) % total;
      return { ...prev, [title]: next };
    });
  }, []);

  useEffect(() => {
    if (!openProject || isAutoPlayPaused) return;
    
    const project = otherProjects.find(p => p.title === openProject);
    if (!project || !project.imageSrc || project.imageSrc.length <= 1) return;

    const interval = setInterval(() => {
      changeImage(openProject, 1, project.imageSrc.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [openProject, isAutoPlayPaused, otherProjects, changeImage]);

  return (
    <main className="relative min-h-[220vh] bg-black text-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full h-screen overflow-hidden">
        {/* Background layer - full screen (fixed) */}
        <motion.div
          className="dither-layer pointer-events-auto"
          style={{ opacity: bgOpacity, scale: bgScale }}
        >
          <Dither
            waveColor={[0.2, 0.7, 0.2]}
            disableAnimation={false}
            enableMouseInteraction={false}
            // mouseRadius={0.08}
            colorNum={3}
            waveAmplitude={0.3}
            waveFrequency={10}
            waveSpeed={0.012}
          />
        </motion.div>

        {/* Foreground content - centered over background */}
        <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-4 text-center">
          <DecryptedText
            text="Jairik 'JJ' McCauley"
            speed={60}
            sequential
            animateOn="view"
            className="text-6xl sm:text-7xl md:text-8xl font-bold text-white"
            encryptedClassName="text-6xl sm:text-7xl md:text-8xl font-bold text-white"
            style={{ filter: "drop-shadow(0 0 34px rgba(0,0,0,0.96)) drop-shadow(0 0 18px rgba(0,202,0,0.55))" }}
          />
          <div className="mt-3 text-base sm:text-lg text-white/80">
            <DecryptedText
              text="Full-Stack Software Engineer"
              speed={100}
              sequential
              animateOn="view"
              className="text-white"
              encryptedClassName="text-white"
              style={{ filter: "drop-shadow(0 0 26px rgba(0,0,0,0.9)) drop-shadow(0 0 12px rgba(0,202,0,0.45))" }}
            />
          </div>

          {/* Static menu anchored to the hero title */}
          <nav
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm tracking-widest uppercase text-white"
            style={{ filter: "drop-shadow(0 0 22px rgba(0,0,0,0.9)) drop-shadow(0 0 10px rgba(0,202,0,0.4))" }}
          >
            {menuItems.map((item, index) => (
              <a
                key={item.label}
                href={item.link}
                aria-label={item.ariaLabel}
                className="text-white transition-opacity duration-200 hover:opacity-80"
              >
                <DecryptedText
                  text={item.label}
                  speed={80}
                  sequential
                  animateOn="view"
                  delay={2500 + (index * 200)}
                  className="text-white"
                  encryptedClassName="text-white"
                />
              </a>
            ))}
          </nav>

          {/* Scroll hint chevron */}
          <a
            href="#about"
            aria-label="Scroll to content"
            className="absolute bottom-10 left-1/2 -translate-x-1/2 inline-flex items-center justify-center text-white transition hover:opacity-80"
            style={{ filter: "drop-shadow(0 0 18px rgba(0,0,0,0.9)) drop-shadow(0 0 8px rgba(0,202,0,0.4))" }}
          >
            <svg
              className="h-8 w-8 animate-bounce"
              style={{ animationDuration: "1.8s" }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9l6 6 6-6"         
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* Content Section */}
      {/* Simple About Me*/}
      <section className="relative z-20 mx-auto max-w-[90vw] xl:max-w-[1600px] px-6 py-20 space-y-6">
        <AnimatedContent className="w-full">
          <h2
            className="text-4xl sm:text-5xl font-bold text-center"
            id="about"
            style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.9)) drop-shadow(0 0 10px rgba(51,178,51,0.4))" }}
          >
            About Me
          </h2>
        
          <p className="text-white/75 max-w-3xl mx-auto text-center">
            Computer science student and ex-SWE intern who loves nerding out over building full-stack projects, especially when there’s a real problem involved.
          </p>

        </AnimatedContent>
        {/* Projects section */}
        <AnimatedContent className="w-full">
          <h2
            className="text-4xl sm:text-5xl font-bold mt-12 text-center"
            id="projects"
            style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.9)) drop-shadow(0 0 10px rgba(51,178,51,0.4))" }}
          >
            Projects
          </h2>
            <div className="mt-8 space-y-10">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-white/90 text-center">Featured Projects</h3>
                <MagicBento
                  cards={featuredProjects.map(project => ({
                    title: project.title,
                    description: project.description,
                    label: project.date || "Featured",
                    color: "#060010",
                    imageSrc: project.imageSrc,
                    link: project.link,
                    techStack: project.techStack,
                    demoLink: project.demoLink,
                    demoVideoLink: project.demoVideoLink,
                    date: project.date
                  }))}
                  enableBorderGlow
                  glowColor="51, 178, 51"
                  enableTilt
                  enableMagnetism
                  particleCount={10}
                />
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4 text-white/90 text-center">More Projects</h3>
                <div className="w-full flex flex-col gap-3">
                  {otherProjects.map((project) => {
                    const images = project.imageSrc || [];
                    const currentIndex = imageIndexMap[project.title] ?? 0;
                    const isOpen = openProject === project.title;
                    
                    return (
                      <GlowCard key={project.title} className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (openProject === project.title) {
                              setOpenProject(null);
                            } else {
                              setIsAutoPlayPaused(false);
                              setOpenProject(project.title);
                            }
                          }}
                          className="w-full flex items-center justify-between px-4 py-3 text-left text-white/90 hover:bg-white/5 transition relative z-20"
                          aria-expanded={isOpen}
                        >
                          <div>
                            <p className="text-xl font-semibold">{project.title}</p>
                            {project.date && <p className="text-sm text-white/60">{project.date}</p>}
                          </div>
                          <svg
                            className={`w-5 h-5 text-white/70 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pt-2 space-y-3 text-base text-white/80 relative z-20">
                            <p>{project.description}</p>
                            {images.length > 0 && (
                              <div className="relative w-full rounded-lg overflow-hidden border border-white/10 bg-black/50 h-80">
                                <AnimatePresence mode="wait">
                                  <motion.img
                                    key={currentIndex}
                                    src={images[currentIndex]}
                                    alt={`${project.title} screenshot ${currentIndex + 1}`}
                                    className="w-full h-full object-contain absolute inset-0"
                                    loading="lazy"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                  />
                                </AnimatePresence>
                                <button
                                  type="button"
                                  className="absolute top-1/2 -translate-y-1/2 left-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition disabled:opacity-30 z-10"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsAutoPlayPaused(true);
                                    changeImage(project.title, -1, images.length);
                                  }}
                                  disabled={images.length <= 1}
                                  aria-label="Previous image"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                                    <polyline points="15 18 9 12 15 6" />
                                  </svg>
                                </button>
                                <button
                                  type="button"
                                  className="absolute top-1/2 -translate-y-1/2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition disabled:opacity-30 z-10"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsAutoPlayPaused(true);
                                    changeImage(project.title, 1, images.length);
                                  }}
                                  disabled={images.length <= 1}
                                  aria-label="Next image"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                                    <polyline points="9 18 15 12 9 6" />
                                  </svg>
                                </button>
                                <div className="absolute bottom-2 right-3 text-[11px] px-2 py-1 rounded-full bg-black/60 text-white/80 z-10">
                                  {currentIndex + 1}/{images.length}
                                </div>
                              </div>
                            )}
                            {project.techStack && project.techStack.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {project.techStack.map(tech => (
                                  <span key={tech} className="px-2 py-1 rounded-full bg-white/10 border border-white/10 text-sm text-white/80">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="flex flex-wrap gap-4 text-sm">
                              {project.link && (
                                <a className="text-white hover:text-[rgb(51,178,51)] transition" href={project.link} target="_blank" rel="noopener noreferrer" aria-label="View Code">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                  </svg>
                                </a>
                              )}
                              {project.demoLink && (
                                <a className="text-white hover:text-[rgb(51,178,51)] transition" href={project.demoLink} target="_blank" rel="noopener noreferrer" aria-label="View Demo">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                  </svg>
                                </a>
                              )}
                              {project.demoVideoLink && (
                                <a className="text-white hover:text-[rgb(51,178,51)] transition" href={project.demoVideoLink} target="_blank" rel="noopener noreferrer" aria-label="Watch Video">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                                  </svg>
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </GlowCard>
                    );
                  })}
                </div>
              </div>
            </div>
        </AnimatedContent>
        {/* Experience & Skills section */}
        <AnimatedContent className="w-full">
          <h2
            className="text-4xl sm:text-5xl font-bold mt-12 text-center"
            id="experience"
            style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.9)) drop-shadow(0 0 10px rgba(51,178,51,0.4))" }}
          >
            Experience
          </h2>
          <div className="mt-8">
            <MagicBento
              cards={experienceItems.map(exp => ({
                title: exp.role,
                description: exp.description,
                label: exp.duration,
                color: "#060010",
                  logoSrc: exp.logoSrc,
                techStack: exp.technologies,
                date: exp.company
              }))}
              enableBorderGlow
              glowColor="51, 178, 51"
              enableTilt
              enableMagnetism
              particleCount={20}
            />
          </div>
        </AnimatedContent>
        {/* Contact section */}
        <AnimatedContent className="w-full">
          <h2
            className="text-4xl sm:text-5xl font-bold mt-12 text-center"
            id="contact"
            style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.9)) drop-shadow(0 0 10px rgba(51,178,51,0.4))" }}
          >
            Contact
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-12 mt-12">
            {socialItems.map((item) => (
              <a
                key={item.label}
                href={item.link}
                target={item.link.startsWith('http') || item.link.endsWith('.pdf') ? '_blank' : undefined}
                rel={item.link.startsWith('http') || item.link.endsWith('.pdf') ? 'noopener noreferrer' : undefined}
                className="flex flex-col items-center gap-4 group transition-all duration-300 hover:scale-110"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[rgb(51,178,51)]/10 group-hover:border-[rgb(51,178,51)]/30">
                  {item.label === 'LinkedIn' && (
                    <svg className="w-8 h-8 text-white/80 group-hover:text-[rgb(51,178,51)]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                  {item.label === 'Email' && (
                    <svg className="w-8 h-8 text-white/80 group-hover:text-[rgb(51,178,51)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  {item.label === 'Resume' && (
                    <svg className="w-8 h-8 text-white/80 group-hover:text-[rgb(51,178,51)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                </div>
                {/* Label */}
                <span className="text-sm font-medium text-white/70 group-hover:text-[rgb(51,178,51)] transition-colors duration-300">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </AnimatedContent>
      </section>
    </main>
  );
}

export default App;
