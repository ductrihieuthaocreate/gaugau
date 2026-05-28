import Link from "next/link";
import { getAdminCategories } from "@/lib/actions";
import { Plus, Pencil } from "lucide-react";
import DeleteCategoryButton from "./DeleteCategoryButton";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories();

  return (
    <div style={{ padding: "32px" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700 }}>Categories</h1>
        <Link
          href="/admin/categories/new"
          className="flex items-center"
          style={{
            gap: "6px",
            background: "#7B189F",
            color: "white",
            padding: "9px 18px",
            borderRadius: "4px",
            fontSize: "13px",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          <Plus size={15} /> Add Category
        </Link>
      </div>

      <div style={{ background: "#fff", border: "1px solid #E5E5E5", borderRadius: "8px", overflow: "hidden" }}>
        {categories.length === 0 ? (
          <p style={{ padding: "32px", color: "#888", fontSize: "14px" }}>No categories yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #F0F0F0", background: "#FAFAFA" }}>
                {["Name", "Slug", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((c: { id: string; name: string; slug: string }) => (
                <tr key={c.id} style={{ borderBottom: "1px solid #F5F5F5" }}>
                  <td style={{ padding: "12px 16px", fontSize: "13px", fontWeight: 500 }}>{c.name}</td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "#888", fontFamily: "monospace" }}>{c.slug}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div className="flex items-center" style={{ gap: "8px" }}>
                      <Link
                        href={`/admin/categories/${c.id}/edit`}
                        style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#7B189F", textDecoration: "none", fontWeight: 600 }}
                      >
                        <Pencil size={13} /> Edit
                      </Link>
                      <DeleteCategoryButton id={c.id} name={c.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
