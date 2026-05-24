export const dynamic = "force-dynamic";
import { createAdminClient } from "@/lib/supabase/admin";
import { AdminCategoriesList } from "@/components/admin/AdminCategoriesList";
import type { Category } from "@/types";

export default async function AdminCategoriesPage() {
  const supabase = createAdminClient();
  const [{ data: categories }, { data: products }] = await Promise.all([
    supabase.from("categories").select("*").order("sort_order"),
    supabase.from("products").select("id, category_id"),
  ]);

  return (
    <AdminCategoriesList
      categories={(categories as Category[]) ?? []}
      products={products ?? []}
    />
  );
}
