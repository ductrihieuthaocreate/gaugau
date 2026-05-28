"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { createStripeSession } from "@/lib/actions";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, totalItems } =
    useCartStore();

  const handleCheckout = async () => {
    try {
      const url = await createStripeSession(items, window.location.origin);
      window.location.href = url;
    } catch {
      alert("Checkout is currently unavailable. Please try again later.");
    }
  };

  if (!isOpen) return null;

  const total = subtotal();
  const count = totalItems();

  return (
    <>
      <div
        className="fixed inset-0 fade-in"
        style={{ background: "rgba(0,0,0,0.45)", zIndex: 300 }}
        onClick={closeCart}
      />

      <div
        className="fixed top-0 right-0 h-full slide-in-right flex flex-col"
        style={{ width: "min(420px, 100vw)", background: "#fff", zIndex: 301 }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between"
          style={{ padding: "20px 24px", borderBottom: "1px solid #E5E5E5", flexShrink: 0 }}
        >
          <div className="flex items-center" style={{ gap: "8px" }}>
            <ShoppingCart size={20} />
            <span style={{ fontSize: "16px", fontWeight: 700 }}>
              My Cart {count > 0 && `(${count})`}
            </span>
          </div>
          <button
            onClick={closeCart}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#212121" }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center h-full"
              style={{ gap: "16px", color: "#888" }}
            >
              <ShoppingCart size={48} strokeWidth={1} />
              <p style={{ fontSize: "15px" }}>Your cart is empty</p>
              <Link
                href="/collections/new"
                onClick={closeCart}
                style={{
                  background: "#7B189F",
                  color: "white",
                  padding: "10px 24px",
                  borderRadius: "4px",
                  fontSize: "13px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {items.map((item) => {
                const img = item.product.images?.[0];
                return (
                  <div key={item.product.id} className="flex" style={{ gap: "12px" }}>
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        flexShrink: 0,
                        background: "#F5F5F5",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {img?.url ? (
                        <Image
                          src={img.url}
                          alt={img.alt ?? item.product.title}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="80px"
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            background: "#E5E5E5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "11px",
                            color: "#aaa",
                          }}
                        >
                          No image
                        </div>
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link
                        href={`/products/${item.product.slug}`}
                        onClick={closeCart}
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#212121",
                          textDecoration: "none",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {item.product.title}
                      </Link>

                      <p style={{ fontSize: "14px", fontWeight: 700, marginTop: "4px" }}>
                        ${((item.product.price / 100) * item.quantity).toFixed(2)}
                      </p>

                      <div className="flex items-center" style={{ gap: "8px", marginTop: "8px" }}>
                        <button
                          onClick={() =>
                            item.quantity > 1
                              ? updateQuantity(item.product.id, item.quantity - 1)
                              : removeItem(item.product.id)
                          }
                          style={{
                            width: "26px",
                            height: "26px",
                            border: "1px solid #E5E5E5",
                            borderRadius: "4px",
                            background: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: "13px", fontWeight: 600, minWidth: "20px", textAlign: "center" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          style={{
                            width: "26px",
                            height: "26px",
                            border: "1px solid #E5E5E5",
                            borderRadius: "4px",
                            background: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          style={{
                            marginLeft: "auto",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#999",
                            fontSize: "12px",
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ borderTop: "1px solid #E5E5E5", padding: "20px 24px", flexShrink: 0 }}>
            <div
              className="flex justify-between items-center"
              style={{ marginBottom: "6px", fontSize: "13px", color: "#555" }}
            >
              <span>Subtotal</span>
              <span>${(total / 100).toFixed(2)}</span>
            </div>
            {total < 3500 && (
              <p style={{ fontSize: "12px", color: "#7B189F", marginBottom: "12px" }}>
                Add ${((3500 - total) / 100).toFixed(2)} more for free shipping
              </p>
            )}
            {total >= 3500 && (
              <p style={{ fontSize: "12px", color: "#22863a", marginBottom: "12px" }}>
                ✓ You qualify for free shipping
              </p>
            )}
            <button
              onClick={handleCheckout}
              style={{
                width: "100%",
                background: "#7B189F",
                color: "white",
                border: "none",
                borderRadius: "4px",
                height: "48px",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              Checkout — ${(total / 100).toFixed(2)}
            </button>
            <button
              onClick={closeCart}
              style={{
                width: "100%",
                background: "none",
                border: "1px solid #E5E5E5",
                borderRadius: "4px",
                height: "40px",
                fontSize: "13px",
                cursor: "pointer",
                marginTop: "10px",
                color: "#555",
              }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
