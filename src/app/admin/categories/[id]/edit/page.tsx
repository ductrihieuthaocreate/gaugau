import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import CategoryForm from "../../CategoryForm";

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params;
  const supabase = createAdminClient();
  if (!supabase) notFound();
  const { data: category } = await supabase.from("categories").select("*").eq("id", id).single();
  if (!category) notFound();

  return (
    <div style={{ padding: "32px" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "28px" }}>Edit Category</h1>
      <CategoryForm category={category} />
    </div>
  );
}
