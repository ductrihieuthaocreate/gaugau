"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const img = product.images?.[0];
  const hasCompare = product.compare_at_price && product.compare_at_price > product.price;
  const discount = hasCompare
    ? Math.round((1 - product.price / product.compare_at_price!) * 100)
    : 0;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", background: "#fff" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Image */}
      <Link
        href={`/products/${product.slug}`}
        style={{ display: "block", position: "relative", paddingBottom: "100%", background: "#F5F5F5", overflow: "hidden" }}
      >
        {img?.url ? (
          <Image
            src={img.url}
            alt={img.alt ?? product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            style={{ objectFit: "cover", transition: "transform 350ms ease" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#E8E8E8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              color: "#aaa",
            }}
          >
            No image
          </div>
        )}

        {discount >= 10 && (
          <span
            style={{
              position: "absolute",
              top: "8px",
              left: "8px",
              background: "#990E35",
              color: "white",
              fontSize: "11px",
              fontWeight: 700,
              padding: "2px 7px",
              borderRadius: "2px",
            }}
          >
            {discount}% OFF
          </span>
        )}
      </Link>

      {/* Info */}
      <div style={{ padding: "10px 0 12px", flex: 1, display: "flex", flexDirection: "column" }}>
        {product.category && (
          <p style={{ fontSize: "11px", color: "#888", marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            {product.category.name}
          </p>
        )}

        <Link
          href={`/products/${product.slug}`}
          style={{
            fontSize: "13px",
            color: "#212121",
            textDecoration: "none",
            fontWeight: 500,
            lineHeight: "1.35",
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.title}
        </Link>

        {/* Stars */}
        <div className="flex items-center" style={{ gap: "2px", marginTop: "6px" }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={11}
              fill={i <= 4 ? "#F59E0B" : "none"}
              color={i <= 4 ? "#F59E0B" : "#ccc"}
            />
          ))}
          <span style={{ fontSize: "11px", color: "#888", marginLeft: "4px" }}>(24)</span>
        </div>

        {/* Price + cart */}
        <div className="flex items-center justify-between" style={{ marginTop: "8px" }}>
          <div className="flex items-baseline" style={{ gap: "6px" }}>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#212121" }}>
              ${(product.price / 100).toFixed(2)}
            </span>
            {hasCompare && (
              <span style={{ fontSize: "12px", color: "#999", textDecoration: "line-through" }}>
                ${(product.compare_at_price! / 100).toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={() => addItem(product)}
            title="Add to cart"
            style={{
              width: "32px",
              height: "32px",
              background: "#7B189F",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <ShoppingCart size={15} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}
