import { notFound } from "next/navigation";
import { getProducts, getCategories } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

const SLUG_LABELS: Record<string, string> = {
  "new": "New Arrivals",
  "best-sellers": "Best Sellers",
  "sale": "Sale",
  "gifts": "Gifts",
  "gifts-under-25": "Gifts Under $25",
  "gifts-under-50": "Gifts Under $50",
  "birthday": "Birthday Gifts",
  "housewarming": "Housewarming",
  "gifts-for-him": "Gifts for Him",
  "gifts-for-her": "Gifts for Her",
  "kitchen": "Kitchen",
  "kitchen-gadgets": "Kitchen Gadgets & Tools",
  "drinkware": "Drinkware",
  "entertaining": "Food & Entertaining",
  "kitchen-storage": "Kitchen Storage",
  "home-decor": "Home Decor",
  "desk-office": "Desk & Office",
  "wall-art": "Wall Art",
  "candles": "Candles & Scent",
  "planters": "Planters",
  "gadgets": "Gadgets",
  "tech": "Tech & Electronics",
  "travel": "Travel",
  "desk-toys": "Desk Toys",
  "wellness": "Wellness",
  "spa": "Spa & Self-Care",
  "fitness": "Fitness",
  "sleep": "Sleep",
  "kids-and-pets": "Kids & Pets",
  "toys": "Toys & Games",
  "kids-decor": "Kids Decor",
  "pets": "Pets",
  "outdoor": "Outdoor",
  "organization": "Organization",
  "holiday": "Holiday",
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const label = SLUG_LABELS[slug] ?? slug.replace(/-/g, " ");
  return { title: `${label} — go2go` };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const label = SLUG_LABELS[slug] ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const [products, categories] = await Promise.all([
    getProducts({ categorySlug: slug, limit: 48 }),
    getCategories(),
  ]);

  return (
    <div className="container-site" style={{ padding: "32px var(--container-pad) 64px" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px", borderBottom: "1px solid #E5E5E5", paddingBottom: "24px" }}>
        <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 700, color: "#212121" }}>
          {label}
        </h1>
        {products.length > 0 && (
          <p style={{ fontSize: "13px", color: "#888", marginTop: "6px" }}>
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        )}
      </div>

      {/* Category nav pills */}
      {categories.length > 0 && (
        <div className="flex flex-wrap" style={{ gap: "8px", marginBottom: "28px" }}>
          {categories.map((cat: { id: string; slug: string; name: string }) => (
            <a
              key={cat.id}
              href={`/collections/${cat.slug}`}
              style={{
                padding: "6px 14px",
                border: `1px solid ${cat.slug === slug ? "#7B189F" : "#E5E5E5"}`,
                borderRadius: "4px",
                fontSize: "13px",
                fontWeight: cat.slug === slug ? 700 : 400,
                color: cat.slug === slug ? "#7B189F" : "#555",
                background: cat.slug === slug ? "#f3e8fb" : "#fff",
                textDecoration: "none",
                transition: "border-color 150ms",
              }}
            >
              {cat.name}
            </a>
          ))}
        </div>
      )}

      {products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0", color: "#888" }}>
          <p style={{ fontSize: "18px", marginBottom: "8px" }}>No products found</p>
          <p style={{ fontSize: "14px" }}>Check back soon — we&apos;re adding new items all the time.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
