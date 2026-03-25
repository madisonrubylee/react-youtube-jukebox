export const topNavigation = [
  { href: "/", label: "Home" },
  { href: "/quick-start", label: "Quick Start" },
  { href: "/api-playground", label: "API & Playground" },
  { href: "/examples", label: "Examples" },
] as const;

export const sidebarSections = [
  {
    title: "Getting Started",
    items: [
      { href: "/", label: "Overview" },
      { href: "/quick-start", label: "Quick Start" },
    ],
  },
  {
    title: "Reference",
    items: [
      { href: "/api-playground", label: "Jukebox API" },
      { href: "/examples", label: "Examples" },
    ],
  },
] as const;
