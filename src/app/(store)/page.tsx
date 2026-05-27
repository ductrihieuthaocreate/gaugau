import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/products";
import { getHeroSettings } from "@/lib/settings";
import { HeroBanner } from "@/components/home/HeroBanner";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CategoryGrid } from "@/components/home/CategoryGrid";

/* ── Editorial promo tiles (dark-overlay, Wayfair style) ── */
const PROMO_TILES = [
  {
    label: "Gifts Under $25",
    href: "/collections/gifts-under-25",
    imageSrc: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
  },
  {
    label: "New Arrivals",
    href: "/collections/new",
    imageSrc: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
  },
  {
    label: "For the Home",
    href: "/collections/home",
    imageSrc: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  },
  {
    label: "Trending Now",
    href: "/collections/best-sellers",
    imageSrc: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
  },
];

/* ── "Shop by Occasion" tiles ── */
const OCCASION_TILES = [
  {
    name: "Birthday",
    href: "/collections/gifts",
    imageSrc: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    name: "Housewarming",
    href: "/collections/home",
    imageSrc: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
  {
    name: "Kitchen",
    href: "/collections/kitchen",
    imageSrc: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
  },
  {
    name: "Wellness",
    href: "/collections/wellness",
    imageSrc: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
  },
  {
    name: "Cool Tools",
    href: "/collections/cool-tools",
    imageSrc: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=600&q=80",
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
      {/* ── 1. Hero banner ── */}
      <HeroBanner
        title={hero.title}
        subtitle={hero.subtitle}
        ctaLabel={hero.ctaLabel}
        ctaHref={hero.ctaHref}
        imageSrc={hero.imageSrc}
        overlayOpacity={hero.overlayOpacity}
      />

      {/* ── 2. Editorial promo tiles — dark overlay, white text ── */}
      <section className="py-8 md:py-12 bg-white border-b border-gray-100">
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {PROMO_TILES.map((tile) => (
              <Link
                key={tile.label}
                href={tile.href}
                className="group relative overflow-hidden aspect-[4/3]"
                style={{ borderRadius: "4px" }}
              >
                <Image
                  src={tile.imageSrc}
                  alt={tile.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <h3 className="text-white font-bold text-sm md:text-base leading-tight">
                    {tile.label}
                  </h3>
                  <p className="text-white/80 text-xs mt-0.5 group-hover:underline">
                    Shop Now
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. New Arrivals ── */}
      <section className="bg-white border-b border-gray-100">
        <ProductGrid
          products={newArrivals}
          title="New Arrivals"
          viewAllHref="/collections/new"
          columns={4}
        />
      </section>

      {/* ── 4. Shop by Occasion ── */}
      <section className="bg-white border-b border-gray-100">
        <CategoryGrid title="Shop by Occasion" categories={OCCASION_TILES} />
      </section>

      {/* ── 5. Best Sellers ── */}
      <section className="bg-white border-b border-gray-100">
        <ProductGrid
          products={bestSellers}
          title="Best Sellers"
          viewAllHref="/collections/best-sellers"
          columns={4}
        />
      </section>

      {/* ── 6. Wide editorial banner — image + text side by side ── */}
      <section className="py-10 md:py-14 bg-white border-b border-gray-100">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-0 overflow-hidden" style={{ borderRadius: "4px" }}>
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[320px]">
              <Image
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&q=80"
                alt="Sale items"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="bg-gray-50 flex flex-col justify-center px-8 md:px-12 py-10">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                Limited Time
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">
                Up to 40% Off<br />Sale Items
              </h2>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Clearance on selected design favourites. While stocks last.
              </p>
              <Link
                href="/collections/sale"
                className="self-start inline-flex items-center gap-2 text-white font-bold px-6 py-3 text-sm hover:opacity-90 transition-opacity"
                style={{ background: "#7B189F", borderRadius: "4px" }}
              >
                Shop the Sale
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
