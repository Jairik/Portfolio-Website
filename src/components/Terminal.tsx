/* Terminal Pure — the interactive terminal emulator served at /terminal.
   Port of the "Terminal Pure" design prototype (shell + TUI + vim + themes),
   wired to the site's real data. The emulator itself is intentionally
   imperative (DOM scrollback, modal keyboard state machines), so React renders
   the static frame and one effect drives everything inside it. */
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Terminal.css";
import { getProjectItems } from "../assets/projects";
import {
  experienceItems,
  technologyItems,
  technologiesMatch,
  getLinkedExperiencesForTechnology,
  type TechnologyCategory
} from "../assets/experience";
import { socialItems, aboutParagraphs, mePictures } from "../assets/constantVars";
import { fetchCommitCount } from "../lib/commitCount";

const GITHUB_URL = "https://github.com/Jairik";
const RESUME_PATH = "/Jairik_McCauley_Resume.pdf";
const EMAIL = "mjairik@gmail.com";

const SKILL_CATEGORIES: TechnologyCategory[] = [
  "Frontend & UI",
  "Backend & Infrastructure",
  "Data, AI & Productivity"
];

const esc = (s: unknown) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const base = (p: string) => p.split("/").pop() || p;

/* ---------- site data, reshaped for the emulator ---------- */
interface TermProject {
  title: string; date: string; desc: string; tech: string[]; images: string[];
  code: string; demo: string; video: string; award: string; closed: boolean;
  group: "featured" | "current" | "past";
}
const GROUP_ORDER = { featured: 0, current: 1, past: 2 } as const;
const PROJECTS: TermProject[] = getProjectItems()
  .map(p => ({
    title: p.title,
    date: p.date || "",
    desc: p.description,
    tech: p.techStack,
    images: p.imageSrc || [],
    code: p.link,
    demo: p.demoLink || "",
    video: p.demoVideoLink || "",
    award: p.award || "",
    closed: !p.link,
    group: (p.featured ? "featured" : p.current ? "current" : "past") as TermProject["group"]
  }))
  .sort((a, b) => GROUP_ORDER[a.group] - GROUP_ORDER[b.group]);

interface TermSkill { name: string; note?: string }
const SKILLS: Record<string, TermSkill[]> = Object.fromEntries(
  SKILL_CATEGORIES.map(cat => [
    cat,
    technologyItems.filter(t => t.category === cat).map(t => ({ name: t.name, note: t.note }))
  ])
);
const SKILL_GROUPS = Object.keys(SKILLS);

interface TermXp { role: string; company: string; duration: string; desc: string; tech: string[] }
const XP: TermXp[] = experienceItems.map(x => ({
  role: x.role, company: x.company, duration: x.duration, desc: x.description, tech: x.technologies
}));

interface MediaItem { src: string; title: string; cap: string }
const MEDIA: MediaItem[] = [
  ...PROJECTS.flatMap(p => p.images.map((im, j) => ({
    src: im, title: p.title, cap: `screenshot ${j + 1}/${p.images.length} · ${p.date}`
  }))),
  ...mePictures.map(pic => ({ src: pic.path, title: "JJ — field records", cap: pic.label }))
];

const CONTACT_LINES: [string, string][] = [
  ["email", `mailto:${EMAIL}`],
  ["linkedin", socialItems.find(s => s.label === "LinkedIn")?.link || "#"],
  ["github", GITHUB_URL],
  ["resume", RESUME_PATH]
];

/* ---------- virtual filesystem ---------- */
const EXECUTABLES = new Set(["links"]);
const LINKS_SCRIPT = [
  "#!/usr/bin/env sh",
  "# links — everything jj, one page",
  'exec xdg-open "https://jjmccauley.com/links"'
];
const FS: Record<string, string[]> = {
  "~": ["projects/", "skills/", "media/", "about.md", "contact.txt", "experience.log", "links", "resume.pdf"],
  "~/projects": PROJECTS.map(p => slug(p.title) + ".md"),
  "~/skills": SKILL_GROUPS.map(g => slug(g) + ".txt"),
  "~/media": MEDIA.map(m => base(m.src))
};

/* ---------- theme engine ---------- */
const THEMES: Record<string, { acid: string; deep: string; dim: string }> = {
  green: { acid: "#a6f73a", deep: "#5fae12", dim: "rgba(166,247,58,.12)" },
  amber: { acid: "#f7c13a", deep: "#ae8312", dim: "rgba(247,193,58,.12)" },
  cyan: { acid: "#3af7e0", deep: "#12ae9b", dim: "rgba(58,247,224,.12)" },
  red: { acid: "#f75e3a", deep: "#ae3a12", dim: "rgba(247,94,58,.12)" }
};
const THEME_KEY = "jj-term-theme";

const COMMANDS = [
  "help", "ls", "cd", "pwd", "cat", "less", "head", "tail", "open", "resume", "cv", "whoami", "neofetch", "tui",
  "clear", "history", "echo", "contact", "sudo", "exit", "vim", "nvim", "grep", "tree", "top",
  "touch", "mkdir", "fortune", "cowsay", "corgisay", "matrix", "sl", "hack", "caffeine", "theme",
  "roll", "coinflip", "ping", "links", "./links"
];

const FORTUNES = [
  "you will ship on a friday. it will be fine.",
  "a corgi will enter your life within 30 days.",
  "the bug you seek hides on the line you refuse to suspect.",
  "become the person your git log thinks you are.",
  "next hackathon placement: 1st. trust the process.",
  "the demo gods smile on those who hard-code the happy path.",
  "someday you will close all your tabs. not today.",
  "your code works and you don't know why. do not touch it.",
  "a recruiter is reading this terminal right now. wave."
];

interface VFile { name: string; lines?: string[]; binary?: boolean; fresh?: boolean }
interface TuiItem { label: string; html: () => string; enter?: () => void }
interface TuiSection { label: string; items: TuiItem[] }
type VedMode = "n" | "i" | "c";
type CommandHandler = (arg: string) => void;

const TUI_KEYS = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Tab", "Enter", "Escape", "q", "1", "2", "3", "4", "5"]);

