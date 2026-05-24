import { createClient } from "./supabase/server";
import type { Product, Category } from "@/types";

function supabaseReady() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function getProducts({
  categorySlug,
  limit = 12,
  offset = 0,
  featured,
  tag,
  search,
}: {
  categorySlug?: string;
  limit?: number;
  offset?: number;
  featured?: boolean;
  tag?: string;
  search?: string;
} = {}): Promise<Product[]> {
  if (!supabaseReady()) return [];
  try {
    const supabase = await createClient();

    let query = supabase
      .from("products")
      .select(`*, images:product_images(*), category:categories(*)`)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (featured) query = query.eq("is_featured", true);
    if (tag) query = query.contains("tags", [tag]);
    if (search) query = query.ilike("title", `%${search}%`);

    if (categorySlug) {
      const { data: category } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", categorySlug)
        .single();
      if (category) query = query.eq("category_id", category.id);
    }

    const { data, error } = await query;
    if (error) return [];
    return (data as Product[]) || [];
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!supabaseReady()) return null;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select(`*, images:product_images(*), category:categories(*)`)
      .eq("slug", slug)
      .eq("is_active", true)
      .single();
    if (error) return null;
    return data as Product;
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  if (!supabaseReady()) return [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .is("parent_id", null)
      .order("sort_order");
    if (error) return [];
    return data as Category[];
  } catch {
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!supabaseReady()) return null;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .single();
    if (error) return null;
    return data as Category;
  } catch {
    return null;
  }
}

export async function getRelatedProducts(
  productId: string,
  categoryId: string | null,
  limit = 4
): Promise<Product[]> {
  if (!supabaseReady()) return [];
  try {
    const supabase = await createClient();
    let query = supabase
      .from("products")
      .select(`*, images:product_images(*), category:categories(*)`)
      .eq("is_active", true)
      .neq("id", productId)
      .limit(limit);
    if (categoryId) query = query.eq("category_id", categoryId);
    const { data } = await query;
    return (data as Product[]) || [];
  } catch {
    return [];
  }
}
