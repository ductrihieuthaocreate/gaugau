"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/lib/actions";

export default function DeleteProductButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await deleteProduct(id);
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="flex items-center"
      style={{
        gap: "4px",
        fontSize: "12px",
        color: "#990E35",
        fontWeight: 600,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
      }}
    >
      <Trash2 size={13} /> Delete
    </button>
  );
}
