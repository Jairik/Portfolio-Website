import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { socialItems } from "../assets/constantVars";
import { completedCourses, experienceItems, technologiesMatch, technologyItems } from "../assets/experience";
import { getProjectItems, type ProjectItem } from "../assets/projects";

const PLANET_TEXTURE_BASE_PATH = "/planet-textures";
const OUTER_SPACE_BACKGROUND_URL = `${PLANET_TEXTURE_BASE_PATH}/outer-space-background.jpg`;
const SUN_TEXTURE_URL = `${PLANET_TEXTURE_BASE_PATH}/sun-texture.jpg`;
const MERCURY_TEXTURE_URL = `${PLANET_TEXTURE_BASE_PATH}/mercury-texture.jpg`;
const VENUS_TEXTURE_URL = `${PLANET_TEXTURE_BASE_PATH}/venus-texture.jpg`;
const EARTH_TEXTURE_URL = `${PLANET_TEXTURE_BASE_PATH}/earth-texture.jpg`;
const EARTH_NORMALMAP_URL = `${PLANET_TEXTURE_BASE_PATH}/earth-normalmap.jpg`;
const MARS_TEXTURE_URL = `${PLANET_TEXTURE_BASE_PATH}/mars-texture.jpg`;
const JUPITER_TEXTURE_URL = `${PLANET_TEXTURE_BASE_PATH}/jupiter-texture.jpg`;
const SATURN_TEXTURE_URL = `${PLANET_TEXTURE_BASE_PATH}/saturn-texture.jpg`;
const SATURN_RING_TEXTURE_URL = `${PLANET_TEXTURE_BASE_PATH}/saturn-ring-texture.jpg`;
const URANUS_TEXTURE_URL = `${PLANET_TEXTURE_BASE_PATH}/uranus-texture.jpg`;
const URANUS_RING_TEXTURE_URL = `${PLANET_TEXTURE_BASE_PATH}/uranus-ring-texture.jpg`;
const NEPTUNE_TEXTURE_URL = `${PLANET_TEXTURE_BASE_PATH}/neptune-texture.jpg`;
const MOON_TEXTURE_URL = `${PLANET_TEXTURE_BASE_PATH}/moon-texture.jpg`;
const MOON_NORMALMAP_URL = `${PLANET_TEXTURE_BASE_PATH}/normal.jpg`;
const SPACESHIP_IDLE_URL = `${PLANET_TEXTURE_BASE_PATH}/alient_spaceship_nobeam.svg`;
const SPACESHIP_BEAM_URL = `${PLANET_TEXTURE_BASE_PATH}/alien_spaceship_beam.svg`;

const ABOUT_PARAGRAPHS = [
  "I'm a fourth-year Computer Science student (AI & Software Engineering focus) and Data Science major who loves building things.",
  "I am a fast, curiosity-driven programmer who takes ownership, and I spend free time learning new technologies.",
  "Outside software, I throw for SU Track & Field, love Slay the Spire, and always enjoy collaborating on ambitious builds."
] as const;

const DAY_MS = 86_400_000;
const ORBIT_EPOCH_MS = Date.UTC(2000, 0, 1, 12, 0, 0);
const BASE_SIMULATED_DAYS_PER_SECOND = 5.5;
const MIN_CLICK_DISTANCE_PX = 6;
const CAMERA_TRANSITION_MS = 900;
const SPEED_OPTIONS = [0.5, 1, 2, 5, 10] as const;
type SimulationSpeed = (typeof SPEED_OPTIONS)[number];

type PlanetId =
  | "mercury"
  | "venus"
  | "earth"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune";

interface PlanetDefinition {
  id: PlanetId;
  label: string;
  heading: string;
  textureUrl: string;
  visualRadius: number;
  orbitAU: number;
  orbitalPeriodDays: number;
  initialLongitudeDeg: number;
  inclinationDeg: number;
  rotationSpeed: number;
  ring?: {
    textureUrl: string;
    innerRadius: number;
    outerRadius: number;
    tiltDeg: number;
  };
}

interface ContentLink {
  label: string;
  href: string;
}

interface ContentItem {
  title: string;
  detail?: string;
  links?: ContentLink[];
  iconSrc?: string;
}

interface ContentSection {
  title: string;
  items: ContentItem[];
}

interface PlanetContent {
  heading: string;
  summary: string;
  sections: ContentSection[];
}

interface CameraTransition {
  startMs: number;
  durationMs: number;
  fromPosition: THREE.Vector3;
  toPosition: THREE.Vector3;
  fromTarget: THREE.Vector3;
  toTarget: THREE.Vector3;
}

interface PlanetRuntime {
  definition: PlanetDefinition;
  mesh: THREE.Mesh;
  ring?: THREE.Mesh;
  orbitRadius: number;
}

interface SolarSystemPortfolioProps {
  onCompatibilityError?: (message: string) => void;
}

type TextureFallbackKind =
  | "space"
  | "sun"
  | "mercury"
  | "venus"
  | "earth"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune"
  | "moon"
  | "normal"
  | "saturnRing"
  | "uranusRing"
  | "generic";

