import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/types";

interface GetProductsOptions {
  limit?: number;
  tag?: string;
  featured?: boolean;
  categorySlug?: string;
  search?: string;
  excludeId?: string;
}

// Virtual collections that map to query logic rather than a category
const VIRTUAL_COLLECTIONS: Record<string, (opts: { limit: number }) => GetProductsOptions> = {
  "new": (o) => ({ limit: o.limit }),
  "best-sellers": (o) => ({ tag: "best-seller", limit: o.limit }),
  "sale": (o) => ({ tag: "sale", limit: o.limit }),
  "gifts-under-25": (o) => ({ tag: "gifts", limit: o.limit }),
  "gifts-under-50": (o) => ({ tag: "gifts", limit: o.limit }),
  "birthday": (o) => ({ tag: "birthday", limit: o.limit }),
  "housewarming": (o) => ({ tag: "housewarming", limit: o.limit }),
  "gifts-for-him": (o) => ({ tag: "gifts-for-him", limit: o.limit }),
  "gifts-for-her": (o) => ({ tag: "gifts-for-her", limit: o.limit }),
};

export async function getProducts(opts: GetProductsOptions = {}): Promise<Product[]> {
  const { limit = 20, tag, featured, categorySlug, search, excludeId } = opts;

  try {
    const supabase = await createClient();

    // Handle virtual collections
    if (categorySlug && VIRTUAL_COLLECTIONS[categorySlug]) {
      const virtualOpts = VIRTUAL_COLLECTIONS[categorySlug]({ limit });
      return getProducts({ ...virtualOpts, excludeId });
    }

    let query = supabase
      .from("products")
      .select(`*, category:categories(id,name,slug), images:product_images(url,alt,position)`)
      .gt("stock_quantity", 0)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (featured) query = query.eq("featured", true);
    if (tag)      query = query.contains("tags", [tag]);
    if (search)   query = query.ilike("title", `%${search}%`);
    if (excludeId) query = query.neq("id", excludeId);

    if (categorySlug) {
      const { data: cat } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", categorySlug)
        .single();
      if (cat) {
        query = query.eq("category_id", cat.id);
      } else {
        // If slug doesn't match a category, try as a tag
        query = query.contains("tags", [categorySlug]);
      }
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

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  try {
    const supabase = await createClient();

    // First try same category
    if (product.category_id) {
      const { data } = await supabase
        .from("products")
        .select(`*, category:categories(id,name,slug), images:product_images(url,alt,position)`)
        .eq("category_id", product.category_id)
        .neq("id", product.id)
        .gt("stock_quantity", 0)
        .limit(limit);
      if (data && data.length >= 2) return data as Product[];
    }

    // Fallback: products with overlapping tags
    if (product.tags && product.tags.length > 0) {
      const { data } = await supabase
        .from("products")
        .select(`*, category:categories(id,name,slug), images:product_images(url,alt,position)`)
        .overlaps("tags", product.tags)
        .neq("id", product.id)
        .gt("stock_quantity", 0)
        .limit(limit);
      if (data && data.length > 0) return data as Product[];
    }

    // Final fallback: featured products
    const { data } = await supabase
      .from("products")
      .select(`*, category:categories(id,name,slug), images:product_images(url,alt,position)`)
      .neq("id", product.id)
      .gt("stock_quantity", 0)
      .eq("featured", true)
      .limit(limit);
    return (data ?? []) as Product[];
  } catch {
    return [];
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
