import Link from "next/link";
import type { Product } from "@/types";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
  heading?: string;
  shopAllHref?: string;
}

export default function ProductGrid({ products, heading, shopAllHref }: Props) {
  if (!products.length) return null;

  return (
    <section style={{ padding: "48px 0" }}>
      <div className="container-site">
        {(heading || shopAllHref) && (
          <div className="flex items-center justify-between" style={{ marginBottom: "24px" }}>
            {heading && (
              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#212121" }}>{heading}</h2>
            )}
            {shopAllHref && (
              <Link
                href={shopAllHref}
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#7B189F",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                Shop All →
              </Link>
            )}
          </div>
        )}
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
      </div>
    </section>
  );
}
