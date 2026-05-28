"use client";

import Link from "next/link";

interface CategoryTile {
  label: string;
  href: string;
  imageSrc: string;
  dark?: boolean;
}

const TILES: CategoryTile[] = [
  {
    label: "Gifts",
    href: "/collections/gifts",
    imageSrc: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80",
    dark: true,
  },
  {
    label: "Kitchen",
    href: "/collections/kitchen",
    imageSrc: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    dark: true,
  },
  {
    label: "Home Decor",
    href: "/collections/home-decor",
    imageSrc: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    dark: true,
  },
  {
    label: "Gadgets",
    href: "/collections/gadgets",
    imageSrc: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80",
    dark: true,
  },
  {
    label: "Wellness",
    href: "/collections/wellness",
    imageSrc: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
    dark: true,
  },
  {
    label: "Outdoor",
    href: "/collections/outdoor",
    imageSrc: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    dark: true,
  },
];

export default function CategoryGrid() {
  return (
    <section style={{ padding: "48px 0" }}>
      <div className="container-site">
        <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "24px", color: "#212121" }}>
          Shop by Category
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          {TILES.map((tile) => (
            <Link
              key={tile.href}
              href={tile.href}
              style={{
                position: "relative",
                display: "block",
                paddingBottom: "65%",
                overflow: "hidden",
                background: "#222",
              }}
              onMouseEnter={(e) => {
                const img = (e.currentTarget as HTMLAnchorElement).querySelector("img") as HTMLImageElement | null;
                if (img) img.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                const img = (e.currentTarget as HTMLAnchorElement).querySelector("img") as HTMLImageElement | null;
                if (img) img.style.transform = "scale(1)";
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tile.imageSrc}
                alt={tile.label}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 400ms ease",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                }}
              >
                {tile.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
