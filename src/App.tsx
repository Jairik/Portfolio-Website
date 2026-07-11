import { Route, Routes } from "react-router-dom";

import NotFound from "./components/NotFound";
import AboutPage from "./components/about-page/AboutPage";
import PressPage from "./components/press-page/PressPage";
import ProjectPage from "./components/project-page/ProjectPage";
import Resume from "./components/Resume";
import SimplePortfolio from "./components/SimplePortfolio";
import Terminal from "./components/Terminal";
import TerminalHome from "./components/terminal-home/TerminalHome";
import TopicPage from "./components/topic-page/TopicPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TerminalHome />} />
      <Route path="/projects/:slug" element={<ProjectPage />} />
      <Route path="/topics" element={<TopicPage />} />
      <Route path="/topics/:topic" element={<TopicPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/press" element={<PressPage />} />
      <Route path="/terminal" element={<Terminal />} />
      <Route path="/simple" element={<SimplePortfolio />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
