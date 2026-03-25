import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = path.dirname(currentFilePath);
const coreEntryPath = path.resolve(
  currentDirPath,
  "../../packages/react-youtube-jukebox/src/index.ts",
);
const coreStylesPath = path.resolve(
  currentDirPath,
  "../../packages/react-youtube-jukebox/src/styles/jukebox.css",
);
const docsDistDir = process.env.NODE_ENV === "development" ? ".next-dev" : ".next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: docsDistDir,
  transpilePackages: ["@react-youtube-jukebox/core"],
  turbopack: {
    resolveAlias: {
      "@react-youtube-jukebox/core": coreEntryPath,
      "@react-youtube-jukebox/core/styles.css": coreStylesPath,
    },
  },
  experimental: {
    externalDir: true,
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@react-youtube-jukebox/core$": coreEntryPath,
      "@react-youtube-jukebox/core/styles.css": coreStylesPath,
    };

    return config;
  },
};

export default nextConfig;
