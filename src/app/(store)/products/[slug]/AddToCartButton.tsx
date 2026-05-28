"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";

export default function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={product.stock_quantity === 0}
      style={{
        marginTop: "24px",
        width: "100%",
        height: "52px",
        background: product.stock_quantity === 0 ? "#ccc" : "#7B189F",
        color: "white",
        border: "none",
        borderRadius: "4px",
        fontSize: "15px",
        fontWeight: 700,
        cursor: product.stock_quantity === 0 ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        letterSpacing: "0.02em",
        transition: "background 150ms",
      }}
    >
      {product.stock_quantity === 0 ? (
        "Out of Stock"
      ) : added ? (
        <>
          <Check size={18} /> Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart size={18} /> Add to Cart
        </>
      )}
    </button>
  );
}
