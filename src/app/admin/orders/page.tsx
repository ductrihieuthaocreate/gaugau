import { getAdminOrders } from "@/lib/actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Orders — go2go Admin" };

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return (
    <div style={{ padding: "32px" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "24px" }}>Orders</h1>

      <div style={{ background: "#fff", border: "1px solid #E5E5E5", borderRadius: "8px", overflow: "hidden" }}>
        {orders.length === 0 ? (
          <p style={{ padding: "32px", color: "#888", fontSize: "14px" }}>No orders yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #F0F0F0", background: "#FAFAFA" }}>
                {["Order ID", "Session", "Amount", "Status", "Date"].map((h) => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order: {
                id: string;
                stripe_session_id?: string;
                total_amount?: number;
                status?: string;
                created_at?: string;
              }) => (
                <tr key={order.id} style={{ borderBottom: "1px solid #F5F5F5" }}>
                  <td style={{ padding: "12px 16px", fontSize: "12px", fontFamily: "monospace", color: "#555" }}>
                    {order.id.slice(0, 8)}…
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "12px", fontFamily: "monospace", color: "#888" }}>
                    {order.stripe_session_id ? order.stripe_session_id.slice(0, 20) + "…" : "—"}
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", fontWeight: 600 }}>
                    ${((order.total_amount ?? 0) / 100).toFixed(2)}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "3px 9px",
                        borderRadius: "20px",
                        background:
                          order.status === "paid" ? "#D1FAE5" :
                          order.status === "pending" ? "#FEF3C7" : "#F3F4F6",
                        color:
                          order.status === "paid" ? "#065F46" :
                          order.status === "pending" ? "#92400E" : "#374151",
                      }}
                    >
                      {order.status ?? "pending"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "#888" }}>
                    {order.created_at ? new Date(order.created_at).toLocaleString() : "—"}
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
