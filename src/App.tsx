import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import Dither from "./components/Dither";
import DecryptedText from "./components/DecryptedText";
import AnimatedContent from "./components/AnimatedContent";

import { menuItems } from "./assets/constantVars";

function App() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

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
            waveColor={[0.2, 1.0, 0.2]}
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
            {menuItems.map(item => (
              <a
                key={item.label}
                href={item.link}
                aria-label={item.ariaLabel}
                className="text-white transition-opacity duration-200 hover:opacity-80"
              >
                {item.label}
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
      <section className="relative z-20 mx-auto max-w-3xl px-6 py-20 space-y-6">
        <AnimatedContent className="w-full">
          <h2
            className="text-4xl sm:text-5xl font-bold"
            id="about"
            style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.9)) drop-shadow(0 0 10px rgba(0,202,0,0.4))" }}
          >
            About Me
          </h2>
        
          <p className="text-white/75">
            Just an actual nerd who loves build full-stack stuff.
          </p>
        </AnimatedContent>
        {/* Projects section */}
        <AnimatedContent className="w-full">
          <h2
            className="text-4xl sm:text-5xl font-bold mt-12"
            id="projects"
            style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.9)) drop-shadow(0 0 10px rgba(0,202,0,0.4))" }}
          >
            Projects
          </h2>
        </AnimatedContent>
        {/* Experience & Skills section */}
        <AnimatedContent className="w-full">
          <h2
            className="text-4xl sm:text-5xl font-bold mt-12"
            id="experience"
            style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.9)) drop-shadow(0 0 10px rgba(0,202,0,0.4))" }}
          >
            Experience & Skills
          </h2>
        </AnimatedContent>
        {/* Contact section */}
        <AnimatedContent className="w-full">
          <h2
            className="text-4xl sm:text-5xl font-bold mt-12"
            id="contact"
            style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.9)) drop-shadow(0 0 10px rgba(0,202,0,0.4))" }}
          >
            Contact
          </h2>
        </AnimatedContent>
      </section>
    </main>
  );
}

export default App;
