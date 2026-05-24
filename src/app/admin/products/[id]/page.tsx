export const dynamic = "force-dynamic";
import { createAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import { EditProductClient } from "@/components/admin/EditProductClient";
import type { Product, Category } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const supabase = createAdminClient();

  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase
      .from("products")
      .select("*, images:product_images(*), category:categories(*)")
      .eq("id", id)
      .single(),
    supabase.from("categories").select("*").order("sort_order"),
  ]);

  if (!product) notFound();

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-500 text-sm mt-0.5 font-mono">
          {(product as Product).slug}
        </p>
      </div>
      <EditProductClient
        product={product as Product}
        categories={(categories as Category[]) ?? []}
      />
    </div>
  );
}
