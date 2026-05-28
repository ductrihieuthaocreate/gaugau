import Link from "next/link";
import { getAdminProducts, getAdminOrders, getAdminCategories } from "@/lib/actions";
import { Package, ShoppingBag, Tag, DollarSign } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [products, orders, categories] = await Promise.all([
    getAdminProducts(),
    getAdminOrders(),
    getAdminCategories(),
  ]);

  const totalRevenue = orders.reduce((sum: number, o: { total_amount?: number }) => sum + (o.total_amount ?? 0), 0);

  const stats = [
    { label: "Products", value: products.length, Icon: Package, href: "/admin/products", color: "#7B189F" },
    { label: "Orders", value: orders.length, Icon: ShoppingBag, href: "/admin/orders", color: "#2563EB" },
    { label: "Categories", value: categories.length, Icon: Tag, href: "/admin/categories", color: "#059669" },
    { label: "Revenue", value: `$${(totalRevenue / 100).toFixed(0)}`, Icon: DollarSign, href: "/admin/orders", color: "#D97706" },
  ];

  return (
    <div style={{ padding: "32px" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "28px" }}>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "40px",
        }}
      >
        {stats.map(({ label, value, Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            style={{
              background: "#fff",
              border: "1px solid #E5E5E5",
              borderRadius: "8px",
              padding: "20px 24px",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              transition: "box-shadow 150ms",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
          >
            <div style={{ background: color + "18", borderRadius: "8px", padding: "10px" }}>
              <Icon size={20} color={color} />
            </div>
            <div>
              <p style={{ fontSize: "24px", fontWeight: 700, color: "#212121", lineHeight: 1 }}>{value}</p>
              <p style={{ fontSize: "13px", color: "#888", marginTop: "4px" }}>{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <div style={{ background: "#fff", border: "1px solid #E5E5E5", borderRadius: "8px" }}>
        <div
          className="flex items-center justify-between"
          style={{ padding: "16px 20px", borderBottom: "1px solid #E5E5E5" }}
        >
          <h2 style={{ fontSize: "15px", fontWeight: 700 }}>Recent Orders</h2>
          <Link href="/admin/orders" style={{ fontSize: "13px", color: "#7B189F", textDecoration: "none" }}>
            View all
          </Link>
        </div>
        {orders.length === 0 ? (
          <p style={{ padding: "24px 20px", color: "#888", fontSize: "14px" }}>No orders yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #F0F0F0" }}>
                {["Order ID", "Amount", "Status", "Date"].map((h) => (
                  <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 8).map((order: { id: string; total_amount?: number; status?: string; created_at?: string }) => (
                <tr key={order.id} style={{ borderBottom: "1px solid #F5F5F5" }}>
                  <td style={{ padding: "12px 20px", fontSize: "13px", fontFamily: "monospace" }}>
                    {order.id.slice(0, 8)}…
                  </td>
                  <td style={{ padding: "12px 20px", fontSize: "13px", fontWeight: 600 }}>
                    ${((order.total_amount ?? 0) / 100).toFixed(2)}
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: "20px",
                        background: order.status === "paid" ? "#D1FAE5" : "#FEF3C7",
                        color: order.status === "paid" ? "#065F46" : "#92400E",
                      }}
                    >
                      {order.status ?? "pending"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 20px", fontSize: "13px", color: "#888" }}>
                    {order.created_at ? new Date(order.created_at).toLocaleDateString() : "—"}
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
