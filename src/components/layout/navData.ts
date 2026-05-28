export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: "New Arrivals", href: "/collections/new" },
  { label: "Best Sellers", href: "/collections/best-sellers" },
  {
    label: "Gifts",
    href: "/collections/gifts",
    children: [
      { label: "Under $25",    href: "/collections/gifts-under-25" },
      { label: "Under $50",    href: "/collections/gifts-under-50" },
      { label: "Birthday",     href: "/collections/birthday" },
      { label: "Housewarming", href: "/collections/housewarming" },
      { label: "For Him",      href: "/collections/gifts-for-him" },
      { label: "For Her",      href: "/collections/gifts-for-her" },
    ],
  },
  {
    label: "Kitchen",
    href: "/collections/kitchen",
    children: [
      { label: "Gadgets & Tools",   href: "/collections/kitchen-gadgets" },
      { label: "Drinkware",         href: "/collections/drinkware" },
      { label: "Food & Entertaining", href: "/collections/entertaining" },
      { label: "Storage",           href: "/collections/kitchen-storage" },
    ],
  },
  {
    label: "Home Decor",
    href: "/collections/home-decor",
    children: [
      { label: "Desk & Office",  href: "/collections/desk-office" },
      { label: "Wall Art",       href: "/collections/wall-art" },
      { label: "Candles & Scent", href: "/collections/candles" },
      { label: "Planters",       href: "/collections/planters" },
    ],
  },
  {
    label: "Gadgets",
    href: "/collections/gadgets",
    children: [
      { label: "Tech & Electronics", href: "/collections/tech" },
      { label: "Travel",             href: "/collections/travel" },
      { label: "Desk Toys",          href: "/collections/desk-toys" },
    ],
  },
  {
    label: "Wellness",
    href: "/collections/wellness",
    children: [
      { label: "Spa & Self-Care", href: "/collections/spa" },
      { label: "Fitness",         href: "/collections/fitness" },
      { label: "Sleep",           href: "/collections/sleep" },
    ],
  },
  {
    label: "Kids & Pets",
    href: "/collections/kids-and-pets",
    children: [
      { label: "Toys & Games", href: "/collections/toys" },
      { label: "Kids Decor",   href: "/collections/kids-decor" },
      { label: "Pets",         href: "/collections/pets" },
    ],
  },
  { label: "Outdoor",     href: "/collections/outdoor" },
  { label: "Organization", href: "/collections/organization" },
  { label: "Holiday",     href: "/collections/holiday" },
];
