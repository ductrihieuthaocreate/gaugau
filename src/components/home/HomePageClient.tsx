"use client";

import { useAdminStore } from "@/store/adminStore";
import { HeroBanner } from "@/components/home/HeroBanner";
import { ProductGrid } from "@/components/product/ProductGrid";

export function HomePageClient() {
  const hero = useAdminStore((s) => s.hero);
  const products = useAdminStore((s) => s.products);

  const newArrivals = products.filter((p) => p.is_active && p.tags.includes("new")).slice(0, 8);

  return (
    <>
      <HeroBanner
        title={hero.title}
        subtitle={hero.subtitle}
        ctaLabel={hero.ctaLabel}
        ctaHref={hero.ctaHref}
        imageSrc={hero.imageSrc}
        overlayOpacity={hero.overlayOpacity}
      />
      <ProductGrid
        products={newArrivals}
        title="New Arrivals"
        viewAllHref="/collections/new"
        columns={4}
      />
    </>
  );
}

export function BestSellersClient() {
  const products = useAdminStore((s) => s.products);
  const bestSellers = products.filter((p) => p.is_active && p.tags.includes("best-seller")).slice(0, 8);

  return (
    <ProductGrid
      products={bestSellers}
      title="Best Sellers"
      viewAllHref="/collections/best-sellers"
      columns={4}
    />
  );
}
