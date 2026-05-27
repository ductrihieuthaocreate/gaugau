"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";

interface Props {
  product: Product;
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function StarRating({ rating = 4.5, count = 0 }: { rating?: number; count?: number }) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1 mt-1">
      <div className="flex items-center gap-px">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={11}
            strokeWidth={0}
            fill={i <= full ? "#F59E0B" : i === full + 1 && half ? "url(#half)" : "#D1D5DB"}
          />
        ))}
      </div>
      {count > 0 && (
        <span className="text-[11px] text-gray-500">{count.toLocaleString()}</span>
      )}
    </div>
  );
}

export function ProductCard({ product }: Props) {
  const { addItem } = useCartStore();

  const primaryImage  = product.images?.[0];
  const hoverImage    = product.images?.[1];
  const isNew         = product.tags?.includes("new");
  const isSoldOut     = product.stock_quantity === 0;
  const hasDiscount   = product.compare_at_price && product.compare_at_price > product.price;
  const discountPct   = hasDiscount
    ? Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100)
    : 0;
  const eligibleFreeShip = product.price >= 3500;

  return (
    <div className="group flex flex-col bg-white">

      {/* ── Image ── */}
      <Link href={`/products/${product.slug}`} className="block relative">
        <div className="relative overflow-hidden bg-gray-50 aspect-square border border-gray-100 group-hover:border-gray-300 transition-colors duration-200" style={{ borderRadius: "4px" }}>

          {primaryImage ? (
            <>
              <Image
                src={primaryImage.url}
                alt={primaryImage.alt || product.title}
                fill
                className={`object-cover transition-all duration-500 ease-out group-hover:scale-105
                  ${hoverImage ? "group-hover:opacity-0" : ""}`}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {hoverImage && (
                <Image
                  src={hoverImage.url}
                  alt={hoverImage.alt || product.title}
                  fill
                  className="object-cover opacity-0 scale-105 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-200">
              <ShoppingBag size={44} strokeWidth={1} />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {isSoldOut && (
              <span className="bg-gray-600 text-white text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded">
                Sold Out
              </span>
            )}
            {!isSoldOut && isNew && (
              <span className="text-white text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded" style={{ background: "var(--brand)" }}>
                New
              </span>
            )}
            {!isSoldOut && hasDiscount && (
              <span className="text-white text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded" style={{ background: "var(--sale)" }}>
                -{discountPct}%
              </span>
            )}
          </div>

          {/* Quick-add */}
          {!isSoldOut && (
            <div className="absolute inset-x-2.5 bottom-2.5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-250 ease-out z-10">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addItem(product);
                }}
                className="w-full text-white text-[12px] font-bold py-2.5 flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                style={{ borderRadius: "4px", background: "var(--brand)", letterSpacing: "var(--btn-letter-spacing)" }}
              >
                <ShoppingBag size={13} strokeWidth={2} />
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </Link>

      {/* ── Info ── */}
      <div className="mt-3 flex flex-col flex-1 gap-0.5">
        {product.category && (
          <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium">
            {product.category.name}
          </p>
        )}

        <Link
          href={`/products/${product.slug}`}
          className="text-[13px] font-medium leading-snug line-clamp-2 text-gray-900 hover:text-[var(--brand)] transition-colors"
        >
          {product.title}
        </Link>

        <StarRating />

        <div className="flex items-center gap-2 mt-1">
          <span className="text-[14px] font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-[12px] text-gray-400 line-through">
              {formatPrice(product.compare_at_price!)}
            </span>
          )}
        </div>

        {eligibleFreeShip && (
          <p className="text-[11px] text-green-600 font-medium mt-0.5">Free shipping</p>
        )}
      </div>
    </div>
  );
}
