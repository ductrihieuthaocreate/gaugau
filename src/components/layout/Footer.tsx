"use client";

import Link from "next/link";

const FOOTER_COLS = [
  {
    heading: "Shop",
    links: [
      { label: "New Arrivals", href: "/collections/new" },
      { label: "Best Sellers", href: "/collections/best-sellers" },
      { label: "Sale", href: "/collections/sale" },
      { label: "Gifts", href: "/collections/gifts" },
      { label: "Kitchen", href: "/collections/kitchen" },
      { label: "Home Decor", href: "/collections/home-decor" },
      { label: "Gadgets", href: "/collections/gadgets" },
      { label: "Wellness", href: "/collections/wellness" },
    ],
  },
  {
    heading: "Customer Service",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Track My Order", href: "/orders/track" },
      { label: "Returns & Exchanges", href: "/returns" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Contact Us", href: "/contact" },
      { label: "Size Guide", href: "/size-guide" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Affiliate Program", href: "/affiliates" },
      { label: "Gift Cards", href: "/gift-cards" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#1a1a1a", color: "#ccc", marginTop: "auto" }}>
      {/* Newsletter */}
      <div style={{ background: "#111", borderBottom: "1px solid #333", padding: "40px 16px" }}>
        <div
          className="container-site flex flex-col md:flex-row items-start md:items-center justify-between"
          style={{ gap: "20px" }}
        >
          <div>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
              Join the go2go community
            </p>
            <p style={{ fontSize: "13px", color: "#aaa" }}>
              Get design inspiration, new arrivals, and exclusive offers.
            </p>
          </div>
          <form className="flex" style={{ height: "44px", width: "100%", maxWidth: "400px" }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                background: "#222",
                border: "1px solid #444",
                borderRight: "none",
                borderRadius: "4px 0 0 4px",
                padding: "0 16px",
                fontSize: "14px",
                color: "#fff",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                background: "#7B189F",
                color: "white",
                border: "none",
                borderRadius: "0 4px 4px 0",
                padding: "0 20px",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer links */}
      <div style={{ padding: "48px 16px 32px" }}>
        <div className="container-site">
          <div
            className="grid"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "40px" }}
          >
            {/* Brand column */}
            <div>
              <Link
                href="/"
                style={{ fontWeight: 700, fontSize: "22px", color: "#fff", letterSpacing: "0.04em", textDecoration: "none" }}
              >
                go2go
              </Link>
              <p style={{ marginTop: "12px", fontSize: "13px", lineHeight: "1.6", color: "#999", maxWidth: "200px" }}>
                Thoughtfully designed objects for everyday life.
              </p>
              <div className="flex items-center" style={{ gap: "14px", marginTop: "20px" }}>
                {["Instagram", "Pinterest", "TikTok", "YouTube"].map((name) => (
                  <Link
                    key={name}
                    href="#"
                    title={name}
                    style={{
                      color: "#999",
                      fontSize: "11px",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "color 150ms",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#999"; }}
                  >
                    {name.slice(0, 2).toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>

            {FOOTER_COLS.map((col) => (
              <div key={col.heading}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginBottom: "14px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {col.heading}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        style={{ fontSize: "13px", color: "#999", textDecoration: "none", transition: "color 150ms" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#999"; }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid #333", padding: "16px", fontSize: "12px", color: "#666" }}>
        <div
          className="container-site flex flex-col md:flex-row items-center justify-between"
          style={{ gap: "8px" }}
        >
          <span>© {new Date().getFullYear()} Go2go Designs. All rights reserved.</span>
          <div className="flex items-center" style={{ gap: "16px" }}>
            <Link href="/privacy" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: "inherit", textDecoration: "none" }}>Terms of Use</Link>
            <Link href="/accessibility" style={{ color: "inherit", textDecoration: "none" }}>Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
