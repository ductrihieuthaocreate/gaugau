"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Package, Tag, ShoppingBag,
  Settings, LogOut, Menu, X, ChevronRight,
} from "lucide-react";

const NAV = [
  { label: "Dashboard",  href: "/admin",            icon: LayoutDashboard },
  { label: "Products",   href: "/admin/products",   icon: Package },
  { label: "Categories", href: "/admin/categories", icon: Tag },
  { label: "Orders",     href: "/admin/orders",     icon: ShoppingBag },
  { label: "Settings",   href: "/admin/settings",   icon: Settings },
];

const ADMIN_PASSWORD = "admin123";
const AUTH_KEY = "gaugau-admin-auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setAuthed(sessionStorage.getItem(AUTH_KEY) === "1");
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-[#e63329] rounded-sm px-3 py-1.5 mb-4">
              <span className="text-white font-extrabold text-sm tracking-[0.1em] uppercase">GAUGAU</span>
            </div>
            <h1 className="text-white text-xl font-bold">Admin Panel</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to manage your store</p>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/40 transition-colors placeholder-gray-600 ${error ? "border-red-500" : "border-white/10"}`}
                autoFocus
              />
              {error && <p className="text-red-400 text-xs mt-1.5 ml-1">Incorrect password</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black font-bold text-sm py-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Sign In
            </button>
          </form>
          <p className="text-gray-600 text-xs text-center mt-6">Demo password: <span className="text-gray-400 font-mono">admin123</span></p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">

      {/* ── Sidebar ── */}
      <>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-[#111111] flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}>

          {/* Logo */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-white/8 shrink-0">
            <Link href="/" target="_blank" className="flex items-center gap-2.5 group">
              <div className="bg-[#e63329] rounded-sm px-2 py-1">
                <span className="text-white font-extrabold text-[11px] tracking-[0.1em] uppercase">GG</span>
              </div>
              <span className="text-white font-bold text-sm">Admin</span>
            </Link>
            <button className="lg:hidden text-gray-500 hover:text-white" onClick={() => setSidebarOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
            {NAV.map(({ label, href, icon: Icon }) => {
              const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-white text-black"
                      : "text-gray-400 hover:text-white hover:bg-white/8"
                  }`}
                >
                  <Icon size={16} strokeWidth={active ? 2.5 : 1.8} />
                  {label}
                  {active && <ChevronRight size={13} className="ml-auto text-gray-400" />}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-3 py-4 border-t border-white/8 space-y-1 shrink-0">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-white hover:bg-white/8 transition-all"
            >
              <ChevronRight size={16} />
              View Store
            </Link>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </aside>
      </>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 shrink-0 gap-4">
          <button className="lg:hidden text-gray-500 hover:text-black" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="flex-1">
            <p className="text-[13px] text-gray-400 font-medium">
              {NAV.find((n) => pathname === n.href || (n.href !== "/admin" && pathname.startsWith(n.href)))?.label ?? "Admin"}
            </p>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
