import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import { Package, ShoppingBag, Tag, TrendingUp, AlertCircle } from "lucide-react";

function fmt(cents: number) {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

export default async function AdminDashboard() {
  const supabase = createAdminClient();

  const [{ data: products }, { data: orders }, { data: categories }] =
    await Promise.all([
      supabase
        .from("products")
        .select("id, title, is_active, is_featured, stock_quantity"),
      supabase
        .from("orders")
        .select(
          "id, customer_name, customer_email, status, total_price, created_at"
        )
        .order("created_at", { ascending: false }),
      supabase.from("categories").select("id"),
    ]);

  const safeProducts = products ?? [];
  const safeOrders = orders ?? [];
  const safeCategories = categories ?? [];

  const totalRevenue = safeOrders
    .filter((o) => o.status !== "cancelled" && o.status !== "refunded")
    .reduce((s, o) => s + o.total_price, 0);

  const activeProducts = safeProducts.filter((p) => p.is_active).length;
  const pendingOrders = safeOrders.filter((o) => o.status === "pending").length;
  const recent = safeOrders.slice(0, 5);

  const stats = [
    {
      label: "Total Revenue",
      value: fmt(totalRevenue),
      sub: "All non-cancelled orders",
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Active Products",
      value: String(activeProducts),
      sub: `${safeProducts.length} total`,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Total Orders",
      value: String(safeOrders.length),
      sub: `${pendingOrders} pending`,
      icon: ShoppingBag,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Categories",
      value: String(safeCategories.length),
      sub: "Product categories",
      icon: Tag,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  const lowStock = safeProducts.filter(
    (p) => p.stock_quantity > 0 && p.stock_quantity < 5
  );

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back. Here&apos;s what&apos;s happening in your store.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
          >
            <div
              className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-4`}
            >
              <s.icon size={18} className={s.color} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm font-medium text-gray-700 mt-0.5">
              {s.label}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Low stock alert */}
      {lowStock.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle
            size={18}
            className="text-orange-500 mt-0.5 shrink-0"
          />
          <div>
            <p className="text-sm font-semibold text-orange-800">
              Low stock warning
            </p>
            <p className="text-xs text-orange-600 mt-0.5">
              {lowStock.map((p) => p.title).join(", ")} — fewer than 5 units
              remaining.
            </p>
          </div>
        </div>
      )}

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50">
                <th className="px-6 py-3 text-left">Order</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recent.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-400 text-sm"
                  >
                    No orders yet.
                  </td>
                </tr>
              )}
              {recent.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Link
                      href="/admin/orders"
                      className="text-sm font-semibold text-blue-600 hover:underline font-mono"
                    >
                      {order.id.slice(0, 8)}…
                    </Link>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {order.customer_name ?? "—"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {order.customer_email ?? ""}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${STATUS_COLOR[order.status] ?? "bg-gray-100 text-gray-600"}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-gray-900">
                      {fmt(order.total_price)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Add Product", href: "/admin/products/new", color: "bg-blue-600" },
          { label: "Manage Orders", href: "/admin/orders", color: "bg-purple-600" },
          { label: "Edit Hero", href: "/admin/settings", color: "bg-orange-500" },
          { label: "Announcements", href: "/admin/settings", color: "bg-green-600" },
        ].map((q) => (
          <Link
            key={q.label}
            href={q.href}
            className={`${q.color} text-white text-center text-sm font-bold py-3 px-4 rounded-2xl hover:opacity-80 transition-opacity`}
          >
            {q.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
