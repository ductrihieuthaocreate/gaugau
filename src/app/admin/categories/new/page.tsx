import CategoryForm from "../CategoryForm";

export const metadata = { title: "New Category — go2go Admin" };

export default function NewCategoryPage() {
  return (
    <div style={{ padding: "32px" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "28px" }}>Add Category</h1>
      <CategoryForm />
    </div>
  );
}
