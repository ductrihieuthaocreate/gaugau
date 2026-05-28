import { getAdminCategories } from "@/lib/actions";
import ProductForm from "../ProductForm";

export const metadata = { title: "New Product — go2go Admin" };

export default async function NewProductPage() {
  const categories = await getAdminCategories();
  return (
    <div style={{ padding: "32px" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "28px" }}>Add Product</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
