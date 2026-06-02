"use client";

import { useRef, useState } from "react";
import Link from "next/link";

const CATS = [
  { label: "Bedroom", href: "/collections/bedroom", img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=300&q=80" },
  { label: "Living Room", href: "/collections/living-room", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80" },
  { label: "Kitchen", href: "/collections/kitchen", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=80" },
  { label: "Bathroom", href: "/collections/bathroom", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=300&q=80" },
  { label: "Outdoor", href: "/collections/outdoor", img: "https://images.unsplash.com/photo-1600210491892-03d54079b6ac?w=300&q=80" },
  { label: "Office", href: "/collections/office", img: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=300&q=80" },
  { label: "Kids", href: "/collections/kids", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80" },
  { label: "Sale", href: "/collections/sale", img: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=300&q=80" },
];

export default function CategoryCircles() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section style={{ padding: "32px 0 24px" }}>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "0",
          overflowX: "auto",
          scrollbarWidth: "none",
          paddingLeft: "var(--container-pad, 16px)",
          paddingRight: "var(--container-pad, 16px)",
        }}
        className="hide-scrollbar"
      >
        {CATS.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            onMouseEnter={() => setHovered(cat.label)}
            onMouseLeave={() => setHovered(null)}
            style={{
              flex: "0 0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              padding: "0 16px",
              textDecoration: "none",
            }}
          >
            {/* Circle image */}
            <div
              style={{
                width: "88px",
                height: "88px",
                borderRadius: "50%",
                overflow: "hidden",
                border: hovered === cat.label ? "2px solid #7B189F" : "2px solid transparent",
                transition: "border-color 150ms",
                flexShrink: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.img}
                alt={cat.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: hovered === cat.label ? "scale(1.08)" : "scale(1)",
                  transition: "transform 350ms ease",
                }}
              />
            </div>
            <span
              style={{
                fontSize: "12px",
                fontWeight: hovered === cat.label ? 700 : 500,
                color: hovered === cat.label ? "#7B189F" : "#212121",
                textAlign: "center",
                whiteSpace: "nowrap",
                transition: "color 150ms, font-weight 150ms",
              }}
            >
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
