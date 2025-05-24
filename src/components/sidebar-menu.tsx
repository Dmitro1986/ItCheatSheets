/** @format */

// src/components/sidebar-menu.ts

export type MenuItemSingle = {
  title: string;
  href: string;
  isSingleItem: true;
};

export type MenuItemWithSection = {
  section: string;
  items: Array<{
    title: string;
    href: string;
  }>;
};

export type MenuItem = MenuItemSingle | MenuItemWithSection;

export const menu: MenuItem[] = [
  {
    title: "🏠 Home",
    href: "/",
    isSingleItem: true,
  },
  {
    section: "🧰 Git",
    items: [{ title: "Шпаргалка Git", href: "/git" }],
  },
  {
    section: "⚡ Terminal",
    items: [
      { title: "Шпаргалка Terminal", href: "/terminal" },
      // { title: "Vue", href: "/frontend/vue" },
    ],
  },
  {
    section: "🐳 Docker",
    items: [
      { title: "Шпаргалка Docker", href: "/docker" },
      // { title: "Express", href: "/backend/express" },
    ],
  },
  {
    section: "📒 JavaScript",
    items: [{ title: "Шпаргалка JavaScript", href: "/javascript" }],
  },
  {
    section: "📒 React",
    items: [{ title: "Шпаогалка React", href: "/react" }],
  },
  {
    section: "📒 CSS",
    items: [{ title: "Шпаргалка CSS", href: "/css" }],
  },
  {
    section: "📒 Data",
    items: [{ title: "Шпаргалка DataBase", href: "/data" }],
  },
  {
    section: "📒 HTTP/API",
    items: [{ title: "Шпаргалка HTTP/API", href: "/httpapi" }],
  },
];
