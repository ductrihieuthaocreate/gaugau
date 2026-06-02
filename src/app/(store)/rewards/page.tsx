import Link from "next/link";
import { Star, Gift, Percent, Crown } from "lucide-react";

export const metadata = { title: "Rewards - go2go" };

export default function RewardsPage() {
  return (
    <div className="container-site" style={{ padding: "32px var(--container-pad) 64px" }}>
      <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
        <Crown size={48} color="#7B189F" strokeWidth={1.5} style={{ margin: "0 auto 16px" }} />
        <h1 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, marginBottom: "12px" }}>go2go Rewards</h1>
        <p style={{ fontSize: "15px", color: "#555", lineHeight: 1.6, marginBottom: "40px" }}>
          Earn points on every purchase and unlock exclusive perks, discounts, and early access to new arrivals.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px", marginBottom: "48px" }}>
        {[
          { Icon: Star, title: "Earn Points", desc: "Get 1 point for every $1 spent. Points never expire." },
          { Icon: Percent, title: "Exclusive Discounts", desc: "Unlock member-only sales and early access to promotions." },
          { Icon: Gift, title: "Birthday Reward", desc: "Receive a special gift on your birthday every year." },
        ].map(({ Icon, title, desc }) => (
          <div
            key={title}
            style={{
              background: "#fff",
              border: "1px solid #E5E5E5",
              borderRadius: "8px",
              padding: "28px 24px",
              textAlign: "center",
            }}
          >
            <div style={{ background: "#f3e8fb", borderRadius: "50%", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Icon size={22} color="#7B189F" />
            </div>
            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>{title}</h3>
            <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.5 }}>{desc}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", padding: "32px", background: "#F9F9F9", borderRadius: "8px" }}>
        <p style={{ fontSize: "15px", color: "#555", marginBottom: "16px" }}>
          Create an account or sign in to start earning rewards today.
        </p>
        <Link
          href="/account"
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
          Join Now
        </Link>
      </div>
    </div>
  );
}
