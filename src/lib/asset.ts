const REPO_NAME = "rohit-preksha-wedding";

/** GitHub project pages live at username.github.io/repo-name/ */
function getBasePath(): string {
  if (typeof window !== "undefined") {
    if (window.location.hostname.endsWith("github.io")) {
      const firstSegment = window.location.pathname.split("/").filter(Boolean)[0];
      if (firstSegment === REPO_NAME) return `/${REPO_NAME}`;
    }
    return "";
  }

  if (process.env.GITHUB_PAGES === "true") return `/${REPO_NAME}`;
  return process.env.NEXT_PUBLIC_BASE_PATH ?? "";
}

export function assetPath(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${getBasePath()}${path}`;
}
