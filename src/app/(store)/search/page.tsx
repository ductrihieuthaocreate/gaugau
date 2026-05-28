import { getProducts } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props) {
  const { q } = await searchParams;
  return { title: q ? `Search: "${q}" — go2go` : "Search — go2go" };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const products = query ? await getProducts({ search: query, limit: 48 }) : [];

  return (
    <div className="container-site" style={{ padding: "32px var(--container-pad) 64px" }}>
      <h1 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, marginBottom: "8px" }}>
        {query ? `Search results for "${query}"` : "Search"}
      </h1>
      {query && (
        <p style={{ fontSize: "13px", color: "#888", marginBottom: "28px" }}>
          {products.length} {products.length === 1 ? "result" : "results"}
        </p>
      )}

      {!query && (
        <div style={{ marginTop: "60px", textAlign: "center", color: "#888" }}>
          <p style={{ fontSize: "16px" }}>Enter a search term above to find products.</p>
        </div>
      )}

      {query && products.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>
          <p style={{ fontSize: "18px", marginBottom: "8px" }}>No results for &quot;{query}&quot;</p>
          <p style={{ fontSize: "14px" }}>Try checking your spelling or using more general terms.</p>
        </div>
      )}

      {products.length > 0 && (
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
