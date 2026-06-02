import Link from "next/link";
import { User, Package, Heart, MapPin, CreditCard } from "lucide-react";

export const metadata = { title: "My Account - go2go" };

export default function AccountPage() {
  return (
    <div className="container-site" style={{ padding: "32px var(--container-pad) 64px" }}>
      <h1 style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 700, marginBottom: "32px" }}>My Account</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
        {[
          { Icon: Package, title: "Orders", desc: "Track, return, or buy again", href: "/account" },
          { Icon: Heart, title: "Wishlist", desc: "Your saved items", href: "/wishlist" },
          { Icon: MapPin, title: "Addresses", desc: "Manage shipping addresses", href: "/account" },
          { Icon: CreditCard, title: "Payment Methods", desc: "Manage payment options", href: "/account" },
          { Icon: User, title: "Account Details", desc: "Update name, email, password", href: "/account" },
        ].map(({ Icon, title, desc, href }) => (
          <Link
            key={title}
            href={href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "20px 24px",
              background: "#fff",
              border: "1px solid #E5E5E5",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#212121",
              transition: "box-shadow 150ms",
            }}
          >
            <div style={{ background: "#f3e8fb", borderRadius: "8px", padding: "10px" }}>
              <Icon size={20} color="#7B189F" />
            </div>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 700 }}>{title}</p>
              <p style={{ fontSize: "13px", color: "#888", marginTop: "2px" }}>{desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: "48px", padding: "32px", background: "#F9F9F9", borderRadius: "8px", textAlign: "center" }}>
        <p style={{ fontSize: "15px", color: "#555", marginBottom: "16px" }}>
          Sign in to view your orders, wishlist, and account details.
        </p>
        <Link
          href="/admin/login"
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
          Sign In
        </Link>
      </div>
    </div>
  );
}
