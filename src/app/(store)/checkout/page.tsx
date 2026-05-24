"use client";

import { useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, ShoppingBag, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { createStripeSession } from "@/app/actions/stripe";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function CheckoutPage() {
  const { items, totalPrice } = useCartStore();
  const [pending, startTransition] = useTransition();

  const subtotal = totalPrice();
  const shippingCost = subtotal >= 3500 ? 0 : 599;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shippingCost + tax;

  const handlePay = () => {
    startTransition(async () => {
      const url = await createStripeSession(
        items.map((item) => ({
          name: item.product.title,
          price: item.price,
          quantity: item.quantity,
          image: item.product.images[0]?.url,
        }))
      );
      window.location.href = url;
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-xl font-bold mb-2">Your cart is empty</p>
          <Link href="/" className="text-sm font-bold underline hover:opacity-60">
            Start shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-[0.15em] uppercase">
            GAUGAU
          </Link>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Lock size={12} />
            <span>Secure Checkout · Powered by Stripe</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* Left: info */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-base uppercase tracking-wider mb-4">Order Review</h2>
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-xl bg-gray-100 relative overflow-hidden shrink-0">
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
                    <p className="text-sm font-medium leading-snug">{item.product.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold shrink-0">{formatPrice(item.price * item.quantity)}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-sm text-blue-700">
            <p className="font-semibold mb-0.5">Powered by Stripe</p>
            <p className="text-xs text-blue-600 leading-relaxed">
              You'll enter your shipping address and payment details securely on the next page. Apple Pay and Google Pay accepted.
            </p>
          </div>
        </div>

        {/* Right: summary + pay */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24 space-y-4">
            <h2 className="font-bold text-sm uppercase tracking-wider">Order Summary</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="text-gray-400 text-xs italic">Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span className="text-gray-400 text-xs italic">Calculated at checkout</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={pending}
              className="w-full flex items-center justify-center gap-2 bg-black text-white font-bold text-sm py-4 rounded-xl hover:bg-gray-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {pending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Redirecting to Stripe…
                </>
              ) : (
                <>
                  <Lock size={14} />
                  Pay with Stripe
                </>
              )}
            </button>

            <p className="text-xs text-gray-400 text-center">
              SSL encrypted · Your payment info is never stored on our servers
            </p>

            <Link
              href="/"
              className="block text-center text-xs text-gray-500 hover:underline"
            >
              ← Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
