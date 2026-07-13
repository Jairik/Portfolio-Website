import { Route, Routes } from "react-router-dom";

import NotFound from "./components/NotFound";
import AboutPage from "./components/about-page/AboutPage";
import PressPage from "./components/press-page/PressPage";
import ProjectPage from "./components/project-page/ProjectPage";
import ProjectsPage from "./components/projects-page/ProjectsPage";
import Resume from "./components/Resume";
import SimplePortfolio from "./components/SimplePortfolio";
import Terminal from "./components/Terminal";
import TerminalHome from "./components/terminal-home/TerminalHome";
import TopicPage from "./components/topic-page/TopicPage";
import { topicOrder } from "./assets/topics";
import { useSeoHead } from "./hooks/useSeoHead";

export default function App() {
  // Keep the full document head correct when React Router changes pages
  // without requesting a fresh prerendered document.
  useSeoHead();

  return (
    <Routes>
      <Route path="/" element={<TerminalHome />} />
      {/* Static /projects index sits above the dynamic :slug route */}
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:slug" element={<ProjectPage />} />
      {/* Canonical hubs at /ai-engineering etc.; /topics/:topic stays as alias */}
      {topicOrder.map(key => (
        <Route key={key} path={`/${key}`} element={<TopicPage />} />
      ))}
      <Route path="/topics" element={<TopicPage />} />
      <Route path="/topics/:topic" element={<TopicPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/press" element={<PressPage />} />
      <Route path="/terminal" element={<Terminal />} />
      <Route path="/simple" element={<SimplePortfolio />} />
      <Route path="/resume" element={<Resume />} />
      {/* Legacy .html files hydrate the same view but canonicalize to /<name>/. */}
      <Route path="/terminal.html" element={<Terminal />} />
      <Route path="/simple.html" element={<SimplePortfolio />} />
      <Route path="/resume.html" element={<Resume />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
