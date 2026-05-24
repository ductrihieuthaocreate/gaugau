"use server";

import Stripe from "stripe";

type LineItem = {
  name: string;
  price: number; // cents
  quantity: number;
  image?: string;
};

export async function createStripeSession(items: LineItem[]): Promise<string> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          ...(item.image ? { images: [item.image] } : {}),
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    })),
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "AU", "VN", "SG", "JP", "KR"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "usd" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 995, currency: "usd" },
          display_name: "Express shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 2 },
            maximum: { unit: "business_day", value: 3 },
          },
        },
      },
    ],
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/checkout`,
    allow_promotion_codes: true,
  });

  return session.url!;
}
