import { Route, Routes } from "react-router-dom";

import NotFound from "./components/NotFound";
import Resume from "./components/Resume";
import SimplePortfolio from "./components/SimplePortfolio";
import Terminal from "./components/Terminal";
import TerminalHome from "./components/terminal-home/TerminalHome";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TerminalHome />} />
      <Route path="/terminal" element={<Terminal />} />
      <Route path="/simple" element={<SimplePortfolio />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
