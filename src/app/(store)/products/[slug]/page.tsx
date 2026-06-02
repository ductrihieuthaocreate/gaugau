import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";
import ProductCard from "@/components/product/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return { title: `${product.title} - go2go`, description: product.description };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product, 4);

  const img = product.images?.[0];
  const hasCompare = product.compare_at_price && product.compare_at_price > product.price;
  const discount = hasCompare
    ? Math.round((1 - product.price / product.compare_at_price!) * 100)
    : 0;

  return (
    <div className="container-site" style={{ padding: "32px var(--container-pad) 64px" }}>
      {/* Breadcrumb */}
      <nav style={{ fontSize: "13px", color: "#888", marginBottom: "24px" }}>
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
        {" / "}
        {product.category && (
          <>
            <Link href={`/collections/${product.category.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
              {product.category.name}
            </Link>
            {" / "}
          </>
        )}
        <span style={{ color: "#212121" }}>{product.title}</span>
      </nav>

      {/* Main product layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "40px",
        }}
        className="md:grid-cols-2"
      >
        {/* Images */}
        <div>
          <div
            style={{
              position: "relative",
              paddingBottom: "100%",
              background: "#F5F5F5",
              overflow: "hidden",
            }}
          >
            {img?.url ? (
              <Image
                src={img.url}
                alt={img.alt ?? product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                priority
              />
            ) : (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#aaa",
                  fontSize: "14px",
                }}
              >
                No image
              </div>
            )}
            {discount >= 10 && (
              <span
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  background: "#990E35",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: "2px",
                }}
              >
                {discount}% OFF
              </span>
            )}
          </div>

          {product.images && product.images.length > 1 && (
            <div className="flex" style={{ gap: "8px", marginTop: "12px" }}>
              {product.images.slice(0, 5).map((pImg, i) => (
                <div
                  key={i}
                  style={{
                    width: "72px",
                    height: "72px",
                    position: "relative",
                    background: "#F5F5F5",
                    border: i === 0 ? "2px solid #7B189F" : "2px solid transparent",
                    cursor: "pointer",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={pImg.url}
                    alt={pImg.alt ?? `${product.title} ${i + 1}`}
                    fill
                    sizes="72px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {product.category && (
            <Link
              href={`/collections/${product.category.slug}`}
              style={{ fontSize: "12px", color: "#7B189F", textDecoration: "none", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}
            >
              {product.category.name}
            </Link>
          )}

          <h1 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, marginTop: "8px", lineHeight: 1.2, color: "#212121" }}>
            {product.title}
          </h1>

          {/* Stars */}
          <div className="flex items-center" style={{ gap: "4px", marginTop: "12px" }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={14} fill={i <= 4 ? "#F59E0B" : "none"} color={i <= 4 ? "#F59E0B" : "#ccc"} />
            ))}
            <span style={{ fontSize: "13px", color: "#888", marginLeft: "6px" }}>4.0 (24 reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline" style={{ gap: "10px", marginTop: "16px" }}>
            <span style={{ fontSize: "28px", fontWeight: 700, color: "#212121" }}>
              ${(product.price / 100).toFixed(2)}
            </span>
            {hasCompare && (
              <span style={{ fontSize: "18px", color: "#999", textDecoration: "line-through" }}>
                ${(product.compare_at_price! / 100).toFixed(2)}
              </span>
            )}
            {discount >= 10 && (
              <span style={{ fontSize: "14px", fontWeight: 700, color: "#990E35" }}>
                Save {discount}%
              </span>
            )}
          </div>

          {product.stock_quantity <= 10 && product.stock_quantity > 0 && (
            <p style={{ fontSize: "13px", color: "#990E35", marginTop: "8px", fontWeight: 600 }}>
              Only {product.stock_quantity} left in stock
            </p>
          )}

          {/* Description */}
          {product.description && (
            <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.6", marginTop: "20px" }}>
              {product.description}
            </p>
          )}

          <AddToCartButton product={product} />

          {/* Trust badges */}
          <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { Icon: Truck, text: "Free shipping on orders over $35" },
              { Icon: RotateCcw, text: "Easy 30-day returns" },
              { Icon: ShieldCheck, text: "Secure checkout" },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center" style={{ gap: "10px", fontSize: "13px", color: "#555" }}>
                <Icon size={16} color="#7B189F" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section style={{ marginTop: "64px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>You May Also Like</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
