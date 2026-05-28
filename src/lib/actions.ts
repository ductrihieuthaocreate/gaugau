"use server";

import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import type { CartItem } from "@/types";

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function createStripeSession(items: CartItem[], origin: string) {
  const stripe = getStripe();
  if (!stripe || !items.length) throw new Error("Checkout unavailable");

  const lineItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      unit_amount: item.product.price,
      product_data: {
        name: item.product.title,
        images: item.product.images?.[0]?.url ? [item.product.images[0].url] : [],
      },
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/`,
  });

  return session.url!;
}

export async function getAdminProducts() {
  const supabase = createAdminClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("products")
    .select(`*, category:categories(id,name,slug), images:product_images(url,alt,position)`)
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAdminProduct(id: string) {
  const supabase = createAdminClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("products")
    .select(`*, category:categories(id,name,slug), images:product_images(url,alt,position)`)
    .eq("id", id)
    .single();
  return data;
}

export async function upsertProduct(product: {
  id?: string;
  title: string;
  slug: string;
  description?: string;
  price: number;
  compare_at_price?: number;
  stock_quantity: number;
  category_id?: string;
  tags?: string[];
  featured?: boolean;
  imageUrls?: string[];
}) {
  const supabase = createAdminClient();
  if (!supabase) throw new Error("Admin client unavailable");

  const { imageUrls, ...productData } = product;

  const { data, error } = product.id
    ? await supabase.from("products").update(productData).eq("id", product.id).select().single()
    : await supabase.from("products").insert(productData).select().single();

  if (error) throw new Error(error.message);

  if (imageUrls?.length && data) {
    await supabase.from("product_images").delete().eq("product_id", data.id);
    await supabase.from("product_images").insert(
      imageUrls.map((url, i) => ({ product_id: data.id, url, alt: product.title, position: i }))
    );
  }

  return data;
}

export async function deleteProduct(id: string) {
  const supabase = createAdminClient();
  if (!supabase) throw new Error("Admin client unavailable");
  await supabase.from("product_images").delete().eq("product_id", id);
  await supabase.from("products").delete().eq("id", id);
}

export async function getAdminCategories() {
  const supabase = createAdminClient();
  if (!supabase) return [];
  const { data } = await supabase.from("categories").select("*").order("name");
  return data ?? [];
}

export async function upsertCategory(cat: { id?: string; name: string; slug: string; description?: string; image_url?: string }) {
  const supabase = createAdminClient();
  if (!supabase) throw new Error("Admin client unavailable");
  const { data, error } = cat.id
    ? await supabase.from("categories").update(cat).eq("id", cat.id).select().single()
    : await supabase.from("categories").insert(cat).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteCategory(id: string) {
  const supabase = createAdminClient();
  if (!supabase) throw new Error("Admin client unavailable");
  await supabase.from("categories").delete().eq("id", id);
}

export async function getAdminOrders() {
  const supabase = createAdminClient();
  if (!supabase) return [];
  const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
  return data ?? [];
}

export async function saveHeroSettings(settings: Record<string, unknown>) {
  const supabase = createAdminClient();
  if (!supabase) throw new Error("Admin client unavailable");
  await supabase.from("settings").upsert({ key: "hero", value: settings });
}
