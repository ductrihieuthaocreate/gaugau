import type { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "New & Featured",
    href: "/collections/new",
    children: [
      { label: "New Arrivals", href: "/collections/new" },
      { label: "Best Sellers", href: "/collections/best-sellers" },
      { label: "Designer Collections", href: "/collections/designer" },
      { label: "Gift Ideas", href: "/collections/gifts" },
    ],
  },
  {
    label: "Play",
    href: "/collections/play",
    children: [
      { label: "Games", href: "/collections/games" },
      { label: "Puzzles", href: "/collections/puzzles" },
      { label: "Toys", href: "/collections/toys" },
      { label: "Outdoor", href: "/collections/outdoor" },
    ],
  },
  {
    label: "Home",
    href: "/collections/home",
    children: [
      { label: "Decor", href: "/collections/decor" },
      { label: "Storage", href: "/collections/storage" },
      { label: "Clocks", href: "/collections/clocks" },
      { label: "Lighting", href: "/collections/lighting" },
    ],
  },
  {
    label: "Kitchen",
    href: "/collections/kitchen",
    children: [
      { label: "Gadgets", href: "/collections/kitchen-gadgets" },
      { label: "Tableware", href: "/collections/tableware" },
      { label: "Bar & Wine", href: "/collections/bar-wine" },
      { label: "Cooking", href: "/collections/cooking" },
    ],
  },
  {
    label: "Wellness",
    href: "/collections/wellness",
    children: [
      { label: "Self-Care", href: "/collections/self-care" },
      { label: "Fitness", href: "/collections/fitness" },
      { label: "Relaxation", href: "/collections/relaxation" },
    ],
  },
  {
    label: "On-The-Go",
    href: "/collections/on-the-go",
    children: [
      { label: "Travel", href: "/collections/travel" },
      { label: "Bags & Pouches", href: "/collections/bags" },
      { label: "Outdoors", href: "/collections/outdoors" },
    ],
  },
  {
    label: "Tech",
    href: "/collections/tech",
    children: [
      { label: "Gadgets", href: "/collections/tech-gadgets" },
      { label: "Accessories", href: "/collections/tech-accessories" },
      { label: "Cables & Chargers", href: "/collections/cables" },
    ],
  },
  {
    label: "Stationery",
    href: "/collections/stationery",
    children: [
      { label: "Notebooks", href: "/collections/notebooks" },
      { label: "Pens & Pencils", href: "/collections/pens" },
      { label: "Desk Accessories", href: "/collections/desk" },
    ],
  },
  {
    label: "Cool Tools",
    href: "/collections/cool-tools",
    children: [
      { label: "Multi-Tools", href: "/collections/multi-tools" },
      { label: "Garden Tools", href: "/collections/garden" },
      { label: "Workshop", href: "/collections/workshop" },
    ],
  },
  {
    label: "Gifts",
    href: "/collections/gifts",
    children: [
      { label: "Under $25", href: "/collections/gifts-under-25" },
      { label: "Under $50", href: "/collections/gifts-under-50" },
      { label: "For Her", href: "/collections/gifts-for-her" },
      { label: "For Him", href: "/collections/gifts-for-him" },
      { label: "For Kids", href: "/collections/gifts-for-kids" },
    ],
  },
];
