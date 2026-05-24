import { createAdminClient } from "@/lib/supabase/admin";
import { AdminProductsList } from "@/components/admin/AdminProductsList";
import type { Product } from "@/types";

export default async function AdminProductsPage() {
  const supabase = createAdminClient();
  const { data: products } = await supabase
    .from("products")
    .select("*, images:product_images(*), category:categories(*)")
    .order("created_at", { ascending: false });

  return <AdminProductsList products={(products as Product[]) ?? []} />;
}
