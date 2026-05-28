"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteCategory } from "@/lib/actions";

export default function DeleteCategoryButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    if (!confirm(`Delete "${name}"? Products in this category will become uncategorized.`)) return;
    await deleteCategory(id);
    router.refresh();
  };
  return (
    <button
      onClick={handleDelete}
      className="flex items-center"
      style={{ gap: "4px", fontSize: "12px", color: "#990E35", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 }}
    >
      <Trash2 size={13} /> Delete
    </button>
  );
}
