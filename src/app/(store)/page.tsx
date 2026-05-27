import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/products";
import { getHeroSettings } from "@/lib/settings";
import { HeroBanner } from "@/components/home/HeroBanner";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CategoryGrid } from "@/components/home/CategoryGrid";

/* ── Static promo tiles ── */
const PROMO_TILES = [
  {
    label: "Gifts Under $25",
    sub: "Perfect for any occasion",
    href: "/collections/gifts-under-25",
    bg: "#EDE9FE",
    color: "#5B21B6",
    imageSrc: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80",
  },
  {
    label: "New Arrivals",
    sub: "Fresh designs just landed",
    href: "/collections/new",
    bg: "#FEF3C7",
    color: "#92400E",
    imageSrc: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
  },
  {
    label: "For the Home",
    sub: "Decor they'll actually use",
    href: "/collections/home",
    bg: "#D1FAE5",
    color: "#065F46",
    imageSrc: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
  {
    label: "Trending Now",
    sub: "Our most-loved picks",
    href: "/collections/best-sellers",
    bg: "#FCE7F3",
    color: "#9D174D",
    imageSrc: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80",
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

const VALUE_PROPS = [
  {
    icon: "🚚",
    title: "Free Shipping",
    body: "On all US orders over $35.",
  },
  {
    icon: "🎁",
    title: "Gift-Ready Packaging",
    body: "Every order ships beautifully wrapped — no extras needed.",
  },
  {
    icon: "✨",
    title: "Curated by Designers",
    body: "Every product is hand-picked for function and beauty.",
  },
  {
    icon: "↩️",
    title: "Easy Returns",
    body: "30-day hassle-free returns on all orders.",
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

      {/* ── 2. Promo tiles 2×2 ── */}
      <section className="py-8 md:py-12 border-b border-gray-100">
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {PROMO_TILES.map((tile) => (
              <Link
                key={tile.label}
                href={tile.href}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] flex flex-col justify-end p-4 md:p-5"
                style={{ background: tile.bg }}
              >
                <Image
                  src={tile.imageSrc}
                  alt={tile.label}
                  fill
                  className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="relative z-10">
                  <p className="text-[11px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: tile.color }}>
                    {tile.sub}
                  </p>
                  <h3 className="font-bold text-base md:text-lg leading-tight" style={{ color: tile.color }}>
                    {tile.label}
                  </h3>
                  <p className="text-[12px] font-semibold mt-1 group-hover:underline" style={{ color: tile.color }}>
                    Shop Now →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. New Arrivals ── */}
      <ProductGrid
        products={newArrivals}
        title="New Arrivals"
        viewAllHref="/collections/new"
        columns={4}
      />

      {/* ── 4. Shop by Occasion ── */}
      <CategoryGrid title="Shop by Occasion" categories={OCCASION_TILES} />

      {/* ── 5. Mid-page sale banner ── */}
      <section className="py-10 md:py-14" style={{ background: "var(--brand)" }}>
        <div className="container-site text-center">
          <p className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-2">
            Limited Time
          </p>
          <h2 className="text-white font-black text-3xl md:text-4xl mb-4" style={{ letterSpacing: "-0.01em" }}>
            Up to 40% Off Sale Items
          </h2>
          <p className="text-white/80 text-sm mb-6">
            Clearance on selected design favourites. While stocks last.
          </p>
          <Link
            href="/collections/sale"
            className="inline-flex items-center gap-2 bg-white font-bold px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors"
            style={{ color: "var(--brand)", fontSize: "14px", letterSpacing: "0.04em" }}
          >
            Shop the Sale →
          </Link>
        </div>
      </section>

      {/* ── 6. Best Sellers ── */}
      <ProductGrid
        products={bestSellers}
        title="Best Sellers"
        viewAllHref="/collections/best-sellers"
        columns={4}
      />

      {/* ── 7. Value props strip ── */}
      <section className="py-10 md:py-14 border-t border-gray-100 bg-gray-50">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {VALUE_PROPS.map((prop) => (
              <div key={prop.title} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{ background: "var(--brand-light)" }}>
                  {prop.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 mb-1">{prop.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{prop.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
