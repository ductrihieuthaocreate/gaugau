import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata = { title: "Order Confirmed — go2go" };

export default function CheckoutSuccessPage() {
  return (
    <div
      className="container-site flex flex-col items-center justify-center"
      style={{ minHeight: "60vh", padding: "64px var(--container-pad)", textAlign: "center" }}
    >
      <CheckCircle size={64} color="#7B189F" strokeWidth={1.5} />
      <h1 style={{ fontSize: "28px", fontWeight: 700, marginTop: "24px", marginBottom: "12px" }}>
        Thank you for your order!
      </h1>
      <p style={{ fontSize: "15px", color: "#555", maxWidth: "440px", lineHeight: 1.6 }}>
        Your order has been confirmed. You&apos;ll receive a confirmation email shortly with tracking details.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "32px",
          display: "inline-block",
          background: "#7B189F",
          color: "white",
          padding: "13px 32px",
          borderRadius: "4px",
          fontSize: "14px",
          fontWeight: 700,
          textDecoration: "none",
          letterSpacing: "0.02em",
        }}
      >
        Continue Shopping
      </Link>
    </div>
  );
}
