"use client";

import React, { useState } from "react";
import { ChevronDown, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "@/app/actions/orders";

type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

function fmt(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

const STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const STATUS_STYLE: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

interface OrderItem {
  id: string;
  product_title: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface Order {
  id: string;
  customer_name: string | null;
  customer_email: string | null;
  status: OrderStatus;
  total_price: number;
  created_at: string;
  shipping_address: unknown;
  items: OrderItem[] | null;
}

interface Props {
  orders: Order[];
}

export function AdminOrdersList({ orders }: Props) {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.status === filterStatus);
  const sorted = [...filtered].sort((a, b) =>
    b.created_at.localeCompare(a.created_at)
  );

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    await updateOrderStatus(id, status);
    router.refresh();
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          {orders.length} total orders
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {(["all", ...STATUS_OPTIONS] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-2 text-xs font-semibold rounded-xl capitalize transition-colors ${
              filterStatus === s
                ? "bg-black text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400"
            }`}
          >
            {s}
            {s !== "all" && (
              <span className="ml-1.5 opacity-70">
                ({orders.filter((o) => o.status === s).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-3 text-left">Order</th>
                <th className="px-5 py-3 text-left">Customer</th>
                <th className="px-5 py-3 text-left">Date</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-right">Total</th>
                <th className="px-5 py-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sorted.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-gray-400 text-sm"
                  >
                    <Package
                      size={28}
                      className="mx-auto mb-2 text-gray-300"
                    />
                    No orders found.
                  </td>
                </tr>
              )}
              {sorted.map((order) => (
                <React.Fragment key={order.id}>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <span className="text-sm font-bold text-gray-900 font-mono">
                        {order.id.slice(0, 8)}…
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-sm font-medium text-gray-900">
                        {order.customer_name ?? "—"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {order.customer_email ?? ""}
                      </p>
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-sm text-gray-700">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(order.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </td>
                    <td className="px-5 py-3">
                      <div className="relative inline-block">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(
                              order.id,
                              e.target.value as OrderStatus
                            )
                          }
                          className={`appearance-none text-xs font-bold pl-2.5 pr-7 py-1.5 rounded-full cursor-pointer border-0 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 ${STATUS_STYLE[order.status]}`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option
                              key={s}
                              value={s}
                              className="bg-white text-gray-900 capitalize"
                            >
                              {s}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={11}
                          className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60"
                        />
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className="text-sm font-bold text-gray-900">
                        {fmt(order.total_price)}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() =>
                          setExpandedId(
                            expandedId === order.id ? null : order.id
                          )
                        }
                        className="text-xs font-semibold text-blue-600 hover:underline"
                      >
                        {expandedId === order.id ? "Hide" : "View"}
                      </button>
                    </td>
                  </tr>

                  {expandedId === order.id && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-4 bg-gray-50 border-t border-gray-100"
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Items */}
                          <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                              Items
                            </p>
                            <div className="space-y-1">
                              {(order.items ?? []).map((item, i) => (
                                <div
                                  key={i}
                                  className="flex justify-between items-center text-sm"
                                >
                                  <span className="text-gray-700">
                                    {item.product_title}
                                    <span className="text-gray-400 ml-1">
                                      × {item.quantity}
                                    </span>
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {fmt(item.unit_price * item.quantity)}
                                  </span>
                                </div>
                              ))}
                              <div className="border-t border-gray-200 pt-1 flex justify-between text-sm font-bold text-gray-900 mt-2">
                                <span>Total</span>
                                <span>{fmt(order.total_price)}</span>
                              </div>
                            </div>
                          </div>
                          {/* Shipping */}
                          <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                              Shipping Address
                            </p>
                            <p className="text-sm text-gray-700">
                              {order.shipping_address
                                ? JSON.stringify(order.shipping_address)
                                : "—"}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
