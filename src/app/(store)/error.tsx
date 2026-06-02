"use client";

import Link from "next/link";

export default function StoreError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: "400px", padding: "0 16px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px" }}>Something went wrong</h1>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>
          We encountered an unexpected error. Please try again.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            onClick={reset}
            style={{
              background: "#7B189F",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "10px 24px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
          <Link
            href="/"
            style={{
              border: "1px solid #E5E5E5",
              borderRadius: "4px",
              padding: "10px 24px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#555",
              textDecoration: "none",
            }}
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
