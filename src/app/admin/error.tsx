"use client";

export default function AdminError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: "32px" }}>
      <div style={{ background: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: "8px", padding: "24px", maxWidth: "500px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#991B1B", marginBottom: "8px" }}>Error</h2>
        <p style={{ fontSize: "14px", color: "#7F1D1D", marginBottom: "16px" }}>
          Something went wrong loading this page. Please try again.
        </p>
        <button
          onClick={reset}
          style={{
            background: "#7B189F",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "9px 20px",
            fontSize: "13px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
