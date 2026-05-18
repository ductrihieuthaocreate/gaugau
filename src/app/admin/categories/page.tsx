"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Check, X, FolderOpen } from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import type { Category } from "@/types";

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

interface EditRow {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export default function AdminCategoriesPage() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useAdminStore();
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [editRow, setEditRow] = useState<EditRow | null>(null);
  const [newRow, setNewRow] = useState<{ name: string; slug: string; description: string } | null>(null);

  const productCount = (catId: string) => products.filter((p) => p.category_id === catId).length;

  const startEdit = (cat: Category) =>
    setEditRow({ id: cat.id, name: cat.name, slug: cat.slug, description: cat.description ?? "" });

  const saveEdit = () => {
    if (!editRow || !editRow.name.trim()) return;
    updateCategory(editRow.id, {
      name: editRow.name.trim(),
      slug: slugify(editRow.slug || editRow.name),
      description: editRow.description.trim() || null,
    });
    setEditRow(null);
  };

  const saveNew = () => {
    if (!newRow || !newRow.name.trim()) return;
    addCategory({
      name: newRow.name.trim(),
      slug: slugify(newRow.slug || newRow.name),
      description: newRow.description.trim() || null,
      parent_id: null,
      image_url: null,
      sort_order: 0,
    });
    setNewRow(null);
  };

  const inputCls = "border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-full focus:outline-none focus:border-gray-400";

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 text-sm mt-0.5">{categories.length} total categories</p>
        </div>
        {!newRow && (
          <button
            onClick={() => setNewRow({ name: "", slug: "", description: "" })}
            className="flex items-center gap-2 bg-black text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-colors"
          >
            <Plus size={16} />
            Add Category
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100">
              <th className="px-5 py-3 text-left">Name</th>
              <th className="px-5 py-3 text-left">Slug</th>
              <th className="px-5 py-3 text-left">Description</th>
              <th className="px-5 py-3 text-right">Products</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {/* New row inline */}
            {newRow && (
              <tr className="bg-blue-50">
                <td className="px-5 py-3">
                  <input
                    autoFocus
                    className={inputCls}
                    placeholder="Category name"
                    value={newRow.name}
                    onChange={(e) =>
                      setNewRow((r) => r ? { ...r, name: e.target.value, slug: r.slug || slugify(e.target.value) } : r)
                    }
                    onKeyDown={(e) => { if (e.key === "Enter") saveNew(); if (e.key === "Escape") setNewRow(null); }}
                  />
                </td>
                <td className="px-5 py-3">
                  <input
                    className={`${inputCls} font-mono`}
                    placeholder="slug"
                    value={newRow.slug}
                    onChange={(e) => setNewRow((r) => r ? { ...r, slug: slugify(e.target.value) } : r)}
                  />
                </td>
                <td className="px-5 py-3">
                  <input
                    className={inputCls}
                    placeholder="Optional description"
                    value={newRow.description}
                    onChange={(e) => setNewRow((r) => r ? { ...r, description: e.target.value } : r)}
                  />
                </td>
                <td className="px-5 py-3" />
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={saveNew} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Check size={15} />
                    </button>
                    <button onClick={() => setNewRow(null)} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                      <X size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            )}

            {categories.length === 0 && !newRow && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-gray-400 text-sm">
                  <FolderOpen size={28} className="mx-auto mb-2 text-gray-300" />
                  No categories yet. Add one above.
                </td>
              </tr>
            )}

            {categories.map((cat) => {
              const isEditing = editRow?.id === cat.id;
              const count = productCount(cat.id);

              return (
                <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    {isEditing ? (
                      <input
                        autoFocus
                        className={inputCls}
                        value={editRow.name}
                        onChange={(e) =>
                          setEditRow((r) => r ? { ...r, name: e.target.value } : r)
                        }
                        onKeyDown={(e) => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") setEditRow(null); }}
                      />
                    ) : (
                      <span className="text-sm font-semibold text-gray-900">{cat.name}</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    {isEditing ? (
                      <input
                        className={`${inputCls} font-mono`}
                        value={editRow.slug}
                        onChange={(e) => setEditRow((r) => r ? { ...r, slug: slugify(e.target.value) } : r)}
                      />
                    ) : (
                      <span className="text-xs text-gray-500 font-mono">{cat.slug}</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    {isEditing ? (
                      <input
                        className={inputCls}
                        value={editRow.description}
                        onChange={(e) => setEditRow((r) => r ? { ...r, description: e.target.value } : r)}
                        placeholder="Optional"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">{cat.description ?? <span className="text-gray-300">—</span>}</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span className="text-sm text-gray-700 font-semibold">{count}</span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {isEditing ? (
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={saveEdit} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Check size={15} />
                        </button>
                        <button onClick={() => setEditRow(null)} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                          <X size={15} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => startEdit(cat)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        {confirmDelete === cat.id ? (
                          <div className="flex items-center gap-1 ml-1">
                            <button
                              onClick={() => { deleteCategory(cat.id); setConfirmDelete(null); }}
                              className="text-xs text-white bg-red-500 px-2 py-1 rounded-lg hover:bg-red-600 font-semibold"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => setConfirmDelete(null)}
                              className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-lg hover:bg-gray-200 font-semibold"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDelete(cat.id)}
                            disabled={count > 0}
                            title={count > 0 ? `${count} product(s) use this category` : "Delete"}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-gray-400 disabled:hover:bg-transparent"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400">
        Categories with products cannot be deleted. Reassign or remove their products first.
      </p>
    </div>
  );
}
