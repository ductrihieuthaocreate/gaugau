"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Lock } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

type Step = "shipping" | "payment" | "review";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>("shipping");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [shipping, setShipping] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address1: "", address2: "", city: "", state: "", zip: "", country: "US",
  });

  const subtotal = totalPrice();
  const shippingCost = subtotal >= 3500 ? 0 : 599;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shippingCost + tax;

  const setField = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setShipping((s) => ({ ...s, [field]: e.target.value }));

  const handlePlaceOrder = () => {
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#f1f1f1] flex items-center justify-center px-4">
        <div className="bg-white rounded-modal shadow-sm p-10 max-w-md w-full text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 text-sm mb-2">
            Thank you for your order. A confirmation has been sent to{" "}
            <strong>{shipping.email || "your email"}</strong>.
          </p>
          <p className="text-gray-500 text-xs mb-8">
            Order #GG-{Math.random().toString(36).slice(2, 8).toUpperCase()}
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white font-bold text-sm px-8 py-4 rounded-btn hover:bg-gray-900 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f1f1f1] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-xl font-bold mb-4">Your cart is empty</p>
          <Link href="/" className="text-sm font-bold underline">
            Start shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f1f1]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-[0.15em] uppercase">
            GAUGAU
          </Link>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Lock size={12} />
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>

      {/* Steps indicator */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-5xl mx-auto px-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
          {(["shipping", "payment", "review"] as Step[]).map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              {i > 0 && <ChevronRight size={12} className="text-gray-400" />}
              <span className={step === s ? "text-black" : "text-gray-400"}>
                {s}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* Left: form */}
        <div>
          {step === "shipping" && (
            <div className="bg-white rounded-card p-6">
              <h2 className="font-bold text-lg uppercase tracking-wider mb-6">
                Shipping Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "First Name", field: "firstName", span: 1 },
                  { label: "Last Name", field: "lastName", span: 1 },
                  { label: "Email", field: "email", span: 2, type: "email" },
                  { label: "Phone", field: "phone", span: 2, type: "tel" },
                  { label: "Address", field: "address1", span: 2 },
                  { label: "Apartment, suite, etc.", field: "address2", span: 2 },
                  { label: "City", field: "city", span: 1 },
                  { label: "State", field: "state", span: 1 },
                  { label: "ZIP Code", field: "zip", span: 1 },
                ].map((f) => (
                  <div key={f.field} className={f.span === 2 ? "col-span-2" : ""}>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                      {f.label}
                    </label>
                    <input
                      type={f.type || "text"}
                      value={(shipping as Record<string, string>)[f.field]}
                      onChange={setField(f.field)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => setStep("payment")}
                className="mt-6 w-full bg-black text-white font-bold text-sm py-4 rounded-btn hover:bg-gray-900 transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {step === "payment" && (
            <div className="bg-white rounded-card p-6">
              <h2 className="font-bold text-lg uppercase tracking-wider mb-6">
                Payment
              </h2>
              <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50 text-sm text-gray-600">
                <p className="font-medium mb-1">Test Mode</p>
                <p>Connect Stripe or another payment provider to accept real payments.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                      Expiry
                    </label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep("shipping")}
                  className="flex-1 border border-gray-300 text-sm font-bold py-4 rounded-btn hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep("review")}
                  className="flex-1 bg-black text-white font-bold text-sm py-4 rounded-btn hover:bg-gray-900 transition-colors"
                >
                  Review Order
                </button>
              </div>
            </div>
          )}

          {step === "review" && (
            <div className="bg-white rounded-card p-6">
              <h2 className="font-bold text-lg uppercase tracking-wider mb-6">
                Review Your Order
              </h2>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="w-14 h-14 rounded-lg bg-gray-100 relative overflow-hidden shrink-0">
                      {item.product.images[0] && (
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.title}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep("payment")}
                  className="flex-1 border border-gray-300 text-sm font-bold py-4 rounded-btn hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="flex-1 bg-black text-white font-bold text-sm py-4 rounded-btn hover:bg-gray-900 transition-colors"
                >
                  Place Order — {formatPrice(total)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: order summary */}
        <div>
          <div className="bg-white rounded-card p-6 sticky top-24">
            <h2 className="font-bold text-sm uppercase tracking-wider mb-5">
              Order Summary
            </h2>
            <ul className="space-y-3 mb-5">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden relative">
                      {item.product.images[0] && (
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 bg-gray-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium leading-tight line-clamp-2">
                      {item.product.title}
                    </p>
                  </div>
                  <p className="text-xs font-bold shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Est. Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
