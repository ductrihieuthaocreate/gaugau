import Stripe from "stripe";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET || !process.env.STRIPE_SECRET_KEY) {
    return new Response("Missing Stripe config", { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return new Response("Webhook signature verification failed", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { createAdminClient } = await import("@/lib/supabase/admin");
      const supabase = createAdminClient();

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      const orderItems = lineItems.data.map((li: Stripe.LineItem) => ({
        product_title: li.description ?? "Unknown",
        quantity: li.quantity ?? 1,
        unit_price: li.price?.unit_amount ?? 0,
        total_price: (li.price?.unit_amount ?? 0) * (li.quantity ?? 1),
      }));

      const { data: order } = await supabase
        .from("orders")
        .insert({
          customer_name: session.customer_details?.name ?? null,
          customer_email: session.customer_details?.email ?? null,
          status: "processing",
          subtotal: session.amount_subtotal ?? 0,
          shipping_cost: 0,
          tax: session.total_details?.amount_tax ?? 0,
          total_price: session.amount_total ?? 0,
          shipping_address: {},
        })
        .select("id")
        .single();

      if (order?.id && orderItems.length > 0) {
        await supabase.from("order_items").insert(
          orderItems.map((item: typeof orderItems[0]) => ({ ...item, order_id: order.id }))
        );
      }
    }
  }

  return new Response("ok", { status: 200 });
}
