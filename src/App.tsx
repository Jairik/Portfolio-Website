// React and Framer Motion imports
import { useRef, useState, useEffect, useCallback, useMemo, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Constants for contacts and projects
import { menuItems, socialItems, mePictures } from "./assets/constantVars";
import { getProjectItems, type ProjectItem } from "./assets/projects";
import Stack from "./components/Stack";
import CountUp from "./components/CountUp";
import FullExperienceBoundary from "./components/FullExperienceBoundary";
import SimplePortfolio from "./components/SimplePortfolio";
import {
  experienceItems,
  technologyItems,
  getTechnologyIcon,
  getLinkedExperiencesForTechnology,
  technologiesMatch,
  type ExperienceItem,
  type TechnologyItem
  /*, completedCourses*/
} from "./assets/experience";
import {
  LEGACY_RENDER_MODE_STORAGE_KEY,
  RENDER_MODE_STORAGE_KEY,
  getInitialRenderState,
  type SimplifiedModeReason
} from "./lib/renderMode";

// Lazy-loaded heavy components to split initial bundle
const DecryptedText = lazy(() => import("./components/DecryptedText"));
const AnimatedContent = lazy(() => import("./components/AnimatedContent"));
const GlowCard = lazy(() => import("./components/GlowCard"));
const Dither = lazy(() => import("./components/Dither"));
const MagicBento = lazy(() => import("./components/MagicBento"));
const PixelSnow = lazy(() => import("./components/PixelSnow"));
const SolarSystemPortfolio = lazy(() => import("./components/SolarSystemPortfolio"));

const toProjectTag = (title: string) =>
  `project-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const HERO_CROSSFADE_START = 0.55;
const HERO_CROSSFADE_DURATION = 0.2;
const HERO_BACKGROUND_FADE_START = 0.82;
const HERO_BACKGROUND_FADE_DURATION = 0.18;
const BENTO_CARD_BACKGROUND = "#1d1f22";
const FULL_VIEW_MODE_STORAGE_KEY = "portfolio-full-view-mode";
const COMMIT_COUNT_ENDPOINT = "https://jairik--e9c872b823b611f1845142dde27851f2.web.val.run";  // Returns just the total commits
const COMMIT_COUNT_FIELDS = [
  "totalCommits",
  "total_commits",
  "commitCount",
  "commit_count",
  "commits",
  "total",
  "count",
  "value"
] as const;

const parseNumericValue = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.max(0, Math.round(value));
  }

  if (typeof value === "string") {
    const parsed = Number(value.trim().replace(/,/g, ""));
    if (Number.isFinite(parsed)) {
      return Math.max(0, Math.round(parsed));
    }
  }

  return null;
};

const parseCommitCount = (payload: unknown): number | null => {
  const directValue = parseNumericValue(payload);
  if (directValue !== null) return directValue;

  if (!payload || typeof payload !== "object") return null;

  const queue: unknown[] = [payload];
  const visited = new Set<object>();

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current || typeof current !== "object") continue;
    if (visited.has(current as object)) continue;
    visited.add(current as object);

    const record = current as Record<string, unknown>;

    for (const field of COMMIT_COUNT_FIELDS) {
      if (field in record) {
        const parsed = parseNumericValue(record[field]);
        if (parsed !== null) return parsed;
      }
    }

    Object.values(record).forEach(value => {
      if (value && typeof value === "object") {
        queue.push(value);
      }
    });
  }

  return null;
};

type FloatingTooltip = { name: string; x: number; y: number };
type SkillProjectsTooltip = {
  skillName: string;
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  x: number;
  y: number;
};
type FullViewMode = "full" | "solar";
type ViewMode = FullViewMode | "simple";

const getSimplifiedBannerMessage = (reason: SimplifiedModeReason | null) => {
  switch (reason) {
    case "compatibility":
      return "Simplified view for compatibility.";
    case "accessibility":
      return "Simplified view for reduced motion.";
    default:
      return "Simplified view active.";
  }
};

const getInitialFullViewMode = (): FullViewMode => {
  if (typeof window === "undefined") return "full";

  try {
    const storedValue = window.localStorage.getItem(FULL_VIEW_MODE_STORAGE_KEY);
    return storedValue === "solar" ? "solar" : "full";
  } catch {
    return "full";
  }
};

function RenderModeControls({
  selectedView,
  simplifiedModeReason,
  onSelect
}: {
  selectedView: ViewMode;
  simplifiedModeReason: SimplifiedModeReason | null;
  onSelect: (view: ViewMode) => void;
}) {
  const isSimplifiedMode = selectedView === "simple";

  return (
    <>
      {isSimplifiedMode && (
        <div className="fixed inset-x-0 top-0 z-[265] border-b border-white/8 bg-[#121315]/95 px-3 py-1 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white/55 backdrop-blur-sm">
          {getSimplifiedBannerMessage(simplifiedModeReason)}
        </div>
      )}

      <div className={`fixed right-3 z-[270] ${isSimplifiedMode ? "top-8 sm:top-9" : "top-3 sm:top-4"}`}>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#1a1b1f]/85 px-2.5 py-1.5 text-white/85 backdrop-blur-md">
          <label htmlFor="view-mode" className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/70">
            View
          </label>
          <select
            id="view-mode"
            value={selectedView}
            onChange={event => onSelect(event.target.value as ViewMode)}
            className="rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white outline-none transition-colors hover:border-[rgb(51,178,51)]/50 focus-visible:border-[rgb(51,178,51)]/65"
            aria-label="Select portfolio view mode"
          >
            <option value="full">Full</option>
            <option value="solar">Solar</option>
            <option value="simple">Simple</option>
          </select>
        </div>
      </div>
    </>
  );
}

function App() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const skillTooltipHideTimeoutRef = useRef<number | null>(null);
  const isSkillTooltipHoveredRef = useRef(false);
  const [{ mode: renderMode, reason: simplifiedModeReason }, setRenderModeState] = useState(getInitialRenderState);
  const [fullViewMode, setFullViewMode] = useState<FullViewMode>(getInitialFullViewMode);
  const [fullRenderAttempt, setFullRenderAttempt] = useState(0);
  const [heroScrollProgress, setHeroScrollProgress] = useState(0);
  const crossfadeProgress = useMemo(
    () => clamp((heroScrollProgress - HERO_CROSSFADE_START) / HERO_CROSSFADE_DURATION, 0, 1),
    [heroScrollProgress]
  );
  const landingFadeOutProgress = useMemo(
    () => clamp((heroScrollProgress - HERO_BACKGROUND_FADE_START) / HERO_BACKGROUND_FADE_DURATION, 0, 1),
    [heroScrollProgress]
  );
  const landingOpacity = useMemo(() => 1 - landingFadeOutProgress, [landingFadeOutProgress]);
  const bgOpacity = useMemo(() => (1 - crossfadeProgress) * landingOpacity, [crossfadeProgress, landingOpacity]);
  const bgScale = useMemo(() => 1 + (heroScrollProgress * 0.08), [heroScrollProgress]);
  const snowOpacity = useMemo(() => crossfadeProgress, [crossfadeProgress]);

  const [openProject, setOpenProject] = useState<string | null>(null);
  //const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const [imageIndexMap, setImageIndexMap] = useState<Record<string, number>>({});
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [commitCount, setCommitCount] = useState(0);
  const [techTooltip, setTechTooltip] = useState<FloatingTooltip | null>(null);
  const [skillProjectsTooltip, setSkillProjectsTooltip] = useState<SkillProjectsTooltip | null>(null);
  const isSimplifiedMode = renderMode === "simple";
  const selectedViewMode: ViewMode = isSimplifiedMode ? "simple" : fullViewMode;
  const sortedMePictures = useMemo(() => [...mePictures].sort((a, b) => a.order - b.order), []);
  const aboutMePictureCards = useMemo(
    () =>
      sortedMePictures.map((picture, index) => (
        <div key={picture.path} className="relative h-full w-full">
          <img
            src={picture.path}
            alt={picture.label}
            className="h-full w-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-black/70 px-2 py-2 text-center text-[13px] text-white/80 sm:text-[15px]">
            {picture.label}
          </div>
        </div>
      )),
    [sortedMePictures]
  );
  const projects = useMemo(() => getProjectItems(), []);
  const featuredProjects = useMemo(() => projects.filter(p => p.featured), [projects]);
  const currentProjects = useMemo(() => projects.filter(p => p.current && !p.featured), [projects]);
  const otherProjects = useMemo(() => projects.filter(p => !p.featured && !p.current), [projects]);
  const projectTagByTitle = useMemo(
    () => new Map(projects.map(project => [project.title, toProjectTag(project.title)])),
    [projects]
  );
  const featuredProjectTitles = useMemo(
    () => new Set(featuredProjects.map(project => project.title)),
    [featuredProjects]
  );

  const frontendTech = useMemo(
    () => technologyItems.filter(tech => tech.category === "Frontend & UI"),
    []
  );
  const backendTech = useMemo(
    () => technologyItems.filter(tech => tech.category === "Backend & Infrastructure"),
    []
  );
  const dataTech = useMemo(
    () => technologyItems.filter(tech => tech.category === "Data, AI & Productivity"),
    []
  );
  const skillCategories = useMemo(
    () => [
      { title: "Frontend & UI", items: frontendTech },
      { title: "Backend & Infrastructure", items: backendTech },
      { title: "Data, AI & Productivity", items: dataTech }
    ],
    [frontendTech, backendTech, dataTech]
  );
  const aboutStats = useMemo(
    () => [
      { label: "Projects Built", value: projects.length, suffix: "+" },
      { label: "Total Commits", value: commitCount, suffix: "+" },
      { label: "Experience Roles", value: experienceItems.length, suffix: "" }
    ],
    [commitCount, projects.length]
  );

  const skillTooltipPosition = useMemo(() => {
    if (!skillProjectsTooltip || typeof window === "undefined") return null;
    const tooltipWidth = isMobileViewport ? 220 : 260;
    const estimatedTooltipHeight = 56 +
      (skillProjectsTooltip.projects.length * 32) +
      (skillProjectsTooltip.experiences.length * 38) +
      (isMobileViewport ? 30 : 0);
    return {
      left: Math.min(Math.max(12, skillProjectsTooltip.x + 16), window.innerWidth - tooltipWidth - 12),
      top: Math.min(Math.max(12, skillProjectsTooltip.y + 16), window.innerHeight - estimatedTooltipHeight - 12)
    };
  }, [isMobileViewport, skillProjectsTooltip]);

  const techTooltipPosition = useMemo(() => {
    if (!techTooltip || typeof window === "undefined") return null;
    const tooltipWidth = 180;
    const tooltipHeight = 44;
    return {
      left: Math.min(Math.max(12, techTooltip.x + 12), window.innerWidth - tooltipWidth - 12),
      top: Math.min(Math.max(12, techTooltip.y + 12), window.innerHeight - tooltipHeight - 12)
    };
  }, [techTooltip]);

  const getProjectsForSkill = useCallback((skillName: string) => {
    return projects.filter(project => project.techStack.some(tech => technologiesMatch(skillName, tech)));
  }, [projects]);

  const getExperiencesForSkill = useCallback((skillName: string) => {
    return getLinkedExperiencesForTechnology(skillName);
  }, []);

  const getTechIcon = useCallback((techName: string) => {
    return getTechnologyIcon(techName);
  }, []);

  const clearSkillTooltipCloseTimeout = useCallback(() => {
    if (skillTooltipHideTimeoutRef.current !== null) {
      window.clearTimeout(skillTooltipHideTimeoutRef.current);
      skillTooltipHideTimeoutRef.current = null;
    }
  }, []);

  const updateStoredRenderMode = useCallback((value: string | null) => {
    if (typeof window === "undefined") return;

    try {
      if (value === null) {
        window.localStorage.removeItem(RENDER_MODE_STORAGE_KEY);
      } else {
        window.localStorage.setItem(RENDER_MODE_STORAGE_KEY, value);
      }

      window.localStorage.removeItem(LEGACY_RENDER_MODE_STORAGE_KEY);
    } catch {
      // Ignore storage failures in restricted browser contexts.
    }
  }, []);

  const updateStoredFullViewMode = useCallback((mode: FullViewMode) => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(FULL_VIEW_MODE_STORAGE_KEY, mode);
    } catch {
      // Ignore storage failures in restricted browser contexts.
    }
  }, []);

  const closeSkillTooltipSoon = useCallback(() => {
    clearSkillTooltipCloseTimeout();
    skillTooltipHideTimeoutRef.current = window.setTimeout(() => {
      if (!isSkillTooltipHoveredRef.current) {
        setSkillProjectsTooltip(null);
      }
    }, 120);
  }, [clearSkillTooltipCloseTimeout]);

  const switchToSimplifiedMode = useCallback((reason: SimplifiedModeReason) => {
    if (reason === "manual") {
      updateStoredRenderMode("simple");
    } else if (reason === "compatibility") {
      updateStoredRenderMode("simple-compatibility");
    } else {
      updateStoredRenderMode(null);
    }

    setRenderModeState(prev => {
      if (prev.mode === "simple" && prev.reason === reason) {
        return prev;
      }

      return {
        mode: "simple",
        reason
      };
    });
  }, [updateStoredRenderMode]);

  const switchToFullMode = useCallback(() => {
    updateStoredRenderMode("full");
    setFullRenderAttempt(prev => prev + 1);
    setRenderModeState({
      mode: "full",
      reason: null
    });
  }, [updateStoredRenderMode]);

  const selectViewMode = useCallback((view: ViewMode) => {
    if (view === "simple") {
      switchToSimplifiedMode("manual");
      return;
    }

    setFullViewMode(view);
    updateStoredFullViewMode(view);

    if (renderMode !== "full") {
      switchToFullMode();
    }
  }, [renderMode, switchToFullMode, switchToSimplifiedMode, updateStoredFullViewMode]);

  const handlePixelSnowError = useCallback((message: string) => {
    console.warn("PixelSnow failed, switching to simplified mode.", message);
    switchToSimplifiedMode("compatibility");
  }, [switchToSimplifiedMode]);

  const handleFullExperienceError = useCallback((error: Error) => {
    console.error("Full experience crashed, switching to simplified mode.", error);
    switchToSimplifiedMode("compatibility");
  }, [switchToSimplifiedMode]);

  const handleSolarExperienceError = useCallback((message: string) => {
    console.error("Solar experience crashed, switching to simplified mode.", message);
    switchToSimplifiedMode("compatibility");
  }, [switchToSimplifiedMode]);

  const openSkillTooltip = useCallback((skillName: string, x: number, y: number) => {
    const matchingProjects = getProjectsForSkill(skillName);
    const matchingExperiences = getExperiencesForSkill(skillName);
    isSkillTooltipHoveredRef.current = false;
    clearSkillTooltipCloseTimeout();
    setSkillProjectsTooltip({
      skillName,
      projects: matchingProjects,
      experiences: matchingExperiences,
      x,
      y
    });
  }, [clearSkillTooltipCloseTimeout, getExperiencesForSkill, getProjectsForSkill]);

  const jumpToProject = useCallback((project: ProjectItem) => {
    const projectTag = projectTagByTitle.get(project.title);
    if (!projectTag) return;

    if (!featuredProjectTitles.has(project.title)) {
      setIsAutoPlayPaused(false);
      setOpenProject(project.title);
    }

    requestAnimationFrame(() => {
      document.getElementById(projectTag)?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    });

    clearSkillTooltipCloseTimeout();
    isSkillTooltipHoveredRef.current = false;
    setSkillProjectsTooltip(null);
  }, [clearSkillTooltipCloseTimeout, featuredProjectTitles, projectTagByTitle]);

  const jumpToExperience = useCallback((experience: ExperienceItem) => {
    requestAnimationFrame(() => {
      document.getElementById(experience.id)?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    });

    clearSkillTooltipCloseTimeout();
    isSkillTooltipHoveredRef.current = false;
    setSkillProjectsTooltip(null);
  }, [clearSkillTooltipCloseTimeout]);

  const renderSkillBadge = useCallback((skill: TechnologyItem) => {
    const skillName = skill.name;
    const matchingProjects = getProjectsForSkill(skillName);
    const matchingExperiences = getExperiencesForSkill(skillName);
    const isActiveSkill = skillProjectsTooltip?.skillName === skillName;

    return (
      <button
        key={skillName}
        type="button"
        className="group/skill inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left transition-all duration-200 hover:border-[rgb(51,178,51)]/45 hover:bg-[rgb(51,178,51)]/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[rgb(51,178,51)]/60"
        onMouseEnter={(event) => {
          if (isMobileViewport) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          openSkillTooltip(skillName, bounds.left + (bounds.width / 2), bounds.top + (bounds.height / 2));
        }}
        onMouseLeave={() => {
          if (isMobileViewport) return;
          closeSkillTooltipSoon();
        }}
        onFocus={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          openSkillTooltip(skillName, bounds.left + (bounds.width / 2), bounds.top + (bounds.height / 2));
        }}
        onBlur={() => {
          closeSkillTooltipSoon();
        }}
        onClick={(event) => {
          if (isMobileViewport) {
            const bounds = event.currentTarget.getBoundingClientRect();
            const centerX = bounds.left + (bounds.width / 2);
            const centerY = bounds.top + (bounds.height / 2);

            if (skillProjectsTooltip?.skillName === skillName) {
              setSkillProjectsTooltip(null);
              return;
            }

            openSkillTooltip(skillName, centerX, centerY);
            return;
          }

          if (matchingProjects.length === 1) {
            jumpToProject(matchingProjects[0]);
            return;
          }

          if (matchingExperiences.length === 1) {
            jumpToExperience(matchingExperiences[0]);
          }
        }}
        aria-label={`${skillName} (${matchingProjects.length} related projects, ${matchingExperiences.length} related experiences)`}
      >
        <img
          src={skill.iconSrc}
          alt={skillName}
          className="h-6 w-6 shrink-0 object-contain transition-[filter,transform] duration-200 group-hover/skill:scale-105"
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{
            filter: isActiveSkill
              ? "brightness(0) saturate(100%) invert(57%) sepia(47%) saturate(839%) hue-rotate(73deg) brightness(94%) contrast(88%)"
              : "brightness(0) invert(1)"
          }}
        />
        <span className="flex flex-col">
          <span className="text-sm text-white/80 group-hover/skill:text-white">{skillName}</span>
          {skill.note && (
            <span className="text-[11px] uppercase tracking-wide text-white/50 group-hover/skill:text-white/70">
              {skill.note}
            </span>
          )}
        </span>
      </button>
    );
  }, [
    closeSkillTooltipSoon,
    getExperiencesForSkill,
    getProjectsForSkill,
    isMobileViewport,
    jumpToExperience,
    jumpToProject,
    openSkillTooltip,
    skillProjectsTooltip?.skillName
  ]);

  const changeImage = useCallback((title: string, delta: number, total: number) => {
    if (total <= 1) return;
    setImageIndexMap(prev => {
      const current = prev[title] ?? 0;
      const next = (current + delta + total) % total;
      return { ...prev, [title]: next };
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const loadCommitCount = async () => {
      try {
        const response = await fetch(COMMIT_COUNT_ENDPOINT, {
          method: "GET",
          signal: controller.signal,
          headers: {
            Accept: "application/json, text/plain"
          }
        });

        if (!response.ok) {
          throw new Error(`Commit endpoint returned ${response.status}`);
        }

        const contentType = response.headers.get("content-type") || "";
        const payload: unknown = contentType.includes("application/json")
          ? await response.json()
          : await response.text();
        const parsedCommitCount = parseCommitCount(payload);

        if (parsedCommitCount === null) {
          throw new Error("Commit endpoint response does not contain a numeric commit total.");
        }

        setCommitCount(parsedCommitCount);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Unable to load total commits.", error);
        }
      }
    };

    void loadCommitCount();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!isSimplifiedMode && fullViewMode === "full") return;

    setOpenProject(null);
    setTechTooltip(null);
    setSkillProjectsTooltip(null);
  }, [fullViewMode, isSimplifiedMode]);

  useEffect(() => {
    if (isSimplifiedMode || fullViewMode !== "full") return;

    const updateViewportFlag = () => setIsMobileViewport(window.innerWidth < 768);
    updateViewportFlag();
    window.addEventListener("resize", updateViewportFlag);
    return () => window.removeEventListener("resize", updateViewportFlag);
  }, [fullViewMode, isSimplifiedMode]);

  useEffect(() => {
    if (isSimplifiedMode || fullViewMode !== "full") return;

    let animationFrameId = 0;

    const updateHeroProgress = () => {
      const heroHeight = heroRef.current?.offsetHeight || window.innerHeight;
      const progress = clamp(window.scrollY / Math.max(heroHeight, 1), 0, 1);
      setHeroScrollProgress(prev => (Math.abs(prev - progress) > 0.002 ? progress : prev));
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateHeroProgress);
    };

    updateHeroProgress();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [fullViewMode, isSimplifiedMode]);

  useEffect(() => {
    if (isSimplifiedMode || fullViewMode !== "full" || !openProject || isAutoPlayPaused) return;
    
    const project = [...currentProjects, ...otherProjects].find(p => p.title === openProject);
    if (!project || !project.imageSrc || project.imageSrc.length <= 1) return;

    const interval = setInterval(() => {
      if (project.imageSrc) {
        changeImage(openProject, 1, project.imageSrc.length);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isSimplifiedMode, fullViewMode, openProject, isAutoPlayPaused, currentProjects, otherProjects, changeImage]);

  useEffect(() => {
    return () => clearSkillTooltipCloseTimeout();
  }, [clearSkillTooltipCloseTimeout]);

  if (isSimplifiedMode) {
    return (
      <>
        <RenderModeControls
          selectedView={selectedViewMode}
          simplifiedModeReason={simplifiedModeReason}
          onSelect={selectViewMode}
        />
        <SimplePortfolio />
      </>
    );
  }

  if (fullViewMode === "solar") {
    return (
      <Suspense fallback={<main className="relative min-h-screen bg-black" />}>
        <>
          <RenderModeControls
            selectedView={selectedViewMode}
            simplifiedModeReason={simplifiedModeReason}
            onSelect={selectViewMode}
          />
          <FullExperienceBoundary key={`solar-experience-${fullRenderAttempt}`} onError={handleFullExperienceError}>
            <SolarSystemPortfolio onCompatibilityError={handleSolarExperienceError} />
          </FullExperienceBoundary>
        </>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<main className="relative min-h-screen bg-black" />}>
      <>
      <RenderModeControls
        selectedView={selectedViewMode}
        simplifiedModeReason={simplifiedModeReason}
        onSelect={selectViewMode}
      />
      <FullExperienceBoundary key={`full-experience-${fullRenderAttempt}`} onError={handleFullExperienceError}>
      <main className="relative min-h-[220vh] bg-black text-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full h-screen overflow-hidden">
        {/* Background layer - full screen (fixed) */}
        <motion.div
          className="dither-layer pointer-events-none"
          style={{ opacity: bgOpacity, scale: bgScale }}
        >
          <Suspense
            fallback={(
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0a] via-black to-black" />
            )}
          >
            <Dither
              waveColor={[0.2, 0.7, 0.2]}
              disableAnimation={bgOpacity <= 0.01}
              enableMouseInteraction={false}
              // mouseRadius={0.08}
              colorNum={3}
              waveAmplitude={0.3}
              waveFrequency={10}
              waveSpeed={0.012}
            />
          </Suspense>
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
            style={{ filter: "drop-shadow(0 0 34px rgba(0,0,0,1)) drop-shadow(0 0 18px rgba(0,0,0,1))" }}
          />
          <div className="mt-3 text-base sm:text-lg text-white/80">
            <DecryptedText
              text="Full-Stack Software Engineer"
              speed={100}
              sequential
              animateOn="view"
              className="text-white"
              encryptedClassName="text-white"
              style={{ filter: "drop-shadow(0 0 26px rgba(0,0,0,1)) drop-shadow(0 0 12px rgba(0,0,0,1))" }}
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

      <motion.div
        className="pixel-snow-layer pointer-events-none"
        style={{ opacity: snowOpacity }}
      >
        <Suspense fallback={null}>
          <PixelSnow
            color="#33b233"
            flakeSize={0.005}
            speed={1.25}
            pixelResolution={220}
            density={0.33}
            brightness={1.05}
            active={snowOpacity >= 0.01}
            onError={handlePixelSnowError}
          />
        </Suspense>
      </motion.div>

      {/* Content Section */}
      {/* Simple About Me*/}
      <section className="relative z-20 mx-auto max-w-[90vw] overflow-y-clip px-6 py-20 space-y-6 xl:max-w-[1600px]">
        <AnimatedContent className="w-full">
          <h2
            className="text-4xl sm:text-5xl font-bold text-center"
            id="about"
            style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,1)) drop-shadow(0 0 10px rgba(0,0,0,1))" }}
          >
            About Me
          </h2>

          <div className="mt-8 flex flex-col lg:flex-row items-center gap-10">
            {/* Text */}
            <p className="text-white/75 text-lg leading-relaxed lg:flex-1">
              I'm a fourth-year Computer Science student (AI & Software Engineering focus) and Data Science major who loves building things. 
              I'm a fast, curiosity-driven programmer who takes ownership of my work and genuinely enjoys the process of creating.
              <br/><br/>
              I proudly describe myself as a nerd for this stuff, I spend my free time learning about new technologies and am always looking to learn. 
              In addition to SWE, I am on the SU Track & Field team as a thrower, absolutely love Slay the Spire, and my favorite dog are Corgis (big dog guy).
              <br/><br/>
              Feel free to send me an email or connect with me on LinkedIn if you want to chat or collaborate on something cool!
            </p>

            {/* Picture carousel */}
            {aboutMePictureCards.length > 0 && (
              <div className="mx-auto w-72 shrink-0 sm:w-80 lg:mx-0 lg:w-64 xl:w-72">
                <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-black/50">
                  <Stack
                    cards={aboutMePictureCards}
                    randomRotation
                    sensitivity={130}
                    sendToBackOnClick
                    autoplay={aboutMePictureCards.length > 1}
                    autoplayDelay={6969}
                    pauseOnHover
                    mobileClickOnly
                    animationConfig={{ stiffness: 220, damping: 22 }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {aboutStats.map(stat => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-4 text-center backdrop-blur-sm"
              >
                <div className="flex items-baseline justify-center gap-1">
                  <CountUp
                    to={stat.value}
                    duration={1.6}
                    separator=","
                    className="text-2xl font-semibold text-white sm:text-3xl"
                  />
                  {stat.suffix && (
                    <span className="text-xl font-semibold text-[rgb(51,178,51)] sm:text-2xl">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs uppercase tracking-wide text-white/60 sm:text-[11px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* <div className="max-w-3xl mx-auto mt-8">
            <button
              onClick={() => setIsCoursesOpen(!isCoursesOpen)}
              className="w-full flex items-center justify-between px-4 py-2 text-white/40 hover:text-white/60 transition-all duration-300 group"
            >
              <span className="text-sm font-medium">Completed Coursework</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${isCoursesOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <AnimatePresence>
              {isCoursesOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-white/5 border border-white/10 rounded-lg mt-2">
                    {completedCourses.length > 0 ? (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {completedCourses.map((course, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-white/60">
                            <span className="w-1 h-1 rounded-full bg-[rgb(51,178,51)]/50" />
                            {course}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-white/50 italic text-center text-sm">Course list to be populated...</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div> */}

        </AnimatedContent>
        {/* Projects section */}
        <AnimatedContent className="w-full">
          <h2
            className="text-4xl sm:text-5xl font-bold mt-12 text-center"
            id="projects"
            style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,1)) drop-shadow(0 0 10px rgba(0,0,0,1))" }}
          >
            Projects
          </h2>
            <div className="mt-8 space-y-10">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-white/90 text-center">Featured Projects</h3>
                <Suspense
                  fallback={<div className="h-[420px] rounded-[24px] border border-white/10 bg-white/5 animate-pulse" />}
                >
                  <MagicBento
                    cards={featuredProjects.map(project => {
                      const projectTag = projectTagByTitle.get(project.title) || toProjectTag(project.title);
                      return {
                        title: project.title,
                        description: project.description,
                        label: project.date || "Featured",
                        color: BENTO_CARD_BACKGROUND,
                        imageSrc: project.imageSrc,
                        link: project.link,
                        techStack: project.techStack,
                        demoLink: project.demoLink,
                        demoVideoLink: project.demoVideoLink,
                        date: project.date,
                        anchorId: projectTag,
                        projectTag
                      };
                    })}
                    tabletColumns={2}
                    desktopColumns={featuredProjects.length}
                    desktopBreakpoint={1024}
                    enableBorderGlow
                    glowColor="51, 178, 51"
                    enableTilt
                    enableMagnetism
                    particleCount={10}
                  />
                </Suspense>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4 text-white/90 text-center">Current Projects</h3>
                <div className="w-full flex flex-col gap-3">
                  {currentProjects.map((project) => {
                    const images = project.imageSrc || [];
                    const currentIndex = imageIndexMap[project.title] ?? 0;
                    const isOpen = openProject === project.title;
                    
                    return (
                      <GlowCard
                        key={project.title}
                        id={projectTagByTitle.get(project.title) || toProjectTag(project.title)}
                        data-project-tag={projectTagByTitle.get(project.title) || toProjectTag(project.title)}
                        className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                      >
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
                                    loading="eager"
                                    onError={() => console.error(`Failed to load image: ${images[currentIndex]}`)}
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
                                {project.techStack.map(tech => {
                                  const iconSrc = getTechIcon(tech);
                                  return (
                                    <div
                                      key={tech}
                                      className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/10 px-2.5 py-1 text-sm text-white/85 transition-colors duration-200 hover:bg-white/20"
                                      onMouseEnter={(e) => setTechTooltip({ name: tech, x: e.clientX, y: e.clientY })}
                                      onMouseLeave={() => setTechTooltip(null)}
                                    >
                                      {iconSrc && (
                                        <img
                                          src={iconSrc}
                                          alt={tech}
                                          className="h-4 w-4 shrink-0 brightness-0 invert"
                                        />
                                      )}
                                      <span>{tech}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                            <div className="flex flex-wrap gap-4 text-sm">
                              {project.link && (
                                <a className="text-white hover:text-white/80 transition" href={project.link} target="_blank" rel="noopener noreferrer" aria-label="View Code">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                  </svg>
                                </a>
                              )}
                              {project.demoLink && (
                                <a className="text-white hover:text-white/80 transition" href={project.demoLink} target="_blank" rel="noopener noreferrer" aria-label="View Demo">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                  </svg>
                                </a>
                              )}
                              {project.demoVideoLink && (
                                <a className="text-white hover:text-white/80 transition" href={project.demoVideoLink} target="_blank" rel="noopener noreferrer" aria-label="Watch Video">
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

              <div>
                <h3 className="text-2xl font-semibold mb-4 text-white/90 text-center">Past Projects</h3>
                <div className="w-full flex flex-col gap-3">
                  {otherProjects.map((project) => {
                    const images = project.imageSrc || [];
                    const currentIndex = imageIndexMap[project.title] ?? 0;
                    const isOpen = openProject === project.title;
                    
                    return (
                      <GlowCard
                        key={project.title}
                        id={projectTagByTitle.get(project.title) || toProjectTag(project.title)}
                        data-project-tag={projectTagByTitle.get(project.title) || toProjectTag(project.title)}
                        className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                      >
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
                                    loading="eager"
                                    onError={() => console.error(`Failed to load image: ${images[currentIndex]}`)}
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
                                {project.techStack.map(tech => {
                                  const iconSrc = getTechIcon(tech);
                                  return (
                                    <div
                                      key={tech}
                                      className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/10 px-2.5 py-1 text-sm text-white/85 transition-colors duration-200 hover:bg-white/20"
                                      onMouseEnter={(e) => setTechTooltip({ name: tech, x: e.clientX, y: e.clientY })}
                                      onMouseLeave={() => setTechTooltip(null)}
                                    >
                                      {iconSrc && (
                                        <img
                                          src={iconSrc}
                                          alt={tech}
                                          className="h-4 w-4 shrink-0 brightness-0 invert"
                                        />
                                      )}
                                      <span>{tech}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                            <div className="flex flex-wrap gap-4 text-sm">
                              {project.link && (
                                <a className="text-white hover:text-white/80 transition" href={project.link} target="_blank" rel="noopener noreferrer" aria-label="View Code">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                  </svg>
                                </a>
                              )}
                              {project.demoLink && (
                                <a className="text-white hover:text-white/80 transition" href={project.demoLink} target="_blank" rel="noopener noreferrer" aria-label="View Demo">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                  </svg>
                                </a>
                              )}
                              {project.demoVideoLink && (
                                <a className="text-white hover:text-white/80 transition" href={project.demoVideoLink} target="_blank" rel="noopener noreferrer" aria-label="Watch Video">
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
            style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,1)) drop-shadow(0 0 10px rgba(0,0,0,1))" }}
          >
            Experience
          </h2>
          <div className="mt-8">
            <Suspense
              fallback={<div className="h-[360px] rounded-[24px] border border-white/10 bg-white/5 animate-pulse" />}
            >
              <MagicBento
                cards={experienceItems.map(exp => ({
                  anchorId: exp.id,
                  title: exp.role,
                  description: exp.description,
                  label: exp.duration,
                  color: BENTO_CARD_BACKGROUND,
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
            </Suspense>
          </div>

          <div className="mt-16 space-y-12">
            {skillCategories.map(category => (
              <div key={category.title} className="space-y-4">
                <h3 className="text-xl font-semibold text-center text-white/70">{category.title}</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {category.items.map(skill => renderSkillBadge(skill))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedContent>
        {/* Contact section */}
        <AnimatedContent className="w-full">
          <h2
            className="text-4xl sm:text-5xl font-bold mt-12 text-center"
            id="contact"
            style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,1)) drop-shadow(0 0 10px rgba(0,0,0,1))" }}
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
                    <svg className="w-8 h-8 text-white/80 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                  {item.label === 'Email' && (
                    <svg className="w-8 h-8 text-white/80 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  {item.label === 'Resume' && (
                    <svg className="w-8 h-8 text-white/80 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                </div>
                {/* Label */}
                <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-300">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </AnimatedContent>
      </section>

      {techTooltip && techTooltipPosition && (
        <div
          className="fixed z-[150] pointer-events-none rounded-md border border-white/15 bg-black/90 px-3 py-1.5 text-sm text-white/85 shadow-xl"
          style={{ left: techTooltipPosition.left, top: techTooltipPosition.top }}
        >
          {techTooltip.name}
        </div>
      )}

      {skillProjectsTooltip && skillTooltipPosition && (
        <div
          className={`fixed z-[160] rounded-xl border border-[rgb(51,178,51)]/35 bg-black/90 p-3 shadow-2xl backdrop-blur-sm ${isMobileViewport ? "w-[220px]" : "w-[260px]"}`}
          style={{ left: skillTooltipPosition.left, top: skillTooltipPosition.top }}
          onMouseEnter={() => {
            isSkillTooltipHoveredRef.current = true;
            clearSkillTooltipCloseTimeout();
          }}
          onMouseLeave={() => {
            isSkillTooltipHoveredRef.current = false;
            setSkillProjectsTooltip(null);
          }}
        >
          {isMobileViewport && (
            <button
              type="button"
              onClick={() => setSkillProjectsTooltip(null)}
              className="absolute right-2 top-2 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-xs text-white/75"
            >
              Close
            </button>
          )}
          <p className="text-xs uppercase tracking-wide text-white/85">
            {skillProjectsTooltip.skillName}
          </p>
          <p className="mt-0.5 text-xs text-white/55">Related Projects</p>
          <div className="mt-2 space-y-1.5">
            {skillProjectsTooltip.projects.length > 0 ? (
              skillProjectsTooltip.projects.map(project => (
                <button
                  key={project.title}
                  type="button"
                  className="w-full rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-left text-sm text-white/80 transition-colors hover:border-[rgb(51,178,51)]/45 hover:bg-[rgb(51,178,51)]/10 hover:text-white"
                  onClick={() => jumpToProject(project)}
                >
                  {project.title}
                </button>
              ))
            ) : (
              <p className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-sm text-white/50">
                No linked projects yet.
              </p>
            )}
          </div>
          <p className="mt-3 text-xs text-white/55">Related Experience</p>
          <div className="mt-2 space-y-1.5">
            {skillProjectsTooltip.experiences.length > 0 ? (
              skillProjectsTooltip.experiences.map(experience => (
                <button
                  key={experience.id}
                  type="button"
                  className="w-full rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-left text-sm text-white/80 transition-colors hover:border-[rgb(51,178,51)]/45 hover:bg-[rgb(51,178,51)]/10 hover:text-white"
                  onClick={() => jumpToExperience(experience)}
                >
                  {experience.company}
                </button>
              ))
            ) : (
              <p className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-sm text-white/50">
                No linked experience yet.
              </p>
            )}
          </div>
        </div>
      )}
      </main>
      </FullExperienceBoundary>
      </>
    </Suspense>
  );
}

export default App;
