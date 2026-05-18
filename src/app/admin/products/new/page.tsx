"use client";

import { useRouter } from "next/navigation";
import { useAdminStore } from "@/store/adminStore";
import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  const { addProduct, categories } = useAdminStore();
  const router = useRouter();

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">New Product</h1>
        <p className="text-gray-500 text-sm mt-0.5">Fill in the details to add a new product to your store.</p>
      </div>
      <ProductForm
        categories={categories}
        onSave={(data) => {
          addProduct(data);
          router.push("/admin/products");
        }}
        onCancel={() => router.push("/admin/products")}
      />
    </div>
  );
}
