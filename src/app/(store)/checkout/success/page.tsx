"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-5">
          <CheckCircle size={56} className="text-green-500" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          Thank you for your purchase. You'll receive a confirmation email from Stripe shortly with your order details.
        </p>
        <Link
          href="/"
          className="inline-block bg-black text-white font-bold text-sm px-8 py-4 rounded-xl hover:bg-gray-900 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
