"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { useState, use } from "react";
import { ShoppingCart, ChevronLeft, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { ProductGrid } from "@/components/product/ProductGrid";
import { MOCK_PRODUCTS } from "@/lib/mockData";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function ProductPage({ params }: Props) {
  const { slug } = use(params);
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) notFound();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category_id === product.category_id
  ).slice(0, 4);

  const isSoldOut = product.stock_quantity === 0;
  const hasDiscount =
    product.compare_at_price && product.compare_at_price > product.price;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="container-site py-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          {product.category && (
            <>
              <Link
                href={`/collections/${product.category.slug}`}
                className="hover:underline"
              >
                {product.category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-black font-medium truncate">{product.title}</span>
        </div>
      </div>

      {/* Product layout */}
      <div className="container-site pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
          {/* Images */}
          <div className="flex gap-3">
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex flex-col gap-2 w-16 shrink-0">
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i
                        ? "border-black"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || product.title}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main image */}
            <div className="flex-1 relative aspect-square rounded-card overflow-hidden bg-[#f1f1f1]">
              {product.images[selectedImage] ? (
                <Image
                  src={product.images[selectedImage].url}
                  alt={product.images[selectedImage].alt || product.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <ShoppingCart size={64} />
                </div>
              )}
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {isSoldOut && (
                  <span className="bg-[#78766f] text-white text-xs font-bold px-3 py-1 rounded-full">
                    Sold Out
                  </span>
                )}
                {!isSoldOut && product.tags.includes("new") && (
                  <span className="bg-[#006fda] text-white text-xs font-bold px-3 py-1 rounded-full">
                    New
                  </span>
                )}
                {hasDiscount && (
                  <span className="bg-[#c72d00] text-white text-xs font-bold px-3 py-1 rounded-full">
                    Sale
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            {product.category && (
              <Link
                href={`/collections/${product.category.slug}`}
                className="text-xs uppercase tracking-widest text-gray-500 hover:underline mb-2"
              >
                {product.category.name}
              </Link>
            )}
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-bold">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.compare_at_price!)}
                </span>
              )}
              {hasDiscount && (
                <span className="text-sm font-bold text-[#c72d00]">
                  Save{" "}
                  {Math.round(
                    ((product.compare_at_price! - product.price) /
                      product.compare_at_price!) *
                      100
                  )}
                  %
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-gray-700 text-sm leading-relaxed mb-8">
                {product.description}
              </p>
            )}

            {/* Quantity + Add to Cart */}
            {!isSoldOut ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-bold uppercase tracking-wider">
                    Quantity
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-btn overflow-hidden">
                    <button
                      className="px-4 py-2 hover:bg-gray-100 transition-colors"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 text-sm font-medium min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button
                      className="px-4 py-2 hover:bg-gray-100 transition-colors"
                      onClick={() =>
                        setQuantity((q) =>
                          Math.min(product.stock_quantity, q + 1)
                        )
                      }
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 rounded-btn font-bold text-sm flex items-center justify-center gap-2 transition-colors ${
                    added
                      ? "bg-green-600 text-white"
                      : "bg-black text-white hover:bg-gray-900"
                  }`}
                >
                  <ShoppingCart size={16} />
                  {added ? "Added to Cart!" : "Add to Cart"}
                </button>
              </div>
            ) : (
              <button
                disabled
                className="w-full py-4 rounded-btn font-bold text-sm bg-gray-200 text-gray-500 cursor-not-allowed"
              >
                Sold Out
              </button>
            )}

            {/* Shipping note */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              Free shipping on orders over $35 · Easy returns
            </p>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                  Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/collections/${tag}`}
                      className="text-xs border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-100 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="bg-[#f1f1f1] py-1">
          <ProductGrid
            products={relatedProducts}
            title="You Might Also Like"
            columns={4}
          />
        </div>
      )}
    </div>
  );
}
