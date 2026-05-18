"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";

interface Props {
  product: Product;
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export function ProductCard({ product }: Props) {
  const { addItem } = useCartStore();

  const primaryImage = product.images?.[0];
  const hoverImage   = product.images?.[1];
  const isNew        = product.tags?.includes("new");
  const isSoldOut    = product.stock_quantity === 0;
  const hasDiscount  = product.compare_at_price && product.compare_at_price > product.price;
  const discountPct  = hasDiscount
    ? Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100)
    : 0;

  return (
    <div className="group flex flex-col">

      {/* ── Image wrapper ── */}
      <Link href={`/products/${product.slug}`} className="block relative">
        <div className="relative overflow-hidden rounded-3xl bg-[#f4f4f4] aspect-square shadow-sm group-hover:shadow-lg transition-shadow duration-500">

          {/* Primary image — zooms on hover */}
          {primaryImage ? (
            <>
              <Image
                src={primaryImage.url}
                alt={primaryImage.alt || product.title}
                fill
                className={`object-cover transition-all duration-500 ease-out
                  group-hover:scale-105
                  ${hoverImage ? "group-hover:opacity-0" : ""}`}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {hoverImage && (
                <Image
                  src={hoverImage.url}
                  alt={hoverImage.alt || product.title}
                  fill
                  className="object-cover opacity-0 scale-105 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
              <ShoppingCart size={44} strokeWidth={1} />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {isSoldOut && (
              <span className="bg-[#78766f] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                Sold Out
              </span>
            )}
            {!isSoldOut && isNew && (
              <span className="bg-[#006fda] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                New
              </span>
            )}
            {!isSoldOut && hasDiscount && (
              <span className="bg-[#e63329] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                -{discountPct}%
              </span>
            )}
          </div>

          {/* Quick-add — slides up from bottom on hover */}
          {!isSoldOut && (
            <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addItem(product);
                }}
                className="w-full bg-black/90 backdrop-blur-sm text-white text-[13px] font-bold py-3 rounded-2xl hover:bg-black transition-colors flex items-center justify-center gap-2"
                style={{ letterSpacing: "var(--btn-letter-spacing)" }}
              >
                <ShoppingCart size={14} strokeWidth={2} />
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </Link>

      {/* ── Info ── */}
      <div className="mt-3.5 px-0.5 flex flex-col flex-1">
        {product.category && (
          <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 mb-1 font-medium">
            {product.category.name}
          </p>
        )}

        <Link
          href={`/products/${product.slug}`}
          className="text-[14px] font-medium leading-snug line-clamp-2 text-gray-900 hover:text-black transition-colors"
        >
          {product.title}
        </Link>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-[14px] font-bold text-black">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-[13px] text-gray-400 line-through">
              {formatPrice(product.compare_at_price!)}
            </span>
          )}
        </div>
      </div>

    </div>
  );
}
