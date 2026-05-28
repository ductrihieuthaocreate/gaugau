import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/types";

interface GetProductsOptions {
  limit?: number;
  tag?: string;
  featured?: boolean;
  categorySlug?: string;
  search?: string;
}

export async function getProducts(opts: GetProductsOptions = {}): Promise<Product[]> {
  const { limit = 20, tag, featured, categorySlug, search } = opts;

  try {
    const supabase = await createClient();
    let query = supabase
      .from("products")
      .select(`*, category:categories(id,name,slug), images:product_images(url,alt,position)`)
      .gt("stock_quantity", 0)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (featured) query = query.eq("featured", true);
    if (tag)      query = query.contains("tags", [tag]);
    if (search)   query = query.ilike("title", `%${search}%`);
    if (categorySlug) {
      const { data: cat } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", categorySlug)
        .single();
      if (cat) query = query.eq("category_id", cat.id);
    }

    const { data } = await query;
    return (data ?? []) as Product[];
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select(`*, category:categories(id,name,slug), images:product_images(url,alt,position)`)
      .eq("slug", slug)
      .single();
    return (data as Product) ?? null;
  } catch {
    return null;
  }
}

export async function getCategories() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("name");
    return data ?? [];
  } catch {
    return [];
  }
}
