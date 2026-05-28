"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search, Menu, ShoppingCart, User, ChevronDown, X, ArrowRight, Heart,
} from "lucide-react";
import { NAV_ITEMS } from "./navData";
import { useCartStore } from "@/store/cartStore";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50 }}>
      {/* Layer 1: Purple utility bar — desktop only */}
      <div style={{ background: "#7B189F" }} className="hidden md:block">
        <div
          className="container-site flex items-center justify-between"
          style={{ height: "36px", fontSize: "12px" }}
        >
          <Link
            href="/"
            style={{ fontWeight: 700, fontSize: "15px", letterSpacing: "0.05em", color: "white" }}
          >
            go2go
          </Link>
          <div className="flex items-center gap-6" style={{ color: "rgba(255,255,255,0.88)" }}>
            <Link href="/rewards" style={{ color: "inherit" }}>Rewards</Link>
            <Link href="/financing" style={{ color: "inherit" }}>Financing</Link>
            <span>Free shipping on orders over $35</span>
          </div>
        </div>
      </div>

      {/* Layer 2: White main header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E5E5" }}>
        <div className="container-site">
          {/* Desktop */}
          <div
            className="hidden md:grid items-center"
            style={{ gridTemplateColumns: "2fr 7fr 3fr", height: "72px", gap: "16px" }}
          >
            <Link
              href="/"
              style={{ fontWeight: 700, fontSize: "22px", color: "var(--brand)", letterSpacing: "0.04em" }}
            >
              go2go
            </Link>

            <form action="/search" className="flex" style={{ height: "44px" }}>
              <input
                name="q"
                type="text"
                placeholder="Find anything home..."
                style={{
                  flex: 1,
                  border: "1px solid #D1D5DB",
                  borderRight: "none",
                  borderRadius: "4px 0 0 4px",
                  padding: "0 16px",
                  fontSize: "14px",
                  outline: "none",
                  background: "#fff",
                  color: "#212121",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#7B189F",
                  width: "56px",
                  border: "none",
                  borderRadius: "0 4px 4px 0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Search size={18} color="white" />
              </button>
            </form>

            <div className="flex items-center justify-end" style={{ gap: "20px" }}>
              <Link
                href="/account"
                className="flex flex-col items-center"
                style={{ gap: "2px", color: "#212121", textDecoration: "none" }}
              >
                <User size={22} />
                <span style={{ fontSize: "11px" }}>Account</span>
              </Link>
              <Link
                href="/wishlist"
                className="flex flex-col items-center"
                style={{ gap: "2px", color: "#212121", textDecoration: "none" }}
              >
                <Heart size={22} />
                <span style={{ fontSize: "11px" }}>Wishlist</span>
              </Link>
              <button
                onClick={openCart}
                className="flex flex-col items-center relative"
                style={{
                  gap: "2px",
                  color: "#212121",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <span style={{ position: "relative", display: "inline-flex" }}>
                  <ShoppingCart size={22} />
                  {totalItems > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-6px",
                        right: "-6px",
                        background: "#7B189F",
                        color: "white",
                        borderRadius: "50%",
                        width: "16px",
                        height: "16px",
                        fontSize: "10px",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        lineHeight: 1,
                      }}
                    >
                      {totalItems}
                    </span>
                  )}
                </span>
                <span style={{ fontSize: "11px" }}>Cart</span>
              </button>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center" style={{ height: "56px" }}>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex flex-col items-center"
              style={{
                flex: "4 4 0%",
                gap: "2px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#212121",
                alignItems: "flex-start",
              }}
            >
              <Menu size={22} />
              <span style={{ fontSize: "11px" }}>Menu</span>
            </button>

            <Link
              href="/"
              style={{
                flex: "4 4 0%",
                textAlign: "center",
                fontWeight: 700,
                fontSize: "20px",
                color: "var(--brand)",
                letterSpacing: "0.04em",
              }}
            >
              go2go
            </Link>

            <div style={{ flex: "4 4 0%", display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={openCart}
                className="flex flex-col items-center"
                style={{
                  gap: "2px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#212121",
                  position: "relative",
                }}
              >
                <span style={{ position: "relative", display: "inline-flex" }}>
                  <ShoppingCart size={22} />
                  {totalItems > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-6px",
                        right: "-6px",
                        background: "#7B189F",
                        color: "white",
                        borderRadius: "50%",
                        width: "16px",
                        height: "16px",
                        fontSize: "10px",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        lineHeight: 1,
                      }}
                    >
                      {totalItems}
                    </span>
                  )}
                </span>
                <span style={{ fontSize: "11px" }}>Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 3: Mobile search row */}
      <div
        className="md:hidden"
        style={{ background: "#fff", borderBottom: "1px solid #E5E5E5", padding: "8px 16px" }}
      >
        <form action="/search" className="flex" style={{ height: "40px" }}>
          <input
            name="q"
            type="text"
            placeholder="Find anything home..."
            style={{
              flex: 1,
              border: "1px solid #D1D5DB",
              borderRight: "none",
              borderRadius: "4px 0 0 4px",
              padding: "0 12px",
              fontSize: "14px",
              outline: "none",
              background: "#fff",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#7B189F",
              width: "48px",
              border: "none",
              borderRadius: "0 4px 4px 0",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Search size={16} color="white" />
          </button>
        </form>
      </div>

      {/* Layer 4: Department nav — desktop only */}
      <div
        className="hidden md:block"
        style={{ background: "#fff", borderBottom: "1px solid #E5E5E5" }}
      >
        <div className="container-site">
          <nav className="flex items-center" style={{ height: "44px", gap: "2px" }}>
            {NAV_ITEMS.map((item) => (
              <div
                key={item.href}
                style={{ position: "relative" }}
                onMouseEnter={() => setActiveDropdown(item.href)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center"
                  style={{
                    gap: "3px",
                    padding: "6px 10px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#212121",
                    borderRadius: "4px",
                    transition: "background 150ms",
                    background: activeDropdown === item.href ? "#F5F5F5" : "transparent",
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                  {item.children && <ChevronDown size={12} />}
                </Link>

                {item.children && activeDropdown === item.href && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      background: "#fff",
                      border: "1px solid #E5E5E5",
                      borderRadius: "4px",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                      minWidth: "210px",
                      zIndex: 100,
                      padding: "6px 0",
                    }}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        style={{
                          display: "block",
                          padding: "9px 16px",
                          fontSize: "13px",
                          color: "#212121",
                          textDecoration: "none",
                          transition: "background 150ms",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.background = "#F5F5F5";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/collections/sale"
              style={{
                padding: "6px 10px",
                fontSize: "13px",
                fontWeight: 700,
                color: "#990E35",
                borderRadius: "4px",
                transition: "background 150ms",
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
            >
              Sale
            </Link>
          </nav>
        </div>
      </div>

      {/* Layer 5: Purple sitewide promo banner */}
      <div style={{ background: "#7B189F", padding: "9px 16px" }}>
        <div
          className="container-site flex items-center justify-center"
          style={{ gap: "8px", color: "white", fontSize: "13px", fontWeight: 600 }}
        >
          <span>SUMMER SALE — Up to 70% off select items</span>
          <ArrowRight size={14} />
        </div>
      </div>

      {/* Mobile drawer overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 fade-in"
            style={{ background: "rgba(0,0,0,0.5)", zIndex: 200 }}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className="fixed top-0 left-0 h-full slide-in-left"
            style={{ width: "320px", background: "#fff", zIndex: 201, overflowY: "auto" }}
          >
            <div
              className="flex items-center justify-between"
              style={{ padding: "16px 20px", borderBottom: "1px solid #E5E5E5" }}
            >
              <Link
                href="/"
                style={{ fontWeight: 700, fontSize: "20px", color: "var(--brand)", letterSpacing: "0.04em" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                go2go
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#212121" }}
              >
                <X size={22} />
              </button>
            </div>

            <nav>
              {NAV_ITEMS.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: "block",
                      padding: "13px 20px",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#212121",
                      borderBottom: "1px solid #F5F5F5",
                      textDecoration: "none",
                    }}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div style={{ background: "#FAFAFA" }}>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          style={{
                            display: "block",
                            padding: "10px 36px",
                            fontSize: "13px",
                            color: "#555",
                            borderBottom: "1px solid #F0F0F0",
                            textDecoration: "none",
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/collections/sale"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "13px 20px",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#990E35",
                  textDecoration: "none",
                }}
              >
                Sale
              </Link>
            </nav>

            <div style={{ padding: "20px", borderTop: "1px solid #E5E5E5", marginTop: "8px" }}>
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center"
                style={{ gap: "10px", color: "#212121", fontSize: "14px", textDecoration: "none", marginBottom: "14px" }}
              >
                <User size={18} /> My Account
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center"
                style={{ gap: "10px", color: "#212121", fontSize: "14px", textDecoration: "none" }}
              >
                <Heart size={18} /> Wishlist
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
