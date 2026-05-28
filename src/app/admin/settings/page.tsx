"use client";

import { useState } from "react";
import { saveHeroSettings } from "@/lib/actions";

export default function AdminSettingsPage() {
  const [form, setForm] = useState({
    title: "Design Gifts & Lifestyle",
    subtitle: "Thoughtfully designed objects for everyday life. Gifts they'll actually love.",
    ctaLabel: "Shop Now",
    ctaHref: "/collections/new",
    imageSrc: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80",
    overlayOpacity: "0.35",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await saveHeroSettings({ ...form, overlayOpacity: parseFloat(form.overlayOpacity) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
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
  const labelStyle = { display: "block", fontSize: "13px", fontWeight: 600 as const, color: "#555", marginBottom: "6px" };

  return (
    <div style={{ padding: "32px" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "8px" }}>Settings</h1>
      <p style={{ fontSize: "14px", color: "#888", marginBottom: "32px" }}>Configure the homepage hero banner.</p>

      <div style={{ background: "#fff", border: "1px solid #E5E5E5", borderRadius: "8px", padding: "28px", maxWidth: "600px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "24px" }}>Hero Banner</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label style={labelStyle}>Headline</label>
            <input value={form.title} onChange={(e) => set("title", e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Subtitle</label>
            <textarea value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} rows={2} style={{ ...inputStyle, resize: "vertical" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>CTA Label</label>
              <input value={form.ctaLabel} onChange={(e) => set("ctaLabel", e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>CTA Link</label>
              <input value={form.ctaHref} onChange={(e) => set("ctaHref", e.target.value)} style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Background Image URL</label>
            <input value={form.imageSrc} onChange={(e) => set("imageSrc", e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Overlay Opacity (0–1)</label>
            <input type="number" min="0" max="1" step="0.05" value={form.overlayOpacity} onChange={(e) => set("overlayOpacity", e.target.value)} style={{ ...inputStyle, maxWidth: "120px" }} />
          </div>
          <div>
            <button
              type="submit"
              disabled={saving}
              style={{
                background: saved ? "#059669" : saving ? "#ccc" : "#7B189F",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "10px 28px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: saving ? "not-allowed" : "pointer",
                transition: "background 200ms",
              }}
            >
              {saved ? "Saved!" : saving ? "Saving…" : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
