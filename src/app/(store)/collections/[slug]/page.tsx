import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { SortSelect } from "@/components/collections/SortSelect";
import { getProducts, getCategoryBySlug } from "@/lib/products";
import type { Product } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string; page?: string }>;
}

function sortProducts(products: Product[], sort: string) {
  const copy = [...products];
  if (sort === "price-asc") return copy.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return copy.sort((a, b) => b.price - a.price);
  return copy;
}

// Special slugs that don't need a DB category
const VALID_SLUGS = [
  "new",
  "best-sellers",
  "play",
  "home",
  "kitchen",
  "wellness",
  "on-the-go",
  "tech",
  "stationery",
  "cool-tools",
  "gifts",
  "sale",
  "designer",
  "games",
  "puzzles",
  "toys",
  "outdoor",
  "decor",
  "storage",
  "clocks",
  "lighting",
  "kitchen-gadgets",
  "tableware",
  "bar-wine",
  "cooking",
  "self-care",
  "fitness",
  "relaxation",
  "travel",
  "bags",
  "outdoors",
  "tech-gadgets",
  "tech-accessories",
  "cables",
  "notebooks",
  "pens",
  "desk",
  "multi-tools",
  "garden",
  "workshop",
  "gifts-under-25",
  "gifts-under-50",
  "gifts-for-her",
  "gifts-for-him",
  "gifts-for-kids",
];

export default async function CollectionPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { sort = "newest" } = await searchParams;

  const category = await getCategoryBySlug(slug);

  if (!VALID_SLUGS.includes(slug) && !category) notFound();

  let products = await getProducts({
    categorySlug:
      slug === "new" || slug === "best-sellers" || slug === "sale"
        ? undefined
        : slug,
    tag: slug === "new" ? "new" : undefined,
    featured: slug === "best-sellers" ? true : undefined,
    limit: 100,
  });

  // For sale, filter client-side since there's no tag
  if (slug === "sale") {
    products = products.filter((p) => p.compare_at_price !== null);
  }

  products = sortProducts(products, sort);

  const title =
    category?.name ||
    (slug === "new"
      ? "New Arrivals"
      : slug === "best-sellers"
        ? "Best Sellers"
        : slug === "sale"
          ? "On Sale"
          : slug
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase()));

  return (
    <div className="min-h-screen">
      {/* Collection header */}
      <div className="bg-[#f1f1f1] py-10">
        <div className="container-site">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
            Collections
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            {title}
          </h1>
          <p className="text-sm text-gray-600 mt-2">{products.length} products</p>
        </div>
      </div>

      {/* Sort bar */}
      <div className="border-b border-gray-200 sticky top-16 bg-white z-10">
        <div className="container-site py-3 flex items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            Showing <strong>{products.length}</strong> results
          </p>
          <SortSelect current={sort} />
        </div>
      </div>

      {/* Products grid */}
      <div className="container-site py-8">
        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg font-medium mb-2">No products found</p>
            <p className="text-sm">Try browsing a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${title} — Gaugau`,
    description: `Shop our ${title} collection — playful, functional, beautifully designed.`,
  };
}