export default function Terminal() {
  const navigate = useNavigate();
  const stageRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const tbufRef = useRef<HTMLSpanElement>(null);
  const tuiRef = useRef<HTMLDivElement>(null);
  const vedRef = useRef<HTMLDivElement>(null);
  const tinRef = useRef<HTMLInputElement>(null);
  const lbRef = useRef<HTMLDivElement>(null);
  const lbImgRef = useRef<HTMLImageElement>(null);
  const lbCapRef = useRef<HTMLDivElement>(null);

  // Page title + dark page background (restored on unmount).
  useEffect(() => {
    const prevTitle = document.title;
    const prevBodyBg = document.body.style.background;
    document.title = "Interactive Terminal Portfolio | JJ McCauley";
    document.body.style.background = "#070906";
    return () => {
      document.title = prevTitle;
      document.body.style.background = prevBodyBg;
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current, term = termRef.current, view = viewRef.current,
      promptEl = promptRef.current, tbuf = tbufRef.current, tuiEl = tuiRef.current,
      ved = vedRef.current, tin = tinRef.current, lb = lbRef.current,
      lbimg = lbImgRef.current, lbcap = lbCapRef.current;
    if (!stage || !term || !view || !promptEl || !tbuf || !tuiEl || !ved || !tin || !lb || !lbimg || !lbcap) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeouts = new Set<number>();
    const intervals = new Set<number>();
    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => { timeouts.delete(id); fn(); }, ms);
      timeouts.add(id);
    };
    const offs: (() => void)[] = [];
    const on = <K extends keyof GlobalEventHandlersEventMap>(
      el: Document | HTMLElement,
      type: K,
      fn: (e: GlobalEventHandlersEventMap[K]) => void
    ) => {
      el.addEventListener(type, fn as EventListener);
      offs.push(() => el.removeEventListener(type, fn as EventListener));
    };

    let commitCount: number | null = null;
    const commitCountText = () => commitCount === null ? "syncing" : `${commitCount}+`;
    const commitCountHtml = (tag: "span" | "b" = "span") =>
      `<${tag} data-commit-count>${esc(commitCountText())}</${tag}>`;
    const syncCommitCountDom = () => {
      term.querySelectorAll("[data-commit-count]").forEach(el => {
        el.textContent = commitCountText();
      });
    };
    const commitCountController = new AbortController();
    void fetchCommitCount(commitCountController.signal)
      .then(count => {
        commitCount = count;
        syncCommitCountDom();
      })
      .catch(error => {
        if ((error as Error).name !== "AbortError") {
          console.error("Unable to load total commits.", error);
        }
      });

    /* ---------- theme ---------- */
    function applyTheme(name: string) {
      const t = THEMES[name];
      if (!t) return false;
      stage!.style.setProperty("--acid", t.acid);
      stage!.style.setProperty("--acid-deep", t.deep);
      stage!.style.setProperty("--acid-dim", t.dim);
      try { localStorage.setItem(THEME_KEY, name); } catch { /* private mode */ }
      return true;
    }
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved && THEMES[saved]) applyTheme(saved);
    } catch { /* private mode */ }

    /* ---------- lightbox ---------- */
    function showLb(src: string, cap: string) {
      lbimg!.src = src;
      lbcap!.textContent = cap;
      lb!.classList.add("on");
    }
    on(stage, "click", e => {
      const t = (e.target as HTMLElement).closest("[data-lb]") as HTMLElement | null;
      if (t && !t.closest(".lb")) {
        showLb(t.dataset.lb || "", t.dataset.cap || "");
        return;
      }
      if ((e.target as HTMLElement).closest(".lb")) lb.classList.remove("on");
    });

    /* ---------- scrollback ---------- */
    let cwd = "~";
    let buffer = "";
    const hist: string[] = [];
    let histI = 0;
    function print(html: string, cls?: string) {
      const d = document.createElement("div");
      d.className = "ln" + (cls ? " " + cls : "");
      d.innerHTML = html;
      view!.insertBefore(d, promptEl);
      view!.scrollTop = view!.scrollHeight;
      return d;
    }
    function echoCmd(cmd: string) {
      print(`<span class="pr">jj@portfolio:${esc(cwd)}$</span> ${esc(cmd)}`);
    }
    function renderBuf() {
      tbuf!.textContent = buffer;
      promptEl!.querySelector(".pr")!.textContent = `jj@portfolio:${cwd}$`;
      view!.scrollTop = view!.scrollHeight;
    }

    /* ---------- file helpers ---------- */
    function lsOut(dir: string) {
      const list = FS[dir];
      if (!list) { print(`ls: cannot access '${esc(dir)}': no such directory`, "err"); return; }
      print(`<div class="lscols">${list.map(f =>
        f.endsWith("/") ? `<span class="dir">${esc(f)}</span>`
        : EXECUTABLES.has(f) ? `<span class="ok">${esc(f)}*</span>`
        : `<span>${esc(f)}</span>`).join("")}</div>`);
    }
    function resolveDir(arg: string) {
      if (!arg || arg === "~" || arg === "/") return "~";
      if (arg === ".." || arg === "../") return "~";
      if (arg === ".") return cwd;
      const clean = arg.replace(/^~\//, "").replace(/\/$/, "");
      if (FS["~/" + clean]) return "~/" + clean;
      if (cwd !== "~" && clean === "") return cwd;
      return null;
    }
    function findProject(name: string) {
      const n = name.replace(/\.md$/, "");
      return PROJECTS.find(p => slug(p.title) === n) ||
        PROJECTS.find(p => p.title.toLowerCase().includes(n.toLowerCase()));
    }
    function cleanPath(arg: string) {
      return arg.replace(/^~\//, "").replace(/^\.\//, "");
    }
    function inCurrentDir(dir: string) {
      return cwd === dir;
    }
    function projCat(p: TermProject) {
      const badges = [
        p.award ? `★ ${p.award}` : "", p.group === "current" ? "RUNNING" : "", p.closed ? "CLOSED SRC" : ""
      ].filter(Boolean).join(" · ");
      print(
        `<span class="ok"># ${esc(p.title)}</span>  <span class="dim">${esc(p.date)}${badges ? " · " + esc(badges) : ""}</span><br />` +
        `${esc(p.desc)}<br />` +
        `<span class="dim">tech:</span> ${p.tech.map(esc).join(", ")}<br />` +
        [p.code ? `<a href="${esc(p.code)}" target="_blank" rel="noopener">code ↗</a>` : "",
         p.demo ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener">live ↗</a>` : "",
         p.video ? `<a href="${esc(p.video)}" target="_blank" rel="noopener">video ↗</a>` : ""].filter(Boolean).join(" · ") +
          (p.images.length ? `<br /><span class="dim">${p.images.length} image(s) on file — run <kbd>tui</kbd> to view them</span>` : "")
      );
    }
    function catAboutFile() {
      aboutParagraphs.forEach(p => print(esc(p)));
    }
    function catContactFile() {
      print(CONTACT_LINES.map(([label, link]) =>
        `${label}: <a href="${esc(link)}"${link.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${esc(link.replace(/^mailto:/, ""))}</a>`).join("<br />"));
    }
    function catExperienceFile() {
      XP.forEach(x => print(
        `<span class="ok">[${esc(x.duration)}]</span> ${esc(x.role)} <span class="dim">@ ${esc(x.company)}</span><br /><span class="dim">${esc(x.desc)}</span>`));
    }
    function catResumeFile() {
      print(`binary file — try <kbd>resume</kbd> or <kbd>open resume</kbd>`, "warn");
    }
    function catLinksFile() {
      print(`<pre>${esc(LINKS_SCRIPT.join("\n"))}</pre>`);
      print(`<span class="dim">executable — run it: <kbd>./links</kbd></span>`);
    }
    const CAT_EXACT: Record<string, () => void> = {
      "about.md": catAboutFile,
      "contact.txt": catContactFile,
      "experience.log": catExperienceFile,
      "resume.pdf": catResumeFile,
      resume: catResumeFile,
      links: catLinksFile
    };
    function catProjectFile(path: string, originalArg: string) {
      const match = path.match(/^(?:projects\/)?(.+?\.md)$/);
      if (!match || (!path.startsWith("projects/") && !inCurrentDir("~/projects"))) return false;
      const project = findProject(match[1]);
      if (project) projCat(project);
      else print(`cat: ${esc(originalArg)}: no such file`, "err");
      return true;
    }
    function catSkillFile(path: string, originalArg: string) {
      const match = path.match(/^(?:skills\/)?(.+?\.txt)$/);
      if (!match || (!path.startsWith("skills/") && !inCurrentDir("~/skills"))) return false;
      const group = SKILL_GROUPS.find(g => slug(g) + ".txt" === match[1]);
      if (!group) {
        print(`cat: ${esc(originalArg)}: no such file`, "err");
        return true;
      }
      print(`<span class="ok"># ${esc(group)}</span><br />` +
        SKILLS[group].map(s => `· ${esc(s.name)}${s.note ? ` <span class="dim">(${esc(s.note)})</span>` : ""}`).join("<br />"));
      return true;
    }
    function catMediaFile(path: string) {
      if (!path.startsWith("media/") && !inCurrentDir("~/media")) return false;
      const name = path.replace(/^media\//, "");
      const media = MEDIA.find(m => base(m.src) === name);
      if (!media) return false;
      print(`<span class="dim">binary image — opening viewer…</span>`);
      showLb(media.src, `${media.title} — ${media.cap}`);
      return true;
    }
    function catFile(arg: string) {
      if (!arg) { print("cat: missing operand", "err"); return; }
      const a = cleanPath(arg);
      const exactReader = CAT_EXACT[a];
      if (exactReader) { exactReader(); return; }
      if (catProjectFile(a, arg) || catSkillFile(a, arg) || catMediaFile(a)) return;
      const p = findProject(a);
      if (p) { projCat(p); return; }
      print(`cat: ${esc(arg)}: no such file`, "err");
    }
    function openCmd(arg: string) {
      if (!arg) { print("open: missing operand", "err"); return; }
      const a = arg.toLowerCase();
      if (a.includes("resume")) { window.open(RESUME_PATH, "_blank"); print("opening resume.pdf …", "ok"); return; }
      if (a.includes("github") || a.includes("git")) { window.open(GITHUB_URL, "_blank"); print("opening github …", "ok"); return; }
      const soc = socialItems.find(s => s.label.toLowerCase().includes(a) || a.includes(s.label.toLowerCase()));
      if (soc) { window.open(soc.link, "_blank"); print(`opening ${esc(soc.label.toLowerCase())} …`, "ok"); return; }
      if (a.includes("mail") || a.includes("contact")) { location.href = `mailto:${EMAIL}`; return; }
      const p = findProject(arg);
      if (p) {
        const url = p.code || p.demo || p.video;
        if (url) { window.open(url, "_blank"); print(`opening ${esc(p.title)} …`, "ok"); return; }
        print(`open: ${esc(p.title)} has no public link (closed source)`, "warn");
        return;
      }
      print(`open: don't know how to open '${esc(arg)}'`, "err");
    }
    function neofetch() {
      const pkgs = SKILL_GROUPS.reduce((n, g) => n + SKILLS[g].length, 0);
      const logo = [
        " ██████   ██████ ",
        "     ██       ██ ",
        "     ██       ██ ",
        "     ██       ██ ",
        "     ██       ██ ",
        " ██  ██   ██  ██ ",
        " ██  ██   ██  ██ ",
        "  ████     ████  "
      ].join("\n");
      const info = [
        `<span class="ok">Jairik 'JJ' McCauley</span>`,
        `<span class="dim">────────────────────</span>`,
        `<span class="ok">OS</span>: human v23 (salisbury, md)`,
        `<span class="ok">Shell</span>: full-stack / AI / data`,
        `<span class="ok">Uptime</span>: ${PROJECTS.length}+ projects, ${commitCountHtml()} commits`,
        `<span class="ok">Packages</span>: ${pkgs} (arsenal)`,
        `<span class="ok">Awards</span>: 1st HealthHack '25 · 2nd HackUMBC '24`,
        `<span class="ok">Status</span>: <span class="ok">OPEN TO WORK</span>`
      ].map(r => `<div class="nf-row">${r}</div>`).join("");
      print(`<div class="nf"><pre class="nf-logo">${logo}</pre><div class="nf-info">${info}</div></div>`);
    }
    function help() {
      const rows: [string, string][] = [
        ["help", "this list"],
        ["ls [dir]", "look around — try <kbd>ls projects</kbd>"],
        ["cd <dir>", "move — projects/ skills/ media/"],
        ["cat <file>", "read — <kbd>cat about.md</kbd>, <kbd>cat projects/lunara.md</kbd>"],
        ["less / head / tail <file>", "pagers — <kbd>head experience.log</kbd>, <kbd>tail 3 about.md</kbd>"],
        ["open <thing>", "open resume / github / a project"],
        ["resume", "open my résumé (pdf) — same as <kbd>open resume</kbd>"],
        ["./links", "all my links, one page"],
        ["tui", "<span class='ok'>arrow-key browser — the good stuff</span>"],
        ["whoami / neofetch", "identity checks"],
        ["clear / history", "housekeeping"],
        ["fortune / cowsay / corgisay", "wisdom delivery systems"],
        ["matrix / sl / hack / caffeine", "important productivity tools"],
        ["roll / coinflip / ping", "decision + diagnostics"],
        ["theme <green|amber|cyan|red>", "recolor the whole rig"],
        ["vim <file>", "<span class='ok'>the editor</span> — <kbd>vim about.md</kbd> · :q to escape (good luck)"],
        ["grep <term>", "search the entire portfolio — <kbd>grep python</kbd>"],
        ["tree / top / touch", "filesystem + process tools"],
        ["exit", "log out — back to the regular site"]
      ];
      print(rows.map(([c, d]) => `<kbd>${esc(c)}</kbd> <span class="dim">— ${d}</span>`).join("<br />"));
      print(`<span class="dim">psst: <kbd>sudo hire-me</kbd> is a valid command.</span>`);
    }
    function exitTerminal() {
      print(`logout — returning to the GUI…`, "ok");
      later(() => navigate("/"), 650);
    }
    function whoami() {
      print(`<h1 class="tname"><span class="hollow">Jairik 'JJ'</span><br /><span class="zap">McCauley</span></h1>` +
        `<span class="dim"><b style="color:var(--ink)">full-stack software engineer</b> — AI, data, shipping fast. CS (AI/SWE) + Data Science @ Salisbury. Thrower. Corgi guy.</span> <span class="ok">[STATUS: OPEN TO WORK]</span>` +
        `<div class="tstat"><span><b>${PROJECTS.length}+</b> projects</span><span>${commitCountHtml("b")} commits</span><span><b>1st</b> HealthHack '25</span><span><b>2nd</b> HackUMBC '24</span></div>`);
    }

    /* ---------- fun helpers ---------- */
    function pre(t: string, cls?: string) { print(`<pre class="${cls || ""}">${esc(t)}</pre>`); }
    function bubble(msg: string) {
      const m = msg.slice(0, 60);
      const bar = "-".repeat(m.length + 2);
      return ` ${bar}\n< ${m} >\n ${bar}`;
    }
    function cowsay(msg: string) {
      pre(bubble(msg) + "\n" +
        "        \\   ^__^\n" +
        "         \\  (oo)\\_______\n" +
        "            (__)\\       )\\/\\\n" +
        "                ||----w |\n" +
        "                ||     ||");
    }
    function corgisay(msg: string) {
      pre(bubble(msg) + "\n" +
        "      \\\n" +
        "       \\  /^-----^\\\n" +
        "          | o   o |\n" +
        "          |   Y   |   *bork*\n" +
        "           \\ --- /\n" +
        "        ____|   |____\n" +
        "       (    stumpy    )\n" +
        "        \\__|_|---|_|__/");
    }
    function matrix() {
      const GL = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈ0123456789<>*+-";
      /* fit the column count to the viewport so the unicode rows never overflow on mobile */
      const cols = Math.max(14, Math.min(46, Math.floor((view!.clientWidth - 12) / 7.4)));
      const line = () => Array.from({ length: cols }, () => GL[(Math.random() * GL.length) | 0]).join("");
      if (reduced) {
        pre(line() + "\n" + line() + "\n" + line(), "ok");
        print(`wake up, neo… <span class="dim">you have unread messages from opportunity.</span>`);
        return;
      }
      const box = print("", "ok");
      let n = 0;
      const iv = window.setInterval(() => {
        box.innerHTML += `<pre class="ok" style="margin:0">${esc(line())}</pre>`;
        view!.scrollTop = view!.scrollHeight;
        if (++n >= 11) {
          window.clearInterval(iv);
          intervals.delete(iv);
          print(`wake up, neo… <span class="dim">you have unread messages from opportunity.</span>`);
        }
      }, 95);
      intervals.add(iv);
    }
    function sl() {
      const TRAIN =
        "        ____      \n" +
        "    ___|[]|__|]___ \n" +
        "   |___ ___ ___ __|\n" +
        "     O-O     O-O   ";
      if (reduced) { pre(TRAIN); print(`<span class="dim">you typed sl. the train forgives you.</span>`); return; }
      const d = print(`<pre style="margin:0;white-space:pre;">${esc(TRAIN)}</pre>`);
      d.style.overflow = "hidden";
      const p = d.firstChild as HTMLElement;
      p.style.display = "inline-block";
      const w = view!.clientWidth;
      p.animate(
        [{ transform: `translateX(${w}px)` }, { transform: "translateX(-220px)" }],
        { duration: 3200, easing: "linear" }
      ).onfinish = () => {
        d.remove();
        print(`<span class="dim">you typed sl. the train forgives you.</span>`);
      };
    }
    function hack() {
      const steps: [string, string][] = [
        [`initializing breach of mainframe.gov …`, "dim"],
        [`[██████░░░░░░░░░░] 38% — bypassing firewall`, "warn"],
        [`[████████████░░░░] 74% — decrypting hash tables`, "warn"],
        [`[████████████████] 100% — <span class="ok">ACCESS GRANTED</span>`, ""],
        [`jk. the only thing compromised is your free time. <span class="dim">try <kbd>open github</kbd> for real code.</span>`, ""]
      ];
      if (reduced) { steps.forEach(([h, c]) => print(h, c)); return; }
      let t = 0;
      steps.forEach(([h, c]) => { t += 480; later(() => print(h, c), t); });
    }
    function caffeine() {
      pre([
        "        ___",
        "       |___|",
        "     .-------.",
        "     |       |",
        "     |  \\|/  |",
        "     |  /|\\  |",
        "     |       |",
        "     | ULTRA |",
        "     |  zero |",
        "     |_______|"
      ].join("\n"));
      print(`<span class="ok">caffeine.service started — the white monster.</span> <span class="dim">code +200%, errors +200%, time saved +0%.</span>`);
    }
    function fileLines(name: string) {
      if (!name) return null;
      const f = vedContent(name);
      if (!f || f.binary || f.fresh || !f.lines) return null;
      return f as { name: string; lines: string[] };
    }
    function lessCmd(arg: string) {
      if (!arg) { print("usage: less <file>", "err"); return; }
      const f = fileLines(arg);
      if (!f) { print(`less: ${esc(arg)}: no such file`, "err"); return; }
      print(`<pre>${f.lines.map(l => esc(l) || " ").join("\n")}</pre>`);
      print(`<span class="dim">(END) — q does nothing here. scroll like a normal person.</span>`);
    }
    function headTail(which: "head" | "tail", arg: string) {
      const parts = arg.split(/\s+/).filter(Boolean);
      let n = 10;
      if (parts.length > 1 && /^\d+$/.test(parts[0])) n = Math.max(1, +(parts.shift() as string));
      const name = parts.join(" ");
      if (!name) { print(`usage: ${which} [n] <file> — default 10 lines`, "err"); return; }
      const f = fileLines(name);
      if (!f) { print(`${which}: cannot open "${esc(name)}" for reading`, "err"); return; }
      const lines2 = which === "head" ? f.lines.slice(0, n) : f.lines.slice(-n);
      print(`<span class="dim">==&gt; ${esc(f.name)} &lt;==</span>`);
      print(`<pre>${lines2.map(l => esc(l) || " ").join("\n")}</pre>`);
      const rest = f.lines.length - lines2.length;
      if (rest > 0) print(`<span class="dim">(${rest} more line${rest > 1 ? "s" : ""} — <kbd>${which === "head" ? "tail" : "head"} ${esc(name)}</kbd> for the other end, <kbd>cat ${esc(name)}</kbd> for everything)</span>`);
    }
    function ping(arg: string) {
      const host = arg || EMAIL;
      if (reduced) {
        print(`PING ${esc(host)}: 4 packets transmitted, 4 received, 0% loss`);
        print(`host is friendly. say hi: <a href="mailto:${EMAIL}">${EMAIL}</a>`, "ok");
        return;
      }
      let i = 0;
      const iv = window.setInterval(() => {
        i++;
        print(`64 bytes from ${esc(host)}: icmp_seq=${i} ttl=42 time=${(Math.random() * 20 + 3).toFixed(1)} ms`, "dim");
        if (i >= 4) {
          window.clearInterval(iv);
          intervals.delete(iv);
          print(`host is friendly. say hi: <a href="mailto:${EMAIL}">${EMAIL}</a>`, "ok");
        }
      }, 320);
      intervals.add(iv);
    }

    /* ---------- common-tool commands ---------- */
    function grepCmd(q: string) {
      if (!q) { print("usage: grep <pattern> — searches the whole portfolio", "err"); return; }
      const ql = q.toLowerCase();
      const hits: [string, string][] = [];
      const mark = (text: string) => {
        const i = text.toLowerCase().indexOf(ql);
        if (i < 0) return esc(text);
        const s = Math.max(0, i - 38), e2 = Math.min(text.length, i + ql.length + 38);
        return (s > 0 ? "…" : "") + esc(text.slice(s, i)) +
          `<span class="warn">${esc(text.slice(i, i + ql.length))}</span>` +
          esc(text.slice(i + ql.length, e2)) + (e2 < text.length ? "…" : "");
      };
      PROJECTS.forEach(p => {
        const hay = [p.title, p.desc, p.date, p.tech.join(" ")].join(" · ");
        if (hay.toLowerCase().includes(ql)) hits.push([`projects/${slug(p.title)}.md`, mark(hay)]);
      });
      Object.entries(SKILLS).forEach(([g, list]) => list.forEach(s => {
        const hay = s.name + (s.note ? " · " + s.note : "");
        if (hay.toLowerCase().includes(ql)) hits.push([`skills/${slug(g)}.txt`, mark(hay)]);
      }));
      XP.forEach(x => {
        const hay = [x.role, x.company, x.desc, x.tech.join(" ")].join(" · ");
        if (hay.toLowerCase().includes(ql)) hits.push([`experience.log`, mark(hay)]);
      });
      aboutParagraphs.forEach(p => { if (p.toLowerCase().includes(ql)) hits.push([`about.md`, mark(p)]); });
      if (!hits.length) { print(`grep: no matches for '${esc(q)}'`, "warn"); return; }
      hits.forEach(([f, ex]) => print(`<span class="ok">${esc(f)}</span><span class="dim">:</span> ${ex}`));
      print(`<span class="dim">${hits.length} match${hits.length > 1 ? "es" : ""} — <kbd>cat</kbd> a file for the full story</span>`);
    }
    function treeCmd() {
      const t: string[] = [];
      t.push("~");
      t.push("├── projects/");
      FS["~/projects"].forEach((f, i, a) => t.push(`│   ${i === a.length - 1 ? "└──" : "├──"} ${f}`));
      t.push("├── skills/");
      FS["~/skills"].forEach((f, i, a) => t.push(`│   ${i === a.length - 1 ? "└──" : "├──"} ${f}`));
      t.push("├── media/");
      FS["~/media"].slice(0, 3).forEach(f => t.push(`│   ├── ${f}`));
      t.push(`│   └── … +${FS["~/media"].length - 3} more (try ls media)`);
      t.push("├── about.md");
      t.push("├── contact.txt");
      t.push("├── experience.log");
      t.push("└── resume.pdf");
      print(`<pre>${esc(t.join("\n"))}</pre>`);
      print(`<span class="dim">${PROJECTS.length + FS["~/skills"].length + FS["~/media"].length + 4} files, 3 directories</span>`);
    }
    function topCmd() {
      const pad = (s: string | number, n: number) => String(s).padEnd(n);
      const rows = [pad("PID", 6) + pad("NAME", 26) + pad("CPU%", 7) + pad("MEM", 7) + "STATUS"];
      let pid = 1337;
      PROJECTS.slice(0, 9).forEach(p => {
        const run = p.group === "current" || p.group === "featured";
        rows.push(pad(pid++, 6) + pad(slug(p.title).slice(0, 24), 26) +
          pad(run ? (Math.random() * 60 + 10).toFixed(1) : "0.0", 7) +
          pad(((Math.random() * 400 + 40) | 0) + "M", 7) + (run ? "running" : "sleeping"));
      });
      rows.push(pad(pid++, 6) + pad("caffeine.service", 26) + pad("99.9", 7) + pad("1.2G", 7) + "running");
      rows.push(pad(pid, 6) + pad("corgi-thoughts", 26) + pad("42.0", 7) + pad("∞", 7) + "always");
      print(`<span class="dim">tasks: ${rows.length - 1} total · load average: 0.42 0.69 4.20 · q never works in this top</span>`);
      print(`<pre class="ok">${esc(rows[0])}</pre><pre>${rows.slice(1).map(esc).join("\n")}</pre>`);
    }

    /* ---------- vim: minimal modal editor ---------- */
    const vedbuf = ved.querySelector(".ved-buf") as HTMLElement;
    const vedmode = ved.querySelector(".vmode") as HTMLElement;
    const vedfileEl = ved.querySelector(".vfile") as HTMLElement;
    const vedpos = ved.querySelector(".vpos") as HTMLElement;
    const vedcmd = ved.querySelector(".ved-cmd") as HTMLElement;

    let vedOn = false, vlines = [""], vr = 0, vc = 0, vmode: VedMode = "n", vcmd = "", vmsg = "",
      vfile = "", vdirty = false, vpend = "";

    function wrapText(t: string, w = 74) {
      const out: string[] = [];
      t.split("\n").forEach(line => {
        while (line.length > w) {
          let cut = line.lastIndexOf(" ", w);
          if (cut <= 0) cut = w;
          out.push(line.slice(0, cut));
          line = line.slice(cut + 1);
        }
        out.push(line);
      });
      return out;
    }
    function vedContent(name: string): VFile {
      if (!name) return { name: "[No Name]", lines: [
        "VIM - Vi IMproved · jj edition",
        "",
        "  i → insert · hjkl/arrows → move · dd → delete line · x → delete char",
        "  :w → write · :q → quit · :q! → rage quit · :wq → both",
        "",
        "  this is a scratch buffer. write jj a note he'll never read."
      ] };
      const a = name.replace(/^~\//, "").replace(/^\.\//, "");
      if (/about\.md$/.test(a)) return { name: "about.md", lines: wrapText(aboutParagraphs.join("\n\n")) };
      if (/contact\.txt$/.test(a)) return { name: "contact.txt",
        lines: CONTACT_LINES.map(([label, link]) => `${label}: ${link.replace(/^mailto:/, "")}`) };
      if (/experience\.log$/.test(a)) {
        const lines: string[] = [];
        XP.forEach(x => {
          lines.push(`[${x.duration}] ${x.role} @ ${x.company}`);
          wrapText(x.desc).forEach(l => lines.push("  " + l));
          lines.push("  stack: " + x.tech.join(", "), "");
        });
        return { name: "experience.log", lines };
      }
      if (a === "links" || a === "./links") return { name: "links", lines: LINKS_SCRIPT.slice() };
      if (/^media\//.test(a) || MEDIA.some(m => base(m.src) === a)) return { binary: true, name: a };
      const g = SKILL_GROUPS.find(g2 => slug(g2) + ".txt" === a.replace(/^skills\//, ""));
      if (g) return { name: slug(g) + ".txt", lines: [
        "# " + g, "", ...SKILLS[g].map(s => `- ${s.name}${s.note ? ` (${s.note})` : ""}`) ] };
      const p = findProject(a.replace(/^projects\//, ""));
      if (p) {
        const lines = [`# ${p.title}`, "", `date: ${p.date}`];
        if (p.award) lines.push(`award: ★ ${p.award}`);
        lines.push("", ...wrapText(p.desc), "", "## stack", ...p.tech.map(t => "- " + t));
        const links = [p.code && "- code: " + p.code, p.demo && "- live: " + p.demo, p.video && "- video: " + p.video].filter(Boolean) as string[];
        if (links.length) lines.push("", "## links", ...links);
        return { name: slug(p.title) + ".md", lines };
      }
      return { name: a, lines: [""], fresh: true };
    }
    function renderVed() {
      if (!vedOn) return;
      vr = Math.max(0, Math.min(vr, vlines.length - 1));
      const maxC = vmode === "i" ? vlines[vr].length : Math.max(0, vlines[vr].length - 1);
      vc = Math.max(0, Math.min(vc, maxC));
      vedbuf.innerHTML = vlines.map((ln, i) => {
        let tx;
        if (i === vr) {
          if (vc >= ln.length) tx = esc(ln) + '<span class="vcur">&nbsp;</span>';
          else tx = esc(ln.slice(0, vc)) + `<span class="vcur">${esc(ln[vc])}</span>` + esc(ln.slice(vc + 1));
        } else tx = esc(ln) || "&nbsp;";
        return `<div class="vln"><span class="vnum">${i + 1}</span><span class="vtx">${tx}</span></div>`;
      }).join("") + Array.from({ length: 3 }, () =>
        `<div class="vln"><span class="vnum" style="color:var(--acid-deep)">~</span><span class="vtx"></span></div>`).join("");
      ved!.classList.toggle("ins", vmode === "i");
      vedmode.textContent = vmode === "i" ? "INSERT" : vmode === "c" ? "COMMAND" : "NORMAL";
      vedfileEl.textContent = vfile + (vdirty ? " [+]" : "");
      vedpos.textContent = `${vr + 1},${vc + 1}`;
      vedcmd.innerHTML = vmode === "c" ? esc(vcmd) + '<span class="tcur blink"></span>'
        : vmsg ? (vmsg.startsWith("E") ? `<span class="err">${esc(vmsg)}</span>` : esc(vmsg))
        : '<span style="color:var(--mut)">i insert · hjkl move · dd delete · :q quit</span>';
      const cur = vedbuf.querySelector(".vcur");
      if (cur) {
        const ct = (cur.closest(".vln") as HTMLElement).offsetTop;
        if (ct < vedbuf.scrollTop + 10) vedbuf.scrollTop = ct - 10;
        else if (ct > vedbuf.scrollTop + vedbuf.clientHeight - 34) vedbuf.scrollTop = ct - vedbuf.clientHeight + 34;
      }
    }
    function enterVed(arg: string) {
      const f = vedContent(arg);
      if (f.binary) { print(`vim: ${esc(f.name)} is a binary image — <kbd>cat ${esc(f.name)}</kbd> to view it`, "err"); return; }
      vlines = (f.lines || [""]).slice();
      if (!vlines.length) vlines = [""];
      vfile = f.name;
      vr = 0; vc = 0; vmode = "n"; vcmd = ""; vpend = ""; vdirty = false;
      vmsg = f.fresh ? `"${f.name}" [New File]` : `"${f.name}" ${vlines.length}L — read-only repo, writes go to RAM`;
      vedOn = true;
      view!.style.display = "none";
      tuiEl!.classList.remove("on");
      ved!.classList.add("on");
      renderVed();
      focusTin();
    }
    function exitVed(wrote?: boolean) {
      vedOn = false;
      ved!.classList.remove("on");
      view!.style.display = "";
      view!.scrollTop = view!.scrollHeight;
      print(`<span class="dim">[vim] exited${wrote ? " — “written” to RAM (gone on reload, like tears in rain)" : ""}</span>`);
      focusTin();
    }
    function runVedCmd(raw: string) {
      const c = raw.replace(/^:/, "").trim();
      vmode = "n"; vcmd = "";
      if (c === "q") { if (vdirty) vmsg = "E37: no write since last change (add ! to override)"; else { exitVed(); return; } }
      else if (c === "q!") { exitVed(); return; }
      else if (c === "w" || c.startsWith("w ")) { vdirty = false; vmsg = `"${vfile}" ${vlines.length}L written (to RAM — this repo is read-only)`; }
      else if (c === "wq" || c === "x") { exitVed(true); return; }
      else if (/^\d+$/.test(c)) { vr = +c - 1; vc = 0; }
      else if (c === "help") vmsg = "you are beyond help. (:q to leave)";
      else if (c !== "") vmsg = `E492: Not an editor command: ${c}`;
      renderVed();
    }
    function vedCommandKey(k: string) {
      if (k === "Enter") { runVedCmd(vcmd); return; }
      if (k === "Escape") { vmode = "n"; vcmd = ""; }
      else if (k === "Backspace") {
        vcmd = vcmd.slice(0, -1);
        if (!vcmd) vmode = "n";
      }
      else if (k.length === 1) vcmd += k;
      renderVed();
    }
    function splitVedLine(ln: string) {
      vlines.splice(vr + 1, 0, ln.slice(vc));
      vlines[vr] = ln.slice(0, vc);
      vr++; vc = 0; vdirty = true;
    }
    function deleteVedBackward(ln: string) {
      if (vc > 0) {
        vlines[vr] = ln.slice(0, vc - 1) + ln.slice(vc);
        vc--; vdirty = true;
        return;
      }
      if (vr > 0) {
        vc = vlines[vr - 1].length;
        vlines[vr - 1] += ln;
        vlines.splice(vr, 1);
        vr--; vdirty = true;
      }
    }
    function vedInsertKey(k: string) {
      const ln = vlines[vr];
      switch (k) {
        case "Escape": vmode = "n"; vc = Math.max(0, vc - 1); break;
        case "Enter": splitVedLine(ln); break;
        case "Backspace": deleteVedBackward(ln); break;
        case "Tab": vlines[vr] = ln.slice(0, vc) + "  " + ln.slice(vc); vc += 2; vdirty = true; break;
        case "ArrowLeft": vc--; break;
        case "ArrowRight": vc++; break;
        case "ArrowUp": vr--; break;
        case "ArrowDown": vr++; break;
        default:
          if (k.length === 1) { vlines[vr] = ln.slice(0, vc) + k + ln.slice(vc); vc++; vdirty = true; }
      }
      renderVed();
    }
    function deleteVedLine() {
      vlines.splice(vr, 1);
      if (!vlines.length) vlines = [""];
      vdirty = true;
    }
    function openVedLineBelow() {
      vlines.splice(vr + 1, 0, "");
      vr++; vc = 0; vmode = "i"; vdirty = true;
    }
    function openVedLineAbove() {
      vlines.splice(vr, 0, "");
      vc = 0; vmode = "i"; vdirty = true;
    }
    function deleteVedChar() {
      const ln = vlines[vr];
      if (!ln.length) return;
      vlines[vr] = ln.slice(0, vc) + ln.slice(vc + 1);
      vdirty = true;
    }
    function consumeVedPendingKey(k: string) {
      if (!vpend) return false;
      const pending = vpend;
      vpend = "";
      if (pending === "d" && k === "d") deleteVedLine();
      if (pending === "g" && k === "g") { vr = 0; vc = 0; }
      renderVed();
      return true;
    }
    const VED_NORMAL_ACTIONS: Record<string, () => void> = {
      h: () => { vc--; },
      ArrowLeft: () => { vc--; },
      l: () => { vc++; },
      ArrowRight: () => { vc++; },
      j: () => { vr++; },
      ArrowDown: () => { vr++; },
      k: () => { vr--; },
      ArrowUp: () => { vr--; },
      "0": () => { vc = 0; },
      Home: () => { vc = 0; },
      "$": () => { vc = vlines[vr].length; },
      End: () => { vc = vlines[vr].length; },
      i: () => { vmode = "i"; },
      a: () => { vmode = "i"; vc = Math.min(vlines[vr].length, vc + 1); },
      A: () => { vmode = "i"; vc = vlines[vr].length; },
      o: openVedLineBelow,
      O: openVedLineAbove,
      x: deleteVedChar,
      d: () => { vpend = "d"; },
      g: () => { vpend = "g"; },
      G: () => { vr = vlines.length - 1; vc = 0; },
      u: () => { vmsg = "undo? bold of you to assume there's history."; },
      ":": () => { vmode = "c"; vcmd = ":"; },
      Escape: () => {}
    };
    function vedNormalKey(k: string) {
      if (consumeVedPendingKey(k)) return;
      VED_NORMAL_ACTIONS[k]?.();
      renderVed();
    }
    function vedKey(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const k = e.key;
      if (k === "Shift" || k === "CapsLock") return;
      e.preventDefault();
      if (vmode !== "c") vmsg = "";
      if (vmode === "c") vedCommandKey(k);
      else if (vmode === "i") vedInsertKey(k);
      else vedNormalKey(k);
    }

    /* ---------- TUI ---------- */
    let tuiOn = false, tSec = 0, tIdx = 0;
    function projDetail(p: TermProject) {
      return `<h3>${esc(p.title)}</h3>` +
        `<div class="meta">${esc(p.date)}${p.award ? " · ★ " + esc(p.award) : ""}${p.group === "current" ? " · RUNNING" : ""}${p.closed ? " · CLOSED SRC" : ""}</div>` +
        (p.images[0] ? `<img src="${esc(p.images[0])}" alt="${esc(p.title)}" data-lb="${esc(p.images[0])}" data-cap="${esc(p.title)}" loading="lazy" />` : "") +
        `<p>${esc(p.desc)}</p>` +
        `<div class="kv"><b>tech</b> ${p.tech.map(esc).join(", ")}</div>` +
        `<div class="kv">${[p.code ? `<a href="${esc(p.code)}" target="_blank" rel="noopener">code ↗</a>` : "",
          p.demo ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener">live ↗</a>` : "",
          p.video ? `<a href="${esc(p.video)}" target="_blank" rel="noopener">video ↗</a>` : ""].filter(Boolean).join(" · ") || '<span class="dim">no public links</span>'}</div>`;
    }
    const SECS: TuiSection[] = [
      { label: "1:projects", items: PROJECTS.map(p => ({
          label: p.title, html: () => projDetail(p),
          enter: () => { const u = p.code || p.demo || p.video; if (u) window.open(u, "_blank"); } })) },
      { label: "2:skills", items: SKILL_GROUPS.flatMap(g => SKILLS[g].map(s => ({
          label: s.name, html: () => {
            const projs = PROJECTS.filter(p => p.tech.some(t => technologiesMatch(s.name, t)));
            const xps = getLinkedExperiencesForTechnology(s.name);
            return `<h3>${esc(s.name)}</h3><div class="meta">${esc(g)}${s.note ? " · " + esc(s.note) : ""}</div>` +
              (projs.length || xps.length
                ? `<div class="kv"><b>receipts</b></div>` +
                  projs.map(p => `<div class="kv">./${esc(p.title)}</div>`).join("") +
                  xps.map(x => `<div class="kv">@ ${esc(x.company)}</div>`).join("")
                : `<p class="dim" style="color:var(--mut)">no public receipts — coursework, consulting, or daily-driver territory.</p>`);
          } }))) },
      { label: "3:xp", items: XP.map(x => ({
          label: `${x.role} @ ${x.company}`, html: () =>
            `<h3>${esc(x.role)}</h3><div class="meta">@ ${esc(x.company)} · ${esc(x.duration)}</div><p>${esc(x.desc)}</p>` +
            `<div class="kv"><b>tech</b> ${x.tech.map(esc).join(", ")}</div>` })) },
      { label: "4:media", items: MEDIA.map(m => ({
          label: base(m.src), html: () =>
            `<h3>${esc(m.title)}</h3><div class="meta">${esc(m.cap)}</div>` +
            `<img src="${esc(m.src)}" alt="${esc(m.title)}" data-lb="${esc(m.src)}" data-cap="${esc(m.title)} — ${esc(m.cap)}" loading="lazy" />` +
            `<div class="kv"><b>↵</b> fullscreen</div>`,
          enter: () => showLb(m.src, `${m.title} — ${m.cap}`) })) },
      { label: "5:about", items: [{ label: "about.md", html: () =>
          `<h3>readme</h3>` + aboutParagraphs.map(p => `<p>${esc(p)}</p>`).join("") }] }
    ];
    function renderTui() {
      const sec = SECS[tSec];
      const item = sec.items[tIdx];
      tuiEl!.innerHTML =
        `<div class="tui-top">${SECS.map((s, i) =>
          `<span class="${i === tSec ? "on" : ""}" data-sec="${i}">${esc(s.label)}</span>`).join("")}</div>` +
        `<div class="tui-main">` +
          `<ul class="tui-list">${sec.items.map((it, i) =>
            `<li class="${i === tIdx ? "sel" : ""}" data-i="${i}">${esc(it.label)}</li>`).join("")}</ul>` +
          `<div class="tui-view">${item ? item.html() : ""}</div>` +
        `</div>` +
        `<div class="tui-foot"><span><b>↑↓</b> move</span><span><b>←→/tab</b> section</span><span><b>↵</b> open</span><span><b>q</b> quit</span></div>`;
      const list = tuiEl!.querySelector(".tui-list") as HTMLElement;
      const sel = list.querySelector("li.sel") as HTMLElement | null;
      if (sel) {
        const st = sel.offsetTop - list.clientHeight / 2 + sel.offsetHeight / 2;
        list.scrollTop = Math.max(0, st);
      }
    }
    function enterTui() {
      tuiOn = true; tSec = 0; tIdx = 0;
      view!.style.display = "none";
      tuiEl!.classList.add("on");
      renderTui();
      print(`<span class="dim">launched tui — press q to return</span>`);
    }
    function exitTui() {
      tuiOn = false;
      tuiEl!.classList.remove("on");
      tuiEl!.classList.remove("mview");
      view!.style.display = "";
      view!.scrollTop = view!.scrollHeight;
      focusTin();
    }
    function selectTuiSection(index: number) {
      tSec = (index + SECS.length) % SECS.length;
      tIdx = 0;
    }
    function activateTuiItem(section: TuiSection) {
      const item = section.items[tIdx];
      if (window.matchMedia("(max-width:760px)").matches && !tuiEl!.classList.contains("mview")) {
        tuiEl!.classList.add("mview");
      } else if (item.enter) {
        item.enter();
      }
    }
    function closeTuiView() {
      if (tuiEl!.classList.contains("mview")) {
        tuiEl!.classList.remove("mview");
        return true;
      }
      exitTui();
      return false;
    }
    function tuiKey(e: KeyboardEvent) {
      if (lb!.classList.contains("on")) return; /* lightbox owns keys */
      if (!TUI_KEYS.has(e.key)) return;
      e.preventDefault();
      const section = SECS[tSec];
      const actions: Record<string, () => boolean | void> = {
        ArrowUp: () => { tIdx = (tIdx - 1 + section.items.length) % section.items.length; },
        ArrowDown: () => { tIdx = (tIdx + 1) % section.items.length; },
        ArrowLeft: () => { selectTuiSection(tSec - 1); },
        ArrowRight: () => { selectTuiSection(tSec + 1); },
        Tab: () => { selectTuiSection(tSec + 1); },
        Enter: () => { activateTuiItem(section); },
        Escape: closeTuiView,
        q: closeTuiView
      };
      const action = actions[e.key] || (/\d/.test(e.key) ? () => { selectTuiSection(Number(e.key) - 1); } : undefined);
      if (action?.() !== false) renderTui();
    }
    /* tap/click support in TUI */
    on(tuiEl, "click", e => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-lb]")) return; /* lightbox handler takes it */
      if (target.closest("a")) return;
      const tab = target.closest("[data-sec]") as HTMLElement | null;
      if (tab) { tSec = +(tab.dataset.sec || 0); tIdx = 0; tuiEl.classList.remove("mview"); renderTui(); return; }
      const li = target.closest("li[data-i]") as HTMLElement | null;
      if (li) {
        const i = +(li.dataset.i || 0);
        if (i === tIdx && window.matchMedia("(max-width:760px)").matches) tuiEl.classList.add("mview");
        tIdx = i;
        renderTui();
      }
    });

    /* ---------- command dispatch ---------- */
    function clearScrollback() {
      view!.querySelectorAll(".ln").forEach(el => { if (el !== promptEl) el.remove(); });
    }
    function sudoCmd(arg: string) {
      if (arg.includes("hire")) print(`[sudo] permission granted. → <a href="mailto:${EMAIL}">${EMAIL}</a> <span class="ok">✔</span>`);
      else print(`jj is not in the sudoers file. this incident will be reported.`, "warn");
    }
    function linksCmd() {
      print(`opening <span class="ok">jjmccauley.com/links</span> — everything jj, one page …`);
      later(() => { window.location.href = "/links"; }, 650);
    }
    function themeCmd(arg: string) {
      if (applyTheme(arg.toLowerCase())) print(`theme set: <span class="ok">${esc(arg.toLowerCase())}</span> — whole rig recolored.`);
      else print(`usage: theme &lt;${Object.keys(THEMES).join("|")}&gt;`, "warn");
    }
    function rollCmd() {
      print(`you rolled a <span class="ok">${1 + ((Math.random() * 6) | 0)}</span> — ${Math.random() < 0.5 ? "ship it." : "reroll? coward."}`);
    }
    function registerCommands(names: string[], handler: CommandHandler) {
      names.forEach(name => commandHandlers.set(name, handler));
    }
    const commandHandlers = new Map<string, CommandHandler>();
    registerCommands(["help", "?"], () => help());
    registerCommands(["ls", "ll", "dir"], arg => lsOut(arg ? (resolveDir(arg) || arg) : cwd));
    registerCommands(["cd"], arg => {
      const dir = resolveDir(arg);
      if (dir) { cwd = dir; renderBuf(); }
      else print(`cd: no such directory: ${esc(arg)}`, "err");
    });
    registerCommands(["pwd"], () => print(esc(cwd.replace("~", "/home/jj"))));
    registerCommands(["cat", "bat"], catFile);
    registerCommands(["less", "more"], lessCmd);
    registerCommands(["head"], arg => headTail("head", arg));
    registerCommands(["tail"], arg => headTail("tail", arg));
    registerCommands(["open", "xdg-open"], openCmd);
    registerCommands(["resume", "cv"], () => openCmd("resume"));
    registerCommands(["whoami"], whoami);
    registerCommands(["neofetch", "fastfetch"], neofetch);
    registerCommands(["tui", "browse", "explore"], enterTui);
    registerCommands(["clear", "cls"], clearScrollback);
    registerCommands(["history"], () => hist.forEach((h, i) => print(`<span class="dim">${i + 1}</span>  ${esc(h)}`)));
    registerCommands(["echo"], arg => print(esc(arg)));
    registerCommands(["contact"], () => catFile("contact.txt"));
    registerCommands(["sudo"], sudoCmd);
    registerCommands(["links", "./links"], linksCmd);
    registerCommands(["exit", "logout", "gui"], exitTerminal);
    registerCommands(["vim", "vi", "nvim", "neovim"], enterVed);
    registerCommands(["nano", "pico"], () => print(`nano: command not found. we don't use nano around here — this is a <span class="ok">vim</span> household. <span class="dim">(the training wheels are in the bin out back. try <kbd>vim</kbd>.)</span>`, "err"));
    registerCommands(["emacs"], () => print(`emacs: insufficient memory (needed: all of it, plus a foot pedal). try <kbd>vim</kbd>.`, "warn"));
    registerCommands(["grep", "rg", "ack"], grepCmd);
    registerCommands(["tree"], treeCmd);
    registerCommands(["top", "htop", "btop", "ps"], topCmd);
    registerCommands(["touch"], arg => print(`touch: cannot touch '${esc(arg || "file")}': read-only filesystem <span class="dim">(write access is granted upon hiring — <kbd>sudo hire-me</kbd>)</span>`, "err"));
    registerCommands(["mkdir"], arg => print(`mkdir: cannot create '${esc(arg || "dir")}': read-only filesystem <span class="dim">(this portfolio ships sealed)</span>`, "err"));
    registerCommands(["rm"], () => print(`rm: permission denied — this portfolio is load-bearing.`, "err"));
    registerCommands(["git"], () => print(`git: ${commitCountHtml()} commits and counting. <a href="${GITHUB_URL}" target="_blank" rel="noopener">see github ↗</a>`));
    registerCommands(["fortune"], () => print(esc(FORTUNES[(Math.random() * FORTUNES.length) | 0]), "ok"));
    registerCommands(["cowsay"], arg => cowsay(arg || "moo. hire jj."));
    registerCommands(["corgisay", "corgi", "woof", "bork"], arg => corgisay(arg || "bork bork. hire jj."));
    registerCommands(["matrix"], matrix);
    registerCommands(["sl"], sl);
    registerCommands(["hack"], hack);
    registerCommands(["caffeine", "monster", "brew"], caffeine);
    registerCommands(["coffee"], () => print(`coffee? we run on the white monster around here — try <kbd>caffeine</kbd>.`, "warn"));
    registerCommands(["roll", "dice"], rollCmd);
    registerCommands(["coinflip", "flip"], () => print(`<span class="ok">${Math.random() < 0.5 ? "HEADS" : "TAILS"}</span> — the coin has spoken.`));
    registerCommands(["ping"], ping);
    registerCommands(["theme"], themeCmd);
    registerCommands(["date"], () => print(esc(new Date().toString())));
    registerCommands(["uptime"], () => print(`up 23 years · load average: chaotic good · processes: too many side projects`));
    registerCommands(["man"], arg => print(`no manual entry for ${esc(arg || "man")} — real ones use <kbd>help</kbd>.`));

    function exec(raw: string) {
      const line = raw.trim();
      echoCmd(raw);
      if (!line) return;
      hist.push(line); histI = hist.length;
      const [cmd, ...args] = line.split(/\s+/);
      const arg = args.filter(a => !a.startsWith("-")).join(" ");
      const handler = commandHandlers.get(cmd.toLowerCase());
      if (handler) handler(arg);
      else print(`zsh: command not found: ${esc(cmd)} — try <kbd>help</kbd>`, "err");
    }

    /* ---------- tab completion ---------- */
    function complete() {
      const parts = buffer.split(/\s+/);
      let cands: string[];
      if (parts.length <= 1) {
        cands = COMMANDS.filter(c => c.startsWith(parts[0] || ""));
      } else {
        const frag = parts[parts.length - 1];
        let pool = FS[cwd].slice();
        const dm = frag.match(/^(projects|skills|media)\/(.*)$/);
        if (dm) pool = (FS["~/" + dm[1]] || []).map(f => dm[1] + "/" + f);
        cands = pool.filter(f => f.startsWith(frag));
      }
      if (cands.length === 1) {
        parts[parts.length - 1] = cands[0];
        buffer = parts.join(" ") + (cands[0].endsWith("/") ? "" : " ");
        tin!.value = buffer;
        renderBuf();
      } else if (cands.length > 1) {
        print(cands.map(c => `<span class="${c.endsWith("/") ? "dir" : "dim"}">${esc(c)}</span>`).join("  "));
      }
    }

    /* ---------- input wiring ---------- */
    function focusTin() {
      tin!.focus({ preventScroll: true });
    }
    on(term, "click", e => {
      if (tuiOn) return;
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("kbd")) return;
      focusTin();
    });
    /* clicking a kbd suggestion runs it */
    function kbdToCmd(raw: string): string {
      return raw
        .split("—")[0]                    // drop any trailing description
        .split(" / ")[0]                  // multi-command rows: take the first
        .replace(/<([^>|]+)\|[^>]*>/g, "$1") // <a|b|c> -> first alternative
        .replace(/<[^>]*>/g, "")          // <file>, <dir>, ... -> strip
        .replace(/\[[^\]]*\]/g, "")       // [dir] optional args -> strip
        .replace(/\s+/g, " ").trim();
    }
    on(view, "click", e => {
      const k = (e.target as HTMLElement).closest("kbd");
      if (!k) return;
      const cmd = kbdToCmd(k.textContent || "");
      if (!cmd) return;
      buffer = ""; tin.value = "";
      exec(cmd);
      renderBuf();
      focusTin();
    });
    on(tin, "input", () => {
      if (tuiOn || vedOn) { tin.value = ""; return; }
      buffer = tin.value; renderBuf();
    });
    on(tin, "keydown", e => {
      if (tuiOn) { tuiKey(e); return; }
      if (vedOn) { vedKey(e); return; }
      if (e.key === "Enter") {
        const b = buffer;
        buffer = ""; tin.value = "";
        exec(b);
        renderBuf();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (hist.length) { histI = Math.max(0, histI - 1); buffer = hist[histI]; tin.value = buffer; renderBuf(); }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (hist.length) {
          histI = Math.min(hist.length, histI + 1);
          buffer = histI === hist.length ? "" : hist[histI];
          tin.value = buffer; renderBuf();
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        complete();
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        view.querySelectorAll(".ln").forEach(el => { if (el !== promptEl) el.remove(); });
      }
    });
    /* document-level fallback so TUI/vim/lightbox work even if input loses focus */
    on(document, "keydown", e => {
      if (e.key === "Escape" && lb.classList.contains("on")) { lb.classList.remove("on"); return; }
      if (e.target === tin) return;
      if (tuiOn) tuiKey(e);
      else if (vedOn) vedKey(e);
    });

    /* ---------- boot ---------- */
    function boot() {
      const steps = [
        () => print(`<span class="dim">last login: ${new Date().toDateString()} on ttys001 — welcome aboard.</span>`),
        () => { echoCmd("whoami"); whoami(); },
        () => print(`<span class="dim">type <kbd>help</kbd> for commands · <kbd>ls</kbd> to look around · <kbd>tui</kbd> for arrow-key mode</span>`)
      ];
      if (reduced) { steps.forEach(s => s()); return; }
      let t = 150;
      steps.forEach(s => { later(s, t); t += 650; });
    }
    boot();
    if (window.matchMedia("(pointer:fine)").matches) later(focusTin, 400);

    return () => {
      commitCountController.abort();
      timeouts.forEach(id => window.clearTimeout(id));
      intervals.forEach(id => window.clearInterval(id));
      offs.forEach(off => off());
      view.querySelectorAll(".ln").forEach(el => { if (el !== promptEl) el.remove(); });
      tbuf.textContent = "";
      tin.value = "";
      tuiEl.innerHTML = "";
      tuiEl.classList.remove("on", "mview");
      vedbuf.innerHTML = "";
      ved.classList.remove("on", "ins");
      view.style.display = "";
      lb.classList.remove("on");
    };
  }, [navigate]);

  return (
    <div className="tpure" ref={stageRef}>
      <div className="grid-bg" />
      <div className="fx-scan" />
      <div className="fx-vig" />

      <div className="lb" ref={lbRef}>
        <img ref={lbImgRef} alt="" />
        <div className="cap" ref={lbCapRef} />
        <div className="keys"><b>ESC</b> CLOSE</div>
      </div>

      <div className="term" ref={termRef}>
        <div className="bar">
          <span className="d r" /><span className="d y" /><span className="d g" />
          <span className="ttl">jj@portfolio: ~ — zsh — live session</span>
        </div>
        <div className="scr">
          <div className="tv" ref={viewRef} role="log" aria-live="polite">
            <div className="ln" ref={promptRef}>
              <span className="pr">jj@portfolio:~$</span>{" "}
              <span ref={tbufRef} /><span className="tcur blink" />
            </div>
          </div>
          <div className="tui" ref={tuiRef} />
          <div className="ved" ref={vedRef}>
            <div className="ved-buf" />
            <div className="ved-status">
              <span className="vmode">NORMAL</span><span className="vfile" /><span className="vpos" />
            </div>
            <div className="ved-cmd" />
          </div>
          <input
            className="tin"
            ref={tinRef}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="terminal input"
          />
        </div>
      </div>
    </div>
  );
}
