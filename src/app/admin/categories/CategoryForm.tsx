"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { upsertCategory } from "@/lib/actions";

interface Props {
  category?: { id: string; name: string; slug: string; description?: string | null; image_url?: string | null };
}

export default function CategoryForm({ category }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: category?.name ?? "",
    slug: category?.slug ?? "",
    description: category?.description ?? "",
    image_url: category?.image_url ?? "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await upsertCategory({
        ...(category?.id ? { id: category.id } : {}),
        name: form.name,
        slug: form.slug,
        description: form.description || undefined,
        image_url: form.image_url || undefined,
      });
      router.push("/admin/categories");
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
  const labelStyle = { display: "block", fontSize: "13px", fontWeight: 600, color: "#555", marginBottom: "6px" };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "520px", display: "flex", flexDirection: "column", gap: "20px" }}>
      {error && (
        <div style={{ background: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: "4px", padding: "10px 14px", color: "#991B1B", fontSize: "13px" }}>
          {error}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Name *</label>
          <input
            required
            value={form.name}
            onChange={(e) => {
              set("name", e.target.value);
              if (!category) set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
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
        <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={2} style={{ ...inputStyle, resize: "vertical" }} />
      </div>

      <div>
        <label style={labelStyle}>Image URL</label>
        <input value={form.image_url} onChange={(e) => set("image_url", e.target.value)} placeholder="https://..." style={inputStyle} />
      </div>

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
          {saving ? "Saving…" : category ? "Update Category" : "Create Category"}
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
