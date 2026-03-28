import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = path.dirname(currentFilePath);
const coreEntryPath = path.resolve(
  currentDirPath,
  "../../packages/react-youtube-jukebox/src/index.ts",
);
const docsDistDir = process.env.NODE_ENV === "development" ? ".next-dev" : ".next";
const shouldUseWorkspaceSource = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: docsDistDir,
  transpilePackages: ["@react-youtube-jukebox/core"],
  experimental: {
    externalDir: true,
  },
  webpack(config) {
    if (shouldUseWorkspaceSource) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@react-youtube-jukebox/core$": coreEntryPath,
      };
    }

    return config;
  },
};

if (shouldUseWorkspaceSource) {
  nextConfig.turbopack = {
    resolveAlias: {
      "@react-youtube-jukebox/core": coreEntryPath,
    },
  };
}

export default nextConfig;
