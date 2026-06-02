import HeroCarousel from "@/components/home/HeroCarousel";
import CategoryCircles from "@/components/home/CategoryCircles";
import CategoryGrid from "@/components/home/CategoryGrid";
import OccasionTiles from "@/components/home/OccasionTiles";
import ProductCarousel from "@/components/product/ProductCarousel";
import { getProducts } from "@/lib/products";
import Link from "next/link";

export default async function HomePage() {
  const [featured, newArrivals, bestSellers] = await Promise.all([
    getProducts({ featured: true, limit: 12 }),
    getProducts({ limit: 12 }),
    getProducts({ tag: "best-seller", limit: 12 }),
  ]);

  return (
    <>
      <HeroCarousel />

      {/* Value props bar */}
      <div style={{ background: "#F9F9F9", borderBottom: "1px solid #E5E5E5", padding: "12px 0" }}>
        <div
          className="container-site"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "8px",
          }}
        >
          {[
            { icon: "🚚", text: "Free shipping over $35" },
            { icon: "↩️", text: "Easy 30-day returns" },
            { icon: "⭐", text: "100,000+ happy customers" },
            { icon: "💳", text: "Secure checkout" },
          ].map((v) => (
            <div
              key={v.text}
              className="flex items-center justify-center"
              style={{ gap: "8px", fontSize: "13px", fontWeight: 500, color: "#444" }}
            >
              <span style={{ fontSize: "16px" }}>{v.icon}</span>
              {v.text}
            </div>
          ))}
        </div>
      </div>

      {/* Category circles */}
      <CategoryCircles />

      {/* Divider */}
      <div style={{ borderTop: "1px solid #F0F0F0" }} />

      {featured.length > 0 && (
        <ProductCarousel
          products={featured}
          heading="Featured Picks"
          shopAllHref="/collections/new"
        />
      )}

      {/* Editorial category grid */}
      <CategoryGrid />

      {/* Purple promo banner */}
      <div style={{ background: "#7B189F", padding: "56px 16px", textAlign: "center" }}>
        <div className="container-site">
          <p style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>
            Limited Time
          </p>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, color: "white", marginBottom: "12px" }}>
            Summer Sale — Up to 70% Off
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", marginBottom: "28px" }}>
            Shop our biggest sale of the year. New markdowns added daily.
          </p>
          <Link
            href="/collections/sale"
            style={{
              display: "inline-block",
              background: "white",
              color: "#7B189F",
              padding: "14px 36px",
              borderRadius: "4px",
              fontSize: "15px",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            Shop the Sale
          </Link>
        </div>
      </div>

      <ProductCarousel
        products={newArrivals}
        heading="New Arrivals"
        shopAllHref="/collections/new"
      />

      {bestSellers.length > 0 && (
        <ProductCarousel
          products={bestSellers}
          heading="Best Sellers"
          shopAllHref="/collections/best-sellers"
        />
      )}

      <OccasionTiles />
    </>
  );
}
