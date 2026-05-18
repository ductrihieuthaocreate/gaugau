"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { MobileDrawer } from "./MobileDrawer";
import { NAV_ITEMS } from "./navData";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-30 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "border-b border-gray-200"
        }`}
      >
        {/* ── ROW 1: Logo + Icons ── */}
        <div className="container-site">
          <div className="flex items-center justify-between h-[60px]">

            {/* LEFT: hamburger (mobile only) + logo */}
            <div className="flex items-center gap-3">
              {/* Hamburger — mobile only */}
              <button
                className="md:hidden flex flex-col justify-center gap-[5px] w-6 h-5 shrink-0 group"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <span className="block w-full h-[1.5px] bg-black transition-all" />
                <span className="block w-full h-[1.5px] bg-black transition-all" />
                <span className="block w-full h-[1.5px] bg-black transition-all" />
              </button>

              {/* Logo badge */}
              <Link
                href="/"
                className="inline-flex items-center bg-[#e63329] hover:bg-[#c9291f] transition-colors rounded-sm px-3 py-[7px] select-none"
                aria-label="Gaugau home"
              >
                <span className="text-white font-extrabold text-[13px] tracking-[0.1em] uppercase leading-none">
                  GAUGAU
                </span>
              </Link>
            </div>

            {/* RIGHT: icons */}
            <div className="flex items-center">
              {/* Inline search bar */}
              {searchOpen && (
                <form
                  className="flex items-center border-b border-black mr-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                >
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search…"
                    className="outline-none text-sm px-1 w-36 bg-transparent py-0.5"
                  />
                  <button
                    type="button"
                    onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                    className="p-1 text-gray-400 hover:text-black transition-colors"
                    aria-label="Close search"
                  >
                    <X size={15} />
                  </button>
                </form>
              )}

              <button
                className="p-3 hover:opacity-50 transition-opacity"
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Search"
              >
                <Search size={20} strokeWidth={1.4} />
              </button>

              <Link
                href="/account"
                className="p-3 hover:opacity-50 transition-opacity"
                aria-label="Account"
              >
                <User size={20} strokeWidth={1.4} />
              </Link>

              <button
                className="p-3 relative hover:opacity-50 transition-opacity"
                onClick={openCart}
                aria-label={`Cart${itemCount > 0 ? ` (${itemCount})` : ""}`}
              >
                <ShoppingCart size={20} strokeWidth={1.4} />
                {itemCount > 0 && (
                  <span className="absolute top-1.5 right-1 bg-[#c72d00] text-white text-[9px] font-extrabold rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5 leading-none">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* ── ROW 2: Full-width nav (desktop only) ── */}
        <div
          className="hidden md:block border-t border-gray-200"
          onMouseLeave={() => setHoveredNav(null)}
        >
          <div className="container-site">
            <nav className="flex items-center justify-between">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setHoveredNav(item.label)}
                >
                  <Link
                    href={item.href}
                    className="block px-2 py-4 whitespace-nowrap transition-colors hover:opacity-50 relative"
                    style={{
                      fontSize: "var(--nav-size)",
                      fontWeight: "var(--nav-weight)",
                      letterSpacing: "var(--nav-letter-spacing)",
                      lineHeight: "var(--nav-line-height)",
                    }}
                  >
                    {item.label}

                    {/* Animated underline */}
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] bg-black transition-transform duration-200 origin-left ${
                        hoveredNav === item.label ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>

                  {/* Dropdown */}
                  {hoveredNav === item.label && item.children && (
                    <div className="absolute top-full left-0 bg-white border border-gray-200 shadow-lg py-2 min-w-[190px] z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                          onClick={() => setHoveredNav(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

      </header>

      {/* Mobile sidebar drawer */}
      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
