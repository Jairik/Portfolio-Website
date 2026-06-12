/* Kernel-panic 404 — port of the "404.html" design prototype. Rendered by the
   router's catch-all route; on GitHub Pages unknown URLs load the SPA via the
   404.html fallback and land here. */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const T = () => <span className="t">[ 404.040404]</span>;

export default function NotFound() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "kernel panic — 404 not found · JJ McCauley";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="kpanic">
      <div className="grid-bg" />
      <div className="fx-scan" />
      <div className="fx-vig" />

      <main className="panic" role="alert" aria-label="404 — page not found">
        <div className="dump">
          <span className="row"><T /> ------------[ cut here ]------------</span>
          <span className="row"><T /> kernel BUG at <span className="k">portfolio/router.c:404</span>!</span>
          <span className="row"><T /> Oops: <span className="w">0404</span> [#1] SMP PREEMPT</span>
          <span className="row"><T /> Probably a segfault somewhere</span>
          <span className="row"><T /> CPU: 0 PID: 1 Comm: jj-router Not tainted 23.0.4-jj</span>
          <span className="row"><T /> Hardware name: JJ McCauley/Portfolio, BIOS v23 06/11/2026</span>
        </div>

        <h1 className="glyph"><span className="hollow">4</span><span className="zap">0</span><span className="hollow">4</span></h1>
        <p className="headline">Page not found</p>
        <p className="lede">
          The route you requested isn't mounted on this filesystem — it was{" "}
          <b>moved, renamed, or never existed</b>. The kernel did its best and
          then gave up dramatically, as kernels do.
        </p>

        <div className="dump">
          <span className="row"><T /> <span className="k">Kernel panic - not syncing:</span> requested route does not exist</span>
          <span className="row"><T /> Call Trace:</span>
          <span className="row"><T />  route_lookup+0x404/0x404</span>
          <span className="row"><T />  render_page+0x000/0x001</span>
          <span className="row"><T />  http_dispatch+0xdead/0xbeef</span>
          <span className="row"><T />  ret_from_404+0x000/0x000</span>
          <span className="row"><T /> RIP: 0010:[&lt;ffffffff00000404&gt;] you_are_here+0x404</span>
          <span className="row"><T /> ---[ end Kernel panic - not syncing: ROUTE_NOT_FOUND ]---<span className="cur" /></span>
        </div>

        <div className="recover">
          <div className="lbl">// recovery — reboot into a page that exists</div>
          <a className="btn" href="/links">
            <span className="arrow">&gt;</span> jjmccauley.com/links <span className="arrow">↗</span>
          </a>
          <div className="alt">
            or just <Link to="/">head home →</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
