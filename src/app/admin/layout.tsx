import AdminSidebar from "./AdminSidebar";

export const metadata = { title: "Admin — go2go" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F7F7F7" }}>
      <AdminSidebar />
      <main style={{ flex: 1, minWidth: 0, overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
