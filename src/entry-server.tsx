import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";

import App from "./App";
import "./index.css";

export {
  prerenderRoutes,
  renderRobotsTxt,
  renderSeoHead,
  renderSitemap,
  seoRoutes
} from "./lib/seo";

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}
