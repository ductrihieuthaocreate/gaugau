"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { useAdminStore } from "@/store/adminStore";
import { ProductForm } from "@/components/admin/ProductForm";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { products, categories, updateProduct } = useAdminStore();
  const router = useRouter();

  const product = products.find((p) => p.id === id);
  if (!product) return notFound();

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-500 text-sm mt-0.5 font-mono">{product.slug}</p>
      </div>
      <ProductForm
        initialData={product}
        categories={categories}
        onSave={(data) => {
          updateProduct(id, data);
          router.push("/admin/products");
        }}
        onCancel={() => router.push("/admin/products")}
      />
    </div>
  );
}
