import { getProducts } from "@/lib/products";
import { getHeroSettings } from "@/lib/settings";
import { HeroBanner } from "@/components/home/HeroBanner";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CategoryGrid } from "@/components/home/CategoryGrid";

const CATEGORY_TILES = [
  {
    name: "Play",
    href: "/collections/play",
    imageSrc:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    name: "Home",
    href: "/collections/home",
    imageSrc:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
  {
    name: "Kitchen",
    href: "/collections/kitchen",
    imageSrc:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
  },
  {
    name: "Wellness",
    href: "/collections/wellness",
    imageSrc:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
  },
  {
    name: "Tech",
    href: "/collections/tech",
    imageSrc:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
  },
];

const VALUE_PROPS = [
  {
    icon: "🚚",
    title: "Free Shipping",
    body: "On all US orders over $35. Fast, reliable delivery every time.",
  },
  {
    icon: "🎁",
    title: "Gift Ready",
    body: "Every product ships in beautiful packaging — no extra step needed.",
  },
  {
    icon: "♻️",
    title: "Thoughtfully Made",
    body: "Designed with care and crafted with sustainability in mind.",
  },
];

export default async function HomePage() {
  const [newArrivals, bestSellers, hero] = await Promise.all([
    getProducts({ tag: "new", limit: 8 }),
    getProducts({ featured: true, limit: 8 }),
    getHeroSettings(),
  ]);

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

      <CategoryGrid title="Shop by Category" categories={CATEGORY_TILES} />

      <ProductGrid
        products={bestSellers}
        title="Best Sellers"
        viewAllHref="/collections/best-sellers"
        columns={4}
      />

      {/* Value props */}
      <section className="py-14 md:py-20 border-t border-gray-100">
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-6">
            {VALUE_PROPS.map((prop) => (
              <div
                key={prop.title}
                className="flex flex-col items-center text-center gap-4 px-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#f4f4f4] flex items-center justify-center text-2xl">
                  {prop.icon}
                </div>
                <div>
                  <h3
                    className="font-bold uppercase mb-2"
                    style={{ fontSize: "12px", letterSpacing: "0.18em" }}
                  >
                    {prop.title}
                  </h3>
                  <p
                    className="text-gray-500 leading-relaxed"
                    style={{ fontSize: "14px" }}
                  >
                    {prop.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
