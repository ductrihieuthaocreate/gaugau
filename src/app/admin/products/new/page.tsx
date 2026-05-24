import { createAdminClient } from "@/lib/supabase/admin";
import { NewProductClient } from "@/components/admin/NewProductClient";
import type { Category } from "@/types";

export default async function NewProductPage() {
  const supabase = createAdminClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">New Product</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Fill in the details to add a new product to your store.
        </p>
      </div>
      <NewProductClient categories={(categories as Category[]) ?? []} />
    </div>
  );
}
