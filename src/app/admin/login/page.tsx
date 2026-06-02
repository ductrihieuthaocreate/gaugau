"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/adminAuth";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F7F7F7" }}>
      <div style={{ width: "100%", maxWidth: "380px", background: "#fff", border: "1px solid #E5E5E5", borderRadius: "8px", padding: "40px 32px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px", textAlign: "center" }}>Admin Login</h1>
        <p style={{ fontSize: "13px", color: "#888", textAlign: "center", marginBottom: "28px" }}>Sign in to manage your store</p>

        {state?.error && (
          <div style={{ background: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: "4px", padding: "10px 14px", color: "#991B1B", fontSize: "13px", marginBottom: "20px" }}>
            {state.error}
          </div>
        )}

        <form action={action} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#555", marginBottom: "6px" }}>Email</label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              style={{ width: "100%", border: "1px solid #E5E5E5", borderRadius: "4px", padding: "10px 12px", fontSize: "14px", outline: "none" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#555", marginBottom: "6px" }}>Password</label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              style={{ width: "100%", border: "1px solid #E5E5E5", borderRadius: "4px", padding: "10px 12px", fontSize: "14px", outline: "none" }}
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            style={{
              marginTop: "8px",
              width: "100%",
              height: "44px",
              background: pending ? "#ccc" : "#7B189F",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: pending ? "not-allowed" : "pointer",
            }}
          >
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
