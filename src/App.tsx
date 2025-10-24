import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import Dither from "./components/Dither";
import DecryptedText from "./components/DecryptedText";

function App() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <main className="relative isolate min-h-[220vh] bg-black text-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full h-screen overflow-hidden">
        {/* Background layer - full screen (fixed) */}
        <motion.div
          className="dither-layer" // must be pointer-events-none in CSS
          style={{ opacity: bgOpacity, scale: bgScale }}
          aria-hidden
        >
          <Dither
            waveColor={[0.2, 1.0, 0.2]}
            disableAnimation={false}
            enableMouseInteraction={true}
            mouseRadius={0.08}
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
            className="drop-shadow-lg text-4xl sm:text-5xl md:text-6xl font-bold text-white"
          />
          <div className="mt-3 text-sm sm:text-base text-white/80">
            <DecryptedText
              text="Full-Stack Software Engineer"
              speed={100}
              sequential
              animateOn="view"
              className="drop-shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Spacer Section to push content down (FIXED: valid Tailwind utility) */}
      <div className="h-[100vh]" />

      {/* Content Section */}
      <section className="relative z-20 mx-auto max-w-3xl px-6 py-20 space-y-6">
        <h2 className="text-3xl font-bold">What I Build</h2>
        <p className="text-white/75">
          This is the main content of your landing page/portfolio. As you scroll past
          the hero, the dithered background fades and gently zooms out.
        </p>
        {/* ... */}
      </section>
    </main>
  );
}

export default App;
