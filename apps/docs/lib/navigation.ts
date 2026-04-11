export const topNavigation = [
  { href: "/", label: "Home" },
  { href: "/installation", label: "Installation" },
  { href: "/quick-start", label: "Quick Start" },
  { href: "/api-playground", label: "API & Playground" },
  { href: "/headless-hooks", label: "Headless Hooks" },
  { href: "/examples", label: "Examples" },
] as const;

export const sidebarSections = [
  {
    title: "Getting Started",
    items: [
      { href: "/", label: "Overview" },
      { href: "/installation", label: "Installation" },
      { href: "/quick-start", label: "Quick Start" },
    ],
  },
  {
    title: "Jukebox",
    items: [
      { href: "/api-playground", label: "Jukebox API" },
      { href: "/examples", label: "Examples" },
    ],
  },
  {
    title: "Headless",
    items: [{ href: "/headless-hooks", label: "Hooks" }],
  },
] as const;
