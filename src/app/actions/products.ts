"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import type { Product } from "@/types";

type ProductInput = Omit<Product, "id" | "created_at" | "category">;

export async function addProduct(
  data: ProductInput
): Promise<{ error?: string }> {
  const supabase = createAdminClient();

  const { images, ...productData } = data;

  const { data: inserted, error } = await supabase
    .from("products")
    .insert({
      title: productData.title,
      slug: productData.slug,
      description: productData.description,
      price: productData.price,
      compare_at_price: productData.compare_at_price,
      category_id: productData.category_id,
      tags: productData.tags,
      is_active: productData.is_active,
      is_featured: productData.is_featured,
      stock_quantity: productData.stock_quantity,
    })
    .select("id")
    .single();

  if (error || !inserted) {
    return { error: error?.message ?? "Failed to insert product" };
  }

  if (images && images.length > 0) {
    const imageRows = images.map((img, i) => ({
      product_id: inserted.id,
      url: img.url,
      alt: img.alt,
      sort_order: i,
    }));
    await supabase.from("product_images").insert(imageRows);
  }

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/collections/new");

  return {};
}

export async function updateProduct(
  id: string,
  data: ProductInput
): Promise<{ error?: string }> {
  const supabase = createAdminClient();

  const { images, ...productData } = data;

  const { error } = await supabase
    .from("products")
    .update({
      title: productData.title,
      slug: productData.slug,
      description: productData.description,
      price: productData.price,
      compare_at_price: productData.compare_at_price,
      category_id: productData.category_id,
      tags: productData.tags,
      is_active: productData.is_active,
      is_featured: productData.is_featured,
      stock_quantity: productData.stock_quantity,
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  // Replace images: delete all then re-insert
  await supabase.from("product_images").delete().eq("product_id", id);

  if (images && images.length > 0) {
    const imageRows = images.map((img, i) => ({
      product_id: id,
      url: img.url,
      alt: img.alt,
      sort_order: i,
    }));
    await supabase.from("product_images").insert(imageRows);
  }

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/collections/new");
  revalidatePath("/products/[slug]", "page");

  return {};
}

export async function deleteProduct(id: string): Promise<void> {
  const supabase = createAdminClient();
  // Cascade handles product_images
  await supabase.from("products").delete().eq("id", id);

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/collections/new");
}

export async function toggleProductActive(
  id: string,
  current: boolean
): Promise<void> {
  const supabase = createAdminClient();
  await supabase.from("products").update({ is_active: !current }).eq("id", id);

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/products/[slug]", "page");
}

export async function toggleProductFeatured(
  id: string,
  current: boolean
): Promise<void> {
  const supabase = createAdminClient();
  await supabase
    .from("products")
    .update({ is_featured: !current })
    .eq("id", id);

  revalidatePath("/admin/products");
  revalidatePath("/");
}
