"use client";

import { useRouter } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { updateProduct } from "@/app/actions/products";
import type { Product, Category } from "@/types";

interface Props {
  product: Product;
  categories: Category[];
}

export function EditProductClient({ product, categories }: Props) {
  const router = useRouter();

  return (
    <ProductForm
      initialData={product}
      categories={categories}
      onSave={async (data) => {
        await updateProduct(product.id, data);
        router.push("/admin/products");
      }}
      onCancel={() => router.push("/admin/products")}
    />
  );
}
