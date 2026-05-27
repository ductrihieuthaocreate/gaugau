"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { MobileDrawer } from "./MobileDrawer";
import { NAV_ITEMS } from "./navData";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const { totalItems, openCart } = useCartStore();
  const itemCount = totalItems();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-30 bg-white transition-shadow duration-200 ${
          scrolled ? "shadow-md" : "border-b border-gray-200"
        }`}
      >
        {/* ── ROW 1: Logo + Search + Account/Cart ── */}
        <div className="container-site">
          <div className="flex items-center gap-3 md:gap-5 h-[68px]">

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden shrink-0 p-1 -ml-1"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.8} />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="shrink-0 font-black text-2xl tracking-tight select-none"
              style={{ color: "var(--brand)" }}
              aria-label="Go2go home"
            >
              go2go
            </Link>

            {/* Search bar — wide, Wayfair-style */}
            <form
              className="hidden sm:flex flex-1 max-w-2xl items-center rounded-full overflow-hidden border-2 transition-colors"
              style={{ borderColor: "var(--brand)" }}
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim())
                  window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
              }}
            >
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="flex-1 px-5 py-2.5 text-sm outline-none bg-white text-gray-800 placeholder-gray-400"
              />
              <button
                type="submit"
                className="px-5 py-2.5 text-white shrink-0 transition-colors"
                style={{ background: "var(--brand)" }}
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Right icons */}
            <div className="ml-auto sm:ml-0 flex items-center gap-1">
              {/* Mobile search */}
              <Link href="/search" className="sm:hidden p-2.5 rounded-full hover:bg-gray-100 transition-colors">
                <Search size={20} strokeWidth={1.6} />
              </Link>

              <Link
                href="/account"
                className="hidden sm:flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
              >
                <User size={20} strokeWidth={1.6} />
                <span className="text-[10px] font-medium">Account</span>
              </Link>

              <button
                onClick={openCart}
                className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 relative"
                aria-label={`Cart${itemCount > 0 ? ` (${itemCount} items)` : ""}`}
              >
                <div className="relative">
                  <ShoppingBag size={20} strokeWidth={1.6} />
                  {itemCount > 0 && (
                    <span
                      className="absolute -top-1.5 -right-1.5 text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5"
                      style={{ background: "var(--brand)" }}
                    >
                      {itemCount > 9 ? "9+" : itemCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:block text-[10px] font-medium">Cart</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── ROW 2: Department nav — desktop only ── */}
        <div
          className="hidden md:block border-t border-gray-100 bg-white"
          onMouseLeave={() => setHoveredNav(null)}
        >
          <div className="container-site">
            <nav className="flex items-center overflow-x-auto scrollbar-none">
              {NAV_ITEMS.map((item) => {
                const active = hoveredNav === item.label;
                return (
                  <div
                    key={item.label}
                    className="relative shrink-0"
                    onMouseEnter={() => setHoveredNav(item.label)}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 px-3 py-3 whitespace-nowrap font-medium transition-colors border-b-2 ${
                        active
                          ? "border-[var(--brand)] text-[var(--brand)]"
                          : "border-transparent text-gray-700 hover:text-[var(--brand)]"
                      }`}
                      style={{ fontSize: "var(--nav-size)", letterSpacing: "var(--nav-letter-spacing)" }}
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown
                          size={12}
                          strokeWidth={2.5}
                          className={`transition-transform duration-200 ${active ? "rotate-180" : ""}`}
                        />
                      )}
                    </Link>

                    {/* Dropdown */}
                    {active && item.children && (
                      <div className="absolute top-full left-0 bg-white border border-gray-200 shadow-xl rounded-b-xl py-2 min-w-[200px] z-50">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-5 py-2.5 text-[13px] text-gray-700 hover:bg-[var(--brand-light)] hover:text-[var(--brand)] transition-colors"
                            onClick={() => setHoveredNav(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Sale — always red, end of nav */}
              <Link
                href="/collections/sale"
                className="px-3 py-3 text-[var(--sale)] font-bold whitespace-nowrap shrink-0 hover:text-[var(--sale-dark)] border-b-2 border-transparent transition-colors"
                style={{ fontSize: "var(--nav-size)" }}
              >
                Sale
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
