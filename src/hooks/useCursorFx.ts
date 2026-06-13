/* Cursor effects for the terminal home page: the mouse trail (off / blocks /
   glyphs / comet, read live from the root's data-trail attribute) and the
   click burst (selection ring + glyph sparks). Particles are appended into
   an in-tree fx container so the .thome CSS scoping applies to them. */
import { useEffect, type RefObject } from "react";
import { TRAIL_GLYPHS, prefersReducedMotion } from "../lib/motion";

/* Wires the cursor trail + click burst listeners for the page's lifetime.
   Modes are read live from root.dataset so pref changes apply instantly. */
export function useCursorFx(
  rootRef: RefObject<HTMLDivElement | null>,
  fxRef: RefObject<HTMLDivElement | null>
): void {
  useEffect(() => {
    const root = rootRef.current;
    const fx = fxRef.current;
    if (!root || !fx || prefersReducedMotion()) return;
    const cleanups: (() => void)[] = [];

    // Trail is pointless on touch devices, so only wire it for fine pointers
    if (!window.matchMedia("(pointer: coarse)").matches) {
      let lastSpawn = 0;
      // Comet mode: canvas polyline that fades by age (lazily created on first use)
      let canvas: HTMLCanvasElement | null = null;
      let cctx: CanvasRenderingContext2D | null = null;
      let rafId = 0;
      const pts: { x: number; y: number; t: number }[] = [];
      const fit = () => { if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; } };

      /* Redraws the comet polyline each frame, expiring points older than 450ms */
      const drawComet = () => {
        if (!canvas || !cctx) return;
        const now = performance.now();
        while (pts.length && now - pts[0].t > 450) pts.shift();
        cctx.clearRect(0, 0, canvas.width, canvas.height);
        if (pts.length > 1) {
          const acid = getComputedStyle(root).getPropertyValue("--acid").trim() || "#a6f73a";
          cctx.strokeStyle = acid;
          cctx.lineCap = "round";
          cctx.shadowColor = acid;
          cctx.shadowBlur = 6;
          for (let i = 1; i < pts.length; i++) {
            const age = (now - pts[i].t) / 450;
            cctx.globalAlpha = Math.max(0, (1 - age) * 0.5);
            cctx.lineWidth = Math.max(0.5, (1 - age) * 3);
            cctx.beginPath();
            cctx.moveTo(pts[i - 1].x, pts[i - 1].y);
            cctx.lineTo(pts[i].x, pts[i].y);
            cctx.stroke();
          }
          cctx.globalAlpha = 1;
          cctx.shadowBlur = 0;
        }
        rafId = requestAnimationFrame(drawComet);
      };

      /* Creates the comet canvas on demand and starts its draw loop */
      const ensureCanvas = () => {
        if (canvas) return;
        canvas = document.createElement("canvas");
        canvas.id = "trailfx";
        fx.appendChild(canvas);
        cctx = canvas.getContext("2d");
        fit();
        window.addEventListener("resize", fit);
        rafId = requestAnimationFrame(drawComet);
      };

      /* Drops a short-lived DOM node into the fx layer that animates itself away */
      const spawn = (className: string, x: number, y: number, glyph?: string, drift?: { dx: number; dy: number }, life = 650) => {
        const node = document.createElement("span");
        node.className = className;
        if (glyph) node.textContent = glyph;
        if (drift) {
          node.style.setProperty("--dx", `${drift.dx}px`);
          node.style.setProperty("--dy", `${drift.dy}px`);
        }
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
        fx.appendChild(node);
        setTimeout(() => node.remove(), life);
      };

      /* Spawns trail particles behind the cursor based on the active trail mode */
      const onMove = (e: MouseEvent) => {
        const mode = root.dataset.trail || "off";
        if (mode === "off") return;
        if (mode === "comet") {
          // Comet: extend the polyline + occasionally shed a drifting glyph
          ensureCanvas();
          pts.push({ x: e.clientX, y: e.clientY, t: performance.now() });
          const now = performance.now();
          if (now - lastSpawn > 90) {
            lastSpawn = now;
            const ang = Math.random() * Math.PI * 2;
            const dist = 18 + Math.random() * 32;
            spawn("trail-glyph", e.clientX, e.clientY,
              TRAIL_GLYPHS[(Math.random() * TRAIL_GLYPHS.length) | 0],
              { dx: Math.cos(ang) * dist, dy: Math.sin(ang) * dist }, 750);
          }
          return;
        }
        // Blocks/glyphs: throttled single-particle spawn at the cursor
        const now = performance.now();
        if (now - lastSpawn < 30) return;
        lastSpawn = now;
        spawn(
          mode === "glyphs" ? "trail-bit g" : "trail-bit",
          e.clientX, e.clientY,
          mode === "glyphs" ? TRAIL_GLYPHS[(Math.random() * TRAIL_GLYPHS.length) | 0] : undefined
        );
      };

      window.addEventListener("mousemove", onMove, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", fit);
        cancelAnimationFrame(rafId);
        canvas?.remove();
      });
    }

    /* Click burst: expanding selection ring + 8 glyph sparks at the click point */
    const onDown = (e: PointerEvent) => {
      if (root.dataset.burst !== "on") return;
      // Selection ring that expands and fades (CSS animation)
      const ring = document.createElement("span");
      ring.className = "click-ring";
      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
      fx.appendChild(ring);
      setTimeout(() => ring.remove(), 500);
      // Eight glyph sparks flung outward on a jittered circle
      const N = 8;
      for (let i = 0; i < N; i++) {
        const sparkNode = document.createElement("span");
        sparkNode.className = "click-spark";
        sparkNode.textContent = TRAIL_GLYPHS[(Math.random() * TRAIL_GLYPHS.length) | 0];
        const ang = (i / N) * Math.PI * 2 + Math.random() * 0.5;
        const dist = 38 + Math.random() * 34;
        sparkNode.style.setProperty("--dx", `${Math.cos(ang) * dist}px`);
        sparkNode.style.setProperty("--dy", `${Math.sin(ang) * dist}px`);
        sparkNode.style.left = `${e.clientX}px`;
        sparkNode.style.top = `${e.clientY}px`;
        fx.appendChild(sparkNode);
        setTimeout(() => sparkNode.remove(), 600);
      }
    };
    window.addEventListener("pointerdown", onDown, { passive: true });
    cleanups.push(() => window.removeEventListener("pointerdown", onDown));

    return () => cleanups.forEach(fn => fn());
  }, [rootRef, fxRef]);
}
