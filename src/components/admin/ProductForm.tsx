"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, X, ImageIcon } from "lucide-react";
import type { Product, Category, ProductImage } from "@/types";

type FormData = Omit<Product, "id" | "created_at">;

interface Props {
  initialData?: Product;
  categories: Category[];
  onSave: (data: FormData) => void;
  onCancel: () => void;
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function ProductForm({ initialData, categories, onSave, onCancel }: Props) {
  const [form, setForm] = useState<FormData>({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    description: initialData?.description ?? "",
    price: initialData?.price ?? 0,
    compare_at_price: initialData?.compare_at_price ?? null,
    category_id: initialData?.category_id ?? null,
    category: initialData?.category,
    tags: initialData?.tags ?? [],
    is_active: initialData?.is_active ?? true,
    is_featured: initialData?.is_featured ?? false,
    stock_quantity: initialData?.stock_quantity ?? 0,
    images: initialData?.images ?? [],
  });

  const [tagInput, setTagInput] = useState("");
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: keyof FormData, value: unknown) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleTitleChange = (title: string) => {
    setForm((f) => ({ ...f, title, slug: f.slug || slugify(title) }));
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !form.tags.includes(tag)) {
      set("tags", [...form.tags, tag]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) =>
    set("tags", form.tags.filter((t) => t !== tag));

  const addImage = () => {
    const url = imageUrlInput.trim();
    if (!url) return;
    const img: ProductImage = {
      id: `img-${Date.now()}`,
      product_id: initialData?.id ?? "",
      url,
      alt: form.title,
      sort_order: form.images.length,
    };
    set("images", [...form.images, img]);
    setImageUrlInput("");
  };

  const removeImage = (id: string) =>
    set("images", form.images.filter((i) => i.id !== id));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.slug.trim())  e.slug  = "Slug is required";
    if (form.price <= 0)    e.price = "Price must be greater than 0";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const cat = categories.find((c) => c.id === form.category_id) ?? undefined;
    onSave({ ...form, category: cat });
  };

  const inputCls = (field?: string) =>
    `w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors ${
      field && errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
    }`;

  const label = (text: string, required = false) => (
    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
      {text}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* ── Title + Slug ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <h2 className="font-bold text-gray-800 text-sm">Basic Info</h2>
        <div>
          {label("Title", true)}
          <input
            className={inputCls("title")}
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g. Robin 3D Puzzle"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>
        <div>
          {label("Slug", true)}
          <input
            className={`${inputCls("slug")} font-mono`}
            value={form.slug}
            onChange={(e) => set("slug", slugify(e.target.value))}
            placeholder="e.g. robin-3d-puzzle"
          />
          {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
        </div>
        <div>
          {label("Description")}
          <textarea
            className={`${inputCls()} min-h-[100px] resize-y`}
            value={form.description ?? ""}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Product description…"
          />
        </div>
      </div>

      {/* ── Pricing ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <h2 className="font-bold text-gray-800 text-sm">Pricing</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            {label("Price (cents)", true)}
            <input
              type="number"
              className={inputCls("price")}
              value={form.price}
              onChange={(e) => set("price", Number(e.target.value))}
              placeholder="1999"
              min={0}
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            <p className="text-xs text-gray-400 mt-1">= ${(form.price / 100).toFixed(2)}</p>
          </div>
          <div>
            {label("Compare-at Price (cents)")}
            <input
              type="number"
              className={inputCls()}
              value={form.compare_at_price ?? ""}
              onChange={(e) => set("compare_at_price", e.target.value ? Number(e.target.value) : null)}
              placeholder="Optional"
              min={0}
            />
            {form.compare_at_price ? (
              <p className="text-xs text-gray-400 mt-1">= ${(form.compare_at_price / 100).toFixed(2)}</p>
            ) : null}
          </div>
        </div>
      </div>

      {/* ── Inventory + Category ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <h2 className="font-bold text-gray-800 text-sm">Inventory & Category</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            {label("Stock Quantity")}
            <input
              type="number"
              className={inputCls()}
              value={form.stock_quantity}
              onChange={(e) => set("stock_quantity", Number(e.target.value))}
              min={0}
            />
          </div>
          <div>
            {label("Category")}
            <select
              className={inputCls()}
              value={form.category_id ?? ""}
              onChange={(e) => set("category_id", e.target.value || null)}
            >
              <option value="">— None —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Toggles */}
        <div className="flex gap-6 pt-1">
          {[
            { field: "is_active" as const, label: "Active (visible in store)" },
            { field: "is_featured" as const, label: "Featured (show on homepage)" },
          ].map(({ field, label: lbl }) => (
            <label key={field} className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => set(field, !form[field])}
                className={`w-10 h-5 rounded-full transition-colors relative ${form[field] ? "bg-black" : "bg-gray-200"}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${form[field] ? "left-5.5 translate-x-0.5" : "left-0.5"}`} />
              </div>
              <span className="text-sm text-gray-600">{lbl}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ── Tags ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
        <h2 className="font-bold text-gray-800 text-sm">Tags</h2>
        <div className="flex gap-2">
          <input
            className={`${inputCls()} flex-1`}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); }}}
            placeholder="Add tag and press Enter…"
          />
          <button type="button" onClick={addTag}
            className="px-4 py-2.5 bg-black text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors">
            <Plus size={14} />
          </button>
        </div>
        {form.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {form.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
                {tag}
                <button type="button" onClick={() => removeTag(tag)} className="text-gray-400 hover:text-black transition-colors">
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Images ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
        <h2 className="font-bold text-gray-800 text-sm">Images</h2>
        <div className="flex gap-2">
          <input
            className={`${inputCls()} flex-1`}
            value={imageUrlInput}
            onChange={(e) => setImageUrlInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addImage(); }}}
            placeholder="Paste image URL and press Enter…"
          />
          <button type="button" onClick={addImage}
            className="px-4 py-2.5 bg-black text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors">
            <Plus size={14} />
          </button>
        </div>
        {form.images.length > 0 ? (
          <div className="grid grid-cols-4 gap-3 mt-2">
            {form.images.map((img, i) => (
              <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100">
                <Image src={img.url} alt={img.alt ?? ""} fill className="object-cover" />
                {i === 0 && (
                  <span className="absolute top-1.5 left-1.5 bg-black text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    Primary
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(img.id)}
                  className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={10} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-gray-300 border-2 border-dashed border-gray-200 rounded-xl">
            <ImageIcon size={28} />
            <p className="text-xs mt-2">No images added yet</p>
          </div>
        )}
      </div>

      {/* ── Actions ── */}
      <div className="flex gap-3 justify-end pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 border border-gray-200 text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-8 py-2.5 bg-black text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors"
        >
          {initialData ? "Save Changes" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
