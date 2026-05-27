"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, ChevronDown, Heart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { MobileDrawer } from "./MobileDrawer";
import { NAV_ITEMS } from "./navData";

const BRAND = "#7B189F";

export function Header() {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredNav, setHoveredNav]   = useState<string | null>(null);
  const [scrolled, setScrolled]       = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const { totalItems, openCart } = useCartStore();
  const itemCount = totalItems();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-30 ${scrolled ? "shadow-md" : ""}`}>

        {/* ════ ROW 1 — Purple brand bar (Wayfair-style) ════ */}
        <div style={{ background: BRAND }}>
          <div className="container-site">
            <div className="flex items-center justify-between" style={{ height: "36px" }}>
              {/* Left: brand name + tagline */}
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="text-white font-black text-lg tracking-tight leading-none select-none"
                >
                  go2go
                </Link>
                <span className="hidden sm:block text-white/40 text-xs">|</span>
                <span className="hidden sm:block text-white/70 text-xs">
                  go2godesigns.com
                </span>
              </div>

              {/* Right: utility links */}
              <div className="hidden md:flex items-center gap-4 text-xs text-white/85">
                <button
                  type="button"
                  className="hover:text-white transition-colors whitespace-nowrap"
                >
                  Fast &amp; Free Shipping Over $35
                </button>
                <span className="text-white/30">|</span>
                <Link href="/collections/new" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
                <span className="text-white/30">|</span>
                <Link
                  href="/collections/sale"
                  className="font-semibold hover:text-white transition-colors"
                >
                  Sale
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ════ ROW 2 — White main header ════ */}
        <div className="bg-white border-b border-gray-200">
          <div className="container-site">
            <div className="flex items-center gap-3 md:gap-4" style={{ height: "64px" }}>

              {/* Mobile hamburger */}
              <button
                className="md:hidden shrink-0"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} strokeWidth={1.8} />
              </button>

              {/* Logo */}
              <Link
                href="/"
                className="shrink-0 font-black text-2xl tracking-tight select-none"
                style={{ color: BRAND }}
                aria-label="Go2go home"
              >
                go2go
              </Link>

              {/* Search bar — wide, Wayfair-style (white fill, gray border, purple button) */}
              <form
                className="flex-1 flex items-center bg-white border border-gray-400 hover:border-[#7B189F] focus-within:border-[#7B189F] transition-colors overflow-hidden"
                style={{ height: "42px", borderRadius: "4px" }}
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
                  placeholder="Find anything..."
                  className="flex-1 px-4 h-full text-sm outline-none bg-white text-gray-800 placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="h-full px-5 text-white shrink-0 flex items-center justify-center hover:opacity-90 transition-opacity"
                  style={{ background: BRAND }}
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>
              </form>

              {/* Right: icons */}
              <div className="flex items-center gap-0.5 shrink-0">
                {/* Mobile search link */}
                <Link
                  href="/search"
                  className="sm:hidden p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <Search size={20} strokeWidth={1.6} />
                </Link>

                {/* Account */}
                <Link
                  href="/account"
                  className="hidden sm:flex flex-col items-center gap-0.5 px-2.5 py-1.5 hover:bg-gray-50 transition-colors text-gray-700"
                  style={{ borderRadius: "4px" }}
                >
                  <User size={20} strokeWidth={1.6} />
                  <span className="text-[10px] font-medium whitespace-nowrap">Sign In</span>
                </Link>

                {/* Wishlists */}
                <button
                  className="hidden sm:flex flex-col items-center gap-0.5 px-2.5 py-1.5 hover:bg-gray-50 transition-colors text-gray-700"
                  style={{ borderRadius: "4px" }}
                  aria-label="Wishlists"
                >
                  <Heart size={20} strokeWidth={1.6} />
                  <span className="text-[10px] font-medium">Wishlists</span>
                </button>

                {/* Cart */}
                <button
                  onClick={openCart}
                  className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 hover:bg-gray-50 transition-colors text-gray-700 relative"
                  style={{ borderRadius: "4px" }}
                  aria-label={`Cart${itemCount > 0 ? ` (${itemCount})` : ""}`}
                >
                  <div className="relative">
                    <ShoppingBag size={20} strokeWidth={1.6} />
                    {itemCount > 0 && (
                      <span
                        className="absolute -top-1.5 -right-1.5 text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5"
                        style={{ background: BRAND }}
                      >
                        {itemCount > 9 ? "9+" : itemCount}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-medium">Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ════ ROW 3 — Department navigation ════ */}
        <div
          className="hidden md:block bg-white border-b border-gray-200"
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
                      className={`flex items-center gap-0.5 px-3 py-3 whitespace-nowrap transition-colors border-b-2 ${
                        active
                          ? "border-[#7B189F] text-[#7B189F]"
                          : "border-transparent text-gray-700 hover:text-[#7B189F]"
                      }`}
                      style={{ fontSize: "var(--nav-size)", fontWeight: "var(--nav-weight)" }}
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown
                          size={11}
                          strokeWidth={2.5}
                          className={`ml-0.5 transition-transform duration-150 ${active ? "rotate-180" : ""}`}
                        />
                      )}
                    </Link>

                    {/* Dropdown */}
                    {active && item.children && (
                      <div className="absolute top-full left-0 bg-white border border-gray-200 shadow-xl py-1 min-w-[200px] z-50">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-5 py-2 text-[13px] text-gray-700 hover:bg-gray-50 hover:text-[#7B189F] transition-colors"
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

              {/* Sale — red, always at the end */}
              <Link
                href="/collections/sale"
                className="px-3 py-3 font-bold whitespace-nowrap shrink-0 border-b-2 border-transparent transition-colors hover:text-[#b01c21]"
                style={{ fontSize: "var(--nav-size)", color: "var(--sale)" }}
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
