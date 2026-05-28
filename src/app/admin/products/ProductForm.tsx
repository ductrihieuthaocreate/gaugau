"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { upsertProduct } from "@/lib/actions";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  categories: Category[];
  product?: {
    id: string;
    title: string;
    slug: string;
    description?: string | null;
    price: number;
    compare_at_price?: number | null;
    stock_quantity: number;
    category_id?: string | null;
    tags?: string[] | null;
    featured?: boolean | null;
    images?: { url: string }[];
  };
}

export default function ProductForm({ categories, product }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: product?.title ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    price: product ? (product.price / 100).toFixed(2) : "",
    compare_at_price: product?.compare_at_price ? (product.compare_at_price / 100).toFixed(2) : "",
    stock_quantity: product?.stock_quantity?.toString() ?? "0",
    category_id: product?.category_id ?? "",
    tags: product?.tags?.join(", ") ?? "",
    featured: product?.featured ?? false,
    imageUrls: product?.images?.map((i) => i.url).join("\n") ?? "",
  });

  const set = (key: string, val: string | boolean) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await upsertProduct({
        ...(product?.id ? { id: product.id } : {}),
        title: form.title,
        slug: form.slug,
        description: form.description || undefined,
        price: Math.round(parseFloat(form.price) * 100),
        compare_at_price: form.compare_at_price
          ? Math.round(parseFloat(form.compare_at_price) * 100)
          : undefined,
        stock_quantity: parseInt(form.stock_quantity, 10),
        category_id: form.category_id || undefined,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        featured: form.featured,
        imageUrls: form.imageUrls
          ? form.imageUrls.split("\n").map((u) => u.trim()).filter(Boolean)
          : [],
      });
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  };

  const inputStyle = {
    width: "100%",
    border: "1px solid #E5E5E5",
    borderRadius: "4px",
    padding: "9px 12px",
    fontSize: "14px",
    outline: "none",
    background: "#fff",
  };

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: 600,
    color: "#555",
    marginBottom: "6px",
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "640px", display: "flex", flexDirection: "column", gap: "20px" }}>
      {error && (
        <div style={{ background: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: "4px", padding: "10px 14px", color: "#991B1B", fontSize: "13px" }}>
          {error}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Title *</label>
          <input
            required
            value={form.title}
            onChange={(e) => {
              set("title", e.target.value);
              if (!product) set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
            }}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Slug *</label>
          <input required value={form.slug} onChange={(e) => set("slug", e.target.value)} style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Description</label>
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Price ($) *</label>
          <input required type="number" step="0.01" min="0" value={form.price} onChange={(e) => set("price", e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Compare Price ($)</label>
          <input type="number" step="0.01" min="0" value={form.compare_at_price} onChange={(e) => set("compare_at_price", e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Stock *</label>
          <input required type="number" min="0" value={form.stock_quantity} onChange={(e) => set("stock_quantity", e.target.value)} style={inputStyle} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Category</label>
          <select value={form.category_id} onChange={(e) => set("category_id", e.target.value)} style={inputStyle}>
            <option value="">None</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Tags (comma-separated)</label>
          <input value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="best-seller, new" style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Image URLs (one per line)</label>
        <textarea
          value={form.imageUrls}
          onChange={(e) => set("imageUrls", e.target.value)}
          rows={4}
          placeholder="https://..."
          style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: "12px" }}
        />
      </div>

      <label className="flex items-center" style={{ gap: "8px", cursor: "pointer", fontSize: "13px" }}>
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => set("featured", e.target.checked)}
          style={{ width: "16px", height: "16px" }}
        />
        Featured product
      </label>

      <div className="flex items-center" style={{ gap: "12px" }}>
        <button
          type="submit"
          disabled={saving}
          style={{
            background: saving ? "#ccc" : "#7B189F",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "10px 28px",
            fontSize: "14px",
            fontWeight: 700,
            cursor: saving ? "not-allowed" : "pointer",
          }}
        >
          {saving ? "Saving…" : product ? "Update Product" : "Create Product"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          style={{ background: "none", border: "1px solid #E5E5E5", borderRadius: "4px", padding: "10px 20px", fontSize: "14px", cursor: "pointer", color: "#555" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
