"use client";

import { useAdminStore } from "@/store/adminStore";
import Link from "next/link";
import { Package, ShoppingBag, Tag, TrendingUp, AlertCircle } from "lucide-react";

function fmt(cents: number) {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

const STATUS_COLOR: Record<string, string> = {
  pending:    "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped:    "bg-purple-100 text-purple-700",
  delivered:  "bg-green-100 text-green-700",
  cancelled:  "bg-red-100 text-red-600",
};

export default function AdminDashboard() {
  const { products, orders, categories } = useAdminStore();

  const totalRevenue  = orders.filter(o => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const activeProducts = products.filter(p => p.is_active).length;
  const pendingOrders  = orders.filter(o => o.status === "pending").length;
  const recent = [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);

  const stats = [
    { label: "Total Revenue",    value: fmt(totalRevenue),         sub: "All non-cancelled orders",   icon: TrendingUp,  color: "text-green-600",  bg: "bg-green-50" },
    { label: "Active Products",  value: String(activeProducts),    sub: `${products.length} total`,    icon: Package,     color: "text-blue-600",   bg: "bg-blue-50" },
    { label: "Total Orders",     value: String(orders.length),     sub: `${pendingOrders} pending`,    icon: ShoppingBag, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Categories",       value: String(categories.length), sub: "Product categories",          icon: Tag,         color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back. Here's what's happening in your store.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-4`}>
              <s.icon size={18} className={s.color} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm font-medium text-gray-700 mt-0.5">{s.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Low stock alert */}
      {products.filter(p => p.stock_quantity > 0 && p.stock_quantity < 5).length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle size={18} className="text-orange-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-orange-800">Low stock warning</p>
            <p className="text-xs text-orange-600 mt-0.5">
              {products.filter(p => p.stock_quantity > 0 && p.stock_quantity < 5).map(p => p.title).join(", ")} — fewer than 5 units remaining.
            </p>
          </div>
        </div>
      )}

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Recent Orders</h2>
          <Link href="/admin/orders" className="text-xs font-semibold text-blue-600 hover:underline">View all →</Link>
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
              {recent.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/admin/orders`} className="text-sm font-semibold text-blue-600 hover:underline">
                      {order.id}
                    </Link>
                    <p className="text-xs text-gray-400 mt-0.5">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                    <p className="text-xs text-gray-400">{order.customerEmail}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${STATUS_COLOR[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-gray-900">{fmt(order.total)}</span>
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
          { label: "Add Product",    href: "/admin/products/new",  color: "bg-blue-600" },
          { label: "Manage Orders",  href: "/admin/orders",        color: "bg-purple-600" },
          { label: "Edit Hero",      href: "/admin/settings",      color: "bg-orange-500" },
          { label: "Announcements",  href: "/admin/settings",      color: "bg-green-600" },
        ].map((q) => (
          <Link key={q.label} href={q.href}
            className={`${q.color} text-white text-center text-sm font-bold py-3 px-4 rounded-2xl hover:opacity-80 transition-opacity`}>
            {q.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
