import Link from "next/link";

export const metadata = { title: "Page Not Found - go2go" };

export default function NotFound() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 16px" }}>
      <div style={{ textAlign: "center", maxWidth: "440px" }}>
        <p style={{ fontSize: "64px", fontWeight: 700, color: "#E5E5E5", marginBottom: "8px" }}>404</p>
        <h1 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>Page Not Found</h1>
        <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.6, marginBottom: "28px" }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/"
            style={{
              background: "#7B189F",
              color: "white",
              padding: "12px 28px",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Go Home
          </Link>
          <Link
            href="/collections/new"
            style={{
              border: "1px solid #E5E5E5",
              padding: "12px 28px",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#555",
              textDecoration: "none",
            }}
          >
            Shop New Arrivals
          </Link>
        </div>
      </div>
    </div>
  );
}
