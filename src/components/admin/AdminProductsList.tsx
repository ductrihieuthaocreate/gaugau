"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  toggleProductActive,
  toggleProductFeatured,
  deleteProduct,
} from "@/app/actions/products";
import type { Product } from "@/types";

function fmt(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

interface Props {
  products: Product[];
}

export function AdminProductsList({ products }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "active" | "inactive" | "featured" | "soldout"
  >("all");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = products.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchFilter =
      filter === "all"
        ? true
        : filter === "active"
          ? p.is_active
          : filter === "inactive"
            ? !p.is_active
            : filter === "featured"
              ? p.is_featured
              : filter === "soldout"
                ? p.stock_quantity === 0
                : true;
    return matchSearch && matchFilter;
  });

  const handleToggleActive = async (id: string, current: boolean) => {
    await toggleProductActive(id, current);
    router.refresh();
  };

  const handleToggleFeatured = async (id: string, current: boolean) => {
    await toggleProductFeatured(id, current);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setConfirmDelete(null);
    router.refresh();
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {products.length} total products
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-black text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>
        <div className="flex gap-1.5">
          {(
            ["all", "active", "inactive", "featured", "soldout"] as const
          ).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl capitalize transition-colors ${
                filter === f
                  ? "bg-black text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              {f === "soldout" ? "Sold Out" : f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-3 text-left">Product</th>
                <th className="px-5 py-3 text-left">Category</th>
                <th className="px-5 py-3 text-right">Price</th>
                <th className="px-5 py-3 text-right">Stock</th>
                <th className="px-5 py-3 text-center">Status</th>
                <th className="px-5 py-3 text-center">Featured</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-gray-400 text-sm"
                  >
                    No products found.
                  </td>
                </tr>
              )}
              {filtered.map((p) => {
                const img = p.images?.[0];
                return (
                  <tr
                    key={p.id}
                    className={`hover:bg-gray-50 transition-colors ${!p.is_active ? "opacity-50" : ""}`}
                  >
                    {/* Product */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gray-100 overflow-hidden relative shrink-0">
                          {img ? (
                            <Image
                              src={img.url}
                              alt={p.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate max-w-[200px]">
                            {p.title}
                          </p>
                          <p className="text-xs text-gray-400 font-mono">
                            {p.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    {/* Category */}
                    <td className="px-5 py-3">
                      <span className="text-xs text-gray-600">
                        {p.category?.name ?? "—"}
                      </span>
                    </td>
                    {/* Price */}
                    <td className="px-5 py-3 text-right">
                      <span className="text-sm font-bold text-gray-900">
                        {fmt(p.price)}
                      </span>
                      {p.compare_at_price && (
                        <p className="text-xs text-gray-400 line-through">
                          {fmt(p.compare_at_price)}
                        </p>
                      )}
                    </td>
                    {/* Stock */}
                    <td className="px-5 py-3 text-right">
                      <span
                        className={`text-sm font-bold ${
                          p.stock_quantity === 0
                            ? "text-red-500"
                            : p.stock_quantity < 5
                              ? "text-orange-500"
                              : "text-gray-900"
                        }`}
                      >
                        {p.stock_quantity}
                      </span>
                    </td>
                    {/* Active toggle */}
                    <td className="px-5 py-3 text-center">
                      <button
                        onClick={() =>
                          handleToggleActive(p.id, p.is_active)
                        }
                        title={p.is_active ? "Deactivate" : "Activate"}
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
                          p.is_active
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {p.is_active ? (
                          <Eye size={11} />
                        ) : (
                          <EyeOff size={11} />
                        )}
                        {p.is_active ? "Active" : "Hidden"}
                      </button>
                    </td>
                    {/* Featured toggle */}
                    <td className="px-5 py-3 text-center">
                      <button
                        onClick={() =>
                          handleToggleFeatured(p.id, p.is_featured)
                        }
                        title={p.is_featured ? "Unfeature" : "Feature"}
                        className={`p-1.5 rounded-lg transition-colors ${
                          p.is_featured
                            ? "text-yellow-500 bg-yellow-50 hover:bg-yellow-100"
                            : "text-gray-300 hover:text-yellow-400 hover:bg-yellow-50"
                        }`}
                      >
                        <Star
                          size={15}
                          fill={p.is_featured ? "currentColor" : "none"}
                        />
                      </button>
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/products/${p.id}`}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </Link>
                        {confirmDelete === p.id ? (
                          <div className="flex items-center gap-1 ml-1">
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="text-xs text-white bg-red-500 px-2 py-1 rounded-lg hover:bg-red-600 font-semibold"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => setConfirmDelete(null)}
                              className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-lg hover:bg-gray-200 font-semibold"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDelete(p.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
