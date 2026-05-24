"use client";

import { useRouter } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { addProduct } from "@/app/actions/products";
import type { Category } from "@/types";

interface Props {
  categories: Category[];
}

export function NewProductClient({ categories }: Props) {
  const router = useRouter();

  return (
    <ProductForm
      categories={categories}
      onSave={async (data) => {
        const result = await addProduct(data);
        if (!result?.error) router.push("/admin/products");
      }}
      onCancel={() => router.push("/admin/products")}
    />
  );
}
