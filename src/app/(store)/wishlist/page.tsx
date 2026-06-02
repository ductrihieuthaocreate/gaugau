import Link from "next/link";
import { Heart } from "lucide-react";

export const metadata = { title: "Wishlist - go2go" };

export default function WishlistPage() {
  return (
    <div className="container-site" style={{ padding: "32px var(--container-pad) 64px" }}>
      <h1 style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 700, marginBottom: "32px" }}>My Wishlist</h1>

      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <Heart size={48} color="#ccc" strokeWidth={1.5} style={{ margin: "0 auto 16px" }} />
        <p style={{ fontSize: "16px", color: "#555", marginBottom: "8px" }}>Your wishlist is empty</p>
        <p style={{ fontSize: "14px", color: "#888", marginBottom: "28px" }}>
          Browse our collections and tap the heart icon to save items you love.
        </p>
        <Link
          href="/collections/new"
          style={{
            display: "inline-block",
            background: "#7B189F",
            color: "white",
            padding: "12px 28px",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Explore Products
        </Link>
      </div>
    </div>
  );
}
