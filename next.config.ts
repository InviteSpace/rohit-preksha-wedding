import type { NextConfig } from "next";

const repoName = "rohit-preksha-wedding";
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const customDomain = process.env.CUSTOM_DOMAIN?.trim() ?? "";

// Custom domain → site at domain root (warmwelcome.com).
// Default GitHub Pages → site at username.github.io/repo-name/
const basePath = isGitHubPages && !customDomain ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: isGitHubPages,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: customDomain
      ? `https://${customDomain}`
      : `https://warmwelcome.github.io/${repoName}`,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
