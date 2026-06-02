"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [wishlisted, setWishlisted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const img = product.images?.[0];
  const hasCompare = product.compare_at_price && product.compare_at_price > product.price;
  const discount = hasCompare
    ? Math.round((1 - product.price / product.compare_at_price!) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        border: hovered ? "1px solid #D1D5DB" : "1px solid transparent",
        transition: "border-color 150ms",
        position: "relative",
      }}
    >
      {/* Image area */}
      <Link href={`/products/${product.slug}`} style={{ display: "block", position: "relative" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1 / 1",
            background: "#F5F5F5",
            overflow: "hidden",
          }}
        >
          {img?.url ? (
            <Image
              src={img.url}
              alt={img.alt ?? product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              style={{
                objectFit: "cover",
                transform: hovered ? "scale(1.04)" : "scale(1)",
                transition: "transform 400ms ease",
              }}
            />
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                color: "#bbb",
              }}
            >
              No image
            </div>
          )}

          {/* Sale badge — top left */}
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
                padding: "3px 8px",
                borderRadius: "2px",
                zIndex: 1,
              }}
            >
              {discount}% OFF
            </span>
          )}

          {/* "30-Day Low Price" flag — shown when no discount */}
          {!hasCompare && product.featured && (
            <span
              style={{
                position: "absolute",
                top: "8px",
                left: "8px",
                background: "#7B189F",
                color: "white",
                fontSize: "10px",
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: "2px",
                zIndex: 1,
              }}
            >
              Editor&apos;s Pick
            </span>
          )}

          {/* Add to cart — appears on hover at bottom of image */}
          {hovered && product.stock_quantity > 0 && (
            <button
              onClick={handleAddToCart}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "40px",
                background: addedToCart ? "#059669" : "#7B189F",
                color: "white",
                border: "none",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                transition: "background 150ms",
                zIndex: 2,
              }}
            >
              <ShoppingCart size={14} />
              {addedToCart ? "Added!" : "Add to Cart"}
            </button>
          )}
        </div>
      </Link>

      {/* Wishlist heart — top right, always visible */}
      <button
        onClick={(e) => {
          e.preventDefault();
          setWishlisted((w) => !w);
        }}
        aria-label="Save to wishlist"
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          width: "30px",
          height: "30px",
          background: "white",
          border: "1px solid #E5E5E5",
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3,
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        }}
      >
        <Heart
          size={14}
          fill={wishlisted ? "#990E35" : "none"}
          color={wishlisted ? "#990E35" : "#888"}
        />
      </button>

      {/* Card body */}
      <div style={{ padding: "10px 4px 12px", flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
        {/* Brand / category label */}
        <p
          style={{
            fontSize: "11px",
            color: "#6B7280",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            margin: 0,
          }}
        >
          {product.category?.name ?? "go2go"}
        </p>

        {/* Title */}
        <Link
          href={`/products/${product.slug}`}
          style={{
            fontSize: "13px",
            color: "#212121",
            textDecoration: "none",
            lineHeight: "1.35",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            margin: 0,
          }}
        >
          {product.title}
        </Link>

        {/* Stars */}
        <div style={{ display: "flex", alignItems: "center", gap: "2px", marginTop: "2px" }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i <= 4 ? "#F59E0B" : "#E5E7EB"}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
          <span style={{ fontSize: "11px", color: "#6B7280", marginLeft: "3px" }}>24</span>
        </div>

        {/* Price row */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginTop: "2px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "15px", fontWeight: 700, color: "#212121" }}>
            ${(product.price / 100).toFixed(2)}
          </span>
          {hasCompare && (
            <>
              <span style={{ fontSize: "12px", color: "#9CA3AF", textDecoration: "line-through" }}>
                ${(product.compare_at_price! / 100).toFixed(2)}
              </span>
              <span style={{ fontSize: "11px", color: "#990E35", fontWeight: 700 }}>
                ({discount}% off)
              </span>
            </>
          )}
        </div>

        {/* Free shipping */}
        <p style={{ fontSize: "11px", color: "#059669", margin: 0, fontWeight: 500 }}>
          {product.price >= 3500 ? "FREE Shipping" : `FREE shipping over $35`}
        </p>
      </div>
    </div>
  );
}