const PLANETS: PlanetDefinition[] = [
  {
    id: "mercury",
    label: "Mercury",
    heading: "About Me",
    textureUrl: MERCURY_TEXTURE_URL,
    visualRadius: 2.1,
    orbitAU: 0.39,
    orbitalPeriodDays: 87.969,
    initialLongitudeDeg: 252.25084,
    inclinationDeg: 7,
    rotationSpeed: 0.013
  },
  {
    id: "venus",
    label: "Venus",
    heading: "Relevant Courses",
    textureUrl: VENUS_TEXTURE_URL,
    visualRadius: 2.45,
    orbitAU: 0.723,
    orbitalPeriodDays: 224.701,
    initialLongitudeDeg: 181.97973,
    inclinationDeg: 3.39,
    rotationSpeed: 0.01
  },
  {
    id: "earth",
    label: "Earth",
    heading: "Current Projects",
    textureUrl: EARTH_TEXTURE_URL,
    visualRadius: 2.55,
    orbitAU: 1,
    orbitalPeriodDays: 365.256,
    initialLongitudeDeg: 100.46435,
    inclinationDeg: 0,
    rotationSpeed: 0.018
  },
  {
    id: "mars",
    label: "Mars",
    heading: "Past Projects",
    textureUrl: MARS_TEXTURE_URL,
    visualRadius: 2.2,
    orbitAU: 1.524,
    orbitalPeriodDays: 686.98,
    initialLongitudeDeg: -4.553432,
    inclinationDeg: 1.85,
    rotationSpeed: 0.015
  },
  {
    id: "jupiter",
    label: "Jupiter",
    heading: "Experience",
    textureUrl: JUPITER_TEXTURE_URL,
    visualRadius: 6.2,
    orbitAU: 5.203,
    orbitalPeriodDays: 4_332.589,
    initialLongitudeDeg: 34.39644,
    inclinationDeg: 1.3,
    rotationSpeed: 0.026
  },
  {
    id: "saturn",
    label: "Saturn",
    heading: "Featured Projects",
    textureUrl: SATURN_TEXTURE_URL,
    visualRadius: 5.7,
    orbitAU: 9.537,
    orbitalPeriodDays: 10_759.22,
    initialLongitudeDeg: 49.954244,
    inclinationDeg: 2.48,
    rotationSpeed: 0.021,
    ring: {
      textureUrl: SATURN_RING_TEXTURE_URL,
      innerRadius: 6.7,
      outerRadius: 10.4,
      tiltDeg: 24
    }
  },
  {
    id: "uranus",
    label: "Uranus",
    heading: "Skills",
    textureUrl: URANUS_TEXTURE_URL,
    visualRadius: 4.15,
    orbitAU: 19.191,
    orbitalPeriodDays: 30_688.5,
    initialLongitudeDeg: 313.238104,
    inclinationDeg: 0.77,
    rotationSpeed: 0.017,
    ring: {
      textureUrl: URANUS_RING_TEXTURE_URL,
      innerRadius: 4.8,
      outerRadius: 7.4,
      tiltDeg: 97.8
    }
  },
  {
    id: "neptune",
    label: "Neptune",
    heading: "Contact",
    textureUrl: NEPTUNE_TEXTURE_URL,
    visualRadius: 4.05,
    orbitAU: 30.07,
    orbitalPeriodDays: 60_182,
    initialLongitudeDeg: 304.87997,
    inclinationDeg: 1.77,
    rotationSpeed: 0.016
  }
];

const PLANET_ORDER = PLANETS.map(planet => planet.id);
const OVERVIEW_CAMERA_POSITION = new THREE.Vector3(0, 60, 186);
const OVERVIEW_TARGET = new THREE.Vector3(0, 0, 0);

const formatSimulationDate = (date: Date) =>
  date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });

const compressOrbitDistance = (au: number) => {
  return Math.log2(au + 1) * 22;
};

const PLANET_COLOR_STOPS: Record<Exclude<TextureFallbackKind, "space" | "normal" | "saturnRing" | "uranusRing" | "generic">, [string, string, string]> = {
  sun: ["#ffd57a", "#ff9f43", "#7e3016"],
  mercury: ["#d6d2c8", "#8f8a83", "#453f3a"],
  venus: ["#efcf98", "#c8965c", "#60462f"],
  earth: ["#5ec9ff", "#1c6fb7", "#0b2f54"],
  mars: ["#d07f4f", "#8a4124", "#432016"],
  jupiter: ["#dcb591", "#b2774a", "#6a3d24"],
  saturn: ["#e3cf9c", "#b69a6b", "#66553a"],
  uranus: ["#b8ebf2", "#5da9b5", "#2f6770"],
  neptune: ["#6aa7ff", "#305cc5", "#1b356e"],
  moon: ["#e5e5de", "#a1a197", "#575752"]
};

