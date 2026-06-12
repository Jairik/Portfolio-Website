export type RenderMode = "full" | "simple";
export type SimplifiedModeReason = "manual" | "compatibility" | "accessibility";

export const RENDER_MODE_STORAGE_KEY = "portfolio-render-mode";
export const LEGACY_RENDER_MODE_STORAGE_KEY = "portfolio-render-mode-preference";
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const WEBGL_CONTEXT_NAMES = ["webgl2", "webgl", "experimental-webgl"] as const;

export const detectWebGLSupport = (): boolean => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return true;
  }

  try {
    const canvas = document.createElement("canvas");
    const options: WebGLContextAttributes = {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: "high-performance",
      premultipliedAlpha: false,
      stencil: false
    };

    for (const contextName of WEBGL_CONTEXT_NAMES) {
      const context = canvas.getContext(
        contextName,
        options
      ) as WebGLRenderingContext | WebGL2RenderingContext | null;
      if (!context) continue;

      const loseContext = context.getExtension?.("WEBGL_lose_context");
      loseContext?.loseContext();
      return true;
    }
  } catch {
    return false;
  }

  return false;
};

export const getInitialRenderState = (): {
  mode: RenderMode;
  reason: SimplifiedModeReason | null;
} => {
  if (typeof window === "undefined") {
    return { mode: "full", reason: null };
  }

  let storedMode: string | null = null;
  try {
    storedMode = window.localStorage.getItem(RENDER_MODE_STORAGE_KEY);
    if (storedMode === null) {
      storedMode = window.localStorage.getItem(LEGACY_RENDER_MODE_STORAGE_KEY);
    }
  } catch {
    storedMode = null;
  }
  const prefersReducedMotion = window.matchMedia?.(REDUCED_MOTION_QUERY).matches ?? false;

  if (storedMode === "simple-compatibility") {
    return { mode: "simple", reason: "compatibility" };
  }

  if (!detectWebGLSupport()) {
    return { mode: "simple", reason: "compatibility" };
  }

  if (storedMode === "simple") {
    return { mode: "simple", reason: "manual" };
  }

  if (prefersReducedMotion && storedMode !== "full") {
    return { mode: "simple", reason: "accessibility" };
  }

  return { mode: "full", reason: null };
};
