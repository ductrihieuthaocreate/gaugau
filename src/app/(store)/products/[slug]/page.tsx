import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.id, product.category_id);

  return <ProductDetail product={product} relatedProducts={related} />;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.title} — Gaugau`,
    description: product.description ?? `Shop ${product.title} at Gaugau.`,
  };
}
