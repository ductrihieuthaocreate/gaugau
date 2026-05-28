import { notFound } from "next/navigation";
import { getAdminProduct, getAdminCategories } from "@/lib/actions";
import ProductForm from "../../ProductForm";

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getAdminProduct(id),
    getAdminCategories(),
  ]);
  if (!product) notFound();

  return (
    <div style={{ padding: "32px" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "28px" }}>Edit Product</h1>
      <ProductForm categories={categories} product={product} />
    </div>
  );
}
