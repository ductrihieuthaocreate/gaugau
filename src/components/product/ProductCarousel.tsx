"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import type { Product } from "@/types";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
  heading?: string;
  shopAllHref?: string;
}

export default function ProductCarousel({ products, heading, shopAllHref }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const CARD_WIDTH = 220;
  const SCROLL_BY = CARD_WIDTH * 3;

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? SCROLL_BY : -SCROLL_BY, behavior: "smooth" });
    setTimeout(updateArrows, 350);
  };

  if (!products.length) return null;

  return (
    <section style={{ padding: "40px 0", overflow: "hidden" }}>
      <div className="container-site">
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          {heading && (
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#212121", margin: 0 }}>
              {heading}
            </h2>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {shopAllHref && (
              <Link
                href={shopAllHref}
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#7B189F",
                  textDecoration: "none",
                }}
              >
                Shop All →
              </Link>
            )}
            {/* Arrow buttons */}
            <div style={{ display: "flex", gap: "6px" }}>
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                style={{
                  width: "36px",
                  height: "36px",
                  border: "1px solid #D1D5DB",
                  borderRadius: "50%",
                  background: canScrollLeft ? "white" : "#F9FAFB",
                  cursor: canScrollLeft ? "pointer" : "default",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: canScrollLeft ? "#212121" : "#D1D5DB",
                  transition: "all 150ms",
                  flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                style={{
                  width: "36px",
                  height: "36px",
                  border: "1px solid #D1D5DB",
                  borderRadius: "50%",
                  background: canScrollRight ? "white" : "#F9FAFB",
                  cursor: canScrollRight ? "pointer" : "default",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: canScrollRight ? "#212121" : "#D1D5DB",
                  transition: "all 150ms",
                  flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable track — bleeds past container on the right */}
      <div style={{ position: "relative" }}>
        <div
          ref={trackRef}
          onScroll={updateArrows}
          style={{
            display: "flex",
            gap: "12px",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            paddingLeft: "var(--container-pad, 16px)",
            paddingRight: "var(--container-pad, 16px)",
            paddingBottom: "4px",
          }}
          // Hide scrollbar in Webkit
          className="hide-scrollbar"
        >
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                flex: "0 0 220px",
                scrollSnapAlign: "start",
                minWidth: 0,
              }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
        {/* Right fade */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "80px",
            background: "linear-gradient(to left, white 20%, transparent)",
            pointerEvents: "none",
          }}
        />
      </div>
    </section>
  );
}
