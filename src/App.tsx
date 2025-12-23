// React and Framer Motion imports
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// React Bits components
import Dither from "./components/Dither";
import DecryptedText from "./components/DecryptedText";
import AnimatedContent from "./components/AnimatedContent";

// Constants for menu items
import { menuItems, socialItems } from "./assets/constantVars";

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
            style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.9)) drop-shadow(0 0 10px rgba(51,178,51,0.4))" }}
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
            style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.9)) drop-shadow(0 0 10px rgba(51,178,51,0.4))" }}
          >
            Projects
          </h2>


        </AnimatedContent>
        {/* Experience & Skills section */}
        <AnimatedContent className="w-full">
          <h2
            className="text-4xl sm:text-5xl font-bold mt-12"
            id="experience"
            style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.9)) drop-shadow(0 0 10px rgba(51,178,51,0.4))" }}
          >
            Experience & Skills
          </h2>
        </AnimatedContent>
        {/* Contact section */}
        <AnimatedContent className="w-full">
          <h2
            className="text-4xl sm:text-5xl font-bold mt-12"
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
