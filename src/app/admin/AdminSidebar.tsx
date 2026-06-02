"use client";

import Link from "next/link";
import { LayoutDashboard, Package, Tag, ShoppingBag, Settings, LogOut } from "lucide-react";
import { logoutAction } from "@/lib/adminAuth";

const NAV = [
  { label: "Dashboard", href: "/admin", Icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", Icon: Package },
  { label: "Categories", href: "/admin/categories", Icon: Tag },
  { label: "Orders", href: "/admin/orders", Icon: ShoppingBag },
  { label: "Settings", href: "/admin/settings", Icon: Settings },
];

export default function AdminSidebar() {
  return (
    <aside
      style={{
        width: "220px",
        background: "#1a1a1a",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
      }}
    >
      <div style={{ padding: "20px 20px 16px" }}>
        <Link
          href="/"
          style={{ fontWeight: 700, fontSize: "18px", color: "white", textDecoration: "none", letterSpacing: "0.04em" }}
        >
          go2go
        </Link>
        <p style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>Admin Panel</p>
      </div>

      <nav style={{ flex: 1, padding: "8px 0" }}>
        {NAV.map(({ label, href, Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center"
            style={{ gap: "10px", padding: "10px 20px", fontSize: "13px", color: "#ccc", textDecoration: "none", transition: "background 150ms, color 150ms" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#2a2a2a";
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "#ccc";
            }}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      <div style={{ padding: "16px 20px", borderTop: "1px solid #333", display: "flex", flexDirection: "column", gap: "12px" }}>
        <Link
          href="/"
          className="flex items-center"
          style={{ gap: "10px", fontSize: "13px", color: "#888", textDecoration: "none" }}
        >
          <LogOut size={15} /> Back to Store
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center"
            style={{ gap: "10px", fontSize: "13px", color: "#e55", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <LogOut size={15} /> Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
