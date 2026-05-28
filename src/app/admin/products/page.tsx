import Link from "next/link";
import { getAdminProducts } from "@/lib/actions";
import { Plus, Pencil } from "lucide-react";
import DeleteProductButton from "./DeleteProductButton";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div style={{ padding: "32px" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700 }}>Products</h1>
        <Link
          href="/admin/products/new"
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
          <Plus size={15} /> Add Product
        </Link>
      </div>

      <div style={{ background: "#fff", border: "1px solid #E5E5E5", borderRadius: "8px", overflow: "hidden" }}>
        {products.length === 0 ? (
          <p style={{ padding: "32px", color: "#888", fontSize: "14px" }}>No products yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #F0F0F0", background: "#FAFAFA" }}>
                {["Title", "Price", "Stock", "Category", "Actions"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 16px",
                      textAlign: "left",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#888",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p: {
                id: string;
                title: string;
                price: number;
                stock_quantity: number;
                category?: { name: string } | null;
              }) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #F5F5F5" }}>
                  <td style={{ padding: "12px 16px", fontSize: "13px", fontWeight: 500 }}>{p.title}</td>
                  <td style={{ padding: "12px 16px", fontSize: "13px" }}>${(p.price / 100).toFixed(2)}</td>
                  <td style={{ padding: "12px 16px", fontSize: "13px" }}>
                    <span style={{ color: p.stock_quantity <= 5 ? "#990E35" : "#212121" }}>
                      {p.stock_quantity}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "#666" }}>
                    {p.category?.name ?? "—"}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div className="flex items-center" style={{ gap: "8px" }}>
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "12px",
                          color: "#7B189F",
                          textDecoration: "none",
                          fontWeight: 600,
                        }}
                      >
                        <Pencil size={13} /> Edit
                      </Link>
                      <DeleteProductButton id={p.id} title={p.title} />
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