const createFallbackTexture = (
  kind: TextureFallbackKind,
  options?: { color?: boolean }
): THREE.CanvasTexture => {
  if (kind === "space") {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const context = canvas.getContext("2d");
    if (!context) return new THREE.CanvasTexture(canvas);

    const gradient = context.createRadialGradient(520, 500, 120, 512, 512, 760);
    gradient.addColorStop(0, "#0d1320");
    gradient.addColorStop(0.56, "#04080f");
    gradient.addColorStop(1, "#010204");
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let index = 0; index < 1200; index += 1) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 1.8;
      const alpha = 0.3 + (Math.random() * 0.65);
      context.fillStyle = `rgba(210, 232, 255, ${alpha})`;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }

  if (kind === "normal") {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext("2d");
    if (!context) return new THREE.CanvasTexture(canvas);

    context.fillStyle = "rgb(128, 128, 255)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgba(128, 128, 255, 0.23)";
    for (let index = 0; index < 2600; index += 1) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = 1 + Math.random() * 2.2;
      context.fillRect(x, y, size, size);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  if (kind === "saturnRing" || kind === "uranusRing") {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const context = canvas.getContext("2d");
    if (!context) return new THREE.CanvasTexture(canvas);

    context.clearRect(0, 0, canvas.width, canvas.height);
    const center = canvas.width / 2;
    const ringStart = kind === "saturnRing" ? 278 : 336;
    const ringEnd = kind === "saturnRing" ? 470 : 432;
    const baseColor = kind === "saturnRing" ? "222, 207, 164" : "182, 214, 221";

    for (let radius = ringStart; radius <= ringEnd; radius += 2) {
      const normalized = (radius - ringStart) / Math.max(ringEnd - ringStart, 1);
      const alpha = 0.08 + (Math.sin(normalized * 18) * 0.07) + (Math.random() * 0.08);
      context.strokeStyle = `rgba(${baseColor}, ${Math.max(0.03, alpha)})`;
      context.lineWidth = 1.6;
      context.beginPath();
      context.arc(center, center, radius, 0, Math.PI * 2);
      context.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }

  const palette = PLANET_COLOR_STOPS[(kind === "generic" ? "earth" : kind) as keyof typeof PLANET_COLOR_STOPS];
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.CanvasTexture(canvas);

  const gradient = context.createRadialGradient(172, 170, 30, 250, 252, 330);
  gradient.addColorStop(0, palette[0]);
  gradient.addColorStop(0.58, palette[1]);
  gradient.addColorStop(1, palette[2]);
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let index = 0; index < 180; index += 1) {
    const y = Math.random() * canvas.height;
    const thickness = 1 + (Math.random() * 3);
    const alpha = 0.04 + (Math.random() * 0.12);
    context.fillStyle = `rgba(255,255,255,${alpha})`;
    context.fillRect(0, y, canvas.width, thickness);
  }

  for (let index = 0; index < 1000; index += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = 0.3 + (Math.random() * 1.4);
    context.fillStyle = `rgba(255,255,255,${0.01 + Math.random() * 0.11})`;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  if (options?.color !== false) {
    texture.colorSpace = THREE.SRGBColorSpace;
  }
  texture.needsUpdate = true;
  return texture;
};

const createHeadingSprite = (text: string) => {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  if (!context) {
    return new THREE.Sprite();
  }

  const labelBoxWidth = 500;
  const labelBoxHeight = 85;
  const labelBoxX = Math.round((canvas.width - labelBoxWidth) / 2);
  const labelBoxY = Math.round((canvas.height - labelBoxHeight) / 2);
  const textMaxWidth = labelBoxWidth * 0.92;
  const textMaxHeight = labelBoxHeight * 0.84;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "rgba(4, 8, 12, 0.7)";
  context.fillRect(labelBoxX, labelBoxY, labelBoxWidth, labelBoxHeight);
  context.strokeStyle = "rgba(134, 230, 134, 0.7)";
  context.lineWidth = 3.5;
  context.strokeRect(labelBoxX, labelBoxY, labelBoxWidth, labelBoxHeight);
  context.fillStyle = "rgba(255, 255, 255, 0.95)";
  let fontSize = 122;
  const minFontSize = 44;
  while (fontSize > minFontSize) {
    context.font = `800 ${fontSize}px "Source Sans 3", "Helvetica Neue", Arial, sans-serif`;
    const measuredWidth = context.measureText(text).width;
    const estimatedHeight = fontSize * 0.9;
    if (measuredWidth <= textMaxWidth && estimatedHeight <= textMaxHeight) {
      break;
    }
    fontSize -= 2;
  }
  context.font = `800 ${fontSize}px "Source Sans 3", "Helvetica Neue", Arial, sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, canvas.width / 2, canvas.height / 2 + 1);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    depthTest: false
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(25.2, 6.6, 1);
  sprite.renderOrder = 10;
  return sprite;
};

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

const addIfPresent = (label: string, href?: string) => {
  if (!href || !href.trim()) return null;
  return { label, href };
};

const buildProjectLinks = (project: ProjectItem): ContentLink[] => {
  return [
    addIfPresent("Code", project.link),
    addIfPresent("Demo", project.demoLink),
    addIfPresent("Video", project.demoVideoLink)
  ].filter((link): link is ContentLink => link !== null);
};

const toProjectContentItems = (projects: ProjectItem[]): ContentItem[] => {
  return projects.map(project => ({
    title: project.title,
    detail: [project.date, project.description].filter(Boolean).join(" - "),
    links: buildProjectLinks(project)
  }));
};

const toSkillItems = (skills: typeof technologyItems): ContentItem[] =>
  skills.map(skill => ({
    title: skill.name,
    detail: skill.note ? `Note: ${skill.note}` : undefined,
    iconSrc: skill.iconSrc
  }));

export default function SolarSystemPortfolio({ onCompatibilityError }: SolarSystemPortfolioProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const focusPlanetCommandRef = useRef<(planetId: PlanetId | null) => void>(() => undefined);
  const [activePlanetId, setActivePlanetId] = useState<PlanetId | null>(null);
  const [simulationDateLabel, setSimulationDateLabel] = useState(() => formatSimulationDate(new Date()));
  const [simulationSpeed, setSimulationSpeed] = useState<SimulationSpeed>(1);
  const [isSceneReady, setIsSceneReady] = useState(false);
  const [highlightedSkillName, setHighlightedSkillName] = useState<string | null>(null);
  const simulationSpeedRef = useRef<SimulationSpeed>(1);

  const projects = useMemo(() => getProjectItems(), []);
  const featuredProjects = useMemo(() => projects.filter(project => project.featured), [projects]);
  const currentProjects = useMemo(
    () => projects.filter(project => project.current && !project.featured),
    [projects]
  );
  const pastProjects = useMemo(
    () => projects.filter(project => !project.current && !project.featured),
    [projects]
  );

  const frontendSkills = useMemo(
    () => technologyItems.filter(skill => skill.category === "Frontend & UI"),
    []
  );
  const backendSkills = useMemo(
    () => technologyItems.filter(skill => skill.category === "Backend & Infrastructure"),
    []
  );
  const dataSkills = useMemo(
    () => technologyItems.filter(skill => skill.category === "Data, AI & Productivity"),
    []
  );

  useEffect(() => {
    simulationSpeedRef.current = simulationSpeed;
  }, [simulationSpeed]);

  const planetContent = useMemo<Record<PlanetId, PlanetContent>>(
    () => ({
      mercury: {
        heading: "About Me",
        summary: "Personal background, focus areas, and interests outside engineering.",
        sections: [
          {
            title: "Overview",
            items: ABOUT_PARAGRAPHS.map(paragraph => ({ title: paragraph }))
          }
        ]
      },
      venus: {
        heading: "Relevant Courses",
        summary: "Core computer science, software engineering, AI, and data science coursework.",
        sections: [
          {
            title: "Coursework",
            items: completedCourses.map(course => ({ title: course }))
          }
        ]
      },
      earth: {
        heading: "Current Projects",
        summary: "Active builds and ongoing systems currently being developed.",
        sections: [
          {
            title: "In Progress",
            items: toProjectContentItems(currentProjects)
          }
        ]
      },
      mars: {
        heading: "Past Projects",
        summary: "Completed project archive spanning software, AI, and systems.",
        sections: [
          {
            title: "Project Archive",
            items: toProjectContentItems(pastProjects)
          }
        ]
      },
      jupiter: {
        heading: "Experience",
        summary: "Professional roles and the engineering impact delivered in each position.",
        sections: [
          {
            title: "Roles",
            items: experienceItems.map(experience => ({
              title: `${experience.role} - ${experience.company}`,
              detail: [experience.duration, experience.description].join(" - ")
            }))
          }
        ]
      },
      saturn: {
        heading: "Featured Projects",
        summary: "Flagship projects with the strongest product and technical impact.",
        sections: [
          {
            title: "Featured Work",
            items: toProjectContentItems(featuredProjects)
          }
        ]
      },
      uranus: {
        heading: "Skills",
        summary: "Complete skill inventory grouped by domain.",
        sections: [
          {
            title: "Frontend & UI",
            items: toSkillItems(frontendSkills)
          },
          {
            title: "Backend & Infrastructure",
            items: toSkillItems(backendSkills)
          },
          {
            title: "Data, AI & Productivity",
            items: toSkillItems(dataSkills)
          }
        ]
      },
      neptune: {
        heading: "Contact",
        summary: "Direct channels for collaboration, opportunities, and project discussion.",
        sections: [
          {
            title: "Contact",
            items: socialItems.map(item => ({
              title: item.label,
              detail: item.link,
              links: [{ label: "Open", href: item.link }]
            }))
          }
        ]
      }
    }),
    [backendSkills, currentProjects, dataSkills, featuredProjects, frontendSkills, pastProjects]
  );

  const activeContent = activePlanetId ? planetContent[activePlanetId] : null;
  const isSkillsPlanetActive = activePlanetId === "uranus";
  const getProjectsForSkill = useCallback((skillName: string) => {
    return projects.filter(project => project.techStack.some(tech => technologiesMatch(skillName, tech)));
  }, [projects]);
  const highlightedSkillProjects = useMemo(
    () => (highlightedSkillName ? getProjectsForSkill(highlightedSkillName) : []),
    [getProjectsForSkill, highlightedSkillName]
  );
  const speedProgress = useMemo(() => {
    const min = SPEED_OPTIONS[0];
    const max = SPEED_OPTIONS[SPEED_OPTIONS.length - 1];
    return ((simulationSpeed - min) / (max - min)) * 100;
  }, [simulationSpeed]);
  const beamTargetX = useMemo(() => {
    if (!activePlanetId) return 0;
    const selectedPlanetIndex = PLANET_ORDER.indexOf(activePlanetId);
    const midpointIndex = (PLANET_ORDER.length - 1) / 2;
    return (selectedPlanetIndex - midpointIndex) * 108;
  }, [activePlanetId]);

  useEffect(() => {
    if (activePlanetId !== "uranus") {
      setHighlightedSkillName(null);
    }
  }, [activePlanetId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04080f, 0.0018);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });
    } catch {
      onCompatibilityError?.("Unable to initialize WebGL renderer.");
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      2200
    );
    camera.position.copy(OVERVIEW_CAMERA_POSITION);
    camera.lookAt(OVERVIEW_TARGET);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 6;
    controls.maxDistance = 280;
    controls.minPolarAngle = 0.3;
    controls.maxPolarAngle = Math.PI * 0.78;
    controls.target.copy(OVERVIEW_TARGET);
    controls.update();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.34);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0xfff5cf, 2.4, 0, 2.0);
    keyLight.position.set(0, 0, 0);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x7ab9ff, 0.35, 500, 2.0);
    rimLight.position.set(-170, 90, -120);
    scene.add(rimLight);

    const textureLoader = new THREE.TextureLoader();
    const maxAnisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);

    const loadTexture = (
      textureUrl: string,
      options?: { color?: boolean; fallback?: TextureFallbackKind }
    ) => {
      const useColor = options?.color !== false;
      const fallbackKind = options?.fallback || "generic";
      const texture = textureLoader.load(
        textureUrl,
        loadedTexture => {
          if (useColor) {
            loadedTexture.colorSpace = THREE.SRGBColorSpace;
          }
          loadedTexture.anisotropy = maxAnisotropy;
        },
        undefined,
        () => {
          const fallbackTexture = createFallbackTexture(fallbackKind, { color: useColor });
          texture.image = fallbackTexture.image as unknown as HTMLImageElement;
          texture.wrapS = fallbackTexture.wrapS;
          texture.wrapT = fallbackTexture.wrapT;
          texture.minFilter = fallbackTexture.minFilter;
          texture.magFilter = fallbackTexture.magFilter;
          if (useColor) {
            texture.colorSpace = THREE.SRGBColorSpace;
          }
          texture.needsUpdate = true;
        }
      );

      if (useColor) {
        texture.colorSpace = THREE.SRGBColorSpace;
      }
      texture.anisotropy = maxAnisotropy;
      return texture;
    };

    scene.background = loadTexture(OUTER_SPACE_BACKGROUND_URL, {
      fallback: "space"
    });

    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 3_200;
    const starPositionData = new Float32Array(starCount * 3);
    for (let index = 0; index < starCount; index += 1) {
      const radius = THREE.MathUtils.randFloat(260, 1_350);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
      starPositionData[(index * 3) + 0] = radius * Math.sin(phi) * Math.cos(theta);
      starPositionData[(index * 3) + 1] = radius * Math.cos(phi);
      starPositionData[(index * 3) + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositionData, 3));
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xd6e8ff,
      size: 0.9,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.86
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(8.2, 64, 64),
      new THREE.MeshStandardMaterial({
        map: loadTexture(SUN_TEXTURE_URL, { fallback: "sun" }),
        emissive: 0xffb649,
        emissiveIntensity: 0.36,
        roughness: 0.95,
        metalness: 0.0
      })
    );
    scene.add(sun);

    const sunGlow = new THREE.Mesh(
      new THREE.SphereGeometry(9.5, 48, 48),
      new THREE.MeshBasicMaterial({
        color: 0xffb347,
        transparent: true,
        opacity: 0.12,
        depthWrite: false
      })
    );
    scene.add(sunGlow);

    const planetRuntimes = new Map<PlanetId, PlanetRuntime>();
    const clickableMeshes: THREE.Mesh[] = [];

    PLANETS.forEach(planetDefinition => {
      const orbitRadius = compressOrbitDistance(planetDefinition.orbitAU);

      const orbitCurve = new THREE.EllipseCurve(
        0,
        0,
        orbitRadius,
        orbitRadius,
        0,
        Math.PI * 2,
        false,
        0
      );
      const orbitPoints = orbitCurve.getPoints(220).map(point => new THREE.Vector3(point.x, 0, point.y));
      const orbitPathGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      const orbitPath = new THREE.LineLoop(
        orbitPathGeometry,
        new THREE.LineBasicMaterial({
          color: 0x4f7d57,
          transparent: true,
          opacity: 0.22
        })
      );
      orbitPath.rotation.x = THREE.MathUtils.degToRad(planetDefinition.inclinationDeg * 0.1);
      scene.add(orbitPath);

      const planetMesh = new THREE.Mesh(
        new THREE.SphereGeometry(planetDefinition.visualRadius, 48, 48),
        new THREE.MeshStandardMaterial({
          map: loadTexture(planetDefinition.textureUrl, {
            fallback: planetDefinition.id
          }),
          normalMap: planetDefinition.id === "earth"
            ? loadTexture(EARTH_NORMALMAP_URL, { color: false, fallback: "normal" })
            : undefined,
          normalScale: planetDefinition.id === "earth" ? new THREE.Vector2(0.55, 0.55) : undefined,
          roughness: 0.94,
          metalness: 0.0
        })
      );
      planetMesh.userData.planetId = planetDefinition.id;
      scene.add(planetMesh);

      const headingSprite = createHeadingSprite(planetDefinition.heading);
      headingSprite.position.set(0, planetDefinition.visualRadius + 5.7, 0);
      planetMesh.add(headingSprite);

      let ringMesh: THREE.Mesh | undefined;
      if (planetDefinition.ring) {
        const ring = planetDefinition.ring;
        ringMesh = new THREE.Mesh(
          new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 100),
          new THREE.MeshStandardMaterial({
            map: loadTexture(ring.textureUrl, {
              fallback: planetDefinition.id === "saturn" ? "saturnRing" : "uranusRing"
            }),
            transparent: true,
            alphaTest: 0.08,
            opacity: 0.95,
            side: THREE.DoubleSide,
            roughness: 1
          })
        );
        ringMesh.rotation.x = THREE.MathUtils.degToRad(90 + ring.tiltDeg);
        ringMesh.rotation.z = THREE.MathUtils.degToRad(22);
        planetMesh.add(ringMesh);
      }

      planetRuntimes.set(planetDefinition.id, {
        definition: planetDefinition,
        mesh: planetMesh,
        ring: ringMesh,
        orbitRadius
      });
      clickableMeshes.push(planetMesh);
    });

    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(1.1, 32, 32),
      new THREE.MeshStandardMaterial({
        map: loadTexture(MOON_TEXTURE_URL, { fallback: "moon" }),
        normalMap: loadTexture(MOON_NORMALMAP_URL, { color: false, fallback: "normal" }),
        normalScale: new THREE.Vector2(0.45, 0.45),
        roughness: 1,
        metalness: 0
      })
    );
    scene.add(moon);

    const earthRuntime = planetRuntimes.get("earth");

    const transitionRef: { current: CameraTransition | null } = { current: null };
    const activePlanetRef: { current: PlanetId | null } = { current: null };

    const startCameraTransition = (targetPosition: THREE.Vector3, targetLookAt: THREE.Vector3) => {
      transitionRef.current = {
        startMs: performance.now(),
        durationMs: CAMERA_TRANSITION_MS,
        fromPosition: camera.position.clone(),
        toPosition: targetPosition,
        fromTarget: controls.target.clone(),
        toTarget: targetLookAt
      };
    };

    const focusPlanet = (planetId: PlanetId | null) => {
      if (planetId === null) {
        activePlanetRef.current = null;
        setActivePlanetId(null);
        startCameraTransition(OVERVIEW_CAMERA_POSITION.clone(), OVERVIEW_TARGET.clone());
        return;
      }

      const runtime = planetRuntimes.get(planetId);
      if (!runtime) return;

      const planetPosition = runtime.mesh.position.clone();
      const cameraDirection = camera.position.clone().sub(controls.target);
      if (cameraDirection.lengthSq() < 0.0001) {
        cameraDirection.set(1, 0.35, 1);
      }
      cameraDirection.normalize();

      const focusDistance = Math.max(7.5, runtime.definition.visualRadius * 2.9);
      const focusPosition = planetPosition
        .clone()
        .add(cameraDirection.multiplyScalar(focusDistance));
      focusPosition.y += runtime.definition.visualRadius * 0.45;

      activePlanetRef.current = planetId;
      setActivePlanetId(planetId);
      startCameraTransition(focusPosition, planetPosition);
    };

    focusPlanetCommandRef.current = focusPlanet;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerDownX = 0;
    let pointerDownY = 0;

    const pickPlanet = (clientX: number, clientY: number) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = ((clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const intersections = raycaster.intersectObjects(clickableMeshes, false);
      if (intersections.length === 0) return null;
      const hit = intersections[0];
      return (hit.object.userData.planetId as PlanetId | undefined) || null;
    };

    const handlePointerDown = (event: PointerEvent) => {
      pointerDownX = event.clientX;
      pointerDownY = event.clientY;
    };

    const handlePointerUp = (event: PointerEvent) => {
      const movedDistance = Math.hypot(event.clientX - pointerDownX, event.clientY - pointerDownY);
      if (movedDistance > MIN_CLICK_DISTANCE_PX) return;

      const pickedPlanet = pickPlanet(event.clientX, event.clientY);
      if (pickedPlanet) {
        focusPlanet(pickedPlanet);
        return;
      }

      if (activePlanetRef.current) {
        focusPlanet(null);
      }
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    const simulatedTimeRef = { current: Date.now() };
    let previousFrameMs = performance.now();
    let animationFrame = 0;
    let lastDateLabelUpdateMs = 0;

    const animate = (frameTimeMs: number) => {
      const deltaMs = Math.max(0, frameTimeMs - previousFrameMs);
      previousFrameMs = frameTimeMs;
      simulatedTimeRef.current +=
        (deltaMs / 1000) *
        BASE_SIMULATED_DAYS_PER_SECOND *
        simulationSpeedRef.current *
        DAY_MS;
      const daysSinceEpoch = (simulatedTimeRef.current - ORBIT_EPOCH_MS) / DAY_MS;

      planetRuntimes.forEach(runtime => {
        const { definition, mesh, orbitRadius, ring } = runtime;
        const orbitAngle =
          THREE.MathUtils.degToRad(definition.initialLongitudeDeg) +
          ((daysSinceEpoch / definition.orbitalPeriodDays) * Math.PI * 2);
        const inclinationRad = THREE.MathUtils.degToRad(definition.inclinationDeg);

        mesh.position.x = Math.cos(orbitAngle) * orbitRadius;
        mesh.position.z = Math.sin(orbitAngle) * orbitRadius;
        mesh.position.y = Math.sin(orbitAngle) * Math.sin(inclinationRad) * 3.4;
        mesh.rotation.y += definition.rotationSpeed;

        if (ring) {
          ring.rotation.z += 0.0009;
        }
      });

      if (earthRuntime) {
        const moonOrbitAngle = ((daysSinceEpoch / 27.321661) % 1) * Math.PI * 2;
        moon.position.set(
          earthRuntime.mesh.position.x + (Math.cos(moonOrbitAngle) * 5.2),
          earthRuntime.mesh.position.y + 1.1,
          earthRuntime.mesh.position.z + (Math.sin(moonOrbitAngle) * 5.2)
        );
        moon.rotation.y += 0.014;
      }

      sun.rotation.y += 0.0014;
      sunGlow.rotation.y -= 0.0008;
      stars.rotation.y += 0.00004;

      const transition = transitionRef.current;
      if (transition) {
        const progress = Math.min((frameTimeMs - transition.startMs) / transition.durationMs, 1);
        const eased = easeOutCubic(progress);
        camera.position.lerpVectors(transition.fromPosition, transition.toPosition, eased);
        controls.target.lerpVectors(transition.fromTarget, transition.toTarget, eased);
        if (progress >= 1) {
          transitionRef.current = null;
        }
      } else if (activePlanetRef.current) {
        const runtime = planetRuntimes.get(activePlanetRef.current);
        if (runtime) {
          const cameraOffset = camera.position.clone().sub(controls.target);
          const desiredPosition = runtime.mesh.position.clone().add(cameraOffset);
          camera.position.lerp(desiredPosition, 0.12);
          controls.target.lerp(runtime.mesh.position, 0.12);
        }
      }

      controls.update();
      renderer.render(scene, camera);

      if (frameTimeMs - lastDateLabelUpdateMs > 240) {
        setSimulationDateLabel(formatSimulationDate(new Date(simulatedTimeRef.current)));
        lastDateLabelUpdateMs = frameTimeMs;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    setIsSceneReady(true);

    return () => {
      cancelAnimationFrame(animationFrame);
      setIsSceneReady(false);
      setActivePlanetId(null);
      focusPlanetCommandRef.current = () => undefined;

      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("resize", handleResize);

      controls.dispose();
      renderer.dispose();

      scene.traverse(object => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) {
          mesh.geometry.dispose();
        }

        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(material => {
            Object.values(material).forEach(value => {
              if (value instanceof THREE.Texture) value.dispose();
            });
            material.dispose();
          });
        } else if (mesh.material) {
          Object.values(mesh.material).forEach(value => {
            if (value instanceof THREE.Texture) value.dispose();
          });
          mesh.material.dispose();
        }
      });
    };
  }, [onCompatibilityError]);

  const selectPlanetFromUI = useCallback((planetId: PlanetId) => {
    if (activePlanetId === planetId) {
      focusPlanetCommandRef.current(null);
      return;
    }
    focusPlanetCommandRef.current(planetId);
  }, [activePlanetId]);

  const closePlanetPanel = useCallback(() => {
    focusPlanetCommandRef.current(null);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <canvas ref={canvasRef} className="fixed inset-0 z-0 h-full w-full" />

      <div className="pointer-events-none fixed inset-x-0 top-0 z-20">
        <div className="pointer-events-auto mx-auto w-full max-w-[1500px] px-3 pt-16 sm:px-6 sm:pt-20">
          <header className="rounded-2xl border border-[rgb(51,178,51)]/28 bg-black/58 p-3 backdrop-blur-md sm:p-4">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[rgb(134,230,134)]">
                  Legacy Solar View
                </p>
                <h1 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
                  Portfolio Planetary Map
                </h1>
                <p className="mt-1 text-xs leading-5 text-white/72 sm:text-sm">
                  Date-accurate orbital placement with click-to-zoom planet sections.
                </p>
              </div>

              <div className="flex flex-col gap-2 xl:items-end">
                <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-white/60">
                    Simulation Date
                  </span>
                  <span className="text-sm font-semibold text-white/90">{simulationDateLabel}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-white/58">Speed</span>
                  <div className="relative h-1.5 w-20 rounded-full bg-white/18">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-[rgb(108,206,108)]"
                      style={{ width: `${Math.max(8, speedProgress)}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-white/82">
                    {simulationSpeed === 0.5 ? ".5x" : `${simulationSpeed}x`}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {SPEED_OPTIONS.map(speed => {
                    const isActiveSpeed = simulationSpeed === speed;
                    const speedLabel = speed === 0.5 ? ".5x" : `${speed}x`;
                    return (
                      <button
                        key={speed}
                        type="button"
                        onClick={() => setSimulationSpeed(speed)}
                        className={`rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors ${
                          isActiveSpeed
                            ? "border-[rgb(134,230,134)]/70 bg-[rgb(51,178,51)]/16 text-white"
                            : "border-white/20 bg-white/5 text-white/78 hover:border-[rgb(134,230,134)]/45 hover:bg-[rgb(51,178,51)]/10 hover:text-white"
                        }`}
                      >
                        {speedLabel}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-3 overflow-x-auto">
              <div className="flex min-w-max gap-2 pb-1">
                {PLANET_ORDER.map(planetId => {
                  const planetDefinition = PLANETS.find(planet => planet.id === planetId);
                  const content = planetContent[planetId];
                  if (!planetDefinition || !content) return null;

                  const isActive = activePlanetId === planetId;
                  return (
                    <button
                      key={planetId}
                      type="button"
                      onClick={() => selectPlanetFromUI(planetId)}
                      className={`rounded-lg border px-3 py-2 text-left transition-colors ${
                        isActive
                          ? "border-[rgb(134,230,134)]/70 bg-[rgb(51,178,51)]/16 text-white"
                          : "border-white/15 bg-white/5 text-white/82 hover:border-[rgb(134,230,134)]/45 hover:bg-[rgb(51,178,51)]/8"
                      }`}
                    >
                      <p className="text-[10px] uppercase tracking-[0.12em] text-white/55">
                        {planetDefinition.label}
                      </p>
                      <p className="mt-0.5 text-xs font-semibold leading-4 sm:text-sm sm:leading-5">{content.heading}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </header>
        </div>
      </div>

      {!isSceneReady && (
        <div className="pointer-events-auto fixed inset-0 z-30 flex items-center justify-center bg-black/75">
          <p className="text-sm uppercase tracking-[0.2em] text-white/70">Loading solar system...</p>
        </div>
      )}

      {!activeContent && (
        <div className="pointer-events-none fixed left-1/2 top-[14.5rem] z-[30] -translate-x-1/2 sm:top-[10.4rem] lg:top-[9.4rem]">
          <motion.img
            src={SPACESHIP_IDLE_URL}
            alt="Idle spaceship"
            className="h-14 w-14 opacity-90 sm:h-16 sm:w-16"
            animate={{
              x: [0, 13, -10, 0],
              y: [0, -9, 5, 0],
              rotate: [0, 2.6, -1.7, 0]
            }}
            transition={{
              duration: 5.6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror"
            }}
          />
        </div>
      )}

      {activeContent && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 top-[17rem] z-30 flex items-end justify-center px-0 sm:top-auto sm:bottom-4 sm:px-4">
          <motion.div
            key={activePlanetId || "planet-panel"}
            initial={{ opacity: 0, y: 110, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full max-w-6xl sm:h-auto"
          >
            <motion.div
              className="pointer-events-none absolute left-1/2 -top-11 z-[36] -translate-x-1/2 sm:-top-24"
              initial={{ opacity: 0, y: 14, scale: 0.92 }}
              animate={{ opacity: 1, x: beamTargetX, y: 0, scale: 1 }}
              transition={{
                x: { type: "spring", stiffness: 130, damping: 20 },
                y: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 }
              }}
            >
              <motion.img
                src={SPACESHIP_BEAM_URL}
                alt="Spaceship beam"
                className="h-20 w-20 drop-shadow-[0_0_20px_rgba(134,230,134,0.4)] sm:h-24 sm:w-24"
                animate={{
                  x: [0, 9, -7, 0],
                  y: [0, -8, 5, 0],
                  rotate: [0, 2.2, -1.6, 0]
                }}
                transition={{
                  duration: 3.8,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              />
            </motion.div>

            <aside className="pointer-events-auto h-full w-full max-h-full overflow-hidden rounded-t-2xl border border-[rgb(51,178,51)]/30 bg-black/72 shadow-[0_16px_64px_rgba(0,0,0,0.56)] backdrop-blur-md sm:h-auto sm:max-h-[56vh] sm:rounded-2xl">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[rgb(134,230,134)]">
                    {activePlanetId ? PLANETS.find(planet => planet.id === activePlanetId)?.label : ""}
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">{activeContent.heading}</h2>
                  <p className="mt-1 text-sm text-white/72">{activeContent.summary}</p>
                </div>
                <button
                  type="button"
                  onClick={closePlanetPanel}
                  className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white/80 transition-colors hover:border-[rgb(134,230,134)]/45 hover:bg-[rgb(51,178,51)]/12 hover:text-white"
                >
                  Close
                </button>
              </div>

              <div className="max-h-[calc(100%-108px)] overflow-y-auto px-4 py-3 sm:max-h-[calc(56vh-108px)] sm:px-5">
                <div className="mx-auto w-full max-w-5xl space-y-5">
                  {isSkillsPlanetActive && (
                    <section className="rounded-xl border border-[rgb(51,178,51)]/30 bg-[rgb(51,178,51)]/[0.08] px-3 py-3 sm:px-4">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-white/58">Skill Highlight</p>
                      {highlightedSkillName ? (
                        <>
                          <p className="mt-1 text-base font-semibold text-white">{highlightedSkillName}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/55">Related Projects</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {highlightedSkillProjects.length > 0 ? (
                              highlightedSkillProjects.slice(0, 8).map(project => {
                                const projectHref = project.demoLink?.trim()
                                  || project.link?.trim()
                                  || project.demoVideoLink?.trim()
                                  || "";
                                if (!projectHref) {
                                  return (
                                    <span
                                      key={project.title}
                                      className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/78"
                                    >
                                      {project.title}
                                    </span>
                                  );
                                }
                                return (
                                  <a
                                    key={project.title}
                                    href={projectHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full border border-[rgb(134,230,134)]/34 bg-[rgb(51,178,51)]/12 px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-[rgb(51,178,51)]/20"
                                  >
                                    {project.title}
                                  </a>
                                );
                              })
                            ) : (
                              <p className="rounded-lg border border-white/12 bg-white/5 px-2.5 py-1.5 text-xs text-white/58">
                                No linked projects yet.
                              </p>
                            )}
                          </div>
                        </>
                      ) : (
                        <p className="mt-1 text-sm text-white/68">Hover or tap a skill card to preview related projects.</p>
                      )}
                    </section>
                  )}

                  {activeContent.sections.map(section => (
                    <section key={section.title} className="space-y-2">
                      <h3 className="text-sm uppercase tracking-[0.16em] text-white/58">{section.title}</h3>
                      <div className={isSkillsPlanetActive ? "grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3" : "space-y-2"}>
                        {section.items.map(item => (
                          <article
                            key={`${section.title}-${item.title}`}
                            className={`rounded-xl border bg-white/[0.03] px-3 py-2.5 transition-colors ${
                              isSkillsPlanetActive
                                ? `h-full cursor-pointer ${highlightedSkillName === item.title ? "border-[rgb(134,230,134)]/65 bg-[rgb(51,178,51)]/[0.13]" : "border-white/10 hover:border-[rgb(134,230,134)]/35 hover:bg-[rgb(51,178,51)]/[0.08]"}`
                                : "border-white/10"
                            }`}
                            tabIndex={isSkillsPlanetActive ? 0 : undefined}
                            onMouseEnter={() => {
                              if (isSkillsPlanetActive) {
                                setHighlightedSkillName(item.title);
                              }
                            }}
                            onFocus={() => {
                              if (isSkillsPlanetActive) {
                                setHighlightedSkillName(item.title);
                              }
                            }}
                            onClick={() => {
                              if (!isSkillsPlanetActive) return;
                              setHighlightedSkillName(prev => prev === item.title ? null : item.title);
                            }}
                            onKeyDown={(event) => {
                              if (!isSkillsPlanetActive) return;
                              if (event.key !== "Enter" && event.key !== " ") return;
                              event.preventDefault();
                              setHighlightedSkillName(prev => prev === item.title ? null : item.title);
                            }}
                          >
                            <div className="flex items-start gap-2">
                              {item.iconSrc && (
                                <img
                                  src={item.iconSrc}
                                  alt={item.title}
                                  className="mt-0.5 h-4 w-4 shrink-0 object-contain brightness-0 invert opacity-95"
                                  loading="lazy"
                                  decoding="async"
                                  draggable={false}
                                />
                              )}
                              <p className="text-sm font-semibold text-white/94">{item.title}</p>
                            </div>
                            {item.detail && (
                              <p className="mt-1 text-sm leading-6 text-white/74">{item.detail}</p>
                            )}

                            {item.links && item.links.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {item.links.map(link => (
                                  <a
                                    key={`${item.title}-${link.href}`}
                                    href={link.href}
                                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                                    rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                                    className="rounded-full border border-[rgb(134,230,134)]/34 bg-[rgb(51,178,51)]/12 px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-[rgb(51,178,51)]/20"
                                  >
                                    {link.label}
                                  </a>
                                ))}
                              </div>
                            )}
                          </article>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </aside>
          </motion.div>
        </div>
      )}
    </main>
  );
}
