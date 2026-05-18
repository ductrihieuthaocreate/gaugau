"use client";

import { X, Plus, Minus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export function CartDrawer() {
  const { isOpen, items, closeCart, removeItem, updateQuantity, totalPrice } =
    useCartStore();

  const total = totalPrice();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 fade-in"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="font-bold text-base uppercase tracking-widest">
            Your Cart ({items.length})
          </h2>
          <button
            onClick={closeCart}
            className="p-1 hover:opacity-60 transition-opacity"
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingCart size={48} className="text-gray-300" />
              <p className="text-gray-500 text-sm">Your cart is empty.</p>
              <button
                onClick={closeCart}
                className="text-sm font-bold underline hover:opacity-60 transition-opacity"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => {
                const image = item.product.images?.[0];
                return (
                  <li key={item.id} className="flex gap-4">
                    {/* Image */}
                    <Link
                      href={`/products/${item.product.slug}`}
                      onClick={closeCart}
                      className="shrink-0"
                    >
                      <div className="w-20 h-20 rounded-card bg-gray-100 overflow-hidden relative">
                        {image ? (
                          <Image
                            src={image.url}
                            alt={image.alt || item.product.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ShoppingCart size={20} />
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.product.slug}`}
                        onClick={closeCart}
                        className="text-sm font-medium leading-snug hover:underline line-clamp-2"
                      >
                        {item.product.title}
                      </Link>
                      <p className="text-sm font-bold mt-1">
                        {formatPrice(item.price)}
                      </p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-gray-300 rounded-btn overflow-hidden">
                          <button
                            className="px-2.5 py-1 hover:bg-gray-100 transition-colors"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="px-3 text-sm font-medium min-w-[28px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            className="px-2.5 py-1 hover:bg-gray-100 transition-colors"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    {/* Line total */}
                    <div className="shrink-0 text-sm font-bold">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-5 py-5 space-y-4">
            {/* Free shipping bar */}
            {total < 3500 && (
              <div className="text-xs text-gray-600 text-center">
                Add{" "}
                <span className="font-bold">{formatPrice(3500 - total)}</span>{" "}
                more for free shipping!
                <div className="mt-1.5 bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-black h-1.5 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (total / 3500) * 100)}%` }}
                  />
                </div>
              </div>
            )}
            {total >= 3500 && (
              <p className="text-xs font-bold text-green-600 text-center">
                You qualify for free shipping!
              </p>
            )}

            <div className="flex items-center justify-between font-bold text-base">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-gray-500 -mt-2">
              Taxes and shipping calculated at checkout.
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-black text-white text-sm font-bold py-4 rounded-btn text-center hover:bg-gray-900 transition-colors"
            >
              Checkout
            </Link>
            <button
              onClick={closeCart}
              className="block w-full text-center text-sm underline underline-offset-2 hover:opacity-60 transition-opacity"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
