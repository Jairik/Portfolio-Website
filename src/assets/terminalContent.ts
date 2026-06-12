/*
  Copy + content for the terminal-styled main page (src/components/TerminalHome.tsx)

  Quick edit guide:
  - Every piece of text rendered by the main page lives here: hero copy, the
    looping role typewriter, marquee phrases, section headers, footer text, etc.
  - Project/experience/skill data still comes from projects.ts, experience.ts,
    and constantVars.ts — this file only holds the design-specific wording.
  - Visual defaults (accent color, cursor trail mode, scanlines) are at the
    bottom under PAGE_DEFAULTS / ACCENTS.
*/

/* ---------- top ribbon (escape hatch to the /terminal build) ---------- */
export const ribbon = {
    // Bold segment is wrapped separately so the design's <b> styling applies
    messageStart: "scroll-allergic? this site ships a ",
    messageBold: "terminal-only",
    messageEnd: " build.",
    buttonLabel: "use the terminal",
    buttonTarget: "/terminal"  // react-router path the ribbon button navigates to
};

/* ---------- fixed top bar ---------- */
export const topbar = {
    host: "jj@portfolio:~$",  // green prompt at the left of the bar
    whoBold: 'jairik "jj" mccauley',
    whoRest: " — software engineer"
};

// In-page anchor links rendered in the top bar nav (config + contact are appended after)
export const navItems = [
    { label: "featured", target: "#featured" },
    { label: "archive", target: "#archive" },
    { label: "arsenal", target: "#arsenal" },
    { label: "xp", target: "#xp" },
    { label: "media", target: "#media" },
    { label: "about", target: "#about" }
];

/* ---------- hero ---------- */
export const hero = {
    typedCommand: "whoami",  // typed out character-by-character after load
    nameRows: ["JAIRIK 'JJ'", "McCAULEY"],  // first row hollow-stroked, second acid green
    // Output line under the typewriter: "// <blurb> <bold> — <location> <status>"
    outBlurb: "// ships fast, breaks the right things. ",
    outBold: "CS (AI/SWE) + Data Science",
    outLocation: " — Salisbury, MD. ",
    outStatus: "● open to work",
    scrollCue: "▼ SCROLL ▼"
};

// Phrases cycled by the looping role typewriter in the hero
export const heroRoles = [
    "full-stack software engineer",
    "lifelong learner",
    "absolute nerd",
    "computer science & data science",
    "hackathon menace",
    "vim enjoyer"
];

// Shown for the commits stat until the live GitHub commit count resolves (or if it fails)
export const COMMIT_COUNT_FALLBACK = 4200;

/* Builds the hero stat chips from live data counts (projects/commits/roles) */
export const buildHeroStats = (counts: { projects: number; commits: number; roles: number }) => [
    { value: `${counts.projects}+`, label: "projects" },
    { value: `${counts.commits}+`, label: "commits" },
    { value: "1st", label: "HealthHack '25" },
    { value: "2nd", label: "HackUMBC '24" },
    { value: `${counts.roles}`, label: "roles shipped" }
];

/* ---------- marquees ---------- */
// Loud (acid background) marquee between the hero and featured work
export const marqueeLoud = [
    "git push --force-with-confidence",
    "1st place — rutgers healthhack",
    "2nd overall — hackumbc",
    "full-stack",
    "ai / ml",
    "ships fast",
    "vim btw"
];

// Quiet marquee between featured work and the archive
export const marqueeQuiet = [
    "the rest of the damage",
    "hacks",
    "dashboards",
    "games",
    "crypto-chat",
    "computer vision",
    "distributed systems"
];

/* ---------- section headers (comment line + big display title) ---------- */
export const sections = {
    featured: { cmt: "ls -la ~/projects --sort=loudness | head -3", title: "HEAD" },
    archive: { cmt: "tree ~/projects — click a row to expand it", title: "~/history" },
    arsenal: { cmt: "which --all $TOOLS", title: "The Arsenal" },
    xp: { cmt: "journalctl --unit=career --no-pager", title: "Deployments" },
    media: { cmt: 'find ~/assets -name "*.png" | feh — every image in the repo', title: "/dev/media" },
    about: { cmt: "cat ~/about.md", title: "Readme" }
};

// Hint line under the arsenal header
export const arsenalHint = "▸ click a package — grep returns every project and job that linked against it.";

// Popover body when a skill matches no projects or roles
export const arsenalNoMatches = "0 matches in public repos — coursework, consulting, or daily-driver territory.";

/* ---------- archive flavor text ---------- */
// Fallback line when an archive project has no screenshots on record
export const archiveNoImagery = {
    prefix: "no imagery on record — ",
    closedSource: "source and assets are closed.",
    openSource: "this one lives in the code."
};

/* ---------- media gallery ---------- */
export const media = {
    // Template for the count line; {n} is replaced with the total image count
    countLine: 'find ~/assets -name "*.png" → {n} files found',
    mePicturesTitle: "JJ — field records"  // mosaic caption title for personal photos
};

/* ---------- about ---------- */
// Phrases inside aboutParagraphs that get the accent <em> highlight treatment
export const aboutHighlights = ["nerd for this stuff", "Slay the Spire", "Corgi guy"];

/* ---------- footer ---------- */
export const footer = {
    yell: "GOT SOMETHING COOL? LET'S BUILD IT.",
    email: "mjairik@gmail.com",  // rendered as the giant hollow-stroke mailto link
    fine: '© 2026 jairik "jj" mccauley — terminal edition · exit code 0'
};

/* ---------- ./config modal (visitor preferences) ---------- */
export const configModal = {
    barTitle: "nano ~/.jjrc — visitor preferences",
    comment: "your prefs — saved to this browser only",
    colorKey: "favorite_color",
    trailKey: "cursor_trail",
    saveLabel: ":wq",
    saveHint: "save & quit"
};

// Accent palettes selectable in ./config; "deep" is the darker companion shade
export const ACCENTS: Record<string, { c: string; deep: string }> = {
    acid: { c: "#a6f73a", deep: "#5fae12" },
    amber: { c: "#f7c13a", deep: "#b8860d" },
    cyan: { c: "#3af7d8", deep: "#0fae93" },
    violet: { c: "#b07bff", deep: "#7a3ee8" }
};

// localStorage key holding the visitor's saved { color, trail } preferences
export const PREFS_STORAGE_KEY = "jjrc";

/* ---------- page-wide visual defaults ---------- */
// Driven through data-attributes on the page root; ./config can override the
// accent + trail at runtime. trail: "off" | "blocks" | "glyphs" | "comet"
export const PAGE_DEFAULTS = {
    topcur: "off",   // prompt cursor after the topbar host ("blink" | "solid" | "off")
    scan: "on",      // CRT scanline overlay
    trail: "glyphs", // cursor trail mode (what cursor_trail=on maps back to)
    burst: "on"      // click burst rings/sparks
} as const;
