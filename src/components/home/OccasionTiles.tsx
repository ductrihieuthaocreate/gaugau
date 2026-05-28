"use client";

import Link from "next/link";

const TILES = [
  {
    label: "Gifts Under $25",
    sub: "Perfect finds for every budget",
    href: "/collections/gifts-under-25",
    img: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&q=80",
  },
  {
    label: "Birthday Gifts",
    sub: "Make their day unforgettable",
    href: "/collections/birthday",
    img: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&q=80",
  },
  {
    label: "Housewarming",
    sub: "Thoughtful gifts for new homes",
    href: "/collections/housewarming",
    img: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&q=80",
  },
];

export default function OccasionTiles() {
  return (
    <section style={{ padding: "48px 0" }}>
      <div className="container-site">
        <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "24px", color: "#212121" }}>
          Shop by Occasion
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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
                paddingBottom: "70%",
                overflow: "hidden",
                background: "#222",
                textDecoration: "none",
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
                src={tile.img}
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
                  background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%)",
                }}
              />
              <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
                <p style={{ fontSize: "18px", fontWeight: 700, color: "white", marginBottom: "4px" }}>
                  {tile.label}
                </p>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>{tile.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
