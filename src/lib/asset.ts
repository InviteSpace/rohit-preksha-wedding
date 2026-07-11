const REPO_NAME = "rohit-preksha-wedding";

declare global {
  interface Window {
    __BASE_PATH__?: string;
  }
}

function getBasePath(): string {
  if (typeof window !== "undefined") {
    if (window.__BASE_PATH__) return window.__BASE_PATH__;

    const { hostname, pathname } = window.location;
    if (hostname.endsWith("github.io")) {
      const segment = pathname.split("/").filter(Boolean)[0];
      if (segment && !segment.includes(".")) return `/${segment}`;
    }

    return "";
  }

  if (process.env.GITHUB_PAGES === "true") {
    return process.env.NEXT_PUBLIC_BASE_PATH || `/${REPO_NAME}`;
  }

  return process.env.NEXT_PUBLIC_BASE_PATH ?? "";
}

export function assetPath(path: string): string {
  if (!path.startsWith("/")) return path;
  const base = getBasePath();
  if (base && path.startsWith(`${base}/`)) return path;
  return `${base}${path}`;
}
