"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

interface Slide {
  img: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
  ctaBg?: string;
}

const SLIDES: Slide[] = [
  {
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=80",
    eyebrow: "Summer Sale",
    title: "Up to 70% Off\nFurniture & Decor",
    subtitle: "Shop our biggest sale of the year. New markdowns added daily.",
    ctaLabel: "Shop the Sale",
    ctaHref: "/collections/sale",
    ctaBg: "#990E35",
  },
  {
    img: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1400&q=80",
    eyebrow: "New Arrivals",
    title: "Fresh Picks for\nEvery Room",
    subtitle: "Discover the latest additions to our home collection.",
    ctaLabel: "Shop New Arrivals",
    ctaHref: "/collections/new",
    ctaBg: "#7B189F",
  },
  {
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=80",
    eyebrow: "Editor's Picks",
    title: "Curated Gifts\nThey'll Love",
    subtitle: "Thoughtfully chosen presents for every occasion.",
    ctaLabel: "Shop Gift Ideas",
    ctaHref: "/collections/gifts-under-25",
    ctaBg: "#7B189F",
  },
  {
    img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1400&q=80",
    eyebrow: "Best Sellers",
    title: "Customer\nFavorites",
    subtitle: "The products thousands of happy customers keep buying.",
    ctaLabel: "Shop Best Sellers",
    ctaHref: "/collections/best-sellers",
    ctaBg: "#7B189F",
  },
  {
    img: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=1400&q=80",
    eyebrow: "Housewarming",
    title: "Gifts for\nNew Homes",
    subtitle: "Everything they need to make their new space feel like home.",
    ctaLabel: "Shop Housewarming",
    ctaHref: "/collections/housewarming",
    ctaBg: "#7B189F",
  },
];

const AUTOPLAY_MS = 9000;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);
  const goTo = useCallback((i: number) => { setCurrent(i); setPaused(true); }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, next]);

  const slide = SLIDES[current];

  return (
    <section
      aria-label="Hero carousel"
      style={{ position: "relative", width: "100%", height: "clamp(380px, 52vw, 580px)", overflow: "hidden", background: "#1a1a1a" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          aria-hidden={i !== current}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === current ? 1 : 0,
            transition: "opacity 700ms ease",
            pointerEvents: i === current ? "auto" : "none",
          }}
        >
          <Image
            src={s.img}
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority={i === 0}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%)" }} />
        </div>
      ))}

      {/* Content */}
      <div
        className="container-site"
        style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", alignItems: "center", padding: "0 var(--container-pad, 16px)" }}
      >
        <div style={{ maxWidth: "520px" }}>
          {slide.eyebrow && (
            <p style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.75)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>
              {slide.eyebrow}
            </p>
          )}
          <h1
            style={{
              fontSize: "clamp(28px, 4.5vw, 52px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: "14px",
              whiteSpace: "pre-line",
            }}
          >
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p style={{ fontSize: "clamp(14px, 1.8vw, 17px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.5, marginBottom: "28px" }}>
              {slide.subtitle}
            </p>
          )}
          <Link
            href={slide.ctaHref}
            style={{
              display: "inline-block",
              background: slide.ctaBg ?? "#7B189F",
              color: "white",
              padding: "14px 32px",
              borderRadius: "4px",
              fontSize: "15px",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            {slide.ctaLabel}
          </Link>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        style={{
          position: "absolute",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.92)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        style={{
          position: "absolute",
          right: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.92)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          gap: "8px",
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i === current ? "white" : "rgba(255,255,255,0.5)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 300ms ease",
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!paused && (
        <div
          key={current}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "3px",
            background: "#7B189F",
            animation: `heroProgress ${AUTOPLAY_MS}ms linear forwards`,
            zIndex: 3,
          }}
        />
      )}

      <style>{`
        @keyframes heroProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
