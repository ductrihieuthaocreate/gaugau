"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import type { Category } from "@/types";

export async function addCategory(
  data: Omit<Category, "id" | "created_at">
): Promise<{ error?: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase.from("categories").insert({
    name: data.name,
    slug: data.slug,
    description: data.description,
    parent_id: data.parent_id,
    image_url: data.image_url,
    sort_order: data.sort_order,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/");

  return {};
}

export async function updateCategory(
  id: string,
  data: Partial<Category>
): Promise<{ error?: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("categories")
    .update({
      name: data.name,
      slug: data.slug,
      description: data.description,
      parent_id: data.parent_id,
      image_url: data.image_url,
      sort_order: data.sort_order,
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/");

  return {};
}

export async function deleteCategory(id: string): Promise<void> {
  const supabase = createAdminClient();
  await supabase.from("categories").delete().eq("id", id);

  revalidatePath("/admin/categories");
  revalidatePath("/");
}
